---
title: "CHR：VMWare ESXi 安装"
description: "本页介绍在 VMware ESXi 上安装和配置 MikroTik CHR，涵盖支持的网络接口（vmxnet3、E1000）和磁盘控制器（IDE、VMware Paravirtual SCSI），并说明如何通过调整 MTU 设置和重新配置接口来启用巨型帧。"
tags:
  - 'vmware-esxi'
  - 'mtu'
  - 'jumbo-frames'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/esxi
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 支持的网络和磁盘接口 {#supported-network-and-disk-interfaces}

### VMware ESXi

**网络适配器：**

- vmxnet3
- E1000

**磁盘控制器：**

- IDE
- VMware Paravirtual SCSI
- LSI Logic SAS
- LSI Logic Parallel

#### ESXi

在将用于 VM 的端口组或虚拟交换机中启用 Promiscuous mode。

**ESXi 文档：**

- https://kb.vmware.com/kb/1004099

### 在 VMware ESXi 上运行 {#running-on-vmware-esxi}

#### 修改 MTU {#changing-mtu}

VMware ESXi 支持最高 9000 字节的 MTU 值。要使用巨型帧，请调整 ESXi 安装以允许更高的 MTU。

**重要：** 在 MTU 修改**之后**添加的虚拟以太网接口将正确支持巨型帧。但是，在 MTU 修改**之前**添加的接口将受限于原始 MTU 值。如果在修改 MTU 之前已配置接口，必须从虚拟机中移除并重新添加这些接口。

**示例：** 添加到 ESXi 客户机的两个接口根据添加时间显示不同的 MTU 值：

```
[admin@chr-vm] > interface ethernet print 
Flags: X - disabled, R - running, S - slave 
 #    NAME           MTU MAC-ADDRESS       ARP       
 0 R  ether1        9000 00:0C:29:35:37:5C enabled   
 1 R  ether2        1500 00:0C:29:35:37:66 enabled
```
