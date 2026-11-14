---
sidebar_key: "cli-reference/disk/btrfs/transfer"
sidebar_position: 3
title: "transfer"
sidebar_label: 'transfer'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/transfer
captured_at: '2026-11-01T21:22:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/transfer {#diskbtrfstransfer}
**条件：** !smips
**系统能力：** storage
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (receive | send)" mandatory="1">
Btrfs 传输的方向：
- `receive` - 在 `file` 处接收 Btrfs 发送流，例如两台 RouterOS 设备之间快照备份的目标端。
- `send` - 通过 SSH 将文件系统 `fs` 的子卷（快照）发送到远程 RouterOS 设备。

传输使用 `/user/ssh-keys` 的 SSH 用户密钥认证。有关可用的发送/接收示例，请参阅 [Btrfs 子卷和快照](../../../storage/btrfs/snapshots.md)。
</ArgTableRow>
<ArgTableRow arg="fs" typ="enum">传输所操作的 Btrfs 文件系统的标签，如 [`filesystem`](./filesystem/index.md) 中所示。</ArgTableRow>
<ArgTableRow arg="send-parent" typ="enum">作为增量 `send` 基础的先前成功发送的快照；仅传输自该快照以来的更改。</ArgTableRow>
<ArgTableRow arg="send-subvolumes" typ="multi { array-id, subvolume: enum
 }">要发送的快照，用于 `send` 传输。快照名称（不是路径），如 [`subvolume`](./subvolume.md) 下所示。</ArgTableRow>
<ArgTableRow arg="file" typ="file">传输的目标（或源）路径，例如存储接收到的快照的挂载路径 `BackupBtrfsDisk/Snapshots`。</ArgTableRow>
<ArgTableRow arg="ssh-address" typ="string">`send` 传输的远程 RouterOS 设备的地址。</ArgTableRow>
<ArgTableRow arg="ssh-receive-mount" typ="string">远程设备上接收快照的挂载路径，例如 `BackupBtrfsDisk/Snapshots`。</ArgTableRow>
<ArgTableRow arg="ssh-port" typ="num">远程设备的 SSH 端口。默认值：22。</ArgTableRow>
<ArgTableRow arg="ssh-user" typ="string">在远程设备上进行身份验证所用的 SSH 用户；必须已在远程设备上为 `ssh-user` 导入本地用户的 SSH 密钥。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="bytes" typ="num">到目前为止已传输的字节数。</ArgTableRow>
<ArgTableRow arg="status" typ="string">传输的状态，例如 `done`，或错误消息。</ArgTableRow>
</ArgTable>
