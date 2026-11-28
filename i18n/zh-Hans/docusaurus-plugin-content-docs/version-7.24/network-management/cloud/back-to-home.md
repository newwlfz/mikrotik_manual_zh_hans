---
title: "Back To Home（远程回家）"
description: "Back To Home 支持从任意位置安全访问路由器的 VPN，即使路由器没有公网 IP 或位于 NAT 之后也可使用。它使用 MikroTik 中继服务器建立间接连接，在不暴露密钥的情况下确保端到端加密。该功能支持智能手机应用和手动 RouterOS 配置，包括与访客共享隧道，或通过 WireGuard 与计算机共享隧道。"
tags:
  - 'cloud'
  - 'back-to-home'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud/back-to-home
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "network-management/cloud"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/cloud` **所需软件包：** `routeros`  
**所需 RouterOS 版本：** v7.12 及更高版本  
**硬件要求：** ARM/ARM64/TILE 架构设备

Back To Home 是一项便捷功能，可将设备配置为通过安全的 VPN 从世界任何位置访问路由器和网络，即使路由器没有公网 IP 地址、位于 NAT 或防火墙之后也是如此。

配置通过 MikroTik Back to Home 应用完成（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)、[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)）。

如果 VPN 服务器（家庭路由器）具有公网 IP 地址，VPN 应用将在手机和路由器之间建立直接的 VPN 连接。如果无法从互联网直接访问路由器，则将通过 MikroTik 中继服务器建立连接。连接始终采用端到端加密。中继服务器或任何其他设备均无法访问加密密钥。本质上，中继仅帮助设备访问路由器。连接将显示为从路由器发出，而不是从中继发出。*通过中继时，速度可能受限。*

此功能可便捷地从某些内容不可用的位置访问家庭网络，或查看家庭所在国家/地区可用的内容。它不用于匿名；它用于通过一次点击简单访问家庭网络。如需更精细的安全控制，建议手动配置并使用 RouterOS 高级选项保护 VPN 连接。

#### 使用应用启用 BTH {#enabling-bth-using-the-app}

要设置 Back to Home，应使用安装了 BTH 应用的智能手机，并位于家中且连接到路由器的 WiFi 网络。

- 使用手机连接到路由器的 Wi-Fi。
- 打开 Back to Home 应用（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)、[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)）。
- 点击“Create new”。
- 输入路由器的本地 IP 地址（通常为 `192.168.88.1`）、路由器的用户名和密码，然后点击“Connect”。
- 为隧道命名，然后点击“Create tunnel”。
- 手机将请求添加新 VPN 设置的权限。使用手机 PIN 批准该请求。
- 设置完成。现在可以断开路由器的 Wi-Fi，并连接到任何其他网络，例如 LTE/5G，或直接离开家。
- 点击 Connect 按钮可切换所选连接的连接状态。

| ![](/img/92c286a69409ae4a.png) | ![](/img/f76d4d2890e0ad03.png) | ![](/img/c031432eb344d15d.png) | ![](/img/058c3ee8a44419ef.png) | ![](/img/a6ecd2514c3ab975.png) |
| :-- | :-- | :-- | :-- | :-- |
| 点击“Create new” | 提供路由器凭据 | 连接已建立 | 允许添加 VPN | 如果设备不受支持，则显示错误 |

#### 与其他手机用户共享 BTH 连接 {#sharing-the-bth-connection-with-another-phone-user}

可以为朋友和家人创建 Guest 隧道。你甚至可以指定这些人是否也可以访问本地网络，或者是否只允许他们通过路由器使用互联网。创建共享隧道后，可以通过手机上的任意聊天应用发送 Invitation 链接，或当面向朋友展示二维码（这两种情况下，朋友都需要安装 BTH app）。如果希望通过另一部手机或计算机上的 WireGuard(TM) app 连接到路由器，也可以实现。只需选择共享 WireGuard(TM) 配置文件，并在 WireGuard(TM) app 中打开该文件。

| ![](/img/e232bdab9ab338c9.png) | ![](/img/6421c4b61331555b.png) | ![](/img/353315d345096ef1.png) | ![](/img/b4c0f951101195d7.png) | ![](/img/738264b205e8ebef.jpg) | ![](/img/6a5bfecaf09f48b8.jpg) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 管理共享 | 先连接到你的隧道 | 连接后创建共享 | 提供名称和访问级别 | 打开共享表单 | 通过 WhatsApp、Signal 等发送邀请链接 |

要与他人共享你的隧道：

- 作为所有者，连接到你的 BTH 隧道。
- 点击隧道旁边的“...”图标，然后点击“Manage shares”。
- 输入路由器的管理密码，因为你将修改路由器配置。
- 在 Shares 管理器中点击“Create”。
- 在“Tunnel name”中输入朋友的名字，因为将为其创建一条新隧道。
- 指定这条新 Guest 隧道的到期日期。
- 指定该用户是否需要访问家庭内部网络。如果他们只想使用此隧道访问互联网，请勿勾选此项。
- 按下“Create tunnel”后，手机 Share Sheet 将打开。选择发送邀请链接的方式。
- 对方点击此链接后，将被引导安装 BTH app，或者 BTH app 将打开并允许他们在手机中设置这条新的 Guest 隧道。

#### 通过 WireGuard(TM) app 与计算机共享 BTH 隧道 {#sharing-the-bth-tunnel-with-a-computer-via-the-wireguardtm-app}

由于没有适用于 PC 的 BTH app，可以使用 [WireGuard(TM) app](https://www.wireguard.com/install/) 连接到共享隧道。你甚至可以通过“邀请”计算机连接，将连接共享给自己。

这次新建一个共享，供你自己在 PC 上使用。

| ![](/img/9d365f253bf85b29.png) | ![](/img/843740bbf52b8610.png) | ![](/img/ba48cd0759804581.png) | ![](/img/22b3243b2607de84.png) | ![](/img/22b3243b2607de84.png) | ![](/img/89fd75da1cb0724b.png) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 创建 | 指定名称和访问级别 | 现在你有两个共享 | 点击“...”发送邀请 | 选择“Share WireGuard config  file” | 通过 AirDrop 发送到你的 macOS，或通过电子邮件发送文件 |

在计算机上安装 WireGuard 应用，然后点击“Import Tunnel from file”。

![](/img/7b87bb190f4a06d9.jpg)

---

#### 在 RouterOS 中手动配置 BTH（可选，适用于没有智能手机的情况） {#configuring-bth-manually-in-routeros-optional-if-no-smartphone-is-available-to-you}

:::info
重要提示

需要注意的是，**使用 Back to Home 无需在 RouterOS 中进行任何配置**。只需使用 BTH 应用（见上文）即可启用它。Back to Home 的核心目的就是避免使用 Winbox 或命令行。以下说明仅用于调试或供经验丰富的管理员使用。
:::

1. 连接到路由器
2. 启用 DDNS Cloud 服务：``/ip/cloud/set ddns-enabled=yes``
3. 启用 Back To Home：``/ip/cloud/set back-to-home-vpn=enabled``
4. 打印隧道配置：``/ip/cloud/print``
5. 扫描二维码（``vpn-wireguard-client-config-qrcode``）或复制配置（``vpn-wireguard-client-config``），并输入到首选 WireGuard® 客户端中。此配置一次只能供一个客户端使用。  

   :::warning
配置 Back To Home 后，会自动创建一条额外的 peer 条目，可通过命令 *`/ip/cloud/print`* 查看。该条目用于设备没有公网 IP 地址并选择通过 MikroTik 中继服务器建立连接时，使 VPN 正常工作。  
   如果设备具有公网 IP 地址，则生成的 peer 条目会被忽略：

   ```
   [Peer]
   PublicKey = //////////////////////////////////////////8=
   AllowedIPs = 0.0.0.0/32
   Endpoint = example.com:12345
   PersistentKeepalive = 15 
   ```
   :::

#### 删除和禁用连接 {#removing-and-disabling-connections}

在智能手机应用中，VPN 配置会添加到 System VPN 设置中。因此，Back to Home 应用仅充当向导。它将所需的配置提供给操作系统（这就是 iPhone 会警告你正在更改系统配置的原因）。

要删除已创建的连接，请进入智能手机设置应用，并从其中删除 VPN 连接。

在 MikroTik 路由器侧，应在 Wireguard 菜单中手动删除添加的 Peers。请注意，“revoke-and-disable”按钮不能用于“暂停”Back to Home 功能的使用。在 RouterOS 中执行 revoke-and-disable 后，所有 Peers 都会与 Cloud / Relay 服务器解除关联，你将不得不从 Smartphone 应用重新创建连接。因此，在 RouterOS IP Cloud 菜单中使用“revoke-and-disable”选项后，还需要从 Wireguard 菜单中删除 Peers，因为它们无法重复使用。

## 属性参考 {#property-reference}

### IP Cloud

**子菜单：** `/ip/cloud`

Back to Home 与 IP Cloud 共用菜单。Back to Home 参数：

| 属性 | 说明 |
| :-- | :-- |
| **back-to-home-vpn** (*enabled \| revoked-and-disabled*；默认：**revoked-and-disabled**) | 启用或撤销并禁用 Back to Home 服务。BTH 要正常运行，ddns-enabled 不得设置为 no。 |
| **vpn-dns-name** (*read-only: string*) | 显示分配给设备的 DNS 名称。该名称由产品序列号加上 *.vpn.mynetname.net* 组成。只有在至少成功完成一次 ddns-request 后，该字段才可见。 |
| **vpn-port** (*read-only: integer*) | BTH VPN 使用的端口。 |
| **vpn-status** (*read-only: string*) | 包含描述当前 BTH 状态的文本字符串。 |
| **vpn-relay-rtts** (*read-only;* "region (ip4: time(**ms**), ip6: time (**ms)**") | 每个可用中继的往返时间，单位为毫秒，IPv4 和 IPv6 的值都会显示。 |
| **vpn-relay-ipv4-status** (*read-only: string*) | 到中继的连接状态以及中继的详细信息 |
| **vpn-relay-ipv6-status**(*read-only: string*) | 到中继的连接状态以及中继的详细信息 |
| **vpn-relay-regions** (*read-only: string*) | 可用的 VPN 中继区域，可在 vpn-prefer-relay-code 中引用。此处会显示所有可用中继。 |
| **vpn-relay-addressess**(*read-only: string*) | 中继的 IPv4 地址 |
| **vpn-relay-addressess-ipv6** (*read-only: string*) | 中继的 IPv6 地址 |
| **vpn-private-key** (*read-only: string*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | BTH 的私钥 |
| **vpn-public-key** (*read-only: string*) | BTH 的公钥 |
| **vpn-peer-private-key**(*read-only: string*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 对端私钥 |
| **vpn-peer-public-key** (*read-only: string*) | 对端公钥 |
| **vpn-prefer-relay-code** (*string;*) | 可以输入 BTH 连接优先使用的中继代码；如果未设置，将选择 RTT 最小的中继。 |
| **vpn-interface** (*read-only: string*) | 为 Back to Home WireGuard® 隧道创建的接口名称。 |
| **vpn-wireguard-client-config** (*read-only: string*) | 可输入到首选 WireGuard® 客户端的配置。同一时间只有一个客户端可以使用该配置。 |
| **vpn-wireguard-client-config-qrcode** (*read-only*) | 可供首选 WireGuard® 客户端扫描的二维码。同一时间只有一个客户端可以使用该配置。 |

:::info
使用 vpn-wireguard-client-config 或 vpn-wireguard-client-config-qrcode 时，两个选项等效；只需将其中一个导入 WireGuard 客户端设备。
:::

### Back to Home 用户 {#back-to-home-users}

**子菜单：** `/ip/cloud/back-to-home-user`

自 RouterOS 7.14 起，`/ip/cloud/back-to-home-user` 菜单中提供了专门的 Back to Home 用户管理器。在该菜单中，可以查看由 Back to Home 移动应用添加的所有用户、更改其防火墙偏好，并添加新用户。

```
[boss@mikrotik-ax] /ip/cloud/back-to-home-user> print detail   
Flags: X - disabled; A - active   
  
 0  A name="user1" slot=3 expires=never client-address=192.168.216.3/32,fc00:0:0:216::3/128 allow-lan=no   
      private-key="OHqR2BZXJp0N6//3JzzoJhBJVb0rrSxV0dxQL/2UdXY=" public-key="Na7oEq9XLdeK8ouCUX+tC4FIM51vEnZ7mLiFqG9xiUQ="   
  
[boss@mikrotik-ax] /ip/cloud/back-to-home-user>
```

在此菜单中添加用户时，可以使用命令 `/interface/wireguard/peers/show-client-config user1` 查看其 Wireguard 配置和二维码。

`Allow-lan=no` 会将用户加入一个防火墙地址列表，该列表只允许访问互联网，但会阻止用户访问内部网络。请注意，用户添加后无法更改到期日期。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*) | BTH 用户的描述性名称 |
| <strong>expires</strong>(string; never &#124; date: <em>"YYYY-MM-DD HH:MM:SS";</em><br/> 默认：<strong>never</strong>*)* | 用户的到期时间和日期。用户创建后无法更改 |
| **client-address**(string: IPv4 \| IPv6) | 客户端地址。如果未指定，将自动生成 |
| **allow-lan**(string: yes \| no；默认：**no**) | 将用户加入一个防火墙地址列表，该列表只允许访问互联网，但会阻止用户访问内部网络 |
| **private-key**(string;) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用户私钥；如果未手动设置，将由系统生成 |
| **public-key**(string;) | 用户公钥；如果未手动设置，将由系统生成 |
