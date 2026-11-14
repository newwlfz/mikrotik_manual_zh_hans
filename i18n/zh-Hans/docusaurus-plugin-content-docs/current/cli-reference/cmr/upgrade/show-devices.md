---
sidebar_key: "cli-reference/cmr/upgrade/show-devices"
sidebar_position: 2
title: "show-devices"
sidebar_label: 'show-devices'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade/show-devices
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade/show-devices {#cmrupgradeshow-devices}
**软件包：** cmr
**类型：** Command

列出所选升级规则覆盖的设备。设备由列表中第一条覆盖它的规则认领，因此当较早的规则覆盖了所有设备时，某条规则可能不列出任何设备。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="p" typ="remote-pending">控制器请求配对。</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">设备处于非活动状态。</ArgTableRow>
<ArgTableRow arg="S" typ="stale">无连接（陈旧）。</ArgTableRow>
<ArgTableRow arg="L" typ="controller">CMR 服务器本身（自身客户端）。</ArgTableRow>
<ArgTableRow arg="C" typ="connected">设备已连接。</ArgTableRow>
<ArgTableRow arg="U" typ="upgrade-available">有可用的较新更新。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="only-upgradable" typ="bool">仅显示实际可升级的设备。</ArgTableRow>
</ArgTable>
