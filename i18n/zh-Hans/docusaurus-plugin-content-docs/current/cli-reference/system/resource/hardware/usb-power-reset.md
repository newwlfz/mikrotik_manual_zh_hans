---
sidebar_key: "cli-reference/system/resource/hardware/usb-power-reset"
sidebar_position: 5
title: "usb-power-reset"
sidebar_label: 'usb-power-reset'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/hardware/usb-power-reset
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/hardware/usb-power-reset {#systemresourcehardwareusb-power-reset}
**条件：** !powerpc、!smips、i386
**类型：** 命令
对 USB 端口进行电源重启：先断电 `duration` 时间，再重新上电（无需重启路由器即可重置出现异常的调制解调器和驱动器）。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="duration" typ="time">重新启用 USB 前的断电持续时间</ArgTableRow>
<ArgTableRow arg="bus" typ="num">USB 总线编号（由 `/system/resource/hardware` 显示）</ArgTableRow>
<ArgTableRow arg="slot" typ="num">总线上的 USB 插槽编号</ArgTableRow>
</ArgTable>
