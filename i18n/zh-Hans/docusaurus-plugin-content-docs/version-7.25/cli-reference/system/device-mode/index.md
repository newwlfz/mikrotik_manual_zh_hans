---
sidebar_key: "cli-reference/system/device-mode/index"
sidebar_position: 1
title: "device-mode"
sidebar_label: 'device-mode'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/device-mode
captured_at: '2026-11-01T21:25:29+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/device-mode {#systemdevice-mode}
**类型：** 设置目录

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mode" typ="enum">当前设备模式：basic、home、advanced 或 ros。</ArgTableRow>
<ArgTableRow arg="allowed-versions" typ="string">被视为安全的 RouterOS 版本列表。用于防止降级到易受攻击的版本。</ArgTableRow>
<ArgTableRow arg="flagged" typ="bool">设备是否处于 flagged 状态。检测到可疑配置时设置为 yes。</ArgTableRow>
<ArgTableRow arg="flagging-enabled" typ="bool">是否启用针对可疑代码的配置分析。默认值：yes。</ArgTableRow>
<ArgTableRow arg="scheduler" typ="bool">是否允许使用 `/system/scheduler`。</ArgTableRow>
<ArgTableRow arg="socks" typ="bool">是否允许使用 `/ip/socks`。</ArgTableRow>
<ArgTableRow arg="fetch" typ="bool">是否允许使用 `/tool/fetch`。</ArgTableRow>
<ArgTableRow arg="pptp" typ="bool">是否允许使用 PPTP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="l2tp" typ="bool">是否允许使用 L2TP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="bandwidth-test" typ="bool">是否允许使用 `/tool/bandwidth-test` 和 `/tool/bandwidth-server`。</ArgTableRow>
<ArgTableRow arg="traffic-gen" typ="bool">是否允许使用 `/tool/traffic-generator`、`/tool/flood-ping` 和 `/tool/ping-speed`。</ArgTableRow>
<ArgTableRow arg="sniffer" typ="bool">是否允许使用 `/tool/sniffer`。</ArgTableRow>
<ArgTableRow arg="ipsec" typ="bool">是否允许使用 `/ip/ipsec`。</ArgTableRow>
<ArgTableRow arg="romon" typ="bool">是否允许使用 `/tool/romon`。</ArgTableRow>
<ArgTableRow arg="proxy" typ="bool">是否允许使用 `/ip/proxy`。</ArgTableRow>
<ArgTableRow arg="hotspot" typ="bool">是否允许使用 `/ip/hotspot`。</ArgTableRow>
<ArgTableRow arg="smb" typ="bool">是否允许使用 `/ip/smb`。</ArgTableRow>
<ArgTableRow arg="email" typ="bool">是否允许使用 `/tool/e-mail`。</ArgTableRow>
<ArgTableRow arg="zerotier" typ="bool">是否允许使用 `/zerotier`。</ArgTableRow>
<ArgTableRow arg="container" typ="bool">是否允许使用容器功能。</ArgTableRow>
<ArgTableRow arg="install-any-version" typ="bool">是否允许降级到 allowed-versions 列表之外的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="partitions" typ="bool">是否允许更改分区数量。</ArgTableRow>
<ArgTableRow arg="routerboard" typ="bool">是否允许使用 `/system/routerboard/settings`（auto-upgrade 除外），以及双启动设备上的 SwOS/RouterOS 切换。</ArgTableRow>
<ArgTableRow arg="attempt-count" typ="num">失败的 device-mode 更改尝试次数。</ArgTableRow>
</ArgTable>
