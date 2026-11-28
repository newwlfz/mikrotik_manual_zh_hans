---
title: "ARP"
description: "本页介绍 MikroTik RouterOS 中的 ARP（Address Resolution Protocol）功能，说明如何将 IP 地址映射到 MAC 地址。内容涵盖 ARP 表属性、只读标志、VRF 关联和 ARP 模式（disabled、enabled、proxy ARP），并包括静态条目和接口特定设置的配置示例。"
tags:
  - 'arp'
source: https://manual.mikrotik.com/docs/7.24/network-management/arp
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "network-management"
pagination_next: "network-management/cloud"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/arp`

即使 IP 数据包使用 IP 地址寻址，传输数据从一台主机到另一台主机时仍必须使用硬件地址。地址解析协议用于将 OSI 第 3 层 IP 地址映射到 OSI 第 2 层 MAC 地址。路由器有一张当前使用的 ARP 条目表。通常该表是动态构建的，但为了提高网络安全性，可以通过添加静态条目来部分或完全静态构建该表。

## 属性 {#properties}

本节介绍 ARP 表配置项。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP*; Default: ) | 要映射的 IP 地址 |
| **interface** (*string*; Default: ) | 分配该 IP 地址的接口名称 |
| **mac-address** (*MAC*; Default: **00:00:00:00:00:00**) | 要映射到的 MAC 地址 |
| **published** (*yes \| no*; Default: **no**) | 针对单个 IP 地址的静态 proxy-arp 条目。当收到针对该特定 IP 地址的 ARP 查询时，设备将使用自身 MAC 地址进行响应。无需在接口本身设置 proxy-arp 即可代理所有 MAC 地址。只有当设备存在通往目标的有效路由时，接口才会响应 ARP 请求 |

**只读属性：**

| 属性 | 说明 |
| :-- | :-- |
| **complete** (*yes \| no*) | 当 ARP `status` 为 permanent、reachable、stale、probe 或 delay 时，ARP 条目中包含 Complete 标志 |
| **dhcp**(*yes \| no*) | ARP 条目是否由 DHCP 服务器添加 |
| **disabled**(*yes \| no*) | ARP 条目是否已禁用 |
| **dynamic** (*yes \| no*) | 条目是否动态创建 |
| **invalid** (*yes \| no*) | 条目是否无效 |
| **status**(*delay \| failed \| incomplete \| permanent \| probe \| reachable \| stale* ) | 显示 ARP 条目状态：<br/><ul><li><span className="ros-icon-success"><code>delay</code></span> - 邻居条目验证当前被延迟</li><li><span className="ros-icon-success"><code>failed</code></span> - ARP 解析失败，系统无法获取给定 IP 地址的 MAC 地址</li><li><span className="ros-icon-success"><code>incomplete</code></span> - 系统没有该 IP 地址的 MAC 地址信息，尚未完成解析</li><li><span className="ros-icon-success"><code>permanent</code></span> - ARP 条目被视为永久条目，即使未被主动使用也不会从表中移除。该状态用于手动配置的 ARP 条目</li><li><span className="ros-icon-success"><code>probe</code></span> - 正在探测邻居</li><li><span className="ros-icon-success"><code>reachable</code></span> - ARP 解析成功，已知与该 IP 地址关联的 MAC 地址，条目在可达性超时到期前有效</li><li><span className="ros-icon-success"><code>stale</code></span> - 条目仍然有效，但已老化。这表示系统近期未与关联该 IP 地址的设备通信。</li></ul> |
| **VRF** (string) | 指示该 ARP 条目关联的 VRF。 |

:::warning
ARP 条目的默认最大数量取决于已安装的 RAM 容量。可使用命令 "`/ip/settings/set max-neighbor-entries=`x" 调整，详情请参阅 [IPv4 Settings](/docs/cli-reference/ip/settings)。
:::

## ARP 模式 {#arp-modes}

可以在接口配置中设置多种 ARP 模式：

- `disabled` - 接口将不使用 ARP。
- `enabled` - 接口将使用 ARP。
- `local-proxy-arp` - 路由器在接口上执行代理 ARP，并在同一接口上发送回复。
- `proxy-arp` - 路由器在接口上执行代理 ARP，并向其他接口发送回复。
- `reply-only` - 接口仅回复来自 IP 地址/MAC 地址组合匹配的请求，这些组合必须作为静态条目输入到 IP/ARP 表中。不会自动在 IP/ARP 表中存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。

### Disabled

如果接口上的 ARP 功能已关闭，即使用 `arp=disabled`，路由器不会响应客户端的 ARP 请求。因此，也应在客户端添加静态 ARP 条目。例如，应使用 arp 命令在 Windows 工作站中添加路由器的 IP 和 MAC 地址：

```text
C:\> arp -s 10.5.8.254  00-aa-00-62-c6-09
```

### Enabled

该模式默认在所有接口上启用。ARP 将被自动发现，新的动态条目将添加到 ARP 表中。

### 代理 ARP {#proxy-arp}

正确配置代理 ARP 功能的路由器可在不同网络之间充当透明的 ARP 代理。

例如，如果希望为拨入（ppp、pppoe、pptp）客户端分配与所连接 LAN 相同的地址空间中的 IP 地址，此行为可能很有用。

可使用命令 `arp=proxy-arp` 在每个接口上单独启用代理 ARP：

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

如果接口上的 ARP 属性设置为 `reply-only`，则路由器仅回复 ARP 请求。邻居 MAC 地址将仅使用 `/ip/arp` 菜单中静态配置的条目进行解析，但无需像禁用 ARP 时那样将路由器的 MAC 地址添加到其他主机的 ARP 表中。

### 本地代理 ARP {#local-proxy-arp}

如果接口上的 ARP 属性设置为 `local-proxy-arp`，则路由器仅对该接口执行代理 ARP，即针对从同一接口进入并从同一接口发出的流量。在普通 LAN 中，默认行为是两台网络主机直接相互通信，不涉及路由器。

启用 `local-proxy-arp` 后，路由器将使用自身接口的 MAC 地址而不是其他主机的 MAC 地址回复所有客户端主机。

例如，如果主机 A（192.168.88.2/24）查询主机 B（192.168.88.3/24）的 MAC 地址，路由器将使用自身 MAC 地址回复。换句话说，如果启用了 `local-proxy-arp`，路由器将负责转发主机 A 192.168.88.2 和主机 B 192.168.88.3 之间的流量。主机 A 和 B 上的所有 ARP 缓存条目都将引用路由器的 MAC 地址。在这种情况下，路由器正在为整个子网 192.168.88.0/24 执行 `local-proxy-arp`。

RouterOS `local-proxy-arp` 的一个示例是带有 DHCP 服务器和隔离网桥端口的网桥配置，其中同一子网的主机只能通过网桥 IP 在第 3 层相互访问。

```ros
/interface/bridge
add arp=local-proxy-arp name=bridge1
/interface/bridge/port
add bridge=bridge1 horizon=1 interface=ether2
add bridge=bridge1 horizon=1 interface=ether3
add bridge=bridge1 horizon=1 interface=ether4
```

## 免费 ARP {#gratuitous-arp}

可以在 RouterOS 中创建免费 ARP 请求。为此，必须使用 Traffic-Generator 工具。以下示例说明如何生成免费 ARP 请求以更新远程设备上的 ARP 表：

```ros
/tool/traffic-generator/inject interface=ether2 \
data="ffffffffffff4c5e0c14ef78080600010800060400014c5e0c14ef780a057a01ffffffffffff0a057a01000000000000000000000000000000000000"
```

必须将 MAC 地址（4c5e0c14ef78）和 IP 地址（0a057a01）更改为路由器的地址。IP 地址和 MAC 地址必须来自请求 ARP 表更新的设备。还需要指定要通过哪个接口（ether2）发送 Gratuitous ARP 请求。确保接收设备支持 Gratuitous ARP 请求。
