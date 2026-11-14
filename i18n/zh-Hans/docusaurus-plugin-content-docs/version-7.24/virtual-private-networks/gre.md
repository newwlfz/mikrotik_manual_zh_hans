---
sidebar_key: "virtual-private-networks/gre"
sidebar_position: 3
title: "GRE"
sidebar_label: "GRE"
description: "通用路由封装（GRE）是一种隧道协议，用于通过 IP 封装各种网络协议，在 RouterOS 中以虚拟接口的形式实现，并可选启用 keepalive，以及 MTU、MSS clamping 和 DSCP 设置等属性，以实现可靠的流量转发。"
tags:
  - 'gre'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/gre
captured_at: '2026-11-04T11:34:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Generic Routing Encapsulation (GRE) 是一种隧道协议，最初由 Cisco 开发，用于在 IP 网络上封装各种网络层协议。它在隧道端点之间创建虚拟点对点链路，允许不同的协议流量通过路由基础设施传输。

GRE 作为无状态隧道运行，行为类似于 IPIP 和 EoIP。由于端点之间不维护会话状态，即使远程端点变得不可达，流量也可能继续被转发到该远程端点，这可能导致流量被黑洞化，直到路由重新收敛或隧道状态发生变化。

在 RouterOS 中，GRE 接口作为虚拟接口实现，可根据所需拓扑用于路由和桥接网络设计。

为了改进故障检测，RouterOS 为 GRE 隧道包含可选的 keepalive 机制。Keepalive 监控远程端点的可达性，并可在对端停止响应时自动禁用隧道接口，从而降低流量被发送到非活动隧道的风险。

:::tip
GRE 隧道会增加 24 字节开销（4 字节 gre 头 + 20 字节 IP 头）。GRE 隧道只能转发 IP 和 IPv6 数据包（以太网类型 800 和 86dd）。当 GRE 隧道用作路由网关时，不要使用 "Check gateway" 选项的 "arp"。
:::
**子菜单：** `/interface/gre`

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*; 默认值：**yes**) | 是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。 |
| **clamp-tcp-mss** (*yes \| no*; 默认值：**yes**) | 控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器将更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍将包含原始 MSS，只有在解封装后才会更改 MSS。 |
| **comment** (*string*; Default: ) | 隧道的简短描述。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用/禁用隧道。 |
| **dont-fragment** (*inherit \| no*; 默认值：**no**) | 是否在相关数据包中包含 DF 位：  *no* - 如果需要则分片，*inherit* - 使用原始数据包的 Don't Fragment 标志。  （不使用 Don't Fragment 时：inherit - 数据包可能被分片）。 |
| **dscp** (*inherit \| integer [0-63]*; 默认值：) | 将 Gre 头中的 dscp 值设置为固定值，或继承从隧道流量中获取的 dscp 值 |
| **ipsec-secret** (*string*; 默认值：) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 指定 secret 后，路由器会向 remote-address 添加动态 IPsec 对等体，并使用预共享密钥和策略（默认情况下 phase2 使用 sha1/aes128cbc）。 |
| **keepalive** (*integer[/time],integer 0..4294967295*; 默认值：**10s,10**) | 隧道 keepalive 参数设置即使隧道远程端不可用，隧道 running 标志仍将保留的时间间隔。如果配置的时间和重试次数失败，则移除接口 running 标志。参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`，其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试尝试次数。默认情况下，keepalive 设置为 10 秒和 10 次重试。 |
| **l2mtu** (*integer [0..65536]*; 默认值：**65535**) | 二层最大传输单元。 |
| **local-address** (*IP*; 默认值：**0.0.0.0**) | 将用于本地隧道端的 IP 地址。如果设置为 0.0.0.0，则将使用出接口的 IP 地址。 |
| **mtu** (*integer [0..65536]*; 默认值：**1476**) | 三层最大传输单元。 |
| **name** (*string*; Default: ) | 隧道名称。 |
| **remote-address** (*IP*; 默认值：) | 远程隧道端的 IP 地址。 |

## 配置示例 {#setup-example}

本示例的目标是通过互联网在两个远程站点之间实现三层连通性

![](/img/6412953c9c3ec94f.webp)

我们有两个站点，**Site1** 的本地网络范围为 10.1.101.0/24，**Site2** 的本地网络范围为 10.1.202.0/24。

第一步是创建 GRE 隧道。站点 1 上的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.90.1 local-address=192.168.80.1
```

站点 2 上的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.80.1 local-address=192.168.90.1
```

如您所见，隧道配置非常简单。

:::warning
在此示例中，未配置 keepalive，因此即使远程隧道端不可达，隧道接口仍将具有 **running** 标志
:::

现在我们只需要设置隧道地址和正确的路由。站点 1 上的路由器：

```ros
/ip/address/add address=172.16.1.1/30 interface=myGre
/ip/route/add dst-address=10.1.202.0/24 gateway=172.16.1.2
```

站点 2 上的路由器：

```ros
/ip/address/add address=172.16.1.2/30 interface=myGre
/ip/route/add dst-address=10.1.101.0/24 gateway=172.16.1.1
```

此时，两个站点已通过 GRE 隧道实现三层连通性。
