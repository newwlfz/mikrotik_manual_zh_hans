---
sidebar_key: "network-management/cloud/back-to-home"
sidebar_position: 1
title: "Back To Home（远程回家）"
sidebar_label: "Back To Home"
description: "Back To Home 可从任何位置安全地通过 VPN 访问你的路由器，即使它没有公网 IP 或位于 NAT 之后。它使用 MikroTik 中继服务器进行间接连接，确保端到端加密且不暴露密钥。该功能同时支持智能手机应用和手动 RouterOS 配置，包括与访客共享隧道，或通过 WireGuard 为计算机共享隧道。"
tags:
  - 'cloud'
  - 'back-to-home'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud/back-to-home
captured_at: '2026-11-03T15:24:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/cloud` **所需软件包：** `routeros`  
**所需 RouterOS 版本：** v7.12 及更新版本  
**硬件要求：** ARM/ARM64/TILE 架构设备

Back To Home 是一项便捷功能，可让你的设备从世界任何地方安全地通过 VPN 访问你的路由器和网络，即使你的路由器没有公网 IP 地址、位于 NAT 或防火墙之后。

配置通过 MikroTik Back to Home 应用完成（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)，[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)）。

如果 VPN 服务器（你的家庭路由器）有公网 IP 地址，VPN 应用会在手机和路由器之间创建直接 VPN 连接。然而，如果路由器无法从互联网直接访问，连接将通过 MikroTik 中继服务器建立。连接始终是端到端加密的。中继服务器或任何其他设备都无法访问加密密钥。本质上，中继只帮助你的设备连接到路由器。连接将显示为从你的路由器发出，而不是从中继发出。*如果通过中继连接，速度可能会受到限制。*

此功能是一个便捷选项，可用于从某些内容不可用的位置访问你的家庭网络或查看你所在国家/地区可用的内容。它并非用于匿名；它用于简单的一键访问你的家庭网络。如需更精细的安全控制，我们建议你使用高级 RouterOS 选项手动配置并保护 VPN 连接。

#### 使用应用启用 BTH {#enabling-bth-using-the-app}

要设置 Back to Home，你需要一部装有 BTH 应用的智能手机，并且应在家中连接到路由器的 WiFi 网络。

- 使用手机连接到路由器的 Wi-Fi。
- 打开 Back to Home 应用（[Android](https://play.google.com/store/apps/details?id=com.mikrotik.android.freevpn)，[iPhone](https://apps.apple.com/lv/app/mikrotik-back-to-home/id6450679198)）。
- 点击“新建”。
- 输入路由器的本地 IP 地址（最可能是 `192.168.88.1`）、用户名和密码，然后点击“连接”。
- 为隧道命名，然后点击“创建隧道”。
- 你的手机将请求允许添加新的 VPN 设置。使用手机 PIN 码批准。
- 设置完成。现在你可以断开路由器的 Wi-Fi，并连接到任何其他网络，例如 LTE/5G，或者直接离开家。
- 点击“连接”按钮可切换所选隧道的连接状态。

| ![](/img/92c286a69409ae4a.png) | ![](/img/f76d4d2890e0ad03.png) | ![](/img/c031432eb344d15d.png) | ![](/img/058c3ee8a44419ef.png) | ![](/img/a6ecd2514c3ab975.png) |
| :-- | :-- | :-- | :-- | :-- |
| 点击“新建” | 提供路由器凭据 | 已建立连接 | 允许添加 VPN | 如果设备不受支持，则会显示错误 |

#### 与其他手机用户共享 BTH 连接 {#sharing-the-bth-connection-with-another-phone-user}

可以为你的朋友和家人创建访客隧道。你甚至可以指定是否要让这些人也访问你的本地网络，还是应限制他们仅通过你的路由器使用互联网。创建共享隧道后，你可以通过手机上的任何聊天应用发送邀请链接，或当面给朋友出示二维码（这两种情况下，朋友都必须也安装 BTH 应用）。如果你想从另一部手机或计算机通过 WireGuard(TM) 应用连接到你的路由器，也可以。只需选择共享 WireGuard(TM) 配置文件，然后在 WireGuard(TM) 应用中打开该文件。

| ![](/img/e232bdab9ab338c9.png) | ![](/img/6421c4b61331555b.png) | ![](/img/353315d345096ef1.png) | ![](/img/b4c0f951101195d7.png) | ![](/img/738264b205e8ebef.jpg) | ![](/img/6a5bfecaf09f48b8.jpg) |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| 管理共享 | 先连接到你的隧道 | 连接后，创建共享 | 提供名称和访问级别 | 共享表单打开 | 通过 WhatsApp、Signal 等发送邀请链接 |

要与某人共享你的隧道：

- 作为所有者，连接到你的 BTH 隧道。
- 点击隧道旁边的“...”图标，然后点击“管理共享”。
- 输入路由器的管理密码，因为你将修改路由器配置。
- 在共享管理器中点击“创建”。
- 在“隧道名称”中输入你朋友的名字，因为将为他们创建新隧道。
- 指定这个新访客隧道的到期日期。
- 指定该用户是否需要访问你家的内部网络。如果他们只想使用此隧道访问互联网，请不要勾选此项。
- 按下“创建隧道”后，手机的共享表单会打开。选择发送邀请链接的方式。
- 对方点击此链接后，要么会被引导安装 BTH 应用，要么 BTH 应用会打开，并允许他们在手机上设置这个新的访客隧道。

#### 通过 WireGuard(TM) 应用与计算机共享 BTH 隧道 {#sharing-the-bth-tunnel-with-a-computer-via-the-wireguardtm-app}

由于 PC 没有 BTH 应用，你可以使用 [WireGuard(TM) 应用](https://www.wireguard.com/install/)连接到共享隧道。你甚至可以通过“邀请”你的计算机连接，与你自己共享你的连接。

我们来创建一个新的共享，这次是为你自己创建，用于从 PC 使用。

| ![](/img/9d365f253bf85b29.png) | ![](/img/843740bbf52b8610.png) | ![](/img/ba48cd0759804581.png) | ![](/img/22b3243b2607de84.png) | ![](/img/22b3243b2607de84.png) | ![](/img/89fd75da1cb0724b.png) |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| 创建 | 指定名称和访问级别 | 你现在有两个共享 | 点击“...”发送邀请 | 选择“共享 WireGuard 配置文件” | 通过 AirDrop 发送到你的 macOS，或通过电子邮件发送该文件 |

在你的计算机上安装 WireGuard 应用，然后点击“从文件导入隧道”

![](/img/7b87bb190f4a06d9.jpg)

---

#### 在 RouterOS 中手动配置 BTH（可选，如果你没有智能手机） {#configuring-bth-manually-in-routeros-optional-if-no-smartphone-is-available-to-you}

:::info
重要提示

请注意，**使用 Back to Home 无需在 RouterOS 中配置任何内容**。只需使用 BTH 应用（见上文）即可启用。Back to Home 的重点就是避免使用 Winbox 或命令行。以下说明仅用于调试或经验丰富的管理员。
:::

1. 连接到路由器
2. 启用 DDNS Cloud 服务：``/ip/cloud/set ddns-enabled=yes``
3. 启用 Back To Home：``/ip/cloud/set back-to-home-vpn=enabled``
4. 打印隧道配置：``/ip/cloud/print``
5. 扫描二维码（``vpn-wireguard-client-config-qrcode``），或复制配置（``vpn-wireguard-client-config``），然后在首选的 WireGuard® 客户端中输入。同一时间只能有一个客户端使用此配置。  

   :::warning
配置 Back To Home 后 - 会自动创建一个额外的对等条目，可通过运行命令 *`/ip/cloud/print`* 查看。这是为了让 VPN 在设备无法访问公网 IP 地址并选择使用 MikroTik 的中继服务器建立连接的情况下正常工作。  
   如果你的设备可以访问公网 IP 地址，则生成的对等条目会被忽略：

   ```
   [Peer]
   PublicKey = //////////////////////////////////////////8=
   AllowedIPs = 0.0.0.0/32
   Endpoint = example.com:12345
   PersistentKeepalive = 15 
   ```
   :::

#### 移除和禁用连接 {#removing-and-disabling-connections}

在智能手机应用中，VPN 配置会添加到系统 VPN 设置。因此，Back to Home 应用只充当向导。它向操作系统提供所需的配置（这就是 iPhone 会警告你正在更改系统配置的原因）。

要移除已创建的连接，请进入智能手机的设置应用，并在那里移除 VPN 连接。

在 MikroTik 路由器侧，你应在 Wireguard 菜单中手动删除添加的 Peers。请注意，“revoke-and-disable”按钮不能用来“暂停”Back to Home 功能的使用。一旦你在 RouterOS 中执行 revoke-and-disable，所有 Peers 将与 Cloud / Relay 服务器解除关联，并且你将必须从智能手机应用重新创建连接。因此，一旦你在 RouterOS 的 IP Cloud 菜单中使用了“revoke-and-disable”选项，还需要从 Wireguard 菜单中删除这些 Peers，因为它们无法再次使用。

## 属性参考 {#property-reference}

### IP Cloud {#ip-cloud}

**子菜单：** `/ip/cloud`

Back to Home 与 IP Cloud 共用此菜单。Back to Home 参数：

| 属性 | 描述 |
| :-- | :-- |
| **back-to-home-vpn** (*enabled \| revoked-and-disabled*; Default: **revoked-and-disabled**) | 启用或撤销并禁用 Back to Home 服务。为使 BTH 正常工作，ddns-enabled 不能设置为 no。 |
| **vpn-dns-name** (*read-only: string*) | 显示分配给设备的 DNS 名称。该名称由产品序列号加上 *.vpn.mynetname.net* 组成。只有在至少一个 ddns-request 成功完成后，此字段才可见。 |
| **vpn-port** (*read-only: integer*) | BTH VPN 使用的端口。 |
| **vpn-status** (*read-only: string*) | 包含描述当前 BTH 状态的文本字符串。 |
| **vpn-relay-rtts** (*read-only;* "region (ip4: time(**ms**), ip6: time (**ms)**") | 每个可用中继的往返时间，单位为毫秒；IPv4 和 IPv6 的值都会显示。 |
| **vpn-relay-ipv4-status** (*read-only: string*) | 到中继的连接状态以及有关中继的详细信息 |
| **vpn-relay-ipv6-status**(*read-only: string*) | 到中继的连接状态以及有关中继的详细信息 |
| **vpn-relay-regions** (*read-only: string*) | 可用的 VPN 中继区域，可在 vpn-prefer-relay-code 中引用。此处将显示所有可用的中继。 |
| **vpn-relay-addressess**(*read-only: string*) | 中继的 IPv4 地址 |
| **vpn-relay-addressess-ipv6** (*read-only: string*) | 中继的 IPv6 地址 |
| **vpn-private-key** (*read-only: string*) *[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | BTH 的私钥 |
| **vpn-public-key** (*read-only: string*) | BTH 的公钥 |
| **vpn-peer-private-key**(*read-only: string*) *[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | Peer 私钥 |
| **vpn-peer-public-key** (*read-only: string*) | Peer 公钥 |
| **vpn-prefer-relay-code** (*string;*) | 你可以输入一个用于 BTH 连接的首选中继代码；如果未设置，将选择 RTT 最小的中继。 |
| **vpn-interface** (*read-only: string*) | 为 Back to Home WireGuard® 隧道创建的接口名称。 |
| **vpn-wireguard-client-config** (*read-only: string*) | 可输入到你的首选 WireGuard® 客户端中的配置。同一时间只能有一个客户端使用此配置。 |
| **vpn-wireguard-client-config-qrcode** (*read-only*) | 可供你的首选 WireGuard® 客户端扫描的二维码。同一时间只能有一个客户端使用此配置。 |

:::info
使用 vpn-wireguard-client-config 或 vpn-wireguard-client-config-qrcode 时，这两个选项是等效的；你只需将其中一个导入到你的 WireGuard 客户端设备即可。
:::

### Back to Home 用户 {#back-to-home-users}

**子菜单：** `/ip/cloud/back-to-home-user`

自 RouterOS 7.14 起，菜单 `/ip/cloud/back-to-home-user` 中提供了新的 Back to Home 专用用户管理器，你可以在其中查看 Back to Home 移动应用添加的所有用户、更改他们的防火墙首选项，并添加新用户。

```
[boss@mikrotik-ax] /ip/cloud/back-to-home-user> print detail   
Flags: X - disabled; A - active   
  
 0  A name="user1" slot=3 expires=never client-address=192.168.216.3/32,fc00:0:0:216::3/128 allow-lan=no   
      private-key="OHqR2BZXJp0N6//3JzzoJhBJVb0rrSxV0dxQL/2UdXY=" public-key="Na7oEq9XLdeK8ouCUX+tC4FIM51vEnZ7mLiFqG9xiUQ="   
  
[boss@mikrotik-ax] /ip/cloud/back-to-home-user>
```

在此菜单中添加用户时，你可以使用命令 `/interface/wireguard/peers/show-client-config user1` 查看他们的 Wireguard 配置和二维码。

`Allow-lan=no` 会将用户加入一个防火墙地址列表，该列表只允许互联网访问，但阻止用户访问你的内部网络。请注意，用户添加后到期日期无法更改。

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*) | BTH 用户的说明性名称 |
| **expires**(string; never \| date: *"YYYY-MM-DD HH:MM:SS";*  Default: **never***)* | 用户的到期时间和日期。用户创建后无法更改 |
| **client-address**(string: IPv4 \| IPv6) | 客户端地址。如果未指定，将自动生成一个 |
| **allow-lan**(string: yes \| no; Default: **no**) | 会将用户加入一个防火墙地址列表，该列表只允许互联网访问，但阻止用户访问你的内部网络 |
| **private-key**(string;) *[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用户的私钥；如果未手动设置，将由系统生成 |
| **public-key**(string;) | 用户的公钥；如果未手动设置，将由系统生成 |
