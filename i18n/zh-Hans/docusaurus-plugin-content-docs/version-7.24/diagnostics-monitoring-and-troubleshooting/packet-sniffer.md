---
title: "数据包嗅探器"
description: "Packet Sniffer 是 MikroTik RouterOS 中用于捕获和分析网络数据包的工具，可诊断问题或检测安全威胁。它支持按 IP、MAC、端口、协议等条件进行过滤，并可将数据包保存为 PCAPNG 格式或流式传输到 PC 进行分析。"
tags:
  - 'packet-sniffer'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/packet-sniffer
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

数据包嗅探器是一种工具，可捕获和分析进入、离开或经过路由器的数据包。在诊断网络或防范网络攻击时，数据包嗅探非常有用。

:::warning
启用 client-to-client forwarding 的 Wireless 客户端之间的单播流量不会对嗅探工具可见。

**Warning:** 在网桥上启用硬件卸载后处理的数据包将不可见（泛洪数据包，例如未知单播、广播和多播流量，可能可见）。

**Tip:** Sniffer 会在数据包进入防火墙之前（direction=rx）或离开防火墙之后（direction=tx）捕获数据包。
:::

## Packet Sniffer 配置 {#packet-sniffer-configuration}

RouterOS 内置嗅探器允许你基于多种协议捕获数据包。

在以下示例中，我们将配置嗅探器以匹配经过 ether1 接口的数据包：

```ros
[admin@MikroTik] > /tool/sniffer/start interface=ether1           
[admin@MikroTik] > /tool/sniffer/stop                             
[admin@MikroTik] > /tool/sniffer/save file-name=/flash/test.pcap            
MikroTik] > /file/print where name~"test" 
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME        TYPE  SIZE  CREATION-TIME       
9  flash/test.pcap  file  3696  2019-12-04 10:48:16
```

你可以从 file 部分下载捕获的数据包。然后可以使用数据包分析工具，例如 [Wireshark](https://www.wireshark.org/)，来分析文件：

![](/img/51eba29d22b6b595.webp)

如果你使用数据包流传输到 PC 并使用 Wireshark，为确保只查看流式传输的数据，需要应用与嗅探器所用端口匹配的过滤器；默认使用 37008。此外，建议使用 `filter-stream=yes`。

![](/img/8c085953276cc99e.png)

:::warning
请注意，嗅探到的数据包仅保留 10 分钟。如果需要永久保存，请设置“file-name”以直接保存，或按前文所述执行“save”命令。

**Important:** 从 RouterOS 7.20 开始，嗅探工具会以 PCAPNG 格式保存捕获的数据包。[traffic-generator inject-pcap](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator) 功能从 RouterOS 7.21 开始支持 PCAPNG 格式。
:::

**子菜单：** `/tool/sniffer`

| 属性 | 说明 |
| :-- | :-- |
| **file-limit** (*integer 10..4294967295[KiB]*；默认值：**1000KiB**) | 文件大小限制。达到限制后，Sniffer 将停止。 |
| **file-name** (*string*；默认值：) | 保存捕获数据包的文件名。 |
| **filter-cpu** (*integer*；默认值：) | 用作过滤器的 CPU 核心。 |
| **filter-ip-address** (*ip/mask[,ip/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IP 地址。 |
| **filter-dst-ip-address** (*ip/mask[,ip/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IP 目的地址。 |
| **filter-src-ip-address** (*ip/mask[,ip/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IP 源地址。 |
| **filter-ipv6-address** (*ipv6/mask[,ipv6/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IPv6 地址。 |
| **filter-dst-ipv6-address** (*ipv6/mask[,ipv6/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IPv6 目的地址。 |
| **filter-src-ipv6-address** (*ipv6/mask[,ipv6/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 IPv6 源地址。 |
| **filter-mac-address** (*mac/mask[,mac/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 MAC 地址和 MAC 地址掩码。 |
| **filter-dst-mac-address** (*mac/mask[,mac/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 MAC 目的地址和 MAC 地址掩码。 |
| **filter-src-mac-address** (*mac/mask[,mac/mask] (max 16 items)*；默认值：) | 最多 16 个用作过滤器的 MAC 源地址和 MAC 地址掩码。 |
| **filter-port** (*[!]port[,port] (max 16 items)*；默认值：) | 最多 16 个以逗号分隔的端口用作过滤器。也可使用预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-dst-port** (*[!]port[,port] (max 16 items)*；默认值：) | 最多 16 个以逗号分隔的目的端口用作过滤器。也可使用预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-src-port** (*[!]port[,port] (max 16 items)*；默认值：) | 最多 16 个以逗号分隔的源端口用作过滤器。也可使用预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-ip-protocol** (*[!]protocol[,protocol] (max 16 items)*；默认值：) | 最多 16 个以逗号分隔的 IP/IPv6 协议用作过滤器。IP 协议（可使用协议编号代替协议名称）：<ul><li><strong>ipsec-ah</strong> - IPsec AH 协议</li><li><strong>ipsec-esp</strong> - IPsec ESP 协议</li><li><strong>ddp</strong> - 数据报交付协议</li><li><strong>egp</strong> - 外部网关协议</li><li><strong>ggp</strong> - 网关到网关协议</li><li><strong>gre</strong> - 通用路由封装</li><li><strong>hmp</strong> - 主机监控协议</li><li><strong>idpr-cmtp</strong> - idpr 控制消息传输</li><li><strong>icmp</strong> - 互联网控制消息协议</li><li><strong>icmpv6</strong> - 互联网控制消息协议 v6</li><li><strong>igmp</strong> - 互联网组管理协议</li><li><strong>ipencap</strong> - ip 中封装 ip</li><li><strong>ipip</strong> - ip 封装</li><li><strong>encap</strong> - ip 封装</li><li><strong>iso-tp4</strong> - iso 传输协议第 4 类</li><li><strong>ospf</strong> - 开放最短路径优先</li><li><strong>pup</strong> - parc 通用数据包协议</li><li><strong>pim</strong> - 协议无关组播</li><li><strong>rspf</strong> - 无线最短路径优先</li><li><strong>rdp</strong> - 可靠数据报协议</li><li><strong>st</strong> - st 数据报模式</li><li><strong>tcp</strong> - 传输控制协议</li><li><strong>udp</strong> - 用户数据报协议</li><li><strong>vmtp</strong> - 通用消息传输</li><li><strong>vrrp</strong> - 虚拟路由器冗余协议</li><li><strong>xns-idp</strong> - xerox xns idp</li><li><strong>xtp</strong> - xpress 传输协议</li></ul> |
| **filter-mac-protocol**(*[!]protocol[,protocol] (max 16 items)*；默认值：) | 最多 16 个以逗号分隔的条目用作过滤器。MAC 协议（可使用协议编号代替协议名称）：<ul><li><strong>802.2</strong> - 802.2 帧（0x0004）</li><li><strong>arp</strong> - 地址解析协议（0x0806）</li><li><strong>capsman</strong> - CAPsMAN 到 CAP 的 MAC 层连接（0x88BB）</li><li><strong>dot1x</strong> - EAPoL IEEE 802.1X（0x888E）</li><li><strong>homeplug-av</strong> - HomePlug AV MME（0x88E1）</li><li><strong>ip</strong> - 互联网协议版本 4（0x0800）</li><li><strong>ipv6</strong> - 互联网协议版本 6（0x86DD）</li><li><strong>ipx</strong> - 互联网包交换协议（0x8137）</li><li><strong>lacp</strong> - 链路聚合控制协议（0x8809）</li><li><strong>lldp</strong> - 链路层发现协议（0x88CC）</li><li><strong>loop-protect</strong> - Loop Protect Protocol（0x9003）</li><li><strong>macsec</strong> - MAC security IEEE 802.1AE（0x88E5）</li><li><strong>mpls-multicast</strong> - MPLS 组播（0x8848）</li><li><strong>mpls-unicast</strong> - MPLS 单播（0x8847）</li><li><strong>mvrp</strong> - 多 VLAN 注册协议（0x88F5）</li><li><strong>packing-compr</strong> - 使用压缩 <a href="/docs/system-information-and-utilities/ip-packing">IP packing</a> 封装的数据包（0x9001）</li><li><strong>packing-simple</strong> - 使用简单 <a href="/docs/system-information-and-utilities/ip-packing">IP packing</a> 封装的数据包（0x9000）</li><li><strong>pppoe</strong> - PPPoE 会话阶段（0x8864）</li><li><strong>pppoe-discovery</strong> - PPPoE 发现阶段（0x8863）</li><li><strong>rarp</strong> - 反向地址解析协议（0x8035）</li><li><strong>romon</strong> - Router Management Overlay Network RoMON（0x88BF）</li><li><strong>service-vlan</strong> - Provider Bridging（IEEE 802.1ad）和 Shortest Path Bridging IEEE 802.1aq（0x88A8）</li><li><strong>vlan</strong> - 带 VLAN 标签的帧（IEEE 802.1Q）和兼容 NNI 的 Shortest Path Bridging IEEE 802.1aq（0x8100）</li></ul> |
| **filter-stream** (*yes \| no*；默认值：**yes**) | 发往 Sniffer 服务器的捕获数据包将被忽略。 |
| **filter-size** (*integer[-integer]:0..65535*；默认值：) | 按指定大小或字节大小范围过滤数据包。 |
| **filter-direction**(*any \| rx \| tx*；默认值：) | 指定应用过滤的方向。 |
| **filter-interface** (*all \| name*；默认值：**all**) | Sniffer 运行的接口名称。**all** 表示 Sniffer 将在所有接口上捕获数据包。 |
| **filter-operator-between-entries** (*and \| or*；默认值：**or**) | 更改包含多个条目的过滤器的逻辑。 |
| **filter-vlan** (*integer[,integer]:0..4095*；默认值：) | 最多 16 个用作过滤器的 VLAN ID。 |
| **memory-limit**(*integer 10..4294967295[KiB]*；默认值：**100KiB**) | 用于存储捕获数据的内存量。 |
| **memory-scroll** (*yes \| no*；默认值：**yes**) | 达到内存限制时是否覆盖较旧的捕获数据。 |
| **only-headers**(*yes \| no*；默认值：**no**) | 仅在内存中保存数据包头，而不保存整个数据包。 |
| **show-frame (*yes \| no*；默认值：no)** | 在命令行运行快速 Sniffer 时是否查看帧内容。 |
| **streaming-enabled** (*yes \| no*；默认值：**no**) | 定义是否将捕获的数据包发送到流式服务器。 |
| **streaming-server** (*IP*；默认值：**0.0.0.0**) | Tazmen Sniffer Protocol（TZSP）流接收端。 |
| **streaming-port** (*port*；默认值：**37008** ) | 发送 TZSP 数据包的端口。 |

:::danger
`file-size` 限制不应配置为大于可用空闲内存的值！
:::

### Packet Sniffer 快速模式 {#packet-sniffer-quick-mode}

快速模式会在数据包经过有限大小缓冲区过滤后显示结果。可设置多个属性用于过滤。如果未设置任何属性，将使用当前配置。

```ros
[admin@MikroTik] > /tool/sniffer/quick ip-protocol=icmp
Columns: INTERFace, TIME, NUm, DIr, SRC-MAC, DST-MAC, SRC-ADDRESS, DST-ADDRESS, PROTOCOl, SIze, Cpu, FP
INTERF  TIME    NU  DI  SRC-MAC            DST-MAC            SRC-ADDRESS     DST-ADDRESS     PROTOCO  SI  C  FP
ether7  35.472  79  <-  6C:3B:6B:ED:83:69  6C:3B:6B:ED:81:83  10.155.126.252  10.155.126.253  ip:icmp  70  7  no
ether7  35.472  80  ->  6C:3B:6B:ED:81:83  6C:3B:6B:ED:83:69  10.155.126.253  10.155.126.252  ip:icmp  70  7  no
ether1  35.595  81  <-  6C:3B:6B:ED:83:63  6C:3B:6B:ED:81:7D  172.24.24.2     172.24.24.1     ip:icmp  70  4  no
ether1  35.595  82  ->  6C:3B:6B:ED:81:7D  6C:3B:6B:ED:83:63  172.24.24.1     172.24.24.2     ip:icmp  70  4  no
ether7  36.457  83  <-  6C:3B:6B:ED:83:69  6C:3B:6B:ED:81:83  10.155.126.252  10.155.126.253  ip:icmp  70  7  no
ether7  36.457  84  ->  6C:3B:6B:ED:81:83  6C:3B:6B:ED:83:69  10.155.126.253  10.155.126.252  ip:icmp  70  7  no
ether1  36.6    85  <-  6C:3B:6B:ED:83:63  6C:3B:6B:ED:81:7D  172.24.24.2     172.24.24.1     ip:icmp  70  4  no
ether1  36.6    86  ->  6C:3B:6B:ED:81:7D  6C:3B:6B:ED:83:63  172.24.24.1     172.24.24.2     ip:icmp  70  4  no
```

:::warning
除非设置 *fast-path* 参数，否则在同一接口上使用 Packet Sniffer 时无法看到 Traffic-Generator 数据包。
:::

### Packet Sniffer 协议 {#packet-sniffer-protocols}

在此子菜单中，可以查看所有捕获的协议及其在捕获总量中的占比。

```ros
[admin@MikroTik] /tool/sniffer/protocol> print 
 # PROTOCOL IP-PROTOCOL PORT                                     PACKETS      BYTES        SHARE
 0 802.2                                                              1         60        0.05%
 1 ip                                                               215     100377       99.04%
 2 arp                                                                2        120        0.11%
 3 ipv6                                                               6        788        0.77%
 4 ip       tcp                                                     210      99981       98.65%
 5 ip       udp                                                       3        228        0.22%
 6 ip       ospf                                                      2        168        0.16%
 7 ip       tcp         8291 (winbox)                               210      99981       98.65%
 8 ip       tcp         36771                                       210      99981       98.65%
 9 ip       udp         646                                           3        228        0.22%
```

### 数据包嗅探器主机 {#packet-sniffer-host}

该子菜单显示参与你所嗅探的数据交换的主机列表。

```ros
[admin@MikroTik] /tool/sniffer/host> print 
 # ADDRESS         RATE                PEEK-RATE           TOTAL            
 0 10.5.101.3      0bps/0bps           0bps/720bps         0/90             
 1 10.5.101.10     0bps/0bps           175.0kbps/19.7kbps  61231/7011       
 2 10.5.101.13     0bps/0bps           0bps/608bps         0/76             
 3 10.5.101.14     0bps/0bps           0bps/976bps         0/212            
 4 10.5.101.15     0bps/0bps           19.7kbps/175.0kbps  7011/61231       
 5 224.0.0.2       0bps/0bps           608bps/0bps         76/0             
 6 224.0.0.5       0bps/0bps           1440bps/0bps        302/0 
```

### 数据包嗅探器连接 {#packet-sniffer-connections}

在此可获取嗅探期间监视的连接列表。

```ros
[admin@MikroTik] /tool/sniffer/connection> print
Flags: A - active
  #   SRC-ADDRESS       DST-ADDRESS             BYTES     RESENDS   MSS
  0 A 10.0.0.241:1839   10.0.0.181:23 (telnet)  6/42      60/0      0/0
  1 A 10.0.0.144:2265   10.0.0.181:22 (ssh)     504/252   504/0     0/0
```
