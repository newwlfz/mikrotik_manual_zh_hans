---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/flood-ping"
sidebar_position: 7
title: "泛洪 Ping"
sidebar_label: "泛洪 Ping"
description: "Flood ping 在一次运行中最多发送 1000 个 ICMP echo 请求，并且只显示汇总信息：发送的请求数、收到的回复数，以及最短、平均和最长往返时间。它需要 traffic-gen 设备模式功能。"
tags:
  - 'icmp'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/flood-ping
captured_at: '2026-11-04T11:15:16+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Flood ping 向一台主机发送一串 ICMP 回显请求，并且不像 [ping](./ping.md) 那样为每个应答打印一行，而是只显示总计：发送了多少请求、收到了多少应答，以及最短、平均和最长往返时间。可用它通过发送大量请求来检查链路的丢包情况，例如无线链路或 VPN 隧道。它支持 IPv4 和 IPv6 地址，在 SMIPS 架构的设备上不可用。

Flood ping 会给链路和目标主机带来负载，因此只在你自己管理的链路和主机上使用。

## 启用 flood ping {#enable-flood-ping}

Flood ping 属于 [设备模式](../system-information-and-utilities/device-mode.md) 的 `traffic-gen` 功能，该功能在所有 device mode 下默认关闭。在未启用该功能的路由器上，命令会失败并提示 `failure: not allowed by device-mode`。要启用它，请运行更新命令，并在路由器显示的时间内，在路由器本机上通过按下 reset 或 mode 按钮，或者关闭再打开电源来完成确认。随后路由器会重启。[设备模式](../system-information-and-utilities/device-mode.md) 页面介绍了确认方式及其限制：

```ros
/system/device-mode/update traffic-gen=yes
```

## 测试链路丢包 {#test-a-link-for-packet-loss}

要向链路对端发送 1000 个 `size=1400` 的请求：

```ros
/tool/flood-ping address=10.0.0.2 count=1000 size=1400
```

运行结束后，路由器会显示总计：`sent` 和 `received` 请求数，以及往返时间 `min-rtt`、`avg-rtt` 和 `max-rtt`。`sent` 与 `received` 之间的差异就是丢包，可能发生在链路上或目标主机处：许多主机会限制其应答的 ICMP 请求数量，因此要针对你确定不会做此限制的设备进行测试。要查找路径上的 MTU 问题，请改用带 `do-not-fragment` 的 [ping](./ping.md#find-the-path-mtu)：flood ping 没有此类选项。

对于 IPv6 主机，请提供 IPv6 地址：

```ros
/tool/flood-ping address=2001:db8::2 count=500
```

## 限制 {#limits}

- `count` - 每次运行最多 1000 个请求。
- `size` - 每个请求的大小，10 到 1500。
- `timeout` - 等待每个应答的时间，10 ms 到 5 s。
- `interval` - 请求之间的间隔，20 ms 到 5 s。

如需更多请求、更长的测试，或源地址、VRF 之类的选项，请使用带 `count` 和 `interval` 的 [ping](./ping.md)。

有关所有参数，请参阅 [`/tool/flood-ping` CLI 参考](../cli-reference/tool/flood-ping.md)。
