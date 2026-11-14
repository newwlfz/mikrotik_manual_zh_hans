---
title: "文档更新 - 2026年6月16日"
date: 2026-06-16
slug: /changelog-2026-06-16
source: https://manual.mikrotik.com/changelog/changelog-2026-06-16
captured_at: '2026-11-04T06:07:59+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 16 日文档变更摘要。

## 无线 {#wireless}

- **[Wi-Fi 6 / 7 (802.11ax/be)](/docs/wireless/wifi)**：将 WiFi 页面标题从 "Wi-Fi 6 / 6E" 改为 "Wi-Fi 6 / 7 (802.11ax/be)"，并把 "这是正确的章节吗？" 提示重构为驱动包表格，记录新增的 wifi-qcom-be（Wi-Fi 7，例如 hAP be3 media）和 wifi-mediatek（例如 hAP ax S、hAP be lite）包，与 wifi-qcom 并列。同时更新侧边栏标签和指向该页面的交叉引用以保持一致。
- **[无线概述](/docs/wireless)**：将即将推出的 Wi-Fi 7 驱动类型 —— wifi-qcom-be 和 wifi-mediatek —— 加入包选择表，并新增 WiFi 7 产品系列条目，同时在型号命名示例中加入 hAP be lite。
- **[Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac)**：说明 wifi-qcom-ac 会*替换* wireless 包，而非与之并存安装，并弱化了驱动兼容性警告的措辞。
- **[无线 station 模式](/docs/wireless/user-guides/wireless-station-modes)**：在 station 模式适用性矩阵中新增 wifi-qcom 列，并说明可用的 station 模式取决于所安装的驱动和无线协议。
- **[802.11 a/b/g/n](/docs/wireless/abgn)**：对旧版 /interface/wireless、CAPsMAN、W60G 和 WiFi 配置指南进行审校修正 —— 包括 CAPsMAN 的 upgrade-policy 和 rates.basic 说明以及证书有效期示例。

## 物联网 {#internet-of-things}

- **[ChirpStack](/docs/internet-of-things/lora/user-guides/chirpstack)**：新增指南，介绍如何将 MikroTik LoRaWAN 网关注册到开源 ChirpStack 服务器。

## 防火墙与 QoS {#firewall--qos}

- **[连接跟踪](/docs/firewall-and-quality-of-service/connection-tracking)**：对该章节进行审校修正 —— 扩充了 untracked 连接状态与 RAW 规则的说明，记录了 loose-tcp-tracking 和 udp-timeout，并对 NAT、过滤规则、队列（CAKE、HTB、FIFO）以及 DDoS 防护和端口敲击案例研究作出澄清。

## 用户指南 {#user-guides}

- **[路由决策](/docs/user-guides/routing-and-networking-protocols/routing-decision)**：路由文档审校修正 —— 澄清了 nexthop 查找以及通过路由过滤器进行的路由重分发，并修正了 BGP、OSPF、MPLS/VPLS、组播、VRF 以及 ROSv6→v7 迁移页面中的问题。

## 入门 {#getting-started}

- **[备份](/docs/getting-started/configuration-management/backup)**：记录了备份加密属性（aes-sha256 / rc4）和密码加密行为，并对安装/升级、网络基础（IPv6）以及保护路由器页面做了进一步的审校澄清。
- **[首次配置](/docs/getting-started/first-time-configuration)**：重构了该指南，更新了内容并新增 WinBox4 截图 —— 更清晰的分步流程（物理连接、下载 WinBox、通过 Neighbor Discovery 查找路由器、加固安全以及用户密码管理），并将无线设置拆分为三代：旧版 /interface wireless、现代 /interface wifi，以及高级的 MLD / 多射频 / WiFi 6E 风格配置。

## 硬件 {#hardware}

- **[磁盘](/docs/hardware/disks)**：对硬件页面进行审校修正 —— 新增磁盘共享属性（auto-media-sharing、SMB/NFS 共享）和支持的格式化文件系统，并修正了接地、LED、LCD 触摸屏、PoE-out、端口、产品命名和 RouterBOOT 相关的措辞。

## 诊断与监控 {#diagnostics--monitoring}

- **[Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)**：审校修正 —— 澄清了 WAN 可达性检查（通过 UDP 端口 30000 访问 cloud.mikrotik.com，每 2 分钟检查一次），并修正了日志、Netwatch、SNMP、traffic-flow、torch 及其他诊断工具中的问题。

## 高可用性解决方案 {#high-availability-solutions}

- **[Bonding](/docs/high-availability-solutions/bonding)**：对 bonding 和负载均衡指南进行审校修正，包括修正 EoIP 隧道示例。

## 开发者指南 {#developer-guides}

- **[API](/docs/developer-guides/api)**：审校修正 —— 澄清了 API 协议长度编码（四字节长度，最大 0xFFFFFFFF），更新了 Python 3 TLS 示例，并修正了 REST API 和脚本页面。

## CLI 参考 {#cli-reference}

- **[CLI 参考](/docs/cli-reference)**：记录了 m 地址标志（组播地址）。

## 其他章节 {#other-sections}

- **第二轮文档审校**：对剩余章节进行拼写、语法、措辞和事实性修正 —— [系统](/docs/system-information-and-utilities/fetch)（Fetch、电子邮件、时钟、device-mode、IP packing）、[存储](/docs/storage/nvme-over-tcp)（更清晰的 NVMe-over-TCP 配置、BTRFS、RAID、SMB、加密存储）、[网络管理](/docs/network-management/dhcp)（DHCP、DNS、Cloud Back To Home（远程回家） / 文件共享、Web/反向代理、SOCKS）、[移动网络](/docs/mobile-networking/lte-5g)（LTE/5G、GPS、双 SIM、短信）、[管理工具](/docs/management-tools/tr-069)（TR-069、CLI、Quick Set、SSH、WinBox）、[物联网](/docs/internet-of-things/mqtt)（MQTT、蓝牙、LoRa、GPIO、Wiliot）、[有线连接](/docs/wired-connections/ethernet)（Ethernet、接口兼容性、PWR-Line）以及 [VPN](/docs/virtual-private-networks/ipsec)（IPsec、L2TP、SSTP、OpenVPN、WireGuard、PPPoE 以及各隧道指南）。
- **[无线](/docs/wireless/wifi)**：格式修正 —— 表格内的警告消息现在可以正确渲染，hAP ac² 等硬件型号名称使用正确的上标。
