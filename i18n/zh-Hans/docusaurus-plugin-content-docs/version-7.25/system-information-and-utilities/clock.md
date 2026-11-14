---
sidebar_key: "system-information-and-utilities/clock"
sidebar_position: 1
title: "时钟"
sidebar_label: "时钟"
description: "RouterOS 系统时钟：时间源（NTP 客户端、MikroTik 云服务、GPS）、时区选择与自动检测、手动 GMT 偏移与夏令时规则，以及启动时的时钟行为。"
tags:
  - 'time-zone'
  - 'clock'
  - 'ntp'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/clock
captured_at: '2026-11-04T11:21:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 系统时钟为日志条目、[调度器](./scheduler.md)、文件创建时间、证书有效性检查以及其他依赖时间的功能提供本地日期和时间。RouterOS 以 UTC 保存时间，并在显示时间时应用所配置的 GMT 偏移，包括夏令时（DST）。

在具有互联网访问的路由器上无需任何配置：时区会被自动检测，并且 MikroTik 云服务会在路由器启动时设置时钟。为了保持计时准确，请启用 [NTP 客户端](./ntp.md)。

:::note
路由器内部的 CPU 时钟并非用于精确计时操作的可靠时间源，因为其频率会随电源管理、温度条件以及硬件差异而变化，即使是相同型号之间也是如此。这种变化不会影响路由器转发流量或运行其服务的方式。为了保持计时准确，请使用基于网络的时间同步，例如 [NTP](./ntp.md)。
:::

## 检查与故障排除 {#check-and-troubleshoot}

当前的时钟状态：

```ros
[admin@MikroTik] > /system/clock/print
                  time: 09:43:19
                  date: 2026-09-29
  time-zone-autodetect: yes
        time-zone-name: Europe/Riga
            gmt-offset: +03:00
            dst-active: yes
```

`gmt-offset` 是当前正在使用的偏移，已包含夏令时。`dst-active` 显示该时区的夏令时时段是否生效。

时钟错误的常见原因：

- 日期为 **1970-01-02**（在 GMT 以西的时区则为 1970-01-01）：路由器启动时没有已保存的时间，且没有任何时间源设置时钟。请启用 NTP 客户端并检查它能否访问其服务器，检查路由器能否访问 MikroTik 云（在 [`/ip/cloud`](../network-management/cloud/index.md) 中设置 `update-time=yes`；当 NTP 客户端启用时，云不会设置时钟），或者手动设置时间。
- 时间正确但时区错误：自动检测使用了路由器公网 IP 地址的位置，而互联网服务提供商有时会将该地址注册在另一个地区。请改为手动设置时区，并关闭检测。
- 重启后时间相差一小时：在 `time-zone-autodetect` 开启时手动设置的 `time-zone-name` 会在启动后不久被检测到的时区替换。自行设置时区时请关闭检测，如[设置时区](#set-the-time-zone)中所述。
- 设置日期后时间相差一小时：在跨越夏令时变更时于同一条命令中设置 `date` 和 `time` 会使用旧的偏移。请单独再次设置时间，例如 `/system/clock/set time=10:00:00`。
- 手动时区在下一年停止切换到夏令时：手动 DST 时段不会重复。请更新 `dst-start` 和 `dst-end`，或使用命名时区。

## 设置时间 {#set-the-time}

路由器可以从多个来源获取时间：

- [NTP 客户端](./ntp.md)，它会精确地同步时钟并保持其准确性。当时钟精度很重要时请使用此项。
- [MikroTik 云服务](../network-management/cloud/index.md)，当 NTP 客户端被禁用且在 `/ip/cloud` 中启用了 `update-time` 时，它会在启动时设置一次时钟。云时间是大致的。
- 在具有 GPS 硬件的设备上，当 `/system/gps` 中启用了 `set-system-time` 时，可使用 [GPS](../mobile-networking/gps/index.md)。
- 手动设置：

```ros
/system/clock/set date=2026-10-01
/system/clock/set time=10:00:00
```

请先设置日期，并在单独的命令中设置时间。当你在同一条命令中设置 `date` 和 `time` 时，时间会按照变更之前生效的 GMT 偏移来解释，因此在跨越夏令时变更时，时钟最终会偏移一个 DST 差值。

本地时间不属于导出的配置内容：`/export` 只包含时区设置，从不包含当前的日期和时间。

## 设置时区 {#set-the-time-zone}

在可能的情况下请选择命名时区：

```ros
/system/clock/set time-zone-autodetect=no time-zone-name=Europe/Riga
```

在 WinBox 中，打开 **System > Clock** 并使用 **Time** 选项卡：

1. 清除 **Time Zone Autodetect**，然后选择 **Time Zone Name**，例如 `Europe/Riga`。选择 **OK** 保存选择。如果你希望由云服务来选择时区，则保留自动检测选中状态。
2. 查看只读的 **GMT Offset** 和 **DST Active** 字段，以了解生效的偏移和夏令时状态。

![WinBox Clock Time tab with time zone and clock status settings](/img/778b56ee7b94a12c.webp)

**Time** 和 **Date** 字段用于手动更改时钟；请使用 NTP 客户端进行持续同步。

RouterOS 包含 IANA 时区数据库中的大多数时区，名称相同。名称区分大小写，例如 `Europe/Riga`：在终端中于 `time-zone-name=` 之后按 <kbd>Tab</kbd> 可列出它们。拼写错误的名称会失败并提示 `input does not match any value of time-zone-name`。该时区的夏令时规则会自动应用，而没有夏令时的时区（例如 `Asia/Dubai`）全年保持一个偏移。由于路由器上的本地时间用于打时间戳和依赖时间的配置，而非历史日期计算，因此关于过去年份的时区信息是有限的：只包含从 2005 开始的数据。

### 自动时区检测 {#automatic-time-zone-detection}

`time-zone-autodetect` 默认启用。在启动时，MikroTik 云服务会查找路由器公网 IP 地址所在位置的时区并应用它，包括夏令时。当你再次启用该设置时，检测也会运行：检测到的时区随后会在数秒内替换手动设置的时区。在检测开启时设置的 `time-zone-name` 只会保留到下一次检测，而该检测会在下一次启动后不久运行。

如果检测到的时区不正确，请在设置时区时关闭检测，如[设置时区](#set-the-time-zone)中的示例所示。

## 设置手动时区和夏令时 {#set-a-manual-time-zone-and-daylight-saving}

当没有匹配的命名时区，或者你需要自定义 GMT 偏移时，请将 `time-zone-name` 设置为 `manual` 并配置 [`/system/clock/manual`](../cli-reference/system/clock/manual.md) 子菜单。这些设置仅在 `time-zone-name` 为 `manual` 时生效，并且只能配置一个 DST 时段。

设置 GMT+02:00 的偏移，并从三月底到十月底使用一小时的夏令时：

```ros
/system/clock/set time-zone-autodetect=no time-zone-name=manual
/system/clock/manual/set time-zone=+02:00 dst-delta=+01:00 \
    dst-start="2026-03-29 03:00:00" dst-end="2026-10-25 04:00:00"
```

```ros
[admin@MikroTik] > /system/clock/manual/print
  time-zone: +02:00
  dst-delta: +01:00
  dst-start: 2026-03-29 03:00:00
    dst-end: 2026-10-25 04:00:00
```

手动设置的工作方式：

- 当 DST 未生效时，GMT 偏移为 `time-zone`。当 DST 生效时，则为 `time-zone` + `dst-delta`。`dst-delta` 可以为负值，用于冬季时间才是夏令时时段的时区。
- DST 从 `dst-start` 到 `dst-end` 生效，完全按照配置执行。该时段是单个日期范围，不会在后续年份中重复：请每年更新 `dst-start` 和 `dst-end`，或使用命名时区，后者会保持规则最新。
- 请同时给出 `dst-start` 和 `dst-end` 的日期和时间。省略的部分会被重置：日期重置为 1970-01-01，时间重置为 00:00:00。例如，`dst-start=05:00:00` 会得到 `1970-01-01 05:00:00`。
- 如果 `dst-start` 晚于 `dst-end`，DST 永远不会生效。对于夏季跨越年末的南半球，请将 `dst-start` 设置在较早的年份，将 `dst-end` 设置在较晚的年份，例如 `2026-10-04 02:00:00` 到 `2027-04-04 03:00:00`。

## 技术细节 {#technical-details}

### 启动时的时钟 {#clock-at-startup}

RouterOS 在时间被更改时、在正常重启时以及每天一次保存当前时间，并在启动时恢复它。因此，重启后即使没有网络时间源，时钟也会从已保存的时间开始，而当时间源响应时会更正它。当路由器没有已保存的时间时（例如在全新安装时），日期从 1970-01-02 00:00:00 UTC 开始，并按所配置时区的 gmt-offset 显示。

### 时钟限制 {#clock-limits}

日期不能早于所安装 RouterOS 版本的构建日期：路由器会返回 `cannot set time before package build time`。时钟可接受的最晚日期是 2038-01-19 03:14:07 UTC；更晚的日期会被忽略且不报错，时钟保持其时间。

### 时区检测 {#time-zone-detection}

检测使用与其他 [MikroTik 云服务](../network-management/cloud/communication-mikrotik-cloud-servers.md)相同的到 `cloud2.mikrotik.com` 的连接。检测到的时区会存储在配置中，并在 `/system/clock/export` 中显示为 `time-zone-name`。在首次成功检测之前，`time-zone-name` 为 `manual`，GMT 偏移为 +00:00。

有关所有属性，请参阅 CLI 参考中的 [`/system/clock`](../cli-reference/system/clock/index.md) 和 [`/system/clock/manual`](../cli-reference/system/clock/manual.md)。
