---
title: "DHCP 中继"
description: "DHCP relay 将客户端的 DHCP 和 DHCPv6 请求转发到另一个网络中的 DHCP 服务器，并支持可选的 relay agent information（option 82）和 VRF。"
tags:
  - 'dhcp'
  - 'dhcpv6'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/relay
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

DHCP relay 将一个网络中的 DHCP 客户端请求转发到另一个网络中的 DHCP 服务器，并将回复传送回客户端。当一个中央 DHCP 服务器为多个与其未直接连接的网络提供服务时，可使用该功能。有关 relay 和 DHCP 服务器如何协同工作，请参阅 [DHCP concepts](/docs/network-management/dhcp)。

## DHCPv4 中继 {#dhcpv4-relay}

**子菜单：** `/ip/dhcp-relay`

DHCP relay 在其接口上监听 DHCP 请求，并将每个请求转发到 `dhcp-server` 中列出的每个 DHCP 服务器；它不会从中选择一个。它会将 `local-address`，或在未设置 `local-address` 时将其接口的地址，写入转发请求的网关地址字段（`giaddr`）。DHCP 服务器会将回复发送到该地址，并使用该地址区分不同的 relay：将服务器的 `relay` 属性设置为 relay 的地址，如下例所示。新建的 relay 默认处于禁用状态，因此添加后需要启用它们。

所有 relay 属性均在 [`/ip/dhcp-relay`](/docs/cli-reference/ip/dhcp-relay) CLI 参考中说明。

### 中继代理信息（option 82） {#relay-agent-information-option-82}

使用 `add-relay-info=yes` 时，relay 会在其转发的请求中添加 relay agent information 选项（option 82）。circuit ID 是请求进入的 relay 接口的 MAC 地址，remote ID 是客户端的 MAC 地址，或 `relay-info-remote-id` 中设置的文本。

RouterOS DHCP 服务器会在租约中显示这些值（`active-agent-circuit-id`、`active-agent-remote-id`），并将它们传递给租约脚本。静态租约可以通过这些值匹配客户端（`agent-circuit-id`、`agent-remote-id`），即使其 MAC 地址不同；使用 `dynamic-lease-identifiers=opt-82` 时，服务器仅通过 option 82 识别客户端。

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

在 DHCP-Server 上，为每个中继网络添加一个 pool、一个 DHCP server 和一个 network。两个 server 都运行在面向中继的接口上；`relay` 属性使每个 server 仅响应从其网络转发过来的请求，该网络通过中继在该网络中的地址进行标识：

```ros
/ip/pool/add name=Local1-Pool ranges=192.168.1.11-192.168.1.100
/ip/pool/add name=Local2-Pool ranges=192.168.2.11-192.168.2.100
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.1.1 address-pool=Local1-Pool name=DHCP-1
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.2.1 address-pool=Local2-Pool name=DHCP-2
/ip/dhcp-server/network/add address=192.168.1.0/24 gateway=192.168.1.1 dns-server=159.148.60.20
/ip/dhcp-server/network/add address=192.168.2.0/24 gateway=192.168.2.1 dns-server=159.148.60.20
```

DHCP server 不需要到客户端网络的路由：它会将回复（包括发送给续租客户端的回复）发回请求来源的路由器。

#### DHCP relay 设置 {#dhcp-relay-setup}

在 DHCP-Relay 上，为每个本地接口添加一个 relay。新建的 relay 默认禁用，因此请使用 `disabled=no` 添加它们：

```ros
/ip/dhcp-relay/add name=Local1-Relay interface=Local1 dhcp-server=192.168.0.1 local-address=192.168.1.1 disabled=no
/ip/dhcp-relay/add name=Local2-Relay interface=Local2 dhcp-server=192.168.0.1 local-address=192.168.2.1 disabled=no
```

使用 `/ip/dhcp-relay/monitor` 查看中继转发了多少请求以及传递了多少回复。

### 使用 VRF 的 DHCP 中继 {#dhcp-relay-with-vrf}

当指向 DHCP 服务器的接口和中继的客户端接口位于不同 VRF 中时，将 `dhcp-server-vrf` 设置为服务器侧所在的 VRF。本示例使用前面的配置，DHCP-Relay 的每个接口都位于各自的 VRF 中：

```ros
/ip/vrf
add interfaces=To-DHCP-Server name=vrf_server
add interfaces=Local1 name=vrf1
add interfaces=Local2 name=vrf2
/ip/dhcp-relay/set [find] dhcp-server-vrf=vrf_server
```

服务器将其回复发送到中继的 `local-address`，该地址位于客户端 VRF 中，但回复会从 `vrf_server` 中的服务器侧接口到达。使用 dst-nat 规则将其重定向到中继的服务器侧地址：

```ros
/ip/firewall/nat
add action=dst-nat chain=dstnat dst-address=192.168.1.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=192.168.0.2
add action=dst-nat chain=dstnat dst-address=192.168.2.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=192.168.0.2
```

客户端通过单播消息向服务器续租，因此 VRF 之间还需要通往彼此网络的路由：

```ros
/ip/route
add dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server routing-table=vrf1
add dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server routing-table=vrf2
add dst-address=192.168.1.0/24 gateway=Local1@vrf1 routing-table=vrf_server
add dst-address=192.168.2.0/24 gateway=Local2@vrf2 routing-table=vrf_server
```

如果没有 dst-nat 规则，客户端无法获取地址；如果没有路由，客户端可以获取地址，但无法续租。

## DHCPv6 中继 {#dhcpv6-relay}

**子菜单：** `/ipv6/dhcp-relay`

DHCPv6 中继会将客户端在其接口上发送的 DHCPv6 消息转发到 `dhcp-server` 中列出的服务器。它将每条客户端消息封装在 Relay-Forward 消息中，该消息还携带客户端的链路本地地址、Interface-ID 选项，以及默认情况下的客户端链路层地址（选项 79，通过 `dhcp-options` 设置）。除非设置 `link-address`，否则 Relay-Forward 消息的链路地址字段为 `::`，例如，如果 DHCPv6 服务器应根据该地址识别客户端网络，则可将其设置为客户端网络的地址。服务器向中继回复，中继再将回复传回客户端。这样，一台 DHCPv6 服务器就可以为多个网络提供服务，而无需与每个网络直接连接。

中继在 UDP 端口 547 上接收客户端消息。如果路由器过滤入站流量，请在客户端侧接口上允许 UDP 端口 547：RouterOS 的默认防火墙配置会丢弃不在 `LAN` 接口列表中的接口上的该流量。服务器的回复会作为同一连接的一部分被接受。要路由客户端流量，路由器还需要启用 IPv6 转发，该功能默认启用。

所有中继属性均在 [`/ipv6/dhcp-relay`](/docs/cli-reference/ipv6/dhcp-relay) CLI 参考中说明。

### 到委派前缀的路由 {#routes-to-delegated-prefixes}

当中继路由器同时也是客户端的网关时，它需要到分配给客户端的前缀的路由。使用 `store-relayed-bindings=yes` 时，中继会从服务器的回复中读取绑定，将其列在 `/ipv6/dhcp-relay/routes` 中，并通过客户端添加到每个委派前缀的路由。
