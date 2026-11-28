---
title: "file"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/file
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## file 
**类型：** 目录

`/file` 菜单列出路由器存储上的用户文件并对其进行管理：创建、编辑、复制和删除文件及目录。对于上传的 RouterOS `.npk` 文件，该菜单还会显示软件包详情，例如架构和构建时间。通过 [File Share](/docs/network-management/cloud/file-share)（Back To Home（远程回家））共享的文件和目录会带有 shared 标志，并具有包含共享链接的 `url` 属性。请参阅 [Files](/docs/system-information-and-utilities/files) 指南。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="S" typ="shared">The file or directory is shared through [File Share](/docs/network-management/cloud/file-share) (Back To Home).</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="file" mandatory="1">Name of the file or directory, including the path. A leading `/` is optional.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (file | directory)">Type of the entry. Default: file.</ArgTableRow>
<ArgTableRow arg="contents" typ="string">The actual content of the file. Limited to just under 60 KiB (61439 bytes): creating a file with longer contents fails, and files larger than that return nothing here. Use [`/file/read`](/docs/cli-reference/read) to read larger files.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="size" typ="num">File size in bytes.</ArgTableRow>
<ArgTableRow arg="last-modified" typ="date">Time when the file was created or last modified.</ArgTableRow>
<ArgTableRow arg="package-name" typ="string">Name of the installable package. Applies only to RouterOS .npk files.</ArgTableRow>
<ArgTableRow arg="package-version" typ="string">Version of the installable package. Applies only to RouterOS .npk files.</ArgTableRow>
<ArgTableRow arg="package-build-time" typ="date">Time when the package was built. Applies only to RouterOS .npk files.</ArgTableRow>
<ArgTableRow arg="package-architecture" typ="string">Architecture that the package is built for. Applies only to RouterOS .npk files.</ArgTableRow>
<ArgTableRow arg="url" typ="string" syscap="cloud-vpn">URL for cloud VPN file sharing. Shown for files and directories shared through [File Share](/docs/network-management/cloud/file-share) (Back To Home).</ArgTableRow>
</ArgTable>
