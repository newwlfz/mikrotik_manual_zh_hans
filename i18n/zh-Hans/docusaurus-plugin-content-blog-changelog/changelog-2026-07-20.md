---
title: "文档更新 - 2026年7月20日"
date: 2026-07-20
slug: /changelog-2026-07-20
source: https://manual.mikrotik.com/changelog/changelog-2026-07-20
captured_at: '2026-11-04T06:08:16+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 20 日文档变更摘要。

## 站点 {#site}

- **文档版本控制**：当前文档已冻结为版本 **7.24**，现在可以从版本下拉菜单中选择。冻结版本不会被搜索引擎索引，对于当前文档中仍然存在的页面，站点搜索也不再返回来自冻结版本的重复结果。

## 身份验证与 AAA {#authentication--aaa}

- **[证书](/docs/authentication-authorization-accounting/certificates)**：文档中每个证书属性现在都会链接回证书存储。受影响的页面包括 [RADIUS](/docs/authentication-authorization-accounting/radius)、[User Manager](/docs/authentication-authorization-accounting/user-manager)、[Container apps](/docs/containers/apps)、[LoRa](/docs/internet-of-things/lora/general-properties)、[MQTT](/docs/internet-of-things/mqtt)、[Wiliot](/docs/internet-of-things/wiliot)、[TR-069](/docs/management-tools/tr-069)、[OpenFlow](/docs/network-management/openflow)、[Fetch](/docs/system-information-and-utilities/fetch)、[IPsec](/docs/virtual-private-networks/ipsec)、[OpenVPN](/docs/virtual-private-networks/openvpn) 和 [SSTP](/docs/virtual-private-networks/sstp)。

## 无线 {#wireless}

- **[WiFi](/docs/wireless/wifi)**：澄清了 Network 部分——不带标签的 /interface/wifi/network 条目会应用于所有接口，并且示例现在标注为 network 和 radio 预设。MLO 示例增加了一个 security.passphrase 值。
