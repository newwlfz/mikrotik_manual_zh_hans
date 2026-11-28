---
title: "环路保护"
description: "Loop Protect 通过检测并禁用接收到自身 loop-protect 数据包的接口来防止 Layer2 环路，可配置检测间隔和禁用时间。它支持 Ethernet、VLAN、EoIP 和 VxLAN 接口，但对于网桥，建议使用 (R/M)STP。"
tags:
  - 'loop-protect'
  - 'ethernet'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/loop-protect
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

loop protect 功能通过发送 loop protect 协议数据包，并在接口收到源自自身的 loop protect 数据包时关闭接口，从而防止 Layer2 环路。该功能通过将收到的 loop-protect 数据包的源 MAC 地址与启用 loop-protect 的接口的 MAC 地址进行比对来工作。如果找到匹配项，loop protect 会禁用收到 loop protect 数据包的接口。系统会在日志中记录警告消息，并使用 loop protect 注释标记该接口。RouterOS loop protect 功能既可用于网桥接口，也可用于在 RouterBoard 交换芯片中设置为交换的以太网接口。

Loop Protect 适用于 Ethernet、VLAN、EoIP、VxLAN 接口，其数据包使用 EtherType 0x9003 封装。  
可调整 loop protect 数据包发送间隔和接口禁用时间。配置更改或禁用时间到期会重置接口上的 loop protection。

:::warning
即使 loop-protect 可用于添加到网桥的接口，仍建议优先使用 (R/M)STP，而不是 loop-protect，因为 (R/M)STP 与大多数交换机兼容，并且 STP 变体提供更多配置选项，可用于精细调整网络。
:::

**子菜单：** `/interface/ethernet, /interface/vlan, /interface/eoip, /interface/eoipv6, /interface/vxlan`

| 属性 | 说明 |
| :-- | :-- |
| **loop-protect** (*on \| off \| default*；默认值：**default**) | 在所选接口上启用或禁用 loop protect。**default** 等同于关闭。 |
| **loop-protect-send-interval** (*time interval*；默认值：**5s**) | 设置在所选接口上发送 loop protect 数据包的频率。 |
| **loop-protect-disable-time** (*time interval \| 0*；默认值：**5m**) | 设置检测到环路时禁用所选接口的时长。**0** - 永久。 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **loop-protect-status** (*on \| off \| disable*) | <ul><li><strong>on</strong> - loop-protect 功能已开启，接口正在发送和监听 loop protect 数据包</li><li><strong>off</strong> - loop-protect 功能已关闭</li><li><strong>disable</strong> - loop-protect 功能已开启，接口已收到 loop protect 数据包并禁用自身以防止环路。</li></ul> |
