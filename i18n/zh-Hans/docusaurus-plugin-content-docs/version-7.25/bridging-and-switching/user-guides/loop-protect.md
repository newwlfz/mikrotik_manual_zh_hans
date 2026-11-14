---
sidebar_key: "bridging-and-switching/user-guides/loop-protect"
sidebar_position: 6
title: "环路保护"
sidebar_label: "环路保护"
description: "Loop Protect 通过检测并禁用接收到自身 loop-protect 数据包的接口来防止二层环路，并具有可配置的间隔和禁用时间。它支持 Ethernet、VLAN、EoIP 和 VxLAN 接口，不过对于网桥建议使用 (R/M)STP。"
tags:
  - 'loop-protect'
  - 'ethernet'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/loop-protect
captured_at: '2026-11-04T11:14:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

loop protect 功能可以通过发送 loop protect 协议数据包，并在接口收到源自自身的 loop protect 数据包时关闭接口，来防止二层环路。该功能通过将收到的 loop-protect 数据包的源 MAC 地址与启用了 loop-protect 的接口的 MAC 地址进行比对来工作。如果找到匹配项，loop protect 会禁用收到该 loop protect 数据包的接口。日志消息会对此事件发出警告，系统还会用 loop protect 注释标记该接口。RouterOS 的 loop protect 功能既可用于桥接接口，也可用于在 RouterBoard 交换芯片中设置为交换模式的 Ethernet 接口。

Loop Protect 适用于 Ethernet、VLAN、EoIP、VxLAN 接口，其数据包使用 EtherType 0x9003 封装。  
loop protect 数据包间隔和接口禁用时间可以调整。配置更改或禁用时间到期会重置接口上的环路保护。

:::warning
尽管 loop-protect 可用于已加入网桥的接口，但仍建议使用 (R/M)STP 而不是 loop-protect，因为 (R/M)STP 与大多数交换机兼容，并且 STP 变体提供了更多配置选项来微调网络。
:::

**子菜单：** `/interface/ethernet, /interface/vlan, /interface/eoip, /interface/eoipv6, /interface/vxlan`

| 属性 | 描述 |
| :-- | :-- |
| **loop-protect** (*on \| off \| default*; 默认：**default**) | 在所选接口上启用或禁用 loop protect。**default** 相当于关闭。 |
| **loop-protect-send-interval** (*时间间隔*; 默认：**5s**) | 设置所选接口上发送 loop protect 数据包的频率。 |
| **loop-protect-disable-time** (*时间间隔 \| 0*; 默认：**5m**) | 设置检测到环路时所选接口被禁用的时长。**0** - 永久。 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **loop-protect-status** (*on \| off \| disable*) | on - loop-protect 功能已开启，接口正在发送并监听 loop protect 数据包；off - loop-protect 功能已关闭；disable - loop-protect 功能已开启，接口已收到 loop protect 数据包并禁用自身以防止环路。 |
