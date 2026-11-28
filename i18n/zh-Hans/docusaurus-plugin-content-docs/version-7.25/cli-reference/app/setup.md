---
title: "setup"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/app/setup
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## app/setup 
**Syscap：** app
**Package：** container
**Type：** Command

启动设置向导，自动配置 App 系统的网络、存储和 registry。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="disk" typ="enum (none)">Selected storage disk for application installation</ArgTableRow>
<ArgTableRow arg="lan-bridge" typ="iface_enum { none }">Selected LAN bridge interface for container networking</ArgTableRow>
<ArgTableRow arg="router-ip-alt" typ="alt { router-ip-enum: enum
, router-ip: ipAddr
 }">Manual IP address override for the RouterOS device</ArgTableRow>
</ArgTable>
