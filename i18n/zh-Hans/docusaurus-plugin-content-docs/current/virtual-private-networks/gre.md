---
sidebar_key: "virtual-private-networks/gre"
sidebar_position: 3
title: "GRE"
sidebar_label: "GRE"
description: "通用路由封装（GRE）是一种隧道协议，它在 RouterOS 中将 IP over IP 封装为虚拟点对点链路，并支持 keepalive 监控、MTU 和 MSS 处理、DSCP 设置以及用于加密隧道的可选 IPsec-secret。"
tags:
  - 'gre'
source: https://manual.mikrotik.com/docs/virtual-private-networks/gre
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Generic Routing Encapsulation (GRE) 是一种隧道协议，最初由 Cisco 开发，用于在 IP 网络上封装各种网络层协议。它在隧道端点之间创建虚拟点对点链路，允许不同的协议流量通过路由基础设施传输。

在 RouterOS 中，GRE 在 [`/interface/gre`](../cli-reference/interface/gre.md)（基于 IPv4）和 [`/interface/gre6`](../cli-reference/interface/gre6.md)（基于 IPv6）菜单中实现为虚拟接口。这些接口是路由（第 3 层）隧道：GRE 隧道仅在两个端点之间承载 IP 和 IPv6 数据包。若要通过 IP 网络实现第 2 层连接（桥接以太网帧），请改用 [EoIP](./eoip.md)。

## 隧道工作原理 {#how-the-tunnel-works}

GRE 是无状态隧道，行为类似于 [IPIP](./ipip.md) 和 EoIP。端点之间不维护会话状态：即使远端变得不可达，路由器仍会继续向远端转发数据包，而隧道流量会被丢弃，直到连接恢复或隧道被重新配置。

路由器在远端至少响应一次后，才会认为隧道处于 **running**（`R` 标志）。从那时起，Keepalive 会监控远端：路由器每隔一个 keepalive 间隔向 remote-address 发送 GRE echo 探测，并在隧道处于 up 状态时应答远端的探测。Keepalive 默认启用（`10s,10`——间隔 10 秒，重试 10 次），间隔最短可设为 1 秒以便更快检测（设置为 0 秒会被拒绝）。在当前 RouterOS 上，只要隧道已启用，running 标志就会保持——远端不可达的隧道仍保持 running，隧道流量会被丢弃，直到远端再次响应。如果自动故障转移必须对失效隧道做出反应，请添加可达性检查（例如用脚本 ping 远端并调整路由），而不是依赖 running 标志。

:::tip
GRE 隧道会增加每包开销：在 IPv4 上为 24 字节（4 字节 GRE 头部 + 20 字节 IP 头部），在 IPv6 上为 44 字节（4 字节 GRE 头部 + 40 字节 IPv6 头部）。使用默认 `mtu=auto` 时，路由器会相应地设置隧道 MTU——对于 GRE over IPv4，在 1500 字节接口上 `actual-mtu` 为 1476，对于 GRE over IPv6 为 1456。隧道仅承载 IP 和 IPv6 数据包（EtherType 0x0800 和 0x86DD）。当 GRE 隧道用作路由网关时，不要使用“Check gateway”选项 `arp`。
:::

所有 GRE 属性在 [`/interface/gre`](../cli-reference/interface/gre.md) 和 [`/interface/gre6`](../cli-reference/interface/gre6.md) CLI 参考中均有描述。

## 示例：连接两个站点 {#example-connect-two-sites}

该示例通过 GRE 隧道经互联网连接两个站点，并为每个站点提供到另一站点本地网络的第 3 层访问。

![GRE tunnel between two sites](/img/6412953c9c3ec94f.webp)

**Site1** 的本地网络为 **10.1.101.0/24**，**Site2** 的本地网络为 **10.1.202.0/24**。隧道端点是路由器的公网地址，此处为 **192.168.80.1**（Site1）和 **192.168.90.1**（Site2）——请替换为你自己路由器的互联网地址。

在 Site1 路由器上创建隧道：

```ros
/interface/gre/add name=myGre \
    remote-address=192.168.90.1 local-address=192.168.80.1
```

在 Site2 路由器上创建隧道：

```ros
/interface/gre/add name=myGre \
    remote-address=192.168.80.1 local-address=192.168.90.1
```

:::note
该示例将 keepalive 保留为默认值（`10s,10`）。在远端应答后，隧道会显示 running 标志。GRE 是无状态的：如果一端变得不可达，running 标志会保持，进入隧道的流量会被丢弃，直到远端再次可达。
:::

现在两端都有了隧道，但还需要地址才能在隧道上路由。为隧道两端分配私有地址范围的地址，并添加通往远端站点本地网络的路由。在 Site1 路由器上：

```ros
/ip/address/add address=172.16.1.1/30 interface=myGre
/ip/route/add dst-address=10.1.202.0/24 gateway=172.16.1.2
```

在 Site2 路由器上：

```ros
/ip/address/add address=172.16.1.2/30 interface=myGre
/ip/route/add dst-address=10.1.101.0/24 gateway=172.16.1.1
```

此时两个站点已通过 GRE 隧道建立了三层连通性。请进行端到端验证——对远端隧道地址的 ping 必须得到应答，并且两个站点上的隧道都必须显示 `R` 标志：

```ros
/ping 172.16.1.2
/interface/gre/print where name=myGre
```

## 故障排除 {#troubleshooting}

- **隧道没有 running 标志。** 远端尚未应答。使用 `/ping <remote-address>` 检查隧道端点是否可达，确认远端路由器有匹配的隧道且其 `remote-address` 指向回本端，并确认隧道的 `local-address` 设置正确。只有在远端应答后，running 标志才会出现。
- **通过隧道的流量丢失。** GRE 是无状态的：当远端不可达时，路由器会继续将隧道流量发送进隧道，而这些流量会被丢弃。检查 `remote-address` 的可达性，并将隧道的 `actual-mtu` 与站点之间的路径 MTU 进行比较（MTU 不匹配会丢弃过大的数据包）。
- **隧道已建立，但站点之间没有流量通过。** 站点之间的 WAN 防火墙必须允许两个隧道端点之间的 GRE（IP 协议 47）——如果隧道配置了 `ipsec-secret`，还需要允许 IPsec 端口——并且隧道流量不得被 NAT。
- **远端的地址发生了变化。** `remote-address` 接受的是 IP 地址，而不是主机名；如果某个站点的公网地址发生变化，请更新另一端的隧道，或使用具有稳定地址的端点。
- **非 IP 流量无法通过。** GRE 是路由隧道，只承载 IP 和 IPv6 数据包。若要在 IP 网络上桥接以太网帧，请使用 [EoIP](./eoip.md)。
