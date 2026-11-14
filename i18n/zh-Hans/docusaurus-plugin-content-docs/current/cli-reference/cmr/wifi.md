---
sidebar_key: "cli-reference/cmr/wifi"
title: "wifi"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/wifi
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/wifi {#cmrwifi}
**软件包：** cmr
**类型：** 目录

复制到所选设备的 WiFi 网络定义。这些参数扩展了标准的 RouterOS `/interface/wifi` 配置参数。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">WiFi 网络已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">选择使用标签将 WiFi 网络复制到的设备。分别支持 + 和 - 符号作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num" unset="1">应用于网络的 VLAN ID：none（默认）或 1-4095。</ArgTableRow>
<ArgTableRow arg="mlo" typ="bool" unset="1">启用 MLO（多链路操作）。</ArgTableRow>
<ArgTableRow arg="ssid" typ="string" unset="1">网络 SSID。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (ap | station | station-bridge | station-pseudobridge)" unset="1">网络运行模式。</ArgTableRow>
<ArgTableRow arg="hide-ssid" typ="bool" unset="1">在信标帧中隐藏 SSID。</ArgTableRow>
<ArgTableRow arg="beacon-interval" typ="time" unset="1">信标间隔。</ArgTableRow>
<ArgTableRow arg="dtim-period" typ="num" unset="1">DTIM 周期。</ArgTableRow>
<ArgTableRow arg="multicast-enhance" typ="enum (disabled | enabled) { disabled:0, enabled:1 }" unset="1">组播增强：`disabled` 或 `enabled`。</ArgTableRow>
<ArgTableRow arg="qos-classifier" typ="enum (priority | dscp-high-3-bits) { priority:0, dscp-high-3-bits:1 }" unset="1">QoS 分类器：`priority` 或 `dscp-high-3-bits`。</ArgTableRow>
<ArgTableRow arg="station-roaming" typ="bool" unset="1">启用站点漫游。</ArgTableRow>
<ArgTableRow arg="max-clients" typ="num" unset="1">已连接客户端的最大数量。</ArgTableRow>
<ArgTableRow arg="hw-protection-mode" typ="enum (none | rts-cts | cts-to-self)" unset="1">硬件保护模式：`none`、`rts-cts`、`cts-to-self`。</ArgTableRow>
<ArgTableRow arg="security.encryption" typ="ubit (tkip, ccmp, gcmp, ccmp-256, gcmp-256)" unset="1">允许的加密算法。</ArgTableRow>
<ArgTableRow arg="security.group-encryption" typ="enum (tkip | ccmp | gcmp | ccmp-256 | gcmp-256)" unset="1">组加密算法。</ArgTableRow>
<ArgTableRow arg="security.group-key-update" typ="time" unset="1">组密钥更新间隔。</ArgTableRow>
<ArgTableRow arg="security.passphrase" typ="string" unset="1">网络密码短语。</ArgTableRow>
<ArgTableRow arg="security.multi-passphrase-group" typ="enum" unset="1">多密码短语组。</ArgTableRow>
<ArgTableRow arg="security.disable-pmkid" typ="bool" unset="1">禁用 PMKID。</ArgTableRow>
<ArgTableRow arg="security.management-protection" typ="enum (disabled | allowed | required)" unset="1">管理帧保护：`disabled`、`allowed`、`required`。</ArgTableRow>
<ArgTableRow arg="security.beacon-protection" typ="enum (disabled | enabled)" unset="1">信标保护：`disabled` 或 `enabled`。</ArgTableRow>
<ArgTableRow arg="security.management-encryption" typ="enum (cmac | gmac | cmac-256 | gmac-256)" unset="1">管理帧加密密码算法。</ArgTableRow>
<ArgTableRow arg="security.wps" typ="enum (disable | push-button)" unset="1">WPS 模式：`disable` 或 `push-button`。</ArgTableRow>
<ArgTableRow arg="security.dh-groups" typ="ubit (19, 20, 21)" unset="1">SAE Diffie-Hellman 组。</ArgTableRow>
<ArgTableRow arg="security.sae-anti-clogging-threshold" typ="num" unset="1">SAE 防拥塞阈值。</ArgTableRow>
<ArgTableRow arg="security.sae-max-failure-rate" typ="num" unset="1">SAE 最大失败率。</ArgTableRow>
<ArgTableRow arg="security.sae-pwe" typ="enum (hunting-and-pecking | hash-to-element | both)" unset="1">SAE PWE 派生方式：`hunting-and-pecking`、`hash-to-element`、`both`。</ArgTableRow>
<ArgTableRow arg="security.owe-transition-interface" typ="iface_enum { auto }" unset="1">OWE 过渡接口。</ArgTableRow>
<ArgTableRow arg="security.eap-methods" typ="multi { array-id, method: enum (tls | ttls | peap) { tls:13, ttls:21, peap:25 }
 }" unset="1">允许的 EAP 方法。</ArgTableRow>
<ArgTableRow arg="security.eap-certificate-mode" typ="enum (verify-certificate | dont-verify-certificate | no-certificates | verify-certificate-with-crl)" unset="1">EAP 证书验证模式。</ArgTableRow>
<ArgTableRow arg="security.eap-tls-certificate" typ="enum" unset="1">EAP-TLS 证书。</ArgTableRow>
<ArgTableRow arg="security.eap-username" typ="string" unset="1">EAP 用户名。</ArgTableRow>
<ArgTableRow arg="security.eap-anonymous-identity" typ="string" unset="1">EAP 匿名身份。</ArgTableRow>
<ArgTableRow arg="security.eap-password" typ="string" unset="1">EAP 密码。</ArgTableRow>
<ArgTableRow arg="security.eap-accounting" typ="bool" unset="1">启用 EAP 计费。</ArgTableRow>
<ArgTableRow arg="security.ft" typ="bool" unset="1">启用快速转换（802.11r）。</ArgTableRow>
<ArgTableRow arg="security.ft-mobility-domain" typ="num" unset="1">FT 移动域。</ArgTableRow>
<ArgTableRow arg="security.ft-over-ds" typ="bool" unset="1">通过分布式系统进行 FT。</ArgTableRow>
<ArgTableRow arg="security.ft-reassociation-deadline" typ="time" unset="1">FT 重新关联截止时间。</ArgTableRow>
<ArgTableRow arg="security.ft-nas-identifier" typ="string" unset="1">FT NAS 标识符。</ArgTableRow>
<ArgTableRow arg="security.ft-r0-key-lifetime" typ="time" unset="1">FT R0 密钥生存期。</ArgTableRow>
<ArgTableRow arg="security.ft-preserve-vlanid" typ="bool" unset="1">FT 保留 VLAN ID。</ArgTableRow>
<ArgTableRow arg="security.connect-group" typ="string" unset="1">连接组。</ArgTableRow>
<ArgTableRow arg="security.connect-priority" typ="super { connect-accept-priority: num
, [connect-hold-priority] /num
 }" unset="1">连接优先级。</ArgTableRow>
<ArgTableRow arg="security.authentication-types" typ="ubit (wpa-psk, wpa2-psk, wpa2-psk-sha2, wpa-eap, wpa2-eap, wpa3-psk, wpa3-psk-gd, owe, wpa3-eap, wpa3-eap-192)" unset="1">支持的认证类型。</ArgTableRow>
</ArgTable>
