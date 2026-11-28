---
title: "每连接分类器"
description: "MikroTik RouterOS 中的 Per connection classifier（PCC）使用源/目标地址和端口等 IP 报头字段将流量划分为多个流，并通过哈希实现负载均衡，从而将连接分发到不同链路。"
tags:
  - 'per-connection-classifier'
  - 'packet-matching'
  - 'hashing'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/load-balancing/per-connection-classifier
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

PCC matcher 可将流量划分为多个相等的流，并能够将具有特定选项组合的数据包保持在某个特定的流中（可以从 src-address、src-port、dst-address、dst-port 中指定该选项组合）。

### Theory

PCC 从 IP 报头中选取指定字段，并通过哈希算法将所选字段转换为 32 位值。然后将该值除以指定的 *Denominator*，并将余数与指定的 *Remainder* 进行比较，如果相等，则捕获该数据包。可以从报头中选择 src-address、dst-address、src-port、dst-port 用于此操作。

:::danger
PCC 不是有效方法，在 Hotspot（captive portal）场景中不适用，因为 Hotspot 使用 web-proxy，并且当前仅使用默认路由表。
:::

```ros
per-connection-classifier=
PerConnectionClassifier ::= [!]ValuesToHash:Denominator/Remainder
  Remainder ::= 0..4294967295    (integer number)
  Denominator ::= 1..4294967295    (integer number)
  ValuesToHash ::= both-addresses|both-ports|dst-address-and-port|
  src-address|src-port|both-addresses-and-ports|dst-address|dst-port|src-address-and-port 
```

### 示例 {#example}

此配置将基于源地址和端口将所有连接分为 3 组

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
 new-connection-mark=1st_conn per-connection-classifier=src-address-and-port:3/0
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=2nd_conn per-connection-classifier=src-address-and-port:3/1
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=3rd_conn per-connection-classifier=src-address-and-port:3/2
```

### PCC 的工作原理 {#how-pcc-works}

本文旨在用简单术语解释 PCC 的工作原理。官方手册 wiki 页面中的定义为：“PCC takes selected fields from the IP header, and with the help of a hashing algorithm converts selected fields into a 32-bit value. This value then is divided by a specified Denominator and the remainder then is compared to a specified Remainder, if equal then the packet will be captured. You can choose from src-address, dst-address, src-port, dst-port from the header to use in this operation.”，可用字段的完整列表为：“both-addresses|both-ports|dst-address-and-port|src-address|src-port|both-addresses-and-ports|dst-address|dst-port|src-address-and-port”。如果你理解该定义，那么本文中就没有什么有趣的内容了。

首先，以下是理解该定义所需的术语。

IP 数据包有一个包含多个字段的头部。其中两个字段是数据包的源 IP 地址和数据包的目的 IP 地址。TCP 和 UDP 数据包的头部还包含源端口和目的端口。

除数和余数是取模运算的组成部分。取模运算会在两个数相除时产生剩余的整数，并且只接受结果的整数部分。它用 % 符号表示。以下是一些示例：3 % 3 = 0，因为 3 可以被 3 整除。4 % 3 = 1，因为 4 之前能被 3 整除的最近较小数是 3，而 4 - 3 = 1。5 % 3 是 2，因为 5 之前能被 3 整除的最近较小数是 3，而 5 - 3 = 2。6 % 3 = 0，因为 6 可以被 3 整除。

哈希是一种接收输入并产生输出的函数。哈希具有许多有趣的属性，但对本文而言唯一重要的属性是哈希函数是确定性的。这意味着，当你向哈希函数输入“hello”并得到输出“1”时，可以确信如果再次输入“hello”，它仍会产生输出“1”。当你向哈希函数输入相同内容时，它始终会产生相同输出。PCC 使用的具体哈希算法并不重要，因此在本讨论中假设，当你向它输入 IP 地址和端口时，它只是将 IP 地址的八位字节按十进制数与端口相加，然后取最后一位作为输出。以下是一个示例：

哈希函数接收 1.1.1.1 作为源 IP 地址，10000 作为源 TCP 端口，2.2.2.2 作为目的 IP 地址，80 作为目的 TCP 端口。输出将为 1+1+1+1+10000+2+2+2+2+80 = 10092。其最后一位是 2，因此哈希输出为 2。每次输入这组 IP 地址和端口组合时，它都会产生 2。

此时需要重点说明：尽管 PCC 最常用于在多条线路之间分摊负载，但 PCC 本身与路由、路由标记或负载分摊完全没有关系。PCC 只是一种匹配数据包的方式，并不直接涉及随后标记这些已匹配数据包的动作，即使这是它的主要用途。

以下是常用于 PCC 的三行配置及其说明：

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
 new-connection-mark=1st_conn per-connection-classifier=src-address-and-port:3/0
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=2nd_conn per-connection-classifier=src-address-and-port:3/1
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=3rd_conn per-connection-classifier=src-address-and-port:3/2
```

以下是不同字段选项在数据包匹配中的含义，这些字段将被送入哈希算法（并且，就跨链路分摊负载而言，决定数据包将被放到哪条链路上）。请记住，哈希函数在输入相同数据时始终会产生相同输出：

- src-address：客户端的源地址始终相同，因此来自特定客户端的所有流量始终匹配同一个 PCC matcher，并始终被放到同一条链路上。
- dst-address：特定服务器的目的地址始终相同，因此发往该服务器的所有流量（例如 Mikrotik Wiki）始终匹配同一个 PCC matcher，并始终被放到同一条链路上。
- both-addresses：同一客户端和服务器之间的源 IP 与目的 IP 组合始终相同，因此一个特定客户端与特定服务器之间的所有流量（例如你的笔记本电脑和 Mikrotik Wiki）始终匹配同一个 PCC matcher，并始终被放到同一条链路上。
- src-port：客户端的源端口通常在创建连接时随机选择，因此在多个连接中，不同的源端口会被送入哈希函数，不同的 PCC matcher 会匹配成功，流量会经过不同链路。不过，某些客户端协议始终选择相同的源端口，而路由器后面的服务器很可能始终使用相同的服务端口将流量发回其客户端。路由器后面的 Web 服务器会从其 HTTP（80）和 HTTPS（443）端口发送大部分流量，这些流量始终匹配同一个 PCC matcher，并被放到同一条链路上。
- dst-port：客户端的目的端口通常是明确定义的服务端口，客户端与 Internet 上服务器之间的所有 HTTP（80）流量始终匹配同一个 PCC matcher，并被放到同一条链路上。不过，同一客户端产生的 HTTPS（443）流量可能匹配不同的 PCC matcher，并经过不同的链路。
- both-ports：由于客户端端口（通常）是随机选择的，两个端口的组合（通常）也是随机的，因此会在各链路之间分摊负载。
- src-address-and-port：与 src-port 有相同的注意事项。
- dst-address-and-port：与 dst-port 有相同的注意事项。
- both-addresses-and-ports：这是跨链路分摊流量最随机的方式，因为它的变量数量最多。

需要注意的是，尽管本文中讨论的哈希函数经过了极大简化，并非实际使用的函数，但它很好地展示了哈希函数的另一个特性：两个完全不同的输入可以产生相同的输出。在我们的示例中，3 % 3 = 0，6 % 3 = 0；输入 3 和输入 6 时都会得到 0。实际用于 PCC 的函数也是如此，即使我不知道它具体是什么，但根据定义可知它会产生一个 32 位值作为输出。IP 地址为 32 位，端口为 16 位，因此假设使用 both-addresses-and-ports，我们会向它输入 32+32+16+16 = 96 位数据，但只会得到 32 位输出，所以它必然会对不同输入产生相同输出。这意味着两个完全无关的连接可能匹配同一个 PCC matcher，并被放到同一条线路上。通过 PCC 分摊的连接越多，PCC 的效果越好，因为哈希函数有更多机会产生不同输出。

### 配置示例 {#configuration-example}

假设采用以下配置：

![](/img/a70a4d47aaab6e28.webp)

### IP 地址 {#ip-addresses}

```ros
/ip/address
add address=10.10.4.100/24 interface=ether_ISP1 network=10.10.4.0
add address=10.10.5.100/24 interface=ether_ISP2 network=10.10.5.0
add address=192.168.100.1/24 interface=ether_LAN network=192.168.100.0
```

路由器有两个上游（ISP）接口，地址分别为 10.10.4.100/24 和 10.10.5.100/24。LAN 接口的 IP 地址为 192.168.100.1/24。

我们正在添加两个新的 Routing tables，后续将使用它们：

```ros
/routing/table
add disabled=no fib name=ISP1_table
add disabled=no fib name=ISP2_table
```

### 策略路由 {#policy-routing}

```ros
/ip/firewall/mangle
add action=accept chain=prerouting dst-address=10.10.4.0/24 in-interface=ether_LAN
add action=accept chain=prerouting dst-address=10.10.5.0/24 in-interface=ether_LAN
```

使用策略路由可以强制所有流量经由指定网关，即使流量的目的主机是来自已连接网络中除该网关之外的主机也是如此。这样会产生路由环路，并且无法与这些主机通信。为避免这种情况，需要允许发往已连接网络的流量使用默认路由表。

```ros
add action=mark-connection chain=input connection-state=new in-interface=ether_ISP1 new-connection-mark=ISP1
add action=mark-connection chain=input connection-state=new in-interface=ether_ISP2 new-connection-mark=ISP2

add action=mark-connection chain=output connection-mark=no-mark connection-state=new new-connection-mark=ISP1 per-connection-classifier=both-addresses:2/0
add action=mark-connection chain=output connection-mark=no-mark connection-state=new new-connection-mark=ISP2 per-connection-classifier=both-addresses:2/1
```

首先需要管理从外部发起的连接：回复必须通过请求进入的同一接口（使用同一 Public IP）发出。我们将标记所有新的入站连接，以记录请求进入的接口。

```ros
add action=mark-connection chain=prerouting connection-mark=no-mark connection-state=new dst-address-type=!local in-interface=ether_LAN new-connection-mark=ISP1 per-connection-classifier=both-addresses:2/0
add action=mark-connection chain=prerouting connection-mark=no-mark connection-state=new dst-address-type=!local in-interface=ether_LAN new-connection-mark=ISP2 per-connection-classifier=both-addresses:2/1
```

Action mark-routing 只能在 mangle chain output 和 prerouting 中使用，但 mangle chain prerouting 会捕获所有发往路由器自身的流量。为避免这种情况，我们将使用 dst-address-type=!local。并借助新的 PCC 根据源地址和目标地址将流量分为两组。

```ros
add action=mark-routing chain=output connection-mark=ISP1 new-routing-mark=ISP1_table
add action=mark-routing chain=prerouting connection-mark=ISP1 in-interface=ether_LAN new-routing-mark=ISP1_table

add action=mark-routing chain=output connection-mark=ISP2 new-routing-mark=ISP2_table
add action=mark-routing chain=prerouting connection-mark=ISP2 in-interface=ether_LAN new-routing-mark=ISP2_table
```

然后需要使用正确的标记标记这些连接中的所有数据包。由于只有发往互联网的流量才需要策略路由，请不要忘记指定 in-interface 选项。

```ros
/ip/route
add check-gateway=ping disabled=no dst-address=0.0.0.0/0 gateway=10.10.4.1 routing-table=ISP1_table suppress-hw-offload=no
add check-gateway=ping disabled=no dst-address=0.0.0.0/0 gateway=10.10.5.1 routing-table=ISP2_table suppress-hw-offload=no
```

为每个 routing-mark 创建一条路由。

```ros
add distance=1 dst-address=0.0.0.0/0 gateway=10.10.4.1
add distance=2 dst-address=0.0.0.0/0 gateway=10.10.5.1
```

要启用故障转移，必须有在其他路由因网关故障而变为非活动状态时立即接管的路由。（只有当 `check-gateway` 选项启用时才会发生这种情况）

### NAT

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=ether_ISP1
add action=masquerade chain=srcnat out-interface=ether_ISP2
```

由于路由决策已经完成，我们只需要修正所有出站数据包的 `src-address` 的规则。如果数据包通过 `ether_ISP1` 发出，则将其 NAT 为 `10.10.4.100`；如果通过 `ether_ISP2` 发出，则将其 NAT 为 `10.10.5.100`。
