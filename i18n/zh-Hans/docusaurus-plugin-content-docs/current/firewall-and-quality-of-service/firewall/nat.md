---
sidebar_key: "firewall-and-quality-of-service/firewall/nat"
sidebar_position: 6
title: "NAT"
sidebar_label: "NAT"
description: "MikroTik RouterOS 中的 NAT 可在私有网络和公共网络之间实现 IPv4 地址转换，既支持用于隐藏内部 IP 的源 NAT（伪装），也支持用于将外部流量重定向到特定内部设备的目的 NAT。文档说明了配置规则、NAT 类型以及连接跟踪问题的故障排除提示。"
tags:
  - 'nat'
  - 'source-nat'
  - 'destination-nat'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/firewall/nat
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Network Address Translation 是一种互联网标准，它允许局域网中的主机使用一组 IP 地址进行内部通信，并使用另一组 IP 地址进行外部通信。使用 NAT 的局域网称为 *natted* 网络。要使 NAT 正常工作，每个 *natted* 网络中都应有一个 NAT 网关。NAT 网关（NAT 路由器）在数据包往返局域网的过程中执行 IP 地址重写。在 RouterOS 中，NAT 支持 IPv4。RouterOS 不支持 NAT64。

NAT 仅匹配连接的第一个数据包，连接跟踪会记住该动作，并对属于同一连接的所有其他数据包执行该动作。

:::danger
每当更改或添加 NAT 规则时，都应清除连接跟踪表；否则，在连接条目过期之前，NAT 规则可能看起来没有正常工作。
:::

## NAT 类型 {#types-of-nat}

![](/img/cb0fefc65cae6a3e.webp)

NAT 有两种类型：

- **源 NAT 或 srcnat。** 这种类型的 NAT 对源自 natted 网络的数据包执行。NAT 路由器会在 IP 数据包经过路由器时，将其私有源地址替换为新的公网 IP 地址。对向相反方向传输的回复数据包则执行相反操作。
- **目标 NAT 或 dstnat。** 这种类型的 NAT 对发往 natted 网络的数据包执行。它最常用于使专用网络中的主机可从互联网访问。执行 dstnat 的 NAT 路由器会在 IP 数据包经过路由器前往专用网络时，替换该数据包的目标 IP 地址。

自 RouterOS v7 起，防火墙 NAT 有两个新的 *INPUT* 和 *OUTPUT* 链，它们会用于处理交付给本地计算机上运行的应用程序以及从这些应用程序发送的数据包：

- **input** - 用于处理通过某个接口进入路由器、且目标 IP 地址为路由器地址之一的数据包。经过路由器的数据包不会按照 input 链的规则处理。
- **output** - 用于处理源自路由器并通过某个接口离开路由器的数据包。经过路由器的数据包不会按照 output 链的规则处理。

### 目标 NAT {#destination-nat}

![](/img/6cea619bfc3c118c.webp)

网络地址转换通过修改数据包 IP 头中的网络地址信息来工作。让我们看一个常见设置：网络管理员希望从互联网访问办公室服务器。

我们希望允许来自互联网的连接访问本地 IP 为 10.0.0.3 的办公室服务器。在这种情况下，我们必须在办公室网关路由器上配置目标地址转换规则：

```ros
/ip/firewall/nat/add chain=dstnat action=dst-nat dst-address=172.16.16.1 dst-port=22 to-addresses=10.0.0.3 protocol=tcp
```

上述规则会执行转换：当传入连接请求目标地址为 172.16.16.1 的 TCP 端口 22 时，使用 *dst-nat* 动作并将数据包重定向到本地 IP 地址为 10.0.0.3、端口为 22 的设备。

:::tip
如果只允许家庭 PC 访问，我们可以用 *"src-address=192.168.88.1"* 来改进 *dst-nat* 规则，该地址是家庭 PC 的公网（在此示例中）IP 地址。这也被认为更安全！
:::

### 源 NAT {#source-nat}

如果希望将本地设备隐藏在从 ISP 收到的公网 IP 地址之后，应配置 MikroTik 路由器的源网络地址转换（masquerading）功能。
假设你希望将办公室计算机和服务器都隐藏在公网 IP 172.16.16.1 之后。规则将如下所示：

```ros
/ip/firewall/nat/add chain=srcnat src-address=10.0.0.0/24 action=src-nat to-addresses=172.16.16.1 out-interface=WAN
```

现在你的 ISP 将看到所有请求都来自 IP 172.16.16.1，而不会看到你的局域网 IP 地址。

#### 伪装 {#masquerade}

防火墙 NAT 的 `action=masquerade` 是 `action=srcnat` 的一种独特变体。它专为公网 IP 可能随机变化的特定场景而设计，例如 DHCP 服务器更改分配的 IP，或 PPPoE 隧道在断开后获得不同的 IP；简而言之——**当公网 IP 是动态的**。

```ros
/ip/firewall/nat/add chain=srcnat src-address=10.0.0.0/24 action=masquerade out-interface=WAN
```

每当接口断开和/或其 IP 地址发生变化时，路由器都会清除与该接口相关的所有经 masquerade 处理的连接跟踪条目，从而缩短公网 IP 变化后的系统恢复时间。如果使用 `srcnat` 而不是 `masquerade`*,*，连接跟踪条目会保留，链路故障后连接可以直接恢复。

不幸的是，当主链路断开后连接被路由到不同链路上时，这可能会导致不稳定链路出现一些问题。在这种情况下，可能发生以下情况：

- 断开时，所有相关的连接跟踪条目都会被清除。
- 每个被清除（之前经过 masquerade）的连接的后续数据包将以 *new* 状态进入防火墙，并且如果主接口尚未恢复，数据包将通过替代路由（如果有）发出，从而创建新的 masquerade 连接。
- 主链路恢复，路由在主链路上恢复，因此属于现有连接的数据包会通过主接口发送而不经过 masquerade，从而将本地 IP 泄露到公网。

为规避这种情况，可以创建一个 **blackhole** 路由，作为断开时可能消失的路由的替代。

位于启用了 NAT 的路由器后面的主机没有真正的端到端连接。因此，某些互联网协议在 NAT 场景中可能无法工作。需要从专用网络外部发起 TCP 连接的服务，或无状态协议（如 UDP），可能会受到干扰。

为克服这些限制，RouterOS 包含许多所谓的 NAT 助手，可为各种协议启用 NAT 穿越。

:::tip
尽管源 NAT 和 masquerade 执行相同的基本功能：将一个地址空间映射到另一个地址空间，但细节略有不同。最明显的是，masquerade 会从绑定到数据包出口接口的 IP 中选择出站数据包的源 IP 地址。
:::

#### CGNAT (NAT444) {#cgnat-nat444}

![](/img/835ed7e13ebaaa1f.webp)

为应对 IPv4 地址耗尽，部署了 RFC 6598。其思路是在运营商网络内部使用共享的 100.64.0.0/10 地址空间，并在运营商边缘路由器上执行 NAT，将其转换为单个公网 IP 或公网 IP 范围。

由于这种设置的性质，它也被称为 NAT444，而“正常”NAT 环境的 NAT44 网络则不同。这里涉及三个不同的 IPv4 地址空间。

RouterOS 上的 CGNAT 配置与任何其他常规源 NAT 配置没有区别：

```ros
/ip/firewall/nat
 add chain=srcnat action=src-nat src-address=100.64.0.0/10 to-address=2.2.2.2 out-interface=<public_if>
```

其中：

- 2.2.2.2 - 公网 IP 地址。
- public\_if - 提供商边缘路由器上连接到互联网的接口。

NAT444 的优点显而易见：使用的公网 IPv4 地址更少。但这种技术也有重大缺点：

- 执行 CGNAT 的服务提供商路由器需要为所有地址转换维护状态表：这需要大量内存和 CPU 资源。
- 主机游戏问题。当两个使用同一外部公网 IPv4 地址的订阅者尝试相互连接时，某些游戏会失败。
- 出于法律原因跟踪用户意味着额外的日志记录，因为多个家庭共用一个公网地址。
- 任何需要传入连接的功能都会失效。虽然常规 NAT 已经如此，但最终用户通常仍可在其 NAT 路由器上设置端口转发。CGNAT 使这变得不可能。这意味着无法在此托管 Web 服务器，IP 电话默认也无法接收传入呼叫。
- 某些 Web 服务器仅允许来自同一公网 IP 地址的最大连接数，以此对抗 SYN 洪水等 DoS 攻击。使用 CGNAT 时，此限制会更频繁地达到，某些服务的质量可能较差。
- 6to4 需要全局可达地址，在采用有限拓扑跨度地址的网络中无法工作。

带有共享地址空间源地址或目标地址的数据包不得跨服务提供商边界转发。服务提供商必须在入站链路上过滤此类数据包。在 RouterOS 中，可以通过边缘路由器上的防火墙过滤器轻松完成：

```ros
/ip/firewall/filter
 add chain=input src-address=100.64.0.0/10 action=drop in-interface=<public_if>
 add chain=output dst-address=100.64.0.0/10 action=drop out-interface=<public_if>
 add chain=forward src-address=100.64.0.0/10 action=drop in-interface=<public_if>
 add chain=forward src-address=100.64.0.0/10 action=drop out-interface=<public_if>
 add chain=forward dst-address=100.64.0.0/10 action=drop out-interface=<public_if>
```

在大规模部署的 CGN 网络中，服务提供商可能被要求记录映射后的地址，这可能会成为问题。幸运的是，RFC 7422 提出了一种管理 CGN 转换的方法，可显著减少所需的日志记录量，同时为滥用响应提供可追溯性。

RFC 指出，CGN 不必记录每个连接，而是可以确定性地将客户私有地址（在 CGN 面向客户的接口上收到的地址，即内部侧）映射到扩展了端口范围的公网地址。

这意味着必须添加单独的 NAT 规则来实现各自映射，如下例所示：

|  |  |
| :-- | :-- |
| **内部 IP** | **外部 IP/端口范围** |
| 100.64.0.1 | 2.2.2.2:5000-5199 |
| 100.64.0.2 | 2.2.2.2:5200-5399 |
| 100.64.0.3 | 2.2.2.2:5400-5599 |
| 100.64.0.4 | 2.2.2.2:5600-5799 |
| 100.64.0.5 | 2.2.2.2:5800-5999 |

建议使用脚本而不是手动编写规则。以下示例可以调整以适应你的设置中的任何要求。

```ros
{
######## Adjustable values #########
:local StartingAddress 100.64.0.1
:local ClientCount 5
:local AddressesPerClient 2
:local PublicAddress 2.2.2.2
:local StartingPort 5000
:local PortsPerAddress 200
####################################

# 所有客户端链跳转
/ip/firewall/nat/add chain=srcnat action=jump jump-target=clients \
    src-address="$StartingAddress-$($StartingAddress + ($ClientCount * $AddressesPerClient) - 1)"

:local currentPort $StartingPort

:for c from=1 to=$ClientCount do={
    # 特定客户端链跳转
    :if ($AddressesPerClient > 1) do={
      /ip/firewall/nat/add chain=clients action=jump jump-target="client-$c" \
      src-address="$($StartingAddress + ($AddressesPerClient * ($c - 1)))-$($StartingAddress + ($AddressesPerClient * $c -1))"
    } else={
      /ip/firewall/nat/add chain=clients action=jump jump-target="client-$c" \
      src-address="$($StartingAddress + ($AddressesPerClient * ($c - 1)))"
    }

    # 转换规则
    :for a from=1 to=$AddressesPerClient do={
      /ip/firewall/nat/add chain="client-$c" action=src-nat protocol=tcp \
      src-address="$($StartingAddress + (($c -1) * $AddressesPerClient) + $a - 1)" to-address=$PublicAddress to-ports="$currentPort-$($currentPort + $PortsPerAddress - 1)"
      /ip/firewall/nat/add chain="client-$c" action=src-nat protocol=udp \
      src-address="$($StartingAddress + (($c -1) * $AddressesPerClient) + $a - 1)" to-address=$PublicAddress to-ports="$currentPort-$($currentPort + $PortsPerAddress - 1)"
      :set currentPort ($currentPort + $PortsPerAddress)
    }
}
}
```

这六个本地值可以调整，脚本既可以直接粘贴到终端中，也可以存储在系统脚本部分，以备以后需要重新生成配置。

执行后，你应该会得到一组规则：

```ros
[admin@MikroTik] > ip firewall nat print
Flags: X - disabled, I - invalid; D - dynamic
 0    chain=srcnat action=jump jump-target=clients
      src-address=100.64.0.1-100.64.0.10

 1    chain=clients action=jump jump-target=client-1
      src-address=100.64.0.1-100.64.0.2

 2    chain=client-1 action=src-nat to-addresses=2.2.2.2 to-ports=5000-5199
      protocol=tcp src-address=100.64.0.1

 3    chain=client-1 action=src-nat to-addresses=2.2.2.2 to-ports=5000-5199
      protocol=udp src-address=100.64.0.1

 4    chain=client-1 action=src-nat to-addresses=2.2.2.2 to-ports=5200-5399
      protocol=tcp src-address=100.64.0.2

 5    chain=client-1 action=src-nat to-addresses=2.2.2.2 to-ports=5200-5399
      protocol=udp src-address=100.64.0.2

 6    chain=clients action=jump jump-target=client-2
      src-address=100.64.0.3-100.64.0.4

 7    chain=client-2 action=src-nat to-addresses=2.2.2.2 to-ports=5400-5599
      protocol=tcp src-address=100.64.0.3

 8    chain=client-2 action=src-nat to-addresses=2.2.2.2 to-ports=5400-5599
      protocol=udp src-address=100.64.0.3

 9    chain=client-2 action=src-nat to-addresses=2.2.2.2 to-ports=5600-5799
      protocol=tcp src-address=100.64.0.4

10    chain=client-2 action=src-nat to-addresses=2.2.2.2 to-ports=5600-5799
      protocol=udp src-address=100.64.0.4

11    chain=clients action=jump jump-target=client-3
      src-address=100.64.0.5-100.64.0.6

12    chain=client-3 action=src-nat to-addresses=2.2.2.2 to-ports=5800-5999
      protocol=tcp src-address=100.64.0.5

13    chain=client-3 action=src-nat to-addresses=2.2.2.2 to-ports=5800-5999
      protocol=udp src-address=100.64.0.5

14    chain=client-3 action=src-nat to-addresses=2.2.2.2 to-ports=6000-6199
      protocol=tcp src-address=100.64.0.6

15    chain=client-3 action=src-nat to-addresses=2.2.2.2 to-ports=6000-6199
      protocol=udp src-address=100.64.0.6

[...]
```

#### 发夹 NAT {#hairpin-nat}

发夹网络地址转换（*NAT Loopback*）是指局域网中的设备可以通过网关路由器的公网 IP 地址访问局域网中的另一台机器。

![](/img/6cea619bfc3c118c.webp)

在上面的示例中，网关路由器具有以下 `dst-nat` 配置规则：

```ros
/ip/firewall/nat/add chain=dstnat action=dst-nat dst-address=172.16.16.1 dst-port=443 to-addresses=10.0.0.3 to-ports=443 protocol=tcp
```

当来自家庭 PC 的用户与 Web 服务器建立连接时，路由器会按配置执行 DST NAT：

1. 客户端发送一个源 IP 地址为 192.168.88.1、目标 IP 地址为 172.16.16.1、端口为 443 的数据包，以请求某些 Web 资源。
2. 路由器对数据包执行目标 NAT，将其转换为 10.0.0.3，并相应地替换数据包中的目标 IP 地址。源 IP 地址保持不变：192.168.88.1。
3. 服务器回复客户端的请求，回复数据包的源 IP 地址为 10.0.0.3，目标 IP 地址为 192.168.88.1。
4. 路由器确定该数据包属于之前的连接，并撤销目标 NAT，将原始目标 IP 地址放入源 IP 地址字段。目标 IP 地址为 192.168.88.1，源 IP 地址为 172.16.16.1。
5. 客户端收到其期望的回复数据包，连接建立。

![](/img/8e40bd6d38f0e7d5.webp)

但当与 Web 服务器处于同一网络的客户端请求连接到 Web 服务器的 **公网** IP 地址时，就会出现一个 **问题**：

1. 客户端发送一个源 IP 地址为 10.0.0.2、目标 IP 地址为 172.16.16.1、端口为 443 的数据包，以请求某些 Web 资源。
2. 路由器对数据包执行目标 NAT，将其转换为 10.0.0.3，并相应地替换数据包中的目标 IP 地址。源 IP 地址保持不变：10.0.0.2。
3. 服务器回复客户端的请求。但是，请求的源 IP 地址与 Web 服务器位于同一子网。Web 服务器不会将回复发送回路由器，而是直接将其发送回 10.0.0.2，回复中的源 IP 地址为 10.0.0.3。
4. 客户端收到回复数据包，但会将其丢弃，因为它期望收到来自 172.16.16.1 的数据包，而不是来自 10.0.0.3 的数据包。

为解决此问题，我们将按如下方式配置一条新的 *src-nat* 规则（发夹 NAT 规则）：

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat dst-address=10.0.0.3 out-interface=LAN protocol=tcp src-address=10.0.0.0/24
```

配置上述规则后：

1. 客户端发送一个源 IP 地址为 10.0.0.2、目标 IP 地址为 172.16.16.1、端口为 443 的数据包，以请求某些 Web 资源。
2. 路由器对数据包执行目标 NAT，将其转换为 10.0.0.3，并相应地替换数据包中的目标 IP 地址。它还对数据包执行源 NAT，并将数据包中的源 IP 地址替换为其 LAN 接口上的 IP 地址。目标 IP 地址为 10.0.0.3，源 IP 地址为 10.0.0.1。
3. Web 服务器回复请求，并将源 IP 地址为 10.0.0.3 的回复发送回路由器 LAN 接口的 IP 地址 10.0.0.1。
4. 路由器确定该数据包属于之前的连接，并撤销源 NAT 和目标 NAT，将原始目标 IP 地址 172.16.16.1 放入源 IP 地址字段，将原始源 IP 地址 10.0.0.2 放入目标 IP 地址字段。

### 端点无关 NAT {#endpoint-independent-nat}

端点无关 NAT 会在源 NAT 中创建映射，并对具有相同源 IP 和端口的所有后续数据包使用同一映射。此映射通过以下规则创建：

```ros
/ip/firewall/nat
add action=endpoint-independent-nat chain=srcnat out-interface=WAN protocol=udp
```

此映射允许运行与源无关的过滤，从而允许将来自 WAN 的任意源的数据包转发到映射的内部 IP 和端口。以下规则启用过滤：

```ros
/ip/firewall/nat
add action=endpoint-independent-nat chain=dstnat in-interface=WAN protocol=udp
```

:::danger
端点无关 NAT 仅适用于 UDP 协议。
:::

此外，endpoint-independent-nat 还可以接受几个其他参数：

- `randomize-port` - 随机化连接将映射到哪个公网端口。

更多信息请参阅 [RFC 5128](https://www.ietf.org/rfc/rfc5128.txt) 第 2.2.3 节和第 2.2.5 节

## NAT 助手 {#nat-helpers}

位于启用了 NAT 的路由器后面的主机没有真正的端到端连接。因此，某些互联网协议在 NAT 场景中可能无法工作。为克服这些限制，RouterOS 包含许多 NAT 助手，可为各种协议启用 NAT 穿越。

NAT 助手可以从 `/ip/firewall/service-ports` 菜单进行管理。

可用的 NAT 助手列表：

| 助手 | 描述 |
| :-- | :-- |
| **FTP** | FTP 服务助手 |
| **H323** | H323 服务助手 |
| **IRC** | IRC 服务助手 |
| **PPTP** | PPTP (GRE) 隧道助手 |
| **UDPLITE** | UDP-Lite 服务助手 |
| **DCCP** | DCCP 服务助手 |
| **SCTP** | SCTP 服务助手 |
| **SIP** | SIP 助手。附加选项：`sip-direct-media` 允许将 RTP 媒体流重定向为直接从主叫方传送到被叫方。默认值为 `yes`。`sip-timeout` 允许调整 SIP UDP 连接的 TTL。默认值：1 小时。在某些环境中，您必须减小该值。 |
| **TFTP** | TFTP 服务助手 |
| **RTSP** | RTSP 服务助手 |

:::warning
如果未启用连接跟踪，则防火墙服务端口将显示为不活动

**警告：** **udplite**、**dccp** 和 **sctp** 是连接跟踪的内置服务。由于它们不是单独加载的模块，因此无法单独禁用；它们会与连接跟踪一起被禁用。
:::
