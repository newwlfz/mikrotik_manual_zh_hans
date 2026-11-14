---
sidebar_key: "network-management/cloud/back-to-home"
sidebar_position: 1
title: "Back To Home（远程回家）"
sidebar_label: "Back To Home"
description: "Back To Home 可将 RouterOS 设备变为可从任何位置访问的 WireGuard VPN 服务器，即使位于 NAT 之后也可通过 MikroTik 中继访问。使用手机应用进行设置，与他人和计算机共享隧道，或在 RouterOS 中管理用户。"
tags:
  - 'cloud'
  - 'back-to-home'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/back-to-home
captured_at: '2026-11-04T11:25:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
Back To Home 可在搭载 ARM、ARM64 或 TILE CPU 的设备上运行，需要 RouterOS 7.12 及更高版本。
:::

Back To Home 会把路由器变成 WireGuard VPN 服务器，让你可以从任何地方访问它，即使路由器没有公网 IP 地址或位于 NAT 之后。你可以使用 Back To Home 应用（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)、[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)）进行设置，该应用还可以与其他人和计算机共享访问权限。

当路由器有公网 IP 地址时，手机直接连接到它。否则，连接会经由 MikroTik 中继服务器。这两种情况下连接都是端到端加密的，中继无法读取流量（参见[路由器如何连接到云](./index.md#how-the-router-reaches-the-cloud)）。通过中继时，速度可能较低。你的流量会从你的路由器发往互联网，因此网站看到的是你的家庭地址。

Back To Home 旨在实现对家庭网络的简单访问，而不是用于匿名。若要对 VPN 访问进行更精细的控制，请自行配置 [WireGuard](../../virtual-private-networks/wireguard.md)。

## 使用应用设置 Back To Home {#set-up-back-to-home-with-the-app}

你需要一部安装了 Back To Home 应用的手机，并连接到路由器的本地网络，例如其 Wi-Fi。

1. 将手机连接到路由器的 Wi-Fi 网络。
2. 打开 Back To Home 应用。
3. 选择 **Create new**。
4. 输入路由器的本地 IP 地址（默认配置中为 `192.168.88.1`）、路由器的用户名和密码，然后选择 **Connect**。
5. 输入隧道的名称，然后选择 **Create tunnel**。
6. 允许手机添加 VPN 配置。

隧道已就绪。断开与路由器 Wi-Fi 的连接，然后在应用中选择 **Connect**，即可从任何其他网络（例如移动数据）打开隧道。

| ![Back To Home 应用起始界面，带有 Create new 按钮](/img/6264d45373704811.webp) | ![Create tunnel 界面，包含路由器地址、用户名和密码字段](/img/006392895dc00a62.webp) | ![应用已连接到路由器，并询问隧道名称](/img/f410b5c8e4fbc964.webp) | ![手机请求允许添加 VPN 配置](/img/aa81c2e520c6ef66.webp) | ![错误消息：此设备不支持 Back To Home](/img/8e9ea14b99f4ed8b.webp) |
| :-- | :-- | :-- | :-- | :-- |
| 选择 **Create new** | 输入路由器地址和凭据 | 为隧道命名 | 允许 VPN 配置 | 不支持 Back To Home 的设备上出现错误 |

## 与他人共享隧道 {#share-the-tunnel-with-other-people}

你可以为朋友和家人创建带到期日期的访客隧道。对于每个访客隧道，你可以选择对方是能访问你的家庭网络，还是只能通过你的路由器使用互联网。对方需要安装 Back To Home 应用。

1. 连接到自己的隧道。
2. 在隧道旁选择 **...**，然后选择 **Manage shares**。
3. 输入路由器的用户名和密码。应用会更改路由器配置。
4. 选择 **Create**。
5. 输入访客隧道的名称，例如对方的姓名。
6. 设置到期日期。
7. 如果对方应能访问你的本地网络，请打开 **Home network access**。如果仅用于互联网访问，请保持关闭。
8. 选择 **Create tunnel**。手机的分享面板会打开。
9. 发送邀请链接，例如通过聊天应用发送。

当对方打开链接时，Back To Home 应用会打开并添加隧道，或先请对方安装应用。若要当面邀请某人，请在共享项旁选择 **...**，然后选择 **View QR invite**。

| ![隧道菜单，包含 Edit 和 Manage shares 项](/img/5fce1b68f8bd3617.webp) | ![Manage shares 请求输入路由器用户名和密码](/img/0a9d02f5b8733988.webp) | ![共享管理器，尚无共享隧道](/img/17067b05d75b75d9.webp) | ![共享表单，包含隧道名称、到期日期和家庭网络访问](/img/b5756e5046aba347.webp) | ![用于 Back To Home 邀请链接的手机分享面板](/img/affcadf2f50e7495.webp) | ![邀请链接已粘贴到聊天应用中](/img/4e48e6aaec7f79a0.webp) |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| 选择 **Manage shares** | 输入路由器凭据 | 选择 **Create** | 为共享命名并设置其访问权限 | 分享面板打开 | 发送邀请链接 |

## 使用 WireGuard 应用连接计算机 {#connect-a-computer-with-the-wireguard-app}

Back To Home 应用仅适用于手机。在计算机上，请使用 [WireGuard 应用](https://www.wireguard.com/install/) 以及你为自己创建的共享：

1. 按上一节所述为计算机创建共享。
2. 在新共享旁选择 **...**，然后选择 **Share WireGuard config file**。
3. 将文件发送到计算机，例如使用 AirDrop 或作为电子邮件附件发送。
4. 在计算机上的 WireGuard 应用中，选择 **Import Tunnel(s) from File** 并选择该文件。

| ![共享管理器，包含一个共享和 Create 按钮](/img/46d1d2abcf921af8.webp) | ![用于计算机的共享表单，没有到期日期并启用了家庭网络访问](/img/ff48e9c096c9478d.webp) | ![共享管理器，包含两个共享](/img/e68860cd498d3695.webp) | ![共享菜单，包含 Share URL invite、View QR invite 和 Share WireGuard config file 项](/img/667f7d8123a9bebb.webp) | ![用于 WireGuard 配置文件的手机分享面板](/img/194bff3a2acfef27.webp) | ![macOS 上的 WireGuard 应用，包含 Import Tunnel(s) from File 菜单项](/img/96cd7f04a76dc084.webp) |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| 选择 **Create** | 为共享命名并设置其访问权限 | 列表中的新共享 | 选择 **Share WireGuard config file** | 将文件发送到计算机 | 在 WireGuard 应用中导入该文件 |

## 在 RouterOS 中管理 Back To Home {#manage-back-to-home-in-routeros}

使用应用时，你无需在 RouterOS 中配置任何内容。如果不使用应用，例如仅连接一台计算机，请先启用 Back To Home：

```ros
/ip/cloud/set back-to-home-vpn=enabled
```

等待 `/ip/cloud/print` 显示 `vpn-status: running`，这需要几秒钟。在此之前，添加用户会失败并提示 `back-to-home vpn not enabled`。然后添加用户并打印其配置：

```ros
/ip/cloud/back-to-home-user/add name=laptop allow-lan=yes
/ip/cloud/back-to-home-user/show-client-config [find name=laptop]
```

最后一条命令会打印该用户的 WireGuard 配置及其二维码。在设备上的 [WireGuard 应用](https://www.wireguard.com/install/) 中导入它：

```text
 # Name = laptop
 # CloudDDNS = hf1234abcd5.sn.mynetname.net
 [Interface]
 PrivateKey = <private key of the user>
 Address = 192.168.216.3/32, fc00:0:0:216::3/128
 MTU = 1420
 [Peer]
 PublicKey = <vpn-public-key of the router>
 AllowedIPs = 0.0.0.0/0, ::/0
 Endpoint = hf1234abcd5.vpn.mynetname.net:24957
 PersistentKeepalive = 30
 [Peer]
 PublicKey = //////////////////////////////////////////8=
 AllowedIPs = 0.0.0.0/32
 Endpoint = hf1234abcd5.sn.mynetname.net:24957
 PersistentKeepalive = 15
```

第一个 peer 是路由器。第二个 peer 使用占位密钥，不承载流量。

每个用户都是独立的 WireGuard 客户端，拥有自己的密钥和地址：

- `allow-lan=no`（默认值）使用户只能通过路由器访问互联网。设置为 `yes` 时，用户还可以访问你的本地网络。
- `client-allowed-address` 限制客户端通过隧道发送的流量范围，例如 `client-allowed-address=192.168.88.0/24` 表示仅访问本地网络。默认情况下，客户端通过隧道发送所有流量。
- `client-dns` 设置客户端配置中的 DNS 服务器。
- `expires` 可接受 `never`、日期或时间间隔（例如 `7d`）。创建用户后无法更改该值：请改为重新创建用户。

## 关闭 Back To Home {#turn-off-back-to-home}

应用会将隧道添加到手机的 VPN 设置中。要从手机中移除隧道，请在手机的 VPN 设置中将其删除。这不会更改路由器。

要在路由器上关闭 Back To Home：

```ros
/ip/cloud/set back-to-home-vpn=revoked-and-disabled
```

路由器会删除所有 Back To Home 用户并吊销密钥。再次启用 Back To Home 时，路由器会创建新密钥和新端口，因此你需要重新设置每部手机和每台计算机。

## 技术细节 {#technical-details}

### Back To Home 向路由器添加的内容 {#what-back-to-home-adds-to-the-router}

当你通过应用或使用 `/ip/cloud/set back-to-home-vpn=enabled` 启用 Back To Home 时，RouterOS 会添加：

- 一个名为 `back-to-home-vpn` 的 WireGuard 接口，它监听 `/ip/cloud` 中 `vpn-port` 显示的 UDP 端口。
- 该接口上的地址 192.168.216.1/24 和 fc00:0:0:216::1/64。每个客户端会从这些网络中获得接下来的可用地址。
- IPv4 和 IPv6 的动态防火墙规则：一条接受 WireGuard 端口的 input 规则，一条针对来自隧道的流量进行 masquerade 的规则，以及一条丢弃受限用户发往 `LAN` 接口列表的流量的 forward 规则。
- DNS 名称 `<serial number>.vpn.mynetname.net`，客户端将其用作端点。它会解析为路由器的公网地址，或路由器使用的中继。使用默认值 `ddns-enabled=auto` 时，DDNS 也会开启。

IPv6 地址 fc00:0:0:216::1/64 使用 `advertise=yes` 创建。路由器是否在隧道接口上为其发送路由器通告取决于 `/ipv6/nd` 设置。

仅可使用互联网的用户（`allow-lan=no`）位于动态地址列表 `back-to-home-lan-restricted-peers` 中。该限制依赖于默认配置中的 `LAN` 接口列表，因此请将你的本地接口保留在该列表中。

吊销会移除 `back-to-home-vpn` 接口及其 peer、地址和防火墙规则，以及所有用户，并请求云服务器删除 `vpn.mynetname.net` 名称。

### 直连和中继连接 {#direct-and-relayed-connections}

`/ip/cloud` 中的 `vpn-relay-ipv4-status` 和 `vpn-relay-ipv6-status` 显示客户端如何到达路由器。状态为 `reachable directly` 时，`vpn.mynetname.net` 名称会解析为路由器的公网地址，客户端直接连接到路由器本身。状态为 `reachable via relay` 时，该名称会解析为中继，由中继转发加密流量。File Share 会单独决定：它可以使用中继，而 Back To Home 同时直连，例如当 `www-ssl` 使用 TCP 端口 443 时（参见 [文件共享](./file-share.md)）。

Back To Home 应用创建的隧道是 `/ip/cloud/back-to-home-user` 中的用户。应用会将 `name` 设置为手机的型号标识符，例如 `iPhone18,1`，并将 comment 设置为应用中显示的隧道名称。

### 客户端配置 {#client-configuration}

以 `#` 开头的行是注释，因为 WireGuard 配置没有用于隧道名称的字段。`# Name` 携带用户的注释；如果用户没有注释，则携带其名称。Back To Home 应用在导入配置时会将 `# Name` 用作隧道名称。其他 WireGuard 客户端会忽略这些行，因此同一配置可在任何 WireGuard 应用中使用。

客户端配置中的第二个 peer 使用占位密钥和 `AllowedIPs = 0.0.0.0/32`，因此不承载流量。客户端即使没有它也能连接，通过中继时也是如此。

`/ip/cloud` 还在 `vpn-wireguard-client-config` 和 `vpn-wireguard-client-config-qrcode` 中提供内置客户端配置。它一次只能用于一台设备，因为 WireGuard 通过密钥识别客户端。若要用于更多设备，请为每台设备添加一个用户。

### 与云服务器通信 {#contact-with-the-cloud-server}

启用 Back To Home 需要几秒钟，期间路由器会联系云服务器：`vpn-status` 会从 `checking rtt` 变为 `running`。

吊销会立即移除路由器上的所有内容，即使云服务器没有响应（`/ip/cloud` 中的 `status` 显示 `failed to connect`）。此时 `vpn.mynetname.net` 和 `sn.mynetname.net` 名称会保持注册状态，直到云服务器收到删除请求。要删除它们，请在路由器能够访问云服务器时启用 Back To Home，然后再次吊销。

有关所有属性，请参阅 CLI 参考中的 [`/ip/cloud`](../../cli-reference/ip/cloud/index.md) 和 [`/ip/cloud/back-to-home-user`](../../cli-reference/ip/cloud/back-to-home-user/index.md)。
