---
sidebar_key: "cli-reference/cmr/push-button"
sidebar_position: 5
title: "push-button"
sidebar_label: 'push-button'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/push-button
captured_at: '2026-11-09T11:35:47.715Z'
pagination_next: "cli-reference/cmr/upgrade"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/push-button {#cmrpush-button}
**类型：** Command

使用此命令，可以通过服务器设备上的物理 routerboard/reset 按钮来完成设备配对。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="multi { array-id, interface: iface_enum
 }" unset="1">选择要在其上搜索 CMR 客户端的接口或接口列表。默认值：all.</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state" typ="string">设备配对的状态。</ArgTableRow>
<ArgTableRow arg="error" typ="string" unset="1">错误信息，用于配对不成功的情况。</ArgTableRow>
<ArgTableRow arg="peer" typ="multi { array-id, mac: macAddr
 }" unset="1">对端地址。</ArgTableRow>
<ArgTableRow arg="peer-id" typ="string" unset="1">对端 ID。</ArgTableRow>
</ArgTable>
