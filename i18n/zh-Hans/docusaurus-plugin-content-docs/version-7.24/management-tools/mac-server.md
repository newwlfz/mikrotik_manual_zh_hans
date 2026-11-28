---
title: "MAC 服务器"
description: "RouterOS 中的 MAC server 部分用于配置 MAC Telnet、WinBox 和 Ping 服务器，以便在不使用 IP 地址的情况下访问路由器。它支持将访问限制到指定接口，并提供管理会话的工具，示例展示了如何启用/禁用 MAC Telnet 以及如何通过客户端连接。"
tags:
  - 'mac-server'
  - 'mac-telnet'
  - 'mac-winbox'
source: https://manual.mikrotik.com/docs/7.24/management-tools/mac-server
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MAC server 部分用于在 RouterOS 设备上配置 MAC Telnet Server、MAC WinBox Server 和 MAC Ping Server。

MAC Telnet 用于访问未设置 IP 地址的路由器。其工作方式与 IP telnet 相同。MAC telnet 仅可在两台 MikroTik RouterOS 路由器之间使用。

MAC WinBox 用于通过 MAC 地址提供对路由器的 WinBox 访问。

MAC Ping 用于允许对路由器的 MAC 地址执行 MAC ping。

:::info
**MAC-server** 设置包含在“system”软件包中。
:::

### MAC Telnet 服务器 {#mac-telnet-server}

可以将 MAC Telnet 访问设置为特定接口，这些接口属于[接口列表](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)的一部分：

```ros
[admin@device] /tool/mac-server/set allowed-interface-list=listBridge
[admin@device] /tool/mac-server/print
  allowed-interface-list: listBridge
```

在上面的示例中，MAC Telnet 针对接口列表“listBridge”配置，因此 MAC Telnet 只能通过属于该列表成员的接口工作（可以向该列表添加多个接口）。

要禁用 MAC Telnet 访问，请执行命令（将“allowed-interface-list”设置为“none”）：

```ros
[admin@device] /tool/mac-server/set allowed-interface-list=none
[admin@device] /tool/mac-server/print
  allowed-interface-list: none
```

可以使用以下命令检查设备已接受的 MAC Telnet 活动会话：

```ros
[admin@device] > /tool/mac-server/sessions/print
Columns: INTERFACE, SRC-ADDRESS, UPTIME
#  INTERFACE  SRC-ADDRESS        UPTIME
0  ether5     64:D1:54:FB:E3:E6  17s 
```

#### MAC Telnet 客户端 {#mac-telnet-client}

启用 MAC Telnet Server 后，可以使用另一台 RouterOS 设备通过 mac-telnet 客户端连接到服务器：

```ros
[admin@device2] > tool mac-telnet B8:69:F4:7F:F2:E7    
Login: admin
Password: 
Trying B8:69:F4:7F:F2:E7...
Connected to B8:69:F4:7F:F2:E7

  MMM      MMM       KKK                          TTTTTTTTTTT      KKK
  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK
  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK
  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK
  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT     III  KKK KKK
  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK

  MikroTik RouterOS 7.1rc3 (c) 1999-2021       https://www.mikrotik.com/

Press F1 for help
  
[admin@device] > 
```

请根据实际配置更改 MAC 地址，随后应进入服务器的 CLI（如上例所示）。

:::tip
默认情况下，MAC Telnet 客户端会尝试通过所有活动接口访问目标。这可能会产生不必要的流量。要将 MAC Telnet 客户端限制到特定接口，请使用 `interface` 属性（自 RouterOS v7.22 起可用）。例如：`/tool/mac-telnet 00:11:22:33:44:55 interface=ether1`
:::

#### MAC 扫描 {#mac-scan}

MAC 扫描功能可发现指定网络上所有支持 MAC telnet 协议的设备。该命令要求选择要扫描的接口：

```ros
[admin@Sw_Denissm] > /tool/mac-scan interface=all           
MAC-ADDRESS       ADDRESS                AGE
B8:69:F4:7F:F2:E7 192.168.69.1            26
2C:C8:1B:FD:F2:C3 192.168.69.3            56
```

在上例中，选择了所有接口，扫描将无限运行，除非停止（按“q”）。

还可以添加“duration”参数，用于指定扫描持续时间：

```ros
[admin@Sw_Denissm] > /tool/mac-scan interface=all duration=1
MAC-ADDRESS       ADDRESS                AGE
B8:69:F4:7F:F2:E7 192.168.69.1            48
2C:C8:1B:FD:F2:C3 192.168.69.3            17
```

在上例中，将“duration”参数设置为 1 秒。

### MAC WinBox 服务器 {#mac-winbox-server}

与 MAC Telnet 相同，可以将 MAC WinBox 访问设置为属于[接口列表](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)的特定接口：

```ros
[admin@device] > /tool/mac-server/mac-winbox/set allowed-interface-list=listBridge 
[admin@device] > /tool/mac-server/mac-winbox/print                   
  allowed-interface-list: listBridge
```

在上例中，为接口列表“listBridge”配置了 MAC WinBox 访问，因此 MAC WinBox 仅可通过该列表中的成员接口工作。

要禁用 MAC WinBox 访问，请执行命令（将“allowed-interface-list”设置为“none”）：

```ros
[admin@device] > /tool/mac-server/mac-winbox/set allowed-interface-list=none
[admin@device] > tool mac-server mac-winbox print                   
  allowed-interface-list: none
```

### MAC Ping 服务器 {#mac-ping-server}

MAC Ping Server 可以设置为“disabled”或“enabled”：

```ros
[admin@device] > /tool/mac-server/ping/print
  enabled: yes
```

可以使用以下命令启用或禁用 MAC ping（**enable=yes** → 启用该功能；**enable=no** → 禁用该功能）：

```ros
[admin@device] > /tool/mac-server/ping/set enabled=yes
[admin@device] > /tool/mac-server/ping/set enabled=no
```

启用 MAC Ping 后，同一广播域中的其他主机可以使用 ping 工具 ping MAC 地址。例如，可以执行以下命令查看 MAC ping 结果：

```ros
[admin@device] > /ping 00:0C:42:72:A1:B0
HOST                                    SIZE  TTL TIME  STATUS                                         
00:0C:42:72:A1:B0                       56        0ms  
00:0C:42:72:A1:B0                       56        0ms  
    sent=2 received=2 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=0ms 
```

:::warning
如果禁用 **MAC server ping** 功能，主机的 **ARP ping** 功能也会被禁用。
:::

:::tip
默认情况下，MAC ping 会尝试通过所有活动接口到达目标。如果目标可通过多个接口到达，这可能会产生不必要的流量和重复回复。要将 MAC ping 限制到特定接口，请使用接口选择器（在 MAC 地址后附加 `%` 和接口名称）。例如：`/ping 00:11:22:33:44:55%ether1`
:::
