---
title: "settings"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/settings
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## ip/ipsec/settings 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="xauth-use-radius" typ="bool">Whether to use Radius client for XAuth users or not. The property is only applicable to peers using the IKEv1 exchange mode.</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">WWhether to send RADIUS accounting requests to a RADIUS server. Applicable if EAP Radius (auth-method=eap-radius) or pre-shared key with XAuth authentication method (auth-method=pre-shared-key-xauth) is used.</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">The interval between each consecutive RADIUS accounting Interim update. Accounting must be enabled.</ArgTableRow>
<ArgTableRow arg="ddos-cookie-threshold" typ="num">DDOS cookie activation threshold.</ArgTableRow>
</ArgTable>
