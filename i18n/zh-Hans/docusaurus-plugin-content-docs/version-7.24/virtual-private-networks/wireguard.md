---
sidebar_key: "virtual-private-networks/wireguard"
sidebar_position: 11
title: "WireGuard"
sidebar_label: "WireGuard"
description: "WireGuard 是一种现代 VPN 解决方案，可在各平台上提供快速、安全的加密，并具备详细的配置选项，包括私钥/公钥、VRF 路由以及用于在设备之间建立加密隧道的对等节点管理。"
tags:
  - 'wireguard'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/wireguard
captured_at: '2026-11-04T11:35:21+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

WireGuard 是一种极其简单却快速且现代的 VPN，采用先进的密码学技术。它旨在比 IPsec 更快、更简单、更精简、更有用，同时避免大量令人头疼的问题。它打算比 OpenVPN 具有显著更好的性能。WireGuard 被设计为一种通用 VPN，既可在嵌入式接口上运行，也可在超级计算机上运行，适用于许多不同场景。它最初面向 Linux 内核发布，现在已跨平台（Windows、macOS、BSD、iOS、Android）并可广泛部署。

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 隧道的简短描述。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用/禁用隧道。 |
| **listen-port** (*integer; Default: 13231*) | WireGuard 服务用于监听传入会话的端口。 |
| **mtu** (*integer [0..65536]*; Default: **1420**) | 三层最大传输单元。 |
| **name** (*string*; Default: ) | 隧道名称。 |
| **vrf** (string; Default: **main**) | 为 WireGuard 套接字指定 vrf，更多详情见下文。 |
| **private-key** (*string*; Default: ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | base64 私钥。如果未指定，将在创建接口时自动生成。每个网络接口都有一个私钥和一个对等端列表。 |

### WireGuard 上下文中的 `vrf` 参数 {#the-vrf-parameter-in-wireguard-context}

:::info
`vrf` 参数**不**适用于 WireGuard 接口本身（例如 `wg0`、`wg1`），而是适用于用于传输加密数据包的 **UDP 套接字**。

WireGuard 的运行中有两个不同的层：

1. **WireGuard 接口** — 这是*明文*（未加密）数据包流经的虚拟网络设备。这些数据包会被加密并通过 UDP 套接字发送出去，或者在从 UDP 套接字传入时被解密。
2. **UDP 套接字** — 这些负责处理*加密*流量：从网络接收加密数据包，并将加密数据包发送出去。

`vrf` 参数与 **UDP 套接字层**（情况 2）相关。它指定套接字应使用**哪个路由表（VRF）**来决定加密数据包如何发送或接收。  
这可确保加密流量遵循正确的路由路径并使用正确的源 IP，从而防止数据包可能通过错误接口或路由发出的问题。  

#### 示例 {#example}

> 假设接口 `eth1` 属于 VRF `foo`。  
> 如果你希望 WireGuard 通过 `eth1` 发送和接收加密数据包，应将 WireGuard 配置为 `vrf=foo`。  
> WireGuard 接口（`wg0`）本身与内部 UDP 套接字使用的 `vrf` 参数所指定的 VRF 不同，这是完全正常的。
:::

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **public-key** (*string*) | base64 公钥由私钥计算得出。每个对等端都有一个公钥。公钥用于对等端之间相互认证。它们可以被传递以用于配置文件。 |
| **running** (*yes \| no*) | 接口是否正在运行。 |

## 对等体 {#peers}

| 属性 | 描述 |
| :-- | :-- |
| **allowed-address** (*IP/IPv6 prefix*; *Default*: ) | 带有 CIDR 掩码的 IP（v4 或 v6）地址列表，来自该对等端的传入流量允许使用这些地址，发往该对等端的传出流量也指向这些地址。allowed-address 前缀定义该对等端的路由和过滤规则，并且不需要与 WireGuard 接口地址处于同一子网。如果 WireGuard 接口为 192.168.99.1/24，则必须向客户端输入 192.168.99.2。通过将此 IP 添加到“Allowed Address”下，即表示只允许这个特定客户端（例如手机）连接到此对等端配置。allowed-address 范围不能在一个接口上重叠，因此需要为每个对等端设置自己的范围。 |
| **comment** *(string; Default: )* | 对等端的简短描述。 |
| **disabled** *(yes \| no; Default: **no**)* | 启用/禁用对等端。 |
| **endpoint-address** *(IP/Hostname; Default: )* | IP 地址或主机名。WireGuard 使用它在两个对等端之间建立安全连接。 |
| **endpoint-port** (*integer:0..65535**; Default:* ) | 端点端口是 WireGuard 对等端监听传入流量的 UDP 端口。 |
| **interface** (*string; Default:* ) | 该对等端所属 WireGuard 接口的名称。 |
| **persistent-keepalive** (*integer:0..65535; Default: 0*) | 以秒为单位的间隔，范围为 0 到 65535（含），表示向对等端发送经过认证的空数据包的频率，以持久保持有状态防火墙或 NAT 映射有效。值为 0 会禁用 keepalive。例如，如果接口很少发送流量，但可能随时从某个对等端接收流量，并且它位于 NAT 之后，则该接口可能受益于 25 秒的持久 keepalive 间隔。 |
| **preshared-key** (*string; Default:* ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | base64 预共享密钥。可选，可以省略。此选项会增加一层对称密钥密码学，并与已有的公钥密码学混合，以提供抗量子能力。也可以自动生成，或在系统管理员提供密钥时手动输入。 |
| **private-key** *(auto/none; Default: **none**) [敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | base64 私钥。 |
| **public-key** (*string; Default:* ) | base64 公钥由私钥计算得出。每个对等端都有一个公钥。公钥用于对等端之间相互认证。它们可以被传递以用于配置文件。 |
| **show-client-config**\**[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | *将显示已创建的对等端配置并生成二维码，以便在客户端设备上更轻松地设置对等端。不会影响 WireGuard 服务器。从 7.21\_ab548 起，查看二维码需要 show-sensitive。* |
| 用于客户端-服务器设置场景：当客户端使用二维码导入配置后，在设置了以下字段后，带有 qrcode 的选项卡中会显示配置详情： |  |
| **client-address** *(IP/IPv6 prefix; Default: )* | 当客户端（例如手机）使用二维码导入时，该 wg 接口的此地址会在该设备上设置。 |
| **client-dns** *(IP/IPv6 prefix; Default: )* | 指定将 WireGuard 服务器用作对等端流量的 VPN 网关时使用的 DNS。 |
| **client-endpoint***(IP/IPv6 prefix; Default: )* | WireGuard 服务器的 IP 地址和端口号。 |
| **client-keepalive** (*integer:0..65535; Default: 0*) | 与 **persistent-keepalive** 相同，但位于对等端一侧。 |
| **client-listen-port** (*integer:0..65535**; Default:* ) | 此 WireGuard 隧道用于监听来自对等端的传入流量的本地端口，也是其发出传出数据包时使用的源端口。 |
| **client-allowed-address *(****IP/IPv6 prefix; Default: ::/0****)*** | 从 7.21 开始，可以配置 Allowed IPs。 |
| **name** (*string; Default:*) | 允许为对等端添加名称。该名称将在 WireGuard 日志中用作对等端的引用。（从 RouterOS 7.15 版本起可用） |
| **responder***(yes \| no; Default:* ***no****)* | 指定该对等端是作为连接发起方，还是仅作为响应方。应在作为“服务器”供其他设备作为客户端连接的 WireGuard 设备上使用。否则，路由器会反复尝试连接 "endpoint-address" 或 "current-endpoint-address"。 |

通过 WireGuard 对等端导出（配置文件或二维码）提供给客户端的 "**AllowedIPs**" 配置无法更改，目前会设置为 "0.0.0.0/0, ::/0"。如果需要在远端修改这些值，必须通过用于 WireGuard 连接的远程对等端软件来完成。从 7.21 版本起已添加支持。

## 导入、导出 WireGuard {#importing-exporting-wireguard}

配置可以通过多种方式完成，下面是一个简单的 wg 导入文件示例：[export](pathname:///assets/319783040_export)

:::warning
通过二维码/文件在客户端设备上导入时，必须指定最低参数。注意 - 如果客户端地址字段留空，则生成二维码时会添加默认 IP 地址 [192.168.177.2/24](http://192.168.177.2/24 "Follow link")。

Example:

```
interface: wireguard1
public-key: v/oIzPyFm1FPHrqhytZgsKjU7mUToQHLrW+Tb5e601M=
private-key: KMwxqe/iXAU8Jn9dd1o5pPdHep2blGxNWm9I944/I24=
allowed-address: 192.168.88.3/24
client-address: 192.168.88.3/32
client-endpoint: example.com:13231
```

**警告：** 使用 `/interface/wireguard/wg-import` file= 时，如果 Wireguard 导入文件以 # 开头，可能会遇到 Could not parse 错误，请按示例直接使用清理后的文件：

```
[Interface]  
Address =192.168.88.3/24  
ListenPort = 13533  
PrivateKey = UBLqJEFZZf9wszZSUF2BPWa9dsMX99RbEcxlNfxWffk=
```

**警告：** 从 7.19\_ab41 开始，已新增 config-string 参数，例如，使用此 cli 命令，你可以导入你的配置：

```
/interface/wireguard/wg-import config-string="  
[Interface]  
Address =192.168.88.3/24  
ListenPort = 13533  
PrivateKey = UBLqJEFZZf9wszZSUF2BPWa9dsMX99RbEcxlNfxWffk=  
[Peer]  
PublicKey = EoF7HlFu3fbOnuYbyGqLMJkPZgQk9n3WwONZuJZ6qWc=  
Endpoint = 199.168.100.10:51820  
AllowedIPs = 0.0.0.0/0  
PersistentKeepalive = 25"
```
:::

### 只读属性 {#read-only-properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **current-endpoint-address** (*IP/IPv6*) | 来自对等端的、经过正确认证的数据包的最新源 IP 地址。 |
| **current-endpoint-port** (*integer*) | 来自对等端的、经过正确认证的数据包的最新源 IP 端口。 |
| **last-handshake** (*integer*) | 距上次成功握手之后的时间（秒）。 |
| **rx** (*integer*) | 从对等端接收的总字节数。 |
| **tx** (*integer*) | 向对等端发送的总字节数。 |

:::note
当你遇到回复流量源地址错误的问题时，使用 NAT 将数据包源地址转换为你的环回接口是一种常见解决方法。当数据包通过网络路由返回时，此方法有助于确保源地址一致且正确。
:::

### 应用示例 {#application-examples}

### 站点到站点 WireGuard 隧道 {#site-to-site-wireguard-tunnel}

考虑如下图所示的环境。两台远程办公室路由器连接到互联网，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网：Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要到路由器后方本地网络的安全隧道。

![](/img/e82d4ebd9d1188e7.webp)

#### WireGuard 接口配置 {#wireguard-interface-configuration}

首先，必须在两个站点上配置 WireGuard 接口，以允许自动生成私钥和公钥。两台路由器的命令相同：

```ros
/interface/wireguard
add listen-port=13231 name=wireguard1
```

现在打印接口详情时，应能看到私钥和公钥，以便进行交换。

:::warning
远端设备永远不需要任何私钥——这正是“私钥”名称的由来。
:::

**Office1**

```ros
/interface/wireguard/print 
Flags: X - disabled; R - running 
 0  R name="wireguard1" mtu=1420 listen-port=13231 private-key="yKt9NJ4e5qlaSgh48WnPCDCEkDmq+VsBTt/DDEBWfEo=" 
      public-key="u7gYAg5tkioJDcm3hyS7pm79eADKPs/ZUGON6/fF3iI=" 
```

**Office2**

```ros
/interface/wireguard/print 
Flags: X - disabled; R - running 
 0  R name="wireguard1" mtu=1420 listen-port=13231 private-key="KMwxqe/iXAU8Jn9dd1o5pPdHep2blGxNWm9I944/I24=" 
      public-key="v/oIzPyFm1FPHrqhytZgsKjU7mUToQHLrW+Tb5e601M=" 
```

#### 对等端配置 {#peer-configuration}

对等端配置定义谁可以使用 WireGuard 接口以及可以通过它发送何种流量。要识别远程对等端，必须将远程对等端的公钥与已创建的 WireGuard 接口一起指定。

**Office1**

```ros
/interface/wireguard/peers
add allowed-address=10.1.101.0/24,10.255.255.2/32 endpoint-address=192.168.80.1 endpoint-port=13231 interface=wireguard1 \
public-key="v/oIzPyFm1FPHrqhytZgsKjU7mUToQHLrW+Tb5e601M="
```

**Office2**

```ros
/interface/wireguard/peers
add allowed-address=10.1.202.0/24,10.255.255.1/32 endpoint-address=192.168.90.1 endpoint-port=13231 interface=wireguard1 \
public-key="u7gYAg5tkioJDcm3hyS7pm79eADKPs/ZUGON6/fF3iI="
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

默认的 RouterOS 防火墙会阻止隧道正常建立。在两个站点上，都应在任何丢弃规则之前，在 "input" 链中接受该流量。

**Office1**

```ros
/ip/firewall/filter
add action=accept chain=input dst-port=13231 protocol=udp src-address=192.168.80.1
```

**Office2**

```ros
/ip/firewall/filter
add action=accept chain=input dst-port=13231 protocol=udp src-address=192.168.90.1
```

此外，"forward" 链也可能限制子网之间的通信，因此此类流量也应在任何丢弃规则之前被接受。

**Office1**

```ros
/ip/firewall/filter
add action=accept chain=forward dst-address=10.1.202.0/24 src-address=10.1.101.0/24
add action=accept chain=forward dst-address=10.1.101.0/24 src-address=10.1.202.0/24
```

**Office2**

```ros
/ip/firewall/filter
add action=accept chain=forward dst-address=10.1.101.0/24 src-address=10.1.202.0/24
add action=accept chain=forward dst-address=10.1.202.0/24 src-address=10.1.101.0/24
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

添加新的 WireGuard 接口会自动生成一对私钥和公钥。你需要在远程设备上配置公钥。要获取公钥值，只需打印接口详情。

```ros
[admin@home] > /interface/wireguard/print 
Flags: X - disabled; R - running 
 0  R name="wireguard1" mtu=1420 listen-port=13231 private-key="cBPD6JNvbEQr73gJ7NmwepSrSPK3np381AWGvBk/QkU=" 
      public-key="VmGMh+cwPdb8//NOhuf1i1VIThypkMQrKAO9Y55ghG8=" 
```

接下来的步骤中，你需要获取远程设备的公钥。拿到公钥后，通过指定远程设备的公钥以及允许通过 WireGuard 隧道的允许地址来添加新的对等端。

```ros
/interface/wireguard/peers
add allowed-address=192.168.100.2/32 interface=wireguard1 public-key="<paste public key from remote device here>"
```

## 防火墙注意事项 {#firewall-considerations-1}

如果你配置了默认或严格的防火墙，则需要允许远程设备与你的设备建立 WireGuard 连接。

```ros
/ip/firewall/filter
add action=accept chain=input comment="allow WireGuard" dst-port=13231 protocol=udp place-before=1
```

要允许远程设备连接到 RouterOS 服务（例如请求 DNS），请在 input 链中允许 WireGuard 子网。

```ros
/ip/firewall/filter
add action=accept chain=input comment="allow WireGuard traffic" src-address=192.168.100.0/24 place-before=1
```

或者，只需将 WireGuard 接口添加到 "LAN" 接口列表。

```ros
/interface/list/member
add interface=wireguard1 list=LAN
```

### iOS 配置 {#ios-configuration}

从 App Store 下载 WireGuard 应用程序。打开它并从头创建新配置。

![](/img/e4c782efd1e4a573.webp)

首先，为你的连接指定一个 "Name"，并选择生成密钥对。生成的公钥对于 RouterOS 侧的对等端配置是必需的。

**![](/img/595359132947760c.webp)**

在 "Addresses" 字段中指定一个与服务器侧配置处于同一子网的 IP 地址。此地址将用于通信。在本示例中，我们在 RouterOS 侧使用了 192.168.100.1/24。你可以在此处使用 192.168.100.2。

如有必要，配置 DNS 服务器。如果 RouterOS 侧的 IP/DNS 部分将 allow-remote-requests 设置为 yes，你可以在此处指定远程 WireGuard IP 地址。

**![](/img/e2f9bce3143b113d.webp)**

点击 "Add peer"，会显示更多参数。

"Public key" 值是在 RouterOS 侧的 WireGuard 接口上生成的公钥值。

"Endpoint" 是 RouterOS 设备的 IP 或 DNS 及端口号，iOS 设备可以通过互联网与其通信。

"Allowed IPs" 设置为 0.0.0.0/0，以允许所有流量通过 WireGuard 隧道发送。

![](/img/ff125611431949f1.webp)

```ros
Depending on your configuration, you may need to add a NAT rule
chain=dstnat action=dst-nat to-ports=port protocol=udp in-interface=interface dst-port=port
```

### Windows 10 配置 {#windows-10-configuration}

从 WireGuard 下载 WireGuard 安装程序  
以管理员身份运行。

![](/img/8e2cdd2818ccadf4.webp)

按 <kbd>Control</kbd>+<kbd>N</kbd> 添加新的空隧道，为接口添加名称，Public key 应自动生成。将其复制到 RouterOS 对等端配置。  
将其添加到服务器配置中，因此完整配置如下所示（将自动生成的 PrivateKey 保留在 [Interface] 部分：

```actionscript3
[Interface]
PrivateKey = your_autogenerated_private_key=
Address = 192.168.100.2/24
DNS = 192.168.100.1

[Peer]
PublicKey = your_MikroTik_public_KEY=
AllowedIPs = 0.0.0.0/0
Endpoint = example.com:13231
```

保存并激活

## 多 WAN 设置 {#multi-wan-setup}

对于 WireGuard，不存在服务器-客户端关系；两端都可以充当端点，并且如果其配置中定义了对等端，两端都会相互发送 UDP 握手消息（并非总是如此，因为可以在对等端设置中启用 "responder" 选项，这将允许你模拟服务器-客户端行为：作为“服务器”的对等端只会回复来自“客户端”对等端的握手消息，而不会自行发送握手消息）。  
由于上述隧道建立特性，来自 WireGuard 隧道不同端点的握手消息会被视为两个独立连接。  
对于到“客户端”对等端存在多条路径的设置，我们需要考虑这一点，因为这可能导致“服务器”不通过传入路由，而是根据设置通过其他路由回复“客户端”。  
下面你可以看到一个配置示例，说明如何处理此行为，并确保“服务器”使用传入路由回复“客户端”。

### 配置示例 {#configuration-example}

此示例不包含 WireGuard 接口配置，因为它适用于具有两个 WAN 连接的 [RoadWarrior](./wireguard.md#roadwarrior-wireguard-tunnel) 和 [站点到站点](./wireguard.md#site-to-site-wireguard-tunnel) 设置，例如 [PCC](../high-availability-solutions/load-balancing/per-connection-classifier.md) 设置。  
为了使这些规则按预期工作，你需要在 WireGuard 对等端设置中启用 "responder" 选项，因为路由未被标记时，“服务器”可能会通过错误的接口发送握手消息。

```ros
/ip/firewall/mangle 
add action=add-src-to-address-list chain=prerouting address-list=WAN2_WireGuard_clients address-list-timeout=1m dst-port=13231 in-interface=ether2 protocol=udp comment="add source IP address of WAN2 incoming WireGuard traffic to address list"
add action=mark-connection chain=output dst-address-list=WAN2_WireGuard_clients dst-port=13231 new-connection-mark=wan2 protocol=udp comment="mark WireGuard connection to the client peer by checking destination address from the address list" 
add action=mark-routing chain=output connection-mark=wan2 dst-port=13231 new-routing-mark=wan2 protocol=udp comment="ensure that WireGuard traffic uses routing table associated with the WAN2 incoming interface"
add action=add-src-to-address-list chain=prerouting address-list=WAN3_WireGuard_clients address-list-timeout=1m dst-port=13231 in-interface=ether3 protocol=udp comment="add source IP address of WAN3 incoming WireGuard traffic to address list"
add action=mark-connection chain=output dst-address-list=WAN3_WireGuard_clients dst-port=13231 new-connection-mark=wan3 protocol=udp comment="mark WireGuard connection to the client peer by checking destination address from the address list" 
add action=mark-routing chain=output connection-mark=wan3 dst-port=13231 new-routing-mark=wan3 protocol=udp comment="ensure that WireGuard traffic uses routing table associated with the WAN3 incoming interface"
 
/ip/firewall/nat 
add action=masquerade chain=srcnat log=yes out-interface=ether2 comment="ensure that packet has source IP of WAN2 interface"
add action=masquerade chain=srcnat log=yes out-interface=ether3 comment="ensure that packet has source IP of WAN3 interface"
```

第一条 mangle 规则用于通过匹配传入 WireGuard 握手的目标端口来捕获源 IP 地址，并将其添加到列表中，该列表随后将用作标记传出 WireGuard 握手的方式。超时用于确保将来同一源 IP 地址可以使用不同的 WAN 接口建立 WireGuard 隧道。  
第二条 mangle 规则标记连接，这些连接随后用于标记路由，并确保当 IP 地址从地址列表中消失且隧道建立后，标记仍保留在连接上。  
第三条 mangle 规则用于强制数据包使用第二个 WAN 接口的正确路由表。  
最后一条 NAT 规则是必需的，以确保数据包以正确的源 IP 发送出去，因为它不会被 mangle 规则调整；如果未实施该规则，数据包可能会根据设置而具有不同的源 IP。
如你所见，这些规则针对 WAN3 进行了重复，以确保 WAN3 接口也可用于 WireGuard。  
  
此规则集确保 WireGuard 隧道在接收传入握手的接口上建立。

## 2FA 设置 {#2fa-setup}

[HotSpot](../authentication-authorization-accounting/hotspot-captive-portal/index.md) 服务可以在 RouterOSv7 中绑定到 WireGuard 接口。这允许管理员将 WireGuard 的高性能加密与 HotSpot 的强制门户功能结合起来，支持通过本地数据库、User Manager 或 RADIUS 进行额外的用户级认证，而 OTP 功能可以进一步增强安全性。

### 配置示例 {#configuration-example-1}

确保你的设备上已配置 Wireguard 接口：

```routeros
/interface/wireguard> print 
Flags: X - DISABLED; R - RUNNING 
 0  R name="wg1" mtu=1420 listen-port=49422 
      public-key="MikroTikMikroTikMikroTik=" 
```

在 Wireguard 接口上设置 HotSpot：

```routeros
/ip/hotspot> setup 
Select interface to run HotSpot on 
hotspot interface: wg1

or
/ip/hotspot/add interface=wg1

*Supported from 7.22
```

完成 HotSpot 设置后，一旦 Wireguard 对等端连接，就需要额外登录门户才能继续。可以使用常规的 HotSpot 用户名/密码授权。为了提高安全性，可以使用 `/ip/hotspot/user` 的 otp-password 或 `/user-manager/user` 的 totp-password 字段。添加具有 totp-secret 的用户：

```routeros
/ip/hotspot/user/add name=peer1 totp-secret=HVR4CFHAFOWFGGFAGSA5JVTIMMPG6GMT
```

你可以找到多个开源 TOTP 生成器工具，它们可以为你提供适当的密钥和必要选项，以便将其导入你的 "authenticator" 应用。

设置完成后，在你的设备上启动 Wireguard；在 Wireguard/HotSpot 服务器成功授权后，将提示 HotSpot 登录页面，你需要从 "authenticator" 应用输入 HotSpot 用户名和 totp 6 位密码（每 30 秒变化一次）。

强烈建议为 HotSpot 使用 HTTPS 登录页面，并确保 Wireguard 对等端具有验证登录页面证书的选项。
