---
sidebar_key: "cli-reference/cmr/client/push-button"
sidebar_position: 3
title: "push-button"
sidebar_label: 'push-button'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/client/push-button
captured_at: '2026-11-09T11:35:47.715Z'
pagination_next: "cli-reference/cmr/device"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/client/push-button {#cmrclientpush-button}
**类型：** 命令

使用此命令，可以通过客户端设备上的物理 routerboard/reset 按钮完成设备配对。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="multi { array-id, interface: iface_enum
 }" unset="1">选择用于搜索 CMR 服务器的接口或接口列表。（默认值：**all**）</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state" typ="string">设备配对的状态。</ArgTableRow>
<ArgTableRow arg="error" typ="string" unset="1">配对失败时的错误信息。</ArgTableRow>
<ArgTableRow arg="peer" typ="multi { array-id, mac: macAddr
 }" unset="1">CMR 服务器地址。</ArgTableRow>
<ArgTableRow arg="peer-id" typ="string" unset="1">CMR 服务器 ID。</ArgTableRow>
</ArgTable>
