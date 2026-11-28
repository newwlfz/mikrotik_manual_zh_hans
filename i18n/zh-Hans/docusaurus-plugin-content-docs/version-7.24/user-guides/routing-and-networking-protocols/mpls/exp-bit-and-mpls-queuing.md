---
title: "EXP 位和 MPLS 队列"
description: "本页介绍 MPLS 数据包中的 EXP 位，以及 RouterOS 如何处理该字段以实现 QoS，包括优先级标记、队列策略和 MPLS mangle 规则。文中详细说明数据包交换、倒数第二跳弹出和本地处理期间如何处理 EXP 位，并提供在 RouterOS 中配置 MPLS mangle 规则的示例。"
tags:
  - 'mpls'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/mpls/exp-bit-and-mpls-queuing
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/mpls"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

当 MPLS 标签附加到数据包时，数据包长度会增加 32 位（4 字节）。这 32 位分解如下：

- 标签值本身（20 位）。
- EXP（“experimental”）字段（3 位）。
- 生存时间字段（8 位）。
- 栈底字段（1 位）。

MPLS 标准未规定“experimental”位的用途，但最常见的用途是承载 QoS 信息，类似于 VLAN 标签中的 802.1q 优先级。EXP 字段只有 3 位，这意味着它可以承载 0 到 7 的值，从而支持 8 个流量类别。

## RouterOS 中的 EXP 字段处理 {#exp-field-treatment-in-routeros}

当 RouterOS 收到 MPLS 数据包时，会将数据包的“ingress priority”值设置为顶层标签中携带的值。“ingress priority”不是数据包报头中的字段，而是 RouterOS 在处理数据包时为其分配的附加标记。当 RouterOS 为 MPLS 数据包添加标签时，会将 EXP 位设置为分配给数据包的“priority”（而非“ingress priority”）。当 RouterOS 交换 MPLS 数据包时，会自动将“ingress priority”复制到“priority”。这样，常规 MPLS 交换会在整个标签交换路径上传达优先级信息。

有关“ingress priority”和“priority”处理的更多信息，另请参阅 [WMM 和 VLAN 优先级](/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority)。

EXP 字段的行为取决于对数据包执行的操作：

- 如果 RouterOS 通过弹出标签并压入新标签来 MPLS 交换数据包，则新标签中的 EXP 字段与收到的标签匹配，原因是：
  - RouterOS 将“ingress priority”设置为收到的标签中的 EXP 位。
  - 交换会自动将“priority”设置为“ingress priority”。
  - RouterOS 使用新标签为数据包添加标签，并将其 EXP 位设置为“priority”中的值。
- 如果 RouterOS 使用倒数第二跳弹出（路由器弹出收到的标签且不压入新标签）来 MPLS 交换数据包，则 EXP 字段优先级会保留在数据包的“priority”字段中。随后，其他 MAC 协议（例如 WMM 或 802.1q VLAN）可以使用该值：
  - RouterOS 将“ingress priority”设置为收到的标签中的 EXP 位。
  - 交换会自动将“priority”设置为“ingress priority”。
  - RouterOS 将数据包交换到下一跳而不压入标签，并且此过程通过 VLAN 接口进行。
  - VLAN 接口将 VLAN 报头中的 802.1q 优先级设置为数据包的“priority”值。

倒数第二跳弹出可能会在最后一跳丢失通过标签交换路径承载的 QoS 信息。如果需要保留该信息，请在标签交换路径的最后一跳使用 Explicit NULL 标签代替 Implicit NULL 标签，以禁用倒数第二跳弹出。MPLS TE 隧道默认对最后一跳使用 Explicit NULL 标签。

- 如果 RouterOS 通过标签交换路径发送数据包（路由器将数据包的第一个标签压入），它会将 EXP 位设置为“priority”中的值。可以使用防火墙规则或其他方式（例如，根据 IP 头中的 DSCP 字段）正确设置该值。
- 如果 RouterOS 接收到要本地处理的数据包，它会将“ingress priority”设置为所接收数据包的 EXP 字段。随后可以使用该值更新数据包的 DSCP 字段，或使用防火墙规则从“ingress priority”设置“priority”。

## MPLS Mangle 和队列 {#mpls-mangle-and-queuing}

RouterOS 防火墙仅处理 IP 流量，这意味着不能直接在 mangle 中标记 MPLS 数据包，也不能通过队列对其进行限速。必须在添加 MPLS 头之前在入口边缘路由器上执行队列处理，或者在移除 MPLS 标签之后在出口边缘路由器上执行队列处理。

从 ROS v7.17 开始，RouterOS 包含 MPLS Mangle。该功能允许基于 EXP 位添加数据包标记，或者在标签交换（P）路由器上、MPLS 封装后的 PE 输出上更改已分配的 EXP 位。

此配置可从 `/mpls/mangle` 菜单访问。

### 基本示例 {#basic-example}

下面看一个非常基本的示例：在 LSP 上的标签交换路由器（P）上，我们希望标记 EXP 位为 0 的数据包，限制带宽，并将 EXP 位更改为 3：

```routeros
/mpls/mangle
add chain=forward exp=0 set-exp=3 set-mark=m0

/queue/tree
add limit-at=10M max-limit=10M name=mpls_queue packet-mark=m0 parent=sfp-sfpplus2
```

无法使用以 IMQ 接口作为父接口的队列（simple queue、queue tree global）对 MPLS 数据包进行排队。必须使用以“真实”接口作为 parent 的 queue tree。

MPLS Mangle 表显示匹配的数据包计数，可用于调试配置：

```ros
[admin@CCR2004_2XS_111] /mpls/mangle> print 
Flags: X - DISABLED
Columns: CHAIN, EXP, SET-EXP, SET-MARK, PACKETS
#   CHAIN    EXP  SET-EXP  SET-MARK  PACKETS
0   forward    0        3  m0        221 654
```

MPLS mangle 规则不会像常规防火墙 mangle 规则那样逐行执行。MPLS Mangle 会一次性应用所有动作。

例如，查看以下规则集：

```routeros
/mpls/mangle
add chain=forward exp=0 set-mark=m0
add chain=forward exp=0 set-exp=3
add chain=forward exp=3 set-mark=m3
```

在此示例中，如果入站数据包的 EXP 位值为 0，则第三条规则不适用。

为特定 EXP 位设置动作后，其他规则无法修改它：

```ros
[admin@CCR2004_2XS_111] /mpls/mangle> add chain=forward exp=0 set-mark=m4
failure: conflicting forward set-mark rule
```
