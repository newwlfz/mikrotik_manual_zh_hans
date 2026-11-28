---
title: "NAT"
description: "MikroTik RouterOS 中的 NAT 可在私有网络和公共网络之间转换 IPv4 地址，支持通过源 NAT（masquerading）隐藏内部 IP，以及通过目标 NAT 将外部流量重定向到特定内部设备。本文档介绍配置规则、NAT 类型，以及连接跟踪问题的故障排除方法。"
tags:
  - 'nat'
  - 'source-nat'
  - 'destination-nat'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/nat
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

网络地址转换（Network Address Translation）是一种互联网标准，允许局域网中的主机使用一组 IP 地址进行内部通信，并使用另一组 IP 地址进行外部通信。使用 NAT 的 LAN 称为 *natted* 网络。要使 NAT 正常工作，每个 *natted* 网络中都应有一个 NAT 网关。NAT 网关（NAT 路由器）会在数据包进出 LAN 时重写 IP 地址。RouterOS 支持 IPv4 的 NAT。RouterOS 不支持 NAT64。

NAT 仅匹配连接的第一个数据包，连接跟踪会记住该动作，并对属于同一连接的所有其他数据包执行该动作。

:::danger
更改或添加 NAT 规则时，应清除连接跟踪表；否则，在连接条目过期之前，NAT 规则可能看起来无法正常工作。
:::

## NAT 类型 {#types-of-nat}

![](/img/cb0fefc65cae6a3e.webp)

NAT 有两种类型：

- **源 NAT 或 srcnat。** 此类 NAT 应用于源自 natted 网络的数据包。当 IP 数据包经过路由器时，NAT 路由器会将该数据包的私有源地址替换为新的公网 IP 地址。对反方向传输的回复数据包执行相反操作。
- **目标 NAT 或 dstnat。** 此类 NAT 应用于发往 natted 网络的数据包。它最常用于使私有网络中的主机可从 Internet 访问。执行 dstnat 的 NAT 路由器会在 IP 数据包经过路由器发往私有网络时替换其目标 IP 地址。

自 RouterOS v7 起，防火墙 NAT 新增了 *INPUT* 和 *OUTPUT* 链，发往本机运行的应用程序以及由这些应用程序发出的数据包会经过这两条链：

- **input** - 用于处理通过某个接口进入路由器且目标 IP 地址为路由器地址之一的数据包。经过路由器转发的数据包不会按 input 链规则处理。
- **output** - 用于处理源自路由器并通过某个接口离开路由器的数据包。经过路由器转发的数据包不会按 output 链规则处理。

### 目标 NAT {#destination-nat}

![](/img/6cea619bfc3c118c.webp)

网络地址转换通过修改数据包 IP 报头中的网络地址信息来工作。下面来看一个常见场景：网络管理员希望从互联网访问办公室服务器。

我们希望允许从互联网连接到本地 IP 为 10.0.0.3 的办公室服务器。在这种情况下，必须在办公室网关路由器上配置目标地址转换规则：

```ros
/ip/firewall/nat/add chain=dstnat action=dst-nat dst-address=172.16.16.1 dst-port=22 to-addresses=10.0.0.3 protocol=tcp
```

上述规则执行以下转换：当传入连接请求目标地址为 172.16.16.1 的 TCP 端口 22 时，使用 *dst-nat* 动作，并将数据包重定向到具有本地 IP 地址 10.0.0.3 和端口 22 的设备。

:::tip
要仅允许来自家中 PC 的访问，可以使用 *"src-address=192.168.88.1"* 改进 *dst-nat* 规则，该地址是本例中家中 PC 的公网 IP 地址。这也被认为更安全！
:::

### 源 NAT {#source-nat}

如果希望将本地设备隐藏在从 ISP 获取的公网 IP 地址后面，应配置 MikroTik 路由器的源网络地址转换（masquerading）功能。
假设希望将办公室计算机和服务器都隐藏在公网 IP 172.16.16.1 后面。规则如下所示：

```ros
/ip/firewall/nat/add chain=srcnat src-address=10.0.0.0/24 action=src-nat to-addresses=172.16.16.1 out-interface=WAN
```

现在，ISP 将看到所有请求都来自 IP 172.16.16.1，而不会看到 LAN 网络 IP 地址。

#### Masquerade

Firewall NAT `action=masquerade` 是 `action=srcnat` 的一种特殊形式。它专为公网 IP 可能随机变化的场景设计，例如 DHCP 服务器更改分配的 IP，或 PPPoE 隧道断开后获得不同的 IP，简而言之，适用于**公网 IP 为动态的情况**。

```ros
/ip/firewall/nat/add chain=srcnat src-address=10.0.0.0/24 action=masquerade out-interface=WAN
```

每当接口断开和/或其 IP 地址发生变化时，路由器将清除与该接口相关的所有 masquerade 连接跟踪条目，从而缩短公网 IP 变化后的系统恢复时间。如果使用 `srcnat` 而不是 `masquerade`*，*连接跟踪条目会保留，链路故障后连接可以直接恢复。

遗憾的是，这可能会在不稳定链路上引发一些问题：当主链路断开后，连接被路由到不同链路。在这种情况下，可能发生以下情况：

- 断开时，所有相关的连接跟踪条目都会被清除。
- 每个被清除（之前经过 masquerade）的连接发出的下一个数据包都会以 *new* 状态进入防火墙，如果主接口尚未恢复，该数据包将通过备用路由发出（如果有），从而创建新的 masquerade 连接。
- 主链路恢复，路由恢复到主链路，因此属于现有连接的数据包会通过主接口发送而不经过 masquerade，从而将本地 IP 泄露到公共网络。

要解决这种情况，可以创建一条 **blackhole** 路由，作为断开时可能消失的路由的替代路由。

启用 NAT 的路由器后面的主机不具备真正的端到端连接。因此，在 NAT 场景中，某些 Internet 协议可能无法工作。需要从私有网络外部发起 TCP 连接的服务，或 UDP 等无状态协议，可能会中断。

为克服这些限制，RouterOS 包含多种所谓的 NAT helpers，可为各种协议启用 NAT 穿越。

:::tip
虽然 Source NAT 和 masquerading 执行相同的基本功能：将一个地址空间映射到另一个地址空间，但细节略有不同。最显著的区别是，masquerading 会根据数据包将要从其发出的接口上绑定的 IP，选择出站数据包的源 IP 地址。
:::

#### CGNAT（NAT444） {#cgnat-nat444}

![](/img/835ed7e13ebaaa1f.webp)

为应对 IPv4 地址耗尽，已部署 RFC 6598。其思路是在运营商网络内部使用共享的 100.64.0.0/10 地址空间，并在运营商边缘路由器上执行 NAT，将其转换为单个公网 IP 或公网 IP 范围。

由于这种部署方式的特性，它也被称为 NAT444，以区别于“普通”NAT 环境中的 NAT44 网络。其中涉及三种不同的 IPv4 地址空间。

RouterOS 上的 CGNAT 配置与任何其他常规源 NAT 配置没有区别：

```ros
/ip/firewall/nat
 add chain=srcnat action=src-nat src-address=100.64.0.0/10 to-address=2.2.2.2 out-interface=<public_if>
```

Where:

- 2.2.2.2 - 公网 IP 地址。
- public\_if - 提供商边缘路由器上连接到互联网的接口。

NAT444 的优势显而易见：使用的公网 IPv4 地址更少。但该技术也存在明显缺点：

- 执行 CGNAT 的服务提供商路由器需要为所有地址转换维护状态表：这需要大量内存和 CPU 资源。
- 主机游戏问题。当使用同一外部公网 IPv4 地址的两位用户尝试相互连接时，某些游戏会失败。
- 出于法律原因跟踪用户意味着需要额外日志，因为多个家庭共用一个公网地址。
- 任何需要传入连接的应用都会失效。虽然常规 NAT 已经存在这种情况，但最终用户通常仍可在自己的 NAT 路由器上设置端口转发。CGNAT 使这变得不可能。这意味着无法在此托管 Web 服务器，IP Phones 默认也无法接收来电。
- 某些 Web 服务器只允许来自同一公网 IP 地址的最大连接数，以抵御 SYN flood 等 DoS 攻击。使用 CGNAT 时，更容易达到该限制，某些服务的质量可能较差。
- 6to4 需要全局可达地址，在采用拓扑范围受限地址的网络中无法工作。

源地址或目的地址为 Shared Address Space 的数据包不得跨服务提供商边界转发。服务提供商必须在入口链路上过滤此类数据包。在 RouterOS 中，可通过边缘路由器上的防火墙过滤器轻松实现：

```ros
/ip/firewall/filter
 add chain=input src-address=100.64.0.0/10 action=drop in-interface=<public_if>
 add chain=output dst-address=100.64.0.0/10 action=drop out-interface=<public_if>
 add chain=forward src-address=100.64.0.0/10 action=drop in-interface=<public_if>
 add chain=forward src-address=100.64.0.0/10 action=drop out-interface=<public_if>
 add chain=forward dst-address=100.64.0.0/10 action=drop out-interface=<public_if>
```

服务提供商可能需要记录映射地址，在大规模 CGN 部署网络中，这可能成为问题。幸运的是，RFC 7422 提出了一种管理 CGN 转换的方法，可显著减少所需的日志量，同时为滥用响应提供可追溯性。

RFC 指出，CGN 可以不记录每个连接，而是以确定性的方式将客户私网地址（在 CGN 的面向客户接口上接收，也称为内侧）映射到扩展了端口范围的公网地址。

这意味着必须添加单独的 NAT 规则，以实现如下示例中所示的单个映射：

|  |  |
| :-- | :-- |
| **内部 IP** | **外部 IP / 端口范围** |
| 100.64.0.1 | 2.2.2.2:5000-5199 |
| 100.64.0.2 | 2.2.2.2:5200-5399 |
| 100.64.0.3 | 2.2.2.2:5400-5599 |
| 100.64.0.4 | 2.2.2.2:5600-5799 |
| 100.64.0.5 | 2.2.2.2:5800-5999 |

建议不要手动编写规则，而是使用脚本。以下示例可根据你的部署需求进行调整。

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

# All client chain jump
/ip/firewall/nat/add chain=srcnat action=jump jump-target=clients \
    src-address="$StartingAddress-$($StartingAddress + ($ClientCount * $AddressesPerClient) - 1)"

:local currentPort $StartingPort

:for c from=1 to=$ClientCount do={
    # Specific client chain jumps
    :if ($AddressesPerClient > 1) do={
      /ip/firewall/nat/add chain=clients action=jump jump-target="client-$c" \
      src-address="$($StartingAddress + ($AddressesPerClient * ($c - 1)))-$($StartingAddress + ($AddressesPerClient * $c -1))"
    } else={
      /ip/firewall/nat/add chain=clients action=jump jump-target="client-$c" \
      src-address="$($StartingAddress + ($AddressesPerClient * ($c - 1)))"
    }

    # Translation rules
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

可以调整六个本地值，脚本既可以直接粘贴到终端中执行，也可以存储在系统脚本部分，以便以后需要重新生成配置。

执行后，你应得到一组规则：

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

发卡网络地址转换（*NAT Loopback*）是指 LAN 中的设备通过网关路由器的公网 IP 地址访问 LAN 中的另一台设备。

![](/img/6cea619bfc3c118c.webp)

在上面的示例中，网关路由器具有以下 `dst-nat` 配置规则：

```ros
/ip/firewall/nat/add chain=dstnat action=dst-nat dst-address=172.16.16.1 dst-port=443 to-addresses=10.0.0.3 to-ports=443 protocol=tcp
```

当家庭 PC 上的用户与 Web 服务器建立连接时，路由器会按配置执行 DST NAT：

1. 客户端发送数据包，源 IP 地址为 192.168.88.1，目标 IP 地址为 172.16.16.1，端口为 443，用于请求某些 Web 资源。
2. 路由器对该数据包执行目标 NAT，将其转换到 10.0.0.3，并相应替换数据包中的目标 IP 地址。源 IP 地址保持不变：192.168.88.1。
3. 服务器回复客户端的请求，回复数据包的源 IP 地址为 10.0.0.3，目标 IP 地址为 192.168.88.1。
4. 路由器判断该数据包属于之前的连接，撤销目标 NAT，并将原始目标 IP 地址放入源 IP 地址字段。目标 IP 地址为 192.168.88.1，源 IP 地址为 172.16.16.1。
5. 客户端收到预期的回复数据包，连接建立。

![](/img/8e40bd6d38f0e7d5.webp)

但是，当与 Web 服务器位于同一网络的客户端请求连接到 Web 服务器的**公网** IP 地址时，会出现**问题**：

1. 客户端发送数据包，源 IP 地址为 10.0.0.2，目标 IP 地址为 172.16.16.1，端口为 443，用于请求某些 Web 资源。
2. 路由器对该数据包执行目标 NAT，将其转换到 10.0.0.3，并相应替换数据包中的目标 IP 地址。源 IP 地址保持不变：10.0.0.2。
3. 服务器回复客户端的请求。但是，请求的源 IP 地址与 Web 服务器位于同一子网。Web 服务器不会将回复发送回路由器，而是直接发送回 10.0.0.2，回复中的源 IP 地址为 10.0.0.3。
4. 客户端收到回复数据包，但会丢弃它，因为它期望收到来自 172.16.16.1 的数据包，而不是来自 10.0.0.3 的数据包。

要解决此问题，请按如下方式配置新的 *src-nat* 规则（发卡 NAT 规则）：

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat dst-address=10.0.0.3 out-interface=LAN protocol=tcp src-address=10.0.0.0/24
```

配置上述规则后：

1. 客户端发送一个数据包，源 IP 地址为 10.0.0.2，目标 IP 地址为 172.16.16.1，端口为 443，用于请求 Web 资源。
2. 路由器对数据包执行目标 NAT，将其目标 NAT 到 10.0.0.3，并相应替换数据包中的目标 IP 地址。它还会对数据包执行源 NAT，并将数据包中的源 IP 地址替换为其 LAN 接口上的 IP 地址。目标 IP 地址为 10.0.0.3，源 IP 地址为 10.0.0.1。
3. Web 服务器回复该请求，并将回复数据包以源 IP 地址 10.0.0.3 发送回路由器的 LAN 接口 IP 地址 10.0.0.1。
4. 路由器确定该数据包属于之前的连接，撤销源 NAT 和目标 NAT，并将原始目标 IP 地址 172.16.16.1 放入源 IP 地址字段，将原始源 IP 地址 10.0.0.2 放入目标 IP 地址字段。

### Endpoint-Independent NAT

Endpoint-independent NAT 会在源 NAT 中创建映射，并对具有相同源 IP 和端口的所有后续数据包使用同一映射。该映射通过以下规则创建：

```ros
/ip/firewall/nat
add action=endpoint-independent-nat chain=srcnat out-interface=WAN protocol=udp
```

该映射允许运行 source-independent filtering，从而允许将从 WAN 发往已映射内部 IP 和端口的数据包从任意源转发。以下规则启用过滤：

```ros
/ip/firewall/nat
add action=endpoint-independent-nat chain=dstnat in-interface=WAN protocol=udp
```

:::danger
Endpoint-independent NAT 仅适用于 UDP 协议。
:::

此外，endpoint-independent-nat 还可以使用其他几个参数：

- `randomize-port` - 随机化连接将映射到的公网端口。

详情请参阅 [RFC 5128](https://www.ietf.org/rfc/rfc5128.txt) 第 2.2.3 节和第 2.2.5 节

## NAT 辅助功能 {#nat-helpers}

NAT 路由器后的主机不具备真正的端到端连接。因此，某些 Internet 协议在 NAT 场景中可能无法工作。为克服这些限制，RouterOS 包含多种 NAT 辅助功能，可帮助各类协议实现 NAT 穿越。

可从 `/ip/firewall/service-ports` 菜单管理 NAT 辅助功能。

可用 NAT 辅助功能列表：

| Helper | Description |
| :-- | :-- |
| **FTP** | FTP 服务辅助功能 |
| **H323** | H323 服务辅助功能 |
| **IRC** | IRC 服务辅助功能 |
| **PPTP** | PPTP（GRE）隧道辅助功能 |
| **UDPLITE** | UDP-Lite 服务辅助功能 |
| **DCCP** | DCCP 服务辅助功能 |
| **SCTP** | SCTP 服务辅助功能 |
| **SIP** | SIP 辅助功能。其他选项：`sip-direct-media` 允许将 RTP 媒体流重定向为从主叫方直接发送到被叫方。默认值为 `yes`。`sip-timeout` 用于调整 SIP UDP 连接的 TTL。默认值：1 小时。在某些配置中，必须减小该值。 |
| **TFTP** | TFTP 服务辅助功能 |
| **RTSP** | RTSP 服务辅助功能 |

:::warning
如果未启用连接跟踪，则防火墙服务端口将显示为非活动状态

**警告：** **udplite**、**dccp** 和 **sctp** 是连接跟踪的内置服务。由于它们不是单独加载的模块，因此无法单独禁用；它们会随连接跟踪一起禁用。
:::
