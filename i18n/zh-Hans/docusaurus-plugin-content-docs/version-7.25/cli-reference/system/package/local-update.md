---
title: "local-update"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/local-update
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## system/package/local-update 
**类型：** 目录

无需直接连接到 MikroTik 服务器，你可以将软件包文件上传到一台本地 RouterOS 设备，并将其用作本地软件包服务器。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="download" typ="bool">Whether to download available packages from the local package server.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="source" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">IP address of the local package server.</ArgTableRow>
<ArgTableRow arg="name" typ="string">Name of the package.</ArgTableRow>
<ArgTableRow arg="version" typ="string">Version of the package.</ArgTableRow>
<ArgTableRow arg="status" typ="enum (installed | downloaded | downloading | scheduled | available) { installed:0, downloaded:1, downloading:2, scheduled:3, available:4 }">Current status of the package.</ArgTableRow>
<ArgTableRow arg="completed" typ="num">Download completion percentage.</ArgTableRow>
</ArgTable>
