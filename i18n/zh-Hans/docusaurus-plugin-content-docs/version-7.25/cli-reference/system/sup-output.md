---
sidebar_key: "cli-reference/system/sup-output"
sidebar_position: 32
title: "sup-output"
sidebar_label: 'sup-output'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/sup-output
captured_at: '2026-11-01T21:25:46+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/sup-output {#systemsup-output}
**类型：** 命令

创建支持输出文件（`supout.rif`），这是供 MikroTik 支持使用的路由器诊断快照，并在 `created` 中显示其进度。该文件经过编码，需在您的 MikroTik 账户中使用 Supout.rif 查看器打开。请参阅 [Supout.rif](../../getting-started/supout-rif.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">文件名，或诸如 `usb1/supout` 的路径，用于将其写入文件夹。当名称没有扩展名时，RouterOS 会添加 `.rif` 扩展名，因此 `supout.rif` 也会写入 `supout.rif`。默认值：supout。</ArgTableRow>
<ArgTableRow arg="output-width" typ="num" unset="1">文件中命令输出的宽度。当查看器显示的输出被截断或换行时，请使用更大的值，例如 `300`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="created" typ="num">文件进度百分比，从开始直到 `100%`。</ArgTableRow>
</ArgTable>
