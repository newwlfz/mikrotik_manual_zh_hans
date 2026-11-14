---
sidebar_key: "cli-reference/interface/ovpn-server/server/export-client-configuration"
sidebar_position: 1
title: "export-client-configuration"
sidebar_label: 'export-client-configuration'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ovpn-server/server/export-client-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-server/server/export-client-configuration {#interfaceovpn-serverserverexport-client-configuration}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="server" typ="enum">要从中导出配置的 OVPN 服务器名称。</ArgTableRow>
<ArgTableRow arg="server-address" typ="string">客户端用于连接此 VPN 服务器的公共 IP 地址或 DNS 名称。</ArgTableRow>
<ArgTableRow arg="ca-certificate" typ="file">客户端 OVPN 配置使用的 CA 证书。</ArgTableRow>
<ArgTableRow arg="client-certificate" typ="file">客户端 OVPN 配置使用的客户端证书。</ArgTableRow>
<ArgTableRow arg="client-cert-key" typ="file">客户端 OVPN 配置使用的客户端私钥。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="progress" typ="string">导出进度状态。</ArgTableRow>
</ArgTable>
