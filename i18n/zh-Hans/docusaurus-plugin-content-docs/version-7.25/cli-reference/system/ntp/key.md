---
title: "key"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/key
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/key 
**类型：** 目录

用于 NTP 身份验证的对称密钥，通过其在 [`/system/ntp/client/servers`](/docs/cli-reference/system/ntp/client/servers) 和 [`/system/ntp/server`](/docs/cli-reference/system/ntp/server) 中的密钥 ID 选择。密钥值属于敏感信息：不会在 `print` 中显示，也不会保存在 `export` 输出中。请参阅 [NTP](/docs/system-information-and-utilities/ntp) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="key-id" typ="num" mandatory="1">Key identifier, referenced by `auth-key` in the client and server configuration.</ArgTableRow>
<ArgTableRow arg="key-val" typ="string" mandatory="1">The shared secret. Not included in `export` output.</ArgTableRow>
</ArgTable>
