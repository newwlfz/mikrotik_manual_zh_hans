---
sidebar_key: "cli-reference/certificate/sign"
sidebar_position: 17
title: "sign"
sidebar_label: 'sign'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/certificate/sign
captured_at: '2026-11-01T21:21:52+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/sign {#certificatesign}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-crl-host" typ="multi { array-id, host: string
 }">将 CRL URL 添加到创建的证书</ArgTableRow>
<ArgTableRow arg="ca-on-smart-card" typ="bool">将 CA 的私钥存储在智能卡上</ArgTableRow>
<ArgTableRow arg="ca" typ="enum">签发 CA</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="progress" typ="string"></ArgTableRow>
</ArgTable>
