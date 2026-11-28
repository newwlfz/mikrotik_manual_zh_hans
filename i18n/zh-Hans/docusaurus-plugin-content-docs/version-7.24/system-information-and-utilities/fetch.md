---
title: "Fetch"
description: "Fetch 是 RouterOS 中用于通过 HTTP、HTTPS、FTP、TFTP 和 SFTP 传输文件的工具，支持配置身份验证、压缩、重定向和变量存储选项。它支持下载和上传模式，并支持 VRF 集成，以便进行指定目标的传输。"
tags:
  - 'fetch'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/fetch
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Fetch 是 RouterOS 控制台工具，用于复制文件并执行基于 HTTP 的请求。它支持 HTTP、HTTPS、FTP、TFTP 和 SFTP，可向远程服务器上传、下载文件，以及执行任意 GET 或 POST 操作。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*string*; Default: ) | 目标设备的 IP 地址。追加 `@vrf_name` 可在指定 VRF 中执行 fetch 操作；使用 <code>url</code> 参数时，可以省略地址并仅提供 VRF |
| **as-value** (*set \| not-set*; Default: **not-set**) |启用后，将 fetch 结果存储到变量中（需要 `output` 参数） |
| **ascii** (*yes \| no*; Default: **no**) | 为 FTP/TFTP 传输启用 ASCII 模式 |
| **certificate**(*string*; Default: ) | 用于 HTTPS 模式下服务器验证的[证书存储中的证书](/docs/authentication-authorization-accounting/certificates)，仅在启用 <code>check-certificate</code> 时适用 |
| **check-certificate** (*yes \| yes-without-crl \| no*; Default: **no**) | 针对路由器本地证书存储启用信任链验证。`yes-without-crl` 会验证证书，但跳过 CRL 检查。仅适用于 HTTPS|
| **dst-path** (*string*; Default: ) | 保存所获取文件的目标路径|
| **duration** (*time;* Default: ) | fetch 操作的最长执行时间 |
| **host** (*string*; Default: ) | 远程 Web 服务器的主机名或虚拟主机名。当同一 IP 服务多个虚拟主机时很有用。例如，`address=manual.mikrotik.com host=forum.mikrotik.com`|
| **http-auth-scheme** (*basic\|digest*; Default: **basic**) | HTTP 身份验证方案 |
| **http-method** (*delete\|get\|head\|post\|put\|patch*; Default: **get**) | HTTP 方法 |
| **http-data** (*string*; Default: ) | 要传输的数据。最大数据限制为 64 Kb|
| **http-header-field** (*string*; Default: **\*empty\***) | 所有标头字段和值的列表，格式为 `http-header-field="h1:fff,h2:yyy"` 或 `http-header-field="h:fff\\,yyy"`（单个标头中的多个值需要使用两个反斜杠进行“转义”）。 |
| **http-content-encoding** (*deflate\|gzip*; Default: \***empty\***) | 使用 **gzip** 或 **deflate** 压缩对载荷进行编码，并添加相应的 `Content-Encoding` 标头。仅适用于 POST 和 PUT 方法 |
| **http-max-redirect-count** (*integer*; Default: 2) | fetch 自动跟随的 HTTP 重定向最大次数 |
| **http-percent-encoding**(*yes \| no*; Default: **no**) | 为请求路径启用 URL 百分号编码 |
| **http-version** (*http1\_1* \| *http2*; Default: **http1\_1**) | 选择 HTTP 协议版本。HTTP2 仅在 ARM64 和 x86/CHR 设备上受支持 |
| **idle-timeout** (*time;* Default: 10s) | 自上次读/写操作起的空闲超时时间 |
| **ip-type** (*any \| ipv4 \| ipv6;* Default: **any**) | 指定处理域名时优先使用的 IP 地址族 |
| **keep-result** (*yes \| no*; Default: **yes**) | 启用后，获取的数据将写入文件 |
| **mode** (*ftp\|http\|https\|sftp\|tftp*; Default: **http**) | 连接使用的协议。建议通过 `url` 参数指定协议（例如，`url=sftp://ip_address/path` |
| **output** (*none\|file\|user\|user-with-headers*; Default: **file**) | 确定获取的数据存储位置：<ul><li><code>none</code> - 不存储下载的数据</li><li><code>file</code> - 将下载的数据存储到文件中</li><li><code>user</code> - 将下载的数据存储到 data 变量中（变量限制为 64Kb）</li><li><code>user-with-headers</code> - 将下载的数据和标头存储到 data 变量中（变量限制为 64Kb：下载数据 20Kb，标头 44Kb）</li></ul> |
| **password** (*string*; Default: **anonymous**) |用于在远程设备上进行身份验证的密码 |
| **port** (*integer*; Default: ) | 连接使用的端口 |
| **src-address** (ip address; Default: ) | 建立连接使用的源 IP 地址，仅适用于 HTTP/S 和 SFTP 模式 |
| **src-path** (*string*; Default: ) | 远程文件的路径 |
| **upload** (*yes \| no*; Default: **no**) | 为 FTP/SFTP 传输启用上传模式，需要 `src-path` 和 `dst-path` |
| **url** (*string*; Default: ) | 资源的完整 URL；可替代单独的 `address` 和 `src-path` 参数 |
| **user** (*string*; Default: **anonymous**) |用于在远程设备上进行身份验证的用户名 |

## 配置示例 {#configuration-examples}

以下示例显示如何通过 FTP 协议从 IP 地址为 192.168.88.2 的设备复制文件名为“conf.rsc”的文件，并将其保存为文件名为“123.rsc”的文件。登录设备需要用户名和密码。

```ros
[admin@MikroTik] /tool> fetch address=192.168.88.2 src-path=conf.rsc user=admin mode=ftp password=123 dst-path=123.rsc port=21 host="" keep-result=yes
```

将文件上传到另一台路由器的示例：

```ros
[admin@MikroTik] /tool> fetch address=192.168.88.2 src-path=conf.rsc user=admin mode=ftp password=123 dst-path=123.rsc upload=yes
```

另一个文件下载示例，演示了 `url` 属性的用法。

```ros
[admin@MikroTik] /> /tool/fetch url="https://www.mikrotik.com/img/netaddresses2.pdf" mode=http
  status: finished

[admin@test_host] /> /file/print
 # NAME                     TYPE                  SIZE                 CREATION-TIME
 ...
 5 netaddresses2.pdf        .pdf file             11547                2010-06-01 11:59:51
```

可以通过在“@”符号后附加 VRF 名称，使 `/tool fetch` 通过指定 VRF 运行：

* 在 URL 中 – ```url="http://192.168.88.2@vrf1/…"```（适用于 HTTP/HTTPS，不适用于 SFTP）。
* 在 address 属性中 – ```address=192.168.88.2@vrf1```
* 作为单独的 address 参数 – ```address=@vrf1```，并结合提供 IP 的 URL。

address 属性可以与 VRF 组合，并使用“@”分隔（`address=192.168.88.2@vrf1`），也可以仅作为 address 参数，在 VRF 名称前使用“@”符号，如示例所示（使用 URL 中的地址，并将其与 address 参数中的 VRF 名称组合）：

```ros
[admin@MikroTik] /> /tool/fetch url="sftp://192.168.88.2" address=@test src-path=test.txt user=admin password="" upload=yes

  status: finished
```

### 向远程主机发送信息 {#sending-information-to-a-remote-host}

可以使用 HTTP POST 请求向已准备好接收信息的远程服务器发送信息。在以下示例中，我们将地理坐标发送到 PHP 页面：

```ros
/tool/fetch http-method=post http-header-field="Content-Type:application/json" http-data="{\"lat\":\"56.12\",\"lon\":\"25.12\"}" url="https://testserver.lv/index.php"    
```

在本示例中，数据作为文件上传。请注意，由于变量数据来自文件，文件大小不能超过 4KB。这是 RouterOS 变量的限制。

```ros
/export file=export.rsc

:global data [/file/get [/file/find name=export.rsc] contents];
:global url "https://prod-51.westeurope.logic.azure.com:443/workflows/blabla/triggers/manual/paths/invoke....";

/tool/fetch mode=https http-method=put http-data=$data url=$url
```

### 将返回值保存到变量 {#return-value-to-a-variable}

可以将 fetch 命令的结果保存到变量中。

#### 示例 1 {#example-1}

可以根据 HTTP 页面返回的结果触发特定操作。下面是一个非常简单的示例，当 PHP 页面返回“0”时禁用 **ether2**：

```ros
{
    :local result [/tool/fetch url=https://10.0.0.1/disable_ether2.php as-value output=user];
    :if ($result->"status" = "finished") do={
        :if ($result->"data" = "0") do={
            /interface/ethernet/set ether2 disabled=yes;
        } else={
            /interface/ethernet/set ether2 disabled=no;
        }
    }
}
```

#### 示例 2 {#example-2}

如果 fetch 失败，可以访问错误代码（“code”）和返回的 HTTP 标头（“http-headers”）。

```ros
:onerror err,attr in={ /tool/fetch http://127.0.0.1/error as-value} do={:put $err;:put ($attr->"code");:put ($attr->"http-headers")}
failure: Status 404, Not Found
404
Cache-Control: no-store;Connection: Keep-Alive;Content-Length: 99;Content-Type: text/html;Date: Tue, 09 Dec 2025 13:27:44 GMT;Expires: 0;Pragma: no-cache;X-Frame-Options: sameorigin 
```
