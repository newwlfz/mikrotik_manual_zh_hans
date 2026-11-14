---
sidebar_key: "firewall-and-quality-of-service/firewall/address-lists"
sidebar_position: 1
title: "地址列表"
sidebar_label: "地址列表"
description: "地址列表将一个名称下的 IP 地址、前缀、范围和 DNS 名称分组，用于防火墙规则。条目可以是静态的、由带超时的规则添加，或从名称解析得到。"
tags:
  - 'address-lists'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/firewall/address-lists
captured_at: '2026-11-04T11:15:39+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

地址列表是一组命名的 IP 地址、前缀，以及（仅限 IPv4）地址范围。filter、NAT、mangle 和 raw 规则通过 `src-address-list` 和 `dst-address-list` 与其匹配，在名称前加 `!` 则匹配不在该列表中的每个地址。这样一条规则就能覆盖多个地址，而你要改变规则适用的对象时，只需修改列表，不必修改规则。

条目来自三个来源：你手动添加、防火墙规则通过 `add-src-to-address-list` 和 `add-dst-to-address-list` 动作添加，以及路由器解析你放入列表的 DNS 名称。IPv4 列表位于 `/ip/firewall/address-list`，IPv6 列表位于 `/ipv6/firewall/address-list`。二者相互独立，即使两个列表中使用了相同的名称也是如此。

## 屏蔽来自地址列表的流量 {#block-traffic-from-a-list-of-addresses}

丢弃来自 WAN 且源地址属于 `blocked` 列表的所有流量。`WAN` 是默认配置中承载互联网端口的接口列表：

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

`/ip/firewall/raw` 中的规则在[连接跟踪](../connection-tracking.md)之前执行，因此这条规则会丢弃从这些地址到达 WAN 的每一个数据包：包括发往路由器自身和转发服务的新连接，也包括你 LAN 内主机向它们发起连接后收到的应答。以后若要屏蔽更多地址，将它们加入列表即可。

要一次添加多条条目，可将多行 `add` 粘贴到终端，或将它们写入 `.rsc` 文件再用 `/import` 导入。`203.0.113.77/24` 与 `203.0.113.0/24` 是同一条目，因此第二次 `add` 会失败并提示 `failure: already have such entry`，导入也会就此停止。

IPv6 地址要加入 IPv6 列表，并在 `/ipv6/firewall/raw` 中使用相同的丢弃规则：

```ros
/ipv6/firewall/address-list/add list=blocked address=2001:db8:bad::/48
/ipv6/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=blocked \
    comment="Drop traffic from blocked addresses"
```

IPv6 主机可以在其 /64 内更换地址。对于 IPv6，应列出整个前缀（/64 或更长），而不要列单个地址。

## 按名称允许来自动态地址的访问 {#allow-access-from-a-dynamic-address-by-name}

远程办公室或家庭连接常常使用会变化的地址。把它的 DNS 名称放入列表，例如办公室路由器的 DDNS 名称，并允许来自它的 SSH 和 WinBox 访问（SSH 为 TCP 端口 22，WinBox 为 TCP 端口 8291）：

```ros
/ip/firewall/address-list/add list=trusted address=office.example.com \
    comment="Office router"
/ip/firewall/filter/add chain=input action=accept protocol=tcp \
    dst-port=22,8291 src-address-list=trusted \
    comment="Allow SSH and WinBox from trusted addresses" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

该规则会排在默认的 `drop all not coming from LAN` 规则之前。若只是简单地执行 `add`，规则会被放在丢弃规则之后，在那里它永远不会匹配。

路由器会解析该名称，并将地址添加为动态条目，条目注释就是该名称：

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

当 DNS 记录过期时，路由器会重新解析该名称并替换已变化的地址，因此规则会跟随办公室的地址。

:::warning
该规则会向所有拥有该名称所解析地址的主机开放 SSH 和 WinBox。请使用只有你能控制的名称。访问权限取决于路由器 DNS 服务器的应答，因此请使用你信任的 DNS 服务器，并保留另一种进入方式，例如 VPN。如果 `/ip/service` 通过 `available-from` 限制了 WinBox 或 SSH，该地址也必须在那里被允许（参见[限制谁可以使用某项服务](../../system-information-and-utilities/services.md#limit-who-can-use-a-service)）。
:::

## 屏蔽探测关闭端口的主机 {#block-hosts-that-probe-a-closed-port}

试图访问你 WAN 地址上 Telnet 的主机通常是在扫描弱设备。将这类主机列入列表一天并丢弃其全部流量，包括发往你转发到 LAN 的服务的流量：

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

第一条规则将源地址加入 `port-scanners`，并把数据包交给下一条规则。此后，第二条规则会丢弃来自该主机的每一个数据包，直到超时结束。每次新的探测都会把超时重置为整整一天。

一个数据包就足以把它的源地址列入列表，而数据包的源地址是可以伪造的。请把依赖的地址（例如你的 DNS 服务器、VPN 对端和办公室）放入上一节中的 `trusted` 列表：`src-address-list=!trusted` 会使第一条规则跳过它们。

```ros
[admin@MikroTik] > /ip/firewall/address-list/print where list=port-scanners
Flags: D - DYNAMIC
Columns: LIST, ADDRESS, CREATION-TIME, TIMEOUT
#   LIST           ADDRESS        CREATION-TIME        TIMEOUT
2 D port-scanners  198.51.100.23  2026-10-01 08:50:30  23h59m55s
```

带超时的条目是动态的（`D`）：它们不会被保存到配置中，重启后即被清除。扫描者还会再来，因此列表会再次被填满。`address-list-timeout=none-static` 可以让条目在重启后保留，但这样一来列表会随着每个扫描者不断增长，直到你手动删除条目，而且每个新条目都会改动已保存的配置。

若需要仅在多次尝试后才将主机列入列表的规则，请参见 [SSH 暴力破解防护](../user-guides/bruteforce-prevention.md)和[端口敲门](../user-guides/port-knocking.md)，后者只在经过一段秘密的连接尝试序列后才会开放端口。

## 查看、删除和导出条目 {#view-remove-and-export-entries}

显示列表，或仅统计其条目数量：

```ros
/ip/firewall/address-list/print where list=port-scanners
/ip/firewall/address-list/print count-only where list=port-scanners
```

删除单条条目：

```ros
/ip/firewall/address-list
remove [find list=port-scanners address=198.51.100.23]
```

要把列表复制到另一台路由器，请将其导出到文件。`file=` 要写在 `where` 之前，因为 `where` 会把命令余下的部分当作其条件。若把 `file=` 放在其后，导出内容会打印到终端，而不会写入文件。

```ros
/ip/firewall/address-list/export file=blocked where list=blocked
```

文件 `blocked.rsc` 包含该列表的静态条目。动态条目不会被导出。

```ros
/ip firewall address-list
add address=203.0.113.0/24 comment="Abuse reports" disabled=no dynamic=no \
    list=blocked
add address=198.51.100.7 disabled=no dynamic=no list=blocked
```

用 WinBox 中的 **Files**（参见[在 WinBox 中管理文件](../../system-information-and-utilities/files.md#manage-files-in-winbox)）或使用 `scp` 把文件复制到另一台路由器，然后导入：

```ros
/import blocked.rsc
```

该文件只包含条目：另一台路由器上的丢弃规则也需要另外添加。导入会在遇到第一个已存在于列表中的地址时停止，并提示 `failure: already have such entry`。若以后要更新另一台路由器上的列表，请先删除其条目（该列表不含 DNS 名称），再导入新文件：

```ros
/ip/firewall/address-list/remove [find list=blocked]
/import blocked.rsc
```

要清空含有 DNS 名称的列表，请分两步删除：

```ros
/ip/firewall/address-list/remove [find list=trusted !dynamic]
/ip/firewall/address-list/remove [find list=trusted]
```

第一条命令删除静态条目；删除名称条目也会同时删除它解析出的地址。第二条命令删除由规则添加的动态条目。只执行一次 `remove [find list=trusted]` 也会选中该名称对应的地址，并且在名称被删除后会以 `no such item` 停止。

## 条目的行为 {#how-entries-behave}

### 静态条目与动态条目 {#static-and-dynamic-entries}

| 条目的创建方式 | 标志 | 是否保存到配置和导出 | 重启后 |
| :-- | :-- | :-- | :-- |
| 不带 `timeout` 的 `add` |  | yes | 保留 |
| 使用 `address-list-timeout=none-static` 的规则 |  | yes | 保留 |
| 带 `timeout` 或 `dynamic=yes` 的 `add` | `D` | no | 丢失 |
| 带时间或 `address-list-timeout=none-dynamic` 的规则 | `D` | no | 丢失 |
| 由 DNS 名称解析出的地址 | `D` | 否，但名称条目会保存 | 名称条目保留 |

静态条目在重启后保留其 `creation-time`。由 DNS 和 DHCP 服务器添加的条目也是动态的。

### 超时 {#timeouts}

最长超时为 `35w3d13h13m56s`。更长的超时会导致失败并提示 `value of timeout is out of range (00:00:00 .. 35w3d13:13:56)`。

当规则匹配到列表中已存在的地址时，会重置该条目的超时。若该地址在该列表中已是静态条目，则该条目保持静态，不会被设置超时。

### 地址、前缀和范围 {#addresses-prefixes-and-ranges}

- 带前缀长度的地址会按其网络存储：`203.0.113.77/24` 变为 `203.0.113.0/24`。
- 恰好等于一个前缀的 IPv4 范围会存储为该前缀：`198.51.100.0-198.51.100.255` 变为 `198.51.100.0/24`。其他范围仍保持为范围，例如 `198.51.100.10-198.51.100.20`。
- 已存在于列表中的条目会被拒绝并提示 `failure: already have such entry`。重叠的条目会被接受，例如一个 /24 和其中的某个地址。
- IPv6 列表接受地址和前缀，但不接受范围：会提示 `failure: 2001:db8::1-2001:db8::5 is not a valid dns name`。不带前缀长度的 IPv6 地址会按 /128 存储。

:::note
任何不是有效地址的内容都会被当作 DNS 名称存储，且不会报错。用简写形式写的范围（例如 `203.0.113.1-254`）会变成一个永远无法解析的名称，该条目不会匹配任何内容。请完整写出范围：`203.0.113.1-203.0.113.254`。
:::

### 域名 {#domain-names}

- 路由器使用自己的 DNS 设置（`/ip/dns`）解析名称，并为应答中的每个地址添加一条动态条目，条目注释为该名称。IPv4 列表获取 A 记录，IPv6 列表获取 AAAA 记录。
- 动态条目不显示超时。当 DNS 记录过期时，路由器会重新解析该名称：已变化的地址被替换，其余保持不变。
- 列表保存的是路由器 DNS 服务器所应答的内容。若过滤型 DNS 服务器对某个名称应答 `0.0.0.0`，列表中就会放入 `0.0.0.0`。若某设备使用其他 DNS 服务器，则可能为同一名称得到其他地址。
- 由 CDN 或轮询 DNS 提供服务的名称在每次查询时可能返回不同地址，因此由该名称构建的列表可能遗漏设备实际使用的地址。当这些设备使用路由器作为其 DNS 服务器时，带 `address-list` 的静态 DNS `FWD` 条目会准确添加路由器向它们应答的地址（参见[在防火墙规则中使用域名](../../network-management/dns.md#use-domain-names-in-firewall-rules)）。
- 保存名称的条目会在 `ADDRESS` 中显示该名称。当名称解析成功后，以其为注释的动态条目会随之出现。若没有这些动态条目，则该名称条目未解析成功，简写形式范围变成名称的情况就是这样显现的。
- 删除名称条目会同时删除它解析出的地址。

## 其他可添加条目的功能 {#other-features-that-add-entries}

- DNS：带 `address-list` 的静态 DNS 条目会添加路由器为该名称应答的地址，参见[在防火墙规则中使用域名](../../network-management/dns.md#use-domain-names-in-firewall-rules)。
- DHCP 服务器：服务器上或租约上的 `address-lists` 会添加已绑定租约的地址，参见 [`/ip/dhcp-server`](../../cli-reference/ip/dhcp-server/index.md) 和 [`/ip/dhcp-server/lease`](../../cli-reference/ip/dhcp-server/lease/index.md)。
- PPP：PPP 配置文件中的 `address-list` 会添加服务器分配的地址或客户端收到的地址，参见[用户配置文件](../../authentication-authorization-accounting/ppp-aaa.md#user-profiles)。

有关所有参数，请参见 [`/ip/firewall/address-list`](../../cli-reference/ip/firewall/address-list.md) 和 [`/ipv6/firewall/address-list`](../../cli-reference/ipv6/firewall/address-list.md) 的 CLI 参考。
