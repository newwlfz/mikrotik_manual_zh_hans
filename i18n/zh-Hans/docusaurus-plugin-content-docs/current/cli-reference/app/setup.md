---
sidebar_key: "cli-reference/app/setup"
sidebar_position: 6
title: "setup"
sidebar_label: 'setup'
source: https://manual.mikrotik.com/docs/cli-reference/app/setup
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/setup {#appsetup}
**系统能力：** app
**软件包：** container
**类型：** 命令

启动交互式设置向导。它会选择应用磁盘、LAN 网桥，以及用于应用 URL 和端口转发的路由器 IP 地址。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="disk" typ="enum (none)">用于安装应用程序的选定存储磁盘</ArgTableRow>
<ArgTableRow arg="lan-bridge" typ="iface_enum { none }">用于容器网络的选定 LAN 网桥接口</ArgTableRow>
<ArgTableRow arg="router-ip-alt" typ="alt { router-ip-enum: enum
, router-ip: ipAddr
 }">用于手动覆盖 RouterOS 设备的 IP 地址</ArgTableRow>
</ArgTable>
