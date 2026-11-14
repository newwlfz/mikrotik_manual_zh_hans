---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings"
title: "l3hw-settings"
sidebar_label: 'l3hw-settings'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/l3hw-settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings {#interfaceethernetswitchl3hw-settings}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

L3HW 设置菜单允许为三层硬件卸载驱动程序配置全局参数。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="autorestart" typ="bool" syscap="!prestera-cpss">在驱动故障时自动重启 L3HW。如果未启用 autorestart，则 `l3-hw-offloading` 会被禁用，错误代码会显示在 [monitor](./monitor.md) 中。Autorestart 不适用于系统故障，例如 OOM（内存不足）。</ArgTableRow>
<ArgTableRow arg="fasttrack-hw" typ="bool" syscap="!prestera-ac3">启用或禁用 FastTrack 硬件卸载。除非需要预留 HW TCAM 内存（例如用于创建动态交换机 ACL 规则），否则请保持启用。并非所有交换机芯片都支持 FastTrack 硬件卸载（参见 [`hw-supports-fasttrack`](#hw-supports-fasttrack)）。</ArgTableRow>
<ArgTableRow arg="ipv6-hw" typ="bool">IPv6 硬件卸载。IPv6 路由会占用大量 HW 内存，仅当 IPv6 流量足够大、能从硬件路由中获益时，才启用此选项。</ArgTableRow>
<ArgTableRow arg="icmp-reply-on-error" typ="bool">由于硬件无法发送 ICMP 消息，发生错误时（例如，“Time Exceeded”、“Fragmentation required”等），必须将数据包重定向到 CPU 以发送 ICMP 回复。启用它有助于网络诊断，但可能为 DDoS 攻击带来潜在漏洞。禁用后，在发生错误时会在硬件层面静默丢弃数据包。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-supports-fasttrack" typ="bool">指示硬件（交换机芯片）是否支持 FastTrack 硬件卸载。</ArgTableRow>
</ArgTable>
