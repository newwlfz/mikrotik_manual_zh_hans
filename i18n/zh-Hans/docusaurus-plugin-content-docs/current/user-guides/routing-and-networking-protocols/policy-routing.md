---
sidebar_key: "user-guides/routing-and-networking-protocols/policy-routing"
sidebar_position: 4
title: "策略路由"
sidebar_label: "策略路由"
description: "RouterOS 中的策略路由允许根据条件将流量引导到特定网关，并使用自定义路由表和规则。它支持通过防火墙 mangle 标记或基本路由规则配置进行动态路由决策，以实现流量控制。"
tags:
  - 'routing'
  - 'policy-routing'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/policy-routing
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

策略路由将匹配条件的流量引导到特定网关。使用它可强制选定的客户或协议（例如 HTTP 流量）始终使用特定网关。它还可以让本地和海外流量通过不同网关路由。

RouterOS 为策略路由提供以下组件：

- 路由表。
- 路由规则。
- 防火墙 mangle 标记。

## 路由表 {#routing-tables}

一个路由器可以有多个路由表，每个路由表都有各自用于同一目标但不同网关的路由。

通过 `/routing/table` 菜单查看和配置表。

默认情况下，RouterOS 只有 **main** 路由表：

```text
[admin@rack1_b33_CCR1036] /routing/table> print
Flags: D - dynamic; X - disabled, I - invalid; U - used
0 D name="main" fib

```

在配置中的其他位置使用自定义路由表之前，请先在此菜单中定义它。

考虑一个基本示例：有两个网关 172.16.1.1 和 172.16.2.1，并且在名为 **myTable** 的路由表中有一条到 8.8.8.8 的路由，该路由使用网关 172.16.2.1：

```ros
/routing/table/add name=myTable fib
/ip/route/add dst-address=8.8.8.8 gateway=172.16.1.1
/ip/route/add dst-address=8.8.8.8 gateway=172.16.2.1@main routing-table=myTable
```

:::tip
为了让用户创建的表能够解析目标，main 路由表也必须能够解析该目标。
:::

在此示例中，**main** 路由表还应包含到 8.8.8.8 的路由，或至少一条默认路由。由于 DHCP 会出于安全考虑动态添加默认路由，请将 8.8.8.8 显式添加到 main 表中。

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

上面的配置还不够。你需要一种方法来强制流量使用新表。RouterOS 提供两个选项：

- firewall mangle - 对用于引导流量的条件提供更多控制，例如按连接或按数据包均衡。示例请参见[防火墙标记](../../firewall-and-quality-of-service/firewall/mangle.md)。
- 路由规则 - 一组用于快速引导流量的基本参数。此示例使用路由规则。

除非必要，不要同时使用这两种方法。如果 mangle 和路由规则一起使用，默认情况下 mangle 具有更高的优先级。如果 mangle 标记的流量可以在表中解析，路由规则将永远看不到该流量。执行顺序可以[更改](./routing-decision.md#routing-table-lookup)。

:::warning
路由表数量限制为 4096 个唯一表。
:::

## 路由规则 {#routing-rules}

路由规则根据源地址、目标地址、in-interface 等基本参数引导流量。

在此示例中，选择发往 8.8.8.8 的流量，并防止回退到 **main** 表：

```ros
/routing/rule/add dst-address=8.8.8.8 action=lookup-only-in-table table=myTable
```

如果某个客户连接到 ether4，并且只有该客户应将 8.8.8.8 路由到特定网关，请使用此规则：

```ros
/routing/rule/add dst-address=8.8.8.8 action=lookup-only-in-table table=myTable interface=ether4
```

如果表中使用的网关宕机，查找会失败，目标将变得不可达。在 active-backup 设置中，通过将动作从 `lookup-only-in-table` 改为 `lookup`，允许流量回退到 **main** 表。

路由规则还可以充当基本防火墙。例如，要阻止 ether4 上的客户访问 192.168.1.0/24：

```ros
/routing/rule/add dst-address=192.168.1.0/24 interface=ether4 action=drop
```

## 示例：让一台设备通过第二个 WAN {#example-send-one-device-through-a-second-wan}

路由器有两条互联网连接：ether1 上的 WAN1，其默认路由来自其 DHCP 客户端；以及 ether2 上的 WAN2，网关为 10.20.0.1。LAN 192.168.88.0/24 上的所有设备都使用 WAN1，但 192.168.88.50 除外，它必须使用 WAN2。为该设备分配固定地址，以便规则能持续匹配它（参见[为设备分配固定地址](../../network-management/dhcp/server.md#give-a-device-a-fixed-address)）。

1. 创建一条经由 WAN2 的默认路由的路由表。使用 `check-gateway=ping` 时，当网关停止响应，该路由会变为非活动状态：

   ```ros
   /routing/table/add name=to-wan2 fib
   /ip/route/add dst-address=0.0.0.0/0 gateway=10.20.0.1 routing-table=to-wan2 check-gateway=ping
   ```

2. 将设备的流量发送到该表：

   ```ros
   /routing/rule/add src-address=192.168.88.50/32 action=lookup table=to-wan2
   ```

   使用 `action=lookup` 时，当经由 WAN2 的路由处于非活动状态，该设备会回退到 WAN1。若要使其不经过 WAN1，请使用 `lookup-only-in-table`。

3. 对经由 WAN2 离开的流量进行伪装，与 WAN1 相同：

   ```ros
   /ip/firewall/nat/add chain=srcnat out-interface=ether2 action=masquerade
   ```

该规则会将设备的所有流量发送到该表，包括发往路由器上其他网络的流量，例如访客 LAN 或 WAN1 调制解调器所在的网络。要直接访问此类网络，请在第一条规则之前为其添加一条规则：

```ros
/routing/rule/add dst-address=192.168.1.0/24 action=lookup-only-in-table table=main place-before=0
```

在你添加规则之前设备已建立的连接可能会继续使用 WAN1，直到这些连接结束。要检查路径，请在设备上运行 traceroute：路由器之后的下一跳就是 WAN2 网关。
