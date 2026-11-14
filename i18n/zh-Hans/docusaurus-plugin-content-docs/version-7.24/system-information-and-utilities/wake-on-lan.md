---
sidebar_key: "system-information-and-utilities/wake-on-lan"
sidebar_position: 18
title: "网络唤醒"
sidebar_label: "网络唤醒"
description: "局域网唤醒 (WoL) 可通过向远程设备的 MAC 地址发送 UDP Magic Packet 来为远程设备开机，这需要正确的接口和硬件配置。"
tags:
  - 'wol'
  - 'ip-broadcast'
  - 'mac'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/wake-on-lan
captured_at: '2026-11-04T11:33:40+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[*Wake on LAN CLI 参考*](../cli-reference/tool/wol.md)

**子菜单：** `/tool/wol`

Wake on LAN（WoL）是一种网络功能，它会向广播地址发送 UDP Magic Packet。此数据包包含目标设备的 MAC 地址。如果目标设备支持 Wake on LAN（即具备所需的硬件和软件配置），它就会从睡眠或关机状态启动。不支持安全 WoL。

## Wake-on-LAN 命令 {#wake-on-lan-command}

`/tool/wol` 命令需要一个 MAC 地址参数和一个接口才能正常工作。

:::warning
如果未指定接口，Magic Packet 会从默认网关接口作为 IP 广播发送。
:::

```ros
/tool/wol mac=FE:4B:71:05:EA:8B interface=ether1
```

以下示例展示了 [WinBox](../management-tools/winbox.md) 中的 Wake on LAN 工具。

![Wake on LAN tool in WinBox](/img/c63eb8e43babeb3a.webp)
