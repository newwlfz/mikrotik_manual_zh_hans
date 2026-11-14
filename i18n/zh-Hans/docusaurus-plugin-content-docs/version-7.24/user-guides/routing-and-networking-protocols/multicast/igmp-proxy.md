---
sidebar_key: "routing-and-networking-protocols/multicast/igmp-proxy"
sidebar_position: 2
title: "IGMP 代理"
sidebar_label: "IGMP 代理"
description: "RouterOS 中的 IGMP Proxy 功能通过转发 IGMP 帧来实现组播路由，为某些拓扑提供比 PIM-SM 更简单的替代方案。它支持基本的组播转发且资源占用极低，但不支持复杂路由设置和环路检测。"
tags:
  - 'igmp'
  - 'multicast'
  - 'routing'
slug: /user-guides/routing-and-networking-protocols/multicast/igmp-proxy
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/multicast/igmp-proxy
captured_at: '2026-11-04T11:33:54+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Internet Group Management Protocol（IGMP）代理可以实现组播路由。它转发 IGMP 帧，通常用于不需要像 PIM 这样更高级协议的场景。

## IGMP 代理功能 {#igmp-proxy-features}

- 实现组播路由的最简单方式。
- 可用于因某些原因不适合使用 PIM-SM 的拓扑。
- 相比 PIM-SM 占用的资源略少。
- 配置简单。

另一方面，IGMP 代理不太适合复杂的组播路由设置。与基于 PIM 的解决方案相比，IGMP 代理不支持多个上游接口，并且不会检测或避免路由环路。

默认情况下，IGMP 代理上游接口会发送 IGMPv3 成员报告，并会根据收到的查询检测上游设备（例如组播路由器）正在使用的 IGMP 版本。如果收到 IGMPv1/v2 查询，上游端口将回退到较低的 IGMP 版本。当 IGMPv1/v2 查询器存在计时器（400s）到期后，它将转换回 IGMPv3。IGMP 代理的下游接口只会发送 IGMPv2 查询。

:::warning
RouterOS v7 在主 **system** 软件包中提供了 IGMP 代理配置。较旧的 RouterOS 版本需要安装额外的 **multicast** 软件包才能使用 IGMP 代理。有关 [软件包](../../../getting-started/installation-and-upgrade/packages.md) 的更多详细信息，请参阅。
:::

## 示例 {#examples}

---

要将来自 ether2 接口的所有组播数据转发到连接订阅者的下游 bridge 接口，请使用以下配置。两个接口都应具有 IP 地址。

```ros
/routing/igmp-proxy/interface
add interface=ether2 upstream=yes
add interface=bridge1

[admin@MikroTik] /routing/igmp-proxy/interface/print
Flags: U - UPSTREAM
Columns: INTERFACE, THRESHOLD
#   INTERFACE  THRESHOLD
0 U ether2             1
1   bridge1            1
```

如果组播发送方地址位于本地路由器无法直接访问的 IP 子网中，您可能还需要在上游接口上配置 `alternative-subnets`：

```ros
/routing/igmp-proxy/interface
set [find upstream=yes] alternative-subnets=192.168.50.0/24,192.168.60.0/24
```
