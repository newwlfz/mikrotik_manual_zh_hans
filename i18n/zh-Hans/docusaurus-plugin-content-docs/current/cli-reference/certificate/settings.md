---
sidebar_key: "cli-reference/certificate/settings"
sidebar_position: 15
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/certificate/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/settings {#certificatesettings}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="builtin-trust-store" typ="alt { all-none: enum (default | all | untrusted)
, component: ubit (ipsec, wpa-eap, capsman, fetch, sstp, ovpn, mqtt, email, netwatch, radius, container, userman, lora, wiliot, openflow, tr069, dot1x, dns, www, api, reverse-proxy, logging)
 }">RouterOS 提供的 CA 证书</ArgTableRow>
<ArgTableRow arg="current-defaults" typ="ubit (ipsec, wpa-eap, capsman, fetch, sstp, ovpn, mqtt, email, netwatch, radius, container, userman, lora, wiliot, openflow, tr069, dot1x, dns, www, api, reverse-proxy, logging)"></ArgTableRow>
<ArgTableRow arg="crl-download" typ="bool">自动下载并更新 CRL</ArgTableRow>
<ArgTableRow arg="crl-use" typ="bool">验证信任链时执行 CRL 检查</ArgTableRow>
<ArgTableRow arg="crl-store" typ="enum (system | ram)">CRL 存储位置</ArgTableRow>
</ArgTable>
