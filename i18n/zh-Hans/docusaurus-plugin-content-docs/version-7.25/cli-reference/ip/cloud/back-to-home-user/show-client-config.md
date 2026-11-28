---
title: "show-client-config"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-user/show-client-config
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/cloud/back-to-home-user"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/back-to-home-user/show-client-config 
**Syscap：** cloud-vpn
**类型：** Command

打印用户的 WireGuard 配置，并将同一配置以二维码形式显示。将其导入 WireGuard 应用。通过用户编号或 `[find name=<name>]` 指定用户；仅使用名称会导致语法错误。配置中包含第二个 peer，其密钥为占位符，且 `AllowedIPs = 0.0.0.0/32`，该 peer 不承载流量；即使路由器使用中继，客户端也会通过第一个 peer 连接。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="conf" typ="string">WireGuard configuration of the user.</ArgTableRow>
<ArgTableRow arg="qr" typ="pic">The configuration as a QR code.</ArgTableRow>
</ArgTable>
