---
title: "ip-scan"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/ip-scan
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/ip-scan 
**条件：** !smips
**类型：** Command

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dhcp">dhcp</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="address-range" typ="ipRange"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="time" typ="num"></ArgTableRow>
<ArgTableRow arg="dns" typ="string"></ArgTableRow>
<ArgTableRow arg="snmp" typ="string"></ArgTableRow>
<ArgTableRow arg="netbios" typ="string"></ArgTableRow>
</ArgTable>
