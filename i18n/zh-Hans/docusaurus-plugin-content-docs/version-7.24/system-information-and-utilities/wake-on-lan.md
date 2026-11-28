---
title: "局域网唤醒（Wake on LAN）"
description: "Wake on LAN（WoL）通过发送到设备 MAC 地址的 UDP Magic Packet 远程开启设备，需要正确配置接口和硬件。"
tags:
  - 'wol'
  - 'ip-broadcast'
  - 'mac'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/wake-on-lan
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "diagnostics-monitoring-and-troubleshooting"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[*Wake on LAN CLI Reference*](/docs/cli-reference/tool/wol)

**子菜单：** `/tool/wol`

Wake on LAN（WoL）是一种向广播地址发送 UDP Magic Packet 的网络功能。该数据包包含目标设备的 MAC 地址。如果目标设备支持 Wake on LAN（即具备所需的硬件和软件配置），它会从睡眠或关机状态开机。不支持 Secure WoL。

## Wake-on-LAN 命令 {#wake-on-lan-command}

`/tool/wol` 命令需要 MAC 地址参数和接口才能正常工作。

:::warning
如果未指定接口，Magic Packet 将作为 IP 广播从默认网关接口发送。
:::

```ros
/tool/wol mac=FE:4B:71:05:EA:8B interface=ether1
```

以下示例展示了 [WinBox](/docs/management-tools/winbox) 中的 Wake on LAN 工具。

![Wake on LAN tool in WinBox](/img/c63eb8e43babeb3a.webp)
