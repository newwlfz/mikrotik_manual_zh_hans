---
title: "REST API"
description: "RouterOS REST API：使用最小权限用户启用 HTTPS 访问，通过 GET、PUT、PATCH 和 DELETE 读取和修改配置，通过 POST 运行任意控制台命令，在 60 秒限制和按用户会话内工作，并基于此构建脚本、集成和仪表板。"
tags:
  - 'api'
  - 'management'
  - 'rest-api'
source: https://manual.mikrotik.com/docs/7.25/developer-guides/rest-api
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "developer-guides/scripting"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

REST API 提供对 RouterOS 命令行的 HTTP 访问。每个菜单都是 `/rest` 下的 URL：`/ip/address` 菜单对应 `https://192.168.88.1/rest/ip/address`。JSON 请求可读取、创建、修改和删除配置，并运行任意控制台命令。脚本、监控系统、自动化工具和 Web 仪表板可使用它管理路由器，而无需 WinBox 或 SSH。

REST API 是 [API](/docs/developer-guides/api) 的 JSON 封装：Web 服务器以已认证用户身份登录 API，并将每个请求作为 API 命令运行。因此，REST API 提供与控制台相同的菜单、参数和权限，[CLI 参考](/docs/cli-reference) 对其进行了说明。Web 服务器通过 `www-ssl` 服务以 HTTPS 提供 REST API（`https://<router>/rest`），并通过 `www` 服务以 HTTP 提供 REST API（`http://<router>/rest`）。

使用 cURL 发起第一个请求。该请求使用 [设置 HTTPS](#set-up-https) 中的 `rest-ca.crt` 文件，并询问 [创建 REST 用户](#create-a-rest-user) 中 `monitoring` 用户的密码：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/system/resource \
    -d .proplist=board-name,cpu-load,free-memory,uptime
```

```json
{"board-name":"hAP ax^2","cpu-load":"7","free-memory":"687116288","uptime":"1d7h44m20s"}
```

任何 HTTP 客户端都可使用：cURL、wget、编程语言的 HTTP 库，以及另一台 RouterOS 设备上的 [`/tool/fetch`](/docs/system-information-and-utilities/fetch)。

## 启用 REST 访问 {#enable-rest-access}

REST 客户端需要路由器上具备三项条件：正在运行的 Web 服务（HTTPS 使用 `www-ssl`，HTTP 使用 `www`）、HTTPS 证书，以及所属组允许 REST API 的用户。

### 设置 HTTPS {#set-up-https}

REST API 使用 [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) 进行身份验证：每个请求都携带用户名和密码。通过 HTTP 传输时，任何能够查看流量的人都可以读取这些信息。仅在攻击者无法访问的网络或加密隧道内使用 HTTP，其他场景均使用 HTTPS。

要使用自己的证书颁发机构提供 HTTPS 服务，请创建并签署该机构证书以及路由器地址的服务器证书，导出机构证书，并将服务器证书分配给 `www-ssl`。在路由器上的终端（WinBox Terminal 或 SSH）中运行以下命令：

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

`sign` 报告 `done` 后片刻，已签署证书才可供其他命令使用；`:delay` 行用于等待该过程。如果没有这些行，下一条命令可能失败并显示 `input does not match any value of ca`（或 `of certificate`）；重新运行该命令即可。

将 `rest-ca.crt` 从路由器的文件复制到客户端（例如使用 `scp admin@192.168.88.1:rest-ca.crt .`），并让客户端信任它：在 cURL 中使用 `--cacert rest-ca.crt`，在 Python 中使用 `verify="rest-ca.crt"`。在 URL 中按证书中指定的名称访问路由器，此处为 `192.168.88.1`；客户端会拒绝为其他名称或地址签发的证书。服务器证书有效期为一年（`days-valid=365`）；请在到期前创建新证书。

对于具有公共 DNS 名称的路由器，可以改用 Let's Encrypt 证书；请参阅 [Certificates](/docs/authentication-authorization-accounting/certificates)。如需快速测试，cURL 中的 `-k` 和 wget 中的 `--no-check-certificate` 会跳过检查，同时也会跳过证书提供的保护。

`www-ssl` 接受 TLS 1.0、1.1 和 1.2。设置 `tls-version=only-1.2` 可拒绝较旧版本。如果没有证书（`certificate=none`），`www-ssl` 仅提供匿名加密套件，浏览器和 cURL 不接受这些套件，因此 HTTPS 请求会失败。有关所有服务设置，请参阅 [`/ip/service`](/docs/cli-reference/ip/service)。

### 创建 REST 用户 {#create-a-rest-user}

REST API 代表用户登录 API，因此用户组需要同时具备 `rest-api` 和 `api` 策略。该用户组还需要具备与用户操作对应的策略：`read` 用于读取，`write` 用于更改配置，`test` 用于 `ping`，`ftp` 用于写入文件（`export` 到文件），`ftp` 和 `test` 用于通过 `/file/read` 读取文件，`sensitive` 用于查看密码和密钥，`password` 用于更改自己的密码。默认 `read`、`write` 和 `full` 组包含 `api` 和 `rest-api`，但也包含 `reboot`、`sensitive` 以及 WinBox、SSH 和 WebFig 登录策略，因此请为 REST 客户端创建自己的用户组。

为每个客户端创建独立用户，并仅授予其所需策略。监控系统或仪表盘只读取：

```ros
/user/group/add name=rest-read policy=read,api,rest-api
/user/add name=monitoring group=rest-read \
    password="use-a-long-random-password"
```

本页中更改配置的示例使用 `admin`。对于脚本，请创建一个具有其任务所需策略的用户，例如使用 `read,write,api,rest-api` 阻止地址，或使用 `read,write,ftp,test,api,rest-api` 进行配置备份。

`/user/group/add` 会撤销其未列出的所有策略。`/user/group/set` 仅更改其列出的策略，因此请使用 `!` 撤销某项策略，例如 `policy=!write`。有关所有策略，请参阅 [`/user/group`](/docs/cli-reference/user/group) 和 [User](/docs/authentication-authorization-accounting/user)。

### 限制访问 {#restrict-access}

默认防火墙会丢弃并非来自 `LAN` 接口列表、发往路由器的连接，这也会使 REST API 无法从互联网访问。请保持该配置：通过 [WireGuard](/docs/virtual-private-networks/wireguard) 等 VPN 访问远程路由器，而不要向互联网开放 Web 服务。请参阅 [保护路由器安全](/docs/getting-started/securing-your-router)。REST 不使用 `api` 服务：禁用 `api` 或限制其 `available-from` 不会影响 REST。

限制可使用该服务的客户端（如果 VPN 客户端使用 REST，请包含其地址），并关闭基于 HTTP 的 REST API：

```ros
/ip/service/set www-ssl available-from=192.168.88.0/24
/ip/service/webserver/set rest-plain=no
```

- 使用 `available-from` 时，路由器会关闭来自其他地址的连接，而不为其提供服务。端口仍然可见，因此请使用防火墙防范不受信任的网络。`available-from` 适用于该服务的所有用户；要将某个用户绑定到某个客户端，请改为设置该用户的 `address`，例如 `/user/set monitoring address=192.168.88.10/32`。来自其他地址的请求将收到 `401 Unauthorized`。
- `rest-plain=no` 会关闭基于 HTTP 的 REST API（回复为 `403 Forbidden`），而基于 HTTP 的 WebFig 仍可正常工作。要完全关闭 HTTP，请禁用 `www` 服务。
- 要仅通过 HTTPS 提供 REST API，还需设置 `index-secure=no webfig-secure=no graphs-secure=no`。此后，通过 HTTPS 访问主页、WebFig、图形和静态文件将回复 `403 Forbidden`。

有关 Web 服务器设置，请参阅 [`/ip/service/webserver`](/docs/cli-reference/ip/service/webserver)。

## 读取数据 {#read-data}

`GET` 请求读取菜单，类似于控制台中的 `print`。回复是记录列表：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/ip/address \
    -d .proplist=.id,address,interface
```

```json
[{".id":"*1","address":"192.168.88.1/24","interface":"bridge"}]
```

要读取一条记录，请将该记录的 ID 追加到 URL。对于记录具有名称的菜单，也可以使用名称：

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

- ID 以 `*` 开头。为包含该字符的 URL 加引号，以免 shell 展开它。按原样发送星号：路由器不会解码 `%2A`。
- 对名称中的其他保留字符进行编码，例如将空格编码为 `%20`，将文件夹中文件的斜杠编码为 `%2F`（`/rest/file/flash%2Fbackup.rsc`）。
- 没有记录的菜单，例如 `/system/identity` 或 `/ip/dns`，返回一个对象。

查询参数用于过滤记录。一条记录必须匹配所有参数，且值必须完全匹配。例如，具有链路的以太网接口（`running=true` 或 `yes`）：

```bash
curl --cacert rest-ca.crt -u monitoring -G \
    https://192.168.88.1/rest/interface \
    -d type=ether -d running=true -d .proplist=name
```

```json
[{".id":"*5","name":"ether2"}]
```

- `.proplist` 选择回复中的属性。对列表执行 `GET` 时始终包含 `.id`。
- 当没有记录匹配时，回复为空列表 `[]`。
- 对于其他条件（或、非、小于），请在 `print` 命令的请求体中使用 `.query`，如 [选择记录和属性](#select-records-and-properties) 中所示。在 URL 中，`.query` 不是查询。

## 更改配置 {#change-the-configuration}

HTTP 方法选择对应的控制台命令：

| 方法 | 控制台命令 | 成功时的回复 |
| :-- | :-- | :-- |
| `GET` | `print` | `200 OK`，包含一条记录或记录列表 |
| `PUT` | `add` | `201 Created`，包含新记录；`Location` 标头包含其 URL |
| `PATCH` | `set` | `200 OK`，包含已更改的记录 |
| `DELETE` | `remove` | `204 No Content`，空请求体 |
| `POST` | 任意命令 | `200 OK`，包含命令的回复 |

将参数作为 JSON 对象发送，并携带 `Content-Type: application/json` 标头。未携带该标头时，路由器会返回 `415 Unsupported Media Type`。

### 创建记录 {#create-a-record}

向菜单发送 `PUT` 请求，每次请求创建一条记录，以下示例在 `guest` 上创建一个地址，该网桥用于访客网络：

```bash
curl --cacert rest-ca.crt -u admin -X PUT \
    https://192.168.88.1/rest/ip/address \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.99.1/24","interface":"guest"}'
```

```json
{".id":"*18","actual-interface":"guest","address":"192.168.99.1/24","disabled":"false","dynamic":"false","interface":"guest","invalid":"false","network":"192.168.99.0","slave":"false","vrf":"main"}
```

### 修改记录 {#change-a-record}

向记录的 URL 发送 `PATCH` 请求，会修改请求体中的参数并返回整条记录：

```bash
curl --cacert rest-ca.crt -u admin -X PATCH \
    "https://192.168.88.1/rest/ip/address/*18" \
    -H "Content-Type: application/json" \
    --data '{"comment":"guest network"}'
```

```json
{".id":"*18","actual-interface":"guest","address":"192.168.99.1/24","comment":"guest network","disabled":"false","dynamic":"false","interface":"guest","invalid":"false","network":"192.168.99.0","slave":"false","vrf":"main"}
```

没有 `write` 策略的用户发送 `PATCH` 请求会失败，返回 `400` 和 `missing or invalid resource identifier`。要在一个请求中修改多条记录，请向菜单的 `set` 命令发送 `POST` 请求，ID 之间用逗号分隔：`{".id":"*12,*13","comment":"imported"}`。

`PATCH` 仅适用于记录。要修改没有记录的菜单，例如 `/system/identity`、`/ip/dns` 或 `/ip/service/webserver`，请使用 `POST` 运行其 `set` 命令。`set` 返回空列表：

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

对记录 URL 执行 `DELETE` 会删除该记录并返回空正文。再次对同一 ID 执行 `DELETE` 会返回 `404`，这是这两个命令的唯一输出：

```bash
curl --cacert rest-ca.crt -u admin -X DELETE \
    "https://192.168.88.1/rest/ip/address/*18"
curl --cacert rest-ca.crt -u admin -X DELETE \
    "https://192.168.88.1/rest/ip/address/*18"
```

```json
{"error":404,"message":"Not Found"}
```

### Values

- 回复会将每个值编码为字符串，包括数字和布尔值（`"true"`、`"false"`）。
- 请求可以将值作为字符串或 JSON 数字和布尔值发送：`"disabled":"yes"` 和 `"disabled":true` 效果相同。
- 没有值的命令标志，例如 `once`、`compact` 或 `as-string`，使用空字符串：`"once":""`。
- 控制台的未命名参数，例如 `/interface/ethernet/monitor ether2` 中的接口，是 `numbers`：`{"numbers":"ether2","once":""}`。

## 运行命令 {#run-commands}

`POST` 可运行任意控制台命令。URL 是菜单路径和命令名称，JSON 正文包含命令参数。例如，修改已认证用户自己的密码（该用户需要 `password` 策略）：

```text
POST https://192.168.88.1/rest/password
{"old-password":"old","new-password":"N3w","confirm-new-password":"N3w"}
```

回复与 [API](/docs/developer-guides/api) 回复具有相同结构：

- 返回记录的命令（`print`、`ping`、`monitor-traffic`）返回对象列表，每条记录对应一个对象（`!re` 语句）。
- 在 `!done` 语句中返回数据的命令返回一个包含该数据的对象，通常是 `ret` 中的值：`add` 返回新记录的 ID，`print count-only` 返回记录数，`execute` 配合 `as-string` 返回输出。
- 不返回任何内容的命令返回空列表 `[]`，某些命令返回 `[{}]`。
- 报告进度的命令（`bandwidth-test`、`fetch`、`check-for-updates`）会在 `.section` 中对回复编号。

回复会在命令结束时到达：REST API 不会流式输出。

### 选择记录和属性 {#select-records-and-properties}

两个特殊键用于选择命令返回的内容：对于任何返回记录的命令，`.proplist` 选择属性；对于 `print`，`.query` 选择记录。`.proplist` 是以逗号分隔的字符串或字符串列表：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/ip/address/print \
    -H "Content-Type: application/json" \
    --data '{".proplist":"address,interface"}'
```

```json
[{"address":"192.168.88.1/24","interface":"bridge"}]
```

`.query` 是不带前导 `?` 的 API 查询词列表，按栈求值：`type=ether` 匹配值，`<l2mtu=1600` 和 `>` 进行比较，`#|!` 将前两个结果用 OR 组合并对结果取反。例如，`{".query":["type=ether","type=vlan","#|!"]}` 对应的 API 语句是：

```text
/interface/print
?type=ether
?type=vlan
?#|!
```

[API queries](/docs/developer-guides/api#queries) 一节介绍查询词和运算符。以下请求返回既不是 Ethernet 接口也不是 VLAN 接口的接口：

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

`count-only` 改为返回记录数：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/ip/address/print \
    -H "Content-Type: application/json" --data '{"count-only":""}'
```

```json
{"ret":"1"}
```

### 将命令保持在 60 秒内 {#keep-commands-within-60-seconds}

路由器会终止运行 60 秒的请求，并返回 `400 Bad Request`，详细信息为 `Session closed`。持续时间参数不会延长该限制：要求运行一小时的带宽测试仍会在 60 秒后终止。

持续运行直到你停止的命令，例如未带 `count` 的 `ping`、`monitor` 命令和未带 `duration` 的 `bandwidth-test`，都会触发该限制：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/ping \
    -H "Content-Type: application/json" \
    --data '{"address":"192.168.88.10"}'
```

```json
{"detail":"Session closed","error":400,"message":"Bad Request"}
```

使用参数限制此类命令。使用 `count` 时，`ping` 会为每个 echo reply 返回一条记录：

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

`duration` 短于限制的带宽测试每秒返回一条记录，并包含测试的 `status`：

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

`monitor` 命令使用 `once`，返回单个样本。例如，两个接口上的当前流量，单位为比特每秒：

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

要运行耗时超过 60 秒的任务，请使用不带 `as-string` 的 `/execute` 将其作为后台作业启动（请参阅[运行脚本并写入日志](#run-a-script-and-write-to-the-log)）：请求会立即返回作业 ID，作业继续运行。让作业将结果写入日志或文件。

### 从不同用户发送并行请求 {#send-parallel-requests-from-separate-users}

路由器一次只运行一个用户的请求，并按请求到达顺序执行。不同用户的请求并行运行。因此，长时间运行的命令会阻塞同一用户的所有其他请求，直到该命令结束。

当客户端放弃请求时，请求仍会在路由器上继续运行，直到命令结束或达到 60 秒限制。达到限制时，等待在同一用户请求之后的请求会失败，并返回 `Session closed`。为独立工作的客户端（例如仪表板和自动化脚本）使用不同用户。

## 自动化常见任务 {#automate-common-tasks}

### 屏蔽地址一天 {#block-an-address-for-a-day}

入侵检测系统或日志分析器可以将攻击者地址添加到防火墙丢弃的地址列表中。使用 `timeout` 时，路由器会自行删除该条目：

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

超时结束后，路由器会删除该条目；要提前解除封锁，请 `DELETE` 该条目的 URL（`/rest/ip/firewall/address-list/*3C`）。添加列表中已存在的地址会失败，并返回 `400` 和 `failure: already have such entry`。

该列表本身不会阻止任何流量：丢弃其地址的是防火墙规则。在路由器上的终端中添加一次规则。`raw` 表中的规则会在连接跟踪之前处理数据包，因此会尽早丢弃被封锁的地址，适用于发往路由器和经过路由器的流量。`in-interface-list=WAN` 将其限制为来自互联网的数据包，因此错误报告不会切断 LAN：

```ros
/ip/firewall/raw/add chain=prerouting action=drop \
    in-interface-list=WAN src-address-list=blocked \
    comment="drop blocked addresses"
```

在整个超时期间，被封锁的地址无法从互联网访问路由器或其后的网络，因此在自动化之前请检查报告系统发送的内容。请参阅 [Address lists](/docs/firewall-and-quality-of-service/firewall/address-lists)。

另一台 RouterOS 设备可以通过 `/tool/fetch` 发送此类请求；此请求添加一个没有超时的条目。发起调用的路由器需要导入 `rest-ca.crt`（`/certificate/import`）以检查证书；否则 fetch 会失败，并返回 `no trusted CA certificate found`：

```ros
/tool/fetch url="https://192.168.88.1/rest/ip/firewall/address-list" \
    http-method=put check-certificate=yes \
    http-header-field="Content-Type: application/json" \
    http-data="{\"list\":\"blocked\",\"address\":\"203.0.113.46\"}" \
    user=admin password="<password>" output=user
```

### 将配置保存到服务器 {#save-the-configuration-to-a-server}

带 `file` 的 `export` 会将配置写入路由器上的文件。`/file/read` 每次请求从 `offset` 开始最多返回 32768 字节，因此备份服务器可以收集该文件并从路由器中删除它。用户需要 `read,write,ftp,test,api,rest-api`。在以下命令中，`jq` 会从 JSON 回复中提取文件内容：

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

对于大于 32768 字节的文件，请重复读取，并将 `offset` 增加已接收的字节数，直到回复中不再包含数据（文件末尾为 `[{"data":""}]`；超过文件末尾的 offset 会失败，并返回 `failure: chunk out of file bounds`）。请参阅 [`/file/read`](/docs/cli-reference/file/read)。

导出会省略密码和私钥。要包含它们，请添加 `"show-sensitive":""` 并同时为用户授予 `sensitive` 策略；没有该策略时，文件仍会省略它们。请像保护路由器密码一样保护此类文件。有关整个配置的二进制备份，请参阅 [Backup](/docs/getting-started/configuration-management/backup)。

### 运行脚本并写入日志 {#run-a-script-and-write-to-the-log}

要从 `/system/script` 运行脚本，请在 `.id` 中指定其名称（或其 ID）：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/system/script/run \
    -H "Content-Type: application/json" --data '{".id":"daily-report"}'
```

`/execute` 运行以脚本形式给出的控制台命令。不使用 `as-string` 时，它会将脚本作为作业启动并返回作业 ID；使用 `as-string` 时，它会等待并返回脚本输出：

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

`check-for-updates` 向更新服务器询问路由器所在通道的最新版本。不使用 `once` 时，回复会列出检查结束前的进度，最后一条记录包含 `status` 和 `latest-version`：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/system/package/update/check-for-updates \
    -H "Content-Type: application/json" --data '{}'
```

### 移动防火墙规则 {#move-a-firewall-rule}

`move` 会将规则放在另一条规则之前，与控制台中的操作类似：

```bash
curl --cacert rest-ca.crt -u admin -X POST \
    https://192.168.88.1/rest/ip/firewall/nat/move \
    -H "Content-Type: application/json" \
    --data '{".id":"*9","destination":"*C"}'
```

要在指定位置创建规则，请将 `place-before` 与必须位于其后的规则 ID 添加到 `PUT` 请求体中。

### 读取 SNMP OID {#read-snmp-oids}

带 `oid` 的 `print` 会返回每个具有 OID 的属性的 SNMP OID，而不是其值：

```bash
curl --cacert rest-ca.crt -u monitoring -X POST \
    https://192.168.88.1/rest/system/resource/print \
    -H "Content-Type: application/json" --data '{"oid":""}'
```

```json
[{"build-time":".1.3.6.1.4.1.14988.1.1.7.6.0","cpu-frequency":".1.3.6.1.4.1.14988.1.1.3.14.0","total-memory":".1.3.6.1.2.1.25.2.3.1.5.65536","uptime":".1.3.6.1.2.1.1.3.0"}]
```

### 使用 Python 读取接口流量 {#read-interface-traffic-in-python}

以下 Python 程序使用 `requests` 库打印每个已链路的 Ethernet 接口的当前流量。`json=` 会将请求体作为 JSON 发送，并带有 `Content-Type` 标头，会话会为两个请求复用一个连接：

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

有关二进制 [API](/docs/developer-guides/api)，请参阅 [Python 3 示例](/docs/developer-guides/api/python3-example)。

## 构建仪表板或集成 {#build-a-dashboard-or-integration}

Web 仪表板、状态页或与其他系统的集成可以通过 REST API 读取路由器，AI 助手可以根据本页和 CLI 参考编写此类工具：向其提供本页地址以及该工具使用的菜单的 CLI 参考页地址。向助手提供以下内容，或在自行编写时牢记：

- **REST 调用的后端。** 路由器不发送 CORS 头，并以 `503` 响应 `OPTIONS` 预检请求，因此从其他地址提供的网页无法在浏览器中调用 REST API。让一个小型服务端程序（仪表板的后端或代理）发送请求。这也可以避免将路由器密码暴露在浏览器中。
- **只读用户。** 创建具有 `read,api,rest-api` 的组，如[创建 REST 用户](#create-a-rest-user)中所述，并为仪表板创建单独的用户，将用户的 `address` 设置为后端地址。只读取数据的仪表板即使代码出错，也无法更改配置。
- **助手不使用管理员密码。** 不要向 AI 助手或其编写的代码提供 `admin` 凭据。为生成的代码提供只读用户，并仅为工具确实需要的操作添加写权限。
- **独立用户和短请求。** 一个用户的请求会依次执行，因此同时轮询多个值的仪表板需要逐项等待。使用带 `once` 的 `monitor` 命令、带 `count` 的 `ping` 以及 `.proplist`，以保持响应较小。
- **响应中的字符串。** 所有值都以字符串形式返回：计算前先转换数字。流量速率以比特每秒为单位，内存和磁盘大小以字节为单位，`cpu-load` 以百分比表示，`uptime` 等持续时间采用 RouterOS 格式，例如 `1d7h44m20s`。
- **单个连接。** 轮询时复用 HTTP 连接（keep-alive），以节省 TCP 和 TLS 建立开销。路由器会在任意连接上保留用户登录 10 分钟，因此频繁轮询不必每次都登录。
- **菜单和参数。** [CLI 参考](/docs/cli-reference)描述了每个菜单和参数。路由器还通过 `/console/inspect` 描述自身，该命令会列出某个菜单的命令和参数：

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

## 排查 REST 请求 {#troubleshoot-rest-requests}

HTTP 状态码表示请求是否成功。失败时（400 或更高），响应体是一个 JSON 对象，其中代码位于 `error` 中，描述位于 `message` 中，大多数错误还会在 `detail` 中包含路由器的原因。例如，带有 `{".id":"ether1"}` 的 `POST /rest/interface/remove` 会失败，因为 `/interface` 没有 `remove` 命令：

```json
{"detail":"no such command or directory (remove)","error":400,"message":"Bad Request"}
```

| 响应 | 原因 |
| :-- | :-- |
| `401 Unauthorized` | 用户名或密码错误，组没有 `rest-api` 策略，或者用户的 `address` 不允许该客户端。 |
| `500`, `std failure: not allowed (9)` | 组具有 `rest-api`，但没有 `api` 策略。 |
| `500`, `not enough permissions (9)` | 组缺少该命令所需的策略，例如更改操作需要 `write`，`ping` 需要 `test`。 |
| `400`, `missing or invalid resource identifier` | 路由器无法将 `PATCH` 或 `DELETE` 应用到记录：URL 中没有记录 ID（例如在没有记录的菜单上执行 `PATCH`；使用带 `set` 的 `POST`）、记录无法删除（以太网接口）、路由器拒绝某个值，或者用户没有 `write` 策略。 |
| `400`, `no such command or directory (x)` | 菜单、命令或记录名称 `x` 不存在。 |
| `400`, `no such command` | 该菜单中不存在此命令，或者向某个命令发送了 `GET`。 |
| `400`, `no such command prefix` | URL 中的 ID 含有经过百分号编码的 `*` (`%2A`)。 |
| `400`, `unknown parameter x`, `invalid value for argument x`, `missing =x=`, `failure: ...` | 控制台拒绝了参数；详情是控制台的错误消息。 |
| `400`, `Failed to parse json` | 响应体不是有效的 JSON，或者数字包含指数。 |
| `400`, `Session closed` | 命令运行了 60 秒，或者请求排在同一个用户已运行 60 秒的请求之后。请参阅[将命令控制在 60 秒内](#keep-commands-within-60-seconds)。 |
| `403 Forbidden`（HTML 页面） | 此协议已关闭 REST API（`/ip/service/webserver` 中的 `rest-plain` 或 `rest-secure`）。 |
| `404 Not Found` | 没有具有此 ID 的记录。 |
| `415 Unsupported Media Type` | 请求包含响应体，但没有 `Content-Type: application/json` 头。 |
| 连接重置 | 客户端地址不在服务的 `available-from` 中。 |
| TLS 或证书错误 | 客户端不信任证书，URL 中路由器名称与证书中的名称不同，或者 `www-ssl` 没有证书。 |

日志会在 `account` 主题中记录 REST 登录：`user monitoring logged in from 192.168.88.10 via rest-api`，随后是经由 `api` 的登录。没有 `api` 策略的组会在 REST 登录后记录 `login failure for user monitoring via api`：

```ros
/log/print where topics~"account"
```

`/user/active` 会将每次 REST 登录列出两次：一次是带客户端地址的 `via rest-api`，另一次是不带地址的 `via api`。

## 技术细节 {#technical-details}

### Sessions

- REST 服务器使用用户凭据登录 API，并将该登录状态保留 10 分钟。在此期间的请求都会使用该登录状态，无论请求来自一个 HTTP 连接还是多个 HTTP 连接；10 分钟后的下一个请求会再次登录。
- 使用 `/user/set` 修改用户（密码、`disabled`、`address`）或使用 `/user/remove` 删除用户，会在下一个请求时生效。对用户组策略的修改会在登录续期时生效，最长可能延迟 10 分钟。
- 同一用户的请求一次只运行一个；不同用户的请求并行运行。

### JSON 格式 {#json-format}

路由器大体遵循 ECMA-404 JSON 标准：

- 回复会将每个值编码为字符串，即使该属性保存的是数字或布尔值。
- 请求中的 JSON 数字可以是八进制（以 `0` 开头，`010` 表示 8）或十六进制（`0x` 前缀）。带指数的数字（`2e0`）会被拒绝，并返回 `Failed to parse json`。
- 以字符串发送的数字会按控制台的读取方式解析：`"5"` 为 5，`"0x4"` 为 4。

### HTTP

- 路由器使用 HTTP/1.1，并保持连接打开（keep-alive），从而省去下一次请求的 TCP 和 TLS 建立过程。
- 不带凭据的请求会收到 `401`，并带有 `WWW-Authenticate: Basic`。
- `PUT` 会返回 `201 Created`，并在 `Location` 头中给出新记录的 URL，例如 `Location: https://192.168.88.1/rest/ip/address/*18`。`DELETE` 会返回 `204 No Content`。
- REST API 的错误回复是 JSON 对象；在 `/ip/service/webserver` 中关闭的 Web 服务器部分会返回 HTML `403` 页面。
