---
sidebar_key: "cli-reference/system/package/update/download"
sidebar_position: 3
title: "download"
sidebar_label: 'download'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/update/download
captured_at: '2026-11-01T21:25:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/update/download {#systempackageupdatedownload}
**类型：** 命令

下载最新的可用 RouterOS 软件包，但不进行安装。需要手动重启才能应用更新。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ignore-missing" typ="bool" unset="1">仅下载 RouterOS 主软件包，省略缺失或未上传的软件包。</ArgTableRow>
</ArgTable>
