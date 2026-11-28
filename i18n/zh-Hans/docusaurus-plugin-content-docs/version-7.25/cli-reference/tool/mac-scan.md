---
title: "mac-scan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-scan
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/tool/mac-server"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-scan 
**Conditions:** !smips
**Type:** 命令

列出在接口上发送 MikroTik Neighbor Discovery（MNDP）通告的设备及其 MAC 地址和 IPv4 地址，以查找用于 MAC Telnet 或 MAC WinBox 的 MAC 地址。无论设备的 MAC server 设置如何，设备都会显示；在该接口上关闭邻居发现的设备不会显示。未指定 `duration` 时，扫描将持续运行，直到你停止它。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface to scan, or `all` for all interfaces.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the device.</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">IPv4 address the device announces in neighbor discovery.</ArgTableRow>
<ArgTableRow arg="age" typ="num">Seconds since the device's last neighbor discovery announcement.</ArgTableRow>
</ArgTable>
