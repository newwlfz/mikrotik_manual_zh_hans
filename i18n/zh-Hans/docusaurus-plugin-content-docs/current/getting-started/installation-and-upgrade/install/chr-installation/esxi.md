---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/esxi"
sidebar_position: 2
title: "CHR：VMware ESXi 安装"
sidebar_label: "CHR：VMware ESXi 安装"
description: "本页介绍在 VMware ESXi 上安装与配置 MikroTik CHR 的方法，涵盖受支持的网络接口（vmxnet3、E1000）与磁盘控制器（IDE、VMware Paravirtual SCSI），并说明如何通过调整 MTU 设置和重新配置接口来启用巨型帧。"
tags:
  - 'vmware-esxi'
  - 'mtu'
  - 'jumbo-frames'
source: https://manual.mikrotik.com/docs/getting-started/installation-and-upgrade/install/chr-installation/esxi
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 支持的网络和磁盘接口 {#supported-network-and-disk-interfaces}

### VMware ESXi {#vmware-esxi}

**网络适配器：**

- vmxnet3
- E1000

**磁盘控制器：**

- IDE
- VMware Paravirtual SCSI
- LSI Logic SAS
- LSI Logic Parallel

#### ESXi {#esxi}

在将用于该 VM 的端口组或虚拟交换机上启用混杂模式。

**ESXi 文档：**

- https://kb.vmware.com/kb/1004099

### 在 VMware ESXi 上运行 {#running-on-vmware-esxi}

#### 更改 MTU {#changing-mtu}

VMware ESXi 支持最高 9000 字节的 MTU 值。要利用巨型帧，请调整 ESXi 安装以允许更高的 MTU。

**重要：** 在 MTU 更改**之后**添加的虚拟以太网接口将正确支持巨型帧。但是，在 MTU 更改**之前**添加的接口将限制为原始 MTU 值。如果你在更改 MTU 之前配置了接口，则必须将它们从虚拟客户机中移除并重新添加。

**示例：** 添加到 ESXi 客户机的两个接口会根据添加时间显示不同的 MTU 值：

```
[admin@chr-vm] > interface ethernet print 
Flags: X - disabled, R - running, S - slave 
 #    NAME           MTU MAC-ADDRESS       ARP       
 0 R  ether1        9000 00:0C:29:35:37:5C enabled   
 1 R  ether2        1500 00:0C:29:35:37:66 enabled
```
