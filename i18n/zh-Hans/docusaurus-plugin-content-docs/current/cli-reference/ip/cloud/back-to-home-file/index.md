---
sidebar_key: "cli-reference/ip/cloud/back-to-home-file"
title: "back-to-home-file"
sidebar_label: 'back-to-home-file'
source: https://manual.mikrotik.com/docs/cli-reference/ip/cloud/back-to-home-file
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/back-to-home-file {#ipcloudback-to-home-file}
**系统能力：** cloud-vpn
**类型：** 目录

与 File Share 共享的目录和文件。每个共享都会在 `<serial>.routingthecloud.net` 下获得一个私密链接，并且只要至少存在一个共享，该服务就会运行。有关示例，请参见 [文件共享](../../../../network-management/cloud/file-share.md)。服务状态位于 [`settings`](./settings/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">此共享已禁用，其链接返回 HTTP 404。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">此共享尚无法提供访问，例如路由器正在请求证书时。注释行会显示原因，例如 `getting cert status: requesting SSL certificate`。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="path" typ="file">要共享的目录或文件，以 `/file/print` 显示的形式，例如 `usb1/photos`。路由器显示它时会带前导 `/`。</ArgTableRow>
<ArgTableRow arg="allow-uploads" typ="bool">目录共享的访问者是否可以在其中上传文件并创建文件夹。未启用时，路由器会以 HTTP 403 拒绝上传。默认值：no。</ArgTableRow>
<ArgTableRow arg="expires" typ="alt { expires: enum (never) { never:0xFFFFFFFF }
, interval: time
, date-time: date
 }">共享何时停止工作：`never`、日期和时间（例如 `"2026-10-01 00:00:00"`）或时间间隔（例如 `1h`）。路由器会将时间间隔转换为日期。`never` 会保留共享，直到你将其删除。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="key" typ="string">共享的随机密钥，即 `url` 的最后一部分。</ArgTableRow>
<ArgTableRow arg="url" typ="string">指向共享页面的链接：`https://<serial>.routingthecloud.net/s/<key>`。目录共享会列出其文件；任何拥有该链接的人都可以打开它。</ArgTableRow>
<ArgTableRow arg="direct-url" typ="string">`url` 加上 `?dl`。它会下载共享文件，或将整个目录下载为 `download.zip`。</ArgTableRow>
<ArgTableRow arg="downloads" typ="num">共享的直接下载次数。打开共享页面不计入。</ArgTableRow>
</ArgTable>
