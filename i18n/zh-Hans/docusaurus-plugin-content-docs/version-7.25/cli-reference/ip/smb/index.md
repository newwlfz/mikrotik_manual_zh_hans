---
sidebar_key: "cli-reference/ip/smb/index"
sidebar_position: 1
title: "smb"
sidebar_label: 'smb'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/smb
captured_at: '2026-11-01T21:24:26+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/smb {#ipsmb}
**条件：** !smips
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="enum (no | auto | yes)">
内置 SMB 服务器是否运行：
- `no` - 服务器已禁用。
- `auto`（默认）- 当在 [`shares`](./shares.md) 中配置了第一个未禁用的共享时，服务器会自动启动。
- `yes` - 服务器已启用。
</ArgTableRow>
<ArgTableRow arg="domain" typ="string">SMB 服务器所属的 Windows 工作组名称。默认值：MSHOME。</ArgTableRow>
<ArgTableRow arg="comment" typ="string">SMB 服务器的注释。默认值：MikrotikSMB。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="multi { array-id, interface: iface_enum { all:0 }
 }">SMB 服务监听的接口。默认值：all。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">SMB 服务器的实际状态，例如 `enabled`。</ArgTableRow>
</ArgTable>
