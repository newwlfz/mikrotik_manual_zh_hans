---
sidebar_key: "storage/iscsi"
sidebar_position: 4
title: "iSCSI"
sidebar_label: "iSCSI"
description: "iSCSI 支持基于 IP 的存储访问，RouterOS 同时支持 target 和 initiator 模式，并提供 iSCSI 地址、IQN 标识符以及用于客户端和服务器角色的可配置端口等属性。"
tags:
  - 'iscsi'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/storage/iscsi
captured_at: '2026-11-04T11:33:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

iSCSI 允许通过基于 IP 的网络访问存储。在发起端上，iSCSI 设备将显示为块设备。RouterOS 同时支持 target 和 initiator 模式。

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **iscsi-address** | iSCSI target 的 IP 地址。（主机设备 IP） |
| **iscsi-export** | 在主机设备上禁用/启用 iSCSI |
| **iscsi-iqn** | 用于命名 iSCSI target 的唯一标识符。 |
| **iscsi-port** | iSCSI target 用于监听来自发起端传入连接的网络端口。iSCSI 流量的默认端口是 3260。 |
| **iscsi-server-iqn** | iSCSI 服务器使用的唯一标识符。默认情况下，IQN 的格式为 iqn.2000-02.com.mikrotik:*slot（从 7.21beta2 开始）* |
| **iscsi-server-port** | iSCSI 服务器使用的网络端口。*（从 7.21beta2 开始）* |

## 配置示例 {#configuration-example}

主机

```ros
/disk
set pcie1-nvme1 iscsi-export=yes
```

客户端

```ros
/disk
add type=iscsi iscsi-address=192.168.1.1 iscsi-iqn=iqn.2000-02.com.mikrotik:pcie1-nvme1
```
