---
sidebar_key: "cli-reference/system/identity"
sidebar_position: 12
title: "identity"
sidebar_label: 'identity'
source: https://manual.mikrotik.com/docs/cli-reference/system/identity
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/identity {#systemidentity}
**类型：** 设置目录

路由器的名称。有关其出现位置和示例，请参阅 [身份](../../system-information-and-utilities/identity.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">路由器名称，最多 64 个字符；允许使用空格和其他字符，名称更长时会失败并显示 `could not change identity: too long`。它会显示在 CLI 提示符和 WinBox 中，出现在邻居发现中，作为 SNMP 的 `sysName`，作为 DHCP 客户端发送的主机名，以及作为旧版无线接口的默认 SSID。SNMP 可以使用具有写权限的 community 来设置它。默认值：MikroTik。</ArgTableRow>
</ArgTable>
