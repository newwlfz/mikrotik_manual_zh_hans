---
title: "默认配置"
description: "本页介绍各种 MikroTik RouterOS 设备的默认配置，包括 CPE 路由器、LTE CPE AP 路由器和其他接口类型。其中概述了每种配置类型的具体设置，例如 WAN/LAN 接口、防火墙规则和 DHCP 配置。"
tags:
  - 'cpe-router'
  - 'ap-router'
  - 'ltcpe'
source: https://manual.mikrotik.com/docs/7.25/getting-started/configuration-management/default-configurations
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

所有 MikroTik 设备都带有某种默认配置。根据板卡类型，存在多种不同的配置：

- CPE 路由器
- LTE CPE AP 路由器
- AP 路由器（单频或双频）
- PTP 网桥，W60G 网桥（AP 或 CPE）
- WISP 网桥（处于 ap\_bridge 模式的 AP）
- 交换机
- 仅 IP
- CAP

可以运行命令 `/system/default-configuration/print` 查看实际应用的默认配置命令。

## CPE 路由器 {#cpe-router}
---

在此类配置中，路由器设置为无线客户端设备。WAN 接口是 **Wireless** 接口。WAN 端口配置了 DHCP 客户端，受 IP 防火墙保护，并且禁用了 MAC 发现和连接。

使用此类配置的路由器列表：

- RB 711,911,912,921,922 - 具有 level3 许可证
- SXT
- QRT
- SEXTANT
- LHG
- LDF
- DISC
- Groove
- Metal

**CPE 路由模式**

- 无线接口连接到运营商网络（WAN 端口）；
- WAN 端口受防火墙保护，并启用了 DHCP 客户端。

**wlan1 配置**

|  |  |
| :-- | :-- |
| *mode* | station |
| *band* | 2ghz-b/g/n |
| *tx-chains* | 0;1 |
| *rx-chains* | 0;1 |
| *installation* | outdoor |
| *wpa2* | no |
| *ht-extension* | 20/40mhz-XX |

**LAN 配置：**

|  |  |
| :-- | :-- |
| *IP address* | 192.168.88.1/24 设置在 ether1（LAN 端口）上 |
| *DHCP Server* | 已启用 |
| *DNS* | 已启用 |

**WAN（网关）配置**

|  |  |
| :-- | :-- |
| *gateway* | wlan1 |
| *ip4 firewall* | 已启用 |
| *ip6 firewall* | 已启用 |
| *NAT* | 已启用 |
| *DHCP Client* | 已启用 |

**Login**

- admin 用户受密码保护

**配置预览**：  
[CPE_Router.txt](pathname:///assets/167706794_CPE_Router.txt)。

## LTE CPE AP 路由器 {#lte-cpe-ap-router}
---

此配置类型适用于同时具有 LTE 和无线接口的路由器。LTE 接口是 WAN 端口，受防火墙保护，并禁用 MAC 发现和连接。WAN 端口上的 IP 地址自动获取。无线接口配置为接入点，并与所有可用的以太网端口桥接。

使用此类配置的路由器列表：

- wAP LTE Kit
- SXT LTE
- LtAP 4G kit
- LtAP LTE kit
- Chateau

**LTE CPE AP 路由模式**

- 无线接口连接到运营商网络（WAN）

这是指 LTE 接口，而不是无线接口。

- WAN 端口受防火墙保护，并启用了 DHCP 客户端

**LAN 配置**

|  |  |
| :-- | :-- |
| *IP 地址* | 在网桥（LAN 端口）上设置 192.168.188.1/24 |
| *DHCP 服务器* | 已启用 |
| *DNS* | 已启用 |

**WAN（网关）配置**

|  |  |
| :-- | :-- |
| *网关* | lte1 |
| *ip4 防火墙* | 已启用 |
| *ip6 防火墙* | 已启用 |
| *NAT* | 已启用 |

**Login**

- admin 用户受密码保护

**配置预览**：  
[LTE_CPE_AP_router.txt](pathname:///assets/167706791_LTE_CPE_AP_router.txt)。

## AP 路由器 {#ap-router}
---

此配置类型应用于家庭接入点路由器，可直接使用，无需额外配置（路由器密码和无线密钥除外）。

第一个以太网接口配置为 WAN 端口（受防火墙保护，启用 DHCP 客户端，并禁用 MAC 连接和发现）。其他以太网端口和无线接口添加到 LAN 网桥，设置 IP 地址 192.168.88.1/24，并配置 DHCP 服务器。对于双频路由器，一个无线接口配置为 5 GHz 接入点，另一个配置为 2.4 GHz 接入点。

使用此类配置的路由器列表：

- RB 450,751,850,951,953,2011,3011,4011
- hEX，PowerBox
- mAP
- wAP，wAP R（无 LTE 卡）
- hAP
- cAP
- OmniTIK
- 带无线接口的 CRS 系列
- L009 系列
- Audience
- Knot
- PWR

**AP Router 模式**

- WAN 端口受防火墙保护，并启用了 DHCP 客户端
- 无线和以太网接口（WAN 端口除外）属于 LAN 网桥

**LAN 配置：**

|  |  |
| :-- | :-- |
| *IP 地址* | 192.168.88.1/24 设置在网桥（LAN 端口）上 |
| *DHCP Server* | 已启用 |
| *DNS* | 已启用 |

**wlan1 配置**

|  |  |
| :-- | :-- |
| *mode* | ap-bridge |
| *band* | 2ghz-b/g/n |
| *tx-chains* | 0;1 |
| *rx-chains* | 0;1 |
| *installation* | indoor |
| *wpa2* | no |
| *ht-extension* | 20/40mhz-XX |

**WAN（网关）配置**

|  |  |
| :-- | :-- |
| *ip4 防火墙* | 已启用 |
| *ip6 防火墙* | 已启用 |
| *NAT* | 已启用 |
| *DHCP Client* | 已启用 |

**Login**

- admin 用户受密码保护

**配置预览**：  
[RouterMode.txt](pathname:///assets/167706790_RouterMode.txt)

## PTP 网桥 {#ptp-bridge}
---

以太网接口与无线接口桥接。网桥接口上设置了 IP 地址 192.168.88.1/24。有两种选项：CPE 和 AP。对于 CPE，无线接口使用“station-bridge”模式；对于 AP，无线接口使用“bridge”模式。

使用此类配置的路由器列表：

- DynaDish - 作为 CPE

**PTP 网桥模式**

- 无线和 LAN 接口已桥接；

**LAN 配置：**

**Login**

- admin 用户受密码保护

**配置预览**：  
[PTP_Bridge.txt](pathname:///assets/167706792_PTP_Bridge.txt)

## W60G 网桥 {#w60g-bridge}
---

此配置类型适用于具有 60 GHz 点对点链路的路由器。

使用此类配置的路由器列表：

- Cube，Cube Pro
- nRAY，Dish
- Wireless Wire kit
- wAP 60G - 使用 level3 许可证

**W60G 网桥模式**

- W60G 和 LAN 接口已加入网桥；

**wlan60-1 配置**

|  |  |
| :-- | :-- |
| *SSID* | MikroTik |
| *mode* | station-bridge |
| *password* | no |
| *IP 地址* | 192.168.88.1/24 设置在网桥上 |

**Login**

- admin 用户受密码保护

**配置预览**：  
[W60G_Bridge.txt](pathname:///assets/167706793_W60G_Bridge.txt)

## WISP 网桥 {#wisp-bridge}
---

该配置与 AP 模式下的 PTP Bridge 相同，但无线模式设置为 ap\_bridge，用于 PTMP 场景。可以使用 MAC 地址直接访问路由器。如果设备连接到启用了 DHCP 服务器的网络，则网桥接口上配置的 DHCP 客户端会获取一个 IP 地址，可用于访问路由器。

使用此类配置的路由器列表：

- RB 911,912,921,922 - 使用 Level4 许可证。
- Groove A，RB 711 A
- BaseBox，NetBox
- mANTBox，NetMetal
- wAP 60G AP - 使用 level4 许可证。
- LtAP
- CME

**WISP 网桥模式**

- wireless 和 LAN 接口已桥接；

**wlan1 配置**

|  |  |
| :-- | :-- |
| *mode* | ap-bridge |
| *band* | 2ghz-b/g/n |
| *tx-chains* | 0;1 |
| *rx-chains* | 0;1 |
| *installation* | outdoor |
| *wpa2* | no |
| *ht-extension* | 20/40mhz-XX |

**wlan2 配置**

|  |  |
| :-- | :-- |
| *mode* | ap-bridge |
| *band* | 5ghz-a/n/ac |
| *tx-chains* | 0;1 |
| *rx-chains* | 0;1 |
| *installation* | outdoor |
| *wpa2* | no |
| *ht-extension* | 20/40/80mhz-XXXX |

**LAN 配置：**

|  |  |
| :-- | :-- |
| *DHCP Client* | 在网桥（LAN 端口）上启用 |

**Login**

- admin 用户受密码保护

**配置预览**：  
[WISP_Bridge.txt](pathname:///assets/167706789_WISP_Bridge.txt)

## 交换机 {#switch}
---

此配置使用交换芯片功能来配置基本交换机。所有以太网端口均添加到交换组，并在网桥接口上设置 IP 地址 192.168.88.1/24。

使用此类配置的路由器列表：

- FiberBox
- 无无线接口的 CRS

**交换模式**

- 所有接口均处于交换状态；

**Login**

- admin 用户受密码保护

**配置预览**：  
[switch.txt](pathname:///assets/234914118_switch.txt)

## 仅 IP {#ip-only}
---

当未找到特定配置时，会在 ether1、combo1 或 sfp1 上设置 IP 地址 192.168.88.1/24。

使用此类配置的路由器列表：

- RB 411、433、435、493、800、M11、M33、1100
- CCR、ROSE 数据服务器

**LAN**

|  |  |
| :-- | :-- |
| *etherx 上的 IP* | 192.168.88.1/24 |

**Login**

- admin 用户没有密码。

**配置预览**：  
[ccr.txt](pathname:///assets/234914117_ccr.txt)

## CAP
---

当设备需要作为由 [CAPsMAN](/docs/wireless/abgn/capsman) 控制的无线客户端设备运行时，使用此配置类型。

加载 CAP 默认配置时，ether1 是管理端口，并配置了 DHCP 客户端。所有其他以太网接口均已加入网桥，wlan1 由 CAPsMAN 管理。

要加载 CAP 配置，请参阅 [Reset Button manual](/docs/getting-started/configuration-management/routeros-configuration-reset)。
