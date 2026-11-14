---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/ip-scan"
sidebar_position: 16
title: "IP 扫描"
sidebar_label: "IP 扫描"
description: "RouterOS 中的 IP Scan 工具会扫描网络以查找活动设备，收集 IP 地址、MAC 地址、响应时间、DNS 名称、SNMP 字符串和 NET-BIOS 名称。它可以按 IPv4 前缀或接口监听进行扫描，并带有针对冲突设置的警告。"
tags:
  - 'ip'
  - 'arp'
  - 'scanning'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/ip-scan
captured_at: '2026-11-04T11:27:56+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP 扫描工具允许用户基于某个网络前缀或通过设置要监听的接口来扫描网络。无论采用哪种方式，该工具都会从网络中收集特定数据：

- address - 网络设备的 IP 地址。
- mac-address - 网络设备的 MAC 地址。
- time - 发现网络设备时的响应时间。
- DNS - 网络设备的 DNS 名称。
- SNMP - 设备的 SNMP 名称。
- NET-BIOS  - 设备通告的 NET-BIOS 名称（如果设备通告了该名称）。

使用 IP 扫描工具时，用户必须选择要扫描的内容：

- 特定的 IPv4 前缀 - 该工具将尝试扫描所有 IP 地址或已设置的地址。
- 路由器的接口 - 该工具将尝试监听“经过”的数据包，并在有所发现时尝试汇总结果。

:::danger
可以同时设置两者，但此时结果可能不确定！
:::

## 快速示例 {#quick-example}

`/tool/ip-scan` 实用程序是用户发现特定 IP 范围内活动主机的重要诊断工具。它在识别未授权设备、验证 IP 地址分配或在缺少文档时梳理网段方面尤为有用。通过发送 ICMP 和 ARP 请求，它可以实时概览可达地址、其关联的 MAC 地址，甚至兼容设备的 SNMP 身份字符串。

该工具常用于初始站点审计，或在动态 DHCP 环境中排查连接问题时使用。通过对本地子网运行扫描，你可以快速将物理硬件与逻辑 IP 地址关联起来，以检测 IP 冲突或流氓接入点。这种可见性对于维护网络完整性、确保所有已连接基础设施符合预期部署拓扑至关重要。

在以下示例中，我们将扫描 10.155.126.0/24 网络上的设备：

```ros
[admin@MikroTik] > /tool/ip-scan address-range=10.155.126.1-10.155.126.255
Columns: ADDRESS, MAC-ADDRESS, TIMe, SNMP
  ADDRESS         MAC-ADDRESS        TIM  SNMP     
  10.155.126.1    E4:8D:8C:1C:D3:18  2ms  CCR1036-8G-2S+
  10.155.126.251                     2ms           
  10.155.126.151  E4:8D:8C:49:49:DB  1ms           
  10.155.126.153  6C:3B:6B:48:0E:8B  1ms  750Gr3         
  10.155.126.249  CC:2D:E0:8D:01:88  0ms  CRS328-24P-4S+   
  10.155.126.250  B8:69:F4:B3:1B:D2  0ms           
  10.155.126.252  6C:3B:6B:ED:83:69  0ms           
  10.155.126.253  6C:3B:6B:ED:81:83  0ms
```
