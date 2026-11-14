---
sidebar_key: "cli-reference/interface/wireguard/peers/show-client-config"
sidebar_position: 1
title: "show-client-config"
sidebar_label: 'show-client-config'
source: https://manual.mikrotik.com/docs/cli-reference/interface/wireguard/peers/show-client-config
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wireguard/peers/show-client-config {#interfacewireguardpeersshow-client-config}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file" typ="file">用于保存客户端配置的文件名。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="conf" typ="string">客户端配置文本。</ArgTableRow>
<ArgTableRow arg="qr" typ="pic">根据客户端配置生成的 QR 码，便于在移动设备上设置对端。</ArgTableRow>
</ArgTable>
