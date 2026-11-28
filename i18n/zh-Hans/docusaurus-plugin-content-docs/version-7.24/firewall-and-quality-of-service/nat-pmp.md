---
title: "NAT-PMP"
description: "NAT-PMP 是一种通过动态 NAT 规则将内部 IPv4 地址映射到外部地址，从而实现透明对等连接的协议，客户端和服务器端分别使用 UDP 端口 5350 和 5351。"
tags:
  - 'nat-pmp'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/nat-pmp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

NAT Port Mapping Protocol（NAT-PMP）是一种用于个人计算机和支持网络的智能设备或 appliances 之间透明点对点网络连接的协议。

该协议通过获取 NAT 网关的外部 IPv4 地址来工作，从而允许客户端通过创建动态 NAT 规则，将其外部 IPv4 地址和端口告知可能希望与其通信的对等方。

NAT-PMP 在客户端使用 UDP 端口 5350，在服务器端使用 5351。

PMP 有两种接口类型：**internal**（本地客户端连接的接口）和 **external**（连接 Internet 的接口）。路由器只能有一个处于活动状态的 **external** 接口，并且该接口上具有“public”IP 地址

:::warning
路由器只能有一个处于活动状态的 **external** 接口，并且该接口上具有“public”IP 地址。NAT-PMP 的 **internal** 接口可以为任意子网创建 NAT 映射，而不仅限于 internal 接口上的子网，因此设置 **internal** 接口时必须谨慎。
:::

有关 NAT PMP 的更多详情，请参阅 [**RFC 6886**](https://www.rfc-editor.org/rfc/rfc6886)

NAT-PMP 配置可通过 `/ip/nat-pmp` 菜单访问。

## 配置示例 {#configuration-example}

![](/img/a8f12d6db929635a.webp)

假设已具备上图所示的基本家庭网络配置。

在启用 PMP-NAT 之前，需要对从 LAN 发出的数据包进行 masquerade。

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=ether1
```

现在可以启用 PMP 并添加内部和外部接口：

```ros
/ip/nat-pmp/set enable=yes
/ip/nat-pmp/interfaces> add interface=ether1 type=external disabled=no
/ip/nat-pmp/interfaces> add interface=ether2 type=internal disabled=no

```

当来自内部接口侧的客户端发送 PMP 请求时，路由器上会创建动态 NAT 规则：

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

### 常规属性 {#general-properties}

可在 `/ip/nat-pmp` 菜单中使用。

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes \| no*) | 启用 NAT-PMP 服务 |

### NAT PMP 接口 {#nat-pmp-interfaces}

可在 `/ip/nat-pmp/interfaces` 菜单中使用。

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*string*；默认值：) | 运行 PMP 的接口名称 |
| **type** (*external \| internal*) | PMP 接口类型：<ul><li><span className="ros-background-accent-green-bolder"><code>external</code></span> - 分配了全局 IP 地址的接口</li><li><span className="ros-background-accent-green-bolder"><code>internal</code></span> - 客户端连接的路由器本地接口</li></ul> |
| **forced-ip** (*Ip*；默认值：) | 当外部接口有多个可用 IP 时，可指定要使用的公网 IP。 |

:::warning
在包含 VLAN 的更复杂配置中，如果 VLAN 接口属于 LAN，要使 PMP 正常工作，应将 VLAN 接口本身指定为内部接口。
:::
