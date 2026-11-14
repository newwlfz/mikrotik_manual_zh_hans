---
sidebar_key: "system-information-and-utilities/device-mode"
sidebar_position: 2
title: "设备模式"
sidebar_label: "设备模式"
description: "Device-mode 限制 RouterOS 功能以保护路由器免遭滥用；更改它需要物理确认。涵盖各种模式、按功能划分的开关、允许的版本以及被标记的状态。"
tags:
  - 'device-mode'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/device-mode
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**device-mode** 限制对特定配置选项的访问。它保护路由器和网络，防止获得未授权访问的攻击者将设备用作攻击其他网络的网关。

可用模式为 `advanced`、`home`、`basic` 和 `rose`。新设备出厂时已配置模式：CCR 和 1100 系列设备为 `advanced`（原为 `enterprise`），家用路由器为 `home`，其他设备为 `basic`。在出厂模式引入之前生产的设备使用 `advanced`，升级 RouterOS 会保持该模式。

在 [`/system/device-mode`](../cli-reference/system/device-mode/index.md) 菜单中查看当前设置。

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
          routerboard: no          
        attempt-count: 0   
```

授权用户可以更改 device-mode 参数，但需要物理接触才能批准更改。使用设备上的 reset 或 mode 按钮确认，或通过“冷重启”——拔掉电源——来确认。普通重启不会确认更改，而是会取消更改。确认后，无论采用哪种方法，**设备都会重启**。

## 在 WinBox 中检查设备模式 {#check-device-mode-in-winbox}

打开 **System > Device Mode** 以查看限制：

1. **Mode** 和 **Allowed Versions** 标识已配置的模式和允许的 RouterOS 版本。
2. 各工具字段显示允许执行哪些操作。例如，当 **Scheduler**、**Fetch** 或 **Email** 其中之一报告 device-mode 限制时，检查对应项。

![WinBox Device Mode overview with the current mode and per-tool restrictions](/img/8bc9340a46cf09de.webp)

截图显示的是具有现有 `rose` 配置的路由器；这不是出厂默认配置。概览为只读。**Update** 操作会启动模式更改，这需要物理确认并会重启设备（见下一节）。

## 更改 device-mode {#change-device-mode}

使用 [`update`](../cli-reference/system/device-mode/update.md) 命令更改模式或单个功能。

将模式更改为 `home`：

```ros
[admin@MikroTik] > /system/device-mode/update mode=home
  update: turn off power or reboot by pressing reset or mode button in 5m to activate changes
```

如果更新未及时确认，模式变更将被取消。要自行取消待处理的更新，请运行不带参数的 `/system/device-mode/update`；它会报告 `canceled previous update`。当另一个更新待处理时，带参数的 `update` 会取消该待处理更新，并且自身不会被应用；请再次运行它以启动新的更新。

:::note
某些 EOL 产品仅通过断电重启来确认模式更改，而不是通过按下按钮。
:::

拥有访问权限的攻击者可以准备 device-mode 变更并使其保持待处理状态。该变更会在下次按下按钮或电源循环时激活，即使管理员并不知道它是什么。为限制该风险，在没有重置的情况下只允许三次更新尝试。每个带参数的 `update` 请求都会递增 **attempt-count** 计数器，包括被拒绝的请求；取消待处理更新的请求不会递增。当计数器达到 3 时，后续请求会被拒绝，并开启一个等于该请求 `activation-timeout` 的重置窗口。计数器在确认更新后重置，或在重置窗口内按下按钮或电源循环后重置。过期请求和普通重启不会重置它。

```ros
[admin@MikroTik] > /system/device-mode/update container=yes 
  update: too many unsuccessful attempts, turn off power or reboot by pressing reset or mode button in 5m to reset attempt-count
```

指定 `mode` 的命令会替换整个 device-mode 配置：除同一命令中给出的设置外，所有按功能设置都会丢失。`print config` 输出只显示与模式默认值不同的设置。

```ros
[admin@MikroTik] > /system/device-mode/update mode=home email=yes fetch=yes
  update: turn off power or reboot by pressing reset or mode button in 5m to activate changes
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
              mode: home
  allowed-versions: 7.13+,6.49.8+
             fetch: yes
             email: yes
[admin@MikroTik] > /system/device-mode/update mode=advanced sniffer=no
  update: turn off power or reboot by pressing reset or mode button in 5m to activate changes
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
              mode: advanced
  allowed-versions: 7.13+,6.49.8+
           sniffer: no
```

`fetch` 和 `email` 覆盖项已不存在，因为第二次模式变更替换了它们。仅指定按功能设置的命令只会更改这些设置：

```ros
[admin@MikroTik] > /system/device-mode/update hotspot=no
  update: turn off power or reboot by pressing reset or mode button in 5m to activate changes
-- reboot --
[admin@MikroTik] > /system/device-mode/print config
              mode: advanced
  allowed-versions: 7.13+,6.49.8+
           sniffer: no
           hotspot: no
```

已禁用的功能会拒绝交互式命令：

```ros
[admin@MikroTik] > /system/device-mode/print config
              mode: advanced
  allowed-versions: 7.13+,6.49.8+
           sniffer: no
           hotspot: no
[admin@MikroTik] > /tool/sniffer/quick 
failure: not allowed by device-mode
```

仍可为已禁用的功能添加配置；该条目会以禁用状态创建，并带有注释说明 device-mode 不允许它：

```ros
[admin@MikroTik] > /ip/hotspot/add interface=ether1 
[admin@MikroTik] > /ip/hotspot/print 
Flags: X - DISABLED
Columns: NAME, INTERFACE, PROFILE, IDLE-TIMEOUT
#   NAME      INTERFACE  PROFILE  IDLE-TIMEOUT
;;; inactivated, not allowed by device-mode
0 X hotspot1  ether1     default  5m          
```

## 使用 Netinstall 或 FlashFig 配置 device-mode {#configure-device-mode-with-netinstall-or-flashfig}

Netinstall 和 FlashFig 可以在预配设备时设置 **device-mode**、**protected-routerboot** 和其他设置。

详情请参阅 [网络安装](../getting-started/installation-and-upgrade/netinstall/index.md) 和 [FlashFig](../management-tools/flashfig.md) 文档。

## 可用的 device-mode 模式 {#available-device-mode-modes}

有四种模式可用（`advanced` 是默认模式）；每种模式都会禁用一部分功能。没有任何模式会启用所有功能——即使在 `advanced` 模式下，某些功能也必须显式启用。`rose` 与 `advanced` 类似，面向 RDS 以及具有广泛磁盘用途和出厂容器支持的类似设备。下表列出了每项功能控制的内容。**traffic-gen**、**container**、**partitions** 和 **routerboard** 在每种模式下都会被禁用，除非显式启用。

| 功能 / 属性 | 操作/不可用菜单 | Home | Basic | Advanced | ROSE |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| [**带宽测试**](../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md) | `/tool/bandwidth-test`, `/tool/bandwidth-server`, `/tool/speed-test` | no | no | yes | yes |
| [**容器**](../containers/index.md) | 所有容器功能。 | no | no | no | yes |
| [**电子邮件**](./e-mail.md) | `/tool/e-mail` | no | yes | yes | yes |
| [**获取**](./fetch.md) | `/tool/fetch` | no | yes | yes | yes |
| [**热点**](../authentication-authorization-accounting/hotspot-captive-portal/index.md) | `/ip/hotspot` | no | no | yes | yes |
| **安装任意版本** | RouterOS 将不再允许安装 **allowed-versions** 列表之外的版本。 | no | no | no | no |
| [**IPsec**](../virtual-private-networks/ipsec/index.md) | `/ip/ipsec` | yes | yes | yes | yes |
| [**L2TP**](../virtual-private-networks/l2tp/index.md) | `/interface/l2tp-server`, `/interface/l2tp-client` | yes | yes | yes | yes |
| [**分区**](./partitions.md) | `/partitions` — 不允许更改分区数量。如果你的路由器无法启动，它仍然能够启动到你的其他分区。崩溃恢复没有限制。 | no | no | no | no |
| [**PPTP**](../virtual-private-networks/pptp.md) | `/interface/pptp-server`, `/interface/pptp-client` | yes | yes | yes | yes |
| [**代理**](../network-management/proxy/web-proxy.md) | `/ip/proxy` | no | no | yes | yes |
| [**RoMon**](../management-tools/romon.md) | `/tool/romon` | no | yes | yes | yes |
| [**Routerboard 设置**](../hardware/routerboard.md) | `/system/routerboard/settings`（自动升级选项除外） | no | no | no | no |
| [**调度器**](./scheduler.md) | `/system/scheduler` | no | yes | yes | yes |
| [**SMB**](../storage/smb.md) | `/ip/smb` | yes | yes | yes | yes |
| [**嗅探器**](../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) | `/tool/sniffer` | no | yes | yes | yes |
| [**SOCKS 代理**](../network-management/socks/index.md) | `/ip/socks` | no | no | yes | yes |
| [**流量生成器**](../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) | `/tool/traffic-generator`, `/tool/flood-ping`, `/tool/ping-speed` | no | no | no | no |
| [**ZeroTier**](../virtual-private-networks/zerotier.md) | `/zerotier` | no | no | yes | yes |

由 device-mode 控制的每项功能都可以单独启用或禁用。

例如，禁用 **scheduler** 后，`/system/scheduler` 无法执行任何操作。如果设备运行在 `home` 模式下，但你的设置需要 `zerotier`，请运行 `/system/device-mode/update zerotier=yes`，并通过物理访问设备来确认。在双启动设备上，device-mode 会限制 SwOS/RouterOS 切换；请使用 `/system/device-mode/update routerboard=yes` 启用它。

## 允许的版本 {#allowed-versions}

**allowed-versions** 参数列出了 MikroTik 认为安全、没有攻击者可利用的严重漏洞的 RouterOS 版本。

该列表作为独立的保护层发挥作用，与已安装版本无关，用于防止攻击者逐步降级到已知存在漏洞的版本。升级到带有较新 **allowed-versions** 列表的版本会覆盖旧列表；降级则不会更改该列表。启用 **install-any-version** 时，该列表会被忽略。

## Flagged 状态 {#flagged-status}

RouterOS 在启动时会分析整个配置，以查找未经授权访问的迹象。如果发现可疑配置，设备会将其禁用，并将 **flagged** 设置为 *yes*，从而强制执行额外的限制。

```ros
[admin@MikroTik] > /system/device-mode/print 
     mode: advanced
  flagged: yes
...
```

在 flagged 状态下，当前配置会继续工作，但无法执行以下操作：

- bandwidth-test、traffic-generator 和 sniffer
- 在 system scheduler、SOCKS proxy、PPTP、L2TP、IPsec、proxy 和 SMB 中启用或创建条目的配置操作（禁用或删除它们仍然有效）。

尝试执行这些操作会返回错误：

```ros
[admin@MikroTik] > /tool/sniffer/quick 
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
[admin@MikroTik] > /interface/l2tp-client/add connect-to=192.0.2.1 user=user1
failure: configuration flagged, check all router configuration for unauthorized changes and update device-mode
```

要退出 flagged 状态，请运行 `/system/device-mode/update flagged=no`，并通过按下按钮或断电重启来确认：切断电源，或对虚拟机执行硬重启。

:::danger
尽管系统已禁用任何触发了被标记状态的看似恶意规则，在退出被标记状态之前，请检查所有配置中是否存在其他未知条目。如果系统已被标记，请假定它已遭入侵，并在重新启用前审计所有设置。审计后，更改所有系统密码并升级到最新 RouterOS 版本。
:::
