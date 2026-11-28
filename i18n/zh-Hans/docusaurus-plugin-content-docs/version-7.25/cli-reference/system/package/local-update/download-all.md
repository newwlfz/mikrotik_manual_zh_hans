---
title: "download-all"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/local-update/download-all
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/package/local-update"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## system/package/local-update/download-all 
**类型：** 命令

下载本地软件包服务器上所有可用且兼容（匹配设备架构）的软件包。下载的软件包保存在根目录。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="download-beta" typ="bool">Whether to include beta packages when downloading all compatible packages.</ArgTableRow>
<ArgTableRow arg="reboot-after-download" typ="bool">Whether to automatically reboot the device after all packages finish downloading.</ArgTableRow>
</ArgTable>
