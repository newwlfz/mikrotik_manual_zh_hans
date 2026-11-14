---
sidebar_key: "storage/iscsi"
sidebar_position: 4
title: "iSCSI"
sidebar_label: "iSCSI"
description: "iSCSI 支持基于 IP 的存储访问，RouterOS 同时支持 target 和 initiator 模式，并提供 `iscsi-address`、IQN 标识符以及客户端和服务器角色可配置端口等属性。"
tags:
  - 'iscsi'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.25/storage/iscsi
captured_at: '2026-11-04T11:21:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

iSCSI 允许通过基于 IP 的网络访问存储。在发起端（客户端）上，iSCSI 设备会显示为本地块设备。RouterOS 同时支持目标端和发起端模式：目标端导出磁盘或文件（在主机设备上设置 `iscsi-export=yes`），发起端则通过网络将远程目标挂载为新设备。

iSCSI 服务器默认监听 TCP 端口 3260。服务器默认呈现的 IQN 标识符格式为 `iqn.2000-02.com.mikrotik:<slot>`。

## 配置示例 {#configuration-example}

主机：使用以下命令导出磁盘：

```ros
/disk set pcie1-nvme1 iscsi-export=yes
```

客户端：添加一个 `type=iscsi` 的设备，并将其指向服务器地址和 IQN：

```ros
/disk add type=iscsi iscsi-address=192.168.1.1 iscsi-iqn=iqn.2000-02.com.mikrotik:pcie1-nvme1
```

随后，挂载的设备会在 `/disk/print` 中显示为普通块设备，并可在本地进行格式化和使用。
