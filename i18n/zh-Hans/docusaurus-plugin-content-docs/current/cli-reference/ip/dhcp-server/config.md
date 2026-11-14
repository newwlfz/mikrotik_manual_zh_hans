---
sidebar_key: "cli-reference/ip/dhcp-server/config"
sidebar_position: 2
title: "config"
sidebar_label: 'config'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/config
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/config {#ipdhcp-serverconfig}
**类型：** 设置目录

所有 DHCP 服务器共享的设置：租约保存的频率以及 RADIUS 计费。有关详细信息，请参阅 [DHCP 服务器](../../../network-management/dhcp/server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="store-leases-disk" typ="alt { symbolic-names: enum (immediately | never) { immediately:0, never:0xffffffff }
, time-interval: time
 }">租约保存到磁盘的频率：时间间隔、`immediately` 或 `never`。降低保存频率可减少对闪存的写入。默认值：5m。</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">是否为使用 RADIUS（`use-radius`）的服务器的租约发送 RADIUS 计费。默认值：yes。</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">RADIUS 临时计费更新间隔。默认值：0s。</ArgTableRow>
<ArgTableRow arg="radius-password" typ="alt { user: enum (empty | same-as-user)
, password: string
 }">在 RADIUS Access-Request 消息中发送的密码：`empty`、`same-as-user`（用户名，即客户端的 MAC 地址）或固定密码。默认值：empty。</ArgTableRow>
</ArgTable>
