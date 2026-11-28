---
title: "DNS"
description: "RouterOS DNS 解析器：将路由器用作网络的 DNS 服务器，检查和排查 DNS 问题，添加本地名称，将域名发送到其他服务器，在防火墙中使用域名，通过 adlist 屏蔽广告，使用 DNS over HTTPS，并在网络之间重复 mDNS。"
tags:
  - 'dns'
  - 'doh'
  - 'adlist'
  - 'mdns'
source: https://manual.mikrotik.com/docs/7.25/network-management/dns
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 提供缓存 DNS 解析器。路由器将其用于自身的查询，也可以作为网络中设备的 DNS 服务器：它向上游 DNS 服务器（例如 ISP 提供的服务器）发起查询，并将应答保存在缓存中。

使用默认配置时，该功能已经可用，无需更改任何设置。以下各节介绍配置方法、检查方式，以及本地名称和广告拦截等额外任务。这些额外功能仅适用于将路由器用作 DNS 服务器的设备：通过 DHCP 获取其他 DNS 服务器（例如 1.1.1.1）的设备会绕过路由器的静态条目和广告列表。

## 将路由器用作网络的 DNS 服务器 {#use-the-router-as-the-dns-server-for-your-network}

默认配置已经完成此设置。如需自行配置：

1. 允许路由器应答网络中的设备：

   ```ros
   /ip/dns/set allow-remote-requests=yes
   ```

2. 将路由器地址作为 DNS 服务器提供给 DHCP 客户端：在 `/ip/dhcp-server/network` 中设置 `dns-server`，例如设置为 192.168.88.1（请参阅 [DHCP server](/docs/network-management/dhcp/server)）。

路由器会从其他服务获取上游服务器，例如通过 WAN 端口上的 DHCP 客户端从 ISP 获取。这些服务器会显示为 `/ip/dns/print` 中的 `dynamic-servers`。如需使用其他上游服务器，请在 `servers` 中设置。路由器会先尝试这些服务器，再尝试动态服务器：

```ros
/ip/dns/set servers=1.1.1.1,9.9.9.9
```

使用 `allow-remote-requests=yes` 时，路由器会在其所有地址的 UDP 和 TCP 端口 53 上应答 DNS 查询。默认防火墙会丢弃来自互联网的那些查询。如果使用自定义防火墙规则，也请丢弃这些查询，以免路由器成为互联网上任何人都可使用的开放解析器：

```ros
/ip/firewall/filter/add chain=input in-interface-list=WAN protocol=udp dst-port=53 action=drop comment="drop DNS from WAN"
/ip/firewall/filter/add chain=input in-interface-list=WAN protocol=tcp dst-port=53 action=drop comment="drop DNS from WAN"
```

## 检查和故障排除 {#check-and-troubleshoot}

要在路由器本身测试名称：

```ros
:put [:resolve mikrotik.com]
```

要从网络中的计算机测试作为 DNS 服务器的路由器，请直接查询它，例如使用 `nslookup mikrotik.com 192.168.88.1`。

DNS 服务器的响应包含状态：

- `NOERROR`：名称存在。即使名称没有所请求类型的记录，响应中仍可能不包含任何记录。
- `NXDOMAIN`：名称不存在。
- `SERVFAIL`：路由器无法获得响应，例如因为没有上游服务器及时应答。

路由器会在缓存中保留响应，保留时间由其生存时间（TTL）决定。要查看缓存的响应，或在更改后清空缓存：

```ros
/ip/dns/cache/print
/ip/dns/cache/flush
```

路由器会在 `dns` 主题中记录 DNS 错误，例如与 DoH 服务器或 adlist 导入相关的错误：

```ros
/log/print where topics~"dns"
```

如果设备完全得不到响应，请检查 `allow-remote-requests` 和防火墙规则。如果某个名称解析为 `0.0.0.0`，则说明 adlist 阻止了该名称，阻止位置可能是路由器或上游服务器。

## 本地名称 {#local-names}

静态条目由路由器自身应答名称，例如网络中的设备：

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

- IPv6 地址生成 AAAA 条目。
- 路由器还会对这些地址应答反向查询（PTR）。
- 使用 `match-subdomain=yes` 时，条目会应答该名称及其下的所有名称，例如 `www.example.lan`。

当 DHCP 服务器和 IP 邻居发现的 `add-dns-entries` 设置开启时，它们会自动添加静态条目，并标记为 `D`（动态）。请参阅 [DHCP 服务器](/docs/network-management/dhcp/server) 和 [`/ip/neighbor/discovery-settings`](/docs/cli-reference/ip/neighbor/discovery-settings)。

## 将域名发送到其他 DNS 服务器 {#send-a-domain-to-another-dns-server}

`FWD` 条目会将某个名称的查询发送到其他 DNS 服务器，而不是正常的上游服务器，例如将公司网络的名称发送到公司的 DNS 服务器：

```ros
/ip/dns/static/add name=corp.example.com type=FWD forward-to=10.0.0.53 match-subdomain=yes
```

`forward-to` 接受 IP 地址、DNS 名称或转发器的名称。没有 `forward-to` 时，`FWD` 条目会将查询发送到正常的上游服务器。

转发器是供 `FWD` 条目使用的 DNS 和 DoH 服务器命名组。路由器会将每个查询依次发送到组中的下一个服务器：

```ros
/ip/dns/forwarders/add name=branch dns-servers=10.1.0.53,10.1.1.53
/ip/dns/static/add name=branch.example.com type=FWD forward-to=branch match-subdomain=yes
```

路由器不会跳过停止响应的转发器服务器：到达该服务器的查询会失败。仅添加可正常工作的服务器。

## 在防火墙规则中使用域名 {#use-domain-names-in-firewall-rules}

使用 `address-list` 时，路由器会将某个条目应答中的地址添加到防火墙地址列表中。对于 `FWD` 条目，这些地址是上游应答中的地址：

```ros
/ip/dns/static/add name=example.com type=FWD address-list=example-com match-subdomain=yes
```

当网络中的设备通过路由器查询 `example.com` 后，该列表会保存应答中的地址：

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

可在防火墙规则中使用该列表，或在 mangle 规则中使用该列表，以采用不同方式路由某个域名的流量（请参阅[策略路由](/docs/user-guides/routing-and-networking-protocols/policy-routing)）。当应答的 TTL 到期，再加上 `/ip/dns` 中的 `address-list-extra-time` 后，路由器会移除相应条目。只有设备的查询会添加条目。路由器自身的查询（例如使用 `:resolve` 的查询）不会添加条目。

## 使用 adlist 屏蔽广告 {#block-ads-with-adlists}

adlist 是域名列表，例如广告和跟踪服务器列表，路由器会屏蔽这些域名。它会将这些名称的 A 查询应答为 `0.0.0.0`，将 AAAA 查询应答为 `::`，因此设备无法访问它们。

路由器将 adlist 保存在 DNS 缓存中，因此请先增大 `cache-size`，再添加列表。约 75 000 个名称的列表需要约 6 MiB；以下示例也为正常缓存留出了空间：

```ros
[admin@MikroTik] > /ip/dns/set cache-size=16384
[admin@MikroTik] > /ip/dns/adlist/add url=https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
[admin@MikroTik] > /ip/dns/adlist/print
0  url="https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts"
   match-count=0 name-count=76524
```

`name-count` 显示路由器导入了多少名称，`match-count` 显示列表阻止了多少查询。

当缓存过小时，路由器会停止导入并记录 `adlist read: max cache size reached`。之后提高 `cache-size` 不会完成该列表。请删除该 adlist 并重新添加。

adlist 也可以是路由器上的文件，每行一个名称，采用 hosts 文件格式或纯名称格式：

```ros
/file/add name=adlist.txt contents="0.0.0.0 ads.example.net\ntracker.example.net\n"
/ip/dns/adlist/add file=adlist.txt
```

要停止阻止某个名称，请为其添加 `FWD` 条目。路由器随后会将其查询发送到上游服务器：

```ros
/ip/dns/static/add name=ads.example.net type=FWD
```

要暂时停止所有 adlist，例如 10 分钟：

```ros
/ip/dns/adlist/pause duration=10m
```

[Video: Adlist setup](https://youtube.com/watch?v=RMJnjyAOfLI)

## 基于 HTTPS 的 DNS {#dns-over-https}

使用 DNS over HTTPS（DoH）时，路由器会通过 HTTPS 将上游查询加密发送到一台 DoH 服务器：

```ros
/ip/dns/set use-doh-server=https://cloudflare-dns.com/dns-query verify-doh-cert=yes
```

保留 `servers` 或 `dynamic-servers`，或为 DoH 服务器的主机名添加静态条目：路由器会通过其常规 DNS 服务器查询该名称。使用 `verify-doh-cert=yes` 时，路由器会根据内置信任存储和 `/certificate` 中的证书检查服务器证书（请参阅 [Certificates](/docs/authentication-authorization-accounting/certificates#built-in-trust-store-authorities)）。

某些 DoH 服务需要 HTTP/2，只有 ARM64 和 x86 设备（包括 CHR）支持：

- Cloudflare、Control D、Google、NextDNS 和 OpenDNS 可在所有设备上使用。
- Mullvad、Quad9 和 UncensoredDNS 仅可在 ARM64 和 x86 设备上使用。

设置 DoH 服务器后，路由器会将所有上游查询发送给它，不会回退到普通 DNS 服务器。当无法访问 DoH 服务器时，设备会收到 `SERVFAIL`。`FWD` 条目继续使用各自的服务器。

[Video: DoH setup](https://youtube.com/watch?v=w4erB0VzyIE)

## 更多记录类型和正则表达式 {#more-record-types-and-regular-expressions}

静态条目也可以包含其他记录类型：

- `CNAME` 为名称提供别名。路由器会将其与目标地址一起应答，目标地址可以来自静态条目或上游：`/ip/dns/static/add name=files.lan type=CNAME cname=nas.lan`。
- `NXDOMAIN` 使某个名称对所有记录类型都不存在：`/ip/dns/static/add name=tracker.example.com type=NXDOMAIN`。
- `MX` 指定域名的邮件服务器：`/ip/dns/static/add name=lan type=MX mx-exchange=mail.lan mx-preference=10`。
- `TXT` 保存文本：`/ip/dns/static/add name=lan type=TXT text="managed by RouterOS"`。

要用一个条目匹配多个名称，请使用正则表达式代替 `name`：

```ros
/ip/dns/static/add regexp="^host[0-9]+\\.lan\$" address=192.168.88.40
```

路由器会将表达式与小写形式的名称进行匹配，因此请使用小写编写。在命令行中，反斜杠写为 `\\`，`$` 写为 `\$`：上面的条目存储为 `^host[0-9]+\.lan$`。

为每个名称和记录类型仅创建一个条目。当多个条目匹配同一名称时，例如一个带有 `match-subdomain=yes` 的条目和一个针对其下级名称的条目，列表顺序不会决定由哪个条目应答。

## mDNS 中继器 {#mdns-repeater}

多播 DNS（mDNS）使设备能够在本地网络中相互发现，例如打印机（AirPrint）、媒体播放器（AirPlay、Chromecast）和智能家居设备。mDNS 仅停留在同一网络内。mDNS 中继器会在你列出的接口之间转发它，使不同网络或 VLAN 中的设备能够相互发现：

```ros
/ip/dns/set mdns-repeat-ifaces=bridge,vlan20
```

使用承载多播的接口，例如 Ethernet、VLAN、bridge 或 EoIP 接口。中继会向每个列出的网络增加多播流量。

路由器自身接收 mDNS 数据包，因此这些数据包会经过防火墙的 input 链。默认防火墙会在 `LAN` 接口列表中的接口上接受这些数据包。如果你的 input 规则丢弃某个已列出接口上的 UDP 端口 5353，例如不属于 `LAN` 的 VLAN，请在丢弃流量的规则之前添加以下规则：

```ros
/ip/firewall/filter/add chain=input protocol=udp dst-port=5353 action=accept comment="accept mDNS"
```

## 技术细节 {#technical-details}

### 路由器如何应答查询 {#how-the-router-answers-a-query}

路由器应答的内容取决于该名称存在的条目：

| 名称的条目 | 应答 |
| :-- | :-- |
| 无 | 来自缓存或上游服务器。 |
| 静态条目，例如 A | 来自该条目，对应其记录类型。其他记录类型来自上游；当上游没有记录时，路由器应答 `NOERROR`，但不带记录。 |
| 广告列表中的名称 | A 返回 `0.0.0.0`，AAAA 返回 `::`，即使存在静态 A 或 AAAA 条目也是如此。其他记录类型来自上游。 |
| `FWD` 条目 | 来自 `forward-to` 服务器，或来自上游服务器。广告列表不适用。 |
| `FWD` 和 A 条目 | 来自 A 条目。 |
| `NXDOMAIN` 条目 | 所有记录类型均返回 `NXDOMAIN`。 |

名称按小写匹配。缓存使用剩余 TTL 进行应答。

### 上游服务器 {#upstream-servers}

- 路由器先按顺序尝试静态 `servers`，然后尝试 `dynamic-servers`，例如启用了 `use-peer-dns=yes` 的 DHCP 客户端所提供的服务器。
- 在尝试下一台服务器之前，路由器会等待 `query-server-timeout` 以获得应答。当某台服务器应答后，路由器会继续将其用于后续查询。
- 当没有服务器在 `query-total-timeout` 内应答时，设备获得 `SERVFAIL`。
- 当有 `max-concurrent-queries` 个查询正在等待上游应答时，路由器会丢弃新查询，包括那些本可由缓存应答的查询，直到其中一个等待中的查询完成。
- `/ip/dns` 中的更改会立即生效。此时到达的查询可能得不到应答，设备会再次发送该查询。缓存会保留。

### Cache

- `cache-max-ttl` 限制上游应答的 TTL。静态条目使用自身的 `ttl`，默认为 1 天。
- 广告列表计入 `cache-size`：每个名称约需 75 字节。
- `/ip/dns/cache` 列出路由器给出的应答。`/ip/dns/cache/all` 还会列出其保存的其他记录，例如静态条目的 PTR 记录。正则表达式条目没有 PTR 记录。

### Adlists

- 每行包含一个名称，可单独列出，也可跟在地址（`0.0.0.0`、`127.0.0.1` 或 `::1`）之后，格式与 hosts 文件相同。以 `#` 开头的行和行尾部分为注释。名称必须为小写，不支持 `*.example.com` 等通配符。
- 仅阻止列出的名称，不阻止其下级名称。被阻止的应答 TTL 为 2 秒。
- 路由器会验证 HTTPS 广告列表 URL 的证书（`ssl-verify=yes`）。对于使用自签名证书的服务器，请将其 CA 证书导入 `/certificate`，或设置 `ssl-verify=no`。
- 路由器每 4 小时检查所有列表是否有更改；`/ip/dns/adlist/reload` 会立即检查。路由器将列表存储在其磁盘上。
- 一台路由器最多可有 64 个广告列表。

### DNS over HTTPS {#dns-over-https-1}

- 路由器与 DoH 服务器保持一条 HTTPS 连接（TCP 端口 443），并通过该连接发送所有查询。
- 在 ARM64 和 x86 设备上，如果服务器支持，路由器会使用 HTTP/2。其他设备使用 HTTP/1.1。
- DoH 错误会记录在 `dns` 主题中，例如 `DoH server connection error: timeout connecting`。

### Forwarders

- 转发器的服务器会在 `dns-servers` 和 `doh-servers` 之间轮流处理查询，每次一个查询。发往无响应服务器的查询会在 `query-total-timeout` 后失败。
- 对于转发器，`verify-doh-cert` 默认启用，这与 `/ip/dns` 不同。

### VRF

- 解析器通过 `vrf` 中设置的 VRF 回复设备，默认为 `main`。其他 VRF 中的设备不会收到回复。
- 上游服务器通过主路由表访问。要访问其他 VRF 中的服务器，请将其写为 `address@vrf`，例如 `servers=10.0.0.1@vrf1`。

### mDNS 中继器 {#mdns-repeater-1}

- 路由器转发 IPv4 mDNS（UDP 端口 5353 到 224.0.0.251），并从其他接口上的自身地址发送数据包。IPv6 mDNS（ff02::fb）不会被转发。
- WireGuard 等三层隧道不承载组播，因此无法通过它们转发 mDNS。

有关所有属性，请参阅 CLI 参考中的 [`/ip/dns`](/docs/cli-reference/ip/dns)、[`/ip/dns/static`](/docs/cli-reference/ip/dns/static)、[`/ip/dns/adlist`](/docs/cli-reference/ip/dns/adlist) 和 [`/ip/dns/forwarders`](/docs/cli-reference/ip/dns/forwarders)。
