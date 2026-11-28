---
title: "身份"
description: "本页介绍在 MikroTik RouterOS 中配置 System Identity，该设置为网络通信和 DHCP 等服务指定唯一标识符。本页说明如何通过 CLI 或 SNMP 设置 identity，并提示 64 个字符的限制。"
tags:
  - 'system-identity'
  - 'snmp'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/identity
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

设置系统 Identity 会为系统向网络中的其他路由器标识自身，以及访问 DHCP、Neighbour Discovery 和默认无线 SSID 等服务时提供唯一的识别名称。默认系统 Identity 为“MikroTik”。

:::warning
系统 Identity 的最大字符长度为 64
:::

## 配置 {#configuration}

要在 RouterOS 中设置系统标识：

```ros
[admin@MikroTik] > /system/identity/set name=New_Identity 
[admin@New_Identity] >
```

当前 System Identity 始终显示在已登录账户名之后，并可通过 print 命令显示：

```ros
[admin@New_Identity] /system/identity>print
name: New_Identity
[admin@New_Identity] /system/identity>

```

### SNMP

也可以通过 SNMP set 命令修改路由器系统标识：

```ros
snmpset -c public -v 1 192.168.0.0 1.3.6.1.2.1.1.5.0 s New_Identity
```

*snmpset* - 基于 Linux 的 SNMP 应用程序，用于发送 SNMP SET 请求以设置网络实体上的信息；

- *public* - 路由器的 community 名称；
- *192.168.0.0* - 路由器的 IP 地址；
- *1.3.6.1.2.1.1.5.0* - 路由器标识的 SNMP 值；
