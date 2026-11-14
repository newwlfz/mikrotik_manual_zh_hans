---
sidebar_key: "network-management/dhcp/relay"
sidebar_position: 3
title: "DHCP 中继"
sidebar_label: "DHCP 中继"
description: "DHCP 中继将来自客户端的 DHCP 和 DHCPv6 请求转发到另一个网络中的 DHCP 服务器，并可选提供中继代理信息（option 82）以及 VRF 支持。"
tags:
  - 'dhcp'
  - 'dhcpv6'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/relay
captured_at: '2026-11-04T11:21:01+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

DHCP 中继会把一个网络中 DHCP 客户端的请求转发到另一个网络中的 DHCP 服务器，并把回复送回客户端。当一台集中式 DHCP 服务器为多个与其没有直接连接的网络提供服务时，可使用它。关于中继和 DHCP 服务器如何协同工作，请参见 [DHCP 概念](./index.md)。

## DHCPv4 中继 {#dhcpv4-relay}

**子菜单：** `/ip/dhcp-relay`

DHCP 中继会在其接口上监听 DHCP 请求，并把每个请求转发给 `dhcp-server` 中列出的每一台 DHCP 服务器；它不会从中选择一台。它会把 `local-address`（未设置 `local-address` 时则为其接口的一个地址）写入所转发请求的网关地址字段（`giaddr`）。DHCP 服务器会把回复发送到该地址，并用它来区分中继：请把服务器的 `relay` 属性设置为中继的地址，如下例所示。新建中继默认处于禁用状态，因此添加后请启用它们。

所有中继属性都在 [`/ip/dhcp-relay`](../../cli-reference/ip/dhcp-relay/index.md) CLI 参考中说明。

### 中继代理信息（option 82） {#relay-agent-information-option-82}

当 `add-relay-info=yes` 时，中继会把中继代理信息选项（option 82）添加到它转发的请求中。电路 ID 是请求进入的中继接口的 MAC 地址，远程 ID 是客户端的 MAC 地址，或 `relay-info-remote-id` 中设置的文本。

RouterOS DHCP 服务器会在租约中显示这些值（`active-agent-circuit-id`、`active-agent-remote-id`），并将它们传递给租约脚本。静态租约可以用这些值（`agent-circuit-id`、`agent-remote-id`）来匹配客户端，即使客户端的 MAC 地址不同；当 `dynamic-lease-identifiers=opt-82` 时，服务器仅通过 option 82 识别客户端。

### 配置示例 {#configuration-example}

在此示例中，一台路由器 DHCP-Server 为两个网络 192.168.1.0/24 和 192.168.2.0/24 分配地址，这两个网络位于另一台路由器 DHCP-Relay 之后。

![DHCP-Server (public 10.1.0.2, local 192.168.0.1) connected to DHCP-Relay (192.168.0.2), which serves 192.168.1.0/24 on Local1 (192.168.1.1) and 192.168.2.0/24 on Local2 (192.168.2.1)](/img/84cd8b761999e3b8.webp)

这些路由器具有以下地址。在 DHCP-Server 上：

```ros
/ip/address/add address=192.168.0.1/24 interface=To-DHCP-Relay
/ip/address/add address=10.1.0.2/24 interface=Public
```

在 DHCP-Relay 上：

```ros
/ip/address/add address=192.168.0.2/24 interface=To-DHCP-Server
/ip/address/add address=192.168.1.1/24 interface=Local1
/ip/address/add address=192.168.2.1/24 interface=Local2
```

#### DHCP 服务器设置 {#dhcp-server-setup}

在 DHCP-Server 上，为每个被中继的网络添加一个池、一个 DHCP 服务器和一个网络。两个服务器都运行在朝向中继的接口上；`relay` 属性使每个服务器只应答从其网络（由该网络中中继的地址标识）中继来的请求：

```ros
/ip/pool/add name=Local1-Pool ranges=192.168.1.11-192.168.1.100
/ip/pool/add name=Local2-Pool ranges=192.168.2.11-192.168.2.100
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.1.1 address-pool=Local1-Pool name=DHCP-1
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.2.1 address-pool=Local2-Pool name=DHCP-2
/ip/dhcp-server/network/add address=192.168.1.0/24 gateway=192.168.1.1 dns-server=159.148.60.20
/ip/dhcp-server/network/add address=192.168.2.0/24 gateway=192.168.2.1 dns-server=159.148.60.20
```

DHCP 服务器不需要到客户端网络的路由：它会把回复（包括发给续租客户端的回复）发送回请求来源的路由器。

#### DHCP 中继设置 {#dhcp-relay-setup}

在 DHCP-Relay 上，在每个本地接口上添加一个中继。新建中继默认处于禁用状态，因此请使用 `disabled=no` 添加它们：

```ros
/ip/dhcp-relay/add name=Local1-Relay interface=Local1 dhcp-server=192.168.0.1 local-address=192.168.1.1 disabled=no
/ip/dhcp-relay/add name=Local2-Relay interface=Local2 dhcp-server=192.168.0.1 local-address=192.168.2.1 disabled=no
```

使用 `/ip/dhcp-relay/monitor` 查看某个中继转发了多少请求以及送达了多少回复。

### 使用 VRF 的 DHCP 中继 {#dhcp-relay-with-vrf}

当朝向 DHCP 服务器的接口与中继的客户端接口位于不同 VRF 时，请将 `dhcp-server-vrf` 设置为服务器侧的 VRF。此示例沿用之前的设置，并让 DHCP-Relay 的每个接口分别位于自己的 VRF 中：

```ros
/ip/vrf
add interfaces=To-DHCP-Server name=vrf_server
add interfaces=Local1 name=vrf1
add interfaces=Local2 name=vrf2
/ip/dhcp-relay/set [find] dhcp-server-vrf=vrf_server
```

服务器会把回复发送到中继的 `local-address`，该地址位于客户端 VRF 中，但回复会到达 `vrf_server` 中的服务器侧接口。请使用 dst-nat 规则将它们重定向到中继的服务器侧地址：

```ros
/ip/firewall/nat
add action=dst-nat chain=dstnat dst-address=192.168.1.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=192.168.0.2
add action=dst-nat chain=dstnat dst-address=192.168.2.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=192.168.0.2
```

客户端通过向服务器发送单播消息来续租，因此这些 VRF 还需要到彼此网络的路由：

```ros
/ip/route
add dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server routing-table=vrf1
add dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server routing-table=vrf2
add dst-address=192.168.1.0/24 gateway=Local1@vrf1 routing-table=vrf_server
add dst-address=192.168.2.0/24 gateway=Local2@vrf2 routing-table=vrf_server
```

如果没有 dst-nat 规则，客户端将无法获得地址；如果没有这些路由，客户端虽能获得地址，但无法续租。

## DHCPv6 中继 {#dhcpv6-relay}

**子菜单：** `/ipv6/dhcp-relay`

DHCPv6 中继会转发其接口上的客户端发送给 `dhcp-server` 中列出的服务器的 DHCPv6 消息。它会把每条客户端消息封装在 Relay-Forward 消息中，该消息还携带客户端的链路本地地址、Interface-ID 选项，以及默认情况下客户端的链路层地址（option 79，通过 `dhcp-options` 设置）。除非设置 `link-address`，否则 Relay-Forward 消息的链路地址字段为 `::`；例如，如果 DHCPv6 服务器应通过该地址识别客户端网络，则可将其设置为客户端网络的一个地址。服务器向中继应答，中继再把回复传回客户端。这样，一台 DHCPv6 服务器就能为多个网络提供服务，而无需与每个网络直接连接。

中继在 UDP 端口 547 上接收客户端消息。如果路由器会过滤入站流量，请在客户端侧接口上允许 UDP 端口 547：RouterOS 的默认防火墙配置会在不属于 `LAN` 接口列表的接口上丢弃该流量。服务器的回复会作为同一连接的一部分被接受。要路由客户端的流量，路由器还需要启用 IPv6 转发，该功能默认已启用。

所有中继属性都在 [`/ipv6/dhcp-relay`](../../cli-reference/ipv6/dhcp-relay/index.md) CLI 参考中说明。

### 通往委派前缀的路由 {#routes-to-delegated-prefixes}

当中继路由器同时是客户端的网关时，它需要到委派给客户端的前缀的路由。当 `store-relayed-bindings=yes` 时，中继会从服务器的回复中读取绑定，将它们列在 `/ipv6/dhcp-relay/routes` 中，并为每个委派前缀添加一条经由客户端的路由。
