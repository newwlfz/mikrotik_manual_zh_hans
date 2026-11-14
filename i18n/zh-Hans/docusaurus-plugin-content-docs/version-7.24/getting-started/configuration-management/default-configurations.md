---
sidebar_key: "getting-started/configuration-management/default-configurations"
sidebar_position: 3
title: "默认配置"
sidebar_label: "默认配置"
description: "本页介绍各种 MikroTik RouterOS 设备的默认配置，包括 CPE 路由器、LTE CPE AP 路由器以及其他接口类型。它概述了每种配置类型的具体设置，例如 WAN/LAN 接口、防火墙规则和 DHCP 配置。"
tags:
  - 'cpe-router'
  - 'ap-router'
  - 'ltcpe'
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/default-configurations
captured_at: '2026-11-04T11:28:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

所有 MikroTik 设备都带有某种默认配置。根据板卡类型的不同，有多种不同的配置：

- CPE 路由器
- LTE CPE AP 路由器
- AP 路由器（单频或双频）
- PTP 网桥、W60G 网桥（AP 或 CPE）
- WISP 网桥（ap\_bridge 模式下的 AP）
- 交换机
- 仅 IP
- CAP

可以运行命令 `/system/default-configuration/print` 查看实际应用的默认配置命令。

## CPE 路由器 {#cpe-router}

在此类配置中，路由器被配置为无线客户端设备。WAN 接口是 **Wireless** 接口。WAN 端口已配置 DHCP 客户端，受 IP 防火墙保护，并且 MAC 发现/连接已禁用。

使用此类型配置的路由器列表：

- RB 711,911,912,921,922 - 具有 level3 许可证
- SXT
- QRT
- SEXTANT
- LHG
- LDF
- DISC
- Groove
- Metal

:::info
CPE 路由器模式：

- \* 无线接口连接到提供商的网络（WAN 端口）；
- \* WAN 端口受防火墙保护，并启用 DHCP 客户端

wlan1 配置：

- mode: station;
- band: 2ghz-b/g/n;
- tx-chains: 0;1;
- rx-chains: 0;1;
- installation: outdoor;
- wpa2: no;
- ht-extension: 20/40mhz-XX;

LAN 配置：

- 在 ether1（LAN 端口）上设置 IP 地址 192.168.88.1/24
- DHCP Server: enabled;
- DNS: enabled;

WAN（网关）配置：

- gateway:wlan1 ;
- ip4 firewall: enabled;
- ip6 firewall: enabled;
- NAT: enabled;
- DHCP Client: enabled;

## 登录 {#login}

- admin 用户受密码保护

配置**预览**：  
[CPE_Router.txt](pathname:///assets/167706794_CPE_Router.txt)。
:::

## LTE CPE AP 路由器 {#lte-cpe-ap-router}

此配置类型适用于同时具有 LTE 和无线接口的路由器。LTE 接口被视为受防火墙保护的 WAN 端口，并且 MAC 发现/连接已禁用。WAN 端口上的 IP 地址会自动获取。无线接口被配置为接入点，并与所有可用的以太网端口桥接。

使用此类型配置的路由器列表：

- wAP LTE Kit
- SXT LTE
- LtAP 4G kit
- LtAP LTE kit
- Chateau

:::info

### CPE RouterMode {#cpe-routermode}

\* 无线接口连接到提供商的网络（WAN）

这里指的是 LTE 接口，而不是无线接口。

\* WAN 端口受防火墙保护，并启用了 DHCP 客户端)

### LAN 配置： {#lan-configuration}

- 在网桥（LAN 端口）上设置 IP 地址 192.168.188.1/24
- DHCP Server: enabled;
- DNS: enabled;

### WAN（网关）配置： {#wan-gateway-configuration}

- gateway:lte1 ;
- ip4 firewall: enabled;
- ip6 firewall: enabled;
- NAT: enabled;

### 登录 {#login-1}

- admin 用户受密码保护

配置**预览**：  
[LTE_CPE_AP_router.txt](pathname:///assets/167706791_LTE_CPE_AP_router.txt)。
:::

## AP 路由器 {#ap-router}

此配置类型适用于开箱即用、无需额外配置（路由器密码和无线密钥除外）的家庭接入点路由器。

第一个以太网端口始终配置为 WAN 端口（受防火墙保护、启用 DHCP 客户端，并禁用 MAC 连接/发现）。其他以太网端口和无线接口会加入本地 LAN 网桥，并设置 192.168.88.1/24 地址和配置 DHCP 服务器。对于双频路由器，一个无线接口配置为 5 GHz 接入点，另一个配置为 2.4 GHz 接入点。

使用此类型配置的路由器列表：

- RB 450,751,850,951,953,2011,3011,4011
- hEX, PowerBox
- mAP
- wAP, wAP R（不带 LTE 卡）
- hAP
- cAP
- OmniTIK
- 带无线接口的 CRS 系列
- L009 系列
- Audience
- Knot
- PWR

:::info

### RouterMode {#routermode}

\* WAN 端口受防火墙保护，并启用了 DHCP 客户端

\* 无线和以太网接口（WAN 端口除外）属于 LAN 网桥

### LAN 配置： {#lan-configuration-1}

- 在网桥（LAN 端口）上设置 IP 地址 192.168.88.1/24
- DHCP Server: enabled;
- DNS: enabled;

### wlan1 配置： {#wlan1-configuration}

- mode: ap-bridge;
- band: 2ghz-b/g/n;
- tx-chains: 0;1;
- rx-chains: 0;1;
- installation: indoor;
- wpa2: no;
- ht-extension: 20/40mhz-XX;

### WAN（网关）配置： {#wan-gateway-configuration-1}

- ip4 firewall: enabled;
- ip6 firewall: enabled;
- NAT: enabled;
- DHCP Client: enabled;

### 登录 {#login-2}

- admin 用户受密码保护

### 配置**预览** {#configuration-preview}

[RouterMode.txt](pathname:///assets/167706790_RouterMode.txt)
:::

## PTP 网桥、W60G 网桥 {#ptp-bridge-w60g-bridge}

将以太网与无线接口桥接。在网桥接口上设置默认 IP 地址 192.168.88.1/24。有两种可能的选项 - CPE 和 AP。对于 CPE，无线接口设置为 "station-bridge" 模式；对于 AP，使用 "bridge" 模式。W60G 网桥 - 此配置类型适用于具有 60 GHz 点对点链路的路由器。

:::info
PTP 网桥：

\* 无线和 LAN 接口已桥接；

### LAN 配置： {#lan-configuration-2}

#### 登录 {#login-3}

- admin 用户受密码保护

配置**预览**：  
[PTP_Bridge.txt](pathname:///assets/167706792_PTP_Bridge.txt)

:::

使用此类型配置的路由器列表：

- DynaDish - 作为 CPE

:::info
W60G 网桥：

 \* W60G 和 LAN 接口已桥接；

### wlan60-1 配置： {#wlan60-1-configuration}

- SSID: MikroTik;
- mode:station-bridge;
- password: no;
- 在网桥上设置 IP 地址 192.168.88.1/24

#### 登录 {#login-4}

- admin 用户受密码保护

配置**预览**：  
[W60G_Bridge.txt](pathname:///assets/167706793_W60G_Bridge.txt)

:::

## 使用此类型配置的路由器列表 {#list-of-routers-using-this-type-of-configuration}

- Cube, Cube Pro
- nRAY, Dish
- Wireless Wire kit
- wAP 60G - 具有 level3 许可证

## WISP 网桥 {#wisp-bridge}

该配置与 AP 模式下的 PTP 网桥相同，不同之处在于针对 PTMP 部署将无线模式设置为 ap\_bridge。可以使用 MAC 地址直接访问路由器。如果设备连接到启用了 DHCP 服务器的网络，则在网桥接口上配置的 DHCP 客户端将获取 IP 地址，该地址可用于访问路由器。

使用此类型配置的路由器列表：

- RB 911,912,921,922 - 具有 Level4 许可证。
- Groove A, RB 711 A
- BaseBox, NetBox
- mANTBox, NetMetal
- wAP 60G AP - 具有 level4 许可证。
- LtAP
- CME

:::info
WISP 网桥：

 \* 无线和 LAN 接口已桥接；

### wlan1 配置： {#wlan1-configuration-1}

- mode: ap-bridge;
- band: 2ghz-b/g/n;
- tx-chains: 0;1;
- rx-chains: 0;1;
- installation:   outdoor;
- wpa2: no;
- ht-extension:   20/40mhz-XX;

### wlan2 配置： {#wlan2-configuration}

- mode: ap-bridge;
- band: 5ghz-a/n/ac;
- tx-chains: 0;1;
- rx-chains: 0;1;
- installation:   outdoor;
- wpa2: no;
- ht-extension:   20/40/80mhz-XXXX;

### LAN 配置： {#lan-configuration-3}

- DHCP 客户端：在网桥（LAN 口）上启用；

### 登录 {#login-5}

- admin 用户受密码保护

配置**预览**：  
[WISP_Bridge.txt](pathname:///assets/167706789_WISP_Bridge.txt)

:::

## 交换机 {#switch}

此配置利用交换芯片功能来配置基础交换机。所有以太网端口都会加入交换机组，并且在网桥接口上设置默认 IP 地址 192.168.88.1/24。

使用此类型配置的路由器列表：

- FiberBox
- 不带无线接口的 CRS

:::info
交换机模式：

- 所有接口均已启用交换；

### 登录 {#login-6}

- admin 用户受密码保护

配置**预览**：  
[switch.txt](pathname:///assets/234914118_switch.txt)

:::

## 仅 IP {#ip-only}

当未找到特定配置时，会在 ether1、combo1 或 sfp1 上设置 IP 地址 192.168.88.1/24。

使用此类型配置的路由器列表：

- RB 411,433,435,493,800,M11,M33,1100
- CCR, ROSE Data server

:::info

### LAN {#lan}

- IP on etherx: 192.168.88.1/24;

### 登录 {#login-7}

- admin 没有密码。

### 配置预览 {#configuration-preview-1}

[ccr.txt](pathname:///assets/234914117_ccr.txt)
:::

## CAP {#cap}

当设备需要作为由 [CAPsMAN](../../wireless/abgn/capsman/index.md) 控制的无线客户端设备使用时，会使用此配置类型。

加载 CAP 默认配置时，ether1 被视为管理端口，并配置了 DHCP 客户端。所有其他以太网接口都会桥接，wlan1 设置为由 CAPsMAN 管理。

要加载 CAP 配置，请参阅  [复位按钮手册](./routeros-configuration-reset.md)。
