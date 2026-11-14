---
sidebar_key: "system-information-and-utilities/device-mode"
sidebar_position: 2
title: "设备模式"
sidebar_label: "设备模式"
description: "device-mode 功能会限制路由器访问并限制配置选项以增强安全性，可根据设备类型和 RouterOS 版本在 advanced、home、basic 或 ros 模式下使用。更改需要通过断电重启或按键进行物理确认，并且更新尝试次数有限，以防止未经授权的模式更改。"
tags:
  - 'device-mode'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/device-mode
captured_at: '2026-11-04T11:33:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 描述 {#description}

**device-mode** 是一项功能，用于对设备设置特定限制，或限制对特定配置选项的访问。它有助于保护您的路由器和网络，防止攻击者获得未授权访问并将其用作攻击其他网络的网关。

可用的 device-mode 有 *advanced*、*home*、*basic* 和 *ros*。device-mode 配置在路由器上出厂预装（适用于运行 MikroTik RouterOS v7.17 或更高版本的设备）。*Advanced（以前称为 enterprise）* 模式为 CCR 和 1100 系列设备配置，*home* 模式为家庭路由器配置，basic 模式为任何其他类型的设备配置。对于运行 RouterOS 7.17 之前版本的设备，所有设备都使用 *advanced/enterprise* 模式。

```ros
[admin@MikroTik] > /system/device-mode/print 
                 mode: advanced     
     allowed-versions: 7.13+,6.49.8+
              flagged: no           
     flagging-enabled: yes          
            scheduler: yes          
                socks: yes          
                fetch: yes          
                 pptp: yes          
                 l2tp: yes          
       bandwidth-test: yes          
          traffic-gen: no           
              sniffer: yes          
                ipsec: yes          
                romon: yes          
                proxy: yes          
              hotspot: yes          
                  smb: yes          
                email: yes          
             zerotier: yes          
            container: no           
  install-any-version: no           
           partitions: no           
          routerboard: yes          
        attempt-count: 0   
```

device-mode 可由授权的 RouterOS 用户更改，但更改它需要物理接触设备。更改 device-mode 后，您需要通过按下设备本身的按钮来确认，或执行“冷重启”——即拔掉电源。确认更改后，无论采用哪种确认方式，**设备都将重启**！

## 更改 device-mode 的模式 {#changing-mode-of-device-mode}

```ros
[admin@MikroTik] > /system/device-mode/update mode=home 
  update: please activate by turning power off or pressing reset or mode button 
          in 5m00s
-- [Q quit|D dump|C-z pause]
```

如果在指定时间内未执行断电或按下按钮，模式更改将被取消。如果并行运行了另一个 update 命令，两者都会被取消。

:::danger
有若干 EOL 产品不会通过按下复位按钮来“确认”模式更改。这些路由器只能通过断电重启来确认模式更改。
:::

为了保护设备免受攻击者侵害——攻击者可能悄悄获得对您路由器的访问权限，用某些脚本滥用它，并只是试图等到您重启路由器，甚至不知道当时您正在接受某个入侵者请求的更改——您只能“update”模式三次。有一个计数器会统计进行了多少次更新尝试，并且不允许再进行任何更新。只有管理员对路由器执行断电重启，或在看到模式设置更新尝试中出现此类警告时按下按钮（与接受任何更新时相同），该计数器才能被重置。

## 使用 Netinstall 或 FlashFig 更改 device-mode 设置 {#changing-device-mode-settings-using-netinstall-or-flashfig}

从 RouterOS 7.22 开始，可以配置 **device‑mode**、**protected‑routerboot** 以及其他设置。

有关更多信息，请参阅 [网络安装](../getting-started/installation-and-upgrade/netinstall/index.md) 和 [FlashFig](../management-tools/flashfig.md) 文档。

## 启用 device-mode 功能 {#enabling-device-mode-feature}

```ros
[admin@MikroTik] > /system/device-mode/update container=yes 
  update: too many unsuccessful attempts, turn off power or reboot by pressing reset or mode button in 4m55s to reset attempt-count
```

以下命令可在 /**system/device-mode** 菜单中使用：

| 属性 | 描述 |
| :-- | :-- |
| get | 返回一个值，您可以将其赋给变量或显示在屏幕上。 |
| print | 显示活动模式及其属性。 |
| update | 将更改应用到指定属性，见下文。 |

## 可用的 device-mode 模式 {#available-device-mode-modes}

有四种可用于配置的设备模式（mode=advanced 是默认模式），每种模式都有一组在使用时不允许的功能。请注意，没有一种模式会启用所有功能。即使您启用了“advanced”模式，某些功能也需要启用。ROSE device-mode 与 advanced 模式非常相似，但它是为 RDS 及类似设备而设计的，这些设备具有更广泛的使用磁盘选项，因此从出厂起就支持容器安装。有关每个选项含义的更多详细信息，请参阅“功能说明”一节。因此，从下表可以看出，“traffic-gen、container、partitions、routerboard”功能始终处于禁用状态，除非管理员用户明确启用。

| **功能 / 属性** | **Home** | **Basic** | **Advanced** | **ROSE** |
| :-- | :-- | :-- | :-- | :-- |
| **带宽测试** (/tool/bandwidth-test) | no | no | yes | yes |
| **容器** (/container) | no | no | no | yes |
| **电子邮件** (/tool/e-mail) | no | yes | yes | yes |
| **Fetch** (/tool/fetch) | no | yes | yes | yes |
| **热点** (/ip/hotspot) | no | no | yes | yes |
| **安装任意版本** (`install-any-version`) | no | no | no | no |
| **IPsec** (/ip/ipsec) | yes | yes | yes | yes |
| **L2TP** (/interface/l2tp) | yes | yes | yes | yes |
| **分区** (/`partitions`) | no | no | no | no |
| **PPTP** (/interface/pptp) | yes | yes | yes | yes |
| **代理** (/ip/proxy) | no | no | yes | yes |
| **RoMon** (/tool/romon) | no | yes | yes | yes |
| **Routerboard 设置** (/system/routerboard) | no | no | no | no |
| **计划任务** (`scheduler`) | no | yes | yes | yes |
| **SMB** (/ip/smb) | yes | yes | yes | yes |
| **嗅探器** (/tool/sniffer) | no | yes | yes | yes |
| **SOCKS 代理** (/ip/socks) | no | no | yes | yes |
| **流量生成器** (/tool/traffic-gen) | no | no | no | no |
| **ZeroTier** (`zerotier`) | no | no | yes | yes |

## 可用属性列表 {#list-of-available-properties}

| 属性 | 描述 |
| :-- | :-- |
| **scheduler, socks, fetch, pptp, l2tp, bandwidth-test, traffic-gen, sniffer, ipsec, romon, proxy, hotspot, smb, email, zerotier, container, install-any-version****, partitions, routerboard** (*yes \| no*) | 可用功能列表，可通过 **device-mode** 选项控制。有关每个选项含义的更多详细信息，请参阅“功能说明”一节。 |
| **activation-timeout** (default: **5m**); | 复位按钮或断电激活超时可在 00:00:10 .. 1d00:00:00 范围内设置。如果在此间隔内未按下复位按钮（或未执行冷重启），更新将被取消。 |
| **flagging-enabled** (*yes \| no*; Default: **yes**) | 设备将执行配置分析，如果发现可疑代码的痕迹，将触发 flagged 模式，设置 **flagged=yes**，启用 **flagged=yes** 中描述的限制。请参阅“[Flagged 状态](./device-mode.md#flagged-status)”段落。 |
| **flagged** (*yes \| no*; Default: **no**) | RouterOS 采用各种机制来检测对其系统文件的篡改。如果系统检测到对 RouterOS 的未授权访问，则状态“flagged”会设置为 yes。如果“flagged”设置为 yes，为了您的安全，会实施某些限制。有关更多信息，请参阅下面的章节。 |
| **mode:** (basic, home, advanced, ros; default: **advanced**); | 允许从可用模式中选择，这些模式将限制设备功能。默认情况下，**advanced** 模式允许除 **traffic-gen、container、partitions、** **install-any-version****、routerboard** 之外的选项。因此，要使用这些功能，您需要通过执行 device-mode 更新来启用它。默认情况下，**home** 模式禁用以下功能：**scheduler、socks、fetch、bandwidth-test、traffic-gen、sniffer、romon、proxy、hotspot、email、zerotier、container、** **install-any-version****、partitions、routerboard。** |

可以对可用功能进行更具体的控制。device-mode 控制的每个功能都可以专门开启或关闭。

例如 **scheduler** 将不允许在 `/system/scheduler` 中执行任何操作。所使用的 device-mode 会禁用所有列出的功能，例如，如果使用 **mode**=home，但您的设置需要 **zerotier**，则需要通过物理接触设备来按下按钮或切断电源，以执行 device-mode 更新 `/system/device-mode/update` zerotier=yes。

#### 更改 device-mode 的高级示例 {#advanced-example-of-changing-device-mode}

```ros
[admin@MikroTik] > /system/device-mode/update mode=home email=yes
[admin@MikroTik] > /system/device-mode/update mode=advanced zerotier=no
```

如果 update 命令指定了任何模式参数，此更新将替换整个 device-mode 配置。在这种情况下，除本命令指定的设置外，所有“按功能”设置都将丢失。例如：

```ros
[admin@MikroTik] > /system/device-mode/update mode=home email=yes fetch=yes
[admin@MikroTik] > /system/device-mode/print config
   mode: home
  fetch: yes
  email: yes
[admin@MikroTik] > /system/device-mode/update mode=advanced sniffer=no
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
     mode: advanced
  sniffer: no

```

我们看到 fetch = yes 和 email = yes 缺失了，因为它们被模式更改覆盖了。但是，仅指定“按功能”设置只会更改那些设置：

```ros
[admin@MikroTik] > /system/device-mode/update hotspot=no
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
     mode: advanced
  sniffer: no
  hotspot: no
```

如果该功能已禁用，交互式命令会显示错误消息：

```ros
[admin@MikroTik] > /system/device-mode/print config
     mode: advanced
  sniffer: no
  hotspot: no
[admin@MikroTik] > /tool/sniffer/quick 
failure: not allowed by device-mode
```

但是，可以将配置添加到已禁用的功能，但在 device-mode 中会有一条注释显示该功能已禁用：

```ros
[admin@MikroTik] > /ip/hotspot/add interface=ether1 
[admin@MikroTik] > /ip/hotspot/print 
Flags: X, S - HTTPS
Columns: NAME, INTERFACE, PROFILE, IDLE-TIMEOUT
#   NAME      INTERFACE  PROFILE  IDLE-TIMEOUT
;;; inactivated, not allowed by device-mode
0 X hotspot1  ether1     default  5m          
```

## 功能说明 {#feature-clarification}

| 功能 | 哪些菜单会变得不可更改的说明 |
| :-- | :-- |
| [bandwidth-test](../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md) | <em><code>/tool/bandwidth-test</code></em><em><code>/tool/bandwidth-server</code></em><br/><em><code>/tool/speed-test</code></em> |
| [routerboard](../hardware/routerboard.md) | *`/system/routerboard/settings`*（自动升级选项除外） |
| [container](../containers/index.md) | 所有容器功能 |
| install-any-version | RouterOS 将不再允许您安装低于“allowed-versions”属性下列出的版本的 RouterOS 版本。 |
| [email](./e-mail.md) | *`/tool/e-mail`* |
| [fetch](./fetch.md) | *`/tool/fetch`* |
| [hotspot](../authentication-authorization-accounting/hotspot-captive-portal/index.md) | *`/ip/hotspot`* |
| [ipsec](../virtual-private-networks/ipsec/index.md) | *`/ip/ipsec`* |
| [l2tp](../virtual-private-networks/l2tp/index.md) | <em><code>/interface/l2tp-server</code></em><br/><em><code>/interface/l2tp-client</code></em> |
| [partitions](./partitions.md) | */partitions* 不允许更改分区数量。如果您的路由器无法启动，它仍然能够启动到其他分区。崩溃恢复没有限制。 |
| [pptp](../virtual-private-networks/pptp.md) | <em><code>/interface/pptp-server</code></em><br/><em><code>/interface/pptp-client</code></em> |
| [proxy](../network-management/proxy/index.md) | *`/ip/proxy`* |
| [romon](../management-tools/romon.md) | *`/tool/romon`* |
| [scheduler](./scheduler.md) | *`/system/scheduler`* |
| [smb](../storage/smb.md) | *`/ip/smb`* |
| [sniffer](../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) | *`/tool/sniffer`* |
| [socks](../network-management/socks/index.md) | *`/ip/socks`* |
| [traffic-gen](../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) | <em><code>/tool/traffic-generator</code></em><br/><em><code>/tool/flood-ping</code></em><br/><em><code>/tool/ping-speed</code></em> |
| [zerotier](../virtual-private-networks/zerotier.md) | */zerotier* |

## 允许的版本 {#allowed-versions}

Device mode 在其参数中列出了名为“allowed-versions”的参数。这是一个 MikroTik 认为安全且不包含任何可被攻击者利用的严重漏洞的版本列表。
  
此设置不依赖于已安装的 RouterOS 版本，并作为单独的防护层工作，以防止攻击者逐步降级版本，从而到达任何已知存在漏洞的 RouterOS 发行版。当您将 RouterOS 升级到具有较新“allowed-versions”列表的发行版时，最旧的列表将被覆盖。如果您降级 RouterOS，“allowed-versions”列表不会改变，并将保持更新为最新列表。如果 device-mode 的“install-any-version”已启用，则该列表会被忽略。

## Flagged 状态 {#flagged-status}

除了 device-mode 功能外，RouterOS 现在还可以在系统启动时分析整个配置，以确定是否存在任何未经授权访问您路由器的迹象。如果检测到可疑配置，可疑配置将被禁用，并且 **flagged** 参数将设置为“yes”。此时设备具有 Flagged 状态，并会强制执行某些限制。

```ros
[admin@MikroTik] > /system/device-mode/print 
     mode: advanced
  flagged: yes
...
```

如果系统具有此 flagged 状态，当前配置可以工作，但无法执行以下操作：
  
bandwidth-test、traffic-generator、sniffer，以及针对以下程序启用或创建新配置条目的配置操作（仍然可以禁用或删除它们）：*system scheduler, SOCKS proxy, pptp, l2tp, ipsec, proxy, smb*。  
  
当路由器处于 flagged 状态时执行上述操作，您将收到错误消息：

```ros
[admin@MikroTik] > /tool/sniffer/quick 
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
[admin@MikroTik] > /int l2tp-client/add connect-to=1.1.1.1 user=user
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
```

要退出 flagged 状态，您必须执行命令“/system/device-mode/update flagged=no”。系统将要求您按下按钮，或执行硬重启（物理切断电源或对虚拟机执行硬重启）。
  
**重要！** 尽管系统已禁用触发 flagged 状态的任何看似恶意的规则，但在退出 flagged 状态之前，务必检查您的所有配置是否存在其他未知内容。如果您的系统已被标记，请假定您的系统已遭到入侵，并在重新启用系统使用之前对所有设置进行全面审计。完成审计后，请更改所有系统密码并升级到最新的 RouterOS 版本。

:::warning
从 RouterOS 7.17 版本开始，device-mode 限制双启动的 SwOS/RouterOS 切换；要启用：`/system/device-mode/update routerboard=yes`
:::
