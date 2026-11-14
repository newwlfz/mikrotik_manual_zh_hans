---
sidebar_key: "cli-reference/system/resource"
title: "resource"
sidebar_label: 'resource'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource {#systemresource}
**类型：** 设置目录
路由器的整体资源使用情况和身份信息：uptime、内存、磁盘、版本、主板。请参阅[资源](../../../diagnostics-monitoring-and-troubleshooting/resource.md)指南。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="uptime" typ="time">自启动以来经过的时间</ArgTableRow>
<ArgTableRow arg="version" typ="string">已安装的 RouterOS 版本号</ArgTableRow>
<ArgTableRow arg="build-time" typ="string">已安装的 RouterOS 版本构建时间</ArgTableRow>
<ArgTableRow arg="minimum-version" typ="string">该板卡允许降级到的最低 RouterOS 版本（原为 factory-software）</ArgTableRow>
<ArgTableRow arg="free-memory" typ="num">未使用的 RAM 容量</ArgTableRow>
<ArgTableRow arg="total-memory" typ="num">已安装的 RAM 容量</ArgTableRow>
<ArgTableRow arg="cpu" typ="string">板卡上的 CPU 型号</ArgTableRow>
<ArgTableRow arg="cpu-count" typ="num">系统上存在的 CPU 数量；每个核心都是一个独立的 CPU，Intel HT 也计为一个 CPU</ArgTableRow>
<ArgTableRow arg="cpu-frequency" typ="num">当前 CPU 频率</ArgTableRow>
<ArgTableRow arg="cpu-load" typ="num">已使用 CPU 资源的百分比，为所有 CPU 的合计值；每核心的值位于 [`/system/resource/cpu`](./cpu.md)</ArgTableRow>
<ArgTableRow arg="free-hdd-space" typ="num">硬盘或 NAND 上的可用空间</ArgTableRow>
<ArgTableRow arg="total-hdd-space" typ="num">硬盘或 NAND 的容量</ArgTableRow>
<ArgTableRow arg="write-sect-since-reboot" typ="num">自路由器上次重启以来对驱动器/NAND 的扇区写入次数</ArgTableRow>
<ArgTableRow arg="write-sect-total" typ="num">扇区写入总次数</ArgTableRow>
<ArgTableRow arg="bad-blocks" typ="num">NAND 上坏块的百分比</ArgTableRow>
<ArgTableRow arg="architecture-name" typ="string">此版本的 CPU 架构（arm、arm64、x86、tile ...）</ArgTableRow>
<ArgTableRow arg="board-name" typ="string">RouterBOARD 型号名称</ArgTableRow>
<ArgTableRow arg="platform" typ="string">平台名称</ArgTableRow>
</ArgTable>
