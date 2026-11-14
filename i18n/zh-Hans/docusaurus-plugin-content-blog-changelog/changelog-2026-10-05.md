---
title: "文档更新 - 2026年10月5日"
date: 2026-10-05
slug: /changelog-2026-10-05
source: https://manual.mikrotik.com/changelog/changelog-2026-10-05
captured_at: '2026-11-04T06:08:58+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年10月5日文档变更摘要。

## 站点 {#site}

- **文档版本控制**：RouterOS 7.25 的文档已冻结为 **7.25** 版本，并可从版本下拉菜单中选择。当前文档现在描述 RouterOS 7.26。

## 管理工具 {#management-tools}

- **[CMR](/docs/management-tools/cmr)**：CMR 的新指南，cmr 软件包中用于监控和管理 RouterOS 设备群的服务器，从 RouterOS 7.26beta1 开始提供。内容包括：

- CMR 能做和不能做什么、服务器与其客户端如何连接，以及新用户从哪里开始。
- 启用服务器及其设置，以及配对设备，包括典型场景和双方对密码与确认的要求。
- 管理设备：设备属性、标签和标签选择语法（+ 表示 AND，- 表示 AND NOT），以及在多台设备上同时运行命令。
- 实时仪表板 (/cmr/device/dashboard)，包含一张截图及其八个部分的说明。
- 设备群升级：升级规则、使用 trigger、run-next 或 device/upgrade 提前启动升级、升级源和本地 packages-directory、任务状态和结果（没有可用升级的设备会被视为升级失败），以及 strategy 和 fail-policy 设置。
- 告警规则：条件、日志、脚本和 webhook 动作，device、event 和 alert 组中动作文本的占位符，以及规则如何触发。
- 网络拓扑：布局、节点和链路，add-devices 和 rebuild-links，附带一个已验证的示例和一张截图。
- 应用流量、集中式 WiFi 配置（网络、射频、设置如何应用、网桥和 VLAN 行为），以及 VLAN 配置下发，包含一个已验证的示例和导致控制器被锁定的风险。

- **[CMR-Client](/docs/management-tools/cmr/client)**：设备端的新页面，属于主 RouterOS 软件包：使用 controller-addresses 启用客户端，从客户端进行配对及其自身的 pairing-requirement（none、password 或 confirm），断开连接，以及故障排除。

## CLI 参考 {#cli-reference}

- **[/cmr](/docs/cli-reference/cmr)**、**[/cmr/client](/docs/cli-reference/cmr/client)**：CMR 服务器和客户端的新参考，描述了每个参数：告警规则（alert、show-devices、test）、设备（apptraffic、dashboard、pair、reboot、run-script、upgrade、wifi-logs）、拓扑（layout、node、link、add-devices、rebuild-links）、升级（upgrade、job、run-next、show-devices、trigger、version-check），以及 vlan 和 wifi 配置下发菜单。
- **[/interface/ethernet/pon](/docs/cli-reference/interface/ethernet/pon)**、**[/interface/wifi/dashboard](/docs/cli-reference/lcd/show)**、**[/system/dashboard](/docs/cli-reference/lcd/show)**、**[/tool/apptraffic](/docs/cli-reference/tool/apptraffic)**：为 RouterOS 7.26beta1 重新生成了参考。新增命令：带有 ONU 标识的 PON 设置（onu-model、onu-registration-id、onu-serial-number、onu-vendor-id，也出现在 [/interface/ethernet](/docs/cli-reference/interface/ethernet) 上）、WiFi 和系统仪表板、应用流量统计、[/interface/wireless/snooper/snoop](/docs/cli-reference/interface/wireless/snooper/snoop)，以及用于交换机规则的 reset-counters-all。新增参数：[网桥](/docs/cli-reference/interface/bridge) 上的 dhcp-snooping-vlan-ids、[端口隔离](/docs/cli-reference/interface/ethernet/switch/port-isolation) 中的 current-forwarding-override，以及 [LTE 接口](/docs/cli-reference/interface/lte) 上的 apn-profile。在 [/interface/vlan](/docs/cli-reference/interface/vlan) 上，force-mac-address 现在为 forced-mac-address，并且 Ethernet 和 [power-line](/docs/cli-reference/interface/pwr-line) 接口中的 bandwidth 已被移除。
- **[/interface/wifi/configuration](/docs/cli-reference/interface/wifi/configuration)**、**[/interface/wifi/network](/docs/cli-reference/interface/wifi/network)**、**[/caps-man/configuration](/docs/cli-reference/caps-man/configuration)**：来自子菜单的设置现在会连同其前缀一起列出，与在命令行中设置时相同，例如 security.authentication-types。WiFi 使用 aaa.、channel.、datapath.、interworking.、security. 和 steering.；旧版 CAPsMAN 使用 channel.、configuration.、datapath.、rates. 和 security.。
- **[CLI 参考](/docs/cli-reference)**：地址参数标志说明了 i（用裸接口名代替地址，例如将点对点接口用作路由网关）和新的 % 标志（地址上的接口后缀，例如 fe80::1%ether1）。每个接受 IPv6 地址的参数也接受带有其 %interface 后缀的链路本地地址。

## 入门 {#getting-started}

- **[软件包](/docs/getting-started/installation-and-upgrade/packages)**：新增了 cmr 软件包，支持 arm、arm64 和 x86 架构，并提供了指向 CMR 指南的链接。

## 无线 {#wireless}

- **[WiFi](/docs/wireless/wifi)**：wifi-qcom-ac 驱动程序不支持 ft-preserve-vlanid 参数。
- **[Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac)**：新增警告：wifi-qcom-ac 驱动程序适用于室内设备。它可以安装在室外型号（LDF 5 ac、LHG XL 5 ac、LHG XL 52 ac、NetMetal ac²、mANTBox 52 15s、SXTsq 5 ac）上，但不支持超过 2 km 的链路所需的 distance 设置，因此请在室外板卡上使用 wireless 驱动程序。
