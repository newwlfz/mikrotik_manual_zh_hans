---
title: "地址列表"
description: "地址列表将 IP 地址、前缀、范围和 DNS 名称归组到一个名称下，供防火墙规则使用。条目可以是静态的，也可以由带超时的规则添加，或从名称解析得到。"
tags:
  - 'address-lists'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/firewall/address-lists
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "firewall-and-quality-of-service/firewall"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

地址列表是一组命名的 IP 地址、前缀以及（对于 IPv4）地址范围。Filter、NAT、mangle 和 raw 规则通过 `src-address-list` 和 `dst-address-list` 与其匹配，名称前的 `!` 匹配所有不在该列表中的地址。这样，一条规则即可覆盖多个地址，并且可通过修改列表而不是修改规则来更改其适用对象。

条目来自三个来源：你手动添加，防火墙规则通过 `add-src-to-address-list` 和 `add-dst-to-address-list` 操作添加，以及路由器解析你放入列表中的 DNS 名称。IPv4 列表位于 `/ip/firewall/address-list`，IPv6 列表位于 `/ipv6/firewall/address-list`。两者相互独立，即使两个列表名称相同也是如此。

## 阻止来自地址列表的流量 {#block-traffic-from-a-list-of-addresses}

丢弃所有来自 WAN 且源地址在 `blocked` 列表中的流量。`WAN` 是默认配置中的接口列表，包含互联网端口：

```ros
/ip/firewall/address-list/add list=blocked address=203.0.113.0/24 \
    comment="Abuse reports"
/ip/firewall/address-list/add list=blocked address=198.51.100.7
/ip/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=blocked \
    comment="Drop traffic from blocked addresses"
```

```ros
[admin@MikroTik] > /ip/firewall/address-list/print where list=blocked
Columns: LIST, ADDRESS, CREATION-TIME
# LIST     ADDRESS         CREATION-TIME
;;; Abuse reports
0 blocked  203.0.113.0/24  2026-10-01 08:50:12
1 blocked  198.51.100.7    2026-10-01 08:50:12
```

`/ip/firewall/raw` 中的规则在[连接跟踪](/docs/firewall-and-quality-of-service/connection-tracking)之前运行，因此该规则会丢弃从这些地址到达 WAN 的每个数据包：包括到路由器的新连接、到转发服务的新连接，以及 LAN 中主机主动连接到这些地址时产生的回复数据包。要阻止更多地址，请将它们添加到列表中。

要一次添加多个条目，可在终端中粘贴多行 `add` 命令，或将它们放入 `.rsc` 文件并使用 `/import` 导入。`203.0.113.77/24` 和 `203.0.113.0/24` 是同一条目，因此第二条 `add` 会失败并返回 `failure: already have such entry`，导入也会在此处停止。

IPv6 地址应放入 IPv6 列表，并在 `/ipv6/firewall/raw` 中使用相同的丢弃规则：

```ros
/ipv6/firewall/address-list/add list=blocked address=2001:db8:bad::/48
/ipv6/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=blocked \
    comment="Drop traffic from blocked addresses"
```

IPv6 主机可以在其 /64 内更改地址。对于 IPv6，应列出整个前缀（/64 或更大范围），而不是单个地址。

## 按名称允许来自动态地址的访问 {#allow-access-from-a-dynamic-address-by-name}

远程办公室或家庭连接的地址经常会变化。将其 DNS 名称放入列表，例如办公室路由器的 DDNS 名称，并允许来自该地址的 SSH 和 WinBox（SSH 使用 TCP 端口 22，WinBox 使用 TCP 端口 8291）：

```ros
/ip/firewall/address-list/add list=trusted address=office.example.com \
    comment="Office router"
/ip/firewall/filter/add chain=input action=accept protocol=tcp \
    dst-port=22,8291 src-address-list=trusted \
    comment="Allow SSH and WinBox from trusted addresses" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

该规则应放在默认的 `drop all not coming from LAN` 规则之前。直接使用 `add` 会将其放在 drop 规则之后，这样它永远不会匹配。

路由器会解析该名称，并将地址添加为动态条目，同时将该名称作为注释：

```ros
[admin@MikroTik] > /ip/firewall/address-list/print where list=trusted
Flags: D - DYNAMIC
Columns: LIST, ADDRESS, CREATION-TIME
#   LIST     ADDRESS             CREATION-TIME
;;; Office router
4   trusted  office.example.com  2026-10-01 08:52:00
;;; office.example.com
5 D trusted  198.51.100.20       2026-10-01 08:52:00
```

当 DNS 记录过期时，路由器会再次解析该名称，并替换已变化的地址，因此该规则会跟随办公室的地址。

:::warning
该规则会向名称解析到的地址对应的所有主机开放 SSH 和 WinBox。请使用仅由你控制的名称。访问取决于路由器 DNS 服务器的应答，因此请使用你信任的 DNS 服务器，并保留另一种访问方式，例如 VPN。如果 `/ip/service` 通过 `available-from` 限制 WinBox 或 SSH，则也必须在那里允许该地址（请参阅[限制可使用服务的用户](/docs/system-information-and-utilities/services#limit-who-can-use-a-service)）。
:::

## 阻止探测关闭端口的主机 {#block-hosts-that-probe-a-closed-port}

尝试访问 WAN 地址上 Telnet 的主机通常是在扫描弱安全设备。将此类主机列入列表一天，并丢弃其所有流量，包括发往你转发到 LAN 的服务的流量：

```ros
/ip/firewall/raw/add chain=prerouting action=add-src-to-address-list \
    in-interface-list=WAN protocol=tcp dst-port=23 \
    src-address-list=!trusted \
    address-list=port-scanners address-list-timeout=1d \
    comment="List hosts that probe the Telnet port"
/ip/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=port-scanners \
    comment="Drop listed hosts"
```

第一条规则将源地址添加到 `port-scanners`，并将数据包传递给下一条规则。此后，第二条规则会丢弃来自该主机的所有数据包，直到超时结束。每次新的探测都会将超时重置为一整天。

一个数据包就足以将其源地址列入列表，而数据包的源地址可以被伪造。将你依赖的地址（例如 DNS 服务器、VPN 对等体和办公室地址）保留在上一节的 `trusted` 列表中：`src-address-list=!trusted` 会使第一条规则跳过这些地址。

```ros
[admin@MikroTik] > /ip/firewall/address-list/print where list=port-scanners
Flags: D - DYNAMIC
Columns: LIST, ADDRESS, CREATION-TIME, TIMEOUT
#   LIST           ADDRESS        CREATION-TIME        TIMEOUT
2 D port-scanners  198.51.100.23  2026-10-01 08:50:30  23h59m55s
```

带超时的条目是动态条目（`D`）：它们不会保存在配置中，重启后会清除。扫描器会再次出现，因此列表会重新填充。`address-list-timeout=none-static` 可在重启后保留条目，但列表会随着每个扫描器不断增长，直到你移除条目，并且每个新条目都会更改已保存的配置。

对于仅在多次尝试后才列出主机的规则，请参阅 [SSH brute-force protection](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention) 和 [Port knocking](/docs/firewall-and-quality-of-service/user-guides/port-knocking)，后者仅在秘密的连接尝试序列之后打开端口。

## 查看、移除和导出条目 {#view-remove-and-export-entries}

显示列表，或仅统计其条目数：

```ros
/ip/firewall/address-list/print where list=port-scanners
/ip/firewall/address-list/print count-only where list=port-scanners
```

移除一个条目：

```ros
/ip/firewall/address-list
remove [find list=port-scanners address=198.51.100.23]
```

要将列表复制到另一台路由器，请将其导出到文件。在 `where` 之前写入 `file=`，因为 `where` 会将命令行的其余部分作为条件。如果 `file=` 在其之后，导出内容会打印到终端，并且不会写入文件。

```ros
/ip/firewall/address-list/export file=blocked where list=blocked
```

文件 `blocked.rsc` 保存列表的静态条目。动态条目不会导出。

```ros
/ip firewall address-list
add address=203.0.113.0/24 comment="Abuse reports" disabled=no dynamic=no \
    list=blocked
add address=198.51.100.7 disabled=no dynamic=no list=blocked
```

使用 WinBox 中的 **Files**（请参阅[在 WinBox 中管理文件](/docs/system-information-and-utilities/files#manage-files-in-winbox)）或使用 `scp`，将文件复制到另一台路由器，然后导入：

```ros
/import blocked.rsc
```

该文件仅包含条目：还需在另一台路由器上添加 drop 规则。导入会在列表中已存在的第一个地址处停止，并显示 `failure: already have such entry`。稍后要更新另一台路由器上的列表时，先删除其条目（列表中不含 DNS 名称），再导入新文件：

```ros
/ip/firewall/address-list/remove [find list=blocked]
/import blocked.rsc
```

要清空包含 DNS 名称的列表，分两步删除：

```ros
/ip/firewall/address-list/remove [find list=trusted !dynamic]
/ip/firewall/address-list/remove [find list=trusted]
```

第一条命令删除静态条目；删除名称也会删除其解析出的地址。第二条命令删除规则添加的动态条目。单独执行 `remove [find list=trusted]` 也会选中该名称的地址，并且在名称消失后以 `no such item` 停止。

## 条目的行为 {#how-entries-behave}

### 静态条目和动态条目 {#static-and-dynamic-entries}

| 条目的创建方式 | 标志 | 保存在配置和导出中 | 重启后 |
| :-- | :-- | :-- | :-- |
| 不带 `timeout` 的 `add` | | 是 | 保留 |
| 带 `address-list-timeout=none-static` 的规则 | | 是 | 保留 |
| 带 `timeout` 或 `dynamic=yes` 的 `add` | `D` | 否 | 消失 |
| 带时间或 `address-list-timeout=none-dynamic` 的规则 | `D` | 否 | 消失 |
| 从 DNS 名称解析出的地址 | `D` | 否，名称条目会保存 | 名称条目会保留 |

静态条目在重启后保留其 `creation-time`。DNS 和 DHCP 服务器添加的条目也是动态条目。

### Timeouts

最长超时为 `35w3d13h13m56s`。更长的值会失败，并提示 `value of timeout is out of range (00:00:00 .. 35w3d13:13:56)`。

当规则匹配列表中已有的地址时，会重置该条目的超时。当该地址已是此列表中的静态条目时，条目保持静态，且不会获得超时。

### 地址、前缀和范围 {#addresses-prefixes-and-ranges}

- 带前缀长度的地址按其网络存储：`203.0.113.77/24` 变为 `203.0.113.0/24`。
- 恰好为一个前缀的 IPv4 范围按该前缀存储：`198.51.100.0-198.51.100.255` 变为 `198.51.100.0/24`。其他范围保持为范围，例如 `198.51.100.10-198.51.100.20`。
- 列表中已有的条目会被拒绝，并提示 `failure: already have such entry`。重叠的条目可以接受，例如一个 /24 和其中的一个地址。
- IPv6 列表接受地址和前缀，但不接受范围：`failure: 2001:db8::1-2001:db8::5 is not a valid dns name`。不带前缀长度的 IPv6 地址按 /128 存储。

:::note
任何不是有效地址的内容都会作为 DNS 名称存储，且不会报错。以简写形式写入的范围（例如 `203.0.113.1-254`）会变成一个永远无法解析的名称，该条目不匹配任何内容。请完整写入范围：`203.0.113.1-203.0.113.254`。
:::

### 域名 {#domain-names}

- 路由器使用自身 DNS 设置（`/ip/dns`）解析名称，并为应答中的每个地址添加一个动态条目，注释为该名称。IPv4 列表获取 A 记录，IPv6 列表获取 AAAA 记录。
- 动态条目不显示超时。当 DNS 记录过期时，路由器会再次解析该名称：发生变化的地址会被替换，其余地址保持不变。
- 列表保存路由器 DNS 服务器返回的内容。如果过滤型 DNS 服务器对某个名称应答 `0.0.0.0`，则列表中会加入 `0.0.0.0`。向其他 DNS 服务器查询的设备可能会获得同一名称的其他地址。
- 由 CDN 或轮询 DNS 提供服务的名称可能在每次查询时返回不同地址，因此基于该名称构建的列表可能遗漏设备使用的地址。当设备使用路由器作为 DNS 服务器时，带 `address-list` 的静态 DNS `FWD` 条目会准确添加路由器应答给它们的地址（请参阅 [在防火墙规则中使用域名](/docs/network-management/dns#use-domain-names-in-firewall-rules)）。
- 保存名称的条目会在 `ADDRESS` 中显示该名称。名称解析后，以该名称为注释的动态条目会随之出现。没有这些动态条目的名称条目表示无法解析，简写范围变成名称时就是这样显示的。
- 删除名称条目会删除它解析出的地址。

## 会添加条目的其他功能 {#other-features-that-add-entries}

- DNS：带有 `address-list` 的静态 DNS 条目会添加路由器针对该名称应答的地址，请参阅[在防火墙规则中使用域名](/docs/network-management/dns#use-domain-names-in-firewall-rules)。
- DHCP server：服务器或租约上的 `address-lists` 会添加绑定租约的地址，请参阅 [`/ip/dhcp-server`](/docs/cli-reference/ip/dhcp-server) 和 [`/ip/dhcp-server/lease`](/docs/cli-reference/ip/dhcp-server/lease)。
- PPP：PPP profile 中的 `address-list` 会添加服务器分配或客户端接收的地址，请参阅[用户配置文件](/docs/authentication-authorization-accounting/ppp-aaa#user-profiles)。

有关所有参数，请参阅 [`/ip/firewall/address-list`](/docs/cli-reference/ip/firewall/address-list) 和 [`/ipv6/firewall/address-list`](/docs/cli-reference/ipv6/firewall/address-list) 的 CLI 参考。
