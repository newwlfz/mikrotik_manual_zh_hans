---
sidebar_key: "network-management/cloud/file-share"
sidebar_position: 4
title: "文件共享"
sidebar_label: "文件共享"
description: "File Share 通过 HTTPS 借助秘密链接提供路由器存储中的目录或单个文件，使用 Let's Encrypt 证书和 routingthecloud.net 名称，可直接提供或通过 MikroTik 中继提供，并可选支持上传。"
tags:
  - 'file-sharing'
  - 'https'
  - 'cloud'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/file-share
captured_at: '2026-11-04T11:21:03+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

File Share 通过一个链接把路由器存储（例如 USB 驱动器）上的目录或单个文件发布到互联网上。路由器通过 HTTPS 在 `https://<serial>.routingthecloud.net/s/<key>` 上提供每个共享，其中 `<serial>` 是路由器的序列号，`<key>` 是该共享的随机密钥。路由器会自动为该名称获取 Let's Encrypt 证书。当无法从互联网直接访问路由器时，连接会经由 MikroTik 中继服务器（参见[路由器如何连接到云](./index.md#how-the-router-reaches-the-cloud)）。访问者只需要该链接，并且你还可以允许他们上传文件。

## 共享目录或文件 {#share-a-directory-or-file}

用 `/file/print` 找到目录或文件的路径，然后添加共享。第一个共享会让路由器申请其证书，在证书就绪之前该共享会显示 `I` 标志，通常在一分钟内完成：

```ros
[admin@MikroTik] > /ip/cloud/back-to-home-file/add path=usb1/photos expires=never
[admin@MikroTik] > /ip/cloud/back-to-home-file/print detail
Flags: I - INVALID
0 I ;;; getting cert status: requesting SSL certificate
    path=/usb1/photos allow-uploads=no expires=never
    key="Ab3dE5gH7jK9mNp"
    url="https://hf1234abcd5.routingthecloud.net/s/Ab3dE5gH7jK9mNp"
    direct-url="https://hf1234abcd5.routingthecloud.net/s/Ab3dE5gH7jK9mNp?dl"
    downloads=0
```

当 `I` 标志消失后，把 `url` 发送给应当获取这些文件的人。任何拥有该链接的人都能打开共享，因此请对链接保密，并为只需临时使用的共享设置 `expires`。

- 目录共享会打开一个列出该目录中文件的页面。访问者可以下载单个文件或整个目录。`direct-url`（带 `?dl` 的 `url`）会把整个目录下载为 `download.zip`。
- 文件共享会打开该文件的页面。其 `direct-url` 会下载文件本身。

共享页面的标题会显示路由器的标识（`/system/identity`），页面数据中还包含路由器的板卡型号。

`expires` 接受 `never`、诸如 `"2026-10-01 00:00:00"` 的日期时间，或诸如 `1h`、`7d` 的时间间隔。路由器会把间隔转换为共享过期的日期。`downloads` 统计该共享的直接下载次数。打开页面不计入其中。

若要临时停止某个共享而不删除它，可将其禁用。在你重新启用该共享之前，其链接会返回 HTTP 404：

```ros
/ip/cloud/back-to-home-file/disable 0
```

## 允许上传 {#allow-uploads}

使用 `allow-uploads=yes` 时，目录共享的访问者可以向该目录上传文件并在其中创建文件夹。不设置它时，路由器以 HTTP 403 拒绝上传。文件共享不提供上传功能。

```ros
/ip/cloud/back-to-home-file/add path=usb1/inbox expires=7d allow-uploads=yes
```

上传的文件会占用路由器的存储空间，因此只对你信任的人、并且只在你需要的时间内允许上传。

## WinBox {#winbox}

要在 WinBox 中共享文件，请打开 **IP** > **Cloud**，并在 **Configuration** 下选择 **Back To Home（远程回家） Files**。

![WinBox IP Cloud window with Back To Home Files under Configuration](/img/20ecb78186cbd59e.webp)

选择 **New**，设置 **Path** 和 **Expires**，并选择 **Allow Uploads** 以允许访问者上传文件。

![WinBox Back To Home Files list and the form for a new file share](/img/8925fa4f0ef06036.webp)

共享目录会在访问者的网页浏览器中打开：

![Shared directory in a web browser with the Upload files and Download all buttons](/img/a6882989aec31383.webp)

## 停止 File Share {#stop-file-share}

只要至少存在一个共享，File Share 就会运行。当你删除最后一个共享时，服务会停止，中继也不再向路由器转发连接：

```ros
/ip/cloud/back-to-home-file/remove [find]
```

证书会保留在路由器上，因此下一个共享无需重新申请即可启动。若要同时删除证书，请在删除所有共享后运行 `remove-certificate`。当存在共享时，该命令会失败并提示 `cannot remove certificate while file shares active`。之后下一个共享会申请新证书。

```ros
/ip/cloud/back-to-home-file/settings/remove-certificate
```

## 技术细节 {#technical-details}

### File Share 的工作方式 {#how-file-share-works}

当你添加第一个共享时，路由器会创建私钥，并使用 ACME 协议为 `<serial>.routingthecloud.net` 申请 Let's Encrypt 证书。它通过 MikroTik 云完成 DNS-01 验证，因此无需为此开放端口，在 NAT 后也是如此。`/ip/cloud/back-to-home-file/settings` 中的 `status` 会显示各个步骤，从 `getting cert status: requesting SSL certificate` 到 `requesting validation`、`requesting authorization` 和 `requesting order finalization`，直至 `running`。私钥保留在路由器上，因此访问者的 TLS 连接终结于路由器，经中继时也是如此。

路由器会请求中继服务器测试是否可以从互联网直接访问路由器。当无法直接访问时（例如在 NAT 之后），路由器会保持与中继的连接，该名称会解析到中继。中继会把访问者的加密连接转发给路由器，而路由器不会在自己的地址上监听 TCP 端口 443。当其他服务（例如 `www-ssl`，即通过 HTTPS 访问 WebFig）已占用路由器上的 TCP 端口 443 时，File Share 也会使用中继。`/ip/cloud/back-to-home-file/settings` 中的 `relay-ipv4-status` 和 `relay-ipv6-status` 显示与中继的连接状态。

具有 `file-access` 的 [Back To Home](./back-to-home.md) 用户使用同一服务。添加这类用户同样会让路由器申请证书。

### 路由器上会发生哪些变化 {#what-changes-on-the-router}

- 共享的文件和目录在 `/file/print` 中显示 `S`（shared）标志；`/file/print where shared` 会列出它们。
- 证书以 `fileshare-<serial>.routingthecloud.net` 的名称存储在 `/certificate` 中。它由 ACME 客户端管理，路由器会安排其续期；`certificate,info` 日志会显示其创建、导入的时间以及下次更新的时间。
- 删除最后一个共享后，`/ip/cloud/back-to-home-file/settings` 中的 `enabled` 为 `no`，但 `dns-name` 仍保留在设置中。

有关所有属性，请参阅 CLI 参考中的 [`/ip/cloud/back-to-home-file`](../../cli-reference/ip/cloud/back-to-home-file/index.md) 和 [`/ip/cloud/back-to-home-file/settings`](../../cli-reference/ip/cloud/back-to-home-file/settings/index.md)。
