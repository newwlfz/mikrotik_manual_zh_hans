---
sidebar_key: "cli-reference/cmr/device/dashboard"
sidebar_position: 2
title: "dashboard"
sidebar_label: 'dashboard'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/dashboard
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/dashboard {#cmrdevicedashboard}
**包：** cmr  
**类型：** 命令

打开所选设备的实时视图：设备、资源、接口、曲线以及 AP/站点数据。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">使用 labels 选择要在仪表板中显示的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
</ArgTable>
