---
title: "Back To Home（远程回家）"
description: "Back To Home 可将 RouterOS 设备转变为可从任意位置访问的 WireGuard VPN 服务器，即使位于 NAT 之后，也可通过 MikroTik 中继访问。使用手机应用完成设置，与其他用户和计算机共享隧道，或在 RouterOS 中管理用户。"
tags:
  - 'cloud'
  - 'back-to-home'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/back-to-home
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "network-management/cloud"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
Back To Home 适用于具有 ARM、ARM64 或 TILE CPU 的设备，需使用 RouterOS 7.12 及更高版本。
:::

Back To Home 会将路由器转变为 WireGuard VPN 服务器，即使路由器没有公网 IP 地址或位于 NAT 之后，也可以从任意位置访问它。使用 Back To Home app 进行设置（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)、[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)），该 app 还可以与其他人员和计算机共享访问权限。

当路由器具有公网 IP 地址时，手机会直接连接到它。否则，连接会通过 MikroTik 中继服务器。两种情况下连接均为端到端加密，中继服务器无法读取流量（请参阅[路由器如何访问云端](/docs/network-management/cloud#how-the-router-reaches-the-cloud)）。通过中继时，速度可能较低。流量从路由器发往互联网，因此网站看到的是家庭地址。

Back To Home 用于对家庭网络进行简单访问，不用于匿名。如需更精细地控制 VPN 访问，请自行配置 [WireGuard](/docs/virtual-private-networks/wireguard)。

## 使用 app 设置 Back To Home {#set-up-back-to-home-with-the-app}

需要一部安装了 Back To Home app 的手机，并连接到路由器的本地网络，例如其 Wi-Fi。

1. 将手机连接到路由器的 Wi-Fi 网络。
2. 打开 Back To Home app。
3. 选择 **Create new**。
4. 输入路由器的本地 IP 地址（默认配置为 `192.168.88.1`）以及路由器的用户名和密码，然后选择 **Connect**。
5. 输入隧道名称，然后选择 **Create tunnel**。
6. 允许手机添加 VPN 配置。

隧道已就绪。断开路由器的 Wi-Fi，然后在 app 中选择 **Connect**，即可从任何其他网络（例如移动数据）打开隧道。

| ![Back To Home app start screen with the Create new button](/img/6264d45373704811.webp) | ![Create tunnel screen with the router address, user name and password fields](/img/006392895dc00a62.webp) | ![App connected to the router and asking for a tunnel name](/img/f410b5c8e4fbc964.webp) | ![Phone asking for permission to add the VPN configuration](/img/94e9738b947cb3f5.webp) | ![Error message saying Back To Home is not supported on this device](/img/8e9ea14b99f4ed8b.webp) |
| :-- | :-- | :-- | :-- | :-- |
| 选择 **Create new** | 输入路由器地址和凭据 | 为隧道命名 | 允许 VPN 配置 | 不支持 Back To Home 的设备上显示错误 |
| 选择 **Manage shares** | 输入路由器凭据 | 选择 **Create** | 为共享命名并设置访问权限 | 打开分享面板 | 发送邀请链接 |

## 与他人共享隧道 {#share-the-tunnel-with-other-people}

你可以为朋友和家人创建带有到期日期的访客隧道。对于每个访客隧道，你可以选择对方是否可以访问你的家庭网络，或者仅通过你的路由器使用互联网。对方需要安装 Back To Home app。

1. 连接到你自己的隧道。
2. 选择隧道旁的 **...**，然后选择 **Manage shares**。
3. 输入路由器的用户名和密码。app 会更改路由器配置。
4. 选择 **Create**。
5. 输入访客隧道的名称，例如对方姓名。
6. 设置到期日期。
7. 如果对方应访问你的本地网络，请启用 **Home network access**。如果仅允许互联网访问，请保持关闭。
8. 选择 **Create tunnel**。手机的分享面板会打开。
9. 发送邀请链接，例如通过聊天 app 发送。

当对方打开链接时，Back To Home app 会打开并添加隧道，或要求他们先安装该 app。若要当面邀请，请选择共享旁的 **...**，然后选择 **View QR invite**。

| ![Tunnel menu with the Edit and Manage shares items](/img/5fce1b68f8bd3617.webp) | ![Manage shares asking for the router user name and password](/img/dfc12b470552db23.webp) | ![Shares manager with no shared tunnels](/img/17067b05d75b75d9.webp) | ![Share form with a tunnel name, an expiration date and home network access](/img/e704286c66e6d80a.webp) | ![Phone share sheet for the Back To Home invite link](/img/0d880c6b7748a1a5.webp) | ![Invite link pasted into a chat app](/img/033a2e958683c724.webp) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 选择 **Manage shares** | 输入路由器凭据 | 选择 **Create** | 为共享命名并设置访问权限 | 打开分享面板 | 发送邀请链接 |

## 使用 WireGuard app 连接计算机 {#connect-a-computer-with-the-wireguard-app}

Back To Home app 仅适用于手机。在计算机上，请使用 [WireGuard app](https://www.wireguard.com/install/) 和一份你为自己创建的共享：

1. 按上一节所述为计算机创建共享。
2. 选择新共享旁边的 **...**，然后选择 **Share WireGuard config file**。
3. 将文件发送到计算机，例如通过 AirDrop 或作为电子邮件附件发送。
4. 在计算机上的 WireGuard 应用中，选择 **Import Tunnel(s) from File** 并选择该文件。

| ![Shares manager with one share and the Create button](/img/21ec3eec4ca50857.webp) | ![Share form for a computer with no expiration date and home network access](/img/ff48e9c096c9478d.webp) | ![Shares manager with two shares](/img/4bcd0e68045654ed.webp) | ![Share menu with the Share URL invite, View QR invite and Share WireGuard config file items](/img/667f7d8123a9bebb.webp) | ![Phone share sheet for the WireGuard configuration file](/img/4dec0d84ce122d79.webp) | ![WireGuard app for macOS with the Import Tunnel(s) from File menu item](/img/96cd7f04a76dc084.webp) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 选择 **Create** | 命名共享并设置其访问权限 | 列表中的新共享 | 选择 **Share WireGuard config file** | 将文件发送到计算机 | 在 WireGuard 应用中导入文件 |

## 在 RouterOS 中管理 Back To Home {#manage-back-to-home-in-routeros}

使用该应用时，无需在 RouterOS 中配置任何内容。如果不使用该应用，例如仅连接一台计算机，请先启用 Back To Home：

```ros
/ip/cloud/set back-to-home-vpn=enabled
```

等待 `/ip/cloud/print` 显示 `vpn-status: running`，这需要几秒钟。在此之前，添加用户会失败，并提示 `back-to-home vpn not enabled`。然后添加用户并打印其配置：

```ros
/ip/cloud/back-to-home-user/add name=laptop allow-lan=yes
/ip/cloud/back-to-home-user/show-client-config [find name=laptop]
```

最后一条命令会打印该用户的 WireGuard 配置及其二维码。将其导入设备上的 [WireGuard app](https://www.wireguard.com/install/)：

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

第一个 peer 是路由器。第二个 peer 带有占位密钥，不承载流量。

每个用户都是独立的 WireGuard 客户端，具有自己的密钥和地址：

- `allow-lan=no`，默认值，仅允许用户通过路由器访问互联网。设置为 `yes` 时，用户还可以访问本地网络。
- `client-allowed-address` 限制客户端通过隧道发送的内容，例如 `client-allowed-address=192.168.88.0/24` 表示仅允许访问本地网络。默认情况下，客户端将所有流量通过隧道发送。
- `client-dns` 在客户端配置中设置 DNS 服务器。
- `expires` 接受 `never`、日期或时间间隔（例如 `7d`）。创建用户后无法更改该值：请重新创建用户。

## 关闭 Back To Home {#turn-off-back-to-home}

该应用会将隧道添加到手机的 VPN 设置中。要从手机中移除隧道，请在手机的 VPN 设置中删除它。此操作不会更改路由器。

要在路由器上关闭 Back To Home：

```ros
/ip/cloud/set back-to-home-vpn=revoked-and-disabled
```

路由器会删除所有 Back To Home 用户并撤销密钥。再次启用 Back To Home 时，路由器会创建新密钥和新端口，因此需要重新设置每台手机和计算机。

## 技术细节 {#technical-details}

### Back To Home 为路由器添加的内容 {#what-back-to-home-adds-to-the-router}

启用 Back To Home 时，可以在应用中启用，也可以使用 `/ip/cloud/set back-to-home-vpn=enabled`，RouterOS 会添加：

- 名为 `back-to-home-vpn` 的 WireGuard 接口，监听 `/ip/cloud` 中 `vpn-port` 显示的 UDP 端口。
- 该接口上的地址 192.168.216.1/24 和 fc00:0:0:216::1/64。每个客户端会从这些网络中获取下一个可用地址。
- IPv4 和 IPv6 的动态防火墙规则：接受 WireGuard 端口的 input 规则，针对来自隧道流量的 masquerade 规则，以及丢弃受限用户发往 `LAN` 接口列表流量的 forward 规则。
- DNS 名称 `<serial number>.vpn.mynetname.net`，客户端将其用作 endpoint。该名称解析为路由器的公网地址，或路由器使用的中继。使用默认值 `ddns-enabled=auto` 时，DDNS 也会启用。

IPv6 地址 fc00:0:0:216::1/64 使用 `advertise=yes` 创建。路由器是否通过隧道接口为其发送路由器通告，取决于 `/ipv6/nd` 设置。

只能使用互联网的用户（`allow-lan=no`）位于动态地址列表 `back-to-home-lan-restricted-peers` 中。该限制依赖默认配置中的 `LAN` 接口列表，因此请将本地接口保留在该列表中。

撤销会删除 `back-to-home-vpn` 接口及其对等体、地址和防火墙规则，以及所有用户，并请求云服务器删除 `vpn.mynetname.net` 名称。

### 直连和中继连接 {#direct-and-relayed-connections}

`/ip/cloud` 中的 `vpn-relay-ipv4-status` 和 `vpn-relay-ipv6-status` 显示客户端如何访问路由器。使用 `reachable directly` 时，`vpn.mynetname.net` 名称解析为路由器的公网地址，客户端直接连接到路由器。使用 `reachable via relay` 时，该名称解析为中继，中继转发加密流量。File Share 会单独决定：即使 Back To Home 直连，它也可能使用中继，例如当 `www-ssl` 使用 TCP 端口 443 时（请参阅 [File Share](/docs/network-management/cloud/file-share)）。

Back To Home app 创建的隧道是 `/ip/cloud/back-to-home-user` 中的用户。app 会将 `name` 设置为手机型号标识符，例如 `iPhone18,1`，并将注释设置为 app 中显示的隧道名称。

### 客户端配置 {#client-configuration}

以 `#` 开头的行是注释，因为 WireGuard 配置没有用于隧道名称的字段。`# Name` 携带用户的注释，或在无注释时携带其 `name`，Back To Home app 在导入配置时将其用作隧道名称。其他 WireGuard 客户端会忽略这些行，因此同一配置可用于任何 WireGuard app。

客户端配置中的第二个 peer 使用占位密钥和 `AllowedIPs = 0.0.0.0/32`，因此它不承载流量。客户端无需它即可连接，通过中继时也是如此。

`/ip/cloud` 还在 `vpn-wireguard-client-config` 和 `vpn-wireguard-client-config-qrcode` 中提供内置客户端配置。它一次只能在一台设备上使用，因为 WireGuard 通过密钥识别客户端。如需更多设备，请为每台设备添加一个用户。

### 与云服务器的联系 {#contact-with-the-cloud-server}

启用 Back To Home 需要几秒钟，期间路由器会联系云服务器：`vpn-status` 会从 `checking rtt` 变为 `running`。

撤销会立即删除路由器上的所有内容，即使云服务器没有响应也是如此（`/ip/cloud` 中的 `status` 显示 `failed to connect`）。随后，`vpn.mynetname.net` 和 `sn.mynetname.net` 名称会保持注册状态，直到云服务器收到删除请求。要删除它们，请在路由器能够访问云服务器时启用 Back To Home，然后再次撤销。

所有属性请参阅 CLI 参考中的 [`/ip/cloud`](/docs/cli-reference/ip/cloud) 和 [`/ip/cloud/back-to-home-user`](/docs/cli-reference/ip/cloud/back-to-home-user)。
