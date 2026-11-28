---
title: "DNS"
description: "本页介绍 MikroTik RouterOS 中的 DNS 功能，说明如何将路由器配置为 DNS 缓存或主服务器，并提供远程请求、缓存策略和动态服务器集成等选项。文中详细说明缓存大小、TTL 设置和 DNS over HTTPS（DoH）支持等配置属性。"
tags:
  - 'dns'
  - 'doh'
  - 'adlist'
source: https://manual.mikrotik.com/docs/7.24/network-management/dns
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

域名系统（DNS）通常指互联网的电话簿。换句话说，DNS 是一个数据库，用于将字符串（称为主机名），例如 [mikrotik.com](https://mikrotik.com)，链接到特定 IP 地址，例如 159.148.172.205 或 2a02:610:7501:2000::205

启用 DNS 功能的 MikroTik 路由器可以设置为任何符合 DNS 规范的客户端的 DNS 缓存。此外，可以在 DHCP 服务器设置下将 MikroTik 路由器指定为主 DNS 服务器。启用远程请求后，MikroTik 路由器会在端口 53 上响应 TCP 和 UDP DNS 请求。

同时设置静态和动态服务器时，优先使用静态服务器条目，但这并不表示始终会使用静态服务器（例如，之前从动态服务器收到查询，但之后添加了静态服务器，则会优先使用动态条目）。

:::tip
使用 DNS 服务器 *allow-remote-requests* 时，请确保仅允许已知主机通过 TCP 和 UDP 协议端口 53 访问服务器。
:::

有多种方式可以管理 LAN 上的 DNS 功能：使用公共 DNS、将路由器用作缓存，或不干预 DNS 配置。以下面的设置为例：互联网服务提供商（ISP）→ 网关（GW）→ 局域网（LAN）。GW 是采用默认配置的基于 RouterOS 的设备：

- 不在“GW”DHCP 服务器网络配置中配置任何 DNS 服务器，设备会将从 `ISP` 收到的 DNS 服务器 IP 地址配置转发给 `LAN` 设备。
- 在“GW”DHCP 服务器网络配置中配置 DNS 服务器，设备会将配置的 DNS 服务器提供给 `LAN` 设备（还必须启用 "/ip/dns/set allow-remote-requests=yes*"）。
- 在“GW”DHCP 服务器网络配置的 DNS 服务器下配置 "dns-none"，设备不会将任何**动态** DNS 服务器转发给 `LAN` 设备。

### DNS 配置 {#dns-configuration}

DNS 功能用于为路由器自身以及连接到它的客户端提供域名解析。

| 属性 | 说明 |
| :-- | :-- |
| **allow-remote-requests** (*yes* \| *no*; Default: **no**) | 指定是否允许将路由器用作远程客户端的 DNS 缓存。否则，只有路由器自身会使用 DNS 配置。 |
| **address-list-extra-time** *(time; Default: **0s**)* | 创建地址列表条目时添加到 TTL 的额外时间。 |
| **cache-max-ttl** (*time*; Default: **1w**) | 缓存记录的最大生存时间。换句话说，缓存记录将在 cache-max-TTL 时间后无条件过期。来自 DNS 服务器的较短 TTL 会被遵循。 |
| **cache-size** (*integer[64..4294967295]*; Default: **2048**) | 指定 DNS 缓存的大小，单位为 KiB。 |
| **max-concurrent-queries** (*integer*; Default: **100**) | 指定允许的并发查询数量。 |
| **max-concurrent-tcp-sessions** (*integer*; Default: **20**) | 指定允许的并发 TCP 会话数量。 |
| **max-udp-packet-size** (*integer [50..65507]*; Default: **4096**) | 允许的 UDP 数据包最大大小。 |
| **mdns-repeat-ifaces** (*list of interfaces*; Default: ) | 当该列表中的某个接口收到 mDNS 数据包时，会将其转发到该列表中的所有其他接口。仅支持 IPv4。 |
| **query-server-timeout** (*time*; Default: **2s**) | 指定等待服务器查询响应的时间。 |
| **query-total-timeout** (*time*; Default: **10s**) | 指定等待查询响应的总时间。请注意，配置该设置时必须考虑 "query-server-timeout" 和使用的 DNS 服务器数量。 |
| **servers** (*list of IPv4/IPv6 addresses@vrf*; Default: ) | DNS 服务器 IPv4/IPv6 地址列表 |
| **cache-used** (*integer*) | 显示当前使用的缓存大小，单位为 KiB |
| **dynamic-server** (*IPv4/IPv6 list*) | 从不同服务（例如 DHCP）动态添加的 DNS 服务器列表。 |
| **doh-max-concurrent-queries** (*integer*; Default: **50**) | 指定允许的 DoH 并发查询数量。 |
| **doh-max-server-connections** (*integer*; Default: **5**) | 指定允许的到 DoH 服务器的并发连接数量。 |
| **doh-timeout** (*time*; Default: **5s**) | 指定等待 DoH 服务器查询响应的时间。 |
| **use-doh-server** (*string; Default: )* | 指定 DNS 查询必须使用的 DoH 服务器。如果指定了 DoH 服务器，则会覆盖 "*servers*" 的使用。服务器必须使用 "https://" 前缀指定。仅支持一个 DoH 服务器。 |
| **verify-doh-cert** (*yes* \| *no*; Default: **no**) | 指定使用 DoH 服务器时是否验证该服务器。将使用 "/certificate" 列表验证服务器有效性。 |
| **vrf** (vrf; Default: main) | 指定应使用 DNS 解析器的 VRF。DNS 解析器仅处理源自指定 VRF 或解析器自身的请求。 |

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

动态 DNS 服务器来自 RouterOS 中可用的不同功能，例如 DHCP 客户端、VPN 客户端、IPv6 Router Advertisements 等。

服务器按队列顺序处理：静态服务器作为有序列表，动态服务器作为有序列表。当 DNS 缓存需要向服务器发送请求时，会逐一尝试服务器，直到其中一个响应。之后，该服务器将用于所有类型的 DNS 请求。同一服务器用于任何类型的 DNS 请求，例如 A 和 AAAA 类型。如果仅使用动态服务器，则重启后 DNS 返回的结果可能会变化，因为服务器可能会由于从上述功能接收速度不同而以不同顺序加载到 IP/DNS 设置中。

如果某个时刻正在使用的服务器变得不可用且无法提供 DNS 应答，则 DNS 缓存会重新启动 DNS 服务器查找过程，并再次遍历指定的服务器列表。

### DNS 缓存 {#dns-cache}

该菜单提供两个列表，其中包含服务器上存储的 DNS 记录：

- *"*`/ip/dns/cache`*"*：该菜单提供缓存 DNS 条目列表，RouterOS 缓存可使用这些条目回复客户端请求；
- *"*`/ip/dns/cache/all`*"*：该菜单提供所有已缓存 DNS 记录的完整列表，其中也包括 PTR 记录等。

:::tip
可以使用以下命令清空 DNS 缓存：`/ip/dns/cache/flush`。
:::

### DNS 静态条目 {#dns-static}

MikroTik RouterOS DNS 缓存还包含嵌入式 DNS 服务器功能，可配置多种类型的 DNS 条目，供使用路由器作为 DNS 服务器的 DNS 客户端使用。该功能也可用于向网络客户端提供虚假 DNS 信息。例如，它可以将某些域名集合（或整个 Internet）的任意 DNS 请求解析到你的页面。

```text
[admin@MikroTik] /ip/dns/static/add name=www.mikrotik.com address=10.0.0.1

```

该服务器还能够基于基本正则表达式解析 DNS 请求，使多个请求可以匹配同一条目。如果条目不符合 DNS 命名标准，则将其视为正则表达式。列表按顺序从上到下检查。先检查正则表达式，再检查普通记录。

使用 regex 匹配 DNS 请求：

```text
[admin@MikroTik] /ip/dns/static/add regexp=".*mikrotik.*" address=10.0.0.2
```

如果 DNS 静态条目列表匹配请求的域名，则路由器将假定该路由器负责该特定名称的任何类型 DNS 请求。例如，如果列表中只有“A”记录，但路由器收到“AAAA”请求，则它会使用静态列表中的“A”记录进行回复，并向 上游服务器查询“AAAA”记录。如果存在记录，则转发回复。如果不存在，则路由器将回复不带任何记录的“ok”DNS 回复。如果要用不可用记录覆盖上游服务器的域名记录，例如，可以为特定域名添加静态条目，并为其指定虚拟 IPv6 地址“::ffff”。

按顺序列出所有已配置的 DNS 条目：

```text
[admin@MikroTik] /ip/dns/static/print 
Columns: NAME, REGEXP, ADDRESS, TTL
# NAME             REGEXP       ADDRESS   TTL
0 www.mikrotik.com               10.0.0.1  1d 
1                  [*mikrotik*]  10.0.0.2  1d
```

| Property | Description |
| :-- | :-- |
| **address** (*IPv4/IPv6*) | 用于“A”或“AAAA”类型记录的地址。 |
| **cname**(*string**)* | 域名的别名。 |
| **forward-to** | 特定 DNS 请求必须转发到的域名服务器的 IP 地址。 |
| **mx-exchange** (*string*) | MX 服务器的域名。 |
| **name** (*string)* | 域名。 |
| **srv-port** (*integer*; Default: 0) | 服务所在的 TCP 或 UDP 端口。 |
| **srv-target** | 提供服务的主机的规范主机名，以点结尾。 |
| **text** (*string**)* | 关于域名的文本信息。 |
| **type**(*A* \| *AAAA* \| *CNAME* \| *FWD* \| *MX* \| *NS* \| *NXDOMAIN* \| *SRV* \| *TXT* ; Default: *A*) | DNS 记录的类型。 |
| **address-list** (*string**)* | 当某个请求匹配该条目时必须动态添加地址的防火墙地址列表名称。TTL 到期时，该条目将从地址列表中移除。 |
| **comment**(*string**)* | 关于域名记录的注释。 |
| **disabled** (*yes* \| *no*; Default: yes) | DNS 记录是否处于活动状态。 |
| **match-subdomain** (*yes* \| *no*; Default: no) | 该记录是否匹配子域名的请求。 |
| **mx-preference** (*integer*; Default: 0) | 特定 MX 记录的优先级。 |
| **ns**(*string*) | 特定记录的权威域名服务器名称。 |
| **regexp** (regex) | 用于校验域名的正则表达式。 |
| **srv-priority** (*integer*; Default: 0) | 特定 SRV 记录的优先级。 |
| **srv-weight** (*integer*; Default: 0) | 特定 SRV 记录的权重。 |
| **ttl** (*time*; Default: *24h*) | 缓存记录的最大生存时间。 |

:::info
对于每条静态 A 和 AAAA 记录，缓存中会自动添加一条 PTR 记录。
:::

:::warning
Regexp 区分大小写，但 DNS 请求不区分大小写，因此 RouterOS 在匹配任何静态条目之前会将 DNS 名称转换为小写。应仅使用小写字母编写 regex。正则表达式匹配的速度明显慢于纯文本条目，因此建议尽量减少正则表达式规则的数量，并优化表达式本身。
:::

:::warning
通过混合用户界面（CLI 和 GUI）配置 regex 时要小心。从 CLI 添加条目时，可能需要转义字符。建议添加条目后执行 print 命令，以验证 regex 在添加过程中未被更改。
:::

## 基于 HTTPS 的 DNS（DoH） {#dns-over-https-doh}

RouterOS 支持 DNS over HTTPS（DoH）。DoH 使用 HTTPS 协议发送和接收 DNS 请求，以提高数据完整性。主要目标是通过消除“中间人”攻击（MITM）来提供隐私保护。

[Video: DoH setup](http://youtube.com/watch?v=w4erB0VzyIE)

配置 DoH 服务器：

```ros
/ip/dns/set use-doh-server=DoH_Server_Query_URL verify-doh-cert=yes
```

:::info
可以使用 [内置证书颁发机构存储](/docs/authentication-authorization-accounting/certificates#built-in-trust-store-authorities) 验证 DoH 服务器证书，无需手动导入相关根证书。
:::

:::info
仅支持一个 DoH 服务器。
:::

请注意，至少需要配置一个常规 DNS 服务器，路由器才能解析 DoH 主机名本身。

```ros
/ip/dns/set servers=1.1.1.1
```

如果没有配置任何动态或静态 DNS 服务器，请按如下方式为 DoH 服务器域名添加静态 DNS 条目：

```ros
/ip/dns/static/add address=IP_Address name=Domain_Name
```

:::tip
如果使用 DoH 服务器（可解析 DoH DNS 名称），则该服务器将是当时唯一可用的 DNS 服务，IP/DNS servers 列表中的标准 DNS 服务器不会被使用。
:::

:::tip
如果 *`/certificate/settings/set` crl-use* 设置为 *yes，* RouterOS 会检查证书链中每个证书的 CRL，因此应在设备中安装完整的证书链：从 Root CA、中间 CA（如果有），到用于特定服务的证书。

例如，Google DoH、Cloudflare 和 OpenDNS 的完整链包含三个证书，NextDNS 包含四个证书。
:::
:::info
ARM64、x86 和 CHR 设备与 DoH 服务器通信时会协商 HTTP/2。如果服务器支持 HTTP/2，路由器会使用 HTTP/2 进行 DNS over HTTPS 查询，与 HTTP/1.1 相比，可提供更好的多路复用并降低延迟。如果任一端不支持 HTTP/2，连接会回退到 HTTP/1.1。
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

## Adlist

Adlist 是网络级广告拦截的核心组件，由一组经过整理的域名组成，这些域名以投放广告而知名。该功能利用域名系统（DNS）解析拦截发往这些域名的 A 和 AAAA 请求。当客户端设备向 DNS 服务器查询 Adlist 中列出的域名时，DNS 解析过程会被更改。DNS 服务器不会返回广告域名的实际 IP 地址，而是返回 IP 地址 0.0.0.0。这实际上会将请求空路由，因为 0.0.0.0 是一个不可路由的元地址，用于表示无效、未知或不适用的目标。通过以这种方式重定向广告相关请求，Adlist 功能可确保不加载广告内容，从而减少不需要的广告流量，提升网络性能和用户体验。

[Video: Adlist setup](http://youtube.com/watch?v=RMJnjyAOfLI)

:::warning
**配置前请增大 DNS 缓存，因为它用于存储 Adlist 条目。如果达到限制，将在 DNS,error 主题中打印错误“*adlist read: max cache size reached*”。**
:::

:::warning
Adlist 存储在设备的内部存储器中。请确保有足够的可用空间保存所需的 Adlist。
:::

| 属性 | 说明 |
| :-- | :-- |
| url | 用于指定 Adlist 的 URL。 |
| ssl-verify | 指定是否验证 Adlist URL 服务器的 SSL 证书。它将使用“/certificate”列表验证服务器有效性。 |
| match-count | 匹配的 DNS 名称请求计数。 |
| name-count | 从 Adlist 导入的 DNS 名称计数。 |
| file | 用于指定从中读取 Adlist 数据的本地文件路径。 |
| pause | 临时暂停使用所有 Adlist。 |
| reload | 检查所有列表的更新，如果找到更新，则更新列表，根据需要删除或添加条目。执行 reload 时不会完整重新下载列表，而是仅执行必要的更新。 <br/><br/><strong>重要：</strong>使用 reload 更新列表并非必需，Adlist 每四小时检查一次新更新。 <br/><br/> |

### Adlist 白名单 {#whitelist-for-adlist}

要使某些域名不受 Adlist 影响，需要创建静态 DNS FWD 条目，例如 `/ip/dns/static/add name=bar.test type=FWD`。如果存在此类条目，并且路由器具有相关的静态 DNS 条目 `/ip/dns/static/add name=bar.test type=A`，则查询将由路由器应答；或者，如果没有静态规则，则查询会转发到下一个 DNS，该 DNS 可以是动态的，也可以是在 `/ip/dns/set servers=` 下配置的 DNS。DoH 也支持 FWD 条目。

### 配置示例 {#configuration-examples}

#### 基于 URL 的广告列表 {#url-based-adlist}

```ros
/ip/dns/adlist/add url=https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts ssl-verify=no
```

要查看存在和匹配了多少域名，可以运行：

```ros
/ip/dns/adlist/print 
Flags: X - disabled 
0 url="https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts" ssl-verify=no match-count=122 name-count=164769

```

#### 本地托管的广告列表 {#locally-hosted-adlist}

要创建广告列表，可以创建一个包含域名的文本文件。示例：

```
0.0.0.0 example1.com
0.0.0.0 eu1.example.com
0.0.0.0 ex.com
0.0.0.0 com.example.com
```

:::info
你可以在 PC 上创建 txt 文件，也可以在 RouterOS 中使用以下命令创建

"/file/add name=host.txt"，添加条目后可以运行 "/file/edit host.txt contents"。按 "ctrl o" 保存条目。
:::

要将文件添加到广告列表：

```ros
/ip/dns/adlist/add file=host.txt

```

:::info
可以使用 `/ip/dns/adlist/print` 验证文件格式是否正确，结果会显示已添加的主机名数量，主机名格式必须与上例中给出的格式一致。
:::

```ros
/ip/dns/adlist/print 
Flags: X - disabled 
 0   file=host.txt match-count=0 name-count=4 
```

## Forwarders

DNS Forwarders 允许用户配置一个命名的 DNS 转发器，可用作静态 FWD 条目的 *forward-to* 值。

对于每个 *Forwarder*，可以配置多个常规上游服务器和 DoH 服务器。已配置的 *forwarder* 服务器将按轮询算法使用：对于每个查询，将使用下一台服务器解析 DNS 名称。

### Forwarder 配置 {#forwarder-configuration}

在 *`/ip/dns/forwarders`* 部分中，可以添加、修改或删除 *forwarders*。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string;* Default: ) | Forwarder 名称。 |
| **dns-servers** (*string*; Default: ) | 域名服务器的 IP 地址或 DNS 名称。可以包含多条记录，例如，*dns-servers=1.1.1.1,8.8.8.8,local.dns* |
| **doh-servers**(*string;* Default: ) | DoH 服务器的 URL。可以包含多条记录。 |
| **verify-doh-cert** (*yes* \| *no**;* Default: *yes*) | 指定使用 DoH 服务器时是否验证该服务器。它将使用“/certificate”列表来验证服务器有效性。 |

### 配置示例 {#configuration-example}

配置/添加 *forwarder*：

```routeros
/ip/dns/forwarders
add dns-servers=1.1.1.1,local.dns doh-servers=https://dns.google/dns-query name=forwarder1
```

配置/添加静态 DNS FWD 条目：

```routeros
/ip/dns/static
add forward-to=forwarder1 name=mikrotik.com type=FWD
```

现在，每当路由器收到解析 [mikrotik.com](http://mikrotik.com) 的请求时，该请求都会通过轮询算法转发到 *1.1.1.1*、*local.dns* 或 *Google DoH* 服务器。

## mDNS

RouterOS 支持 [Multicast DNS (mDNS)](https://datatracker.ietf.org/doc/html/rfc6762)，用于本地网络服务发现。默认情况下，mDNS 在单个子网内运行。mDNS repeater 功能可通过 "mdns-repeat-ifaces" 属性将 mDNS 功能扩展到不同接口或 VLAN。

### 使用 mDNS Repeater 的影响 {#impact-of-using-mdns-repeater}

- 跨子网服务发现：不同子网或 VLAN 中的设备可以发现彼此，增强查找服务的能力（例如打印机、文件共享）。
- 网络流量增加：mDNS repeater 可能增加组播流量，从而导致拥塞，尤其是在设备较多的较大网络中。

mDNS repeater 通常与以下设备一起使用：

- Apple 生态系统（AirPrint、AirPlay）。
- 智能家居设备（Thread、IoT）。
- Chromecast 和媒体流。
- Avahi（Linux/Unix）。

要在接口之间启用 mDNS repeater，使连接到这些接口的设备可以使用 mDNS 发现彼此，请使用以下命令：

```routeros
/ip/dns/set mdns-repeat-ifaces=<interface1>,<interface2>
```

:::info
mDNS repeater 需要支持组播的接口（例如 Ethernet、VLAN、网桥）。不支持 WireGuard 等隧道接口。

目前仅支持 IPv4。
:::

:::warning
MikroTik mDNS Repeater 是一种本地服务，用于拦截组播数据包并重新广播。它需要 "input" 规则。mDNS 组播流量不会经过 "forward" 链。如果你有严格的防火墙规则保护路由器免受本地子网影响，则必须在任何 drop 之前显式允许 mDNS 流量——允许在 "input" 链上接收 UDP 端口 5353 的流量。
:::
