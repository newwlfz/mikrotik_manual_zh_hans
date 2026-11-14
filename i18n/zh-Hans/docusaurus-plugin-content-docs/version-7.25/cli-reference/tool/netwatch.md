---
sidebar_key: "cli-reference/tool/netwatch"
sidebar_position: 13
title: "netwatch"
sidebar_label: 'netwatch'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/netwatch
captured_at: '2026-11-01T21:25:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/netwatch {#toolnetwatch}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">Netwatch 探测的名称。</ArgTableRow>
<ArgTableRow arg="host" typ="address (flags=46viD)" mandatory="1">要探测的服务器的 IP 地址或域名。请参阅 [地址标志](../index.md#address-flags)</ArgTableRow>
<ArgTableRow arg="type" typ="enum (simple | icmp | tcp-conn | http-get | https-get | dns)">
探测类型（默认值：**"simple"**）：
- simple - 简化的 ICMP 探测，选项比 "ICMP" 类型少，用于向后兼容旧版 Netwatch
- icmp - （ping 风格）带统计信息的一系列 ICMP 请求-响应
- tcp-conn - 测试到由 IP 和端口指定的服务器的 TCP 连接（三次握手）
- http-get - 执行 HTTP Get 请求并测试响应是否在正确回复范围内
- https-get - 执行 HTTPS Get 请求并测试响应是否在正确回复范围内
- dns - 对域名执行指定的 DNS 查询
</ArgTableRow>
<ArgTableRow arg="src-address" typ="address (flags=46)" unset="1">Netwatch 将尝试用于访问主机的源 IP 地址。如果该地址未在路由器上配置或已丢失，则主机会被视为 "down"。请参阅 [地址标志](../index.md#address-flags)</ArgTableRow>
<ArgTableRow arg="interval" typ="time" unset="1">探测测试之间的时间间隔。（默认值：**10s**）</ArgTableRow>
<ArgTableRow arg="timeout" typ="time" unset="1">等待响应的最长时间限制。（默认值：**3s**）</ArgTableRow>
<ArgTableRow arg="start-delay" typ="time" unset="1">启动探测前等待的时间。（默认值：**3s**）（在添加、启用或系统启动时，当 "startup-delay" 值小于 "start-delay" 值时）</ArgTableRow>
<ArgTableRow arg="startup-delay" typ="time" unset="1">系统启动后等待多久开始 Netwatch 探测。（默认值：**5m**）</ArgTableRow>
<ArgTableRow arg="ignore-initial-up" typ="bool" unset="1">指定当探测状态从 Unknown 变为 "Up" 时是否应运行 "Up" 脚本，用于帮助避免启用探测后或重启后出现的误报。"no" 表示从 "Unknown" 到 "Up" 的变化不会被忽略。（默认值：**no**）</ArgTableRow>
<ArgTableRow arg="ignore-initial-down" typ="bool" unset="1">指定当探测状态从 Unknown 变为 "Down" 时是否应运行 "Down" 脚本。"no" 表示从 "Unknown" 到 "Down" 的变化不会被忽略。（默认值：**no**）  **警告**：应谨慎使用，因为第一次 "Down" 状态不会被执行，且只有当探测从 "Up" 变为 "Down" 状态时才会运行 Down 脚本。</ArgTableRow>
<ArgTableRow arg="up-script" typ="alt { script: string
 }" unset="1">当探测状态从 "Down" 变为 "Up" 时执行的脚本。</ArgTableRow>
<ArgTableRow arg="down-script" typ="alt { script: string
 }" unset="1">当探测状态从 "Up" 变为 "Down" 时执行的脚本。</ArgTableRow>
<ArgTableRow arg="test-script" typ="alt { script: string
 }" unset="1">在每次探测测试结束时执行的脚本。</ArgTableRow>
<ArgTableRow arg="packet-interval" typ="time" unset="1">发送 ICMP 请求数据包之间的时间。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**50ms**）</ArgTableRow>
<ArgTableRow arg="packet-count" typ="num" unset="1">单次测试中要发送的 ICMP 数据包总数。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**10**）</ArgTableRow>
<ArgTableRow arg="packet-size" typ="num" unset="1">IP ICMP 数据包的总大小。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**50**）</ArgTableRow>
<ArgTableRow arg="ttl" typ="num" unset="1">手动设置 ICMP 数据包的生存时间值。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**255**）</ArgTableRow>
<ArgTableRow arg="accept-icmp-time-exceeded" typ="bool" unset="1">是否应将 ICMP "time exceeded" 消息视为有效响应。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**no**）</ArgTableRow>
<ArgTableRow arg="early-success-detection" typ="bool" unset="1">如果已经知道主机将被视为 "Down"，Netwatch 不会等待所有数据包处理完毕才更改探测状态。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**no**）</ArgTableRow>
<ArgTableRow arg="early-failure-detection" typ="bool" unset="1">如果已经知道主机将被视为 "Down"，Netwatch 不会等待所有数据包处理完毕才更改探测状态。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**no**）</ArgTableRow>
<ArgTableRow arg="thr-max" typ="time" unset="1">rtt-max 的失败阈值。（高于 thr-max 的值视为探测失败）此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**1s**）</ArgTableRow>
<ArgTableRow arg="thr-avg" typ="time" unset="1">rtt-avg 的失败阈值。（平均往返时间）此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**100ms**）</ArgTableRow>
<ArgTableRow arg="thr-stdev" typ="time" unset="1">rtt-stdev 的失败阈值。（往返时间的标准差）此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**250ms**）</ArgTableRow>
<ArgTableRow arg="thr-jitter" typ="time" unset="1">rtt-jitter 的失败阈值。（往返时间的抖动（= max - min））此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**1s**）</ArgTableRow>
<ArgTableRow arg="thr-loss-percent" typ="num" unset="1">loss-percent 的失败阈值。（丢失数据包的百分比）此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**85%**）</ArgTableRow>
<ArgTableRow arg="thr-loss-count" typ="num" unset="1">loss-count 的失败阈值。（丢失的数据包数量）此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。（默认值：**4294967295(max)**）</ArgTableRow>
<ArgTableRow arg="port" typ="num" unset="1">TCP 端口。此参数特定于 [**TCP-conn**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#tcp-conn-probe) 和 [**HTTP/S-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#http-get-probe) 探测类型。（默认值：**80**（TCP-conn、HTTP-GET）和  **443**（HTTPS-GET））</ArgTableRow>
<ArgTableRow arg="thr-tcp-conn-time" typ="time" unset="1">tcp-connect-time 的失败阈值，配置使用微秒；如果未指定时间单位（s/m/h），日志和状态页面会以毫秒显示相同的值。此参数特定于 [**TCP-conn**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#tcp-conn-probe) 探测类型。（默认值：**1s**）</ArgTableRow>
<ArgTableRow arg="thr-http-time" typ="time" unset="1">http-resp-time 的失败阈值。此参数特定于 [**HTTP/S-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#http-get-probe) 探测类型。（默认值：**10s**）</ArgTableRow>
<ArgTableRow arg="http-codes" typ="multi { http-response-range: range [100 .. 599]
 }" unset="1">可作为探测 "Up" 状态接受的 HTTP 响应状态码范围。请参阅 [mozilla-http-status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 或 [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-6)。此参数特定于 [**HTTP/S-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#http-get-probe) 探测类型。（默认值：**100-299**）</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none) { none:0 }" unset="1">用于主机验证的来自本地存储的证书。此参数特定于 [**HTTPS-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#https-get-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="bool" unset="1">启用来自本地证书存储的信任链验证。此参数特定于 [**HTTPS-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#https-get-probe) 探测类型。（默认值：**no**）</ArgTableRow>
<ArgTableRow arg="record-type" typ="enum (A | AAAA | MX | NS)" unset="1">将用于 DNS 探测的记录类型。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。（默认值：**A**）</ArgTableRow>
<ArgTableRow arg="dns-server" typ="address (flags=46)" unset="1">探测应向其发送请求的 DNS 服务器；如果未指定，将使用 `/ip/dns` 中的值。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。请参阅 [地址标志](../index.md#address-flags)</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (unknown | down | up)" unset="1">探测的当前状态。</ArgTableRow>
<ArgTableRow arg="since" typ="date">上次状态变化发生的时间。</ArgTableRow>
<ArgTableRow arg="done-tests" typ="num">已完成探测测试的总数。</ArgTableRow>
<ArgTableRow arg="failed-tests" typ="num">失败探测测试的总数。</ArgTableRow>
<ArgTableRow arg="sent-count" typ="num">上次探测测试期间发送的 ICMP 数据包数量。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="response-count" typ="num">上次探测测试期间收到的 ICMP 响应数据包数量。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="loss-count" typ="num">上次探测测试期间丢失的 ICMP 响应数据包数量。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="loss-percent" typ="num">上次探测测试期间丢失的 ICMP 响应数据包百分比。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="rtt-avg" typ="time">往返时间的平均值。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="rtt-min" typ="time">最小往返时间。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="rtt-max" typ="time">最大往返时间。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="rtt-jitter" typ="time">往返时间的抖动（= max - min）。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="rtt-stdev" typ="time">往返时间的标准差。此参数特定于 [**ICMP**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#icmp-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="tcp-connect-time" typ="time">建立 TCP 连接所花费的时间。此参数特定于 [**TCP-conn**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#tcp-conn-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="http-status-code" typ="num">HTTP 响应状态码（200 OK、404 Not Found 等）。请参阅 [mozilla-http-status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 或 [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-6)。此参数特定于 [**HTTP/S-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#http-get-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="http-resp-time" typ="time">HTTP/S 服务器在收到请求后发送响应所花费的时间，通常以毫秒为单位。此参数特定于 [**HTTP/S-GET**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#http-get-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="ip" typ="ipAddr">IPv4 IP 地址 - A 记录类型探测的结果。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="ip6" typ="ip6Addr">IPv6 IP 地址 - AAAA 记录类型探测的结果。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="name-servers" typ="multi { array-id, name-servers: string
 }">名称服务器 - NS 记录类型探测的结果。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。</ArgTableRow>
<ArgTableRow arg="mail-servers" typ="multi { array-id, mail-servers: string
 }">邮件服务器及其优先级 - MX 记录类型探测的结果。此参数特定于 [**DNS**](../../diagnostics-monitoring-and-troubleshooting/netwatch.md#dns-probe) 探测类型。</ArgTableRow>
</ArgTable>
