---
title: "泛洪 Ping"
description: "Flood ping 在一次运行中发送最多 1000 个 ICMP echo 请求，并且只显示汇总结果：已发送请求数、已接收回复数以及最短、平均和最长往返时间。它需要 traffic-gen device-mode 功能。"
tags:
  - 'icmp'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/flood-ping
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Flood ping 向一台主机发送一系列 ICMP echo 请求，与 [ping](/docs/diagnostics-monitoring-and-troubleshooting/ping) 为每次回复打印一行不同，它只显示汇总信息：发送了多少请求、收到多少回复，以及最短、平均和最长的往返时间。使用它可通过大量请求检查链路是否存在数据包丢失，例如无线链路或 VPN 隧道。它支持 IPv4 和 IPv6 地址，在 SMIPS 架构的设备上不可用。

Flood ping 会给链路和目标设备带来负载，因此仅在你管理的链路和主机上使用。

## 启用 flood ping {#enable-flood-ping}

Flood ping 属于 [device mode](/docs/system-information-and-utilities/device-mode) 的 `traffic-gen` 功能，在所有 device mode 中均默认关闭。在关闭该功能的路由器上，命令会失败并返回 `failure: not allowed by device-mode`。要启用它，请运行更新，并在路由器显示的时间内，通过按下 reset 或 mode 按钮，或关闭再打开电源，在路由器本机确认。随后路由器会重启。[device mode](/docs/system-information-and-utilities/device-mode) 页面介绍了确认方式及其限制：

```ros
/system/device-mode/update traffic-gen=yes
```

## 测试链路的数据包丢失 {#test-a-link-for-packet-loss}

向链路远端发送 1000 个 `size=1400` 的请求：

```ros
/tool/flood-ping address=10.0.0.2 count=1000 size=1400
```

运行结束后，路由器会显示汇总信息：`sent` 和 `received` 请求数，以及往返时间 `min-rtt`、`avg-rtt` 和 `max-rtt`。`sent` 与 `received` 之间的差异即为数据包丢失，可能发生在链路上或目标设备上：许多主机会限制其响应的 ICMP 请求数量，因此请对已知不会限制的设备进行测试。要排查路径上的 MTU 问题，请改用[带 `do-not-fragment` 的 ping](/docs/diagnostics-monitoring-and-troubleshooting/ping#find-the-path-mtu)：flood ping 没有该选项。

对于 IPv6 主机，请提供 IPv6 地址：

```ros
/tool/flood-ping address=2001:db8::2 count=500
```

## Limits

- `count` - 每次运行最多 1000 个请求。
- `size` - 每个请求的大小，10 到 1500。
- `timeout` - 等待每个回复的时间，10 ms 到 5 s。
- `interval` - 请求之间的时间间隔，20 ms 到 5 s。

如需更多请求、更长时间测试，或源地址、VRF 等选项，请使用带 `count` 和 `interval` 的 [ping](/docs/diagnostics-monitoring-and-troubleshooting/ping)。

有关所有参数，请参阅 [`/tool/flood-ping` CLI 参考](/docs/cli-reference/tool/flood-ping)。
