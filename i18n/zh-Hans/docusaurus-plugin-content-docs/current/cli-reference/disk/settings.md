---
sidebar_key: "cli-reference/disk/settings"
sidebar_position: 14
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/disk/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/settings {#disksettings}
**条件：** !smips
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="default-mount-point-template" typ="string">新磁盘和分区在添加时用来代替其自身 `mount-point-template` 的挂载点模板。模板变量与磁盘项上的相同（`[slot]`、`[model]`、`[serial]`、`[fw-version]`、`[fs-label]`、`[fs-uuid]`、`[fs]`）。默认值：[slot]。</ArgTableRow>
<ArgTableRow arg="auto-smb-sharing" typ="bool">新磁盘或分区是否会自动获得 SMB 共享（参见 SMB 页面）。之后格式化创建的新项也会获得该共享，新的 `tmpfs` 文件夹同样如此。某些路由器（例如 hAP ax²）的默认配置会将其设置为 `yes`，因此新磁盘和文件夹会在 LAN 上共享。默认值：no。</ArgTableRow>
<ArgTableRow arg="auto-smb-user" typ="enum">由 `auto-smb-sharing=yes` 创建的自动 SMB 共享的默认用户。默认值：guest。</ArgTableRow>
<ArgTableRow arg="auto-media-sharing" typ="bool">新磁盘或分区（包括新的 `tmpfs` 文件夹）是否会自动添加到 DLNA 媒体服务器（`/ip/media`）。某些路由器（例如 hAP ax²）的默认配置会将其设置为 `yes`。默认值：no。</ArgTableRow>
<ArgTableRow arg="auto-media-interface" typ="iface_enum { none }">当 `auto-media-sharing=yes` 时，为新磁盘创建的动态 `/ip/media` 条目中使用的接口。某些路由器（例如 hAP ax²）的默认配置会将其设置为 `bridge`。默认值：none.</ArgTableRow>
</ArgTable>
