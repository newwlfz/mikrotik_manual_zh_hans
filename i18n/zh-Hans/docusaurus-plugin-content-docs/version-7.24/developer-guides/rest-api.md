---
sidebar_key: "developer-guides/rest-api"
sidebar_position: 2
title: "REST API"
sidebar_label: "REST API"
description: "面向开发者的 REST API 及示例。"
tags:
  - 'api'
  - 'management'
source: https://manual.mikrotik.com/docs/7.24/developer-guides/rest-api
captured_at: '2026-11-04T11:27:50+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**REST API** 一词通常指通过 HTTP 协议在一组预定义的面向资源的 URL 上访问的 **API**。
**REST API** 实现为 [**API**](./api/index.md) 的 JSON 封装接口。它允许你创建、读取、更新和删除资源，并调用任意控制台命令。

要开始使用 REST API，请在 [`IP Service`](../system-information-and-utilities/services.md) 菜单中启用 `www-ssl` 或 `www` 服务。

当 `www-ssl` 服务运行（HTTPS 访问）时，你可以连接到：

- `https://<router_IP>/rest`。

当 `www` 服务运行（HTTP 访问）时，你可以连接到：

- `http://<router_IP>/rest`。

使用 HTTP 访问（`www` 服务）的主要风险是身份验证凭据可能被被动窃听读取。仅在攻击者无法访问的网络上进行测试时使用它，或当你确定数据无法被解密时使用，例如当 HTTP 通过加密隧道传输时。

最简单的开始方式是使用 cURL、wget、fetch 工具或任何其他简单的 HTTP 客户端。

```sh
$ curl -k -u admin: https://10.155.101.214/rest/system/resource

[{"architecture-name":"tile","board-name":"CCR1016-12S-1S+",
"build-time":"2020-12-04 14:19:51","cpu":"tilegx","cpu-count":"16",
"cpu-frequency":"1200","cpu-load":"1","free-hdd-space":"83439616",
"free-memory":"1503133696","platform":"MikroTik",
"total-hdd-space":"134217728","total-memory":"2046820352",
"uptime":"2d20h12m20s","version":"7.1beta4 (development)"}]
```

## 身份验证 {#authentication}

对 REST API 的身份验证使用 [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication)。你的用户名和密码与控制台用户相同（默认情况下，**admin** 无密码）。

要使用安全连接（HTTPS），请在 [证书菜单](../authentication-authorization-accounting/certificates.md) 中设置证书，并配置 `www-ssl` 使用新创建或导入的证书。如果你使用自签名证书，请将其 CA 导入客户端的受信任根存储。进行测试时，你可以不安全地连接（cURL 使用 `-k`，或 wget 使用 `--no-check-certificate`）。

### JSON 格式 {#json-format}

服务器大体遵循 ECMA‑404 标准，并有以下说明：

- 在 JSON 回复中，所有对象值都编码为字符串，即使底层数据是数字或布尔值。
- 服务器还接受八进制格式（以 0 开头）和十六进制格式（以 0x 开头）的数字。如果数字以字符串格式发送，则假定为十进制格式。
- 不支持带指数的数字。

## HTTP 方法 {#http-methods}

下表汇总了支持的 HTTP 方法

| HTTP 动词   | CRUD          | ROS    | 描述                                                     |
|:--|:--|:--|:--|
| GET         | 读取          | print  | 获取记录。                                               |
| PATCH       | 更新/修改     | set    | 更新单条记录。                                           |
| PUT         | 创建          | add    | 创建新记录。                                             |
| DELETE      | 删除          | remove | 删除单条记录。                                           |
| POST        |               |        | 访问所有控制台命令的通用方法。                           |

### GET {#get}

此方法允许从 URL 中编码的指定菜单获取所有记录的列表或单条记录。
例如，获取所有 IP 地址（等同于 `ip/address/print` CLI 命令）：

```sh
$ curl -k -u admin: https://10.155.101.214/rest/ip/address

[{".id":"*1","actual-interface":"ether2","address":"10.0.0.111/24","disabled":"false",
"dynamic":"false","interface":"ether2","invalid":"false","network":"10.0.0.0"},
{".id":"*2","actual-interface":"ether3","address":"10.0.0.109/24","disabled":"true",
"dynamic":"false","interface":"ether3","invalid":"false","network":"10.0.0.0"}]
```

在 URL 末尾附加 ID 以返回单条记录：

```sh
$ curl -k -u admin: https://10.155.101.214/rest/ip/address/*1

{".id":"*1","actual-interface":"ether2","address":"10.0.0.111/24","disabled":"false",
"dynamic":"false","interface":"ether2","invalid":"false","network":"10.0.0.0"}
```

如果表中包含命名参数，你可以使用名称代替 ID；例如，获取 **ether1**：

```sh
curl -k -u admin: https://10.155.101.214/rest/interface/ether1
```

你还可以筛选输出；例如，仅返回属于 10.155.101.0 网络的动态地址：

```sh
$ curl -k -u admin: "https://10.155.101.214/rest/ip/address?network=10.155.101.0&dynamic=true"

[{".id":"*8","actual-interface":"sfp12","address":"10.155.101.214/24","disabled":"false",
"dynamic":"true","interface":"sfp12","invalid":"false","network":"10.155.101.0"}]
```

另一个示例仅返回 "dummy" 接口上且注释为 "test" 的地址：

```sh
$ curl -k -u admin: 'https://10.155.101.214/rest/ip/address?comment=test&interface=dummy'

[{".id":"*3","actual-interface":"dummy","address":"192.168.99.2/24","comment":"test",
"disabled":"false","dynamic":"false","interface":"dummy","invalid":"false","network":"192.168.99.0"}]
```

如果你只想返回特定属性，可以使用 `.proplist`，后跟 `=` 字符和逗号分隔的属性列表。例如，仅显示 address 属性以及其是否被禁用：

```sh
$ curl -k -u admin: https://10.155.101.214/rest/ip/address?.proplist=address,disabled

[{"address":"10.0.0.111/24","disabled":"false"},{"address":"10.0.0.109/24","disabled":"true"}]
```

### PATCH {#patch}

使用此方法更新单条记录。将 PATCH 请求的正文设置为包含字段及其新值的 JSON 对象。例如，添加注释：

```sh
$ curl -k -u admin: -X PATCH https://10.155.101.214/rest/ip/address/*3 \
  --data '{"comment": "test"}' -H "content-type: application/json"

{".id":"*3","actual-interface":"dummy","address":"192.168.99.2/24","comment":"test",
"disabled":"false","dynamic":"false","interface":"dummy","invalid":"false","network":"192.168.99.0"}
```

更新成功时，服务器返回包含其全部参数的更新后对象。

### PUT {#put}

此方法创建新记录。将请求正文设置为包含该记录参数的 JSON 对象。每次请求只能创建一条记录。

成功时，服务器返回包含其全部参数的已创建对象。
例如，向 dummy 接口添加 IP 地址：

```sh
$ curl -k -u admin: -X PUT https://10.155.101.214/rest/ip/address \
  --data '{"address": "192.168.111.111", "interface": "dummy"}' -H "content-type: application/json"

{".id":"*A","actual-interface":"dummy","address":"192.168.111.111/32","disabled":"false",
"dynamic":"false","interface":"dummy","invalid":"false","network":"192.168.111.111"}
```

### DELETE {#delete}

使用此方法删除具有指定 ID 的记录。如果删除成功，服务器返回空正文。例如，连续两次调用同一删除操作会导致路由器在第二次尝试时返回 `404` 错误：

```sh
$ curl -k -u admin: -X DELETE https://10.155.101.214/rest/ip/address/*9
$ curl -k -u admin: -X DELETE https://10.155.101.214/rest/ip/address/*9
{"error":404,"message":"Not Found"}
```

### POST {#post}

所有 [**API**](./api/index.md) 功能均可通过 `POST` 使用。将命令字编码到 URL 中，并将可选参数作为 JSON 对象中的字段传递。例如，要更改活动用户的密码，请发送：

```
POST https://router/rest/password
{"old-password":"old","new-password":"N3w", "confirm-new-password":"N3w"}
```

REST 响应与 API 响应具有相同的结构：

- 如果响应包含 `!re` 语句（记录），则 JSON 回复将包含对象列表。
- 如果 `!done` 语句包含数据，则 JSON 回复将包含带有该数据的对象。
- 如果 `!done` 语句中没有记录或数据，则响应将包含空列表。

有两个特殊键：`.proplist` 和 `.query`，它们与 `print` 命令字一起使用。有关 API 响应、属性列表和查询的更多信息，请参阅 [API](./api/index.md) 文档。

#### 属性列表 {#proplist}

使用 `.proplist` 键指定要返回哪些属性。该值可以是单个逗号分隔字符串：

```
POST https://router/rest/interface/print
{".proplist":"name,type"}
```

或字符串列表：

```
POST https://router/rest/interface/print
{".proplist":["name","type"]}
```

例如，从 `ip/address` 菜单返回 address 和 interface 属性：

```sh
$ curl -k -u admin: -X POST https://10.155.101.214/rest/ip/address/print\
  --data '{".proplist": ["address","interface"]}' -H "content-type: application/json"

[{"address":"192.168.99.2/24","interface":"dummy"},
{"address":"172.16.5.1/24","interface":"sfpplus1"},
{"address":"172.16.6.1/24","interface":"sfp2"},
{"address":"172.16.7.1/24","interface":"sfp3"},
{"address":"10.155.101.214/24","interface":"sfp12"},
{"address":"192.168.111.111/32","interface":"dummy"}]
```

#### 查询 {#query}

`.query` 键用于创建查询栈。该值是查询词列表。例如：

```
POST https://router/rest/interface/print
{".query":["type=ether","type=vlan","#|!"]}
```

等同于 **API** 语句：

```
/interface/print
?type=ether
?type=vlan
?#|!
```

组合 `query` 和 `proplist` 的示例，为所有动态记录以及网络为 192.168.111.111 的记录返回 `.id`、`address` 和 `interface` 属性

```sh
$ curl -k -u admin: -X POST https://10.155.101.214/rest/ip/address/print \
  --data '{".proplist": [".id","address","interface"], ".query": ["network=192.168.111.111","dynamic=true","#|"]}'\
  -H "content-type: application/json"

[{".id":"*8","address":"10.155.101.214/24","interface":"sfp12"},
{".id":"*A","address":"192.168.111.111/32","interface":"dummy"}]
```

#### 超时 {#timeout}

如果命令无限期运行，它最终会超时，连接将因错误而关闭。当前超时间隔为 60 秒。为避免超时错误，请添加能充分限制命令执行时间的参数。

例如，除非添加 count 参数来限制执行，否则 ping 命令将超过超时时间：

```sh
$ curl -k -u admin: -X POST https://10.155.101.214/rest/ping \
  --data '{"address":"10.155.101.1"}' \
  -H "content-type: application/json"

{"detail":"Session closed","error":400,"message":"Bad Request"}

$ curl -k -u admin: -X POST https://10.155.101.214/rest/ping \
  --data '{"address":"10.155.101.1","count":"4"}' \
  -H "content-type: application/json"

[{"avg-rtt":"453us","host":"10.155.101.1","max-rtt":"453us","min-rtt":"453us","packet-loss":"0","received":"1","sent":"1","seq":"0","size":"56","time":"453us","ttl":"64"},
{"avg-rtt":"417us","host":"10.155.101.1","max-rtt":"453us","min-rtt":"382us","packet-loss":"0","received":"2","sent":"2","seq":"1","size":"56","time":"382us","ttl":"64"},
{"avg-rtt":"495us","host":"10.155.101.1","max-rtt":"650us","min-rtt":"382us","packet-loss":"0","received":"3","sent":"3","seq":"2","size":"56","time":"650us","ttl":"64"},
{"avg-rtt":"461us","host":"10.155.101.1","max-rtt":"650us","min-rtt":"359us","packet-loss":"0","received":"4","sent":"4","seq":"3","size":"56","time":"359us","ttl":"64"}]
```

对于接受 duration 参数的命令，REST 超时仍然适用。即使要求命令运行一小时，它也会提前终止并返回错误。

例如，可以通过提供小于超时值的运行持续时间来限制带宽测试工具：

```sh
$ curl -k -u admin: -X POST 'https://10.155.101.214/rest/tool/bandwidth-test' \
  --data '{"address":"10.155.101.1","duration":"3s"}' \
  -H "content-type: application/json"

[{".section":"0","connection-count":"20","direction":"receive","lost-packets":"0",
"random-data":"false","rx-10-second-average":"0","rx-current":"0","rx-size":"1500",
"rx-total-average":"0",
"status":"connecting"},
{".section":"1","connection-count":"20","direction":"receive","duration":"1s",
"lost-packets":"0","random-data":"false","rx-10-second-average":"0","rx-current":"0",
"rx-size":"1500","rx-total-average":"0",
"status":"running"},
{".section":"2","connection-count":"20","direction":"receive","duration":"2s",
"lost-packets":"581175","random-data":"false","rx-10-second-average":"854372352",
"rx-current":"854372352","rx-size":"1500","rx-total-average":"854372352",
"status":"running"},
{".section":"3","connection-count":"20","direction":"receive","duration":"3s",
"lost-packets":"9014","random-data":"false","rx-10-second-average":"891979008",
"rx-current":"929585664","rx-size":"1500","rx-total-average":"891979008",
"status":"done testing"}]
```

## 错误 {#errors}

API 调用的成功或失败由 HTTP 状态码指示。失败时（400 或更高），响应正文包含带有错误码、描述和可选详细信息的 JSON 对象。例如，尝试删除接口会返回

```text
{"error":406,"message":"Not Acceptable","detail":"no such command or directory (remove)"}
```

## 监控 {#monitor}

REST API 不支持 `monitor` 之类的连续命令。使用 `monitor once` 参数打印单个结果。

## 示例 {#examples}

下面我们添加了一组简短的 REST API 调用示例，你可以对设备执行这些调用：

创建日志条目：

```bash
curl -k -u <username>:<password> -X POST https://<ip-address>/rest/execute --data '{"script":"/log/info test"}' -H "content-type: application/json"
```

运行脚本：

```bash
curl -k -u <username>:<password> https://<ip-address>/rest/system/script/run --data '{".id":"*1"}' -H "content-type: application/json"
```

LTE 监控一次：

```bash
curl -k -u <username>:<password> https://<ip-address>/rest/interface/lte/monitor -d '{"numbers":"0", "once":""}' -H "content-type: application/json"
```

导出设备配置：

```bash
curl -k -u <username>:<password> https://<ip-address>/rest/export --data '{"compact":"","file":"test.rsc"}' -H "content-type: application/json"
```

移动防火墙条目（切换位置）：

```bash
curl -k -u <username>:<password> -X POST https://<ip-address>/rest/ip/firewall/nat/move --data '{".id":"*9","destination":"*C"}' -H "content-type: application/json"
```

LTE 固件更新：

```bash
curl -k -u <username>:<password> -X POST 'https://<ip-address>/rest/interface/lte/firmware-upgrade'   --data '{"numbers":"lte2"}' -H "content-type: application/json"
```

从 `/system/resource` 菜单获取 OID：

```bash
curl -k -u <username>:<password> -X POST https://<ip-address>/rest/system/resource/print --data '{"oid":""}' -H "content-type: application/json"
```

使用 `/tool/fetch` 从一个 RouterOS 设备向另一个 RouterOS 设备运行 REST API POST：

```ros
/tool fetch http-method=post url="https://<ip-address>/rest/execute" \
http-data="{\"script\":\"/log info fetchtest\"}" \
http-header-field="Content-Type:application/json" \
output=user user=<username> password=<password>
```
