---
sidebar_key: "cli-reference/tool/romon/index"
sidebar_position: 2
title: "romon"
sidebar_label: 'romon'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/romon
captured_at: '2026-11-01T21:25:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon {#toolromon}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">禁用或启用 RoMON 功能。</ArgTableRow>
<ArgTableRow arg="id" typ="macAddr">用作此路由器 ID 的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="secrets" typ="multi { array-id, name: string
 }">用于 RoMON 消息哈希的全局密钥列表。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current-id" typ="macAddr">当前正在使用的 RoMON ID，在未设置 `id` 时自动从端口 MAC 地址中选择。</ArgTableRow>
</ArgTable>
