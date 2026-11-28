---
title: "mirror"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package/local-update/mirror
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/package/local-update/mirror 
**类型：** 设置目录

使用该菜单可以从主本地软件包服务器镜像软件包（适用于所有架构）。下载的软件包会保存到根目录中的 `packs` 文件夹。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Whether to enable periodic check and download of packages from the local package server.</ArgTableRow>
<ArgTableRow arg="primary-server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">IP address of the primary local package server.</ArgTableRow>
<ArgTableRow arg="secondary-server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">IP address of the secondary local package server.</ArgTableRow>
<ArgTableRow arg="check-interval" typ="time">Time interval at which the device checks the local package server for new package availability. If a new package is located, the package download begins. Only downloads the packages that are not already present on the device.</ArgTableRow>
<ArgTableRow arg="user" typ="string">Username for accessing the local package server.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password for accessing the local package server.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="software-id" typ="string">Software ID of the device.</ArgTableRow>
</ArgTable>
