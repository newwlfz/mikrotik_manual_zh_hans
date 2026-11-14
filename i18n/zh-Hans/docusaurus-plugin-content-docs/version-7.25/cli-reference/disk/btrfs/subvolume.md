---
sidebar_key: "cli-reference/disk/btrfs/subvolume"
sidebar_position: 2
title: "subvolume"
sidebar_label: 'subvolume'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/subvolume
captured_at: '2026-11-01T21:22:09+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/subvolume {#diskbtrfssubvolume}
**条件：** !smips
**系统能力：** storage
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">该条目是文件系统的根子卷，显示为 `<FS_ROOT>`；它会随文件系统自动创建。</ArgTableRow>
<ArgTableRow arg="S" typ="snapshot">该子卷是快照，使用 `parent` 参数创建。</ArgTableRow>
<ArgTableRow arg="r" typ="read-only">该子卷为只读。</ArgTableRow>
<ArgTableRow arg="D" typ="dead">该子卷处于 dead 状态，例如正在被移除。</ArgTableRow>
<ArgTableRow arg="M" typ="mounted">该子卷已挂载（`mount=yes`）到其 `mountpoint` 下。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="fs" typ="enum" mandatory="1">子卷所属 Btrfs 文件系统的标签，如 [`filesystem`](./filesystem/index.md) 中所示。</ArgTableRow>
<ArgTableRow arg="parent" typ="enum">新子卷创建时所基于的子卷。使用 `parent` 时，新子卷会成为父卷的快照，并共享创建时的内容。参见 [Btrfs 子卷和快照](../../../storage/btrfs/snapshots.md)。</ArgTableRow>
<ArgTableRow arg="name" typ="string">子卷的名称。类似路径的名称（例如 `Snapshots/backup-10`）会将子卷置于另一个子卷内；此时 `top-level` 会显示包含它的子卷。</ArgTableRow>
<ArgTableRow arg="read-only" typ="bool">子卷是否为只读（`r - READ-ONLY` 标志）。默认：否。</ArgTableRow>
<ArgTableRow arg="mount" typ="bool">子卷是否挂载到其 `mountpoint` 下（`M - MOUNTED` 标志）。默认：否。</ArgTableRow>
<ArgTableRow arg="mountpoint" typ="string">子卷挂载到的挂载点，相对于文件系统挂载点。默认为子卷的名称。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="top-level" typ="enum">子卷所在的顶层子卷，例如 `Snapshots`；当子卷直接位于文件系统根目录下时为 `<FS_ROOT>`。</ArgTableRow>
<ArgTableRow arg="fullname" typ="string">子卷在文件系统中的完整路径，例如 `Snapshots/backup-10`。</ArgTableRow>
<ArgTableRow arg="uuid" typ="string">子卷的 UUID。</ArgTableRow>
<ArgTableRow arg="received-uuid" typ="string">通过 Btrfs [`transfer`](./transfer.md) 接收子卷时，发送端上该子卷的 UUID；对于本地创建的子卷为空。</ArgTableRow>
<ArgTableRow arg="creation-time" typ="date">子卷的创建日期和时间。</ArgTableRow>
<ArgTableRow arg="subvolume-id" typ="num">子卷的 Btrfs ID 编号。</ArgTableRow>
<ArgTableRow arg="generation" typ="num">子卷的 Btrfs 事务 generation。</ArgTableRow>
<ArgTableRow arg="dead" typ="bool">子卷是否处于 dead 状态（`D - DEAD` 标志）。</ArgTableRow>
<ArgTableRow arg="snapshot" typ="bool">子卷是否为快照（`S - SNAPSHOT` 标志）。</ArgTableRow>
<ArgTableRow arg="send-trans-id" typ="num">子卷参与的最后一次 send 的 Btrfs 事务 ID。</ArgTableRow>
<ArgTableRow arg="send-time" typ="date">子卷最后一次通过 Btrfs transfer 发送的时间。</ArgTableRow>
<ArgTableRow arg="recv-trans-id" typ="num">创建该子卷的 receive 的 Btrfs 事务 ID。</ArgTableRow>
<ArgTableRow arg="recv-time" typ="date">子卷通过 Btrfs transfer 接收的时间。</ArgTableRow>
<ArgTableRow arg="snapshots" typ="multi { array-id, snapshot: enum
 }">从该子卷创建的快照。</ArgTableRow>
<ArgTableRow arg="path" typ="string">通过 Btrfs [`transfer`](./transfer.md) 接收到的路径（接收端的 `file=`）；对于本地创建的子卷为空。</ArgTableRow>
</ArgTable>
