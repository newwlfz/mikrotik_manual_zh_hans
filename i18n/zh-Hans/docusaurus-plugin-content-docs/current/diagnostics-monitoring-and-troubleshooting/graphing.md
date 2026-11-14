---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/graphing"
sidebar_position: 11
title: "图表"
sidebar_label: "图表"
description: "RouterOS 图形化监控：随时间记录 CPU、内存和磁盘使用情况，以及接口和简单队列的流量，在路由器的 `/graphs/` 网页或 WinBox 中查看每日、每周、每月和每年的图表，选择谁可以查看这些图表，并让图表在重启后仍然保留。"
tags:
  - 'graphing'
  - 'monitoring'
  - 'resource-usage'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/graphing
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

图形记录会跟踪路由器随时间的资源使用情况，并为其绘制图形：

- CPU、内存和磁盘使用率。
- 通过某个接口的流量。
- 通过简单队列的流量。

你可以在路由器的 `/graphs/` 页面上通过网页浏览器查看这些图形，也可以在 WinBox 中查看。在你为其添加规则之前，不会绘制任何图形：路由器默认没有图形规则。如需完整演示，请观看 [MikroTik YouTube 频道上的图形视频](https://youtu.be/FTQEnDZVHNc)。

## 为接口和路由器资源绘制图形 {#graph-an-interface-and-the-routers-resources}

要为 `ether1`（默认配置中的 WAN 端口）上的互联网流量以及 CPU、内存和磁盘使用率绘制图形，并只向你自己的计算机 192.168.88.10 显示，请添加一条接口规则和一条资源规则：

```ros
/tool/graphing/interface/add interface=ether1 \
    allow-address=192.168.88.10/32
/tool/graphing/resource/add allow-address=192.168.88.10/32
```

要在 WinBox 中创建相同的规则：

1. 打开 **Tools > Graphing** 并选择 **Interface Rules**。
2. 选择 **New**，将 **Interface** 设为 `ether1`，并在 **Allow Address** 中输入 `192.168.88.10/32`。保持 **Enabled** 和 **Store on Disk** 处于选中状态，然后选择 **OK**。
3. 选择 **Resource Rules** 和 **New**。输入相同的 **Allow Address**，保持 **Enabled** 和 **Store on Disk** 处于选中状态，然后选择 **OK**。此规则会同时收集 CPU、内存和磁盘使用率。

![WinBox Interface Graphing Rule dialog with ether1 selected, Allow Address set to 192.168.88.10/32, and Enabled and Store on Disk selected](/img/ada1611061bd9e96.webp)

在该计算机的网页浏览器中打开 `http://192.168.88.1/graphs/`。页面会列出你的地址可以查看的图形：CPU usage、Memory usage、Disk usage 和 `ether1`。每个图形页面有四张图：

- Daily graph - 5 分钟平均值。
- Weekly graph - 30 分钟平均值。
- Monthly graph - 2 小时平均值。
- Yearly graph - 1 天平均值。

第一批数值会在几分钟内出现，即第一个 5 分钟平均值完成后。每张图下方，页面会显示最大值、平均值和当前值。流量图以比特每秒为单位，分别显示传入（`In`，接口上接收的）和传出（`Out`，发送的）流量。每个数值都是图形区间内的平均值，因此短时突发会显示得低于其峰值。

![Memory usage graphs in a web browser: daily, weekly, monthly and yearly graphs of the used memory, each with its maximum, average and current value](/img/42a3d6819ca0c861.webp)

要为每个接口绘制图形，请添加一条带有 `interface=all` 的规则。

## 为简单队列绘制图形 {#graph-simple-queues}

如果你用[简单队列](../firewall-and-quality-of-service/queues/index.md#simple-queue)限制每个客户，你可以为每个队列绘制图形，并让每个客户查看自己队列的图形。例如，使用以下客户队列：

```ros
/queue/simple/add name=customer-12 target=192.168.88.12/32 \
    max-limit=20M/20M
/queue/simple/add name=customer-13 target=192.168.88.13/32 \
    max-limit=50M/50M
```

为所有简单队列绘制图形，并让运维人员的计算机 192.168.88.10 查看所有图形：

```ros
/tool/graphing/queue/add simple-queue=all allow-address=192.168.88.10/32
```

在 WinBox 中，打开 **Tools > Graphing > Queue Rules** 并选择 **New**。将 **Simple Queue** 设为 `all`，将 **Allow Address** 设为 `192.168.88.10/32`。保持 **Enabled**、**Store on Disk** 和 **Allow Target** 处于选中状态，然后选择 **OK**。若只为某个队列绘制图形，请在 **Simple Queue** 中选择其名称。

![WinBox Queue Graphing Rule dialog with all simple queues selected, Allow Address set to 192.168.88.10/32, and Allow Target selected](/img/30402c9aa121604f.webp)

`simple-queue=all` 还会为你之后添加的队列以及 PPP 用户的动态队列绘制图形。使用 `allow-target=yes`（默认值）时，队列 `target` 中的每个地址也能看到该队列的图形。地址为 192.168.88.12 的客户打开 `http://192.168.88.1/graphs/`，会找到 `customer-12` 图形，但看不到其他客户的图形。在队列图形中，`In` 是发往目标（客户的下载）的流量，`Out` 是来自目标的流量（上传），两者各自也显示为队列 `max-limit` 的占比。

:::warning
使用 `allow-target=yes` 时，target 范围较宽的队列会向其范围内的所有人显示图形：target 为 192.168.88.0/24 的父队列会向整个子网显示，而 target 为 0.0.0.0/0 或某个接口的队列，会向所有能访问路由器 Web 服务器的客户端显示。PPPoE 及其他 PPP 用户的动态队列以各自的接口作为 target。为同一队列再添加一条带 `allow-target=no` 的规则并不能隐藏该图形，因为只要有任何一条规则允许，客户端就能看到该图形。存在此类队列时，请将 `simple-queue=all` 规则设为 `allow-target=no`，并为每个应向其客户可见的客户队列添加一条带 `allow-target=yes` 的规则。
:::

## 为 PPPoE 用户绘制图形 {#graph-pppoe-users}

`interface=all` 会为每个 PPPoE 用户的动态接口绘制图形，例如用户 `customer-12` 的 `<pppoe-customer-12>`，仅在用户连接期间存在，用户重新连接后索引会再次列出它。针对某个动态接口的规则无法在重新连接后继续有效：接口会获得新的 ID，而该规则会显示一个未知接口，例如 `*F00000`。要为某个用户永久绘制图形，请为该用户创建一个静态 PPPoE 服务器绑定，将 `service` 设为你 PPPoE 服务器的 `service-name`，并为该绑定绘制图形：

```ros
/interface/pppoe-server/add name=pppoe-customer-12 user=customer-12 \
    service=isp
/tool/graphing/interface/add interface=pppoe-customer-12 \
    allow-address=192.168.88.10/32
```

## 控制谁可以查看图形 {#control-who-can-see-the-graphs}

图形页面无需登录。当客户端地址位于该图形所对应规则的 `allow-address` 中时，该客户端就能看到该图形。默认的 `allow-address=0.0.0.0/0` 允许所有 IPv4 地址，因此请始终将其设置为需要查看图形的地址。`allow-address` 的更改会立即生效：

```ros
/tool/graphing/interface/set [find] allow-address=192.168.88.10/32
```

- 访问权限按图形类型区分：接口规则开放其接口的图形，资源规则开放 CPU、内存和磁盘图形，队列规则开放其队列的图形。
- 如需允许多个地址范围，请为每个范围添加一条规则。你可以为同一接口、队列或资源添加多条规则，每条规则都有自己的 `allow-address`。
- `/graphs/` 页面只列出你的地址可以查看的图形。你无权查看的图形页面会显示 `ERROR: NO ACCESS!`；不存在的图形会显示 `ERROR: INVALID ID!`。
- 已禁用的规则不会显示其图形。
- 规则中的 `interface` 或 `simple-queue` 无法更改：请删除该规则并添加一条新规则。

图形由路由器的 Web 服务器提供，HTTP 由 `www` 服务提供，HTTPS 由 `www-ssl` 提供，后者需要证书。默认配置的防火墙会丢弃来自互联网发往路由器的连接，因此只能在 LAN 内访问图形。要限制哪些地址可以访问 Web 服务器（包括 WebFig 和 REST API），请在 [服务](../system-information-and-utilities/services.md) 中设置这些服务的 `available-from`。

要在不显示 WebFig 登录页的情况下向客户显示图形，请关闭 [`/ip/service/webserver`](../cli-reference/ip/service/webserver.md) 中的 WebFig，并使用 WinBox 或 SSH 管理路由器：

```ros
/ip/service/webserver/set webfig-plain=no webfig-secure=no
```

要关闭图形页面并保留 Web 服务器的其余部分：

```ros
/ip/service/webserver/set graphs-plain=no graphs-secure=no
```

## 重启后保留图形 {#keep-the-graphs-across-reboots}

使用 `store-on-disk=yes`（默认值）时，路由器会将收集的数据写入其内置存储（即其文件所在位置），图形可在重启后保留。使用 `store-on-disk=no` 时，数据保留在 RAM 中，重启后图形会从空白开始。路由器无法将图形数据写入 USB 或 SD 磁盘。

`store-every` 设置路由器写入已收集数据的频率：每 5 分钟（默认值）、每小时或每天一次。从 RouterOS 进行的重启会保留自上次写入以来收集的数据。该设置适用于所有规则：

```ros
/tool/graphing/set store-every=hour
```

在 WinBox 中，打开 **Tools > Graphing**，选择 **Interface Rules**，然后在右侧面板中选择 **Graphing Settings**。在 **Store Every** 中选择写入间隔并选择 **OK**。**Page Refresh** 控制浏览器重新加载 Web 图形页面的频率；它不会改变数据收集间隔。截图显示的是默认值。

![WinBox Graphing Settings dialog showing Store Every set to 5 min and Page Refresh set to 00:05:00](/img/8ea93049cbe84f94.webp)

要更改某条规则是否在重启后保留其数据，请在 **Interface Rules**、**Queue Rules** 或 **Resource Rules** 中打开该规则，更改 **Store on Disk**，然后选择 **OK**。

:::tip
在闪存存储较小的设备上，每条带 `store-on-disk=yes` 的规则都会增加数据并向闪存写入。对于重启后不需要其图形的规则，请将 `store-on-disk=no` 设为，例如带有 `interface=all` 的规则。
:::

## WinBox 中的图形 {#graphs-in-winbox}

WinBox 显示相同的图形。打开 **Tools > Graphing**，选择 **Interface Graphs**、**Queue Graphs** 或 **Resource Graphs** 选项卡，然后打开一个条目。在图形窗口中选择 **Daily**、**Weekly**、**Monthly** 或 **Yearly** 以更改时间范围。拖动窗口边缘可放大图形。

![WinBox Graphing window with Resource Graphs selected and an enlarged Memory graph window showing the Daily, Weekly, Monthly and Yearly tabs; no samples have been collected](/img/d5a0be9655fca5e2.webp)

## 图形故障排查 {#troubleshoot-the-graphs}

- `/graphs/` 不列出任何图形 - 不存在规则，或者没有规则允许你的地址。请使用 `/tool/graphing/interface/print`、`/tool/graphing/queue/print` 和 `/tool/graphing/resource/print` 检查 `allow-address`。
- 新接口图形缺失，或其页面显示 `ERROR: INVALID ID!` - 添加规则后，图形可能需要几分钟才会出现。要立即显示，请禁用并启用该规则。
- 图形页面显示 `ERROR: NO ACCESS!` - 该图形的规则不允许你的地址。对于队列图形，当规则带有 `allow-target=yes` 时，你的地址也可能位于队列的 `target` 中。
- `Can't change interface, please create new config` 或 `Can't change queue, please create new config` - 规则中的接口或队列无法更改。请删除该规则并添加一条新规则。
- 重启后图形为空 - 该规则带有 `store-on-disk=no`。
- 规则显示类似 `*F00000` 的接口 - 该规则指定的动态接口（例如 PPPoE 用户）已重新连接。请通过静态 PPPoE 服务器绑定为该用户绘制图形。
- `/graphs/` 返回 `403 Forbidden` - 图形页面已通过 `/ip/service/webserver` 中的 `graphs-plain`（HTTP）或 `graphs-secure`（HTTPS）关闭。

## 技术细节 {#technical-details}

### 网页 {#web-pages}

- `/graphs/` - 客户端可以查看的图形列表。
- `/graphs/cpu/`、`/graphs/ram/`、`/graphs/hdd/` - CPU、内存和磁盘使用率。
- `/graphs/iface/<interface>/` - 某个接口的流量。
- `/graphs/queue/<queue>/` - 某个简单队列的流量。

索引会以 URL 编码形式链接名称，例如 `/graphs/queue/customer%2D12/`；使用纯名称也可以。队列页面还会显示队列的 target、`max-limit` 和 `limit-at`。每个图形页面都从其自己的文件夹以 GIF 图像形式加载图形：`daily.gif`、`weekly.gif`、`monthly.gif` 和 `yearly.gif`。这些页面会将 `page-refresh` 值（默认 300 秒）作为 HTTP `refresh` 头发送，因此浏览器会重新加载它们；当 `page-refresh=never` 时，会省略该头。客户端无权查看的页面会以 HTTP 状态码 200 和文本 `ERROR: NO ACCESS!` 或 `ERROR: INVALID ID!` 响应，而不是 HTTP 错误。

### 规则 {#rules}

- 没有 `interface` 或 `simple-queue` 的规则适用于 `all`。
- 具有相同接口或队列以及相同 `allow-address` 的第二条规则会被拒绝，并提示 `Graphing rule already exists`。
- `interface=all` 会为每个接口绘制图形，也包括已禁用的接口和环回接口 `lo`。
- 图形规则没有注释：传递给 `add` 的 `comment` 不会被保留。

有关所有设置，请参阅 CLI 参考中的 [`/tool/graphing`](../cli-reference/tool/graphing/index.md)。
