---
sidebar_key: "cli-reference/cmr/device"
title: "device"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device {#cmrdevice}
**软件包:** cmr
**类型:** 目录

此 CMR 服务器管理的设备。设备一旦连接到服务器就会出现在列表中，并在配对获得批准之前带有 **P** 标记。服务器本身显示为带有 **L** 标记的设备。使用此菜单中的命令对设备群进行操作，例如 `run-script`、`upgrade`、`reboot` 或 `pair`。有关设备如何连接和配对，请参阅 [CMR](../../management-tools/cmr.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="P" typ="pending">配对待处理。</ArgTableRow>
<ArgTableRow arg="p" typ="remote-pending">控制器请求配对。</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">设备处于非活动状态。</ArgTableRow>
<ArgTableRow arg="S" typ="stale">无连接（陈旧）。</ArgTableRow>
<ArgTableRow arg="L" typ="controller">CMR 服务器本身（自身客户端）。</ArgTableRow>
<ArgTableRow arg="C" typ="connected">设备已连接。</ArgTableRow>
<ArgTableRow arg="U" typ="upgrade-available">设备的升级通道提供的版本与已安装版本不同。提供的版本也可能早于已安装版本。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ids" typ="object { ids: super { his-id: string
, [our-id] [ /string]
 }
 }">受管设备的身份标识（his-id / our-id）。</ArgTableRow>
<ArgTableRow arg="pairing-requirement" typ="enum (none | password | confirm)">应用于此设备的配对要求，覆盖服务器默认值：`none`、`password` 或 `confirm`。</ArgTableRow>
<ArgTableRow arg="labels" typ="multi { array-id, label: enum
 }" unset="1">分配给设备的用户标签（分组/过滤）。</ArgTableRow>
<ArgTableRow arg="port-labels" typ="object { port-and-labels: super { port: string
, [labels] :multi { array-id, label: string
 }
 }
 }" unset="1">每个端口的标签。为标签加引号，例如 `port-labels=ether1:"uplink"`。`/cmr/vlan` 规则可根据这些标签选择端口。</ArgTableRow>
<ArgTableRow arg="identity" typ="string">设备的系统标识（可编辑）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="enum">此设备连接到的管理对端。</ArgTableRow>
<ArgTableRow arg="board" typ="string">板卡名称。</ArgTableRow>
<ArgTableRow arg="version" typ="string">设备的 RouterOS 版本。</ArgTableRow>
<ArgTableRow arg="minimum-version" typ="string">最低支持版本。</ArgTableRow>
<ArgTableRow arg="allowed-versions" typ="string">安全（safepkg）升级指示器。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">当前连接地址。</ArgTableRow>
<ArgTableRow arg="auto-labels" typ="multi { array-id, label: string
 }" unset="1">自动分配的标签。</ArgTableRow>
<ArgTableRow arg="packages" typ="multi { array-id, label: string
 }" unset="1">已安装的软件包。</ArgTableRow>
<ArgTableRow arg="state" typ="string">设备状态。</ArgTableRow>
<ArgTableRow arg="upgrade-rule" typ="enum">覆盖此设备的升级规则。在 [`/cmr/upgrade`](/docs/cli-reference/upgrade) 规则列表中，第一条覆盖该设备的规则会认领它，因此放在顶部的 `labels=all` 规则会覆盖所有设备。</ArgTableRow>
<ArgTableRow arg="channel" typ="alt">当前升级通道/版本。</ArgTableRow>
<ArgTableRow arg="available-version" typ="string">可用的最新升级。</ArgTableRow>
<ArgTableRow arg="connected-time" typ="time" unset="1">设备已连接的时间。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time" unset="1">设备运行时间。</ArgTableRow>
<ArgTableRow arg="disconnected-since" typ="date" unset="1">自设备断开连接以来的时间。</ArgTableRow>
<ArgTableRow arg="alerts" typ="super { on: num
, [all] /num
, [critical]  num
, [high] /num
, [medium] /num
, [low] /num
 }">按严重级别统计的已启用/总告警计数。</ArgTableRow>
<ArgTableRow arg="serial" typ="string">出厂序列号。</ArgTableRow>
</ArgTable>
