---
sidebar_key: "cli-reference/system/backup/cloud"
title: "cloud"
sidebar_label: 'cloud'
source: https://manual.mikrotik.com/docs/cli-reference/system/backup/cloud
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/cloud {#systembackupcloud}
**类型：** 目录

存储于 MikroTik 云服务器上的本设备备份。每台设备只有一个槽位。此菜单中的每条命令（包括 `print`）都会连接到 `cloud2.mikrotik.com`。有关示例，请参见 [云备份](../../../../network-management/cloud/cloud-backup.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">备份的名称，在 `upload-file` 中通过 `name` 设置。除非指定了 `dst-file`，否则 `download-file` 会将备份保存为 `<name>.backup`。</ArgTableRow>
<ArgTableRow arg="size" typ="num">加密备份文件的大小。</ArgTableRow>
<ArgTableRow arg="ros-version" typ="string">创建该备份的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="date" typ="date">上传时间。</ArgTableRow>
<ArgTableRow arg="status" typ="string">所存储备份的状态。当备份可以被下载时为 `ok`。</ArgTableRow>
<ArgTableRow arg="secret-download-key" typ="string">可在任意路由器上通过 `download-file secret-download-key=<key>` 下载此备份的密钥。替换备份会生成新的密钥。任何持有该密钥的人都可以下载该文件，但没有备份密码则无法读取它。</ArgTableRow>
</ArgTable>
