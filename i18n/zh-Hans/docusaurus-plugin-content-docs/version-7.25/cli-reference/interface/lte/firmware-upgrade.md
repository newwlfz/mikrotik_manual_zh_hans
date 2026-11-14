---
sidebar_key: "cli-reference/interface/lte/firmware-upgrade"
sidebar_position: 5
title: "firmware-upgrade"
sidebar_label: 'firmware-upgrade'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/lte/firmware-upgrade
captured_at: '2026-11-01T21:22:49+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/lte/firmware-upgrade {#interfaceltefirmware-upgrade}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="upgrade" typ="bool">执行升级或仅检查</ArgTableRow>
<ArgTableRow arg="firmware-file" typ="file">升级镜像的路径或 URL</ArgTableRow>
<ArgTableRow arg="update-channel" typ="enum (stable | testing)">固件更新通道</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="installed" typ="string"></ArgTableRow>
<ArgTableRow arg="latest" typ="string"></ArgTableRow>
<ArgTableRow arg="note" typ="string"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
</ArgTable>
