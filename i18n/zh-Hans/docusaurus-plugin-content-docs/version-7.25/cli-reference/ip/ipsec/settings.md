---
sidebar_key: "cli-reference/ip/ipsec/settings"
sidebar_position: 10
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/settings
captured_at: '2026-11-01T21:24:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/settings {#ipipsecsettings}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="xauth-use-radius" typ="bool">是否对 XAuth 用户使用 Radius 客户端。该属性仅适用于使用 IKEv1 交换模式的对等体。</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">是否向 RADIUS 服务器发送 RADIUS 计费请求。适用于使用 EAP Radius（auth-method=eap-radius）或使用带 XAuth 认证方法的预共享密钥（auth-method=pre-shared-key-xauth）的情况。</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">每次连续 RADIUS 计费 Interim 更新之间的间隔。必须启用计费。</ArgTableRow>
<ArgTableRow arg="ddos-cookie-threshold" typ="num">DDOS cookie 激活阈值。</ArgTableRow>
</ArgTable>
