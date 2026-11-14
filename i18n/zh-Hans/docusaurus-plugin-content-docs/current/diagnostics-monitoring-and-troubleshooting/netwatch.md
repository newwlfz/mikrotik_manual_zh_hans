---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/netwatch"
sidebar_position: 10
title: "网络监控"
sidebar_label: "网络监控"
description: "Netwatch 按可配置的间隔和阈值，使用 simple、ICMP、TCP、HTTP、HTTPS 或 DNS 探测来监控网络主机，并在主机上线或下线时运行脚本。"
tags:
  - 'netwatch'
  - 'icmp'
  - 'scripting'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/netwatch
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Netwatch 监视网络上主机的状态，并在主机状态发生变化时运行脚本。每个探测监视一台主机，并具有一个状态（在首次测试完成前为 `unknown`，之后为 `up` 或 `down`）、测试统计信息以及自己的 `interval` 和超时。

有六种探测类型可用：

- **simple** - 每次测试一个 ICMP 回显请求。这是旧版 RouterOS 中 Netwatch 的工作方式；其默认 `interval` 为 60s，而所有其他探测类型默认值为 10s。
- **icmp** - 每次测试一系列 ICMP 回显请求（默认 10 个），并提供往返时间、抖动和丢包统计信息以及可配置的失败阈值。
- **tcp-conn** - 测试是否可以建立到某个端口的 TCP 连接。
- **http-get** - 请求一个页面并检查 HTTP 响应代码和响应时间。
- **https-get** - 类似于 `http-get`，但通过 HTTPS。
- **dns** - 发送 DNS 查询并检查是否返回所请求的记录。

每个探测都需要一个 `host`：IP 地址、DNS 名称、带 VRF 后缀的地址（`192.0.2.1@vrf1`），或带接口的链路本地 IPv6 地址（`fe80::1%ether1`）。

## Simple 探测 {#simple-probe}

简单探测会定期发送一个 ICMP 回显请求以检查主机是否可达。仅适用通用探测参数。

Ping Google 的公共 DNS 解析器并记录状态变化：

```ros
/tool/netwatch/add host=8.8.8.8 \
    up-script=":log info \"Ping to 8.8.8.8 successful\"" \
    down-script=":log info \"Ping to 8.8.8.8 failed\""
```

首次测试在探测被添加或启用后约 3 秒运行（默认 `start-delay`），状态变化会被记录（主题 `netwatch,info`），并运行匹配的脚本：

```ros
[admin@MikroTik] > /log/print where message~"8.8.8.8"
 2026-10-09 09:57:10 netwatch,info event up [ type: simple, host: 8.8.8.8 ]
 2026-10-09 09:57:10 script,info Ping to 8.8.8.8 successful
```

在 WinBox 中的相同探测（**Tools > Netwatch**）：

![Simple Netwatch probe for 8.8.8.8 with up and down scripts in WinBox](/img/35c3e779718b3382.webp)

## ICMP 探测 {#icmp-probe}

`icmp` 探测类型每次测试会发送多个 ICMP 回显请求，并根据 `thr-*` 阈值评估结果。它是 `simple` 探测的更高级版本：你可以观察往返时间、抖动或丢包，而不是仅判断可达性。

观察发往 8.8.8.8 的平均往返时间，并在其超过 10 ms 时使探测失败：

```ros
/tool/netwatch/add host=8.8.8.8 type=icmp thr-avg=10ms \
    up-script=":log info \"rtt average is \$\"rtt-avg\" us\"" \
    down-script=":log info \"8.8.8.8 down: \$\"loss-percent\"% loss\""
```

脚本可以读取探测的统计数据，例如 `rtt-avg` 和 `loss-percent`。往返值以微秒为单位传递给脚本：

```ros
[admin@MikroTik] > /log/print where message~"8.8.8.8"
 2026-10-09 09:57:11 netwatch,info event up [ type: icmp, host: 8.8.8.8 ]
 2026-10-09 09:57:11 script,info rtt average is 9739 us
```

同一探测收集到的统计数据：

```ros
[admin@MikroTik] > /tool/netwatch/print stats
1  type=icmp host=8.8.8.8 status=up since=2026-10-09 09:57:11 done-tests=1
   failed-tests=0 sent-count=10 response-count=10 loss-count=0 loss-percent=0%
   rtt-min=9ms686us rtt-max=9ms935us rtt-avg=9ms739us rtt-jitter=249us
   rtt-stdev=121us
```

借助 `thr-loss-count`，Netwatch 还可以在数据包序列结束前报告判定结果：`early-failure-detection=yes` 会在丢包计数使失败成为确定时立即报告 `down`，而 `early-success-detection=yes` 会在剩余数据包不再可能越过阈值时立即报告 `up`。没有 `thr-loss-count` 时，只有序列中所有数据包都统计完毕后才能知道结果，因此提前检测选项主要与该阈值一起使用。

即使未设置任何阈值，阈值也有默认值（例如 `thr-avg=100ms`），因此一条缓慢但仍可工作的链路在使用普通 `type=icmp` 探测时也可能报告 `down`；请提高阈值，或检查 `print stats` 以查看是哪个阈值被触发。

WinBox 中的同一探测：

![ICMP Netwatch probe with thr-avg threshold in WinBox](/img/fc9860af2c64f65d.webp)

## TCP-conn 探测 {#tcp-conn-probe}

`tcp-conn` 探测类型检查路由器能否与特定端口上的主机建立 TCP 连接。用它来监控特定服务，而不是通过 ICMP 监控设备的总体可用性。连接时间存储在 `tcp-connect-time` 中，当握手耗时过长时，`thr-tcp-conn-time` 会使探测失败。

检查 8.8.8.8 的 DNS 服务是否在端口 53 上接受 TCP 连接：

```ros
/tool/netwatch/add host=8.8.8.8 type=tcp-conn port=53 \
    up-script=":log info \"TCP handshake to 8.8.8.8:53 successful\"" \
    down-script=":log info \"TCP handshake to 8.8.8.8:53 failed\""
```

```ros
[admin@MikroTik] > /log/print where message~"8.8.8.8"
 2026-10-09 09:57:10 netwatch,info event up [ type: tcp_conn, host: 8.8.8.8 ]
 2026-10-09 09:57:10 script,info TCP handshake to 8.8.8.8:53 successful
```

WinBox 中的同一探测：

![TCP Netwatch probe for port 53 in WinBox](/img/79980d58ff16c187.webp)

## HTTP-GET 探测 {#http-get-probe}

`http-get` 探测类型会向主机执行 HTTP GET 请求，并根据配置的 `http-codes` 范围（默认 `100-299`）检查返回的 HTTP 状态码。与 ICMP 或 TCP 探测不同，它会验证应用层可用性：Web 服务必须作出应答，而不仅仅是接受连接。通常用于监控网站或 API 的可用性。响应代码存储在 `http-status-code` 中，响应时间存储在 `http-resp-time` 中；`thr-http-time` 会在响应缓慢时使探测失败。

请求 mikrotik.com (159.148.172.205) 的首页并记录响应代码：

```ros
/tool/netwatch/add host=159.148.172.205 type=http-get \
    up-script=":log info \"Probe up, code \$\"http-status-code\"\"" \
    down-script=":log info \"Probe down, code \$\"http-status-code\"\""
```

探测会变为 down，因为 mikrotik.com 返回重定向 (302)，这超出了默认接受范围 `100-299`。要同时接受重定向，请扩大范围，例如 `http-codes=100-399`（像 `100-299,302` 这样的范围列表也可以）。日志输出：

```ros
[admin@MikroTik] > /log/print where message~"159.148.172.205"
 2026-10-09 09:59:01 netwatch,info event down [ type: http_get, host: 159.148.172.205 ]
 2026-10-09 09:59:01 script,info Probe down, code 302
```

WinBox 中的同一探测：

![HTTP-GET Netwatch probe in WinBox](/img/34194a20300b4f6c.webp)

## HTTPS-GET 探测 {#https-get-probe}

`https-get` 探测类型与 `http-get` 相同，但使用 HTTPS 而不是 HTTP，并增加了 `check-certificate` 和 `certificate` 参数，用于 [TLS 证书](../authentication-authorization-accounting/certificates.md) 验证。

监控路由器自身的 `www-ssl` 服务，该服务通过 [WebFig](../management-tools/webfig.md) 提供 HTTPS 访问：

```ros
/tool/netwatch/add host=127.0.0.1 type=https-get \
    up-script=":log info \"HTTPS WebFig is enabled\"" \
    down-script=":log info \"HTTPS WebFig is disabled\""
```

为使探测能够变为 up，必须启用 `www-ssl` 并为其配置证书；若使用普通的自签名证书，请保留 `check-certificate=no`：

```ros
[admin@MikroTik] > /log/print where message~"WebFig"
 2026-10-09 09:57:10 netwatch,info event up [ type: https_get, host: 127.0.0.1 ]
 2026-10-09 09:57:10 script,info HTTPS WebFig is enabled
```

WinBox 中的同一探测：

![HTTPS-GET Netwatch probe for 127.0.0.1 in WinBox](/img/1e6b20cef194e69a.webp)

## DNS 探测 {#dns-probe}

`dns` 探测类型会解析 `host` 名称，并检查是否返回了所请求的 `record-type`（A、AAAA、MX 或 NS）。通过 `dns-server` 可以选择要查询的服务器；否则将使用 [`/ip/dns`](../network-management/dns.md) 中配置的服务器。结果存储在只读的 `ip`、`ip6`、`mail-servers` 和 `name-servers` 值中。

使用 Google 的公共 DNS 服务器解析 mikrotik.com，并记录该地址：

```ros
/tool/netwatch/add host=mikrotik.com type=dns \
    dns-server=8.8.8.8 record-type=A \
    up-script=":log info \"A type record found: \$ip\"" \
    down-script=":log info \"No A type record found\""
```

```ros
[admin@MikroTik] > /log/print where message~"record"
 2026-10-09 09:57:10 netwatch,info event up [ type: dns, host: mikrotik.com ]
 2026-10-09 09:57:10 script,info A type record found: 159.148.172.205
```

WinBox 中的同一探测：

![DNS Netwatch probe for mikrotik.com in WinBox](/img/65b91b0c127c4543.webp)

## Scripts {#scripts}

Netwatch 会在探测状态变化时运行脚本，因此 RouterOS 可以自动做出反应：切换到备用路由、重启隧道、发送[电子邮件](../system-information-and-utilities/e-mail.md)或写入日志条目（请参阅[脚本编写文档](../developer-guides/scripting/index.md)）：

- `up-script` 在状态从 `down` 变为 `up`，或从 `unknown` 变为 `up` 时运行（除非 `ignore-initial-up=yes` 抑制首次转换，例如在重启之后）；
- `down-script` 在状态从 `up` 变为 `down`，或从 `unknown` 变为 `down` 时运行（除非 `ignore-initial-down=yes`）；
- `test-script` 在每次探测测试后运行。

在脚本内部，探测的值可作为变量使用，例如 `host`、`type`、`status`（已经是新状态）和 `done-tests`。包含 `-` 的名称必须用 `$"..."` 加引号，例如 `$"rtt-avg"`；往返时间值以微秒报告。

脚本以内部 `*sys` 用户在其自身环境中运行，与其他用户、[scheduler](../system-information-and-utilities/scheduler.md) 及其他探测相互隔离：在 Netwatch 脚本中设置的全局变量在其他任何地方都不可见。

:::warning
Netwatch 脚本仅限于 `read`、`write`、`test` 和 `reboot` 策略。更多信息请参阅[脚本权限](../developer-guides/scripting/index.md#script-permissions)。
:::

如果仍要运行这样的命令，请将其放入 `/system/script` 下具有自己的 `policy` 和 `dont-require-permissions=yes` 的脚本中，并从 Netwatch 脚本中用 `/system/script/run <name>` 调用它：这样它就会使用该脚本的策略而不是 Netwatch 的策略来运行。这会关闭该脚本的权限检查，因此请保持脚本简短，并且只授予它所需的策略（参见 [dont-require-permissions](../developer-guides/scripting/scripting-tips-and-tricks.md#be-careful-when-using-dont-require-permissions)）。

状态变化会以 `netwatch,info` 主题记录日志。带有 `name` 的探测会记录该名称（`event up [ my-probe ]`），未命名的探测会记录其类型和主机（`event up [ type: icmp, host: 198.51.100.1 ]`）。要获取每个测试的详细信息，请添加一条使用 `netwatch,debug` 主题的日志规则（参见 [日志](./log/index.md)）。

## 检查与故障排除 {#check-and-troubleshoot}

显示探测状态以及上次测试的统计信息：

```ros
/tool/netwatch/print stats
```

`status` 显示判定结果，`since` 显示上次状态变化的时间，`done-tests`/`failed-tests` 显示历史计数器。按类型的值仅涵盖上次测试，例如 ICMP 的 `rtt-*` 或 HTTP-GET 的 `http-status-code`。

出现意外 `down` 状态的常见原因：

- 在你查看之前发生了短暂中断：`since` 显示上次状态变化，`failed-tests` 统计失败次数，`netwatch,info` 日志保存历史记录。
- ICMP 阈值：主机有响应，但 `rtt-avg` 或其他值越过某个 `thr-*` 阈值 - 将 `print stats` 与阈值进行比较。
- HTTP 探测：响应代码不在 `http-codes` 中（默认情况下重定向即为 down），或者响应比 `thr-http-time` 更慢。
- DNS 探测：NXDOMAIN 或无法访问的 `dns-server` 即为 down；探测自身的 `timeout` 生效，不受 `/ip/dns` 超时影响。

## 技术细节 {#technical-details}

- 要让探测不立即进行测试，请使用 `start-delay`（在添加和启用时生效；默认 3s）和 `startup-delay`（重启后生效；默认 5m）。
- 日志行会用下划线拼写探测类型：`tcp-conn` 探测记录 `type: tcp_conn`，`http-get` 探测记录 `http_get`。
- 使用 `src-address` 时，探测会从特定的路由器地址发出；当该地址不再位于路由器上（例如 PPP 链路断开）时，探测会报告 `down`，脚本可利用这一点对可用上行链路作出反应，而不仅仅是对可访问的主机作出反应。
- 当 ICMP 数据包序列不适合探测的时间安排（`interval < (packet-count - 1) * packet-interval + timeout`）时，RouterOS 会记录一条 "packet train not fitting in interval" 警告，并在内部延长所使用的间隔。
- Simple、ICMP、TCP-conn 和 HTTP/HTTPS-GET 探测在发送时会设置 "don't fragment" 标志。因此，增加 `packet-size` 的 `icmp` 探测只有在整条路径都能承载该大小的数据包时才会应答，这有助于解决[路径 MTU 问题](../hardware/mtu-in-routeros.md)。

有关所有属性、只读值及其默认值，请参阅 CLI 参考中的 [`/tool/netwatch`](../cli-reference/tool/netwatch.md)。
