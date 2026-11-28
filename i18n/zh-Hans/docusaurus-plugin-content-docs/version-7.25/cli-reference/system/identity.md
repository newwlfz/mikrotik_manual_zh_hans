---
title: "identity"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/identity
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/keymat-provider"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/identity 
**类型：** 设置目录

路由器名称。有关其显示位置和示例，请参阅 [Identity](/docs/system-information-and-utilities/identity)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the router, up to 64 characters; spaces and other characters are allowed, a longer name fails with `could not change identity: too long`. It appears in the CLI prompt and in WinBox, in neighbor discovery, as the SNMP `sysName`, as the host name the DHCP client sends, and as the default SSID of legacy wireless interfaces. SNMP can set it with a community that has write access. Default: MikroTik.</ArgTableRow>
</ArgTable>
