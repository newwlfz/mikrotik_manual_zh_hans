---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/speed-test"
sidebar_position: 6
title: "速度测试"
sidebar_label: "速度测试"
description: "Speed test 在一次运行中，通过远程路由器的 bandwidth test server，测量两台 MikroTik 路由器之间的 ping、jitter 以及双向 TCP 和 UDP 吞吐量。"
tags:
  - 'speed-test'
  - 'bandwidth'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/speed-test
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

速度测试用一条命令测量此路由器与另一台 MikroTik 路由器之间的链路：先通过 ping 测量延迟和抖动，然后测量两个方向上的 TCP 和 UDP 吞吐量。它会连接到另一台路由器的带宽测试服务器，并在吞吐量结果旁显示路由器的 CPU 负载。可用它检查站点间链路、无线回传或 VPN 隧道能提供多少性能。要测试单一协议或单一方向，或要设置数据包大小和速度限制，请改用[带宽测试](./bandwidth-test.md)。

## 先决条件 {#prerequisites}

- 带宽测试服务器运行在远端路由器上。它默认启用，并带有 `authenticate=yes`（`/tool/bandwidth-server`）。
- 远端路由器有一个用于测试的用户，该用户属于具有 `test` 和 `winbox` 策略的组。默认的 `read` 和 `full` 组都具备这两个策略。
- 防火墙允许测试通过：远端路由器接受来自测试路由器的 ICMP（默认防火墙会接受）、TCP 端口 2000 和 UDP 端口 2000-65535，测试路由器接受来自远端路由器的 UDP。
- [设备模式](../system-information-and-utilities/device-mode.md) 在两台路由器上都允许 `bandwidth-test`。用 `/system/device-mode/print` 检查（`bandwidth-test: yes`）。大多数随 RouterOS 7.17 或更高版本出厂的路由器处于 `home` 或 `basic` 模式，这些模式会关闭它（CCR 和 1100 系列路由器处于 `advanced`）。启用它需要物理接触路由器。

要限制哪些路由器可以对某台路由器运行测试，请设置其带宽测试服务器的 `allowed-addresses4` 和 `allowed-addresses6`。测试用户的 `address` 设置不会限制带宽测试登录。不要在互联网可访问的路由器上设置 `authenticate=no`。

## 测试到另一台路由器的链路 {#test-the-link-to-another-router}

要检查从路由器 A（192.168.88.1）到路由器 B（192.168.88.2）的链路能提供多少性能，请在路由器 B 上添加一个用于测试的用户。仅具有 `test` 和 `winbox` 策略的组就足够了：

```ros
/user/group/add name=speedtest policy=test,winbox
/user/add name=speedtest group=speedtest password=YourStrongPassword
```

在路由器 A 上运行测试。使用路由器 B 在你要测量的路径上的地址：对于 VPN，使用路由器 B 的隧道地址。测试在整个持续时间内会占满链路，因此链路上的用户会察觉到。`test-duration=5s` 让测试的每个部分持续 5 秒，这对于快速检查已经足够。使用默认值时，整个测试大约需要一分钟；在高延迟链路上，请使用默认值或更长的持续时间：

```ros
/tool/speed-test address=192.168.88.2 test-duration=5s \
    user=speedtest password=YourStrongPassword
```

路由器会在测试期间更新结果。测试结束时，它会显示：

```ros
              status: done
      time-remaining: 0s
    ping-min-avg-max: 225us / 265us / 432us
  jitter-min-avg-max: 0s / 29us / 164us
                loss: 0% (0/100)
        tcp-download: 930Mbps local-cpu-load:71%
          tcp-upload: 932Mbps local-cpu-load:61% remote-cpu-load:79%
        udp-download: 924Mbps local-cpu-load:46% remote-cpu-load:52%
          udp-upload: 953Mbps local-cpu-load:56% remote-cpu-load:43%
```

当不再需要测试用户时，请在路由器 B 上删除该用户及其组：

```ros
/user/remove speedtest
/user/group/remove speedtest
```

## 为通过互联网进行的测试开放防火墙 {#open-the-firewall-for-a-test-over-the-internet}

当远端路由器只能通过互联网访问，并且位于默认防火墙之后时，两台路由器都需要为测试添加规则。在此示例中，路由器 A（198.51.100.10）运行测试，路由器 B（203.0.113.20）是远端路由器。

在路由器 B 上，接受来自路由器 A 的 TCP 端口 2000 和测试使用的 UDP 端口：

```ros
/ip/firewall/filter/add chain=input action=accept protocol=tcp \
    src-address=198.51.100.10 dst-port=2000 \
    comment="Speed test from router A" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
/ip/firewall/filter/add chain=input action=accept protocol=udp \
    src-address=198.51.100.10 dst-port=2000-65535 \
    comment="Speed test from router A" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

在路由器 A 上，接受来自路由器 B 的 UDP。没有此规则，路由器 A 的默认防火墙会丢弃路由器 B 发送的 UDP 流量，结果中就不会有 `udp-download` 行：

```ros
/ip/firewall/filter/add chain=input action=accept protocol=udp \
    src-address=203.0.113.20 comment="Speed test to router B" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

测试后，在路由器 B 上删除规则：

```ros
/ip/firewall/filter/remove [find comment="Speed test from router A"]
```

在路由器 A 上：

```ros
/ip/firewall/filter/remove [find comment="Speed test to router B"]
```

## 解读结果 {#read-the-results}

| 行 | 显示内容 |
| :-- | :-- |
| `ping-min-avg-max` | ping 的最短、平均和最长往返时间。 |
| `jitter-min-avg-max` | ping 之间往返时间的变化：最小、平均和最大。 |
| `loss` | 丢失 ping 的百分比，然后是丢失和发送的 ping 数：`(0/100)` 表示 100 个 ping 中没有丢失。 |
| `tcp-download`, `udp-download` | 从远端路由器到此路由器的吞吐量。 |
| `tcp-upload`, `udp-upload` | 从此路由器到远端路由器的吞吐量。 |
| `local-cpu-load`, `remote-cpu-load` | 在该部分测试期间，此路由器和远端路由器的 CPU 负载。`tcp-download` 仅显示本地负载。 |

下载和上传是从运行测试的路由器的角度看的。

ping 在吞吐量部分之前、在空闲链路上运行，因此它们不显示负载下的延迟。

吞吐量是测试所有连接的总和：默认 20 个 TCP 连接（CPU 核心数超过 20 的路由器会更多），UDP 部分也使用多个流。单个连接可能获得更少，例如在 bonding 或按连接负载均衡中，每个连接走一条路径。

## 受 CPU 限制的结果 {#results-limited-by-the-cpu}

当测试期间路由器的 CPU 接近满负载时，结果会以以下行开头：

```text
;;; results can be limited by cpu, note that traffic generation/termination performance might not be representative of forwarding
;;; performance
```

生成和接收测试流量比转发相同流量更消耗路由器的 CPU。出现该警告时，测试显示的是作为流量源和目的地的路由器的限制。链路以及路由器仅转发的流量可以承载更多。要将路由器或交换机作为被测设备进行测量，请在另外两台路由器之间运行测试，让这两台路由器分别位于设备两侧，从而使测试流量经过该设备。

在两个站点之间，结果还取决于两条互联网连接：一个站点的上传就是另一个站点的下载。通过 VPN 时，加密也会增加两台路由器的 CPU 负载。

## 故障排除 {#troubleshoot}

- 每条吞吐量行都出现 `authentication failed`：用户名或密码错误，测试用户所在的组缺少 `test` 或 `winbox` 策略，或者未提供 `user`。没有 `user` 时，命令不发送用户名，只有设置了 `authenticate=no` 的服务器才会接受。ping 部分仍会运行，测试仍会耗费其完整时长。
- `loss: 100%`：远端路由器不回应 ping。检查地址以及到它的路径。如果吞吐量行仍然出现，则说明路径上或远端路由器上过滤了 ICMP。
- 只出现 ping 结果，没有吞吐量行：远端路由器的带宽测试服务器已关闭，其防火墙丢弃 TCP 端口 2000，或者其 `allowed-addresses4` 或 `allowed-addresses6` 不包含此路由器。测试仍会运行完所有部分。
- 出现 TCP 行，但一条或两条 UDP 行缺失：远端路由器或此路由器的防火墙丢弃了测试的 UDP 流量。本页的防火墙部分给出了两台路由器的规则。
- 命令失败并提示 `not allowed by device-mode`：设备模式在此路由器上关闭了 `bandwidth-test`。请参阅[设备模式](../system-information-and-utilities/device-mode.md)。

## 技术细节 {#technical-details}

### 测试阶段 {#test-phases}

测试按以下顺序运行五个部分，并在 `status` 中显示：`ping`、`tcp download`、`tcp upload`、`udp download` 和 `udp upload`，然后是 `done`。`test-duration` 设置每个部分的长度：默认 10 秒，至少 5 秒。路由器在各部分之间暂停约一秒，因此使用默认值的测试大约需要 55 秒。

### Ping 阶段 {#ping-phase}

ping 部分发送 ICMP 回显请求，每秒 20 个：使用默认 `test-duration` 时为 200 个 ping，使用 `test-duration=5s` 时为 100 个。

### 连接和端口 {#connections-and-ports}

TCP 部分使用 `connection-count` 个 TCP 连接，范围为 1 到 255。默认值为 20，或者当运行测试的路由器 CPU 核心数超过 20 时，使用其 CPU 核心数：64 核路由器会使用 64，即使对端服务器的核心数更少也是如此。远端服务器的会话列表（`/tool/bandwidth-server/session/print detail`）会以 `tcp-connection-count` 显示该数字。TCP 连接发往远端路由器的端口 2000。UDP 部分使用远端路由器上从 `allocate-udp-ports-from`（默认为 2000）起始的端口。

有关所有参数，请参阅 [`/tool/speed-test`](../cli-reference/tool/speed-test.md) 和 [`/tool/bandwidth-server`](../cli-reference/tool/bandwidth-server/index.md) CLI 参考。
