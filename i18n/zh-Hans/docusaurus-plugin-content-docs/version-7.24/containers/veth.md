---
sidebar_key: "containers/veth"
sidebar_position: 2
title: "VETH"
sidebar_label: "VETH"
description: "VETH（Virtual Ethernet）为 RouterOS 中的容器提供网络连接，充当虚拟接口，支持静态 IP 和 DHCP 分配的 IP、SLAAC，并可集成到网桥或路由配置中。"
tags:
  - 'veth'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/containers/veth
captured_at: '2026-11-04T11:27:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

VETH（Virtual Ethernet）是一种虚拟网络接口，为容器提供网络连接。它充当连接 RouterOS 与容器的虚拟以太网端口，使容器能够与其他接口和网络通信。

VETH 接口的行为类似于标准以太网接口。可以为它们分配静态 IPv4 和 IPv6 地址，通过 DHCP 客户端获取地址，并支持 SLAAC。此外，VETH 接口可以像物理接口一样参与桥接或路由配置。

## 基本配置示例 {#basic-configuration-example}

配置 VETH 有多种方式。以下是一些简单示例。

```ros
# 带 DHCP-client 的 VETH
/interface/veth/add dhcp=yes

# 带静态地址的 VETH
/interface/veth/add address=10.1.1.10/24 gateway=10.1.1.1 
```

配置接口后，你可以将其分配给容器。  
容器应获取由 DHCP 服务器分配的 IP 或静态地址。

## 属性 {#properties}

### VETH {#veth}

**子菜单：** `/interface/veth/add`

VETH 接口的配置设置。

| 参数 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| **address** | IPv4/IPv6 地址 | **None** | 将分配给接口的 IPv4 或 IPv6 地址 |
| **gateway** | IPv4 地址 | **None** | IPv4 网关地址 |
| **gateway6** | IPv6 地址 | **None** | IPv6 网关地址 |
| **mac-address** | MAC 地址 | **None** | 接口 MAC 地址 |
| **container-mac-address** | MAC 地址 | **None** | 将分配给容器的 MAC 地址 |
| **dhcp** | yes / no | **no** | 在接口上启用 DHCP 客户端 |
| **name** | string | **None** | 接口名称 |
