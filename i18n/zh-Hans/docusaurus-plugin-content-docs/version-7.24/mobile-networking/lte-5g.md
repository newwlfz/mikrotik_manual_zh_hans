---
sidebar_key: "mobile-networking/lte-5g"
sidebar_position: 1
title: "LTE/5G"
sidebar_label: "LTE/5G"
description: "本页面介绍 MikroTik RouterOS 中的 LTE 和 5G 配置，涵盖接口设置、APN 配置文件、LTE 设置以及运行模式，包括 RouterOS v7 中的 MBIM 支持。文中包含用于启用 PPP 仿真、管理漫游以及配置 MTU 和 PIN 码等调制解调器参数的 CLI 命令。"
tags:
  - 'lte'
  - '5g'
  - 'apn'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/lte-5g
captured_at: '2026-11-04T11:32:53+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

```ros
Package: system
Optional lte-mipsbe.npk package is only required for SXT 3-7 built-in modem.
```

仅支持 Direct-IP 模式类型的卡。MBIM 支持在 RouterOS v7 版本中可用，并且 MBIM 驱动会自动加载。如果调制解调器在 RouterOS v6 中无法识别。请在 v7 版本中测试后再寻求 RouterOS v6 支持。

要通过 PPP 接口而不是 LTE 接口进行访问，请使用 `/interface/lte/settings/set mode=serial` CLI 命令将运行模式更改为 "serial" 并重启。请注意，使用 PPP 仿真模式时，可能无法获得与使用 LTE 接口仿真类型相同的吞吐速度。

:::warning
对于 RouterOS v7，`ignore-direct-modem` 参数已重命名为 `mode`，并移至 `/interface/lte/settings` 菜单。
:::

### LTE 客户端 {#lte-client}

**子菜单：** `/interface/lte`

#### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **allow-roaming** (*yes \| no*; 默认值：**no**) | 启用数据漫游，以便连接到其他国家/地区的数据提供商。并非所有 LTE 调制解调器都支持此功能。部分未完全支持此功能的调制解调器会连接到网络，但当 allow-roaming 设置为 no 时不会建立 IP 数据连接。 |
| **apn-profiles** (*string*；默认：**default**) | 用于此接口的 APN 配置文件 |
| **band** (*integer list*; 默认值：**""**) | 通信中使用的 LTE 频段 `LTE Bands and bandwidths` |
| **nr-band** (*integer list*; 默认值： "") | 通信中使用的 5G NR 频段 `5G NR Bands and bandwidths` |
| **comment** (*string*; 默认值：**""**) | 条目的描述性名称 |
| **disabled** (*yes \| no*; 默认值：**no**) | 接口是否被禁用。默认情况下已启用。 |
| **modem-init** (*string*; 默认值：**""**) | 调制解调器初始化字符串（将在调制解调器启动时执行的 AT 命令） |
| **mtu** (*integer \| auto*; 默认值：**1500**) | 最大传输单元。LTE 接口在不进行数据包分片时能够发送的最大数据包大小。 <ul><li>auto - 对于支持该功能的调制解调器（MBIM 调制解调器），使用网络通告的 MTU。其他调制解调器将回退到默认值（1500）。</li></ul> |
| **name** (*string*; 默认值：**""**) | 接口的描述性名称。 |
| **network-mode** (*3g \| gsm \| lte \| 5g*) | 选择/强制 LTE 接口运行的 RAT 模式。要使 5G NSA 正常工作，必须同时选择 lte 和 5g 网络模式！仅选择 5g 将只允许连接到 5G SA。 |
| **operator** (*integer*; 默认值：**""**) | 用于将设备锁定到特定运营商。锁定使用由 MCC+MNC 组成的完整 PLMN 号码。[PLMN 代码](https://en.wikipedia.org/wiki/Public_land_mobile_network) |
| **pin** (*integer*; 默认值：**""**) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | SIM 卡的 PIN 码。 |
| **sms-protocol** (*at \| auto \| mbim*) | SMS 功能。  **mbim**：使用 MBIM 驱动程序。  **at**：使用 AT-Commands。  **auto**：根据调制解调器选择适当的选项。 |

#### APN 配置文件 {#apn-profiles}

所有与网络相关的设置都在配置文件中

**子菜单：** `/interface/lte/apn`

| 属性 | 描述 |
| :-- | :-- |
| **add-default-route** (*yes \| no*) | 是否添加默认路由，以通过 LTE 接口转发所有流量。 |
| **apn** (*string*) | 服务提供商的接入点名称 |
| **authentication** (*pap \| chap \| none*；默认：**none**) | 允许用于认证的协议 |
| **default-route-distance** (*integer*；默认：**2**) | 设置当同时选择 add-default-route 时应用于自动创建默认路由的距离值。默认情况下，LTE 路由的距离为 2，以便优先使用有线路由而不是 LTE |
| **ip-type** (*auto \| ipv4 \| ipv4-ipv6 \| ipv6*；默认：auto ) | 请求的 PDN 类型 |
| **ipv6-interface** (; 默认： ) | 用于通告 IPv6 前缀的接口 |
| **name** (*string*；默认： ) | APN 配置文件名称 |
| **number** (*integer*；默认： ) | APN 配置文件编号 |
| **passthrough-interface** (; 默认： ) | 用于传递 IP 配置的接口（激活直通） |
| **passthrough-mac** (*MAC*；默认：**auto**) | 如果设置为 auto，则它会从第一个数据包中学习 MAC |
| **passthrough-subnet-selection** (*auto / p2p*；默认：**auto**) | "auto" 选择可用于直通接口的最小子网。"p2p" 将直通接口子网设置为 /32，并从 10.177.0.0/16 范围中选择网关地址。除非 APN 配置发生更改，否则网关地址保持不变。 |
| **password** (*string*；默认： ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 如果任何认证协议处于活动状态，则使用该密码 |
| **use-network-apn** (*yes \| no*；默认：**yes**) | 该参数从 RouterOS v7 开始可用，并且仅用于 MBIM 调制解调器。如果设置为 yes，则使用网络提供的 APN。 |
| **use-peer-dns** (*yes \| no*；默认：**yes**) | 如果设置为 yes，则使用从 LTE 接口接收到的 DNS |
| **user** (*string*) | 如果任何认证协议处于活动状态，则使用的用户名 |

#### LTE 设置 {#lte-settings}

LTE 和路由器特定的 LTE 设置。该菜单从 RouterOS v7 开始可用。

**子菜单：** `/interface/lte/settings`

| 属性 | 描述 |
| :-- | :-- |
| **mode** (*auto \| mbim \| serial* / *user*；*默认：**auto***) | 运行模式设置。auto - 自动选择运行模式。serial - 仅提供串行端口。mbim - 如果可能，将调制解调器切换到 MBIM 模式。user - 操作系统不会尝试自动切换调制解调器模式。（从 RouterOS 7.16 开始可用） |
| **firmware-path** (*string*) | 主机操作系统中的固件路径。[调制解调器 Gobi 固件](./lte-5g.md#modem-fotadfota-downloads) |
| **external-antenna** (*auto \| both \| div \| main \| none*；默认：**auto**) | 此设置仅适用于 "Chateau" 路由器，但 Chateau 5G 版本除外。auto - 测量内部和外部天线上的信号电平，并选择信号最佳（RSRP）的天线。both - 两根天线都设置为外部天线。div - 分集天线设置为外部天线。main - 主天线设置为外部天线。none - 未选择外部天线（使用内部天线）  |
| **external-antenna-selected** () | 此设置仅适用于 "Chateau" 路由器，但 Chateau 5G 版本除外。如果 "**external-antenna**" 设置为 "auto"，则显示当前选择的天线 |
| **sim-slot** () | 此设置适用于具有可切换 SIM 插槽的路由器（LtAP、SXT）。不同产品的选择选项有所不同。 |
| **esim-channel** (*auto \| at;* 默认：*auto*)  | 用于 eSIM 管理的控制通道 |
| **link-recovery-timer** (*integer* 默认：*120* 范围：*120..4294967295*)  | 如果 LTE 接口未进入 (R)running 状态，则在经过该秒数后重新配置接口 |

#### LTE eSIM {#lte-esim}

```ros
RouterOS version: 7.18+
```

[MikroTips：如何首次激活你的 eSIM！](https://www.youtube.com/watch?v=v0WtU1xBB-Q)

此菜单包含与使用 RouterOS 内置 LPA（eSIM [Local Profile Assistant](http://en.wikipedia.org/wiki/ESIM)）进行 eSIM（[embedded Subscriber Identification Module](http://en.wikipedia.org/wiki/Remote_SIM_provisioning)）开通和管理相关的命令。

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

RouterOS LPA 支持：

- 固件支持 SIM 低级访问命令（AT+CCHO；AT+CCHC；AT+CGLA）的 AT 调制解调器。
- 其固件支持 SIM 低层访问服务的 MBIM 调制解调器（UUID\_SERVICE\_MS\_UICC）。

其他要求：

- 插入 RouterBoard SIM 插槽的 SIM 卡外形尺寸 eSIM（物理 eSIM）。
- 调制解调器上存在 eSIM/eUICC（焊接芯片），并且调制解调器已设置为使用此插槽。
- 在 eSIM 芯片上开通和删除 SIM 配置文件期间，需要连接到 eSIM SIM 配置文件提供商 SM-DP+ 开通服务器（为获得连接性，你可以使用另一个 eSIM 配置文件或另一个 WAN 接口）。
- 仅当活动插槽为 eSIM 时，才能开通 eSIM。
- 某些设备具有多个 SIM 插槽，要使用 eSIM，你需要使用命令 "/interface/lte/settings/set sim-slot=esim" 切换插槽。

命令 `/interface/lte/esim/esim-id [find /interface/lte]` 可用于检查调制解调器是否支持 SIM 低级访问命令以及是否存在 eSIM。

如果使用带有嵌入式 eSIM 芯片的第三方调制解调器，请查阅调制解调器手册，了解选择 eSIM 插槽所需的 AT 命令（AT!UIMS；AT+QUIMSLOT 等）。

**命令**

| 属性 | 描述 |
| :-- | :-- |
| **deactivate** | 停用（禁用）eSIM 配置文件。`/interface/lte/esim/deactivate number=0` |
| **activate** | 激活（启用）eSIM 配置文件。`/interface/lte/esim/activate number=0` |
| **delete** | 从 eSIM 卡中永久删除 eSIM 配置文件。`/interface/lte/esim/delete number=0` |
| **print** | 列出 eSIM 上安装的 eSIM 配置文件 `/interface/lte/esim/print` |
| **provision** | 开通新的 eSIM 配置文件。该命令接受四个参数：interface - 将为哪个接口启用 eSIM 配置文件。matching-id - 激活码令牌。示例： matching-id=ABCD10EFGHI5KL6M sm-dp-plus - SM-DP+ 服务器主机名 confirmation-code - 确认码（某些情况下需要的一次性密码） activate - 在开通后激活新创建的配置文件（yes\|no；默认：yes）[从 7.20beta6 版本开始可用。在 7.20beta6 之前，配置文件在开通后默认不会激活。] force-confirmation - 如果设置为 yes，命令不会等待用户确认，并自动接受配置文件开通（yes\|no；默认：no）示例：从二维码解码的 eSIM LPA 字符串：**LPA:1$server.example.io$ABCD10EFGHI5KL6M** `/interface/lte/esim/provision interface=lte1 sm-dp-plus=server.example.io matching-id=ABCD10EFGHI5KL6M` |
| **esim-id** | 查询 eSIM ID。该命令接受一个参数：interface - 选择要查询 eSIM ID 的接口。`/interface/lte/esim/esim-id interface=lte1   eid: 8903302342630000000004181FFFFFFF` |
| **set-nickname** | 为 eSIM 配置文件设置昵称。`/interface/lte/esim/set-nickname number=0 nickname=nickname1` |
| **refresh-profile-list** | 重新查询 eSIM 配置文件列表。该命令接受一个参数：interface - 选择将重新查询其 eSIM 配置文件的接口。 |

##### 内置 eSIM 芯片的设备（MikroTik Connectivity） {#devices-with-built-in-esim-chip-mikrotik-connectivity}

:::info
这些设备预装了 MikroTik Connectivity eSIM 配置文件。
https://mikrotik.com/connectivity
:::

| 设备型号 | 调制解调器 |
| :-- | :-- |
| S53UG+5HaxD2HaxD-TC&RG650E-EU | RG650E-EU |
| ATLGM&RG520F-EU | RG520F-EU |
| EC25-EU&KNe | EC25-EU |

##### 调制解调器 eSIM 管理支持表 {#modem-esim-management-support-table}

:::note
\* 这些调制解调器没有内置 eSIM。它们需要外部 eSIM 芯片。例如，物理 eSIM 卡（标准 SIM 外形尺寸的 eSIM）。
:::

| 调制解调器 | 支持 | 注释 |
| :-- | :-- | :-- |
| EC200A-EU | yes\* |  |
| EG06-A | yes\* |  |
| EG18-EA | yes\* |  |
| EG12-EA | yes\* |  |
| EG120K-EA | yes\* |  |
| RG520F-EU | yes\* |  |
| EP06-A | yes\* |  |
| RG502Q-EA | yes\* |  |
| FG621-EA | yes\* | 无法管理空 eSIM（无配置文件） |
| R11e-LTE6 | yes\* | 从固件版本 R11e-LTE6\_V039 开始 |
| R11e-LTE-US | no |  |
| R11e-4G | no |  |
| R11e-LTE | no |  |

#### 扫描器 {#scanner}

可以使用 `/interface/lte/scan` 命令扫描 LTE 接口。示例：

```ros
[admin@MikroTik] > /interface/lte/scan duration=60 number=0
Columns: OPERATOR, MCC-MNC, RSSI, RSRP, RSRQ
OPERATOR  MCC-MNC  RSSI    RSRP    RSRQ
LMT         24701  -36dBm  -63dBm  -7dB
```

可用属性：

| 属性 | 描述 |
| :-- | :-- |
| **duration** (*integer*) | 扫描持续时间（秒） |
| **freeze-frame-interval** (*integer*) | 数据打印之间的时间 |
| **number** (*integer*) | 接口编号或名称 |

#### 监控 LTE 详细信息 {#monitoring-lte-details}

你可以使用 CLI 命令 `/interface/lte/monitor` 监控 LTE 接口参数。它会返回小区级数据（例如运营商、小区 ID、信号信息）和调制解调器元数据（固件、型号、SIM 标识符）。

```
[admin@MikroTik] > /interface/lte/monitor lte1
            status: connected
             model: EG18-EA
          revision: EG18EAPAR01A12M4G
  current-operator: LMT
    current-cellid: 3103242
            enb-id: 12122
         sector-id: 10
        phy-cellid: 480
        data-class: LTE
    session-uptime: 15m54s
              imei: 86981604098XXXX
              imsi: 24701060267XXXX
              iccid: 8937101122102057XXXX
      primary-band: B3@20Mhz earfcn: 1300 phy-cellid: 480
     dl-modulation: qpsk
               cqi: 7
                ri: 2
               mcs: 1
              rssi: -68dBm
              rsrp: -97dBm
              rsrq: -9dB
              sinr: 6dB
```

#### LTE 接口能力 {#lte-interface-capabilities}

你可以使用 `/interface/lte/show-capabilities` CLI 命令检查 LTE 接口能力。

##### 示例输出 {#example-output}

```
[admin@MikroTik] > interface/lte/show-capabilities lte1
  modem-bus-location: 2-1
           cell-scan: yes
        network-scan: yes
     roaming-barring: yes
  apn-address-family: IPv4,IPv6
       max-apn-count: 8
           rat-modes: 3g,lte,5g
      band-selection: yes
           lte-bands: 1,3,5,7,8,20,28,32,38,40,41,42,43
            nr-bands: 1,3,5,7,8,20,28,38,40,41,75,76,77,78
         passthrough: yes
     firmware-update: yes
   lte-attach-config: yes
             at-chat: yes
    framed-route-apn: any
```

| 能力 | 描述 |
|------------|-------------|
| **modem-bus-location** | LTE 调制解调器连接到的物理 USB 总线 |
| **cell-scan** | 支持 `interface/lte/cell-monitor` 命令 |
| **network-scan** | 支持 `interface/lte/scan` 命令 |
| **roaming-barring** | 支持漫游限制 |
| **apn-address-family** | 支持的 IP 地址族（IPv4、IPv6） |
| **max-apn-count** | 可同时处于活动状态的 APN 配置文件最大数量 |
| **rat-modes** | 支持的无线接入技术（GSM、3G、LTE、5G） |
| **band-selection** | 支持 LTE/5G 频段设置命令 |
| **lte-bands** | 调制解调器支持的 LTE 频段列表 |
| **nr-bands** | 调制解调器支持的 5G 频段列表 |
| **passthrough** | 支持 LTE 直通 |
| **firmware-update** | 支持 `interface/lte/firmware-upgrade` |
| **lte-attach-config** | 支持 LTE attach APN 配置（设置与配置相同的 APN） |
| **at-chat** | 支持 `interface/lte/at-chat` |
| **framed-route-apn** | 在多 APN 设置中，哪个 APN 支持 framed routing（后置路由） |

#### 调制解调器 firmware-upgrade 命令 {#modem-firmware-upgrade-command}

该命令允许在受支持的 MikroTik 调制解调器有可用更新时检查并升级调制解调器固件。

要检查固件更新可用性并进行安装，需要活动的互联网连接；根据调制解调器的不同，可以使用任意 RouterOS 接口或调制解调器接口（FOTA）提供互联网连接，关于每种调制解调器支持的连接方法，请参见下表。

| 参数 / 属性 | 描述 |
| :-- | :-- |
| **upgrade** (*yes \| no；默认：**no***) | 设置命令执行模式：no - 显示当前调制解调器固件版本并显示最新可用固件版本。yes - 执行固件安装。 |
| **update-channel** (*stable \| testing*；默认：**stable**)  | 设置使用哪个固件更新通道：stable - 用于一般使用的固件版本。testing - 早期访问/测试通道，调制解调器固件在发布到 stable 通道之前会在此发布。该功能从 v7.17beta2 开始可用。 |
| **firmware-file** (*string*；默认："" ) | 允许用户覆盖固件更新源，在无法通过互联网连接 MikroTik 升级服务器进行升级的环境中（例如私有网络等），从自定义位置（文件、URL）执行升级。 |

:::warning
在尝试升级 LTE 调制解调器固件之前 - 将 RouterOS 版本升级到最新版本 [如何升级 RouterOS](../getting-started/installation-and-upgrade/upgrade.md)
:::

##### 支持固件更新且需要连接性的调制解调器 {#modems-with-firmware-update-support-and-connectivity-required}

使用命令 ***`/interface/lte/monitor [find]` 一次*** 获取返回的属性 "model"，以识别已安装的调制解调器型号。

| 调制解调器 | 连接到 MikroTik 升级服务器所需的连接性 |
| :-- | :-- |
| **EC200A-EU**  R11eL-EC200A-EU | 使用调制解调器 LTE 接口；使用任意 RouterOS 接口（7.18beta1+） |
| **EG06-A** | 使用任意 RouterOS 接口 |
| **EP06-A** | 使用任意 RouterOS 接口 |
| **EG12-EA** | 使用任意 RouterOS 接口 |
| **EG18-EA** | 使用任意 RouterOS 接口 |
| **FG621-EA**  R11eL-FG621-EA | 使用任意 RouterOS 接口 |
| **R11-LTE** | 使用调制解调器 LTE 接口 |
| **R11e-4G** | 使用任意 RouterOS 接口 |
| **R11e-LTE6** | 使用任意 RouterOS 接口 |
| **RG502Q-EA** | 使用任意 RouterOS 接口 |
| **RG520F-EU** | 使用任意 RouterOS 接口 |

##### 调制解调器 firmware-upgrade 命令示例 {#modem-firmware-upgrade-command-examples}

检查是否有新的固件更新可用

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1
  installed: EG12EAPAR01A13M4G_02.001.02.001
     latest: EG12EAPAR01A15M4G_01.201.01.201
```

检查早期访问/测试通道中是否有新的固件更新可用

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 update-channel=testing
  installed: EG12EAPAR01A15M4G_01.201.01.201
     latest: EG12EAPAR01A15M4G_01.203.01.203
```

安装最新固件

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 upgrade=yes
```

从早期访问/测试通道安装最新固件

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 upgrade=yes update-channel=testing
```

从自定义位置（文件或 HTTP URL）执行固件升级。
在执行 `firmware-upgrade` 命令之前，接口必须处于 R（running）或 X（disabled）状态。

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 firmware-file=R11e-LTE6_V039_image upgrade=yes

[admin@D53G] > /interface/lte/firmware-upgrade lte1 firmware-file=http://firmwareserver.com/R11e-LTE6_V039_image upgrade=yes
```

##### 调制解调器 FOTA/DFOTA 下载 {#modem-fotadfota-downloads}

以下是我们调制解调器的所有最新固件版本：
https://box.mikrotik.com/d/bfa49081454e4da1972d/

你可以使用这些 FOTA 文件进行离线更新，或在无法访问 MikroTik 升级服务器以进行标准调制解调器固件升级的环境中使用。

:::warning
在尝试升级 LTE 调制解调器固件之前，请将 RouterOS 升级到最新版本。[如何升级 RouterOS](../getting-started/installation-and-upgrade/upgrade.md)

LTE 调制解调器设计为尽可能拒绝不兼容的 FOTA/DFOTA 固件包。但是，手动固件升级始终存在风险。安装错误的固件镜像可能导致调制解调器故障、功能丧失或永久损坏，从而可能需要更换调制解调器。

不要中断升级过程。在写入固件期间发生断电、设备重启、调制解调器重置或任何其他中断，都可能使调制解调器处于无法恢复的状态。

用户有责任确认固件文件适用于正在升级的确切调制解调器型号和硬件版本，并确保在整个升级过程中提供稳定的电源。对于因刷写错误固件文件或中断固件升级过程而导致的任何损坏、功能丧失或其他问题，MikroTik 不承担责任。
:::

###### FOTA 调制解调器 {#fota-modems}

FOTA（Firmware Over‑The‑Air，固件空中更新）。这些调制解调器没有源版本子文件夹。你可以从任何当前固件版本安装最新的调制解调器固件。

| 调制解调器型号 | 注释 |
|---|---|
| R11e-LTE | 调制解调器通过其 LTE 连接自行下载固件（FOTA）。无法进行离线升级；如果你的设置中无法访问 MikroTik 升级服务器，你可以将固件托管在调制解调器可访问的某个 HTTP 服务器上，并以此方式升级固件 |
| R11e-LTE6 | - |
| R11l-LTE7 | - |
| R11e-4G | - |
| EC25-EU | 调制解调器固件作为 NPK 包安装 |
| EG25-G | 调制解调器固件作为 NPK 包安装 |
| SXT-LTE | 仅单一产品 - RBSXTLTE3-7。调制解调器固件作为 NPK 包安装 |

###### DFOTA 调制解调器 {#dfota-modems}

DFOTA（Delta Firmware Over‑The‑Air，增量固件空中更新）。这些调制解调器具有按版本划分的子文件夹 `modem/<model>/<currentVersion>/<targetVersion>_image`，其中 targetVersion 是从当前固件版本可用的最新升级版本。如果你的当前固件版本较旧，可能需要多步升级。

| 调制解调器型号 | 注释 |
|---|---|
| EC200A-EU | 最新的 RouterOS v7 版本支持离线 DFOTA 升级。在较旧版本中，调制解调器通过其 LTE 连接自行下载固件 |
| EP06-A | - |
| EG06-A | - |
| EG12-EA | - |
| EG18-EA | - |
| EG120K-EA | - |
| RG502Q-EA | - |
| RG520F-EU | - |
| RG520F-EUX | 适用于 ATL 5G R16（ATLGM&RG520F-EU）的特殊调制解调器固件版本 |
| RG650E-EU | 此调制解调器使用 A/B 系统更新机制，而不是 DFOTA。由于完整固件镜像会写入非活动系统分区，因此固件包明显大于典型的 DFOTA 包 |
| FG621-EA | - |
| BG77 | PPP 串行调制解调器。`/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes firmware-file=` |
| BG770A | PPP 串行调制解调器。`/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes firmware-file=` |

#### 用户 at-chat 命令 {#user-at-chat-command}

可以使用 `/interface/lte/at-chat` 命令向 LTE 接口发送用户定义的 "at-chat" 命令。

```ros
[admin@MikroTik] > /interface/lte/at-chat lte1 input="AT"
  output: OK
```

还可以在该命令中使用 "wait" 参数 *wait=yes*，使 "at-chat" 等待 5 秒并返回所有输出，而不是仅返回首次接收到的数据。这对于某些返回多行输出或大块数据的命令很有用。

```ros
[admin@MikroTik] > /interface/lte/at-chat lte1 input="at+qcfg=?"
  output:

[admin@MikroTik] > /interface/lte/at-chat lte1 input="at+qcfg=?" wait=yes
  output: +QCFG: "rrc",(0-5)
          +QCFG: "hsdpacat",(6,8,10-24)
          +QCFG: "hsupacat",(5,6)
          +QCFG: "pdp/duplicatechk",(0,1)
          +QCFG: "risignaltype",("respective","physical")
          +QCFG: "lte/bandprior",(1-43),(1-43),(1-43)
          +QCFG: "volte_disable",(0,1)
          +QCFG: "diversity/config",(4,6),(1-4),(0)
          +QCFG: "div_test_mode",(0,1)
          +QCFG: "usbspeed",("20","30")
          +QCFG: "data_interface",(0,1),(0,1)
          +QCFG: "pcie/mode",(0,1)
          +QCFG: "pcie_mbim",(0,1)
          +QCFG: "sms_control",(0,1),(0,1)
          +QCFG: "call_control",(0,1),(0,1)
          +QCFG: "usb/maxpower",(0-900)
          +QCFG: "efratctl",(0,1)
          +QCFG: "netmaskset",(0,1)[,<netmask>]
          +QCFG: "mmwave",ant_chip,ant_type
          +QCFG: "gatewayset",(0,1)[,<gateway>]
          +QCFG: "clat",(0,1),(0,1),<prefix>,(0,32,40,48,56,64,96),<fqdn>,(0,1),(0,1,2,4,8),(0,1),(0,1),(0,1,2),(0,1,2)
          +QCFG: "usage/apmem"
          +QCFG: "enable_gea1"[,(0,1)]
          +QCFG: "dhcppktfltr",(0,1)
          OK
```

你也可以在脚本中使用 "at-chat" 函数，并将命令输出赋值给变量。

```ros
[admin@MikroTik] > :global "lte_command" [/interface/lte/at-chat lte1 input="AT+CEREG?" as-value ]
[admin@MikroTik] > :put $"lte_command"
output=+CEREG: 0,1
OK
```

### 快速设置示例 {#quick-setup-example}

从网络设置开始 - 在 LTE APN 配置文件下添加新的连接参数（由网络提供商提供）：

```ros
/interface/lte/apn/add name=profile1 apn=phoneprovider.net authentication=chap password=web user=web
```

为 LTE 连接选择新创建的配置文件：

```ros
/interface/lte/set [find] apn-profiles=profile1
```

LTE 接口应以 running（R）标志出现：

```ros
[admin@MikroTik] > /interface/lte/print
Flags: X - disabled, R - running
0 R name="lte1" mtu=1500 mac-address=AA:AA:AA:AA:AA:AA
```

如有需要，为 LTE 接口添加 NAT Masquerade，以便将互联网接入本地网络：

```ros
/ip/firewall/nat/add action=masquerade chain=srcnat out-interface=lte1
```

添加接口后，你可以使用 "info" 命令查看客户端获取了哪些参数（返回的参数取决于 LTE 硬件设备）：

```
[admin@MikroTik] > /interface/lte/monitor lte1
            status: connected
             model: EG18-EA
          revision: EG18EAPAR01A12M4G
  current-operator: LMT
    current-cellid: 3103242
            enb-id: 12122
         sector-id: 10
        phy-cellid: 480
        data-class: LTE
    session-uptime: 15m54s
              imei: 86981604098XXXX
              imsi: 24701060267XXXX
              iccid: 8937101122102057XXXX
      primary-band: B3@20Mhz earfcn: 1300 phy-cellid: 480
     dl-modulation: qpsk
               cqi: 7
                ri: 2
               mcs: 1
              rssi: -68dBm
              rsrp: -97dBm
              rsrq: -9dB
              sinr: 6dB
```

### 直通示例 {#passthrough-example}

某些 LTE 接口支持 LTE 直通功能，其中 IP 配置会直接应用到客户端设备。在这种情况下，调制解调器固件负责 IP 配置，路由器仅用于配置调制解调器设置 - APN、网络技术和 IP 类型。在此配置中，路由器不会从调制解调器获取 IP 配置。如果调制解调器支持，LTE 直通调制解调器可以同时传递 IPv4 和 IPv6 地址。某些调制解调器支持多个 APN，你可以将每个 APN 的流量传递到特定的路由器接口。

直通仅适用于一台主机。路由器会自动检测第一个接收到的数据包的 MAC 地址，并将其用于直通。如果网络中有多台主机，可以将直通锁定到特定 MAC。在直通提供 IP 的网络主机上，该接口也应启用 DHCP 客户端。请注意，将无法通过公共 LTE IP 地址或从直通所使用的主机连接到 LTE 路由器。建议为配置目的创建一条从 LTE 路由器到该主机的额外连接。例如，在 LTE 路由器和主机之间创建 VLAN 接口。

要启用直通，需要在 `/interface/lte/apn` 菜单中新增条目或更改默认条目

:::warning
并非所有芯片组都支持 Passthrough。
要检查你的调制解调器是否支持 Passthrough：

```ros
/interface/lte/show-capabilities [find]
```
:::

#### 示例 {#examples}

要在 ether1 上配置直通：

```ros
[admin@MikroTik] > /interface/lte/apn/add apn=apn1 passthrough-interface=ether1
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=apn1
```

要在 ether1 主机 00:0C:42:03:06:AB 上配置直通：

```ros
[admin@MikroTik] > /interface/lte/apn/add apn=apn1 passthrough-interface=ether1 passthrough-mac=00:0C:42:03:06:AB
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=apn1
```

要在 ether1 和 ether2 上配置多个 APN：

```ros
[admin@MikroTik] > /interface/lte/apn/add apn=apn1 passthrough-interface=ether1
[admin@MikroTik] > /interface/lte/apn/add apn=apn2 passthrough-interface=ether2
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=apn1,apn2
```

要为不同接口配置具有相同 APN 的多个 APN：

```ros
[admin@MikroTik] > /interface/lte/apn/add name=interface1 apn=apn1
[admin@MikroTik] > /interface/lte/apn/add name=interface2 apn=apn1 passthrough-interface=ether1
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=interface1
[admin@MikroTik] > /interface/lte/set lte2 apn-profiles=interface2
```

此外，你可以通过在同一 passthrough-interface 上手动创建 DHCP 服务器，来覆盖默认的动态 DHCP 服务器参数/选项。例如，默认租期为 1 分钟：

```routeros
[admin@MikroTik] > /ip/dhcp-server/print detail
Flags: D - dynamic; X - disabled, I - invalid
 0 D  name="apn2" interface=ether2 lease-time=1m address-pool=static-only use-radius=no lease-script="" address-lists=""
```

现在，如果你想将租期更改为例如 30 分钟，则可以在 passthrough-interface（在此例中为 ether2）上创建新的 DHCP 服务器：

```routeros
[admin@MikroTik] > /ip/dhcp-server/add interface=ether2 name=dhcp1 lease-time=30m
[admin@MikroTik] > /ip/dhcp-server/print detail
Flags: D - dynamic; X - disabled, I - invalid
 0    name="dhcp1" interface=ether2 lease-time=30m address-pool=static-only use-radius=no lease-script="" address-lists=""
```

### 双 SIM {#dual-sim}

#### 具有可切换 SIM 插槽的板卡 {#boards-with-switchable-sim-slots}

| RouterBoard | 调制解调器插槽 | SIM 插槽 1 | SIM 插槽 2 | 可切换 |
| :-- | :-- | :-- | :-- | :-- |
| LtAP | lower | 2 | 3 | Y |
|  | upper | 1 |  | N |
| LtAP mini |  | 上 | 下 | Y |
| SXT R |  | a | b | Y |
| ATL 5G |  | sim | esim | Y |

SIM 插槽切换命令

- RouterOS v7

```ros
/interface/lte/settings/set sim-slot=down
```

- RouterOS v6 6.45.1 之后

```ros
/system/routerboard/modem/set sim-slot=down
```

- RouterOS v6 6.45.1 之前：

```ros
/system/routerboard/sim/set sim-slot=down
```

更多参考信息，请参阅板卡框图、快速指南和用户手册。

#### 使用示例 {#usage-example}

请访问此链接 - [双 SIM 应用](./dual-sim-application.md)，查看如何借助 RouterOS 脚本和调度器，根据漫游状态以及接口状态为 down 时更改 SIM 插槽的示例。

### 技巧与提示 {#tips-and-tricks}

本段包含有关附加功能和使用场景的信息。

#### 使用小区信息查找设备位置 {#find-device-location-using-cell-information}

在使用 R11e-LTE 国际版卡（wAP LTE kit）的设备上，info 命令下会提供一些额外信息。

```
   current-operator: 24701
                lac: 40
     current-cellid: 2514442
```

| 属性 | 描述 |
| :-- | :-- |
| **current-operator** (*integer*；默认： ) | 包含 MCC 和 MNC。例如：current-operator: 24701 分解为：MCC=247 MNC=01 |
| **lac** (*integer*；默认： ) | 位置区代码（LAC） |
| **current-cellid** (*integer*；默认： ) | 站标识号 |

可以使用这些值在数据库中查找位置：[Cell Mapper](http://www.cellmapper.net)

#### 使用小区锁定 {#using-cell-lock}

可以将 R11e-LTE、R11e-LTE6 和 R11e-4G 调制解调器及配备这些调制解调器的设备锁定到确切的 LTE 基站。LTE info 命令提供当前使用的蜂窝基站信息：

```
         phy-cellid: 384
             earfcn: 1300 (band 3, bandwidth 20Mhz)
```

| 属性 | 描述 |
| :-- | :-- |
| **phy-cellid** (*integer*；默认： ) | 当前使用的蜂窝基站的物理小区标识（PCI）。 |
| **earfcn** (*integer*；默认： ) | 绝对无线频率信道号 |

确切的基站位置以及可用频段和其他信息可以从移动运营商处获取，也可以通过在线服务获取：

[CellMapper](https://www.cellmapper.net/map)

使用这些获取的变量，可以按以下格式向调制解调器发送 AT 命令以锁定到基站：

**适用于 R11e-LTE 和 R11e-LTE6**

```
AT*Cell=<mode>,<NetworkMode>,<band>,<EARFCN>,<PCI>

where

<mode> :
0 – Cell/Frequency disabled
1 – Frequency lock enabled
2 – Cell lock enabled

<NetworkMode>
0 – GSM
1 – UMTS_TD
2 – UMTS_WB
3 – LTE

<band>
Not in use, leave this blank

<EARFCN>
earfcn from lte info

<PCI>
phy-cellid from lte info
```

要锁定调制解调器到之前使用的基站，可以使用 at-chat：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1300,384"
```

对于 R11e-LTE，所有已设置的锁定都会在重启或调制解调器重置后丢失。小区数据也可以通过 "cell-monitor" 收集。

对于 R11e-LTE6，小区锁定仅适用于主频段。如果你在同一频段上有多个信道，并希望将其锁定到特定 earfcn，这会很有用。请注意，小区锁定不特定于频段，对于 ca-band，它也可以使用其他频段，除非你使用频段锁定。

使用小区锁定将主频段设置为 1300 earfcn，并将第二个信道用于 ca-band：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1300,138"
```

现在主信道使用 earfcn: 1300：

```
         primary-band: B3@20Mhz earfcn: 1300 phy-cellid: 138
              ca-band: B3@5Mhz earfcn: 1417 phy-cellid: 138
```

你也可以反过来设置：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1417,138"
```

现在主信道使用 earfcn: 1417：

```
         primary-band: B3@5Mhz earfcn: 1417 phy-cellid: 138
              ca-band: B3@20Mhz earfcn: 1300 phy-cellid: 138
```

对于 R11e-LTE6 调制解调器，小区锁定信息在重启或调制解调器重置后不会丢失。要移除小区锁定，请使用 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=0"
```

**适用于 R11e-4G**

```
AT%CLCMD=<mode>,<mode2>,<EARFCN>,<PCI>,<PLMN>
AT%CLCMD=1,1,3250,244,\"24705\"

where

<mode> :
0 – Cell/Frequency disabled
1 – Cell lock enabled

<mode2> :
0 - Save lock for first scan
1 - Always use lock
(after each reset modem will clear out previous settings no matter what is used here)

<EARFCN>
earfcn from lte info

<PCI>
phy-cellid from lte info

<PLMN>
Mobile operator code
```

所有 PLMN 代码见[此处](https://en.wikipedia.org/wiki/Mobile_country_code)。此变量也可以留空

要将调制解调器锁定到小区 - 调制解调器需要处于非运行状态，对于 **R11e-4G** 调制解调器，最简单的方法是在 "modem-init" 字符串中添加 CellLock 行：

```ros
/interface/lte/set lte1 modem-init="AT%CLCMD=1,1,3250,244,\"24705\""
```

也可以通过提供列表而不是一个基站信息来添加多个小区，格式如下：

```
AT%CLCMD=<mode>,<mode2>,<EARFCN_1>,<PCI_1>,<PLMN_1>,<EARFCN_2>,<PCI_2>,<PLMN_2>
```

例如，要锁定到同一频段和运营商内的两个不同 PCI：

```ros
/interface/lte/set lte1 modem-init="AT%CLCMD=1,1,6300,384,\"24701\",6300,385,\"24701\""
```

**适用于 Chateau LTE12、Chateau LTE18、Chateau 5G、Chateau 5G R16、LHG LTE18、ATL LTE18、ATL 5G R16、Chateau 5G R17 ax**

```
AT+QNWLOCK="common/4g",<num of cells>,[[<freq>,<pci>],...]
AT+QNWLOCK=\"common/4g\",1,6300,384

where

<num of cells>
number of cells to cell lock

<freq>
earfcn from lte info

<pci>
phy-cellid from lte info

```

单小区锁定示例：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/4g\",1,3050,448"
```

查询当前配置：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/4g\""
```

也可以将多个小区添加到小区锁定中。例如，要锁定到两个不同的小区：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/4g\",2,3050,448,1574,474"
```

要移除小区锁定，请使用此 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="at+qnwlock=\"common/4g\",0"
```

:::warning

1. 重启或调制解调器复位后，小区锁定信息将不会被保存。2. AT+QNWLOCK 命令可以锁定小区和频率。因此，可以优先让模块注册到锁定小区；但是，根据 3gpp 协议，模块会被重定向或切换到信号指示更好的小区，即使该小区不在该命令的锁定范围内。此现象是正常的。
:::

**对于支持 5G 的设备，也可以锁定 5G SA 小区**

```
AT+QNWLOCK="common/5g",<pci>,<freq>,<scs>,<band>
AT+QNWLOCK=\"common/5g\",901,504990,30,41

where
<pci> String type. Cell physical ID. 0 indicates disabling locking module to the specified cell.
<freq> Integer type. Cell frequency (earfcn).
<scs> Integer type. NR sub carrier space. Unit: kHz. For FR1(Sub-6 GHz) FDD band, please set <scs> to 15; for FR1 TDD band, please set <scs> to 30. Otherwise, an error code may be returned.
15
30
<band> Integer type. NR5G frequency band.
```

锁定到 TDD n78 频段且 earfcn=628032、phy-cellid=138 的小区锁定示例：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\",138,628032,30,78"
```

查询当前配置：

```ros
[admin@MikroTik] > /interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\""
  output: +QNWLOCK: "common/5g",138,628032,30,78
          OK
```

要移除小区锁定，请使用此 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\",0"
```

:::warning

1. 重启或调制解调器复位后，小区锁定信息将不会被保存。

2. AT+QNWLOCK 命令可以锁定小区和频率。因此，可以优先让模块注册到锁定小区；但是，根据 3gpp 协议，模块会被重定向或切换到信号指示更好的小区，即使该小区不在该命令的锁定范围内。此现象是正常的。

3. 锁定小区时，请确保模块支持锁定小区对应的频段，否则将返回错误代码。

4. AT+QNWLOCK="common/5g" 不支持锁定 NSA 的 5G 小区。（你仍可使用 AT+QNWLOCK="common/4g" 命令锁定到 lte 锚定小区。）

5. 此写命令只能在模块处于全功能模式（lte 接口未禁用）时执行。

6. 不建议将此命令用于商业用途。
:::

**适用于 FG621-EA**

```
AT+GTCELLLOCK=<mode>[,<rat>,<type>,<earfcn>[,<PCI>]]

where

< mode >: integer type; 0 Disable this function 1 Enable this function 2 Add new cell to be locked

<rat>: integer type; 0 LTE 1 WCDMA

<type>: integer type; 0 Lock PCI 1 Lock frequency

<earfcn>: integer type; the range is 0-65535.

<PCI>: integer type; If second parameter value is 0, the range is 0-503 for LTE If second parameter value is 1, the range is 0-512 for WCDMA
```

示例：

```ros
/interface/lte/at-chat lte1 input="AT+GTCELLLOCK=1,0,0,6175,176"
```

#### 小区监控 {#cell-monitor}

小区监控允许扫描附近可用的移动网络小区：

```ros
[admin@MikroTik] > /interface/lte/cell-monitor lte1
PHY-CELLID BAND         PSC EARFCN                 RSRP          RSRQ          RSSI         SINR
        49 B20              6300                -110dBm       -19.5dB
       272 B20              6300                -116dBm       -19.5dB
       374 B20              6300                -108dBm         -16dB
       384 B1               150                 -105dBm       -13.5dB
       384 B3               1300                -106dBm         -12dB
       384 B7               2850                -107dBm       -11.5dB
       432 B7               2850                -119dBm       -19.5dB
```

收集到的数据可用于更精确的位置检测或小区锁定。

:::warning
并非所有调制解调器都支持此功能
:::

### 故障排除 {#troubleshooting}

#### 启用 LTE 日志记录 {#enable-lte-logging}

```ros
[admin@MikroTik] > /system/logging/add topics=lte
```

#### 检查日志中的错误 {#check-for-errors-in-log}

```ros
[admin@MikroTik] > /log/print

11:08:59 lte,async lte1: sent AT+CPIN?
11:08:59 lte,async lte1: rcvd +CME ERROR: 10
```

在线搜索 CME 错误描述，

在本例中：CME error 10 - SIM not inserted

#### 在 Huawei 和其他调制解调器上锁定频段 {#locking-band-on-huawei-and-other-modems}

要为 Huawei 调制解调器锁定频段，不能使用 `/interface/lte/set lte1 band=""` 选项。

可以使用 AT 命令手动锁定到所需频段。

要检查所有支持的频段，请运行 at-chat 命令：

```ros
[admin@MikroTik] /interface/lte/at-chat lte1 input="AT^SYSCFGEX=\?"

output: ^SYSCFGEX: ("00","03","02","01","99"),((2000004e80380,"GSM850/GSM900/GSM1800/GSM1900/WCDMA BCI/WCDMA BCII/WCDMA BCV/WCDMA BCVIII"),
(3fffffff,"All Bands")),(0-2),(0-4),((800d7,"LTE BC1/LTE BC2/LTE
BC3/LTE BC5/LTE BC7/LTE BC8/LTE BC20"),(7fffffffffffffff,"All Bands"))
OK

```

锁定到 LTE 频段 7 的示例：

```ros
[admin@MikroTik] /interface/lte/set lte1 modem-init="AT^SYSCFGEX=\"03\",3FFFFFFF,2,4,40,,"
```

将最后部分 **40** 更改为所需频段指定的十六进制值，其中：

```
4 LTE BC3
40 LTE BC7
80000 LTE BC20
7FFFFFFFFFFFFFFF  All bands
etc
```

所有频段 HEX 值和 AT 命令可在 [Huawei AT Command Interface Specification guide](https://download-c.huawei.com/download/downloadCenter?downloadId=29741&version=72288&siteCode=) 中找到

检查频段是否已锁定：

```ros
[admin@MikroTik] /interface/lte/at-chat lte1 input="AT^SYSCFGEX\?"

output: ^SYSCFGEX: "03",3FFFFFFF,0,2,40
OK
```

更多信息请查阅调制解调器制造商的 AT 命令参考手册。

#### 搭配 RB9xx 系列设备的 mPCIe 调制解调器 {#mpcie-modems-with-rb9xx-series-devices}

如果调制解调器在软重启后未被识别，则可能需要在 USB 端口初始化之前添加延迟。可以使用以下命令完成：

```ros
/system/routerboard/settings/set init-delay=5s
```

#### 具有 USB-A 端口和 mPCIe 的板卡 {#boards-with-usb-a-port-and-mpcie}

某些设备（例如特定的 RB9xx 和 RBLtAP-2HnD）在单个 mPCIe 插槽和 USB-A 端口之间共享相同的 USB 线路。如果未进行自动切换且调制解调器未被检测到，你可能需要手动切换为使用 USB-A 或 mini-PCIe：

```ros
/system/routerboard/usb/set type=mini-PCIe
```

#### 避免网络共享速度限制 {#avoiding-tethering-speed-throttling}

某些运营商仅对使用 SIM 卡的设备允许无限数据，来自移动热点或网络共享的所有其他数据都会在流量或吞吐速度上受到高度限制。一些来源发现，此限制是通过监控数据包的 TTL（Time To Live）值来确定是否需要应用限制（每经过一个“跳”TTL 减 1）。RouterOS 允许更改从路由器发出的数据包的 TTL 参数，以隐藏子网。请记住，这可能与公平使用政策冲突。

```ros
IPv4 mangle rule:
/ip/firewall/mangle
add action=change-ttl chain=postrouting new-ttl=set:65 out-interface=lte1 passthrough=yes
IPv6 mangle rule:
/ipv6/firewall/mangle
add action=change-hop-limit chain=postrouting new-hop-limit=set:65 passthrough=yes
```

#### 多次输入错误 PIN 码后解锁 SIM 卡 {#unlocking-sim-card-after-multiple-wrong-pin-code-attempts}

锁定 SIM 卡后，可以通过 "at-chat" 解锁

检查当前 PIN 码状态：

```ros
/interface/lte/at-chat lte1 input="at+cpin\?"
```

如果卡已锁定 - 通过提供以下内容解锁：

```ros
/interface/lte/at-chat lte1 input="AT+CPIN=\"PUK_code\",\"NEW_PIN\""
```

将 PUK\_code 和 NEW\_PIN 替换为匹配的值。

:::warning
SIM 插槽选择命令在 v6.45.1 中发生变化，并在 v7 中再次变化。某些设备型号（如 SXT）的 SIM 插槽命名为 "a" 和 "b"，而不是 "up" 和 "down"
:::
