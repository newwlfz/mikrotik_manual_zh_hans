---
title: "流量生成器"
description: "Traffic Generator 是 MikroTik RouterOS 中用于评估设备性能的工具，通过在端口上生成并发送原始数据包，收集延迟、抖动、吞吐量和丢包数据。它支持 OOO 检测和 PCAP 注入等高级功能，并提供可配置的属性和命令，便于快速设置。"
tags:
  - 'traffic-generator'
  - 'packet-generation'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/traffic-generator
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Traffic Generator 是一种用于评估 DUT（Device Under Test）或 SUT（System Under Test）性能的工具。

该工具可以在指定端口上生成并发送 RAW 数据包。它还会收集延迟和抖动值、TX/RX 速率、统计丢失的数据包，并检测 Out-of-Order（OOO）数据包。

Traffic Generator 的用法类似于 [bandwidth test](/docs/7.24/diagnostics-monitoring-and-troubleshooting/bandwidth-test) 工具，也可以生成会被路由回数据包生成器的报文，以收集高级状态信息。

:::info
在生成数据包的设备中，无法使用 sniffer 工具、torch 或出接口上的防火墙捕获 traffic-generator 生成的数据包。

由于该工具可能被恶意使用，可以通过输入命令 '/system/device-mode/update traffic-gen=no' 并按住 reset 按钮来锁定此功能。
:::

## 常规 {#general}

**子菜单：** `/tool/traffic-generator`

此菜单用于设置 traffic generator 的通用属性，并包含快速启动和停止该工具的命令。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **latency-distribution-max** (*time*；默认值：**100us**) | 延迟分布测量的最大延迟范围。RouterOS 将基于该值决定使用哪个延迟范围作为 latency-distribution-measure-interval 属性 |
| **measure-out-of-order** (*yes \| no*；默认值：) | 是否测量乱序数据包。默认值取决于 CPU 类型（多核 CPU 默认 **no**；单核 CPU 默认 **yes**）。在多核设备上启用该属性时，单个流将仅使用一个 CPU 核心 |
| **stats-samples-to-keep** (*integer*；默认值：**100**) | 收集多少个数据样本 |
| **test-id** (*integer [0..255]*；默认值：**0**) |  |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **latency-distribution-samples** (*integer*) | 显示 latency-distribution-measure-interval 被划分为多少个单独的时间段 |
| **latency-distribution-measure-interval** (*time*) | 显示总延迟测量范围 |
| **running** (*yes \| no*) | 显示流量生成器工具是否已启动。 |

### 命令 {#commands}

| 属性 | 说明 |
| :-- | :-- |
| **quick** () | 该命令可快速启动数据包生成器，并将统计输出打印到终端。该命令还接受多个参数，用于覆盖数据包模板和流设置中的配置。可接受的参数为 <strong>duration、entries-to-show、freeze-frame-interval、id、interface、mbps、measure-out-of-order、packet-count、packet-size、port、pps、stream、test-id、tx-template</strong><ul><li>tx-template - 用于生成流量的数据包模板（最多 16 个模板）</li><li>duration - 测试运行时长</li><li>entries-to-show - 打印到终端的状态行数</li><li>freeze-frame-interval - 状态更新到终端的频率</li></ul> 其余参数不是该命令特有的，在其他位置说明。 <br/>运行 quick 命令时指定的参数会覆盖已配置的值。如果某个参数仅针对一个报头指定，则该值会应用于所有其他报头（如需要）。 |
| **start** () | 该命令在后台启动流量生成器工具。它接受一个参数 **test-id**。 |
| **stop** () | 该命令停止由 **start** 命令启动的流量生成器工具。 |
| **inject** () | 将原始数据注入接口。 |
| **inject-pcap** () | 直接从 PCAP 或 PCAPNG 文件注入原始数据。 <br/><br/><strong>重要：</strong>从 RouterOS 7.20 开始，<a href="/docs/7.24/diagnostics-monitoring-and-troubleshooting/packet-sniffer">sniffer 工具</a>会将捕获的数据包保存为 PCAPNG 格式。 <br/> traffic-generator 的 inject-pcap 功能从 RouterOS 7.21 开始支持 PCAPNG 格式。 <br/> |

## 数据包模板 {#packet-template}

**子菜单：** `/tool/traffic-generator/packet-template`

该子菜单用于根据提供的参数构建数据包。根据参数，可以构建带 VLAN 标签的 IP 数据包并设置 UDP 端口。原始数据包模板会根据提供的参数生成。

如果需要更底层的数据包，或要充分利用流量生成器，请使用 raw-packet-template 构建器来构建数据包。

如果同一类型的报头在数据包中出现多次，则报头字段值以逗号分隔列表形式传递。（例如，如果有两个 IP 报头，则源地址写为“IP-src=1.1.1.1,2.2.2.2”。）

为了更快地构建报头，许多报头字段值会采用假定值。例如，如果报头栈为“mac, IP”，则流量生成器可以假定 mac-protocol 值为“IP”。或者，如果指定了“port”或“interface”设置，则流量生成器可以假定“mac-src”为接口的 MAC 地址。假定值具有以“assumed-”开头的特定名称，并且为只读。手动指定的值会覆盖假定值。

:::info
假定值不会自动更新。编辑模板后会假定新值。执行“packet-template set 0”即可触发新的假定值
:::

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*；Default: ) | 正在构建的数据包的简短描述。 |
| **compute-checksum-from-offset** (*no-checksum \| integer[0..4294967295]*；Default: ) | 指定从数据包中的哪个字节偏移开始计算 2 字节校验和（示例：设置为 14，可在计算校验和时跳过数据包的 Ethernet 头） |
| **data** (*incrementing \| random \| specific-byte \| uninitialized*；Default: **uninitialized**) | 指定数据包载荷的填充方式：<ul><li><strong>uninitialized</strong> - 数据包数据（头之后）未初始化，但不为零。最快。</li><li><strong>specific-byte</strong> - 与 data-byte 设置配合使用</li><li><strong>incrementing</strong> - 数据包数据按“00 01 02 03”等依次填充</li><li><strong>random</strong> - 数据包数据用随机字节填充。最慢。</li></ul> |
| **data-byte** (*hex [0..FF]*；Default: **0**) | 用于填充数据包载荷的字节。 |
| **interface** (*string*；Default: ) | 数据包模板的可选参数。该参数与“port”设置互斥。指定“interface”后，用户无需在 port 菜单中为该接口创建 port 条目。实际上，port 条目会动态创建。这适用于运行快速测试。 |
| **ip-dscp** (*list of integer[0..255] (max 16 times)*；Default: ) | 将在 IP 头中设置的一个或多个 DS 字段（DS 字段包含 DSCP 值和 ECN 值） |
| **ip-dst** (*list of IP/Netmask (max 16 times)*；Default: ) | 生成 IP 头时使用的一个或多个目标 IP 地址。 |
| **ip-frag-off** (*list of integer[0..65535] (max 16 times)*；Default: ) | IP 头中的一个或多个分片偏移。 |
| **ip-gateway** (*IP*；Default: ) | 当发送方和接收方是同一设备时，无法根据 **ip-dst** 自动确定下一跳。如果指定了 ip-gateway，数据包模板将根据解析出的 ip-gateway 假定目标 MAC 地址。 |
| **ip-id** (*list of integer [0..65535]*；Default: ) |  |
| **ip-protocol** (*list of IP protocols (max 16 times)*；Default: ) |  |
| **ip-src** (*list of IP/Mask (max 16 times)*；Default: ) |  |
| **ip-ttl** (*list of integer [0..255] (max 16 times)*；Default: ) |  |
| **mac-dst** (*list of MAC/MASK (max 16 times)*；Default: ) |  |
| **mac-protocol** (*list of mac protocols (max 16 times)*；Default: ) |  |
| **mac-src** (*list of MAC/MASK (max 16 times)*；Default: ) |  |
| **name** (*string*；Default: ) | 模板的描述性名称。 |
| **port** (*string*；Default: ) | 数据包模板的可选参数。该参数建议通过某个端口发送使用该模板生成的数据包。端口也可在其他位置指定，例如 stream 设置中。该参数与 interface 设置互斥。 |
| **raw-header** (*string (max 16 times)*；Default: ) | 以十六进制格式字符串表示的原始数据包头。 |
| **udp-dst-port** (*list of port [0..65535]/mask [0..FFFF] (max 16 times)*；Default: ) |  |
| **udp-src-port** (*list of port [0..65535]/mask [0..FFFF] (max 16 times)*；Default: ) |  |
| **vlan-id** (; Default: ) |  |
| **vlan-priority** (; Default: ) |  |
| **vlan-protocol** (; Default: ) |  |
| **header-stack** (*list of ip \| mac \| raw \| udp \| vlan (max 16 times)*；Default: **ip**) | 生成的数据包应具有的一系列头。当前支持：<br/><ul><li><strong>mac</strong> - Ethernet 头（14 字节）</li><li><strong>vlan</strong> - Ethernet VLAN 标签（4 字节）</li><li><strong>ip</strong> - IPv4 头（20 字节）</li><li><strong>udp</strong> - UDP 头（8 字节）</li><li><strong>raw</strong> - 以十六进制字符串指定的任意字节</li></ul> 大多数头类型可以在头中多次出现。每个数据包只能有 2 个 IP 头和 1 个 UDP 头。根据我们对网络协议的实际经验，对可能的头序列施加了一些限制（例如，VLAN 头只能跟在 mac 头或另一个 VLAN 头之后）。<br/>流量生成器会在 port 菜单中为数据包模板建议第一个头。但不会强制使用该头。 |

## 端口配置 {#port-configuration}

**子菜单：** `/tool/traffic-generator/port`

该菜单用于配置将与特定接口关联、并用于接收/发送生成数据包的端口。

**Properties**

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；Default: **no**) | 端口是否被禁用且不参与接收/发送数据包 |
| **name** (*string*；Default: ) | 端口的描述性名称 |
| **interface** (*string*；Default: ) | 与端口关联的接口名称。 |

### 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) | 端口配置是否自动生成。 |
| **first-header** (*ip \| mac \| raw \| udp \| vlan*) | 显示从指定接口发出的数据包建议使用的第一个头。创建数据包模板时可使用该信息。 |
| **inactive** (*yes \| no*) | 端口是否处于非活动状态且无法参与数据包的 tx/rx。 |

## 统计信息 {#stats}

**子菜单：** `/tool/traffic-generator/stats`

如果流量生成器未以 **quick** 模式运行，则测试的所有统计信息都存储在此菜单中。

### 延迟分布 {#latency-distribution}

**子菜单：** `/tool/traffic-generator/stats/latency-distribution`

此子菜单显示在特定延迟范围内接收到的数据包数量。延迟范围可以按流或按序列查看（例如，**print stream-num=3**、**print seq=10**）

以下是延迟图表的示例输出：

```ros
[admin@test-host] /tool/traffic-generator/stats/latency-distribution> print            
 # LATENCY                 COUNT        SHARE GRAPH                                               
 0 0-15.5us                    0           0%
 1 15.5us-31us                 0           0%
 2 31us-46.5us                 0           0%
 3 46.5us-62.1us               0           0%
 4 62.1us-77.6us               0           0%
 5 77.6us-93.1us               0           0%
 6 93.1us-109us                0           0%
 7 109us-124us                 0           0%
 8 124us-140us                 0           0%
 9 140us-155us                 0           0%
10 155us-171us                 0           0%
11 171us-186us                 4           0% *                                                   
12 186us-202us                29           0% *                                                   
13 202us-217us                90       0.001% *                                                   
14 217us-233us               302       0.004% *                                                   
15 233us-248us               630       0.009% *                                                   
16 248us-264us               789       0.011% *                                                   
17 264us-279us             1 384       0.021% -*                                                  
18 279us-295us             1 990        0.03% --*                                                 
19 295us-310us             2 966       0.045% ---*                                                
20 310us-326us             4 089       0.062% -----*                                              
21 326us-341us             4 958       0.075% ------*                                             
22 341us-357us             6 059       0.091% -------*                                            
23 357us-372us             6 660       0.101% --------*                                           
24 372us-388us             8 320       0.126% ----------*                                         
25 388us-403us             9 988       0.151% -------------*                                      
26 403us-419us            11 781       0.178% ---------------*                                    
27 419us-434us            12 512       0.189% ----------------*                                   
28 434us-450us            13 836        0.21% -----------------*                                  
29 450us-465us            15 681       0.238% --------------------*                               
30 465us-481us            17 740       0.269% ----------------------*                             
31 481us-496us            19 913       0.302% --------------------------*                         
32 496us-512us            21 106        0.32% ---------------------------*                        
33 512us-528us            22 848       0.346% -----------------------------*                      
34 528us-543us            25 059        0.38% --------------------------------*                   
35 543us-559us            26 593       0.403% ----------------------------------*                 
36 559us-574us            27 663       0.419% -----------------------------------*                
37 574us-590us            29 351       0.445% -------------------------------------*              
38 590us-605us            31 265       0.474% ----------------------------------------*           
39 605us-621us            33 224       0.504% -------------------------------------------*        
40 621us-636us            34 464       0.523% --------------------------------------------*       
41 636us-652us            35 630        0.54% ----------------------------------------------*     
42 652us-667us            37 245       0.565% ------------------------------------------------*   
43 667us-683us            38 158       0.579% -------------------------------------------------*  
44 683us-698us            38 626       0.586% --------------------------------------------------* 
45 698us-714us            38 985       0.591% --------------------------------------------------* 
46 714us-729us            39 061       0.592% --------------------------------------------------* 
47 729us-745us            39 750       0.603% ---------------------------------------------------*
48 745us-760us            39 145       0.594% --------------------------------------------------* 
49 760us-776us            39 162       0.594% --------------------------------------------------* 
50 776us-791us            38 197       0.579% -------------------------------------------------*  
51 791us-807us            37 811       0.573% -------------------------------------------------*  
52 807us-822us            37 364       0.567% ------------------------------------------------*   
53 822us-838us            36 770       0.558% -----------------------------------------------*    
54 838us-853us            35 831       0.543% ----------------------------------------------*     
55 853us-869us            35 380       0.536% ----------------------------------------------*     
56 869us-884us            34 472       0.523% --------------------------------------------*       
57 884us-900us            33 672       0.511% -------------------------------------------*        
58 900us-915us            33 799       0.513% --------------------------------------------*       
59 915us-931us            32 754       0.497% ------------------------------------------*         
60 931us-946us            32 339        0.49% ------------------------------------------*         
61 946us-962us            32 419       0.492% ------------------------------------------*         
62 962us-977us            32 107       0.487% -----------------------------------------*          
63 977us-993us            31 552       0.478% -----------------------------------------*          
64 0-993us             1 221 523       18.54%
```

## 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **count** (*integer*) | 当前延迟范围内的数据包数量 |
| **graph** (*string*) | 占比的图形表示 |
| **latency** (*string*) | 延迟范围 |
| **share** (*percent*) | 落入该延迟范围的数据包百分比。 |

### 流统计 {#stream-stats}

**子菜单：** `/tool/traffic-generator/stats/stream`

该子菜单存储按流排序的统计信息。输出与 **quick** 模式相同。

```ros
[admin@test-host] /tool/traffic-generator/stats/stream> print 
 # SEQ    NUM     TX-PACKET   TX-RATE     RX-PACKET   RX-RATE   LOST-PACKET LOST-RATE
 0 1      3          43 064 499.5Mbps        25 180 292.0Mbps        17 884 207.4Mbps
 1 1      4          43 062 499.5Mbps        39 946 463.3Mbps         3 116  36.1Mbps
 2 1      TOT        86 126 999.0Mbps        65 126 755.4Mbps        21 000 243.6Mbps
 3 2      3          43 544 505.1Mbps        30 449 353.2Mbps        13 095 151.9Mbps
 4 2      4          43 543 505.0Mbps        42 982 498.5Mbps           561   6.5Mbps
 5 2      TOT        87 087 1010.2...        73 431 851.7Mbps        13 656 158.4Mbps

... 

59 20     TOT        87 277 1012.4...        73 755 855.5Mbps        13 522 156.8Mbps
60 21     3          43 546 505.1Mbps        30 605 355.0Mbps        12 941 150.1Mbps
61 21     4          43 546 505.1Mbps        42 682 495.1Mbps           864  10.0Mbps
62 21     TOT        87 092 1010.2...        73 287 850.1Mbps        13 805 160.1Mbps
63 TOT    3         913 942 504.8Mbps       629 210 347.5Mbps       284 732 157.2Mbps
64 TOT    4         913 939 504.8Mbps       898 374 496.2Mbps        15 565   8.5Mbps
65 TOT    TOT     1 827 881 1009.6...     1 527 584 843.8Mbps       300 297 165.8Mbps
```

### 端口统计 {#port-stats}

**子菜单：** `/tool/traffic-generator/stats/port`

该子菜单存储按 rx/tx 端口排序的统计信息。

```ros
[admin@test-host] /tool/traffic-generator/stats/port> print 
 # SEQ    PORT        RX-UNK-PACKET    RX-UNK-BYTE RX-UNK...     TX-PACKET   TX-RATE     RX-PACKET
 0 1      port0:et...             0              0      0bps        43 064 499.5Mbps        39 946
 1 1      port1:et...             0              0      0bps        43 062 499.5Mbps        25 180
 2 1      TOT                     0              0      0bps        86 126 999.0Mbps        65 126
 3 2      port0:et...             0              0      0bps        43 544 505.1Mbps        42 982
 4 2      port1:et...             0              0      0bps        43 543 505.0Mbps        30 449
 5 2      TOT                     0              0      0bps        87 087 1010.2...        73 431
 6 3      port0:et...             0              0      0bps        43 540 505.0Mbps        42 615
 7 3      port1:et...             0              0      0bps        43 540 505.0Mbps        30 191
 8 3      TOT                     0              0      0bps        87 080 1010.1...        72 806
```

### 原始统计信息 {#raw-stats}

**子菜单：** `/tool/traffic-generator/stats/raw`

该子菜单存储原始统计数据。

```ros
[admin@test-host] /tool/traffic-generator/stats/raw> print 
 # SEQ    PORT       NUM     TX-PACKET   TX-RATE     RX-PACKET   RX-RATE   LOST-PACKET LOST-RATE
 0 1      port0:e... 3          43 064 499.5Mbps             0      0bps        43 064 499.5Mbps
 1 1      port1:e... 3               0      0bps        25 180 292.0Mbps       -25 180 292.0Mbps
 2 1      TOT        3          43 064 499.5Mbps        25 180 292.0Mbps        17 884 207.4Mbps
 3 1      port0:e... 4               0      0bps        39 946 463.3Mbps       -39 946 463.3Mbps
 4 1      port1:e... 4          43 062 499.5Mbps             0      0bps        43 062 499.5Mbps
 5 1      TOT        4          43 062 499.5Mbps        39 946 463.3Mbps         3 116  36.1Mbps
 6 1      port0:e... TOT        43 064 499.5Mbps        39 946 463.3Mbps         3 118  36.1Mbps
 7 1      port1:e... TOT        43 062 499.5Mbps        25 180 292.0Mbps        17 882 207.4Mbps
 8 2      port0:e... 3          43 544 505.1Mbps             0      0bps        43 544 505.1Mbps
 9 2      port1:e... 3               0      0bps        30 449 353.2Mbps       -30 449 353.2Mbps
10 2      TOT        3          43 544 505.1Mbps        30 449 353.2Mbps        13 095 151.9Mbps
```

## Streams

### 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 是否禁用该流 |
| **mbps** (*integer [0..4294967295]*；默认：**0**) | 该流尝试生成的速率，单位为兆比特每秒。 |
| **name** (*string*；默认：) | 该流的描述性名称。 |
| **num** (*integer [0..15]*；默认：**0**) |  |
| **packet-size** (*integer[1..65535] [-integer[1..65535]]*；默认：**0**) | 生成的数据包大小，单位为字节。可设置为范围，以随机生成数据包大小。 |
| **port** (*string*；默认：) | 来自 Port 菜单中用于发送数据包的端口名称。 |
| **pps** (*integer [0..4294967295]*；默认：**0**) | 该流尝试生成的每秒数据包数。 |
| **tx-template** (*string*；默认：) | 来自 packet-template 或 raw-packet-template 菜单中用作数据包内容来源的数据包模板名称。 |

## 配置示例 {#configuration-examples}

### IPsec 隧道性能测试 {#ipsec-tunnel-performance-test}

考虑以下测试环境

![](/img/5bae37f27f75c657.webp)

System Under Test（SUT）由两台连接到流量生成器服务器的路由器组成。两台 SUT 路由器之间的连接使用 IPSec 加密。

流量生成器将运行两个流：

- 从 1.1.1.0/24 网络到 2.2.2.0/24 网络的方向。
- 从 2.2.2.0/24 网络到 1.1.1.0/24 网络的方向。

#### R1 路由和 IPsec 设置 {#r1-routing-and-ipsec-setup}

```ros
/ip/address
add address=192.168.33.1/30 interface=ether1
add address=1.1.1.2/24 interface=ether2

/ip/route 
add dst-address=2.2.2.0/24 gateway=192.168.33.2

/ip/ipsec/proposal
set default enc-algorithms=aes-128

/ip/ipsec/peer
add address=192.168.33.2 secret=123

/ip/ipsec/policy
add sa-src-address=192.168.33.1 sa-dst-address=192.168.33.2 \
    src-address=1.1.1.0/24 dst-address=2.2.2.0/24 tunnel=yes
```

#### R2 路由和 IPsec 设置 {#r2-routing-and-ipsec-setup}

```ros
/ip/address
add address=192.168.33.2/30 interface=ether1
add address=2.2.2.2/24 interface=ether2

/ip/route 
add dst-address=1.1.1.0/24 gateway=192.168.33.1

/ip/ipsec/proposal
set default enc-algorithms=aes-128

/ip/ipsec/peer
add address=192.168.33.1 secret=123

/ip/ipsec/policy
add sa-src-address=192.168.33.2 sa-dst-address=192.168.33.1 \
    src-address=2.2.2.0/24 dst-address=1.1.1.0/24 tunnel=yes
```

#### 流量生成器服务器设置 {#traffic-generator-server-setup}

```ros
/ip/address
add address=1.1.1.1/24 interface=ether2
add address=2.2.2.1/24 interface=ether3
```

首先，定义将用作流量生成器 tx/rx 端口的端口。

```ros
/tool/traffic-generator/port
add disabled=no interface=ether2 name=port0
add disabled=no interface=ether3 name=port1
```

要构造将要生成的数据包，需要使用 packet-template。

```ros
/tool/traffic-generator/packet-template
add header-stack=mac,ip,udp ip-dst=2.2.2.1/32 ip-gateway=1.1.1.2 ip-src=1.1.1.1/32 \
    name=routing-1 port=port0
add header-stack=mac,ip,udp ip-dst=1.1.1.1/32 ip-gateway=2.2.2.2 ip-src=2.2.2.1/32 \
    name=routing-2 port=port1
```

请注意，未指定 MAC 地址，因为模板生成器可以通过发送 ARP 消息自动假定下一跳 MAC 地址。由于我们正在进行路由，并且目标 IP 不可直接到达，因此设置了 **the ip-gateway** 参数以确定下一跳 MAC 地址。

运行 **print** 时，可以看到所有假定（检测到）的值，包括 MAC 地址。

```ros
[admin@test-host] /tool/traffic-generator/packet-template> print 
 0 name="routing-1" header-stack=mac,ip,udp port=port0 
   assumed-mac-dst=00:0C:42:00:38:9D assumed-mac-src=00:0C:42:40:94:25 
   assumed-mac-protocol=ip assumed-ip-dscp=0 assumed-ip-id=0 
   assumed-ip-frag-off=0 assumed-ip-ttl=64 assumed-ip-protocol=udp 
   ip-src=1.1.1.1/32 ip-dst=2.2.2.1/32 assumed-udp-src-port=100 
   assumed-udp-dst-port=200 ip-gateway=1.1.1.2 data=uninitialized data-byte=0 

 1 name="routing-2" header-stack=mac,ip,udp port=port1 
   assumed-mac-dst=00:0C:42:00:38:D1 assumed-mac-src=00:0C:42:40:94:26 
   assumed-mac-protocol=ip assumed-ip-dscp=0 assumed-ip-id=0 
   assumed-ip-frag-off=0 assumed-ip-ttl=64 assumed-ip-protocol=udp 
   ip-src=2.2.2.1/32 ip-dst=1.1.1.1/32 assumed-udp-src-port=100 
   assumed-udp-dst-port=200 ip-gateway=2.2.2.2 data=uninitialized data-byte=0
```

例如，如果 SUT 中的任何路由器发生更改，假定的 MAC 地址不会自动更新。要更新数据包模板，只需执行以下命令：

```ros
/tool/traffic-generator/packet-template/set [find]
```

最后一部分是配置流。

```ros
/tool/traffic-generator/stream
add disabled=no mbps=500 name=str1 id=3 packet-size=1450 port=port0 pps=0 \
    tx-template=routing-1
add disabled=no mbps=500 name=str3 id=4 packet-size=1450 port=port1 pps=0 \
    tx-template=routing-2
```

请注意，每个流都有唯一的 **id** 值。该值用于标识流数据包，否则流量生成器将无法工作。

现在可以运行测试。在本例中，将使用 **quick** 模式：

```ros
[admin@test-host] /tool/traffic-generator> quick mbps=450
SEQ    NUM     TX-PACKET   TX-RATE     RX-PACKET   RX-RATE        RX-OOO   LOST-PACKET LOST-RATE 
37     4          39 488 458.0Mbps        39 270 455.5Mbps        15 509           218   2.5Mbps 
37     TOT        78 976 916.1Mbps        76 485 887.2Mbps        22 529         2 491  28.8Mbps 
38     3          38 957 451.9Mbps        37 657 436.8Mbps         7 078         1 300  15.0Mbps 
38     4          38 958 451.9Mbps        38 402 445.4Mbps        14 763           556   6.4Mbps 
38     TOT        77 915 903.8Mbps        76 059 882.2Mbps        21 841         1 856  21.5Mbps 
39     3          38 816 450.2Mbps        37 893 439.5Mbps         7 307           923  10.7Mbps 
39     4          38 815 450.2Mbps        38 642 448.2Mbps        15 110           173   2.0Mbps 
39     TOT        77 631 900.5Mbps        76 535 887.8Mbps        22 417         1 096  12.7Mbps 
40     3          39 779 461.4Mbps        37 415 434.0Mbps         7 136         2 364  27.4Mbps 
40     4          39 780 461.4Mbps        39 567 458.9Mbps        15 908           213   2.4Mbps 
40     TOT        79 559 922.8Mbps        76 982 892.9Mbps        23 044         2 577  29.8Mbps 
41     3          39 218 454.9Mbps        37 089 430.2Mbps         7 075         2 129  24.6Mbps 
41     4          39 218 454.9Mbps        38 663 448.4Mbps        15 752           555   6.4Mbps 
41     TOT        78 436 909.8Mbps        75 752 878.7Mbps        22 827         2 684  31.1Mbps 
42     3          39 188 454.5Mbps        37 906 439.7Mbps         6 729         1 282  14.8Mbps 
42     4          39 187 454.5Mbps        38 954 451.8Mbps        15 565           233   2.7Mbps 
42     TOT        78 375 909.1Mbps        76 860 891.5Mbps        22 294         1 515  17.5Mbps 
TOT    3       1 645 468 454.4Mbps     1 568 201 433.1Mbps       280 174        77 267  21.3Mbps 
TOT    4       1 645 464 454.4Mbps     1 626 896 449.3Mbps       627 480        18 568   5.1Mbps 
TOT    TOT     3 290 932 908.9Mbps     3 195 097 882.4Mbps       907 654        95 835  26.4Mbps
```

统计信息显示每个流的吞吐量以及两个流的总吞吐量、乱序数据包计数、丢包率、延迟和抖动。
