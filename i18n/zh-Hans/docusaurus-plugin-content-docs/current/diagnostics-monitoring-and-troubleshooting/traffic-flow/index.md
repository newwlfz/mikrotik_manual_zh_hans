---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traffic-flow"
title: "流量监控"
sidebar_label: "流量监控"
description: "Traffic-Flow 将经过路由器的数据包流统计信息以 Cisco NetFlow（v1/v5/v9）或 IPFIX 格式导出到收集器：启用该服务，选择接口和超时时间，添加目标，并使用 monitor 命令进行验证。"
tags:
  - 'traffic-flow'
  - 'netflow'
  - 'ipfix'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/traffic-flow
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik Traffic-Flow 提供有关经过路由器的数据包的统计信息。除了网络监控和计费外，系统管理员还可以识别网络中出现的各种问题，并分析和优化整体网络性能。Traffic-Flow 与 Cisco NetFlow 兼容，因此为 NetFlow 设计的工具也能与它配合工作。

Traffic Flow 仅处理经过路由器 CPU 的流量。HW-offloaded 流量（例如，交换机芯片端口之间 HW-offloaded 的桥接流量）绝不会出现在 Traffic Flow 中。

支持的导出格式：

- **version 1** - 原始 NetFlow 格式。提供有关流经路由器的 IP 数据包的基本信息，但不支持不同类型的协议和服务类型 (ToS)。
- **version 5** - 对 version 1 的增强，支持服务类型 (ToS)、TCP 标志和自治系统信息。RouterOS 不会填充 BGP AS 号。
- **version 9** - 基于模板的导出格式，支持新的记录类型；导出 IPv4 和 IPv6 流信息。
- **IPFIX** - 基于 NetFlow version 9 的 IETF 标准化协议，具有更可自定义的流记录；支持多播等较新字段。

## 启用 Traffic Flow 并选择接口 {#enable-traffic-flow-and-choose-interfaces}

在 [`/ip/traffic-flow`](../../cli-reference/ip/traffic-flow/index.md) 中启用该服务：

```ros
[admin@MikroTik] > /ip/traffic-flow/set enabled=yes
[admin@MikroTik] > /ip/traffic-flow/print
                enabled: yes
             interfaces: all
          cache-entries: 256k
    active-flow-timeout: 30m
  inactive-flow-timeout: 15s
        packet-sampling: no
      sampling-interval: 0
         sampling-space: 0
```

`cache-entries` 的默认值取决于设备的内存（较大主板上为 256k，最小主板上为 4k）。`active-flow-timeout` 和 `inactive-flow-timeout` 决定流何时过期并导出（请参阅[参数说明](../../cli-reference/ip/traffic-flow/index.md)）。

### 数据包采样 {#packet-sampling}

数据包采样只对一部分数据包进行抽样：

```ros
/ip/traffic-flow/set packet-sampling=yes sampling-interval=2222 \
    sampling-space=1111
```

连续采样 2222 个数据包，然后省略 1111 个，如此循环重复。

## 添加导出目标 {#add-export-targets}

在 [`/ip/traffic-flow/target`](../../cli-reference/ip/traffic-flow/target.md) 中添加接收流数据的主机：

```ros
[admin@MikroTik] > /ip/traffic-flow/target/add dst-address=192.168.0.2 \
    port=2055 version=9
[admin@MikroTik] > /ip/traffic-flow/target/print
Columns: SRC-ADDRESS, DST-ADDRESS, PORT, VERSION
# SRC-ADDRESS  DST-ADDRESS  PORT  VERSION
0 0.0.0.0      192.168.0.2  2055  9
```

`src-address=0.0.0.0` 表示路由器自动选择出接口的源地址。导出数据以所选格式通过 UDP（默认端口 2055）发出，此处以 NetFlow 版本 9 为例。

## 查看流计数器 {#watch-the-flow-counters}

`/ip/traffic-flow/monitor` 命令显示流缓存的状态（实时更新；在 `duration` 之后停止）：

```ros
[admin@MikroTik] > /ip/traffic-flow/monitor duration=3
    finished-flows: 0
      active-flows: 8
  unmanaged-packets: 0
    unmanaged-bytes: 0
```

如果收集器收不到任何数据，请检查流是否出现在此处：随着路由器转发流量，`active-flows` 会上升；而当流超时并被导出后，`finished-flows` 开始上升（默认 `inactive-flow-timeout` 为流的最后一个数据包之后 15s）。请检查目标条目，并确认你所监视的流量确实由 CPU 路由（而非硬件卸载）。

## 为 IPFIX 选择导出的字段 {#choose-exported-fields-for-ipfix}

[`/ip/traffic-flow/ipfix`](../../cli-reference/ip/traffic-flow/ipfix.md) 菜单选择 IPFIX 流记录中显示哪些字段：地址、端口、协议、标志、接口、时间信息（例如 `sys-init-time`、`first-forwarded`、`last-forwarded`）、NAT 地址和端口等——所有这些行都列在 [CLI 参考](../../cli-reference/ip/traffic-flow/ipfix.md) 中。

所有字段默认启用；使用 `set` 删除不需要的字段：

```ros
[admin@MikroTik] > /ip/traffic-flow/ipfix/set gateway=no tcp-flags=no
```

## 说明 {#notes}

Traffic flow 在 [数据包流](../../firewall-and-quality-of-service/packet-flow-in-routeros.md) 图的 input、forward 和 output 链栈末尾记录流量，因此只有到达这些链之一的流量才会被计入。

因此，连接到路由器的交换机上的镜像端口不能用于统计镜像数据包：镜像帧在到达 input 链之前会被丢弃。

如果流量经过其他接口和监控接口，其他接口也会出现在报告中。

## 最小端到端示例 {#minimal-end-to-end-example}

在单台路由器上从零开始设置，将 NetFlow v9 导出到 192.168.0.2 上的收集器：

```ros
/ip/traffic-flow/set enabled=yes
/ip/traffic-flow/target/add dst-address=192.168.0.2 port=2055 version=9
```

路由器开始发送带有流信息的导出数据包；可使用 `/ip/traffic-flow/monitor` 进行观察。

:::info
要在 MikroTik 上使用 ntop-ng，你需要使用 Nprobe，这是一款付费软件。
:::

### 另请参阅 {#see-more}

- [NetFlow 基础](https://etutorials.org/Networking/network+management/Part+II+Implementations+on+the+Cisco+Devices/Chapter+7.+NetFlow/Fundamentals+of+NetFlow/)
- [在 MikroTik 上使用 Ntop 进行流量流分析](https://github.com/ntop/ntopng/issues/1575)

## 相关主题 {#related-topics}

<DocCardList />
