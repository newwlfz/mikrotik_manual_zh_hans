---
sidebar_key: "network-management/arp"
sidebar_position: 1
title: "ARP"
sidebar_label: "ARP"
description: "本页介绍 MikroTik RouterOS 中的 ARP（Address Resolution Protocol）功能，说明 IP 地址如何映射到 MAC 地址。内容涵盖 ARP 表属性、只读标志、VRF 关联以及 ARP 模式（disabled、enabled、proxy ARP），并包含静态条目和接口特定设置的配置示例。"
tags:
  - 'arp'
source: https://manual.mikrotik.com/docs/7.24/network-management/arp
captured_at: '2026-11-07T17:11:03.548Z'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/arp`

尽管 IP 数据包使用 IP 地址进行寻址，但主机之间传输数据时必须使用硬件地址。地址解析协议用于将 OSI 第 3 层 IP 地址映射到 OSI 第 2 层 MAC 地址。路由器维护着一张当前使用的 ARP 条目表。通常该表是动态建立的，但为了增强网络安全性，可以通过添加静态条目来部分或完全地静态构建该表。

## 属性 {#properties}

本节介绍 ARP 表的配置选项。

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP*；默认值：) | 要映射的 IP 地址 |
| **interface** (*string*；默认值：) | 分配该 IP 地址的接口名称 |
| **mac-address** (*MAC*；默认值：**00:00:00:00:00:00**) | 要映射到的 MAC 地址 |
| **published** (*yes \| no*；默认值：**no**) | 针对单个 IP 地址的静态 proxy-arp 条目。当收到针对特定 IP 地址的 ARP 查询时，设备将用自己的 MAC 地址进行应答。无需在接口本身上为所有要代理的 MAC 地址设置 proxy-arp。仅当设备存在通往目的地的活动路由时，接口才会响应 ARP 请求 |

**只读属性：**

| 属性 | 描述 |
| :-- | :-- |
| **complete** (*yes \| no*) | 当 ARP `status` 为 permanent、reachable、stale、probe 或 delay 时，ARP 条目中包含 complete 标志 |
| **dhcp**(*yes \| no*) | ARP 条目是否由 DHCP server 添加 |
| **disabled**(*yes \| no*) | ARP 条目是否被禁用 |
| **dynamic** (*yes \| no*) | 条目是否为动态创建 |
| **invalid** (*yes \| no*) | 条目是否无效 |
| **status**(*delay \| failed \| incomplete \| permanent \| probe \| reachable \| stale* ) | 显示 ARP 条目状态：<br/><ul><li><span className="ros-icon-success"><code>delay</code></span> - 邻居条目验证当前处于延迟状态</li><li><span className="ros-icon-success"><code>failed</code></span> - ARP 解析失败，系统无法获取给定 IP 地址的 MAC 地址</li><li><span className="ros-icon-success"><code>incomplete</code></span> - 系统没有该 IP 地址的 MAC 地址信息，尚未解析</li><li><span className="ros-icon-success"><code>permanent</code></span> - ARP 条目被视为永久条目，即使它未处于活跃使用状态，也不会从表中移除。此状态为手动配置的 ARP 条目设置</li><li><span className="ros-icon-success"><code>probe</code></span> - 正在探测邻居</li><li><span className="ros-icon-success"><code>reachable</code></span> - ARP 解析成功，且与该 IP 地址关联的 MAC 地址已知，该条目在可达性超时到期前有效</li><li><span className="ros-icon-success"><code>stale</code></span> - 条目仍然有效，但已老化。这意味着系统最近未与关联该 IP 地址的设备通信。</li></ul> |
| **VRF** (string) | 指示此 ARP 条目与哪个 VRF 关联。 |

:::warning
ARP 条目的默认最大数量取决于已安装的 RAM 容量。可通过命令 "`/ip/settings/set max-neighbor-entries=`x" 进行调整，更多详情请参阅 [IPv4 设置](../cli-reference/ip/settings.md)。
:::

## ARP 模式 {#arp-modes}

可以在接口配置中设置多种 ARP 模式：

- `disabled` — 该接口不使用 ARP。
- `enabled` — 该接口使用 ARP。
- `local-proxy-arp` — 路由器在该接口上执行代理 ARP，并向同一接口发送回复。
- `proxy-arp` — 路由器在该接口上执行代理 ARP，并向其他接口发送回复。
- `reply-only` — 该接口仅回复那些源自与 IP/ARP 表中静态条目相匹配的 IP 地址/MAC 地址组合的请求。不会有动态条目被自动存储到 IP/ARP 表中。因此，为使通信成功，必须已存在有效的静态条目。

### Disabled {#disabled}

如果接口上的 ARP 功能被关闭，即使用 `arp=disabled`，路由器将不应答来自客户端的 ARP 请求。因此，也应在客户端上添加静态 ARP 条目。例如，应使用 arp 命令将路由器的 IP 和 MAC 地址添加到 Windows 工作站上：

```text
C:\> arp -s 10.5.8.254  00-aa-00-62-c6-09
```

### Enabled {#enabled}

该模式在所有接口上默认启用。ARP 会被自动发现，新的动态条目会被添加到 ARP 表中。

### 代理 ARP {#proxy-arp}

配置了正确代理 ARP 功能的路由器可在不同网络之间充当透明的 ARP 代理。

这种行为可能很有用，例如，当你希望为拨入（ppp、pptp、pppoe）客户端分配的 IP 地址与所连接 LAN 上使用的地址空间相同时。

可以通过命令 `arp=proxy-arp` 在每个接口上单独启用代理 ARP：

#### 设置代理 ARP {#setup-proxy-arp}

```ros
 [admin@MikroTik] /interface/ethernet> set 1 arp=proxy-arp

 [admin@MikroTik] /interface/ethernet> print

 Flags: X - disabled, R - running
   #    NAME                 MTU   MAC-ADDRESS         ARP
   0  R ether1              1500  00:30:4F:0B:7B:C1 enabled
   1  R ether2              1500  00:30:4F:06:62:12 proxy-arp
```

### 仅回复 {#reply-only}

如果接口上的 ARP 属性设置为 `reply-only`，那么路由器只回复 ARP 请求。邻居 MAC 地址将仅使用 `/ip/arp` 菜单中静态配置的条目来解析，但无需像 ARP 被禁用时那样将路由器的 MAC 地址添加到其他主机的 ARP 表中。

### 本地代理 ARP {#local-proxy-arp}

如果接口上的 ARP 属性设置为 `local-proxy-arp`，那么路由器仅针对该接口执行代理 ARP，即对于进入和离开同一接口的流量。在普通 LAN 中，默认行为是两个网络主机直接相互通信，而不经过路由器。

启用 `local-proxy-arp` 后，路由器将以自己的接口 MAC 地址（而非其他主机的 MAC 地址）应答所有客户端主机。

例如，如果主机 A（192.168.88.2/24）查询主机 B（192.168.88.3/24）的 MAC 地址，路由器将用自己的 MAC 地址进行应答。换言之，如果启用了 `local-proxy-arp`，路由器将承担在主机 A 192.168.88.2 与主机 B 192.168.88.3 之间转发流量的责任。主机 A 和 B 上的所有 ARP 缓存条目都将引用路由器的 MAC 地址。在这种情况下，路由器正在为整个子网 192.168.88.0/24 执行 `local-proxy-arp`。

RouterOS `local-proxy-arp` 的一个示例可以是带有 DHCP 服务器和隔离桥接端口的桥接设置，其中同一子网内的主机只能通过桥接 IP 在第三层相互通信。

```ros
/interface/bridge
add arp=local-proxy-arp name=bridge1
/interface/bridge/port
add bridge=bridge1 horizon=1 interface=ether2
add bridge=bridge1 horizon=1 interface=ether3
add bridge=bridge1 horizon=1 interface=ether4
```

## 免费 ARP {#gratuitous-arp}

可以在 RouterOS 中创建 Gratuitous ARP 请求。为此，你必须使用 Traffic-Generator 工具。下面是一个示例，说明如何生成 Gratuitous ARP 请求以更新远程设备上的 ARP 表：

```ros
/tool/traffic-generator/inject interface=ether2 \
data="ffffffffffff4c5e0c14ef78080600010800060400014c5e0c14ef780a057a01ffffffffffff0a057a01000000000000000000000000000000000000"
```

你必须将 MAC 地址（4c5e0c14ef78）和 IP 地址（0a057a01）改为你路由器的地址。IP 地址和 MAC 地址必须来自请求更新 ARP 表的设备。你还需要指定通过哪个接口（ether2）发送 Gratuitous ARP 请求。请确保接收设备支持 Gratuitous ARP 请求。
