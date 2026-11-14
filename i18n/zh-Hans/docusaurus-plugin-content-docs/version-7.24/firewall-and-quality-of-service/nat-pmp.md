---
sidebar_key: "firewall-and-quality-of-service/nat-pmp"
sidebar_position: 6
title: "NAT-PMP"
sidebar_label: "NAT-PMP"
description: "NAT-PMP 是一种协议，它通过动态 NAT 规则将内部 IPv4 地址映射到外部地址，从而实现透明的点对点连接，并在客户端和服务器端分别使用 UDP 端口 5350 和 5351。"
tags:
  - 'nat-pmp'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/nat-pmp
captured_at: '2026-11-04T11:28:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

NAT Port Mapping Protocol (NAT-PMP) 是一种用于个人计算机以及支持网络的智能设备或家电实现透明点对点网络连接的协议。

该协议通过获取 NAT 网关的外部 IPv4 地址来工作，从而允许客户端通过创建动态 NAT 规则，将其外部 IPv4 地址和端口告知可能希望与其通信的对等端。

NAT-PMP 在客户端使用 UDP 端口号 5350，在服务器端使用 5351。

PMP 有两种接口类型：**internal**（本地客户端连接到的接口）和 **external**（Internet 连接到的接口）。路由器上只能有一个活动的 external 接口，并且该接口上具有“公网”IP 地址

:::warning
路由器只能有一个活动的 **external** 接口，并且该接口上具有“公网”IP 地址。NAT-PMP **internal** 接口可以为任何子网创建 NAT 映射，而不仅仅是 internal 接口上存在的子网，因此在设置 **internal** 接口时必须谨慎。
:::

有关 NAT PMP 的更多详细信息，请参见 [**RFC 6886**](https://www.rfc-editor.org/rfc/rfc6886)

NAT-PMP 配置可从 `/ip/nat-pmp` 菜单访问。

## 配置示例 {#configuration-example}

![](/img/a8f12d6db929635a.webp)

假设我们已经具备上图所示的基本家庭网络设置。

在启用 PMP-NAT 之前，我们需要对发出的 LAN 数据包进行伪装。

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=ether1
```

现在我们可以启用 PMP 并添加 internal、external 接口：

```ros
/ip/nat-pmp/set enable=yes
/ip/nat-pmp/interfaces> add interface=ether1 type=external disabled=no
/ip/nat-pmp/interfaces> add interface=ether2 type=internal disabled=no

```

当来自 internal 接口侧的客户端发送 PMP 请求时，路由器上会创建动态 NAT 规则：

```text
[admin@MikroTik] > ip firewall nat print 
Flags: X - disabled, I - invalid, D - dynamic 

0 chain=srcnat action=masquerade out-interface=ether1

1 D ;;; nat-pmp 192.168.88.10: ApplicationX
chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000 protocol=tcp 
dst-address=10.0.0.1 in-interface=ether1 dst-port=55000

2 D ;;; nat-pmp 192.168.88.10: ApplicationX
chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000 protocol=udp 
dst-address=10.0.0.1 in-interface=ether1 dst-port=55000

```

## 属性 {#properties}

### 通用属性 {#general-properties}

可从 `/ip/nat-pmp` 菜单访问。

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes \| no*) | 启用 NAT-PMP 服务 |

### NAT PMP 接口 {#nat-pmp-interfaces}

可从 `/ip/nat-pmp/interfaces` 菜单访问。

| 属性 | 描述 |
| :-- | :-- |
| **interface** (*string*; 默认值：) | PMP 将在其上运行的接口名称 |
| **type** (*external \| internal*) | PMP 接口类型：<span className="ros-background-accent-green-bolder"><code>external</code></span> - 分配了全局 IP 地址的接口<span className="ros-background-accent-green-bolder"><code>internal</code></span> - 客户端连接到的路由器本地接口 |
| **forced-ip** (*Ip*; 默认值：) | 允许指定当 external 接口有多个可用 IP 时使用哪个公网 IP。 |

:::warning
在涉及 VLAN 的更复杂设置中，如果 VLAN 接口是 LAN 的一部分，为使 PMP 正常工作，应将 VLAN 接口本身指定为 internal 接口。
:::
