---
sidebar_key: "management-tools/cmr"
title: "CMR"
description: "CMR 是用于 RouterOS 设备机群的集中监控平台。它支持对整个机群进行更新、监控和告警管理。"
tags:
  - 'cmr'
  - 'management'
source: https://manual.mikrotik.com/docs/management-tools/cmr
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

CMR 是一个面向 RouterOS 设备机群的集中式监控平台，可在整个机群范围内进行更新、监控和告警管理。

:::info
`cmr` [软件包](../getting-started/installation-and-upgrade/packages.md#extra-packages) 仅在具有 **arm**、**arm64** 和 **x86** 架构的设备上受支持。CMR 客户端是 RouterOS 的一部分，因此除具有 **smips** 和 **powerpc** 架构的设备外，每台设备都可以作为 CMR 客户端。
:::

## 概述 {#overview}

CMR 通过机群中的一台设备来管理整个 RouterOS 设备机群。其中一台设备运行 CMR 服务器，其他设备作为 CMR 客户端连接到它。在服务器上，你可以查看整个机群的状态、对其进行升级、接收告警、在多台设备上同时执行命令、绘制网络拓扑图，以及配置 WiFi 网络和 VLAN 端口。

### CMR 的功能 {#what-cmr-does}

- **设备清单** - 列出每个客户端的标识、板卡型号、RouterOS 版本、已安装的软件包、连接状态和标签。
- **机群升级** - 按规则升级设备组：通道或固定版本、计划时间、设备组的顺序以及故障策略。软件包来自 MikroTik 更新服务器或服务器上的某个目录。
- **告警** - 监视资源使用情况、健康传感器、可用性、升级、接口和日志行，在满足条件时写入日志消息、运行脚本或调用 webhook。
- **在多台设备上执行命令** - 在选定的设备上运行脚本并显示各设备的输出，还可重启、升级或配对设备。
- **仪表板** - 显示所选设备的实时摘要：连接状态、资源使用情况、接口、流量和 WiFi 客户端。
- **网络拓扑** - 绘制网络拓扑图，设备之间的链路根据邻居和端口数据生成。该图在 GUI 中显示。
- **应用流量** - 收集经过所选路由器（通常是网关）的各类应用的统计数据。
- **WiFi 配置下发** - 一次性定义 WiFi 网络和射频设置，并将其应用到选定的接入点，还可按频段分别应用。
- **VLAN 配置下发** - 将客户端的选定端口作为 access 端口或 trunk 端口加入 VLAN。

### CMR 不具备的功能 {#what-cmr-does-not-do}

- CMR 不配置 IP 地址、DHCP、路由、防火墙、用户或其他设备设置。请在设备上使用 WinBox、WebFig 或 CLI 进行配置。若需在多台设备上做一次性更改，请使用 `run-script`。
- CMR 不会编辑或接管设备现有的配置。它会在其旁边创建自己的配置对象，并在重叠之处接管，例如某个 WiFi 射频或某个网桥端口。
- CMR WiFi 会把配置写入每个接入点。它不负责协调接入点之间的漫游，也不充当集中认证服务器。

### 工作原理 {#how-it-works}

- 服务器运行在安装了 `cmr` 软件包的设备上。客户端是 RouterOS 的一部分，因此除 **smips** 和 **powerpc** 架构的设备外，每台设备都可以作为客户端。
- 客户端通过邻居发现（MNDP）或 DNS 找到服务器，也可以连接到 `controller-addresses` 中设置的地址。使用 DNS 时，客户端会解析 `_cmr._tcp.lan` 和 `_cmr._tcp.<domain>`，其中 `<domain>` 是它从 DHCP 收到的域名（选项 15，`domain-name`）。服务器不必是网关，客户端可以跨路由网络连接，包括通过 NAT 或 VPN。
- 客户端被管理之前，双方必须达成一致。这称为配对。配对后，服务器从客户端收集状态数据，并向其下发配置，例如 WiFi 网络。
- CMR 下发的配置在客户端上以受管对象的形式存储，并标记为 **Y** 标志。它们无法在客户端上修改，并且在服务器不可达时仍然生效。禁用客户端会移除这些对象。
- 请使用 WinBox 4 或 WebFig 来访问 CMR 菜单。WinBox 3 不支持这些菜单。

CMR 最适合运行默认配置或接近默认配置的设备，例如开箱即用的设备。CMR 不会让其对象去适配自定义的网桥、VLAN 或 WiFi 设置，因此对于大量使用非标准配置的设备，可能需要先进行手动调整，CMR 配置下发才能按预期工作。

### 入门 {#getting-started}

1. 在将作为服务器的设备上安装 `cmr` 包，并使用 `/cmr set enabled=yes` 启用服务器。
2. 在每台要管理的设备上，使用 `/cmr/client set enabled=yes` 启用客户端。如果客户端无法自行发现服务器，请添加 `controller-addresses`。
3. 批准配对。在默认配置中，服务器会等待批准：新设备会以 **P** 标志列在 `/cmr/device` 中，直到你为它们运行 `pair`。配对部分介绍了这些选项。
4. 为设备分配标签，例如按站点和按角色，以便规则可以选择设备组。
5. 为这些标签创建升级规则和告警规则。

[`CMR CLI Reference`](../cli-reference/cmr.md) 提供了服务器上 [`/cmr`](../cli-reference/cmr.md) 菜单中每个参数和命令的详细说明。[CMR-客户端](./cmr/client.md) 指南介绍了客户端侧，而 [`CMR-Client CLI Reference`](../cli-reference/cmr/client.md) 提供了受管设备上 [`/cmr/client`](../cli-reference/cmr/client.md) 菜单中每个参数和命令的详细说明。

CMR 服务器通过 [`/cmr`](../cli-reference/cmr.md) 菜单进行配置。

## 启用 CMR 服务器 {#enable-the-cmr-server}

CMR 客户端通过 TCP 端口 `54321` 连接到服务器。在服务器的防火墙（`input` 链）中允许来自客户端的入站连接访问此端口，并允许此流量通过客户端与服务器之间的任何防火墙。

启用服务器：

```ros
[admin@MikroTik] > /cmr set enabled=yes
```

启用服务器后，该路由器将成为已连接 CMR 客户端的管理控制器。设备列表（包括服务器本身）显示在 [`/cmr/device`](../cli-reference/cmr/device.md) 菜单中。

### 服务器设置 {#server-settings}

[`/cmr`](../cli-reference/cmr.md) 菜单还控制客户端如何找到服务器，以及服务器从客户端收集哪些内容：

- `controller-addresses` - 当设备无法通过邻居发现（MNDP）或 DNS 自动发现服务器时，发送给这些设备的服务器 IP 地址。
- `track-topology` - 从客户端获取路由、WiFi 注册表、ARP 表、邻居、DHCP 状态和接口状态。网络拓扑布局的自动链路依赖于此数据。默认值：`yes`。
- `fetch-comments` - 从客户端获取接口、端口和 WiFi 注册表条目的注释。默认值：`yes`。
- `auto-labels` - 选择服务器从客户端获取哪些自动标签：`version`、`architecture`、`model`、`board-name`、`identity`、`address` 和 `ssid` 中的任意项，或者 `all` 或 `none`。默认值：`all`。
- `apptraffic-devices` - 按标签选择要从中收集应用流量统计信息的设备。默认值：`gateway`，即带有 `gateway` 标签的设备。设置为 `all` 可选择所有设备。
- `upgrade-check-interval` - 服务器检查更新服务器以获取新版本的频率。最小为 1 分钟。默认值：`10h`。
- `packages-directory`、`packages-cache-type` 和 `packages-cache-limit` - 服务器从哪里获取并存储升级包。“升级源”部分描述了它们。

目前，对于未设置的项，`/cmr/get` 返回空值，而不是其默认值。要将某个设置恢复为默认值，请在其名称前加上 `!`，例如 `/cmr set !upgrade-check-interval`。

目前，更改 `packages-directory`、`upgrade-check-interval` 或 `pairing-requirement` 会重启服务器上的 CMR：每个客户端都会重新连接，仍然匹配的状态警报会再次运行其操作。

## Pairing {#pairing}

只有双方设备都同意，配对才会建立。每台设备都有自己的 `pairing-requirement` 设置，它定义了在本地设备接受配对之前，远程设备必须做什么。由于每一方都有自己的要求，只有在双方设备的要求都得到满足后，配对才会成功。

在本地运行 `pair` 命令始终会从此设备批准配对，无论其配置的要求是什么。CMR 服务器和客户端都支持 `pairing-requirement=none`、`password` 和 `confirm`：

- **none** - 不需要额外批准。此设备会自动接受配对。
- **password** - 远程设备可以通过提供此设备上 RouterOS 用户的用户名和密码来批准配对，使用 `pair` 命令的 `username` 和 `password` 参数。CMR 没有单独的配对密码。也可以通过 `pair` 命令在本地批准配对。
- **confirm** - 必须使用此设备的 `pair` 命令在本地批准配对，服务器上为 `/cmr/device/pair`，客户端上为 `/cmr/client/pair`；无法从远程侧批准。

把 `pairing-requirement` 理解为在此设备同意配对之前必须发生的事情。只有在双方设备都同意后，配对才会完成。

### 典型配对场景 {#typical-pairing-scenarios}

- **none** 适用于可信环境，在此类环境中，设备一旦发现彼此就应自动配对。例如，同一受管 LAN 上的 CMR 服务器和客户端都可以使用 **none**，从而无需用户交互即可完成配对。
- **confirm** 强制在服务器上进行明确的本地批准：仅发现新客户端本身还不够；管理员必须在服务器上运行 `pair` 命令，服务器才会接受该客户端。
- **password** 适用于需要远程批准，但物理或管理访问两台设备都不方便的情况。例如，客户端可以使用 **password**，允许 CMR 服务器使用客户端上某个用户的凭据远程满足客户端的要求。

两台设备上的要求相互独立。客户端会自动接受配对（`none`），在服务器提供客户端上某个用户的凭据时接受配对（`password`），或者仅在客户端上运行 `/cmr/client/pair` 后才接受配对（`confirm`）。例如：

- CMR 服务器：**none**，客户端：**none** - 两台设备都会自动接受。
- CMR 服务器：**none**，客户端：**password** - 当服务器提供客户端上某个用户的凭据时，客户端会接受。
- CMR 服务器：**password**，客户端：**none** - 当客户端提供服务器上某个用户的凭据时，服务器会接受。
- CMR 服务器：**password**，客户端：**password** - 每台设备都必须满足另一台设备的 password 要求，除非使用 `pair` 命令在本地批准配对。
- CMR 服务器：**confirm**，客户端：**none** - 客户端会自动接受，但必须在服务器上运行 `pair` 命令。
- CMR 服务器：**confirm**，客户端：**password** - 当服务器提供客户端上某个用户的凭据时，客户端会接受，但还必须在服务器上运行 `pair` 命令。

每条 `pair` 命令都使用 **另一台** 设备的用户名和密码：在服务器上，[`/cmr/device/pair`](../cli-reference/cmr/device/pair.md) 使用正在配对的设备的某个用户，而在客户端上，[`/cmr/client/pair`](../cli-reference/cmr/client/pair.md) 使用服务器上的某个用户。不带凭据运行 `pair` 会批准本设备这一侧；当远程侧的要求为 `none` 时，这就能满足双方。配对通常可以从一个控制台完成：在服务器上，`/cmr/device/pair` 已经批准了服务器这一侧，因此服务器自己的 `password` 只会在客户端的控制台输入，绝不会在服务器上输入。服务器的 `password` 要求仅在从客户端发起配对时才重要。`confirm` 是唯一会强制在设备自己的控制台上执行操作的要求：在服务器上设置时，配对无法仅从客户端完成；在客户端上设置时，配对也无法仅从服务器完成。

通过 password 进行配对还会为你找到设备：服务器会向每台选定的设备提供 `username` 和 `password`，因此你不需要知道哪台设备对应哪个密码。当一个站点中的每台设备各自带有不同的出厂密码，并且你面前有它们的包装盒时，请对每个包装盒运行一次 [`/cmr/device/pair`](../cli-reference/cmr/device/pair.md) `username=admin password=<password from one box>`：每次运行都会配对具有该密码的设备，其他设备则保持待处理状态。使用 `labels` 而不是 `all` 可将一次配对运行限制在设备群的一部分。

要开始配对，请在其中一个设备上运行 `pair` 命令：在 CMR 服务器上运行 [`/cmr/device/pair`](../cli-reference/cmr/device/pair.md)，或在客户端上运行 [`/cmr/client/pair`](../cli-reference/cmr/client/pair.md)。也可以使用物理复位按钮执行配对：在服务器上使用 [`/cmr/push-button`](../cli-reference/cmr/push-button.md)，或在客户端上使用 [`/cmr/client/push-button`](../cli-reference/cmr/client/push-button.md)。

## 管理设备 {#managing-devices}

[`/cmr/device`](../cli-reference/cmr/device.md) 菜单列出由服务器管理的设备。设备一连接到服务器就会出现在列表中；在配对获得批准之前，它会带有 **P**（pending）标志。服务器自身显示为带有 **L** 标志的设备。每个条目显示设备标识、板卡、RouterOS 版本、标签和运行时间。对于已连接的设备，列表还会显示连接地址。窄控制台会省略放不下的列，因此那里可能缺少地址，而 `print detail` 会显示每个值：

```ros
[admin@MikroTik] > /cmr/device/print where labels~"Group2"
Flags: C - CONNECTED; U - UPGRADE-AVAILABLE
Columns: IDENTITY, BOARD, VERSION, LABELS, UPTIME, ADDRESS
 #    IDENTITY  BOARD       VERSION  LABELS  UPTIME   ADDRESS
 2 CU MikroTik  RB4011iGS+  7.x      Group2  1h5m53s  192.168.1.98
 3 CU MikroTik  RB4011iGS+  7.x      Group2  1h3m8s   192.168.1.99
 9 CU MikroTik  RB4011iGS+  7.x      Group2  1h9m37s  192.168.1.100
```

设备的 `address` 是其连接到服务器时的源地址。对于位于 NAT 后面的客户端，它是转换后的地址，因此多个客户端可能显示相同的地址。

这些标志表示设备状态：`L` 表示服务器自身，`P` 表示配对待处理，`C` 表示已连接，`S` 表示陈旧（无连接），`U` 表示设备的升级通道上有不同版本可用。`U` 版本也可能早于已安装版本，例如当设备运行测试版本且其升级规则使用 `stable` 通道时。[`/cmr/device`](../cli-reference/cmr/device.md) CLI 参考列出了每个标志和每个只读值，例如板卡、序列号、已安装软件包、告警计数以及覆盖该设备的升级规则。

### 设置设备属性 {#set-device-properties}

你可以从服务器更改受管设备的以下属性：

- `identity` - 重命名设备。新标识会应用到设备本身。
- `labels` - 分配标签以对设备分组。标签是整个 CMR 中通用的选择机制：升级规则、告警规则、`run-script` 以及其他设备命令都按标签选择设备。
- `port-labels` - 按端口分配标签。将每个端口写为 `port:label`，同一端口的多个标签用 `/` 分隔，端口之间用 `,` 分隔，例如 `port-labels=ether1:uplink/trunk,ether5:office`。打印输出会用 `;` 分隔端口。`/cmr/vlan` 规则的 `port-labels` 会按这些标签或按接口名称选择端口。
- `pairing-requirement` - 为单个设备覆盖服务器的配对要求。

可使用 `where` 按这些属性中的任意一个筛选列表，例如 `/cmr/device/print where connected` 或 `/cmr/device/print where labels~\"office\"`。对标签使用 `~`，因为一个设备可以有多个标签：`labels=office` 只匹配整个标签列表为 `office` 的设备。要从设备中删除所有标签，请将 `labels` 设置为空值。

`/cmr/device/export` 将设备列表打印为 `add` 命令，每个设备一条，包含其 `identity`、`ids`、`labels` 和 `pairing-requirement`，而 `/cmr/device/add` 会根据这些值创建设备条目。

### 标签与设备选择 {#labels-and-device-selection}

标签对设备进行分组。升级规则、警报规则、WiFi 和 VLAN 预配、布局、`apptraffic-devices` 设置以及设备命令均按标签选择设备。

除了你分配的标签之外，每台设备还有自动标签，显示在只读的 `auto-labels` 值中：例如其地址、架构、型号、板卡名称和标识。自动标签与你自己标签的选择方式相同，因此 `labels=arm` 会选择所有使用 `arm` 架构的设备，而 `labels=Office-AP1` 会选择具有该标识的设备。

`labels` 值是以逗号分隔的列表。普通标签使用 OR 组合。以 `+` 开头的标签还必须匹配（AND），以 `-` 开头的标签会排除设备（AND NOT）。`all` 选择所有设备，包括 CMR 服务器。

| 选择器 | 选中的设备 |
| --- | --- |
| `labels=office,lab` | 具有 `office` 标签或 `lab` 标签的设备。 |
| `labels=office,+ap` | 同时具有 `office` 和 `ap` 标签的设备。 |
| `labels=office,-ap` | 具有 `office` 标签的设备，但具有 `ap` 标签的设备除外。 |
| `labels=office,lab,-ap` | 具有 `office` 或 `lab` 标签的设备，但具有 `ap` 标签的设备除外。 |
| `labels=all,-core` 或 `labels=-core` | 除具有 `core` 标签的设备之外的所有设备。 |

:::note
`+` 和 `-` 符号必须位于列表元素的开头。没有逗号时，`labels=office+ap` 是单个标签名称。没有任何设备具有的标签会被接受且不会发出警告，因此在依赖某一选择之前请先检查它，例如使用升级规则的 `show-devices` 或告警规则的 `devices` 计数。
:::

WiFi 项目还可以使用频段标签选择某个频段的无线电，VLAN 规则可以使用端口标签选择端口。WiFi 配置和 VLAN 预配章节对这些进行了说明。

### 在设备上运行命令 {#run-commands-on-devices}

设备菜单提供了对选定设备执行操作的命令，以及这些命令报告的只读值：

- [`run-script`](../cli-reference/cmr/device/run-script.md) - 在每台所选设备上运行单行 RouterOS 脚本并显示其输出。脚本以有限权限运行：需要 `policy` 权限的命令（例如添加用户）会失败并提示 "not enough permissions (9)"。
- [`upgrade`](../cli-reference/cmr/device/upgrade.md) - 为所选设备启动升级任务，无论其升级规则的计划如何。
- [`reboot`](../cli-reference/cmr/device/reboot.md) - 重启所选设备。该命令会立即返回。设备重启后，`rebooted` 示例告警规则会记录 `<device> rebooted`，其中 `<device>` 为 `identity@address`。
- [`pair`](../cli-reference/cmr/device/pair.md) - 开始与所选设备配对。
- [`wifi-logs`](../cli-reference/cmr/device/wifi-logs.md) - 监控所选设备的 WiFi 日志。按 `event`（`connected`、`disconnected` 或 `failed`）、按客户端 MAC 地址（`address`）、按 `bssid` 或按时间范围（`time-start` 和 `time-end`）筛选条目。由 CAPsMAN 管理的接入点的事件由 CAPsMAN 设备记录，并显示在其下。如果未选择设备，则显示所有记录 WiFi 事件的设备的条目。使用 `labels` 选择设备以仅显示其条目。按 `c` 切换到客户端视图，该视图列出每个客户端及其最后接入点、连接、断开和失败次数、IP 地址、SSID 和信号；按 `l` 返回日志条目。
- [`apptraffic`](../cli-reference/cmr/device/apptraffic.md) - 所选设备的应用流量监控器。
- [`dashboard`](../cli-reference/cmr/device/dashboard.md) - 所选设备的实时视图。

每个命令通过 `labels`（或 `numbers`）选择设备，并按设备报告结果。例如，在所有带有 `Group2` 标签的设备上运行命令：

```ros
[admin@MikroTik] > /cmr/device/run-script labels=Group2 script="/system/identity/print"
Columns: DEVICE, STATUS
DEVICE                  STATUS
MikroTik@192.168.1.98   running
MikroTik@192.168.1.99   running
MikroTik@192.168.1.100  running

Columns: DEVICE, STATUS, OUTPUT
DEVICE                  STATUS   OUTPUT
MikroTik@192.168.1.98   success   name: MikroTik
MikroTik@192.168.1.99   success   name: MikroTik
MikroTik@192.168.1.100  success   name: MikroTik
```

该命令首先将所选设备列为 `running`，然后在脚本完成时显示每个设备的 `STATUS` 和 `OUTPUT`。`run-script` 拒绝空选择：没有 `numbers` 或 `labels` 时，它会失败并提示 "numbers and/or labels required"；如果标签不匹配任何设备，它会失败并提示 "no devices selected"。此处，`labels` 遵循 CMR 中各处相同的标签语法：一个逗号分隔的列表，其中普通标签以 OR 组合，以 `+` 开头的标签也必须匹配（AND），以 `-` 开头的标签排除设备（AND NOT）。例如，`labels=office,+ap` 选择同时具有两个标签的设备，而 `labels=all,-core` 选择除带有 `core` 标签的设备之外的所有设备。没有逗号时，`office+ap` 会被读取为单个标签名。目前，在脚本中，`as-value` 与 `labels` 组合会失败并提示 `no such item`。在那里使用 `numbers` 选择设备，例如 `numbers=[find where identity="Office-AP1"]`。

#### run-script 权限 {#run-script-permissions}

使用 [`/cmr/device/run-script`](../cli-reference/cmr/device/run-script.md) 发送的脚本会在每个客户端上以 `read`、`write`、`test` 和 `reboot` 策略运行，且没有用户会话。需要其他策略的命令会失败并提示 "not enough permissions (9)"，例如 `/user add` 需要 `policy` 策略，而 `/tool sniffer` 需要 `sniff` 策略。`/system backup save`、`/system reset-configuration` 和 `/file copy` 会以相同错误失败。`/export` 可用：它会在输出中返回客户端的配置，因此 `run-script` 可以从整个设备群收集配置导出。敏感值不可读取：`/export` 会省略它们，`/export show-sensitive` 也不会显示它们的值，而 `get` 会将它们显示为 `*`。它们仍然可以被设置，例如 PPP secret 密码。

由 `run-script` 创建的脚本和调度器条目会以相同的四个策略保存，显示为 `policy=reboot,read,write,test`。`owner` 是系统用户（`*sys`），而不是控制器用户。策略集无法在客户端上更改：尝试授予更宽策略的脚本，其 `policy` 会被缩减为这四个策略。下表显示了在 `run-script` 下每个策略可以执行的操作：

| 策略 | 示例命令 | 结果 |
| --- | --- | --- |
| `read` | `:put [/system identity get name]` | 正常，返回值。 |
| `read` | `/export` | 正常，返回不含敏感值的配置。 |
| `write` | `/file add contents=x`, `/ip service set telnet port=2323`, `/tool romon set enabled=no` | 正常，配置已更改。 |
| `write` | `/system script add`, `/system scheduler add` | 正常，条目以 `policy=reboot,read,write,test` 保存。 |
| `write` | `/ppp secret add name=test password=abc` | 正常，即使缺少 `sensitive` 策略，密码也会被设置。 |
| `test` | `/ping`, `/tool traceroute` | 正常 |
| `reboot` | `/system reboot` | 正常，客户端会重启并重新连接到服务器。 |
| `policy` | `/user add`, `/user group add` | 失败并提示 "not enough permissions (9)"。 |
| `sniff` | `/tool sniffer quick` | 失败并提示 "not enough permissions (9)"。 |
| `sensitive` | `:put [/ppp secret get ... password]` | 该值显示为 `*`。 |

#### CMR 所做更改的日志记录 {#logging-of-changes-made-by-cmr}

CMR 在客户端上所做的更改会记录在客户端日志中。消息的 `by` 字段表明该更改来自 CMR，并包含用户和服务器地址：`cmr:<user>@<address>`，其中 `<user>` 是在 CMR 服务器上运行该命令的用户，`<address>` 是客户端所见的服务器地址。当 CMR 未提供用户时，该字段为 `cmr@<address>`。如果服务器地址不可用，则仅显示已知部分，例如 `cmr:<user>`，或者当也没有用户时仅显示 `cmr`。例如：

```ros
system,info device added by cmr:admin@192.168.1.2 (*E = /interface bridge add comment=cmr-perm name=cmrperm-br)
```

## Dashboard {#dashboard}

[`/cmr/device/dashboard`](../cli-reference/cmr/device/dashboard.md) 命令会打开所选设备的实时视图：有多少台已连接、CPU、内存和磁盘使用率、接口状态、流量吞吐量，以及接入点及其站点。该视图每隔几秒重复一次，直到你停止它。按 `m`、`l`、`a`、`p`、`w` 或 `s` 可在主视图、警报、设备、端口、WiFi 和资源视图之间切换，按 `D` 可将当前视图写入 `console-dump.txt` 文件，按 <kbd>Control</kbd>+<kbd>Z</kbd> 暂停它，按 `Q` 退出。在设备视图中，`m` 返回主视图：

```ros
[admin@MikroTik] > /cmr/device/dashboard labels=Group2
DEVICES          TOTAL  PAIRED  ONLINE  RESOURCES                MIN  AVG  MAX
                 3      3       3       CPU        ------------  0    0    1
                                        Memory     =====-------  21   46   85
                                        HDD        ==----------  15   23   29

NETWORK INTERFACES -------------------  BANDWIDTH ----------------------------
16     Ethernet                                             TX        RX
16     Enabled   =====================  Total               336.9KiB  194.1KiB
8      Running   =============--------  Uplink              37.9KiB   78.0KiB
7      Wifi                             Ethernet            169.3KiB  173.0KiB
7      Enabled   =====================  Wifi                167.5KiB  21.1KiB

ACCESS POINTS ------------------------  STATIONS -----------------------------
7      Total                            18     Total
3      Slave                            16     2.4GHz  =====================--
7      Running  ======================  2      5GHz    ==---------------------
3      2.4GHz   ============----------  17     N       ======================-
3      5GHz     ============----------  1      OFDM    -----------------------
1      6GHz     ====------------------  18     WPA2    =======================
2      BE       ========--------------
2      AX       ========--------------
3      N        ============----------
```

`labels` 参数接受与 CMR 其余部分相同的标签语法，因此 `labels=Group2` 显示带有 `Group2` 标签的设备，而 `labels=house,-ap` 显示带有 `house` 标签但排除带有 `ap` 标签的设备。[`/cmr/device/dashboard`](../cli-reference/cmr/device/dashboard.md) CLI 参考列出了其所有参数。

WebFig GUI 中会显示相同的实时视图：

<center>![](/img/30d86cdd185e9d5c.webp)</center>

<center>**The image shows the CMR dashboard in the WebFig GUI.**</center>

### 仪表板分区 {#dashboard-sections}

仪表板分为八个部分：

- **设备** - 已配对设备和在线设备的数量。只有当前已连接的已配对设备才计为在线，因此离线的已配对设备，或尚未配对的设备，不会显示为在线。
- **资源** - 每台设备当前的 CPU、内存和磁盘使用率。
- **带宽** - 设备流量吞吐量的实时图表。绿色区域是上传带宽，红色/棕色区域是下载带宽，绘制最近几分钟的数据。摘要显示当前、平均和最大下载与上传速率。
- **活动警报** - 当前已触发的警报规则，以及每个警报在多少台设备上处于活动状态。
- **可用更新** - 在其升级通道上有不同 RouterOS 版本可用的设备，这些版本由其升级规则提供。
- **流量** - 来自应用流量分类器的设备应用流量表，涵盖最近一小时。每一行是一个应用，包含其名称、下载量及占总量的份额（以进度条显示），以及上传量及其份额。
- **接入点** - 设备上运行的接入点数量。WiFi 频段选择器（2.4、5 或 6 GHz）会筛选视图，柱状图显示每个信道上运行多少个接入点。
- **站点** - 连接到这些接入点的客户端站点数量。WiFi 频段选择器会像对接入点那样筛选视图，柱状图显示每个信道上连接了多少个站点。

## 设备群升级 {#fleet-upgrades}

CMR 通过 [`/cmr/upgrade`](../cli-reference/cmr/upgrade.md) 菜单中的升级规则管理整个设备群的软件升级。升级规则通过 `labels` 选择其覆盖的设备、设定升级运行的时间，并定义要安装的通道或版本。

### 升级规则 {#upgrade-rules}

规则通过 `labels` 选择其覆盖的设备，这与 CMR 各处使用的标签相同。如果省略 `labels`，则规则覆盖所有已连接的设备（`labels=all`）。普通列表将标签以 OR 组合，而以 `+` 或 `-` 开头的列表元素则以 AND 和 AND NOT 组合它们，例如 `labels=all,-core`。

例如，此规则创建一个每晚将所有已连接设备升级到最新 `stable` 版本的升级任务：

```ros
[admin@MikroTik] > /cmr/upgrade/add name=nightly labels=all channel=stable schedule-time="00:00:00" strategy=sequential fail-policy=continue
```

每个参数设置规则的一个属性：

- `name=nightly` 为规则命名。该名称会显示在规则列表中，并用于选择该规则以立即运行。
- `labels=all` 选择所有已连接的设备。显式给出 `all` 与省略 `labels` 相同。
- `channel=stable` 选择升级通道：`long-term`、`stable`、`testing` 或 `development`。要固定到特定版本，可直接将版本设为通道值，例如 `channel=7.24.4`。
- `strategy=sequential` 依次升级设备，并等待每台设备完成。另一种选择是 `parallel`，它会同时升级所有覆盖的设备。
- `fail-policy=continue` 跳过失败的设备并继续处理其余设备。未设置 `fail-policy` 时，规则使用 `stop`。第三种失败策略是 `continue-order`。
- `schedule-time="00:00:00"` 每天午夜触发此规则。`schedule-time` 是一个时间，可附带可选的工作日，例如 `14:00:00`（每天 14:00）或 `00:00:00@sat`（每周六午夜）。多个时间用逗号分隔，例如 `00:00:00@sat,00:00:00@sun`。工作日用 `@` 分隔：如果使用空格，例如 `"14:00 sat"`，工作日会被丢弃，规则每天运行。

<center>![](/img/0d8b9ffebfe5c1f9.webp)</center>

<center>**The image shows the nightly rule as configured in the WinBox GUI.**</center>

每周规则以相同方式创建。例如，此规则每周六 14:00 升级两个标签组，并在首次失败时停止：

```ros
[admin@MikroTik] > /cmr/upgrade/add name=weekly labels=Group1,Group2 channel=stable schedule-time="14:00:00@sat" strategy=parallel fail-policy=stop order=Group1,Group2
```

- `schedule-time="14:00:00@sat"` 每周六 14:00 启动升级。工作日位于 `@` 之后，可以是 `sun`、`mon`、`tue`、`wed`、`thu`、`fri` 或 `sat`。
- `order=Group1,Group2` 设置标签组及其处理顺序。
- `fail-policy=stop` 在设备失败时停止整个升级。在此示例中，`Group1` 中的设备失败会停止升级，`Group2` 不会被升级。

<center>![](/img/8bea2f1401468823.webp)</center>

<center>**The image shows the weekly rule as configured in the WinBox GUI.**</center>

:::info
规则的顺序决定优先级。当多条规则选择重叠的设备时（例如一条 `labels=all` 规则和带有特定标签的规则），列表中第一条匹配某台设备的规则会认领该设备。因此，放在首位的 `labels=all` 规则会覆盖每台设备，而后续规则在 [`/cmr/upgrade/show-devices`](../cli-reference/cmr/upgrade/show-devices.md) 中不会显示任何设备。当每个标签组都需要自己的规则时，请将特定标签规则列在 `labels=all` 规则之前，并使用 `show-devices` 验证每台设备的分配情况。
:::

启用服务器后，规则列表包含一个名为 `default` 的动态规则（标志 `D`、`labels=all`、`channel=stable`）。它列在你自己的规则之后，并覆盖没有其他规则匹配的设备。该规则没有调度：它设置用于检查这些设备的 `U` 标志和 `available-version` 的通道。如果你的设备运行测试版或开发版构建，请创建覆盖它们的规则，以免向它们提供 `stable` 作为升级。

要更改规则的位置，请使用 [`move`](../cli-reference/cmr/upgrade.md)，例如 `/cmr/upgrade/move [find name=weekly] 0`。目前，`add` 的 `place-before` 参数会将新规则添加到列表末尾。

### 运行升级 {#running-an-upgrade}

创建规则后，会根据其 `schedule-time` 调度一个作业。你无需等待调度时间即可开始升级：

- [`/cmr/upgrade/trigger`](../cli-reference/cmr/upgrade/trigger.md) - 立即启动所选规则的作业，并提前升级其覆盖的设备，而无需等待 `schedule-time`。
- [`/cmr/upgrade/job/run-next`](../cli-reference/cmr/upgrade/job/run-next.md) - 立即运行已调度作业。对于升级规则的作业，原已调度作业仍保留在计划中，而此次运行会作为新作业添加。使用 `/cmr/device/upgrade` 调度的作业没有需要保留的调度，因此 `run-next` 会自行启动该作业。
- [`/cmr/device/upgrade`](../cli-reference/cmr/device/upgrade.md) - 无论其规则的调度如何，升级选定设备：立即升级，或在 `schedule-time` 的下一次出现时升级。未指定 `channel` 时，每台设备都在其自己的升级通道上升级，即 `/cmr/device` 中显示的 `channel` 值。

在控制台上，`/cmr/device/upgrade` 会显示其启动的作业中的设备及其状态，直到你按下 <kbd>Control</kbd>+<kbd>C</kbd> 或 `duration` 中给定的时间结束。停止输出不会停止作业，作业会在服务器上继续运行。之后可使用 [`/cmr/upgrade/job/show-devices`](../cli-reference/cmr/upgrade/job/show-devices.md) 跟踪它。

一次只能运行一个升级作业。当另一个作业正在进行时触发第二个作业，会将新作业置于 `queued` 状态，直到正在运行的作业完成。使用 [`/cmr/upgrade/version-check`](../cli-reference/cmr/upgrade/version-check.md) 查看你的升级规则中配置的通道可用的最新版本。

### 升级源 {#upgrade-sources}

服务器会检查 MikroTik 更新服务器，以获取升级规则所使用的每个通道的最新版本。[`/cmr/upgrade/version-check`](../cli-reference/cmr/upgrade/version-check.md) 会显示结果，而已连接的设备会在 [`/cmr/device`](../cli-reference/cmr/device.md) 菜单的只读参数 `available-version` 中显示最新可用版本。[`/cmr`](../cli-reference/cmr.md) 菜单中的 `upgrade-check-interval` 设置控制该检查运行的频率。

当执行升级且所需版本在本地尚不可用时，服务器会下载软件包文件，将其存储起来并发送给设备；而定期的版本检查只查询有哪些版本可用。[`/cmr`](../cli-reference/cmr.md) 菜单中包含缓存设置：`packages-cache-type` 选择下载的软件包是存储在服务器的存储上（`directory`，即 `packages-directory` 下的 `cmrcache` 子目录）还是存储在 RAM 中（`memory`），`packages-cache-limit` 以兆字节为单位设置缓存的最大大小。当缓存已满时，服务器会清除较旧的条目，为新下载的软件包腾出空间。

要让服务器提供你自己的软件包，请将 `.npk` 文件放在服务器文件系统上的某个目录中，并将 `packages-directory` 设置为该目录。软件包是逐个解析的：所需版本的软件包如果已在该目录中，就直接从那里提供，无需重新下载，只有缺失的软件包才会被下载到缓存中。

使用软件包目录可以安装更新服务器不提供的版本。将每个架构的软件包以及所覆盖设备已安装的每个软件包放入该目录，将其选为 `packages-directory`，并将版本设置为通道。例如，对于具有 `arm` 架构和 `wifi-qcom` 软件包的设备：

```ros
[admin@MikroTik] > /file add name=cmr-packages type=directory
```

将 `routeros-<version>-arm.npk` 和 `wifi-qcom-<version>-arm.npk` 上传到 `cmr-packages`，例如使用 SFTP，然后选择该目录并升级设备：

```ros
[admin@MikroTik] > /cmr set packages-directory=cmr-packages/
[admin@MikroTik] > /cmr/device/upgrade labels=testgroup channel=7.24.4
```

`packages-directory` 的值从现有目录中选择，并以 `/` 结尾。目前，更改 `packages-directory` 会重启服务器上的 CMR，所有客户端都会重新连接，因此请在客户端在 `/cmr/device` 中重新显示为已连接后再启动升级任务。

如果在选中之后该目录被删除，`/cmr print` 仍会显示它且不会给出警告，并且服务器会将下载的软件包保留在 RAM 中。使用相同的名称重新创建该目录，例如 `/file add name=cmr-packages type=directory`，并将软件包放入其中。该设置不会改变，因此 CMR 不会重启。

在将一组设备升级到固定版本之前，请先升级该组中的一台设备。如果目录中缺少某个软件包，该任务会让设备保持在 `pending` 状态并显示错误 **no upgrade available**，同时不会重启它。

:::warning
即使设置为通道的版本早于已安装版本，也会安装该版本，因此固定通道可能会降级设备。
:::

### 作业状态与结果 {#job-states-and-results}

作业列在 [`/cmr/upgrade/job`](../cli-reference/cmr/upgrade/job.md) 菜单中，表示一次升级运行。作业会经历 `scheduled`、`queued`、`waiting devices`、`version check`、`processing` 这些状态，最后变为 `done` 或 `cancelled`。`success` 计数器为 `upgraded/total`，例如 `6/7`。由升级规则启动的作业会带有 `R` 标志。

由 `/cmr/device/upgrade` 为按编号选择的设备启动的作业没有 `labels`，并且仅当指定了版本时才显示 `channel`。其设备由 [`/cmr/upgrade/job/show-devices`](../cli-reference/cmr/upgrade/job/show-devices.md) 列出。

:::note
`success` 计数器只统计任务实际升级的设备。任务无法升级的受覆盖设备会保持 `pending` 状态并带有错误：当其已处于目标版本或已禁用，或者固定版本的软件包既不在 `packages-directory` 中也不在更新服务器上时，为 **no upgrade available**，而当其未连接到服务器时，为 **disconnected**。

此类设备会被计为失败。使用 `fail-policy=stop` 时，它会在任何设备升级之前停止任务，其他设备会保持 `pending` 状态，并带有 **skipped by fail-policy**。请使用 `fail-policy=continue`，或者只选择已连接且有可用升级的设备，例如通过 `/cmr/device/upgrade`。
:::

当服务器自行升级时，其作业以 `done` 结束，结果为 `0/1`，并且 `show-devices` 会让服务器保持 `rebooting` 状态，即使升级成功也是如此：服务器会在记录结果之前重启。请在 `/system/resource` 中或 `/cmr/device` 中服务器自身条目的 `version` 中检查已安装版本。目前，此类作业的 `start-time` 以 UTC 显示。

可以通过移除作业来取消它。使用 [`/cmr/upgrade/job/remove`](../cli-reference/cmr/upgrade/job.md) 移除作业。移除已调度或已排队的作业会将其标记为 `cancelled`，且该作业仍保留在列表中。移除处理中的作业会停止此次运行，并将剩余设备标记为 `cancelled`。中断的安装仍有可能在设备重启后完成。移除 `cancelled` 作业会将其从列表中删除。

### 策略与故障处理 {#strategy-and-failure-handling}

`strategy` 控制覆盖的设备如何升级。可选的 `order` 会将覆盖的设备拆分为标签组，并定义处理这些组的顺序。

- **Parallel** - 同时升级所有覆盖范围内的设备。与 `order` 结合使用时，同一标签组内的设备一起升级，各组按照 `order` 给出的顺序依次处理。
- **Sequential** - 逐个升级设备，并等待每个设备完成。与 `order` 结合使用时，`order` 中的各组依次处理，组内设备则一次升级一个。

`fail-policy` 控制当设备失败时会发生什么：

- `continue` - 跳过失败的设备，继续处理其余设备。
- `stop` - 在第一次失败时停止整个升级。任务不会继续处理剩余设备，也不会继续处理 `order` 中的下一个标签组。这是默认值。
- `continue-order` - 跳过失败的设备，并继续处理 `order` 中的下一个标签组。需要 `order`，它列出要逐组处理的标签。没有它时，`continue-order` 不被接受。失败设备所在组的处理方式取决于 `strategy`：
  - **sequential** - 跳过该组的其余部分（尚未启动的设备保持 `pending`），任务继续处理 `order` 中的下一组。
  - **parallel** - 只放弃失败的设备。同一组中已在进行的设备会完成，任务继续处理 `order` 中的下一组。

#### 按网络顺序升级 {#upgrade-in-network-order}

设备在升级期间会重启。重启时，通过该设备连接到服务器的设备也会失去与服务器的连接。如果先升级交换机或网关，而后升级其背后的设备，这些设备会在任务中途断开。服务器不会根据网络拓扑推导顺序：顺序由 `order` 定义。

根据设备在网络中的位置为其设置标签，并在 `order` 中按从网络边缘到服务器的方向列出这些标签。例如，接入点标签为 `ap`，它们连接的交换机标签为 `switch`，网关标签为 `gw`：

```ros
[admin@MikroTik] > /cmr/upgrade/add name=fleet labels=ap,switch,gw order=ap,switch,gw channel=stable strategy=sequential fail-policy=stop
```

- `order=ap,switch,gw` 先升级接入点，然后升级交换机，最后升级网关。
- `strategy=sequential` 一次升级一个设备，因此网络一次只有一部分会重启。
- `fail-policy=stop` 在设备失败时停止任务，且发生在通过该设备连接的设备被升级之前。覆盖范围内已是最新状态或未连接的设备也会计为失败，正如“任务状态和结果”部分中的注释所述。

在设备群的任务完成后，再升级 CMR 服务器本身，可使用其自身的规则或使用 `/cmr/device/upgrade`。

### 备注 {#notes}

- 删除升级规则不会取消其已启动或已排队的作业。使用 `/cmr/upgrade/job/remove` 显式取消作业。
- [`/cmr/upgrade/show-devices`](../cli-reference/cmr/upgrade/show-devices.md) 和 [`/cmr/upgrade/job/show-devices`](../cli-reference/cmr/upgrade/job/show-devices.md) 都会列出规则或作业的每设备覆盖范围和状态。它们会显示每设备备注，例如前几节中描述的“upgrade available”和“no upgrade available”状态。
- 示例告警规则会使用 `cmr` 主题将每次设备升级的结果写入日志，例如 `<device> has successfully upgraded to version <version>` 或 `<device> failed to upgrade from <version> to <version>, error: <reason>`，并在设备的升级通道为其提供新版本时记录 `<device> has new version available`。告警规则的“示例规则”部分描述了它们。

## 告警规则 {#alert-rules}

告警规则定义条件（何时触发）和操作（要做什么）：写入日志消息、运行 RouterOS 脚本、发送 HTTP 请求，或组合这些操作。规则通过 `labels` 选择设备，并在 CMR 服务器上运行其操作。在 [`/cmr/alert`](../cli-reference/cmr/alert.md) 菜单中管理规则。

配置的条件决定规则是**状态告警**还是**事件告警**。状态告警在其条件满足期间保持活动状态。事件告警会为每个匹配的发生执行其操作，并且从不保持活动状态。

| 行为 | 状态告警 | 事件告警 |
| --- | --- | --- |
| 表示 | 一个持续中的状况，例如高 CPU 使用率。 | 已经发生的事情，例如匹配的日志消息。 |
| 评估 | 当新的设备数据到达或定时器运行时。 | 当事件发生时。 |
| 操作运行 | 在告警变为活动状态时运行一次；仅在其清除并再次变为活动状态后再次运行。 | 对每个匹配的发生立即运行。 |
| 活动告警和仪表板计数器 | 活动期间保持可见并计入计数。 | 不会作为活动告警出现，也不会加入活动告警计数器。 |
| 每条规则的条件 | 多个状态条件，使用逻辑 AND 组合。 | 最多一个事件条件。 |

### 示例规则 {#example-rules}

服务器附带示例规则，并用注释 `example` 标记。它们包括 CPU 使用率高于 95%、内存使用率高于 90%、升级失败和成功、可用升级、未配对设备连接以及重启的规则。每条规则都会写入一条日志消息，例如 `[device] has successfully upgraded to version [version]` 或 `[device] rebooted`，因此无需进一步配置，日志就会记录这些事件。可以像自己的规则一样更改、禁用或删除它们。

`upgrade available` 示例规则使用 `[upgrade-version]` 写入其消息，而只有升级完成事件会填充该占位符，因此记录的日志消息以 `unknown` 结尾。在你自己的规则中，使用 `[available-version]` 表示提供的版本。

### 创建告警规则 {#create-an-alert-rule}

规则至少需要一个条件和一个动作。例如，创建一个状态告警，当任意设备的 CPU 负载升至 95% 以上时记录一条警告：

```ros
[admin@MikroTik] > /cmr/alert/add name=cpu-load labels=all cpu-above=95 action.log="[device] CPU usage is above 95% ([cpu-usage]%)" action.log-topics=cmr,warning severity=high category=performance
[admin@MikroTik] > /cmr/alert/print where name=cpu-load
11  name="cpu-load" labels=all cpu-above=95
    action.log="[device] CPU usage is above 95% ([cpu-usage]%)"
    .log-topics=cmr,warning severity=high category=performance devices=9
    devices-on=0 fired=0 action-failures=0
```

`devices` 值统计由规则的 `labels` 选中的设备数量。`devices-on` 值统计具有活动状态告警的设备数量，`fired` 统计规则已触发的次数。此示例在设备开始满足 CPU 条件时记录一次日志。当条件持续成立时，该设备仍会计入 `devices-on`，但不会重复记录日志消息。

### Conditions {#conditions}

规则通过 `labels` 选择其适用的设备，这些 labels 与 CMR 中使用的相同。[`/cmr/alert`](../cli-reference/cmr/alert.md) CLI 参考列出了每个条件和参数。

#### 状态告警 {#state-alerts}

状态条件描述持续为真或为假的情况。当新的设备数据到达时（例如仪表板统计信息或健康读数），或在定时器触发时，CMR 会重新评估这些条件。多个状态条件可以组合在一个规则中：仅当所有条件都匹配时，告警才处于活动状态（逻辑与）。例如，`hdd-above=80 hdd-below=95` 匹配从 80% 到 95%（不包括 95%）的磁盘使用率。对于二选一的情况，请创建两个规则。

动作在告警变为活动状态时运行一次。随后，告警会保持可见并在仪表板中计数，直到其条件不再匹配。仅当告警清除并再次变为活动状态后，动作才会再次运行。例如，CPU 规则的活动告警计数为五，表示有五台设备满足 CPU 条件，而不是已发生五次 CPU 事件。

状态条件包括：

- **使用阈值** - `cpu-above` 和 `cpu-below`、`mem-above` 和 `mem-below`，以及 `hdd-above` 和 `hdd-below` 将 CPU、RAM 或磁盘使用率与某个百分比进行比较。
- **健康传感器** - `health-above` 和 `health-below` 将健康传感器与某个值进行比较。`health-value` 指定传感器名称，并与 `/system/health/print` 中的名称匹配（例如 `cpu-temperature`）。规则只会在报告该传感器的设备上比较该传感器；没有该传感器的设备会被忽略。等于 `above` 条件阈值的值也会触发规则；`below` 条件仅对严格低于阈值的值触发。
- **可用性** - `connected` 匹配设备是已连接还是已断开。`disconnected-more-than` 匹配断开时间超过给定时间的设备。
- **可用升级** - `upgrade-available` 在设备有更新的 RouterOS 版本可用时匹配。

#### 事件告警 {#event-alerts}

事件条件描述单次发生的事件。规则会对每个匹配的事件立即执行其操作。事件告警从不保持激活状态，因此它们不会在仪表板中显示为活动告警，也不会计入 `devices-on`。一条规则最多只能包含一个事件条件。

例如，一条匹配的日志消息可以使 CMR 写入一条日志条目、运行脚本或发送 HTTP 请求。该消息不会创建需要稍后清除的持久告警状态。另一条匹配的消息会再次运行这些操作。

事件条件包括：

- **接口** - `interface-change` 在接口变为 `running` 或 `not-running`，或者被 `added` 或 `removed` 时触发。可选地通过 `interface-type`（`ethernet`、`wifi` 或 `bridge`）进行过滤。目前，在接入点上禁用或启用 CAPsMAN 管理的 WiFi 接口不会触发 `interface-type=wifi` 规则，因为该接口会保持运行状态。其 `running` 和 `not-running` 变化（例如接入点重启期间）会触发该规则。
- **设备升级** - `upgrade-done` 在设备升级完成时触发。可选择成功的升级、失败的升级，或两者都选。
- **升级任务** - `upgrade-job-done` 在多设备升级任务整体完成时触发。可选择成功的任务、失败的任务，或两者都选。
- **重启** - `rebooted` 在设备重启时触发，包括重启是升级的一部分或来自 `reboot` 命令的情况。
- **未配对的连接** - `unpaired-device-connected` 在未配对设备连接时触发。
- **日志行** - `log-topics` 和 `log-regex` 定义一个日志消息事件条件，匹配所配置的主题和消息正则表达式。CMR 会自动指示设备转发匹配的日志消息。转发的消息也会出现在服务器的日志中，其自身的主题中会添加 `cmrclnt` 主题，例如 `cmrclnt,script,info`。匹配的值可通过 `[message]` 和 `[message-topics]` 获取。

### 设备与系统范围 {#device-and-system-scope}

告警范围与状态/事件之分是相互独立的：

- **设备警报** 适用于每个受管设备。大多数警报具有设备范围。每个设备独立跟踪状态警报，统计信息会区分规则选择了多少设备，以及有多少设备激活了该警报。设备事件（例如 `upgrade-done`）会为触发它们的单个设备运行操作。
- **系统警报** 与 CMR 服务器相关，而不是与单个受管设备相关。例如，`upgrade-job-done` 是系统事件警报：它报告整个多设备升级作业的结果，并且没有单个设备上下文。

### 操作 {#actions}

当规则触发时，它会运行已设置的每个操作：

- `action.log` 搭配可选的 `action.log-prefix` 和 `action.log-topics`，会向 CMR 日志写入一条消息。默认主题为 `cmr,info`；对于日志行条件，则为 `cmr,warning`。对于日志行条件，消息以发送该日志行的设备开头，格式为 `identity|board|address:`，因此仅 `[message]` 就足以作为消息文本，例如 `action.log="[message]"`。
- `action.script` 会运行一个指定的系统脚本，`action.script-vars` 会向它提供触发该警报的设备所对应的值。脚本必须允许自身以缩减后的权限运行（`dont-require-permissions=yes`），否则该操作会记录“not enough permissions”。
- `action.http-url`、`action.http-method`、`action.http-body` 和 `action.http-headers` 会调用 HTTP 或 HTTPS webhook。请求体中的占位符会按设备替换。该调用本身不会设置 `Content-Type` 标头，因此当接收方需要时，请通过 `action.http-headers` 添加一个（例如为 JSON 正文使用 `Content-Type: application/json`）。失败的调用会以 `warning` 写入 `cmr` 主题，并计入 `action-failures`，例如 `alert "name" HTTP action failed: request failed: Connection refused`。当服务器的设备模式不允许 `fetch` 时，该 webhook 也能正常工作。

### 操作文本中的变量 {#variables-in-action-text}

操作文本支持 `[variable]` 展开，例如 `[identity]`、`[severity]` 和 `[alert-name]`。占位符会替换为来自警报及其设备或事件上下文的值。当名称列在 `action.script-vars` 中时，由 `action.script` 触发的脚本也可使用相同的值（例如 `action.script-vars="device,version"` 会在脚本中设置 `$device` 和 `$version`）。可用变量取决于触发警报的内容。

**设备变量** 对于每个设备警报都可用，来自触发该警报的设备：

| 占位符 | 值 |
| --- | --- |
| `[device]` | 设备标识和地址（`identity@address`）。当地址未知时，仅使用标识，例如对于控制器本身。 |
| `[identity]`, `[address]`, `[board]`, `[version]` | 设备标识、地址、板卡和 RouterOS 版本。 |
| `[arch]`, `[serial]` | 设备架构和序列号。 |
| `[packages]` | 已安装软件包的逗号分隔列表。 |
| `[labels]` | 用户标签和自动标签的逗号分隔列表。 |
| `[state]` | 设备状态，例如配对状态或升级状态。对于已配对且没有进行中操作的设备，为空。 |
| `[available-version]` | 设备可用的较新 RouterOS 版本，或 `unknown`。 |
| `[upgrade-state]` | 当前升级进度或结果，或 `unknown`。 |
| `[cpu-usage]`, `[mem-usage]`, `[hdd-usage]` | CPU、RAM 和磁盘使用率（百分比），或在设备连接后上报它们之前为 `unknown`。 |
| `[<sensor>]` | 规则指定的健康传感器的当前读数，例如 `[cpu-temperature]`。 |

**事件变量** 在规则的事件条件匹配时可用：

| 占位符 | 值 |
| --- | --- |
| `[iface-name]`、`[iface-type]`、`[iface-change]` | interface-change 条件的接口名称、类型和变更（`running`、`not-running`、`added` 或 `removed`）。 |
| `[upgrade-version]`、`[upgrade-error]`、`[upgrade-state]` | 由 upgrade-finished 条件报告的版本、错误和升级最终状态。`[upgrade-error]` 是设备未升级的原因，例如 `no upgrade available`，升级成功后将为空。`[upgrade-state]` 是设备在作业中的最终状态，例如 `done`，或者对于作业未升级的设备为 `pending`。 |
| `[message]`、`[message-topics]` | log-line 条件的匹配日志行的消息和主题。 |
| `[job-device-count]`、`[job-success-count]` | upgrade-job-finished 事件的总设备数和成功升级的设备数。 |
| `[job-start-time]`、`[job-end-time]`、`[job-run-time]` | 已完成作业的开始时间和结束时间，例如 `2026.10.06-14:20:36`，以及其持续时间（秒）。 |

:::note
upgrade-job-finished 事件是一个没有设备上下文的系统事件，因此上表中的设备变量对它不可用。其他事件条件会针对设备触发，设备变量可与事件变量一起使用。
:::

**告警变量**对每个告警都可用，无论是什么触发了它：

| 占位符 | 值 |
| --- | --- |
| `[alert-name]` | 配置的规则名称，或根据条件生成的名称。 |
| `[severity]`、`[category]` | 规则严重性和逗号分隔的类别。 |
| `[alert-users]` | 告警适用的设备数量。 |
| `[alert-fired-count]` | 告警已触发的次数。 |
| `[action-fail-count]` | 失败的操作执行次数。 |

不适用于某条规则的占位符会呈现为 `unknown`。值不可用的占位符会呈现为 `(empty)`，例如控制器自身的 `[address]`。

### 规则如何触发 {#how-a-rule-fires}

新建的状态告警会立即对每个已配对且已满足其条件的设备触发。当设备断开连接时，状态告警默认会保留该设备的状态；设置 `reset-on-disconnect=yes` 可在断开连接时清除状态，以便设备在重新连接后仍满足条件时再次触发该规则。状态告警仅针对已配对设备进行评估。事件告警没有需要重置的持久状态，并且会在每次匹配发生时触发，包括 `unpaired-device-connected` 的未配对连接。

当服务器上的 CMR 重启时，例如在重启或更改 `packages-directory` 之后，它会再次评估状态告警：仍然匹配的告警会重新变为活动状态并运行其操作。更改已启用的规则（即使只更改其注释）会对该规则产生相同效果：其状态告警会在匹配的设备上重新变为活动状态并运行其操作。其 `fired` 计数器会从零重新开始。

每条规则都有一个 `severity`（`critical`、`high`、`medium` 或 `low`，默认 `medium`）和一个 `category`，后者由控制器根据规则的条件分配（例如 `performance`、`availability` 或 `version`）；类别可以更改。只读值描述规则的状态：

- `devices` - 由规则标签选中的设备数量。
- `devices-on` - 具有活动状态告警的设备数量。事件发生不会增加此计数。
- `fired` - 规则触发的总次数，包括事件发生次数。
- `action-failures` - 动作失败的次数。

### 测试并检查规则 {#test-and-inspect-a-rule}

- [`test`](../cli-reference/cmr/alert/test.md) 立即运行规则的动作，并将占位符替换为 `[placeholder]` 值，以验证动作是否正常工作。目前，每次测试运行也会计入规则的 `fired` 值。
- [`show-devices`](../cli-reference/cmr/alert/show-devices.md) 列出其上规则状态告警处于活动状态的设备。事件告警从不保持活动状态，因此 `show-devices` 不会为其列出任何设备，而其 `fired` 值改为统计发生次数。
- 由 `action.log` 写入的消息会出现在路由器日志中规则所设置的主题下，因此使用 `/log/print where topics~"cmr"` 读取它们。

[`/cmr/alert`](../cli-reference/cmr/alert.md) CLI 参考详细描述了每个参数和只读值。

## 网络拓扑 {#network-topology}

[`/cmr/layout`](../cli-reference/cmr/layout.md) 菜单存储网络拓扑。拓扑由节点和链路组成：[`node`](../cli-reference/cmr/layout/node.md) 将设备或另一个布局映射到某个位置，[`link`](../cli-reference/cmr/layout/link.md) 连接两个节点。可以使用 [`rebuild-links`](../cli-reference/cmr/layout/rebuild-links.md) 从端口数据自动生成链路，并可以使用 [`add-devices`](../cli-reference/cmr/layout/add-devices.md) 批量添加设备。拓扑本身仅在 GUI 中显示。

自动链路根据 `track-topology` 从客户端获取的数据构建，因此使用 `rebuild-links` 时请保持 `track-topology=yes`。`rebuild-links` 仅在直接连接的设备之间创建链路。将其他连接（例如通过 VPN 或不是 CMR 客户端的交换机建立的连接）作为你自己的链路添加。自动链路会显示两端设备上已连接的端口及其流量计数器和 PoE 状态。一个节点可以表示另一个布局（`target-layout`），因此概览布局可以显示并链接各自包含自己设备的站点或楼宇布局。节点名称在所有布局中必须唯一。

例如，为一个站点创建布局，添加带有 `office` 标签的设备，并生成它们之间的链路：

```ros
[admin@MikroTik] > /cmr/layout/add name=Office
[admin@MikroTik] > /cmr/layout/add-devices [find name=Office] labels=office
[admin@MikroTik] > /cmr/layout/rebuild-links [find name=Office]
```

下方截图中的拓扑存储为一个布局，每个设备对应一个节点，相连的设备之间有一条链接：

<center>![](/img/3b99d765d47a187e.webp)</center>
<center>**The image shows an example network topology in the WebFig GUI.**</center>

```ros
[admin@MikroTik] > /cmr/layout/print detail
 0  name="Example" scale=110 file="Floor_0.png"
 1  name="1_floor" file=""

[admin@MikroTik] > /cmr/layout/node/print detail
 0  name="RB5009UPr" layout=Example device=RB5009UPr x=300 y=25
 1  name="CRS354" layout=Example device=CRS354@192.168.255.2 x=308 y=99
 2  name="hAP" layout=Example device=hAP@192.168.1.96 x=285 y=-113
 3  name="hAP-1" layout=Example device=hAP@192.168.2.92 x=636 y=-104
 4  name="cAP ac 1" layout=Example device=cAP ac 1@192.168.2.91 x=628 y=227
 5  name="To_Floor_1" layout=Example target-layout=1_floor x=295 y=159

[admin@MikroTik] > /cmr/layout/link/print
 #   LAYOUT   NODE1      NODE2
 0   Example  CRS354     RB5009UPr
 1   Example  RB5009UPr  hAP
 2   Example  CRS354     hAP-1
 3   Example  CRS354     cAP ac 1
 4   Example  CRS354     To_Floor_1
```

布局在 `file` 中存储其名称、背景图片的 `scale` 以及图片本身。节点在布局中要么使用 `device` 放置设备（例如 `RB5009UPr` 或 `cAP ac 1@192.168.2.91`），要么使用 `target-layout` 放置另一个布局；`device` 和 `target-layout` 互斥。上方的 `To_Floor_1` 节点会打开示例中的 `1_floor` 布局，因此概览布局可以显示并链接整个站点或建筑的布局。

:::info
在 GUI 中，右键单击拓扑图中的空白位置以创建节点：

- 设备节点，通过选择一个设备来创建，以及
- 布局节点，通过选择另一个布局来创建。

右键单击现有节点以创建到另一个节点的链路。也可以在 CLI 中使用 `add`、`node` 和 `link` 命令完成相同操作。
:::

链接连接布局的两个节点。由 [`rebuild-links`](../cli-reference/cmr/layout/rebuild-links.md) 创建的链接还会显示两台设备上的连接端口及其流量计数器和 PoE 状态：

```ros
[admin@MikroTik] > /cmr/layout/link/print detail where layout=Example
 0  layout=Example node1=CRS354 node2=RB5009UPr
     links=*ether47(poe=waiting-for-load,tx=520,rx=0)--
        *ether2(poe=waiting-for-load,tx=132.0KiB,rx=160.9KiB),
        ether49(,tx=913.0KiB,rx=30.8KiB)--
        ether1(poe=waiting-for-load,tx=350.7KiB,rx=67.5KiB)
 1  layout=Example node1=RB5009UPr node2=hAP
     links=*ether6(poe=powered-on,tx=0,rx=0)--*ether1(,tx=0,rx=0)
```

这里，`CRS354` 上的 `ether2` 连接到 `RB5009UPr` 上的 `ether1`，并且 `ether6` 向 `hAP` 上的 `ether1` 提供 PoE 供电。端口名前的 `*` 表示两个端口之间的直接物理链接；`poe=powered-on` 和 `poe=waiting-for-load` 显示每一侧的 PoE 状态，`tx`/`rx` 显示流量计数器。仅连接两个布局的链接（例如 `CRS354` 与 `To_Floor_1` 之间的链接）不携带端口。

节点坐标相对于布局中心，因此 `x=0, y=0` 标记中心，并且允许负值。`x` 向右增大，`y` 向下增大，因此较小的 `y` 会将节点放置在图上更高的位置：在上方截图中，`y=-113` 的节点靠近顶部，而 `y=227` 的节点位于底部。`print` 输出将坐标显示为带符号数字，例如 `y=-113`。

## 应用流量 {#application-traffic}

CMR 可以从选定的设备收集应用流量统计信息。在 [`/cmr`](../cli-reference/cmr.md) 菜单中使用 `apptraffic-devices` 设置按标签选择设备，该设置默认选择带有 `gateway` 标签的设备；随后服务器会在选定的设备上启用应用流量分类器（`/tool/apptraffic`）：

```ros
[admin@MikroTik] > /cmr set apptraffic-devices=gateway
```

分类器只能看到设备路由的流量。一个接入点如果在桥接快速路径中桥接其客户端的流量，则只能看到自己的流量，例如其 DNS 查询和管理会话。请选择路由网络流量的路由器，例如网关，以查看客户端的应用。

统计信息在 GUI 的 **CMR > Traffic** 下按应用或按类别显示，包含最后一分钟、小时、天和周的流入和流出流量。CLI 视图（[`/cmr/device/apptraffic`](../cli-reference/cmr/device/apptraffic.md)）列出每个检测到的应用及其最后一分钟、小时、天和周的流量。较窄的控制台会省略不适合显示的列。

分类器在 **mmips**、**smips** 和 **powerpc** 架构的设备上不可用。

## WiFi 配置 {#wifi-configuration}

[`/cmr/wifi`](../cli-reference/cmr/wifi.md) 菜单定义设备群的 WiFi 网络，[`/cmr/wifi/radio`](../cli-reference/cmr/wifi/radio.md) 菜单定义射频配置。项会应用到与其 `labels` 匹配的设备，这与升级和告警规则使用的标签选择相同。参数延续 [`/interface/wifi`](../wireless/wifi/index.md) 配置：网络项包含连接性和 `security` 设置，射频项包含 `configuration` 和 `channel` 设置。项没有名称；`labels` 选择目标设备，`numbers` 选择要编辑的项。

### 定义 WiFi 网络 {#define-a-wifi-network}

为带有 `Group2` 标签的设备创建一个网络，该网络广播 SSID `Office`，使用 WPA2 和 `ccmp` 密码套件进行认证，并用 VLAN 10 标记客户端流量：

```ros
[admin@MikroTik] > /cmr/wifi/add labels=Group2 ssid=Office vlan-id=10 security.authentication-types=wpa2-psk security.encryption=ccmp security.passphrase="office-passphrase" comment=office-wifi
```

网络会出现在列表中。组的设置带有带点的名称。在 `print` 输出中，组名只写一次，该组的其余值则以带前导点的形式写出：

```ros
[admin@MikroTik] > /cmr/wifi/print
0  ;;; office-wifi
   labels=Group2 ssid="Office" security.encryption=ccmp
   .authentication-types=wpa2-psk vlan-id=10
```

{/* Screenshot placeholder — add `../img/cmr_wifi_network.webp` when the WinBox screenshot is available:
<center>![](../../../../../docs/management-tools/img/cmr_wifi_network.webp)</center>
<center>**该图显示在 WinBox GUI 中配置的 WiFi 网络。**</center>

*/}

网络的参数与 [`/interface/wifi`](../wireless/wifi/index.md) 的网络参数相对应：

- `labels` - 应用该网络的设备。
- `ssid` - 向客户端广播的网络名称。
- `mode` - 运行模式：`ap`、`station`、`station-bridge` 或 `station-pseudobridge`。
- `vlan-id` - 客户端流量所标记的 VLAN。
- `security.authentication-types` - 认证方式，例如 `wpa2-psk`、`wpa3-psk` 或 `owe`。
- `security.encryption` - 允许的加密算法，例如 `ccmp` 或 `gcmp`。
- `security.passphrase` - 个人认证类型所用的网络密码。passphrase 是敏感值，不会出现在 print 输出中。REST API 会将其返回给拥有 `sensitive` 策略的用户。

禁用网络可在不删除它的情况下停止应用它。已禁用的网络会标记为 `X` 标志：

```ros
[admin@MikroTik] > /cmr/wifi/set 0 disabled=yes
[admin@MikroTik] > /cmr/wifi/print
Flags: X - DISABLED
 0  X ;;; office-wifi
      labels=Group2 ssid="Office" security.encryption=ccmp
      .authentication-types=wpa2-psk vlan-id=10
```

### 配置 radio {#configure-the-radio}

[`/cmr/wifi/radio`](../cli-reference/cmr/wifi/radio.md) 菜单用于设置所选设备的 radio 参数。一个 radio 项会应用到它所选设备的每一个 radio 上，因此请用频段标签（例如 `+5ghz`）将信道设置限制在单个频段。若不加频段标签，5 GHz 频率也会被应用到 2.4 GHz radio，后者随后会因“no available channels”而保持不活动。为带有 `Group2` 标签的设备的 5 GHz radio 设置监管域、radio 链和信道：

```ros
[admin@MikroTik] > /cmr/wifi/radio/add labels=Group2,+5ghz configuration.country=Latvia configuration.chains=0,1 channel.band=5ghz-ax channel.frequency=5180 channel.width=20mhz comment=office-radio
```

```ros
[admin@MikroTik] > /cmr/wifi/radio/print
0  ;;; office-radio
   labels=Group2,+5ghz configuration.country=Latvia .chains=0,1
   channel.frequency=5180 .band=5ghz-ax .width=20mhz
```

`configuration` 和 `channel` 组与 [`/interface/wifi`](../wireless/wifi/index.md) 的 radio 参数相对应：`configuration.country` 设置监管域，`configuration.chains` 设置 radio 链，而 `channel.band`、`channel.frequency` 和 `channel.width` 设置信道选择。

[`/cmr/wifi`](../cli-reference/cmr/wifi.md) 和 [`/cmr/wifi/radio`](../cli-reference/cmr/wifi/radio.md) CLI 参考列出了这两个菜单的每个参数。

### 配置如何应用 {#how-the-configuration-is-applied}

在每台选定的设备上，WiFi 网络会作为受管条目（标志 **Y**）写入设备的 `/interface/wifi/network` 菜单，radio 项则会作为受管条目写入 `/interface/wifi/network/radio`。受管条目会应用到该项所选择的 radio：

- 没有频段标签时，网络或 radio 项会应用到所选设备的每个 radio。添加频段标签可选择某个频段的 radio：`+2ghz`、`+5ghz` 或 `+6ghz`。例如，`labels=Group2,+5ghz` 仅选择带有 `Group2` 标签的设备的 5 GHz radio。
- CMR 网络会接管其选择的 radio，并替换其现有配置，包括由 CAPsMAN 管理的 radio 和具有本地配置的 radio。没有 CMR 网络选择的 radio 会保留其配置，因此接入点的 2.4 GHz radio 可以继续处于 CAPsMAN 管理下，而其 5 GHz radio 由 CMR 配置。
- radio 项仅应用于 CMR 网络也选择的 radio。
- 在具有 WiFi 7 radio 的设备上，设备会为 CMR 网络创建 MLD 接口。
- 受管条目无法在设备上更改。请在 CMR 服务器上更改它们。

:::warning
目前，移除或禁用 CMR WiFi 网络，或在设备上禁用 CMR 客户端，都不会恢复射频的先前配置。射频会回退到与其匹配的本地 `/interface/wifi/network` 条目，当没有匹配条目时则保持禁用。必须在设备上重新设置其先前的 CAPsMAN 或每接口配置，因此在将 CMR 网络应用到接入点之前，请导出该接入点的 WiFi 配置。
:::

### 网桥和 VLAN {#bridge-and-vlan}

目前，CMR WiFi 网络无法选择网桥，因为 `/cmr/wifi` 没有 `datapath` 设置。网桥取决于网络的 `vlan-id`：

- 使用 `vlan-id` 时，WiFi 接口会添加到受管 `cmr-bridge`（与 VLAN 配置创建的是同一个网桥），并启用 VLAN 过滤，且将 `vlan-id` 作为其 PVID。
- 不使用 `vlan-id` 时，WiFi 接口不会添加到任何网桥，客户端将没有网络访问。目前，请为每个 CMR WiFi 网络设置 `vlan-id`。

`cmr-bridge` 在设备的某个端口加入它之前不会连接到网络的其余部分。使用 VLAN 配置规则将接入点的上行链路端口添加到 `cmr-bridge`，以便上行链路承载网络的 VLAN。例如，对于带有 `office-ap` 标签的接入点上 VLAN 10 的办公网络，以 `ether1` 作为上行链路：

```ros
[admin@MikroTik] > /cmr/wifi/add labels=office-ap ssid=Office vlan-id=10 security.authentication-types=wpa2-psk,wpa3-psk security.passphrase="office-passphrase"
[admin@MikroTik] > /cmr/vlan/add labels=office-ap port-labels=ether1 vlan-ids=10 role=trunk comment=ap-uplink
```

交换机端口和上联链路另一端的路由器必须携带带标签的 VLAN 10。路由器为该网络提供 IP 地址分配、DHCP 和防火墙规则；CMR 不配置这些内容。

:::warning
当接入点的上行链路加入 `cmr-bridge` 时，它会离开该接入点先前的网桥，并且通过该网桥的管理访问会停止。`trunk` 端口还只接受带 VLAN 标记的帧，因此上行链路上的未标记流量会被丢弃。在将接入点的上行链路添加到 `cmr-bridge` 之前，请规划该接入点的管理访问。
:::

## VLAN 配置 {#vlan-provisioning}

[`/cmr/vlan`](../cli-reference/cmr/vlan.md) 菜单会在选定的 CMR 客户端上创建网桥和 VLAN 配置。规则通过 `labels` 选择设备，通过 `port-labels` 选择端口（设备接口名，例如 `ether1`，或在 `/cmr/device` 中分配给端口的端口标签，例如 `uplink`），定义 `vlan-ids`（逗号分隔列表或范围，例如 `10,20` 或 `10-20`），并为每个端口分配一个 `role`：`access`（默认）或 `trunk`。`port-labels` 参数为必填项，因此规则始终会指明其配置的端口，不会意外应用到设备的所有端口。

在选定的设备上，规则会创建一个启用了 VLAN 过滤的专用 `cmr-bridge` 网桥，并将选定的端口移入其中：

- `access` 端口属于单个 VLAN，即 `vlan-ids` 中的第一个 VLAN，该 VLAN 被设置为端口的 PVID。它传输不带标签的帧。在客户端上，当端口有链路时，该 VLAN 会作为动态无标签条目出现在网桥的 VLAN 表中。
- `trunk` 端口传输 `vlan-ids` 中的每个 VLAN，使用 802.1Q 头打标签，并且只接受带 VLAN 标签的帧。

一条规则可以选择多个端口；每个选定的端口都以相同方式配置。`trunk` 端口只接受带 VLAN 标签的帧，即使 `vlan-ids` 中包含 VLAN 1 也是如此，因此一个端口不能同时传输无标签和带标签的 VLAN。目前，当多条规则选择同一端口时，第一条规则生效，其他规则会被忽略且不会给出警告。

例如，为带有 `office` 标签的设备提供一个 VLAN 10 上的 access 端口和一个承载 VLAN 10 和 20 的上联端口：

```ros
[admin@MikroTik] > /cmr/vlan/add labels=office port-labels=ether5 vlan-ids=10 role=access comment=office-access
[admin@MikroTik] > /cmr/vlan/add labels=office port-labels=ether6 vlan-ids=10,20 role=trunk comment=office-uplink
```

```ros
[admin@MikroTik] > /cmr/vlan/print
0  ;;; office-access
   labels=office port-labels=ether5 vlan-ids=10 role=access

1  ;;; office-uplink
   labels=office port-labels=ether6 vlan-ids=10,20 role=trunk
```

删除或禁用规则会撤销其配置：选定的端口会恢复到之前的网桥和端口配置，当最后一条使用 `cmr-bridge` 的规则被删除时，`cmr-bridge` 也会被删除。

:::warning
配置下发会将选定的端口移入受管理的 `cmr-bridge`，这会断开该端口当前的流量，并且如果选中的是管理端口或上行链路端口，还可能切断设备的管理访问。`port-labels` 参数是必需的，因此规则始终会指明其更改的端口，但没有 `labels` 的规则仍会将这些端口应用到所有连接的设备，包括 CMR 控制器本身；应用此类规则可能会断开整个设备群以及控制器自身的管理访问。也要保持设备选择明确。禁用或移除规则会恢复先前的配置，前提是设备仍可从控制器访问；同时配置设备自身上行链路的规则可能会切断该链路，随后会保留 `cmr-bridge`，直到与设备的 CMR 连接重新建立，例如通过重新启用 CMR 客户端。
:::
