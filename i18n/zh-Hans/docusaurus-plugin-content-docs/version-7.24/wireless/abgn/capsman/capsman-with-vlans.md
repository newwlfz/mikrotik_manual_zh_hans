---
title: "使用 VLAN 的 CAPsMAN"
description: "本页介绍在 MikroTik RouterOS 中配置 CAPsMAN 和 VLAN，以实现集中式无线管理和针对不同客户端组的 VLAN 标记。内容涵盖 Local Forwarding Mode 设置、provisioning 规则、DHCP 配置以及交换机上的 VLAN 过滤。"
tags:
  - 'capsman'
  - 'vlan'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/capsman/capsman-with-vlans
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

可以为家庭或办公室环境创建集中式 Access Point 管理方案，并可扩展到多个 Access Point。此类方案配置较为简单，[Simple CAPsMAN setup](/docs/wireless/abgn/capsman/ap-controller-capsman#simple-setup-of-a-capsman-system) 指南中已作说明，但更复杂的场景可能需要 VLAN。CAPsMAN 支持在特定条件下分配指定的 VLAN ID。本指南将提供一个示例，说明如何根据无线客户端连接的 AP 为 Wireless 数据包分配 VLAN ID。CAPsMAN 与 VLAN 可以通过 [Local Forwarding Mode](/docs/wireless/abgn/capsman/ap-controller-capsman#local-forwarding-mode) 或 [CAPsMAN Forwarding Mode](/docs/wireless/abgn/capsman/ap-controller-capsman#manager-forwarding-mode) 实现。Local Forwarding Mode 允许在 AP 和 CAPsMAN 路由器之间使用交换机转发数据包，以获得更大的吞吐量；当所有流量始终需要转发到 CAPsMAN 路由器时，应使用 CAPsMAN Forwarding Mode（多数情况下用于过滤数据包）。

在本示例中，如果无线客户端连接到 **WiFi\_WORK**，将把所有 Wireless 客户端分配到 **VLAN10**；如果连接到 **WiFi\_GUEST**，则将 Wireless 客户端分配到 **VLAN20**。我们将使用 Virtual AP 和 CAPsMAN，在单个物理设备上为 Wireless 客户端创建多个可连接的 SSID。还将通过 CAPsMAN provisioning 规则展示如何为单个物理设备使用单个 SSID。

## 使用本地转发模式 {#using-local-forwarding-mode}

![](/img/aa0be2c197777367.webp)

在 Local Forwarding Mode 中，CAPsMAN 路由器会将配置分发给由该 CAPsMAN 路由器 provisioning 的所有 CAP。在 Local Forwarding Mode 中，流量无需发送到 CAPsMAN 路由器，转发流量时可以发送到其他路由器，而无需 CAPsMAN 路由器参与。该模式允许在来自无线客户端的流量发送到网络之前，为其打上指定的 VLAN ID，从而可以使用交换机将特定 VLAN ID 限制到特定端口。在 Local Forwarding Mode 中，流量不会封装特殊的 CAPsMAN 报头，该报头只能由 CAPsMAN 路由器移除。

### CAPsMAN 路由器 {#capsman-router}

- 为每个 VLAN 创建相应的 CAP 配置：

```
/caps-man/configuration
add country=latvia datapath.local-forwarding=yes datapath.vlan-id=10 datapath.vlan-mode=use-tag name=Config_WORK security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_work_password ssid=WiFi_WORK
add country=latvia datapath.local-forwarding=yes datapath.vlan-id=20 datapath.vlan-mode=use-tag name=Config_GUEST security.authentication-types=\
    wpa-psk,wpa2-psk security.passphrase=secret_guest_password ssid=WiFi_GUEST
```

- 我们将创建一条 CAPsMAN provisioning 规则，在单个设备上创建 **WiFi\_WORK** 和 **WiFi\_GUEST** SSID，每个连接的 CAP 都会自动创建这些 SSID。

```
/caps-man/provisioning
add action=create-dynamic-enabled master-configuration=Config_WORK slave-configurations=Config_GUEST
```

:::info
可以通过添加多个 slave-configurations 创建更多 Virtual AP。这需要多个此前创建的 CAPsMAN 配置。
:::

- 出于安全原因，将 CAPsMAN 限制在单个接口：

```
/caps-man/manager/interface
set [ find default=yes ] forbid=yes
add disabled=no interface=ether1
```

- 启用 CAPsMAN manager：

```
/caps-man/manager
set enabled=yes
```

- 为每个 VLAN 设置 DHCP Server：

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

在本示例中，将使用 [Bridge VLAN Filtering](/docs/bridging-and-switching#vlan-example-trunk-and-access-ports) 过滤未知 VLAN，并将其他设备分配到相同网络。部分设备能够将此功能卸载到内置交换芯片，请查看 [Basic VLAN switching](/docs/bridging-and-switching/user-guides/basic-vlan-switching) 指南，了解如何在不同类型的设备上配置该功能。

- 设置 Bridge VLAN Filtering：

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
在本示例中，未标记流量将用于 CAP 和 CAPsMAN Router 之间的通信。默认情况下，如果未更改 PVID，未标记流量将在具有相同 PVID 值的端口之间转发（包括默认 PVID）。
:::

### CAPs

- 创建网桥，并将连接到 CAPsMAN Router 的端口添加到该网桥：

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

- CAP 成功连接到 CAPsMAN 路由器后，wlan1（SSID **WiFi\_WORK**）和新建的虚拟 wlan5（SSID **WiFi\_GUEST**）接口会动态添加为网桥端口。VLAN 分配给无线接口，因此来自无线的数据都会被打上标签，只有带此标签的数据才会通过无线发送。如果不需要额外的 VLAN 管理和控制，可以禁用网桥 vlan-filtering。可通过端口 VLAN ID（PVID）属性查看关联的 VLAN：

```
[admin@CAP_1] /interface/bridge/port/pr
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                     BRIDGE                    HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0   H ether1                        bridge1                   yes    1     0x80         10                 10       none
 1  D  wlan1                         bridge1                         10     0x80         10                 10       none
 2  D  wlan5                         bridge1                         20     0x80         10                 10       none
```

至此完成。将无线客户端连接到 AP，并检查连通性。

## 使用 CAPsMAN Forwarding Mode {#using-capsman-forwarding-mode}

![](/img/f246b0cbdbda83ed.webp)

在 CAPsMAN Forwarding Mode 中，来自 CAP 的所有流量都会封装特殊的 CAPsMAN 头，只有 CAPsMAN 路由器可以移除该头。这意味着交换机无法识别 CAP 设置的 VLAN ID，因为 VLAN 标签也会被封装。此模式限制了在 Layer2 网络中分流流量的可能性，但使你可以通过 Layer3 网络转发每个 CAP 的流量，由远端 CAPsMAN 路由器处理流量。当你需要控制多个远程位置的 CAP，但希望使用中央网关时，此模式非常有用。

### CAPsMAN 路由器 {#capsman-router-1}

- 设置网桥 VLAN filtering，以将接口限制在相应的 VLAN：

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
 CAPsMAN 会将 CAP 接口连接到网桥，并自动向网桥 VLAN 表添加相应条目。
:::

- 为每个 VLAN 创建相应的 CAP 配置：

```
/caps-man/configuration
add country=latvia datapath.bridge=bridge1 datapath.vlan-id=10 datapath.vlan-mode=use-tag name=Config_WORK security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_work_password ssid=WiFi_WORK
add country=latvia datapath.bridge=bridge1 datapath.vlan-id=20 datapath.vlan-mode=use-tag name=Config_GUEST security.authentication-types=wpa-psk,wpa2-psk \
    security.passphrase=secret_guest_password ssid=WiFi_GUEST
```

- 我们将创建一条 CAPsMAN provisioning 规则，在单个设备上创建 **WiFi\_WORK** 和 **WiFi\_GUEST** SSID，每个连接的 CAP 都会自动创建这些 SSID

```
/caps-man/provisioning
add action=create-dynamic-enabled master-configuration=Config_WORK slave-configurations=Config_GUEST
```

:::info
可以通过添加多个 slave-configurations 创建更多 Virtual AP。这需要之前创建多个 CAPsMAN 配置。
:::

- 出于安全原因，将 CAPsMAN 限制在 CAP 将要连接的接口上：

```
/caps-man/manager/interface
set [ find default=yes ] forbid=yes
add disabled=no interface=ether3
add disabled=no interface=ether4
```

- 启用 CAPsMAN manager：

```
/caps-man/manager
set enabled=yes
```

- 为每个 VLAN 设置 DHCP Server：

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

### CAPs

- 在每个 AP 上启用 CAP 模式，指定连接到 CAPsMAN 路由器的接口：

```
/interface/wireless/cap
set discovery-interfaces=ether1 enabled=yes interfaces=wlan1
```

- CAP 成功连接到 CAPsMAN Router 后，CAPsMAN Router 上将动态创建两个 CAP 接口。由于显式选择了网桥接口 `datapath.bridge=bridge1`，并使用默认的 CAPsMAN Forwarding Mode `datapath.local-forwarding=no`，这两个接口都会在同一台 CAPsMAN Router 上动态添加为网桥端口。由于使用了启用 `vlan-filtering` 的网桥，两个 CAP 接口也会显示在网桥 VLAN 表中：

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

完成了！将无线客户端连接到 AP 并检查连通性。

## 案例研究 {#case-studies}

### 不使用 Virtual AP {#without-virtual-aps}

并非所有人都希望创建 Virtual AP，因为这会降低总吞吐量。如果要使用多台设备创建多个 SSID，则可以根据 CAP 的 identity 为其分配特定配置。为此，应结合使用 CAPsMAN provisioning 规则和 RegEx 表达式。在本例中，我们将把 **Config\_WORK** 配置分配给 identity 设置为“**AP\_WORK\_\***”的 CAP，并将 **Config\_GUEST** 配置分配给 identity 设置为“**AP\_GUEST\_\***”的 CAP。为此，只需更改 CAPsMAN provisioning 规则。

- 删除所有现有 provisioning 规则：

```
/caps-man/provisioning/remove [f]
```

- 创建新的 provisioning 规则，根据 CAP 的 identity 为其分配相应配置：

```
/caps-man/provisioning
add action=create-dynamic-enabled identity-regexp=^AP_GUEST_ master-configuration=Config_GUEST
add action=create-dynamic-enabled identity-regexp=^AP_WORK_ master-configuration=Config_WORK
```

:::note
不要忘记在 CAP 上设置正确的 identity，因为 CAPsMAN 将根据 identity 为 AP 分配相应配置。
:::
