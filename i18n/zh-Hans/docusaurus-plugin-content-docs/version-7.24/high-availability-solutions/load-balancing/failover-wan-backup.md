---
sidebar_key: "high-availability-solutions/load-balancing/failover-wan-backup"
sidebar_position: 1
title: "故障转移（WAN 备份）"
sidebar_label: "故障转移"
description: "本页说明如何在 MikroTik RouterOS 中使用递归路由为 WAN 连接配置故障转移，并详细介绍了使用基础监控配置和改进监控配置的设置步骤，以实现可靠的链路切换。"
tags:
  - 'failover'
source: https://manual.mikrotik.com/docs/7.24/high-availability-solutions/load-balancing/failover-wan-backup
captured_at: '2026-11-04T11:29:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

本文介绍一种使用递归路由和路由作用域的高级故障转移方法。当一条路由（静态或动态学习的）具有未直接连接到本地路由器的下一跳时，就会发生递归路由。有必要限制可用于查找直接下一跳的路由集合。例如，RIP 或 OSPF 路由的下一跳值应当是可直接到达的，并且只能使用直连路由来查找。这可以通过使用 scope 和 target-scope 属性来实现。

## 设置概览 {#setup-overview}

假设我们的网关有两条公网上行链路（"ISP1"、"ISP2"）。第一条上行链路应优先使用，第二条应作为备份。

然后我们将流量分成两部分进行标记：一部分命名为 "ISP1"，另一部分命名为 "ISP2"，并分别通过 ether1 和 ether2。在此设置中，我们希望监控两台主机：Host1 和 Host2。我们将使用 IP 为 8.8.8.8（Host1）和 8.8.4.4（Host2）的 Google DNS 服务器，但并非必须使用这些特定地址。

![failover.png](/img/e885236b5be34b63.webp)

## 配置 {#configuration}

### 基本故障转移 {#basic-failover}

在配置故障转移之前，我们必须对经过两条上行链路的 LAN 流量进行伪装。这允许本地网络中的设备通过任一连接访问互联网：

```ros
/ip/firewall/nat
add chain=srcnat action=masquerade out-interface=ether1
add chain=srcnat action=masquerade out-interface=ether2
```

接下来，我们需要在互联网上定义两台可访问的主机，以监控每条上行链路的状态。这些主机应当可靠并响应 ICMP 请求。在本示例中，我们使用 Google 的 DNS 服务器（8.8.8.8 和 8.8.4.4）：

```ros
/ip/route 
add dst-address=8.8.8.8 scope=10 gateway=10.111.0.1
add dst-address=8.8.4.4 scope=10 gateway=10.112.0.1
```

最后，我们添加将通过两台测试主机递归解析的默认路由。ISP1 连接作为主链路（配置为较低的 distance 值）：

```ros
/ip/route/
add distance=1 gateway=8.8.8.8 target-scope=11 check-gateway=ping
add distance=2 gateway=8.8.4.4 target-scope=11 check-gateway=ping
```

此配置确保当主上行链路不可用时，流量会自动故障转移到辅助连接。

### 提高检测可靠性 {#improve-detection-reliability}

目前，我们依赖单台主机进行链路可达性监控。尽管 Google 服务很少不可用，但我们可以通过在每条链路上添加第二台监控主机来提高可靠性。

```ros
/ip/route
add dst-address=208.67.222.222 gateway=10.111.0.1 scope=10
add dst-address=208.67.220.220 gateway=10.112.0.1 scope=10

add distance=1 gateway=208.67.222.222 target-scope=11 check-gateway=ping
add distance=2 gateway=208.67.220.220 target-scope=11 check-gateway=ping
```

此配置会创建一条 ECMP 默认路由。如果只有一个网关变得不可达，第一条链路上的默认路由仍保持活动。只有当所有网关主机都变得不可达时，才会完全故障转移到第二条链路。
