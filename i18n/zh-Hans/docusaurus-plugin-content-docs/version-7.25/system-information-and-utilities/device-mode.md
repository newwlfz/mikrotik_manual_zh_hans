---
sidebar_key: "system-information-and-utilities/device-mode"
sidebar_position: 2
title: "设备模式"
sidebar_label: "设备模式"
description: "device-mode 功能会限制路由器访问并限制配置选项以增强安全性，可根据设备类型和 RouterOS 版本在 advanced、home、basic 或 ros 模式下使用。更改需要通过断电重启或按键进行物理确认，并且更新尝试次数有限，以防止未经授权的模式更改。"
tags:
  - 'device-mode'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/device-mode
captured_at: '2026-11-04T11:21:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**device-mode** 是一项功能，用于对设备设置特定限制，或限制对特定配置选项的访问。它有助于保护您的路由器和网络，防止攻击者获得未授权访问并将其用作攻击其他网络的网关。

可用的 device-mode 为 `advanced`、`home`、`basic` 和 `rose`。device-mode 配置在路由器上出厂预装（适用于搭载 RouterOS v7.17 或更高版本的设备）。`advanced`（以前称为 `enterprise`）模式配置用于 CCR 和 1100 系列设备，`home` 模式配置用于家用路由器，`basic` 模式配置用于任何其他类型的设备。对于运行 RouterOS 7.17 之前版本的设备，所有设备都使用 *advanced/enterprise* 模式。

device-mode 从 [`/system/device-mode`](../cli-reference/system/device-mode/index.md) 菜单进行配置。

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

device-mode 参数可以由已授权的 RouterOS 用户更改，但需要物理接触设备才能批准更改。
更改 device-mode 后，你需要通过按下设备本身的按钮来确认，或执行“冷重启”——即拔掉电源。更改被确认后，无论采用哪种确认方式，**设备都会重启**。

## 在 WinBox 中检查设备模式 {#check-device-mode-in-winbox}

打开 **System > Device Mode** 以查看限制：

1. **Mode** 和 **Allowed Versions** 标识已配置的模式和允许的 RouterOS 版本。
2. 各工具字段显示允许执行哪些操作。例如，当 **Scheduler**、**Fetch** 或 **Email** 其中之一报告 device-mode 限制时，检查对应项。

![WinBox Device Mode overview with the current mode and per-tool restrictions](/img/8bc9340a46cf09de.webp)

该截图显示的是此路由器现有的 `rose` 配置；它并非每台设备的出厂默认值。此概览为只读。**Update** 操作会启动模式更改流程，该流程需要物理确认，并会如下一节所述重启设备。

## 更改 device-mode {#changing-device-mode}

可用模式或特定功能可以通过 [`update`](../cli-reference/system/device-mode/update.md) 命令更改。

例如，将模式更改为 `home`：

```ros
[admin@MikroTik] > /system/device-mode/update mode=home 
  update: please activate by turning power off or pressing reset or mode button 
          in 5m00s
-- [Q quit|D dump|C-z pause]
```

如果在指定时间内未执行断电或按下按钮，模式更改将被取消。如果并行运行了另一个 update 命令，两者都会被取消。

:::danger
有若干 EOL 产品无法通过按下复位按钮来确认模式更改。这些路由器只能通过断电重启来确认模式更改。
:::

为了保护设备免受这样的攻击者侵害——他们可能悄无声息地获得对路由器的访问权、用一些脚本加以滥用，然后只是等着你重启路由器，而你甚至不知道自己当时正在接受某个入侵者请求的更改——你只能更新模式三次。有一个计数器会跟踪已进行了多少次更新尝试，并会阻止任何进一步的更新。此计数器只有在管理员断电重启，或在看到模式设置更新尝试的警告时按下按钮（与接受任何更新时相同）才会被重置。

```ros
[admin@MikroTik] > /system/device-mode/update container=yes 
  update: too many unsuccessful attempts, turn off power or reboot by pressing reset or mode button in 4m55s to reset attempt-count
```

如果 update 命令指定了任何模式参数，则该更新会替换整个 device-mode 配置。在这种情况下，除该命令中指定的设置外，所有按功能单独配置的设置都将丢失。例如：

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

可以看到 `fetch` = yes 和 `email` = yes 都不见了，因为它们被模式更改覆盖了。然而，只指定按功能单独配置的设置则只会更改这些设置：

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

不过，仍然可以向被禁用的功能添加配置，但 device-mode 中会出现一段注释，标明该功能已被禁用：

```ros
[admin@MikroTik] > /ip/hotspot/add interface=ether1 
[admin@MikroTik] > /ip/hotspot/print 
Flags: X, S - HTTPS
Columns: NAME, INTERFACE, PROFILE, IDLE-TIMEOUT
#   NAME      INTERFACE  PROFILE  IDLE-TIMEOUT
;;; inactivated, not allowed by device-mode
0 X hotspot1  ether1     default  5m          
```

## 使用 Netinstall 或 FlashFig 更改 device-mode 设置 {#changing-device-mode-settings-using-netinstall-or-flashfig}

从 RouterOS 7.22 开始，可以配置 **device-mode** 和 **protected-routerboot** 以及其他设置。

有关更多信息，请参阅 [网络安装](../getting-started/installation-and-upgrade/netinstall/index.md) 和 [FlashFig](../management-tools/flashfig.md) 文档。

## 可用的 device-mode 模式 {#available-device-mode-modes}

有四种可供配置的设备模式（*advanced* 是默认值），每种模式都有一组在使用时不被允许的功能。没有任何模式会启用所有功能——即使启用了 *advanced* 模式，某些功能也需要手动启用。ROSE device-mode 与 advanced 模式非常相似，但它是为 RDS 及类似设备而设计的，具有更广泛的磁盘使用选项，出厂即支持容器安装。有关每个功能控制内容的更多细节，请参见下表。如下表所示，**traffic-gen**、**container**、**partitions** 和 **routerboard** 功能始终处于禁用状态，除非由管理员用户专门启用。

| 功能 / 属性 | 操作/不可用的菜单 | Home | Basic | Advanced | ROSE |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| [带宽测试](../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md) | `/tool/bandwidth-test`、`/tool/bandwidth-server`、`/tool/speed-test` | no | no | yes | yes |
| [**Containers**](../containers/index.md) | 所有容器功能。 | no | no | no | yes |
| [电子邮件](./e-mail.md) | `/tool/e-mail` | no | yes | yes | yes |
| [获取](./fetch.md) | `/tool/fetch` | no | yes | yes | yes |
| [**Hotspot**](../authentication-authorization-accounting/hotspot-captive-portal/index.md) | `/ip/hotspot` | no | no | yes | yes |
| **Install Any Version** | RouterOS 将不再允许安装低于 **allowed-versions** 列表中的版本。 | no | no | no | no |
| [**IPsec**](../virtual-private-networks/ipsec/index.md) | `/ip/ipsec` | yes | yes | yes | yes |
| [**L2TP**](../virtual-private-networks/l2tp/index.md) | `/interface/l2tp-server`、`/interface/l2tp-client` | yes | yes | yes | yes |
| [分区](./partitions.md) | `/partitions` —— 不允许更改分区数量。如果你的路由器无法启动，它仍然能够引导进入你的其他分区。崩溃恢复不受限制。 | no | no | no | no |
| [**PPTP**](../virtual-private-networks/pptp.md) | `/interface/pptp-server`、`/interface/pptp-client` | yes | yes | yes | yes |
| [Web 代理](../network-management/proxy/web-proxy.md) | `/ip/proxy` | no | no | yes | yes |
| [**RoMon**](../management-tools/romon.md) | `/tool/romon` | no | yes | yes | yes |
| [路由器主板](../hardware/routerboard.md) | `/system/routerboard/settings`（自动升级选项除外） | no | no | no | no |
| [调度器](./scheduler.md) | `/system/scheduler` | no | yes | yes | yes |
| [**SMB**](../storage/smb.md) | `/ip/smb` | yes | yes | yes | yes |
| [数据包嗅探器](../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) | `/tool/sniffer` | no | yes | yes | yes |
| [**SOCKS Proxy**](../network-management/socks/index.md) | `/ip/socks` | no | no | yes | yes |
| [流量生成器](../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) | `/tool/traffic-generator`、`/tool/flood-ping`、`/tool/ping-speed` | no | no | no | no |
| [**ZeroTier**](../virtual-private-networks/zerotier.md) | `/zerotier` | no | no | yes | yes |

可以对可用功能进行更具体的控制。device-mode 控制的每个功能都可以专门开启或关闭。

例如，**scheduler** 将不允许在 `/system/scheduler` 中执行任何操作。所使用的 device-mode 会禁用所有列出的功能；例如，如果使用了 **mode**=home，但你的部署需要 **zerotier**，则需要执行 device-mode 更新 `/system/device-mode/update` zerotier=yes，并需物理接触设备以按下按钮或切断电源。

## 允许的版本 {#allowed-versions}

设备模式在其参数中列出了一个名为 **allowed-versions** 的参数。这是 MikroTik 认为安全、且不包含任何可被攻击者利用的严重漏洞的版本列表。

此设置不依赖于已安装的 RouterOS 版本，而是作为单独的保护层发挥作用，防止攻击者一步步降级版本，以到达已知存在漏洞的 RouterOS 发行版。当你将 RouterOS 升级到提供更新 **allowed-versions** 列表的发行版时，最旧的列表将被覆盖。如果你降级 RouterOS，**allowed-versions** 列表不会改变，并会保持更新到最新的列表。如果启用了 device-mode 的 **install-any-version**，则该列表会被忽略。

## Flagged 状态 {#flagged-status}

与 device-mode 功能一同，RouterOS 可以在系统启动时分析整个配置，以判断是否存在对路由器未经授权访问的迹象。如果检测到可疑配置，它将被禁用，**flagged** 参数将被设置为 *yes*。此时设备处于标记状态，并会强制执行某些限制。

```ros
[admin@MikroTik] > /system/device-mode/print 
     mode: advanced
  flagged: yes
...
```

如果系统具有此 flagged 状态，当前配置可以工作，但无法执行以下操作：

- bandwidth-test、traffic-generator 和 sniffer
- 以下项目的启用或创建新条目的配置操作（仍然可以禁用或删除它们）：system scheduler、SOCKS proxy、PPTP、L2TP、IPsec、proxy 和 SMB。

当路由器处于 flagged 状态时执行上述操作，您将收到错误消息：

```ros
[admin@MikroTik] > /tool/sniffer/quick 
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
[admin@MikroTik] > /int l2tp-client/add connect-to=1.1.1.1 user=user
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
```

要退出标记状态，你必须执行命令 `/system/device-mode/update flagged=no`。系统会要求你按下按钮，或执行硬重启（物理断电，或对虚拟机执行硬重启）。

**重要！** 尽管系统已禁用了触发标记状态的那些看起来恶意的规则，但在退出标记状态之前，务必检查你所有的配置中是否有其他未知内容。如果你的系统已被标记，请假定系统已遭入侵，并在重新启用系统供使用之前对所有设置进行全面审计。完成审计后，更改所有系统密码并升级到最新的 RouterOS 版本。

:::warning
从 RouterOS 7.17 版本开始，device-mode 会限制双启动设备的 SwOS/RouterOS 切换。要启用它：`/system/device-mode/update` routerboard=yes
:::
