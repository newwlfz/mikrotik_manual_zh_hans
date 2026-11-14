---
sidebar_key: "cli-reference/app/setup"
sidebar_position: 6
title: "setup"
sidebar_label: "setup"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/app/setup
captured_at: '2026-11-01T21:26:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/setup {#appsetup}
**系统能力：** app
**软件包：** container
**类型：** 命令

启动安装向导，该向导可为 App 系统自动完成网络、存储和注册表配置。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="disk" typ="enum (none)">用于安装应用程序的选定存储磁盘</ArgTableRow>
<ArgTableRow arg="lan-bridge" typ="iface_enum { none }">用于容器网络的选定 LAN 网桥接口</ArgTableRow>
<ArgTableRow arg="router-ip-alt" typ="alt { router-ip-enum: enum
, router-ip: ipAddr
 }">用于手动覆盖 RouterOS 设备的 IP 地址</ArgTableRow>
</ArgTable>
