---
sidebar_key: "cli-reference/certificate/add-scep"
sidebar_position: 3
title: "add-scep"
sidebar_label: "add-scep"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/certificate/add-scep
captured_at: '2026-11-01T21:26:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/add-scep {#certificateadd-scep}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-identity" typ="string"></ArgTableRow>
<ArgTableRow arg="template" typ="enum"></ArgTableRow>
<ArgTableRow arg="scep-url" typ="string"></ArgTableRow>
<ArgTableRow arg="challenge-password" typ="string"></ArgTableRow>
<ArgTableRow arg="on-smart-card" typ="bool">如果硬件支持，将私钥存储在智能卡上</ArgTableRow>
<ArgTableRow arg="refresh" typ="bool">检查证书到期时间，如果已到期则刷新</ArgTableRow>
</ArgTable>
