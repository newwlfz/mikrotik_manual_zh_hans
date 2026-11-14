---
sidebar_key: "network-management/dns"
sidebar_position: 4
title: "DNS"
sidebar_label: "DNS"
description: "本页介绍 MikroTik RouterOS 中的 DNS 功能，说明如何将路由器配置为 DNS 缓存或主服务器，并提供远程请求、缓存策略和动态服务器集成等选项。页面还详细介绍了缓存大小、TTL 设置和 DNS over HTTPS（DoH）支持等配置属性。"
tags:
  - 'dns'
  - 'doh'
  - 'adlist'
source: https://manual.mikrotik.com/docs/7.24/network-management/dns
captured_at: '2026-11-04T11:32:42+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

Domain Name System (DNS) 通常指互联网的电话簿。换句话说，DNS 是一个数据库，它将字符串（称为主机名，例如 [mikrotik.com](https://mikrotik.com)）链接到特定 IP 地址，例如 159.148.172.205 或 2a02:610:7501:2000::205

启用了 DNS 功能的 MikroTik 路由器可被设置为任何符合 DNS 规范的客户端的 DNS 缓存。此外，MikroTik 路由器还可以在其 DHCP 服务器设置中指定为主 DNS 服务器。启用远程请求后，MikroTik 路由器会响应端口 53 上的 TCP 和 UDP DNS 请求。

当同时设置静态和动态服务器时，优先使用静态服务器条目，但这并不表示始终会使用静态服务器（例如，之前从动态服务器收到了查询，但后来添加了静态服务器，此时将优先使用动态条目）。

:::tip
当使用 DNS 服务器的 *allow-remote-requests* 时，请确保仅对已知主机限制通过 TCP 和 UDP 协议端口 53 访问你的服务器。

:::

在 LAN 上管理 DNS 功能有几种方式：使用公共 DNS、将路由器用作缓存，或者不干预 DNS 配置。以如下设置为例：Internet 服务提供商 (ISP) → 网关 (GW) → 局域网 (LAN)。GW 是采用默认配置的 RouterOS 设备：

- 未在 "GW" DHCP 服务器网络配置中配置任何 DNS 服务器——设备会将从 `ISP` 收到的 DNS 服务器 IP 地址配置转发给 `LAN` 设备。
- 在 "GW" DHCP 服务器网络配置中配置 DNS 服务器——设备会将配置的 DNS 服务器提供给 `LAN` 设备（还必须启用 "/ip/dns/set allow-remote-requests=yes"）。
- 在 "GW" DHCP 服务器网络配置下的 DNS 服务器中配置 "dns-none"——设备不会将任何 **动态** DNS 服务器转发给 `LAN` 设备。

### DNS 配置 {#dns-configuration}

DNS 设施用于为路由器本身以及连接到它的客户端提供域名解析。

| 属性 | 描述 |
| :-- | :-- |
| **allow-remote-requests** (*yes* \| *no*; 默认值：**no**) | 指定是否允许将路由器用作远程客户端的 DNS 缓存。否则，仅路由器本身会使用 DNS 配置。 |
| **address-list-extra-time** *(time; 默认值：**0s**)* | 创建地址列表条目时添加到 TTL 的额外时间。 |
| **cache-max-ttl** (*time*; 默认值：**1w**) | 缓存记录的最大生存时间。换句话说，缓存记录将在 cache-max-TTL 时间后无条件过期。来自 DNS 服务器的较短 TTL 会被遵循。 |
| **cache-size** (*integer[64..4294967295]*; 默认值：**2048**) | 指定 DNS 缓存的大小，单位为 KiB。 |
| **max-concurrent-queries** (*integer*; 默认值：**100**) | 指定允许的并发查询数。 |
| **max-concurrent-tcp-sessions** (*integer*; 默认值：**20**) | 指定允许的并发 TCP 会话数。 |
| **max-udp-packet-size** (*integer [50..65507]*; 默认值：**4096**) | 允许的 UDP 数据包最大大小。 |
| **mdns-repeat-ifaces** (*接口列表*; 默认值： ) | 一旦此列表中的某个接口收到 mDNS 数据包，它就会将其转发到该列表中的所有其他接口。仅支持 IPv4。 |
| **query-server-timeout** (*time*; 默认值：**2s**) | 指定等待服务器查询响应的时长。 |
| **query-total-timeout** (*time*; 默认值：**10s**) | 指定等待查询响应的总时长。请注意，配置此设置时必须考虑 "query-server-timeout" 和所用 DNS 服务器的数量。 |
| **servers** (*IPv4/IPv6 地址列表@vrf*; 默认值： ) | DNS 服务器 IPv4/IPv6 地址列表 |
| **cache-used** (*integer*) | 显示当前已使用的缓存大小，单位为 KiB |
| **dynamic-server** (*IPv4/IPv6 列表*) | 来自不同服务（例如 DHCP）的动态添加的 DNS 服务器列表。 |
| **doh-max-concurrent-queries** (*integer*; 默认值：**50**) | 指定允许的 DoH 并发查询数。 |
| **doh-max-server-connections** (*integer*; 默认值：**5**) | 指定允许到 DoH 服务器的并发连接数。 |
| **doh-timeout** (*time*; 默认值：**5s**) | 指定等待 DoH 服务器查询响应的时长。 |
| **use-doh-server** (*string; 默认值： )* | 指定必须用于 DNS 查询的 DoH 服务器。如果指定，DoH 功能会覆盖 "*servers*" 的使用。服务器必须使用 "https://" 前缀指定。仅支持一个 DoH 服务器。 |
| **verify-doh-cert** (*yes* \| *no*; 默认值：**no**) | 指定在使用 DoH 服务器时是否验证它。将使用 "/certificate" 列表来验证服务器有效性。 |
| **vrf** (vrf; 默认值：main) | 指定应使用 DNS 解析器的 VRF。DNS 解析器仅处理来自指定 VRF 或来自解析器本身的请求。 |

```text
[admin@MikroTik] > ip dns print         
                      servers: 
              dynamic-servers: 10.155.0.1
               use-doh-server: 
              verify-doh-cert: no
   doh-max-server-connections: 5
   doh-max-concurrent-queries: 50
                  doh-timeout: 5s
        allow-remote-requests: yes
          max-udp-packet-size: 4096
         query-server-timeout: 2s
          query-total-timeout: 10s
       max-concurrent-queries: 100
  max-concurrent-tcp-sessions: 20
                   cache-size: 2048KiB
                cache-max-ttl: 1d
                   cache-used: 48KiB
```

动态 DNS 服务器来自 RouterOS 中可用的不同设施，例如 DHCP 客户端、VPN 客户端、IPv6 路由器通告等。

服务器按队列顺序处理——静态服务器作为有序列表，动态服务器作为有序列表。当 DNS 缓存必须向服务器发送请求时，它会逐一尝试服务器，直到其中一个响应。之后，该服务器将用于所有类型的 DNS 请求。同一服务器用于任何类型的 DNS 请求，例如 A 和 AAAA 类型。如果仅使用动态服务器，则 DNS 返回结果可能会在重启后发生变化，因为由于从上述设施接收速度不同，服务器可能以不同顺序加载到 IP/DNS 设置中。

如果某个时刻正在使用的服务器变得不可用且无法提供 DNS 应答，则 DNS 缓存会重新启动 DNS 服务器查找过程，并再次遍历指定服务器列表。

### DNS 缓存 {#dns-cache}

此菜单提供两个列表，其中包含存储在服务器上的 DNS 记录：

- *"*`/ip/dns/cache`*"*：此菜单提供 RouterOS 缓存可用来回复客户端请求的已缓存 DNS 条目列表；
- *"*`/ip/dns/cache/all`*"*：此菜单提供存储的所有已缓存 DNS 记录的完整列表，包括例如 PTR 记录。

:::tip
可以使用以下命令清空 DNS 缓存：`/ip/dns/cache/flush`。

:::

### DNS 静态 {#dns-static}

MikroTik RouterOS DNS 缓存具有附加的内嵌 DNS 服务器功能，允许你配置多种类型的 DNS 条目，供将路由器用作 DNS 服务器的 DNS 客户端使用。此功能还可用于向网络客户端提供虚假 DNS 信息。例如，它可以将针对特定域名集合（或整个互联网）的任何 DNS 请求解析到你自己的页面。

```text
[admin@MikroTik] /ip/dns/static/add name=www.mikrotik.com address=10.0.0.1

```

该服务器还能够基于基本正则表达式解析 DNS 请求，以便多个请求可以匹配同一条目。如果某个条目不遵循 DNS 命名标准，则将其视为正则表达式。列表按从上到下的顺序检查。先检查正则表达式，然后检查普通记录。

使用正则表达式匹配 DNS 请求：

```text
[admin@MikroTik] /ip/dns/static/add regexp=".*mikrotik.*" address=10.0.0.2
```

如果 DNS 静态条目列表匹配所请求的域名，则路由器将假定此路由器负责该名称的任何类型 DNS 请求。例如，如果列表中只有 "A" 记录，但路由器收到 "AAAA" 请求，那么它会使用静态列表中的 "A" 记录进行回复，并向上游服务器查询 "AAAA" 记录。如果存在记录，则转发该回复；如果不存在，则路由器会回复一个不含任何记录的 "ok" DNS 回复。如果你想用不可用记录覆盖来自上游服务器的域名记录，那么可以例如为特定域名添加静态条目，并为其指定一个虚拟 IPv6 地址 "::ffff"。

将所有已配置 DNS 条目列为有序列表：

```text
[admin@MikroTik] /ip/dns/static/print 
Columns: NAME, REGEXP, ADDRESS, TTL
# NAME             REGEXP       ADDRESS   TTL
0 www.mikrotik.com               10.0.0.1  1d 
1                  [*mikrotik*]  10.0.0.2  1d
```

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IPv4/IPv6*) | 用于 "A" 或 "AAAA" 类型记录的地址。 |
| **cname**(*string**)* | 域名的别名。 |
| **forward-to** | 特定 DNS 请求必须转发到的域名服务器的 IP 地址。 |
| **mx-exchange** (*string*) | MX 服务器的域名。 |
| **name** (*string)* | 域名。 |
| **srv-port** (*integer*; 默认值：0) | 服务所在的 TCP 或 UDP 端口。 |
| **srv-target** | 提供服务的机器的规范主机名，以点结尾。 |
| **text** (*string**)* | 关于域名的文本信息。 |
| **type**(*A* \| *AAAA* \| *CNAME* \| *FWD* \| *MX* \| *NS* \| *NXDOMAIN* \| *SRV* \| *TXT* ; 默认值：*A*) | DNS 记录的类型。 |
| **address-list** (*string**)* | 当某些请求匹配该条目时，必须将地址动态添加到的防火墙地址列表名称。TTL 到期后，该条目将从地址列表中移除。 |
| **comment**(*string**)* | 关于域名记录的注释。 |
| **disabled** (*yes* \| *no*; 默认值：yes) | DNS 记录是否处于活动状态。 |
| **match-subdomain** (*yes* \| *no*; 默认值：no) | 该记录是否匹配子域请求。 |
| **mx-preference** (*integer*; 默认值：0) | 特定 MX 记录的优先级。 |
| **ns**(*string*) | 特定记录的权威域名服务器名称。 |
| **regexp** (regex) | 用于验证域名的正则表达式。 |
| **srv-priority** (*integer*; 默认值：0) | 特定 SRV 记录的优先级。 |
| **srv-weight** (*integer*; 默认值：0) | 特定 SRV 记录的权重。 |
| **ttl** (*time*; 默认值：*24h*) | 缓存记录的最大生存时间。 |

:::info
对于每个静态 A 和 AAAA 记录，缓存中会自动添加一条 PTR 记录。

:::

:::warning
Regexp 区分大小写，但 DNS 请求不区分大小写，因此 RouterOS 在匹配任何静态条目之前会将 DNS 名称转换为小写。你应该只使用小写字母编写正则表达式。正则表达式匹配比纯文本条目慢得多，因此建议尽量减少正则表达式规则的数量并优化表达式本身。

:::

:::warning
通过混合用户界面（CLI 和 GUI）配置 regex 时要小心。从 CLI 添加条目本身可能需要转义字符。建议添加条目并执行 print 命令，以验证 regex 在添加期间未被更改。

:::

## DNS over HTTPS (DoH) {#dns-over-https-doh}

RouterOS 支持 DNS over HTTPS (DoH)。DoH 使用 HTTPS 协议发送和接收 DNS 请求，以获得更好的数据完整性。主要目标是通过消除 "中间人" 攻击 (MITM) 来提供隐私保护。

[视频：DoH 设置](http://youtube.com/watch?v=w4erB0VzyIE)

配置 DoH 服务器：

```ros
/ip/dns/set use-doh-server=DoH_Server_Query_URL verify-doh-cert=yes
```

:::info
可以使用[内置证书颁发机构存储](../authentication-authorization-accounting/certificates.md#built-in-trust-store-authorities)来验证 DoH 服务器证书，而无需手动导入相关的根证书。
:::

:::info
仅支持一个 DoH 服务器。

:::

请注意，路由器至少需要配置一个常规 DNS 服务器，才能解析 DoH 主机名本身。

```ros
/ip/dns/set servers=1.1.1.1
```

如果未配置任何动态或静态 DNS 服务器，请按如下方式为 DoH 服务器域名添加静态 DNS 条目：

```ros
/ip/dns/static/add address=IP_Address name=Domain_Name
```

:::tip
如果正在使用 DoH 服务器（DoH DNS 名称可被解析），那么它将是当时唯一工作的 DNS 服务，IP/DNS 服务器列表中的标准 DNS 服务器将不会被使用。

:::

:::tip
如果 *`/certificate/settings/set` crl-use* 设置为 *yes,* 则 RouterOS 会检查证书链中每个证书的 CRL，因此应将整个证书链安装到设备中——从根 CA、中间 CA（如果有）开始，直到用于特定服务的证书。

例如，Google DoH、Cloudflare 和 OpenDNS 的完整证书链包含三个证书，NextDNS 有四个证书。

:::
:::info
ARM64、x86 和 CHR 设备在与 DoH 服务器通信时会协商 HTTP/2。如果服务器支持，路由器会使用 HTTP/2 进行 DNS over HTTPS 查询，与 HTTP/1.1 相比可提供更好的多路复用并降低延迟。如果任一端不支持 HTTP/2，则连接回退到 HTTP/1.1。

:::

### 已知兼容/不兼容的 DoH 服务 {#known-compatibleincompatible-doh-services}

#### 兼容的 DoH 服务 {#compatible-doh-services}

- Cloudflare
- Google
- NextDNS
- OpenDNS

#### 不兼容的 DoH 服务 {#incompatible-doh-services}

- Mullvad
- Yandex
- UncensoredDNS
- Quad9

## Adlist {#adlist}

Adlist 是网络级广告拦截的重要组成部分，包含一组精选的已知用于提供广告的域名。此功能通过利用 Domain Name System (DNS) 解析来拦截对这些域名的 A 和 AAAA 请求。当客户端设备向 DNS 服务器查询 Adlist 中列出的域名时，DNS 解析过程会改变。DNS 服务器不会返回广告服务域名的实际 IP 地址，而是返回 IP 地址 0.0.0.0。这会有效地将请求空路由，因为 0.0.0.0 是不可路由的元地址，用于表示无效、未知或不适用目标。通过以这种方式重定向广告相关请求，Adlist 功能可确保广告内容不会加载，从而通过减少不需要的广告流量来增强网络性能并改善用户体验。

[视频：Adlist 设置](http://youtube.com/watch?v=RMJnjyAOfLI)

:::warning
**配置之前，请增加 DNS 缓存，因为它用于存储 Adlist 条目。如果达到限制，DNS,error 主题中会打印错误 "*adlist read: max cache size reached*"**

:::

:::warning
Adlist 存储在设备的内部存储器中。请确保有足够的可用空间来保存所需的 Adlist。

:::

| 属性 | 描述 |
| :-- | :-- |
| url | 用于指定 Adlist 的 URL。 |
| ssl-verify | 指定是否验证 Adlist URL 服务器的 SSL 证书。将使用 "/certificate" 列表来验证服务器有效性。 |
| match-count | 匹配的 DNS 名称请求数。 |
| name-count | 从 Adlist 导入的 DNS 名称数。 |
| file | 用于指定从中读取 Adlist 数据的本地文件路径。 |
| pause | 暂时暂停使用所有 Adlist。 |
| reload | 检查所有列表的更新；如果发现更新，则更新列表，按需移除或添加条目；执行 reload 时不会完整重新下载列表，而是只进行必要的更新。**重要：** 更新列表并不强制使用 reload，Adlist 每四小时检查一次新更新。 |

### Adlist 白名单 {#whitelist-for-adlist}

要将某些域从 Adlist 中豁免，需要创建一个静态 DNS FWD 条目，例如 `/ip/dns/static/add name=bar.test type=FWD`。如果存在这样的条目，并且路由器有相关的静态 DNS 条目 `/ip/dns/static/add name=bar.test type=A`，则查询将由路由器应答；或者，如果没有静态规则，则转发到下一个 DNS（动态 DNS 或 `/ip/dns/set servers=` 下配置的 DNS）。DoH 也支持 FWD 条目。

### 配置示例 {#configuration-examples}

#### 基于 URL 的 Adlist {#url-based-adlist}

```ros
/ip/dns/adlist/add url=https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts ssl-verify=no
```

要查看存在并匹配了多少个域名，可以运行：

```ros
/ip/dns/adlist/print 
Flags: X - disabled 
0 url="https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts" ssl-verify=no match-count=122 name-count=164769

```

#### 本地托管的 Adlist {#locally-hosted-adlist}

要创建 Adlist，可以创建一个包含域名的文本文件。例如：

```
0.0.0.0 example1.com
0.0.0.0 eu1.example.com
0.0.0.0 ex.com
0.0.0.0 com.example.com
```

:::info
可以在 PC 上创建 txt 文件，也可以在 RouterOS 中使用以下命令创建：

"/file/add name=host.txt"，然后在添加条目后运行 "/file/edit host.txt contents"。按 "ctrl o" 保存条目。

:::

要将文件添加到 Adlist：

```ros
/ip/dns/adlist/add file=host.txt

```

:::info
可以使用 `/ip/dns/adlist/print` 验证文件格式是否正确，结果将显示已添加多少个主机名；主机名格式必须与上一示例中给出的格式一致。

:::

```ros
/ip/dns/adlist/print 
Flags: X - disabled 
 0   file=host.txt match-count=0 name-count=4 
```

## 转发器 {#forwarders}

DNS Forwarders 允许用户配置一个命名 DNS 转发器，可用作静态 FWD 条目的 *forward-to* 值。

对于每个 *Forwarder*，可以配置多个常规上游服务器和 DoH 服务器。配置的 *forwarder* 服务器将按轮询算法使用——对于每个查询，将使用下一个服务器来解析 DNS 名称。

### 转发器配置 {#forwarder-configuration}

在 *`/ip/dns/forwarders`* 部分中，可以添加、修改或删除 *forwarders*。

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string;* 默认值： ) | 转发器名称。 |
| **dns-servers** (*string*; 默认值： ) | 域名服务器的 IP 地址或 DNS 名称。可以包含多个记录，例如 *dns-servers=1.1.1.1,8.8.8.8,local.dns* |
| **doh-servers**(*string;* 默认值： ) | DoH 服务器的 URL。可以包含多个记录。 |
| **verify-doh-cert** (*yes* \| *no**;* 默认值： *yes*) | 指定在使用 DoH 服务器时是否验证它。将使用 "/certificate" 列表来验证服务器有效性。 |

### 配置示例 {#configuration-example}

配置/添加一个 *forwarder*：

```routeros
/ip/dns/forwarders
add dns-servers=1.1.1.1,local.dns doh-servers=https://dns.google/dns-query name=forwarder1
```

配置/添加一个静态 DNS FWD 条目：

```routeros
/ip/dns/static
add forward-to=forwarder1 name=mikrotik.com type=FWD
```

现在，每当路由器收到解析 [mikrotik.com](http://mikrotik.com) 的请求时，该请求将使用轮询算法转发到 *1.1.1.1*、*local.dns* 或 *Google DoH* 服务器。

## mDNS {#mdns}

RouterOS 支持[多播 DNS (mDNS)](https://datatracker.ietf.org/doc/html/rfc6762)，用于本地网络服务发现。默认情况下，mDNS 在单个子网内运行。mDNS 中继功能允许使用 "mdns-repeat-ifaces" 属性将 mDNS 功能扩展到不同接口或 VLAN。

### 使用 mDNS 中继的影响 {#impact-of-using-mdns-repeater}

- 跨子网服务发现：不同子网或 VLAN 上的设备可以相互发现，从而增强查找服务（例如打印机、文件共享）的能力。
- 网络流量增加：mDNS 中继可能会增加多播流量，这可能导致拥塞，尤其是在设备众多的大型网络中。

mDNS 中继通常用于以下设备：

- Apple 生态系统（AirPrint、AirPlay）。
- 智能家居设备（Thread、IoT）。
- Chromecast 和媒体串流。
- Avahi（Linux/Unix）。

要在接口之间启用 mDNS 中继，使连接到这些接口的设备能够使用 mDNS 相互发现，请使用以下命令：

```routeros
/ip/dns/set mdns-repeat-ifaces=<interface1>,<interface2>
```

:::info
mDNS 中继需要支持多播的接口（例如 Ethernet、VLAN、bridge）。不支持 WireGuard 等隧道接口。

目前仅支持 IPv4。

:::

:::warning
MikroTik mDNS Repeater 是一个本地服务，会拦截多播数据包并重新广播它们。它需要一条 "input" 规则。mDNS 多播流量不会经过 "forward" 链。如果你的防火墙规则较严格，用于保护路由器免受本地子网访问，则必须在任何丢弃规则之前显式允许 mDNS 流量——允许在 "input" 链上接收 UDP 端口 5353 的流量。

:::
