---
title: "LTE/5G"
description: "本页介绍 MikroTik RouterOS 中的 LTE 和 5G 配置，涵盖接口设置、APN 配置文件、LTE 设置，以及包括 RouterOS v7 中 MBIM 支持在内的运行模式。其中包含用于启用 PPP 模拟、管理漫游以及配置 MTU 和 PIN 码等调制解调器参数的 CLI 命令。"
tags:
  - 'lte'
  - '5g'
  - 'apn'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/lte-5g
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "mobile-networking"
pagination_next: "mobile-networking/gps"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

```ros
Package: system
Optional lte-mipsbe.npk package is only required for SXT 3-7 built-in modem.
```

仅支持 Direct-IP 模式类型的卡。MBIM 支持在 RouterOS v7 版本中可用，MBIM 驱动会自动加载。如果调制解调器在 RouterOS v6 中未被识别，请在请求 RouterOS v6 支持之前，先在 v7 版本中测试。

要通过 PPP 接口而不是 LTE 接口启用访问，请使用 `/interface/lte/settings/set mode=serial` CLI 命令将工作模式更改为“serial”，然后重启。请注意，使用 PPP 模拟模式时，吞吐量速度可能与使用 LTE 接口模拟类型时不同。

:::warning
对于 RouterOS v7，`ignore-direct-modem` 参数已重命名为 `mode`，并移至 `/interface/lte/settings` 菜单。
:::

### LTE 客户端 {#lte-client}

**子菜单：** `/interface/lte`

#### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **allow-roaming** (*yes \| no*；默认：**no**) | 启用数据漫游，以连接其他国家/地区的数据提供商。并非所有 LTE 调制解调器都支持此功能。某些未完全支持此功能的调制解调器，在 allow-roaming 设置为 no 时会连接到网络，但不会建立 IP 数据连接。 |
| **apn-profiles** (*string*；默认：**default**) | 此接口使用哪个 APN 配置文件 |
| **band** (*integer list*；默认：**""**) | 通信中使用的 LTE 频段 `LTE Bands and bandwidths` |
| **nr-band** (*integer list*；默认: "") | 通信中使用的 5G NR 频段 `5G NR Bands and bandwidths` |
| **comment** (*string*；默认：**""**) | 项目的描述性名称 |
| **disabled** (*yes \| no*；默认：**no**) | 接口是否禁用。默认启用。 |
| **modem-init** (*string*；默认：**""**) | 调制解调器初始化字符串（调制解调器启动时将执行的 AT 命令） |
| **mtu** (*integer \| auto*；默认：**1500**) | 最大传输单元。LTE 接口无需数据包分片即可发送的最大数据包大小。<ul><li>auto - 对支持该功能的调制解调器使用网络通告的 MTU（MBIM 调制解调器）。其他调制解调器将回退到默认值（1500）。</li></ul> |
| **name** (*string*；默认：**""**) | 接口的描述性名称。 |
| **network-mode** (*3g \| gsm \| lte \| 5g*) | 选择/强制 LTE 接口运行的 RAT 模式。要使 5G NSA 工作，必须同时选择 lte 和 5g 网络模式！仅选择 5g 将只允许连接到 5G SA。 |
| **operator** (*integer*；默认：**""**) | 用于将设备锁定到特定运营商。锁定使用完整的 PLMN 号码，由 MCC+MNC 组成。[PLMN 代码](https://en.wikipedia.org/wiki/Public_land_mobile_network) |
| **pin** (*integer*；默认：**""**) *[敏感](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | SIM 卡的 PIN 码。 |
| **sms-protocol** (*at \| auto \| mbim*) | SMS 功能。**mbim**：使用 MBIM 驱动。**at**：使用 AT 命令。**auto**：根据调制解调器选择合适的选项。 |

#### APN 配置文件 {#apn-profiles}

所有网络相关设置均位于配置文件中

**子菜单：** `/interface/lte/apn`

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes \| no*) | 是否添加默认路由，以通过 LTE 接口转发所有流量。 |
| **apn** (*string*) | 服务提供商的接入点名称 |
| **authentication** (*pap \| chap \| none*；默认：**none**) | 允许用于认证的协议 |
| **default-route-distance** (*integer*；默认：**2**) | 设置自动创建的默认路由所使用的 distance 值，前提是同时选择 add-default-route。LTE 路由默认 distance 为 2，以优先使用有线路由而非 LTE |
| **ip-type** (*auto \| ipv4 \| ipv4-ipv6 \| ipv6*；默认：auto ) | 请求的 PDN 类型 |
| **ipv6-interface** (；默认： ) | 用于通告 IPv6 前缀的接口 |
| **name** (*string*；默认： ) | APN 配置文件名称 |
| **number** (*integer*；默认： ) | APN 配置文件编号 |
| **passthrough-interface** (；默认： ) | 用于透传 IP 配置的接口（启用透传） |
| **passthrough-mac** (*MAC*；默认：**auto**) | 如果设置为 auto，则从第一个数据包学习 MAC 地址 |
| **passthrough-subnet-selection** (*auto / p2p*；默认：**auto**) | “auto”选择可用于透传接口的最小子网。“p2p”将透传接口子网设置为 /32，并从 10.177.0.0/16 范围中选择网关地址。网关地址保持不变，直到 apn 配置被更改。 |
| **password** (*string*；默认： ) *[敏感](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 启用任一认证协议时使用的密码 |
| **use-network-apn** (*yes \| no*；默认：**yes**) | 该参数从 RouterOS v7 开始可用，仅用于 MBIM 调制解调器。如果设置为 yes，则使用网络提供的 APN。 |
| **use-peer-dns** (*yes \| no*；默认：**yes**) | 如果设置为 yes，则使用从 LTE 接口接收到的 DNS |
| **user** (*string*) | 启用任一认证协议时使用的用户名 |

#### LTE 设置 {#lte-settings}

LTE 和路由器特定的 LTE 设置。该菜单从 RouterOS v7 开始可用。

**子菜单：** `/interface/lte/settings`

| 属性 | 说明 |
| :-- | :-- |
| **mode** (*auto \| mbim \| serial* / *user*；*默认：**auto***) | 工作模式设置。<br/><ul><li>auto - 自动选择工作模式。</li><li>serial - 仅提供串行端口</li><li>mbim - 尽可能将调制解调器切换到 MBIM 模式</li><li>user - 操作系统不会尝试自动切换调制解调器模式。（从 RouterOS 7.16 起可用）</li></ul> |
| **firmware-path** (*string*) | 主机操作系统中的固件路径。[Modem gobi firmware](/docs/mobile-networking/lte-5g#modem-fotadfota-downloads) |
| **external-antenna** (*auto \| both \| div \| main \| none*；默认：**auto**) | 该设置仅适用于 Chateau 路由器，Chateau 5G 版本除外。<ul><li>auto - 测量内置和外置天线上的信号电平，并选择信号最佳的天线（RSRP）。</li><li>both - 两根天线均设置为外置</li><li>div - 分集天线设置为外置</li><li>main - 主天线设置为外置</li><li>none - 未选择外置天线（使用内置天线） </li></ul> |
| **external-antenna-selected** () | 该设置仅适用于 Chateau 路由器，Chateau 5G 版本除外。当“**external-antenna**”设置为“auto”时，显示当前选择的天线 |
| **sim-slot** () | 该设置适用于具有可切换 SIM 插槽的路由器（LtAP、SXT）。不同产品的选择选项有所不同。 |
| **esim-channel** (*auto \| at;*；默认：*auto*)  | 用于 esim 管理的控制通道 |
| **link-recovery-timer** (*integer* 默认：*120* 范围：*120..4294967295*)  | 如果 lte 接口未进入 (R)running 状态，经过该秒数后将重新配置该接口 |

#### LTE eSIM

```ros
RouterOS version: 7.18+
```

[MikroTips: How to activate your eSIM for the first time!](https://www.youtube.com/watch?v=v0WtU1xBB-Q)

此菜单包含与使用 RouterOS 内置 LPA（eSIM [Local Profile Assistant](http://en.wikipedia.org/wiki/Remote_SIM_provisioning)）进行 eSIM（[embedded Subscriber Identification Module](http://en.wikipedia.org/wiki/ESIM)）配置和管理相关的命令。

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

RouterOS LPA 支持：

- 固件支持 SIM low access 命令的 AT 调制解调器（AT+CCHO；AT+CCHC；AT+CGLA）。
- 固件支持 SIM low level access service 的 MBIM 调制解调器（UUID\_SERVICE\_MS\_UICC）。

其他要求：

- 将 SIM 卡规格的 eSIM（物理 eSIM）插入 RouterBoard SIM 插槽。
- 调制解调器上存在 eSIM/eUICC（焊接芯片），并且调制解调器设置为使用该插槽。
- 在 eSIM 芯片上配置和删除 SIM 配置文件期间，能够连接到 eSIM SIM 配置文件提供商的 SM-DP+ 配置服务器（可以使用另一个 eSIM 配置文件或另一个 WAN 接口建立连接）。
- 仅当活动插槽为 eSIM 时，才能配置 eSIM。
- 某些设备具有多个 SIM 插槽，要使用 eSIM，需要使用命令“/interface/lte/settings/set sim-slot=esim”切换插槽。

命令 `/interface/lte/esim/esim-id [find /interface/lte]` 可用于检查调制解调器是否支持 SIM low access 命令以及是否存在 eSIM。

如果使用带嵌入式 eSIM 芯片的第三方调制解调器，请参阅调制解调器手册，了解选择 eSIM 插槽所需的 AT 命令（AT!UIMS；AT+QUIMSLOT 等）。

**Commands**

| 属性 | 说明 |
| :-- | :-- |
| **deactivate** | 停用（禁用）eSIM 配置文件。 <br/><br/><code>/interface/lte/esim/deactivate number=0</code><br/> |
| **activate** | 启用 eSIM 配置文件。 <br/><br/><code>/interface/lte/esim/activate number=0</code><br/> |
| **delete** | 从 eSIM 卡中永久删除 eSIM 配置文件。 <br/><br/><code>/interface/lte/esim/delete number=0</code><br/> |
| **print** | 列出 eSIM 上已安装的 eSIM 配置文件 <br/><br/><code>/interface/lte/esim/print</code> |
| **provision** | 配置新的 eSIM 配置文件。该命令接受四个参数： <br/><ul><li><strong>interface</strong> - 将为其启用 eSIM 配置文件的接口。</li><li><strong>matching-id</strong> - 激活码令牌。示例：matching-id=ABCD10EFGHI5KL6M</li><li><strong>sm-dp-plus</strong> - SM-DP+ 服务器主机名</li><li><strong>confirmation-code </strong>- 确认码（某些情况下需要的一次性密码）</li><li><strong>activate</strong> - 配置完成后激活新创建的配置文件（yes&#124;no；默认：<em>yes</em>）[<em>从 7.20beta6 版本开始可用。在 7.20beta6 之前，配置文件在配置后默认不会激活。</em>]</li><li><strong>force-confirmation</strong> - 设置为 <strong>yes</strong> 时，命令不会等待用户确认，并自动接受配置文件配置（yes&#124;no；默认：<em>no</em>）</li></ul> 从 QR 解码得到的 eSIM LPA 字符串示例：<strong>LPA:1$server.example.io$ABCD10EFGHI5KL6M</strong><br/><br/><code>/interface/lte/esim/provision interface=lte1 sm-dp-plus=server.example.io matching-id=ABCD10EFGHI5KL6M</code> |
| **esim-id** | 查询 eSIM ID。该命令接受一个参数： <br/><ul><li><strong>interface</strong> - 选择要查询 eSIM ID 的接口。</li></ul><br/><br/><code>/interface/lte/esim/esim-id interface=lte1 eid: 8903302342630000000004181FFFFFFF</code><br/> |
| **set-nickname** | 为 eSIM 配置文件设置昵称。 <br/><br/><code>/interface/lte/esim/set-nickname number=0 nickname=nickname1</code><br/> |
| **refresh-profile-list** | 重新查询 eSIM 配置文件列表。该命令接受一个参数： <br/><ul><li><strong>interface</strong> - 选择要重新查询 eSIM 配置文件的接口。</li></ul> |

##### 内置 eSIM 芯片的设备（MikroTik Connectivity） {#devices-with-built-in-esim-chip-mikrotik-connectivity}

:::info
这些设备预加载了 MikroTik Connectivity eSIM 配置文件。
https://mikrotik.com/connectivity
:::

| 设备型号 | 调制解调器 |
| :-- | :-- |
| S53UG+5HaxD2HaxD-TC&RG650E-EU | RG650E-EU |
| ATLGM&RG520F-EU | RG520F-EU |
| EC25-EU&KNe | EC25-EU |

##### 调制解调器 eSIM 管理支持表 {#modem-esim-management-support-table}

:::note
\* 这些调制解调器没有内置 eSIM。它们需要外部 eSIM 芯片。例如，标准 SIM 卡外形规格的物理 eSIM 卡。
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

#### Scanner

可以使用 `/interface/lte/scan` 命令扫描 LTE 接口。示例：

```ros
[admin@MikroTik] > /interface/lte/scan duration=60 number=0
Columns: OPERATOR, MCC-MNC, RSSI, RSRP, RSRQ
OPERATOR  MCC-MNC  RSSI    RSRP    RSRQ
LMT         24701  -36dBm  -63dBm  -7dB
```

可用属性：

| 属性 | 说明 |
| :-- | :-- |
| **duration** (*integer*) | 扫描持续时间，单位为秒 |
| **freeze-frame-interval** (*integer*) | 数据输出之间的时间间隔 |
| **number** (*integer*) | 接口编号或名称 |

#### 监控 LTE 详情 {#monitoring-lte-details}

可以使用 CLI 命令 `/interface/lte/monitor` 监控 LTE 接口参数。该命令返回小区级数据（例如运营商、小区 ID、信号信息）和调制解调器元数据（固件、型号、SIM 标识）。

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

可以使用 `/interface/lte/show-capabilities` CLI 命令检查 LTE 接口能力。

##### 输出示例 {#example-output}

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

| 能力 | 说明 |
|------------|-------------|
| **modem-bus-location** | LTE 调制解调器所连接的物理 USB 总线 |
| **cell-scan** | 支持 `interface/lte/cell-monitor` 命令 |
| **network-scan** | 支持 `interface/lte/scan` 命令 |
| **roaming-barring** | 支持禁止漫游 |
| **apn-address-family** | 支持的 IP 地址族（IPv4、IPv6） |
| **max-apn-count** | 可同时处于活动状态的 APN 配置最大数量 |
| **rat-modes** | 支持的无线接入技术（GSM、3G、LTE、5G） |
| **band-selection** | 支持 LTE/5G 频段设置命令 |
| **lte-bands** | 调制解调器支持的 LTE 频段列表 |
| **nr-bands** | 调制解调器支持的 5G 频段列表 |
| **passthrough** | 支持 LTE 透传 |
| **firmware-update** | 支持 `interface/lte/firmware-upgrade` |
| **lte-attach-config** | 支持 LTE attach APN 配置（设置与已配置相同的 APN） |
| **at-chat** | 支持 `interface/lte/at-chat` |
| **framed-route-apn** | 在多 APN 设置中，哪个 APN 支持 framed routing（Routing behind） |

#### 调制解调器固件升级命令 {#modem-firmware-upgrade-command}

该命令用于检查受支持的 MikroTik 调制解调器是否有更新，并在有可用更新时升级调制解调器固件。

检查固件更新可用性和安装更新需要有效的互联网连接，具体取决于调制解调器的互联网连接方式，可通过任意 RouterOS 接口或调制解调器接口（FOTA）提供，各调制解调器支持的连接方式请参阅下表。

| Arguments / Properties | Description |
| :-- | :-- |
| **upgrade** (*yes \| no; Default: **no***) | 设置命令执行模式：<br/><ul><li><em>no</em> - 显示当前调制解调器固件版本，并显示最新可用固件版本</li><li><em>yes</em> - 执行固件安装</li></ul> |
| <strong>update-channel</strong> (<em>stable &#124; testing</em>; Default: <strong>stable</strong>) <br/> | 设置使用的固件更新通道：<br/><ul><li><em>stable</em> - 供一般使用的固件版本</li><li><em>testing</em> - 抢先体验/测试通道，固件在 stable 通道发布前先在此发布</li></ul> 该功能从 v7.17beta2 起可用。 |
| **firmware-file** (*string*; Default:"" ) | 允许用户覆盖固件更新来源，并从自定义位置（文件、url）执行升级，适用于无法通过互联网连接 MikroTik 升级服务器进行升级的环境，例如私有网络等。 |

:::warning
尝试升级 LTE 调制解调器固件前，请先将 RouterOS 版本升级到最新版本[如何升级 RouterOS](/docs/getting-started/installation-and-upgrade/upgrade)
:::

##### 支持固件更新的调制解调器及所需连接 {#modems-with-firmware-update-support-and-connectivity-required}

使用命令 ***`/interface/lte/monitor [find]` once*** 获取返回的属性“model”，以识别已安装的调制解调器型号。

| Modem | Required connectivity to MikroTik upgrade servers |
| :-- | :-- |
| <strong>EC200A-EU</strong><br/> R11eL-EC200A-EU | 使用调制解调器 LTE 接口 使用任意 RouterOS 接口（7.18beta1+） |
| **EG06-A** | 使用任意 RouterOS 接口 |
| **EP06-A** | 使用任意 RouterOS 接口 |
| **EG12-EA** | 使用任意 RouterOS 接口 |
| **EG18-EA** | 使用任意 RouterOS 接口 |
| <strong>FG621-EA</strong><br/> R11eL-FG621-EA | 使用任意 RouterOS 接口 |
| **R11-LTE** | 使用调制解调器 LTE 接口 |
| **R11e-4G** | 使用任意 RouterOS 接口 |
| **R11e-LTE6** | 使用任意 RouterOS 接口 |
| **RG502Q-EA** | 使用任意 RouterOS 接口 |
| **RG520F-EU** | 使用任意 RouterOS 接口 |

##### 调制解调器固件升级命令示例 {#modem-firmware-upgrade-command-examples}

检查是否有新的固件更新可用

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1
  installed: EG12EAPAR01A13M4G_02.001.02.001
     latest: EG12EAPAR01A15M4G_01.201.01.201
```

检查 early access/testing 通道中是否有新的固件更新可用

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 update-channel=testing
  installed: EG12EAPAR01A15M4G_01.201.01.201
     latest: EG12EAPAR01A15M4G_01.203.01.203
```

安装最新固件

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 upgrade=yes
```

从 early access/testing 通道安装最新固件

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 upgrade=yes update-channel=testing
```

从自定义位置（文件或 HTTP URL）执行固件升级。
执行 `firmware-upgrade` 命令前，接口必须处于 R（running）或 X（disabled）状态。

```ros
[admin@D53G] > /interface/lte/firmware-upgrade lte1 firmware-file=R11e-LTE6_V039_image upgrade=yes

[admin@D53G] > /interface/lte/firmware-upgrade lte1 firmware-file=http://firmwareserver.com/R11e-LTE6_V039_image upgrade=yes
```

##### 调制解调器 FOTA/DFOTA 下载 {#modem-fotadfota-downloads}

以下是我们调制解调器的所有最新 FW 版本：
https://box.mikrotik.com/d/bfa49081454e4da1972d/

你可以使用这些 FOTA 文件进行离线更新，或用于无法通过标准调制解调器 FW 升级访问 MikroTik 升级服务器的环境。

:::warning
在尝试升级 LTE 调制解调器固件之前，请先将 RouterOS 升级到最新版本。[如何升级 RouterOS](/docs/getting-started/installation-and-upgrade/upgrade)

LTE 调制解调器设计为尽可能拒绝不兼容的 FOTA/DFOTA 固件包。但是，手动升级固件始终存在风险。安装错误的固件镜像可能导致调制解调器故障、功能丧失或永久性损坏，从而可能需要更换调制解调器。

请勿中断升级过程。写入固件期间断电、设备重启、调制解调器复位或任何其他中断都可能使调制解调器进入无法恢复的状态。

用户有责任确认固件文件适用于正在升级的确切调制解调器型号和硬件版本，并确保整个升级过程中供电稳定。对于刷入错误固件文件或中断固件升级过程导致的任何损坏、功能丧失或其他问题，MikroTik 不承担责任。
:::

###### FOTA 调制解调器 {#fota-modems}

FOTA（Firmware Over‑The‑Air）。这些调制解调器没有 source-version 子文件夹。你可以从任意当前 FW 版本安装最新的调制解调器 FW。

| 调制解调器型号 | 说明 |
|---|---|
| R11e-LTE | 调制解调器通过其 LTE 连接自行下载固件（FOTA）。无法进行离线升级，如果你的环境中无法访问 MikroTik 升级服务器，可以将 FW 托管在调制解调器可访问的某个 http 服务器上，并以这种方式升级 FW |
| R11e-LTE6 | - |
| R11l-LTE7 | - |
| R11e-4G | - |
| EC25-EU | 调制解调器固件作为 NPK 包安装 |
| EG25-G | 调制解调器固件作为 NPK 包安装 |
| SXT-LTE | 仅适用于单一产品 RBSXTLTE3-7。调制解调器固件作为 NPK 包安装 |

###### DFOTA 调制解调器 {#dfota-modems}

DFOTA（Delta Firmware Over‑The‑Air）。这些调制解调器按版本设有子文件夹 `modem/<model>/<currentVersion>/<targetVersion>_image`，targetVersion 是从当前 FW 版本可用的最新升级版本。如果当前 FW 版本较旧，可能需要分多步升级。

| 调制解调器型号 | 说明 |
|---|---|
| EC200A-EU | 支持使用最新 RouterOS v7 版本进行离线 DFOTA 升级。在较旧版本中，调制解调器通过其 LTE 连接自行下载固件 |
| EP06-A | - |
| EG06-A | - |
| EG12-EA | - |
| EG18-EA | - |
| EG120K-EA | - |
| RG502Q-EA | - |
| RG520F-EU | - |
| RG520F-EUX | 适用于 ATL 5G R16 的特殊调制解调器 FW 版本（ATLGM&RG520F-EU） |
| RG650E-EU | 该调制解调器使用 A/B System Update 机制，而不是 DFOTA。由于完整固件镜像会写入非活动系统分区，因此固件包明显大于典型 DFOTA 包 |
| FG621-EA | - |
| BG77 | PPP 串行调制解调器。`/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes firmware-file=` |
| BG770A | PPP 串行调制解调器。`/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes firmware-file=` |

#### 用户 at-chat 命令 {#user-at-chat-command}

可以使用 `/interface/lte/at-chat` 命令向 LTE 接口发送用户定义的“at-chat”命令。

```ros
[admin@MikroTik] > /interface/lte/at-chat lte1 input="AT"
  output: OK
```

也可以在命令中使用“wait”参数 *wait=yes*，使“at-chat”等待 5 秒并返回所有输出，而不是仅返回首次接收到的数据。这对于返回多行输出或大数据块的命令很有用。

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

还可以在脚本中使用“at-chat”功能，并将命令输出赋值给变量。

```ros
[admin@MikroTik] > :global "lte_command" [/interface/lte/at-chat lte1 input="AT+CEREG?" as-value ]
[admin@MikroTik] > :put $"lte_command"
output=+CEREG: 0,1
OK
```

### 快速设置示例 {#quick-setup-example}

从网络设置开始——在 LTE apn 配置下添加新的连接参数（由网络运营商提供）：

```ros
/interface/lte/apn/add name=profile1 apn=phoneprovider.net authentication=chap password=web user=web
```

为 LTE 连接选择新创建的配置：

```ros
/interface/lte/set [find] apn-profiles=profile1
```

LTE 接口应显示 running（R）标志：

```ros
[admin@MikroTik] > /interface/lte/print
Flags: X - disabled, R - running
0 R name="lte1" mtu=1500 mac-address=AA:AA:AA:AA:AA:AA
```

如有需要，为 LTE 接口添加 NAT Masquerade，使本地网络能够访问互联网：

```ros
/ip/firewall/nat/add action=masquerade chain=srcnat out-interface=lte1
```

接口添加完成后，可以使用“info”命令查看客户端获取的参数（返回的参数取决于 LTE 硬件设备）：

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

### Passthrough 示例 {#passthrough-example}

部分 LTE 接口支持 LTE Passthrough 功能，可将 IP 配置直接应用到客户端设备。在这种情况下，IP 配置由调制解调器固件负责，路由器仅用于配置调制解调器设置：APN、Network Technologies 和 IP-Type。在此配置中，路由器不会从调制解调器获取 IP 配置。如果调制解调器支持，LTE Passthrough 调制解调器可以传递 IPv4 和 IPv6 地址。部分调制解调器支持多个 APN，可将每个 APN 的流量传递到指定路由器接口。

Passthrough 仅适用于一台主机。路由器会自动检测收到的第一个数据包的 MAC 地址，并将其用于 Passthrough。如果网络中有多台主机，可以将 Passthrough 锁定到指定 MAC。在 Passthrough 提供 IP 的网络中的主机上，也应在该接口启用 DHCP-Client。请注意，无法通过公共 lte IP 地址或 Passthrough 所使用的主机连接到 LTE 路由器。建议创建一条从 LTE 路由器到主机的额外连接，用于配置。例如，在 LTE 路由器和主机之间创建一个 vlan 接口。

要启用 Passthrough，需要新增条目，或应在 `/interface/lte/apn` 菜单中更改默认条目

:::warning
并非所有芯片组都支持直通。
要检查调制解调器是否支持直通：

```ros
/interface/lte/show-capabilities [find]
```
:::

#### 示例 {#examples}

要在 ether1 上配置 Passthrough：

```ros
[admin@MikroTik] > /interface/lte/apn/add apn=apn1 passthrough-interface=ether1
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=apn1
```

要在 ether1 上为主机 00:0C:42:03:06:AB 配置 Passthrough：

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

要为不同接口配置使用相同 APN 的多个 APN：

```ros
[admin@MikroTik] > /interface/lte/apn/add name=interface1 apn=apn1
[admin@MikroTik] > /interface/lte/apn/add name=interface2 apn=apn1 passthrough-interface=ether1
[admin@MikroTik] > /interface/lte/set lte1 apn-profiles=interface1
[admin@MikroTik] > /interface/lte/set lte2 apn-profiles=interface2
```

此外，可以通过在同一 passthrough-interface 上手动创建 DHCP 服务器来覆盖默认动态 dhcp server 参数/选项。例如，默认 lease-time 为 1 分钟：

```routeros
[admin@MikroTik] > /ip/dhcp-server/print detail
Flags: D - dynamic; X - disabled, I - invalid
 0 D  name="apn2" interface=ether2 lease-time=1m address-pool=static-only use-radius=no lease-script="" address-lists=""
```

现在，如果要将 lease-time 更改为例如 30 分钟，则可以在 passthrough-interface 上创建新的 dhcp-server，在本例中为 ether2：

```routeros
[admin@MikroTik] > /ip/dhcp-server/add interface=ether2 name=dhcp1 lease-time=30m
[admin@MikroTik] > /ip/dhcp-server/print detail
Flags: D - dynamic; X - disabled, I - invalid
 0    name="dhcp1" interface=ether2 lease-time=30m address-pool=static-only use-radius=no lease-script="" address-lists=""
```

### 双 SIM {#dual-sim}

#### 可切换 SIM 插槽的板卡 {#boards-with-switchable-sim-slots}

| RouterBoard | 调制解调器插槽 | SIM 插槽 1 | SIM 插槽 2 | 可切换 |
| :-- | :-- | :-- | :-- | :-- |
| LtAP | lower | 2 | 3 | Y |
|  | upper | 1 |  | N |
| LtAP mini |  | up | down | Y |
| SXT R |  | a | b | Y |
| ATL 5G |  | sim | esim | Y |

SIM 插槽切换命令

- RouterOS v7

```ros
/interface/lte/settings/set sim-slot=down
```

- RouterOS v6 6.45.1 之后的版本

```ros
/system/routerboard/modem/set sim-slot=down
```

- RouterOS v6 pre 6.45.1：

```ros
/system/routerboard/sim/set sim-slot=down
```

详情请参阅板卡框图、Quick Guide 和 User manual。

#### 使用示例 {#usage-example}

请访问以下链接 - [Dual SIM Application](/docs/mobile-networking/dual-sim-application)，查看如何借助 RouterOS 脚本和 scheduler 根据漫游状态以及接口状态为 down 的情况切换 SIM 插槽的示例。

### 提示与技巧 {#tips-and-tricks}

本段包含其他功能和用例的信息。

#### 使用 Cell 信息查找设备位置 {#find-device-location-using-cell-information}

在使用 R11e-LTE International version 卡的设备（wAP LTE kit）上，`info` 命令下会提供一些额外信息。

```
   current-operator: 24701
                lac: 40
     current-cellid: 2514442
```

| Property | Description |
| :-- | :-- |
| **current-operator** (*integer*; Default: ) | 包含 MCC 和 MNC。例如：`current-operator: 24701` 可拆分为：MCC=247 MNC=01 |
| **lac** (*integer*; Default: ) | 位置区码（LAC） |
| **current-cellid** (*integer*; Default: ) | 基站标识号 |

这些值可用于在数据库中查找位置：[Cell Mapper](http://www.cellmapper.net)

#### 使用 Cell 锁定 {#using-cell-lock}

可以将 R11e-LTE、R11e-LTE6 和 R11e-4G 调制解调器及配备这些调制解调器的设备锁定到指定的 LTE 基站。LTE `info` 命令提供当前使用的蜂窝基站信息：

```
         phy-cellid: 384
             earfcn: 1300 (band 3, bandwidth 20Mhz)
```

| Property | Description |
| :-- | :-- |
| **phy-cellid** (*integer*; Default: ) | 当前使用的基站的物理小区标识（PCI）。 |
| **earfcn** (*integer*; Default: ) | 绝对射频信道号 |

可从移动运营商或使用在线服务获取基站的精确位置、可用频段和其他信息：

[CellMapper](https://www.cellmapper.net/map)

使用获取到的这些变量，可以向调制解调器发送 AT 命令，以当前格式锁定基站：

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

要将调制解调器锁定到之前使用过的基站，可以使用 at-chat：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1300,384"
```

对于 R11e-LTE，所有设置的锁定在重启或调制解调器重置后都会丢失。也可以从“cell-monitor”收集小区数据。

对于 R11e-LTE6，小区锁定仅对主频段有效。如果同一频段上有多个信道，并且希望将其锁定到特定 earfcn，这很有用。请注意，小区锁定不针对特定频段，对于 ca-band，它也可能使用其他频段，除非使用频段锁定。

使用小区锁定将主频段设置为 1300 earfcn，并将第二信道用于 ca-band：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1300,138"
```

现在主信道使用 earfcn：1300：

```
         primary-band: B3@20Mhz earfcn: 1300 phy-cellid: 138
              ca-band: B3@5Mhz earfcn: 1417 phy-cellid: 138
```

也可以反向设置：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=2,3,,1417,138"
```

现在主频段使用 earfcn：1417：

```
         primary-band: B3@5Mhz earfcn: 1417 phy-cellid: 138
              ca-band: B3@20Mhz earfcn: 1300 phy-cellid: 138
```

对于 R11e-LTE6 调制解调器，小区锁定信息在重启或调制解调器复位后不会丢失。要移除小区锁定，请使用 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="AT*Cell=0"
```

**for R11e-4G**

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

所有可用的 PLMN 代码见[此处](https://en.wikipedia.org/wiki/Mobile_country_code)。该变量也可以留空

要将调制解调器锁定到小区，调制解调器需要处于非工作状态。对于 **R11e-4G** 调制解调器，最简单的方法是在“modem-init”字符串中添加一行 CellLock：

```ros
/interface/lte/set lte1 modem-init="AT%CLCMD=1,1,3250,244,\"24705\""
```

也可以通过提供列表来添加多个小区，而不是按以下格式提供一个基站的信息：

```
AT%CLCMD=<mode>,<mode2>,<EARFCN_1>,<PCI_1>,<PLMN_1>,<EARFCN_2>,<PCI_2>,<PLMN_2>
```

例如，锁定同一频段和运营商内的两个不同 PCI：

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

也可以将多个小区添加到小区锁定中。例如，锁定到两个不同的小区：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/4g\",2,3050,448,1574,474"
```

要移除小区锁定，请使用以下 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="at+qnwlock=\"common/4g\",0"
```

:::warning

1. 重启或调制解调器重置后，小区锁定信息不会保存。 2. AT+QNWLOCK 命令可以锁定小区和频段。因此，模块可以优先注册到锁定的小区，但根据 3gpp 协议，即使该小区不在命令锁定范围内，模块仍会被重定向或切换到信号更好的小区。这是正常现象。
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

锁定到 TDD n78 频段且 earfcn=628032、phy-cellid=138 的小区示例：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\",138,628032,30,78"
```

查询当前配置：

```ros
[admin@MikroTik] > /interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\""
  output: +QNWLOCK: "common/5g",138,628032,30,78
          OK
```

要移除小区锁定，请使用以下 at-chat 命令：

```ros
/interface/lte/at-chat lte1 input="AT+QNWLOCK=\"common/5g\",0"
```

:::warning

1. 小区锁定信息在重启或调制解调器重置后不会保存。

2. AT+QNWLOCK 命令可以锁定小区和频段。因此，可以优先让模块注册到锁定的小区，但根据 3gpp 协议，即使该小区不在命令锁定范围内，模块仍会被重定向或切换到信号更好的小区。这是正常现象。

3. 锁定小区时，请确保模块支持锁定小区对应的频段，否则将返回错误代码。

4. AT+QNWLOCK="common/5g" 不支持锁定 NSA 的 5G 小区。（仍可使用 AT+QNWLOCK="common/4g" 命令锁定 lte 锚点小区。）

5. 该 Write Command 仅在模块处于完整功能状态时执行（lte 接口未禁用）。

6. 不建议在商业环境中使用该命令。
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

Example:

```ros
/interface/lte/at-chat lte1 input="AT+GTCELLLOCK=1,0,0,6175,176"
```

#### 小区监控 {#cell-monitor}

Cell monitor 允许扫描附近可用的移动网络小区：

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

收集的数据可用于更精确的位置检测或 Cell lock。

:::warning
并非所有调制解调器都支持该功能
:::

### 故障排除 {#troubleshooting}

#### 启用 LTE 日志 {#enable-lte-logging}

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

对于 Huawei 调制解调器，无法使用 `/interface/lte/set lte1 band=""` 选项锁定频段。

可以使用 AT 命令手动锁定到所需频段。

要检查所有支持的频段，请运行 at-chat 命令：

```ros
[admin@MikroTik] /interface/lte/at-chat lte1 input="AT^SYSCFGEX=\?"

output: ^SYSCFGEX: ("00","03","02","01","99"),((2000004e80380,"GSM850/GSM900/GSM1800/GSM1900/WCDMA BCI/WCDMA BCII/WCDMA BCV/WCDMA BCVIII"),
(3fffffff,"All Bands")),(0-2),(0-4),((800d7,"LTE BC1/LTE BC2/LTE
BC3/LTE BC5/LTE BC7/LTE BC8/LTE BC20"),(7fffffffffffffff,"All Bands"))
OK

```

锁定到 LTE band 7 的示例：

```ros
[admin@MikroTik] /interface/lte/set lte1 modem-init="AT^SYSCFGEX=\"03\",3FFFFFFF,2,4,40,,"
```

将最后的 **40** 更改为目标 band 对应的十六进制值，其中：

```
4 LTE BC3
40 LTE BC7
80000 LTE BC20
7FFFFFFFFFFFFFFF  All bands
etc
```

所有 band HEX 值和 AT 命令均可在 [Huawei AT Command Interface Specification guide](https://download-c.huawei.com/download/downloadCenter?downloadId=29741&version=72288&siteCode=) 中找到。

检查 band 是否已锁定：

```ros
[admin@MikroTik] /interface/lte/at-chat lte1 input="AT^SYSCFGEX\?"

output: ^SYSCFGEX: "03",3FFFFFFF,0,2,40
OK
```

有关更多信息，请查阅调制解调器制造商的 AT 命令参考手册。

#### 搭配 RB9xx 系列设备的 mPCIe 调制解调器 {#mpcie-modems-with-rb9xx-series-devices}

如果调制解调器在软重启后未被识别，则可能需要在 USB 端口初始化前添加延迟。可使用以下命令完成此操作：

```ros
/system/routerboard/settings/set init-delay=5s
```

#### 带 USB-A 端口和 mPCIe 的主板 {#boards-with-usb-a-port-and-mpcie}

某些设备（例如特定 RB9xx 和 RBLtAP-2HnD）在单个 mPCIe 插槽和 USB-A 端口之间共用相同的 USB 线路。如果未自动切换且未检测到调制解调器，可能需要手动切换为使用 USB-A 或 mini-PCIe：

```ros
/system/routerboard/usb/set type=mini-PCIe
```

#### 避免 tethering 限速 {#avoiding-tethering-speed-throttling}

某些运营商仅对使用 SIM 卡的设备提供无限流量，来自移动热点或 tethering 的所有其他数据都会受到流量或吞吐速率的严格限制。一些资料发现，这种限制是通过监控数据包的 TTL（Time To Live）值来确定是否需要应用限制（每经过一个“跳”，TTL 减少 1）。RouterOS 允许更改从路由器发出的数据包的 TTL 参数，以隐藏子网。请注意，这可能与公平使用策略冲突。

```ros
IPv4 mangle rule:
/ip/firewall/mangle
add action=change-ttl chain=postrouting new-ttl=set:65 out-interface=lte1 passthrough=yes
IPv6 mangle rule:
/ipv6/firewall/mangle
add action=change-hop-limit chain=postrouting new-hop-limit=set:65 passthrough=yes
```

#### 多次输入错误 PIN 码后解锁 SIM 卡 {#unlocking-sim-card-after-multiple-wrong-pin-code-attempts}

SIM 卡锁定后，可通过“at-chat”解锁。

检查当前 PIN 码状态：

```ros
/interface/lte/at-chat lte1 input="at+cpin\?"
```

如果卡已锁定，请提供以下内容以解锁：

```ros
/interface/lte/at-chat lte1 input="AT+CPIN=\"PUK_code\",\"NEW_PIN\""
```

将 PUK\_code 和 NEW\_PIN 替换为相应的值。

:::warning
SIM 插槽选择命令在 v6.45.1 和 v7 中发生了变化。某些设备型号（如 SXT）的 SIM 插槽命名为“a”和“b”，而不是“up”和“down”
:::
