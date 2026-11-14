---
sidebar_key: "cli-reference/tool/mac-scan"
sidebar_position: 10
title: "mac-scan"
sidebar_label: 'mac-scan'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-scan
captured_at: '2026-11-01T21:25:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-scan {#toolmac-scan}
**条件：** !smips
**类型：** 命令

列出在接口上发送 MikroTik Neighbor Discovery (MNDP) 通告的设备及其 MAC 地址和 IPv4 地址，以便查找用于 MAC Telnet 或 MAC WinBox 的 MAC 地址。无论设备的 MAC 服务器设置如何，设备都会显示；如果设备在该接口上关闭了邻居发现，则不会显示。未指定 `duration` 时，扫描会一直运行，直到你停止它。有关示例，请参阅 [MAC 服务器](../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">要扫描的接口，或使用 `all` 表示所有接口。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr">设备的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">设备在邻居发现中通告的 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="age" typ="num">自设备上次邻居发现通告以来的秒数。</ArgTableRow>
</ArgTable>
