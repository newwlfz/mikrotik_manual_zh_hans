---
sidebar_key: "cli-reference/system/device-mode"
title: "device-mode"
sidebar_label: 'device-mode'
source: https://manual.mikrotik.com/docs/cli-reference/system/device-mode
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/device-mode {#systemdevice-mode}
**类型：** 设置目录

当前 device-mode 设置。模式和各项功能开关在启动时生效，并且只能通过 [`update`](./update.md) 更改，更改需要物理确认。请参阅[设备模式](../../../system-information-and-utilities/device-mode.md)指南。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mode" typ="enum">
当前设备模式。
- `advanced` - 适用于 CCR 和 1100 系列设备；以前称为 `enterprise`。
- `basic` - 适用于大多数其他设备。
- `home` - 适用于家用路由器。
- `rose` - 适用于 RDS 及类似具有大量磁盘使用的设备。
</ArgTableRow>
<ArgTableRow arg="allowed-versions" typ="string">以逗号分隔的被视为安全的 RouterOS 版本列表，用于阻止降级到存在漏洞的版本（例如 `7.13+,6.49.8+`）。升级到附带更新列表的版本会更新该列表；降级则不会。当启用 `install-any-version` 时，此项被忽略。</ArgTableRow>
<ArgTableRow arg="flagged" typ="bool">设备是否处于标记状态：启动配置分析发现了未经授权访问的迹象，并禁用了可疑配置。通过 `update flagged=no` 进行审查并清除。</ArgTableRow>
<ArgTableRow arg="flagging-enabled" typ="bool">是否在启动时运行针对未经授权访问迹象的配置分析。默认值：yes。</ArgTableRow>
<ArgTableRow arg="scheduler" typ="bool">是否允许 `/system/scheduler` 执行操作。</ArgTableRow>
<ArgTableRow arg="socks" typ="bool">是否允许 `/ip/socks` 中的 SOCKS 代理。</ArgTableRow>
<ArgTableRow arg="fetch" typ="bool">是否允许使用 `/tool/fetch`。</ArgTableRow>
<ArgTableRow arg="pptp" typ="bool">是否允许 `/interface/pptp-client` 和 `/interface/pptp-server`。</ArgTableRow>
<ArgTableRow arg="l2tp" typ="bool">是否允许 `/interface/l2tp-client` 和 `/interface/l2tp-server`。</ArgTableRow>
<ArgTableRow arg="bandwidth-test" typ="bool">是否允许使用 `/tool/bandwidth-test`、`/tool/bandwidth-server` 和 `/tool/speed-test`。</ArgTableRow>
<ArgTableRow arg="traffic-gen" typ="bool">是否允许使用 `/tool/traffic-generator`、`/tool/flood-ping` 和 `/tool/ping-speed`。</ArgTableRow>
<ArgTableRow arg="sniffer" typ="bool">是否允许使用 `/tool/sniffer`。</ArgTableRow>
<ArgTableRow arg="ipsec" typ="bool">是否允许使用 `/ip/ipsec`。</ArgTableRow>
<ArgTableRow arg="romon" typ="bool">是否允许使用 `/tool/romon`。</ArgTableRow>
<ArgTableRow arg="proxy" typ="bool">是否允许使用 `/ip/proxy` 中的 Web 代理。</ArgTableRow>
<ArgTableRow arg="hotspot" typ="bool">是否允许使用 `/ip/hotspot`。</ArgTableRow>
<ArgTableRow arg="smb" typ="bool">是否允许使用 `/ip/smb`。</ArgTableRow>
<ArgTableRow arg="email" typ="bool">是否允许使用 `/tool/e-mail`。</ArgTableRow>
<ArgTableRow arg="zerotier" typ="bool">是否允许使用 `/zerotier`。</ArgTableRow>
<ArgTableRow arg="container" typ="bool">是否允许使用容器功能（`/container`）。</ArgTableRow>
<ArgTableRow arg="install-any-version" typ="bool">是否允许安装 `allowed-versions` 列表之外的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="partitions" typ="bool">是否允许更改分区数量（`/partitions`）。</ArgTableRow>
<ArgTableRow arg="routerboard" typ="bool">是否允许更改 `/system/routerboard/settings` 选项（自动升级除外）以及在双启动设备上进行 SwOS/RouterOS 切换。</ArgTableRow>
<ArgTableRow arg="attempt-count" typ="num">自上次重置以来设备模式更新失败的尝试次数；取消待处理更新的请求不计入其中。达到三次后，`update` 将被拒绝，并会开启一个重置窗口，其时长由最后一次 `activation-timeout` 设定；在该窗口内按下按钮或断电重启会重置计数器。已确认的更新也会重置计数器。默认值：0。</ArgTableRow>
</ArgTable>
