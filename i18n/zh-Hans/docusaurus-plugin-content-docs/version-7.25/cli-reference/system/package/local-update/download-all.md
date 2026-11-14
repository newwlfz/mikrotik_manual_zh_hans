---
sidebar_key: "cli-reference/system/package/local-update/download-all"
sidebar_position: 1
title: "download-all"
sidebar_label: 'download-all'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/local-update/download-all
captured_at: '2026-11-01T21:25:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/local-update/download-all {#systempackagelocal-updatedownload-all}
**类型：** 命令

下载本地软件包服务器上所有可用的兼容（与设备架构匹配）软件包。下载的软件包会保存在根目录中。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="download-beta" typ="bool">下载所有兼容软件包时是否包含 beta 软件包。</ArgTableRow>
<ArgTableRow arg="reboot-after-download" typ="bool">所有软件包下载完成后是否自动重新启动设备。</ArgTableRow>
</ArgTable>
