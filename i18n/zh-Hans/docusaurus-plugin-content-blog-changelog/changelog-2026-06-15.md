---
title: "文档更新 - 2026年6月15日"
date: 2026-06-15
slug: /changelog-2026-06-15
source: https://manual.mikrotik.com/changelog/changelog-2026-06-15
captured_at: '2026-11-04T06:07:59+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 15 日文档变更摘要。

## 认证与 AAA {#authentication--aaa}

- **[Certificates](/docs/authentication-authorization-accounting/certificates)**：澄清了证书属性描述——现在将 digest-algorithm 描述为用于对证书进行签名的哈希算法，将 invalid-before/invalid-after 描述为有效期的开始日期和到期日期；同时修正了 key-usage 值的格式。这属于对 dot1x、PPP AAA、RADIUS 和 User Manager 页面进行更广泛措辞修正的一部分。
- **[HotSpot Customisation](/docs/authentication-authorization-accounting/hotspot-captive-portal/hotspot-customisation)**：对 HotSpot 自定义指南进行了小幅修正。

## 桥接与交换 {#bridging--switching}

- **[Cannot upgrade SwOS](/docs/bridging-and-switching/swos/troubleshooting)**：新增了一份故障排除指南，涵盖 SwOS 升级失败后的恢复。其中包括针对仅运行 SwOS 的设备（CSS106、CSS326、CSS610）使用硬件复位以引导进入备份固件的分步操作流程，以及双启动设备（CRS3xx）的串口控制台恢复、通过 /system swos upgrade 进行的 RouterOS CLI 升级，以及 RouterOS 7.17+ 中的 device-mode 限制。
- **[CRS1xx/2xx series switches](/docs/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples)**：修正了单播 FDB 容量的表述（最多 16k 条 MAC 表项）以及巨型帧的数值。相关修正还涉及 L3 Hardware Offloading（默认值、lpm-usage 表述）、MACsec 示例以及 VLAN（disabled 属性描述）页面。
- **[Bridging & Switching Case Studies](/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping)**：展开了 SDVoE 这一缩写（Software Defined Video over Ethernet），并修正了 IGMP/MLD 侦听及相关案例示例中的 VLAN 优先级值。

## 容器 {#containers}

- **[Container Apps](/docs/containers/apps/available-apps)**：修正了可用应用列表中的若干应用描述（conduit、mediamanager、prowlarr、webtop），并澄清了 network-outgoing-access 参数——当其设为 no 时会创建一条 mangle drop 规则。此外还对 HAProxy、Home Assistant、Matrix Synapse、Mosquitto、ThingsBoard 和 FreeRADIUS 示例进行了小幅格式修正。
- **[Mosquitto MQTT Server](/docs/containers/user-guides/container-mosquitto-mqtt-server)**：修复了一个失效的防火墙文档链接。

## 物联网 {#internet-of-things}

- **[The Things Stack](/docs/internet-of-things/lora/user-guides/the-things-stack)**：为传统 UDP 场景和现代 LNS/CUPS（LoRa Basics Station）场景新增了网关注册步骤，包括相应的 RouterOS 配置以及关于为 lora 服务使用内置信任存储的说明。

## 无线 {#wireless}

- **[Wireless](/docs/wireless)**：按产品/技术系列重新组织了无线章节——拆分为 Wi-Fi 6/6E (802.11ax)、Wi-Fi 5 (802.11ac) 和 802.11 a/b/g/n 三个独立部分——并在概览页面上提供了设备分流指南、统一的章节简介、入门链接、CAPsMAN 相互交叉引用，同时移除了过时的版本说明。
- **[Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac)**：新增了一条警告，指出 wifi-qcom-ac 驱动占用资源较多，建议 802.11ac 设备使用原有的轻量级无线驱动。
