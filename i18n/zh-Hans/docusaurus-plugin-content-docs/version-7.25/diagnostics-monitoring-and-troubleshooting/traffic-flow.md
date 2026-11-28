---
title: "流量"
description: "MikroTik Traffic-Flow 通过收集经过路由器的数据包的统计信息，提供网络监控和计费功能，并支持 NetFlow 版本 1、5、9 和 IPFIX，以便进行灵活的流量分析。它支持配置接口、缓存条目、超时、数据包采样以及用于传输流数据的目标主机。"
tags:
  - 'traffic-flow'
  - 'netflow'
  - 'ipfix'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/traffic-flow
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik Traffic-Flow 是一个系统，提供有关经过路由器的数据包的统计信息。除网络监控和计费外，系统管理员还可以识别网络中可能出现的各种问题。借助 Traffic-Flow，可以分析和优化整体网络性能。由于 Traffic-Flow 与 Cisco NetFlow 兼容，因此可与为 Cisco NetFlow 设计的各种工具配合使用。

Traffic Flow 只能处理由路由器 CPU 处理的流量，因此 HW offloaded 流量不会出现在 Traffic Flow 流中（例如，HW offloaded 网桥流量）。

Traffic-Flow 支持以下 NetFlow 格式：

- **version 1** - 这是 NetFlow 使用的原始格式。它提供有关流经路由器的数据包的基本信息，但不支持不同协议类型和 Type of Service（ToS）等高级功能。
- **version 5** - 这是对 Version 1 的增强，支持 Type of Service（ToS）、TCP flags 和自治系统号等附加功能。除 version 1 的功能外，version 5 还可以包含 BGP AS 和流序列号信息。目前，RouterOS 不包含 BGP AS 号。
- **version 9** - 该版本引入了基于模板的导出格式，支持扩展性，并可支持以前版本无法处理的新型记录类型。它可以基于定义的模板导出数据，并能够导出 IPv4 和 IPv6 流信息。
- **IPFIX** - 该协议由 IETF 标准化，基于 NetFlow Version 9。它进一步扩展了功能，允许更可定制、更灵活的流记录。IPFIX 支持 NetFlow 未涵盖的新技术，例如组播。

## 常规 {#general}

**子菜单：** `/ip/traffic-flow`

本节列出 Traffic-Flow 的配置属性。

| Property | Description |
| :-- | :-- |
| **interfaces** (*string \| all*; Default: **all**) | 将用于收集 traffic-flow 统计信息的接口名称。要指定多个接口，请使用逗号分隔。 |
| **cache-entries** (*128k \| 16k \| 1k \| 256k \| 2k \| ...* ; Default: **4k**) | 路由器内存中同时可存在的流数量。 |
| **active-flow-timeout** (*time*; Default: **30m**) | 流的最长生命周期。 |
| **inactive-flow-timeout** (*time*; Default: **15s**) | 如果流处于空闲状态，保持其活动状态的时间。如果连接在此时限内未收到任何数据包，则 traffic-flow 会将一个数据包作为新流发送出去。如果该超时时间过短，可能会产生大量流并使缓冲区溢出。 |
| **packet-sampling** (*no \| yes*; Default: **no**) | 启用或禁用数据包采样功能。 |
| **sampling-interval** (*integer*; Default: **0**) | 连续采样的数据包数量。 |
| **sampling-space** (*integer*; Default: **0**) | 连续省略的数据包数量。 <br/> |

:::warning
info

数据包采样在 RouterOS **v7** 中可用。
:::

在以下示例中：

```ros
/ip/traffic-flow/set packet-sampling=yes sampling-interval=2222 sampling-space=1111
```

将对 2222 个连续数据包进行采样，然后省略 1111 个数据包。之后采样周期按此方式重复。

## Targets

**子菜单：** `/ip/traffic-flow/target`

通过 Traffic-Flow 目标，指定从路由器收集 Traffic-Flow 信息的主机。

| 属性 | 说明 |
| :-- | :-- |
| **src-address** *(IP ; Default: )* | 发送 Traffic-Flow 统计信息时用作源的 IP 地址 |
| **dst-address** (*IP*; Default: ) | 从路由器接收 Traffic-Flow 统计数据包的主机 IP 地址。 |
| **port** *(Port; Default:2055)* | 从路由器接收 Traffic-Flow 统计数据包的主机端口（UDP）。 |
| **v9-template-refresh** (*integer*; Default: **20**) | 发送模板到接收主机之前经过的数据包数量（仅适用于 NetFlow version 9 和 IPFIX） |
| **v9-template-timeout** (*time*; Default: ) | 如果模板尚未发送，经过多长时间后发送模板。（仅适用于 NetFlow version 9 和 IPFIX） |
| **version** (*1 \| 5 \| 9 \| IPFIX*; Default: ) | 使用哪种 NetFlow 版本格式 |

## IPFIX

**子菜单：** `/ip/traffic-flow/ipfix`

允许自定义流记录

| 属性 | 说明 |
| :-- | :-- |
| **bytes** | 流中处理的字节总数。 |
| **ip-total-length** | IP 数据包的长度，单位为字节。 |
| **src-address** | 流的源 IP 地址。 |
| **dst-address** | 流的目的 IP 地址。 |
| **ipv6-flow-label** | IPv6 报头中的标签字段，用于对流进行分类。 |
| **src-address-mask** | 源地址的网络掩码，可用于汇总数据。 |
| **dst-address-mask** | 目的地址的网络掩码。 |
| **is-multicast** | 指示该流是否为组播流。 |
| **src-mac-address** | 源 MAC 地址。 |
| **dst-mac-address** | 目的 MAC 地址。 |
| **last-forwarded** | 流中最后一个转发数据包的时间戳。 |
| **src-port** | 源端口号。 |
| **dst-port** | 目的端口号。 |
| **nat-dst-address** | 经 NAT 转换后的目的 IP 地址。 |
| **sys-init-time** | 系统初始化时间，可用于时序分析。 |
| **first-forwarded** | 流中第一个转发数据包的时间戳。 |
| **nat-dst-port** | 经 NAT 转换后的目的端口号。 |
| **tcp-ack-num** | TCP 连接中的确认号。 |
| **gateway** | 该流经路由转发所通过的网关 IP 地址。 |
| **nat-events** | 与该流相关的网络地址转换事件。 |
| **tcp-flags** | TCP 报头中的标志位（例如 SYN、ACK）。 |
| **icmp-code** | 用于错误消息和运营信息的 ICMP 代码。 |
| **nat-src-address** | 经 NAT 转换后的源 IP 地址。 |
| **icmp-type** | ICMP 消息类型，对诊断消息很重要。 |
| **nat-src-port** | 经 NAT 转换后的源端口号。 |
| **tcp-seq-num** | TCP 连接中的序列号。 |
| **igmp-type** | Internet Group Management Protocol 操作类型。 |
| **out-interface** | 发送该流数据包所通过的接口。 |
| **in-interface** | 接收该流数据包所通过的接口。 |
| **packets** | 流中处理的数据包数量。 |
| **ip-header-length** | IP 报头的长度。 |
| **protocol** | 协议号（例如 TCP、UDP、ICMP）。 |
| **tos** | IP 报头中的 Type of Service 字段，指示数据包的优先级和处理方式。 |
| **ttl** | 数据包的 Time To Live，每台路由器都会将其递减，以防止无限循环。 |
| **udp-length** | UDP 有效载荷的长度。 |

## 说明 {#notes}

查看[数据包流程图](/docs/firewall-and-quality-of-service/packet-flow-in-routeros)时，可以看到流量流位于 input、forward 和 output 链栈的末尾。这意味着流量流只统计到达其中某条链的流量。

例如，在交换机上设置镜像端口，将镜像端口连接到路由器，并设置流量流统计镜像数据包。遗憾的是，这种设置不起作用，因为镜像数据包在到达 input 链之前就会被丢弃。

如果流量经过其他接口和监控接口，这些接口将出现在报告中。

## 示例 {#examples}

此示例展示如何在路由器上配置 Traffic-Flow。

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

现在路由器开始发送包含 Traffic-Flow 信息的数据包。

:::info
要将 ntop-ng 与 MikroTik 一起使用，需要使用 Nprobe，它是付费软件。
:::

### 查看更多 {#see-more}

- [NetFlow Fundamentals](https://etutorials.org/Networking/network+management/Part+II+Implementations+on+the+Cisco+Devices/Chapter+7.+NetFlow/Fundamentals+of+NetFlow/)
- [Traffic flow with Ntop on MikroTik](https://github.com/ntop/ntopng/issues/1575)

## 相关主题 {#related-topics}

<DocCardList />
