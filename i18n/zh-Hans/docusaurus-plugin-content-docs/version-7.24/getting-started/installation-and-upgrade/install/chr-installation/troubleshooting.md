---
title: "CHR：故障排除"
description: "本页介绍 MikroTik RouterOS CHR 的故障排除，涵盖 Linux 网桥上的 IGMP snooping 问题、访客与外部网络之间与 VLAN 相关的数据流问题、hypervisor 中的 VLAN 标记要求，以及 VMware 访客自动化的限制。"
tags:
  - 'vlan'
  - 'igmp'
  - 'security-settings'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/troubleshooting
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 在 Linux 上使用网桥 {#using-bridge-on-linux}

如果 Linux 网桥启用了 IGMP snooping，并且遇到 IPv6 流量问题，请禁用该功能。IGMP snooping 会干扰 MLD 数据包（组播），并阻止其通过网桥。

```
echo -n 0 > /sys/class/net/vmbr0/bridge/multicast_snooping
```

### 数据包无法从 Guest 通过 {#packets-not-passing-from-guests}

**问题：** 在 Guest CHR 上配置软件接口（VLAN、EoIP、网桥等）后，路由器停止向外部传递数据。

**解决方案：** 检查虚拟化管理系统（VMS）的安全设置。确认：

- 允许其他 MAC 地址通过
- 允许带 VLAN 标签的数据包通过

根据需要调整安全设置，例如启用 MAC spoofing 或允许特定 MAC 地址范围。对于 VLAN 接口，通常可以定义允许的 VLAN 标签或 VLAN 标签范围。

### 在各种 Hypervisor 中的 CHR 上使用 VLAN {#using-vlans-on-chr-in-various-hypervisors}

CHR 不控制外部 VLAN 标记；它仅处理从虚拟网络接口接收的 VLAN 标记。
在某些 hypervisor 中，必须先在其侧配置 VLAN 标记，然后才能在 CHR 虚拟机中使用。

**有用文章：**

- Hyper-V VLAN 配置（Microsoft 官方文档）：
  - https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/configure-virtual-local-area-networks-for-hyper-v

- 使用 PowerShell 配置 Hyper-V VLAN trunk：
  - https://learn.microsoft.com/en-us/powershell/module/hyper-v/set-vmnetworkadaptervlan?view=windowsserver2025-ps

## VMware 集成说明 {#vmware-integration-notes}

CHR 不支持 VMware Tools 或任何 guest agent 集成。

不支持 guest 级自动化（例如通过 VMware Tools、VIX 或 vSphere API 在 CHR 内运行脚本）。

仅支持电源管理和资源分配等基本 hypervisor 功能。
