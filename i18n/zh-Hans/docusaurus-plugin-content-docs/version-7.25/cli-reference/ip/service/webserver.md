---
sidebar_key: "cli-reference/ip/service/webserver"
sidebar_position: 1
title: "webserver"
sidebar_label: 'webserver'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/service/webserver
captured_at: '2026-11-01T21:24:25+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/service/webserver {#ipservicewebserver}
**类型：** 设置目录

用于分别针对 HTTP（即 `-plain` 相关设置，由 `www` 服务提供）和 HTTPS（即 `-secure` 相关设置，由 `www-ssl` 服务提供）开启或关闭路由器 Web 服务器的各个部分。所有部分默认均为启用状态。被禁用的部分会返回 `403 Forbidden`，而其他部分仍可正常工作，因此你可以例如在 HTTPS 上提供 REST API 而不启用 WebFig。Web 服务器的端口、允许的地址和证书在 [`/ip/service`](./index.md) 中设置。有关 REST API 的信息，请参阅 [REST API](../../../developer-guides/rest-api.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="index-plain" typ="bool">通过 HTTP 提供首页（登录页）以及诸如 `/favicon.png` 之类的静态文件。仅当 `webfig-plain` 和 `graphs-plain` 也均为 `no` 时才会生效；此时首页、静态文件和未知路径会通过 HTTP 返回 403，而 REST API 仍可正常工作。默认值：yes。</ArgTableRow>
<ArgTableRow arg="webfig-plain" typ="bool">通过 HTTP 在 `/webfig/` 提供 WebFig。默认值：yes。</ArgTableRow>
<ArgTableRow arg="graphs-plain" typ="bool">通过 HTTP 在 `/graphs/` 提供图表。默认值：yes。</ArgTableRow>
<ArgTableRow arg="rest-plain" typ="bool">通过 HTTP 在 `/rest` 提供 [REST API](../../../developer-guides/rest-api.md)。设为 `no` 时，通过 HTTP 的 REST 请求会返回 403，而 HTTPS 不受影响。默认值：yes。</ArgTableRow>
<ArgTableRow arg="crl-plain" typ="bool">通过 HTTP 在 `/crl/` 提供证书吊销列表下载。默认值：yes。</ArgTableRow>
<ArgTableRow arg="scep-plain" typ="bool">通过 HTTP 在 `/scep/` 提供 SCEP 服务器。默认值：yes。</ArgTableRow>
<ArgTableRow arg="acme-plain" typ="bool">通过 HTTP 在 `/.well-known/acme-challenge/` 响应 ACME HTTP-01 质询请求。默认值：yes。</ArgTableRow>
<ArgTableRow arg="index-secure" typ="bool">通过 HTTPS 提供首页（登录页）以及诸如 `/favicon.png` 之类的静态文件。仅当 `webfig-secure` 和 `graphs-secure` 也均为 `no` 时才会生效；此时首页和静态文件会通过 HTTPS 返回 403，而 REST API 仍可正常工作。默认值：yes。</ArgTableRow>
<ArgTableRow arg="webfig-secure" typ="bool">通过 HTTPS 在 `/webfig/` 提供 WebFig。默认值：yes。</ArgTableRow>
<ArgTableRow arg="graphs-secure" typ="bool">通过 HTTPS 在 `/graphs/` 提供图表。默认值：yes。</ArgTableRow>
<ArgTableRow arg="rest-secure" typ="bool">通过 HTTPS 在 `/rest` 提供 [REST API](../../../developer-guides/rest-api.md)。设为 `no` 时，通过 HTTPS 的 REST 请求会返回 403，而 HTTP 不受影响。默认值：yes。</ArgTableRow>
</ArgTable>
