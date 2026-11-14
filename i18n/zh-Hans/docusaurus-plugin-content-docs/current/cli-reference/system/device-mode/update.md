---
sidebar_key: "cli-reference/system/device-mode/update"
sidebar_position: 1
title: "update"
sidebar_label: 'update'
source: https://manual.mikrotik.com/docs/cli-reference/system/device-mode/update
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/device-mode/update {#systemdevice-modeupdate}
**类型：** 命令

启动设备模式配置更改。该更改在按下按钮或电源循环后生效并重启设备；如果在 `activation-timeout` 内未确认，则会取消。常规重启也会取消该更改。不带参数运行 `update` 会取消待处理的更新；当另一个更新待处理时，带参数运行 `update` 会取消该待处理更新，且自身不会应用。请参阅[设备模式](../../../system-information-and-utilities/device-mode.md)指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="mode" typ="enum">
要应用的设备模式。指定 `mode` 会替换整个 device-mode 配置，但同一条命令中给出的其他参数除外；未指定的功能将采用新模式的默认值。
- `advanced` - 以前称为 `enterprise`。
- `basic` - 适用于大多数其他设备。
- `home` - 适用于家用路由器。
- `rose` - 适用于 RDS 及类似具有大量磁盘使用的设备。
</ArgTableRow>
<ArgTableRow arg="flagged" typ="bool">设置为 `no` 可清除标记状态，在此之前请检查配置是否存在未经授权的更改。需要物理确认。</ArgTableRow>
<ArgTableRow arg="flagging-enabled" typ="bool">启用或禁用对配置中未经授权访问迹象的分析。默认值：yes.</ArgTableRow>
<ArgTableRow arg="scheduler" typ="bool">允许或阻止 `/system/scheduler`。</ArgTableRow>
<ArgTableRow arg="socks" typ="bool">允许或阻止 `/ip/socks`。</ArgTableRow>
<ArgTableRow arg="fetch" typ="bool">允许或阻止 `/tool/fetch`。</ArgTableRow>
<ArgTableRow arg="pptp" typ="bool">允许或阻止 PPTP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="l2tp" typ="bool">允许或阻止 L2TP 客户端和服务器接口。</ArgTableRow>
<ArgTableRow arg="bandwidth-test" typ="bool">允许或阻止 `/tool/bandwidth-test`、`/tool/bandwidth-server` 和 `/tool/speed-test`。</ArgTableRow>
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
<ArgTableRow arg="activation-timeout" typ="time">在更新被取消之前，等待物理确认（按下按钮或断电重启）的时长。当更新在三次不成功尝试后被拒绝时，还会设置 `attempt-count` 重置窗口的长度。范围：00:00:10 到 1d00:00:00。默认值：5m.</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="update" typ="string">待处理更新的状态以及剩余确认时间；无待处理更新时为空。</ArgTableRow>
</ArgTable>
