---
sidebar_key: "cli-reference/system/package/update/check-for-updates"
sidebar_position: 2
title: "check-for-updates"
sidebar_label: 'check-for-updates'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/update/check-for-updates
captured_at: '2026-11-01T21:25:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/update/check-for-updates {#systempackageupdatecheck-for-updates}
**类型：** 命令

在所选发布通道中检查 MikroTik 下载服务器上是否有更新的 RouterOS 版本。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="fetch-changelog" typ="switch">是否在检查更新的同时获取变更日志。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="changelog" typ="string">最新可用版本的变更日志文本。</ArgTableRow>
</ArgTable>
