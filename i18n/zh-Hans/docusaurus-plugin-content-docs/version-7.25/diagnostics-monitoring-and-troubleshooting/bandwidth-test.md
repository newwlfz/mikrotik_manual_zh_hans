---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/bandwidth-test"
sidebar_position: 5
title: "带宽测试"
sidebar_label: "带宽测试"
description: "带宽测试用于测量两台 MikroTik 路由器之间的 TCP 或 UDP 吞吐量：/tool/bandwidth-test 中的客户端向另一台路由器的带宽测试服务器发送数据或从中接收数据。内容涵盖前提条件、以固定速率或最大速率进行测试、读取结果以及保护服务器安全。"
tags:
  - 'bandwidth'
  - 'throughput'
  - 'tcp'
  - 'udp'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/bandwidth-test
captured_at: '2026-11-04T11:15:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

带宽测试用于测量两台 MikroTik 路由器之间的吞吐量。一台路由器上的客户端（`/tool/bandwidth-test`）连接到另一台路由器的带宽测试服务器（`/tool/bandwidth-server`），发送或接收 TCP 或 UDP 流量，并每秒显示速率。可用它检查无线链路或 WAN 链路，或找出路径上的瓶颈。

若要在一次运行中测量延迟、抖动以及两个方向上的 TCP 和 UDP 吞吐量，请使用 [速度测试](./speed-test.md)。

:::warning
不设速度限制的测试会占用路径能提供的全部带宽以及路由器很大一部分 CPU 时间，链路上的其他流量、路由协议和管理访问都会受到影响。在正在使用的链路上，请设置速度限制，或在链路空闲时测试。
:::

## 先决条件 {#prerequisites}

在运行服务器的那台路由器上：

- 带宽测试服务器已开启。它默认开启，并启用身份验证：

  ```ros
  [admin@MikroTik] > /tool/bandwidth-server/print
                    enabled: yes
               authenticate: yes
    allocate-udp-ports-from: 2000
               max-sessions: 100
         allowed-addresses4:
         allowed-addresses6:
  ```

- [设备模式](../system-information-and-utilities/device-mode.md)允许带宽测试，服务器和客户端都是如此：`/system/device-mode/print` 显示 `bandwidth-test: yes`。大多数随 RouterOS 7.17 或更高版本交付的路由器处于 `home` 或 `basic` 模式，这些模式会关闭该功能（CCR 和 1100 系列路由器处于 `advanced`）。开启它需要物理接触路由器，因此在将路由器安装到远程站点之前请先检查。
- 服务器上有一个供客户端登录的用户，其所在组同时具有 `test` 和 `winbox` 策略；服务器会检查这两项。默认的 `read` 和 `full` 组都具备这两项，因此现有管理员账户也可以使用。只具有这两项策略的组就足够了：

  ```ros
  /user/group/add name=btest policy=test,winbox
  /user/add name=btest group=btest password=change-this-password
  ```

- 防火墙接受来自客户端的 TCP 端口 2000 和 UDP 端口 2000-65535。默认防火墙会从 WAN 侧丢弃这些流量；当服务器只能通过互联网访问时，请为测试添加规则，如[为通过互联网进行的测试开放防火墙](./speed-test.md#open-the-firewall-for-a-test-over-the-internet)中所述，并在测试后移除它们。

在客户端上，`receive` 和 `both` 方向的 UDP 测试需要服务器的 UDP 数据包能够到达：位于 NAT 或防火墙之后且防火墙丢弃这些数据包的客户端将收不到任何内容。这种情况下请使用 TCP，或在客户端上接受来自服务器的 UDP。

测试完成后，请删除测试用户（`/user/remove btest` 和 `/user/group/remove btest`）以及你添加的任何防火墙规则。

## 测试链路 {#test-a-link}

若要检查一条无线链路在两个方向上都能承载 50 Mbit/s 而又不占满它，请为两个方向设置速度限制：

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

`local-tx-speed` 限制客户端发送的内容，`remote-tx-speed` 限制服务器发送的内容。如果不设置 `duration`，测试会一直运行，直到你按下 <kbd>Control</kbd>+<kbd>C</kbd>。

### 检查链路是否丢包 {#check-a-link-for-packet-loss}

若要检查链路能否以某个速率传输而不丢包，请以该速率发送 UDP 并观察 `lost-packets`：

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

在 491 Mbit/s 的 1500 字节数据包下，每秒大约有 41,000 个数据包到达，因此最后一秒丢失 3 个数据包的丢包率不到 0.01%。如果一条链路在低于其容量的速率下仍丢失一部分数据包，则说明它存在问题，例如无线链路上的干扰。TCP 不会显示这种丢包：它会重新发送丢失的数据并只是降低速度。

大多数无线链路在两个方向之间共享空口时间。请分别测试每个方向（`direction=transmit`，然后 `direction=receive`）以查看每个方向获得的速率，并用 `direction=both` 查看链路总共承载的速率。

### 测量最大吞吐量 {#measure-the-maximum-throughput}

不设速度限制时，测试会尽可能多地发送数据：

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

TCP 显示的是 TCP 应用在该路径上获得的性能：当数据包丢失或延迟时，TCP 会降低速度。使用默认的 20 个连接时，结果是许多连接的总和；单个连接（`connection-count=1`）更接近单次下载，而单次下载更受路径延迟的限制。UDP 显示当发送端不降速时路径能提供多少带宽，以及会丢失多少。默认测试是 UDP，由服务器发送（`direction=receive`）1500 字节的数据包：

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

若要使用其他数据包大小进行测试，请设置 `local-udp-tx-size`（客户端）和 `remote-udp-tx-size`（服务器）。该大小是整个 IP 数据包的大小，在 IPv4 下为 52 到 64000 字节；大于路径上最小 MTU 的数据包会被分片。小数据包测试路径每秒转发多少个数据包，大数据包测试每秒转发多少比特。

若要测试到路由器的 IPv6 链路本地地址，请添加接口：`address=fe80::34:23ff:fe6a:570c%ether1`。

## 解读结果 {#read-the-results}

- `tx-` 值表示客户端发送的内容，`rx-` 值表示它接收的内容。
- `current` 是最后一秒，`10-second-average` 是最后 10 秒，`total-average` 是整个测试期间。
- UDP 统计整个 IP 数据包，包括报头。TCP 只统计数据，因此 TCP 结果会比链路上的流量低几个百分点，而且返回的确认数据包根本不计入。在无线链路上，它们还会占用空口时间。
- `lost-packets`（UDP）是最后一秒内未到达的数据包数量，不是总数。客户端显示它接收到的内容（`receive` 和 `both`）；对于客户端发送的内容，服务器的会话列表会显示。
- `local-cpu-load` 和 `remote-cpu-load` 是测试期间客户端和服务器的 CPU 负载。接近 100% 的负载意味着限制结果的是路由器，而不是链路。较低的值并不能排除这一点：一个繁忙的 CPU 核心可能会限制测试，而其他核心空闲，因此请检查 `/system/resource/cpu/print` 中的各个核心。
- `connection-count` 是 TCP 连接数，或具有各自端口的 UDP 流数：20，或在核心数超过 20 的路由器上为 CPU 核心数。多个连接会将负载分散到各个 CPU 核心上。

不设速度限制时，UDP 发送端在大约第一秒内会以全速发送，之后发送量会超过接收端报告的数量。因此在比发送端慢的链路上，`lost-packets` 会一直大于零，而 `rx-` 值就是链路的吞吐量。若要检查链路是否丢包，请将速度设为其容量以下，如检查链路是否丢包中所述。

若要测试会对数据进行压缩的链路，请设置 `random-data=yes`：测试随后会发送无法压缩的数据。这会在两台路由器上消耗更多 CPU 时间，在 CPU 较慢的路由器上可能会限制结果。

## 测试路由器的转发能力 {#test-a-routers-forwarding-capacity}

生成和接收测试流量会消耗客户端和服务器上的 CPU 时间。若要测量路由器转发多少流量，请不要从该路由器上或向该路由器运行测试：将三台路由器连成一条链，在一端运行服务器，在另一端运行客户端，并通过中间的路由器进行测试。将两端路由器的子网通过中间路由器路由，并观察 `local-cpu-load` 和 `remote-cpu-load`：当某一端路由器接近 100% 时，限制结果的是它，而不是中间的路由器。两端路由器必须能够发送和接收比中间路由器转发的更多的流量。使用 1500 字节的数据包测量比特率，使用小的 UDP 数据包（`local-udp-tx-size=64`）测量数据包速率，后者对大多数路由器来说会先成为限制。当一对路由器无法压满被测路由器时，请使用更多对，或使用[流量生成器](./traffic-generator.md)。

## 保护服务器安全 {#secure-the-server}

服务器会响应每个能访问 TCP 端口 2000 的客户端。在 `authenticate=yes`（默认值）下，客户端必须使用具有 `test` 和 `winbox` 策略的用户登录。不要在不可信网络能够访问的路由器上设置 `authenticate=no`：否则任何人都可能使该路由器及其链路过载。默认防火墙会从 WAN 侧丢弃 TCP 端口 2000；请保持这种设置，或仅从已知地址接受它。

若仅接受来自已知地址的测试，请列出这些地址；其他客户端会得到 `can not connect`。用户自身的 `address` 设置不会限制带宽测试登录，因此请使用这些列表。当路由器有 IPv6 地址时，也要设置 `allowed-addresses6`：

```ros
/tool/bandwidth-server/set allowed-addresses4=192.0.2.0/24 \
    allowed-addresses6=2001:db8::/32
```

若要关闭服务器：

```ros
/tool/bandwidth-server/set enabled=no
```

`max-sessions` 限制同时运行多少个测试（默认为 100），无论它们有多少个连接。单个测试也不能使用超过 `max-sessions` 的连接数，因此请使其保持大于或等于客户端的 `connection-count`。

服务器在 `/tool/bandwidth-server/session` 中列出正在运行的测试，从服务器的视角显示（`send` 表示服务器发送）：

```ros
[admin@MikroTik] > /tool/bandwidth-server/session/print \
    proplist=protocol,direction,user,tx-current,rx-current
Columns: PROTOCOL, DIRECTION, USER, TX-CURRENT, RX-CURRENT
#  PROTOCOL  DIRECTION  USER   TX-CURRENT  RX-CURRENT
0  tcp       both       admin  624.1Mbps   917.2Mbps
```

## 故障排除 {#troubleshoot}

| 状态或症状 | 原因与解决方法 |
| :-- | :-- |
| `authentication failed` | 用户名或密码错误，或者当服务器设置了 `authenticate=yes` 时没有提供用户。该用户必须存在于服务器上，并且位于同时具有 `test` 和 `winbox` 策略的组中（在服务器上执行 `/user/group/print`）。 |
| `can not connect` | 服务器已关闭或无法在 TCP 端口 2000 上访问，客户端不在 `allowed-addresses4`/`allowed-addresses6` 中，或者服务器已经运行了 `max-sessions` 个测试。 |
| `disconnected` | 测试期间连接丢失，或者测试使用的连接数超过服务器的 `max-sessions`。 |
| `not allowed by device-mode` | 运行测试的路由器上的设备模式中 `bandwidth-test: no`。 |
| UDP `receive` 测试显示 0 bps。 | 服务器的 UDP 数据包无法到达客户端：客户端位于 NAT 或防火墙之后。请使用 TCP，或允许来自服务器的 UDP。UDP `transmit` 测试可在 NAT 之后正常工作。 |
| 结果低于链路速度，且 CPU 负载接近 100%。 | 路由器限制了测试；请改为通过该路由器进行测试（请参阅测试路由器的转发能力）。 |

## 技术细节 {#technical-details}

### 端口与连接 {#ports-and-connections}

客户端会打开一个到服务器端口 2000 的 TCP 连接（`/ip/service` 中的 `btest` 服务），登录并通过它交换结果。UDP 测试数据在两台路由器上都使用从 `allocate-udp-ports-from`（默认为 2000）向上的端口：服务器每个测试使用一个端口，客户端每个流使用一个端口。每台路由器都会占用空闲端口，因此在其他测试运行时端口号会向上移动。TCP 测试使用 `connection-count` 个到端口 2000 的 TCP 连接。服务器以 IPv4 映射的 IPv6 形式显示 IPv4 客户端（IPv4 地址位于 `::ffff:` 之后），例如 `::ffff:192.0.2.1`。

### 数据包大小与计数 {#packet-size-and-counting}

`local-udp-tx-size` 和 `remote-udp-tx-size` 设置 IP 数据包大小：1500 字节即 1472 字节的 UDP 数据。UDP 速率统计 IP 数据包，TCP 速率统计 TCP 数据。接口计数器还包括以太网报头，因此它们显示的值会略高于测试结果。

有关所有参数，请参阅 [`/tool/bandwidth-test`](../cli-reference/tool/bandwidth-test.md)、[`/tool/bandwidth-server`](../cli-reference/tool/bandwidth-server/index.md) 和 [`/tool/bandwidth-server/session`](../cli-reference/tool/bandwidth-server/session.md) CLI 参考。
