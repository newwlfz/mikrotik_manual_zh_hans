---
sidebar_key: "cli-reference/system/resource/hardware"
title: "hardware"
sidebar_label: 'hardware'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/hardware
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/hardware {#systemresourcehardware}
**条件：** !powerpc、!smips
**类型：** 目录
检测到的通过 PCI、USB 或 SCSI 总线连接的硬件设备。在没有此类总线的板卡上为空（例如 hAP ax²）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive">inactive：设备存在但未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="device-name" typ="string">设备固件报告的名称（name 列细化）</ArgTableRow>
<ArgTableRow arg="location" typ="string">设备在系统拓扑中的位置</ArgTableRow>
<ArgTableRow arg="parent" typ="enum">父总线或控制器</ArgTableRow>
<ArgTableRow arg="type" typ="enum (usb | pci | scsi | serial)">设备的总线类型：`usb`、`pci`、`scsi` 或 `serial`</ArgTableRow>
<ArgTableRow arg="vendor" typ="string">设备厂商名称</ArgTableRow>
<ArgTableRow arg="name" typ="string">设备名称或型号</ArgTableRow>
<ArgTableRow arg="category" typ="string">设备类别</ArgTableRow>
<ArgTableRow arg="serial-number" typ="string">设备序列号</ArgTableRow>
<ArgTableRow arg="vendor-id" typ="string">供应商标识符（VID）</ArgTableRow>
<ArgTableRow arg="device-id" typ="string">设备标识符（PID / Device ID）</ArgTableRow>
<ArgTableRow arg="speed" typ="string">协商后的设备速度</ArgTableRow>
<ArgTableRow arg="ports" typ="num">设备提供的端口数</ArgTableRow>
<ArgTableRow arg="usb-version" typ="string">支持的 USB 版本</ArgTableRow>
<ArgTableRow arg="manufacturer-reported-max-power" typ="string">设备报告的最大功耗（例如 USB 调制解调器）</ArgTableRow>
<ArgTableRow arg="overcurrent" typ="num" syscap="usb-hub"></ArgTableRow>
<ArgTableRow arg="irq" typ="num">分配的中断号</ArgTableRow>
<ArgTableRow arg="memory" typ="multi { range: composite { min: num
, max: num
 }
 }">分配给设备的内存窗口</ArgTableRow>
<ArgTableRow arg="io" typ="multi { range: composite { min: num
, max: num
 }
 }">分配给设备的 I/O 窗口</ArgTableRow>
<ArgTableRow arg="owner" typ="string">拥有该设备的子系统或驱动程序</ArgTableRow>
<ArgTableRow arg="device-path" typ="multi { path: string
 }">从根总线到端点的设备路径</ArgTableRow>
</ArgTable>
