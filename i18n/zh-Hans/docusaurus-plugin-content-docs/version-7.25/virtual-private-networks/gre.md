---
sidebar_key: "virtual-private-networks/gre"
sidebar_position: 3
title: "GRE"
sidebar_label: "GRE"
description: "通用路由封装（GRE）是一种隧道协议，用于通过 IP 封装各种网络协议，在 RouterOS 中以虚拟接口的形式实现，并可选启用 keepalive，以及 MTU、MSS clamping 和 DSCP 设置等属性，以实现可靠的流量转发。"
tags:
  - 'gre'
source: https://manual.mikrotik.com/docs/7.25/virtual-private-networks/gre
captured_at: '2026-11-04T11:23:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Generic Routing Encapsulation (GRE) 是一种隧道协议，最初由 Cisco 开发，用于在 IP 网络上封装各种网络层协议。它在隧道端点之间创建虚拟点对点链路，允许不同的协议流量通过路由基础设施传输。

GRE 作为无状态隧道运行，行为类似于 IPIP 和 EoIP。由于端点之间不维护会话状态，即使远程端点变得不可达，流量仍会继续朝向该端点转发。这可能导致流量被黑洞，直到路由重新收敛或隧道状态发生变化。

在 RouterOS 中，GRE 接口作为虚拟接口实现，可根据所需拓扑用于路由和桥接网络设计。

为了改进故障检测，RouterOS 为 GRE 隧道包含可选的 keepalive 机制。Keepalive 监控远程端点的可达性，并可在对端停止响应时自动禁用隧道接口，从而降低流量被发送到非活动隧道的风险。

:::tip
GRE 隧道会增加 24 字节开销（4 字节 GRE 头部 + 20 字节 IP 头部）。GRE 隧道只能转发 IP 和 IPv6 数据包（EtherType 0x0800 和 0x86DD）。当 GRE 隧道用作路由网关时，不要使用 "Check gateway" 选项的 "arp" 值。
:::

GRE 在 [`/interface/gre`](../cli-reference/interface/gre.md) 和 [`/interface/gre6`](../cli-reference/interface/gre6.md) 菜单中配置。

## 配置示例 {#setup-example}

本示例的目标是通过互联网在两个远程站点之间实现三层连通性。

![](/img/6412953c9c3ec94f.webp)

该示例使用两个站点：**Site1** 的本地网络范围为 10.1.101.0/24，**Site2** 的本地网络范围为 10.1.202.0/24。

第一步是创建 GRE 隧道。站点 1 上的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.90.1 local-address=192.168.80.1
```

站点 2 上的路由器：

```ros
/interface/gre/add name=myGre remote-address=192.168.80.1 local-address=192.168.90.1
```

:::warning
在此示例中，未配置 keepalive，因此即使远程隧道端点不可达，隧道接口仍具有 **running** 标志。
:::

现在，设置隧道地址和正确的路由。站点 1 上的路由器：

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
