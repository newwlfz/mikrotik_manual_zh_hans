---
sidebar_key: "cli-reference/tr069-client"
title: "tr069-client"
sidebar_label: 'tr069-client'
source: https://manual.mikrotik.com/docs/cli-reference/tr069-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tr069-client {#tr069-client}
**软件包：** tr069-client
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="enum (yes | no)">启用或禁用 CWMP 协议。</ArgTableRow>
<ArgTableRow arg="acs-url" typ="string">自动配置服务器 (ACS) 的 URL。如果通过 HTTPS 访问 ACS，则必须在客户端证书存储中导入 Root CA，以验证 ACS 服务器证书。</ArgTableRow>
<ArgTableRow arg="username" typ="string">CPE 用于向 ACS 进行身份验证的 HTTP 认证用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">CPE 用于向 ACS 进行身份验证的 HTTP 认证密码。</ArgTableRow>
<ArgTableRow arg="periodic-inform-enabled" typ="bool">启用或禁用 CPE 周期性发起会话。每次成功会话后，定时器启动。当按周期间隔启动会话时，Inform RPC 包含一个 "2 PERIODIC" 事件。映射到 `Device.ManagementServer.PeriodicInformEnable`。</ArgTableRow>
<ArgTableRow arg="periodic-inform-interval" typ="time">周期性 Inform 的定时器间隔。映射到 `Device.ManagementServer.PeriodicInformInterval`。</ArgTableRow>
<ArgTableRow arg="connection-request-username" typ="string">ACS 在连接请求中用于向 CPE 进行身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="connection-request-password" typ="string">ACS 在连接请求中用于向 CPE 进行身份验证的密码。</ArgTableRow>
<ArgTableRow arg="connection-request-port" typ="num">CPE 监听来自 ACS 的连接请求所用的端口。</ArgTableRow>
<ArgTableRow arg="provisioning-code" typ="string">设备的配置代码。</ArgTableRow>
<ArgTableRow arg="client-certificate" typ="enum (none)">证书存储中的证书，可供 ACS 用于额外身份验证。</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="enum (yes | no)">是否检查 ACS 服务器证书。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (disabled | initializing | error | waiting-url | running)">CWMP 客户端的信息性状态。Disabled 表示协议已禁用，waiting-url 表示协议已启用但未配置 ACS URL，running 表示 CWMP 已正确配置，并会在事件发生时与 ACS 通信。</ArgTableRow>
<ArgTableRow arg="last-session-error" typ="string">用户友好的错误描述，说明上一个会话为何未能成功完成。</ArgTableRow>
<ArgTableRow arg="retry-count" typ="num">连续未成功会话数。如果大于 0，last-session-error 应指出该错误。在会话成功、协议被禁用或重启后重置为 0。</ArgTableRow>
</ArgTable>
