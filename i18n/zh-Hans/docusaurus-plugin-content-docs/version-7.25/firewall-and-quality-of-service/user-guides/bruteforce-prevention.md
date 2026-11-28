---
title: "SSH 暴力破解防护"
description: "使用防火墙规则保护 RouterOS 上面向互联网的 SSH 服务，这些规则按源地址统计新连接，并阻止在短时间内发起过多连接的源地址。内容涵盖公开 SSH 前的准备工作、在默认防火墙中放置规则、豁免受信任地址、IPv6、检查和解除阻止，以及这些规则仍允许多少次密码猜测。"
tags:
  - 'ssh'
  - 'bruteforce-prevention'
  - 'security'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/user-guides/bruteforce-prevention
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "firewall-and-quality-of-service/user-guides"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

每个公网 IP 地址都会持续收到自动登录尝试。RouterOS 会延迟响应每次失败的登录，从而减慢猜测速度，但不会阻止源地址。如果路由器上的 SSH 可从互联网访问，机器人就可以持续猜测密码。

本页中的防火墙规则会统计每个源地址发起的新 SSH 连接，并阻止在短时间内发起过多连接的源地址。使用[默认配置](/docs/getting-started/configuration-management/default-configurations)时，防火墙会丢弃来自 WAN 侧的所有管理访问，因此不需要这些规则。

## 先减少暴露面 {#reduce-the-exposure-first}

速率限制只会减慢攻击者的速度。以下措施可以消除风险；在向互联网开放 SSH 之前，请先考虑这些措施：

- 通过 VPN 访问路由器，例如 [WireGuard](/docs/virtual-private-networks/wireguard)，并保持 WAN 侧关闭 SSH。
- 仅允许从管理路由器所用的地址访问 SSH，如[保护路由器安全](/docs/getting-started/securing-your-router#opening-management-access-from-wan-advanced)中所述。
- 使用 [SSH 密钥](/docs/management-tools/ssh#log-in-with-a-public-key)登录，并通过 `/ip/ssh/set password-authentication=no` 关闭密码登录。这样密码猜测就无从下手。默认设置为 `yes-if-no-key`，只有没有密钥的用户才能使用密码登录。
- 使用[端口敲门](/docs/firewall-and-quality-of-service/user-guides/port-knocking)隐藏端口，使 SSH 仅对知道敲门序列的客户端开放。

当 SSH 必须保持可从互联网访问时，或作为上述措施之上的额外防护层时，请使用本页中的规则。

## 阻止反复发起 SSH 连接的源地址 {#block-sources-that-open-repeated-ssh-connections}

这些规则会让源地址依次经过三个地址列表，每建立一次新的 SSH 连接进入一个阶段，并在第四次连接时将其加入黑名单：

| 来自源的连接 | 条件 | 结果 |
|---|---|---|
| 第一次 | 无 | 添加到 `connection1`，保留 5 分钟 |
| 第二次 | 距上一次连接 5 分钟内 | 添加到 `connection2`，保留 15 分钟 |
| 第三次 | 距上一次连接 15 分钟内 | 添加到 `connection3`，保留 1 小时 |
| 第四次 | 距上一次连接 1 小时内 | 添加到 `bruteforce_blacklist`，保留 1 天，并丢弃连接 |

该示例采用默认配置：面向互联网的接口位于 `WAN` 接口列表中，input 链以规则 `defconf: drop all not coming from LAN` 结束。这些规则必须位于该规则之前，否则来自 WAN 侧的连接永远不会到达它们；`place-before` 会将每条规则放在该位置：

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

规则的工作方式如下：

- 前四条规则只将源地址添加到列表中；`add-src-to-address-list` 不会停止数据包，因此数据包会继续匹配下一条规则。这些规则按相反顺序排列，因此每次连接都会将源地址推进一个阶段。
- `accept` 规则允许连接通过，除非源地址在黑名单中；最后一条规则会丢弃该连接。如果没有最后一条规则，黑名单中的连接会继续沿链向下匹配，在后续不会丢弃它的防火墙上，黑名单不会起任何作用。
- 这些规则统计新连接（`connection-state=new`）。已经打开的会话会保持打开，因为默认配置会在链中较早的位置接受已建立的连接。
- `in-interface-list=WAN` 使这些规则不会作用于来自 LAN 的连接。
- 如果 SSH 监听其他端口，请在每条规则中修改 `dst-port`。
- 如果命令失败并返回 `no such item`，说明路由器没有带 `defconf: drop all not coming from LAN` 注释的规则。在未使用默认防火墙的路由器上，请省略 `place-before`，或将这些规则放在你自己的丢弃规则之前。

:::warning
你可能会把自己封锁。这些规则统计的是连接，而不是登录失败：成功登录也会被统计，并且成功登录不会从列表中移除源地址。一个 SSH 会话、一次使用 `scp` 的文件复制和第二个会话，在脚本或备份工具再增加一个连接时可能已经足够，该地址随后会被封锁一天。请按照下一节所述，豁免你用于管理路由器的地址。
:::

### 豁免可信地址 {#exempt-trusted-addresses}

在计数规则之前接受来自可信地址的 SSH。列表名称 `secured` 是 [port knocking](/docs/firewall-and-quality-of-service/user-guides/port-knocking) 示例用于已正确敲门客户端的名称，因此当它的 accept 规则位于这些规则之前时，已经豁免了这些客户端。将固定地址添加到同一列表中：

```ros
/ip/firewall/address-list/add list=secured address=198.51.100.7 \
    comment="Office"
/ip/firewall/filter/add chain=input action=accept \
    protocol=tcp dst-port=22 src-address-list=secured \
    comment="SSH brute force: trusted" \
    place-before=[find comment="SSH brute force: blacklist"]
```

### IPv6

这些规则适用于 IPv4。当 SSH 可通过 IPv6 访问时，请将相同规则添加到 `/ipv6/firewall/filter`，并放在丢弃来自 LAN 外部 IPv6 input 的规则之前。

## 检查和解除封锁 {#check-and-unblock}

列出规则正在跟踪的源，以及每个条目的剩余时间，并查看有多少数据包命中每条规则：

```ros
/ip/firewall/address-list/print where list~"^connection|^bruteforce"
/ip/firewall/filter/print stats where comment~"SSH brute force"
```

失败的登录会在日志中显示为 `login failure for user <name> from <address> via ssh`：

```ros
/log/print where message~"login failure"
```

被封锁的地址在一天内未尝试连接之前会一直保持封锁状态：来自黑名单源的新连接尝试会续期其条目。要解除某个地址的封锁，请从所有四个列表中删除其条目，例如从控制台或另一个地址执行：

```ros
/ip/firewall/address-list/remove \
    [find list~"^connection|^bruteforce" address=203.0.113.10]
```

## 规则允许的猜测次数 {#how-many-guesses-the-rules-allow}

RouterOS SSH 服务器在关闭连接前，允许在一条连接上最多进行九次密码尝试。使用示例中的超时设置：

- 快速连接的源在被封锁一天之前，可以获得三次连接，最多进行 27 次密码猜测。
- 在两次连接之间等待超过 5 分钟的源永远不会进入第一阶段之后，也永远不会被封锁：每 5 分钟最多 9 次猜测，每天约 2,600 次猜测。

递增的超时设置是这些规则有效的原因。如果三个列表都使用 1 分钟超时，源可以每分钟打开三次连接而不被封锁，即每分钟最多 27 次猜测。要进一步减慢有耐心的攻击者，请提高 `connection1` 的超时：设置为 30 分钟时，限制降为每 30 分钟 9 次猜测。更长的第一阶段也更容易把自己封锁在外。

即使采用这些规则，弱密码仍可能随时间被猜出。密钥或长且唯一的密码才是真正的保护措施。

## 相关主题 {#related-topics}

- [DDoS 防护](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)使用相同的 address-list 技术和 `dst-limit` 检测发往路由器后方主机的大量新连接。
- [端口敲门](/docs/firewall-and-quality-of-service/user-guides/port-knocking)使 SSH 保持关闭，直到客户端发送正确的连接尝试序列。
- [连接速率](/docs/firewall-and-quality-of-service/user-guides/connection-rate)匹配器测量单个连接的吞吐量；它不统计连接数。

有关所有规则属性，请参阅 CLI 参考中的 [`/ip/firewall/filter`](/docs/cli-reference/ip/firewall/filter) 和 [`/ip/firewall/address-list`](/docs/cli-reference/ip/firewall/address-list)。
