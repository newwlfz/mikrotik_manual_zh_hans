---
sidebar_key: "cli-reference/file/sync"
title: "sync"
sidebar_label: 'sync'
source: https://manual.mikrotik.com/docs/cli-reference/file/sync
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## file/sync {#filesync}
**软件包：** rose-storage
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该同步条目已被禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">该条目无效，例如它引用了不存在或不可用的路径。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该条目是自动创建的。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="remote-address" typ="multi { array-id, address: string
 }" mandatory="1">要与之同步的远端 RouterOS 设备的 IP 地址。远端设备必须已启用 rsync 守护进程（[`rsync-daemon`](../rsync-daemon.md)）。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (upload | download)" mandatory="1">
同步方向：
- `upload` - 将 `local-path` 文件或文件夹发送到远端设备。
- `download` - 从远端设备获取 `remote-path` 到本路由器。
</ArgTableRow>
<ArgTableRow arg="local-path" typ="file">本路由器上的文件或文件夹路径；在 `mode=upload` 时为源，在 `mode=download` 时为目标。</ArgTableRow>
<ArgTableRow arg="remote-path" typ="string">远端设备上的文件或文件夹路径。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于在远端设备上进行身份验证的 RouterOS 用户。</ArgTableRow>
<ArgTableRow arg="password" typ="string">远端设备上该用户的密码。设置后，传输会自动通过创建的 IPsec 进行。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">同步状态，例如 `in sync`、`making control connection to <ip>` 或 `initializing transfer`。</ArgTableRow>
</ArgTable>
