---
sidebar_key: "firewall-and-quality-of-service/user-guides/port-knocking"
sidebar_position: 5
title: "端口敲门"
sidebar_label: "端口敲门"
description: "端口敲门使 RouterOS 路由器的管理端口保持关闭，直到客户端连接到一组秘密端口序列；随后防火墙会将客户端添加到受信任地址列表。内容涵盖默认防火墙中的敲门规则、从客户端进行敲门、针对端口扫描的黑名单、使用第 7 层的口令敲门，以及检查这些列表。"
tags:
  - 'firewall'
  - 'port-knocking'
  - 'security'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/user-guides/port-knocking
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

每个公网 IP 地址都在被持续扫描，扫描者包括机器人和 Shodan 之类的服务；任何人都可以利用扫描结果，对开放端口尝试暴力破解或已知漏洞利用。端口敲门则让这些端口保持关闭：路由器只监视对一串秘密端口的连接尝试。按正确顺序敲击正确端口的客户端会被加入 `secured` 地址列表，防火墙会接受其连接。

典型用途是管理远程站点上的路由器，而你的管理地址会变化，此时固定的允许源地址列表无法使用。

端口敲门是额外的一层防护，不能替代真正的身份验证。敲门包是明文数据包，任何能观察到你和路由器之间流量的人都可以重放它们。在条件允许时，应通过 [WireGuard](../../virtual-private-networks/wireguard.md) 之类的 VPN 访问管理服务；其他措施请参阅[保护你的路由器](../../getting-started/securing-your-router.md)。

## 通过敲门序列开放访问 {#open-access-with-a-knock-sequence}

示例假设使用默认配置：面向互联网的接口位于 `WAN` 接口列表中，且 input 链以规则 `defconf: drop all not coming from LAN` 结束。敲门规则必须位于该规则之前，否则来自 WAN 侧的敲门包永远无法到达这些规则；`place-before` 会把每条规则放到该位置：

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

规则的工作方式：

- 第一次敲门是对 TCP 端口 888 的连接尝试，它会把源地址加入 `888` 列表，保留 30 秒。
- 第二次敲门针对端口 555，只有来自 `888` 列表中地址的敲门才会计数，并会把该地址加入 `555` 列表。你可以用同样的方式串联任意多次敲门：每条规则都要求地址位于上一次敲门对应的列表中。
- 最后一次敲门针对端口 222，会把地址移入 `secured` 列表，保留 30 分钟。
- `accept` 规则会接受来自 `secured` 列表中地址的所有输入。若只想开放管理端口，可向其添加 `protocol=tcp dst-port=22,8291`。
- 顺序错误的敲门不会授予访问权限：只有当地址已在上一跳敲门对应的列表中时，一次敲门才会计数。
- 当地址位于 `secured` 列表时建立的会话，在条目过期后仍会保持打开，因为默认配置会在链中更早的位置接受已建立的连接。新连接需要新的敲门序列。

## 从客户端敲门 {#knock-from-a-client}

专用的端口敲门客户端可用，但用 `nmap` 写一个 shell 单行命令就能完成。每次运行 `nmap` 都会向一个端口发送连接尝试；整个序列只需几秒钟：

```bash
for x in 888 555 222; do nmap -p $x -Pn 203.0.113.1; done
```

请将 `203.0.113.1` 替换为路由器的公网地址。根据防火墙配置，这些端口在 `nmap` 输出中会显示为 closed 或 filtered；这是预期结果，因为没有任何服务在监听它们。完成最后一次敲门后，在 30 分钟内照常连接路由器。

## 添加黑名单 {#add-a-blacklist}

如果端口扫描恰好按正确顺序命中敲门端口，就会开放路由器；而只有少量敲门端口时，这种情况并非不可能。黑名单可以在扫描器走到那一步之前阻止它们。以下规则以禁用状态添加，以免你在添加规则时把自己锁在外面：

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

- drop 规则会放在 input 链的第一条规则之前（`place-before=([find chain=input]->0)`），因此被列入黑名单的地址完全无法敲门或连接。在粘贴的命令中，请用 `find` 引用规则：像 `place-before=0` 这样的纯数字只有在同一会话中先执行 `print` 后才有效，否则会失败并提示 `item referred by 'place-before' does not exist`。
- 坏端口是可信用户永远不会使用的端口。任何对它发起的连接尝试都会把源地址加入黑名单 1000 分钟。
- 第二条规则会拖慢端口扫描，直到其失去意义，同时不会让真实用户被锁定太久：对所列端口之一的连接尝试会把源地址加入黑名单一分钟。该列表可以包含除敲门端口外的所有端口。它会跳过 `secured` 列表中的地址，因此成功敲门后你可以使用这些端口。

:::warning
你可能会把自己封禁。规则启用后，在敲门之前连接 SSH 或 WinBox 会把你自己地址加入黑名单一分钟，在此期间你的敲门包会被丢弃。被阻止的客户端会在一段时间内不断重试连接，而每次重试都可能续期该条目：被阻止的尝试之后，请等待一分钟再重新敲门。只有在你有其他方式访问路由器时，或处于 [Safe Mode](../../getting-started/configuration-management/index.md#safe-mode) 时，才启用这些规则。
:::

准备好后，启用规则：

```ros
/ip/firewall/filter/enable [find comment~"^Port knocking"]
```

## 为每次敲门使用口令 {#use-a-passphrase-for-each-knock}

你可以更进一步，要求敲门时携带口令。第 7 层协议条目会匹配数据包载荷中的口令，而一条 UDP 敲门规则会要求它。用该 UDP 规则替代第一次 TCP 敲门：

```ros
/ip/firewall/layer7-protocol/add name=pass regexp="^passphrase\$"
/ip/firewall/filter/add chain=input action=add-src-to-address-list \
    protocol=udp dst-port=888 in-interface-list=WAN \
    layer7-protocol=pass address-list=888 address-list-timeout=30s \
    comment="Port knocking: first knock with passphrase" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
/ip/firewall/filter/remove [find comment="Port knocking: first knock"]
```

正则表达式中的 `$` 必须转义为 `\$`，否则 RouterOS 会把它读作变量名的开头；保存后的表达式为 `^passphrase$`。该表达式只匹配完全一致的载荷：错误的口令或末尾换行都不算。用 `printf` 或 `echo -n` 发送不带换行的口令，然后敲击其他端口：

```bash
printf 'passphrase' | nc -u -w1 203.0.113.1 888
for x in 555 222; do nmap -p $x -Pn 203.0.113.1; done
```

:::warning
第 7 层规则非常消耗资源。除非你清楚自己在做什么，否则不要使用它们。
:::

## 检查列表 {#check-the-lists}

查看哪些地址正处于敲门序列中途、哪些已受信任、哪些被阻止，以及每个条目的剩余时间：

```ros
/ip/firewall/address-list/print \
    where list~"^(888|555|secured|blacklist)\$"
```

要解除对某个地址的封锁，请将其从黑名单中移除：

```ros
/ip/firewall/address-list/remove \
    [find list=blacklist address=203.0.113.10]
```

## IPv6 {#ipv6}

这些规则适用于 IPv4。当路由器可通过 IPv6 访问时，请以相同方式把 TCP 敲门规则添加到 `/ipv6/firewall/filter`，放在丢弃来自 LAN 外部的 IPv6 输入的规则之前。

## 相关主题 {#related-topics}

- [SSH 暴力破解防护](./bruteforce-prevention.md) 会限制来自同一地址的重复 SSH 连接，并使用相同的 `secured` 列表豁免正确完成敲门的客户端。
- [DDoS 防护](./ddos-protection.md) 会检测发往路由器后方主机的大量新连接洪泛。

有关所有规则属性，请参阅 CLI 参考中的 [`/ip/firewall/filter`](../../cli-reference/ip/firewall/filter/index.md)、[`/ip/firewall/address-list`](../../cli-reference/ip/firewall/address-list.md) 和 [`/ip/firewall/layer7-protocol`](../../cli-reference/ip/firewall/layer7-protocol.md)。
