---
sidebar_key: "cli-reference/zerotier/peer/hint"
sidebar_position: 1
title: "hint"
sidebar_label: 'hint'
source: https://manual.mikrotik.com/docs/cli-reference/zerotier/peer/hint
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier/peer/hint {#zerotierpeerhint}
**包：** zerotier
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该项是否已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum" mandatory="1">ZeroTier 实例名称。</ArgTableRow>
<ArgTableRow arg="identity" typ="string" mandatory="1">对等端的 ZeroTier 身份。</ArgTableRow>
<ArgTableRow arg="addresses" typ="multi { array-id, array-id, address: composite { addr: address (flags=46)
, port: num [1 .. 65535]
 }
 }" mandatory="1">对等端的 IP 地址和端口列表。</ArgTableRow>
</ArgTable>
