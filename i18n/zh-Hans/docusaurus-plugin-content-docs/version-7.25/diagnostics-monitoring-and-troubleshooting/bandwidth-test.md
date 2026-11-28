---
title: "带宽测试"
description: "带宽测试用于测量两台 MikroTik 路由器之间的 TCP 或 UDP 吞吐量：客户端在 /tool/bandwidth-test 中向另一台路由器的带宽测试服务器发送数据或从该服务器接收数据。本文涵盖前提条件、固定速率或最大速率测试、结果解读以及服务器安全加固。"
tags:
  - 'bandwidth'
  - 'throughput'
  - 'tcp'
  - 'udp'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/bandwidth-test
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

带宽测试用于测量两台 MikroTik 路由器之间的吞吐量。一台路由器上的客户端（`/tool/bandwidth-test`）连接到另一台路由器上的带宽测试服务器（`/tool/bandwidth-server`），发送或接收 TCP 或 UDP 流量，并每秒显示速率。使用它检查无线或 WAN 链路，或查找路径上的瓶颈。

要在一次运行中测量双向的延迟、抖动以及 TCP 和 UDP 吞吐量，请使用 [Speed test](/docs/diagnostics-monitoring-and-troubleshooting/speed-test)。

:::warning
未设置速度限制的测试会占用路径可提供的全部带宽以及路由器 CPU 的大量时间，链路上的其他流量、路由协议和管理访问都会受到影响。在正在使用的链路上，请设置速度限制，或在链路空闲时测试。
:::

## 前提条件 {#prerequisites}

在运行服务器的路由器上：

- 带宽测试服务器已开启。默认开启，并启用认证：

  ```ros
  [admin@MikroTik] > /tool/bandwidth-server/print
                    enabled: yes
               authenticate: yes
    allocate-udp-ports-from: 2000
               max-sessions: 100
         allowed-addresses4:
         allowed-addresses6:
  ```

- [设备模式](/docs/system-information-and-utilities/device-mode)允许在服务器和客户端上进行带宽测试：`/system/device-mode/print` 显示 `bandwidth-test: yes`。大多数随 RouterOS 7.17 或更高版本交付的路由器使用 `home` 或 `basic` 模式，会关闭该功能（CCR 和 1100 系列路由器使用 `advanced` 模式）。开启该功能需要物理访问路由器，因此在远程站点安装路由器前请检查此项。
- 服务器上有一个供客户端登录的用户，该用户所在组同时具有 `test` 和 `winbox` 权限；服务器会检查这两项。默认 `read` 和 `full` 组都具有这两项权限，因此现有管理员也可使用。仅包含这两项权限的组即可：

  ```ros
  /user/group/add name=btest policy=test,winbox
  /user/add name=btest group=btest password=change-this-password
  ```

- 防火墙允许来自客户端的 TCP 端口 2000 和 UDP 端口 2000-65535。默认防火墙会丢弃来自 WAN 侧的这些流量；当服务器只能通过互联网访问时，请为测试添加规则，如[为通过互联网进行的测试开放防火墙](/docs/diagnostics-monitoring-and-troubleshooting/speed-test#open-the-firewall-for-a-test-over-the-internet)所示，并在测试后删除这些规则。

在客户端，`receive` 和 `both` 方向的 UDP 测试需要服务器的 UDP 数据包能够到达：位于 NAT 之后或防火墙会丢弃这些数据包的客户端不会收到任何内容。此时请使用 TCP，或在客户端允许来自服务器的 UDP。

测试后，删除测试用户（`/user/remove btest` 和 `/user/group/remove btest`）以及你添加的所有防火墙规则。

## 测试链路 {#test-a-link}

要在不占用无线链路的情况下检查其是否能在每个方向承载 50 Mbit/s，请在两个方向设置速率限制：

```ros
[admin@MikroTik] > /tool/bandwidth-test address=10.0.0.2 user=btest \
    password=change-this-password protocol=tcp direction=both \
    local-tx-speed=50M remote-tx-speed=50M duration=10s
                status: done testing
              duration: 11s
            tx-current: 50.3Mbps
  tx-10-second-average: 49.9Mbps
      tx-total-average: 49.9Mbps
            rx-current: 51.3Mbps
  rx-10-second-average: 49.8Mbps
      rx-total-average: 49.8Mbps
           random-data: no
             direction: both
      connection-count: 20
        local-cpu-load: 9%
       remote-cpu-load: 0%
```

`local-tx-speed` 限制客户端发送速率，`remote-tx-speed` 限制服务器发送速率。未指定 `duration` 时，测试会一直运行，直到你按下 <kbd>Control</kbd>+<kbd>C</kbd>。

### 检查链路丢包 {#check-a-link-for-packet-loss}

要检查链路是否能无丢包地承载指定速率，请按该速率发送 UDP，并观察 `lost-packets`：

```ros
[admin@MikroTik] > /tool/bandwidth-test address=10.0.0.2 user=btest \
    password=change-this-password direction=receive \
    remote-tx-speed=500M duration=10s
                status: done testing
              duration: 11s
            rx-current: 491.1Mbps
  rx-10-second-average: 486.2Mbps
      rx-total-average: 486.2Mbps
          lost-packets: 3
           random-data: no
             direction: receive
               rx-size: 1500
      connection-count: 20
        local-cpu-load: 3%
       remote-cpu-load: 6%
```

在 491 Mbit/s 的 1500 字节数据包速率下，每秒约有 41,000 个数据包到达，因此最后一秒丢失 3 个数据包的丢包率低于 0.01%。如果链路在低于其容量的速率下仍丢失部分数据包，则说明链路存在问题，例如无线链路受到干扰。TCP 不会显示这种丢包：它会重新发送丢失的数据，只会降低速率。

大多数无线链路在两个方向之间共享空口时间。分别测试每个方向（`direction=transmit`，然后 `direction=receive`），以查看每个方向获得的速率；使用 `direction=both` 查看链路承载的总速率。

### 测量最大吞吐量 {#measure-the-maximum-throughput}

未设置速率限制时，测试会尽可能多地发送数据：

```ros
[admin@MikroTik] > /tool/bandwidth-test address=10.0.0.2 user=btest \
    password=change-this-password protocol=tcp direction=both \
    duration=10s
                status: done testing
              duration: 10s
            tx-current: 920.3Mbps
  tx-10-second-average: 918.0Mbps
      tx-total-average: 918.0Mbps
            rx-current: 748.4Mbps
  rx-10-second-average: 674.0Mbps
      rx-total-average: 674.0Mbps
           random-data: no
             direction: both
      connection-count: 20
        local-cpu-load: 16%
       remote-cpu-load: 4%
```

TCP 显示 TCP 应用在该路径上获得的速率：当数据包丢失或延迟时，TCP 会降低速率。使用默认的 20 个连接时，结果是多个连接的总和；单个连接（`connection-count=1`）更接近单次下载，其速率更容易受到路径延迟的限制。UDP 显示发送方不降低速率时路径能够承载的速率，以及丢失的数据量。默认测试使用 UDP，由服务器发送（`direction=receive`）1500 字节数据包：

```ros
[admin@MikroTik] > /tool/bandwidth-test address=10.0.0.2 user=btest \
    password=change-this-password duration=10s
                status: done testing
              duration: 11s
            rx-current: 957.3Mbps
  rx-10-second-average: 943.9Mbps
      rx-total-average: 943.9Mbps
          lost-packets: 18632
           random-data: no
             direction: receive
               rx-size: 1500
      connection-count: 20
        local-cpu-load: 5%
       remote-cpu-load: 7%
```

要使用其他数据包大小进行测试，请设置 `local-udp-tx-size`（客户端）和 `remote-udp-tx-size`（服务器）。该大小是整个 IP 数据包，IPv4 下范围为 52 到 64000 字节；大于路径上最小 MTU 的数据包会被分片。小数据包用于测试路径每秒转发多少个数据包，大数据包用于测试每秒转发多少比特。

要测试路由器的 IPv6 链路本地地址，请添加接口：`address=fe80::34:23ff:fe6a:570c%ether1`。

## 读取结果 {#read-the-results}

- `tx-` 值是客户端发送的数据，`rx-` 值是客户端接收的数据。
- `current` 是最近 1 秒，`10-second-average` 是最近 10 秒，`total-average` 是整个测试期间。
- UDP 统计整个 IP 数据包，包括报头。TCP 只统计数据，因此 TCP 结果比链路上的流量低几个百分点，返回的确认也不会被计入。在无线链路上，确认也会占用空口时间。
- `lost-packets`（UDP）是最近 1 秒内未到达的数据包数量，不是总数。客户端针对其接收的数据显示该值（`receive` 和 `both`）；针对客户端发送的数据，服务器的会话列表中会显示该值。
- `local-cpu-load` 和 `remote-cpu-load` 是测试期间客户端和服务器的 CPU 负载。接近 100% 的负载意味着限制结果的是路由器，而不是链路。较低的值也不能排除这种情况：一个繁忙的 CPU 核心可能限制测试，而其他核心空闲，因此请在 `/system/resource/cpu/print` 中检查各核心。
- `connection-count` 是 TCP 连接数，或具有各自端口的 UDP 流数量：20，或者在 CPU 核心数超过 20 的路由器上为核心数。多个连接会将负载分散到各个 CPU 核心。

在没有速度限制的情况下，UDP 发送方会在大约前 1 秒以全速发送，随后发送量会超过接收方报告的量。因此，在比发送方慢的链路上，`lost-packets` 会始终大于零，而 `rx-` 值就是链路的吞吐量。要检查链路是否丢包，请设置低于其容量的速度，如“检查链路是否丢包”中所示。

要测试会压缩数据的链路，请设置 `random-data=yes`：测试随后会发送无法压缩的数据。这会在两台路由器上消耗更多 CPU 时间，在 CPU 较慢的路由器上可能会限制结果。

## 测试路由器的转发能力 {#test-a-routers-forwarding-capacity}

生成和接收测试流量会占用客户端和服务器的 CPU 时间。要测量一台路由器转发多少流量，请不要从该路由器发起测试，也不要向该路由器测试：将三台路由器串联，在一端运行服务器，在另一端运行客户端，并穿过中间的路由器进行测试。将两端路由器的子网路由经由中间路由器，并观察 `local-cpu-load` 和 `remote-cpu-load`：当某台端路由器接近 100% 时，限制结果的是它，而不是中间的路由器。端路由器发送和接收的能力必须高于中间路由器的转发能力。使用 1500 字节的数据包测量比特率，使用小型 UDP 数据包（`local-udp-tx-size=64`）测量数据包速率，后者通常最先限制大多数路由器。当一对路由器无法让被测路由器达到负载时，请使用更多对路由器或 [traffic generator](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator)。

## 保护服务器 {#secure-the-server}

服务器会响应访问 TCP 端口 2000 的每个客户端。使用 `authenticate=yes`（默认）时，客户端必须使用具有 `test` 和 `winbox` 策略的用户登录。不要在不受信任网络可访问的路由器上设置 `authenticate=no`：这样任何人都可以加载路由器及其链路。默认防火墙会丢弃来自 WAN 侧的 TCP 端口 2000；请保持该设置，或仅接受来自已知地址的连接。

要仅接受来自已知地址的测试，请列出这些地址；其他客户端会收到 `can not connect`。用户自身的 `address` 设置不会限制带宽测试登录，因此请使用这些列表。当路由器具有 IPv6 地址时，也要设置 `allowed-addresses6`：

```ros
/tool/bandwidth-server/set allowed-addresses4=192.0.2.0/24 \
    allowed-addresses6=2001:db8::/32
```

要关闭服务器：

```ros
/tool/bandwidth-server/set enabled=no
```

`max-sessions` 限制同时运行的测试数量（默认为 100），与连接数无关。单个测试使用的连接数也不能超过 `max-sessions`，因此请将该值保持等于或高于客户端的 `connection-count`。

服务器会在 `/tool/bandwidth-server/session` 中列出正在运行的测试，从服务器视角显示（`send` 表示服务器发送）：

```ros
[admin@MikroTik] > /tool/bandwidth-server/session/print \
    proplist=protocol,direction,user,tx-current,rx-current
Columns: PROTOCOL, DIRECTION, USER, TX-CURRENT, RX-CURRENT
#  PROTOCOL  DIRECTION  USER   TX-CURRENT  RX-CURRENT
0  tcp       both       admin  624.1Mbps   917.2Mbps
```

## 故障排除 {#troubleshoot}

| 状态或症状 | 原因和修复方法 |
| :-- | :-- |
| `authentication failed` | 用户名或密码错误，或者服务器启用 `authenticate=yes` 时没有用户。该用户必须存在于服务器上，并且位于同时具有 `test` 和 `winbox` 策略的组中（在服务器上执行 `/user/group/print`）。 |
| `can not connect` | 服务器已关闭，或无法通过 TCP 端口 2000 访问；客户端不在 `allowed-addresses4`/`allowed-addresses6` 中；或者服务器已运行 `max-sessions` 个测试。 |
| `disconnected` | 测试期间连接中断，或者测试使用的连接数超过服务器的 `max-sessions`。 |
| `not allowed by device-mode` | 运行测试的路由器上的设备模式设置为 `bandwidth-test: no`。 |
| UDP `receive` 测试显示 0 bps。 | 服务器的 UDP 数据包未到达客户端：客户端位于 NAT 或防火墙之后。请使用 TCP，或允许来自服务器的 UDP。UDP `transmit` 测试可从 NAT 之后正常运行。 |
| 结果低于链路速率，且 CPU 负载接近 100%。 | 路由器限制了测试；请改为通过路由器进行测试（请参阅“测试路由器的转发容量”）。 |

## 技术细节 {#technical-details}

### 端口和连接 {#ports-and-connections}

客户端打开到服务器端口 2000 的 TCP 连接（`/ip/service` 中的 `btest` 服务），登录并通过该连接交换结果。UDP 测试数据在两台路由器上均使用从 `allocate-udp-ports-from` 开始的端口（默认为 2000）向上分配：服务器每项测试使用一个端口，客户端每个流使用一个端口。每台路由器都会获取空闲端口，因此在其他测试运行时端口号会递增。TCP 测试使用 `connection-count` 个到端口 2000 的 TCP 连接。服务器以 IPv4 映射的 IPv6 形式显示 IPv4 客户端（`::ffff:` 后为 IPv4 地址），例如 `::ffff:192.0.2.1`。

### 数据包大小和计数 {#packet-size-and-counting}

`local-udp-tx-size` 和 `remote-udp-tx-size` 设置 IP 数据包大小：1500 字节表示 1472 字节的 UDP 数据。UDP 速率统计 IP 数据包，TCP 速率统计 TCP 数据。接口计数器还包含以太网头部，因此显示的值会略高于测试结果。

有关所有参数，请参阅 [`/tool/bandwidth-test`](/docs/cli-reference/tool/bandwidth-test)、[`/tool/bandwidth-server`](/docs/cli-reference/tool/bandwidth-server) 和 [`/tool/bandwidth-server/session`](/docs/cli-reference/tool/bandwidth-server/session) CLI 参考。
