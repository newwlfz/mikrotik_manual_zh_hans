---
sidebar_key: "cli-reference/cmr/alert/show-devices"
sidebar_position: 1
title: "show-devices"
sidebar_label: 'show-devices'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/alert/show-devices
captured_at: '2026-11-09T11:35:47.715Z'
pagination_prev: "cli-reference/cmr/alert"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/alert/show-devices {#cmralertshow-devices}
**软件包：** cmr
**类型：** 命令

列出状态警报规则的状态警报处于活动状态的设备，并为每个设备提供状态标志（参见以下标志）。事件警报从不保持活动状态，因此它们不会列出任何设备。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="p" typ="remote-pending">控制器请求配对。</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">设备处于非活动状态。</ArgTableRow>
<ArgTableRow arg="S" typ="stale">无连接（陈旧）。</ArgTableRow>
<ArgTableRow arg="L" typ="controller">CMR 服务器本身（自身客户端）。</ArgTableRow>
<ArgTableRow arg="C" typ="connected">设备已连接。</ArgTableRow>
<ArgTableRow arg="U" typ="upgrade-available">有可用的较新更新。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="on-only" typ="bool">仅显示告警规则处于活动状态的设备。</ArgTableRow>
</ArgTable>
