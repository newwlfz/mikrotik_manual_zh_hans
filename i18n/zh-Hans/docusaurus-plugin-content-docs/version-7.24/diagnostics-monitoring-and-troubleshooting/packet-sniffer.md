---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/packet-sniffer"
sidebar_position: 4
title: "数据包嗅探器"
sidebar_label: "数据包嗅探器"
description: "Packet Sniffer 是一款 MikroTik RouterOS 工具，用于捕获和分析网络数据包，以诊断问题或检测安全威胁。它支持按 IP、MAC、端口、协议等过滤，并可将数据包保存为 PCAPNG 格式或将其流式传输到 PC 进行分析。"
tags:
  - 'packet-sniffer'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/packet-sniffer
captured_at: '2026-11-04T11:28:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

A packet sniffer 是一种工具，可以捕获并分析发往路由器、从路由器发出或经过路由器的数据包。数据包嗅探在诊断网络或防范网络攻击时非常有用。

:::warning
启用了客户端到客户端转发的无线客户端之间的单播流量将不会对嗅探器工具可见。

**警告：** 在网桥上启用硬件卸载后处理的数据包将不可见（未知单播、广播和组播等泛洪流量可能可见）。

**提示：** 嗅探器会在数据包进入防火墙之前（direction=rx）或离开防火墙之后（direction=tx）捕获数据包。
:::

## 数据包嗅探器配置 {#packet-sniffer-configuration}

RouterOS 内置嗅探器允许你基于各种协议捕获数据包。

在以下示例中，我们将配置嗅探器来匹配经过 ether1 接口的数据包：

```ros
[admin@MikroTik] > /tool/sniffer/start interface=ether1           
[admin@MikroTik] > /tool/sniffer/stop                             
[admin@MikroTik] > /tool/sniffer/save file-name=/flash/test.pcap            
MikroTik] > /file/print where name~"test" 
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME        TYPE  SIZE  CREATION-TIME       
9  flash/test.pcap  file  3696  2019-12-04 10:48:16
```

你可以从文件部分下载捕获的数据包。然后可以使用 [Wireshark](https://www.wireshark.org/) 等数据包分析器来分析文件：

![](/img/51eba29d22b6b595.webp)

如果你将数据包流式传输到 PC 并使用 Wireshark，为确保只查看流式传输的数据，需要应用与嗅探器所用端口匹配的过滤器；默认使用 37008。此外，建议使用 `filter-stream=yes`。

![](/img/8c085953276cc99e.png)

:::warning
请注意，嗅探到的数据包将保留 10 分钟。如果需要永久保存，请设置 "file-name" 直接保存它们，或如前所述执行 "save" 命令。

**重要：** 从 RouterOS 7.20 开始，嗅探器工具以 PCAPNG 格式保存捕获的数据包。[流量生成器](./traffic-generator.md) 功能从 RouterOS 7.21 开始支持 PCAPNG 格式。
:::

**子菜单：** `/tool/sniffer`

| 属性 | 描述 |
| :-- | :-- |
| **file-limit** (*integer 10..4294967295[KiB]*；默认值：**1000KiB**) | 文件大小限制。达到限制时，嗅探器将停止。 |
| **file-name** (*string*；默认值：) | 保存嗅探到的数据包的文件名。 |
| **filter-cpu** (*integer*；默认值：) | 用作过滤器的 CPU 核心。 |
| **filter-ip-address** (*ip/mask[,ip/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IP 地址。 |
| **filter-dst-ip-address** (*ip/mask[,ip/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IP 目标地址。 |
| **filter-src-ip-address** (*ip/mask[,ip/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IP 源地址。 |
| **filter-ipv6-address** (*ipv6/mask[,ipv6/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IPv6 地址。 |
| **filter-dst-ipv6-address** (*ipv6/mask[,ipv6/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IPv6 目标地址。 |
| **filter-src-ipv6-address** (*ipv6/mask[,ipv6/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 IPv6 源地址。 |
| **filter-mac-address** (*mac/mask[,mac/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 MAC 地址和 MAC 地址掩码。 |
| **filter-dst-mac-address** (*mac/mask[,mac/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 MAC 目标地址和 MAC 地址掩码。 |
| **filter-src-mac-address** (*mac/mask[,mac/mask]（最多 16 项）*；默认值：) | 最多 16 个用作过滤器的 MAC 源地址和 MAC 地址掩码。 |
| **filter-port** (*[!]port[,port]（最多 16 项）*；默认值：) | 最多 16 个逗号分隔的端口用作过滤器。还提供预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-dst-port** (*[!]port[,port]（最多 16 项）*；默认值：) | 最多 16 个逗号分隔的目标端口用作过滤器。还提供预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-src-port** (*[!]port[,port]（最多 16 项）*；默认值：) | 最多 16 个逗号分隔的源端口用作过滤器。还提供预定义端口名称列表，例如 ssh 和 telnet。 |
| **filter-ip-protocol** (*[!]protocol[,protocol]（最多 16 项）*；默认值：) | 最多 16 个逗号分隔的 IP/IPv6 协议用作过滤器。IP 协议（可以使用协议编号代替协议名称）：ipsec-ah - IPsec AH protocolipsec-esp - IPsec ESP protocolddp - datagram delivery protocolegp - exterior gateway protocolggp - gateway-gateway protocolgre - general routing encapsulationhmp - host monitoring protocolidpr-cmtp - idpr control message transporticmp - internet control message protocolicmpv6 - internet control message protocol v6igmp - internet group management protocolipencap - ip encapsulated in ipipip - ip encapsulationencap - ip encapsulationiso-tp4 - iso transport protocol class 4ospf - open shortest path firstpup - parc universal packet protocolpim - protocol independent multicastrspf - radio shortest path firstrdp - reliable datagram protocolst - st datagram modetcp - transmission control protocoludp - user datagram protocolvmtp - versatile message transportvrrp - virtual router redundancy protocolxns-idp - xerox xns idpxtp - xpress transfer protocol |
| **filter-mac-protocol**(*[!]protocol[,protocol]（最多 16 项）*；默认值：) | 最多 16 个逗号分隔的条目用作过滤器。MAC 协议（可以使用协议编号代替协议名称）：802.2 - 802.2 Frames (0x0004)arp - Address Resolution Protocol (0x0806)capsman - CAPsMAN to CAP MAC layer connection (0x88BB)dot1x - EAPoL IEEE 802.1X (0x888E)homeplug-av - HomePlug AV MME (0x88E1)ip - Internet Protocol version 4 (0x0800)ipv6 - Internet Protocol Version 6 (0x86DD)ipx - Internetwork Packet Exchange (0x8137)lacp - Link Aggregation Control Protocol (0x8809)lldp - Link Layer Discovery Protocol (0x88CC)loop-protect - Loop Protect Protocol (0x9003)macsec - MAC security IEEE 802.1AE (0x88E5)mpls-multicast - MPLS multicast (0x8848)mpls-unicast - MPLS unicast (0x8847)mvrp - Multiple VLAN Registration protocol (0x88F5)packing-compr - Encapsulated packets with compressed IP packing (0x9001)packing-simple - Encapsulated packets with simple IP packing (0x9000)pppoe - PPPoE Session Stage (0x8864)pppoe-discovery - PPPoE Discovery Stage (0x8863)rarp - Reverse Address Resolution Protocol (0x8035)romon - Router Management Overlay Network RoMON (0x88BF)service-vlan - Provider Bridging (IEEE 802.1ad) &amp; Shortest Path Bridging IEEE 802.1aq (0x88A8)vlan - VLAN-tagged frame (IEEE 802.1Q) and Shortest Path Bridging IEEE 802.1aq with NNI compatibility (0x8100) |
| **filter-stream** (*yes \| no*；默认值：**yes**) | 发往嗅探器服务器的嗅探数据包将被忽略。 |
| **filter-size** (*integer[-integer]:0..65535*；默认值：) | 按指定大小或大小范围（字节）过滤数据包。 |
| **filter-direction**(*any \| rx \| tx*；默认值：) | 指定将应用过滤的方向。 |
| **filter-interface** (*all \| name*；默认值：**all**) | 嗅探器运行所在的接口名称。**all** 表示嗅探器将在所有接口上嗅探数据包。 |
| **filter-operator-between-entries** (*and \| or*；默认值：**or**) | 更改具有多个条目的过滤器逻辑。 |
| **filter-vlan** (*integer[,integer]:0..4095*；默认值：) | 最多 16 个用作过滤器的 VLAN ID。 |
| **memory-limit**(*integer 10..4294967295[KiB]*；默认值：**100KiB**) | 用于存储嗅探数据的内存大小。 |
| **memory-scroll** (*yes \| no*；默认值：**yes**) | 达到内存限制时是否覆盖较旧的嗅探数据。 |
| **only-headers**(*yes \| no*；默认值：**no**) | 仅在内存中保存数据包的头部，而不是整个数据包。 |
| **show-frame (*yes \| no*；默认值：no)** | 在命令行中运行快速嗅探器时是否查看帧内容。 |
| **streaming-enabled** (*yes \| no*；默认值：**no**) | 定义是否将嗅探到的数据包发送到流服务器。 |
| **streaming-server** (*IP*；默认值：**0.0.0.0**) | Tazmen Sniffer Protocol (TZSP) 流接收器。 |
| **streaming-port** (*port*；默认值：**37008** ) | 将 TZSP 数据包流式传输到的端口。 |

:::danger
`file-size` 限制不应配置为超过可用空闲内存！
:::

### 数据包嗅探器快速模式 {#packet-sniffer-quick-mode}

快速模式会在数据包被过滤出来时显示结果，并使用大小受限的数据包缓冲区。可以为过滤设置多个属性。如果未设置任何属性，则将使用当前配置。

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
除非设置了 *fast-path* 参数，否则在同一接口上使用数据包嗅探器时，Traffic-Generator 数据包将不可见。
:::

### 数据包嗅探器协议 {#packet-sniffer-protocols}

在此子菜单中，可以查看所有嗅探到的协议及其在总嗅探量中的占比。

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

该子菜单显示参与了你所嗅探的数据交换的主机列表。

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

在这里可以获取在嗅探期间监视到的连接列表。

```ros
[admin@MikroTik] /tool/sniffer/connection> print
Flags: A - active
  #   SRC-ADDRESS       DST-ADDRESS             BYTES     RESENDS   MSS
  0 A 10.0.0.241:1839   10.0.0.181:23 (telnet)  6/42      60/0      0/0
  1 A 10.0.0.144:2265   10.0.0.181:22 (ssh)     504/252   504/0     0/0
```
