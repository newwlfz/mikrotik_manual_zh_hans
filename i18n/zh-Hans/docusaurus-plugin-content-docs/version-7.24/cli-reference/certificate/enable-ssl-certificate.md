---
sidebar_key: "cli-reference/certificate/enable-ssl-certificate"
sidebar_position: 9
title: "enable-ssl-certificate"
sidebar_label: "enable-ssl-certificate"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/certificate/enable-ssl-certificate
captured_at: '2026-11-01T21:26:26+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/enable-ssl-certificate {#certificateenable-ssl-certificate}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="dns-name" typ="string">SSL 证书的域名</ArgTableRow>
<ArgTableRow arg="directory-url" typ="string">ACME 目录 URL</ArgTableRow>
<ArgTableRow arg="eab-hmac-key" typ="string">base64url 编码的 EAB hmac 密钥</ArgTableRow>
<ArgTableRow arg="eab-kid" typ="string">EAB 账户 ID</ArgTableRow>
<ArgTableRow arg="reset-private-key" typ="bool">初始化新的私钥</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="progress" typ="string"></ArgTableRow>
</ArgTable>
