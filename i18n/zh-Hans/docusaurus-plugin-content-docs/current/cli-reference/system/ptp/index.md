---
sidebar_key: "cli-reference/system/ptp"
title: "ptp"
sidebar_label: 'ptp'
source: https://manual.mikrotik.com/docs/cli-reference/system/ptp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ptp {#systemptp}
**条件：** !smips
**系统能力：** ptp
**类型：** Directory
PTP（IEEE 1588-2008，PTPv2）实例配置。每个条目对应一个 PTP 配置文件实例；端口在 [`/system/ptp/port`](./port.md) 中加入它。仅在特定交换机/路由器硬件上支持（请参阅[精确时间协议](../../../system-information-and-utilities/precision-time-protocol.md)指南）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">PTP 配置文件实例的名称</ArgTableRow>
<ArgTableRow arg="priority1" typ="enum (auto) { auto:0 }">主时钟选举的第一个值；值越小越优先。使用 `auto` 时，采用所选配置的值（802.1AS：246，其他配置：128）</ArgTableRow>
<ArgTableRow arg="priority2" typ="enum (auto)">主时钟选举的第二个值，用于平局时判定。使用 `auto` 时，采用所选配置的值（802.1AS：248，其他配置：128）</ArgTableRow>
<ArgTableRow arg="delay-mode" typ="enum (auto | e2e | p2p)">延迟测量机制：`e2e`（请求-响应）或 `p2p`（对等延迟）。使用 `auto` 时，采用配置的默认值（802.1AS：p2p，其他配置：e2e）</ArgTableRow>
<ArgTableRow arg="transport" typ="enum (auto | ipv4 | l2-non-forwardable | l2-forwardable)">用于 PTP 报文的传输方式：`ipv4`（PTP 主报文使用组播 224.0.1.129，对等延迟报文使用 224.0.0.107）、`l2-forwardable`（组播 MAC 01-1B-19-00-00-00，由不感知 PTP 的网桥转发）或 `l2-non-forwardable`（01-80-C2-00-00-0E，符合标准的网桥不会转发）。使用 `auto` 时，采用配置的默认值（802.1AS 和 G.8275.1 使用 `l2-non-forwardable`；AES67、SMPTE 和默认配置使用 `ipv4`）</ArgTableRow>
<ArgTableRow arg="profile" typ="enum (default | 802.1as | g8275.1 | aes67 | smpte-2059)">运行配置：`default`（普通 PTPv2）、`802.1as`（AVB/TSN，IEEE 802.1AS-2020）、`aes67`（IP 音频）、`g8275.1`（电信频率和相位）、`smpte-2059`（专业广播）。该配置还会预设 domain、priority1/2、transport 和 delay-mode 的 auto 值</ArgTableRow>
<ArgTableRow arg="domain" typ="enum (auto)">PTP 域号，用于在同一网络上分隔相互独立的 PTP 实例。允许的范围因配置而异（大多数为 0-127，G.8275.1 为 24-43）。使用 `auto` 时，采用配置的默认值（默认配置/AES67：0，G.8275.1：24，SMPTE：127）</ArgTableRow>
<ArgTableRow arg="ptp-mode" typ="enum (ordinary-clock | transparent-clock)">实例的时钟模式：普通时钟（终端设备；主时钟或从时钟）或透明时钟（测量并转发驻留时间，但不充当终端设备）</ArgTableRow>
</ArgTable>
