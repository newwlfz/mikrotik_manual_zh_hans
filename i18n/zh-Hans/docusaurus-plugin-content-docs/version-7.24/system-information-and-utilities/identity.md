---
sidebar_key: "system-information-and-utilities/identity"
sidebar_position: 6
title: "身份"
sidebar_label: "身份"
description: "本页介绍在 MikroTik RouterOS 中配置 System Identity，该功能为网络通信以及 DHCP 等服务设置唯一标识符。它说明了如何通过 CLI 或 SNMP 设置标识，并警告存在 64 个字符的限制。"
tags:
  - 'system-identity'
  - 'snmp'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/identity
captured_at: '2026-11-04T11:33:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

设置系统身份会提供一个唯一的标识名称，用于系统在网络中向其他路由器标识自身，以及在访问 DHCP、Neighbour Discovery 和默认无线 SSID 等服务时使用。默认系统身份设置为 'MikroTik'。

:::warning
系统身份的最大字符长度为 64
:::

## 配置 {#configuration}

要在 RouterOS 中设置系统身份：

```ros
[admin@MikroTik] > /system/identity/set name=New_Identity 
[admin@New_Identity] >
```

当前系统身份始终显示在已登录账户名之后，并可通过 print 命令显示：

```ros
[admin@New_Identity] /system/identity>print
name: New_Identity
[admin@New_Identity] /system/identity>

```

### SNMP {#snmp}

也可以通过 SNMP set 命令更改路由器系统身份：

```ros
snmpset -c public -v 1 192.168.0.0 1.3.6.1.2.1.1.5.0 s New_Identity
```

*snmpset* - 基于 Linux 的 SNMP 应用程序，用于通过 SNMP SET 请求设置网络实体上的信息；

- *public* - 路由器的团体名；
- *192.168.0.0* - 路由器的 IP 地址；
- *1.3.6.1.2.1.1.5.0* - 路由器身份的 SNMP 值；
