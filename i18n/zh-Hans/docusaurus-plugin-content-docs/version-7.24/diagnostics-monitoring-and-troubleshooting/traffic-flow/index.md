---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traffic-flow/index"
sidebar_position: 2
title: "流量监控"
sidebar_label: "流量监控"
description: "MikroTik Traffic-Flow 通过收集经过路由器的数据包统计信息来提供网络监控和计费，支持 NetFlow 版本 1、5、9 和 IPFIX，以实现灵活的流量分析。它允许配置接口、缓存条目、超时、数据包采样以及用于流量数据传输的目标主机。"
tags:
  - 'traffic-flow'
  - 'netflow'
  - 'ipfix'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/traffic-flow
captured_at: '2026-11-04T11:28:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik Traffic-Flow 是一个提供经过路由器的数据包统计信息的系统。除了网络监控和计费之外，系统管理员还可以借助它找出网络中可能出现的各种问题。借助 Traffic-Flow，可以分析和优化整体网络性能。由于 Traffic-Flow 与 Cisco NetFlow 兼容，因此可以配合各种为 Cisco NetFlow 设计的工具使用。

Traffic Flow 只能处理由路由器 CPU 处理的流量，因此硬件卸载（HW offloaded）的流量不会出现在 Traffic Flow 流中（例如硬件卸载的桥接流量）。

Traffic-Flow 支持以下 NetFlow 格式：

- **version 1** - 这是 NetFlow 使用的原始格式。它提供有关流经路由器的 IP 数据包的基本信息，但不支持高级特性，例如不同类型的协议和 Type of Service (ToS)。
- **version 5** - 这是对 Version 1 的增强，支持 Type of Service (ToS)、TCP 标志和自治系统号等附加特性。除 version 1 的功能外，version 5 还可以包含 BGP AS 和流序列号信息。目前 RouterOS 不包含 BGP AS 号。
- **version 9** - 此版本引入了基于模板的导出格式，具备可扩展性，并支持此前版本无法处理的新记录类型。它可以基于定义的模板导出数据，并且能够导出 IPv4 和 IPv6 的流信息。
- **IPFIX** - 由 IETF 标准化，该协议基于 NetFlow Version 9。它进一步扩展了能力，允许更可定制、更灵活的流记录。IPFIX 支持 NetFlow 未涉及的新技术，例如组播。

## 常规 {#general}

**子菜单：** `/ip/traffic-flow`

本节列出 Traffic-Flow 的配置属性。

| 属性 | 描述 |
| :-- | :-- |
| **interfaces** (*string \| all*；默认值：**all**) | 这些接口的名称将用于为 traffic-flow 收集统计数据。要指定多个接口，请用逗号分隔。 |
| **cache-entries** (*128k \| 16k \| 1k \| 256k \| 2k \| ...* ；默认值：**4k**) | 可同时位于路由器内存中的流数量。 |
| **active-flow-timeout** (*time*；默认值：**30m**) | 流的最大存活时间。 |
| **inactive-flow-timeout** (*time*；默认值：**15s**) | 流空闲时保持活动状态的时长。如果某个连接在此超时时间内没有收到任何数据包，则 traffic-flow 会将其数据包作为新流发送出去。如果此超时值过小，可能会产生大量流并导致缓冲区溢出。 |
| **packet-sampling** (*no \| yes*；默认值：**no**) | 启用或禁用数据包采样功能。 |
| **sampling-interval** (*integer*；默认值：**0**) | 连续采样的数据包数量。 |
| **sampling-space** (*integer*；默认值：**0**) | 连续跳过的数据包数量。 |

:::warning
信息

数据包采样在 RouterOS **v7.** 中可用。
:::

在以下示例中：

```ros
/ip/traffic-flow/set packet-sampling=yes sampling-interval=2222 sampling-space=1111
```

将连续采样 2222 个数据包，然后跳过 1111 个数据包。之后按此方式循环重复采样。

## 目标 {#targets}

**子菜单：** `/ip/traffic-flow/target`

通过 Traffic-Flow 目标，我们指定将从路由器收集 Traffic-Flow 信息的主机。

| 属性 | 描述 |
| :-- | :-- |
| **src-address** *(IP ；默认值：)* | 发送 Traffic-Flow 统计信息时用作源地址的 IP 地址 |
| **dst-address** (*IP*；默认值：) | 接收路由器发送的 Traffic-Flow 统计数据包的主机的 IP 地址。 |
| **port** *(Port；默认值：2055)* | 接收路由器发送的 Traffic-Flow 统计数据包的主机端口（UDP）。 |
| **v9-template-refresh** (*integer*；默认值：**20**) | 发送多少个数据包后向接收主机发送模板（仅适用于 NetFlow version 9 和 IPFIX） |
| **v9-template-timeout** (*time*；默认值：) | 若模板尚未发送，则在多长时间后发送该模板。（仅适用于 NetFlow version 9 和 IPFIX） |
| **version** (*1 \| 5 \| 9 \| IPFIX*；默认值：) | 要使用的 NetFlow 版本格式 |

## IPFIX {#ipfix}

**子菜单：** `/ip/traffic-flow/ipfix`

允许自定义流记录

| 属性 | 描述 |
| :-- | :-- |
| **bytes** | 流中已处理的字节总数。 |
| **ip-total-length** | IP 数据包的长度（字节）。 |
| **src-address** | 流的源 IP 地址。 |
| **dst-address** | 流的目标 IP 地址。 |
| **ipv6-flow-label** | IPv6 头部中的标签字段，用于对流进行分类。 |
| **src-address-mask** | 源地址的网络掩码，在汇总数据时很有用。 |
| **dst-address-mask** | 目标地址的网络掩码。 |
| **is-multicast** | 指示该流是否为组播流。 |
| **src-mac-address** | 源 MAC 地址。 |
| **dst-mac-address** | 目标 MAC 地址。 |
| **last-forwarded** | 流中最后一个被转发数据包的时间戳。 |
| **src-port** | 源端口号。 |
| **dst-port** | 目标端口号。 |
| **nat-dst-address** | 经 NAT 转换后的目标 IP 地址。 |
| **sys-init-time** | 系统初始化时间，可用于时序分析。 |
| **first-forwarded** | 流中第一个被转发数据包的时间戳。 |
| **nat-dst-port** | 经 NAT 转换后的目标端口号。 |
| **tcp-ack-num** | TCP 连接中的确认号。 |
| **gateway** | 流所经由的路由网关的 IP 地址。 |
| **nat-events** | 与该流的网络地址转换相关的事件。 |
| **tcp-flags** | TCP 头部中的标志（例如 SYN、ACK）。 |
| **icmp-code** | 用于错误消息和操作信息的 ICMP 代码。 |
| **nat-src-address** | 经 NAT 转换后的源 IP 地址。 |
| **icmp-type** | ICMP 消息的类型，对诊断消息很重要。 |
| **nat-src-port** | 经 NAT 转换后的源端口号。 |
| **tcp-seq-num** | TCP 连接中的序列号。 |
| **tcp-window-size** | TCP 连接中的窗口大小，表示接收数据缓冲的规模。 |
| **igmp-type** | Internet Group Management Protocol 操作的类型。 |
| **out-interface** | 流的出向数据包所经过的接口。 |
| **in-interface** | 流的入向数据包所经过的接口。 |
| **packets** | 流中已处理的数据包数量。 |
| **ip-header-length** | IP 头部的长度。 |
| **protocol** | 协议号（例如 TCP、UDP、ICMP）。 |
| **tos** | IP 头部中的 Type of Service 字段，表示数据包的优先级和处理方式。 |
| **ttl** | 数据包的 Time To Live，每个路由器都会递减，以防止无限循环。 |
| **udp-length** | UDP 负载的长度。 |

## 说明 {#notes}

通过查看[数据包流向图](../../firewall-and-quality-of-service/packet-flow-in-routeros.md)，可以看到 traffic flow 位于 input、forward 和 output 链栈的末端。这意味着 traffic flow 只会统计到达这些链之一的流量。

例如，你在交换机上设置了镜像端口，将镜像端口连接到路由器，并设置 traffic flow 来统计镜像数据包。遗憾的是，这样的设置不会生效，因为镜像数据包在到达 input 链之前就被丢弃了。

如果流量经过其他接口以及监控接口，报告中也会出现这些接口。

## 示例 {#examples}

本示例演示如何在路由器上配置 Traffic-Flow

在路由器上启用 Traffic-Flow：

```ros
[admin@MikroTik] /ip/traffic-flow> set enabled=yes
[admin@MikroTik] /ip/traffic-flow> print
                enabled: yes
             interfaces: all
          cache-entries: 4k
    active-flow-timeout: 30m
  inactive-flow-timeout: 15s
[admin@MikroTik] /ip/traffic-flow>
```

指定将接收 Traffic-Flow 数据包的主机的 IP 地址和端口：

```ros
[admin@MikroTik] /ip/traffic-flow/target> add dst-address=192.168.0.2 port=2055 version=9
[admin@MikroTik] /ip/traffic-flow/target> print
Flags: X - disabled 
 #   SRC-ADDRESS       DST-ADDRESS        PORT     VERSION
 0   0.0.0.0           192.168.0.2        2055     9  
[admin@MikroTik] /ip/traffic-flow/target>
```

现在路由器开始发送带有 Traffic-Flow 信息的数据包。

:::info
要在 MikroTik 上使用 ntop-ng，你需要使用 Nprobe，这是一款付费软件。
:::

### 另请参阅 {#see-more}

- [NetFlow 基础](https://etutorials.org/Networking/network+management/Part+II+Implementations+on+the+Cisco+Devices/Chapter+7.+NetFlow/Fundamentals+of+NetFlow/)
- [在 MikroTik 上使用 Ntop 进行流量流分析](https://github.com/ntop/ntopng/issues/1575)

## 相关主题 {#related-topics}

<DocCardList />
