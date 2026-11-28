---
title: "速度测试"
description: "速度测试通过远程路由器的带宽测试服务器，一次运行即可测量两台 MikroTik 路由器之间双向的 ping、抖动以及 TCP 和 UDP 吞吐量。"
tags:
  - 'speed-test'
  - 'bandwidth'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/speed-test
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Speed test 通过一条命令测量此路由器与另一台 MikroTik 路由器之间的链路：通过 ping 测量延迟和抖动，然后测量双向 TCP 和 UDP 吞吐量。它会连接到另一台路由器的带宽测试服务器，并在吞吐量结果旁显示路由器的 CPU 负载。使用它可检查两个站点之间的链路、无线回传或 VPN 隧道的实际表现。要测试单个协议或单个方向，或设置数据包大小和速度限制，请改用 [Bandwidth test](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test)。

## 前提条件 {#prerequisites}

- 带宽测试服务器运行在远程路由器上。它默认启用，使用 `authenticate=yes`（`/tool/bandwidth-server`）。
- 远程路由器上有一个用于测试的用户，所属组具有 `test` 和 `winbox` 权限。默认的 `read` 和 `full` 组均具备这两项权限。
- 防火墙允许测试通过：远程路由器接受来自测试路由器的 ICMP（默认防火墙会接受）、TCP 端口 2000 和 UDP 端口 2000-65535，测试路由器接受来自远程路由器的 UDP。
- [设备模式](/docs/system-information-and-utilities/device-mode) 在两台路由器上均允许 `bandwidth-test`。使用 `/system/device-mode/print` 检查（`bandwidth-test: yes`）。大多数随 RouterOS 7.17 或更高版本交付的路由器使用 `home` 或 `basic` 模式，会关闭该功能（CCR 和 1100 系列路由器使用 `advanced`）。启用它需要物理访问路由器。

要限制哪些路由器可以对某台路由器运行测试，请设置其带宽测试服务器的 `allowed-addresses4` 和 `allowed-addresses6`。测试用户的 `address` 设置不会限制带宽测试登录。不要在互联网可访问的路由器上设置 `authenticate=no`。

## 测试到另一台路由器的链路 {#test-the-link-to-another-router}

要检查从路由器 A（192.168.88.1）到路由器 B（192.168.88.2）的链路性能，请在路由器 B 上添加一个用于测试的用户。仅具有 `test` 和 `winbox` 权限的组即可：

```ros
/user/group/add name=speedtest policy=test,winbox
/user/add name=speedtest group=speedtest password=YourStrongPassword
```

在路由器 A 上运行测试。使用要测量路径上路由器 B 的地址：对于 VPN，使用路由器 B 的隧道地址。测试会在整个持续时间内占满链路，因此链路用户会感知到。`test-duration=5s` 会使测试每个部分持续 5 秒，足以进行快速检查。使用默认设置时，整个测试大约需要一分钟；在高延迟链路上，请使用默认值或更长的持续时间：

```ros
/tool/speed-test address=192.168.88.2 test-duration=5s \
    user=speedtest password=YourStrongPassword
```

测试期间，路由器会更新结果。测试结束时，会显示：

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

当远程路由器只能通过互联网访问且位于默认防火墙之后时，两台路由器都需要配置测试规则。在本示例中，路由器 A（198.51.100.10）运行测试，路由器 B（203.0.113.20）是远程路由器。

在路由器 B 上，允许来自路由器 A 的 TCP 端口 2000 和测试使用的 UDP 端口：

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

在路由器 A 上，允许来自路由器 B 的 UDP。如果没有该规则，路由器 A 的默认防火墙会丢弃路由器 B 发送的 UDP 流量，结果中将没有 `udp-download` 行：

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

## 读取结果 {#read-the-results}

| Line | Shows |
| :-- | :-- |
| `ping-min-avg-max` | ping 的最短、平均和最长往返时间。 |
| `jitter-min-avg-max` | ping 之间往返时间的变化：最小、平均和最大。 |
| `loss` | ping 丢失百分比，以及丢失和发送的 ping 数：`(0/100)` 表示 100 个 ping 均未丢失。 |
| `tcp-download`, `udp-download` | 从远程路由器到本路由器的吞吐量。 |
| `tcp-upload`, `udp-upload` | 从本路由器到远程路由器的吞吐量。 |
| `local-cpu-load`, `remote-cpu-load` | 测试该阶段中本路由器和远程路由器的 CPU 负载。`tcp-download` 仅显示本地负载。 |

下载和上传均从运行测试的路由器角度观察。

`ping` 在吞吐量测试部分之前运行，且链路处于空闲状态，因此它们不会显示负载下的延迟。

吞吐量是测试中所有连接的总和：默认使用 20 个 TCP 连接（在 CPU 核心数超过 20 的路由器上会更多），UDP 部分也会使用多个流。单个连接获得的速率可能较低，例如通过 bonding 或每连接负载均衡时，每个连接只走一条路径。

## 受 CPU 限制的结果 {#results-limited-by-the-cpu}

当测试期间路由器的 CPU 接近满载时，结果会以以下行开始：

```text
;;; results can be limited by cpu, note that traffic generation/termination performance might not be representative of forwarding
;;; performance
```

创建和接收测试流量比转发相同流量消耗更多路由器 CPU。出现该警告时，测试显示的是路由器作为流量源和目的端时的限制。链路以及路由器仅转发的流量可以承载更多。要将路由器或交换机作为被测设备测量，请在另外两台路由器之间运行测试，设备两侧各一台，使测试流量穿过该设备。

在两个站点之间，结果还取决于双方的互联网连接：一个站点的上传就是另一个站点的下载。通过 VPN 时，加密也会增加两台路由器的 CPU 负载。

## 故障排除 {#troubleshoot}

- 每条吞吐量行都出现 `authentication failed`：用户名或密码错误，测试用户所属组缺少 `test` 或 `winbox` 权限，或者未提供 `user`。没有 `user` 时，命令不会发送用户名，只有启用了 `authenticate=no` 的服务器才会接受。ping 部分仍会运行，测试仍会执行完整时长。
- `loss: 100%`：远端路由器未响应 ping。检查地址以及到该地址的路径。如果仍出现吞吐量行，则说明路径上或远端路由器上过滤了 ICMP。
- 只显示 ping 结果，没有吞吐量行：远端路由器的带宽测试服务器已关闭，其防火墙丢弃 TCP 端口 2000，或者其 `allowed-addresses4` 或 `allowed-addresses6` 不包含本路由器。测试仍会执行所有部分。
- 出现 TCP 行，但缺少一条或两条 UDP 行：远端路由器或本路由器的防火墙丢弃了测试的 UDP 流量。本页的防火墙部分包含两台路由器的规则。
- 命令失败并显示 `not allowed by device-mode`：设备模式关闭了本路由器上的 `bandwidth-test`。请参阅 [Device mode](/docs/system-information-and-utilities/device-mode)。

## 技术细节 {#technical-details}

### 测试阶段 {#test-phases}

测试按以下顺序运行五个部分，并显示在 `status` 中：`ping`、`tcp download`、`tcp upload`、`udp download` 和 `udp upload`，然后是 `done`。`test-duration` 设置每个部分的时长：默认 10 秒，至少 5 秒。路由器在各部分之间暂停约 1 秒，因此使用默认设置的测试大约需要 55 秒。

### Ping 阶段 {#ping-phase}

`ping` 部分发送 ICMP echo 请求，每秒 20 个：使用默认 `test-duration` 时为 200 个 ping，使用 `test-duration=5s` 时为 100 个。

### 连接和端口 {#connections-and-ports}

TCP 部分使用 `connection-count` 个 TCP 连接，范围为 1 到 255。默认值为 20；如果运行测试的路由器 CPU 核心数超过 20，则使用该核心数：64 核路由器使用 64，即使服务器的 CPU 核心数较少也是如此。远程服务器的会话列表（`/tool/bandwidth-server/session/print detail`）将该数量显示为 `tcp-connection-count`。TCP 连接访问远程路由器的端口 2000。UDP 部分使用远程路由器上从 `allocate-udp-ports-from` 开始的端口（默认 2000）并依次递增。

有关所有参数，请参阅 [`/tool/speed-test`](/docs/cli-reference/tool/speed-test) 和 [`/tool/bandwidth-server`](/docs/cli-reference/tool/bandwidth-server) CLI 参考。
