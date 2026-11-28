---
title: "Traceroute"
description: "Traceroute 通过分析 TTL 值和 ICMP“Time Exceeded”消息，显示数据包到达远程主机所经过的路径，帮助识别多跳网络中的路由问题或瓶颈。"
tags:
  - 'traceroute'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/traceroute
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/tool/traceroute`

**Traceroute** 显示数据包到达远程主机所经过的路由器列表。**traceroute** 或 **tracepath** 工具几乎可在所有类 Unix 操作系统上使用，Microsoft Windows 操作系统上则提供 **tracert**。

Traceroute 的工作基于 TTL 值和 ICMP “Time Exceeded” 消息。请记住，IP 报头中的 TTL 值用于避免路由环路。每一跳都会将 TTL 值减 1。如果 TTL 降为零，数据包将被丢弃，并在此情况下向发送方发回 ICMP Time Exceeded 消息。

最初，traceroute 将 TTL 值设置为 1。当下一跳路由器发现 TTL = 1 的数据包时，会将 TTL 值设置为零，并向源地址响应 ICMP "time exceeded" 消息。该消息让源地址知道数据包经过该特定路由器作为一跳。下一次 TTL 值增加 1，依此类推。通常，通往目标路径上的每个路由器都会将 TTL 字段减 1，直到 TTL 降为零。

使用该命令可以查看数据包如何通过网络传输，以及可能在何处失败或变慢。利用这些信息，可以确定可能导致网络问题或故障的计算机、路由器、交换机或其他网络设备。

## 快速示例 {#quick-example}

通过跟踪到远程目标的路由，可以确定连接问题是否存在于本地网络、ISP 网关或更上游的位置。

```ros
[admin@MikroTik] > tool traceroute 10.255.255.1
     ADDRESS                                    STATUS
   1       10.0.1.17 2ms 1ms 1ms 
   2    10.255.255.1 5ms 1ms 1ms
```

在此场景中，输出确认通过位于 `10.0.1.17` 的本地网关成功到达目标主机 `10.255.255.1`。在排查多跳 VPN 隧道或复杂路由表时，该工具尤其有用，因为流量可能正在从意外的出口接口发出。监控每一跳的毫秒响应时间有助于定位网络基础设施中的特定瓶颈或抖动。
