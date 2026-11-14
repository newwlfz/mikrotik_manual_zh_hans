---
sidebar_key: "cli-reference/cmr/device/wifi-logs"
sidebar_position: 7
title: "wifi-logs"
sidebar_label: 'wifi-logs'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/wifi-logs
captured_at: '2026-11-09T11:35:47.715Z'
pagination_next: "cli-reference/cmr/layout"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/wifi-logs {#cmrdevicewifi-logs}
**软件包：** cmr
**类型：** 命令

用于所选设备的 WiFi 日志监视器。按 `c` 切换到客户端视图，按 `l` 返回日志条目。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">使用标签选择要监控的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
<ArgTableRow arg="address" typ="macAddr" unset="1">按客户端 MAC 地址过滤。</ArgTableRow>
<ArgTableRow arg="bssid" typ="macAddr" unset="1">按 BSSID 过滤。</ArgTableRow>
<ArgTableRow arg="time" typ="time" unset="1">按时间过滤。</ArgTableRow>
<ArgTableRow arg="time-start" typ="date" unset="1">过滤此时间之后的日志。</ArgTableRow>
<ArgTableRow arg="time-end" typ="date" unset="1">过滤截至此时间的日志。</ArgTableRow>
<ArgTableRow arg="event" typ="enum (connected | disconnected | failed)" unset="1">按事件过滤：`connected`、`disconnected` 或 `failed`。</ArgTableRow>
</ArgTable>
