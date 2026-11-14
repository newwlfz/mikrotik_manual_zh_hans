---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/troubleshooting"
sidebar_position: 6
title: "CHR：故障排查"
sidebar_label: "CHR：故障排查"
description: "本页介绍 MikroTik RouterOS CHR 的故障排除，涵盖 Linux 网桥上的 IGMP snooping 问题、客户机与外部世界之间与 VLAN 相关的数据流问题、虚拟机管理程序中的 VLAN 标记要求，以及 VMware 客户机自动化的限制。"
tags:
  - 'vlan'
  - 'igmp'
  - 'security-settings'
source: https://manual.mikrotik.com/docs/getting-started/installation-and-upgrade/install/chr-installation/troubleshooting
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 在 Linux 上使用网桥 {#using-bridge-on-linux}

如果 Linux 网桥启用了 IGMP snooping，并且你遇到 IPv6 流量问题，请禁用此功能。IGMP snooping 会干扰 MLD 数据包（多播），并阻止它们通过网桥。

```
echo -n 0 > /sys/class/net/vmbr0/bridge/multicast_snooping
```

### 来自客户机的数据包无法通过 {#packets-not-passing-from-guests}

**问题：** 在客户机 CHR 上配置软件接口（VLAN、EoIP、网桥等）后，路由器停止向外部世界传递数据。

**解决方案：** 检查你的虚拟化管理系统 (VMS) 的安全设置。确认以下内容：

- 允许其他 MAC 地址通过
- 允许带有 VLAN 标签的数据包通过

根据需要调整安全设置——例如，启用 MAC 欺骗或允许特定的 MAC 地址范围。对于 VLAN 接口，通常可以定义允许的 VLAN 标签或 VLAN 标签范围。

### 在各种虚拟机管理程序中的 CHR 上使用 VLAN {#using-vlans-on-chr-in-various-hypervisors}

CHR 不控制外部 VLAN 标记；它只处理从虚拟网络接口接收到的 VLAN 标签。
在某些虚拟机管理程序中，必须先在其管理程序侧配置 VLAN 标记，然后才能在 CHR 虚拟机内使用。

**实用文章：**

- Hyper-V VLAN 配置（Microsoft 官方文档）：
  - https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/configure-virtual-local-area-networks-for-hyper-v

- 使用 PowerShell 配置 Hyper-V VLAN 中继：
  - https://learn.microsoft.com/en-us/powershell/module/hyper-v/set-vmnetworkadaptervlan?view=windowsserver2025-ps

## VMware 集成说明 {#vmware-integration-notes}

CHR 不支持 VMware Tools 或任何客户机代理集成。

客户机级别的自动化（例如通过 VMware Tools、VIX 或 vSphere API 在 CHR 内运行脚本）不可用。

仅支持电源管理和资源分配等基本虚拟机管理程序功能。
