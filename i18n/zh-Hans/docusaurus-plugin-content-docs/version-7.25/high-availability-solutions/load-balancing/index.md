---
sidebar_key: "high-availability-solutions/load-balancing/index"
sidebar_position: 3
title: "负载均衡"
sidebar_label: "负载均衡"
description: "MikroTik RouterOS 中的网络负载均衡允许在无需动态路由的情况下将流量分配到多条链路上，并提供按连接或按数据包的方法选项。该文档包含设置示例，例如故障转移配置，以及使用 firewall mangle、bonding、OSPF 和 ECMP 对负载均衡技术进行的比较。"
tags:
  - 'load-balancing'
  - 'firewall-mangle'
  - 'bonding'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/load-balancing
captured_at: '2026-11-04T11:17:43+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

- [故障转移（WAN 备份）](./failover-wan-backup.md)
- [防火墙标记](../../firewall-and-quality-of-service/firewall/mangle.md)
- [Bonding 负载均衡](../bonding.md)
- [OSPF 负载均衡](../../user-guides/routing-and-networking-protocols/unicast/ospf/index.md)
- [按连接分类器](./per-connection-classifier.md)

## 简介 {#introduction}

网络负载均衡是指将流量分摊到两条或更多链路上的能力。

负载均衡方法有两种：

- per-packet - 单个流的每个包都可以通过不同链路转发。只有在能够控制两个负载均衡端点时，此方法才能可靠工作，尤其是在 TCP 和安全连接上。
- per-connection - 同一连接（流）的所有包始终通过一条链路发送。在只有一端负载均衡受我们控制的设置中，此方法是必需的，例如带有多条 WAN 连接的家庭路由器。

| 方法 |  | Per-connection | Per-packet |
| :-- | :-- | :-- | :-- |
|  Firewall Mangle | Nth | **是** | **是** |
|  | PCC (Per Connection Classifier) | **是** | no |
|  | 其他匹配器 | **是** | **是** |
| ECMP (Equal Cost Multi-Path) |  | **是** | **否** |
| Bonding |  | no | **是** |
| OSPF |  | **是** | no |
| BGP |  | **是** | no |

## 简单故障转移示例 {#simple-failover-example}

最简单的故障转移设置是使用多个网关：一个网关处于 active 状态，另一个网关在第一个网关故障时接管。

为此，请为备用网关配置更大的 **distance** 值，并为第一个网关配置 **check-gateway**：

```ros
/ip/route/add gateway=192.168.1.1 distance=1 check-gateway=ping
/ip/route/add gateway=192.168.2.1 distance=2
```

*check-gateway* 会确保仅当实际流量能够到达网关时，该网关才处于 up 状态。当 ping 失败时，第一个网关将变为 inactive，第二个网关将接管；当第一个网关恢复时，它将变为 active，并让第二个网关再次作为备份工作。

## 相关主题 {#related-topics}

<DocCardList />
