---
sidebar_key: "routing-and-networking-protocols/unicast/is-is"
sidebar_position: 4
title: "IS-IS"
sidebar_label: "IS-IS"
description: "IS-IS 是一种内部网关协议，用于在单个自治系统内分发 IP 路由信息，作为链路状态协议运行，并在邻居之间交换拓扑数据。它支持 IPv4 和 IPv6，使用基于 TLV 的扩展，并且需要配置 area ID、system ID 和 NSAP 地址才能实现正确路由。"
tags:
  - 'is-is'
  - 'routing'
  - 'ospf'
slug: /user-guides/routing-and-networking-protocols/unicast/is-is
source: https://manual.mikrotik.com/docs/7.25/user-guides/routing-and-networking-protocols/unicast/is-is
captured_at: '2026-11-04T11:22:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IS-IS（Intermediate System - Intermediate System）协议是一种内部网关协议（IGP），用于在单个自治系统内分发 IP 路由信息。

它最初是作为 CLNP 的路由协议开发的，但后来在 IP 流行时扩展为包含 IP 路由。扩展版本有时称为 Integrated IS-IS。

IS-IS 属于链路状态协议族，该协议族在最近的邻居之间交换拓扑信息，并将其泛洪到整个 AS。主要优点是，对网络拓扑的完整了解允许路由器选择到达目的地的最佳路径。它还可以用于流量工程目的。

邻居定期交换 **Hello** 报文，形成邻接关系，并根据协商结果选择指定 IS（DIS）。Hello 报文分别针对 **Level-1** 和 **Level-2** 发送。

## 标准与技术 {#standards-and-technologies}

- [RFC 1195](https://datatracker.ietf.org/doc/html/rfc1195) 在 TCP/IP 和双环境中使用 OSI IS-IS 进行路由
- [RFC 5302](https://datatracker.ietf.org/doc/html/rfc5302) 两级 IS-IS 的域范围前缀分发
- [RFC 5303](https://datatracker.ietf.org/doc/html/rfc5303) IS-IS 点对点邻接的三次握手
- [RFC 5305](https://datatracker.ietf.org/doc/html/rfc5305) IS-IS 流量工程扩展（仅支持 wide metric）
- [RFC 5308](https://datatracker.ietf.org/doc/html/rfc5308) 使用 IS-IS 路由 IPv6

## IS-IS 术语 {#is-is-terminology}

- **IS** - 中间系统是一种能够在相距较远的主机之间转发流量的路由器。
- **LSP** - 链路状态 PDU 包含路由器本地状态的信息（可用接口、可达邻居以及接口开销）。参见 [`/routing/isis/lsp`](../../../cli-reference/routing/isis/lsp.md)。
- **SPF** - 最短路径优先算法。
- **DIS** - 指定中间系统。DIS 确保网络中的所有路由器维护同步的数据库。L1 和 L2 路由分别选举不同的 DIS。DIS 的选举基于最高的接口优先级。
- **Level-1 (L1) routing** - 控制 IS-IS 区域内路由信息的分布。L1 路由基于 system ID。
- **Level-2 (L2) routing** - 控制 IS-IS 区域之间路由信息的分布。L2 路由基于 area ID。
- **IS-IS 邻接关系** - IS-IS 邻居之间的链路（参见 [`/routing/isis/neighbor`](../../../cli-reference/routing/isis/neighbor.md)）。形成的邻接类型取决于 IS-IS Hello 报文中交换的参数。每个相邻路由器都会运行 DIS 选举过程，以确定它是否有资格在广播网络上成为 L1 或 L2 DIS。
- **NSAP** - 用于标识路由器的网络服务访问点地址。
- **NET** - 网络实体标题。最后一个字节始终设置为零的 NSAP 地址。

## 协议基础 {#protocol-basics}

IS-IS 协议基于 TLV（Type/Length/Value），因此易于扩展。它使用 OSI 寻址原则，并且 NSAP 地址是按节点分配的，而不是按接口分配。

NSAP 地址分为三部分：

```
+-----+------+-----------+----+
| AFI | Area | System-ID | NS |
+-----+------+-----------+----+
```

- **AFI** - 最左侧的第一个字节定义 NSAP 地址的含义。IS-IS 的 [`afi`](../../../cli-reference/routing/isis/instance.md#afi) 参数控制实例处理的地址族。
- **Area ID** - 2 个八位组。
- 大多数 IS-IS 实现使用 6 个八位组的 **System-ID**。
- **NS**（N-selector）- 一个字节，并且 IS-IS 始终将其设置为零。

地址以十六进制字符串形式书写，每两个字节的部分用点分隔，但有一些例外。
例如，NET 地址 `49222211112222aded00` 写作 `49.2222.1111.2222.aded.00`：

- 最左侧的点分隔 AFI（2 个字符）。
- 随后是 Area ID（4 个字符）。
- 随后是 System ID，它被分成 3 组、每组 4 个字符。
- 最右侧的点必须位于 System ID 和 N-selector 之间。

RouterOS 将 NET 地址拆分到两个配置选项中。前 3 个字节（AFI 和 Area）通过 [`areas`](../../../cli-reference/routing/isis/instance.md#areas) 参数配置，接下来的 6 个字节是 System ID，通过 [`system-id`](../../../cli-reference/routing/isis/instance.md#system-id) 参数配置，而最后一个 NS 字节不会在任何地方显式配置。它始终被假定为零。

某些其他厂商的实现可能要求将 AFI 字节设置为特定值，例如，`0x47` 表示经典的 ISO NSAP 地址。
此外，`0x49` 可以用作私有地址空间，类似于 IPv4 私有地址范围（10.0.0.0/8 等）。

## 基本配置示例 {#basic-configuration-example}

基本配置需要创建一个实例（位于 [`/routing/isis/instance`](../../../cli-reference/routing/isis/instance.md) 下）并设置区域 ID 和系统 ID，同时通过 [`/routing/isis/interface-template`](../../../cli-reference/routing/isis/interface-template.md) 在接口上启用 IS-IS。

例如，在三台路由器之间建立一个 IS-IS 设置，其中一台是 Cisco，两台是 RouterOS。

**R1:**

```ros
/routing/isis/instance
add afi=ip areas=49.2222 disabled=no name=isis-instance-1 system-id=90ab.cdef.0001
/routing/isis/interface-template
add instance=isis-instance-1 interfaces=ether1 levels=l1,l2

[] /routing/isis/neighbor> print 
 0 instance=isis-instance-1 interface=ether1 level-type=l2 snpa=08:00:27:22:B4:A2 srcid="1111.2222.aded" state=up 

 1 instance=isis-instance-1 interface=ether1 level-type=l2 snpa=D4:CA:6D:78:2F:2E srcid="1111.2222.cded" state=up 

 2 instance=isis-instance-1 interface=ether1 level-type=l1 snpa=08:00:27:22:B4:A2 srcid="1111.2222.aded" state=up 

 3 instance=isis-instance-1 interface=ether1 level-type=l1 snpa=D4:CA:6D:78:2F:2E srcid="1111.2222.cded" state=up 

[] /routing/route> print where is-is
Flags: A - ACTIVE; i - IS-IS
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE, IMMEDIATE-GW
   DST-ADDRESS        GATEWAY                AFI  DISTANCE  SCOPE  TARGET-SCOPE  IMMEDIATE-GW         
 i 0.0.0.0/0          10.155.101.214%ether1  ip4       115     20            10  10.155.101.214%ether1
 i 10.155.101.0/24    10.155.101.216%ether1  ip4       115     20            10  10.155.101.216%ether1
Ai 10.255.255.162/32  10.155.101.216%ether1  ip4       115     20            10  10.155.101.216%ether1

```

**R2:**

```ros
/routing/isis/instance
add afi=ip areas=49.2222 disabled=no l1.originate-default=always l2.originate-default=always name=isis-instance-1 \
    system-id=1111.2222.cded
/routing/isis/interface-template
add instance=isis-instance-1 interfaces=sfp12 levels=l1,l2
add instance=isis-instance-1 interfaces=lo levels=l2

[] /routing/isis/neighbor> print 
 0 instance=isis-instance-1 interface=sfp12 level-type=l1 snpa=08:00:27:22:B4:A2 srcid="1111.2222.aded" state=up 

 1 instance=isis-instance-1 interface=sfp12 level-type=l1 snpa=C4:AD:34:43:EA:5C srcid="90ab.cdef.0001" state=up 

 2 instance=isis-instance-1 interface=sfp12 level-type=l2 snpa=08:00:27:22:B4:A2 srcid="1111.2222.aded" state=up 

 3 instance=isis-instance-1 interface=sfp12 level-type=l2 snpa=C4:AD:34:43:EA:5C srcid="90ab.cdef.0001" state=up 

```

**R3 Cisco:**

```ros
interface Loopback0
 ip address 10.255.255.162 255.255.255.255
 ip router isis 
!
interface GigabitEthernet1
 ip address dhcp
 ip router isis 
 negotiation auto
!
router isis
 net 49.2222.1111.2222.aded.00
!

# show isis neighbors 

Tag null:
System Id      Type Interface   IP Address      State Holdtime Circuit Id
90AB.CDEF.0001 L1   Gi1         10.155.101.183  UP    27       1111.2222.CDED.01  
90AB.CDEF.0001 L2   Gi1         10.155.101.183  UP    27       1111.2222.CDED.01  
1111.2222.CDED L1   Gi1         10.155.101.214  UP    9        1111.2222.CDED.01  
1111.2222.CDED L2   Gi1         10.155.101.214  UP    9        1111.2222.CDED.01 

# show ip route

i*L1  0.0.0.0/0 [115/11] via 10.155.101.214, 4w5d, GigabitEthernet1
      10.0.0.0/8 is variably subnetted, 5 subnets, 2 masks
C        10.155.101.0/24 is directly connected, GigabitEthernet1
L        10.155.101.216/32 is directly connected, GigabitEthernet1
i L2     10.155.255.214/32 [115/10] via 10.155.101.183, 2w3d, GigabitEthernet1

```

## 故障排除 {#troubleshooting}

### IS-IS 无法工作并打印警告消息 "invalid 3way tlv" {#is-is-does-not-work-and-prints-the-warning-message-invalid-3way-tlv}

此警告表明，远端邻居很可能不符合 RFC 5303 中针对点对点网络的 3-way handshake。例如，在 Cisco 上，必须在接口上启用 "isis three-way-handshake ietf" 才能具有 15 字节的 TLV。
