---
sidebar_key: "cli-reference/interface/ovpn-client/import-ovpn-configuration"
sidebar_position: 1
title: "import-ovpn-configuration"
sidebar_label: 'import-ovpn-configuration'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ovpn-client/import-ovpn-configuration
captured_at: '2026-11-01T21:22:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-client/import-ovpn-configuration {#interfaceovpn-clientimport-ovpn-configuration}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file-name" typ="file">要导入的 .ovpn 客户端配置文件路径。</ArgTableRow>
<ArgTableRow arg="skip-cert-import" typ="bool">如果证书是手动添加的，则忽略 .ovpn 文件中的证书信息。</ArgTableRow>
<ArgTableRow arg="key-passphrase" typ="string">证书私钥的密码短语。</ArgTableRow>
<ArgTableRow arg="ovpn-user" typ="string">用于与 OVPN 服务器进行身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="ovpn-password" typ="string">用于与 OVPN 服务器进行身份验证的密码。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="progress" typ="string">导入进度状态。</ArgTableRow>
</ArgTable>
