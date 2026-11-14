---
sidebar_key: "cli-reference/tool/wol"
sidebar_position: 27
title: "wol"
sidebar_label: 'wol'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/wol
captured_at: '2026-11-01T21:26:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/wol {#toolwol}
**类型：** 命令

关于完整文档，请参阅 [网络唤醒](../../system-information-and-utilities/wake-on-lan.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">发送魔术包所用的接口，例如 LAN 网桥。指定接口时，路由器会向其上的广播 MAC 地址发送以太网帧（EtherType `0x0842`）。未指定接口时，它会通过默认路由向 `255.255.255.255` 的 9 端口发送 UDP 数据包，而在大多数路由器上，默认路由就是互联网连接。</ArgTableRow>
<ArgTableRow arg="mac" typ="macAddr">要唤醒的计算机的 MAC 地址。魔术包中会包含该地址 16 次。</ArgTableRow>
</ArgTable>
