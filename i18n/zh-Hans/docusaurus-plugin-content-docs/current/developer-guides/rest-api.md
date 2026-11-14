---
sidebar_key: "developer-guides/rest-api"
sidebar_position: 2
title: "REST API"
sidebar_label: "REST API"
description: "RouterOS REST API：使用最小权限用户启用 HTTPS 访问，通过 GET、PUT、PATCH 和 DELETE 读取和更改配置，使用 POST 运行任意控制台命令，在 60 秒限制和每用户会话范围内工作，并在此基础上构建脚本、集成和仪表板。"
tags:
  - 'api'
  - 'management'
  - 'rest-api'
source: https://manual.mikrotik.com/docs/developer-guides/rest-api
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

REST API 提供对 RouterOS 命令行的 HTTP 访问。每个菜单都是 `/rest` 下的一个 URL：`/ip/address` 菜单是 `https://192.168.88.1/rest/ip/address`。JSON 请求可以读取、创建、更改和删除配置，并运行任何控制台命令。脚本、监控系统、自动化工具和 Web 仪表板使用它来管理路由器，无需 WinBox 或 SSH。

REST API 是 [API](./api/index.md) 的 JSON 封装：Web 服务器以经过身份验证的用户身份登录 API，并将每个请求作为 API 命令运行。因此，REST API 提供与控制台相同的菜单、参数和权限，[CLI 参考](../cli-reference/index.md) 对它们进行了描述。Web 服务器通过 `www-ssl` 服务（`https://<router>/rest`）以 HTTPS 提供 REST API，并通过 `www` 服务（`http://<router>/rest`）以 HTTP 提供 REST API。

使用 cURL 的第一个请求。它使用 [设置 HTTPS](#set-up-https) 中的 `rest-ca.crt` 文件，并询问 [创建 REST 用户](#create-a-rest-user) 中 `monitoring` 用户的密码：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/system/resource \
    -d .proplist=board-name,cpu-load,free-memory,uptime
```

```json
{"board-name":"hAP ax^2","cpu-load":"7","free-memory":"687116288","uptime":"1d7h44m20s"}
```

任何 HTTP 客户端都可以使用：cURL、wget、编程语言的 HTTP 库，以及另一台 RouterOS 设备上的 [`/tool/fetch`](../system-information-and-utilities/fetch.md)。

## 启用 REST 访问 {#enable-rest-access}

REST 客户端需要路由器上具备三样东西：运行中的 Web 服务（HTTPS 使用 `www-ssl`，HTTP 使用 `www`）、用于 HTTPS 的证书，以及其所在组允许使用 REST API 的用户。

### 设置 HTTPS {#set-up-https}

REST API 使用 [HTTP 基本身份验证](https://en.wikipedia.org/wiki/Basic_access_authentication) 进行身份验证：每个请求都携带用户名和密码。通过 HTTP 时，任何能看到流量的人都可以读取它们。仅在攻击者无法访问的网络上或加密隧道内使用 HTTP，其他所有地方都使用 HTTPS。

要使用自己的证书颁发机构提供 HTTPS，请创建并签署该机构以及路由器地址的服务器证书，导出该机构的证书，并将服务器证书分配给 `www-ssl`。在路由器上的终端（WinBox Terminal 或 SSH）中运行这些命令：

```ros
/certificate/add name=rest-ca common-name=rest-ca \
    key-usage=key-cert-sign,crl-sign days-valid=3650
/certificate/sign rest-ca
:delay 3s
/certificate/add name=rest-https common-name=192.168.88.1 \
    subject-alt-name=IP:192.168.88.1 days-valid=365
/certificate/sign rest-https ca=rest-ca
:delay 3s
/certificate/export-certificate rest-ca file-name=rest-ca
/ip/service/set www-ssl certificate=rest-https disabled=no
```

在 `sign` 报告 `done` 后，已签署的证书需要片刻才能供其他命令使用；`:delay` 行会等待这一点。没有它们时，下一条命令可能会失败并显示 `input does not match any value of ca`（或 `of certificate`）；请再次运行它。

将 `rest-ca.crt` 从路由器文件复制到客户端（例如使用 `scp admin@192.168.88.1:rest-ca.crt .`），并让客户端信任它：cURL 中使用 `--cacert rest-ca.crt`，Python 中使用 `verify="rest-ca.crt"`。在 URL 中按证书命名的方式访问路由器，这里是 `192.168.88.1`；客户端会拒绝为其他名称或地址颁发的证书。服务器证书有效期为一年（`days-valid=365`）；请在过期前创建新证书。

对于具有公共 DNS 名称的路由器，可以改用 Let's Encrypt 证书；请参阅 [证书](../authentication-authorization-accounting/certificates.md)。如需快速测试，cURL 中的 `-k` 和 wget 中的 `--no-check-certificate` 会跳过检查，同时也会跳过证书提供的保护。

`www-ssl` 接受 TLS 1.0、1.1 和 1.2。设置 `tls-version=only-1.2` 以拒绝较旧版本。没有证书（`certificate=none`）时，`www-ssl` 仅提供匿名密码套件，浏览器和 cURL 不接受这些套件，因此 HTTPS 请求会失败。有关所有服务设置，请参阅 [`/ip/service`](../cli-reference/ip/service/index.md)。

### 创建 REST 用户 {#create-a-rest-user}

REST API 代表用户登录 API，因此用户所在组需要同时具有 `rest-api` 和 `api` 策略。它还需要用户所执行操作对应的策略：读取需要 `read`，更改配置需要 `write`，`ping` 需要 `test`，写入文件（`export` 到文件）需要 `ftp`，使用 `/file/read` 读取文件需要 `ftp` 和 `test`，查看密码和密钥需要 `sensitive`，更改自己的密码需要 `password`。默认的 `read`、`write` 和 `full` 组包含 `api` 和 `rest-api`，但也包含 `reboot`、`sensitive` 以及用于 WinBox、SSH 和 WebFig 登录的策略，因此请为 REST 客户端创建自己的组。

为每个客户端提供自己的用户，并仅授予其所需的策略。监控系统或仪表板只读取：

```ros
/user/group/add name=rest-read policy=read,api,rest-api
/user/add name=monitoring group=rest-read \
    password="use-a-long-random-password"
```

本页中更改配置的示例使用 `admin`。对于脚本，请创建具有其任务所需策略的用户，例如用于阻止地址的 `read,write,api,rest-api`，或用于配置备份的 `read,write,ftp,test,api,rest-api`。

`/user/group/add` 会撤销它未列出的每个策略。`/user/group/set` 仅更改它列出的策略，因此使用 `!` 撤销策略，例如 `policy=!write`。有关所有策略，请参阅 [`/user/group`](../cli-reference/user/group.md) 和 [用户](../authentication-authorization-accounting/user.md)。

### 限制访问 {#restrict-access}

默认防火墙会丢弃不是来自 `LAN` 接口列表的连接，这也使 REST API 与互联网隔离。请保持这样做：通过诸如 [WireGuard](../virtual-private-networks/wireguard.md) 之类的 VPN 访问远程路由器，而不是将 Web 服务开放到互联网。请参阅 [保护路由器安全](../getting-started/securing-your-router.md)。REST API 不使用 `api` 服务：禁用 `api` 或限制其 `available-from` 不会影响 REST。

限制哪些客户端可以使用该服务（如果 VPN 客户端使用 REST，请包括它们的地址），并关闭通过 HTTP 的 REST API：

```ros
/ip/service/set www-ssl available-from=192.168.88.0/24
/ip/service/webserver/set rest-plain=no
```

- 使用 `available-from` 时，路由器会关闭来自其他地址的连接而不为其提供服务。端口仍然可见，因此请使用防火墙抵御不受信任的网络。`available-from` 适用于该服务的每个用户；要将一个用户绑定到一个客户端，请改为设置该用户的 `address`，例如 `/user/set monitoring address=192.168.88.10/32`。来自其他地址的请求随后会得到 `401 Unauthorized`。
- `rest-plain=no` 会关闭通过 HTTP 的 REST API（回复为 `403 Forbidden`），而通过 HTTP 的 WebFig 仍可工作。要完全关闭 HTTP，请禁用 `www` 服务。
- 要仅通过 HTTPS 提供 REST API，还需设置 `index-secure=no webfig-secure=no graphs-secure=no`。然后通过 HTTPS 访问主页、WebFig、图表和静态文件时会返回 `403 Forbidden`。

有关 Web 服务器设置，请参阅 [`/ip/service/webserver`](../cli-reference/ip/service/webserver.md)。

## 读取数据 {#read-data}

`GET` 请求读取一个菜单，类似于控制台中的 `print`。回复是记录列表：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/ip/address \
    -d .proplist=.id,address,interface
```

```json
[{".id":"*1","address":"192.168.88.1/24","interface":"bridge"}]
```

要读取一条记录，请将其 ID 追加到 URL。在记录具有名称的菜单中，名称也可以使用：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    "https://192.168.88.1/rest/ip/address/*1" \
    -d .proplist=address,network,interface
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/interface/ether1 \
    -d .proplist=name,type,running,mtu
```

```json
{"address":"192.168.88.1/24","interface":"bridge","network":"192.168.88.0"}
{"mtu":"1500","name":"ether1","running":"false","type":"ether"}
```

- ID 以 `*` 开头。对包含 ID 的 URL 加引号，以免 shell 展开它。按原样发送星号：路由器不会解码 `%2A`。
- 对名称中的其他保留字符进行编码，例如将空格编码为 `%20`，或将文件夹中文件名的斜杠编码为 `%2F`（`/rest/file/flash%2Fbackup.rsc`）。
- 没有记录的菜单（例如 `/system/identity` 或 `/ip/dns`）返回一个对象。

查询参数用于筛选记录。一条记录必须匹配每个参数，且值必须完全匹配。例如，具有链路的以太网接口（`running=true` 或 `yes`）：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/interface \
    -d type=ether -d running=true -d .proplist=name
```

```json
[{".id":"*5","name":"ether2"}]
```

- `.proplist` 选择回复的属性。对列表的 `GET` 始终包含 `.id`。
- 当没有记录匹配时，回复是空列表 `[]`。
- 对于其他条件（或、非、小于），请在 `print` 命令的正文中使用 `.query`，如 [选择记录和属性](#select-records-and-properties) 中所示。在 URL 中，`.query` 不是查询。

## 更改配置 {#change-the-configuration}

HTTP 方法选择控制台命令：

| 方法 | 控制台命令 | 成功时的回复 |
| :-- | :-- | :-- |
| `GET` | `print` | `200 OK`，带有记录或记录列表 |
| `PUT` | `add` | `201 Created`，带有新记录；`Location` 头包含其 URL |
| `PATCH` | `set` | `200 OK`，带有更改后的记录 |
| `DELETE` | `remove` | `204 No Content`，空正文 |
| `POST` | 任意命令 | `200 OK`，带有命令的回复 |

将参数作为 JSON 对象发送，并带有 `Content-Type: application/json` 头。没有该头时，路由器会返回 `415 Unsupported Media Type`。

### 创建记录 {#create-a-record}

对菜单执行 `PUT` 会为每个请求创建一条记录，这里是在 `guest` 上的一个地址，`guest` 是访客网络的网桥：

```bash
curl --cacert rest-ca.crt -u admin -X PUT \
    https://192.168.88.1/rest/ip/address \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.99.1/24","interface":"guest"}'
```

```json
{".id":"*18","actual-interface":"guest","address":"192.168.99.1/24","disabled":"false","dynamic":"false","interface":"guest","invalid":"false","network":"192.168.99.0","slave":"false","vrf":"main"}
```

### 更改记录 {#change-a-record}

对记录 URL 执行 `PATCH` 会更改正文中的参数并返回整条记录：

```bash
curl --cacert rest-ca.crt -u admin -X PATCH \
    "https://192.168.88.1/rest/ip/address/*18" \
    -H "Content-Type: application/json" \
    --data '{"comment":"guest network"}'
```

```json
{".id":"*18","actual-interface":"guest","address":"192.168.99.1/24","comment":"guest network","disabled":"false","dynamic":"false","interface":"guest","invalid":"false","network":"192.168.99.0","slave":"false","vrf":"main"}
```

没有 `write` 策略的用户执行 `PATCH` 会失败，返回 `400` 和 `missing or invalid resource identifier`。要在一次请求中更改多条记录，请向菜单的 `set` 命令发送 `POST`，并用逗号分隔 ID：`{".id":"*12,*13","comment":"imported"}`。

`PATCH` 仅适用于记录。要更改没有记录的菜单，例如 `/system/identity`、`/ip/dns` 或 `/ip/service/webserver`，请使用 `POST` 运行其 `set` 命令。`set` 返回空列表：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/system/identity/set \
    -H "Content-Type: application/json" \
    --data '{"name":"branch-office-1"}'
curl --cacert rest-ca.crt -u monitoring \
    https://192.168.88.1/rest/system/identity
```

```json
[]
{"name":"branch-office-1"}
```

### 删除记录 {#delete-a-record}

对记录 URL 执行 `DELETE` 会删除它并返回空正文。对同一 ID 第二次执行 `DELETE` 会返回 `404`，这是这两条命令的唯一输出：

```bash
curl --cacert rest-ca.crt -u admin -X DELETE \
    "https://192.168.88.1/rest/ip/address/*18"
curl --cacert rest-ca.crt -u admin -X DELETE \
    "https://192.168.88.1/rest/ip/address/*18"
```

```json
{"error":404,"message":"Not Found"}
```

### 值 {#values}

- 回复将每个值编码为字符串，数字和布尔值也是如此（`"true"`、`"false"`）。
- 请求可以将值作为字符串发送，也可以作为 JSON 数字和布尔值发送：`"disabled":"yes"` 和 `"disabled":true` 效果相同。
- 不带值的命令标志（例如 `once`、`compact` 或 `as-string`）使用空字符串：`"once":""`。
- 控制台的未命名参数（例如 `/interface/ethernet/monitor ether2` 中的接口）是 `numbers`：`{"numbers":"ether2","once":""}`。

## 运行命令 {#run-commands}

`POST` 运行任何控制台命令。URL 是菜单路径和命令名，JSON 正文包含命令的参数。例如，要更改经过身份验证的用户自己的密码（该用户需要 `password` 策略）：

```text
POST https://192.168.88.1/rest/password
{"old-password":"old","new-password":"N3w","confirm-new-password":"N3w"}
```

回复的结构与 [API](./api/index.md) 回复相同：

- 返回记录的命令（`print`、`ping`、`monitor-traffic`）返回对象列表，每条记录一个对象（`!re` 语句）。
- 在 `!done` 语句中返回数据的命令会返回包含该数据的对象，通常是 `ret` 中的值：`add` 的新记录 ID、`print count-only` 的记录数、带有 `as-string` 的 `execute` 的输出。
- 不返回任何内容的命令返回空列表 `[]`，对于某些命令则返回 `[{}]`。
- 报告进度的命令（`bandwidth-test`、`fetch`、`check-for-updates`）会在 `.section` 中对其回复编号。

回复在命令结束时到达：REST API 不会流式传输输出。

### 选择记录和属性 {#select-records-and-properties}

两个特殊键选择命令返回的内容：`.proplist` 选择属性，适用于任何返回记录的命令；`.query` 选择记录，适用于 `print`。`.proplist` 是逗号分隔的字符串或字符串列表：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/ip/address/print \
    -H "Content-Type: application/json" \
    --data '{".proplist":"address,interface"}'
```

```json
[{"address":"192.168.88.1/24","interface":"bridge"}]
```

`.query` 是 API 查询词的列表，不带前导 `?`，按栈求值：`type=ether` 匹配值，`<l2mtu=1600` 和 `>` 进行比较，`#|!` 用 OR 组合前两个结果并对结果取反。例如，`{".query":["type=ether","type=vlan","#|!"]}` 是以下 API 语句：

```text
/interface/print
?type=ether
?type=vlan
?#|!
```

[API 查询](./api/index.md#queries) 部分解释了查询词和运算符。以下请求返回既不是以太网接口也不是 VLAN 接口的接口：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/interface/print \
    -H "Content-Type: application/json" \
    --data '{".proplist":"name,type",
        ".query":["type=ether","type=vlan","#|!"]}'
```

```json
[{"name":"bridge","type":"bridge"},{"name":"guest","type":"bridge"},
{"name":"lo","type":"loopback"},{"name":"wifi1","type":"wifi"},
{"name":"wifi2","type":"wifi"}]
```

`count-only` 则返回记录数：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/ip/address/print \
    -H "Content-Type: application/json" --data '{"count-only":""}'
```

```json
{"ret":"1"}
```

### 将命令保持在 60 秒以内 {#keep-commands-within-60-seconds}

路由器会结束运行 60 秒的请求，并返回 `400 Bad Request`，详细信息为 `Session closed`。持续时间参数不会延长该限制：要求运行一小时的带宽测试仍会在 60 秒后结束。

一直运行直到你停止的命令，例如不带 `count` 的 `ping`、`monitor` 命令以及不带 `duration` 的 `bandwidth-test`，总是会触及该限制：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/ping \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.88.10"}'
```

```json
{"detail":"Session closed","error":400,"message":"Bad Request"}
```

使用参数限制此类命令。使用 `count` 时，`ping` 会为每个回显回复返回一条记录：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/ping \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.88.10","count":"3"}'
```

```json
[{"avg-rtt":"551us","host":"192.168.88.10","max-rtt":"551us","min-rtt":"551us","packet-loss":"0","received":"1","sent":"1","seq":"0","size":"56","time":"551us","ttl":"64"},
{"avg-rtt":"536us","host":"192.168.88.10","max-rtt":"551us","min-rtt":"521us","packet-loss":"0","received":"2","sent":"2","seq":"1","size":"56","time":"521us","ttl":"64"},
{"avg-rtt":"538us","host":"192.168.88.10","max-rtt":"551us","min-rtt":"521us","packet-loss":"0","received":"3","sent":"3","seq":"2","size":"56","time":"542us","ttl":"64"}]
```

`duration` 短于限制的带宽测试每秒返回一条记录，其中包含测试的 `status`：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/tool/bandwidth-test \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.88.2","user":"admin",
        "password":"<password>","duration":"3s",
        ".proplist":"status,duration"}'
```

```json
[{".section":"0","status":"connecting"},
{".section":"1","duration":"0s","status":"running"},
{".section":"2","duration":"1s","status":"running"},
{".section":"3","duration":"2s","status":"running"},
{".section":"4","duration":"3s","status":"done testing"}]
```

`monitor` 命令使用 `once` 并返回单个样本。例如，两个接口上的当前流量，以比特每秒为单位：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/interface/monitor-traffic \
    -H "Content-Type: application/json" \
    --data '{"interface":"ether1,ether2","once":"",
        ".proplist":"name,rx-bits-per-second,tx-bits-per-second"}'
```

```json
[{"name":"ether1","rx-bits-per-second":"0","tx-bits-per-second":"0"},
{"name":"ether2","rx-bits-per-second":"25128","tx-bits-per-second":"8816"}]
```

要运行耗时超过 60 秒的任务，请使用不带 `as-string` 的 `/execute` 将其作为后台作业启动（请参阅 [运行脚本并写入日志](#run-a-script-and-write-to-the-log)）：请求会立即返回作业 ID，作业继续运行。让作业将其结果写入日志或文件。

### 从不同用户发送并行请求 {#send-parallel-requests-from-separate-users}

路由器按到达顺序一次运行一个用户的请求。不同用户的请求并行运行。因此，长命令会阻塞同一用户的所有其他请求，直到它结束。

当客户端放弃请求时，该请求仍会在路由器上继续运行，直到命令结束或达到 60 秒限制。排在其后的同一用户请求在达到限制时会失败并显示 `Session closed`。为独立工作的客户端（例如仪表板和自动化脚本）分配不同的用户。

## 自动化常见任务 {#automate-common-tasks}

### 阻止一个地址一天 {#block-an-address-for-a-day}

入侵检测系统或日志分析器可以将攻击者的地址添加到防火墙会丢弃的地址列表中。使用 `timeout` 时，路由器会自行删除该条目：

```bash
curl --cacert rest-ca.crt -u admin -X PUT \
    https://192.168.88.1/rest/ip/firewall/address-list \
    -H "Content-Type: application/json" \
    --data '{"list":"blocked","address":"203.0.113.45",
        "timeout":"1d","comment":"reported by IDS"}'
```

```json
{".id":"*3C","address":"203.0.113.45","comment":"reported by IDS","creation-time":"2026-09-28 16:48:57","disabled":"false","dynamic":"true","list":"blocked","timeout":"1d"}
```

超时结束时，路由器会删除该条目；要提前解除对该地址的阻止，请 `DELETE` 该条目的 URL（`/rest/ip/firewall/address-list/*3C`）。添加已在列表中的地址会失败，返回 `400` 和 `failure: already have such entry`。

该列表本身不会阻止任何内容：防火墙规则会丢弃其地址。在路由器上的终端中一次性添加该规则。`raw` 表中的规则在连接跟踪之前处理数据包，因此它会尽早丢弃被阻止的地址，适用于发往路由器和经过路由器的流量。`in-interface-list=WAN` 将其限制为来自互联网的数据包，因此错误的报告不会切断你的 LAN：

```ros
/ip/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=blocked \
    comment="drop blocked addresses"
```

在整个超时期间，被阻止的地址无法从互联网访问路由器或其后面的网络，因此在自动化之前，请检查报告系统发送的内容。请参阅 [地址列表](../firewall-and-quality-of-service/firewall/address-lists.md)。

另一台 RouterOS 设备可以使用 `/tool/fetch` 发送此类请求；这个请求添加一个没有超时的条目。调用方路由器需要导入 `rest-ca.crt`（`/certificate/import`）以检查证书；没有它，fetch 会失败并显示 `no trusted CA certificate found`：

```ros
/tool/fetch url="https://192.168.88.1/rest/ip/firewall/address-list" \
    http-method=put check-certificate=yes \
    http-header-field="Content-Type: application/json" \
    http-data="{\"list\":\"blocked\",\"address\":\"203.0.113.46\"}" \
    user=admin password="<password>" output=user
```

### 将配置保存到服务器 {#save-the-configuration-to-a-server}

带 `file` 的 `export` 会将配置写入路由器上的文件。`/file/read` 从 `offset` 开始，每次请求最多返回 32768 字节，因此备份服务器可以收集该文件并将其从路由器删除。用户需要 `read,write,ftp,test,api,rest-api`。在以下命令中，`jq` 从 JSON 回复中提取文件内容：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/export \
    -H "Content-Type: application/json" --data '{"file":"backup"}'
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/file/read \
    -H "Content-Type: application/json" \
    --data '{"file":"backup.rsc","chunk-size":"32768","offset":"0"}' \
    | jq -j '.[0].data' > backup.rsc
curl --cacert rest-ca.crt -u admin -X DELETE \
    https://192.168.88.1/rest/file/backup.rsc
```

对于大于 32768 字节的文件，请重复读取，并将 `offset` 增加已接收的字节数，直到回复中不再包含数据（文件末尾为 `[{"data":""}]`；超过末尾的 offset 会失败并显示 `failure: chunk out of file bounds`）。请参阅 [`/file/read`](../cli-reference/file/read.md)。

导出会省略密码和私钥。要包含它们，请添加 `"show-sensitive":""`，并同时为用户授予 `sensitive` 策略；没有该策略时，文件仍会省略它们。请像保护路由器密码一样保护此类文件。有关整个配置的二进制备份，请参阅 [备份](../getting-started/configuration-management/backup.md)。

### 运行脚本并写入日志 {#run-a-script-and-write-to-the-log}

要运行 `/system/script` 中的脚本，请在 `.id` 中指定其名称（或提供其 ID）：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/system/script/run \
    -H "Content-Type: application/json" --data '{".id":"daily-report"}'
```

`/execute` 运行作为脚本给出的控制台命令。没有 `as-string` 时，它会将脚本作为作业启动并返回作业 ID；使用 `as-string` 时，它会等待并返回脚本的输出：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/execute \
    -H "Content-Type: application/json" \
    --data '{"script":"/log/info \"backup job started\""}'
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/execute \
    -H "Content-Type: application/json" \
    --data '{"script":":put [/system/clock/get date]","as-string":""}'
```

```json
{"ret":"*126"}
{"ret":"2026-09-28"}
```

### 检查 RouterOS 更新 {#check-for-routeros-updates}

`check-for-updates` 向更新服务器询问路由器通道的最新版本。没有 `once` 时，回复会列出检查结束前的进度，最后一条记录包含 `status` 和 `latest-version`：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/system/package/update/check-for-updates \
    -H "Content-Type: application/json" --data '{}'
```

### 移动防火墙规则 {#move-a-firewall-rule}

`move` 将一条规则放在另一条规则之前，就像在控制台中一样：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/ip/firewall/nat/move \
    -H "Content-Type: application/json" \
    --data '{".id":"*9","destination":"*C"}'
```

要在某个位置创建规则，请在 `PUT` 正文中添加 `place-before`，其值为必须跟随其后的规则的 ID。

### 读取 SNMP OID {#read-snmp-oids}

带 `oid` 的 `print` 会返回每个具有 SNMP OID 的属性的 OID，而不是其值：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/system/resource/print \
    -H "Content-Type: application/json" --data '{"oid":""}'
```

```json
[{"build-time":".1.3.6.1.4.1.14988.1.1.7.6.0","cpu-frequency":".1.3.6.1.4.1.14988.1.1.3.14.0","total-memory":".1.3.6.1.2.1.25.2.3.1.5.65536","uptime":".1.3.6.1.2.1.1.3.0"}]
```

### 在 Python 中读取接口流量 {#read-interface-traffic-in-python}

以下 Python 程序使用 `requests` 库打印每个具有链路的以太网接口的当前流量。`json=` 会以 JSON 形式发送正文并带有 `Content-Type` 头，会话会为两个请求复用一个连接：

```python

ROUTER = "https://192.168.88.1/rest"

session = requests.Session()
session.auth = ("monitoring", "use-a-long-random-password")
session.verify = "rest-ca.crt"

# Names of the Ethernet interfaces that have a link
ports = session.get(
    f"{ROUTER}/interface",
    params={"type": "ether", "running": "true", ".proplist": "name"},
)
ports.raise_for_status()
names = ",".join(port["name"] for port in ports.json())

# One sample of the traffic on these interfaces
traffic = session.post(
    f"{ROUTER}/interface/monitor-traffic",
    json={"interface": names, "once": ""},
)
traffic.raise_for_status()

for port in traffic.json():
    rx = int(port["rx-bits-per-second"]) / 1_000_000
    tx = int(port["tx-bits-per-second"]) / 1_000_000
    print(f"{port['name']}: rx {rx:.1f} Mbit/s, tx {tx:.1f} Mbit/s")
```

```text
ether2: rx 0.1 Mbit/s, tx 0.0 Mbit/s
```

有关二进制 [API](./api/index.md)，请参阅 [Python 3 示例](./api/python3-example.md)。

## 构建仪表板或集成 {#build-a-dashboard-or-integration}

Web 仪表板、状态页面或与另一系统的集成可以通过 REST API 读取路由器，AI 助手可以根据本页和 CLI 参考编写此类工具：向它提供本页的地址以及该工具所用菜单的 CLI 参考页面的地址。给助手提供以下信息，或者在你自行编写时牢记：

- **用于 REST 调用的后端。** 路由器不发送 CORS 头，并以 `503` 回应 `OPTIONS` 预检请求，因此从另一个地址提供的网页无法从浏览器调用 REST API。让一个小型服务器端程序（仪表板的后端或代理）发送请求。它还能让路由器的密码不进入浏览器。
- **只读用户。** 创建一个具有 `read,api,rest-api` 的组，如 [创建 REST 用户](#create-a-rest-user) 中所述，并为仪表板创建一个单独的用户，将该用户的 `address` 设置为后端的地址。仅读取的仪表板即使代码有误也无法更改配置。
- **不要让助手获得管理员密码。** 不要向 AI 助手或它编写的代码提供 `admin` 凭据。为生成的代码提供只读用户，并仅为该工具真正需要的操作添加写访问权限。
- **自己的用户，以及短请求。** 一个用户的请求一次运行一个，因此一次轮询许多值的仪表板会逐个等待。使用带 `once` 的 `monitor` 命令、带 `count` 的 `ping` 以及 `.proplist` 来保持回复较小。
- **回复中的字符串。** 每个值都以字符串形式到达：在计算前转换数字。流量速率以比特每秒为单位，内存和磁盘大小以字节为单位，`cpu-load` 以百分比为单位，`uptime` 等持续时间采用 RouterOS 格式，例如 `1d7h44m20s`。
- **一个连接。** 为轮询复用 HTTP 连接（keep-alive）以节省 TCP 和 TLS 设置。路由器在任何连接上都会将用户的登录状态保持 10 分钟，因此频繁轮询不会每次都登录。
- **菜单和参数。** [CLI 参考](../cli-reference/index.md) 描述了每个菜单和参数。路由器还通过 `/console/inspect` 描述自身，它会列出菜单的命令和参数：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/console/inspect \
    -H "Content-Type: application/json" \
    --data '{"request":"child","path":"ip,address,add",
        ".proplist":"name,node-type"}'
```

```json
[{"name":"add","node-type":"cmd"},{"name":"address","node-type":"arg"},{"name":"broadcast","node-type":"arg"},{"name":"comment","node-type":"arg"},{"name":"copy-from","node-type":"arg"},{"name":"disabled","node-type":"arg"},{"name":"interface","node-type":"arg"},{"name":"netmask","node-type":"arg"},{"name":"network","node-type":"arg"}]
```

在针对生产路由器运行助手编写的代码之前，请使用只读用户或在测试路由器上进行测试。

## 排查 REST 请求问题 {#troubleshoot-rest-requests}

HTTP 状态码显示请求是否成功。失败时（400 或更高），正文是一个 JSON 对象，代码在 `error` 中，描述在 `message` 中，对于大多数错误，路由器的原因在 `detail` 中。例如，使用 `{".id":"ether1"}` 的 `POST /rest/interface/remove` 会失败，因为 `/interface` 没有 `remove` 命令：

```json
{"detail":"no such command or directory (remove)","error":400,"message":"Bad Request"}
```

| 回复 | 原因 |
| :-- | :-- |
| `401 Unauthorized` | 用户名或密码错误，组没有 `rest-api` 策略，或用户的 `address` 不允许该客户端。 |
| `500`、`std failure: not allowed (9)` | 组具有 `rest-api` 但没有 `api` 策略。 |
| `500`、`not enough permissions (9)` | 组缺少该命令的策略，例如更改需要 `write`，`ping` 需要 `test`。 |
| `400`、`missing or invalid resource identifier` | 路由器无法对记录应用 `PATCH` 或 `DELETE`：URL 中没有记录 ID（例如对没有记录的菜单执行 `PATCH`；请使用带 `set` 的 `POST`）、无法删除的记录（以太网接口）、路由器拒绝的值，或没有 `write` 策略的用户。 |
| `400`、`no such command or directory (x)` | 菜单、命令或记录名称 `x` 不存在。 |
| `400`、`no such command` | 菜单中不存在该命令，或对命令发送了 `GET`。 |
| `400`、`no such command prefix` | URL 的 ID 中包含百分号编码的 `*`（`%2A`）。 |
| `400`、`unknown parameter x`、`invalid value for argument x`、`missing =x=`、`failure: ...` | 控制台拒绝了这些参数；详细信息是控制台的错误消息。 |
| `400`、`Failed to parse json` | 正文不是有效的 JSON，或数字包含指数。 |
| `400`、`Session closed` | 命令运行了 60 秒，或请求排在同一用户的此类请求之后等待。请参阅 [将命令保持在 60 秒以内](#keep-commands-within-60-seconds)。 |
| `403 Forbidden`（HTML 页面） | 此协议的 REST API 已关闭（`/ip/service/webserver` 中的 `rest-plain` 或 `rest-secure`）。 |
| `404 Not Found` | 没有记录具有此 ID。 |
| `415 Unsupported Media Type` | 请求有正文但没有 `Content-Type: application/json` 头。 |
| 连接重置 | 客户端地址不在服务的 `available-from` 中。 |
| TLS 或证书错误 | 客户端不信任证书，URL 中路由器的名称与证书不同，或 `www-ssl` 没有证书。 |

日志在 `account` 主题中记录 REST 登录：`user monitoring logged in from 192.168.88.10 via rest-api`，随后是 `via api` 的登录。没有 `api` 策略的组会在 REST 登录后记录 `login failure for user monitoring via api`：

```ros
/log/print where topics~"account"
```

`/user/active` 会将每个 REST 登录列出两次：一次是通过 `via rest-api` 并带有客户端地址，一次是通过 `via api` 且没有地址。

## 技术细节 {#technical-details}

### 会话 {#sessions}

- REST 服务器使用用户的凭据登录 API，并将该登录保持 10 分钟。在此期间，无论请求通过一个还是多个 HTTP 连接到达，都会使用该登录；10 分钟后的下一个请求会再次登录。
- 使用 `/user/set`（密码、`disabled`、`address`）或 `/user/remove` 对用户所做的更改会在下一个请求时生效。对组策略的更改会在登录续期时生效，最多 10 分钟后。
- 一个用户的请求一次运行一个；不同用户的请求并行运行。

### JSON 格式 {#json-format}

路由器大体遵循 ECMA-404 JSON 标准：

- 回复将每个值编码为字符串，即使属性包含数字或布尔值。
- 请求中的 JSON 数字可以是八进制（前导 `0`，`010` 为 8）或十六进制（`0x` 前缀）。带指数的数字（`2e0`）会被拒绝并显示 `Failed to parse json`。
- 作为字符串发送的数字会按控制台读取它的方式读取：`"5"` 为 5，`"0x4"` 为 4。

### HTTP {#http}

- 路由器使用 HTTP/1.1 并保持连接打开（keep-alive），这节省了下一个请求的 TCP 和 TLS 设置。
- 没有凭据的请求会得到 `401` 和 `WWW-Authenticate: Basic`。
- `PUT` 会返回 `201 Created`，并在 `Location` 头中包含新记录的 URL，例如 `Location: https://192.168.88.1/rest/ip/address/*18`。`DELETE` 返回 `204 No Content`。
- REST API 的错误回复是 JSON 对象；在 `/ip/service/webserver` 中关闭的 Web 服务器部分会返回 HTML `403` 页面。
