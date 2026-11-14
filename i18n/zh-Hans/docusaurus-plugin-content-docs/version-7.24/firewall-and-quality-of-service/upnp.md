---
sidebar_key: "firewall-and-quality-of-service/upnp"
sidebar_position: 7
title: "UPnP"
sidebar_label: "UPnP"
description: "MikroTik RouterOS 支持 UPnP，可实现透明的点对点连接，从而支持动态网络发现和 NAT 穿透。文档涵盖通用属性（如接口类型 `internal`/`external`）和安全设置，以及在路由器接口上启用 UPnP 的配置示例。"
tags:
  - 'upnp'
  - 'nat'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/upnp
captured_at: '2026-11-04T11:28:26+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik RouterOS 支持通用即插即用（UPnP）架构，它可在个人计算机与支持网络的设备或家电之间实现透明的点对点网络连接。

UPnP 允许在网络中任意控制设备的指挥下，于任意两台设备之间进行数据通信。该技术完全独立于任何特定的物理介质。它支持自动发现的联网方式，这意味着设备无需任何初始配置即可动态加入网络。DHCP 和 DNS 服务器是可选的，如果网络中存在就会被使用。UPnP 实现了一种简单而强大的 NAT 穿透方案，使客户端能够在 NAT 之后获得完整的双向点对点网络支持。

UPnP 有两种接口类型：**internal**（本地客户端设备所连接的接口）和 **external**（连接到 Internet 的接口）。路由器只能有一个具有“公网”IP 地址的活动外部接口，而内部接口可以有任意多个，它们全部使用经过源 NAT 转换的“内部”IP 地址。该协议通过创建动态 NAT 条目规则来工作。

:::info
UPnP 的 **internal** 接口可以为任何子网创建 NAT 映射，而不仅仅是该内部接口上存在的子网，因此在设置 **internal** 接口时必须谨慎。
:::

许多现代应用程序都使用 UPnP 协议，例如大多数 DirectX 游戏，以及 Windows Messenger 的各种功能，如远程协助、应用程序共享、文件传输、语音和视频通信（在防火墙之后）。

## 配置 {#configuration}

### 通用属性 {#general-properties}

**子菜单：** `/ip/upnp`

| 属性 | 描述 |
| :-- | :-- |
| **allow-disable-external-interface** (*yes \| no*；默认：**yes**) | 是否允许用户禁用路由器的外部接口。此功能（允许用户无需任何认证过程即可关闭路由器的外部接口）是标准所要求的，但在标准并非为之设计的 UPnP 部署中，它有时并不符合预期或并不受欢迎（该标准主要面向家庭用户建立自己的局域网），因此你可以禁用此行为 |
| **enabled** (*yes \| no*) | 启用 UPnP 服务 |
| **show-dummy-rule** (*yes \| no*；默认：**yes**) | 为某些有缺陷的实现启用一种变通方案，这些实现会错误地处理 UPnP 规则缺失的情况（例如弹出错误消息）。此选项会指示服务器安装一条虚拟（无意义）的 UPnP 规则，供那些否则无法正常工作的客户端观察到 |

:::danger
如果你不关闭 **allow-disable-external-interface**，则本地网络中的任何用户都能够（无需任何认证过程）禁用路由器的外部接口。
:::

### UPnP 接口 {#upnp-interfaces}

**子菜单：** `/ip/upnp/interfaces`

| 属性 | 描述 |
| :-- | :-- |
| **interface** (*string*；默认：) | uPnP 将在其上运行的接口名称 |
| **type** (*external \| internal*) | UPnP 接口类型：<span className="ros-background-accent-green-bolder"><code>external</code></span> - 为其分配全局 IP 地址的接口<code>internal </code>- 客户端所连接的路由器本地接口 |
| **forced-external-ip** (*Ip*；默认：) | 当外部接口有多个可用 IP 时，允许指定要使用哪个公网 IP。 |

:::warning
在带 VLAN 的更复杂环境中，若 VLAN 接口被视为 LAN 接口，则必须将 VLAN 接口本身指定为 UPnP 的内部接口，UPnP 才能正常工作。
:::

## 配置示例 {#configuration-example}

![](/img/a8f12d6db929635a.webp)

我们的路由器上已经启用了伪装：

```ros
[admin@MikroTik] /ip/upnp> /ip/firewall/nat/print
Flags: X - disabled, I - invalid, D - dynamic
  0   chain=srcnat action=masquerade out-interface=ether1
[admin@MikroTik] /ip/upnp>
```

要启用 UPnP 功能：

```ros
[admin@MikroTik] /ip/upnp> set enable=yes
[admin@MikroTik] /ip/upnp> print
                             enabled: yes
    allow-disable-external-interface: yes
                     show-dummy-rule: yes
[admin@MikroTik] /ip/upnp>
```

现在，我们只需添加接口：

```ros
[admin@MikroTik] /ip/upnp/interfaces> add interface=ether1 type=external
[admin@MikroTik] /ip/upnp/interfaces> add interface=ether2 type=internal
[admin@MikroTik] /ip/upnp/interfaces> print
Flags: X - disabled
  #   INTERFACE TYPE
  0 X ether1    external
  1 X ether2    internal

[admin@MikroTik] /ip/upnp/interfaces> enable 0,1
```

现在，一旦内部接口一侧的客户端发送 UPnP 请求，路由器上就会创建动态 NAT 规则，示例规则大致如下：

```ros
[admin@MikroTik] > ip firewall nat print 
Flags: X - disabled, I - invalid, D - dynamic 

0 chain=srcnat action=masquerade out-interface=ether1

1 D ;;; upnp 192.168.88.10: ApplicationX
chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000 protocol=tcp 
dst-address=10.0.0.1 in-interface=ether1 dst-port=55000

2 D ;;; upnp 192.168.88.10: ApplicationX
chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000 protocol=udp 
dst-address=10.0.0.1 in-interface=ether1 dst-port=55000

```
