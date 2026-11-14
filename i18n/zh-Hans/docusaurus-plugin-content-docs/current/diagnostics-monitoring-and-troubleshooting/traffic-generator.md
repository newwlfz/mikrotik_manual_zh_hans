---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traffic-generator"
sidebar_position: 9
title: "流量生成器"
sidebar_label: "流量生成器"
description: "Traffic Generator 是一款 MikroTik RouterOS 工具，通过在端口上生成并发送原始数据包来评估设备性能，并收集延迟、抖动、吞吐量和丢包数据。它支持 OOO 检测和 PCAP 注入等高级功能，并提供可配置的属性和命令，便于快速完成设置。"
tags:
  - 'traffic-generator'
  - 'packet-generation'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Traffic Generator 是一款工具，可用于评估 DUT（被测设备）或 SUT（被测系统）的性能。

该工具可以通过特定端口生成并发送原始数据包。它还会收集延迟和抖动值、TX/RX 速率，统计丢失的数据包数量，并检测乱序（OOO）数据包。

Traffic Generator 的用法与 [带宽测试](./bandwidth-test.md) 工具类似，也可用于生成数据包，这些数据包会被路由回数据包生成器，以便进行高级状态收集。

流量生成器的所有属性和命令均在 [`/tool/traffic-generator` CLI 参考](../cli-reference/tool/traffic-generator/index.md) 中描述。

:::info
在生成数据包的设备上，流量生成器生成的数据包无法通过嗅探工具、torch 或出接口上的防火墙捕获。

由于该工具可能被恶意使用，它在每种 [设备模式](../system-information-and-utilities/device-mode.md) 下默认处于禁用状态。当 `traffic-gen` 处于禁用状态时，`quick` 会以 `not allowed by device-mode` 错误失败。运行 `/system/device-mode/print` 可以查看当前值。若要启用，请运行 `/system/device-mode/update traffic-gen=yes`，并在激活超时时间（默认 5 分钟）内通过设备上的物理操作确认更改：按下复位按钮或 mode 按钮，或拔掉电源。确认后设备会重启；普通重启会取消该更改。参见 [更改 device-mode](../system-information-and-utilities/device-mode.md#change-device-mode)。
:::

## 常规 {#general}

**子菜单：** `/tool/traffic-generator`

此菜单保存流量生成器的整体设置：当前测量会话的 `test-id`、是否测量乱序（OOO）数据包（`measure-out-of-order`）、延迟分布的最大延迟范围（`latency-distribution-max`）以及保留多少统计数据样本（`stats-samples-to-keep`）。它还显示生成器是否正在运行（`running`）以及当前延迟测量范围（`latency-distribution-measure-interval`、`latency-distribution-samples`）。

### 命令 {#commands}

| 命令 | 描述 |
| :-- | :-- |
| **quick** | 启动数据包生成器，将统计信息打印到终端，并汇总延迟/抖动报告。接受可覆盖数据包模板和流设置的参数：**cpu-core, entries-to-show, id, interface, mbps, measure-out-of-order, packet-count, packet-size, port, pps, stream, test-id, tx-template**。运行 quick 命令时指定的参数会覆盖已配置的值；如果仅为某个头部指定了参数，则该值会（在需要时）乘到所有其他头部。 |
| **start** | 在后台启动 Traffic Generator。接受的覆盖参数与 **quick** 相同，但 `entries-to-show` 除外（没有终端输出）。 |
| **stop** | 停止通过 **start** 命令启动的后台 Traffic Generator。 |
| **inject** | 将原始数据注入接口。 |
| **inject-pcap** | 在接口上重放 PCAP 或 PCAPNG 文件中的数据包。[嗅探工具](./packet-sniffer.md)以 PCAPNG 格式保存抓包文件，Traffic Generator 支持这种格式。 |

## 数据包模板 {#packet-template}

**子菜单：** `/tool/traffic-generator/packet-template`

此子菜单根据头部参数构建流的数据包内容。根据这些参数，你可以构建带 VLAN 标签的 IP 数据包、设置 UDP 或 TCP 端口，或构建 IPv6 数据包。系统会根据提供的参数生成原始数据包模板。完整参数列表在 [packet-template CLI 参考](../cli-reference/tool/traffic-generator/packet-template.md) 中描述。

如果你需要更底层的数据包，或希望充分利用 Traffic Generator，请使用 raw-packet-template 构建器来构建数据包。

如果同一类型的头部在数据包中出现多次，头字段值会以逗号分隔列表的形式传递。例如，如果有两个 IP 头部，源地址会像这样给出：`ip-src=1.1.1.1,2.2.2.2`。

为了更快地构造头部，许多头字段值是被假定的。例如，如果头部栈为 "mac, ip"，流量生成器会假定 mac-protocol 值为 "ip"。或者，如果指定了 "port" 或 "interface" 设置，流量生成器会假定 "mac-src" 为该接口的 MAC 地址。假定值具有以 "assumed-" 开头的不同名称，并且是只读的。手动指定的值会覆盖假定值。

:::info
假设值不会自动更新。编辑模板后会重新计算假设值——执行 `/tool/traffic-generator/packet-template/set [find]` 即可触发新的假设值。
:::

`header-stack` 属性定义所生成数据包中头部的顺序。它支持 **mac**（Ethernet，14 字节）、**vlan**（802.1Q 标签，4 字节）、**ip**（IPv4，20 字节）、**udp**（UDP，8 字节）、**raw**（以十六进制字符串表示的任意字节）、**ipv6**（IPv6，40 字节）和 **tcp**（TCP，可变长度）。序列限制遵循协议规则——例如，VLAN 头部只能跟在 mac 头部或另一个 VLAN 头部之后；每个数据包最多允许两个 IP 头部和一个 UDP 头部。进一步限制（例如针对重复的 IPv6 或 TCP 头部）会在创建模板时进行验证。流量生成器会为数据包模板建议第一个头部（在 port 菜单中），但不会强制使用第一个头部。

## 端口配置 {#port-configuration}

**子菜单：** `/tool/traffic-generator/port`

此菜单配置将接口绑定到流量生成器以发送和接收所生成数据包的 port。当数据包模板仅指定 `interface` 时，会自动创建一个 port 条目（动态）。`disabled` 标志（参见 CLI 参考）会阻止该 port 发送和接收；示例将其设置为 `disabled=no` 以明确表示。port 的只读 `first-header` 属性显示从该接口发出的数据包所建议的第一个头部：`mac`、`vlan`、`ip`、`udp`、`raw`、`ipv6` 或 `tcp`。所有属性和标志都在 [port CLI 参考](../cli-reference/tool/traffic-generator/port.md) 中描述。

## 统计 {#stats}

**子菜单：** `/tool/traffic-generator/stats`

如果流量生成器未在 **quick** 模式下运行，有关测试的所有统计信息都会存储在此菜单中，而不会打印到终端。

### 延迟分布 {#latency-distribution}

**子菜单：** `/tool/traffic-generator/stats/latency-distribution`

此子菜单显示在特定延迟范围内接收到了多少个数据包。延迟范围可按流或按序列查看，例如 `print stream-id=3` 或 `print seq=10`。

以下是延迟图表示例输出：

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

这些列在 [latency-distribution CLI 参考](../cli-reference/tool/traffic-generator/stats/latency-distribution.md) 中描述。

### 流统计 {#stream-stats}

**子菜单：** `/tool/traffic-generator/stats/stream`

此子菜单存储按流排序的统计信息。输出与 **quick** 模式相同。

```ros
[admin@test-host] /tool/traffic-generator/stats/stream> print 
 # SEQ    ID      TX-PACKET   TX-RATE     RX-PACKET   RX-RATE   LOST-PACKET LOST-RATE
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

此子菜单存储按 RX/TX 端口排序的统计信息。

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

### 原始统计 {#raw-stats}

**子菜单：** `/tool/traffic-generator/stats/raw`

此子菜单存储原始统计数据。

```ros
[admin@test-host] /tool/traffic-generator/stats/raw> print 
 # SEQ    PORT       ID      TX-PACKET   TX-RATE     RX-PACKET   RX-RATE   LOST-PACKET LOST-RATE
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

所有统计列（seq、id、tx/rx 计数器与速率、out-of-order、bad-checksum、lost、latency 和 jitter）在 [stream](../cli-reference/tool/traffic-generator/stats/stream.md)、[port](../cli-reference/tool/traffic-generator/stats/port.md) 和 [raw](../cli-reference/tool/traffic-generator/stats/raw.md) CLI 参考页面中描述。

## 流 {#streams}

**子菜单：** `/tool/traffic-generator/stream`

一个 stream 定义生成的流量：使用的数据包模板（`tx-template`，必需）及其发送所经过的端口（`port`，通常取自模板）、传输速率（`pps` 和/或 `mbps`）、L2 数据包大小（`packet-size`，可为随机大小的范围）、要发送的数据包数量（`packet-count`）以及 stream 所绑定到的 CPU 核心（或核心范围）（`cpu-core`，用于多核测试）。其只读的 `default-port` 显示 stream 发送所用的端口，该端口派生自模板。所有属性都在 [stream CLI 参考](../cli-reference/tool/traffic-generator/stream.md) 中描述。

每个 stream 都有一个唯一的 `id`（旧属性名 `num` 不再使用），用于在统计信息以及 **start** 和 **quick** 命令中标识其数据包。

## 配置示例 {#configuration-examples}

### IPsec 隧道性能测试 {#ipsec-tunnel-performance-test}

考虑以下测试设置：

![Traffic generator IPsec test setup](/img/5bae37f27f75c657.webp)

被测系统（SUT）由两台连接到流量生成器服务器的路由器组成。两台 SUT 路由器之间的连接使用 IPsec 加密。

流量生成器将运行两个流：

- 方向为从 1.1.1.0/24 网络到 2.2.2.0/24 网络。
- 方向为从 2.2.2.0/24 网络到 1.1.1.0/24 网络。

#### R1 路由和 IPsec 设置 {#r1-routing-and-ipsec-setup}

```ros
/ip/address
add address=192.168.33.1/30 interface=ether1
add address=1.1.1.2/24 interface=ether2

/ip/route 
add dst-address=2.2.2.0/24 gateway=192.168.33.2

/ip/ipsec/proposal
set default enc-algorithms=aes-128-cbc

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
set default enc-algorithms=aes-128-cbc

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

首先，定义哪些端口将用作流量生成器的 TX/RX 端口：

```ros
/tool/traffic-generator/port
add disabled=no interface=ether2 name=port0
add disabled=no interface=ether3 name=port1
```

为了构造将要生成的实际数据包，使用 packet-template：

```ros
/tool/traffic-generator/packet-template
add header-stack=mac,ip,udp ip-dst=2.2.2.1/32 ip-gateway=1.1.1.2 ip-src=1.1.1.1/32 \
    name=routing-1 port=port0
add header-stack=mac,ip,udp ip-dst=1.1.1.1/32 ip-gateway=2.2.2.2 ip-src=2.2.2.1/32 \
    name=routing-2 port=port1
```

请注意，未指定 MAC 地址，因为模板生成器可以通过发送 ARP 消息自动推断下一跳 MAC 地址。由于执行了路由且目标 IP 不能直接到达，因此设置 **ip-gateway** 参数以确定下一跳 MAC 地址。

运行 **print** 时，可以看到所有假定的（检测到的）值，包括 MAC 地址：

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

如果 SUT 中的任何路由器发生更改，假定的 MAC 地址将不会自动更新。要更新数据包模板，请执行以下命令：

```ros
/tool/traffic-generator/packet-template/set [find]
```

最后一部分是配置流：

```ros
/tool/traffic-generator/stream
add disabled=no mbps=500 name=str1 id=3 packet-size=1450 port=port0 pps=0 \
    tx-template=routing-1
add disabled=no mbps=500 name=str3 id=4 packet-size=1450 port=port1 pps=0 \
    tx-template=routing-2
```

请注意，每个流都有唯一的 **id** 值。该值用于标识流数据包；没有它，流量生成器将无法工作。

现在测试已准备好运行。在本例中，使用 **quick** 模式：

```ros
[admin@test-host] /tool/traffic-generator> quick mbps=450
SEQ    ID      TX-PACKET   TX-RATE     RX-PACKET   RX-RATE        RX-OOO   LOST-PACKET LOST-RATE 
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

统计信息显示每个流的吞吐量以及两个流的总吞吐量、Out-of-Order 数据包计数、丢包率、延迟和抖动。
