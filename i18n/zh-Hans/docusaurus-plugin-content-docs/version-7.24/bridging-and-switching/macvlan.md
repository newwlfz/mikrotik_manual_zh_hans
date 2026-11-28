---
title: "MACVLAN"
description: "MACVLAN 允许在物理接口上创建多个具有唯一 MAC 地址的虚拟网络接口，从而实现高效的 IP 地址管理和独立的 PPPoE 连接。它在 MAC 层运行，不使用 VLAN 标记，但存在数据包接收受限等限制，并且在网桥场景中需要谨慎配置。"
tags:
  - 'macvlan'
  - 'arp'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/macvlan
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MACVLAN 提供一种创建多个虚拟网络接口的方式，每个接口都有唯一的媒体访问控制（MAC）地址，并连接到一个物理网络接口。该技术用于满足特定网络需求，例如从单个物理以太网接口获取多个 IP 地址，或使用不同 MAC 地址建立多个独立的 PPPoE 客户端连接。与依赖带有 VLAN 标识符标记的以太网帧的传统 [VLAN](/docs/bridging-and-switching/vlan)（虚拟 LAN）接口不同，MACVLAN 工作在 MAC 地址层，因此在特定网络场景中是一种通用且高效的解决方案。

:::info
MACVLAN 接口只能接收广播数据包、发往自身 MAC 地址的数据包，以及有限数量的组播地址的数据包。如果物理接口配置了 VLAN，则 MACVLAN 接口无法接收来自该 VLAN 的数据包。

对于涉及 VLAN 的网桥和更复杂的二层解决方案，应改用专用交换机。
:::

## 基本配置示例 {#basic-configuration-example}

假设 ether1 接口连接到 ISP，路由器需要租用两个 IP 地址，且每个地址使用不同的 MAC 地址。传统方式需要使用两个物理以太网接口和一个额外的交换机。不过，更高效的解决方案是创建一个虚拟 MACVLAN 接口。

要创建 MACVLAN 接口，请选择所需的以太网接口。如果未手动指定 MAC 地址，系统将自动分配一个 MAC 地址：

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

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*；默认：**enabled**) | 地址解析协议设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口将不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口将使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在该接口上执行代理 ARP，并将回复发送到同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在该接口上执行代理 ARP，并将回复发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅回复来自匹配的 IP 地址/MAC 地址组合的请求，这些组合在 IP/ARP 表中作为静态条目输入。IP/ARP 表中不会自动存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*auto \| integer*；默认：**auto**) | 设置在未从 IP 收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 `/ip/settings/` 中的 `arp-timeout` 值，默认为 30s。 |
| **comment** (*string*；默认：) | 接口的简短描述。 |
| **disabled** (*yes \| no*；默认：**no**) | 更改接口是否禁用。 |
| **interface** (*name*；默认：) | MACVLAN 将在其上运行的基础接口的名称。可以在任何具有 MAC 地址的接口上创建 MACVLAN 接口。 <br/><br/><strong>警告：</strong><ul><li>不支持在 MACVLAN 接口之上添加 VLAN 接口。</li><li>不支持在已桥接或已绑定的接口上添加 MACVLAN。</li></ul> |
| **loop-protect** (*on \| off \| default*；默认：**default**) | 在接口上启用或禁用环路保护，**default** 相当于关闭。 |
| **loop-protect-disable-time** (*time interval \| 0*；默认：**5m**) | 设置检测到环路时所选接口被禁用的时长。**0** - 永久。 |
| **loop-protect-send-interval** (*time interval*；默认：**5s**) | 设置在所选接口上发送环路保护数据包的频率。 |
| **mac-address** (*MAC*；默认：) | 接口的静态 MAC 地址。未指定时，将分配一个随机生成的 MAC 地址。 |
| **mode** (*private \| bridge*；默认：**bridge**) | 设置 MACVLAN 接口模式： <br/><ul><li><span className="ros-icon-success"><code>private</code></span> - 不允许同一父级 <strong>interface</strong> 上的 MACVLAN 实例之间通信。</li><li><span className="ros-icon-success"><code>bridge</code></span> - 允许同一父级 <strong>interface</strong> 上的 MACVLAN 实例之间通信。</li></ul> |
| **mtu** (*integer*；默认：**1500**) | 设置第 3 层最大传输单元。对于 MACVLAN 接口，该值不能高于父级 **interface**。 |
| **name** (*string*；默认：) | 接口名称。 |
