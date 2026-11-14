---
sidebar_key: "cli-reference/system/package/update/index"
sidebar_position: 4
title: "update"
sidebar_label: "update"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package/update
captured_at: '2026-11-01T21:29:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/update {#systempackageupdate}
**类型：** 设置目录

管理 `check-for-updates` 通道并执行 RouterOS 升级。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="channel" typ="enum (long-term | stable | testing | development)">检查新版本时使用的升级[通道](#channel)。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (https | http)">连接 MikroTik 下载服务器所用的协议。仅当网络阻止 HTTPS 时才使用 `http`。建议使用 HTTPS。</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="enum (no | yes | yes-without-crl)">是否以及如何验证服务器 SSL 证书。请始终使用 `yes` 以确保连接安全。</ArgTableRow>
<ArgTableRow arg="ip-version" typ="enum (auto | ipv4 | ipv6)">连接 MikroTik 下载服务器时首选的 IP 版本。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="installed-version" typ="string">当前已安装的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="latest-version" typ="string">所选[通道](#channel)中可用的最新 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="status" typ="string">更新过程的当前状态（例如 `New version is available`）。</ArgTableRow>
</ArgTable>
