---
title: "ssh-exec"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ssh-exec
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ssh-exec
**类型：** Command

[`ssh-exec`](/docs/management-tools/ssh#run-remote-commands-from-scripts) 命令是非交互式 SSH 命令，允许通过脚本和调度器在设备上远程执行命令。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ipv6-address: composite { ip6: ip6Addr
, interface: [ iface_enum]
 }
 }">Remote host IPv4 or IPv6 address.</ArgTableRow>
<ArgTableRow arg="command" typ="string">Remote command to execute.</ArgTableRow>
<ArgTableRow arg="user" typ="string">Username for the remote host.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password for the remote host. You should use SSH PKI authentication instead of plain text passwords.</ArgTableRow>
<ArgTableRow arg="port" typ="num">TCP port the SSH server listens on. Default: 22.</ArgTableRow>
<ArgTableRow arg="known-hosts-ignore" typ="bool">skip host key validation</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">Source address to use when connecting. Supports both IPv4 and IPv6.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">VRF to run the command over; the connection is made inside that routing table.</ArgTableRow>
<ArgTableRow arg="output-to-file" typ="string">Write output to file instead of 'output' variable.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="exit-code" typ="num">Exit code reported by the remote command shell; `0` when the command ran. A connection or authentication failure aborts `ssh-exec` itself instead of returning.</ArgTableRow>
<ArgTableRow arg="output" typ="string">Returns the output of the remotely executed command.</ArgTableRow>
</ArgTable>
