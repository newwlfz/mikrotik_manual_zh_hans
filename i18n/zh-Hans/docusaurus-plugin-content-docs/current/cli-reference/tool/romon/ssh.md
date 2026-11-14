---
sidebar_key: "cli-reference/tool/romon/ssh"
sidebar_position: 4
title: "ssh"
sidebar_label: 'ssh'
source: https://manual.mikrotik.com/docs/cli-reference/tool/romon/ssh
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon/ssh {#toolromonssh}
**系统能力：** security
**类型：** 命令

通过 [RoMON](../../../management-tools/romon.md) 覆盖网络与路由器建立 SSH 会话，无需任何 IP 连通性。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="macAddr">要连接的路由器的 RoMON ID（MAC 地址）</ArgTableRow>
<ArgTableRow arg="command" typ="string">要在远程路由器上运行的命令，而不是交互式会话</ArgTableRow>
<ArgTableRow arg="user" typ="string">要在远程路由器上登录的用户账户</ArgTableRow>
<ArgTableRow arg="output-to-file" typ="string">将 `command` 的输出保存到本地路由器上的文件中</ArgTableRow>
</ArgTable>
