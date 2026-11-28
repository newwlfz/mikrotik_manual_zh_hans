---
title: "接地"
description: "MikroTik RouterOS 设备的接地要求强调正确安装屏蔽电缆、避雷器和可靠的接地基础设施，使用 2.5-4 mm² 铜线和耐腐蚀连接器，并包括 RouterBOARD 单元上的特定连接点。"
tags:
  - 'grounding'
source: https://manual.mikrotik.com/docs/7.24/hardware/grounding
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

屏蔽线缆安装基础设施（塔和桅杆）、天线以及路由器本身都必须正确接地。所有外部天线线缆都必须安装避雷器（靠近天线或安装在天线上），以防止设备损坏和人员伤害。请注意，如果避雷器未正确接地，将无法发挥作用。

使用 2.5-4 mm² Cu（AWG 11–13）线缆和耐腐蚀连接器进行接地。确保所使用的接地基础设施功能完整（而非仅作装饰，某些安装中会出现这种情况）：

1. 对于屏蔽连接器，请使用屏蔽线缆，因为它们提供更好的抗干扰能力。
2. 接地线应连接到 RouterBOARD 接地线连接点（如果提供该连接点）。然后，该线缆应连接到塔基，确保连接符合接地标准。天线的接地线应连接在 RouterBOARD 户外机箱附近，并且可以与 RouterBOARD 使用的同一接地线连接。

## 屏蔽 RJ45 端口与非屏蔽 RJ45 端口的对比 {#shielded-rj45-port-vs-unshielded-rj45-port}

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
如果 Power Sourcing Equipment（PSE）的正极连接到 Protective Earth（PE），则不要使用它为 MikroTik 设备供电。否则可能导致短路，造成人身伤害和设备损坏。
:::
