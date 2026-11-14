---
sidebar_key: "authentication-authorization-accounting/hotspot-captive-portal/hotspot-customisation"
sidebar_position: 1
title: "热点自定义"
sidebar_label: "热点自定义"
description: "通过在路由器的 FTP 服务器上覆盖默认 HTML 文件来自定义 HotSpot 认证页面，并通过 HotSpot 配置文件中的“html-directory-override”指定自定义目录。可从 login.html、status.html 和 logout.html 等预定义页面中选择，或使用 $(username) 和 $(password) 等变量创建自定义页面。"
tags:
  - 'hotspot'
  - 'servlet-pages'
  - 'radius'
source: https://manual.mikrotik.com/docs/authentication-authorization-accounting/hotspot-captive-portal/hotspot-customisation
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

#### 简介 {#introduction}

你可以为每个已有的 HotSpot 服务器创建一套完全不同的 Servlet 页面，方法是在 HotSpot 服务器配置文件 `/ip/hotspot/profile` 的 "html-directory-override" 属性中指定目录。创建服务器配置文件后，默认的 Servlet 页面会立即复制到 "hotspot" 目录中。可以通过使用 FTP 客户端连接到路由器来访问此目录。你可以复制此目录，并使用本手册本节中的信息随意修改页面。请注意，建议手动编辑文件，因为自动化 HTML 编辑工具可能会删除变量或其他关键部分，从而损坏页面。完成内容修改后，你需要将此修改后的内容上传到热点路由器上的某个自定义目录，并将前面提到的 "html-directory-override" 属性值指向这个新的自定义 HTML 目录的路径。

**注意：** 如果 "html-directory-override" 值路径缺失或为空，则热点服务器将恢复为默认 HTML 文件。

#### 可用页面 {#available-pages}

向用户显示的主要 HTML Servlet 页面：

- **redirect.html** - 将用户重定向到另一个 URL（例如，重定向到登录页面）。
- **login.html** - 向用户显示以要求输入用户名和密码的登录页面。此页面可使用以下参数：
  - **username** - 用户名。
  - **password** - 明文密码（在使用 PAP 认证时），或 chap-id 变量、密码和 CHAP challenge 的 MD5 哈希（在使用 CHAP 认证时）。对于试用用户，此值用作电子邮件地址。
  - **dst** - 重定向之前请求的原始 URL。登录成功后将打开此 URL。
  - **popup** - 登录成功时是否弹出状态窗口。
  - **radius\<id>** - 将用 \<id> 标识的属性以文本字符串形式发送到 RADIUS 服务器（如果使用 RADIUS 认证；否则会丢失）。
  - **radius\<id>u** - 将用 \<id> 标识的属性以无符号整数形式发送到 RADIUS 服务器（如果使用 RADIUS 认证；否则会丢失）。
  - **radius\<id>-\<vnd-id>** - 将用 \<id> 标识且供应商 ID 为 \<vnd-id> 的属性以文本字符串形式发送到 RADIUS 服务器（如果使用 RADIUS 认证；否则会丢失）。
  - **radius\<id>-\<vnd-id>u** - 将用 \<id> 标识且供应商 ID 为 \<vnd-id> 的属性以无符号整数形式发送到 RADIUS 服务器（如果使用 RADIUS 认证；否则会丢失）。
- **md5.js** - 用于 MD5 密码哈希的 JavaScript。与 http-chap 登录方法一起使用。
- **alogin.html** - 客户端登录后显示的页面。它会弹出状态页面，并将浏览器重定向到最初请求的页面（在用户被重定向到 HotSpot 登录页面之前请求的页面）。
- **status.html** - 状态页面，显示客户端的统计信息。它还能够自动显示广告。
- **logout.html** - 注销页面，在用户注销后显示。显示有关已结束会话的最终统计信息。此页面可使用以下附加参数：
  - **erase-cookie** - 注销时是否从 HotSpot 服务器删除 cookie（使下次无法从同一浏览器使用 cookie 登录，在多用户环境中可能有用）。
- **error.html** - 错误页面，仅在发生致命错误时显示。

如果需要更多控制，还可使用一些其他页面：

- **rlogin.html** - 如果访问某个 URL 需要客户端授权，则将该客户端从其他 URL 重定向到登录页面的页面
- **rstatus.html** - 与 rlogin.html 类似，但仅在客户端已登录且原始 URL 未知的情况下使用
- **radvert.html** - 将客户端重定向到计划广告链接
- **flogin.html** - 如果发生某种错误（例如用户名或密码无效），则代替 login.html 显示
- **fstatus.html** - 如果请求状态页面但客户端未登录，则代替重定向显示
- **flogout.html** - 如果请求注销页面但客户端未登录，则代替重定向显示

#### Servlet 页面服务 {#serving-servlet-pages}

HotSpot Servlet 识别 5 种不同的请求类型：

1. **对远程主机的请求**
   - 如果用户已登录且广告已到显示时间，则显示 radvert.html。此页面会重定向到计划广告页面。
   - 如果用户已登录且未为此用户安排广告，则提供所请求的页面。
   - 如果用户未登录，但目标主机被 Walled Garden 允许，则也会提供该请求。
   - 如果用户未登录，且目标主机被 Walled Garden 禁止，则显示 rlogin.html；如果找不到 rlogin.html，则使用 redirect.html 重定向到登录页面。
2. **对 HotSpot 主机上 "/" 的请求**
   - 如果用户已登录，则显示 rstatus.html；如果找不到 rstatus.html，则使用 redirect.html 重定向到状态页面。
   - 如果用户未登录，则显示 rlogin.html；如果找不到 rlogin.html，则使用 redirect.html 重定向到登录页面。
3. **对 "/login" 页面的请求**
   - 如果用户已成功登录（或已经登录），则显示 alogin.html；如果找不到 alogin.html，则使用 redirect.html 重定向到最初请求的页面或状态页面（如果未提供原始目标页面）。
   - 如果用户未登录（未提供用户名，且未出现错误消息），则显示 login.html。
   - 如果登录过程失败（提供了错误消息），则显示 flogin.html；如果找不到 flogin.html，则使用 login.html。
   - 在发生致命错误时，显示 error.html。
4. **对 "/status" 页面的请求**
   - 如果用户已登录，则显示 status.html。
   - 如果用户未登录，则显示 fstatus.html；如果找不到 fstatus.html，则使用 redirect.html 重定向到登录页面。
5. **对 '/logout' 页面的请求**
   - 如果用户已登录，则显示 logout.html。
   - 如果用户未登录，则显示 flogout.html；如果找不到 flogout.html，则使用 redirect.html 重定向到登录页面。

**注意：** 如果无法使用路由器 FTP 服务器上存储的页面满足请求，则显示 Error 404。

有许多方法可以自定义 HotSpot 认证页面的外观：

- 这些页面易于修改。它们存储在路由器 FTP 服务器上你为相应 HotSpot 服务器配置文件选择的目录中。
- 通过更改客户端发送到 HotSpot Servlet 的变量，可以将关键字数量减少到一个（用户名或密码；例如，客户端的 MAC 地址可用作另一个值），甚至减少到零（许可证协议；可使用对所有用户通用的一些预定义值或客户端的 MAC 地址作为用户名和密码）。
- 注册可以在另一台服务器上进行（例如，在能够进行信用卡扣费的服务器上）。可以将客户端的 MAC 地址传递给它，这样就不必手动输入此信息。注册后，服务器应更改 RADIUS 数据库，使客户端能够在一段时间内登录。

要在 HTML 文件中的某个位置插入变量，请使用 $(var\_name) 语法，其中 "var\_name" 是变量名（不带引号）。此构造可用于以 '/', '/login', '/status' 或 '/logout' 访问的任何 HotSpot HTML 文件，以及存储在 HotSpot 服务器上的任何文本或 HTML（.txt、.htm 或 .html）文件（流量计数器除外，它们仅在状态页面中可用；**error**、**error-orig**、**chap-id**、**chap-challenge** 和 **popup** 变量也除外，它们仅在登录页面中可用）。例如，要显示指向登录页面的链接，可使用以下构造：

```
login

```

#### 变量 {#variables}

所有 Servlet HTML 页面都使用变量来显示用户特定的值。变量名仅出现在 Servlet 页面的 HTML 源代码中——HotSpot Servlet 会自动将它们替换为相应的值。对于大多数变量，括号中包含了其可能值的示例。所有描述的变量在所有 Servlet 页面中都有效，但其中一些在访问时可能为空（例如，在用户登录之前没有 uptime）。

##### 可用变量列表 {#list-of-available-variables}

**注意：** 某些变量使用硬编码的 http URL，如果你使用 https，可以用其他方式构造链接，例如对于 $link-status，你可以使用 https://$(hostname)/$(target-dir)status

**通用服务器变量：**

- **hostname** - HotSpot Servlet 的 DNS 名称或 IP 地址（如果未提供 DNS 名称）（"[hotspot.example.net](http://hotspot.example.net)"）。
- **identity** - RouterOS 标识名称（"MikroTik"）。
- **login-by** - 用户使用的认证方法。
- **plain-passwd** - 以 "yes/no" 表示是否允许 HTTP-PAP 登录方法（"no"）。
- **server-address** - HotSpot 服务器地址（"10.5.50.1:80"）。
- **ssl-login** - 以 "yes/no" 表示是否使用 HTTPS 方法访问该 Servlet 页面（"no"）。
- **server-name** - HotSpot 服务器名称（在 `/ip/hotspot` 菜单中设置为 name 属性）。

**链接：**

- **link-login** - 指向登录页面的链接，包含所请求的原始 URL（"[http://10.5.50.1/login?dst=http://www.example.com/](http://10.5.50.1/login?dst=http://www.example.com/)"）
- **link-login-only** - 指向登录页面的链接，不包含所请求的原始 URL（"[http://10.5.50.1/login](http://10.5.50.1/login)"）
- **link-logout** - 指向注销页面的链接（"[http://10.5.50.1/logout](http://10.5.50.1/logout)"）
- **link-status** - 指向状态页面的链接（"[http://10.5.50.1/status](http://10.5.50.1/status)"）
- **link-orig** - 所请求的原始 URL（"[http://www.example.com/](http://www.example.com/)"）

**常规客户端信息：**

- **domain** - 用户的域名（"[example.com](http://example.com)"）。
- **interface-name** - 物理 HotSpot 接口名称（对于桥接接口，将返回实际的桥接端口名称）。
- **ip** - 客户端的 IP 地址（"10.5.50.2"）。
- **logged-in** - 如果用户已登录则为 "yes"，否则为 "no"（"yes"）。
- **mac** - 用户的 MAC 地址（"01:23:45:67:89:AB"）。
- **trial** - 以 "yes/no" 表示用户是否有试用时间访问权限。如果用户的试用时间已过期，则该值为 "no"。
- **username** - 用户的名称（"John"）。
- **host-ip** - 来自 `/ip/hotspot/host` 表的客户端 IP 地址。
- **vlan-id** - 表示客户端所连接的 VLAN 接口的 ID。

**用户状态信息：**

- **idle-timeout** - 空闲超时（"20m"，如果没有则为 ""）。
- **idle-timeout-secs** - 以秒为单位的空闲超时（"88"，如果没有此类超时则为 "0"）。
- **limit-bytes-in** - 发送的字节限制（"1000000"，如果没有限制则为 "---"）。
- **limit-bytes-out** - 接收的字节限制（"1000000"，如果没有限制则为 "---"）。
- **refresh-timeout** - 状态页面刷新超时（"1m30s"，如果没有则为 ""）。
- **refresh-timeout-secs** - 以秒为单位的状态页面刷新超时（"90s"，如果没有则为 "0"）。
- **session-timeout** - 留给用户的会话时间（"5h"，如果没有则为 ""）。
- **session-timeout-secs** - 留给用户的会话时间，以秒为单位（"3475"，如果没有此类超时则为 "0"）。
- **session-time-left** - 留给用户的会话时间（"5h"，如果没有则为 ""）。
- **session-time-left-secs** - 留给用户的会话时间，以秒为单位（"3475"，如果没有此类超时则为 "0"）。
- **uptime** - 当前会话的运行时间（"10h2m33s"）。
- **uptime-secs** - 当前会话的运行时间，以秒为单位（"125"）。

**流量计数器，仅在状态页面中可用：**

- **bytes-in** - 从用户接收的字节数（"15423"）。
- **bytes-in-nice** - 从用户接收字节数的用户友好形式（"15423"）。
- **bytes-out** - 发送给用户的字节数（"11352"）。
- **bytes-out-nice** - 发送给用户字节数的用户友好形式（"11352"）。
- **packets-in** - 从用户接收的数据包数（"251"）。
- **packets-out** - 发送给用户的数据包数（"211"）。
- **remain-bytes-in** - 直到达到 limit-bytes-in 前的剩余字节数（"337465"，如果没有限制则为 "---"）。
- **remain-bytes-out** - 直到达到 limit-bytes-out 前的剩余字节数（"124455"，如果没有限制则为 "---"）。

**其他变量：**

- **session-id** - 上次请求中 'session-id' 参数的值。
- **var** - 上次请求中 'var' 参数的值。
- **error** - 错误消息，如果发生失败（"invalid username or password"）。
- **error-orig** - 原始错误消息（不包含从 errors.txt 获取的翻译），如果发生失败（"invalid username or password"）。
- **chap-id** - chap ID 的值（"\371"）。
- **chap-challenge** - chap challenge 的值（"\357\015\330\013\021\234\145\245\303\253\142\246\133\175\375\316"）。
- **popup** - 是否弹出复选框（"true" 或 "false"）。
- **advert-pending** - 是否有广告待显示（"yes" 或 "no"）。
- **http-status** - 允许设置 http 状态码和消息。
- **http-header** - 允许设置 http 标头。

**RADIUS 相关变量：**

- **radius\<id>** - 以文本字符串形式显示由 \<id> 标识的属性（如果使用了 RADIUS 认证；否则为 ""）
- **radius\<id>u** - 以无符号整数形式显示由 \<id> 标识的属性（如果使用了 RADIUS 认证；否则为 "0"）
- **radius\<id>-\<vnd-id>** - 以文本字符串形式显示由 \<id> 标识且供应商 ID 为 \<vnd-id> 的属性（如果使用了 RADIUS 认证；否则为 ""）
- **radius\<id>-\<vnd-id>u** - 以无符号整数形式显示由 \<id> 标识且供应商 ID 为 \<vnd-id> 的属性（如果使用了 RADIUS 认证；否则为 "0"）

##### 使用变量 {#working-with-variables}

这些页面中可以使用 $(if \<var\_name>) 语句。如果 \<var\_name> 的值不是空字符串，则将包含以下内容。它等价于 $(if \<var\_name> != "")。也可以进行相等比较：$(if \<var\_name> == \<value>)。这些语句生效直到 $(elif \<var\_name>)、$(else) 或 $(endif)。一般情况下如下所示：

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

这些表达式中只会显示一个。具体显示哪一个取决于每个客户端这些变量的值。

##### 重定向和自定义标头 {#redirects-and-custom-headers}

```
	$(if http-status == 302)Hotspot login required$(endif)
	$(if http-header == "Location")$(link-redirect)$(endif)

```

**注意：** 尽管上面的内容看起来使用了条件表达式 'if'，但实际上它是在将 'http-status' 设置为 '302'，而不是在测试它。这同样适用于变量 'http-header'。再次说明，尽管它使用了 'if'，但实际上是在将变量设置为 'Location'，后接由变量 'link-redirect' 设置的 URL。

例如，在 $(link-redirect) 求值为 "[http://192.168.88.1/login](http://192.168.88.1/login)" 的情况下，返回给客户端的 HTTP 响应将变为：

```
HTTP/1.0 302 Hotspot login required
<regular HTTP headers>
Location: http://192.168.88.1/login

```

**http-status 语法**：

```
	$(if http-status == XYZ)HTTP_STATUS_MESSAGE$(endif)

```

- *XYZ* - 你希望返回的状态码。应为 3 个十进制数字，第一位不能为 0。
- *HTTP\_STATUS\_MESSAGE* - 你希望返回给客户端的任何文本，它将出现在 HTTP 回复中上述状态码之后。

在任何 HTTP 响应中，它将位于第一行，如下所示：

```
HTTP/1.0 XYZ HTTP_STATUS_MESSAGE

```

**http-header 语法：**

```
$(if http-header == HTTP_HEADER_NAME)HTTP_HEADER_VALUE$(endif)

```

- *HTTP\_HEADER\_NAME* - 要在响应中发送的 HTTP 标头的名称
- *HTTP\_HEADER\_VALUE* - 名为 HTTP\_HEADER\_NAME 的 HTTP 标头要在响应中发送的值

HTTP 响应将如下所示：

```
HTTP_HEADER_NAME: HTTP_HEADER_VALUE

```

HTTP\_HEADER\_VALUE 和 HTTP\_STATUS\_MESSAGE 中的所有变量和条件表达式都会照常处理。

如果添加了多个同名标头，则只会使用最后一个（之前的将被丢弃）。这允许系统覆盖常规 HTTP 标头（例如 Content-Type 和 Cache-Control）。

#### 自定义错误消息 {#customizing-error-messages}

所有错误消息都存储在相应 HotSpot Servlet 目录中的 errors.txt 文件内。你可以更改所有这些消息并将其翻译为你的母语。为此，请编辑 errors.txt 文件。你还可以在消息中使用变量。所有说明都在该文件中给出。

#### HotSpot 页面的多个版本 {#multiple-versions-of-hotspot-pages}

支持为同一 HotSpot 服务器提供多套 HotSpot 页面。它们可以由用户选择（用于选择语言），或由 JavaScript 自动选择（用于选择 PDA/常规版本的 HTML 页面）。

要使用此功能，请在 HotSpot HTML 目录中创建子目录，并将那些不同的 HTML 文件放入该子目录。例如，要将所有内容翻译为拉脱维亚语，可以创建子目录 "lv"，其中包含已翻译为拉脱维亚语的 login.html、logout.html、status.html、alogin.html、radvert.html 和 errors.txt 文件。如果在请求的子目录中找不到所请求的 HTML 页面，则将使用主目录中对应的 HTML 文件。主 login.html 文件会包含指向 "/lv/login?dst=$(link-orig-esc)" 的链接，然后显示拉脱维亚语版本的登录页面：Latviski。而拉脱维亚语版本会包含指向英语版本的链接：English

引用目录的另一种方法是指定 'target' 变量：

```
        Latviski
        English

```

选择首选目录后（例如 "lv"），所有指向本地 HotSpot 页面的链接都将包含该路径（例如，$(link-status) = "[http://hotspot.mt.lv/lv/status](http://hotspot.mt.lv/lv/status)"）。因此，如果所有 HotSpot 页面都使用 "$(link-xxx)" 变量引用链接，则无需再做更多更改——每个客户端将始终停留在所选目录中。

#### 其他 {#misc}

如果你想使用 HTTP-CHAP 认证方法，则需要在登录表单的 **提交操作** 之前包含 **doLogin()** 函数（该函数引用必须已加载的 **md5.js**）。否则，CHAP 登录将失败。

在 HTTP-CHAP 方法下，发送到 HotSpot 网关的最终密码由以下内容的拼接进行 MD5 哈希形成：chap-id、用户密码和 chap-challenge（按给定顺序）

如果要在链接中直接使用变量，则必须相应地进行转义。例如，在登录页面中，如果用户名为 "123&456=1 2"，则 **link** 将无法按预期工作。在这种情况下，必须使用 $(user) 的转义版本：$(user-esc)：**link**。现在同一用户名将转换为 "123%26456%3D1+2"，这是 "123&456=1 2" 在 URL 中的有效表示形式。此技巧可用于任何变量，而不仅是 $(username)。

注销页面有一个布尔参数 "erase-cookie"，其值可以是 "on" 或 "true"，用于在注销时删除用户 cookie（这样用户下次打开浏览器时就不会自动登录）。

#### 示例 {#examples}

具备基本 HTML 语言知识并参考以下示例，应该很容易实现上述想法：

- 要提供预定义值作为用户名，请在 login.html 中将：

```
<input type="text" name="username" value="$(username)">

```

改为以下行：

```
<input type="hidden" name="username" value="hsuser">

```

（其中 hsuser 是你提供的用户名）

- 要提供预定义值作为密码，请在 login.html 中更改。

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

请将 login.html 中的 Login 按钮链接改为：

```
https://www.example.com/register.html?mac=$(mac)

```

（你应该修正链接以指向你的服务器）

- 要在用户登录后显示横幅，请在 alogin.html 中在以下内容之后。

在 $(if popup == 'true') 之后添加以下行：

```
open('http://www.example.com/your-banner-page.html', 'my-banner-name','');

```

（你应该修正链接以指向要显示的页面）

- 要选择登录后显示的不同页面，请在 login.html 中更改：

```
<input type="hidden" name="dst" value="$(link-orig)">

```

改为以下行：

```
<input type="hidden" name="dst" value="http://www.example.com">

```

（你应该修正链接以指向你的服务器）

- 要在注销时删除 cookie，请在包含注销链接的页面（例如 status.html）中更改。

```
open('$(link-logout)', 'hotspot_logout', ...

```

改为：

```
open('$(link-logout)?erase-cookie=on', 'hotspot_logout', ...

```

或者，添加以下行：

```
<input type="hidden" name="erase-cookie" value="on">

```

在以下行之前：

```
<input type="submit" value="log off">

```

##### 外部认证 {#external-authentication}

另一个示例是让 HotSpot 在远程服务器上进行认证（例如，该服务器可能执行信用卡扣费）：

- 在 Walled Garden 中允许直接访问外部服务器（基于 HTTP 或基于 IP）。
- 修改 HotSpot Servlet 的登录页面，以重定向到外部认证服务器。外部服务器应按需修改 RADIUS 数据库。

以下是要放在 HotSpot 路由器上的此类登录页面示例（它重定向到 [https://auth.example.com/login.php](https://auth.example.com/login.php)，请替换为外部认证服务器的实际地址）：

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

- 外部服务器可以通过将 HotSpot 客户端重定向回原始 HotSpot Servlet 登录页面并指定正确的用户名和密码，来使该客户端登录。

以下是此类页面的示例（它重定向到 [https://hotspot.example.com/login](https://hotspot.example.com/login)，请将其替换为 HotSpot 路由器的实际地址；另外，它在登录成功后会显示 [www.mikrotik.com](http://www.mikrotik.com)，请将其替换为所需内容）：

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

- Hotspot 将询问 RADIUS 服务器是否允许登录。如果允许，则显示 alogin.html 页面（可将其修改为执行任何操作）。如果不允许，则显示 flogin.html（或 login.html）页面，该页面会将客户端重定向回外部认证服务器。

**注意：** 如这些示例所示，可以使用 HTTPS 协议和 POST 方法来保护通信。

##### HTTP 标头检测 {#http-header-detection}

Hotspot 登录页面可以通过使用 **$(http-header-name);** 访问 HTTP 标头；

例如，有一种能力可以检查用户代理（或浏览器），如果需要，它将返回任何其他内容而不是常规登录页面。例如，这可用于禁用手机中的自动弹窗。

例如，要为特定 Firefox 移动版本的用户输出 "SUCCESS" 而不是登录页面，你可以在 hotspot 目录中 **rlogin.html** 页面的顶部添加以下行：

```
$(if user-agent == "Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0" ) 
<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML> 
$(else)
---- regular content of rlogin.html page  ----
$(endif)

```

这将为 Android Firefox 40 用户禁用登录弹窗。

##### 一键登录 {#one-click-login}

可以创建修改后的强制门户，以便在不需要用户名或密码的场景中实现快速一键登录。

你需要做的是：

- 为此目的创建一个用户。例如，用户名为 "notsosecretuser"，密码为 "notsosecretpass"。
- 将此用户分配给允许特定数量/无限数量并发活动用户的用户配置文件。
- 复制路由器文件菜单根级别已生成的原始 hotspot 目录。
- 修改此副本目录的内容。
  - 为此，只需要修改一个文件，即 "login.html"。

原始内容：

```

  login
      <input style={{width: '80px'}} name="username" type="text" value="$(username)"/>
  
  password
      <input style={{width: '80px'}} name="password" type="password"/>
  
   
      <input type="submit" value="OK" />
  

```

修改后：

```

  login
    <input style={{width: '80px'}} name="username" type="text" value="notsosecretuser"/>
  
  password
    <input style={{width: '80px'}} name="password" type="password" value="notsosecretpass"/>
  
   
    <input type="submit" value="Proceed to Internet!" />
  

```

更改内容：

- - - 用户和密码 "" 字段被隐藏。
    - 用户和密码字段值都包含预定义值。
    - 将 "OK" 按钮的 value(name) 更改为更合适的内容。

- 现在将此新的 hotspot 文件夹上传回路由器，最好使用不同的名称。
- 更改 hotspot 服务器配置文件中的设置，以使用此新的 html 目录。

```
/ip/hotspot/profile/set (profile number or name) html-directory-override=(dir path/name)

```

### 防火墙自定义 {#firewall-customizations}

#### 概述 {#summary}

除了 `/ip/hotspot` 子菜单本身中明显的动态条目（如 hosts 和 active users）之外，激活 HotSpot 服务时还会在防火墙表中添加一些附加规则。

#### NAT {#nat}

通过 **`/ip/firewall/nat/print` dynamic** 命令，你可以得到类似以下内容（每条规则后附有注释）：

```
 0 D chain=dstnat action=jump jump-target=hotspot hotspot=from-client

```

将所有来自 HotSpot 客户端的数据包的 HotSpot 相关任务放入一个单独的链中。

```
 1 I chain=hotspot action=jump jump-target=pre-hotspot

```

任何应在 HotSpot 规则应用之前执行的操作都应放入 pre-hotspot 链。此链完全由管理员控制，不包含系统设置的任何规则，因此该跳转规则无效（因为默认情况下该链没有任何规则）。

```
 2 D chain=hotspot action=redirect to-ports=64872 dst-port=53 protocol=udp 
 3 D chain=hotspot action=redirect to-ports=64872 dst-port=53 protocol=tcp 

```

将所有 DNS 请求重定向到 HotSpot 服务。64872 端口为所有 HotSpot 用户提供 DNS 服务。如果你希望 HotSpot 服务器监听另一个端口，请以相同方式在此处添加规则，并更改 dst-port 属性。

```
 4 D chain=hotspot action=redirect to-ports=64873 hotspot=local-dst dst-port=80
     protocol=tcp

```

将所有 HTTP 登录请求重定向到 HTTP 登录 Servlet。64873 是 HotSpot HTTP Servlet 端口。

```
 5 D chain=hotspot action=redirect to-ports=64875 hotspot=local-dst dst-port=443
     protocol=tcp

```

将所有 HTTPS 登录请求重定向到 HTTPS 登录 Servlet。64875 是 HotSpot HTTPS Servlet 端口。

```
 6 D chain=hotspot action=jump jump-target=hs-unauth hotspot=!auth protocol=tcp

```

除来自未授权客户端的 DNS 和登录请求外，所有其他数据包都应经过 hs-unauth 链。

```
 7 D chain=hotspot action=jump jump-target=hs-auth hotspot=auth protocol=tcp

```

而来自已授权客户端的数据包则经过 hs-auth 链。

```
 8 D ;;; www.mikrotik.com
     chain=hs-unauth action=return dst-address=66.228.113.26 dst-port=80 protocol=tcp

```

在 **hs-unauth** 链中，首先放入 `/ip/hotspot/walled-garden/ip` 子菜单中所有影响 TCP 协议的内容（即所有未设置协议或设置为 TCP 的内容）。这里我们将 [www.mikrotik.com](http://www.mikrotik.com) 排除在重定向到登录页面之外。

```
 9 D chain=hs-unauth action=redirect to-ports=64874 dst-port=80 protocol=tcp

```

所有其他 HTTP 请求都会重定向到监听 64874 端口的 Walled Garden 代理服务器。如果 `/ip/hotspot/walled-garden` 菜单中存在针对某个 HTTP 请求的 "allow" 条目，则会将其转发到目标。否则，该请求将自动重定向到 HotSpot 登录 Servlet（端口 64873）。

```
10 D chain=hs-unauth action=redirect to-ports=64874 dst-port=3128 protocol=tcp 
11 D chain=hs-unauth action=redirect to-ports=64874 dst-port=8080 protocol=tcp 

```

默认情况下，HotSpot 假定只有这些端口可用于 HTTP 代理请求。这两个条目用于“捕获”客户端发往未知代理的请求（你可以在此处为其他端口添加更多规则），即让具有未知代理设置的客户端也能使用 HotSpot 系统。此功能称为 "Universal Proxy"。如果检测到客户端正在使用某个代理服务器，系统将自动用 HTTP hotspot 标记这些数据包，以规避未知代理问题，我们稍后会看到。请注意，使用的端口（64874）与规则 #9 中用于 HTTP 请求的端口相同（因此 HTTP 请求和 HTTP 代理请求都由同一代码处理）。

```
12 D chain=hs-unauth action=redirect to-ports=64875 dst-port=443 protocol=tcp

```

HTTPS 代理监听 64875 端口。

```
13 I chain=hs-unauth action=jump jump-target=hs-smtp dst-port=25 protocol=tcp

```

SMTP 协议的重定向也可以在 HotSpot 配置中定义。如果定义了，则会将重定向规则放入 hs-smtp 链。这样做的目的是让具有未知 SMTP 配置的用户能够通过服务提供商（你）的 SMTP 服务器发送邮件，而不是发往用户在自己计算机上配置的 [在其原始网络之外可能不可用] SMTP 服务器。默认情况下该链为空，因此该跳转规则无效。

```
14 D chain=hs-auth action=redirect to-ports=64874 hotspot=http protocol=tcp

```

为已授权用户提供 HTTP 代理服务。已认证用户的请求可能需要进行透明代理（"Universal Proxy" 技术和广告功能）。此 HTTP 标记会自动添加到 HotSpot HTTP 代理（监听 64874 端口的那个）检测到的、发往服务器的 HTTP 代理请求上，将其视为发往未知代理服务器的 HTTP 代理请求。这样做的目的是让具有某些代理设置的用户使用 HotSpot 网关，而不是使用用户在自己计算机上配置的 [在其原始网络之外可能不可用] 代理服务器。当广告需要显示给用户时，也会应用此标记，此外还会应用于那些配置文件配置为透明代理其请求的用户的任何 HTTP 请求。

```
15 I chain=hs-auth action=jump jump-target=hs-smtp dst-port=25 protocol=tcp

```

为已授权用户提供 SMTP 代理（与规则 #13 相同）。

#### 数据包过滤 {#packet-filtering}

通过 **`/ip/firewall/filter/print` dynamic** 命令，你可以得到类似以下内容（每条规则后附有注释）：

```
 0 D chain=forward action=jump jump-target=hs-unauth hotspot=from-client,!auth

```

任何从未授权客户端经过路由器的数据包都将发送到 **hs-unauth** 链。hs-unauth 实现基于 IP 的 Walled Garden 过滤。

```
 1 D chain=forward action=jump jump-target=hs-unauth-to hotspot=to-client,!auth

```

所有通过路由器到达客户端的内容都会重定向到另一个名为 **hs-unauth-to** 的链。此链应拒绝发往客户端的未授权请求。

```
 2 D chain=input action=jump jump-target=hs-input hotspot=from-client

```

所有从客户端发往路由器本身的内容都会进入另一个名为 **hs-input** 的链。

```
 3 I chain=hs-input action=jump jump-target=pre-hs-input

```

在处理 [预定义] 动态规则之前，数据包会进入由管理员控制的 **pre-hs-input** 链，该链默认情况下为空，因此该跳转规则处于无效状态。

```
 4 D chain=hs-input action=accept dst-port=64872 protocol=udp 
 5 D chain=hs-input action=accept dst-port=64872-64875 protocol=tcp 

```

允许客户端访问本地认证和代理服务（如前所述）。

```
 6 D chain=hs-input action=jump jump-target=hs-unauth hotspot=!auth

```

来自未授权客户端发往路由器本身的所有其他流量都将按照与经过路由器的流量相同的方式处理。

```
 7 D chain=hs-unauth action=return protocol=icmp
 8 D ;;; www.mikrotik.com
     chain=hs-unauth action=return dst-address=66.228.113.26 dst-port=80 protocol=tcp

```

与 NAT 表中只添加了与 TCP 协议相关的 Walled Garden 条目不同，在数据包过滤中，**hs-unauth** 链会添加你在 `/ip/hotspot/walled-garden/ip` 菜单中设置的所有内容。这就是为什么尽管你在 NAT 表中只看到一个条目，但这里有两条规则。

```
 9 D chain=hs-unauth action=reject reject-with=tcp-reset protocol=tcp
10 D chain=hs-unauth action=reject reject-with=icmp-net-prohibited

```

所有未被 Walled Garden 加入白名单的内容都将被拒绝。请注意，拒绝 TCP 连接时使用了 TCP Reset。

```
11 D chain=hs-unauth-to action=return protocol=icmp
12 D ;;; www.mikrotik.com
     chain=hs-unauth-to action=return src-address=66.228.113.26 src-port=80 protocol=tcp

```

对于发往客户端的数据包（链 **hs-unauth-to**），也会执行与规则 #7 和 #8 相同的操作。

```
13 D chain=hs-unauth-to action=reject reject-with=icmp-host-prohibited

```

使用 ICMP 拒绝消息拒绝所有发往客户端的数据包。
