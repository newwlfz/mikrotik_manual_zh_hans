---
sidebar_key: "cli-reference/app/settings"
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/app/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/settings {#appsettings}
**系统能力：** app
**软件包：** container
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disk" typ="enum (none)">用于应用镜像、数据和下载的磁盘。由设置向导设置。默认值：none。</ArgTableRow>
<ArgTableRow arg="router-ip" typ="ipAddr">客户端访问路由器所使用的 IP 地址。应用会在生成的 URL 和端口转发规则中使用它。默认值：none。在未配置该项的情况下启用的应用会以 `status=waiting for router ip to be configured` 状态等待。</ArgTableRow>
<ArgTableRow arg="lan-bridge" typ="iface_enum { none }">用作 LAN 的网桥。默认网络为 `lan` 的应用会将其 VETH 接口接入该网桥。默认值：none。</ArgTableRow>
<ArgTableRow arg="media-path" typ="file">用于存放应用媒体文件的目录。默认值：none；RouterOS 使用 `assumed-media-path`。</ArgTableRow>
<ArgTableRow arg="download-path" typ="file">用于存放已下载应用内容的目录。默认值：none；RouterOS 使用 `assumed-download-path`。</ArgTableRow>
<ArgTableRow arg="show-in-webfig" typ="bool">WebFig 是否在登录页面上显示指向已启用应用的链接。默认值：yes。</ArgTableRow>
<ArgTableRow arg="auto-update" typ="bool">已安装应用的默认自动更新设置。每个应用都可以通过自身的 `auto-update` 属性覆盖它。默认值：no。</ArgTableRow>
<ArgTableRow arg="registry-mirrors" typ="multi { array-id, array-id, src-and-dst: composite { src: string
, dst: string
 }
 }">以 `source:destination` 形式表示的注册表镜像映射，例如 `*:mirror.example.com` 表示为所有注册表使用同一个镜像。默认值：none。</ArgTableRow>
<ArgTableRow arg="app-store-urls" typ="multi { array-id, app-store-url: string
 }">自定义 app 商店的 URL。每个 URL 必须返回一个 YAML 应用定义数组。默认值：none.</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="assumed-router-ip" typ="ipAddr">自动检测到的路由器 IP 地址（如果可用）。</ArgTableRow>
<ArgTableRow arg="assumed-lan-bridge" typ="iface_enum { none }">自动检测到的 LAN 网桥（如果可用）。</ArgTableRow>
<ArgTableRow arg="assumed-media-path" typ="file">所选 app 磁盘上的默认媒体目录。</ArgTableRow>
<ArgTableRow arg="assumed-download-path" typ="file">媒体目录内的默认下载目录。</ArgTableRow>
<ArgTableRow arg="certificate-status" typ="string">用于 app HTTPS URL 的证书状态。`ok` 表示该证书可用。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)">用于 app HTTPS URL 的证书名称。</ArgTableRow>
</ArgTable>
