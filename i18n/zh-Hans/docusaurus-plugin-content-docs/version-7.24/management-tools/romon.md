---
sidebar_key: "management-tools/romon"
sidebar_position: 9
title: "RoMON"
sidebar_label: "RoMON"
description: "RoMON 是一种路由器管理覆盖网络，它建立独立的 MAC 层网络以实现安全的路由器管理，使用 EtherType 0x88bf 和 DST-MAC 01:80:c2:00:88:bf。它允许端口以可配置的 ID 和开销参与，支持用于数据包转发的动态 ACL 规则，并使用 MD5 哈希。"
tags:
  - 'romon'
  - 'mac-layer'
  - 'management'
source: https://manual.mikrotik.com/docs/7.24/management-tools/romon
captured_at: '2026-11-04T11:32:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

RoMON 代表“Router Management Overlay Network”。RoMON 通过建立一个独立的 MAC 层对等发现和数据转发网络来工作。RoMON 数据包使用 EtherType 0x88bf 和 DST-MAC 01:80:c2:00:88:bf 进行封装，其网络独立于 L2 或 L3 转发配置运行。启用 RoMON 后，任何接收到的 RoMON 数据包都不会由 sniffer 或 torch 工具显示。

RoMON 网络上的每台路由器都会被分配其 RoMON ID。RoMON ID 可以从端口 MAC 地址中选择，也可以由用户指定。

RoMON 协议不提供加密服务。加密在“应用”层提供，例如使用 ssh 或使用安全的 WinBox。

:::info
RoMON 数据包可以通过网络交换机或网桥转发，除非对组播流量有特定限制。使用带硬件卸载的 MikroTik 网桥时，这些数据包会被当作常规组播数据包处理，并在整个网络中泛洪。

自 RouterOS v7.17 起，如果启用了 RoMON 服务且交换芯片支持 ACL 规则，则会自动创建动态规则，将这些数据包重定向到运行 RoMON 服务的 CPU。但是，如果交换机不支持 ACL 规则且配置不一致，例如 CPU 和 RoMON 未标记数据包不在同一 VLAN 中，RoMON 服务可能无法按预期工作。

**RB5009**（switch‑chip 88E6393X）不支持此路径。该芯片的 frame‑types=admit‑only‑vlan‑tagged 过滤器会在应用任何 ACL 规则之前丢弃 RoMON 帧，因此这些数据包永远不会到达 CPU。

:::

## 配置 {#configuration}

为了使设备加入 RoMON 网络，必须启用 RoMON 功能，并且必须指定加入 RoMON 网络的端口。

**子菜单：** `/tool/romon`

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes \| no*；默认：**no**) | 禁用或启用 RoMON 功能。 |
| **id** (*MAC 地址*；默认：**00:00:00:00:00:00**) | 用作此路由器 ID 的 MAC 地址。 |
| **secrets** (*string*；默认：) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 RoMON 消息哈希的全局密钥列表。 |

当启用 RoMON 而未指定 ID 时，会自动选择 ID：

```routeros
[admin@MikroTik] /tool/romon> print 
     enabled: yes              
          id: 00:00:00:00:00:00
     secrets:                  
  current-id: DC:2C:6E:9E:11:27
```

加入 RoMON 网络的端口在 `/tool/romon/port` 菜单中配置。端口列表是匹配特定接口或 interface-list 的条目列表。每个条目定义匹配的接口是允许还是禁止加入 RoMON 网络。如果允许加入，该条目还会指定端口开销。

**子菜单：** `/tool/romon/port`

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*；默认：) | 条目的简短描述。 |
| **cost** (*integer: 0..4294967295*；默认：**100**) | 更改端口开销。 |
| **disabled** (*yes \| no*；默认：**no**) | 更改条目是否被禁用。 |
| **interface** (*name*；默认：) | 用于 RoMON 的接口名称或 interface-list。 |
| **secrets** (*string*；默认：) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 RoMON 消息哈希的单个端口密钥列表。 |
| **forbid** (*yes \| no*；默认：**no**) | 更改匹配的接口是允许还是禁止加入 RoMON 网络。|

:::info
默认预配置了一个 interface-list 为 "all" 的条目。这意味着启用 RoMON 服务后，默认允许所有接口加入 RoMON 网络。此默认条目无法删除或启用/禁用，但仍可以修改其 `cost`、将其设置为 `forbid` 参与，或配置 `secrets`。

:::

## 密钥 {#secrets}

RoMON 协议密钥通过使用 MD5 对消息内容进行哈希，用于消息认证、完整性检查和重放防护。

对于每个接口，如果接口特定的密钥列表为空，则使用全局密钥列表。发送时，如果列表不为空且第一项不是“空密钥”（空字符串 = ""），则使用列表中的第一个密钥对消息进行哈希；否则，消息将以未哈希方式发送。接收时，仅当密钥列表为空或包含“空密钥”时才接受未哈希消息；如果哈希消息使用列表中的任一密钥进行哈希，则接受该消息。

此设计允许在网络中逐步引入和/或更改密钥，而不会中断 RoMON 服务，并且可以通过 RoMON 本身完成，例如：

- 最初，所有路由器都没有密钥。
- 逐台将每台路由器配置为 secrets="","mysecret" —— 这会使所有路由器仍然发送未受保护的数据帧，但它们都将准备好接受使用密钥 "mysecret" 保护的帧。
- 逐台将每台路由器配置为 secrets="mysecret","" —— 这会使所有路由器使用密钥 "mysecret"，但仍会接受未受保护的帧（来自尚未更改的路由器）。
- 将每台路由器配置为 secrets="mysecret" —— 这会使所有路由器使用密钥 "mysecret"，并且只接受使用 "mysecret" 保护的帧。

在网络中更改密钥应以类似方式进行，即在一段时间内网络中同时使用两个密钥。

## 对等发现 {#peer-discovery}

为了发现 RoMON 网络上的所有路由器，必须使用 RoMON discover 命令：

```ros
[admin@MikroTik] > /tool/romon/discover 
Flags: A - active
Columns: ADDRESS, COST, HOPS, PATH, L2MTU, IDENTITY, VERSION, BOARD
   ADDRESS            COS  H  PATH               L2MT  IDENTITY   VERSION    BOARD              
A  6C:3B:6B:48:0E:8B  200  1  6C:3B:6B:48:0E:8B  1500  hEX        6.47beta7  RB750Gr3           
A  6C:3B:6B:ED:83:69  200  1  6C:3B:6B:ED:83:69  1500  CCR1009    6.47beta7  CCR1009-7G-1C-1S+  
A  B8:69:F4:B3:1B:D2  200  1  B8:69:F4:B3:1B:D2  1500  4K11       6.47beta7  RB4011iGS+5HacQ2HnD
A  CC:2D:E0:26:22:4D  200  1  CC:2D:E0:26:22:4D  1500  CCR1036    6.47beta7  CCR1036-8G-2S+     
A  CC:2D:E0:8D:01:88  200  1  CC:2D:E0:8D:01:88  1500  CRS328     6.47beta7  CRS328-24P-4S+     
A  E4:8D:8C:1C:D3:0E  200  1  E4:8D:8C:1C:D3:0E  1500  MikroTik   6.47beta7  RB2011iLS          
A  E4:8D:8C:49:49:DB  200  1  E4:8D:8C:49:49:DB  1500  hAP        6.47beta7  RB962UiGS-5HacT2HnT

```

## 配置示例 {#configuration-examples}

为了使设备加入 RoMON 网络，必须启用 RoMON 功能，并且必须指定加入 RoMON 网络的端口。

```ros
/tool/romon/set enabled=yes secrets=testing
```

加入 RoMON 网络的端口在 **RoMON 端口** 菜单中配置。端口列表是匹配特定端口或所有端口的条目列表，并指定匹配的端口是否被禁止加入 RoMON 网络；如果允许该端口加入 RoMON 网络，该条目还会指定端口开销。请注意，所有特定端口条目的优先级都高于 **interface=all** 的通配条目。

例如，以下列表指定所有端口以开销 100 加入 RoMON 网络，ether7 接口以开销 200 加入：

```ros
[admin@MikroTik] > /tool/romon/port/print
Flags: * - default
Columns: INTERFACE, FORBID, COST
#     INTERF  FO  COS
0  *  all     no  100
1     ether7  no  200
```

默认情况下，会创建一个通配条目，其 **forbid=no** 且 **cost=100**。

### 应用 {#applications}

可以在 RoMON 网络上运行多种应用。

为了测试 RoMON 网络上特定路由器的可达性，可以使用 RoMON ping 命令：

```ros
[admin@MikroTik] > /tool/romon/ping id=6C:3B:6B:48:0E:8B count=5
  SEQ HOST                                    TIME  STATUS                                                    
    0 6C:3B:6B:48:0E:8B                       1ms                                                             
    1 6C:3B:6B:48:0E:8B                       0ms                                                             
    2 6C:3B:6B:48:0E:8B                       1ms                                                             
    3 6C:3B:6B:48:0E:8B                       0ms                                                             
    4 6C:3B:6B:48:0E:8B                       1ms                                                             
    sent=5 received=5 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=1ms
```

为了与 RoMON 网络上的路由器建立安全终端连接，可以使用 RoMON SSH 命令：

```ros
[admin@MikroTik] > /tool/romon/ssh 6C:3B:6B:48:0E:8B
```

### 使用 CLI 在 WinBox 中运行 RoMON {#run-romon-in-winbox-by-using-cli}

为了在计算机上直接使用命令行建立 RoMON 会话，必须指定 RoMON 代理和目标路由器地址。RoMON 代理必须保存在 WinBox 的 Managed routers 列表中，才能成功建立连接：

```ros
winbox.exe --romon 192.168.88.1 6C:3B:6B:48:0E:8B admin ""
```

### 通过 WinBox GUI 连接到 RoMON {#connect-to-romon-through-winbox-gui}

观看视频[此处](https://www.youtube.com/watch?v=Peg6UcSJ_eA)。
