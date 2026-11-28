---
title: "Hotspot 自定义"
description: "通过覆盖路由器 FTP 服务器上存储的默认 HTML 文件，并在 HotSpot 配置中通过 `html-directory-override` 指定自定义目录，可以自定义 HotSpot 认证页面。可使用预定义页面（如 login.html、status.html 和 logout.html），也可创建包含 `$(username)` 和 `$(password)` 等变量的自定义页面。"
tags:
  - 'hotspot'
  - 'servlet-pages'
  - 'radius'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/hotspot-captive-portal/hotspot-customisation
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "authentication-authorization-accounting/hotspot-captive-portal"
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

#### 简介 {#introduction}

你可以为每个 HotSpot 服务器创建完全不同的一组 servlet 页面，方法是在 HotSpot 服务器配置文件 `/ip/hotspot/profile` 的 "html-directory-override" 属性中指定目录。创建服务器配置文件后，默认 servlet 页面会复制到 "hotspot" 目录中。可以通过使用 FTP 客户端连接路由器来访问该目录。你可以复制该目录，并根据本手册本节中的信息修改页面。注意，建议手动编辑文件，因为自动化 HTML 编辑工具可能会删除变量或其他关键部分，从而损坏页面。完成内容修改后，需要将修改后的内容上传到 hotspot 路由器上的某个自定义目录，并将前面提到的属性 "html-directory-override" 的值指向该新 HTML 自定义目录的路径。

**注意：** 如果 "html-directory-override" 值的路径缺失或为空，则 hotspot 服务器将恢复使用默认 HTML 文件。

#### 可用页面 {#available-pages}

向用户显示的主要 HTML servlet 页面：

- **redirect.html** - 将用户重定向到另一个 URL（例如登录页面）。
- **login.html** - 向用户显示的登录页面，用于要求输入用户名和密码。该页面可使用以下参数：
  - **username** - 用户名。
  - **password** - 纯文本密码（使用 PAP 认证时），或 chap-id 变量、密码和 CHAP challenge 的 MD5 哈希值（使用 CHAP 认证时）。对于试用用户，该值用作电子邮件地址。
  - **dst** - 重定向前请求的原始 URL。登录成功后将打开该 URL。
  - **popup** - 登录成功后是否弹出状态窗口。
  - **radius\<id>** - 以文本字符串形式将 \<id> 标识的属性发送到 RADIUS 服务器（使用 RADIUS 认证时；否则丢失）。
  - **radius\<id>u** - 以无符号整数形式将 \<id> 标识的属性发送到 RADIUS 服务器（使用 RADIUS 认证时；否则丢失）。
  - **radius\<id>-\<vnd-id>** - 以文本字符串形式将 \<id> 标识的属性和供应商 ID \<vnd-id> 发送到 RADIUS 服务器（使用 RADIUS 认证时；否则丢失）。
  - **radius\<id>-\<vnd-id>u** - 以无符号整数形式将 \<id> 标识的属性和供应商 ID \<vnd-id> 发送到 RADIUS 服务器（使用 RADIUS 认证时；否则丢失）。
- **md5.js** - 用于 MD5 密码哈希的 JavaScript。与 http-chap 登录方法一起使用。
- **alogin.html** - 客户端登录后显示的页面。它会弹出状态页面，并将浏览器重定向到最初请求的页面（在客户端被重定向到 HotSpot 登录页面之前）。
- **status.html** - 状态页面，显示客户端的统计信息。它还能够自动显示广告。
- **logout.html** - 注销页面，在用户注销后显示。显示已完成会话的最终统计信息。该页面可使用以下附加参数：
  - **erase-cookie** - 注销时是否从 HotSpot 服务器删除 cookie（使下次从同一浏览器使用 cookie 登录变得不可能，在多用户环境中可能有用）。
- **error.html** - 错误页面，仅在发生致命错误时显示。

如果需要更多控制，还可以使用其他一些页面：

- **rlogin.html** - 当访问某个 URL 需要客户端授权时，将客户端从该 URL 重定向到登录页面的页面
- **rstatus.html** - 类似于 rlogin.html，仅在客户端已登录且原始 URL 未知的情况下使用
- **radvert.html** - 将客户端重定向到已计划的广告链接
- **flogin.html** - 发生错误时（例如用户名或密码无效）代替 login.html 显示
- **fstatus.html** - 请求状态页面但客户端未登录时，代替重定向显示
- **flogout.html** - 请求注销页面但客户端未登录时，代替重定向显示

#### 提供 Servlet 页面 {#serving-servlet-pages}

HotSpot servlet 识别 5 种不同的请求类型：

1. **请求远程主机**
   - 如果用户已登录，并且应显示广告，则显示 radvert.html。该页面会重定向到计划的广告页面。
   - 如果用户已登录，并且未为该用户安排广告，则提供请求的页面。
   - 如果用户未登录，但目标主机被 walled garden 允许，则也会提供请求。
   - 如果用户未登录，并且目标主机被 walled garden 拒绝，则显示 rlogin.html；如果未找到 rlogin.html，则使用 redirect.html 重定向到登录页面。
2. **请求 HotSpot 主机上的 "/"**
   - 如果用户已登录，则显示 rstatus.html；如果未找到 rstatus.html，则使用 redirect.html 重定向到状态页面。
   - 如果用户未登录，则显示 rlogin.html；如果未找到 rlogin.html，则使用 redirect.html 重定向到登录页面。
3. **请求 "/login" 页面**
   - 如果用户已成功登录（或已经登录），则显示 alogin.html；如果未找到 alogin.html，则使用 redirect.html 重定向到最初请求的页面或状态页面（如果未给出原始目标页面）。
   - 如果用户未登录（未提供用户名，且未出现错误消息），则显示 login.html。
   - 如果登录过程失败（提供了错误消息），则显示 flogin.html；如果未找到 flogin.html，则使用 login.html。
   - 如果发生致命错误，则显示 error.html。
4. **请求 "/status" 页面**
   - 如果用户已登录，则显示 status.html。
   - 如果用户未登录，则显示 fstatus.html；如果未找到 fstatus.html，则使用 redirect.html 重定向到登录页面。
5. **请求 '/logout' 页面**
   - 如果用户已登录，则显示 logout.html。
   - 如果用户未登录，则显示 flogout.html；如果未找到 flogout.html，则使用 redirect.html 重定向到登录页面。

**注意：** 如果无法使用路由器 FTP 服务器上存储的页面满足请求，则显示 Error 404。

自定义 HotSpot 身份验证页面外观的方法有很多：

- 页面易于修改。它们存储在路由器 FTP 服务器上，目录由相应 HotSpot 服务器配置文件中选择。
- 通过更改客户端发送给 HotSpot servlet 的变量，可以将关键字数量减少到一个（用户名或密码；例如，可以使用客户端的 MAC 地址作为另一个值），甚至减少到零（许可协议；可以使用对所有用户通用的某些预定义值或客户端的 MAC 地址作为用户名和密码）。
- 注册可以在其他服务器上进行（例如，在能够对信用卡收费的服务器上）。可以将客户端的 MAC 地址传递给该服务器，这样就不必手动输入此信息。注册后，服务器应更改 RADIUS 数据库，使客户端能够在一段时间内登录。

要在 HTML 文件中的某个位置插入变量，可使用 $(var\_name) 语法，其中“var\_name”是变量名（不带引号）。此结构可用于以 '/'、'/login'、'/status' 或 '/logout' 访问的任何 HotSpot HTML 文件，也可用于存储在该 HotSpot 服务器上的任何文本或 HTML（.txt、.htm 或 .html）文件（流量计数器除外，它们仅在状态页面中可用；以及 **error**、**error-orig**、**chap-id**、**chap-challenge** 和 **popup** 变量，它们仅在登录页面中可用）。例如，要显示指向登录页面的链接，可使用以下结构：

```
login

```

#### Variables

所有 Servlet HTML 页面都使用变量来显示用户特定的值。变量名仅出现在 servlet 页面的 HTML 源代码中——它们会由 HotSpot Servlet 自动替换为相应的值。对于大多数变量，括号中都包含其可能值的示例。所有描述的变量在所有 servlet 页面中均有效，但其中一些变量在被访问时可能为空（例如，用户登录前没有运行时间）。

##### 可用变量列表 {#list-of-available-variables}

**注意：** 部分变量使用硬编码的 http URL，如果使用 https，可以通过其他方式构造链接，例如对于 $link-status，可以使用 https://$(hostname)/$(target-dir)status

**通用服务器变量：**

- **hostname** - HotSpot Servlet 的 DNS 名称或 IP 地址（如果未给出 DNS 名称）（“[hotspot.example.net](http://hotspot.example.net)”）。
- **identity** - RouterOS 标识名称（“MikroTik”）。
- **login-by** - 用户使用的身份验证方法。
- **plain-passwd** - 是否允许 HTTP-PAP 登录方法的“yes/no”表示（“no”）。
- **server-address** - HotSpot 服务器地址（“10.5.50.1:80”）。
- **ssl-login** - 是否使用 HTTPS 方法访问该 servlet 页面的“yes/no”表示（“no”）。
- **server-name** - HotSpot 服务器名称（在 `/ip/hotspot` 菜单中设置，作为 name 属性）。

**Links:**

- **link-login** - 指向登录页面的链接，包含请求的原始 URL（“[http://10.5.50.1/login?dst=http://www.example.com/](http://10.5.50.1/login?dst=http://www.example.com/)”）
- **link-login-only** - 指向登录页面的链接，不包含请求的原始 URL（“[http://10.5.50.1/login](http://10.5.50.1/login)”）
- **link-logout** - 指向注销页面的链接（“[http://10.5.50.1/logout](http://10.5.50.1/logout)”）
- **link-status** - 指向状态页面的链接（“[http://10.5.50.1/status](http://10.5.50.1/status)”）
- **link-orig** - 请求的原始 URL（“[http://www.example.com/](http://www.example.com/)”）

**常规客户端信息：**

- **domain** - 用户的域名（“[example.com](http://example.com)”）。
- **interface-name** - 物理 HotSpot 接口名称（对于网桥接口，将返回实际的网桥端口名称）。
- **ip** - 客户端的 IP 地址（“10.5.50.2”）。
- **logged-in** - 如果用户已登录，则为“yes”，否则为“no”（“yes”）。
- **mac** - 用户的 MAC 地址（“01:23:45:67:89:AB”）。
- **trial** - 用户是否有试用时间访问权限的“yes/no”表示。如果用户的试用时间已过期，则值为“no”。
- **username** - 用户名称（“John”）。
- **host-ip** - `/ip/hotspot/host` 表中的客户端 IP 地址。
- **vlan-id** - 表示客户端所连接 VLAN 接口的 ID。

**用户状态信息：**

- **idle-timeout** - 空闲超时（无超时时为“20m”或“”）。
- **idle-timeout-secs** - 以秒为单位的空闲超时（无此超时时为“88”或“0”）。
- **limit-bytes-in** - 发送的字节数限制（无限制时为“1000000”或“---”）。
- **limit-bytes-out** - 接收的字节数限制（无限制时为“1000000”或“---”）。
- **refresh-timeout** - 状态页面刷新超时（无超时时为“1m30s”或“”）。
- **refresh-timeout-secs** - 以秒为单位的状态页面刷新超时（无超时时为“90s”或“0”）。
- **session-timeout** - 用户的会话剩余时间（无剩余时间时为“5h”或“”）。
- **session-timeout-secs** - 以秒为单位的用户会话剩余时间（无此超时时为“3475”或“0”）。
- **session-time-left** - 用户的会话剩余时间（无剩余时间时为“5h”或“”）。
- **session-time-left-secs** - 以秒为单位的用户会话剩余时间（无此超时时为“3475”或“0”）。
- **uptime** - 当前会话运行时间（“10h2m33s”）。
- **uptime-secs** - 以秒为单位的当前会话运行时间（“125”）。

**仅在状态页面上可用的流量计数器：**

- **bytes-in** - 从用户接收的字节数（“15423”）。
- **bytes-in-nice** - 从用户接收的字节数的易读格式（“15423”）。
- **bytes-out** - 发送给用户的字节数（“11352”）。
- **bytes-out-nice** - 发送给用户的字节数的易读格式（“11352”）。
- **packets-in** - 从用户接收的数据包数（“251”）。
- **packets-out** - 发送给用户的数据包数（“211”）。
- **remain-bytes-in** - 达到 limit-bytes-in 前剩余的字节数（无限制时为“337465”或“---”）。
- **remain-bytes-out** - 达到 limit-bytes-out 前剩余的字节数（无限制时为“124455”或“---”）。

**其他变量：**

- **session-id** - 上次请求中 'session-id' 参数的值。
- **var** - 上次请求中 'var' 参数的值。
- **error** - 发生失败时的错误消息（“invalid username or password”）。
- **error-orig** - 发生失败时的原始错误消息（不包含从 errors.txt 检索到的翻译）（“invalid username or password”）。
- **chap-id** - chap ID 的值（“\371”）。
- **chap-challenge** - chap challenge 的值（“\357\015\330\013\021\234\145\245\303\253\142\246\133\175\375\316”）。
- **popup** - 是否弹出复选框（“true”或“false”）。
- **advert-pending** - 是否有广告等待显示（“yes”或“no”）。
- **http-status** - 允许设置 http 状态码和消息。
- **http-header** - 允许设置 http 标头。

**RADIUS 相关变量：**

- **radius\<id>** - 以文本字符串形式显示由 \<id> 标识的属性（在使用 RADIUS 身份验证时；否则为“”）
- **radius\<id>u** - 以无符号整数形式显示由 \<id> 标识的属性（在使用 RADIUS 身份验证时；否则为“0”）
- **radius\<id>-\<vnd-id>** - 以文本字符串形式显示由 \<id> 和供应商 ID \<vnd-id> 标识的属性（在使用 RADIUS 身份验证时；否则为“”）
- **radius\<id>-\<vnd-id>u** - 以无符号整数形式显示由 \<id> 和供应商 ID \<vnd-id> 标识的属性（在使用 RADIUS 身份验证时；否则为“0”）

##### 使用变量 {#working-with-variables}

这些页面可以使用 `$(if \<var\_name>)` 语句。如果 `\<var\_name>` 的值不是空字符串，则会包含以下内容。它等同于 `$(if \<var\_name> != "")`。也可以进行等价比较：`$(if \<var\_name> == \<value>)`。这些语句在遇到 `$(elif \<var\_name>)`、`$(else)` 或 `$(endif)` 之前一直有效。一般情况下，其形式如下：

```
some content, which will always be displayed
$(if username == john)
Hey, your username is john
$(elif username == dizzy)
Hello, Dizzy! How are you? Your administrator.
$(elif ip == 10.1.2.3)
You are sitting at that old computer, which is so slow...
$(elif mac == 00:01:02:03:04:05)
This is an ethernet card, which was stolen few months ago...
$(else)
I don't know who you are, so lets live in peace.
$(endif)
other content, which will always be displayed

```

只会显示其中一个表达式。具体显示哪一个取决于每个客户端的这些变量值。

##### 重定向和自定义标头 {#redirects-and-custom-headers}

```
	$(if http-status == 302)Hotspot login required$(endif)
	$(if http-header == "Location")$(link-redirect)$(endif)

```

**注意：** 尽管上文看起来使用了条件表达式“if”，但实际上是将“http-status”设置为“302”，而不是对其进行测试。变量“http-header”也是如此。同样，即使使用了“if”，实际上也是将变量设置为“Location”，后跟从变量“link-redirect”获取的 URL。

例如，如果 `$(link-redirect)` 的计算结果为“[http://192.168.88.1/login](http://192.168.88.1/login)”，则返回给客户端的 HTTP 响应将更改为：

```
HTTP/1.0 302 Hotspot login required
<regular HTTP headers>
Location: http://192.168.88.1/login

```

**http-status 语法**：

```
	$(if http-status == XYZ)HTTP_STATUS_MESSAGE$(endif)

```

- *XYZ* - 希望返回的状态码。应为 3 位十进制数字，第一位不能为 0。
- *HTTP\_STATUS\_MESSAGE* - 希望返回给客户端的任意文本，它将位于 HTTP 回复中上述状态码之后。

在任何 HTTP 响应中，它都位于第一行，格式如下：

```
HTTP/1.0 XYZ HTTP_STATUS_MESSAGE

```

**http-header 语法：**

```
$(if http-header == HTTP_HEADER_NAME)HTTP_HEADER_VALUE$(endif)

```

- *HTTP\_HEADER\_NAME* - 响应中发送的 HTTP 标头名称
- *HTTP\_HEADER\_VALUE* - 响应中发送的名为 HTTP\_HEADER\_NAME 的 HTTP 标头值

HTTP 响应将显示如下：

```
HTTP_HEADER_NAME: HTTP_HEADER_VALUE

```

HTTP\_HEADER\_VALUE 和 HTTP\_STATUS\_MESSAGE 中的所有变量和条件表达式都会按常规处理。

如果添加了多个同名标头，则只使用最后一个（之前的标头将被丢弃）。这样系统可以覆盖常规 HTTP 标头（例如 Content-Type 和 Cache-Control）。

#### 自定义错误消息 {#customizing-error-messages}

所有错误消息都存储在相应 HotSpot servlet 目录中的 errors.txt 文件内。你可以更改并将所有这些消息翻译为本地语言。为此，请编辑 errors.txt 文件。你也可以在消息中使用变量。所有说明都在该文件中给出。

#### 多个版本的 HotSpot 页面 {#multiple-versions-of-hotspot-pages}

同一 HotSpot 服务器支持多套 HotSpot 页面集。用户可以选择页面集（以选择语言），也可以由 JavaScript 自动选择（以选择 PDA 版或普通版 HTML 页面）。

要使用此功能，请在 HotSpot HTML 目录中创建子目录，并将不同的 HTML 文件放入该子目录。例如，要将所有内容翻译为拉脱维亚语，可以创建子目录“lv”，并在其中放入已翻译为拉脱维亚语的 login.html、logout.html、status.html、alogin.html、radvert.html 和 errors.txt 文件。如果在请求的子目录中找不到请求的 HTML 页面，将使用主目录中的对应 HTML 文件。主 login.html 文件应包含指向“/lv/login?dst=$(link-orig-esc)”的链接，随后会显示拉脱维亚语版本的登录页面：Latviski。拉脱维亚语版本应包含指向英语版本的链接：English

引用目录的另一种方式是指定 'target' 变量：

```
        Latviski
        English

```

选择首选目录后（例如“lv”），所有指向本地 HotSpot 页面的链接都会包含该路径（例如 $(link-status) = "[http://hotspot.mt.lv/lv/status](http://hotspot.mt.lv/lv/status)"）。因此，如果所有 HotSpot 页面都使用 "$(link-xxx)" 变量引用链接，则无需再进行其他更改，每个客户端都会始终停留在所选目录中。

#### Misc

如果要使用 HTTP-CHAP 认证方法，则需要在登录表单的 **Submit action** 之前包含 **doLogin()** 函数（该函数引用 **md5.js**，而后者必须已加载）。否则，CHAP 登录将失败。

在 HTTP-CHAP 方法下，发送到 HotSpot 网关的最终密码由以下内容的拼接结果进行 MD5 哈希形成：chap-id、用户密码和 chap-challenge（按给定顺序）。

如果直接在链接中使用变量，则必须相应地进行转义。例如，在登录页面中，如果用户名为“123&456=1 2”，则 **link** 将无法按预期工作。在这种情况下，必须使用 $(user) 的转义版本：$(user-esc)：**link**。现在，同一用户名将被转换为“123%26456%3D1+2”，这是“123&456=1 2”在 URL 中的有效表示形式。此技巧可用于任何变量，不仅限于 $(username)。

注销页面有一个布尔参数 "erase-cookie"，其值可以是 "on" 或 "true"，用于在注销时删除用户 cookie（这样用户下次打开浏览器时就不会自动登录）。

#### 示例 {#examples}

具备基础 HTML 语言知识并参考以下示例后，应能轻松实现上述思路：

- 要提供预定义的用户名值，请在 login.html 中修改：

```
<input type="text" name="username" value="$(username)">

```

改为以下行：

```
<input type="hidden" name="username" value="hsuser">

```

（其中 hsuser 是你提供的用户名）

- 要提供预定义的密码值，请在 login.html 中修改：

```
<input type="password">

```

改为以下行：

```
<input type="hidden" name="password" value="hspass">

```

（其中 hspass 是你提供的密码）

- 要以以下形式将客户端的 MAC 地址发送到注册服务器：

[https://www.example.com/register.html?mac=XX:XX:XX:XX:XX:XX](https://www.example.com/register.html?mac=XX:XX:XX:XX:XX:XX)

将 login.html 中的 Login 按钮链接更改为：

```
https://www.example.com/register.html?mac=$(mac)

```

（应更正链接，使其指向你的服务器）

- 要在用户登录后显示横幅，请在 alogin.html 中的

$(if popup == 'true') 后添加以下行：

```
open('http://www.example.com/your-banner-page.html', 'my-banner-name','');

```

（应更正链接，使其指向要显示的页面）

- 要选择登录后显示的不同页面，请在 login.html 中将：

```
<input type="hidden" name="dst" value="$(link-orig)">

```

更改为以下行：

```
<input type="hidden" name="dst" value="http://www.example.com">

```

（应将链接更正为指向你的服务器）

- 要在注销时清除 cookie，请在包含注销链接的页面中（例如 status.html）修改。

```
open('$(link-logout)', 'hotspot_logout', ...

```

改为：

```
open('$(link-logout)?erase-cookie=on', 'hotspot_logout', ...

```

或者添加以下行：

```
<input type="hidden" name="erase-cookie" value="on">

```

在此行之前：

```
<input type="submit" value="log off">

```

##### 外部认证 {#external-authentication}

另一个示例是让 HotSpot 在远程服务器上进行认证（例如，该服务器可以执行信用卡扣费）：

- 在 walled-garden 中允许直接访问外部服务器（基于 HTTP 或基于 IP）。
- 修改 HotSpot servlet 的登录页面，使其重定向到外部认证服务器。外部服务器应根据需要修改 RADIUS 数据库。

以下是可放置在 HotSpot 路由器上的此类登录页面示例（它重定向到 [https://auth.example.com/login.php](https://auth.example.com/login.php)，请替换为外部认证服务器的实际地址）：

```
<html>
<title>...</title>
<body>
<form name="redirect" action="https://auth.example.com/login.php" method="post">
<input type="hidden" name="mac" value="$(mac)">
<input type="hidden" name="ip" value="$(ip)">
<input type="hidden" name="username" value="$(username)">
<input type="hidden" name="link-login" value="$(link-login)">
<input type="hidden" name="link-orig" value="$(link-orig)">
<input type="hidden" name="error" value="$(error)">
</form>
<script language="JavaScript">
<!--
	document.redirect.submit();
//-->
</script>
</body>
</html>
          

```

- 外部服务器可以通过将 HotSpot 客户端重定向回原始 HotSpot servlet 登录页面，并指定正确的用户名和密码，使该客户端登录。

以下是此类页面的示例（它重定向到 [https://hotspot.example.com/login](https://hotspot.example.com/login)，请将其替换为 HotSpot 路由器的实际地址；此外，它在登录成功后显示 [www.mikrotik.com](http://www.mikrotik.com)，请将其替换为所需内容）：

```
<html>
<title>Hotspot login page</title>
<body>
<form name="login" action="https://hotspot.example.com/login" method="post">
<input type="text" name="username" value="demo">
<input type="password" name="password" value="none">
<input type="hidden" name="domain" value="">
<input type="hidden" name="dst" value="http://www.mikrotik.com/">
<input type="submit" name="login" value="log in">
</form>
</body>
</html>
          

```

- Hotspot 将询问 RADIUS 服务器是否允许登录。如果允许，将显示 alogin.html 页面（可对其进行修改以执行任何操作）。如果不允许，将显示 flogin.html（或 login.html）页面，该页面会将客户端重定向回外部认证服务器。

**注意：** 如这些示例所示，可以使用 HTTPS 协议和 POST 方法来保护通信。

##### HTTP 头检测 {#http-header-detection}

Hotspot 登录页面可以通过使用 **$(http-header-name);** 访问 HTTP 头。

例如，可以检查用户代理（或浏览器），并在需要时返回任何其他内容，而不是常规登录页面。例如，这可用于禁用手机中的自动弹出窗口。

例如，要为特定 Firefox 移动版本的用户输出“SUCCESS”，而不是显示登录页面，可以在 hotspot 目录中的 **rlogin.html** 页面顶部添加以下行：

```
$(if user-agent == "Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0" ) 
<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML> 
$(else)
---- regular content of rlogin.html page  ----
$(endif)

```

这将为 Android Firefox 40 用户禁用登录弹出窗口。

##### 一键登录 {#one-click-login}

可以创建经过修改的 captive portal，用于不需要用户名或密码的场景，实现快速一键登录。

需要执行以下操作：

- 为此创建一个用户。例如，用户名为“notsosecretuser”，密码为“notsosecretpass”。
- 将该用户分配到允许用户特定数量或无限数量同时在线的用户配置文件。
- 复制路由器文件菜单中已在根级别生成的原始 hotspot 目录。
- 修改该副本目录中的内容。
  - 只需修改一个文件即可实现此功能，即“login.html”。

Original:

```

  login
      <input style={{width: '80px'}} name="username" type="text" value="$(username)"/>
  
  password
      <input style={{width: '80px'}} name="password" type="password"/>
  
   
      <input type="submit" value="OK" />
  

```

Modified:

```

  login
    <input style={{width: '80px'}} name="username" type="text" value="notsosecretuser"/>
  
  password
    <input style={{width: '80px'}} name="password" type="password" value="notsosecretpass"/>
  
   
    <input type="submit" value="Proceed to Internet!" />
  

```

更改内容：

- - - 隐藏 User 和 Password “”字段。
    - User 和 Password 字段值均包含预定义值。
    - 将“OK”按钮的值（名称）更改为更合适的内容。

- 现在将这个新的 hotspot 文件夹上传回路由器，最好使用不同的名称。
- 修改 hotspot server profile 中的设置，使其使用这个新的 html 目录。

```
/ip/hotspot/profile/set (profile number or name) html-directory-override=(dir path/name)

```

### 防火墙自定义 {#firewall-customizations}

#### 摘要 {#summary}

除了 `/ip/hotspot` 子菜单本身中明显的动态条目（如 hosts 和 active users）之外，启用 HotSpot 服务时还会在防火墙表中添加一些额外规则。

#### NAT

通过 **`/ip/firewall/nat/print` dynamic** 命令，可以得到类似下面的内容（注释位于每条规则之后）：

```
 0 D chain=dstnat action=jump jump-target=hotspot hotspot=from-client

```

将来自所有 HotSpot 客户端的数据包的所有 HotSpot 相关任务放入单独的链中。

```
 1 I chain=hotspot action=jump jump-target=pre-hotspot

```

所有需要在 HotSpot 规则生效前执行的操作，都应放入 pre-hotspot 链。该链完全由管理员控制，不包含系统设置的任何规则，因此存在无效的 jump 规则（因为该链默认没有任何规则）。

```
 2 D chain=hotspot action=redirect to-ports=64872 dst-port=53 protocol=udp 
 3 D chain=hotspot action=redirect to-ports=64872 dst-port=53 protocol=tcp 

```

将所有 DNS 请求重定向到 HotSpot 服务。64872 端口为所有 HotSpot 用户提供 DNS 服务。如果希望 HotSpot 服务器监听其他端口，请在此处以相同方式添加规则，并修改 dst-port 属性。

```
 4 D chain=hotspot action=redirect to-ports=64873 hotspot=local-dst dst-port=80
     protocol=tcp

```

将所有 HTTP 登录请求重定向到 HTTP 登录 servlet。64873 是 HotSpot HTTP servlet 端口。

```
 5 D chain=hotspot action=redirect to-ports=64875 hotspot=local-dst dst-port=443
     protocol=tcp

```

将所有 HTTPS 登录请求重定向到 HTTPS 登录 servlet。64875 是 HotSpot HTTPS servlet 端口。

```
 6 D chain=hotspot action=jump jump-target=hs-unauth hotspot=!auth protocol=tcp

```

除 DNS 和来自未授权客户端的登录请求外，所有其他数据包都应通过 hs-unauth 链。

```
 7 D chain=hotspot action=jump jump-target=hs-auth hotspot=auth protocol=tcp

```

来自已授权客户端的数据包则通过 hs-auth 链。

```
 8 D ;;; www.mikrotik.com
     chain=hs-unauth action=return dst-address=66.228.113.26 dst-port=80 protocol=tcp

```

首先，在 **hs-unauth** 链中放入 `/ip/hotspot/walled-garden/ip` 子菜单中所有影响 TCP 协议的内容（即所有未设置 protocol 或设置为 TCP 的规则）。此处将 [www.mikrotik.com](http://www.mikrotik.com) 排除在重定向到登录页面之外。

```
 9 D chain=hs-unauth action=redirect to-ports=64874 dst-port=80 protocol=tcp

```

所有其他 HTTP 请求都会重定向到监听端口 64874 的 Walled Garden 代理服务器。如果 `/ip/hotspot/walled-garden` 菜单中某个 HTTP 请求存在“allow”条目，则该请求会被转发到目标地址。否则，请求将自动重定向到 HotSpot 登录 servlet（端口 64873）。

```
10 D chain=hs-unauth action=redirect to-ports=64874 dst-port=3128 protocol=tcp 
11 D chain=hs-unauth action=redirect to-ports=64874 dst-port=8080 protocol=tcp 

```

HotSpot 默认假定只有这些端口可用于 HTTP 代理请求。这两个条目用于“捕获”客户端对未知代理的请求（你可以在此处为其他端口添加更多规则），即使具有未知代理设置的客户端也能与 HotSpot 系统协同工作。此功能称为“Universal Proxy”。如果检测到客户端正在使用某个代理服务器，系统会自动使用 HTTP hotspot 标记标记这些数据包，以解决未知代理问题，稍后我们将看到这一点。请注意，所使用的端口（64874）与规则 #9 中 HTTP 请求的端口相同（因此 HTTP 和 HTTP 代理请求由同一代码处理）。

```
12 D chain=hs-unauth action=redirect to-ports=64875 dst-port=443 protocol=tcp

```

HTTPS 代理监听端口 64875。

```
13 I chain=hs-unauth action=jump jump-target=hs-smtp dst-port=25 protocol=tcp

```

SMTP 协议的重定向也可以在 HotSpot 配置中定义。如果已定义，重定向规则将放入 hs-smtp 链。这样做是为了让 SMTP 配置未知的用户能够通过服务提供商（你）的 SMTP 服务器发送邮件，而不是访问用户在其计算机上配置的 SMTP 服务器（该服务器在其原始网络之外可能不可用）。该链默认为空，因此存在无效的跳转规则。

```
14 D chain=hs-auth action=redirect to-ports=64874 hotspot=http protocol=tcp

```

为已授权用户提供 HTTP 代理服务。已认证用户的请求可能需要进行透明代理（“Universal Proxy”技术和广告功能）。对于 HotSpot HTTP 代理（监听端口 64874）检测为未知代理服务器 HTTP 代理请求的 HTTP 代理请求，会自动添加此 HTTP 标记。这样做是为了让具有某些代理设置的用户使用 HotSpot 网关，而不是使用用户在其计算机上配置的代理服务器（该服务器在其原始网络之外可能不可用）。当用户需要展示广告时，也会应用此标记；对于其 profile 配置为透明代理请求的用户发出的任何 HTTP 请求，也会应用此标记。

```
15 I chain=hs-auth action=jump jump-target=hs-smtp dst-port=25 protocol=tcp

```

为已授权用户提供 SMTP 代理（与规则 #13 中相同）。

#### 数据包过滤 {#packet-filtering}

从 **`/ip/firewall/filter/print` dynamic** 命令中，你可以得到类似以下内容（注释位于每条规则之后）：

```
 0 D chain=forward action=jump jump-target=hs-unauth hotspot=from-client,!auth

```

任何从未经授权的客户端穿过路由器的数据包都会被发送到 hs-unauth 链。hs-unauth 实现基于 IP 的 Walled Garden 过滤。

```
 1 D chain=forward action=jump jump-target=hs-unauth-to hotspot=to-client,!auth

```

所有通过路由器到达客户端的流量都会被重定向到另一个链，称为 hs-unauth-to。该链应拒绝未经授权访问客户端的请求。

```
 2 D chain=input action=jump jump-target=hs-input hotspot=from-client

```

所有从客户端发往路由器本身的流量都会进入另一个链，称为 hs-input。

```
 3 I chain=hs-input action=jump jump-target=pre-hs-input

```

在继续处理 [predefined] 动态规则之前，数据包会进入由管理员控制的 **pre-hs-input** 链，该链默认为空，因此跳转规则处于无效状态。

```
 4 D chain=hs-input action=accept dst-port=64872 protocol=udp 
 5 D chain=hs-input action=accept dst-port=64872-64875 protocol=tcp 

```

允许客户端访问本地认证和代理服务（如前所述）。

```
 6 D chain=hs-input action=jump jump-target=hs-unauth hotspot=!auth

```

来自未授权客户端到路由器本身的所有其他流量，将按与穿越路由器的流量相同的方式处理。

```
 7 D chain=hs-unauth action=return protocol=icmp
 8 D ;;; www.mikrotik.com
     chain=hs-unauth action=return dst-address=66.228.113.26 dst-port=80 protocol=tcp

```

与 NAT 表中仅添加 TCP 协议相关的 Walled Garden 条目不同，在数据包过滤器中，**hs-unauth** 链会添加到你在 `/ip/hotspot/walled-garden/ip` 菜单中设置的所有内容。因此，尽管你在 NAT 表中只看到一条条目，这里却有两条规则。

```
 9 D chain=hs-unauth action=reject reject-with=tcp-reset protocol=tcp
10 D chain=hs-unauth action=reject reject-with=icmp-net-prohibited

```

所有未被 Walled Garden 列入白名单的其他内容都将被拒绝。注意，拒绝 TCP 连接时使用了 TCP Reset。

```
11 D chain=hs-unauth-to action=return protocol=icmp
12 D ;;; www.mikrotik.com
     chain=hs-unauth-to action=return src-address=66.228.113.26 src-port=80 protocol=tcp

```

对于发往客户端的数据包（链 **hs-unauth-to**），也会执行与规则 #7 和 #8 相同的动作。

```
13 D chain=hs-unauth-to action=reject reject-with=icmp-host-prohibited

```

使用 ICMP 拒绝消息拒绝所有发往客户端的数据包。
