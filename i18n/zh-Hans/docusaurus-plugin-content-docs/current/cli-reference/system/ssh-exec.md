---
sidebar_key: "cli-reference/system/ssh-exec"
sidebar_position: 31
title: "ssh-exec"
sidebar_label: 'ssh-exec'
source: https://manual.mikrotik.com/docs/cli-reference/system/ssh-exec
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ssh-exec {#systemssh-exec}
**类型：** 命令

[`ssh-exec`](../../management-tools/ssh.md#run-remote-commands-from-scripts) 命令是一种非交互式 SSH 命令，允许你通过脚本和 scheduler 在设备上远程执行命令。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ipv6-address: composite { ip6: ip6Addr
, interface: [ iface_enum]
 }
 }">远程主机的 IPv4 或 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="command" typ="string">要执行的远程命令。</ArgTableRow>
<ArgTableRow arg="user" typ="string">远程主机的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">远程主机的密码。应使用 SSH PKI 身份验证，而不是纯文本密码。</ArgTableRow>
<ArgTableRow arg="port" typ="num">SSH 服务器监听的 TCP 端口。默认：22。</ArgTableRow>
<ArgTableRow arg="known-hosts-ignore" typ="bool">跳过主机密钥验证</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">连接时使用的源地址。支持 IPv4 和 IPv6。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">用于运行该命令的 VRF；连接会在该路由表内建立。</ArgTableRow>
<ArgTableRow arg="output-to-file" typ="string">将输出写入文件，而不是 'output' 变量。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="exit-code" typ="num">远程命令 shell 报告的退出码；命令运行时为 `0`。连接或身份验证失败会中止 `ssh-exec` 本身，而不是返回。</ArgTableRow>
<ArgTableRow arg="output" typ="string">返回远程执行命令的输出。</ArgTableRow>
</ArgTable>
