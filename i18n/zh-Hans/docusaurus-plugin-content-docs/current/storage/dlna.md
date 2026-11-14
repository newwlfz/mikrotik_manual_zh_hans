---
sidebar_key: "storage/dlna"
sidebar_position: 2
title: "DLNA 媒体服务器"
sidebar_label: "DLNA 媒体服务器"
description: "DLNA 媒体服务器通过一个接口，将磁盘文件夹中的视频、音乐和图片文件共享给电视、手机和播放器。它涵盖将服务器限制到单个设备、磁盘共享所创建的服务器，以及播放器如何找到该服务器。"
tags:
  - 'dlna'
  - 'media-server'
  - 'upnp'
source: https://manual.mikrotik.com/docs/storage/dlna
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

DLNA（Digital Living Network Alliance，数字生活网络联盟）是一组网络协议，设备用它来共享视频、照片和音乐等数字媒体。DLNA 构建在 UPnP（Universal Plug and Play，通用即插即用）之上，后者为设备提供发现和控制能力：设备通过 SSDP（Simple Service Discovery Protocol，简单服务发现协议）相互发现，通过 SOAP（Simple Object Access Protocol，简单对象访问协议）交换控制消息，并用 XML 描述自身及其服务。

RouterOS 媒体服务器把磁盘上某个文件夹中的媒体文件共享给电视、手机和 VLC 等播放器应用，该磁盘可以是 USB 磁盘、其他磁盘或 [tmpfs](./tmpfs.md) 文件夹。每个服务器运行在一个接口上。该接口上的播放器按名称找到服务器，并播放路由器上的文件。路由器按原样提供文件，不做转换，因此播放器必须支持该文件格式。

:::info
媒体服务器在 SMIPS 设备上不可用，这类小型 MIPS 设备在 `/system/resource/print` 中的 `architecture-name` 为 `smips`。
:::

## 与局域网中的电视共享 USB 磁盘 {#share-a-usb-disk-with-the-tvs-on-the-lan}

为 LAN 网桥上 USB 磁盘的 `media` 文件夹添加一个服务器：

```ros
/ip/media/add friendly-name="Office media" interface=bridge \
    path=usb1/media
```

```ros
[admin@MikroTik] > /ip/media/print
Columns: INTERFACE, FRIENDLY-NAME, PATH, ALLOWED-IP, STATUS
# INTERFACE  FRIENDLY-NAME  PATH        ALLOWED-IP  STATUS
0 bridge     Office media   usb1/media  0.0.0.0     Running
```

局域网中的播放器会把该服务器列为 `Office media`。作为网桥端口的 Wi-Fi 接口上的设备也位于 `bridge` 上。`usb1/media` 下的文件夹会显示为文件夹。

`path` 也可以是磁盘的根文件夹，例如 `path=usb1`。务必设置 `path`：没有设置它的服务器会共享路由器的整个文件列表，包括所有磁盘和文件夹。

服务器会列出视频、音乐和图片文件，例如 `.mp4`、`.mkv`、`.mp3`、`.flac` 和 `.jpg` 文件；其他文件（例如 `.txt` 文件）不会被列出。它只通过小写扩展名识别媒体文件，因此请重命名扩展名为大写的文件（例如相机常写出的 `.MP4` 或 `.JPG`）。与视频同名的 `.srt` 文件（例如与 `holiday.mp4` 同目录的 `holiday.srt`）会作为该视频的字幕一并提供。之后复制到该文件夹的文件会在播放器下次打开该文件夹时出现。

## 将服务器限制为单个设备 {#limit-a-server-to-one-device}

在启用了自动媒体共享的路由器上（例如 hAP ax² 的默认配置），磁盘已经有一个动态服务器，网桥上的每台设备都可以使用它（在关于为磁盘自动创建的服务器一节中描述）。动态服务器无法修改（`failure: can't edit dynamic object`），因此在添加受限服务器之前先将其关闭：

```ros
/disk/set usb1 media-sharing=no
```

默认情况下，接口上的每台设备都可以使用服务器。要将服务器限制为单个设备，请设置以下之一：

- `allowed-ip` - 设备的 IP 地址。它只接受一个地址；子网会被拒绝。请为设备分配静态 DHCP 租约，使其地址不会改变（参见 [Leases](../network-management/dhcp/server.md#leases)）。
- `allowed-hostname` - 设备在本路由器 DHCP 服务器上 DHCP 租约的主机名。名称必须完全匹配，包括大小写。

服务器只能采用两者之一：同时设置两者会失败并提示 `failure: can't set both allowed IP and allowed hostname`。服务器会拒绝其他设备，因此它们看不到其文件。

例如，只给儿童房的电视提供儿童影片，给客厅的电视提供其余影片。每台电视都有自己的服务器：

```ros
/ip/media/add friendly-name=adults interface=bridge \
    path=usb1/media/adults allowed-hostname=Living-Room-TV
/ip/media/add friendly-name=kids interface=bridge \
    path=usb1/media/kids allowed-hostname=Kids-Room-TV
```

```ros
[admin@MikroTik] > /ip/media/print
Columns: INTERFACE, FRIENDLY-NAME, PATH, ALLOWED-IP, ALLOWED-HOSTNAME, STATUS
# INTERFACE  FRIENDLY-NAME  PATH               ALLOWED-IP  ALLOWED-HOSTNAME  STATUS
0 bridge     adults         usb1/media/adults  0.0.0.0     Living-Room-TV    Running
1 bridge     kids           usb1/media/kids    0.0.0.0     Kids-Room-TV      Running
```

要查找设备的主机名，请查看其租约的 `HOST-NAME` 列：

```ros
/ip/dhcp-server/lease/print
```

在 DHCP 请求中不发送主机名的设备，其 `HOST-NAME` 为空，无法匹配 `allowed-hostname`。请改用 `allowed-ip` 和静态租约来限制这类设备。

:::note
`allowed-ip` 和 `allowed-hostname` 不是访问控制。它们只检查请求的源地址或设备在 DHCP 中发送的主机名。服务器不要求密码，文件通过明文 HTTP 传输，因此网络上的任何设备都可以冒用另一台设备的地址或主机名。若要阻止某些设备获取文件，请将它们放在具有独立服务器的单独网络中，或通过带用户和密码的 [SMB](./smb.md) 共享。
:::

## 为磁盘自动创建的服务器 {#servers-created-for-disks-automatically}

RouterOS 也会自行添加媒体服务器：

- 对于在 `/disk` 中设置了 `media-sharing=yes` 的磁盘。
- 当 `/disk/settings` 中 `auto-media-sharing=yes` 时，对于每个新磁盘和 [tmpfs](./tmpfs.md#check-what-the-folder-shares) 文件夹。例如，hAP ax² 的默认配置会设置 `auto-media-sharing=yes` 和 `auto-media-interface=bridge`。

这样的服务器是 `media-interface`（或 `auto-media-interface`）所指定接口上的动态条目（标志 `D`），名称由路由器标识和磁盘插槽组成，例如 `MikroTik usb1 media`。其 `allowed-ip` 为 `0.0.0.0`，因此该接口上的每台设备都可以读取该磁盘的媒体文件。动态服务器无法编辑或删除。要限制它，请停止该磁盘的媒体共享并添加静态服务器。

要停止某个磁盘的服务器：

```ros
/disk/set usb1 media-sharing=no
```

要停止为之后添加的磁盘自动创建的服务器：

```ros
/disk/settings/set auto-media-sharing=no
```

相同的设置还会通过 SMB 共享磁盘，提供给无需密码的 `guest` 用户（参见 [临时文件系统（Tmpfs）](./tmpfs.md#check-what-the-folder-shares)）。要针对某个磁盘以及之后添加的磁盘停止该行为：

```ros
/disk/set usb1 smb-sharing=no
/disk/settings/set auto-smb-sharing=no
```

## 检查与故障排除 {#check-and-troubleshoot}

首先检查服务器是否存在并正在运行。`/ip/media/print` 在 `STATUS` 中显示每个服务器的状态：

- `Running` - 服务器宣告自身并提供文件。
- `Error, can't find directory` - `path` 中的文件夹不存在。请在 `/file/print` 中检查磁盘插槽和文件夹名称。

服务器运行时，`/ip/service/print` 会显示其在 UDP 端口 1900 和 TCP 端口 2828 上的动态 `upnp` 监听器。要从计算机测试服务器，请使用 VLC 等播放器，它会在本地网络部分列出 UPnP 媒体服务器。

当播放器未列出服务器时：

- 播放器必须位于服务器的 `interface` 上。其他子网或 VLAN 中的播放器无法发现服务器，因为 SSDP 发现消息只在一个网络内传播。请在该接口上添加一个具有相同 `path` 的第二个服务器。
- 路由器的防火墙必须接受来自播放器的 UDP 端口 1900 和 TCP 端口 2828。默认防火墙接受来自 LAN 的所有流量。
- `allowed-ip` 或 `allowed-hostname` 必须与播放器匹配。不匹配的设备什么也看不到。
- 再次打开播放器的服务器列表，或重启播放器，使其重新搜索服务器。

当列表中缺少某个文件时，请检查它是否为扩展名为小写的视频、音乐或图片文件。其他文件不会被列出。

## 技术细节 {#technical-details}

### 发现 {#discovery}

服务器通过向 UPnP 组播组 `239.255.255.250:1900` 发送 SSDP `NOTIFY` 消息来宣告自身，作为具有 `ContentDirectory:1` 和 `ConnectionManager:1` 服务的 `urn:schemas-upnp-org:device:MediaServer:1` 设备。它还会应答播放器为查找服务器而发送的 `M-SEARCH` 请求。消息中带有 `CACHE-CONTROL: max-age=3600` 和服务器描述的地址，例如 `LOCATION: http://192.168.88.1:2828/mediaserver_description-1.xml`。文件名中的数字对每个服务器条目都不同。

### 内容 {#content}

播放器通过 ContentDirectory 服务浏览文件夹，并通过 TCP 端口 2828 以 HTTP 下载文件。每个文件夹是一个容器，每个媒体文件是一个条目，带有其媒体类型，例如 `video/mp4`、`audio/mpeg` 或 `image/jpeg`。字幕文件是其视频的一个额外 `text/srt` 资源。

### 缩略图 {#thumbnails}

`/ip/media/settings` 设置文件夹的封面图片：

```ros
/ip/media/settings/set thumbnails=folder.jpg
```

名为 `folder.jpg` 的文件此后不再作为图片列出，而成为其文件夹中其他文件的封面图片。`thumbnails` 接受以逗号分隔的文件名列表。

### 接口绑定 {#interface-binding}

服务器会处理到达其接口的请求，也包括来自其他子网、其流量经该接口路由到路由器的设备。监听器接受所有接口上的连接，但到达其他接口的服务器请求会得到 HTTP 404 错误，无论使用哪个路由器地址。防火墙负责阻挡 WAN：默认防火墙会丢弃来自 WAN 的输入。

有关所有参数，请参见 [`/ip/media`](../cli-reference/ip/media/index.md) 和 [`/ip/media/settings`](../cli-reference/ip/media/settings.md) 的 CLI 参考。
