---
title: "RoMON"
description: "RoMON 是一种 Router Management Overlay Network，用于建立独立的 MAC 层网络以进行安全的路由器管理，使用 EtherType 0x88bf 和 DST-MAC 01:80:c2:00:88:bf。它允许端口通过可配置的 ID 和 cost 参与，支持用于数据包转发的动态 ACL 规则，并使用 MD5 哈希。"
tags:
  - 'romon'
  - 'mac-layer'
  - 'management'
source: https://manual.mikrotik.com/docs/7.25/management-tools/romon
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

RoMON 代表“Router Management Overlay Network”。RoMON 通过建立独立的 MAC 层对等发现和数据转发网络来工作。RoMON 数据包使用 EtherType 0x88bf 和 DST-MAC 01:80:c2:00:88:bf 封装，其网络独立于 L2 或 L3 转发配置运行。启用 RoMON 后，sniffer 或 torch 工具不会显示收到的任何 RoMON 数据包。

RoMON 网络中的每台路由器都会分配一个 RoMON ID。RoMON ID 可以从端口 MAC 地址中选择，也可以由用户指定。

RoMON 协议不提供加密服务。加密在“应用”层提供，例如使用 ssh 或使用安全的 WinBox。

:::info
RoMON 数据包可以通过网络交换机或网桥转发，除非对组播流量有特定限制。使用带硬件卸载的 MikroTik 网桥时，这些数据包会被视为普通组播数据包，并在网络中泛洪。

自 RouterOS v7.17 起，如果启用了 RoMON 服务且交换芯片支持 ACL 规则，则会自动创建动态规则，将这些数据包重定向到 CPU，RoMON 服务在 CPU 上运行。但是，如果交换机不支持 ACL 规则，并且配置不一致，例如 CPU 和 RoMON 未标记数据包不在同一 VLAN 中，则 RoMON 服务可能无法按预期运行。

**RB5009**（switch‑chip 88E6393X）不支持此路径。该芯片的 frame‑types=admit‑only‑vlan‑tagged 过滤器会在应用任何 ACL 规则之前丢弃 RoMON 帧，因此数据包永远不会到达 CPU。
:::

## 配置 {#configuration}

要使设备参与 RoMON 网络，必须启用 RoMON 功能，并指定参与 RoMON 网络的端口。

Romon 从 [`/tool/romon`](/docs/cli-reference/tool/romon) 菜单配置。

启用 RoMON 但未指定 ID 时，将自动选择 ID：

```routeros
[admin@MikroTik] /tool/romon> print 
     enabled: yes              
          id: 00:00:00:00:00:00
     secrets:                  
  current-id: DC:2C:6E:9E:11:27
```

参与 RoMON 网络的端口在 [`/tool/romon/port`](/docs/cli-reference/tool/romon/port) 菜单中配置。端口列表是由匹配特定接口或 interface-list 的条目组成的列表。每个条目定义匹配的接口是否允许或禁止参与 RoMON 网络。如果允许参与，该条目还会指定端口的 cost。

:::info
预配置了接口列表为“all”的默认条目。这意味着启用 RoMON 服务后，默认允许所有接口参与 RoMON 网络。该默认条目无法删除，也无法启用或禁用，但你可以修改其 `cost`、将其设置为 `forbid` 参与，或配置 `secrets`。
:::

## Secrets

RoMON 协议密钥用于通过 MD5 对消息内容进行哈希，从而实现消息认证、完整性检查和重放防护。

对于每个接口，如果接口专属密钥列表为空，则使用全局密钥列表。发送时，如果列表不为空且第一项不是“空密钥”（空字符串 = ""），则使用列表中的第一个密钥对消息进行哈希；否则，消息以未哈希方式发送。接收时，只有当密钥列表为空或包含“空密钥”时，才接受未哈希消息；如果消息使用列表中的任意密钥进行哈希，则接受该消息。

这种设计允许在网络中逐步引入和/或更改密钥，而不会中断 RoMON 服务，并且可以通过 RoMON 本身完成，例如：

- 最初，所有路由器都没有密钥。
- 逐台配置路由器，使用 secrets="","mysecret" - 这会使所有路由器仍发送未受保护的帧，但它们都已准备好接受使用密钥 "mysecret" 保护的帧。
- 逐台配置路由器，使用 secrets="mysecret","" - 这会使所有路由器使用密钥 "mysecret"，但仍接受未受保护的帧（来自尚未更改的路由器）。
- 为每台路由器配置 secrets="mysecret" - 这会使所有路由器使用密钥 "mysecret"，并且只接受受 "mysecret" 保护的帧。

更改网络中的密钥时，应采用类似方式，即在一段时间内网络中同时使用两个密钥。

## 对等节点发现 {#peer-discovery}

要发现 RoMON 网络中的所有路由器，必须使用 [`/tool/romon/discover`](/docs/cli-reference/tool/romon/discover) 命令：

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

要使设备参与 RoMON 网络，必须启用 RoMON 功能，并指定参与 RoMON 网络的端口。

```ros
/tool/romon/set enabled=yes secrets=testing
```

参与 RoMON 网络的端口在 **the RoMON port** 菜单中配置。端口列表由匹配特定端口或所有端口的条目组成，用于指定匹配的端口是否被禁止参与 RoMON 网络；如果允许端口参与 RoMON 网络，该条目还会指定端口开销。所有特定端口条目的优先级均高于带有 **interface=all** 的通配符条目。

例如，以下列表指定所有端口以开销 100 参与 RoMON 网络，ether7 接口以开销 200 参与 RoMON 网络：

```ros
[admin@MikroTik] > /tool/romon/port/print
Flags: * - default
Columns: INTERFACE, FORBID, COST
#     INTERF  FO  COS
0  *  all     no  100
1     ether7  no  200
```

默认会创建一个通配符条目，其 **forbid=no** 且 **cost=100**。

### Applications

多个应用可以通过 RoMON 网络运行。

要测试 RoMON 网络中特定路由器的可达性，可以使用 RoMON ping 命令：

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

要建立到 RoMON 网络中路由器的安全终端连接，可以使用 RoMON SSH 命令：

```ros
[admin@MikroTik] > /tool/romon/ssh 6C:3B:6B:48:0E:8B
```

### 在 WinBox 中使用 CLI 运行 RoMON {#run-romon-in-winbox-by-using-cli}

要通过计算机上的命令行直接建立 RoMON 会话，必须指定 RoMON agent 和目标路由器地址。要成功连接，必须将该 RoMON agent 保存到 WinBox 的 Managed routers 列表中：

```ros
winbox.exe --romon 192.168.88.1 6C:3B:6B:48:0E:8B admin ""
```

### 通过 WinBox GUI 连接到 RoMON {#connect-to-romon-through-winbox-gui}

观看[视频教程](https://www.youtube.com/watch?v=Peg6UcSJ_eA)。
