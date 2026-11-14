---
sidebar_key: "firewall-and-quality-of-service/user-guides/connection-rate"
sidebar_position: 3
title: "连接速率"
sidebar_label: "连接速率"
description: "Connection Rate 是 MikroTik RouterOS 的一项防火墙功能，它根据连接速度来监控和过滤流量，使用 ''connection-bytes'' 和 ''connection-rate'' 检测高速连接，以便为其设置优先级或进行限速。"
tags:
  - 'firewall'
  - 'traffic-management'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/connection-rate
captured_at: '2026-11-04T11:28:22+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Connection Rate 是一种防火墙匹配器，允许根据连接的当前速度捕获流量。

## 理论 {#theory}

连接跟踪表中的每个条目表示双向通信。每当数据包与特定条目关联时，数据包大小值（包括 IP 头）会加到该条目的 "connection-bytes" 值中。（换句话说，"connection-bytes" 同时包括上传和下载）。

Connection Rate 根据 "connection-bytes" 的变化计算连接速度。连接速率每秒重新计算，并且没有任何平均值。

"connection-bytes" 和 "connection-rate" 两个选项仅适用于 TCP 和 UDP 流量。（你需要指定协议来激活这些选项）。在 "connection-rate" 选项中，你可以指定想要捕获的速度范围：

```ros
ConnectionRate ::= [!]From-To
  From,To ::= 0..4294967295    (integer number)
```

### 规则示例 {#rule-example}

当连接速度低于 100kbps 时，这些规则将捕获经过路由器的 TCP/UDP 流量：

```ros
/ip/firewall/filter
add action=accept chain=forward connection-rate=0-100k protocol=tcp
add action=accept chain=forward connection-rate=0-100k protocol=udp
```

## 应用示例 - 流量优先级划分 {#application-example---traffic-prioritization}

Connection-rate 可以有多种用法（这些用法仍有待实现），但最常见的设置是检测 "重负载连接" 并为其设置较低的优先级（即长时间保持高速率的连接（例如 P2P、HTTP、FTP 下载））。这样做，你可以优先处理其他所有流量，这些流量通常包括 VoIP、HTTP 浏览和在线游戏。

本示例中描述的方法可以与其他检测流量并划分优先级的方法一起使用。由于 connection-rate 选项没有任何平均值，我们需要确定用于识别 "重负载连接" 的阈值。如果我们假设正常的 HTTP 浏览连接长度小于 500kB（4Mb），并且 VoIP 要求的速度不超过 200kbps，那么每个在前 500kB 之后仍保持高于 200kbps 速度的连接都可以被视为 "重负载连接"。

（在你的网络中，HTTP 浏览可能有不同的 "connection-bytes"，VoIP 可能有不同的 "connection-rate" - 因此，在应用此示例之前，请自行研究）

对于此示例，我们假设到 ISP 的上传和下载连接均为 6Mbps。

### 给急于上手者的快速开始 {#quick-start-for-impatient}

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

#### 说明 {#explanation}

在 mangle 中，我们需要将所有连接分成两组，然后标记来自这两组的数据包。由于我们讨论的是客户端流量，最合理的标记位置是 mangle 的 forward 链。

请记住，一旦 "重负载" 连接具有较低优先级并且队列达到 max-limit - 该重负载连接的速度就会下降，connection-rate 也会降低。这将导致其变为更高的优先级，并且该连接能够在短时间内获得更多流量；当 connection-rate 再次升高时，这又会再次导致其变为较低的优先级。为避免这种情况，我们必须确保一旦检测到 "重负载连接"，就会始终将其标记为 "重负载连接"。

#### IP 防火墙 mangle {#ip-firewall-mangle}

此规则将确保 "重负载" 连接保持为重负载，并用默认连接标记标记其余连接：

```ros
/ip/firewall/mangle
add chain=forward action=mark-connection connection-mark=!heavy_traffic_conn new-connection-mark=all_conn
```

这两条规则将根据我们的标准标记所有重负载连接：即每个在前 500kB 之后仍保持高于 200kbps 速度的连接都可以被视为 "重负载"：

```ros
add chain=forward action=mark-connection connection-bytes=500000-0 \
    connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=tcp
add chain=forward action=mark-connection connection-bytes=500000-0 \
    connection-mark=all_conn connection-rate=200k-100M new-connection-mark=heavy_traffic_conn protocol=udp
```

mangle 中的最后两条规则将简单地标记来自相应连接的所有流量：

```ros
add chain=forward action=mark-packet connection-mark=heavy_traffic_conn new-packet-mark=heavy_traffic passthrough=no
add chain=forward action=mark-packet connection-mark=all_conn new-packet-mark=other_traffic passthrough=no
```

#### 队列 {#queue}

这是一个放置在 Interface HTB 上的简单队列树 - "public" 是你的 ISP 所连接的接口，"local" 是你的客户端所在的接口。如果你有不止一个 "public" 或不止一个 "local"，你需要分别对上传和下载进行 mangle，并将队列树放在 global-out 中：

```ros
/queue/tree
add name=upload parent=public max-limit=6M
add name=other_upload parent=upload limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_upload parent=upload limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
add name=download parent=local max-limit=6M
add name=other_download parent=download limit-at=4M max-limit=6M packet-mark=other_traffic priority=1
add name=heavy_download parent=download limit-at=2M max-limit=6M packet-mark=heavy_traffic priority=8
```
