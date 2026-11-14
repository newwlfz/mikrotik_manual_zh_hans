---
sidebar_key: "firewall-and-quality-of-service/user-guides/bruteforce-prevention"
sidebar_position: 1
title: "SSH 暴力破解防护"
sidebar_label: "SSH 暴力破解防护"
description: "使用防火墙规则保护 RouterOS 上面向互联网的 SSH 服务，这些规则按源地址统计新连接数，并在某个源在短时间内建立过多连接时将其阻止。内容涵盖在暴露 SSH 之前应做哪些准备、如何将规则放入默认防火墙、豁免受信任的地址、IPv6、检查与解除阻止，以及这些规则仍允许多少次密码猜测。"
tags:
  - 'ssh'
  - 'bruteforce-prevention'
  - 'security'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/user-guides/bruteforce-prevention
captured_at: '2026-11-04T11:15:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

每个公网 IP 地址都会持续收到自动化的登录尝试。RouterOS 会延迟对每次失败登录的应答，从而减慢猜测速度，但并不会封锁来源地址。如果路由器上的 SSH 可从互联网访问，机器人就可以随意地持续猜测密码。

本页的防火墙规则会统计来自每个源地址的新 SSH 连接数，并在某个源在短时间内建立过多连接时将其封锁。在使用[默认配置](../../getting-started/configuration-management/default-configurations.md)的情况下，防火墙会丢弃来自 WAN 侧的所有管理访问，因此你不需要这些规则。

## 首先减少暴露面 {#reduce-the-exposure-first}

速率限制只能拖慢攻击者。以下措施可以消除风险，在向互联网开放 SSH 之前请先考虑它们：

- 通过 VPN 访问路由器，例如 [WireGuard](../../virtual-private-networks/wireguard.md)，并在 WAN 侧保持 SSH 关闭。
- 只允许来自你管理路由器所用地址的 SSH 连接，参见[保护你的路由器](../../getting-started/securing-your-router.md#opening-management-access-from-wan-advanced)。
- 使用 [SSH 密钥](../../management-tools/ssh.md#log-in-with-a-public-key)登录，并通过 `/ip/ssh/set password-authentication=no` 关闭密码登录。这样密码猜测就无从下手。在默认设置 `yes-if-no-key` 下，只有没有密钥的用户才能使用密码登录。
- 通过[端口敲门](./port-knocking.md)隐藏端口，让 SSH 只对知道敲门序列的客户端开放。

当 SSH 必须保持可从互联网访问时，或者在上述措施之上再加一层防护时，请使用本页的规则。

## 封锁反复建立 SSH 连接的来源 {#block-sources-that-open-repeated-ssh-connections}

这些规则让源地址经过三个地址列表，每建立一个新的 SSH 连接就推进一个阶段，并在第四个连接时将其加入黑名单：

| 来自该源的连接 | 条件 | 结果 |
|---|---|---|
| 第一个 | 无 | 加入 `connection1`，保留 5 分钟 |
| 第二个 | 在上一个连接后 5 分钟内 | 加入 `connection2`，保留 15 分钟 |
| 第三个 | 在上一个连接后 15 分钟内 | 加入 `connection3`，保留 1 小时 |
| 第四个 | 在上一个连接后 1 小时内 | 加入 `bruteforce_blacklist`，保留 1 天，并丢弃连接 |

该示例假设使用默认配置：面向互联网的接口位于 `WAN` 接口列表中，且 input 链以规则 `defconf: drop all not coming from LAN` 结尾。这些规则必须位于该规则之前，否则来自 WAN 侧的连接永远不会到达它们；`place-before` 会把每条规则放到该位置：

```ros
/ip/firewall/filter
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=22 connection-state=new \
    in-interface-list=WAN src-address-list=connection3 \
    address-list=bruteforce_blacklist address-list-timeout=1d \
    comment="SSH brute force: blacklist" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=22 connection-state=new \
    in-interface-list=WAN src-address-list=connection2 \
    address-list=connection3 address-list-timeout=1h \
    comment="SSH brute force: third connection" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=22 connection-state=new \
    in-interface-list=WAN src-address-list=connection1 \
    address-list=connection2 address-list-timeout=15m \
    comment="SSH brute force: second connection" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=22 connection-state=new \
    in-interface-list=WAN \
    address-list=connection1 address-list-timeout=5m \
    comment="SSH brute force: first connection" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=accept \
    protocol=tcp dst-port=22 in-interface-list=WAN \
    src-address-list=!bruteforce_blacklist \
    comment="SSH brute force: accept" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=drop \
    protocol=tcp dst-port=22 in-interface-list=WAN \
    comment="SSH brute force: drop blacklisted" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

规则的工作方式：

- 前四条规则只是把源地址加入某个列表；`add-src-to-address-list` 不会终止数据包，因此数据包会继续走向下一条规则。这些规则按相反顺序排列，因此每个连接都会把源地址推进一个阶段。
- `accept` 规则会放行连接，除非源地址在黑名单中；最后一条规则则将其丢弃。如果没有最后一条规则，被列入黑名单的连接会继续沿链往下走，而在不会稍后将其丢弃的防火墙上，黑名单就什么也拦不住。
- 这些规则统计新连接（`connection-state=new`）。已经打开的会话会保持打开，因为默认配置会在链的更早位置接受已建立的连接。
- `in-interface-list=WAN` 使这些规则不作用于来自你 LAN 的连接。
- 如果 SSH 监听在其他端口，请修改每条规则中的 `dst-port`。
- 如果某条命令报错 `no such item`，说明路由器上没有带 `defconf: drop all not coming from LAN` 注释的规则。在没有默认防火墙的路由器上，请省略 `place-before`，或者把这些规则放到你自己的丢弃规则之前。

:::warning
你可能会把自己封锁。这些规则统计的是连接数，而不是失败登录数：成功登录也会被计入，而且成功登录不会把源地址从列表中移除。当脚本或备份工具再多建立一个连接时，一个 SSH 会话、一次用 `scp` 的文件复制再加第二个会话就足以触发封锁，而该地址随后会被封锁一天。请按下一节的说明，把你管理路由器所用的地址排除在外。
:::

### 豁免可信地址 {#exempt-trusted-addresses}

在计数规则之前接受来自可信地址的 SSH。列表名 `secured` 是[端口敲门](./port-knocking.md)示例中用于正确完成敲门的客户端的列表名，因此当它的 accept 规则位于这些规则之前时，就已经豁免了这些客户端。请把固定地址加入同一个列表：

```ros
/ip/firewall/address-list/add list=secured address=198.51.100.7 \
    comment="Office"
/ip/firewall/filter/add chain=input action=accept \
    protocol=tcp dst-port=22 src-address-list=secured \
    comment="SSH brute force: trusted" \
    place-before=[find comment="SSH brute force: blacklist"]
```

### IPv6 {#ipv6}

这些规则适用于 IPv4。当 SSH 可通过 IPv6 访问时，请把相同的规则加入 `/ipv6/firewall/filter`，放在丢弃来自 LAN 外部的 IPv6 输入的规则之前。

## 检查与解除封锁 {#check-and-unblock}

列出规则正在跟踪的源地址及其每个条目的剩余时间，并查看有多少数据包到达了每条规则：

```ros
/ip/firewall/address-list/print where list~"^connection|^bruteforce"
/ip/firewall/filter/print stats where comment~"SSH brute force"
```

失败登录会以 `login failure for user <name> from <address> via ssh` 的形式出现在日志中：

```ros
/log/print where message~"login failure"
```

被封锁的地址会一直保持封锁，直到它一天内都没有尝试连接：来自黑名单源的新连接尝试会续期其条目。要解除对某个地址的封锁，请从全部四个列表中移除其条目，例如在控制台中或从另一个地址执行：

```ros
/ip/firewall/address-list/remove \
    [find list~"^connection|^bruteforce" address=203.0.113.10]
```

## 这些规则允许多少次猜测 {#how-many-guesses-the-rules-allow}

RouterOS SSH 服务器在一个连接上最多接受九次密码尝试，然后关闭该连接。使用示例中的超时时间：

- 快速连接的源可以获得三个连接，最多 27 次密码猜测，然后被封锁一天。
- 连接间隔超过 5 分钟的源永远不会离开第一阶段，也永远不会被封锁：每 5 分钟最多 9 次猜测，每天约 2,600 次猜测。

逐渐延长的超时时间正是这些规则有效的原因。如果三个列表都使用 1 分钟超时，源就可以每分钟建立三个连接而不被封锁，即每分钟最多 27 次猜测。要进一步拖慢有耐心的攻击者，请提高 `connection1` 的超时时间：设为 30 分钟时，限制就降到每 30 分钟 9 次猜测。第一阶段越长，你也越容易把自己封锁。

即使有这些规则，弱密码随着时间推移仍可能被猜出。密钥或长且唯一的密码才是真正的保护。

## 相关主题 {#related-topics}

- [DDoS 防护](./ddos-protection.md)使用相同的地址列表技术配合 `dst-limit` 来检测涌向路由器后方主机的新连接洪水。
- [端口敲门](./port-knocking.md)让 SSH 保持关闭，直到客户端发送正确的连接尝试序列。
- [连接速率](./connection-rate.md)匹配器测量单个连接的吞吐量；它不统计连接数。

有关所有规则属性，请参见 CLI 参考中的 [`/ip/firewall/filter`](../../cli-reference/ip/firewall/filter/index.md) 和 [`/ip/firewall/address-list`](../../cli-reference/ip/firewall/address-list.md)。
