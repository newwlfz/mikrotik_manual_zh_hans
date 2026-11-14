---
title: "文档更新 - 2026年10月9日"
date: 2026-10-09
slug: /changelog-2026-10-09
source: https://manual.mikrotik.com/changelog/changelog-2026-10-09
captured_at: '2026-11-04T06:09:01+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 9 日的文档变更摘要。

## 诊断与监控 {#diagnostics--monitoring}

- **[Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)**：已重写，并在 RouterOS 7.26beta1 上完成测试。每种探测类型（simple、ICMP、TCP-conn、HTTP-GET、HTTPS-GET、DNS）都有独立章节，配有可运行的示例，并说明阈值如何决定判定结果——包括即使未设置阈值也有默认值，以及 early-success-detection 和 early-failure-detection 如何与 thr-loss-count 配合工作。Scripts 章节介绍了探测变量、内部 *sys 用户以及允许的四种脚本策略。
- **[邻居发现](/docs/system-information-and-utilities/neighbor-discovery)**：已重写。新增“选择参与发现的接口”章节（discover-interface-list、mode=rx-only、主接口与从接口的行为），以及一个 LLDP-MED Network Policy 示例，该示例为 VoIP 电话端口配置带标签的语音 VLAN 和不带标签的 PC 数据。LLDP TLV、老化（aging）和 SNMP 行为在“技术细节”中说明。
- **[Profiler](/docs/diagnostics-monitoring-and-troubleshooting/profiler)**：已重写。说明了 cpu=total、cpu=all 和单核视图、duration 与 freeze-frame-interval、最初几帧显示的内容、“查找繁忙进程”的操作步骤，以及完整分类表，包括系统行和未分类的回退项。
- **[Health](/docs/diagnostics-monitoring-and-troubleshooting/health)**：已扩充，新增完整的读数表（名称、单位、编号）、电压与温度详情、电源状态表、旧设备说明、风扇控制行为（包括 PoE-out 负载表和手动风扇控制），以及监控选项：SNMP trap 和 OID、REST API 和一个邮件告警示例。
- **[Traffic Flow](/docs/diagnostics-monitoring-and-troubleshooting/traffic-flow)**：已重写。涵盖启用该服务和选择接口、数据包采样、导出目标、流计数器监视器、IPFIX 字段选择、一个最小化的端到端示例，以及关于哪些流量会被计数的说明（仅 CPU 路由的流量，镜像帧永远不会到达 input 链）。
- **[Resource](/docs/diagnostics-monitoring-and-troubleshooting/resource)**：已重写。包括实时监控、每核 CPU 明细、带示例的中断（IRQ）绑定、Receive Packet Steering 及其适用场景、PCI/USB/SCSI 硬件映射，以及 USB 设备授权和电源复位。
- **[接口统计与 monitor-traffic](/docs/diagnostics-monitoring-and-troubleshooting/interface-stats-and-monitor-traffic)**：已重写。解释了 stats 和 stats-detail 计数器（包括 Fast Path 计数器、队列丢包和链路断开计数），以及 monitor-traffic 中实时每秒速率和配合 /tool/traffic-monitor 使用的脚本触发器。

## 管理工具 {#management-tools}

- **[RoMON](/docs/management-tools/romon)**：已重写。涵盖启用、选择参与端口（通配符默认条目、仅物理接口）、使用密钥保护覆盖网络——包括可直接通过 RoMON 本身执行的分步密钥轮换——发现路由器、RoMON ping、通过 RoMON 使用 SSH 以及 WinBox 访问。文中说明了 RB5009 交换芯片的限制，并在“技术细节”中给出 EtherType 和组播 MAC 详情。

## 系统 {#system}

- **[精确时间协议](/docs/system-information-and-utilities/precision-time-protocol)**：已重写。包括配置（profile 与端口、按 profile 的预设）、VLAN 端口上的 PTP（网桥 VLAN 表要求以及带标签干线的替代方案）、IGMP snooping 静态 MDB 条目、使用 /system/ptp/status 和 /system/ptp/monitor 进行同步监控，以及支持的设备列表。

## 硬件 {#hardware}

- **[PoE](/docs/hardware/poe-out)**：由原来的 PoE-Out 页面改造成一份通用 PoE 指南，同时涵盖 PoE out（PSE）和 PoE in（PD）。新增 802.3af/at/bt 功率等级表、如何从设备规格判断其支持的被动 PoE、PoE in 配置与供电要求、两个方向的示例、日志与告警，以及故障排查。

## CLI 参考 {#cli-reference}

- **[/tool/netwatch](/docs/cli-reference/tool/netwatch)**、**[/tool/profile](/docs/cli-reference/tool/profile)**、**[/tool/romon](/docs/cli-reference/tool/romon)**、**[/tool/traffic-monitor](/docs/cli-reference/tool/traffic-monitor)**：补充并修正了参数说明：netwatch 探测默认值（包括 simple 探测的 60 秒间隔）、VRF 与链路本地主机语法，以及修正后的 early-detection 说明；profiler 视图；RoMON 端口限制与密钥；traffic-monitor 触发器单位。
- **[/system/health](/docs/cli-reference/system/health)**、**[/system/ptp](/docs/cli-reference/system/ptp)**、**[/system/resource](/docs/cli-reference/system/resource)**、**[/ip/traffic-flow](/docs/cli-reference/ip/traffic-flow)**、**[/interface](/docs/cli-reference/interface)**、**[/interface/monitor-traffic](/docs/cli-reference/interface/monitor-traffic)**：为已重写的页面补充说明：health 读数与风扇设置、PTP profile 预设与端口、resource 计数器与 IRQ/RPS、Traffic Flow 与 IPFIX 字段，以及接口计数器和速率行。
