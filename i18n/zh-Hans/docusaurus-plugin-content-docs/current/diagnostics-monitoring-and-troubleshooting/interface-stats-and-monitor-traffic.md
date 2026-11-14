---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/interface-stats-and-monitor-traffic"
sidebar_position: 8
title: "接口统计与 monitor-traffic"
sidebar_label: "接口统计与 monitor-traffic"
description: "MikroTik RouterOS 上的接口统计与实时流量监控：使用 print 查看接口计数器（stats、stats-detail），使用 monitor-traffic 观察每秒速率，并通过 /tool/traffic-monitor 在速率越过阈值时运行脚本触发。"
tags:
  - 'stats'
  - 'monitor-traffic'
  - 'interface'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/interface-stats-and-monitor-traffic
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

每个 RouterOS 接口都包含各种计数器，例如接收和发送的数据包数量、[Fast Path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path) 字节数、物理侧链路断开次数，以及被接口队列丢弃的数据包。这些统计数据可实时反映网络利用率和硬件性能；`monitor-traffic` 命令显示每秒实时速率视图，用于验证吞吐量并排查瓶颈。

## 检查计数器 {#inspect-the-counters}

使用 `stats`（或使用 `stats-detail` 获取包含链路事件的逐接口列表）打印每个接口的累计计数器：

```ros
[admin@MikroTik] > /interface/print stats
Flags: X - DISABLED; R - RUNNING; S - SLAVE
Columns: NAME, RX-BYTE, TX-BYTE, RX-PACKET, TX-PACKET, RX-DROP, TX-DROP,
         TX-QUEUE-DROP, RX-ERROR, TX-ERROR
#     NAME            RX-BYTE    TX-BYTE  RX-PACKET  TX-PACKET  R  T  T  R  T
0   S ether1                0          0          0          0        0
1  RS ether2       28 805 078  8 117 511    221 798     17 287        0
2   S ether3                0          0          0          0        0
3   S ether4                0          0          0          0        0
4   S ether5                0          0          0          0        0
```

以 `fp` 开头的值是 Fast Path 计数器；`tx-queue-drop` 统计被[接口队列](../firewall-and-quality-of-service/queues/index.md#interface-queue)丢弃的数据包数（一种拥塞信号）。`stats-detail` 增加 link-up/down 时间戳和 `link-downs` 计数，它们用于发现线缆抖动（当该数字持续上升时，检查线缆、SFP 或 PoE；接口特定的错误计数器位于[以太网统计](../wired-connections/ethernet.md#stats)菜单中）：

```ros
[admin@MikroTik] > /interface/print stats-detail
Flags: X - DISABLED; R - RUNNING; S - SLAVE
 0   S name="ether1" link-downs=0 rx-byte=0 tx-byte=0 rx-packet=0 tx-packet=0
       tx-queue-drop=0 fp-rx-byte=0 fp-tx-byte=0 fp-rx-packet=0 fp-tx-packet=0
       fp-rps-drop=0

 1  RS name="ether2" last-link-up-time=2026-10-09 12:41:25 link-downs=0
       rx-byte=28 805 078 tx-byte=8 117 511 rx-packet=221 798 tx-packet=17 287
       tx-queue-drop=0 fp-rx-byte=27 917 886 fp-tx-byte=0 fp-rx-packet=221 798
       fp-tx-packet=0 fp-rps-drop=0
```

## 查看实时速率 {#watch-the-live-rate}

`/interface/monitor-traffic` 显示所选接口的每秒速率：

```ros
[admin@MikroTik] > /interface/monitor-traffic ether2 duration=3
                       name:   ether2
      rx-packets-per-second:       26
         rx-bits-per-second: 26.4kbps
   fp-rx-packets-per-second:       26
      fp-rx-bits-per-second: 25.6kbps
      tx-packets-per-second:        2
         tx-bits-per-second: 12.7kbps
   fp-tx-packets-per-second:        0
      fp-tx-bits-per-second:     0bps
  tx-queue-drops-per-second:        0
```

该视图会持续刷新，直到你停止它；使用 `duration` 限制其持续时间。用它验证新配置的 VLAN 或桥接成员是否通过流量，或验证 WAN 端口是否没有通过超出应有量的流量。传入多个接口可并排比较，或使用 `aggregate` 观察整个路由器。当单个接口持续繁忙时，使用 [Torch](./torch.md) 获取按连接细分的数据。

## 在速率阈值上触发脚本 {#trigger-a-script-on-a-rate-threshold}

`/tool/traffic-monitor` 菜单会在接口的发送或接收速率高于（`above`）阈值、低于阈值，或每次轮询（`always`）时运行脚本：

```ros
/system/script/add name=rate-alert \
    source=":log info \"ether2 over threshold\""
/tool/traffic-monitor/add name=high-load interface=ether2 \
    traffic=received trigger=above threshold=100000000 \
    on-event=rate-alert
```

:::warning
`/tool/traffic-monitor` 菜单使用 `ftp`、`reboot`、`read`、`write` 和 `test` 策略来运行脚本。有关更多信息，请参阅[脚本权限](../developer-guides/scripting/index.md#script-permissions)。
:::

## 技术细节 {#technical-details}

- 以 `fp` 开头的值统计走 Fast Path（精简的 CPU 转发路径）的流量。当常规计数器的增长速度远快于 fp 计数器时，说明流量转而走完整的 CPU 路径（防火墙处理等）——这在繁忙的路由器上很有用。
- 接口丢弃/错误计数器（`rx-drop`、`tx-drop`、`rx-error`、`tx-error`）统计驱动程序发现的问题；`tx-queue-drop` 则属于队列系统。
- `link-downs` 只统计物理链路断开；若 VLAN 成员上该数字不断上升却没有任何 link-down 时间戳，通常说明该成员的父接口存在物理问题。

有关所有计数器和速率行，请参阅 [`/interface`](../cli-reference/interface/index.md) 和 [`/interface/monitor-traffic`](../cli-reference/interface/monitor-traffic.md) CLI 参考；[以太网统计](../wired-connections/ethernet.md#stats) 菜单还提供了硬件层级的计数器。
