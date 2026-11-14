---
title: "文档更新 - 2026年10月8日"
date: 2026-10-08
slug: /changelog-2026-10-08
source: https://manual.mikrotik.com/changelog/changelog-2026-10-08
captured_at: '2026-11-04T06:08:59+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 8 日文档变更摘要。

## 存储 {#storage}

- **[Btrfs RAID](/docs/storage/btrfs/raid)**：新增“扩展 Btrfs-RAID”指南。使用 add-device 添加成员时，每块磁盘都按其完整容量登记，但在 balance-start 转换配置档之前不会移动任何数据（两块盘的 RAID1 会变成四块盘的 RAID10，可用容量翻倍）。

## 管理工具 {#management-tools}

- **[CMR](/docs/management-tools/cmr)**：澄清了配对方式：每条 pair 命令都使用另一台设备的用户名和密码——服务器的 [/cmr/device/pair](/docs/cli-reference/cmr/device/pair) 使用客户端的用户，客户端的 [/cmr/client/pair](/docs/cli-reference/cmr/client/pair) 使用服务器的用户。配对通常可以在一个控制台上完成；只有 confirm 会强制在服务器控制台上执行操作。新增示例按各设备自带的初始密码来配对：在每台设备上各运行一次 /cmr/device/pair username=admin password=&lt;来自该设备的密码&gt;，并使用 labels 而不是 all 来把一次运行限制在部分设备上。

## 无线 {#wireless}

- **[Wi-Fi](/docs/wireless/wifi)**：该页面现在在 Wi-Fi 6/7 之外也涵盖 Wi-Fi HaLow（802.11ah）接口。Network 部分说明了 provisioning：labels 默认为 all，每个 radio 会自动获得诸如 2ghz、5ghz 和 6ghz 以及其 MAC 地址的标签，- 用于否定某个标签，extra-labels 则分配更多标签。新增“转换为网络管理的 Wi-Fi / 从网络管理的 Wi-Fi 转换”部分：RouterOS 选择配置时所遵循的顺序（static entry、provisioning、network、disabled stub），以及如何使用 provision 和 /interface/wifi/liberate 进行转换。Radio capabilities 现在记录了每个 hw-caps 值（channel-switch、hw-protection-mode、qos-classifier-dscp、sniffer、spectral），新增的“Radio settings”部分涵盖 /interface/wifi/radio/settings（default-country、external-antenna、wifi-band）。
- **[Wi-Fi](/docs/wireless/wifi)**：同一轮修改中的更正：警告已移至其所属的参数（加密算法、802.11r 漫游），澄清了 distance 和 vlan-id 的说明（HaLow 与 wifi-qcom-ac 不会卸载 VLAN），并修复了 spectral scan/history 与 WPS 客户端示例。
