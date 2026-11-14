---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings/index"
sidebar_position: 2
title: "l3hw-settings"
sidebar_label: "l3hw-settings"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ethernet/switch/l3hw-settings
captured_at: '2026-11-01T21:27:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings {#interfaceethernetswitchl3hw-settings}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="autorestart" typ="bool" syscap="!prestera-cpss">驱动程序发生故障时自动重启 L3HW</ArgTableRow>
<ArgTableRow arg="fasttrack-hw" typ="bool" syscap="!prestera-ac3">FastTrack 连接的硬件卸载</ArgTableRow>
<ArgTableRow arg="ipv6-hw" typ="bool">IPv6 硬件卸载</ArgTableRow>
<ArgTableRow arg="icmp-reply-on-error" typ="bool">发生数据包错误（TTL、MTU 等）时，要么将数据包重定向到 CPU 以进行 ICMP 回复（yes），要么静默丢弃（no）</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-supports-fasttrack" typ="bool">硬件是否支持 FastTrack 卸载？</ArgTableRow>
</ArgTable>
