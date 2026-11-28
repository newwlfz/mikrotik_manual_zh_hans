---
title: "wg-export"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/wireguard/wg-export
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/wireguard/wg-export 
**类型：** 命令

以标准 WireGuard 配置格式导出所选 WireGuard 接口及其对等端。使用 `[find name=...]` 选择接口。导出内容不包括接口 IP 地址、路由或防火墙规则。如需可执行的 RouterOS 脚本，请使用常规 `/interface/wireguard/export` 命令。详情请参阅 [WireGuard](/docs/virtual-private-networks/wireguard)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="file" typ="file">Name of the file to export the selected WireGuard interface and its peers to. The file contains `[Interface]` and `[Peer]` sections and the private key; store it securely.</ArgTableRow>
</ArgTable>
