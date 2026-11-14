---
sidebar_key: "cli-reference/app/settings/index"
sidebar_position: 5
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/7.24/cli-reference/app/settings
captured_at: '2026-11-01T21:26:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/settings {#appsettings}
**系统能力：** app
**软件包：** container
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disk" typ="enum (none)">全局设置，指定用于存储操作的磁盘</ArgTableRow>
<ArgTableRow arg="router-ip" typ="ipAddr">手动指定当前 RouterOS 设备可被访问到的 IP 地址</ArgTableRow>
<ArgTableRow arg="lan-bridge" typ="iface_enum { none }">手动指定代表局域网（LAN）的桥接接口</ArgTableRow>
<ArgTableRow arg="media-path" typ="file">手动指定存放所有媒体文件的目录路径</ArgTableRow>
<ArgTableRow arg="download-path" typ="file">手动指定存放所有已下载内容的目录路径</ArgTableRow>
<ArgTableRow arg="show-in-webfig" typ="bool">控制是否在 WebFig 登录页面上显示已启用应用的链接</ArgTableRow>
<ArgTableRow arg="auto-update" typ="bool">全局设置，为所有已安装的应用包启用自动更新</ArgTableRow>
<ArgTableRow arg="registry-mirrors" typ="multi { array-id, array-id, src-and-dst: composite { src: string
, dst: string
 }
 }">指定一个或多个用于拉取容器镜像的 registry 镜像 URL</ArgTableRow>
<ArgTableRow arg="app-store-urls" typ="multi { array-id, app-store-url: string
 }">自定义应用商店的 URL。必须指向一个 YAML 数组，其中每个应用为一个元素</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="assumed-router-ip" typ="ipAddr">自动检测到的 RouterOS 设备网络 IP 地址</ArgTableRow>
<ArgTableRow arg="assumed-lan-bridge" typ="iface_enum { none }">自动检测到的用于 LAN 连接的桥接接口</ArgTableRow>
<ArgTableRow arg="assumed-media-path" typ="file">默认媒体存储路径，通常位于系统磁盘上</ArgTableRow>
<ArgTableRow arg="assumed-download-path" typ="file">默认下载目录路径，通常位于媒体存储区域内</ArgTableRow>
<ArgTableRow arg="certificate-status" typ="string"></ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)"></ArgTableRow>
</ArgTable>
