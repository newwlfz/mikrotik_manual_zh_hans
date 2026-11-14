---
sidebar_key: "getting-started/networking-fundamentals/index"
sidebar_position: 2
title: "网络基础"
sidebar_label: "网络基础"
description: "本页介绍 MikroTik RouterOS 中的网络基础知识，涵盖 OSI 与 TCP/IP 模型及其分层、协议，以及以太网通信细节，包括 MAC 地址和帧转发类型。"
tags:
  - 'osi'
  - 'fundamentals'
  - 'arp'
  - 'ip'
  - 'ipv4'
source: https://manual.mikrotik.com/docs/7.24/getting-started/networking-fundamentals
captured_at: '2026-11-04T11:28:59+08:00'
pagination_prev: null
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

计算机网络由许多不同的组件和协议协同工作组成。为了理解节点到节点通信是如何发生的这一概念，让我们熟悉 **OSI 模型** 和 **TCP/IP 模型**。这两种模型都有助于直观地理解节点之间的通信是如何进行的。

### OSI 模型 {#osi-model}

开放系统互连 (OSI) 模型是一个 7 层模型，如今被用作教学工具。OSI 模型最初被构想为构建网络系统的标准架构，但现实世界中的网络远没有 OSI 模型所暗示的那样明确。

- **第 7 层（应用层）** - 定义服务器与客户端之间通信的协议，例如 HTTP 协议。如果 Web 浏览器想要下载图像，该协议将组织并执行请求；
- **第 6 层（表示层）** - 确保以可用的格式接收数据。加密在此处完成（但在现实中可能并非如此，例如 IPSec）；
- **第 5 层（会话层）** - 负责建立、管理和关闭客户端与服务器之间的会话；
- **第 4 层（传输层）** - 传输层的主要职责是组装和重组，数据流被划分为块（段），分配序列号并封装到协议头中（TCP、UDP 等）；
- **第 3 层（网络层）** - 负责逻辑设备寻址，数据被封装在 IP 头中，现在称为“数据包”；
- **第 2 层（数据链路层）** - 数据被封装在自定义头中，即 802.3（Ethernet）或 802.11（无线），称为“帧”，并处理流量控制；
- **第 1 层（物理层）** - 发送和接收比特的通信介质、电信号以及硬件接口；

### TCP/IP 模型 {#tcpip-model}

此模型与 OSI 模型具有相同的目的，但更适合现代网络故障排除。与 OSI 模型相比，TCP/IP 是一个 4 层模型：

- **应用层（4）** - 包含 OSI 模型的应用层、表示层和会话层，这显著简化了网络故障排除；
- **传输层（3）** - 与 OSI 模型中的传输层相同（TCP、UDP 协议）；
- **网际层（2）** - 执行与 OSI 模型中网络层相同的功能（包括 ARP、IP 协议）；
- **链路层（1）** - 也称为网络接入层。包含 OSI 模型的第 1 层和第 2 层，因此其主要关注网络节点之间的物理数据交换；

| TCP/IP            | OSI 模型          | 协议                       |
|:--|:--|:--|
| 应用层 | 应用层  | DNS、DHCP、HTTP、SSH 等         |
|                   | 表示层 | JPEG、MPEG、PICT 等             |
|                   | 会话层      | PAP、SCP、ZIP 等              |
| 传输层   | 传输层    | TCP, UDP                        |
| 网际层    | 网络层      | ICMP, IGMP, IPv4, IPv6, IPSec   |
| 链路层        | 数据链路层    | ARP、CDP、MPLS、PPP 等        |
|                   | 物理层     | Bluetooth、Ethernet、Wi-Fi 等 |

## Ethernet {#ethernet}

计算机网络中最常用的链路层协议（OSI 第 2 层）是 Ethernet 协议。为了进行通信，每个节点都有一个唯一分配的地址，称为 **MAC**（Media Access Control 地址），有时也称为 Ethernet 地址。

它长 48 位，通常由制造商固定（无法更改），但如今 MAC 地址的自定义已广泛使用，RouterOS 也允许设置自定义 MAC 地址。

最常用的 MAC 格式是用冒号分隔的 6 个十六进制数（`D4:CA:6D:01:22:96`）

RouterOS 会在所有类似 Ethernet 的接口（Wireless、60G、VPLS 等）的配置中显示 MAC 地址。

```ros
[admin@rack1_b32_CCR1036] /interface ethernet> print 
Flags: X - disabled, R - running, S - slave 
 #    NAME                  MTU MAC-ADDRESS       ARP             SWITCH               
 0 R  ether1               1500 D4:CA:6D:01:22:96 enabled        
 1 R  ether2               1500 D4:CA:6D:01:22:97 enabled        
 2 R  ether3               1500 D4:CA:6D:01:22:98 enabled        
 3    ether4               1500 D4:CA:6D:01:22:99 enabled        
 4    ether5               1500 D4:CA:6D:01:22:9A enabled        
 5    ether6               1500 D4:CA:6D:01:22:9B enabled        
 6    ether7               1500 D4:CA:6D:01:22:9C enabled        
 7 R  ether8               1500 D4:CA:6D:01:22:9D enabled        
 8    sfp-sfpplus1         1500 D4:CA:6D:01:22:94 enabled        
 9    sfp-sfpplus2         1500 D4:CA:6D:01:22:95 enabled 
```

在 Ethernet 网络上转发帧有三种类型：

- **单播** - 带有单播地址的帧会被发送到冲突域内的所有节点，冲突域通常是两个节点之间的 Ethernet 电缆，或者在无线情况下是所有能够检测到无线信号的接收方。只有具有匹配 MAC 地址的远程节点才会接受该帧（除非启用了混杂模式）
- **广播** - 特殊地址之一（`FF:FF:FF:FF:FF:FF`），广播帧会被所有节点接受并在第 2 层网络上转发。
- **组播** - 带有组播地址的帧会被所有配置为监听该地址的节点接收。

## IP 网络 {#ip-networking}

Ethernet 协议足以在 Ethernet 网络上的两个节点之间传输数据，但不足以在跨越多个 Ethernet 段的多个跳数节点之间传输数据。对于 Internet/网络层（OSI 第 3 层），使用 IP（Internet Protocol）通过唯一的逻辑地址来标识主机。

当前大多数网络使用 **IPv4**，它是用点分十进制表示法书写的 32 位地址（`192.168.88.1`），但 **IPv6**（128 位地址）的使用正在扩大。

可以为接口添加多个 IP 地址，也可以让接口不分配任何地址。在桥接或 PPPoE 连接的情况下，物理接口可能没有分配任何地址，但仍然完全可用。为包含在网桥中的物理接口配置 IP 地址，实际上意味着在网桥接口本身上进行设置。

### 网络掩码 {#netmasks}

可能存在多个逻辑网络，为了确定 IP 地址属于哪个网络，需要使用 **网络掩码**。**网络掩码** 通常指定为用于标识逻辑网络的位数。格式也可以采用十进制表示法，例如，24 位网络掩码可以写作 `255.255.255.0`

### IPv4 地址 {#ipv4-addresses}

IPv4 使用 4 字节地址，这些地址被划分为四个 8 位字段，称为八位组。每个八位组转换为十进制格式并用点分隔。例如：

```
11000000 10101000 00000011 00011000 => 192.168.3.24
```

让我们仔细看看 192.168.3.24/24，以及如何根据网络掩码确定有效范围：

```
11000000 10101000 00000011 00011000 => 192.168.3.24
11111111 11111111 11111111 00000000 => /24 or 255.255.255.0
```

在此示例中，高 24 位被掩码，留下 0-255 的范围。  
此范围由三种地址类型组成：

- **网络地址** - 范围中的第一个地址用于标识网络（在我们的示例中，网络地址将是 192.168.3.0）

- **广播地址** - 范围中的最后一个/最高地址（在我们的示例中是 192.168.3.255）。广播地址用于将数据发送到所有可能的目的地（**全主机广播**），这允许发送方只发送一次数据，而所有接收方都会收到其副本。在 IPv4 协议中，地址 255.255.255.255 用于**本地广播**。此外，还可以向网络广播地址进行定向（受限）广播。
- **单播地址** - 范围中的所有其他地址可用于标识网络中的特定主机（在我们的示例中，用于主机标识的范围是 1 到 254）。

与 Ethernet 协议中一样，也有用于**组播**的特殊地址范围。组播地址用于关联一组感兴趣的接收方。在 IPv4 中，地址 `224.0.0.0` 到 `239.255.255.255` 被指定为组播地址。发送方从其单播地址向组播组地址发送单个数据报，中间路由器负责制作副本并将其发送给所有已加入相应组播组的接收方；

逻辑 IP 网络、单播、广播和组播的可视化：
![](/img/ae89b1af09de96ce.png)

还有一些为特殊目的保留的地址范围：

- [私有地址范围（RFC 1918）](https://tools.ietf.org/html/rfc1918)，它应仅在本地网络中使用，并且在转发到互联网时通常会被丢弃：
  - 10.0.0.0/8 - 起始：10.0.0.0；结束：10.255.255.255
  - 172.16.0.0/12 - 起始：172.16.0.0；结束：172.31.255.255
  - 192.168.0.0/16 - 起始：192.168.0.0；结束：192.168.255.255

- 198.18.0.0/15 - 基准测试
- 192.88.99.0/24 - 6to4 中继任播地址范围
- 192.0.2.0/24、198.51.100.0/24、203.0.113.0/24 - 文档用途
- 169.254.0.0/16 - 自动配置地址范围

#### 点对点寻址 {#point-to-point-addressing}

点对点寻址，顾名思义，可用于设置仅由两个节点组成的第 3 层网络。设置这种寻址有两种方式：

- 使用 /31 地址范围
- 使用 /32 地址，其中网络地址设置为远程节点的 IP 地址。  
  例如：

  ```mermaid
  flowchart LR
    H1 --- H2

    H1["**Host 1**<br />____________________<br /> **Address**: 192.168.0.1/32<br />**Network**: 192.168.0.2"]
    H2["**Host 2**<br />____________________<br /> **Address**: 192.168.0.2/32<br />**Network**: 192.168.0.1"]

    style H1 text-align:left
    style H2 text-align:left
  ```

#### 地址配置 {#address-configuration}

考虑这样一种设置：两台路由器通过电缆直接连接，而我们不想浪费地址空间：

路由器 1：

```ros
/ip address
add address=10.1.1.1/32 interface=ether1 network=172.16.1.1
```

路由器 2：

```ros
/ip address
add address=172.16.1.1/32 interface=ether1 network=10.1.1.1
```

## ARP 以及将所有内容串联起来 {#arp-and-tying-it-all-together}

尽管 IP 数据包使用 IP 地址进行寻址，但实际将数据从一台主机传输到另一台主机时必须使用硬件地址。

这就引出了 **Address Resolution Protocol (ARP)**，它用于将主机的 **IPv4** 地址映射到硬件地址（MAC）。**ARP** 协议在 [RFC 826](https://tools.ietf.org/html/rfc826) 中有所引用。它已成为过去，在 IPv6 中被组播取代，但只要 IPv4 仍在使用，它就会继续存在。

每个网络设备都有一个当前使用的 ARP 条目表。通常该表是动态构建的，但为了提高网络安全性，可以通过添加静态条目来部分或完全静态构建该表。

当局域网中的一台主机想要向该网络中的另一台主机发送 IP 数据包时，它必须在其 ARP 缓存中查找目标主机的 Ethernet MAC 地址。如果目标主机的 MAC 地址不在 ARP 表中，则会发送 ARP 请求以查找具有相应 IP 地址的设备。ARP 向 LAN 上的所有设备发送广播请求消息，要求具有指定 IP 地址的设备回复其 MAC 地址。将 IP 地址识别为自己的设备会返回带有自身 MAC 地址的 ARP 响应：

![](/img/2bd883c2abb21d2f.jpg)

让我们进行一个简单的配置，并仔细观察 **Host A** 尝试 ping **Host C** 时的过程。

首先，我们在 **Host A** 上添加 IP 地址：

```ros
/ip address add address=10.155.101.225/24 interface=ether1
```

**主机 B**：

```ros
/ip address add address=10.155.101.221/24 interface=ether1
```

**主机 C**：

```ros
/ip address add address=10.155.101.217/24 interface=ether1
```

让我们运行一个将数据包转储保存到文件的数据包嗅探器，并在 **Host A** 上运行 ping 命令：

```ros
/tool sniffer
  set file-name=arp.pcap filter-interface=ether1
  start 
/ping 10.155.101.217 count=1
/tool sniffer stop
```

现在你可以从路由器下载 arp.pcap 文件，并在 Wireshark 中打开进行分析：

![](/img/89cf3cd1daf79e24.png)

- **Host A** 发送 **ARP** 消息，询问谁拥有 “10.155.101.217”
- **Host C** 回复称，可以通过 MAC 地址 08:00:27:3C:79:3A 访问 10.155.101.217
- **Host A** 和 **Host C** 现在都已更新其 **ARP** 表，并且可以发送 ICMP（ping）数据包

如果通过运行 `/ip/arp/print` 查看两台主机的 ARP 表，你应该能够看到相关条目：

```routeros
[admin@host_a] /ip arp> print 
Flags: D - DYNAMIC; C - COMPLETE
Columns: ADDRESS, MAC-ADDRESS, INTERFACE, VRF, STATUS
 #    ADDRESS         MAC-ADDRESS       INTERFACE     VRF   STATUS
 0 DC 10.155.101.217  08:00:27:3C:79:3A ether1        main  reachable

 [admin@host_b] /ip arp> print 
Flags: D - DYNAMIC; C - COMPLETE
Columns: ADDRESS, MAC-ADDRESS, INTERFACE, VRF, STATUS
 #    ADDRESS         MAC-ADDRESS       INTERFACE     VRF   STATUS
 0 DC 10.155.101.225  08:00:27:85:69:B5 ether1        main  reachable
```

可能存在需要不同行为的场景。RouterOS 允许为支持 **ARP** 的接口配置不同模式：

- **Enabled** - ARP 将被自动发现，新的动态条目将被添加到 ARP 表中。这是接口的默认模式。
- **Disabled** - 如果接口上关闭了 ARP 功能，则路由器不会应答来自客户端的 ARP 请求。因此，也应向客户端添加静态 ARP 条目。例如，
  Host A:

  ```ros
  /interface/set ether1 arp=disabled
  /ip arp add mac-address=08:00:27:3C:79:3A address=10.155.101.217 interface=ether1
  ```

  主机 B：

  ```ros
  /ip arp add mac-address=08:00:27:85:69:B5 address=10.155.101.225 interface=ether1
  ```

- **Reply Only** - 如果接口上的 ARP 属性设置为 `reply-only`，则路由器只回复 ARP 请求。邻居 MAC 地址将使用 `/ip/arp` 静态解析，但无需像禁用 ARP 的情况那样将路由器的 MAC 地址添加到其他主机的 ARP 表中。

- **Proxy ARP** - 正确配置了代理 ARP 功能的路由器可在直接连接的网络之间充当透明代理。例如，如果你希望为拨入（PPP、PPPoE、PPTP）客户端分配与所连接 LAN 上使用的相同地址空间中的 IP 地址，这种行为会很有用。

- **Local Proxy ARP** - 如果接口上的 arp 属性设置为 `local-proxy-arp`，则路由器仅对此接口执行代理 ARP 的收发。也就是说，对于进入和离开同一接口的流量。在正常 LAN 中，默认行为是两台网络主机直接相互通信，而不涉及路由器。
  路由器将使用路由器自身接口的 MAC 地址（而不是另一台主机的 MAC 地址）响应所有客户端主机。

  例如，如果 Host A（192.168.88.2/24）查询 Host B（192.168.88.3/24）的 MAC 地址，路由器将使用自己的 MAC 地址进行响应。换句话说，如果启用了 local-proxy-arp，路由器将承担在 Host A 192.168.88.2 和 Host B 192.168.88.3 之间转发流量的责任。Host A 和 Host B 上的所有 ARP 缓存条目都将引用路由器的 MAC 地址。在这种情况下，路由器正在为整个子网 192.168.88.0/24 执行 local-proxy-arp。

  RouterOS local-proxy-arp 的一个示例可以是带有 DHCP 服务器和隔离网桥端口的网桥设置，其中同一子网中的主机只能通过网桥 IP 在第 3 层相互访问。

  ```ros
  /interface bridge
  add arp=local-proxy-arp name=bridge1
  /interface bridge port
  add bridge=bridge1 horizon=1 interface=ether2
  add bridge=bridge1 horizon=1 interface=ether3
  add bridge=bridge1 horizon=1 interface=ether4
  ```

  这项技术有不同的名称：
  - 在 RFC 3069 中称为 VLAN Aggregation；
  - Cisco 和 Allied Telesis 称之为 Private VLAN；
  - Hewlett-Packard 称之为 Source-Port filtering 或 port-isolation；
  - Ericsson 称之为 MAC-Forced Forwarding（RFC Draft）。

#### Proxy ARP 示例 {#proxy-arp-example}

让我们看看示例图。  
![](/img/6656a080221d2bea.jpg)

**Host A**（172.16.1.2）位于子网 A，想要向子网 B 上的 **Host D**（172.16.2.3）发送数据包。**Host A** 具有 /16 子网掩码，这意味着它认为自己直接连接到整个 172.16.0.0/16 网络（同一个 LAN）。它在子网 A 上广播以查明 **Host D** 的 MAC 地址。

来自数据包分析器软件的信息：

```text
 No.     Time   Source             Destination       Protocol  Info

 12   5.133205  00:1b:38:24:fc:13  ff:ff:ff:ff:ff:ff  ARP      Who has 173.16.2.3?  Tell 173.16.1.2

Packet details:

Ethernet II, Src: (00:1b:38:24:fc:13), Dst: (ff:ff:ff:ff:ff:ff)
    Destination: Broadcast (ff:ff:ff:ff:ff:ff)
    Source: (00:1b:38:24:fc:13)
    Type: ARP (0x0806)
Address Resolution Protocol (request)
    Hardware type: Ethernet (0x0001)
    Protocol type: IP (0x0800)
    Hardware size: 6
    Protocol size: 4
    Opcode: request (0x0001)
    [Is gratuitous: False]
    Sender MAC address: 00:1b:38:24:fc:13
    Sender IP address: 173.16.1.2
    Target MAC address: 00:00:00:00:00:00
    Target IP address: 173.16.2.3
```

通过此 ARP 请求，**Host A**（172.16.1.2）正在要求 **Host D**（172.16.2.3）发送其 MAC 地址。第 2 层广播意味着该帧将被发送到同一第 2 层广播域中的所有主机，其中包括路由器的 **ether0** 接口，但不会到达 **Host D**，因为路由器默认不转发第 2 层广播。

要解决此问题，我们需要在 ether0 上启用 `proxy-arp`：

```ros
/interface/ethernet set ether0 arp=proxy-arp
```

现在，路由器知道目标地址（172.16.2.3）位于另一个子网且可达，它会使用自己的 **MAC** 地址向 **Host A** 发送单播回复。基本上，它是在说“将这些数据包发送给我，我会把它们送到需要去的地方。”

```text
No.     Time   Source            Destination         Protocol   Info

13   5.133378  00:0c:42:52:2e:cf  00:1b:38:24:fc:13   ARP        172.16.2.3 is at 00:0c:42:52:2e:cf

Packet details:

Ethernet II, Src: 00:0c:42:52:2e:cf, Dst: 00:1b:38:24:fc:13
   Destination: 00:1b:38:24:fc:13
   Source: 00:0c:42:52:2e:cf
   Type: ARP (0x0806)
Address Resolution Protocol (reply)
   Hardware type: Ethernet (0x0001)
   Protocol type: IP (0x0800)
   Hardware size: 6
   Protocol size: 4
   Opcode: reply (0x0002)
   [Is gratuitous: False]
   Sender MAC address: 00:0c:42:52:2e:cf
   Sender IP address: 172.16.1.254
   Target MAC address: 00:1b:38:24:fc:13
   Target IP address: 172.16.1.2
```

当 Host A 收到 ARP 响应时，它会更新其 ARP 表，如下所示：

```text
C:\Users\And>arp -a
Interface: 173.16.2.1 --- 0x8
  Internet Address      Physical Address      Type
  173.16.1.254          00-0c-42-52-2e-cf    dynamic
  173.16.2.3            00-0c-42-52-2e-cf    dynamic
  173.16.2.2            00-0c-42-52-2e-cf    dynamic
```

更新 MAC 表后，**Host A** 将所有发往 **Host D**（172.16.2.3）的数据包直接转发到路由器接口 ether0（00:0c:42:52:2e:cf），路由器再将数据包转发给 **Host D**。子网 A 中主机上的 ARP 缓存会为子网 B 中的所有主机填充路由器的 MAC 地址。因此，所有发往子网 B 的数据包都会发送到路由器。路由器会将这些数据包转发给子网 B 中的主机。

使用代理 ARP 时，主机的多个 IP 地址会映射到单个 MAC 地址。

## 传输层 {#transport-layer}

此层中的协议为应用提供端到端通信服务。这些协议应通过交换数据接收确认并重传丢失的数据包，确保数据包按序到达且无错误。

最著名且广泛使用的是 **Transmission Control Protocol (TCP)**，它用于面向连接的传输，并包含可靠数据传输的机制。

无连接的 **User Datagram Protocol (UDP)** 是另一种用于简单数据传输的常见协议。

### TCP 协议操作 {#tcp-protocol-operation}

面向连接的协议在建立正确连接之前不会发送任何数据。每当发送设备尝试与远程节点建立连接时，**TCP** 都会使用多步握手过程。结果会创建端到端虚拟（逻辑）电路，在其中使用流量控制和确认来实现可靠交付。TCP 有几种用于连接建立和终止过程的消息类型。

**三次握手**过程：

1. 需要初始化连接的 **HostA** 会向目标 **HostB** 发送一个 **SYN**（同步）数据包，其中包含建议的初始序列号。
2. 当 **HostB** 收到 **SYN** 消息时，会回复一个数据包，其中 TCP 头中的 **SYN** 和 **ACK** 标志都置位（SYN-ACK）。
3. 当 **HostA** 收到 SYN-ACK 时，会回复 **ACK**（确认）数据包。**HostB** 收到 **ACK**，此时连接处于 **ESTABLISHED;** 状态；

```mermaid
sequenceDiagram
    HostA->>HostB: Syn sent
    HostB->>HostA: Syn-Ack sent
    HostA->>HostB: Ack sent
Note right of HostB: Established
```

现在我们知道 **TCP** 连接是如何建立的，还需要了解数据传输是如何管理和维护的。

面向连接的协议服务通常会在成功交付后发送确认（ACK）。在传输带有数据的数据包后，发送方会等待接收方的确认。如果超时且发送方未收到 **ACK**，则会重传数据包。

让我们思考一下，当数据报发送速度快于接收设备的处理速度时会发生什么。接收方会将它们存储在称为缓冲区的内存中。但由于缓冲区空间不是无限的，当其容量被超出时，接收方开始丢弃帧。所有被丢弃的帧都必须再次重传，这就是传输性能低下的原因。

为了解决此问题，TCP 使用流量控制协议。窗口机制用于控制数据流。建立连接时，接收方会在每个 TCP 帧中指定窗口字段。窗口大小表示接收方愿意存储在缓冲区中的接收数据量。窗口大小（以字节为单位）与确认一起发送给发送方。因此，窗口大小控制着在未收到确认的情况下可以从一台主机传输到另一台主机的信息量。发送方只发送窗口大小指定的字节数，然后等待带有更新窗口大小的确认。

如果接收应用能够以数据从发送方到达的速度处理数据，那么接收方会在每个确认中发送正的窗口通告（增大窗口大小）。这一机制会一直有效，直到发送方变得比接收方更快，传入数据最终会填满接收方的缓冲区，导致接收方通告零窗口确认。收到零窗口通告的发送方必须停止传输，直到收到正窗口通告。让我们看一下图示的窗口处理过程：

1. **HostA** 以 1000 的窗口大小开始传输，发送一个 1000 字节的帧。
2. 接收方 **HostB** 返回 **ACK**，并将窗口大小增大到 2000。
3. **HostA** 收到 **ACK** 并发送两个帧（每个 1000 字节）。
4. 之后，接收方通告初始窗口大小为 3000。现在发送方发送三个帧并等待确认。
5. 前三个段填充接收方缓冲区的速度快于接收应用处理数据的速度，因此通告的窗口大小达到零，表示在可能进行进一步传输之前必须等待。
6. 窗口大小以及增大或减小窗口大小的速度，可在各种 TCP 拥塞避免算法中配置，例如 Reno、Vegas、Tahoe 等。

```mermaid
sequenceDiagram
    HostA->>HostB: Window size of 1000
    HostB->>HostA: Ack1 window size=2
    HostA->>HostB: Window size of 2000
    HostA->>HostB:
    HostB->>HostA: Ack2 window size=3
rect rgb(185, 50, 50)
    HostA->>HostB: Window size of 3000
    HostA->>HostB:
    HostA->>HostB:
Note left of HostB: Buffer is full, stop sending...
    HostB->>HostA: Ack3 window size=0
end
Note left of HostB: Buffer have been freed, continue...
    HostB->>HostA: Ack window size=1
```

当数据传输完成且主机想要终止连接时，会启动终止过程。与使用**三次握手**的 **TCP** 连接建立不同，连接终止使用**四次**握手。当双方通过发送 **FIN**（结束）并接收 **ACK**（确认）完成关闭过程后，连接即被终止。

**四次**终止过程：

1. 需要终止连接的 **HostA** 发送带有 **FIN** 标志的特殊消息，表示它已完成数据发送。
2. 收到 **FIN** 段的 **HostB** 不会终止连接，而是进入“被动关闭”（CLOSE\_WAIT）状态，并向 **HostA** 发回针对 **FIN** 的 **ACK**。如果 **HostB** 没有任何数据要发送给 **HostA**，它还会发送 **FIN** 消息。现在 **HostB** 进入 LAST\_ACK 状态。此时它将不再接受来自 **HostA** 的数据，但可以继续发送数据。
3. 当 **HostA** 收到来自 **HostB** 的最后一个 **FIN** 时，它会进入（TIME\_WAIT）状态，并向 **HostB** 发回 **ACK**。
4. **HostB** 收到来自 **HostA** 的 **ACK**，连接终止。

```mermaid
sequenceDiagram
    HostA->>HostB: Fin sent
Note right of HostB: CLOSE_WAIT
    HostB->>HostA: Ack sent
    HostB->>HostA: Fin sent
Note right of HostB: LAST_ACK
    HostA->>HostB: Ack sent
Note right of HostB: Terminated
```

## 另请参阅 {#see-more}

- [RFC 6890](https://tools.ietf.org/html/rfc6890) - 所有保留的 IPv4 和 IPv6 地址范围列表
- [RFC 3069](https://tools.ietf.org/html/rfc3069)
