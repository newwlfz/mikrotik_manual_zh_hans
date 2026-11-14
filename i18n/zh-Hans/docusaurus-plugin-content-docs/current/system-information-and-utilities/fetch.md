---
sidebar_key: "system-information-and-utilities/fetch"
sidebar_position: 4
title: "获取"
sidebar_label: "获取"
description: "Fetch 通过 HTTP、HTTPS、FTP、TFTP 和 SFTP 传输文件，并可从控制台或脚本发起 HTTP 请求：下载、上传、POST 数据与 webhooks、证书检查、重定向、结果变量以及 VRF 支持。"
tags:
  - 'fetch'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/fetch
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

fetch 通过 HTTP、HTTPS、FTP、TFTP 和 SFTP 下载和上传文件，并向远程服务器发送 HTTP 请求（GET、POST、PUT 等）。它可在控制台和脚本中运行，实时打印状态，并把结果保存到文件或返回到脚本变量中。

在 WinBox 中，从左侧菜单选择 **New Terminal** 即可运行本页的命令。终端会显示传输状态；当命令把结果保存到路由器时，打开 **Files** 即可找到下载的文件。

## 下载和上传文件 {#download-and-upload-files}

通过 FTP 从另一台 RouterOS 设备复制文件。该设备需要启用 FTP 服务（`/ip/service`），并拥有一个带密码的账户：

```ros
/tool/fetch mode=ftp address=192.168.88.2 user=admin \
    password=mypassword src-path=conf.rsc dst-path=backup.rsc
```

若要改为上传文件，请设置 `upload=yes` 并交换路径：`src-path` 是本地路由器上的文件，`dst-path` 是远程设备上的文件名：

```ros
/tool/fetch mode=ftp address=192.168.88.2 user=admin \
    password=mypassword src-path=backup.rsc dst-path=conf.rsc upload=yes
```

同样的传输也可以使用端口 22 上的 `mode=sftp`。SFTP 使用远程设备的 SSH 服务，RouterOS 默认启用该服务。上传（`upload=yes`）仅在 `ftp` 和 `sftp` 模式下可用；若要把数据发送到 Web 服务器，请使用带 `http-data` 的 HTTP 请求。未指定 `user` 时，FTP 以 `anonymous` 身份登录。

你可以把地址、凭据和路径合并到一个 URL 中；此时模式会根据协议前缀自动识别：

```ros
/tool/fetch url="ftp://admin:mypassword@192.168.88.2/conf.rsc" \
    dst-path=backup.rsc
```

`mode=tftp` 从 TFTP 服务器下载，例如另一台路由器上的 [`/ip/tftp`](../cli-reference/ip/tftp/index.md)：

```ros
/tool/fetch address=192.168.88.2 mode=tftp src-path=conf.rsc \
    dst-path=backup.rsc
```

:::note
SFTP 主机密钥验证在新安装中默认启用，在升级后的路由器上则保持禁用（[`/ip/ssh`](../cli-reference/ip/ssh/index.md) 中的 `known-hosts-validation` 设置）。启用验证后，若所访问服务器的密钥不在 [`/ip/ssh/known-hosts`](../cli-reference/ip/ssh/known-hosts.md) 中，fetch 会失败并报 `host key not trusted`；`sftp-known-hosts-ignore=yes` 可为单次传输绕过该检查，`known-hosts-trusted-subnets` 则对整个子网跳过检查。
:::

## 发起 HTTP 请求 {#make-http-requests}

使用 `url` 参数时，fetch 会从协议前缀识别协议，并以 URL 中的名称保存文件，除非 `dst-path` 覆盖该名称：

```ros
[admin@MikroTik] > /tool/fetch check-certificate=yes \
    url="https://download.mikrotik.com/routeros/7.19/CHANGELOG"
  status: connecting

      status: finished
        code: 200
  downloaded: 18KiB
       total: 18KiB
    duration: 1s
```

fetch 默认不校验 TLS 证书：未设置 `check-certificate` 时，即使服务器证书已过期或为自签名证书，它也会建立连接。对于你依赖的 HTTPS 下载，请设置 `check-certificate=yes`，并且在你导入或运行下载的内容之前一定要先设置。RouterOS 内置了包含公共根证书的信任存储（`/certificate/settings` 中的 `builtin-trust-store`），因此访问公共站点无需额外导入证书。对于使用你自己 CA 签发证书的服务器，请用 `/certificate/import` 导入该 CA 的证书；参见 [证书](../authentication-authorization-accounting/certificates.md)。该检查还会验证 URL 中的主机名，并把证书的日期与路由器的时钟进行比较，因此在依赖它之前请先设置时钟（例如使用 [NTP client](./ntp.md)）。证书无效会导致 fetch 失败：

```text
failure: SSL: ssl: cert not valid (after: Sun Apr 12 23:59:59 2015 < now: Tue Sep 29 06:51:00 2026) - "OU=PositiveSSL Wildcard, CN=*.badssl.com" (6)
```

对于需要 HTTP 认证的服务器，请设置 `user` 和 `password`。Basic 认证是默认方式，会在第一次请求时发送凭据；若要使用 digest 认证，请设置 `http-auth-scheme=digest`。

HTTP 重定向会被自动跟随。`http-max-redirect-count` 限制 fetch 跟随的重定向次数：在默认值 2 下，会跟随两次重定向组成的链，第三次重定向则以该重定向状态使请求失败，例如 `failure: Status 302, Found (Location: "https://mikrotik.com/download")`。

### 向服务器发送数据 {#send-data-to-a-server}

对 API 端点使用 `http-method`、`http-header-field` 和 `http-data`：

```ros
/tool/fetch url="https://192.0.2.10/collector" http-method=post \
    http-header-field="Content-Type: application/json" \
    http-data="{\"lat\":\"56.12\",\"lon\":\"25.12\"}"
```

若 `http-header-field` 中没有 `Content-Type`，请求体会以 `application/x-www-form-urlencoded` 发送。多个头字段用逗号分隔（`"X-One: a,X-Two: b"`）。使用 `http-content-encoding=gzip`（或 `deflate`）时，POST 或 PUT 的请求体会以压缩形式发送，并带有匹配的 `Content-Encoding` 头。

若要发送生成的内容，请先把它保存到文件，再把文件读入变量，并将该变量作为 `http-data` 传入。请把命令放在同一个块中，因为 `:local` 变量只在其所在块内存在，并用 `find` 找到该文件：

```ros
{
    /export file=export.rsc
    :local data [/file/get [find name=export.rsc] contents]
    /tool/fetch url="https://192.0.2.10/collector" http-method=put \
        http-data=$data
}
```

这适用于不超过 60000 字节的文件，即在 `http-data` 的 64 KB 限制之内。更大的文件请改用 FTP 或 SFTP 上传。若要调用另一台 RouterOS 设备的 REST API，参见 [REST API](../developer-guides/rest-api.md)。

## 自动化常见任务 {#automate-common-tasks}

### 将备份上传到服务器 {#upload-a-backup-to-a-server}

保存加密备份并将其上传到 SFTP 服务器。`/system/backup/save` 会在下一条命令运行之前完成。请从 [scheduler](./scheduler.md) 脚本中运行这些命令，以便每晚在路由器之外保留一份副本：

```ros
/system/backup/save name=nightly password="backup-file-password"
/tool/fetch url="sftp://192.168.88.2/nightly.backup" upload=yes \
    src-path=nightly.backup user=backup password="server-password"
```

关于备份包含哪些内容以及如何恢复，参见 [备份](../getting-started/configuration-management/backup.md)。

### 下载并运行脚本 {#download-and-run-a-script}

从你的服务器获取配置脚本并导入。`check-certificate=yes` 可确保文件来自你的服务器；`/import` 会执行文件中的每条命令，因此请只从你掌控的服务器获取脚本。在同一个块中，下载失败会中止该块，因此旧版本的文件不会被导入：

```ros
{
    /tool/fetch url="https://config.example.com/branch.rsc" \
        check-certificate=yes dst-path=branch.rsc
    /import file-name=branch.rsc
}
```

### 向 webhook 发送通知 {#send-a-notification-to-a-webhook}

聊天服务、监控和自动化工具在 webhook URL 上接受 JSON 消息；字段名称取决于具体服务，因此请查阅其 webhook 文档。`$[...]` 会把命令的输出插入消息中，此处是路由器的名称。插入的文本不会被转义：其中的引号或反斜杠会破坏 JSON。

```ros
/tool/fetch url="https://hooks.example.com/notify" http-method=post \
    http-header-field="Content-Type: application/json" \
    check-certificate=yes output=none \
    http-data="{\"text\":\"$[/system/identity/get name]: backup done\"}"
```

当身份为 `branch-office-1` 时，服务器会收到 `{"text":"branch-office-1: backup done"}`。`output=none` 会丢弃回复。

## 在脚本中使用 fetch {#use-fetch-in-scripts}

使用 `as-value` 时，fetch 返回一个数组，而不是打印到控制台。关于 `:local` 变量、`{ }` 块和 `:onerror`，参见 [脚本](../developer-guides/scripting/index.md)。`output` 决定响应体的去向：

- `file`（默认）- 一个文件，即 `dst-path` 或来自 URL 的名称。
- `none` - 不保存到任何地方。
- `user` - 放入 `data` 键，最多 64512 字节（63 KiB）。
- `user-with-headers` - 放入 `data` 键，最多 20480 字节（20 KiB），并把响应头放入 `http-headers`。

更长的响应体会被截断且不会报错：当 `[:len ($result->"data")]` 等于该限制时，响应体很可能更长。

下面的脚本在网页内容以 `0` 开头时禁用 `ether5`，否则启用它。`:pick` 取第一个字符，因为文本文件通常以换行符结尾。fetch 失败会抛出错误，由 `:onerror` 捕获并记录日志，端口保持原状：

```ros
{
    :local url "http://192.0.2.10/state.txt"
    :onerror e in={
        :local result [/tool/fetch url=$url as-value output=user]
        :if ([:pick ($result->"data") 0 1] = "0") do={
            /interface/ethernet/set [find name=ether5] disabled=yes
        } else={
            /interface/ethernet/set [find name=ether5] disabled=no
        }
    } do={:log warning "state check failed: $e"}
}
```

`:onerror` 会把错误消息放入第一个变量；对于 HTTP 错误，第二个变量保存状态 `code` 和返回的 `http-headers`：

```ros
:onerror err,attr in={
    /tool/fetch url=http://192.168.88.2/nonexistent as-value
} do={
    :put $err; :put ($attr->"code"); :put ($attr->"http-headers")
}
```

```text
failure: Status 404, Not Found (/tool/fetch; line 2)
404
Cache-Control: no-store;Connection: Keep-Alive;Content-Length: 99;Content-Type: text/html;Date: Tue, 29 Sep 2026 07:05:39 GMT;Expires: 0;Pragma: no-cache;X-Frame-Options: sameorigin
```

## 在 VRF 中运行 fetch {#run-fetch-in-a-vrf}

要让 fetch 使用 [VRF](../user-guides/routing-and-networking-protocols/vrf.md)，请在 `address` 参数中于 `@` 之后追加 VRF 名称。两种写法都可以：

```ros
/tool/fetch url="ftp://admin:mypassword@192.168.88.2/conf.rsc" \
    address=@vrf1 dst-path=backup.rsc
/tool/fetch mode=ftp address=192.168.88.2@vrf1 user=admin \
    password=mypassword src-path=conf.rsc dst-path=backup.rsc
```

VRF 不能直接写进 URL 本身：在 `url="http://192.168.88.2@vrf1/…"` 中，`@` 之后的所有内容都被当作主机名，请求会因解析错误而失败。

## 技术细节 {#technical-details}

- fetch 会打印诸如 `status: connecting` 或 `status: requesting` 之类的中间状态行，并在完成时打印包含 `status`、`code`、传输大小和 `duration` 的摘要。大小以 KiB 显示，向下取整，且有数据到达时至少为 1；`as-value` 的 `downloaded`、`uploaded` 和 `total` 字段包含相同的值。
- 每个 HTTP 请求都带有 `User-Agent: RouterOS <version>` 和 `Accept-Encoding: deflate, gzip`。
- 在 ARM64 和 x86/CHR 设备上，HTTPS 可使用 `http-version=http2`；HTTP/2 响应会用诸如 `:status` 的 HTTP/2 伪头来表示其头部。
- 当脚本把 `as-value` 与 `address=` 和 `src-path=` 一起使用时，fetch 会失败并报 `Conflicting remote paths provided in URI and parameter`。请改用 `url` 形式，或去掉 `as-value`。

有关所有属性的说明，请参阅 CLI 参考中的 [`/tool/fetch`](../cli-reference/tool/fetch.md)。
