---
sidebar_key: "cli-reference/ip/media"
title: "media"
sidebar_label: 'media'
source: https://manual.mikrotik.com/docs/cli-reference/ip/media
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/media {#ipmedia}
**条件：** !smips
**类型：**目录

DLNA 媒体服务器。每个条目会将磁盘文件夹中的媒体文件共享给一个接口上的播放器：它会在该接口上通过 SSDP 宣告自身，并通过 HTTP 在 TCP 端口 2828 上提供这些文件。标记为 `D` 的条目由磁盘媒体共享创建（`/disk` 中的 `media-sharing`，`/disk/settings` 中的 `auto-media-sharing`）。请参阅 [DLNA 媒体服务器](../../../storage/dlna.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用：服务器不运行。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态：由磁盘媒体共享为磁盘或 tmpfs 文件夹创建（`media-sharing` 位于 `/disk`，或 `auto-media-sharing` 位于 `/disk/settings`），名称取自 identity 和磁盘槽位。动态条目无法编辑或移除（`failure: can't edit dynamic object`）；请改为关闭该磁盘的 `media-sharing`。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="path" typ="file">服务器共享其媒体文件的磁盘文件夹，例如 `usb1/media`，或磁盘的根文件夹（`usb1`）。没有 `path` 时，服务器共享路由器的整个文件列表。其子文件夹显示为文件夹。扩展名为小写的视频、音乐和图片文件会被列出；其他文件以及扩展名为大写的文件（例如 `.MP4`）不会。文件夹不存在时，`status` 会显示 `Error, can't find directory`。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">服务器运行的接口。服务器仅在此接口上宣告自身并提供请求。监听器会在所有接口上接受连接，但若针对此服务器的请求从另一接口到达，则会收到 HTTP 404 错误；防火墙会阻止 WAN 访问。</ArgTableRow>
<ArgTableRow arg="friendly-name" typ="string">播放器为服务器显示的名称。默认值：MikroTik Home Media Server。</ArgTableRow>
<ArgTableRow arg="allowed-ip" typ="ipAddr">服务器仅提供服务的唯一 IP 地址。其他设备不会获得内容。只能有一个地址；子网会被拒绝。`0.0.0.0` 允许该接口上的所有设备。不能与 `allowed-hostname` 同时设置。默认值：0.0.0.0。</ArgTableRow>
<ArgTableRow arg="allowed-hostname" typ="string">仅允许此主机名对应的 IP 地址访问内容，该主机名由此路由器的 DHCP 服务器所知（租约的 `host-name`）。匹配为精确匹配且区分大小写。留空允许所有设备。不能与 `allowed-ip` 同时设置（`failure: can't set both allowed IP and allowed hostname`）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">
- `Running` - 服务器运行并提供文件。
- `Error, can't find directory` - `path` 中的文件夹不存在。
</ArgTableRow>
</ArgTable>
