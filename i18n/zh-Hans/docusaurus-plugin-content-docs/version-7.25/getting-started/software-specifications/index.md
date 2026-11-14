---
sidebar_key: "getting-started/software-specifications/index"
sidebar_position: 2
title: "软件规格"
sidebar_label: "软件规格"
description: "本页概述 RouterOS 软件规格，涵盖 MikroTik 设备的硬件兼容性、安装方法、配置工具、备份/恢复能力、防火墙功能、路由协议以及 MPLS 支持。"
tags:
  - 'firewall'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/getting-started/software-specifications
captured_at: '2026-11-04T11:17:03+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 硬件支持 {#hardware-support}

**MikroTik 制造的设备：** RouterOS 与预装它的 MikroTik 硬件兼容。即使是较旧的、已停产的 MikroTik 设备也可以运行最新的 RouterOS，但性能可能有所不同。对于最古老的产品线，有一些例外。RouterOS v7 并非与所有 MIPS-LE 系列设备兼容（例如 RB100 系列、部分 RB700 系列设备；请检查相关设备的架构）。软件兼容性或升级没有固定限制。即使设备已停产 20 年，只要具有足够的 RAM 且不是基于 MIPS-LE CPU，仍可能收到软件更新。

**第三方设备：** RouterOS 也可以在满足以下要求的第三方设备上运行：

- x86 或基于 AMPERE 的 ARM CPU。
- 至少 64 MB RAM。
- IDE、SATA、USB 和闪存存储介质，至少 64 MB 空间。
- Linux 内核支持的网卡。

:::info
NVMe 存储仅支持 CHR、x86、Tile 和 MMIPS 架构。请查看各产品手册或框图以获取具体信息。
:::

:::info
采用默认配置的 RouterOS 7 至少需要 32 MB RAM，但对于更高级的配置，我们建议至少 64 MB。
:::

## 安装 {#installation}

- [网络安装](../installation-and-upgrade/netinstall/index.md)：通过支持 PXE 或 EtherBoot 的网卡进行完整的基于网络的安装。
- [CHR：安装](../installation-and-upgrade/install/chr-installation/index.md)：旨在作为虚拟机运行的 RouterOS 版本。
- 基于 CD 的安装。

## 配置 {#configuration}

- 用于初始配置的基于 MAC 的访问。
- [WinBox](../../management-tools/winbox.md) – 独立的 Windows GUI 配置工具。
- [WebFig](../../management-tools/webfig.md) - 高级的基于 Web 的配置界面。
- MikroTik - [基于 Android 和 iOS 的配置工具](../../management-tools/mikrotik-mobile-app.md)。
- 强大的命令行配置界面，集成脚本功能，可通过本地终端、串行控制台、telnet 和 ssh 访问。
- API - 创建自己的配置和监控应用程序的方式。

## 备份/恢复 {#backuprestore}

- 二进制配置 [backup](../configuration-management/backup.md) 的保存和加载。
- 以人类可读的文本格式进行[配置导出和导入](../configuration-management/index.md#configuration-export-and-import)。

## 防火墙 {#firewall}

- 有状态过滤。
- 源 NAT 和目标 NAT。
- NAT 助手（h323、pptp、quake3、sip、ftp、irc、tftp）。
- 内部连接标记、路由标记和数据包标记。
- 按 IP 地址和地址范围、端口和端口范围、IP 协议、DSCP 等进行过滤。
- 地址列表。
- 自定义 Layer7 匹配器。
- 支持 IPv6。
- PCC - 每连接分类器，用于负载均衡配置。
- 用于绕过连接跟踪的 RAW 过滤。

## 路由 {#routing}

- 静态路由。
- 虚拟路由和转发（VRF）。
- 基于策略的路由。
- 接口路由。
- ECMP 路由。
- IPv4 动态路由协议：RIP v1/v2、OSPFv2、BGP v4。
- IPv6 动态路由协议：RIPng、OSPFv3、BGP。
- 双向转发检测（BFD）。

## MPLS {#mpls}

- 用于 IPv4 的静态标签绑定。
- 用于 IPv4 的标签分发协议。
- RSVP 流量工程隧道。
- 基于 VPLS MP-BGP 的自动发现和信令。
- 基于 MP-BGP 的 MPLS IP VPN。

## VPN {#vpn}

- [IPSec](../../virtual-private-networks/ipsec/index.md) – 隧道和传输模式、证书或 PSK、AH 和 ESP 安全协议。
- 支持 IKEv2。
- IPSec 的 AES-NI 硬件加速支持。
- 点对点隧道（[OpenVPN](../../virtual-private-networks/openvpn.md)、[PPTP](../../virtual-private-networks/pptp.md)、[PPPoE](../../virtual-private-networks/pppoe/index.md)、[L2TP](../../virtual-private-networks/l2tp/index.md)、[SSTP](../../virtual-private-networks/sstp.md)）。
- 高级 PPP 功能（MLPPP、BCP）。
- BCP 在 sstp、ppp、pptp、l2tp 和 pppoe 上受支持。
- 简单隧道（[IPIP](../../virtual-private-networks/ipip.md)、[EoIP](../../virtual-private-networks/eoip.md)）支持 IPv4 和 IPv6。
- [6to4](../../virtual-private-networks/6to4.md) 隧道支持（IPv4 网络上的 IPv6）。
- VLAN – IEEE802.1q 虚拟 LAN 支持、Q-in-Q 支持。
- 基于 MPLS 的 VPN。
- [WireGuard](../../virtual-private-networks/wireguard.md)。
- [ZeroTier](../../virtual-private-networks/zerotier.md)。

## 无线 {#wireless}

- IEEE802.11a/b/g 无线客户端和接入点。
- 全面支持 IEEE802.11n。
- Nstreme 和 Nstreme2 专有协议。
- NV2 协议。
- 无线分布式系统（WDS）。
- 虚拟 AP。
- WEP、WPA、WPA2。
- 访问控制列表。
- 无线客户端漫游。
- WMM。
- HWMP+ 无线 MESH 协议。
- MME 无线路由协议。

## DHCP {#dhcp}

- 每个接口的 DHCP 服务器。
- DHCP 客户端和中继。
- 静态和动态 DHCP 租约。
- 支持 RADIUS。
- 自定义 DHCP 选项。
- DHCPv6 前缀委派（DHCPv6-PD）。
- DHCPv6 客户端。

## 热点 {#hotspot}

- 对网络的 Plug-n-Play 访问。
- 本地网络客户端的认证。
- 用户计费。
- 用于认证和计费的 RADIUS 支持。

## QoS {#qos}

- 具有 CIR、MIR、突发和优先级支持的层级令牌桶（HTB）QoS 系统。
- 用于基本 QoS 实现的简单快速解决方案 - Simple queues。
- 动态客户端速率均衡（PCQ）。

## 代理 {#proxy}

- HTTP 缓存代理服务器。
- 透明 HTTP 代理。
- 支持 SOCKS 协议。
- DNS 静态条目。
- 支持在独立驱动器上进行缓存。
- 支持父代理。
- 访问控制列表。
- 缓存列表。

## 工具 {#tools}

- Ping、traceroute
- 带宽测试、ping flood
- 数据包嗅探器、torch
- Telnet、ssh
- 电子邮件和 SMS 发送工具
- 自动化脚本执行工具
- CALEA
- 文件获取工具
- 高级流量生成器
- WoL（局域网唤醒）发送

## 其他功能 {#other-features}

- 支持 Samba。
- 支持 OpenFlow。
- 桥接 – 生成树协议（STP、RSTP）、桥接防火墙和 MAC natting。
- 动态 DNS 更新工具。
- NTP 客户端/服务器以及与 GPS 系统同步。
- 支持 VRRP v2 和 v3。
- SNMP。
- M3P - 用于无线链路和以太网的 MikroTik Packet Packer Protocol。
- MNDP - MikroTik Neighbor Discovery Protocol，支持 CDP（Cisco Discovery Protocol）。
- RADIUS 认证和计费。
- TFTP 服务器。
- 同步接口支持（仅 Farsync 卡）（在 v5.x 中已移除）。
- 异步 – 串行 PPP 拨入/拨出，按需拨号。
- ISDN – 拨入/拨出，128K 捆绑支持，Cisco HDLC、x75i、x75ui、x75bui 线路协议，按需拨号。

## 内核版本 {#kernel-version}

- RouterOS 版本 6.x 使用 3.3.5
- RouterOS 版本 7.x 使用 5.6.3

## 支持的加密 {#supported-encryptions}

RouterOS 7 用于网络（电信）设备的管理。

- RouterOS 7 包含加密功能（组件），旨在保障通过电信通道和设备控制通道传输的数据（信息）安全。
- 所有加密功能（组件）都是 RouterOS 7 的组成部分，最终用户无法更改。
- RouterOS 7 旨在由最终用户安装，无需供应商提供大量支持。
- RouterOS 7 使用以下安全协议。

| 支持的安全协议 | 加密算法 | 最大密钥长度 |
| :-- | :-- | :-- |
| <br/> IPSec | DES | 56 bit |
|  | 3DES | 168 bit |
|  | AES | 128、192、256 位 |
|  | Blowfish | 448 bit |
|  | Twofish | 256 bit |
|  | Camellia | 128, 192, 256 bit |
| PPTP（使用 MPPE） | RC4 | 128 bit |
| L2TP（使用 MPPE） | RC4 | 128 bit |
| SNMP | DES | 56 bit |
|  | AES | 128 bit |
| SSH | Blowfish | 128 bit |
|  | 3DES | 168 bit |
|  | AES | 128、192、256 位 |
| SSTP | AES | 256 bit |
|  | RC4 | 128 位 |
| 用于 WinBox 连接（无名称） | AES | 128 bit |
| WEP | RC4 | 104 bit |
| WPA-TKIP | RC4 | 128 bit |
| WPA2-TKIP | RC4 | 128 bit |
| WPA-AES | AES | 128 bit |
| WPA2-AES | AES | 128、256 位 |
| WPA3 | AES | 128、256 位 |
| HTTPS | NULL、RC4、DES、DES40、3DES、AES | 128、192、256 位 |

## 相关主题 {#related-topics}

<DocCardList />
