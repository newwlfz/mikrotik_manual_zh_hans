---
title: "故障转移（WAN 备份）"
description: "本页介绍如何在 MikroTik RouterOS 中使用递归路由配置 WAN 连接故障转移，并详细说明基础监控配置和增强监控配置的设置步骤，以实现可靠的链路切换。"
tags:
  - 'failover'
source: https://manual.mikrotik.com/docs/7.24/high-availability-solutions/load-balancing/failover-wan-backup
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "high-availability-solutions/load-balancing"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

本文介绍一种使用递归路由和路由范围的高级故障切换方法。当某条路由（静态路由或动态学习到的路由）的下一跳未直接连接到本地路由器时，就会发生递归路由。必须限制可用于查找直接下一跳的路由集合。例如，RIP 或 OSPF 路由的下一跳值应当可直接到达，并且应仅使用直连路由进行查找。这可以通过 `scope` 和 `target-scope` 属性实现。

## 配置概述 {#setup-overview}

假设网关有两条公网上行链路（“ISP1”、“ISP2”）。第一条上行链路应优先使用，第二条作为备份。

然后将流量分为两部分进行标记，一部分名称为“ISP1”，另一部分为“ISP2”，分别经过 ether1 和 ether2。在此配置中，要监控两台主机：Host1 和 Host2。我们将使用 IP 为 8.8.8.8（Host1）和 8.8.4.4（Host2）的 Google DNS 服务器，但并非必须使用这些特定地址。

![failover.png](/img/e885236b5be34b63.webp)

## 配置 {#configuration}

### 基本故障切换 {#basic-failover}

配置故障切换前，必须对通过两条上行链路的 LAN 流量执行 masquerade。这样，本地网络中的设备可以通过任一连接访问互联网：

```ros
/ip/firewall/nat
add chain=srcnat action=masquerade out-interface=ether1
add chain=srcnat action=masquerade out-interface=ether2
```

接下来，需要定义互联网上的两个可达主机，以监控每条上行链路的状态。这些主机应可靠，并响应 ICMP 请求。在本例中，使用 Google 的 DNS 服务器（8.8.8.8 和 8.8.4.4）：

```ros
/ip/route 
add dst-address=8.8.8.8 scope=10 gateway=10.111.0.1
add dst-address=8.8.4.4 scope=10 gateway=10.112.0.1
```

最后，添加将通过两个测试主机递归解析的默认路由。ISP1 连接作为主链路（配置较小的 distance 值）：

```ros
/ip/route/
add distance=1 gateway=8.8.8.8 target-scope=11 check-gateway=ping
add distance=2 gateway=8.8.4.4 target-scope=11 check-gateway=ping
```

此配置可确保当主上行链路不可用时，流量自动故障切换到备用连接。

### 提高检测可靠性 {#improve-detection-reliability}

目前，我们依赖单个主机监控链路可达性。尽管 Google 服务很少不可用，但可以通过在每条链路上添加第二个监控主机来提高可靠性。

```ros
/ip/route
add dst-address=208.67.222.222 gateway=10.111.0.1 scope=10
add dst-address=208.67.220.220 gateway=10.112.0.1 scope=10

add distance=1 gateway=208.67.222.222 target-scope=11 check-gateway=ping
add distance=2 gateway=208.67.220.220 target-scope=11 check-gateway=ping
```

此配置会创建一条 ECMP 默认路由。如果只有一个网关不可达，第一条链路上的默认路由仍保持活动状态。只有当所有网关主机都不可达时，才会完全故障切换到第二条链路。
