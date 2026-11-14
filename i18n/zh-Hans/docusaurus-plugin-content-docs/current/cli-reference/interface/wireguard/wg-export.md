---
sidebar_key: "cli-reference/interface/wireguard/wg-export"
sidebar_position: 2
title: "wg-export"
sidebar_label: 'wg-export'
source: https://manual.mikrotik.com/docs/cli-reference/interface/wireguard/wg-export
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wireguard/wg-export {#interfacewireguardwg-export}
**类型：** 命令

以标准 WireGuard 配置格式导出所选 WireGuard 接口及其对等体。使用 `[find name=...]` 选择接口。导出内容不包括接口 IP 地址、路由或防火墙规则。如需可执行的 RouterOS 脚本，请使用常规的 `/interface/wireguard/export` 命令。请参阅 [WireGuard](../../../virtual-private-networks/wireguard.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file" typ="file">用于将所选 WireGuard 接口及其对等体导出到的文件名。该文件包含 `[Interface]` 和 `[Peer]` 部分以及私钥；请妥善保存。</ArgTableRow>
</ArgTable>
