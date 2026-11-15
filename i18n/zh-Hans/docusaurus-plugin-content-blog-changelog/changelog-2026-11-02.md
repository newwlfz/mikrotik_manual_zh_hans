---
title: "文档更新 - 2026年11月2日"
date: 2026-11-02T00:00:00.000Z
slug: /changelog-2026-11-02
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年11月2日 {#documentation-updates---november-2-2026}

November 2, 2026

2026年11月2日所做文档变更的摘要。

## 无线 {#wireless}

-   **[WiFi CAPsMAN](/docs/wireless/wifi/capsman)**：针对 Wi-Fi 7 CAP 的新 MLO 指南。组成 MLD 的所有接口必须使用相同的 SSID；新增示例通过 `multi-link-mode=auto` 配置射频（或使用 `master` 使虚拟接口保持非 MLO），而 MLO CAP 需要在 `/interface/wifi/cap` 下设置 `mld-datapath=capdp`。对于带 VLAN 的 MLO，仅启用 `wpa3-psk`，在 provisioning 规则中匹配 Wi-Fi 7 频段（或对所有频段使用一条规则），并设置 `multi-link-mode`。CAPsMAN 转发（`traffic-processing=on-capsman`）尚不支持 MLO，[Wi-Fi](/docs/wireless/wifi) 的 `traffic-processing` 说明中也提到了这一点。CAP 示例涵盖 `wifi-qcom` 和 `wifi-mediatek` 两个软件包。

## VPN {#vpn}

-   **[IPsec](/docs/virtual-private-networks/ipsec#route-based-ipsec-with-xfrm-interfaces)**：新增“使用 XFRM 接口的基于路由的 IPsec”章节。XFRM 接口绑定到 IPsec 策略组，流量被路由到该接口中，而不是仅由策略选择器匹配，因此动态路由协议可以在隧道上运行，路由标记或 VRF 可以将流量引导到该接口。一个双路由器示例涵盖了两端的配置以及如何验证。参考文档描述了标志和参数（`mtu` 默认为 `1400`）。同样收录于 7.25 手册中。

## 硬件 {#hardware}

-   **[NetMetal ax](/hardware/netmetal-ax)**：修正了供电说明：以太网端口接受被动 PoE（18–28 V），而非 802.3af/at。新增规格表（IPQ-5010 CPU、256 MB RAM、128 MB NAND、2.4 和 5 GHz 802.11ax 射频、一个 2.5G SFP 端口、miniPCIe 和一个 Nano SIM 插槽，工作温度 −40 °C 至 +70 °C）。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
