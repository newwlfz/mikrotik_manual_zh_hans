---
title: "webserver"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/service/webserver
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/service"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/service/webserver 
**类型：** 设置目录

分别开启或关闭路由器 Web 服务器的各个部分，HTTP（`-plain` 设置，由 `www` 服务提供）和 HTTPS（`-secure` 设置，由 `www-ssl` 提供）分开控制。所有部分默认启用。禁用的部分会返回 `403 Forbidden`，其他部分继续工作，因此例如可以在不启用 WebFig 的情况下通过 HTTPS 提供 REST API。Web 服务器的端口、允许的地址和证书在 [`/ip/service`](/docs/cli-reference/ip/service) 中设置。有关 REST API，请参阅 [REST API](/docs/developer-guides/rest-api)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="index-plain" typ="bool">Home page (login page) and static files such as `/favicon.png` over HTTP. Takes effect only when `webfig-plain` and `graphs-plain` are also `no`; then the home page, static files and unknown paths answer 403 over HTTP, and the REST API keeps working. Default: yes.</ArgTableRow>
<ArgTableRow arg="webfig-plain" typ="bool">WebFig at `/webfig/` over HTTP. Default: yes.</ArgTableRow>
<ArgTableRow arg="graphs-plain" typ="bool">Graphs at `/graphs/` over HTTP. Default: yes.</ArgTableRow>
<ArgTableRow arg="rest-plain" typ="bool">[REST API](/docs/developer-guides/rest-api) at `/rest` over HTTP. With `no`, REST requests over HTTP answer 403, and HTTPS is not affected. Default: yes.</ArgTableRow>
<ArgTableRow arg="crl-plain" typ="bool">Certificate revocation list downloads at `/crl/` over HTTP. Default: yes.</ArgTableRow>
<ArgTableRow arg="scep-plain" typ="bool">SCEP server at `/scep/` over HTTP. Default: yes.</ArgTableRow>
<ArgTableRow arg="acme-plain" typ="bool">Answers to ACME HTTP-01 challenge requests at `/.well-known/acme-challenge/` over HTTP. Default: yes.</ArgTableRow>
<ArgTableRow arg="index-secure" typ="bool">Home page (login page) and static files such as `/favicon.png` over HTTPS. Takes effect only when `webfig-secure` and `graphs-secure` are also `no`; then the home page and static files answer 403 over HTTPS, and the REST API keeps working. Default: yes.</ArgTableRow>
<ArgTableRow arg="webfig-secure" typ="bool">WebFig at `/webfig/` over HTTPS. Default: yes.</ArgTableRow>
<ArgTableRow arg="graphs-secure" typ="bool">Graphs at `/graphs/` over HTTPS. Default: yes.</ArgTableRow>
<ArgTableRow arg="rest-secure" typ="bool">[REST API](/docs/developer-guides/rest-api) at `/rest` over HTTPS. With `no`, REST requests over HTTPS answer 403, and HTTP is not affected. Default: yes.</ArgTableRow>
</ArgTable>
