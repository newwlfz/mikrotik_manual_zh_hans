---
title: "reset-html"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/reset-html
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/reset-html 
**类型：** 命令

将代理错误页的默认模板写入路由器上的文件 `webproxy/error.html`，并替换已修改的副本。代理会根据该文件生成错误页，例如由 [`/ip/proxy/access`](/docs/cli-reference/ip/proxy/access) 拒绝请求时的页面，因此可以编辑该文件；代理会立即使用修改后的文件。如果没有该文件，代理会使用内置的同款页面。模板使用变量 `$(status)`、`$(url)`、`$(error)`、`$(admin)`（`cache-administrator` 设置）和 `$(signature)`，以及块 `$(if error)` ... `$(endif)`。有关概述，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。
