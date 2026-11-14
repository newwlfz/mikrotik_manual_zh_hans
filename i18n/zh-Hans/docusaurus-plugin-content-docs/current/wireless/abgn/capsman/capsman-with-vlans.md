---
sidebar_key: "wireless/abgn/capsman/capsman-with-vlans"
sidebar_position: 2
title: "CAPsMAN 与 VLAN"
sidebar_label: "CAPsMAN 与 VLAN"
description: "本页介绍在 MikroTik RouterOS 中配置 CAPsMAN 与 VLAN，实现对不同客户端组的集中式无线管理和 VLAN 标记。内容涵盖本地转发模式设置、Provisioning 规则、DHCP 配置以及交换机上的 VLAN 过滤。"
tags:
  - 'capsman'
  - 'vlan'
  - 'bridging'
source: https://manual.mikrotik.com/docs/wireless/abgn/capsman/capsman-with-vlans
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

可以为家庭或办公环境创建可扩展到许多接入点的集中式接入点管理设置。此类设置配置起来相当简单，并已在[简单的 CAPsMAN 设置](./ap-controller-capsman.md#simple-setup-of-a-capsman-system)指南中说明，但对于更复杂的设置，可能需要 VLAN。CAPsMAN 具备在某些条件下分配特定 VLAN ID 的功能。本指南将提供一个示例，说明如何根据无线客户端连接到的 AP，为无线数据包分配 VLAN ID。带 VLAN 的 CAPsMAN 可以通过使用[本地转发模式](./ap-controller-capsman.md#local-forwarding-mode)或 [CAPsMAN 转发模式](./ap-controller-capsman.md#manager-forwarding-mode)来实现；本地转发模式提供了在 AP 与 CAPsMAN 路由器之间使用交换机来交换数据包的可能性（以获得更大的吞吐量），而当所有流量都应始终转发到 CAPsMAN 路由器时（大多数情况下是为了过滤数据包），则应使用 CAPsMAN 转发模式。

在此示例中，如果无线客户端连接到 **WiFi\_WORK**，我们会将所有无线客户端分配到 **VLAN10**；如果无线客户端连接到 **WiFi\_GUEST**，我们会将其分配到 **VLAN20**。我们将结合使用虚拟 AP 和 CAPsMAN，在单个物理设备上为无线客户端创建多个要连接的 SSID。还将通过使用 CAPsMAN 预配规则展示如何为单个物理设备使用单个 SSID 的示例。

## 使用本地转发模式 {#using-local-forwarding-mode}

![](/img/aa0be2c197777367.webp)

在本地转发模式中，CAPsMAN 路由器会将配置分发到由 CAPsMAN 路由器预配的所有 CAP。在本地转发模式中，流量不需要发送到 CAPsMAN 路由器，而是在转发流量时可以发送到另一台路由器而不涉及 CAPsMAN 路由器。此模式允许你在流量从无线客户端发送到你的网络之前，用特定 VLAN ID 标记流量，这就增加了使用交换机将特定 VLAN ID 限制到特定端口的可能性。在本地转发模式中，流量不会使用特殊的 CAPsMAN 报头进行封装，而该报头只能由 CAPsMAN 路由器移除。

### CAPsMAN 路由器 {#capsman-router}

- 为每个 VLAN 创建相应的 CAP 配置：

```
/caps-man/configuration
add country=latvia datapath.local-forwarding=yes datapath.vlan-id=10 datapath.vlan-mode=use-tag name=Config_WORK security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_work_password ssid=WiFi_WORK
add country=latvia datapath.local-forwarding=yes datapath.vlan-id=20 datapath.vlan-mode=use-tag name=Config_GUEST security.authentication-types=\
    wpa-psk,wpa2-psk security.passphrase=secret_guest_password ssid=WiFi_GUEST
```

- 我们将创建一条 CAPsMAN 预配规则，以在单个设备上创建 **WiFi\_WORK** 和 **WiFi\_GUEST** SSID，并且每个已连接的 CAP 都会自动创建这些 SSID。

```
/caps-man/provisioning
add action=create-dynamic-enabled master-configuration=Config_WORK slave-configurations=Config_GUEST
```

:::info
你可以通过添加多个 slave-configurations 来创建更多虚拟 AP。这需要事先创建多个 CAPsMAN 配置。
:::

- 出于安全原因，将 CAPsMAN 限制为单个接口：

```
/caps-man/manager/interface
set [ find default=yes ] forbid=yes
add disabled=no interface=ether1
```

- 启用 CAPsMAN 管理器：

```
/caps-man/manager
set enabled=yes
```

- 为每个 VLAN 设置 DHCP 服务器：

```
/interface/vlan
add interface=ether1 name=VLAN10 vlan-id=10
add interface=ether1 name=VLAN20 vlan-id=20
/ip/address
add address=192.168.10.1/24 interface=VLAN10
add address=192.168.20.1/24 interface=VLAN20
/ip/pool
add name=dhcp_pool10 ranges=192.168.10.2-192.168.10.254
add name=dhcp_pool20 ranges=192.168.20.2-192.168.20.254
/ip/dhcp-server
add address-pool=dhcp_pool10 disabled=no interface=VLAN10 name=dhcp10
add address-pool=dhcp_pool20 disabled=no interface=VLAN20 name=dhcp20
/ip/dhcp-server/network
add address=192.168.10.0/24 dns-server=8.8.8.8 gateway=192.168.10.1
add address=192.168.20.0/24 dns-server=8.8.8.8 gateway=192.168.20.1
```

### 交换机 {#switch}

在此示例中，我们将使用[网桥 VLAN 过滤](../../../bridging-and-switching/index.md#vlan-example-trunk-and-access-ports)来过滤未知 VLAN，并将其他设备分配到相同的网络。某些设备能够将此功能卸载到内置交换机芯片，请参阅[基本 VLAN 交换](../../../bridging-and-switching/user-guides/basic-vlan-switching.md)指南，了解如何在不同类型的设备上进行配置。

- 设置网桥 VLAN 过滤：

```
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4 pvid=10
add bridge=bridge1 interface=ether5 pvid=20
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1,ether2,ether3 untagged=ether4 vlan-ids=10
add bridge=bridge1 tagged=ether1,ether2,ether3 untagged=ether5 vlan-ids=20
```

:::info
在此示例中，将使用未标记流量在 CAP 与 CAPsMAN 路由器之间通信。默认情况下，如果未更改 PVID，未标记流量将在设置了相同 PVID 值（包括默认 PVID）的端口之间转发。
:::

### CAPs {#caps}

- 创建网桥并将连接到 CAPsMAN 路由器的端口分配到该网桥：

```
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1
```

- 在 AP 上启用 CAP 模式，并确保指定使用新建的网桥：

```
/interface/wireless/cap
set bridge=bridge1 discovery-interfaces=bridge1 enabled=yes interfaces=wlan1
```

- CAP 成功连接到 CAPsMAN 路由器后，wlan1（SSID 为 **WiFi\_WORK**）和新创建的虚拟 wlan5（SSID 为 **WiFi\_GUEST**）接口会作为网桥端口动态添加。VLAN 会分配给无线接口，因此来自无线的所有数据都会被标记，并且只有带有此标记的数据才会通过无线发送出去。如果不需要额外的 VLAN 管理和控制，可以禁用网桥 vlan-filtering。关联的 VLAN 可以通过端口 VLAN ID (PVID) 属性查看：

```
[admin@CAP_1] /interface/bridge/port/pr
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                     BRIDGE                    HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0   H ether1                        bridge1                   yes    1     0x80         10                 10       none
 1  D  wlan1                         bridge1                         10     0x80         10                 10       none
 2  D  wlan5                         bridge1                         20     0x80         10                 10       none
```

就是这样！将无线客户端连接到你的 AP，并检查连通性。

## 使用 CAPsMAN 转发模式 {#using-capsman-forwarding-mode}

![](/img/f246b0cbdbda83ed.webp)

在 CAPsMAN 转发模式中，来自 CAP 的所有流量都会使用特殊的 CAPsMAN 报头进行封装，而该报头只能由 CAPsMAN 路由器移除。这意味着交换机将无法区分由 CAP 设置的 VLAN ID，因为 VLAN 标记也会被封装。此模式限制了在二层网络中分流流量的可能性，但使你能够通过三层网络转发来自每个 CAP 的流量，以便远端的 CAPsMAN 路由器处理这些流量。当你想要控制远程位置的多个 CAP，但又想使用集中式网关时，此模式很有用。

### CAPsMAN 路由器 {#capsman-router-1}

- 设置网桥 VLAN 过滤，以将接口限制到相应的 VLAN：

```
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1 pvid=10
add bridge=bridge1 interface=ether2 pvid=20
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1 untagged=ether1 vlan-ids=10
add bridge=bridge1 tagged=bridge1 untagged=ether2 vlan-ids=20
```

:::info
 CAPsMAN 会将 CAP 接口附加到网桥，并自动向网桥 VLAN 表中添加相应的条目。
:::

- 为每个 VLAN 创建相应的 CAP 配置：

```
/caps-man/configuration
add country=latvia datapath.bridge=bridge1 datapath.vlan-id=10 datapath.vlan-mode=use-tag name=Config_WORK security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_work_password ssid=WiFi_WORK
add country=latvia datapath.bridge=bridge1 datapath.vlan-id=20 datapath.vlan-mode=use-tag name=Config_GUEST security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_guest_password ssid=WiFi_GUEST
```

- 我们将创建一条 CAPsMAN 预配规则，以在单个设备上创建 **WiFi\_WORK** 和 **WiFi\_GUEST** SSID，每个已连接的 CAP 都会自动创建这些 SSID

```
/caps-man/provisioning
add action=create-dynamic-enabled master-configuration=Config_WORK slave-configurations=Config_GUEST
```

:::info
你可以通过添加多个 slave-configurations 来创建更多虚拟 AP。这需要事先创建多个 CAPsMAN 配置。
:::

- 出于安全原因，将 CAPsMAN 限制为 CAP 将要连接的接口：

```
/caps-man/manager/interface
set [ find default=yes ] forbid=yes
add disabled=no interface=ether3
add disabled=no interface=ether4
```

- 启用 CAPsMAN 管理器：

```
/caps-man/manager
set enabled=yes
```

- 为每个 VLAN 设置 DHCP 服务器：

```
/interface/vlan
add interface=bridge1 name=VLAN10 vlan-id=10
add interface=bridge1 name=VLAN20 vlan-id=20
/ip/address
add address=192.168.10.1/24 interface=VLAN10
add address=192.168.20.1/24 interface=VLAN20
/ip/pool
add name=dhcp_pool10 ranges=192.168.10.2-192.168.10.254
add name=dhcp_pool20 ranges=192.168.20.2-192.168.20.254
/ip/dhcp-server
add address-pool=dhcp_pool10 disabled=no interface=VLAN10 name=dhcp10
add address-pool=dhcp_pool20 disabled=no interface=VLAN20 name=dhcp20
/ip/dhcp-server/network
add address=192.168.10.0/24 dns-server=8.8.8.8 gateway=192.168.10.1
add address=192.168.20.0/24 dns-server=8.8.8.8 gateway=192.168.20.1
```

### CAPs {#caps-1}

- 在每个 AP 上启用 CAP 模式，并指定哪个接口连接到 CAPsMAN 路由器：

```
/interface/wireless/cap
set discovery-interfaces=ether1 enabled=yes interfaces=wlan1
```

- CAP 成功连接到 CAPsMAN 路由器后，CAPsMAN 路由器上会动态创建两个 CAP 接口。由于通过 datapath.bridge=bridge1 显式选择了网桥接口，并且使用默认的 CAPsMAN 转发模式 datapath.local-forwarding=no，这两个接口都会作为网桥端口动态添加到同一台 CAPsMAN 路由器上。由于使用了启用了 vlan-filtering 的网桥，这两个 CAP 接口也会显示在网桥 VLAN 表中：

```
[admin@CAPsMAN_Router] /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                       BRIDGE                      HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0     ether1                          bridge1                     yes   10     0x80         10                 10       none
 1     ether2                          bridge1                     yes   20     0x80         10                 10       none
 2  D  cap16                           bridge1                           10     0x80         10                 10       none
 3  D  cap17                           bridge1                           20     0x80         10                 10       none
[admin@CAPsMAN_Router] /interface/bridge/vlan/print
Flags: X - disabled, D - dynamic 
 #   BRIDGE                         VLAN-IDS  CURRENT-TAGGED                         CURRENT-UNTAGGED                        
 0 D bridge1                        1                                                bridge1                                 
 1   bridge1                        10        cap16                                  ether1                                  
 2   bridge1                        20        cap17                                  ether2  
```

就是这样！将无线客户端连接到你的 AP，并检查连通性。

## 案例研究 {#case-studies}

### 不使用虚拟 AP {#without-virtual-aps}

并非每个人都想创建虚拟 AP，因为这会降低总吞吐量。如果你想使用多台设备来创建多个 SSID，则可以根据 CAP 的身份为其分配特定配置。为此，应结合使用 CAPsMAN 预配规则和 RegEx 表达式。在此示例中，我们会将 **Config\_WORK** 配置分配给身份设置为 "'**AP\_WORK\_\***" 的 CAP，并将 **Config\_GUEST** 配置分配给身份设置为 "**AP\_GUEST\_\***" 的 CAP。为此，你只需更改 CAPsMAN 预配规则。

- 移除任何现有的预配规则：

```
/caps-man/provisioning/remove [f]
```

- 创建新的预配规则，根据 CAP 的身份为其分配相应的配置：

```
/caps-man/provisioning
add action=create-dynamic-enabled identity-regexp=^AP_GUEST_ master-configuration=Config_GUEST
add action=create-dynamic-enabled identity-regexp=^AP_WORK_ master-configuration=Config_WORK
```

:::note
不要忘记在 CAP 上设置正确的身份，因为 CAPsMAN 将根据其身份在 AP 上分配相应的配置。
:::
