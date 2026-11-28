---
title: "文件共享"
description: "File Share 通过 HTTPS 使用加密链接从路由器存储中提供目录或单个文件，使用 Let's Encrypt 证书和 routingthecloud.net 名称，可直接提供，也可通过 MikroTik 中继提供，并可选择启用上传。"
tags:
  - 'file-sharing'
  - 'https'
  - 'cloud'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/file-share
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "network-management/dhcp"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

File Share 通过链接使路由器存储（例如 USB 驱动器）上的目录或单个文件可在互联网上访问。路由器通过 HTTPS 提供每个共享，地址为 `https://<serial>.routingthecloud.net/s/<key>`，其中 `<serial>` 是路由器的序列号，`<key>` 是共享的随机密钥。路由器会自行获取该名称的 Let's Encrypt 证书。当无法从互联网直接访问路由器时，连接会经过 MikroTik 中继服务器（请参阅 [路由器如何访问云](/docs/network-management/cloud#how-the-router-reaches-the-cloud)）。访问者只需要链接，你也可以允许他们上传文件。

## 共享目录或文件 {#share-a-directory-or-file}

使用 `/file/print` 查找目录或文件的路径，然后添加共享。第一个共享会使路由器请求其证书，在证书准备就绪之前，该共享会显示 `I` 标志，通常在几分钟内：

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

当 `I` 标志消失后，将 `url` 发送给应获取文件的人员。任何拥有链接的人都可以打开该共享，因此请保持链接私密，并为仅需临时使用的共享设置 `expires`。

- 目录共享会打开一个页面，列出目录中的文件。访问者可以下载单个文件或整个目录。`direct-url`（带 `?dl` 的 `url`）会将整个目录下载为 `download.zip`。
- 文件共享会打开该文件的页面。其 `direct-url` 会下载文件本身。

共享页面标题会显示路由器标识（`/system/identity`），页面数据包含路由器主板型号。

`expires` 可取 `never`、日期和时间（例如 `"2026-10-01 00:00:00"`），或时间间隔（例如 `1h` 或 `7d`）。路由器会将时间间隔转换为共享过期日期。`downloads` 统计共享的直接下载次数。打开页面不计入。

要在不删除共享的情况下暂时停止共享，请禁用它。此时其链接会返回 HTTP 404，直到你再次启用该共享：

```ros
/ip/cloud/back-to-home-file/disable 0
```

## 允许上传 {#allow-uploads}

使用 `allow-uploads=yes` 时，目录共享的访问者可以将文件上传到该目录并在其中创建文件夹。未启用时，路由器会以 HTTP 403 拒绝上传。文件共享不提供上传功能。

```ros
/ip/cloud/back-to-home-file/add path=usb1/inbox expires=7d allow-uploads=yes
```

上传的文件使用路由器的存储空间，因此仅允许受信任的人员上传，并且仅在需要期间开放上传。

## WinBox

要在 WinBox 中共享文件，请打开 **IP** > **Cloud**，并在 **Configuration** 下选择 **Back To Home（远程回家） Files**。

![WinBox IP Cloud window with Back To Home Files under Configuration](/img/20ecb78186cbd59e.webp)

选择 **New**，设置 **Path** 和 **Expires**，然后选择 **Allow Uploads**，以允许访问者上传文件。

![WinBox Back To Home Files list and the form for a new file share](/img/8925fa4f0ef06036.webp)

共享目录会在访问者的 Web 浏览器中打开：

![Shared directory in a web browser with the Upload files and Download all buttons](/img/a6882989aec31383.webp)

## 停止文件共享 {#stop-file-share}

只要至少存在一个共享，File Share 就会运行。删除最后一个共享后，服务将停止，中继不再将连接转发到路由器：

```ros
/ip/cloud/back-to-home-file/remove [find]
```

证书会保留在路由器上，因此下一次共享无需新请求。要同时删除证书，请在移除所有共享后运行 `remove-certificate`。当共享仍存在时，命令会失败并返回 `cannot remove certificate while file shares active`。下一次共享将请求新证书。

```ros
/ip/cloud/back-to-home-file/settings/remove-certificate
```

## 技术细节 {#technical-details}

### File Share 的工作原理 {#how-file-share-works}

添加第一个共享时，路由器会创建私钥，并使用 ACME 协议为 `<serial>.routingthecloud.net` 请求 Let's Encrypt 证书。它通过 MikroTik cloud 完成 DNS-01 质询，因此无需开放端口，即使位于 NAT 后也可以完成。`/ip/cloud/back-to-home-file/settings` 中的 `status` 会显示各步骤，从 `getting cert status: requesting SSL certificate` 到 `requesting validation`、`requesting authorization`、`requesting order finalization`，直至 `running`。私钥保留在路由器上，因此访问者的 TLS 连接会终止在路由器上，即使通过中继也是如此。

路由器会请求中继服务器测试是否可以从互联网直接访问路由器。如果无法直接访问，例如位于 NAT 后，路由器会保持与中继的连接，名称会解析到中继。中继将访问者的加密连接转发到路由器，路由器不会在自己的地址上监听 TCP 端口 443。当其他服务（例如 `www-ssl`（基于 HTTPS 的 WebFig））已使用路由器上的 TCP 端口 443 时，File Share 也会使用中继。`/ip/cloud/back-to-home-file/settings` 中的 `relay-ipv4-status` 和 `relay-ipv6-status` 会显示与中继的连接。

使用 `file-access` 的 [Back To Home](/docs/network-management/cloud/back-to-home) 用户会使用同一服务。添加此类用户也会使路由器请求证书。

### 路由器上的变化 {#what-changes-on-the-router}

- 共享文件和目录会在 `/file/print` 中显示 `S`（shared）标志；`/file/print where shared` 会列出它们。
- 证书存储在 `/certificate` 中，名称为 `fileshare-<serial>.routingthecloud.net`。它由 ACME 客户端管理，路由器会安排续期；`certificate,info` 日志会显示证书的创建时间、导入时间以及下次更新时间。
- 删除最后一个共享后，`/ip/cloud/back-to-home-file/settings` 中的 `enabled` 为 `no`，但 `dns-name` 会保留在设置中。

有关所有属性，请参阅 CLI 参考中的 [`/ip/cloud/back-to-home-file`](/docs/cli-reference/ip/cloud/back-to-home-file) 和 [`/ip/cloud/back-to-home-file/settings`](/docs/cli-reference/ip/cloud/back-to-home-file/settings)。
