---
sidebar_key: "network-management/dhcp/dhcpv6-client"
sidebar_position: 4
title: "DHCPv6 客户端"
sidebar_label: "DHCPv6 客户端"
description: "RouterOS DHCPv6 客户端从 DHCPv6 服务器请求 IPv6 地址和委派前缀（DHCPv6-PD），将收到的前缀添加到 IPv6 地址池，并可在状态变化时运行脚本。"
tags:
  - 'dhcpv6'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/network-management/dhcp/dhcpv6-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ipv6/dhcp-client`

DHCPv6 客户端从 DHCPv6 服务器请求 IPv6 配置。它通常用于面向 ISP 的接口上，以接收用于本地网络的委派前缀。`request` 属性选择客户端请求的内容，一个客户端可以请求以下多项：

- `prefix`：委派前缀（DHCPv6-PD）。客户端会将收到的前缀添加到动态 IPv6 池（`pool-name`）中，你可以从该池为本地接口分配地址并向主机通告这些地址。池的生存期跟随委派前缀，并在客户端每次续租时延长。
- `address`：一个 IPv6 地址，客户端会将其作为动态 /128 地址添加到自己的接口上。
- `info`：仅其他设置，例如 DNS 服务器，不包含地址或前缀。

收到的 DNS 服务器由路由器的 DNS 解析器（`use-peer-dns`）使用。DHCPv6 不提供默认网关，但客户端可以通过 `add-default-route` 添加一条指向 DHCPv6 服务器的默认路由。

客户端使用路由器的 DUID（路由器的 DHCPv6 服务器也会使用该 DUID）以及基于客户端所运行接口的身份关联标识符（IAID）来标识自身。关于 DHCPv6 与 IPv4 的 DHCP 有何不同，请参阅 [DHCP 概念](./index.md)。

## 配置示例 {#configuration-examples}

### 简单的 DHCPv6 客户端 {#simple-dhcpv6-client}

本示例请求一个前缀，并将其添加到一个分发 /64 前缀的 IPv6 池中：

```ros
/ipv6/dhcp-client/add request=prefix pool-name=test-ipv6 pool-prefix-length=64 interface=ether13
```

当客户端处于 bound 状态时，会显示收到的前缀以及直到其过期的时间：

```ros
[admin@MikroTik] > /ipv6/dhcp-client/print
Columns: INTERFACE, STATUS, REQUEST, PREFIX
# INTERFACE  STATUS  REQUEST  PREFIX
0 ether13    bound   prefix   2001:db8:7501:ff04::/62, 2d23h11m53s
```

该前缀也会被添加到动态池中，并带有该前缀的生存期：

```ros
[admin@MikroTik] > /ipv6/pool/print
Flags: D - DYNAMIC
Columns: NAME, PREFIX, PREFIX-LENGTH, ACTUAL-PREFIX, VALID-LIFETIME, PREFERRED-LIFETIME
#   NAME       PREFIX                   PREFIX-LENGTH  ACTUAL-PREFIX            VALID-LIFETIME  PREFERRED-LIFETIME
0 D test-ipv6  2001:db8:7501:ff04::/62             64  2001:db8:7501:ff04::/62  2d23h11m53s     2d15h59m53s
```

现在你可以从该池为其他接口分配地址，如下例所示。

### 使用收到的前缀进行本地 RA {#use-received-prefix-for-local-ra}

考虑以下设置：

![R1 gets the prefix 2001:db8::/62 from the ISP gateway fe80::1:1 and delegates /64 prefixes to CE1 and CE2, which each use ::1/64 on their LAN](/img/443bb0b3b79cfaa3.webp)

- ISP 将前缀 2001:DB8::/62 路由到路由器 R1。
- 路由器 R1 运行 DHCPv6 服务器，以将 /64 前缀委派给客户路由器 CE1 和 CE2。
- 路由器 CE1 和 CE2 上的 DHCP 客户端从 DHCP 服务器（R1）接收委派的 /64 前缀。
- 客户端路由器使用接收到的前缀在本地接口上设置 RA。

**配置**

**R1**

```ros
/ipv6/route
add gateway=fe80::1:1%to-ISP

/ipv6/pool
add name=myPool prefix=2001:db8::/62 prefix-length=64

/ipv6/dhcp-server
add prefix-pool=myPool disabled=no interface=to-CE-routers lease-time=3m name=server1
```

**CE1**

```ros
/ipv6/dhcp-client
add interface=to-R1 request=prefix pool-name=my-ipv6

/ipv6/address
add address=::1/64 from-pool=my-ipv6 interface=to-clients advertise=yes
```

**CE2**

```ros
/ipv6/dhcp-client
add interface=to-R1 request=prefix pool-name=my-ipv6
/ipv6/address/add address=::1/64 from-pool=my-ipv6 interface=to-clients advertise=yes
```

**检查状态**

检查每个 CE 路由器是否收到了自己的前缀。

在服务器上：

```ros
[admin@R1] /ipv6/dhcp-server/binding> print
Flags: X - disabled, D - dynamic
 #   ADDRESS            DUID          IAID  SERVER   STATUS
 1 D 2001:db8:0:1::/64  0019d1393536   566  server1  bound
 2 D 2001:db8:0:2::/64  0019d1393535   565  server1  bound
```

在客户端上：

```ros
[admin@CE1] /ipv6/dhcp-client> print
Flags: D - dynamic, X - disabled, I - invalid
 #   INTERFACE  STATUS  REQUEST  PREFIX
 0   to-R1      bound   prefix   2001:db8:0:1::/64

[admin@CE1] /ipv6/dhcp-client> /ipv6/pool/print
Flags: D - dynamic
 #   NAME     PREFIX             PREFIX-LENGTH
 0 D my-ipv6  2001:db8:0:1::/64             64
```

来自池的地址会添加到 LAN 接口：

```ros
[admin@CE1] /ipv6/address> print
Flags: X - disabled, I - invalid, D - dynamic, G - global, L - link-local
 #    ADDRESS              FROM-POOL  INTERFACE   ADVERTISE
 0  G 2001:db8:0:1::1/64   my-ipv6    to-clients  yes
...
```

池使用情况显示某个地址使用了池的一部分：

```ros
[admin@CE1] /ipv6/pool/used> print
POOL     PREFIX             OWNER    INFO
my-ipv6  2001:db8:0:1::/64  Address  to-clients
```

## 属性 {#properties}

DHCPv6 客户端的所有属性、状态值和命令（包括脚本接收的变量）在 [`/ipv6/dhcp-client`](../../cli-reference/ipv6/dhcp-client/index.md) CLI 参考中进行了描述。以下行为需要进一步说明。

### 服务器发起的续租 {#server-initiated-renewal}

使用 `allow-reconfigure=yes` 时，客户端会接受来自 DHCPv6 服务器的 Reconfigure 消息，并在收到此类消息时立即续租。启用了 `use-reconfigure=yes` 的 RouterOS DHCPv6 服务器会在其设置（例如租期）发生变化时自行发送此类消息，因此客户端无需等待续租时间即可获取更改。

## IAID {#iaid}

要确定将使用什么 IAID，请将运行 DHCP 客户端的接口的内部 ID 从十六进制转换为十进制。

例如，DHCP 客户端运行在接口 PPPoE-out1 上。要获取内部 ID，请使用以下命令：

```ros
[admin@t36] /interface> :put [find name="pppoe-out1"] 
*15
```

现在将十六进制值 15 转换为十进制，即可得到 IAID=21。要使用不同的 IAID，请为地址设置 `custom-iana-id`，为前缀设置 `custom-iapd-id`。
