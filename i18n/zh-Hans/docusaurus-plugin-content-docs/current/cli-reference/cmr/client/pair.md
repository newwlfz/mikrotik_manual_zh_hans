---
sidebar_key: "cli-reference/cmr/client/pair"
sidebar_position: 2
title: "pair"
sidebar_label: 'pair'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/client/pair
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/client/pair {#cmrclientpair}
**Conditions:** !smips
**类型：** Command

启动与 CMR 服务器的配对过程。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="username" typ="string" unset="1">CMR 服务器用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string" unset="1">CMR 服务器密码。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46)">CMR 服务器 IP 地址。</ArgTableRow>
<ArgTableRow arg="status" typ="string">配对状态。</ArgTableRow>
</ArgTable>
