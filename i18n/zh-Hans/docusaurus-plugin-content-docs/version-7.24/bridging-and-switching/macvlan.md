---
sidebar_key: "bridging-and-switching/macvlan"
sidebar_position: 5
title: "MACVLAN"
sidebar_label: "MACVLAN"
description: "MACVLAN 允许在物理接口上创建多个具有唯一 MAC 地址的虚拟网络接口，从而实现高效的 IP 地址管理和独立的 PPPoE 连接。它工作在 MAC 层，不使用 VLAN 标记，但存在一些限制，例如数据包接收受限，并且在桥接场景中需要谨慎配置。"
tags:
  - 'macvlan'
  - 'arp'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/macvlan
captured_at: '2026-11-04T11:27:06+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MACVLAN 提供了一种手段，可以在一个物理网络接口上创建多个虚拟网络接口，每个虚拟接口都拥有自己唯一的媒体访问控制（MAC）地址。该技术用于满足特定的网络需求，例如从单个物理以太网接口获取多个 IP 地址，或在使用不同 MAC 地址的情况下建立各自独立的 PPPoE 客户端连接。与依赖带有 VLAN 标识的以太网帧的传统 [VLAN](./vlan.md)（虚拟局域网）接口不同，MACVLAN 在 MAC 地址层面工作，使其成为针对特定网络场景的一种灵活而高效的解决方案。

:::info
MACVLAN 接口只能接收广播数据包、发往其自身 MAC 地址的数据包以及有限数量的组播地址。如果物理接口上配置了 VLAN，则 MACVLAN 接口无法接收来自该 VLAN 的数据包。

对于桥接以及涉及 VLAN 的更复杂的二层解决方案，应改用专用的交换机。
:::

## 基本配置示例 {#basic-configuration-example}

设想这样一种场景：ether1 接口连接到您的 ISP，而您的路由器需要租用两个 IP 地址，每个地址都使用不同的 MAC 地址。传统上，这需要使用两个物理以太网接口和一台额外的交换机。然而，更高效的解决方案是创建一个虚拟的 MACVLAN 接口。

要创建 MACVLAN 接口，请选择所需的以太网接口。如果未手动指定，将自动分配一个 MAC 地址：

```ros
/interface/macvlan
add interface=ether1 name=macvlan1

/interface/macvlan/print
Flags: R - RUNNING
Columns: NAME, MTU, INTERFACE, MAC-ADDRESS, MODE
#   NAME       MTU  INTERFACE  MAC-ADDRESS        MODE  
0 R macvlan1  1500  ether1     76:81:BF:68:69:83  bridge
```

现在，可以在 ether1 和 macvlan1 接口上创建 DHCP 客户端：

```ros
/ip/dhcp-client
add interface=ether1
add interface=macvlan1
```

## 属性参考 {#property-reference}

**子菜单：** `/interface/macvlan`

MACVLAN 接口的配置设置。

| 属性 | 描述 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*; 默认：**enabled**) | Address Resolution Protocol 设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口将不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口将使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在接口上执行 proxy ARP，并将回复发送到同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在接口上执行 proxy ARP，并将回复发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口将仅回复来自匹配 IP 地址/MAC 地址组合的请求，这些组合作为静态条目输入到 IP/ARP 表中。不会自动将动态条目存储到 IP/ARP 表中。因此，为使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*auto \| integer*; 默认：**auto**) | 设置当未从 IP 收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 `/ip/settings/` 中 `arp-timeout` 的值，默认值为 30s。 |
| **comment** (*string*; 默认值: ) | 接口的简短描述。 |
| **disabled** (*yes \| no*; 默认值: **no**) | 更改接口是否被禁用。 |
| **interface** (*name*; 默认：) | MACVLAN 将在其上运行的底层接口的名称。MACVLAN 接口可在任何具有 MAC 地址的接口上创建。 <br/><br/><strong>警告：</strong><ul><li>不支持在 MACVLAN 接口之上添加 VLAN 接口。</li><li>不支持在已桥接或已绑定的接口上添加 MACVLAN。</li></ul> |
| **loop-protect** (*on \| off \| default*; 默认：**default**) | 启用或禁用接口上的环路保护，**default** 的作用等同于关闭。 |
| **loop-protect-disable-time** (*时间间隔 \| 0*; 默认：**5m**) | 设置检测到环路时所选接口被禁用的时长。**0** - 永久。 |
| **loop-protect-send-interval** (*时间间隔*; 默认：**5s**) | 设置所选接口上发送 loop protect 数据包的频率。 |
| **mac-address** (*MAC*; 默认值: ) | 接口的静态 MAC 地址。未指定时将分配一个随机生成的 MAC 地址。 |
| **mode** (*private \| bridge*; 默认：**bridge**) | 设置 MACVLAN 接口模式： <br/><ul><li><span className="ros-icon-success"><code>private</code></span> - 不允许同一父 **interface** 上的 MACVLAN 实例之间通信。</li><li><span className="ros-icon-success"><code>bridge</code></span> - 允许同一父 **interface** 上的 MACVLAN 实例之间通信。</li></ul> |
| **mtu** (*integer*; 默认：**1500**) | 设置第 3 层最大传输单元。对于 MACVLAN 接口，其值不能高于父 **interface**。 |
| **name** (*string*; 默认：) | 接口名称。 |
