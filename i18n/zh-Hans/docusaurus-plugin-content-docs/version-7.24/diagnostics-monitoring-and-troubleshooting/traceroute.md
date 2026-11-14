---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traceroute"
sidebar_position: 2
title: "跟踪路由"
sidebar_label: "跟踪路由"
description: "Traceroute 通过分析 TTL 值和 ICMP 的“Time Exceeded”消息，显示数据包到达远程主机所经过的路径，有助于识别多跳网络中的路由问题或瓶颈。"
tags:
  - 'traceroute'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/traceroute
captured_at: '2026-11-04T11:28:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/tool/traceroute`

**Traceroute** 显示数据包到达远程主机所经过的路由器列表。**traceroute** 或 **tracepath** 工具几乎可在所有类 Unix 操作系统上使用，而在 Microsoft Windows 操作系统上则提供 **tracert**。

Traceroute 的运行基于 TTL 值和 ICMP “Time Exceeded” 消息。请记住，IP 头中的 TTL 值用于避免路由环路。每一跳都会将 TTL 值减 1。如果 TTL 达到零，数据包会被丢弃，并在此时向发送方返回一条 ICMP Time Exceeded 消息。

最初，通过 traceroute，TTL 值设置为 1；当下一个路由器发现 TTL = 1 的数据包时，会将 TTL 值设置为零，并向源返回一条 ICMP "time exceeded" 消息。此消息让源知道该数据包将那个特定路由器作为一跳经过。下一次 TTL 值增加 1，依此类推。通常，通往目的地的路径上的每个路由器都会将 TTL 字段递减一个单位，直到 TTL 达到零。

使用此命令，你可以查看数据包如何在网络中传输，以及可能在何处失败或变慢。利用此信息，你可以确定可能造成网络问题或故障的计算机、路由器、交换机或其他网络设备。

## 快速示例 {#quick-example}

通过跟踪到远程目的地的路由，你可以确定连接问题是位于本地网络内、ISP 网关处，还是更上游的位置。

```ros
[admin@MikroTik] > tool traceroute 10.255.255.1
     ADDRESS                                    STATUS
   1       10.0.1.17 2ms 1ms 1ms 
   2    10.255.255.1 5ms 1ms 1ms
```

在此场景中，输出确认了经本地网关 `10.0.1.17` 到目标主机 `10.255.255.1` 的成功路径。在排查多跳 VPN 隧道或复杂路由表（其中流量可能从意外的出接口发出）时，此工具特别有用。监控每一跳的毫秒级响应时间有助于精确定位网络基础设施中的具体瓶颈或抖动。
