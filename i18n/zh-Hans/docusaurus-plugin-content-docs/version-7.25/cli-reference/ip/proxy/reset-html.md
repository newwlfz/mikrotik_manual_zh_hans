---
sidebar_key: "cli-reference/ip/proxy/reset-html"
sidebar_position: 11
title: "reset-html"
sidebar_label: 'reset-html'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/reset-html
captured_at: '2026-11-01T21:24:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/reset-html {#ipproxyreset-html}
**类型：** 命令

将代理错误页面的默认模板写入路由器上的文件 `webproxy/error.html`，并替换已被修改的副本。代理会根据此文件构建其错误页面（例如由 [`/ip/proxy/access`](./access/index.md) 拒绝的请求所对应的页面），因此你可以编辑该文件；代理会立即使用修改后的文件。若该文件不存在，代理则使用内置构建的同一页面。该模板使用变量 `$(status)`、`$(url)`、`$(error)`、`$(admin)`（即 `cache-administrator` 设置）和 `$(signature)`，以及块 `$(if error)` ... `$(endif)`。有关概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。
