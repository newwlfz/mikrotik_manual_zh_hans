---
title: "VETH"
description: "VETH（Virtual Ethernet）为 RouterOS 中的容器提供网络连接，作为虚拟接口支持静态 IP、DHCP 分配的 IP 和 SLAAC，并可集成到网桥或路由配置中。"
tags:
  - 'veth'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/containers/veth
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

VETH（Virtual Ethernet）是为容器提供网络连接的虚拟网络接口。它作为虚拟以太网端口，将 RouterOS 连接到容器，使容器能够与其他接口和网络通信。

VETH 接口的行为与标准以太网接口类似。可以为其分配静态 IPv4 和 IPv6 地址，通过 DHCP 客户端获取地址，并支持 SLAAC。此外，VETH 接口可以像物理接口一样参与网桥或路由配置。

## 基本配置示例 {#basic-configuration-example}

配置 VETH 有多种方式。以下是简单示例。

```ros
# VETH with DHCP-client
/interface/veth/add dhcp=yes

# VETH with static address
/interface/veth/add address=10.1.1.10/24 gateway=10.1.1.1 
```

配置接口后，可以将其分配给容器。  
容器应获取 DHCP 服务器分配的 IP 或静态地址。

## 属性 {#properties}

### VETH

**子菜单：** `/interface/veth/add`

VETH 接口的配置设置。

| 参数 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **address** | IPv4/IPv6 地址 | **None** | 将分配给接口的 IPv4 或 IPv6 地址 |
| **gateway** | IPv4 地址 | **None** | IPv4 网关地址 |
| **gateway6** | IPv6 地址 | **None** | IPv6 网关地址 |
| **mac-address** | MAC 地址 | **None** | 接口 MAC 地址 |
| **container-mac-address** | MAC 地址 | **None** | 将分配给容器的 MAC 地址 |
| **dhcp** | yes / no | **no** | 在接口上启用 DHCP 客户端 |
| **name** | string | **None** | 接口名称 |
