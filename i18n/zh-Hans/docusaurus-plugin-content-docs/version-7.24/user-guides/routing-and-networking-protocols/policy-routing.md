---
title: "策略路由"
description: "RouterOS 中的策略路由允许根据条件将流量引导至特定网关，并使用自定义路由表和规则。它支持通过防火墙 mangle 标记进行动态路由决策，也支持使用基本路由规则配置进行流量控制。"
tags:
  - 'routing'
  - 'policy-routing'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/policy-routing
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

策略路由会将匹配条件的流量引导到指定网关。可使用该机制强制选定的客户或协议（例如 HTTP 流量）始终使用特定网关。也可将本地流量和海外流量通过不同网关进行路由。

RouterOS 提供以下策略路由组件：

- 路由表。
- 路由规则。
- 防火墙 mangle 标记。

## 路由表 {#routing-tables}

路由器可以有多个路由表，每个路由表针对同一目的地使用各自的路由和不同网关。

在 `/routing/table` 菜单中查看并配置路由表。

默认情况下，RouterOS 只有 **main** 路由表：

```text
[admin@rack1_b33_CCR1036] /routing/table> print
Flags: D - dynamic; X - disabled, I - invalid; U - used
0 D name="main" fib

```

在其他配置中使用自定义路由表之前，请先在此菜单中定义该路由表。

以下示例包含两个网关 172.16.1.1 和 172.16.2.1，以及路由表 **myTable** 中一条到 8.8.8.8 的路由，该路由使用网关 172.16.2.1：

```ros
/routing/table/add name=myTable fib
/ip/route/add dst-address=8.8.8.8 gateway=172.16.1.1
/ip/route/add dst-address=8.8.8.8 gateway=172.16.2.1@main routing-table=myTable
```

:::tip
用户创建的表要能够解析目标地址，main 路由表也必须能够解析该目标地址。
:::

在此示例中，**main** 路由表也应包含到 8.8.8.8 的路由，或至少包含一条默认路由。由于 DHCP 会出于安全考虑动态添加默认路由，请将 8.8.8.8 显式添加到 main 表中。

```text
[admin@rack1_b33_CCR1036] /ip/route> print detail Flags: D - dynamic; X - disabled, I - inactive, A - active;
c - connect, s - static, r - rip, b - bgp, o - ospf, d - dhcp, v - vpn, m - modem, y - cop
y;
H - hw-offloaded; + - ecmp
   DAd   dst-address=0.0.0.0/0 routing-table=main pref-src="" gateway=172.16.1.1
         immediate-gw=172.16.1.1%ether8 distance=1 scope=30 target-scope=10
         vrf-interface=ether8 suppress-hw-offload=no

 0  As   dst-address=8.8.8.8/32 routing-table=main pref-src="" gateway=172.16.1.1
         immediate-gw=172.16.1.1%ether8 distance=1 scope=30 target-scope=10 suppress-hw-offload=no

    DAc   dst-address=172.16.1.0/24 routing-table=main gateway=ether8 immediate-gw=ether8
         distance=0 scope=10 suppress-hw-offload=no local-address=172.16.1.2%ether8

    DAc   dst-address=172.16.2.0/24 routing-table=main gateway=ether7 immediate-gw=ether7
         distance=0 scope=10 suppress-hw-offload=no local-address=172.16.2.2%ether7

 1  As   dst-address=8.8.8.8/32 routing-table=myTable pref-src="" gateway=172.16.2.1
         immediate-gw=172.16.2.1%ether7 distance=1 scope=30 target-scope=10 suppress-hw-offload=no

```

上述配置还不够。你需要一种方法强制流量使用新表。RouterOS 提供两种选项：

- firewall mangle - 可更精细地控制用于引导流量的条件，例如按连接或按数据包进行负载均衡。示例请参阅 [Firewall Marking](/docs/firewall-and-quality-of-service/firewall/mangle)。
- routing rules - 一组基本参数，用于快速引导流量。本示例使用 routing rules。

除非必要，请勿同时使用这两种方法。如果同时使用 mangle 和 routing rules，默认情况下 mangle 的优先级更高。如果带有 mangle 标记的流量可以在表中解析，routing rules 将不会看到该流量。执行顺序可以[更改](/docs/user-guides/routing-and-networking-protocols/routing-decision#routing-table-lookup)。

:::warning
路由表数量限制为 4096 个唯一表。
:::

## 路由规则 {#routing-rules}

路由规则根据源地址、目标地址、入接口等基本参数引导流量。

在本示例中，选择发往 8.8.8.8 的流量，并阻止回退到 **main** 表：

```ros
/routing/rule/add dst-address=8.8.8.8 action=lookup-only-in-table table=myTable
```

如果某个客户连接到 ether4，并且只有该客户应将 8.8.8.8 路由到指定网关，请使用以下规则：

```ros
/routing/rule/add dst-address=8.8.8.8 action=lookup-only-in-table table=myTable interface=ether4
```

如果表中使用的网关不可用，查找将失败，目标将变为不可达。在主动-备份场景中，可将 action 从 `lookup-only-in-table` 改为 `lookup`，以允许流量回退到 **main** 表。

路由规则也可充当基本防火墙。例如，阻止 ether4 上的客户访问 192.168.1.0/24：

```ros
/routing/rule/add dst-address=192.168.1.0/24 interface=ether4 action=drop
```
