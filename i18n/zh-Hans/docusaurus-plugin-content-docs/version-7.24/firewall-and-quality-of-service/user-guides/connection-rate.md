---
title: "连接速率"
description: "Connection Rate 是 MikroTik RouterOS 防火墙功能，用于根据连接速度监控和过滤流量，通过 ''connection-bytes'' 和 ''connection-rate'' 检测高速连接，以便进行优先处理或限速。"
tags:
  - 'firewall'
  - 'traffic-management'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/connection-rate
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Connection Rate 是一种防火墙匹配器，可基于连接的当前速度捕获流量。

## Theory

连接跟踪表中的每个条目都表示双向通信。每当一个数据包与特定条目关联时，数据包大小值（包括 IP 头）都会加到该条目的 "connection-bytes" 值中。（换句话说，"connection-bytes" 包括上传和下载）。

Connection Rate 基于 "connection-bytes" 的变化计算连接速度。连接速度每秒重新计算一次，不使用任何平均值。

"connection-bytes" 和 "connection-rate" 两个选项仅适用于 TCP 和 UDP 流量。（需要指定协议才能启用这些选项）。在 "connection-rate" 选项中，可以指定要捕获的速度范围：

```ros
ConnectionRate ::= [!]From-To
  From,To ::= 0..4294967295    (integer number)
```

### 规则示例 {#rule-example}

这些规则将捕获通过路由器的 TCP/UDP 流量，条件是连接速度低于 100kbps：

```ros
/ip/firewall/filter
add action=accept chain=forward connection-rate=0-100k protocol=tcp
add action=accept chain=forward connection-rate=0-100k protocol=udp
```

## 应用示例 - 流量优先级 {#application-example---traffic-prioritization}

Connection-rate 可用于多种场景，这些场景仍有待发掘，但最常见的配置是检测“高负载连接”（长时间保持高速率的连接，例如 P2P、HTTP、FTP 下载），并为其设置较低优先级。通过这样做，可以优先处理所有其他流量，通常包括 VoIP、HTTP 浏览和在线游戏。

本示例所述方法可与其他流量检测和优先级划分方式配合使用。由于 connection-rate 选项没有任何平均值，需要确定用于识别“大流量连接”的边界。如果假设正常的 HTTP 浏览连接小于 500kB（4Mb），而 VoIP 所需速率不超过 200kbps，则首次达到 500kB 后速率仍超过 200kbps 的每个连接都可视为“大流量连接”。

（网络中 HTTP 浏览的 connection-bytes 和 VoIP 的 connection-rate 可能不同，因此请在应用本示例前自行调研。）

对于本示例，假设到 ISP 的上行和下行连接均为 6Mbps。

### 快速入门 {#quick-start-for-impatient}

```ros
/ip/firewall/mangle
add chain=forward action=mark-connection connection-mark=!heavy_traffic_conn new-connection-mark=all_conn
add chain=forward action=mark-connection connection-bytes=500000-0 connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=tcp
add chain=forward action=mark-connection connection-bytes=500000-0 connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=udp
add chain=forward action=mark-packet connection-mark=heavy_traffic_conn new-packet-mark=heavy_traffic passthrough=no
add chain=forward action=mark-packet connection-mark=all_conn new-packet-mark=other_traffic passthrough=no

/queue/tree
add name=upload parent=public max-limit=6M
add name=other_upload parent=upload limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_upload parent=upload limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
add name=download parent=local max-limit=6M
add name=other_download parent=download limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_download parent=download limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
```

#### Explanation

在 mangle 中，需要将所有连接分为两组，然后标记来自这 2 组的数据包。由于这里讨论的是客户端流量，最合理的标记位置是 mangle 链 forward。

请记住，一旦“大流量”连接的优先级较低，并且队列达到 max-limit，大流量连接的速率就会下降，connection-rate 也会降低。这将导致其优先级变为更高，连接能够在短时间内获得更多流量；当 connection-rate 再次升高时，又会使其变回较低优先级。为避免这种情况，必须确保一旦检测到“大流量连接”，该连接将始终标记为“大流量连接”。

#### IP 防火墙 mangle {#ip-firewall-mangle}

此规则可确保“大流量”连接始终保持为大流量，并使用默认连接标记为其余连接打标记：

```ros
/ip/firewall/mangle
add chain=forward action=mark-connection connection-mark=!heavy_traffic_conn new-connection-mark=all_conn
```

这两条规则将根据我们的标准标记所有“重”连接：即前 500kB 之后速度仍超过 200kbps 的每个连接都可视为“重连接”：

```ros
add chain=forward action=mark-connection connection-bytes=500000-0 \
    connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=tcp
add chain=forward action=mark-connection connection-bytes=500000-0 \
    connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=udp
```

mangle 中的最后两条规则将直接标记来自相应连接的所有流量：

```ros
add chain=forward action=mark-packet connection-mark=heavy_traffic_conn new-packet-mark=heavy_traffic passthrough=no
add chain=forward action=mark-packet connection-mark=all_conn new-packet-mark=other_traffic passthrough=no
```

#### Queue

这是一个简单的队列树，放置在接口 HTB 上。“public”是连接 ISP 的接口，“local”是连接客户端的接口。如果有多个“public”或多个“local”，则需要分别对上传和下载进行 mangle，并将队列树放置在 global-out 中：

```ros
/queue/tree
add name=upload parent=public max-limit=6M
add name=other_upload parent=upload limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_upload parent=upload limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
add name=download parent=local max-limit=6M
add name=other_download parent=download limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_download parent=download limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
```
