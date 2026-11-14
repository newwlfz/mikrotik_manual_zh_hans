---
sidebar_key: "getting-started/configuration-management/default-configuration-passwords"
sidebar_position: 2
title: "默认配置密码"
sidebar_label: "默认配置密码"
description: "查找 MikroTik RouterOS 设备在出厂全新状态或完全重置后的默认登录凭据。"
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/default-configuration-passwords
captured_at: '2026-11-04T11:28:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik 设备出厂时带有默认配置，其中包含预设密码。每当执行标准系统重置时，都会重新应用相同的密码。了解如何找到此密码对于初始设备访问至关重要。

:::tip[观看我们的官方讲解]
[默认密码：为什么？！](https://www.youtube.com/watch?v=mq7nIIILrVc) — 简要概述为什么 MikroTik 设备现在出厂时带有唯一的出厂密码。
:::

早期的 MikroTik 型号通常使用用户名 `admin`，且没有密码——输入 `admin` 作为登录名，并在提示时按 **Enter**。后续型号在出厂时每台设备都带有唯一的默认密码。

:::note[定制品牌设备]
定制品牌或 OEM 设备可能具有不同的默认密码。如果找不到标准标签，仍可使用 **[Netinstall 实用程序](../installation-and-upgrade/netinstall/index.md)** 重置设备。
:::

## 在哪里查找密码 {#where-to-find-the-password}

默认密码印在多个物理位置：

- 在设备本身上，位于序列号标签上
- 在设备包装上，同样位于序列号标签上
- 在产品盒内随附的印刷版快速指南页上

部分 MikroTik [室内无线](https://mikrotik.com/products/indoor-wireless) 设备（例如 [hAP ac³](https://mikrotik.com/product/hap_ac3) 和 [hAP ax³](https://mikrotik.com/product/hap_ax3)）带有专用的 **产品信息隔间**——这是设备底部的一个小面板，里面放有带默认凭据的标签。请在 Ethernet 端口附近或 RF 连接器盖下方寻找该隔间。打开面板，即可看到内部标签上印有的序列号和默认密码。

:::warning

在联系支持之前，请务必检查这些标签。密码只印在物理材料上——它不会以数字形式存储在任何在线系统中。

:::

## 如果找不到密码 {#if-you-cannot-find-the-password}

如果标签缺失或无法辨认，请联系供应此设备的 MikroTik 分销商。请提供设备序列号以及您购买该设备的卖家或商店名称。分销商维护有密码数据库，可以从序列号检索默认密码。

:::tip

观看我们的视频指南：[用于无缝配置的秘密 CSV 密码文件](https://www.youtube.com/watch?v=q9F871KkGBw) ——了解如何使用 CSV 密码文件进行自动化设备设置。

:::

如果无法联系分销商或无法找回密码，您仍可通过使用 **[网络安装](../installation-and-upgrade/netinstall/index.md)** **重新安装 RouterOS**，或执行 **[完整配置重置](./routeros-configuration-reset.md)**，来重新获得访问权限。

:::tip[使用 Flashfig 进行批量配置]

要大规模部署多台设备，请使用 Flashfig 工具：

- [使用 flashfig 批量配置 MikroTik](https://www.youtube.com/watch?v=gticPeOdN54)（Windows）
- [在 Linux 上使用 flashfig 批量配置 MikroTik](https://www.youtube.com/watch?v=xasM81Qc11g)（Linux）

:::
