---
title: "GRE"
description: "Generic Routing Encapsulation（GRE）是一种隧道协议，用于在 IP 上封装多种网络协议。在 RouterOS 中，GRE 以虚拟接口形式实现，支持可选的 keepalive，并提供 MTU、MSS clamping 和 DSCP 设置等属性，以实现可靠的流量转发。"
tags:
  - 'gre'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/gre
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Generic Routing Encapsulation（GRE）是一种隧道协议，最初由 Cisco 开发，用于在 IP 网络上封装多种网络层协议。它在隧道端点之间创建虚拟点对点链路，使不同协议的流量能够穿越路由基础设施传输。

GRE 作为无状态隧道运行，其行为类似于 IPIP 和 EoIP。由于端点之间不维护会话状态，即使远端端点变得不可达，流量仍可能继续转发到该端点，从而在路由重新收敛或隧道状态变化之前造成流量黑洞。

在 RouterOS 中，GRE 接口实现为虚拟接口，可根据所需拓扑用于路由和桥接网络设计。

为改进故障检测，RouterOS 为 GRE 隧道提供可选的 keepalive 机制。Keepalive 监控远端端点的可达性，并在对端停止响应时自动禁用隧道接口，降低流量被发送到非活动隧道的风险。

:::tip
GRE 隧道会增加 24 字节开销（4 字节 gre 头 + 20 字节 IP 头）。GRE 隧道只能转发 IP 和 IPv6 数据包（ethernet type 800 和 86dd）。当 GRE 隧道用作路由网关时，不要使用“Check gateway”选项“arp”。
:::
**子菜单：** `/interface/gre`

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*；默认值：**yes**) | 是否允许 FastPath 处理。如果使用 IPsec 隧道，必须禁用该选项。 |
| **clamp-tcp-mss** (*yes \| no*；默认值：**yes**) | 控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器将更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。 |
| **comment** (*string*；默认值：) | 隧道的简短描述。 |
| **disabled** (*yes \| no*；默认值：**no**) | 启用或禁用隧道。 |
| **dont-fragment** (*inherit \| no*；默认值：**no**) | 是否在相关数据包中包含 DF 位：<br/><em>no</em> - 必要时分片，<em>inherit</em> - 使用原始数据包的 Don't Fragment 标志。<br/>（未设置 Don't Fragment：inherit - 数据包可能被分片）。 |
| **dscp** (*inherit \| integer [0-63]*；默认值：) | 将 Gre 头中的 dscp 值设置为固定值，或继承隧道流量中的 dscp 值 |
| **ipsec-secret** (*string*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 指定 secret 后，路由器会向 remote-address 添加动态 IPsec peer，并使用预共享密钥和策略（默认 phase2 使用 sha1/aes128cbc）。 |
| **keepalive** (*integer[/time],integer 0..4294967295*；默认值：**10s,10**) | Tunnel keepalive 参数用于设置时间间隔，在该间隔内，即使隧道远端断开，隧道 running 标志仍会保持。如果配置的时间和重试次数均失败，则移除接口 running 标志。参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`，其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试次数。默认情况下，keepalive 设置为 10 秒和 10 次重试。 |
| **l2mtu** (*integer [0..65536]*；默认值：**65535**) | 二层最大传输单元。 |
| **local-address** (*IP*；默认值：**0.0.0.0**) | 用于本地隧道端的 IP 地址。如果设置为 0.0.0.0，则将使用出接口的 IP 地址。 |
| **mtu** (*integer [0..65536]*；默认值：**1476**) | 三层最大传输单元。 |
| **name** (*string*；默认值：) | 隧道名称。 |
| **remote-address** (*IP*；默认值：) | 远端隧道端的 IP 地址。 |

## 配置示例 {#setup-example}

本示例的目标是通过互联网在两个远程站点之间建立三层连接。

![](/img/6412953c9c3ec94f.webp)

我们有两个站点：**Site1** 的本地网段为 10.1.101.0/24，**Site2** 的本地网段为 10.1.202.0/24。

第一步是创建 GRE 隧道。站点 1 的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.90.1 local-address=192.168.80.1
```

站点 2 的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.80.1 local-address=192.168.90.1
```

如你所见，隧道配置非常简单。

:::warning
本示例中未配置 keepalive，因此即使远端隧道端不可达，隧道接口也会具有 **running** 标志。
:::

现在只需设置隧道地址和正确的路由。站点 1 的路由器：

```ros
/ip/address/add address=172.16.1.1/30 interface=myGre
/ip/route/add dst-address=10.1.202.0/24 gateway=172.16.1.2
```

站点 2 的路由器：

```ros
/ip/address/add address=172.16.1.2/30 interface=myGre
/ip/route/add dst-address=10.1.101.0/24 gateway=172.16.1.1
```

此时，两个站点已通过 GRE 隧道实现 Layer 3 连通。
