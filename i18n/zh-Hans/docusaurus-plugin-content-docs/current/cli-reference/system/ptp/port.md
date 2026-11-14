---
sidebar_key: "cli-reference/system/ptp/port"
sidebar_position: 2
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/cli-reference/system/ptp/port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ptp/port {#systemptpport}
**条件：** !smips
**系统能力：** ptp
**类型：** 目录
PTP 端口：加入某个 [`/system/ptp`](./index.md) 配置文件实例的接口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ptp" typ="enum" mandatory="1">此端口加入的 [`/system/ptp`](./index.md) 配置文件实例</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">用于 PTP 的接口（硬件必须支持 PTP 时间戳 — 请参阅[指南](../../../system-information-and-utilities/precision-time-protocol.md)中的受支持设备列表）</ArgTableRow>
<ArgTableRow arg="role" typ="enum (bmca | master | slave)">端口角色选择：`bmca`（由最佳主时钟算法在主时钟和从时钟之间决定），或固定的 `master` 或 `slave`</ArgTableRow>
<ArgTableRow arg="announce-interval" typ="num">announce 消息间隔的 Log2 值（秒）（例如 -3...4 对应 0.125s-16s）</ArgTableRow>
<ArgTableRow arg="sync-interval" typ="num">sync 消息间隔的 Log2 值（秒）</ArgTableRow>
<ArgTableRow arg="delay-interval" typ="num">delay request 消息间隔的 Log2 值（秒）（E2E 模式）</ArgTableRow>
<ArgTableRow arg="pdelay-interval" typ="num">peer delay 消息间隔的 Log2 值（秒）（P2P 模式）</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">当接口承载带标签的 PTP 流量时，端口在该 VLAN ID 下参与 PTP</ArgTableRow>
</ArgTable>
