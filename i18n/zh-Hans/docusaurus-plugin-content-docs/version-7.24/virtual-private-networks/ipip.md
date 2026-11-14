---
sidebar_key: "virtual-private-networks/ipip"
sidebar_position: 4
title: "IPIP"
sidebar_label: "IPIP"
description: "IPIP（IP-in-IP）是 RouterOS 中的一种隧道协议，用于在 IP 网络上建立安全的点对点连接，支持 IPv4 封装以及与其他平台的互操作性。它提供 MTU、keepalive 和 DSCP 设置等基本配置选项，并附带有关缺乏加密的警告。"
tags:
  - 'ip'
  - 'tunnel'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/ipip
captured_at: '2026-11-04T11:34:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IPIP（IP-in-IP）是 RFC 2003 中定义的一种简单隧道协议，它将 IP 数据包封装在另一个 IP 头中，以便在两个端点之间传输流量。在 RouterOS 中，IPIP 可用于在中间 IP 网络上的路由器之间创建点对点隧道。

IPIP 隧道接口在接口列表中表示为虚拟接口，并且可以像其他逻辑接口一样进行配置。该协议受到多种网络平台的支持，包括 RouterOS、Linux 和 Cisco 设备，从而实现不同厂商之间的互操作。

IPIP 通常用于通过公共或私有 IP 基础设施连接远程网络，而无需直接的二层连接。该协议支持封装 IPv4 流量，并且通常用作不需要加密的轻量级隧道机制。

IPIP 的典型用例包括通过互联网隧道传输私有网络、在远程站点之间建立路由链路，以及在网络设计中提供源路由的替代方案。由于 IPIP 不提供加密、身份验证或流量完整性保护，因此在需要安全传输时，通常与 IPsec 结合使用。

**子菜单：** `/interface/ipip`

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **clamp-tcp-mss** (*yes \| no*; 默认值：**yes**) | 控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器将更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍将包含原始 MSS，只有在解封装后才会更改 MSS。 |
| **dont-fragment** (*inherit \| no*; 默认值：**no**) | 是否在相关数据包中包含 DF 位： *no* - 如有需要则分片，*inherit* - 使用原始数据包的 Don't Fragment 标志。  （不带 Don't Fragment：inherit - 数据包可能被分片）。 |
| **dscp** (*inherit \| integer [0-63]*; 默认值： ) | 将 IPIP 头中的 dscp 值设置为固定值，或继承从隧道流量中获取的 dscp 值。 |
| **ipsec-secret** (*string*; 默认值： ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 指定 secret 后，路由器会向 remote-address 添加一个使用预共享密钥的动态 ipsec 对等体，并添加一个使用默认值的策略（默认情况下 phase2 使用 sha1/aes128cbc）。 |
| **local-address** (*IP*; 默认值： ) | 路由器上将由 IPIP 隧道使用的 IP 地址。 |
| **mtu** (*integer*; 默认值：**1480**) | Layer3 最大传输单元。 |
| **keepalive** (*integer[/time],integer 0..4294967295*; 默认值：**10s,10**) | keepalive 参数设置时间间隔，在该间隔内即使隧道远端宕机，隧道的运行标志也将保持置位。如果配置的时间和重试次数失败，则移除接口的运行标志。参数按以下格式编写：`KeepaliveInterval,KeepaliveRetries`，其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试尝试次数。默认情况下，keepalive 设置为 10 秒和 10 次重试。要禁用，请设置 `/interface/ipip/set ipip1 keepalive=no`。 |
| **name** (*string*; 默认：) | 接口名称。 |
| **remote-address** (*IP*; 默认值： ) | IPIP 隧道远端的 IP 地址。 |

:::warning
此接口没有身份验证或“状态”。可以使用接口菜单中的监视功能来监控接口的带宽使用情况。
:::

## 示例 {#example}

 假设我们想在路由器 R1 和 R2 之间添加一条 IPIP 隧道：

![](/img/8a32f4a39173d818.webp)

首先，我们需要配置 IPIP 接口，然后向它们添加 IP 地址。
  
**R1** 路由器的配置如下：

```ros
[admin@MikroTik] /interface/ipip> add
local-address: 10.0.0.1
remote-address: 22.63.11.6
[admin@MikroTik] /interface/ipip> print
Flags: X - disabled, R - running
# NAME MTU LOCAL-ADDRESS REMOTE-ADDRESS
0 X ipip1 1480 10.0.0.1 22.63.11.6

[admin@MikroTik] /interface/ipip> en 0
[admin@MikroTik] /interface/ipip> /ip/address/add address=1.1.1.1/24 interface=ipip1
```

**R2** 的配置如下所示：

```ros
[admin@MikroTik] /interface/ipip> add local-address=22.63.11.6 remote-address=10.
0.0.1
[admin@MikroTik] /interface/ipip> print
Flags: X - disabled, R - running
# NAME MTU LOCAL-ADDRESS REMOTE-ADDRESS
0 X ipip1 1480 22.63.11.6 10.0.0.1

[admin@MikroTik] /interface/ipip> enable 0
[admin@MikroTik] /interface/ipip> /ip/address/add address=1.1.1.2/24 interface=ipip1
```

现在两台路由器可以互相 ping 通：

```ros
[admin@MikroTik] /interface/ipip> /ping 1.1.1.2
1.1.1.2 64 byte ping: ttl=64 time=24 ms
1.1.1.2 64 byte ping: ttl=64 time=19 ms
1.1.1.2 64 byte ping: ttl=64 time=20 ms
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 19/21.0/24 ms
[admin@MikroTik] /interface/ipip>
```
