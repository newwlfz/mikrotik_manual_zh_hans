---
sidebar_key: "getting-started/networking-fundamentals/ipv6-neighbor-discovery"
sidebar_position: 2
title: "IPv6 邻居发现"
sidebar_label: "IPv6 邻居发现"
description: "RouterOS 支持 IPv6 Neighbor Discovery 以及使用 RADVD 的无状态地址自动配置，并遵循 RFC 4861 和 4862。它使主机能够通过 Router Advertisements 自动配置 IPv6 地址，状态包括 tentative、preferred、deprecated 和 invalid。Neighbor Discovery 取代 IPv4 ARP 和其他协议，便于进行路由器发现。"
tags:
  - 'ipv6'
  - 'neighbor-discovery'
  - 'radvd'
source: https://manual.mikrotik.com/docs/7.24/getting-started/networking-fundamentals/ipv6-neighbor-discovery
captured_at: '2026-11-04T11:28:53+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 使用 Router Advertisement Daemon (RADVD) 支持 IPv6 邻居发现和无状态地址自动配置。

## 标准 {#standards}

- [`RFC 4861`](https://tools.ietf.org/html/rfc4861) - IPv6 的邻居发现。
- [`RFC 4862`](https://tools.ietf.org/html/rfc4862) - IPv6 无状态地址自动配置

## 节点描述 {#node-description}

节点是实现 IPv6 的设备。在 IPv6 网络中，节点分为两种类型：

- **路由器** - 转发并非明确发往自身的 IPv6 数据包的节点。
- **主机** - 任何不是路由器的节点。

路由器和主机是 RFC 4861 中定义的不同分类，但单个设备可以同时承担这两种角色：转发数据包（路由器）以及接收发往自身的流量（主机）。

## 无状态地址自动配置 {#stateless-address-autoconfiguration}

自动配置有几种类型：

- *无状态* - 地址配置通过接收 Router Advertisement 消息完成。这些消息包含无状态地址前缀，并要求主机未使用有状态地址配置协议。
- *有状态* - 地址配置通过使用有状态地址配置协议（DHCPv6）完成。如果 RA 消息不包含地址前缀，则使用有状态协议。
- *两者* - RA 消息包含无状态地址前缀，并要求主机使用有状态地址配置协议。

IPv6 可以在不使用 DHCP 等有状态配置协议的情况下自动配置自身（[示例](#stateless-autoconfiguration-example)）。

:::info
地址自动配置只能在支持多播的接口上执行。
:::

此过程称为无状态地址自动配置，因为路由器不管理状态。它是一种简单、稳健且有效的方法。

RouterOS 使用 RADVD 定期向同一链路上的所有节点通告有关该链路的信息。该信息由 ICMPv6“路由器通告”数据包承载，并包括以下字段：

- IPv6 子网前缀。
- 默认路由器的链路本地地址。
- 其他可能为可选的参数包括：链路 MTU、默认跳数限制和路由器生存时间。

主机使用该通告来配置全局 IPv6 地址和默认路由器。全局 IPv6 地址由通告的[子网前缀](./ipv6-addresses.md)和 EUI-64 [接口标识符](./ipv6-addresses.md#interface-identifier)生成。

你可以通过发送 ICMPv6 路由器请求数据包来请求通告。在 Linux 上，**rtsol** 实用程序会发送路由器请求。移动节点应定期发送路由器请求。

### 地址状态 {#address-states}

当分配自动配置地址时，该地址可能处于以下状态之一：

- ***`tentative`*** - 在此状态下，主机会验证该地址是否唯一。验证通过重复地址检测进行。
- ***`preferred`*** - 在该状态下，地址已验证为唯一，节点可以向首选地址发送单播流量以及从首选地址接收单播流量。preferred 状态的持续时间包含在 RA 消息中。
- ***`deprecated`*** - 地址仍然有效，但不用于新连接。
- ***`invalid`*** - 节点不能再发送或接收单播流量。地址在有效生存时间到期后进入 invalid 状态。

下图说明了状态与生存时间之间的关系。

![](/img/f174ee1f2d356362.png)

## 邻居发现 {#neighbor-discovery}

邻居发现 (ND) 使用消息和过程来确定相邻节点之间的关系。与 IPv4 相比，ND 取代了 Address Resolution Protocol (ARP)、ICMP Router Discovery 和 ICMP Redirect，同时提供额外功能。

主机使用 ND 来：

- 发现相邻路由器。
- 发现地址、地址前缀和其他配置参数。

路由器使用 ND 来：

- 通告自身的存在、主机配置参数和链路上前缀。
- 告知主机针对特定目标的更优下一跳地址。

节点使用 ND 来：

- 解析正在转发 IPv6 数据包的相邻节点的链路层地址，并确定该地址何时发生变化。
- 确定能否向邻居发送 IPv6 数据包以及从邻居接收 IPv6 数据包。

RFC 4861 定义了五种 ND 消息类型：Router Solicitation (RS)、Router Advertisement (RA)、Neighbor Solicitation (NS)、Neighbor Advertisement (NA) 和 Redirect。将接口添加到 `/ipv6/nd` 只会激活路由器侧的消息：

- Router Solicitation (RS) – 路由器监听主机发送的 RS，并以 Router Advertisement 回复。
- Router Advertisement (RA) – 路由器定期发送未经请求的 RA，并响应它收到的任何 RS。RA 的内容（前缀、标志位图、生存时间、MTU、计时器值）取自每个接口的 ND 设置以及任何 `/ipv6/nd/prefix` 条目。
- Neighbor Solicitation (NS) – 当路由器收到针对该接口上其自身任意地址（link-local、SLAAC 或 static）的 NS 时，会用 Neighbor Advertisement 回复。这也涵盖路由器自身地址的 Duplicate Address Detection (DAD)。
- Neighbor Advertisement (NA) – 响应 NS 时发送（如上所述）。除非明确启用，否则不会发送未经请求的 NA。

终端设备之间的主机到主机 NS/NA 由主机协议栈自动处理，不受 ND 菜单控制。Redirect 生成是可选的，默认禁用（`redirect=no`）。

## 示例 {#examples}

#### 无状态自动配置示例 {#stateless-autoconfiguration-example}

```ros
[admin@MikroTik] > ipv6 address print
Flags: X - disabled, I - invalid, D - dynamic, G - global, L - link-local
# ADDRESS INTERFACE ADVERTISE
0 G 2001:db8::1/64 ether1 yes

```

在此示例中，**advertise** 标志已启用，这表示已添加动态 `/ipv6/nd/prefix` 条目。

```ros
[admin@MikroTik] > /ipv6/nd/prefix/print
Flags: X - disabled, I - invalid, D - dynamic
0 D prefix=2001:db8::/64 interface=ether1 on-link=yes autonomous=yes
 valid-lifetime=4w2d preferred-lifetime=1w
```

在直接连接到路由器的主机上，我们看到已添加一个地址。该地址由前缀部分（前 64 位）和主机部分（后 64 位）组成，前缀部分从前缀通告中获取前缀，主机部分根据本地 MAC 地址自动生成：

```ros
atis@atis-desktop:~$ ip -6 addr
 1: lo: <LOOPBACK,UP,LOWER_UP> mtu 16436
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
inet6 2001:db8::21a:4dff:fe56:1f4d/64 scope global dynamic
 valid_lft 2588363sec preferred_lft 601163sec
inet6 fe80::21a:4dff:fe56:1f4d/64 scope link
valid_lft forever preferred_lft forever
```

主机已从路由器收到 *2001:db8::/64* 前缀，并使用该前缀配置了一个地址。

还可以使用 RADVD 重新分发 [DNS](../../network-management/dns.md) 服务器信息：

```ros
[admin@MikroTik] > /ipv6/nd/set [find where interface=all] dns=2001:db8::2 advertise-dns=yes
```

或者，你可以将路由器自身的 LL IPv6 地址作为 DNS 服务器分发，并将路由器本身用作 DNS 缓存：

```ros
[admin@MikroTik] > /ipv6/nd/set [find where interface=all] advertise-dns=self
```

如果你通告特定服务器，那么每个 RA 还会将路由器自身的 LL 地址作为 DNS 服务器包含在内，但会将其作为已过期的服务器。如果该服务器之前被使用过（如果你在 self 和 yes 选项之间更改了设置），则有必要这样做以使该服务器失效。任何正确处理 RA DNS 的客户端都会忽略此服务器，或者如果现有服务器就是路由器本身，则使该现有服务器失效。

你需要支持 Router Advertisement DNS 的客户端软件才能使用通告的 DNS 信息。

在 Ubuntu/Debian Linux 发行版上，你可以安装 **rdnssd** 软件包，它能够接收通告的 DNS 地址。

```ros
mrz@bumba:/$ sudo apt-get install rdnssd
```

```ros
mrz@bumba:/$ cat /etc/resolv.conf
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
 # DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
 nameserver 2001:db8::2

mrz@bumba:/$ ping6 www.mikrotik.com
PING www.mikrotik.com(2a02:610:7501:1000::2) 56 data bytes
 64 bytes from 2a02:610:7501:1000::2: icmp_seq=1 ttl=61 time=2.11 ms
 64 bytes from 2a02:610:7501:1000::2: icmp_seq=2 ttl=61 time=1.33 ms
^C
 --- www.mikrotik.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 1.334/1.725/2.117/0.393 ms
mrz@bumba:/$
```
