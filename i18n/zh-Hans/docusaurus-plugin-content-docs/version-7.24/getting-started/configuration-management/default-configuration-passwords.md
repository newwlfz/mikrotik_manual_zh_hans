---
title: "默认配置密码"
description: "查找刚出厂或完全重置后的 MikroTik RouterOS 设备的默认登录凭据。"
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/default-configuration-passwords
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik 设备出厂时带有默认配置，其中包含预设密码。执行标准系统重置时，会重新应用同一密码。了解如何找到该密码对于首次访问设备至关重要。

:::tip[观看官方讲解]
[默认密码：为什么？！](https://www.youtube.com/watch?v=mq7nIIILrVc) — 简要介绍为什么 MikroTik 设备现在出厂时带有唯一密码。
:::

早期 MikroTik 型号通常使用用户名 `admin` 且没有密码 — 登录时输入 `admin`，出现提示后按 **Enter**。较新型号在制造时会为每台设备生成唯一的默认密码。

:::note[定制品牌设备]
定制品牌或 OEM 设备可能使用不同的默认密码。如果找不到标准标签，仍可使用 **[Netinstall utility](/docs/getting-started/installation-and-upgrade/netinstall)** 重置设备。
:::

## 在哪里查找密码 {#where-to-find-the-password}

默认密码印在多个物理位置：

- 设备本体上的序列号标签
- 设备包装上的序列号标签
- 产品包装盒内附带的印刷版快速指南

部分 MikroTik [室内无线](https://mikrotik.com/products/indoor-wireless)设备（例如 [hAP ac³](https://mikrotik.com/product/hap_ac3) 和 [hAP ax³](https://mikrotik.com/product/hap_ax3)）带有专用的 **product information compartment** — 设备底部的小面板，内部贴有包含默认凭据的标签。请查找以太网端口附近或 RF 连接器盖下方的隔层。打开面板即可查看内部标签上印制的序列号和默认密码。

:::warning

联系支持之前，请务必检查这些标签。密码仅印在实体材料上，不会以数字形式存储在任何在线系统中。
:::

## 如果找不到密码 {#if-you-cannot-find-the-password}

如果标签缺失或无法辨认，请联系提供设备的 MikroTik 经销商。提供设备序列号以及购买设备的卖家或店铺名称。经销商维护密码数据库，可根据序列号检索默认密码。

:::tip

观看我们的视频指南：[Secret CSV password file for seamless configuration](https://www.youtube.com/watch?v=q9F871KkGBw) — 了解如何使用 CSV 密码文件自动配置设备。
:::

如果无法联系经销商或无法检索密码，仍可通过使用 **[Netinstall](/docs/getting-started/installation-and-upgrade/netinstall)** **重新安装 RouterOS**，或执行 **[完整配置重置](/docs/getting-started/configuration-management/routeros-configuration-reset)** 来恢复访问权限。

:::tip[Mass-configuration with Flashfig]

如需批量部署多台设备，请使用 Flashfig 工具：

- [Mass-config MikroTik with flashfig](https://www.youtube.com/watch?v=gticPeOdN54)（Windows）
- [Mass-config MikroTik with flashfig from Linux](https://www.youtube.com/watch?v=xasM81Qc11g)（Linux）
:::
