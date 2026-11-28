---
title: "软件规格"
description: "本页概述 RouterOS 软件规格，涵盖 MikroTik 设备的硬件兼容性、安装方法、配置工具、备份/恢复功能、防火墙特性、路由协议和 MPLS 支持。"
tags:
  - 'firewall'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/getting-started/software-specifications
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

#### 硬件支持 {#hardware-support}

**MikroTik 生产的设备：** RouterOS 与预装它的 MikroTik 硬件兼容。即使是较旧的、已停产的 MikroTik 设备，也可以运行最新版 RouterOS，但需要注意性能可能有所不同。最早期的部分产品线存在少数例外。最新版 RouterOS v7 并不兼容所有 MIPS-LE 系列设备（例如 RB100 系列、部分 RB700 系列设备等，请检查相关设备的架构）。简而言之，软件兼容性或升级没有固定限制。即使已停产 20 年的设备，只要 RAM 足够且未使用 MIPS-LE CPU，仍可能继续获得软件更新。

**第三方设备：** 如果第三方设备满足以下要求，也可以运行 RouterOS：

- x86 或 AMPERE 驱动的 ARM CPU。
- 至少 64MB RAM。
- IDE、SATA、USB 和闪存存储介质，空间至少 64MB。
- Linux 内核支持的网卡。

:::info
**注意：** 仅 CHR、x86、Tile 和 MMIPS 架构支持 NVMe 存储。有关具体信息，请查看各产品手册或框图。
:::

:::info
**注意：** 使用默认配置的 RouterOS 7 至少需要 32MB RAM，但对于更高级的配置，建议至少使用 64MB。
:::

#### 安装 {#installation}

- [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall)：通过支持 PXE 或 EtherBoot 的网卡进行完整的基于网络的安装。
- [CHR](/docs/getting-started/installation-and-upgrade/install/chr-installation)：用于作为虚拟机运行的 RouterOS 版本。
- 基于 CD 的安装。

#### 配置 {#configuration}

- 用于初始配置的基于 MAC 的访问。
- [WinBox](/docs/management-tools/winbox) – 独立的 Windows GUI 配置工具。
- [WebFig](/docs/management-tools/webfig) - 高级基于 Web 的配置接口。
- MikroTik - [基于 Android 和 iOS 的配置工具](/docs/management-tools/mikrotik-mobile-app)。
- 强大的命令行配置接口，集成脚本功能，可通过本地终端、串行控制台、telnet 和 ssh 访问。
- API - 用于创建自己的配置和监控应用的方式。

#### Backup/Restore

- 二进制配置[备份](/docs/getting-started/configuration-management/backup)的保存和加载。
- 人类可读文本格式的[配置导出和导入](/docs/getting-started/configuration-management#configuration-export-and-import)。

#### Firewall

- 有状态过滤。
- 源 NAT 和目的 NAT。
- NAT 辅助程序（h323、pptp、quake3、sip、ftp、irc、tftp）。
- 内部连接、路由和数据包标记。
- 按 IP 地址和地址范围、端口和端口范围、IP 协议、DSCP 等条件过滤。
- 地址列表。
- 自定义 Layer7 匹配器。
- IPv6 支持。
- PCC - 每连接分类器，用于负载均衡配置。
- RAW 过滤，用于绕过连接跟踪。

#### Routing

- 静态路由。
- 虚拟路由和转发（VRF）。
- 基于策略的路由。
- 接口路由。
- ECMP 路由。
- IPv4 动态路由协议：RIP v1/v2、OSPFv2、BGP v4。
- IPv6 动态路由协议：RIPng、OSPFv3、BGP。
- 双向转发检测（BFD）。

#### MPLS

- IPv4 的静态标签绑定。
- IPv4 的标签分发协议。
- RSVP 流量工程隧道。
- 基于 VPLS MP-BGP 的自动发现和信令。
- 基于 MP-BGP 的 MPLS IP VPN。

#### VPN

- IPSec – 隧道和传输模式，证书或 PSK，AH 和 ESP 安全协议。
- IKEv2 支持。
- IPSec 的 AES-NI 硬件加速支持。
- 点对点隧道（OpenVPN、PPTP、PPPoE、L2TP、SSTP）。
- 高级 PPP 功能（MLPPP、BCP）。
- sstp、ppp、pptp、l2tp 和 pppoe 支持 BCP。
- 简单隧道（IPIP、EoIP）支持 IPv4 和 IPv6。
- 6to4 隧道支持（IPv4 网络上的 IPv6）。
- VLAN – IEEE802.1q 虚拟 LAN 支持，Q-in-Q 支持。
- 基于 MPLS 的 VPN。
- WireGuard。
- ZeroTier。

#### 无线 {#wireless}

- IEEE802.11a/b/g 无线客户端和接入点。
- 完整支持 IEEE802.11n。
- Nstreme 和 Nstreme2 专有协议。
- NV2 协议。
- 无线分布式系统（WDS）。
- Virtual AP。
- WEP、WPA、WPA2。
- 访问控制列表。
- 无线客户端漫游。
- WMM。
- HWMP+ 无线 MESH 协议。
- MME 无线路由协议。

#### DHCP

- 每接口 DHCP 服务器。
- DHCP 客户端和中继。
- 静态和动态 DHCP 租约。
- RADIUS 支持。
- 自定义 DHCP 选项。
- DHCPv6 Prefix Delegation（DHCPv6-PD）。
- DHCPv6 Client。

#### Hotspot

- 即插即用访问网络。
- 本地网络客户端身份验证。
- 用户计费。
- 用于身份验证和计费的 RADIUS 支持。

#### QoS

- 支持 CIR、MIR、突发和优先级的 Hierarchical Token Bucket（HTB）QoS 系统。
- 用于基本 QoS 实施的简单快速方案 - Simple queues。
- 动态客户端速率均衡（PCQ）。

#### Proxy

- HTTP 缓存代理服务器。
- 透明 HTTP 代理。
- SOCKS 协议支持。
- DNS 静态条目。
- 支持在单独驱动器上缓存。
- 父代理支持。
- 访问控制列表。
- 缓存列表。

#### 工具 {#tools}

- Ping、traceroute
- 带宽测试、ping flood
- 数据包嗅探器、torch
- Telnet、ssh
- 电子邮件和短信发送工具
- 自动脚本执行工具
- CALEA
- File Fetch 工具
- 高级流量生成器
- WoL（Wake on LAN）发送

#### 其他功能 {#other-features}

- 支持 Samba。
- 支持 OpenFlow。
- 网桥——生成树协议（STP、RSTP）、网桥防火墙和 MAC 地址转换。
- 动态 DNS 更新工具。
- NTP 客户端/服务器，并与 GPS 系统同步。
- 支持 VRRP v2 和 v3。
- SNMP。
- M3P - MikroTik Packet Packer Protocol，用于无线链路和以太网。
- MNDP - MikroTik Neighbor Discovery Protocol，支持 CDP（Cisco Discovery Protocol）。
- RADIUS 身份验证和计费。
- TFTP 服务器。
- 支持同步接口（仅 Farsync 卡）（在 v5.x 中已移除）。
- 异步——串行 PPP 拨入/拨出、按需拨号。
- ISDN——拨入/拨出、支持 128K 捆绑、Cisco HDLC、x75i、x75ui、x75bui 线路协议、按需拨号。

#### 内核版本 {#kernel-version}

- RouterOS 6.x 版本使用 3.3.5
- RouterOS 7.x 版本使用 5.6.3

#### 支持的加密方式 {#supported-encryptions}

RouterOS 7 用于管理网络（电信）设备。

- RouterOS 7 包含加密功能（组件），用于保护通过电信通道和设备控制通道传输的数据（信息）安全。
- 所有加密功能（组件）都是 RouterOS 7 的组成部分，最终用户无法更改。
- RouterOS 7 适用于由最终用户安装，无需供应商提供大量支持。
- RouterOS 7 使用以下安全协议。

| 支持的安全协议 | 加密算法 | 最大密钥长度 |
| :-- | :-- | :-- |
| <br/> IPSec | DES | 56 bit |
|  | 3DES | 168 bit |
|  | AES | 128, 192, 256 bit |
|  | Blowfish | 448 bit |
|  | Twofish | 256 bit |
|  | Camellia | 128, 192, 256 bit |
| PPTP（带 MPPE） | RC4 | 128 bit |
| L2TP（带 MPPE） | RC4 | 128 bit |
| SNMP | DES | 56 bit |
|  | AES | 128 bit |
| SSH | Blowfish | 128 bit |
|  | 3DES | 168 bit |
|  | AES | 128, 192, 256 bit |
| SSTP | AES | 256 bit |
|  | RC4 | 128 bit |
| 用于 WinBox 连接（未命名） | AES | 128 bit |
| WEP | RC4 | 104 bit |
| WPA-TKIP | RC4 | 128 bit |
| WPA2-TKIP | RC4 | 128 bit |
| WPA-AES | AES | 128 bit |
| WPA2-AES | AES | 128, 256 bit |
| WPA3 | AES | 128, 256 bit |
| HTTPS | NULL, RC4, DES, DES40, 3DES, AES | 128, 192, 256 bit |

## 相关主题 {#related-topics}

<DocCardList />
