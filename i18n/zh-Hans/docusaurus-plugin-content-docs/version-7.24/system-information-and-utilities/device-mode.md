---
title: "设备模式"
description: "device-mode 功能通过限制路由器访问和配置选项来增强安全性，根据设备类型和 RouterOS 版本，可使用 advanced、home、basic 或 ros 模式。更改需要通过断电重启或按下按钮进行物理确认，并且更新尝试次数有限，以防止未经授权的模式更改。"
tags:
  - 'device-mode'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/device-mode
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 描述 {#description}

**device-mode** 是一项对设备设置特定限制，或限制访问特定配置选项的功能。它有助于保护路由器和网络，防止攻击者获得未授权访问，并将其用作攻击其他网络的网关。

可用的 device-mode 包括 *advanced*、*home*、*basic* 和 *ros*。device-mode 配置在路由器出厂时预装（适用于搭载 MikroTik RouterOS v7.17 或更高版本的设备）。*Advanced（之前称为 enterprise）* 模式配置用于 CCR 和 1100 系列设备，*home* 模式配置用于家用路由器，basic 模式配置用于其他任何类型的设备。对于运行 RouterOS 7.17 之前版本的设备，所有设备均使用 *advanced/enterprise* 模式。

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

device-mode 可由获得授权的 RouterOS 用户更改，但更改需要物理访问设备。更改 device-mode 后，需要按下设备上的按钮进行确认，或执行“冷重启”，即拔掉电源。无论采用哪种确认方式，更改确认后，**设备都会重启**！

## 更改 device-mode 模式 {#changing-mode-of-device-mode}

```ros
[admin@MikroTik] > /system/device-mode/update mode=home 
  update: please activate by turning power off or pressing reset or mode button 
          in 5m00s
-- [Q quit|D dump|C-z pause]
```

如果在指定时间内未执行断电或按钮按下操作，模式更改将被取消。如果并行运行另一条 update 命令，两者都将被取消。

:::danger
有多款 EOL 产品不会通过按下 reset 按钮来“确认”模式更改。这些路由器只能通过断电重启确认模式更改。
:::

为保护设备免受攻击者侵害，防止攻击者在静默获得路由器访问权限后滥用脚本，并等待你重启路由器，而你在重启时甚至不知道自己正在接受入侵者请求的更改，因此模式只能“update”三次。有一个计数器会统计 update 尝试次数，并不再允许更多更新。只有当管理员在模式设置更新尝试时看到此类警告并对路由器进行断电重启或按下按钮时，该计数器才会重置（与接受任何更新相同）。

## 使用 Netinstall 或 FlashFig 更改 device-mode 设置 {#changing-device-mode-settings-using-netinstall-or-flashfig}

从 RouterOS 7.22 开始，可以配置 **device‑mode**、**protected‑routerboot** 和其他设置。

详情请参阅 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 和 [FlashFig](/docs/management-tools/flashfig) 文档。

## 启用 device-mode 功能 {#enabling-device-mode-feature}

```ros
[admin@MikroTik] > /system/device-mode/update container=yes 
  update: too many unsuccessful attempts, turn off power or reboot by pressing reset or mode button in 4m55s to reset attempt-count
```

以下命令可在 /**system/device-mode** 菜单中使用：

| Property | Description |
| :-- | :-- |
| get | 返回可赋值给变量或显示在屏幕上的值。 |
| print | 显示当前模式及其属性。 |
| update | 将更改应用于指定属性，详情请参阅下文。 |

## 可用的 device-mode 模式 {#available-device-mode-modes}

共有四种设备模式可供配置（mode=advanced 为默认模式），每种模式都有一组在使用该模式时不允许使用的功能。请注意，没有任何模式会启用所有功能。即使启用了“advanced”模式，某些功能也需要单独启用。ROSE device-mode 与 advanced 模式非常相似，但它专为 RDS 和类似设备设计，提供更广泛的磁盘使用选项，因此开箱即支持 container 安装。有关每个选项含义的更多详情，请参阅“Feature clarification”部分。因此，从下表可以看出，除非管理员用户专门启用，否则“traffic-gen、container、partitions、routerboard”功能始终处于禁用状态。

| **功能 / 属性** | **Home** | **Basic** | **Advanced** | **ROSE** |
| :-- | :-- | :-- | :-- | :-- |
| **Bandwidth Test** (/tool/bandwidth-test) | 否 | 否 | 是 | 是 |
| **Containers** (/container) | 否 | 否 | 否 | 是 |
| **Email** (/tool/e-mail) | 否 | 是 | 是 | 是 |
| **Fetch** (/tool/fetch) | 否 | 是 | 是 | 是 |
| **Hotspot** (/ip/hotspot) | 否 | 否 | 是 | 是 |
| **Install Any Version** (`install-any-version`) | 否 | 否 | 否 | 否 |
| **IPsec** (/ip/ipsec) | 是 | 是 | 是 | 是 |
| **L2TP** (/interface/l2tp) | 是 | 是 | 是 | 是 |
| **Partitions** (/`partitions`) | 否 | 否 | 否 | 否 |
| **PPTP** (/interface/pptp) | 是 | 是 | 是 | 是 |
| **Proxy** (/ip/proxy) | 否 | 否 | 是 | 是 |
| **RoMon** (/tool/romon) | 否 | 是 | 是 | 是 |
| **Routerboard Settings** (/system/routerboard) | 否 | 否 | 否 | 否 |
| **Scheduler** (`scheduler`) | 否 | 是 | 是 | 是 |
| **SMB** (/ip/smb) | 是 | 是 | 是 | 是 |
| **Sniffer** (/tool/sniffer) | 否 | 是 | 是 | 是 |
| **SOCKS Proxy** (/ip/socks) | 否 | 否 | 是 | 是 |
| **Traffic Generator** (/tool/traffic-gen) | 否 | 否 | 否 | 否 |
| **ZeroTier** (`zerotier`) | 否 | 否 | 是 | 是 |

## 可用属性列表 {#list-of-available-properties}

| 属性 | 说明 |
| :-- | :-- |
| **scheduler, socks, fetch, pptp, l2tp, bandwidth-test, traffic-gen, sniffer, ipsec, romon, proxy, hotspot, smb, email, zerotier, container, install-any-version****, partitions, routerboard** (*yes \| no*) | 可通过 **device-mode** 选项控制的可用功能列表。有关每个选项含义的更多详情，请参阅“Feature clarification”一节。 |
| **activation-timeout** (default: **5m**); | 重置按钮或断电激活超时可设置为 00:00:10 .. 1d00:00:00。如果在此间隔内未按下重置按钮（或未执行冷重启），更新将被取消。 |
| **flagging-enabled** (*yes \| no*; Default: **yes**) | 设备将执行配置分析，如果发现可疑代码痕迹，将触发 flagged 模式，设置 **flagged=yes**，并启用 **flagged=yes** 中描述的 restrictions。请参阅“[Flagged status](/docs/system-information-and-utilities/device-mode#flagged-status)”段落。 |
| **flagged** (*yes \| no*; Default: **no**) | RouterOS 采用多种机制检测其系统文件是否被篡改。如果系统检测到未经授权的 RouterOS 访问，状态“flagged”将设置为 yes。如果“flagged”设置为 yes，出于安全考虑，将实施某些限制。有关更多信息，请参阅下面的章节。 |
| **mode:** (basic, home, advanced, ros; default: **advanced**); | 允许从可用模式中选择，以限制设备功能。默认情况下，<strong>advanced</strong> 模式允许除<strong>traffic-gen, container, partitions,</strong><strong>install-any-version</strong>**, routerboard.** 之外的选项。因此，要使用这些功能，需要通过执行 device-mode 更新将其开启。 <br/> 默认情况下，<strong>home</strong> 模式禁用以下功能：<strong>scheduler, socks, fetch, bandwidth-test, traffic-gen, sniffer, romon, proxy, hotspot, email, zerotier, container,</strong><strong>install-any-version</strong>**, partitions, routerboard.** |

可以对可用功能进行更具体的控制。由 device-mode 控制的每个功能都可以单独开启或关闭。

例如，**scheduler** 不允许在 `/system/scheduler` 中执行任何操作。所使用的 device-mode 会禁用所有列出的功能，例如，如果使用 **mode**=home，但设置中需要 **zerotier**，则需要通过 `/system/device-mode/update` zerotier=yes 执行 device-mode 更新，并需要物理访问设备以按下按钮或切断电源。

#### 更改 device-mode 的高级示例 {#advanced-example-of-changing-device-mode}

```ros
[admin@MikroTik] > /system/device-mode/update mode=home email=yes
[admin@MikroTik] > /system/device-mode/update mode=advanced zerotier=no
```

如果更新命令指定了任何模式参数，此更新将替换整个 device-mode 配置。在这种情况下，除使用该命令指定的设置外，所有“per-feature”设置都将丢失。例如：

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

可以看到 fetch = yes 和 email = yes 缺失，因为它们已被模式更改覆盖。但是，仅指定“per-feature”设置时，只会更改这些设置：

```ros
[admin@MikroTik] > /system/device-mode/update hotspot=no
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
     mode: advanced
  sniffer: no
  hotspot: no
```

如果禁用该功能，交互式命令将显示错误消息：

```ros
[admin@MikroTik] > /system/device-mode/print config
     mode: advanced
  sniffer: no
  hotspot: no
[admin@MikroTik] > /tool/sniffer/quick 
failure: not allowed by device-mode
```

不过，仍可以向已禁用的功能添加配置，但会有一条注释在 device-mode 中显示该功能已禁用：

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

| 功能 | 说明哪些菜单将无法更改 |
| :-- | :-- |
| [bandwidth-test](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test) | <em><code>/tool/bandwidth-test</code></em><em><code>/tool/bandwidth-server</code></em><br/><em><code>/tool/speed-test</code></em> |
| [routerboard](/docs/hardware/routerboard) | *`/system/routerboard/settings`*（auto-upgrade 选项除外） |
| [container](/docs/containers) | 所有 container 功能 |
| install-any-version | RouterOS 将不再允许安装低于“allowed-versions”属性下列出版本的 RouterOS 版本。 |
| [email](/docs/system-information-and-utilities/e-mail) | *`/tool/e-mail`* |
| [fetch](/docs/system-information-and-utilities/fetch) | *`/tool/fetch`* |
| [hotspot](/docs/authentication-authorization-accounting/hotspot-captive-portal) | *`/ip/hotspot`* |
| [ipsec](/docs/virtual-private-networks/ipsec) | *`/ip/ipsec`* |
| [l2tp](/docs/virtual-private-networks/l2tp) | <em><code>/interface/l2tp-server</code></em><br/><em><code>/interface/l2tp-client</code></em> |
| [partitions](/docs/system-information-and-utilities/partitions) | <em>/partitions</em><br/> 不允许更改分区数量。如果路由器无法启动，仍可启动到其他分区。崩溃恢复不受限制。 |
| [pptp](/docs/virtual-private-networks/pptp) | <em><code>/interface/pptp-server</code></em><br/><em><code>/interface/pptp-client</code></em> |
| [proxy](/docs/network-management/proxy) | *`/ip/proxy`* |
| [romon](/docs/management-tools/romon) | *`/tool/romon`* |
| [scheduler](/docs/system-information-and-utilities/scheduler) | *`/system/scheduler`* |
| [smb](/docs/storage/smb) | *`/ip/smb`* |
| [sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) | *`/tool/sniffer`* |
| [socks](/docs/network-management/socks) | *`/ip/socks`* |
| [traffic-gen](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator) | <em><code>/tool/traffic-generator</code></em><br/><em><code>/tool/flood-ping</code></em><br/><em><code>/tool/ping-speed</code></em> |
| [zerotier](/docs/virtual-private-networks/zerotier) | */zerotier* |

## 允许的版本 {#allowed-versions}

device mode 在其参数中列出了一个名为“allowed-versions”的参数。这是 MikroTik 认为安全的版本列表，其中不包含攻击者可利用的严重漏洞。
  
该设置不依赖于已安装的 RouterOS 版本，而是作为独立的保护层，防止攻击者逐步降级版本，以到达任何已知的易受攻击 RouterOS 版本。当将 RouterOS 升级到提供更新“allowed-versions”列表的版本时，旧列表将被覆盖。如果降级 RouterOS，“allowed-versions”列表不会改变，并将保持为最新列表。如果 device-mode 的“install-any-version”已启用，则该列表将被忽略。

## 标记状态 {#flagged-status}

借助 device-mode 功能，RouterOS 现在可以在系统启动时分析整个配置，以确定是否存在未经授权访问路由器的迹象。如果检测到可疑配置，将禁用该可疑配置，并将 **flagged** 参数设置为“yes”。设备现在处于 Flagged 状态，并强制执行某些限制。

```ros
[admin@MikroTik] > /system/device-mode/print 
     mode: advanced
  flagged: yes
...
```

如果系统处于 flagged 状态，当前配置仍然有效，但无法执行以下操作：
  
bandwidth-test、traffic-generator、sniffer，以及为以下程序启用或创建新配置条目的配置操作（仍可禁用或删除这些条目）：*system scheduler、SOCKS proxy、pptp、l2tp、ipsec、proxy、smb*。  
  
当路由器处于 flagged 状态时执行上述操作，你将收到错误消息：

```ros
[admin@MikroTik] > /tool/sniffer/quick 
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
[admin@MikroTik] > /int l2tp-client/add connect-to=1.1.1.1 user=user
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
```

要退出 flagged 状态，必须执行命令“/system/device-mode/update flagged=no”。系统将要求你按下按钮，或执行硬重启（物理断电或对虚拟机执行硬重启）。
  
**重要！** 尽管系统已禁用触发 flagged 状态的任何疑似恶意规则，但在退出 flagged 状态之前，必须检查所有配置中是否存在其他未知内容。如果系统已被标记，应认为系统已遭入侵，并在重新启用系统使用之前对所有设置执行完整审计。完成审计后，更改所有系统密码并升级到最新 RouterOS 版本。

:::warning
从 RouterOS 7.17 版本开始，device-mode 会限制双启动设备的 SwOS/RouterOS 切换；要启用该切换，请执行：`/system/device-mode/update` routerboard=yes
:::
