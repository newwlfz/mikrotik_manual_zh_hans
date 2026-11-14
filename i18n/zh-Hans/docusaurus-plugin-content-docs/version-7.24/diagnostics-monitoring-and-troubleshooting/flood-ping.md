---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/flood-ping"
sidebar_position: 7
title: "泛洪 Ping"
sidebar_label: "泛洪 Ping"
description: "RouterOS 中的 Flood Ping 工具会持续发送 ICMP 回显请求，用于测试网络稳定性、测量丢包情况，并在高流量条件下分析延迟，同时实时统计已发送/已接收的数据包和往返时间。"
tags:
  - 'icmp'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/flood-ping
captured_at: '2026-11-04T11:27:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Flood Ping 工具是 RouterOS 中的一款诊断实用程序，旨在以尽可能高的速率向目标主机发送连续的 ICMP 回显请求流。它主要用于对网络稳定性进行压力测试，并衡量高流量条件下的丢包或延迟。

## 快速示例 {#quick-example}

要执行基本的负载测试或验证链路稳定性，可以执行 flood-ping 向目标生成高频 ICMP 流量。该工具提供有关丢包和往返时间 (RTT) 的实时统计信息，帮助识别潜在的网络瓶颈。使用 `count` 参数限制测试持续时间，或省略该参数以使实用程序无限期运行，直到手动停止。

对 IPv4 目标执行大批量 ping 测试：

```ros
/tool/flood-ping address=10.155.114.1 count=1000
```

对 IPv6 目标执行 flood-ping，以验证双栈性能：

```ros
/tool/flood-ping address=2001:0db8::2 count=500
```

示例输出：

```ros
[admin@MikroTik] > /tool/flood-ping address=10.155.114.1 count=1000
      sent: 1000
  received: 1000
   min-rtt:    0
   avg-rtt:    0
   max-rtt:    1

[admin@MikroTik] > /tool/flood-ping address=2001:0db8::2 count=500
      sent: 500
  received: 500
   min-rtt:   0
   avg-rtt:   0
   max-rtt:   3
```
