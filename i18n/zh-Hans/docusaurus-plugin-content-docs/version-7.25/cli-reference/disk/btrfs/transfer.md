---
title: "transfer"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/transfer
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## disk/btrfs/transfer 
**Conditions：** !smips
**Syscap：** storage
**Type：** Directory

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="type" typ="enum (receive | send)" mandatory="1">
Direction of the Btrfs transfer:
- `receive` - receive a Btrfs send stream at `file`, for example the destination side of a snapshot backup between two RouterOS devices.
- `send` - send subvolumes (snapshots) of the file system `fs` to a remote RouterOS device over SSH.

传输使用 `/user/ssh-keys` 的 SSH 用户密钥认证。有关可用的 send/receive 示例，请参阅 [Btrfs 子卷和快照](/docs/storage/btrfs/snapshots)。
</ArgTableRow>
<ArgTableRow arg="fs" typ="enum">传输操作的 Btrfs 文件系统标签，如 [`filesystem`](/docs/cli-reference/disk/btrfs/filesystem) 中所示。</ArgTableRow>
<ArgTableRow arg="send-parent" typ="enum">作为增量 `send` 基础的上一次成功发送快照；仅传输自该快照以来的更改。</ArgTableRow>
<ArgTableRow arg="send-subvolumes" typ="multi { array-id, subvolume: enum
 }">要通过 `send` 传输发送的快照。快照名称（而非路径），如 [`subvolume`](/docs/cli-reference/disk/btrfs/subvolume) 下所示。</ArgTableRow>
<ArgTableRow arg="file" typ="file">传输的目标（或源）路径，例如存储接收到的快照的挂载路径 `BackupBtrfsDisk/Snapshots`。</ArgTableRow>
<ArgTableRow arg="ssh-address" typ="string">`send` 传输的远程 RouterOS 设备地址。</ArgTableRow>
<ArgTableRow arg="ssh-receive-mount" typ="string">远程设备上接收快照所在的挂载路径，例如 `BackupBtrfsDisk/Snapshots`。</ArgTableRow>
<ArgTableRow arg="ssh-port" typ="num">远程设备的 SSH 端口。默认：22。</ArgTableRow>
<ArgTableRow arg="ssh-user" typ="string">用于在远程设备上进行认证的 SSH 用户；必须在远程设备上为 `ssh-user` 导入本地用户的 SSH 密钥。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="bytes" typ="num">Number of bytes transferred so far.</ArgTableRow>
<ArgTableRow arg="status" typ="string">Status of the transfer, for example `done`, or an error message.</ArgTableRow>
</ArgTable>
