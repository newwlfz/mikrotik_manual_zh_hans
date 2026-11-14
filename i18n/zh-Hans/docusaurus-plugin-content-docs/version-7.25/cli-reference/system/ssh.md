---
sidebar_key: "cli-reference/system/ssh"
sidebar_position: 31
title: "ssh"
sidebar_label: 'ssh'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ssh
captured_at: '2026-11-01T21:25:45+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ssh {#systemssh}
**类型：** 命令

[SSH 客户端](../../management-tools/ssh.md#ssh-client) 用于连接远程主机。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ipv6-address: composite { ip6: ip6Addr
, interface: [ iface_enum]
 }
 }">远程主机的 IPv4 或 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="command" typ="string">要执行的远程命令。</ArgTableRow>
<ArgTableRow arg="user" typ="string">远程主机的用户名。默认为当前登录的用户。</ArgTableRow>
<ArgTableRow arg="port" typ="num">SSH 服务器监听的 TCP 端口。默认：22。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">连接时使用的源地址。支持 IPv4 和 IPv6。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">在哪个 VRF 中建立连接。仅在该路由表内匹配远程主机。</ArgTableRow>
<ArgTableRow arg="output-to-file" typ="string">将输出写入文件而不是终端。不接受密码输入，请使用密钥认证。</ArgTableRow>
</ArgTable>
