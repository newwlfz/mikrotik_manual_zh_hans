---
title: "邻居发现"
description: "邻居发现协议支持在第 2 层域中使用 MNDP、CDP 或 LLDP 检测设备，并显示已连接邻居的 IP/MAC 地址和接口。配置选项包括协议选择、发现间隔调整，以及用于共享 QoS 和 VLAN 信息的 LLDP TLV。"
tags:
  - 'neighbor-discovery'
  - 'lldp'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/neighbor-discovery
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

邻居发现协议可用于在第 2 层广播域中发现兼容 MNDP（MikroTik Neighbor Discovery Protocol）、CDP（Cisco Discovery Protocol）或 LLDP（Link Layer Discovery Protocol）的设备。它们可用于绘制网络拓扑。

## 邻居列表 {#neighbor-list}

邻居列表显示第 2 层广播域中所有已发现的邻居。它会显示邻居连接的接口、其 IP/MAC 地址以及其他相关参数。该列表为只读。下面提供了一个邻居列表示例：

```ros
[admin@MikroTik] /ip/neighbor/print 
 # INTERFACE ADDRESS         MAC-ADDRESS       IDENTITY   VERSION    BOARD      
 0 ether13   192.168.33.2    00:0C:42:00:38:9F MikroTik   5.99       RB1100AHx2
 1 ether11   1.1.1.4         00:0C:42:40:94:25 test-host  5.8        RB1000   
 2 Local     10.0.11.203     00:02:B9:3E:AD:E0 c2611-r1   Cisco I...                    
 3 Local     10.0.11.47      00:0C:42:84:25:BA 11.47-750  5.7        RB750  
 4 Local     10.0.11.254     00:0C:42:70:04:83 tsys-sw1   5.8        RB750G    
 5 Local     10.0.11.202     00:17:5A:90:66:08 c7200      Cisco I...
```

**子菜单：** `/ip/neighbor`

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP*) | 已发现设备上配置的最高 IP 地址 |
| **address6** (*IPv6*) | 已发现设备上配置的 IPv6 地址 |
| **add-dns-entries** (*yes \| no*) | 指定是否为该邻居创建动态 DNS 条目，并将 identity 用作域名 |
| **add-dns-entries-suffix** (*string*) | 添加到为每个邻居创建的动态 DNS 条目的后缀。 |
| **age** (*time*) | 自上次发现数据包以来的时间间隔 |
| **discovered-by** (*cdp\|lldp\|mndp*) | 显示发现该邻居所使用的协议列表。该属性自 RouterOS 7.7 版本起可用。 |
| **board** (*string*) | RouterBoard 型号。仅对安装了 RouterOS 的设备显示 |
| **identity** (*string*) | 已配置的系统 identity |
| **interface** (*string*) | 已发现设备所连接的接口名称 |
| **interface-name** (*string*) | 邻居设备上连接到 L2 广播域的接口名称。适用于 CDP。 |
| **ipv6** (*yes \| no*) | 显示设备是否启用了 IPv6。 |
| **mac-address** (*MAC*) | 远端设备的 MAC 地址。可用于通过 mac-telnet 连接。 |
| **platform** (*string*) | 平台名称。例如“MikroTik”、“cisco”等。 |
| **software-id** (*string*) | 远端设备上的 RouterOS 软件 ID。仅适用于安装了 RouterOS 的设备。 |
| **system-caps** (*string*) | 由 Link-Layer Discovery Protocol（LLDP）报告的系统能力。 |
| **system-caps-enabled** (*string*) | 由 Link-Layer Discovery Protocol（LLDP）报告的已启用系统能力。 |
| **unpack** (*none\|simple\|uncompressed-headers\|uncompressed-all*) | 显示发现数据包的压缩类型。 |
| **uptime** (*time*) | 远端设备的运行时间。仅对安装了 RouterOS 的设备显示。 |
| **version** (*string*) | 远端设备上已安装软件的版本号 |
| **running** (string array) | 报告邻居设备上正在运行的“功能”列表。当前仅列出“CAPsMAN”功能。 |

:::warning
为避免内存耗尽，每个接口的邻居条目数限制为（总 RAM，单位 MB）\*16。
:::

### LLDP 邻居 {#lldp-neighbors}

LLDP 发现的邻居显示在 `/ip/neighbor/lldp` 下的独立只读菜单中。该菜单显示从邻居设备接收的详细 LLDP type-length-value（TLV）。

与聚合所有发现协议（MNDP、CDP 和 LLDP）邻居的通用 `/ip/neighbor` 菜单不同，`/ip/neighbor/lldp` 仅显示通过 LLDP 发现的条目。

示例输出：

```ros
[admin@Switch] > /ip/neighbor/lldp/print
Columns: INTERFACE, ADDRESS4, ADDRESS6, MAC-ADDRESS, LLDP-CHASSIS-ID, LLDP-PORT-ID, LLDP-PORT-DESCRIPTION, LLDP-SYSTEM-NAME, LLDP-SYSTEM-DESCRIPTION
#  INTERFACE  ADDRESS4        ADDRESS6                   MAC-ADDRESS        LLDP-CHASSIS-ID    LLDP-PORT-ID  LLDP-PORT-DESCRIPTION  LLDP-SYSTEM-NAME  LLDP-SYSTEM-DESCRIPTION                                                     
0  ether2     192.168.88.128  fe80::f61e:57ff:fe13:d794  F4:1E:57:13:D7:94  F4:1E:57:13:D7:94  ether1        ether1                 Tested_CRS812     MikroTik RouterOS 7.24rc1 (testing) 2026-07-01 13:53:30 CRS812-8DS-2DQ-2DDQ 
   bridge1                                                                                                                                                                                                                        
1  ether3     192.168.88.127  fe80::f61e:57ff:fe47:9255  F4:1E:57:47:92:55  F4:1E:57:47:92:55  ether1        ether1                 Tested_CRS520     MikroTik RouterOS 7.24rc1 (testing) 2026-07-01 13:53:30 CRS520-4XS-16XQ     
   bridge1                                                                                                                                                                                                                        
2  ether4     192.168.88.9    fe80::1afd:74ff:fe81:9a    18:FD:74:81:00:9A  18:FD:74:81:00:86  ether1        ether1                 Tester6           MikroTik RouterOS 7.24rc1 (testing) 2026-07-01 13:53:30 CCR2216-1G-12XS-2XQ 
   bridge1                                                                                                                                                                                                                        
3  ether5     192.168.88.132  fe80::d601:c3ff:fe43:c035  D4:01:C3:43:C0:35  D4:01:C3:43:C0:35  ether1        ether1                 Tested_L009       MikroTik RouterOS 7.24rc1 (testing) 2026-07-01 13:53:30 L009UiGS            
   bridge1                                                                                                                                                                                                                        
4  ether8     192.168.88.129  fe80::f61e:57ff:fec2:8a3d  F4:1E:57:C2:8A:3D  F4:1E:57:C2:8A:2B  ether17       ether17                Tested_CRS418     MikroTik RouterOS 7.24rc1 (testing) 2026-07-01 13:53:30 CRS418-8P-8G-2S+    
   bridge1   
```

:::note
`lldpRemTable` SNMP 表仅报告通过 LLDP 发现的邻居。仅通过 CDP 或 MNDP 发现的条目不会包含在 SNMP LLDP-MIB 中。
:::

## 发现配置 {#discovery-configuration}

可以使用接口列表更改接口是否参与邻居发现。如果接口包含在发现接口列表中，它将发送有关系统的基本信息，并处理在 Layer2 网络中广播接收到的发现数据包。从接口列表中移除接口将禁用该接口上的邻居发现，以及在该接口上发现此设备的可能性。

**子菜单：** `/ip/neighbor/discovery-settings`

| 属性 | 说明 |
| :-- | :-- |
| **discover-interface-list** (*string*；默认：**static**) | 发现协议将在其成员接口上运行的接口列表。 |
| **discover-interval** (*time: 5s..9h6m8s*；默认：**30s**) | 调整发送邻居发现数据包的频率。它还使用公式 (`discover-interval` \* 4) + 1 调整 CDP 和 LLDP 数据包的 Time-to-Live（TTL）TLV 值。该设置自 RouterOS 7.16 起可用。 |
| **lldp-dcbx** (*yes \| no*；默认：**no**) | 是否发送 Data Center Bridging Capabilities Exchange Protocol（DCBX）TLV，该 TLV 允许通过 LLDP 与相邻设备通信交换机 <a href="/docs/bridging-and-switching/quality-of-service">QoS 设置</a>和能力。仅适用于具有 Marvell Prestera 交换机的 MikroTik 设备（例如 CRS3xx）。<br/>启用的 DCBX 包括以下 TLV：<br/><ol><li><strong>ETS（Enhanced Transmission Selection）Configuration TLV</strong>。该 TLV 用于共享交换机的 ETS 配置。它包括：<ol><li>willingness 位，指示设备是否愿意接受来自相邻设备的 QoS 配置。在 RouterOS 中，willingness 位设置为禁用，这意味着交换机不会接受远程配置，而是使用自身设置。</li><li>优先级分配表，将优先级映射到特定的 traffic-class。</li><li>带宽分配表，RouterOS 根据 <span className="ros-background-accent-green-bolder"><code>weight</code></span> 属性计算分配给每个队列的带宽百分比。这适用于在 <code><code>/interface/ethernet/switch/qos/tx-manager/queue</code></code> 设置中使用 <span className="ros-background-accent-green-bolder"><code>high-priority-group</code></span> 的队列。</li><li>Transmission Selection Algorithm（TSA）表，其中 <span className="ros-background-accent-green-bolder"><code>high-priority-group</code></span> 队列分配给 ETS，<span className="ros-background-accent-green-bolder"><code>strict-priority</code></span> 队列分配给 Strict Priority，<span className="ros-background-accent-green-bolder"><code>low-priority-group</code></span> 或非硬件卸载队列分配给 Vendor Specific Algorithm。</li></ol></li><li><strong>ETS Recommendation TLV</strong>。该 TLV 提供关于相邻设备应如何配置 ETS 的建议。RouterOS 使用与 ETS Configuration TLV 中相同的数据给出建议。</li><li><strong>Priority-based Flow Control Configuration TLV</strong>。该 TLV 用于共享 PFC 配置。与 ETS TLV 类似，willingness 位设置为禁用，这意味着交换机不接受远程 PFC 配置。PFC 根据 <code><code>/interface/ethernet/switch/qos/priority-flow-control</code></code> 和 <code><code>/interface/ethernet/switch/qos/port</code></code> 下配置的设置，针对特定优先级启用。</li><li><strong>Application Priority TLV</strong>。该 TLV 用于传达网络中不同应用的优先级处理方式。</li><li><strong>Application VLAN TLV</strong>。该 TLV 用于共享应用的 VLAN 配置。RouterOS 当前不支持在该 TLV 中发送值，将改为发送空 VLAN 表。</li></ol> |
| **lldp-mac-phy-config**(*yes \| no*；默认：**no**) | 是否在 LLDP 中发送 MAC/PHY Configuration/Status TLV，该 TLV 指示接口能力、双工状态的当前设置、比特率和自动协商。仅适用于以太网接口。虽然该 TLV 在 LLDP 中是可选的，但在发送 LLDP-MED 时是必需的，这意味着即使该属性配置为禁用，必要时也会包含该 TLV。 |
| **lldp-max-frame-size** (*yes \| no*；默认：**no**) | 是否在 LLDP 中发送 Maximum Frame Size TLV，该 TLV 以字节为单位指示接口的最大帧大小能力 (`l2mtu` + 18)。仅适用于以太网接口。 |
| **lldp-med** (*yes \| no*；默认：**yes**) | 指定是否通告 LLDP-MED Media Capabilities TLV。使用 `lldp-med-net-policy-vlan` 时必须启用该选项。该设置自 RouterOS 7.23 起可用。 |
| **lldp-poe-power** (*yes \| no*；默认：**yes**) | 两个特定 TLV 用于支持 Power over Ethernet（PoE）供电设备（PSE）与受电设备（PD）之间的 PoE 管理：<br/><ul><li>IEEE 802.3 Organizationally Specific <strong>Power Via MDI</strong> TLV</li><li>TIA-1057（LLDP-MED）Organizationally Specific <strong>Extended Power via MDI</strong> TLV</li></ul><code>lldp-poe-power</code> 属性决定是否在 LLDP 消息中发送 IEEE 802.3 Organizationally Specific Power Via MDI TLV。<br/>LLDP-MED Organizationally Specific Extended Power via MDI TLV 的发送不可配置。当远端设备已发送接收电力的 LLDP-MED 能力时，该 TLV 会自动包含在发出的 LLDP-MED 数据包中。<br/>这些 TLV 仅与支持 <a href="/docs/hardware/poe-out">PoE-Out</a> 的以太网接口相关。该设置自 RouterOS 7.15 起可用，并取代 PoE-out 端口的 <code>poe-lldp-enabled</code> 设置。 |
| **lldp-med-net-policy-vlan** (*integer 0..4094*；默认：**disabled**) | LLDP-MED Network Policy TLV 的通告 VLAN ID。这允许为支持 LLDP-MED 的设备（例如 VoIP 电话）分配 VLAN ID。该 TLV 只会添加到发现支持 LLDP-MED 的设备且启用了 <code>lldp-med</code> 的接口。其他 TLV 值已预定义，无法更改：<br/><ul><li>Application Type - Voice</li><li>VLAN Type - Tagged</li><li>L2 Priority - 0</li><li>DSCP Priority - 0</li></ul>与网桥接口一起使用时，应通过 <code>protocol-mode</code> 设置启用 (R/M)STP 协议。<br/>此外，应使用 <code>protocol</code> 设置排除其他邻居发现协议（例如 CDP），以避免 LLDP-MED 配置错误。 |
| **lldp-vlan-info** (*yes \| no;*；默认：**no**) | 是否在 LLDP 中发送与 VLAN 相关的 IEEE 802.1 Organizationally Specific TLV。<br/>启用该设置时，将通告三个 TLV：<br/><ul><li>Port VLAN ID。这适用于网桥端口的 <span className="ros-background-accent-green-bolder"><code>pvid</code></span> 属性。</li><li>Port And Protocol VLAN ID。该 TLV 不使用，始终指示“不支持”和“未启用”。</li><li>VLAN Name。这包括来自“<code><code>/interface/bridge/vlan</code></code>”表中最多 10 个活动 VLAN。</li></ul>这些 TLV 与添加到 <a href="/docs/bridging-and-switching#bridge-vlan-filtering">vlan-filtering</a> 网桥的接口相关，该设置自 RouterOS 7.16 起可用。 |
| **mode** (*rx-only \| tx-only \| tx-and-rx*；默认：**tx-and-rx**) | 选择邻居发现数据包的发送和接收模式。该设置自 RouterOS 7.7 起可用。 |
| **protocol** (*cdp \| lldp \| mndp*；默认：**cdp,lldp,mndp**) | 使用的发现协议列表。 |

自 RouterOS v6.44 起，邻居发现可在单个从属接口上工作。每当主接口（例如 bonding 或网桥）包含在发现接口列表中时，其所有从属接口都会自动参与邻居发现。可以仅允许部分从属接口进行邻居发现。为此，请将特定从属接口包含在列表中，并确保主接口未包含在该列表中。

```ros
/interface/bonding
add name=bond1 slaves=ether5,ether6
/interface/list
add name=only-ether5
/interface/list/member
add interface=ether5 list=only-ether5
/ip/neighbor/discovery-settings
set discover-interface-list=only-ether5
```

现在，邻居列表会显示主接口以及实际接收到发现消息的从接口。

```ros
[admin@R2] > ip neighbor print
 # INTERFACE ADDRESS                                           MAC-ADDRESS       IDENTITY   VERSION    BOARD         
 0 ether5    192.168.88.1                                      CC:2D:E0:11:22:33 R1         6.45.4 ... CCR1036-8G-2S+
   bond1    
```

## LLDP

根据 RouterOS 配置，LLDP 消息中可以发送不同类型长度值（TLV）。包括：

- Chassis ID（MAC 地址）。
- Port ID（接口名称）。
- Time To Live。
- System Name（系统标识）。
- System Description（平台 - MikroTik，软件版本 - RouterOS 版本，硬件名称 - RouterBoard 名称）。
- Management Address（端口上配置的所有 IP 地址）。
- System Capabilities（已启用的系统能力，例如网桥或路由器）。
- Port Description（如果发送接口属于网桥或 bond，则为组合接口名称，如“bridge/ether1”；否则为与 Port ID 相同的接口名称）。
- IEEE 802.1 Port VLAN ID。
- IEEE 802.1 Port And Protocol VLAN ID。
- IEEE 802.1 VLAN Name。
- IEEE 802.3 MAC/PHY Configuration/Status。
- IEEE 802.3 Power Via MDI。
- IEEE 802.3 Maximum Frame Size。
- LLDP-MED Media Capabilities（MED 能力列表）。
- LLDP-MED Network Policy（分配给语音流量的 VLAN ID）。
- LLDP-MED Extended Power via MDI。
- Port Extension（Port Extender 和 Controller Bridge 通告）。
- End of LLDPDU。
