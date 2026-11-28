---
title: "WireGuard"
description: "WireGuard 是一种现代 VPN 解决方案，提供快速、安全的跨平台加密，并包含私钥/公钥、VRF 路由和对等体管理等详细配置选项，用于在设备之间建立加密隧道。"
tags:
  - 'wireguard'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/wireguard
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

WireGuard 是一个极其简单但快速且现代的 VPN，采用先进的密码学技术。它旨在比 IPsec 更快、更简单、更精简且更实用，同时避免大量令人头疼的问题。它还力求比 OpenVPN 具有显著更高的性能。WireGuard 设计为通用 VPN，可运行在嵌入式接口和超级计算机上，适用于多种不同场景。它最初针对 Linux 内核发布，现在已跨平台（Windows、macOS、BSD、iOS、Android），并可广泛部署。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 隧道的简短描述。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用隧道。 |
| **listen-port** (*integer; Default: 13231*) | WireGuard 服务监听传入会话的端口。 |
| **mtu** (*integer [0..65536]*; Default: **1420**) | 第 3 层最大传输单元。 |
| **name** (*string*; Default: ) | 隧道名称。 |
| **vrf** (string; Default: **main**) | 指定 WireGuard socket 的 vrf，详情见下文。 |
| **private-key** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | base64 私钥。如果未指定，则在创建接口时自动生成。每个网络接口都有一个私钥和一个对等体列表。 |

### WireGuard 上下文中的 `The vrf` 参数 {#the-vrf-parameter-in-wireguard-context}

:::info
`vrf` 参数**不**应用于 WireGuard 接口本身（例如 `wg0`、`wg1`），而是应用于用于传输加密数据包的 **UDP socket**。

WireGuard 运行中有两个不同的层：

1. **WireGuard 接口** —— 这是 *明文*（未加密）数据包流经的虚拟网络设备。这些数据包会被加密并通过 UDP socket 发送出去，或在从 UDP socket 进入时解密。
2. **UDP socket** —— 处理 *加密* 流量：从网络接收加密数据包，并发送加密数据包。

`vrf` 参数与 **UDP socket 层**相关（情况 2）。它指定 socket 应使用哪个路由表（VRF）来确定加密数据包的发送或接收方式。  
这可确保加密流量遵循正确的路由路径并使用正确的源 IP，避免数据包可能通过错误接口或路由发出的问题。  

#### 示例> 假设接口 `eth1` 属于 VRF `foo`。 {#example}
> 如果希望 WireGuard 通过 `eth1` 发送和接收加密数据包，应为 WireGuard 配置 `vrf=foo`。  
> WireGuard 接口（`wg0`）本身位于与内部 UDP socket 使用的 `vrf` 参数所指定 VRF 不同的 VRF 中，这是完全正常的。
:::

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **public-key** (*string*) | base64 公钥由私钥计算得出。每个 peer 都有一个公钥。peer 使用公钥相互进行身份验证。公钥可以传递出去，用于配置文件。 |
| **running** (*yes \| no*) | 接口是否正在运行。 |

## Peers

| 属性 | 说明 |
| :-- | :-- |
| **allowed-address** (*IP/IPv6 prefix*; *Default*: ) | 允许来自这些地址的入站流量并允许向这些地址发送该 peer 的出站流量的 IP（v4 或 v6）地址列表，地址需带 CIDR 掩码。allowed-address 前缀定义 peer 的路由和过滤规则，无需与 WireGuard 接口地址位于同一子网。如果 WireGuard 接口地址为 192.168.99.1/24，则必须在客户端输入 192.168.99.2。在“Allowed Address”下添加该 IP，表示仅允许该特定客户端（例如手机）连接到此 peer 配置。一个接口上的 allowed-address 范围不能重叠，因此你需要为每个 peer 设置自己的范围。 |
| **comment** *(string; Default: )* | peer 的简短说明。 |
| **disabled** *(yes \| no; Default: **no**)* | 启用或禁用 peer。 |
| **endpoint-address** *(IP/Hostname; Default: )* | IP 地址或主机名。WireGuard 使用它来在两个 peer 之间建立安全连接。 |
| **endpoint-port** (*integer:0..65535**; Default:* ) | Endpoint 端口是 WireGuard peer 侦听入站流量的 UDP 端口。 |
| **interface** (*string; Default:* ) | peer 所属的 WireGuard 接口名称。 |
| **persistent-keepalive** (*integer:0..65535; Default: 0*) | 向 peer 发送经过身份验证的空数据包的时间间隔，单位为秒，范围为 0 到 65535（含），用于持续保持有状态防火墙或 NAT 映射有效。值为 0 时禁用 keepalive。例如，如果接口很少发送流量，但可能随时从 peer 接收流量，并且位于 NAT 之后，则将该接口设置为 25 秒的 persistent keepalive 间隔可能会有益。 |
| **preshared-key** *(string; Default:* ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | base64 预共享密钥。可选，可以省略。该选项在现有公钥加密中加入额外的对称密钥加密层，以提供抗量子能力。它也可以自动生成，或在系统管理员提供密钥时手动输入。 |
| **private-key** *(auto/none; Default: **none**) [sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | base64 私钥。 |
| **public-key** (*string; Default:* ) | base64 公钥由私钥计算得出。每个 peer 都有一个公钥。peer 使用公钥相互进行身份验证。公钥可以传递出去，用于配置文件。 |
| **show-client-config**\**[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | *将显示已创建的 Peer 配置，并生成二维码，以便在客户端设备上更轻松地设置 peer。不会影响 WireGuard Server。要查看二维码，从 7.21\_ab548 起需要 show-sensitive。* |
| 用于客户端—服务器设置场景，当使用二维码为客户端导入配置时，设置以下字段后，将显示带有 qrcode 的选项卡上的配置详细信息： |  |
| **client-address** *(IP/IPv6 prefix; Default: )* | 使用二维码为客户端（例如手机）导入时，将在该设备上为 wg 接口设置此地址。 |
| **client-dns** *(IP/IPv6 prefix; Default: )* | 指定将 WireGuard Server 用作 peer 流量的 VPN 网关时使用。 |
| **client-endpoint***(IP/IPv6 prefix; Default: )* | WireGuard Server 的 IP 地址和端口号。 |
| **client-keepalive** (*integer:0..65535; Default: 0*) | 与 **persistent-keepalive** 相同，但从 peer 侧生效。 |
| **client-listen-port** (*integer:0..65535**; Default:* ) | 此 WireGuard 隧道侦听来自 peer 的入站流量的本地端口，也是其发送出站数据包的源端口。 |
| **client-allowed-address *(****IP/IPv6 prefix; Default: ::/0****)*** | 从 7.21 起，可以配置 Allowed IPs。 |
| **name** (*string; Default:*) | 允许为 peer 添加名称。该名称将用作 WireGuard 日志中 peer 的引用。（从 RouterOS 7.15 起可用） |
| **responder***(yes \| no; Default:* ***no****)* | 指定 peer 是作为连接发起方，还是仅作为响应方。应在用作其他设备客户端连接目标的“服务器”的 WireGuard 设备上使用。否则，路由器将反复尝试连接到“endpoint-address”或“current-endpoint-address”。 |

通过 WireGuard peer 导出（配置文件或二维码）提供给客户端的“**AllowedIPs**”配置无法更改，当前将设置为“0.0.0.0/0, ::/0”。如果需要修改远端这些值，必须通过用于 WireGuard 连接的远端 peer 软件完成。从 7.21 起已添加支持。

## 导入、导出 Wireguard {#importing-exporting-wireguard}

可以通过多种方式完成配置，以下是一个简单的 wg 导入文件示例：[export](pathname:///assets/319783040_export)

:::warning
必须指定通过二维码/文件在客户端设备上导入所需的最少参数。注意 - 如果客户端地址字段留空，生成二维码时会添加默认 IP 地址 [192.168.177.2/24](http://192.168.177.2/24 "Follow link")。

Example:

```
interface: wireguard1
public-key: v/oIzPyFm1FPHrqhytZgsKjU7mUToQHLrW+Tb5e601M=
private-key: KMwxqe/iXAU8Jn9dd1o5pPdHep2blGxNWm9I944/I24=
allowed-address: 192.168.88.3/24
client-address: 192.168.88.3/32
client-endpoint: example.com:13231
```

**警告：** 使用 `/interface/wireguard/wg-import` file= 时，可能会出现 Could not parse 错误。如果 Wireguard 导入文件以 # 开头，请按示例清理后使用：

```
[Interface]  
Address =192.168.88.3/24  
ListenPort = 13533  
PrivateKey = UBLqJEFZZf9wszZSUF2BPWa9dsMX99RbEcxlNfxWffk=
```

**警告：** 从 7.19\_ab41 开始，添加了 config-string 参数，例如，可以使用以下 CLI 命令导入配置：

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

| 属性 | 说明 |
| :-- | :-- |
| **current-endpoint-address** (*IP/IPv6*) | 来自对端的已正确认证数据包的最新源 IP 地址。 |
| **current-endpoint-port** (*integer*) | 来自对端的已正确认证数据包的最新源 IP 端口。 |
| **last-handshake** (*integer*) | 自上次成功握手以来的秒数。 |
| **rx** (*integer*) | 从对端接收的字节总数。 |
| **tx** (*integer*) | 发送到对端的字节总数。 |

:::note
当遇到回复流量源地址错误的问题时，使用 NAT 将数据包源地址转换为 loopback 接口地址是一种常见解决方法。该方法有助于确保数据包经网络路由返回时，源地址保持一致且正确。
:::

### 应用示例 {#application-examples}

### 站点到站点 WireGuard 隧道 {#site-to-site-wireguard-tunnel}

请参考下图所示的设置。两台远程办公室路由器连接到互联网，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网，Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要通往路由器后本地网络的安全隧道。

![](/img/e82d4ebd9d1188e7.webp)

#### WireGuard 接口配置 {#wireguard-interface-configuration}

首先，必须在两个站点配置 WireGuard 接口，以允许自动生成私钥和公钥。两台路由器的命令相同：

```ros
/interface/wireguard
add listen-port=13231 name=wireguard1
```

现在打印接口详细信息时，应能看到私钥和公钥，以便进行交换。

:::warning
远端设备永远不需要任何私钥——因此称为私钥。
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

#### Peer 配置 {#peer-configuration}

Peer 配置定义谁可以使用 WireGuard 接口，以及可以通过该接口发送什么类型的流量。要识别远端 peer，必须指定其公钥以及已创建的 WireGuard 接口。

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

#### IP 和路由配置 {#ip-and-routing-configuration}

最后，必须配置 IP 和路由信息，以允许通过隧道发送流量。

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

默认 RouterOS 防火墙会阻止隧道正常建立。应在两端站点的任何丢弃规则之前，在“input”链中接受该流量。

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

此外，“forward”链也可能限制子网之间的通信，因此也应在任何丢弃规则之前接受此类流量。

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

添加新的 WireGuard 接口并为其分配 IP 地址。

```ros
/interface/wireguard
add listen-port=13231 name=wireguard1
/ip/address
add address=192.168.100.1/24 interface=wireguard1
```

添加新的 WireGuard 接口将自动生成一对私钥和公钥。需要在远程设备上配置公钥。要获取公钥值，只需打印接口详细信息。

```ros
[admin@home] > /interface/wireguard/print 
Flags: X - disabled; R - running 
 0  R name="wireguard1" mtu=1420 listen-port=13231 private-key="cBPD6JNvbEQr73gJ7NmwepSrSPK3np381AWGvBk/QkU=" 
      public-key="VmGMh+cwPdb8//NOhuf1i1VIThypkMQrKAO9Y55ghG8=" 
```

对于后续步骤，需要获取远程设备的公钥。获取后，通过指定远程设备的公钥以及允许通过 WireGuard 隧道的允许地址，添加新的 peer。

```ros
/interface/wireguard/peers
add allowed-address=192.168.100.2/32 interface=wireguard1 public-key="<paste public key from remote device here>"
```

## 防火墙注意事项 {#firewall-considerations-1}

如果配置了默认或严格的防火墙，需要允许远程设备与设备建立 WireGuard 连接。

```ros
/ip/firewall/filter
add action=accept chain=input comment="allow WireGuard" dst-port=13231 protocol=udp place-before=1
```

要允许远程设备连接 RouterOS 服务（例如请求 DNS），请在 input 链中允许 WireGuard 子网。

```ros
/ip/firewall/filter
add action=accept chain=input comment="allow WireGuard traffic" src-address=192.168.100.0/24 place-before=1
```

或者只需将 WireGuard 接口添加到“LAN”接口列表。

```ros
/interface/list/member
add interface=wireguard1 list=LAN
```

### iOS 配置 {#ios-configuration}

从 App Store 下载 WireGuard 应用。打开该应用，并从头创建新的配置。

![](/img/e4c782efd1e4a573.webp)

首先，为连接指定“Name”，并选择生成密钥对。生成的公钥是 RouterOS 端配置 peer 所必需的。

**![](/img/595359132947760c.webp)**

在“Addresses”字段中指定与服务器端配置处于同一子网的 IP 地址。该地址将用于通信。在本例中，RouterOS 端使用了 192.168.100.1/24。此处可使用 192.168.100.2。

如有必要，配置 DNS 服务器。如果 RouterOS 端 IP/DNS 下的 allow-remote-requests 设置为 yes，则可以在此处指定远端 WireGuard IP 地址。

**![](/img/e2f9bce3143b113d.webp)**

点击“Add peer”，将显示更多参数。

“Public key”值是 RouterOS 端 WireGuard 接口生成的公钥值。

“Endpoint”是 iOS 设备可以通过 Internet 与 RouterOS 设备通信的 IP 或 DNS 以及端口号。

“Allowed IPs”设置为 0.0.0.0/0，以允许所有流量通过 WireGuard 隧道发送。

![](/img/ff125611431949f1.webp)

```ros
Depending on your configuration, you may need to add a NAT rule
chain=dstnat action=dst-nat to-ports=port protocol=udp in-interface=interface dst-port=port
```

### Windows 10 配置 {#windows-10-configuration}

从 WireGuard 下载 WireGuard 安装程序。  
以管理员身份运行。

![](/img/8e2cdd2818ccadf4.webp)

按 <kbd>Control</kbd>+<kbd>N</kbd> 添加新的空隧道，为接口添加名称，Public key 应自动生成。将其复制到 RouterOS peer 配置中。  
将其添加到服务器配置中，完整配置如下所示（将自动生成的 PrivateKey 保留在 [Interface] 部分）：

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

对于 WireGuard，不存在服务器-客户端关系，两端都可以作为端点，并且如果配置中定义了端点，两端都会向对方发送 UDP 握手消息（情况并非总是如此，因为你可以在 peer 设置中启用“responder”选项，以模拟服务器-客户端行为，“server” peer 只会回复来自“client” peer 的握手消息，而不会自行发送握手消息）。  
由于上述隧道建立机制的特性，来自 WireGuard 隧道不同端点的握手消息会被视为两个独立的连接。  
对于到“client” peer 存在多条路径的设置，需要考虑这一点，因为这可能导致“server”不通过入站路由回复“client”，而是根据设置通过其他路由回复。  
下面可以看到一个配置示例，说明如何解决此行为，并确保“server”使用入站路由回复“client”。

### 配置示例 {#configuration-example}

本示例不包含 WireGuard 接口配置，因为它适用于具有两条 WAN 连接的 [RoadWarrior](/docs/virtual-private-networks/wireguard#roadwarrior-wireguard-tunnel) 和 [Site to Site](/docs/virtual-private-networks/wireguard#site-to-site-wireguard-tunnel) 场景，例如 [PCC](/docs/high-availability-solutions/load-balancing/per-connection-classifier) 配置。  
要使这些规则按预期工作，需要在 WireGuard peer 设置中启用“responder”选项，因为路由未被标记时，“server”可能通过错误的接口发送握手。

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

第一条 mangle 规则用于通过匹配传入 WireGuard 握手的目标端口来捕获源 IP 地址，并将其添加到列表中，该列表随后将用于标记传出的 WireGuard 握手。超时用于确保将来同一源 IP 地址可以使用其他 WAN 接口建立 WireGuard 隧道。  
第二条 mangle 规则标记连接，这些连接进一步用于标记路由，并确保在 IP 地址从地址列表中消失且隧道建立后，标记仍保留在连接上。  
第三条 mangle 规则用于强制数据包为第二条 WAN 接口使用正确的路由表。  
最后一条 NAT 规则用于确保数据包以正确的源 IP 发出，因为 mangle 规则不会调整源 IP；如果未配置该规则，根据配置不同，数据包可能使用不同的源 IP。  
如你所见，这些规则针对 WAN3 进行了复制，以确保 WAN3 接口也可与 WireGuard 一起使用。  
  
该规则集可确保 WireGuard 隧道在接收传入握手的接口上建立。

## 2FA 设置 {#2fa-setup}

[HotSpot](/docs/authentication-authorization-accounting/hotspot-captive-portal) 服务可以绑定到 RouterOSv7 中的 WireGuard 接口。这使管理员能够将 WireGuard 的高性能加密与 HotSpot 的强制门户功能结合使用，通过本地数据库、User Manager 或 RADIUS 支持额外的用户级身份验证，而 OTP 功能可进一步增强安全性。

### 配置示例 {#configuration-example-1}

确保在设备上配置 Wireguard 接口：

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

HotSpot 设置完成后，当 Wireguard peer 连接时，需要额外登录门户才能继续。可以使用常规 HotSpot 用户名/密码授权。为提高安全性，可以使用 `/ip/hotspot/user` 的 otp-password 或 `/user-manager/user` 的 totp-password 字段。添加具有 totp-secret 的用户：

```routeros
/ip/hotspot/user/add name=peer1 totp-secret=HVR4CFHAFOWFGGFAGSA5JVTIMMPG6GMT
```

你可以找到多个开源 totp 生成工具，它们可以提供合适的密钥和必要选项，以便将其导入“authenticator”应用。

设置完成后，在设备上启动 Wireguard。通过 Wireguard/HotSpot 服务器成功授权后，将显示 HotSpot 登录页面，你需要输入 HotSpot 用户名和来自“authenticator”应用的 totp 6 位密码（每 30 秒更改一次）。

强烈建议对 HotSpot 使用 HTTPS 登录页面，并确保 Wireguard peer 具有验证登录页面证书的选项。
