---
sidebar_key: "cli-reference/certificate/scep-server/ra/index"
sidebar_position: 1
title: "ra"
sidebar_label: "ra"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/certificate/scep-server/ra
captured_at: '2026-11-01T21:26:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/scep-server/ra {#certificatescep-serverra}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="C" typ="smart-card-key">smart-card-key</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="server-url" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="template" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="challenge-password" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-identity" typ="string"></ArgTableRow>
<ArgTableRow arg="fingerprint-algorithm" typ="enum (sha256 | sha1 | md5)"></ArgTableRow>
<ArgTableRow arg="ra-path" typ="string"></ArgTableRow>
<ArgTableRow arg="ra-transaction-lifetime" typ="time"></ArgTableRow>
<ArgTableRow arg="on-smart-card" typ="bool">将私钥存储在智能卡上</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="req-fingerprint" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-fingerprint" typ="string"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
</ArgTable>
