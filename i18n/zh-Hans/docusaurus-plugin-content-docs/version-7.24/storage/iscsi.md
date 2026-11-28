---
title: "iSCSI"
description: "iSCSI 支持基于 IP 的存储访问，RouterOS 同时支持 target 和 initiator 模式，并提供 iSCSI 地址、IQN 标识符以及可用于客户端和服务器角色的可配置端口等属性。"
tags:
  - 'iscsi'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/storage/iscsi
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

iSCSI 允许通过基于 IP 的网络访问存储。在 initiator 上，iSCSI 设备将显示为块设备。RouterOS 支持 target 和 initiator 两种模式。

## 属性 {#properties}

| Property | Description |
| :-- | :-- |
| **iscsi-address** | iSCSI 目标的 IP 地址。（主机设备 IP） |
| **iscsi-export** | 禁用/启用主机设备上的 iSCSI |
| **iscsi-iqn** | 用于命名 iSCSI 目标的唯一标识符。 |
| **iscsi-port** | iSCSI 目标用于侦听来自 initiator 的传入连接的网络端口。iSCSI 流量的默认端口为 3260。 |
| **iscsi-server-iqn** | iSCSI 服务器使用的唯一标识符。默认情况下，IQN 的格式为 iqn.2000-02.com.mikrotik:*slot（从 7.21beta2 开始） |
| **iscsi-server-port** | iSCSI 服务器使用的网络端口。*（从 7.21beta2 开始）* |

## 配置示例 {#configuration-example}

Host

```ros
/disk
set pcie1-nvme1 iscsi-export=yes
```

Client

```ros
/disk
add type=iscsi iscsi-address=192.168.1.1 iscsi-iqn=iqn.2000-02.com.mikrotik:pcie1-nvme1
```
