---
title: "速度测试"
description: "Speed Test 工具通过 address、connection count、password、test duration 和 user credentials 等可配置属性，测量 MikroTik 设备之间的 ping、jitter 和 TCP/UDP 吞吐量。它提供详细的性能指标，包括测试期间的 CPU 利用率。"
tags:
  - 'speed-test'
  - 'bandwidth'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/speed-test
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Speed Test 是一种简单的测试工具，用于测量一台 MikroTik 设备到另一台 MikroTik 设备的 ping、抖动、TCP 和 UDP 吞吐量。“speed-test”命令基于 Ping Tool 和 Bandwidth Test。要使用该命令，需要能够访问 Bandwidth test server。

## 常规接口属性 {#general-interface-properties}

speed-test 基于五个可配置属性：

- address - 主机的 IP 地址。
- connection-count - 如果设备有超过 20 个核心，将使用核心数量（默认值为 20）。
- password - 远程设备的密码。
- test-duration - 每项测试的持续时间（*默认情况下：5 项测试 \* 每项 10 秒 + 每项测试之间暂停 1 秒 = 54 秒*）。
- user - 远程设备的用户名。

## 配置示例 {#configuration-example}

带宽和速度测试应通过设备进行，而不是在设备上执行，以模拟真实场景，并避免因流量生成过程导致被测设备（DUT）的 CPU 过载。

要执行从设备 A（192.168.88.1）到设备 B（192.168.88.2）的简单测试：

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

如果测试期间任一设备的 CPU 利用率达到 100%，将显示警告消息：

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

`test-duration` 参数用于更改所有 5 项测试的持续时间：

1) 延迟为 50ms 的 Ping 测试。
2) TCP 接收。
3) TCP 发送。
4) UDP 接收。
5) UDP 发送。
