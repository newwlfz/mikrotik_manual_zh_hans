---
title: "MACsec"
description: "MACsec 是一种用于以太网的安全协议，通过 GCM-AES-128 加密提供机密性、完整性和真实性。RouterOS 支持手动配置密钥的 MACsec 和有限的硬件加速，并要求使用预共享密钥在设备之间建立安全的 Layer2 连接。"
tags:
  - 'macsec'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/macsec
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MACsec（Media Access Control Security）协议是一种用于以太网的标准安全技术，用于确保通过物理介质传输的数据的机密性、完整性和真实性。MACsec 由 IEEE 标准 802.1AE 定义。

MACsec 在以太网上使用 GCM-AES-128 加密，并保护所有 LAN 流量，包括 DHCP、ARP、LLDP 和更高层协议。

:::warning
RouterOS 的 MACsec 实现处于早期阶段；它**不支持**通过 [Dot1x](/docs/authentication-authorization-accounting/dot1x) 进行动态密钥管理（需要手动配置密钥），并且硬件加速加密仅在部分产品上逐步推出。
:::

## 基本配置示例 {#basic-configuration-example}

假设 Host1 ether1 连接到 Switch ether1，Host2 ether1 连接到 Switch ether2。在本示例中，我们将创建两对 MACsec 接口，并使用网桥在两端设备之间建立安全的 Layer2 连接。

首先，在 Host1 和 Host2 上配置 MACsec 接口。只需指定以太网接口，RouterOS 将自动生成 Connectivity Association Key（CAK）和 connectivity association name（CKN）。使用 `print` 命令查看这些值：

```ros
# Host1
/interface/macsec
add interface=ether1 name=macsec1

[admin@Host1] /interface/macsec/print show-sensitive
Flags: I - inactive, X - disabled, R - running 
 0   name="macsec1" mtu=1468 interface=ether1 status="negotiating" cak=71a7c363794da400dbde595d3926b0e9
     ckn=f2c4660060169391d29d8db8a1f06e5d4b84a128bad06ad43ea2bd4f7d21968f profile=default

# Host2
/interface/macsec
add interface=ether1 name=macsec1

[admin@Host2] /interface/macsec/print show-sensitive
Flags: I - inactive, X - disabled, R - running 
 0   name="macsec1" mtu=1468 interface=ether1 status="negotiating" cak=dc47d94291d19a6bb26a0c393a1af9a4
     ckn=e9bd0811dad1e56f06876aa7715de1855f1aee0baf5982ac8b508d4fc0f162d9 profile=default
```

在 Switch 设备上，要启用 MACsec，需要为相应的以太网接口配置匹配的 CAK 和 CKN 值：

```ros
# Switch
/interface/macsec
add comment=Host1 cak=71a7c363794da400dbde595d3926b0e9 ckn=f2c4660060169391d29d8db8a1f06e5d4b84a128bad06ad43ea2bd4f7d21968f interface=ether1 name=macsec1
add comment=Host2 cak=dc47d94291d19a6bb26a0c393a1af9a4 ckn=e9bd0811dad1e56f06876aa7715de1855f1aee0baf5982ac8b508d4fc0f162d9 interface=ether2 name=macsec2
```

预共享密钥成功交换后，MACsec Key Agreement（MKA）协议将被激活。MKA 负责确保链路上 MACsec 的连续性，并确定点对点连接中哪一端成为密钥服务器。密钥服务器生成 Secure Association Key（SAK），该密钥仅与链路另一端的设备共享。此 SAK 用于保护通过链路传输的所有数据流量。密钥服务器会定期生成新的随机 SAK，并通过点对点链路共享，以维持 MACsec 功能。

在 RouterOS 中，MACsec 接口可以像任何以太网接口一样配置。它可以用作带 IP 地址的可路由接口，也可以放入网桥。在 Host1 和 Host2 上，添加同一网络中的 IP 地址。在 Switch 上，使用网桥。

```ros
# Host1
/ip/address
add address=192.168.10.10/24 interface=macsec1

# Host2
/ip/address
add address=192.168.10.20/24 interface=macsec1

# Switch
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=macsec1
add bridge=bridge1 interface=macsec2
```

最后，使用 ping 确认 Host1 可以访问 Host2。

```ros
 [admin@Host1] > ping 192.168.10.20
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 192.168.10.20                              56  64 1ms438us  
    1 192.168.10.20                              56  64 818us     
    2 192.168.10.20                              56  64 791us     
    3 192.168.10.20                              56  64 817us     
    4 192.168.10.20                              56  64 783us     
    sent=5 received=5 packet-loss=0% min-rtt=783us avg-rtt=929us max-rtt=1ms438us
```

## 属性参考 {#property-reference}

### 接口设置 {#interface-settings}

**子菜单：** `/interface/macsec`

MACsec 接口的配置设置。

| 属性 | 描述 |
| :-- | :-- |
| **cak** (*string*；默认值：) *[敏感信息](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 16 字节预共享连接关联密钥（CAK）。要启用 MACsec，请在链路两端配置匹配的 CAK 和 CKN。未指定时，RouterOS 将自动生成随机值。 |
| **ckn**(*string*；默认值：) | 32 字节连接关联名称（CKN）。要启用 MACsec，请在链路两端配置匹配的 CAK 和 CKN。未指定时，RouterOS 将自动生成随机值。 |
| **comment** (*string*；默认值：) | 接口的简短描述。 |
| **disabled** (*yes \| no*；默认值：**no**) | 更改接口是否禁用。 |
| **interface** (*name*；默认值：) | 创建 MACsec 所在的以太网接口名称，每个以太网接口仅限创建一个 MACsec 接口。 |
| **mtu** (*integer*；默认值：**1468**) | 设置最大传输单元。`l2mtu` 将根据关联的 `interface` 自动设置（减去与 MACsec 封装对应的 32 字节）。`l2mtu` 无法更改。 |
| **name** (*string*；默认值：**macsec1**) | 接口名称。 |
| **profile** (*name*；默认值：**default**) | 设置 MACsec 配置文件，用于确定点对点连接中的密钥服务器。 |
| **status** (*read-only: disabled \|initializing \| invalid \| negotiating \| open-encrypted*) | 显示当前 MACsec 接口状态。 |

### 配置文件设置 {#profile-settings}

**子菜单：** `/interface/macsec/profile`

MACsec 配置文件的配置设置。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认值：) | 配置文件名称。 |
| **server-priority**(*integer: 0..255*；默认值：**10**) | 设置在点对点连接中确定密钥服务器的优先级。值越小，优先级越高。如果优先级相同，MAC 地址最小的接口将充当密钥服务器。 |
