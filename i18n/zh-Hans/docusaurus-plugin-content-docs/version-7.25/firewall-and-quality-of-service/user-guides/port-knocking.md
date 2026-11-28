---
title: "端口敲门"
description: "端口敲门可使 RouterOS 路由器的管理端口保持关闭，直到客户端连接到一组秘密端口序列；随后防火墙会将该客户端加入受信任地址列表。本文涵盖默认防火墙中的敲门规则、从客户端发起敲门、针对端口扫描的黑名单、使用第 7 层的口令敲门，以及检查列表。"
tags:
  - 'firewall'
  - 'port-knocking'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/user-guides/port-knocking
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "virtual-private-networks"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

每个公网 IP 地址都会被机器人和 Shodan 等服务持续扫描，任何人都可以使用扫描结果，对开放端口尝试暴力破解攻击或已知漏洞利用。端口敲门则保持端口关闭：路由器只监视针对一组秘密端口序列的连接尝试。客户端按正确顺序敲击正确的端口后，会被加入 `secured` 地址列表，防火墙将接受其连接。

典型用法是管理位于远程站点、地址不断变化的路由器，此时固定的允许源地址列表无法生效。

端口敲门是额外的一层防护，不能替代真正的身份验证。敲门报文是普通数据包，任何能够观察你与路由器之间流量的人都可以重放这些报文。应尽可能通过 VPN（例如 [WireGuard](/docs/virtual-private-networks/wireguard)）访问管理服务；其他措施请参阅 [保护路由器安全](/docs/getting-started/securing-your-router)。

## 通过敲门序列开放访问 {#open-access-with-a-knock-sequence}

该示例假设使用默认配置：面向互联网的接口位于 `WAN` 接口列表中，input 链以规则 `defconf: drop all not coming from LAN` 结束。敲门规则必须位于该规则之前，否则来自 WAN 侧的敲门报文永远不会到达这些规则；`place-before` 会将每条规则放在该位置：

```ros
/ip/firewall/filter
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=888 in-interface-list=WAN \
    address-list=888 address-list-timeout=30s \
    comment="Port knocking: first knock" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=555 in-interface-list=WAN \
    src-address-list=888 address-list=555 address-list-timeout=30s \
    comment="Port knocking: second knock" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=222 in-interface-list=WAN \
    src-address-list=555 address-list=secured address-list-timeout=30m \
    comment="Port knocking: last knock" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=accept \
    in-interface-list=WAN src-address-list=secured \
    comment="Port knocking: accept knocked clients" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

规则的工作方式如下：

- 第一次敲门，即对 TCP 端口 888 的连接尝试，会将源地址加入 `888` 列表 30 秒。
- 第二次敲门针对端口 555，只对位于 `888` 列表中的地址计数，并将其加入 `555` 列表。你可以按相同方式串联任意多次敲门：每条规则都要求地址位于上一次敲门对应的列表中。
- 最后一次敲门针对端口 222，会将地址移入 `secured` 列表 30 分钟。
- `accept` 规则接受来自 `secured` 列表中地址的所有 input 连接。若只开放管理端口，请向该规则添加 `protocol=tcp dst-port=22,8291`。
- 顺序错误的敲门不会授予访问权限：只有当地址已经位于上一次敲门对应的列表中时，敲门才会计数。
- 地址位于 `secured` 列表期间建立的会话，在条目过期后仍会保持打开，因为默认配置会在链中较早位置接受已建立连接。新连接需要重新执行敲门序列。

## 从客户端敲门 {#knock-from-a-client}

专用端口敲门客户端可以完成此任务，但使用带 `nmap` 的 shell 单行命令也能完成。每次 `nmap` 运行都会向一个端口发送连接尝试；整个序列需要几秒钟：

```bash
for x in 888 555 222; do nmap -p $x -Pn 203.0.113.1; done
```

将 `203.0.113.1` 替换为路由器的公网地址。根据防火墙配置，`nmap` 输出中的端口可能显示为 closed 或 filtered；这是预期行为，因为这些端口上没有服务监听。完成最后一次敲门后，在 30 分钟内照常连接到路由器。

## 添加黑名单 {#add-a-blacklist}

如果端口扫描恰好按正确顺序命中敲门端口，就会打开路由器；敲门端口数量很少时，这种情况并非不可能。黑名单可以在扫描器达到这一步之前阻止它们。以下规则添加后处于禁用状态，以免你在添加规则时将自己锁定在外：

```ros
/ip/firewall/filter
add chain=input action=drop \
    in-interface-list=WAN src-address-list=blacklist \
    comment="Port knocking: drop blacklisted" disabled=yes \
    place-before=([find chain=input]->0)
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=666 in-interface-list=WAN \
    address-list=blacklist address-list-timeout=1000m \
    comment="Port knocking: bad port" disabled=yes \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=add-src-to-address-list \
    protocol=tcp dst-port=21,22,23,8291,10000-60000 \
    in-interface-list=WAN src-address-list=!secured \
    address-list=blacklist address-list-timeout=1m \
    comment="Port knocking: slow down scans" disabled=yes \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

- drop 规则位于 input 链的第一条规则之前（`place-before=([find chain=input]->0)`），因此黑名单中的地址完全无法敲门或连接。在粘贴的命令中使用 `find` 引用规则：像 `place-before=0` 这样的普通编号仅在同一会话中执行 `print` 后才有效，否则会失败并返回 `item referred by 'place-before' does not exist`。
- 坏端口是受信任用户从不使用的端口。任何到该端口的连接尝试都会将源地址加入黑名单 1000 分钟。
- 第二条规则会拖慢端口扫描，使其失去意义，同时不会长时间锁定真实用户：到所列端口之一的连接尝试会将源地址加入黑名单一分钟。该列表可以包含除敲门端口之外的所有端口。它会跳过 `secured` 列表中的地址，因此成功敲门后可以使用这些端口。

:::warning
你可能会把自己阻止。启用规则后，在敲门前连接 SSH 或 WinBox 会将你自己的地址加入黑名单一分钟，在此期间你的敲门数据包会被丢弃。被阻止的客户端会在一段时间内持续重试连接，每次重试都可能续期该条目：被阻止后等待一分钟，再重新敲门。只有在你有其他方式访问路由器时，或在 [Safe Mode](/docs/getting-started/configuration-management#safe-mode) 中，才启用这些规则。
:::

准备就绪后，启用规则：

```ros
/ip/firewall/filter/enable [find comment~"^Port knocking"]
```

## 为每次敲门使用口令短语 {#use-a-passphrase-for-each-knock}

可以进一步要求 knock 携带口令短语。layer 7 协议条目匹配数据包载荷中的口令短语，UDP knock 规则要求使用该口令短语。使用 UDP 规则替代第一个 TCP knock：

```ros
/ip/firewall/layer7-protocol/add name=pass regexp="^passphrase\$"
/ip/firewall/filter/add chain=input action=add-src-to-address-list \
    protocol=udp dst-port=888 in-interface-list=WAN \
    layer7-protocol=pass address-list=888 address-list-timeout=30s \
    comment="Port knocking: first knock with passphrase" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
/ip/firewall/filter/remove [find comment="Port knocking: first knock"]
```

正则表达式中的 `$` 必须转义为 `\$`，否则 RouterOS 会将其读取为变量名的开头；存储的表达式为 `^passphrase$`。该表达式仅匹配完全一致的载荷：错误的口令短语或末尾换行均不匹配。使用 `printf` 或 `echo -n` 发送不带换行的口令短语，然后 knock 其他端口：

```bash
printf 'passphrase' | nc -u -w1 203.0.113.1 888
for x in 555 222; do nmap -p $x -Pn 203.0.113.1; done
```

:::warning
Layer 7 规则非常消耗资源。除非清楚自己在做什么，否则不要使用它们。
:::

## 检查列表 {#check-the-lists}

查看哪些地址正处于 knock 序列中、哪些地址受信任、哪些地址被阻止，以及每个条目的剩余时间：

```ros
/ip/firewall/address-list/print \
    where list~"^(888|555|secured|blacklist)\$"
```

要解除对某个地址的阻止，请将其从黑名单中移除：

```ros
/ip/firewall/address-list/remove \
    [find list=blacklist address=203.0.113.10]
```

## IPv6

这些规则适用于 IPv4。当路由器可通过 IPv6 访问时，以相同方式将 TCP knock 规则添加到 `/ipv6/firewall/filter`，并放置在丢弃来自 LAN 外部的 IPv6 输入流量的规则之前。

## 相关主题 {#related-topics}

- [SSH 暴力破解防护](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)限制来自同一地址的重复 SSH 连接，并使用相同的 `secured` 列表豁免正确完成 knock 的客户端。
- [DDoS 防护](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)检测发往路由器后方主机的大量新连接。

有关所有规则属性，请参阅 CLI 参考中的 [`/ip/firewall/filter`](/docs/cli-reference/ip/firewall/filter)、[`/ip/firewall/address-list`](/docs/cli-reference/ip/firewall/address-list) 和 [`/ip/firewall/layer7-protocol`](/docs/cli-reference/ip/firewall/layer7-protocol)。
