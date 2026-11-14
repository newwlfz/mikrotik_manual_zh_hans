---
sidebar_key: "network-management/dns"
sidebar_position: 3
title: "DNS"
sidebar_label: "DNS"
description: "RouterOS DNS 解析器：将路由器用作网络的 DNS 服务器，检查并排查其问题，添加本地名称，将域名发送到其他服务器，在防火墙中使用域名，使用 adlists 拦截广告，使用 DNS over HTTPS，并在网络之间中继 mDNS。"
tags:
  - 'dns'
  - 'doh'
  - 'adlist'
  - 'mdns'
source: https://manual.mikrotik.com/docs/7.25/network-management/dns
captured_at: '2026-11-04T11:21:10+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 具有缓存 DNS 解析器。路由器将其用于自身的查找，并且它可以作为网络中设备的 DNS 服务器：它向上游 DNS 服务器（例如 ISP 的服务器）发起查询，并将它们的应答保存在缓存中。

在默认配置下，这已经可以正常工作，无需更改任何内容。以下各节介绍设置方法、检查方法以及额外任务，例如本地名称和广告拦截。这些附加功能仅适用于将路由器用作其 DNS 服务器的设备：从 DHCP 获取其他 DNS 服务器（例如 1.1.1.1）的设备会绕过路由器的静态条目和广告列表。

## 将路由器用作网络的 DNS 服务器 {#use-the-router-as-the-dns-server-for-your-network}

默认配置已经执行此操作。要自行设置：

1. 允许路由器应答网络中的设备：

   ```ros
   /ip/dns/set allow-remote-requests=yes
   ```

2. 将路由器地址作为 DNS 服务器提供给 DHCP 客户端：在 `/ip/dhcp-server/network` 中设置 `dns-server`，例如设置为 192.168.88.1（参见 [DHCP 服务器](./dhcp/server.md)）。

路由器从其他服务获取上游服务器，例如通过 WAN 端口上的 DHCP 客户端从 ISP 获取。它们会在 `/ip/dns/print` 中显示为 `dynamic-servers`。要使用其他上游服务器，请在 `servers` 中设置它们。路由器会先尝试它们，再尝试动态服务器：

```ros
/ip/dns/set servers=1.1.1.1,9.9.9.9
```

使用 `allow-remote-requests=yes` 时，路由器会在其所有地址的 UDP 和 TCP 端口 53 上应答 DNS 查询。默认防火墙会丢弃来自互联网的这些查询。如果使用自己的防火墙规则，也请丢弃它们，以免路由器成为互联网上任何人都能使用的开放解析器：

```ros
/ip/firewall/filter/add chain=input in-interface-list=WAN protocol=udp dst-port=53 action=drop comment="drop DNS from WAN"
/ip/firewall/filter/add chain=input in-interface-list=WAN protocol=tcp dst-port=53 action=drop comment="drop DNS from WAN"
```

## 检查与故障排除 {#check-and-troubleshoot}

要在路由器本身上测试名称：

```ros
:put [:resolve mikrotik.com]
```

要从网络中的计算机将路由器作为 DNS 服务器进行测试，请直接向它查询，例如使用 `nslookup mikrotik.com 192.168.88.1`。

DNS 服务器的应答具有状态：

- `NOERROR`：名称存在。当该名称没有所请求类型的记录时，应答仍可能不包含任何记录。
- `NXDOMAIN`：名称不存在。
- `SERVFAIL`：路由器无法获得应答，例如因为没有上游服务器及时应答。

路由器会按其生存时间（TTL）将应答保存在缓存中。要查看缓存的应答，或在更改后清空缓存：

```ros
/ip/dns/cache/print
/ip/dns/cache/flush
```

路由器会在 `dns` 主题中记录 DNS 错误，例如关于 DoH 服务器或广告列表导入的错误：

```ros
/log/print where topics~"dns"
```

如果设备完全得不到应答，请检查 `allow-remote-requests` 和防火墙规则。如果某个名称解析为 `0.0.0.0`，则广告列表在路由器上或上游服务器上阻止了它。

## 本地名称 {#local-names}

静态条目由路由器自身应答名称，例如用于网络中的设备：

```ros
[admin@MikroTik] > /ip/dns/static/add name=nas.lan address=192.168.88.20
[admin@MikroTik] > /ip/dns/static/add name=printer.lan address=192.168.88.21
[admin@MikroTik] > /ip/dns/static/add name=example.lan address=192.168.88.30 match-subdomain=yes
[admin@MikroTik] > /ip/dns/static/print
Columns: NAME, TYPE, ADDRESS, TTL
# NAME         TYPE  ADDRESS        TTL
0 nas.lan      A     192.168.88.20  1d
1 printer.lan  A     192.168.88.21  1d
2 example.lan  A     192.168.88.30  1d
```

- IPv6 地址会生成 AAAA 条目。
- 路由器还会应答这些地址的反向查找（PTR）。
- 使用 `match-subdomain=yes` 时，条目会为该名称及其下的每个名称应答，例如 `www.example.lan`。

当 DHCP 服务器和 IP 邻居发现功能的 `add-dns-entries` 设置开启时，它们会自动添加静态条目，并标记为 `D`（动态）。参见 [DHCP 服务器](./dhcp/server.md) 和 [`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md)。

## 将域发送到另一台 DNS 服务器 {#send-a-domain-to-another-dns-server}

`FWD` 条目会将针对某个名称的查询发送到另一台 DNS 服务器，而不是正常的上游服务器，例如将公司网络的名称发送到公司的 DNS 服务器：

```ros
/ip/dns/static/add name=corp.example.com type=FWD forward-to=10.0.0.53 match-subdomain=yes
```

`forward-to` 接受 IP 地址、DNS 名称或转发器的名称。没有 `forward-to` 时，`FWD` 条目会将查询发送到正常的上游服务器。

转发器是用于 `FWD` 条目的 DNS 和 DoH 服务器的命名组。路由器会依次将每个查询发送到组中的下一台服务器：

```ros
/ip/dns/forwarders/add name=branch dns-servers=10.1.0.53,10.1.1.53
/ip/dns/static/add name=branch.example.com type=FWD forward-to=branch match-subdomain=yes
```

路由器不会跳过转发器中停止应答的服务器：到达该服务器的查询会失败。只添加可正常工作的服务器。

## 在防火墙规则中使用域名 {#use-domain-names-in-firewall-rules}

使用 `address-list` 时，路由器会将其为某个条目应答的地址添加到防火墙地址列表。对于 `FWD` 条目，这些是上游应答中的地址：

```ros
/ip/dns/static/add name=example.com type=FWD address-list=example-com match-subdomain=yes
```

网络中的设备通过路由器查找 `example.com` 后，列表将包含应答中的地址：

```ros
[admin@MikroTik] > /ip/firewall/address-list/print where list=example-com
Flags: D - DYNAMIC
Columns: LIST, ADDRESS, CREATION-TIME
#   LIST         ADDRESS        CREATION-TIME
;;; created for example.com.
0 D example-com  198.51.100.10  2026-09-24 12:32:52
;;; created for example.com.
1 D example-com  198.51.100.11  2026-09-24 12:32:52
```

在防火墙规则中使用该列表，或在 mangle 规则中使用它来以不同方式路由某个域的流量（参见 [策略路由](../user-guides/routing-and-networking-protocols/policy-routing.md)）。当应答的 TTL 过去后，再加上 `/ip/dns` 中的 `address-list-extra-time`，路由器会移除条目。只有设备的查询会添加条目。路由器自身的查找（例如使用 `:resolve`）不会添加。

## 使用广告列表拦截广告 {#block-ads-with-adlists}

广告列表是一组域名列表，例如广告和跟踪服务器，路由器会阻止这些域名。它对这些名称的 A 查询返回 `0.0.0.0`，对 AAAA 查询返回 `::`，因此设备无法访问它们。

路由器会将广告列表保存在 DNS 缓存中，因此请在添加列表前提高 `cache-size`。约 75 000 个名称的列表需要约 6 MiB；示例也为正常缓存留出了空间：

```ros
[admin@MikroTik] > /ip/dns/set cache-size=16384
[admin@MikroTik] > /ip/dns/adlist/add url=https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
[admin@MikroTik] > /ip/dns/adlist/print
0  url="https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts"
   match-count=0 name-count=76524
```

`name-count` 显示路由器导入了多少个名称，`match-count` 显示该列表拦截了多少个查询。

当缓存太小时，路由器会停止导入并记录 `adlist read: max cache size reached`。之后提高 `cache-size` 不会补全列表。请移除该广告列表并重新添加。

广告列表也可以是路由器上的文件，每行一个名称，采用 hosts 文件格式或纯名称：

```ros
/file/add name=adlist.txt contents="0.0.0.0 ads.example.net\ntracker.example.net\n"
/ip/dns/adlist/add file=adlist.txt
```

要停止阻止某个名称，请为其添加 `FWD` 条目。路由器随后会将其查询发送到上游服务器：

```ros
/ip/dns/static/add name=ads.example.net type=FWD
```

要暂时停止所有广告列表，例如停止 10 分钟：

```ros
/ip/dns/adlist/pause duration=10m
```

[视频：Adlist 设置](https://youtube.com/watch?v=RMJnjyAOfLI)

## DNS over HTTPS {#dns-over-https}

使用 DNS over HTTPS（DoH）时，路由器会通过 HTTPS 将其上游查询加密发送到一台 DoH 服务器：

```ros
/ip/dns/set use-doh-server=https://cloudflare-dns.com/dns-query verify-doh-cert=yes
```

保留 `servers` 或 `dynamic-servers`，或为 DoH 服务器的主机名添加静态条目：路由器会通过其正常 DNS 服务器查找该名称。使用 `verify-doh-cert=yes` 时，路由器会根据内置信任存储和 `/certificate` 中的证书检查服务器证书（参见 [证书](../authentication-authorization-accounting/certificates.md#built-in-trust-store-authorities)）。

某些 DoH 服务需要 HTTP/2，只有 ARM64 和 x86 设备（包括 CHR）支持：

- Cloudflare、Control D、Google、NextDNS 和 OpenDNS 可在所有设备上工作。
- Mullvad、Quad9 和 UncensoredDNS 仅在 ARM64 和 x86 设备上工作。

设置 DoH 服务器后，路由器会将所有上游查询发送到它，并且不会回退到正常 DNS 服务器。无法访问 DoH 服务器时，设备会得到 `SERVFAIL`。`FWD` 条目会继续使用它们自己的服务器。

[视频：DoH 设置](https://youtube.com/watch?v=w4erB0VzyIE)

## 更多记录类型和正则表达式 {#more-record-types-and-regular-expressions}

静态条目还可以包含其他记录类型：

- `CNAME` 为名称提供别名。路由器会将其与目标的地址一起应答，目标地址可以来自静态条目或上游：`/ip/dns/static/add name=files.lan type=CNAME cname=nas.lan`。
- `NXDOMAIN` 使名称不存在，适用于所有记录类型：`/ip/dns/static/add name=tracker.example.com type=NXDOMAIN`。
- `MX` 指定域的邮件服务器：`/ip/dns/static/add name=lan type=MX mx-exchange=mail.lan mx-preference=10`。
- `TXT` 保存文本：`/ip/dns/static/add name=lan type=TXT text="managed by RouterOS"`。

要使用一个条目匹配多个名称，请使用正则表达式代替 `name`：

```ros
/ip/dns/static/add regexp="^host[0-9]+\\.lan\$" address=192.168.88.40
```

路由器会以小写形式将表达式与名称匹配，因此请使用小写编写。在命令行中，反斜杠写作 `\\`，`$` 写作 `\$`：上面的条目存储为 `^host[0-9]+\.lan$`。

为每个名称和记录类型只创建一个条目。当多个条目匹配同一个名称时，例如一个带有 `match-subdomain=yes` 的条目和一个针对其下名称的条目，列表顺序并不决定由哪个条目应答。

## mDNS 中继器 {#mdns-repeater}

多播 DNS（mDNS）使设备能够在本地网络中相互发现，例如打印机（AirPrint）、媒体播放器（AirPlay、Chromecast）和智能家居设备。mDNS 停留在单个网络中。mDNS 中继器会在你列出的接口之间转发它，因此不同网络或 VLAN 中的设备可以相互发现：

```ros
/ip/dns/set mdns-repeat-ifaces=bridge,vlan20
```

使用承载多播的接口，例如 Ethernet、VLAN、bridge 或 EoIP 接口。中继会向每个列出的网络添加多播流量。

路由器自身接收 mDNS 数据包，因此它们会经过防火墙的 input 链。默认防火墙会在 `LAN` 接口列表中的接口上接受它们。如果你的 input 规则在某个列出的接口上丢弃 UDP 端口 5353，例如某个不在 `LAN` 中的 VLAN，请在丢弃流量的规则之前添加此规则：

```ros
/ip/firewall/filter/add chain=input protocol=udp dst-port=5353 action=accept comment="accept mDNS"
```

## 技术细节 {#technical-details}

### 路由器如何应答查询 {#how-the-router-answers-a-query}

路由器的应答取决于该名称存在的条目：

| 该名称的条目 | 应答 |
| :-- | :-- |
| 无 | 来自缓存或上游服务器。 |
| 静态条目，例如 A | 来自该条目，针对其记录类型。其他记录类型来自上游；当上游没有时，路由器返回不带记录的 `NOERROR`。 |
| 名称位于广告列表中 | A 返回 `0.0.0.0`，AAAA 返回 `::`，即使存在静态 A 或 AAAA 条目也是如此。其他记录类型来自上游。 |
| `FWD` 条目 | 来自 `forward-to` 服务器，或来自上游服务器。广告列表不适用。 |
| `FWD` 和 A 条目 | 来自 A 条目。 |
| `NXDOMAIN` 条目 | 对所有记录类型返回 `NXDOMAIN`。 |

名称以小写形式匹配。缓存使用剩余 TTL 应答。

### 上游服务器 {#upstream-servers}

- 路由器会先按顺序尝试静态 `servers`，然后尝试 `dynamic-servers`，例如启用了 `use-peer-dns=yes` 的 DHCP 客户端的服务器。
- 路由器会等待 `query-server-timeout` 以获得应答，然后才尝试下一台服务器。当某台服务器应答后，路由器会在后续查询中继续使用它。
- 当没有服务器在 `query-total-timeout` 内应答时，设备会得到 `SERVFAIL`。
- 当有 `max-concurrent-queries` 个查询正在等待上游应答时，路由器会丢弃新查询，包括它本可以从缓存应答的查询，直到其中一个等待的查询完成。
- `/ip/dns` 中的更改会立即生效。此时到达的查询可能保持未应答，设备会再次发送它。缓存会保留。

### 缓存 {#cache}

- `cache-max-ttl` 限制上游应答的 TTL。静态条目使用自己的 `ttl`，默认为 1 天。
- 广告列表会计入 `cache-size`：每个名称需要约 75 字节。
- `/ip/dns/cache` 列出路由器给出的应答。`/ip/dns/cache/all` 还会列出它保存的其他记录，例如静态条目的 PTR 记录。正则表达式条目没有 PTR 记录。

### 广告列表 {#adlists}

- 每行包含一个名称，可以单独出现，也可以像 hosts 文件那样位于地址（`0.0.0.0`、`127.0.0.1` 或 `::1`）之后。以 `#` 开头的行和行尾部分都是注释。名称必须为小写，不支持诸如 `*.example.com` 的通配符。
- 仅阻止列出的名称，而不阻止其下的名称。被阻止的应答 TTL 为 2 秒。
- 路由器会验证 HTTPS 广告列表 URL 的证书（`ssl-verify=yes`）。对于使用自签名证书的服务器，请将其 CA 证书导入 `/certificate`，或设置 `ssl-verify=no`。
- 路由器每 4 小时检查所有列表是否有更改；`/ip/dns/adlist/reload` 会立即检查它们。路由器会将列表存储在其磁盘上。
- 一台路由器最多可以有 64 个广告列表。

### DNS over HTTPS {#dns-over-https-1}

- 路由器会保持一条到 DoH 服务器的 HTTPS 连接（TCP 端口 443），并通过它发送所有查询。
- 在 ARM64 和 x86 设备上，当服务器支持时，路由器使用 HTTP/2。其他设备使用 HTTP/1.1。
- DoH 错误会记录在 `dns` 主题中，例如 `DoH server connection error: timeout connecting`。

### 转发器 {#forwarders}

- 转发器的服务器会在 `dns-servers` 和 `doh-servers` 之间轮流处理查询，每次一个。发送到不应答服务器的查询会在 `query-total-timeout` 后失败。
- 对于转发器，`verify-doh-cert` 默认开启，这一点与 `/ip/dns` 中不同。

### VRF {#vrf}

- 解析器会应答 `vrf` 中所设置 VRF 内的设备，默认为 `main`。其他 VRF 中的设备得不到应答。
- 上游服务器通过主路由表访问。要访问另一个 VRF 中的服务器，请将其写为 `address@vrf`，例如 `servers=10.0.0.1@vrf1`。

### mDNS 中继器 {#mdns-repeater-1}

- 路由器中继 IPv4 mDNS（UDP 端口 5353 到 224.0.0.251），并在其他接口上从其自身地址发送这些数据包。IPv6 mDNS（ff02::fb）不会中继。
- 诸如 WireGuard 的三层隧道不承载多播，因此无法通过它们中继 mDNS。

有关所有属性，请参见 CLI 参考中的 [`/ip/dns`](../cli-reference/ip/dns/index.md)、[`/ip/dns/static`](../cli-reference/ip/dns/static.md)、[`/ip/dns/adlist`](../cli-reference/ip/dns/adlist/index.md) 和 [`/ip/dns/forwarders`](../cli-reference/ip/dns/forwarders.md)。
