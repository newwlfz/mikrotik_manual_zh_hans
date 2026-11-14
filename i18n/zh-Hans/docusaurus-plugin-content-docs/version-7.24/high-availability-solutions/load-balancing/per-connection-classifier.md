---
sidebar_key: "high-availability-solutions/load-balancing/per-connection-classifier"
sidebar_position: 2
title: "每连接分类器"
sidebar_label: "每连接分类器"
description: "MikroTik RouterOS 中的每连接分类器（PCC）使用源/目标地址和端口等 IP 报头字段将流量划分为流，并通过哈希进行负载均衡，从而将连接分布到各链路上。"
tags:
  - 'per-connection-classifier'
  - 'packet-matching'
  - 'hashing'
source: https://manual.mikrotik.com/docs/7.24/high-availability-solutions/load-balancing/per-connection-classifier
captured_at: '2026-11-04T11:29:50+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

PCC 匹配器允许你将流量划分为均等的流，并能够将具有特定选项集的报文保留在同一个特定流中（你可以从 src-address、src-port、dst-address、dst-port 中指定这组选项）

### 理论 {#theory}

PCC 从 IP 头中提取选定字段，并在哈希算法的帮助下将选定字段转换为一个 32 位值。然后将该值除以指定的 *Denominator*，再把余数与指定的 *Remainder* 进行比较；如果相等，则捕获该报文。你可以从头部中选择 src-address、dst-address、src-port、dst-port 用于此操作。

:::danger
在 Hotspot（强制门户）场景下，PCC 不是有效方法——因为目前 Hotspot 使用 web-proxy，而且它只使用默认路由表。

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

此配置将根据源地址和端口把所有连接分为 3 组

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
 new-connection-mark=1st_conn per-connection-classifier=src-address-and-port:3/0
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=2nd_conn per-connection-classifier=src-address-and-port:3/1
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=3rd_conn per-connection-classifier=src-address-and-port:3/2
```

### PCC 的工作原理 {#how-pcc-works}

本文旨在用简单的语言解释 PCC 如何工作。官方手册 wiki 页面中的定义写道：“PCC 从 IP 头中提取选定字段，并在哈希算法的帮助下将选定字段转换为一个 32 位值。然后将该值除以指定的 Denominator，再把余数与指定的 Remainder 进行比较；如果相等，则捕获该报文。你可以从头部中选择 src-address、dst-address、src-port、dst-port 用于此操作。”，可用字段的完整列表为：“both-addresses|both-ports|dst-address-and-port|src-address|src-port|both-addresses-and-ports|dst-address|dst-port|src-address-and-port”。如果你理解那个定义，这篇文章对你来说就没有什么有趣的内容。

首先，以下是理解该定义所必需的术语。

IP 报文有一个包含若干字段的头部。其中两个字段是报文的源 IP 地址和报文的目的 IP 地址。TCP 和 UDP 报文也有包含源端口和目的端口的头部。

分母和余数是取模运算的组成部分。取模运算会在你将两个数相除时产生剩下的整数，并且只取结果的整数部分。它用 % 符号表示。下面是一些例子：3 % 3 = 0，因为 3 能被 3 整除。4 % 3 = 1，因为 4 之前能被 3 整除的最大数是 3，且 4 - 3 = 1。5 % 3 是 2，因为 5 之前能被 3 整除的最大数是 3，且 5 - 3 = 2。6 % 3 = 0，因为 6 能被 3 整除。

哈希是一种接收输入并产生输出的函数。哈希具有许多有趣的特性，但本文唯一重要的是哈希函数具有确定性。这意味着，当你给哈希函数输入 'hello' 并得到输出 '1' 时，你可以相信，如果你再次输入 'hello'，它还会产生输出 '1'。当你给哈希函数相同的输入时，它总是会产生相同的输出。PCC 使用哪种确切的哈希算法并不重要，因此在本讨论中，我们假设当你给它输入 IP 地址和端口时，它只是把 IP 地址的各个八位组按十进制数相加，同时也加上端口，然后取最后一位数字作为输出。下面是一个例子：

给哈希函数输入 1.1.1.1 作为源 IP 地址、10000 作为源 TCP 端口、2.2.2.2 作为目的 IP 地址、80 作为目的 TCP 端口。输出将是 1+1+1+1+10000+2+2+2+2+80 = 10092。最后一位是 2，因此哈希输出为 2。每次给它输入这组 IP 地址和端口时，它都会产生 2。

此时需要注意，尽管 PCC 最常用于在多个线路之间分摊负载，但 PCC 本身与路由、路由标记或分摊负载完全无关。PCC 只是一种匹配报文的方式，并不直接与随后标记这些匹配报文的动作相关，即使那才是它的主要用途。

以下是常用于 PCC 的三行配置及其解释：

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
 new-connection-mark=1st_conn per-connection-classifier=src-address-and-port:3/0
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=2nd_conn per-connection-classifier=src-address-and-port:3/1
/ip/firewall/mangle/add chain=prerouting action=mark-connection \
  new-connection-mark=3rd_conn per-connection-classifier=src-address-and-port:3/2
```

下面说明不同字段选项在报文匹配中的含义；这些字段将被送入哈希算法（并且，就在多条链路之间分摊负载而言，会决定报文将被放到哪条链路上）。请记住，当给哈希函数相同的输入时，它总是会产生相同的输出：

- src-address：客户端的源地址始终相同，因此来自某个特定客户端的所有流量将始终匹配同一个 PCC 匹配器，并始终被放到同一条链路上。
- dst-address：特定服务器的目的地址始终相同，因此发往该服务器（例如 Mikrotik Wiki）的所有流量将始终匹配同一个 PCC 匹配器，并始终被放到同一条链路上。
- both-addresses：同一客户端与服务器之间的源 IP 和目的 IP 对始终相同，因此某个特定客户端与特定服务器（例如你的笔记本电脑和 Mikrotik Wiki）之间的所有流量将始终匹配同一个 PCC 匹配器，并始终被放到同一条链路上。
- src-port：客户端源端口通常在建立连接时随机选择，因此在许多连接中，不同的源端口会被送入哈希函数，不同的 PCC 匹配器会匹配，流量会走不同链路。但是，某些客户端协议总是选择相同的源端口，而你路由器后面的服务器很可能总是使用相同的服务端口向它们的客户端发送流量。你路由器后面的 Web 服务器会从其 HTTP (80) 和 HTTPS (443) 端口发送大部分流量，而这些流量将始终匹配同一个 PCC 匹配器，并被放到同一条链路上。
- dst-port：客户端的目的端口通常是定义明确的服务端口，你的客户端与 Internet 上的服务器之间的所有 HTTP (80) 流量将始终匹配同一个 PCC 匹配器，并被放到同一条链路上。但是，同一批客户端进行 HTTPS (443) 流量时可能匹配不同的 PCC 匹配器，并会走不同的链路。
- both-ports：由于客户端端口（通常）是随机选择的，两个端口的组合（通常）也是随机的，从而会在多条链路之间分摊负载。
- src-address-and-port：与 src-port 相同的注意事项。
- dst-address-and-port：与 dst-port 相同的注意事项。
- both-addresses-and-ports：这是在多条链路之间分摊流量最随机的方式，因为它包含的变量数量最多。

需要注意的是，尽管本文讨论的哈希函数经过大幅简化，并不是现实中使用的函数，但它很好地展示了哈希函数的另一个特性：两个完全不同的输入可能产生相同的输出。在我们的例子中，3 % 3 = 0，且 6 % 3 = 0；当我们给它输入 3 时得到 0，给它输入 6 时也得到 0。PCC 实际使用的函数也是如此，尽管我不知道它具体是什么，但从定义可知它会输出一个 32 位值。IP 地址是 32 位，端口是 16 位，因此假设我们使用 both-addresses-and-ports，我们给它输入 32+32+16+16 = 96 位，却只收到 32 位输出，所以它必然会对不同输入产生相同输出。这意味着两个完全无关的连接可能匹配同一个 PCC 匹配器，并被放到同一条线路上。你让经过 PCC 的连接越多，哈希函数就越有机会产生不同输出，PCC 的效果也就越好。

### 配置示例 {#configuration-example}

假设使用以下配置：

![](/img/a70a4d47aaab6e28.webp)

### IP 地址 {#ip-addresses}

```ros
/ip/address
add address=10.10.4.100/24 interface=ether_ISP1 network=10.10.4.0
add address=10.10.5.100/24 interface=ether_ISP2 network=10.10.5.0
add address=192.168.100.1/24 interface=ether_LAN network=192.168.100.0
```

路由器有两个上游（ISP）接口，地址分别为 10.10.4.100/24 和 10.10.5.100/24。LAN 接口的 IP 地址为 192.168.100.1/24。

我们添加两个新的路由表，稍后将使用它们：

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

通过策略路由，可以强制所有流量发往特定网关，即使流量是从直连网络发往该网关以外的主机。这样会产生路由环路，并且将无法与这些主机通信。为避免这种情况，我们需要允许发往连接网络的流量使用默认路由表。

```ros
add action=mark-connection chain=input connection-state=new in-interface=ether_ISP1 new-connection-mark=ISP1
add action=mark-connection chain=input connection-state=new in-interface=ether_ISP2 new-connection-mark=ISP2

add action=mark-connection chain=output connection-mark=no-mark connection-state=new new-connection-mark=ISP1 per-connection-classifier=both-addresses:2/0
add action=mark-connection chain=output connection-mark=no-mark connection-state=new new-connection-mark=ISP2 per-connection-classifier=both-addresses:2/1
```

首先，必须管理从外部发起的连接——回复必须通过请求进入时所用的同一接口（使用同一公网 IP）离开。我们将标记所有新的传入连接，以记住使用的是哪个接口。

```ros
add action=mark-connection chain=prerouting connection-mark=no-mark connection-state=new dst-address-type=!local in-interface=ether_LAN new-connection-mark=ISP1 per-connection-classifier=both-addresses:2/0
add action=mark-connection chain=prerouting connection-mark=no-mark connection-state=new dst-address-type=!local in-interface=ether_LAN new-connection-mark=ISP2 per-connection-classifier=both-addresses:2/1
```

mark-routing 动作只能在 mangle 的 output 和 prerouting 链中使用，但 mangle 的 prerouting 链会捕获所有发往路由器本身的流量。为避免这种情况，我们将使用 dst-address-type=!local。并且借助新的 PCC，我们将根据源地址和目的地址把流量分为两组。

```ros
add action=mark-routing chain=output connection-mark=ISP1 new-routing-mark=ISP1_table
add action=mark-routing chain=prerouting connection-mark=ISP1 in-interface=ether_LAN new-routing-mark=ISP1_table

add action=mark-routing chain=output connection-mark=ISP2 new-routing-mark=ISP2_table
add action=mark-routing chain=prerouting connection-mark=ISP2 in-interface=ether_LAN new-routing-mark=ISP2_table
```

然后，我们需要用适当的标记来标记来自这些连接的所有报文。由于只有发往 Internet 的流量才需要策略路由，请不要忘记指定 in-interface 选项。

```ros
/ip/route
add check-gateway=ping disabled=no dst-address=0.0.0.0/0 gateway=10.10.4.1 routing-table=ISP1_table suppress-hw-offload=no
add check-gateway=ping disabled=no dst-address=0.0.0.0/0 gateway=10.10.5.1 routing-table=ISP2_table suppress-hw-offload=no
```

为每个 routing-mark 创建一条路由

```ros
add distance=1 dst-address=0.0.0.0/0 gateway=10.10.4.1
add distance=2 dst-address=0.0.0.0/0 gateway=10.10.5.1
```

要启用故障转移，必须要有这样的路由：当其他路由因网关故障而变为非活动状态时，它们会立即接管。（并且只有在 check-gateway 选项处于活动状态时才会发生这种情况）

### NAT {#nat}

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=ether_ISP1
add action=masquerade chain=srcnat out-interface=ether_ISP2
```

由于路由决策已经完成，我们只需要规则来为所有出站报文修正源地址。如果该报文通过 ether\_ISP1 离开，它将被 NAT 为 10.10.4.100；如果通过 ether\_ISP2 离开，则被 NAT 为 10.10.5.100
