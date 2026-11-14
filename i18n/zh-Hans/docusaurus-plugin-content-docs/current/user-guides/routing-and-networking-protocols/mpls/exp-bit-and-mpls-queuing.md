---
sidebar_key: "user-guides/routing-and-networking-protocols/mpls/exp-bit-and-mpls-queuing"
sidebar_position: 1
title: "EXP 位和 MPLS 队列"
sidebar_label: "EXP 位和 MPLS 队列"
description: "本页说明 MPLS 数据包中的 EXP 位，以及 RouterOS 如何为 QoS 处理该位，包括优先级标记、队列策略和 MPLS mangle 规则。文中详细介绍了在数据包交换、倒数第二跳弹出和本地处理期间如何处理 EXP 位，并给出了在 RouterOS 中配置 MPLS mangle 规则的示例。"
tags:
  - 'mpls'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/mpls/exp-bit-and-mpls-queuing
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

当 MPLS 标签附加到数据包时，它会使数据包长度增加 32 bits（4 bytes）。这 32 bits 的构成如下：

- 标签值本身（20 bits）。
- EXP（“experimental”）字段（3 bits）。
- Time to live 字段（8 bits）。
- Bottom of stack 字段（1 bit）。

MPLS 标准未规定“experimental”位的用途，但最常见的用途是携带 QoS 信息，类似于 VLAN 标签中的 802.1q 优先级。EXP 字段仅包含 3 bits，这意味着它可以携带 0 到 7 的值，从而支持 8 个流量类别。

## RouterOS 中 EXP 字段的处理 {#exp-field-treatment-in-routeros}

当 RouterOS 收到 MPLS 数据包时，会将数据包的 "ingress priority" 值设置为顶层标签内携带的值。"ingress priority" 不是数据包头部中的字段，而是 RouterOS 在处理数据包时为其分配的额外标记。当 RouterOS 为 MPLS 数据包添加标签时，会将 EXP 位设置为分配给该数据包的 "priority"（不是 "ingress priority"）。当 RouterOS 交换 MPLS 数据包时，会自动将 "ingress priority" 复制到 "priority"。这样，常规 MPLS 交换就会在整个标签交换路径上传递优先级信息。

有关 "ingress priority" 和 "priority" 处理的更多信息，另请参阅 [WMM 与 VLAN 优先级](../../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md)。

EXP 字段的行为取决于对数据包执行的动作：

- 如果 RouterOS 对数据包进行 MPLS 交换（弹出标签并压入新标签），新标签中的 EXP 字段与收到的标签一致，因为：
  - RouterOS 会将 "ingress priority" 设置为收到的标签中的 EXP 位。
  - 交换会自动将 "priority" 设置为 "ingress priority"。
  - RouterOS 为数据包添加新标签，并将其 EXP 位设置为 "priority" 中的值。
- 如果 RouterOS 通过 penultimate-hop-popping 对数据包进行 MPLS 交换（路由器弹出收到的标签且不压入新标签），EXP 字段的优先级会保留在数据包的 "priority" 字段中。其他 MAC 协议（例如 WMM 或 802.1q VLAN）随后可以使用此值：
  - RouterOS 会将 "ingress priority" 设置为收到的标签中的 EXP 位。
  - 交换会自动将 "priority" 设置为 "ingress priority"。
  - RouterOS 在不压入标签的情况下将数据包交换到下一跳，并且这一过程通过 VLAN 接口进行。
  - VLAN 接口会将 VLAN 头部中的 802.1q 优先级设置为数据包的 "priority" 值。

penultimate-hop-popping 可能会在最后一跳丢失通过标签交换路径传递的 QoS 信息。如果需要保留此信息，请为标签交换路径中的最后一跳使用 Explicit NULL 标签而不是 Implicit NULL 标签，以禁用 penultimate-hop-popping。默认情况下，MPLS TE 隧道会为最后一跳使用 Explicit NULL 标签。

- 如果 RouterOS 通过标签交换路径发送数据包（路由器将第一个标签压入数据包），它会将 EXP 位设置为 "priority" 中的值。你可以使用防火墙规则或其他方式（例如来自 IP 头部中的 DSCP 字段）正确设置此值。
- 如果 RouterOS 收到用于本地处理的数据包，它会将 "ingress priority" 设置为收到数据包的 EXP 字段。然后，你可以使用此值更新数据包的 DSCP 字段，或使用防火墙规则将 "priority" 设置为 "ingress priority"。

## MPLS Mangle 与队列 {#mpls-mangle-and-queuing}

RouterOS 防火墙仅适用于 IP 流量，这意味着你不能直接在 mangle 中标记 MPLS 数据包并通过队列对其进行限制。你必须在添加 MPLS 头部之前的入口边缘路由器上，或在移除 MPLS 标签之后的出口边缘路由器上执行排队。

从 ROS v7.17 开始，RouterOS 包含 MPLS Mangle。此功能允许你在标签交换（P）路由器上或 MPLS 封装后的 PE 输出上，根据 EXP 位添加数据包标记，或更改分配的 EXP 位。

此配置可从 `/mpls/mangle` 菜单访问。

### 基本示例 {#basic-example}

让我们看一个非常基本的示例：在 LSP 上的标签交换路由器（P）上，我们希望标记 EXP 位为 0 的数据包，限制带宽并将 EXP 位改为 3：

```routeros
/mpls/mangle
add chain=forward exp=0 set-exp=3 set-mark=m0

/queue/tree
add limit-at=10M max-limit=10M name=mpls_queue packet-mark=m0 parent=sfp-sfpplus2
```

MPLS 数据包不能使用基于 IMQ 接口的队列（simple queue、queue tree global）进行排队。必须使用以“真实”接口作为父级的 queue tree。

MPLS Mangle 表会显示匹配的数据包计数，这对于调试配置很有用：

```ros
[admin@CCR2004_2XS_111] /mpls/mangle> print 
Flags: X - DISABLED
Columns: CHAIN, EXP, SET-EXP, SET-MARK, PACKETS
#   CHAIN    EXP  SET-EXP  SET-MARK  PACKETS
0   forward    0        3  m0        221 654
```

MPLS mangle 规则不会像常规防火墙 mangle 规则那样逐行执行。相反，MPLS Mangle 会一次性应用所有动作。

例如，请查看以下规则集：

```routeros
/mpls/mangle
add chain=forward exp=0 set-mark=m0
add chain=forward exp=0 set-exp=3
add chain=forward exp=3 set-mark=m3
```

在此示例中，如果传入数据包的 EXP 位值为 0，则第三条规则不适用。

为特定 EXP 位设置动作后，其他规则无法修改它：

```ros
[admin@CCR2004_2XS_111] /mpls/mangle> add chain=forward exp=0 set-mark=m4
failure: conflicting forward set-mark rule
```
