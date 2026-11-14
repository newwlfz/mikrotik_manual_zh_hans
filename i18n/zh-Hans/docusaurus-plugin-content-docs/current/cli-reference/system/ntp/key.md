---
sidebar_key: "cli-reference/system/ntp/key"
sidebar_position: 2
title: "key"
sidebar_label: 'key'
source: https://manual.mikrotik.com/docs/cli-reference/system/ntp/key
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ntp/key {#systemntpkey}
**类型：** 目录

用于 NTP 身份验证的对称密钥，通过其在 [`/system/ntp/client/servers`](./client/servers.md) 和 [`/system/ntp/server`](./server.md) 中的密钥 ID 进行选择。密钥值属于敏感信息：它不会显示在 `print` 中，也不会保存到 `export` 输出中。请参阅 [NTP](../../../system-information-and-utilities/ntp.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="key-id" typ="num" mandatory="1">密钥标识符，由客户端和服务器配置中的 `auth-key` 引用。</ArgTableRow>
<ArgTableRow arg="key-val" typ="string" mandatory="1">共享密钥。不包含在 `export` 输出中。</ArgTableRow>
</ArgTable>
