---
sidebar_key: "cli-reference/system/device-mode/update"
sidebar_position: 1
title: "update"
sidebar_label: 'update'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/device-mode/update
captured_at: '2026-11-01T21:25:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/device-mode/update {#systemdevice-modeupdate}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="mode" typ="enum">要应用的设备模式：basic、home、advanced 或 ros。</ArgTableRow>
<ArgTableRow arg="flagged" typ="bool">设为 no 以退出 flagged 状态。需要物理确认。</ArgTableRow>
<ArgTableRow arg="flagging-enabled" typ="bool">启用或禁用对可疑代码的配置分析。默认值：yes。</ArgTableRow>
<ArgTableRow arg="scheduler" typ="bool">允许或阻止 `/system/scheduler`。</ArgTableRow>
<ArgTableRow arg="socks" typ="bool">允许或阻止 `/ip/socks`。</ArgTableRow>
<ArgTableRow arg="fetch" typ="bool">允许或阻止 `/tool/fetch`。</ArgTableRow>
<ArgTableRow arg="pptp" typ="bool">允许或阻止 PPTP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="l2tp" typ="bool">允许或阻止 L2TP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="bandwidth-test" typ="bool">允许或阻止 `/tool/bandwidth-test` 和 `/tool/bandwidth-server`。</ArgTableRow>
<ArgTableRow arg="traffic-gen" typ="bool">允许或阻止 `/tool/traffic-generator`、`/tool/flood-ping` 和 `/tool/ping-speed`。</ArgTableRow>
<ArgTableRow arg="sniffer" typ="bool">允许或阻止 `/tool/sniffer`。</ArgTableRow>
<ArgTableRow arg="ipsec" typ="bool">允许或阻止 `/ip/ipsec`。</ArgTableRow>
<ArgTableRow arg="romon" typ="bool">允许或阻止 `/tool/romon`。</ArgTableRow>
<ArgTableRow arg="proxy" typ="bool">允许或阻止 `/ip/proxy`。</ArgTableRow>
<ArgTableRow arg="hotspot" typ="bool">允许或阻止 `/ip/hotspot`。</ArgTableRow>
<ArgTableRow arg="smb" typ="bool">允许或阻止 `/ip/smb`。</ArgTableRow>
<ArgTableRow arg="email" typ="bool">允许或阻止 `/tool/e-mail`。</ArgTableRow>
<ArgTableRow arg="zerotier" typ="bool">允许或阻止 `/zerotier`。</ArgTableRow>
<ArgTableRow arg="container" typ="bool">允许或阻止容器功能。</ArgTableRow>
<ArgTableRow arg="install-any-version" typ="bool">允许或阻止降级到 allowed-versions 列表之外的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="partitions" typ="bool">允许或阻止更改分区数量。</ArgTableRow>
<ArgTableRow arg="routerboard" typ="bool">允许或阻止 `/system/routerboard/settings`（auto-upgrade 除外）以及双启动设备上的 SwOS/RouterOS 切换。</ArgTableRow>
<ArgTableRow arg="activation-timeout" typ="time">取消更新前等待物理确认（按下重置按钮或断电重启）的时间。范围：00:00:10 至 1d00:00:00。默认值：5m。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="update" typ="string">待处理 device-mode 更新的状态消息。提示用户通过关机或按下按钮进行确认。</ArgTableRow>
</ArgTable>
