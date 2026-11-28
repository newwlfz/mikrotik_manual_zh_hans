---
title: "sup-output"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/sup-output
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/swos"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/sup-output
**类型：** Command

创建支持输出文件（`supout.rif`），即供 MikroTik 支持使用的路由器诊断快照，并在 `created` 中显示其进度。该文件经过编码，可在你的 MikroTik 账户中使用 Supout.rif 查看器打开。请参阅 [Supout.rif](/docs/getting-started/supout-rif)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the file, or a path such as `usb1/supout` to write it into a folder. RouterOS adds the `.rif` extension when the name has none, so `supout.rif` also writes `supout.rif`. Default: supout.</ArgTableRow>
<ArgTableRow arg="output-width" typ="num" unset="1">Width of the command outputs in the file. Use a larger value, for example `300`, when the viewer shows the outputs cut or wrapped.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="created" typ="num">Progress of the file in percent, from the start up to `100%`.</ArgTableRow>
</ArgTable>
