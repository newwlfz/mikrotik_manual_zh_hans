---
title: "绘图"
description: "RouterOS 图表：记录 CPU、内存和磁盘使用率，以及接口和简单队列流量随时间的变化，在路由器的 /graphs/ 网页或 WinBox 中查看日、周、月和年图表，选择可查看图表的用户，并在重启后保留图表。"
tags:
  - 'graphing'
  - 'monitoring'
  - 'resource-usage'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/graphing
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Graphing 记录路由器随时间的使用情况，并绘制相应图表：

- CPU、内存和磁盘使用率。
- 通过接口的流量。
- 通过 simple queue 的流量。

你可以在 Web 浏览器中打开路由器的 `/graphs/` 页面，或在 WinBox 中查看图表。在添加规则之前不会绘制任何图表：路由器默认没有 graphing 规则。如需操作演示，请观看 [MikroTik YouTube 频道上的 graphing 视频](https://youtu.be/FTQEnDZVHNc)。

## 绘制接口和路由器资源的图表 {#graph-an-interface-and-the-routers-resources}

要绘制 `ether1`（默认配置中的 WAN 端口）上的互联网流量以及 CPU、内存和磁盘使用率，并仅向 192.168.88.10 这台计算机显示这些图表，请添加一条接口规则和一条资源规则：

```ros
/tool/graphing/interface/add interface=ether1 \
    allow-address=192.168.88.10/32
/tool/graphing/resource/add allow-address=192.168.88.10/32
```

要在 WinBox 中创建相同的规则：

1. 打开 **Tools > Graphing**，选择 **Interface Rules**。
2. 选择 **New**，将 **Interface** 设置为 `ether1`，并在 **Allow Address** 中输入 `192.168.88.10/32`。保持 **Enabled** 和 **Store on Disk** 处于选中状态，然后选择 **OK**。
3. 选择 **Resource Rules** 和 **New**。输入相同的 **Allow Address**，保持 **Enabled** 和 **Store on Disk** 处于选中状态，然后选择 **OK**。该规则会一起收集 CPU、内存和磁盘使用率。

![WinBox Interface Graphing Rule dialog with ether1 selected, Allow Address set to 192.168.88.10/32, and Enabled and Store on Disk selected](/img/ada1611061bd9e96.webp)

在该计算机的 Web 浏览器中打开 `http://192.168.88.1/graphs/`。页面会列出你的地址可以查看的图表：CPU usage、Memory usage、Disk usage 和 `ether1`。每个图表页面包含四个图表：

- 日图 - 5 分钟平均值。
- 周图 - 30 分钟平均值。
- 月图 - 2 小时平均值。
- 年图 - 1 天平均值。

首批数值会在几分钟内出现，即第一个 5 分钟平均值完成时。每张图下方会显示最大值、平均值和当前值。流量图的单位为比特每秒，并分别显示入站（`In`，接口接收）和出站（`Out`，发送）流量。每个数值都是该图表时间间隔内的平均值，因此短时突发的显示值会低于其峰值。

![Memory usage graphs in a web browser: daily, weekly, monthly and yearly graphs of the used memory, each with its maximum, average and current value](/img/42a3d6819ca0c861.webp)

要为所有接口生成图表，请添加一条包含 `interface=all` 的规则。

## 为简单队列生成图表 {#graph-simple-queues}

如果使用 [simple queue](/docs/firewall-and-quality-of-service/queues#simple-queue) 限制每个客户，则可以为每个队列生成图表，并让每个客户查看自己队列的图表。例如，对于以下客户队列：

```ros
/queue/simple/add name=customer-12 target=192.168.88.12/32 \
    max-limit=20M/20M
/queue/simple/add name=customer-13 target=192.168.88.13/32 \
    max-limit=50M/50M
```

为所有简单队列生成图表，并让运营商的计算机 192.168.88.10 查看所有图表：

```ros
/tool/graphing/queue/add simple-queue=all allow-address=192.168.88.10/32
```

在 WinBox 中，打开 **Tools > Graphing > Queue Rules** 并选择 **New**。将 **Simple Queue** 设置为 `all`，将 **Allow Address** 设置为 `192.168.88.10/32`。保持 **Enabled**、**Store on Disk** 和 **Allow Target** 处于选中状态，然后选择 **OK**。要为单个队列生成图表，请在 **Simple Queue** 中选择其名称。

![WinBox Queue Graphing Rule dialog with all simple queues selected, Allow Address set to 192.168.88.10/32, and Allow Target selected](/img/30402c9aa121604f.webp)

`simple-queue=all` 也会为之后添加的队列以及 PPP 用户的动态队列生成图表。使用 `allow-target=yes`（默认）时，队列 `target` 中的每个地址也可以查看该队列的图表。192.168.88.12 的客户打开 `http://192.168.88.1/graphs/`，可在其中找到 `customer-12` 图表，但看不到其他客户的图表。在队列图中，`In` 是发往目标的流量（客户下载），`Out` 是从目标发出的流量（上传），两者也都会显示为队列 `max-limit` 的占比。

:::warning
使用 `allow-target=yes` 时，目标范围较宽的队列会将其图表显示给其中的所有人：目标为 192.168.88.0/24 的父队列会向整个子网显示图表，目标为 0.0.0.0/0 或某个接口的队列会向所有访问路由器 Web 服务器的客户端显示图表。PPPoE 和其他 PPP 用户的动态队列以其接口作为目标。同一队列的另一条使用 `allow-target=no` 的规则不会隐藏图表，因为只要任意规则允许，客户端就能看到图表。当存在此类队列时，请在 `simple-queue=all` 规则上设置 `allow-target=no`，并为每个应对其客户可见的客户队列添加一条 `allow-target=yes` 规则。
:::

## 绘制 PPPoE 用户图表 {#graph-pppoe-users}

`interface=all` 会为每个 PPPoE 用户的动态接口绘制图表，例如用户 `customer-12` 的 `<pppoe-customer-12>`，用户在线期间有效，并且索引会在用户重新连接后再次列出该接口。针对某个动态接口的规则无法在重新连接后保留：接口会获得新的 ID，规则会显示未知接口，例如 `*F00000`。要长期绘制某个用户的图表，请为该用户创建静态 PPPoE 服务器绑定，将 `service` 设置为 PPPoE 服务器的 `service-name`，然后为该绑定绘制图表：

```ros
/interface/pppoe-server/add name=pppoe-customer-12 user=customer-12 \
    service=isp
/tool/graphing/interface/add interface=pppoe-customer-12 \
    allow-address=192.168.88.10/32
```

## 控制谁可以查看图表 {#control-who-can-see-the-graphs}

图表页面无需登录。当客户端地址位于该图表某条规则的 `allow-address` 中时，客户端即可看到图表。默认的 `allow-address=0.0.0.0/0` 允许所有 IPv4 地址，因此请始终将其设置为需要查看图表的地址。`allow-address` 的更改会立即生效：

```ros
/tool/graphing/interface/set [find] allow-address=192.168.88.10/32
```

- 访问权限按图表类型划分：接口规则开放其接口的图表，资源规则开放 CPU、内存和磁盘图表，队列规则开放其队列的图表。
- 要允许多个地址范围，请为每个范围添加一条规则。可以为同一接口、队列或资源添加多条规则，每条规则使用各自的 `allow-address`。
- `/graphs/` 页面仅列出你的地址可以查看的图表。无权查看的图表页面会显示 `ERROR: NO ACCESS!`；不存在的图表会显示 `ERROR: INVALID ID!`。
- 禁用的规则不会显示其图表。
- 规则的 `interface` 或 `simple-queue` 无法更改：请删除该规则并添加新规则。

图表由路由器的 Web 服务器提供，HTTP 由 `www` 服务提供，HTTPS 由 `www-ssl` 提供，后者需要证书。默认配置的防火墙会丢弃来自互联网到路由器的连接，因此只能从 LAN 访问图表。要限制哪些地址可以访问 Web 服务器（包括 WebFig 和 REST API），请在 [Services](/docs/system-information-and-utilities/services) 中设置这些服务的 `available-from`。

要在不显示 WebFig 登录页的情况下向客户展示图表，请在 [`/ip/service/webserver`](/docs/cli-reference/ip/service/webserver) 中关闭 WebFig，并使用 WinBox 或 SSH 管理路由器：

```ros
/ip/service/webserver/set webfig-plain=no webfig-secure=no
```

要关闭图形页面并保留 Web 服务器的其余功能：

```ros
/ip/service/webserver/set graphs-plain=no graphs-secure=no
```

## 在重启后保留图形 {#keep-the-graphs-across-reboots}

使用 `store-on-disk=yes`（默认）时，路由器会将收集的数据写入其内置存储（即其文件所在位置），图形在重启后仍会保留。使用 `store-on-disk=no` 时，数据保留在 RAM 中，重启后图形将从空开始。路由器无法将图形数据写入 USB 或 SD 磁盘。

`store-every` 设置路由器写入收集数据的频率：每 5 分钟（默认）、每小时或每天一次。从 RouterOS 重启会保留自上次写入以来收集的数据。该设置适用于所有规则：

```ros
/tool/graphing/set store-every=hour
```

在 WinBox 中，打开 **Tools > Graphing**，选择 **Interface Rules**，并在右侧面板中选择 **Graphing Settings**。在 **Store Every** 中选择写入间隔，然后选择 **OK**。**Page Refresh** 控制浏览器重新加载 Web 图形页面的频率；它不会更改数据收集间隔。截图显示的是默认值。

![WinBox Graphing Settings dialog showing Store Every set to 5 min and Page Refresh set to 00:05:00](/img/8ea93049cbe84f94.webp)

要更改某条规则是否在重启后保留其数据，请在 **Interface Rules**、**Queue Rules** 或 **Resource Rules** 中打开该规则，更改 **Store on Disk**，然后选择 **OK**。

:::tip
在闪存较小的设备上，每条使用 `store-on-disk=yes` 的规则都会增加数据并写入闪存。对于重启后不需要其图形的规则，请设置 `store-on-disk=no`，例如使用 `interface=all` 的规则。
:::

## WinBox 中的图形 {#graphs-in-winbox}

WinBox 显示相同的图表。打开 **Tools > Graphing**，选择 **Interface Graphs**、**Queue Graphs** 或 **Resource Graphs** 选项卡，并打开一个条目。在图表窗口中选择 **Daily**、**Weekly**、**Monthly** 或 **Yearly** 以更改时间范围。拖动窗口边缘可放大图表。

![WinBox Graphing window with Resource Graphs selected and an enlarged Memory graph window showing the Daily, Weekly, Monthly and Yearly tabs; no samples have been collected](/img/d5a0be9655fca5e2.webp)

## 图表故障排除 {#troubleshoot-the-graphs}

- `/graphs/` 未列出任何图表 - 不存在规则，或没有规则允许你的地址。使用 `/tool/graphing/interface/print`、`/tool/graphing/queue/print` 和 `/tool/graphing/resource/print` 检查 `allow-address`。
- 新的接口图表缺失，或其页面显示 `ERROR: INVALID ID!` - 添加规则后，图表可能需要几分钟才会出现。要立即显示，请禁用并重新启用该规则。
- 图表页面显示 `ERROR: NO ACCESS!` - 该图表的规则不允许你的地址。对于队列图表，当规则设置了 `allow-target=yes` 时，你的地址也可以位于队列的 `target` 中。
- `Can't change interface, please create new config` 或 `Can't change queue, please create new config` - 无法更改规则中的接口或队列。请删除该规则并添加新规则。
- 重启后图表为空 - 规则设置了 `store-on-disk=no`。
- 规则显示类似 `*F00000` 的接口 - 该规则命名了一个动态接口，例如已重新连接的 PPPoE 用户。请通过静态 PPPoE 服务器绑定为该用户绘制图表。
- `/graphs/` 返回 `403 Forbidden` - 图表页面已通过 `/ip/service/webserver` 中的 `graphs-plain`（HTTP）或 `graphs-secure`（HTTPS）关闭。

## 技术细节 {#technical-details}

### Web 页面 {#web-pages}

- `/graphs/` - 客户端可以看到的图表列表。
- `/graphs/cpu/`、`/graphs/ram/`、`/graphs/hdd/` - CPU、内存和磁盘使用情况。
- `/graphs/iface/<interface>/` - 某个接口的流量。
- `/graphs/queue/<queue>/` - 某个 simple queue 的流量。

索引中的名称采用 URL 编码，例如 `/graphs/queue/customer%2D12/`；直接使用普通名称也可以。队列页面还会显示队列的 target、`max-limit` 和 `limit-at`。每个图表页面都从自身文件夹加载 GIF 图片：`daily.gif`、`weekly.gif`、`monthly.gif` 和 `yearly.gif`。页面会将 `page-refresh` 值（默认 300 秒）作为 HTTP `refresh` 标头发送，以便浏览器重新加载页面；使用 `page-refresh=never` 时，不发送该标头。客户端无权查看的页面会返回 HTTP 状态 200 以及文本 `ERROR: NO ACCESS!` 或 `ERROR: INVALID ID!`，而不是 HTTP 错误。

### Rules

- 未指定 `interface` 或 `simple-queue` 的规则适用于 `all`。
- 具有相同接口或队列以及相同 `allow-address` 的第二条规则会被拒绝，并返回 `Graphing rule already exists`。
- `interface=all` 会绘制所有接口的图表，包括已禁用的接口和回环接口 `lo`。
- 图表规则没有 comment：通过 `add` 提供的 `comment` 不会被保留。

有关所有设置，请参阅 CLI 参考中的 [`/tool/graphing`](/docs/cli-reference/tool/graphing)。
