---
title: "UPnP"
description: "MikroTik RouterOS 支持 UPnP，以实现透明的对等连接，并支持动态网络发现和 NAT 穿越。本文档介绍接口类型（internal/external）和安全设置等常规属性，并提供在路由器接口上启用 UPnP 的配置示例。"
tags:
  - 'upnp'
  - 'nat'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/upnp
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "firewall-and-quality-of-service/user-guides"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik RouterOS 支持通用即插即用（UPnP）架构，可在个人计算机与支持网络的设备或装置之间实现透明的对等网络连接。

UPnP 允许网络中的任意控制设备指挥任意两台设备之间进行数据通信。该技术完全独立于任何特定物理介质。它支持具有自动发现功能的网络，这意味着设备可以动态加入网络，而无需任何初始配置。DHCP 和 DNS 服务器是可选的，如果网络中存在这些服务器，则会使用它们。UPnP 实现了一种简单而强大的 NAT 穿透方案，使客户端能够从 NAT 后面获得完整的双向对等网络支持。

UPnP 有两种接口类型：**internal**（连接本地客户端设备的接口）和 **external**（连接到 Internet 的接口）。路由器只能有一个具有“public”IP 地址的活动 external 接口，但可以根据需要拥有任意数量的 internal 接口，这些接口均使用经过 source-NAT 转换的“internal”IP 地址。该协议通过创建动态 NAT 条目规则来工作。

:::info
UPnP **internal** 接口可以为任意子网创建 NAT 映射，而不仅限于该 internal 接口上的子网，因此设置 **internal** 接口时必须谨慎。
:::

许多现代应用都使用 UPnP 协议，例如大多数 DirectX 游戏，以及各种 Windows Messenger 功能，如远程协助、应用程序共享、文件传输、语音和视频通信，以便从防火墙后面进行通信。

## 配置 {#configuration}

### 常规属性 {#general-properties}

**子菜单：** `/ip/upnp`

| 属性 | 说明 |
| :-- | :-- |
| **allow-disable-external-interface** (*yes \| no*；默认：**yes**) | 是否允许用户禁用路由器的外部接口。该功能是标准要求的（使用户无需任何身份验证即可关闭路由器的外部接口），但在标准最初并非针对的 UPnP 部署场景中有时并不符合预期或不希望启用（该标准主要面向家庭用户建立自己的本地网络），因此可以禁用此行为 |
| **enabled** (*yes \| no*) | 启用 UPnP 服务 |
| **show-dummy-rule** (*yes \| no*；默认：**yes**) | 为某些有缺陷的实现启用变通方案，这些实现会错误处理 UPnP 规则缺失的情况（例如弹出错误消息）。此选项将指示服务器安装一条虚拟（无实际意义）的 UPnP 规则，以便那些否则无法正常工作的客户端能够观察到该规则 |

:::danger
如果未禁用 **allow-disable-external-interface**，本地网络中的任何用户都将能够（无需任何身份验证过程）禁用路由器的外部接口。
:::

### UPnP 接口 {#upnp-interfaces}

**子菜单：** `/ip/upnp/interfaces`

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*string*；默认：) | 运行 uPnP 的接口名称 |
| **type** (*external \| internal*) | UPnP 接口类型：<ul><li><span className="ros-background-accent-green-bolder"><code>external</code></span> - 分配了全局 IP 地址的接口</li><li><code>internal </code>- 客户端连接的路由器本地接口</li></ul> |
| **forced-external-ip** (*Ip*；默认：) | 当外部接口有多个可用 IP 时，允许指定要使用的公网 IP。 |

:::warning
在包含 VLAN 的更复杂配置中，如果 VLAN 接口被视为 LAN 接口，则应将 VLAN 接口本身指定为内部接口，UPnP 才能正常工作。
:::

## 配置示例 {#configuration-example}

![](/img/a8f12d6db929635a.webp)

路由器上已启用 masquerading：

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

现在，只需添加接口：

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

当内部接口侧的客户端发送 UPnP 请求后，路由器上将创建动态 NAT 规则，示例规则可能类似如下：

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
