---
sidebar_key: "cli-reference/ip/cloud/back-to-home-user/show-client-config"
sidebar_position: 1
title: "show-client-config"
sidebar_label: 'show-client-config'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-user/show-client-config
captured_at: '2026-11-01T21:23:51+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/back-to-home-user/show-client-config {#ipcloudback-to-home-usershow-client-config}
**系统能力：** cloud-vpn
**类型：** 命令

打印某个用户的 WireGuard 配置，并以二维码形式输出同一份配置。在 WireGuard 应用中导入它。通过编号指定用户，或使用 `[find name=<name>]` 指定；仅给出名称属于语法错误。该配置包含第二个对等体，其使用占位密钥且 `AllowedIPs = 0.0.0.0/32`，不会承载任何流量；客户端通过第一个对等体建立连接，当路由器使用中继时也是如此。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="conf" typ="string">该用户的 WireGuard 配置。</ArgTableRow>
<ArgTableRow arg="qr" typ="pic">以二维码形式表示的配置。</ArgTableRow>
</ArgTable>
