---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/settings"
sidebar_position: 6
title: "settings"
sidebar_label: "settings"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ethernet/switch/qos/settings
captured_at: '2026-11-01T21:27:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/settings {#interfaceethernetswitchqossettings}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="multicast-buffers" typ="num">组播流量的数据包缓冲区最大数量（占总缓冲区内存的百分比）</ArgTableRow>
<ArgTableRow arg="mirror-buffers" typ="num" syscap="!prestera-cpss">镜像流量的数据包缓冲区最大数量（占总缓冲区内存的百分比）</ArgTableRow>
<ArgTableRow arg="mirror-profile" typ="enum">应用于镜像数据包的 QoS 配置文件</ArgTableRow>
<ArgTableRow arg="shared-buffers" typ="num">端口之间共享的数据包缓冲区数量（占总缓冲区内存的百分比）</ArgTableRow>
<ArgTableRow arg="lossless-buffers" typ="num" syscap="!prestera-ac3">无损共享池的大小（占共享缓冲区的百分比）</ArgTableRow>
<ArgTableRow arg="lossless-traffic-class" typ="multi { array-id, tc: num [ .. 7]
 }" syscap="!prestera-ac3"></ArgTableRow>
<ArgTableRow arg="wred-threshold" typ="enum (low | medium | high) { low:1, medium:2, high:3 }" syscap="!prestera-ac3">开始随机尾丢弃或 ECN 标记的相对队列填充级别</ArgTableRow>
</ArgTable>
