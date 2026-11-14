---
sidebar_key: "cli-reference/interface/ovpn-server/server/export-client-configuration"
sidebar_position: 1
title: "export-client-configuration"
sidebar_label: "export-client-configuration"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ovpn-server/server/export-client-configuration
captured_at: '2026-11-01T21:27:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-server/server/export-client-configuration {#interfaceovpn-serverserverexport-client-configuration}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="server" typ="enum"></ArgTableRow>
<ArgTableRow arg="server-address" typ="string">客户端将用于连接此 vpn 服务器的公网 ip 地址或 dns 名称</ArgTableRow>
<ArgTableRow arg="ca-certificate" typ="file">客户端 ovpn 配置使用的 CA 证书</ArgTableRow>
<ArgTableRow arg="client-certificate" typ="file">客户端 ovpn 配置使用的客户端证书</ArgTableRow>
<ArgTableRow arg="client-cert-key" typ="file">客户端 ovpn 配置使用的客户端私钥</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="progress" typ="string"></ArgTableRow>
</ArgTable>
