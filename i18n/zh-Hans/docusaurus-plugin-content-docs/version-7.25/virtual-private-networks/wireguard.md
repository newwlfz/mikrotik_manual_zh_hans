---
sidebar_key: "virtual-private-networks/wireguard"
sidebar_position: 11
title: "WireGuard"
sidebar_label: "WireGuard"
description: "WireGuard 是一种现代 VPN 解决方案，可在各平台上提供快速、安全的加密，并具备详细的配置选项，包括私钥/公钥、VRF 路由以及用于在设备之间建立加密隧道的对等节点管理。"
tags:
  - 'wireguard'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/virtual-private-networks/wireguard
captured_at: '2026-11-04T11:23:37+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

WireGuard 是一种简单、快速且现代的 VPN，采用最先进的密码学技术。它的目标是比 IPsec 更快、更简单、更精简，并且性能远超 OpenVPN。WireGuard 是一款通用 VPN，既面向嵌入式接口也面向超级计算机而设计，适用于多种不同场景。它最初为 Linux 内核发布，如今已跨平台（Windows、macOS、BSD、iOS、Android），可广泛部署。

## 导入和导出 WireGuard {#importing-and-exporting-wireguard}

配置可以通过多种方式完成。可下载示例文件：[wireguard1.conf](pathname:///assets/wireguard1.conf)。使用前请替换其中的示例密钥和端点。

### 导入 WireGuard 配置 {#importing-a-wireguard-configuration}

[`/interface/wireguard/wg-import`](../cli-reference/interface/wireguard/wg-import.md) 接受标准 WireGuard 格式（`[Interface]` / `[Peer]` 段）的配置。一个最小可用的文件：

```ini
[Interface]  
Address =192.168.88.3/24  
ListenPort = 13533  
PrivateKey = UBLqJEFZZf9wszZSUF2BPWa9dsMX99RbEcxlNfxWffk=
```

将文件保存到设备（例如通过 WebFig/WinBox 的 Files 菜单），然后使用以下命令导入：

```ros
/interface/wireguard/wg-import config-file=wireguard1.conf
```

同一配置也可以不使用文件、直接通过 `config-string` 参数导入：

```ros
/interface/wireguard/wg-import config-string="
[Interface]
Address = 192.168.88.3/24
ListenPort = 13533
PrivateKey = UBLqJEFZZf9wszZSUF2BPWa9dsMX99RbEcxlNfxWffk=

[Peer]
PublicKey = EoF7HlFu3fbOnuYbyGqLMJkPZgQk9n3WwONZuJZ6qWc=
Endpoint = 192.0.2.10:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25"
```

### 导出客户端配置 {#exporting-client-configurations}

客户端配置（用于手机、笔记本电脑及其他对端设备）通过 [`/interface/wireguard/peers/show-client-config`](../cli-reference/interface/wireguard/peers/show-client-config.md) 按对端生成——既可以文本形式（`conf` 输出，或使用 `file` 参数保存到文件），也可以二维码形式（`qr` 输出）供 WireGuard 客户端应用扫描。

生成的配置由对端的 `client-*` 属性构建（参见 [`/interface/wireguard/peers`](../cli-reference/interface/wireguard/peers/index.md)）。如果对端的 `client-address` 留空，生成的配置中将使用默认地址 `192.168.177.2/24`。

:::note
生成的客户端配置中的 “**AllowedIPs**” 值为 `0.0.0.0/0, ::/0`。自 RouterOS 7.21 起，可通过对端的 `client-allowed-address` 属性进行调整；在更早的版本中该值是固定的，只能在远端对端软件中更改。
:::

### 导出 WireGuard 接口 {#exporting-a-wireguard-interface}

[`/interface/wireguard/wg-export`](../cli-reference/interface/wireguard/wg-export.md) 以标准 WireGuard 配置格式写出所选接口及其对端：

```ros
/interface/wireguard/wg-export [find name=wireguard1] \
    file=wireguard1.conf
```

使用 `wg-import` 导入此文件。导出内容包含 `[Interface]` 和 `[Peer]` 段，但不包含接口的 IP 地址，也不包含 RouterOS 路由和防火墙规则。请在目标路由器上单独配置这些内容。

如需 RouterOS 配置脚本，请改用常规的 `/interface/wireguard/export` 命令。请将包含私钥的导出文件和生成的客户端配置视为机密。

:::note
当你遇到回复流量源地址错误的问题时，使用 NAT 将数据包源地址转换为回环接口是一种常见的变通方法。此方法有助于在数据包经网络路由返回时确保源地址一致且正确。
:::

## 应用示例 {#application-examples}

### 站点到站点 WireGuard 隧道 {#site-to-site-wireguard-tunnel}

考虑下图所示的设置。两台远程办公室路由器连接到互联网，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网，Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要到路由器后方本地网络的安全隧道。

![Two office LANs connected through a WireGuard tunnel between their routers](/img/e82d4ebd9d1188e7.webp)

#### WireGuard 接口配置 {#wireguard-interface-configuration}

首先，在两个站点上配置 WireGuard 接口，以允许自动生成私钥和公钥。两台路由器的命令相同：

```ros
/interface/wireguard
add listen-port=13231 name=wireguard1
```

在每台路由器上读取公钥，并且只交换公钥。

:::warning
远端设备永远不需要私钥——这正是其被称为“私钥”的原因。
:::

**Office1**

```ros
:put [/interface/wireguard/get [find name=wireguard1] public-key]
```

**Office2**

```ros
:put [/interface/wireguard/get [find name=wireguard1] public-key]
```

#### 对等端配置 {#peer-configuration}

对端配置定义了谁可以使用 WireGuard 接口以及可以通过它发送何种流量。要标识远端对端，必须同时指定其公钥和已创建的 WireGuard 接口。将 Office1 上的 `<Office2-public-key>` 替换为在 Office2 上读取的密钥，将 Office2 上的 `<Office1-public-key>` 替换为在 Office1 上读取的密钥。

**Office1**

```ros
/interface/wireguard/peers
add allowed-address=10.1.101.0/24,10.255.255.2/32 \
    endpoint-address=192.168.80.1 endpoint-port=13231 \
    interface=wireguard1 \
    public-key="<Office2-public-key>"
```

**Office2**

```ros
/interface/wireguard/peers
add allowed-address=10.1.202.0/24,10.255.255.1/32 \
    endpoint-address=192.168.90.1 endpoint-port=13231 \
    interface=wireguard1 \
    public-key="<Office1-public-key>"
```

#### IP 与路由配置 {#ip-and-routing-configuration}

最后，必须配置 IP 和路由信息，以允许流量通过隧道发送。

**Office1**

```ros
/ip/address
add address=10.255.255.1/30 interface=wireguard1
/ip/route
add dst-address=10.1.101.0/24 gateway=wireguard1
```

**Office2**

```ros
/ip/address
add address=10.255.255.2/30 interface=wireguard1
/ip/route
add dst-address=10.1.202.0/24 gateway=wireguard1
```

#### 防火墙注意事项 {#firewall-considerations}

默认的 RouterOS 防火墙会阻止隧道正常建立。必须在两个站点的任何 drop 规则之前，在 `input` 链中接受该流量。这些命令会将规则插入到对应链中第一条现有规则之前。如果链为空，请省略 `place-before`。

**Office1**

```ros
/ip/firewall/filter
add chain=input action=accept \
    dst-port=13231 protocol=udp src-address=192.168.80.1 \
    place-before=([find chain=input]->0)
```

**Office2**

```ros
/ip/firewall/filter
add chain=input action=accept \
    dst-port=13231 protocol=udp src-address=192.168.90.1 \
    place-before=([find chain=input]->0)
```

“forward” 链也可能限制子网之间的通信，因此此类流量同样应在任何 drop 规则之前被接受。

**Office1**

```ros
/ip/firewall/filter
add chain=forward action=accept \
    dst-address=10.1.202.0/24 src-address=10.1.101.0/24 \
    place-before=([find chain=forward]->0)
add chain=forward action=accept \
    dst-address=10.1.101.0/24 src-address=10.1.202.0/24 \
    place-before=([find chain=forward]->0)
```

**Office2**

```ros
/ip/firewall/filter
add chain=forward action=accept \
    dst-address=10.1.101.0/24 src-address=10.1.202.0/24 \
    place-before=([find chain=forward]->0)
add chain=forward action=accept \
    dst-address=10.1.202.0/24 src-address=10.1.101.0/24 \
    place-before=([find chain=forward]->0)
```

## RoadWarrior WireGuard 隧道 {#roadwarrior-wireguard-tunnel}

### RouterOS 配置 {#routeros-configuration}

添加一个新的 WireGuard 接口，并为其分配 IP 地址。

```ros
/interface/wireguard
add listen-port=13231 name=wireguard1
/ip/address
add address=192.168.100.1/24 interface=wireguard1
```

添加新的 WireGuard 接口会自动生成一对私钥和公钥。请在远端设备上配置该公钥。要获取公钥值，请运行：

```ros
:put [/interface/wireguard/get [find name=wireguard1] public-key]
```

接下来的步骤中，需要获取远端设备的公钥。拿到公钥后，通过指定远端设备的公钥以及允许通过 WireGuard 隧道的允许地址来添加新对端。

```ros
/interface/wireguard/peers
add allowed-address=192.168.100.2/32 interface=wireguard1 \
    public-key="<paste public key from remote device here>"
```

### 防火墙注意事项 {#firewall-considerations-1}

如果你配置了默认或严格的防火墙，则需要允许远程设备与你的设备建立 WireGuard 连接。

```ros
/ip/firewall/filter
add chain=input action=accept \
    comment="allow WireGuard" dst-port=13231 protocol=udp \
    place-before=([find chain=input]->0)
```

要允许远程设备连接到 RouterOS 服务（例如请求 DNS），请在 input 链中允许 WireGuard 子网。

```ros
/ip/firewall/filter
add chain=input action=accept \
    comment="allow WireGuard traffic" in-interface=wireguard1 \
    src-address=192.168.100.0/24 \
    place-before=([find chain=input]->0)
```

或者，将 WireGuard 接口添加到 `LAN` 接口列表。这样，VPN 对端将获得匹配此列表的规则所授予的 LAN 访问权限；如果 VPN 对端应拥有更少的访问权限，请使用单独的防火墙规则。

```ros
/interface/list/member
add interface=wireguard1 list=LAN
```

### iOS 配置 {#ios-configuration}

从 App Store 下载 WireGuard 应用程序。打开它并从头创建新配置。

![WireGuard on iOS with the Create from scratch option selected](/img/e4c782efd1e4a573.webp)

首先，为你的连接指定 `Name`，并选择 `Generate a keypair`。生成的 `Public key` 是 RouterOS 一侧对端配置所必需的。

![New iOS WireGuard configuration with keypair, address and DNS fields](/img/595359132947760c.webp)

在 `Addresses` 字段中指定一个与 RouterOS 一侧配置处于同一子网的 IP 地址。该地址用于通信。在本示例中，RouterOS 一侧使用 `192.168.100.1/24`。你可以在此处使用 `192.168.100.2/24`。

如有必要，配置 `DNS servers`。如果 RouterOS 一侧 `/ip/dns` 下的 `allow-remote-requests` 设置为 `yes`，你可以在此处指定远端 WireGuard IP 地址。

![iOS WireGuard address 192.168.100.2 and DNS server 192.168.100.1](/img/e2f9bce3143b113d.webp)

选择 `Add peer` 以显示更多参数。

`Public key` 值是在 RouterOS 一侧 WireGuard 接口上生成的公钥值。

`Endpoint` 是 RouterOS 设备的 IP 或 DNS 加端口号，iOS 设备可通过互联网与其通信。

`Allowed IPs` 设置为 `0.0.0.0/0`，以允许所有流量通过 WireGuard 隧道发送。

![iOS peer settings with the router endpoint and Allowed IPs set to 0.0.0.0/0](/img/ff125611431949f1.webp)

如果 RouterOS 设备位于另一台 NAT 路由器之后，请在该上游路由器上配置端口转发，将 WireGuard UDP 端口转发到 RouterOS 设备。如果上游路由器运行 RouterOS：

```ros
/ip/firewall/nat
add chain=dstnat action=dst-nat \
    protocol=udp dst-port=13231 in-interface=WAN \
    to-addresses=192.168.1.2 to-ports=13231
```

将 `WAN`、`192.168.1.2` 和 `13231` 替换为适当的上游接口名称、RouterOS 设备在上游网络中的 IP 地址以及 WireGuard 监听端口。

### Windows 配置 {#windows-configuration}

从 [WireGuard](https://www.wireguard.com/install/) 下载 WireGuard 安装程序并以管理员身份运行。

按 <kbd>Control</kbd>+<kbd>N</kbd> 添加新的空隧道。为接口添加名称——公钥应会自动生成。将其复制到 RouterOS 对端配置中。  
将其添加到服务器配置中。完整配置应如下所示（在 `[Interface]` 段中保留自动生成的 `PrivateKey`）：

```ini
[Interface]
PrivateKey = your_autogenerated_private_key=
Address = 192.168.100.2/24
DNS = 192.168.100.1

[Peer]
PublicKey = your_MikroTik_public_KEY=
AllowedIPs = 0.0.0.0/0
Endpoint = example.com:13231
```

保存配置并选择 `Activate`。

## WireGuard 上下文中的 vrf 参数 {#the-vrf-parameter-in-the-wireguard-context}

`vrf` 参数**不**适用于 WireGuard 接口本身（例如 `wg0`、`wg1`），而是适用于用于传输加密数据包的 **UDP 套接字**。

WireGuard 的运行中有两个不同的层：

1. **WireGuard 接口**——处理明文（未加密）IP 数据包的虚拟网络设备。进入该接口的出站数据包由 WireGuard 加密并通过 UDP 套接字发送；传入的加密 UDP 数据包由 WireGuard 解密，并作为明文 IP 数据包通过该接口交付。
2. **UDP 套接字**——处理加密的 WireGuard 流量，从网络接收加密数据包并向网络发送加密数据包。

`vrf` 参数与 **UDP 套接字层**（情况 2）相关。它指定套接字应使用**哪个路由表（VRF）**来确定加密数据包的发送或接收方式。  
这可确保加密流量遵循正确的路由路径并使用正确的源 IP，从而避免数据包可能从错误接口或路由发出的问题。  

### 示例 {#example}

> 假设接口 `eth1` 属于 VRF `foo`。  
> 如果你希望 WireGuard 通过 `eth1` 发送和接收加密数据包，请为 WireGuard 配置 `vrf=foo`。  
> WireGuard 接口（`wg0`）本身处于与内部 UDP 套接字使用的 `vrf` 参数所指定的 VRF 不同的 VRF 中是正常的。

## 多 WAN 设置 {#multi-wan-setup}

WireGuard 本身不存在固有的服务器-客户端关系。只要配置中定义了端点，两端都可以充当端点，并且双方都会向彼此发送 UDP 握手消息。你可以在对端设置中启用 “responder” 选项来模拟服务器-客户端行为，此时“服务器”对端只回复来自“客户端”对端的握手消息，而自身不会发送握手消息。  
由于这种隧道建立行为，来自 WireGuard 隧道不同端点的握手消息会被视为两个独立连接。  
在存在多条通往“客户端”对端路径的设置中，你需要考虑这一点，因为这可能导致“服务器”通过不同于入站路由的路径回复“客户端”。  
下面是一个配置示例，用于处理此行为并确保“服务器”使用入站路由回复“客户端”。

### 配置示例 {#configuration-example}

本示例不包含 WireGuard 接口配置，因为它适用于具有两条 WAN 连接的 [RoadWarrior](./wireguard.md#roadwarrior-wireguard-tunnel) 和 [站点到站点](./wireguard.md#site-to-site-wireguard-tunnel) 设置，例如 [PCC](../high-availability-solutions/load-balancing/per-connection-classifier.md) 设置。
`wan2` 和 `wan3` 路由表必须已存在，且各自具有一条通过对应 WAN 到达对端的路由。请替换接口和表名称以匹配你的配置。output 规则匹配本地 WireGuard 源端口，因为远端对端可能使用不同的端口。

为使这些规则按预期工作，你需要在 WireGuard 对端设置中启用 “responder” 选项，否则“服务器”可能因路由未被标记而通过错误的接口发送握手消息。

```ros
/ip/firewall/mangle
add chain=prerouting action=add-src-to-address-list \
    address-list=WAN2_WireGuard_clients address-list-timeout=1m \
    dst-port=13231 in-interface=ether2 protocol=udp \
    comment="Track WireGuard peers on WAN2"
add chain=output action=mark-connection \
    dst-address-list=WAN2_WireGuard_clients src-port=13231 \
    new-connection-mark=wan2 protocol=udp \
    comment="Mark WireGuard replies"
add chain=output action=mark-routing \
    connection-mark=wan2 src-port=13231 new-routing-mark=wan2 \
    protocol=udp \
    comment="Route WireGuard replies through WAN2"
add chain=prerouting action=add-src-to-address-list \
    address-list=WAN3_WireGuard_clients address-list-timeout=1m \
    dst-port=13231 in-interface=ether3 protocol=udp \
    comment="Track WireGuard peers on WAN3"
add chain=output action=mark-connection \
    dst-address-list=WAN3_WireGuard_clients src-port=13231 \
    new-connection-mark=wan3 protocol=udp \
    comment="Mark WireGuard replies"
add chain=output action=mark-routing \
    connection-mark=wan3 src-port=13231 new-routing-mark=wan3 \
    protocol=udp \
    comment="Route WireGuard replies through WAN3"
 
/ip/firewall/nat
add chain=srcnat action=masquerade \
    protocol=udp src-port=13231 out-interface=ether2 \
    comment="Use the WAN2 source address"
add chain=srcnat action=masquerade \
    protocol=udp src-port=13231 out-interface=ether3 \
    comment="Use the WAN3 source address"
```

第一条 mangle 规则通过匹配传入 WireGuard 握手的目标端口来捕获源 IP 地址，并将其加入列表，随后该列表用于标记出站 WireGuard 握手。超时机制确保同一源 IP 地址之后可以通过不同的 WAN 接口建立 WireGuard 隧道。  
第二条 mangle 规则标记用于路由标记的连接，并确保在 IP 地址从地址列表中消失且隧道建立后，标记仍保留在连接上。  
第三条 mangle 规则强制数据包使用第二条 WAN 接口的正确路由表。  
最后一条 NAT 规则确保数据包以正确的源 IP 发出，因为它不会被 mangle 规则调整。如果没有此规则，数据包可能会因具体设置而具有不同的源 IP。
这些规则为 WAN3 重复配置，以确保 WAN3 接口也能与 WireGuard 一起使用。  

这组规则确保 WireGuard 隧道在接收到传入握手的接口上建立。

## 2FA 设置 {#2fa-setup}

在 RouterOS v7 中，[HotSpot](../authentication-authorization-accounting/hotspot-captive-portal/index.md) 服务可以绑定到 WireGuard 接口。这允许管理员将 WireGuard 的高性能加密与 HotSpot 的强制门户功能结合起来，支持通过本地数据库、User Manager 或 RADIUS 进行额外的用户级身份验证。OTP 功能进一步增强了安全性。

### 配置示例 {#configuration-example-1}

确保你的设备上已配置 WireGuard 接口 `wg1`。

在 WireGuard 接口上设置 HotSpot：

```ros
/ip/hotspot/setup
```

在提示选择 HotSpot 接口时选择 `wg1`。要在不使用交互式设置的情况下创建服务器，请配置 HotSpot 配置文件并使用：

```ros
/ip/hotspot/add interface=wg1
```

完成 HotSpot 设置后，一旦 WireGuard 对端连接，需要额外登录门户才能继续。可以使用常规的 HotSpot 用户名/密码授权。为获得更好的安全性，请在 `/ip/hotspot/user` 或 `/user-manager/user` 中配置 `otp-secret`。为每个用户生成唯一的 Base32 密钥并将其添加到身份验证器应用。使用前请替换示例密钥：

```ros
/ip/hotspot/user/add name=peer1 \
    otp-secret=HVR4CFHAFOWFGGFAGSA5JVTIMMPG6GMT
```

你可以找到多个开源 TOTP 生成器工具，它们可以为你提供适当的密钥和必要选项，以便将其导入你的 "authenticator" 应用。

设置完成后，在你的设备上启动 WireGuard。通过隧道打开 HotSpot 登录页面，输入 HotSpot 用户名以及来自身份验证器应用的六位基于时间的一次性密码（TOTP）。WireGuard 对对端密钥进行身份验证；HotSpot 登录则单独授权用户流量。

你应为 HotSpot 使用 HTTPS 登录页面，并确保 WireGuard 对端能够验证登录页面证书。
