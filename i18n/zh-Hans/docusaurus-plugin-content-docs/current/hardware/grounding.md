---
sidebar_key: "hardware/grounding"
sidebar_position: 2
title: "接地"
sidebar_label: "接地"
description: "MikroTik RouterOS 设备的接地要求强调正确安装屏蔽电缆、避雷器和可靠的接地基础设施，使用 2.5-4 mm² Cu 导线和耐腐蚀连接器，包括 RouterBOARD 单元上的特定连接点。"
tags:
  - 'grounding'
source: https://manual.mikrotik.com/docs/hardware/grounding
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

屏蔽电缆安装基础设施（塔架和桅杆）以及天线和路由器本身都必须正确接地。必须在所有外部天线电缆上（靠近天线处或天线自身上）安装避雷器，以防止设备损坏和人身伤害。请注意，如果避雷器没有正确接地，就不会有效。

接地时请使用 2.5-4 mm² 铜（AWG 11–13）导线和耐腐蚀连接器。确保所使用的接地基础设施完全有效（而不只是摆设，正如在某些安装中所见）：

1. 对于屏蔽连接器，请使用屏蔽电缆，因为它们具有更好的抗干扰能力。
2. 如果提供了 RouterBOARD 接地线连接点，则应将接地线连接到该连接点。然后，该导线应连接到塔架底部，确保连接符合接地标准。天线的接地线应连接在 RouterBOARD 室外机箱附近，并且可以与用于 RouterBOARD 的同一接地线连接。

## 屏蔽 RJ45 端口与非屏蔽 RJ45 端口 {#shielded-rj45-port-vs-unshielded-rj45-port}

### 带屏蔽端口的设备 {#device-with-shielded-ports}

![shielded.png](/img/48f8692224741bf1.webp)
![](/img/530cf2c71e14e527.png)

### 带非屏蔽端口的设备 {#device-with-unshielded-ports}

![unshielded.png](/img/7b2658fdb11cb76d.webp)

### 带屏蔽连接器的 PoE 注入器 {#poe-injector-with-shielded-connectors}

![poeinjector.png](/img/deaecaccb525b0c4.webp)

## RouterBOARD 接地线连接点 {#routerboard-grounding-wire-attachment-points}

![](/img/c43fbb0b3ab9927f.webp)

![screw1.png](/img/01c1bd7ce52982e8.webp)

![screw2.png](/img/0d587a5baaa43769.webp)

:::info
如果为 MikroTik 设备供电，则不应使用正极连接到保护接地（PE）的供电设备（PSE）。这可能导致短路，对您和您的设备造成伤害。

:::
