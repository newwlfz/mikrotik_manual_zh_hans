---
title: "文件共享"
description: "文件共享功能通过 HTTPS 共享 USB/NVME 驱动器，并支持可选的文件上传，使用自动生成的域名和证书，在 MikroTik 路由器上提供可通过互联网安全访问的存储。"
tags:
  - 'file-sharing'
  - 'https'
  - 'cloud'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud/file-share
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

文件共享功能允许你使用路由器的外部存储与互联网上的任何人共享文件。只需将 USB、nVME 或任何受支持的驱动器连接到设备，然后将完整目录路径添加到 fileshare 菜单。路由器将使用 MikroTik 云服务为你的路由器签发 HTTPS 证书和域名。随后可分发给任何人的 URL 将显示在 file-share 菜单中。你还可以启用允许任何人上传文件到路由器的功能。该 URL 是随机生成的，因此虽然知道链接的任何人都可以访问它，但只要你妥善保管，只有拥有链接的人才能使用它。

### 添加共享 {#adding-shares}

首先，连接 USB 驱动器，并确定要共享的目录的文件路径：

```shell
[user@RouterOS] > /file/print
 # NAME                                                                           TYPE             SIZE LAST-MODIFIED
 0 web                                                                            directory             2025-01-23 09:29:42
 1 usb1                                                                           disk                  2025-01-22 09:45:57
 2 pub                                                                            directory             2025-01-23 09:24:41
 3 skins                                                                          directory             2024-12-10 08:19:27
 4 pub/index.html                                                                 .html file        670 2025-01-23 09:24:41
 5 skins/default.json                                                             .json file        151 2024-07-15 10:20:11
 6 usb1/Secret Files                                                        	  directory             2024-03-18 09:01:41
 7 usb1/forum                                                                     directory             2025-01-22 10:58:20
 8 usb1/Secret Files/Home Video.srt                 							                .srt file         267 2020-06-01 11:29:14
 9 usb1/Secret Files/Home Video.mp4                 							                .mp4 file   1584.4MiB 2020-06-01 11:34:33
10 usb1/forum/cat.jpeg                                                            .jpeg file  4307.7KiB 2025-01-22 09:38:55
11 usb1/forum/cat1.jpeg                                                           .jpeg file   231.8KiB 2025-01-22 10:58:20
12 usb1/forum/cat2.jpeg                                                           .jpeg file   129.6KiB 2025-01-22 10:58:20
13 usb1/forum/cat3.jpeg                                                           .jpeg file   263.8KiB 2025-01-22 10:58:20
14 usb1/forum/cat4.jpeg                                                           .jpeg file   438.4KiB 2025-01-22 10:58:20
15 web/index.html                                                                 .html file       1473 2025-01-23 09:29:42
```

导航到 `/ip/cloud/back-to-home-file`。共享**目录**时，必须指定**路径**和**到期日期**，也可以授予**上传权限**。共享**文件**时，只需指定**路径**和**到期日期**。

```shell
[user@RouterOS] /ip/cloud/back-to-home-file> add path="usb1/Secret Files/" expires=never allow-uploads=yes
[user@RouterOS] /ip/cloud/back-to-home-file> add path="usb1/Secret Files/Home Video.mp4" expires=never
[user@RouterOS] /ip/cloud/back-to-home-file> print
Columns: PATH, URL, DIRECT-URL, EXPIRES, DOWNLOADS
# PATH                      URL                                                        DIRECT-URL                                                    EXPIRES  DOWNLOADS
0 /usb1/Secret Files  https://acf017skgys.routingthecloud.net/s/4MPgHbEZCZYGVtp  https://acf017skgys.routingthecloud.net/s/4MPgHbEZCZYGVtp?dl        never            5
1 /usb1/Secret Files/Home Video.mp4      https://acf017skgys.routingthecloud.net/s/K8zkh1UjKuqtEQ0  https://acf017skgys.routingthecloud.net/s/K8zkh1UjKuqtEQ0?dl         never            2
[user@RouterOS] /ip/cloud/back-to-home-file>
```

现在，如果复制“URL”，就可以与其他人共享，无论他们位于何处，也无论你的路由器是否具有公网 IP。

当你将 URL 发送给朋友时，他们可以查看共享目录中的所有文件并下载。如果在创建共享时启用了上传，他们还可以上传文件到你的路由器。请妥善保管此 URL，或指定“expires”日期，以避免其他人访问这些文件。

![](/img/6ec257a71bcc9cad.png)

| 属性 | 描述 |
| :-- | :-- |
| **enable**（默认） | 启用 File Share 功能。添加第一个共享时，File Share 服务将被激活。如果没有共享，File Share 服务将保持禁用。 |
| **disabled**（*yes \| no;*默认：**no**） | 禁用 File share 功能。 |
| **allow-uploads**（*yes \| no;*默认：**no**） | 启用允许任何人上传文件到路由器的选项。 |
| **expires**（默认：**never**） | 共享到期日期。格式：ISO 8601（2025-01-25 00:00:00）示例：`/ip/cloud/back-to-home-file/set` 0 expires="2025-01-25 07:15:00" |
| **path** | 设置要共享文件的路径。<br/>示例："/ip/cloud/back-to-home-file/add path=mypath/myfile" |

### WinBox GUI 界面 {#winbox-gui}

要共享文件，请访问 IP → Cloud “Configuration” 部分下的“File Shares”菜单。

![](/img/45b359a8acbe106a.png)

要创建新共享，请设置“Path”“Expires”和“Auto uploads”选项。

![](/img/42deef3f2e945b64.png)

```ros
[admin@MikroTik] > /ip/cloud/back-to-home-file/print detail 
Flags: X - disabled; I - invalid 
 0    path=/mypath/myfile allow-uploads=no expires=2025-01-25 07:15:00 key="*********" 
      url="https://*********.routingthecloud.net/s/*********" direct-url="https://*********.routingthecloud.net/s/*********" 
      downloads=0
```

:::info
安全警告

URL 是随机生成的，因此任何知道链接的人都可以访问它；如果妥善保管链接，则只有拥有该链接的人才能使用它。
:::

File Share 使用 HTTPS（TCP 端口 443），但如果手动将 WebFig 配置为也使用 HTTPS，则 File Share 将自动仅通过我们的云中继服务工作，因为一台设备中不能有两个服务使用同一端口。默认情况下 www-ssl 未启用，因此 File Share 默认直接工作，下载时不使用中继。启用文件共享不会以任何方式影响 WebFig 配置，也不会将其开放给互联网。

对于 File Share 功能，当用户要与他人共享文件时，如果路由器可从互联网直接访问（由 Relay 服务器检查），操作顺序如下：

- 路由器在本地生成私钥和证书。
- 证书签名在路由器上使用标准 ACME 协议执行（使用 DNS-01 challenge 和 LetsEncrypt 后端）。
- DNS-01 challenge 通过临时添加 DNS TXT 记录发送到 MikroTik cloud DNS 服务器（标准流程）。
- DNS 名称解析到路由器。
- 使用私有证书打开安全的 443 端口。

### 中继服务 {#relay-service}

如果设备无法从互联网直接访问，它将选择使用 MikroTik 托管的 Relay 服务。

- 路由器检查其从 Internet 的可达性。
- 如果需要中继连接，则 DNS 会更新为中继 IP。
- 路由器根据延迟选择最近的中继。
- 如果路由器使用中继，则与中继保持连接打开状态。yyyyyy.routingthecloud.net 解析为中继。当客户端通过中继建立连接时，会解析 TLS Client Hello 以获取目标路由器，并将整个 HTTPS 请求直接转发到路由器。
- 中继无法解密你的数据，因为包含私钥的证书仅位于路由器上。
