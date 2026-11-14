---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/speed-test"
sidebar_position: 6
title: "速度测试"
sidebar_label: "速度测试"
description: "Speed Test 工具使用地址、连接数、密码、测试时长和用户凭据等可配置属性，测量 MikroTik 设备之间的 ping、抖动和 TCP/UDP 吞吐量。它提供详细的性能指标，包括测试期间的 CPU 利用率。"
tags:
  - 'speed-test'
  - 'bandwidth'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/speed-test
captured_at: '2026-11-04T11:28:01+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Speed Test 是一个简便的测试工具，用于测量从一台 MikroTik 设备到另一台设备的 ping、抖动、TCP 和 UDP 吞吐量。"speed-test" 命令基于 Ping Tool 和 Bandwidth Test。要使用此命令，需要能够访问 Bandwidth test 服务器。

## 常规接口属性 {#general-interface-properties}

speed-test 基于五个可配置属性：

- address - 主机的 IP 地址。
- connection-count - 如果设备的核心数超过 20，则使用该核心数（默认值为 20）。
- password - 远程设备的密码。
- test-duration - 每次测试的持续时间（*默认值：5 次测试 \* 每次 10 秒 + 每次测试之间 1 秒暂停 = 54 秒*）。
- user - 远程设备的用户名。

## 配置示例 {#configuration-example}

带宽和速度测试应通过设备进行，而不是在设备上进行，以确保贴近真实场景的模拟，并避免因流量生成过程而使被测设备（DUT）的 CPU 过载。

要从设备 A（192.168.88.1）到设备 B（192.168.88.2）运行一个简单的测试：

```ros
[admin@MikroTik] > /tool/speed-test address=192.168.88.2
              status: done
      time-remaining: 0s
    ping-min-avg-max: 541us / 609us / 3.35ms
  jitter-min-avg-max: 0s / 76us / 2.76ms
                loss: 0% (0/100)
        tcp-download: 921Mbps local-cpu-load:30%
          tcp-upload: 920Mbps local-cpu-load:30% remote-cpu-load:25%
        udp-download: 917Mbps local-cpu-load:6% remote-cpu-load:21%
          udp-upload: 916Mbps local-cpu-load:20% remote-cpu-load:6%
```

如果测试期间任一设备的 CPU 利用率达到 100%，将会显示一条警告消息：

```ros
[admin@MikroTik]] > /tool/speed-test address=192.168.88.2
                  ;;; results can be limited by cpu, note that traffic generation/termination 
                      performance might not be representative of forwarding performance
              status: done
      time-remaining: 0s
    ping-min-avg-max: 541us / 609us / 3.35ms
  jitter-min-avg-max: 0s / 76us / 2.76ms
                loss: 0% (0/100)
        tcp-download: 721Mbps local-cpu-load:78%
          tcp-upload: 820Mbps local-cpu-load:100% remote-cpu-load:84%
        udp-download: 906Mbps local-cpu-load:10% remote-cpu-load:54%
          udp-upload: 895Mbps local-cpu-load:55% remote-cpu-load:12%
```

"test-duration" 参数允许更改全部 5 项测试的持续时间：

1) 带 50ms 延迟的 Ping 测试。
2) TCP 接收。
3) TCP 发送。
4) UDP 接收。
5) UDP 发送。
