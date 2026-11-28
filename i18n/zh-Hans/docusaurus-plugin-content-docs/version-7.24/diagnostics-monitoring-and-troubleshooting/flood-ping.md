---
title: "泛洪 Ping"
description: "RouterOS 中的 Flood Ping 工具会持续发送 ICMP echo 请求，用于测试网络稳定性、测量丢包率，并在高流量条件下分析延迟，同时提供已发送/已接收数据包和往返时间的实时统计。"
tags:
  - 'icmp'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/flood-ping
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Flood Ping 工具是 RouterOS 中的诊断工具，用于以尽可能高的速率向目标主机发送连续的 ICMP echo 请求。它主要用于压力测试网络稳定性，并在高流量条件下测量数据包丢失或延迟。

## 快速示例 {#quick-example}

要执行基本负载测试或验证链路稳定性，可以执行 flood-ping，以生成发往目标的高频 ICMP 流量。该工具提供有关数据包丢失和往返时间（RTT）的实时统计信息，以帮助识别潜在的网络瓶颈。使用 `count` 参数限制测试持续时间，或省略该参数，使工具持续运行直到手动停止。

对 IPv4 目标执行高流量 ping 测试：

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
