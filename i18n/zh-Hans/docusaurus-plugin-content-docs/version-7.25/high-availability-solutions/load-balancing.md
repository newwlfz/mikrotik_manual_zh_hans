---
title: "负载均衡"
description: "MikroTik RouterOS 中的网络负载均衡支持在无需动态路由的情况下将流量分发到多条链路，并提供按连接或按数据包的负载均衡方式。本文档包含故障转移配置等设置示例，以及使用防火墙 mangle、bonding、OSPF 和 ECMP 的负载均衡技术对比。"
tags:
  - 'load-balancing'
  - 'firewall-mangle'
  - 'bonding'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/load-balancing
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

- [Failover (WAN Backup)](/docs/high-availability-solutions/load-balancing/failover-wan-backup)
- [Firewall Marking](/docs/firewall-and-quality-of-service/firewall/mangle)
- [Bonding Load Balancing](/docs/high-availability-solutions/bonding)
- [OSPF Load Balancing](/docs/user-guides/routing-and-networking-protocols/unicast/ospf)
- [Per connection classifier](/docs/high-availability-solutions/load-balancing/per-connection-classifier)

## 简介 {#introduction}

网络负载均衡是在两条或更多链路之间平衡流量的能力。

有两种负载均衡方法：

- per-packet - 单个流的每个数据包都可以通过不同链路转发。只有在能够控制负载均衡两端时，该方法才能可靠工作，尤其是在 TCP 和安全连接上。
- per-connection - 同一连接（流）的所有数据包始终通过一条链路发送。在只有负载均衡的一端受我们控制的场景中，该方法是必需的，例如具有多个 WAN 连接的家用路由器。

| 方法 |  | Per-connection | Per-packet |
| :-- | :-- | :-- | :-- |
| <br/> 防火墙 Mangle | Nth | **是** | **是** |
|  | PCC (Per Connection Classifier) | **是** | 否 |
|  | 其他匹配器 | **是** | **是** |
| ECMP (Equal Cost Multi-Path) |  | **是** | **否** |
| Bonding |  | 否 | **是** |
| OSPF |  | **是** | 否 |
| BGP |  | **是** | 否 |

## 简单故障转移示例 {#simple-failover-example}

最简单的故障转移配置是使用多个网关，其中一个网关处于活动状态，当第一个网关故障时，另一个网关接管。

要实现这一点，请为备用网关配置较大的 **distance** 值，并为第一个网关配置 **check-gateway**：

```ros
/ip/route/add gateway=192.168.1.1 distance=1 check-gateway=ping
/ip/route/add gateway=192.168.2.1 distance=2
```

*check-gateway* 将仅在实际流量能够到达网关时确认网关处于运行状态。当 ping 失败时，第一个网关将变为非活动状态，第二个网关将接管；当第一个网关恢复时，它将变为活动状态，并使第二个网关再次作为备份工作。

## 相关主题 {#related-topics}

<DocCardList />
