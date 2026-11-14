---
sidebar_key: "hardware/routerboard"
sidebar_position: 10
title: "路由器主板"
sidebar_label: "路由器主板"
description: "本页面介绍 MikroTik RouterOS 中的 `/system/routerboard` 菜单，提供型号、序列号以及当前/升级固件版本等硬件和固件信息。其中包含 RouterBOOT 固件的升级说明，以及在硬件层面配置启动行为的设置。"
tags:
  - 'routerboard'
  - 'firmware-upgrades'
  - 'settings'
source: https://manual.mikrotik.com/docs/7.24/hardware/routerboard
captured_at: '2026-11-04T11:29:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

在 RouterBOARD 设备上，你可以从 `/system/routerboard` 菜单查看基本的硬件和固件信息。

要显示这些信息，请运行以下命令：

```ros
[admin@demo.mt.lv] /system/routerboard/print 
       routerboard: yes                                                      
             model: CCR2116-12G-4S+                                                                                                
     serial-number: MT123456789                                              
     firmware-type: al64v3                                                   
  factory-firmware: 7.8                                                      
  current-firmware: 7.22.2
  upgrade-firmware: 7.22.2                          
```

输出包含以下详细信息：

## 属性 {#properties}

**只读属性：**

| 属性 | 描述 |
| :-- | :-- |
| **routerboard** (*yes \| no*) | 指示该设备是否为 RouterBOARD 单元。 |
| **model** (*string*) | RouterBOARD 型号。 |
| **serial-number** (*string*) | 设备的唯一序列号。 |
| **firmware-type** (*string*) | 设备使用的引导加载程序固件类型。 |
| **factory-firmware** (*string*) | 出厂时安装的固件版本。 |
| **current-firmware** (*string*) | 当前使用的 RouterBOOT 加载程序版本。不要将其与 RouterOS 操作系统版本混淆。 |
| **upgrade-firmware** (*string*) | RouterOS 升级可能包含新的 RouterBOOT 版本文件，但必须手动应用。此行指示设备上是否已找到新的 RouterBOOT 文件。该文件可能随最近的 RouterOS 升级一起提供，也可能作为 FWF 文件手动上传。无论哪种情况，此处都会显示可用的最新版本。 |

## 升级 RouterBOOT {#upgrading-routerboot}

RouterBOOT 升级通常包含对 RouterBOARD 整体运行的细微改进。建议保持固件为最新版本。

要检查是否有可用的升级，请比较 `/system/routerboard` 下的 **current-firmware** 和 **upgrade-firmware** 值。如果 **upgrade-firmware** 显示的版本高于 **current-firmware**，则说明有较新版本可供应用。

### 升级步骤 {#upgrade-steps}

1. 运行升级命令：

   ```ros
   [admin@mikrotik] /system/routerboard> upgrade
   Do you really want to upgrade firmware? [y/n]
   y
   echo: system,info,critical Firmware upgraded successfully, please reboot for changes to take effect!
   ```

2. 出现提示时，输入 **y** 进行确认。

3. 重启设备以应用更改：

   ```ros
   /system/reboot
   ```

重启后，验证 **current-firmware** 与 **upgrade-firmware** 一致，确认升级已成功应用。

## 设置 {#settings}

**路径：** `/system/routerboard/settings`

此子菜单用于配置 RouterBOOT 固件设置，这些设置控制设备在硬件层面的启动和运行方式。

```ros
[admin@MikroTik] /system/routerboard/settings> print 
              auto-upgrade: no
                 baud-rate: 115200
                boot-delay: 2s
            enter-setup-on: any-key
               boot-device: nand-if-fail-then-ethernet
         preboot-etherboot: disabled
             cpu-frequency: 1200MHz
          memory-frequency: 1066DDR
             boot-protocol: bootp
       enable-jumper-reset: yes
       force-backup-booter: no
               silent-boot: yes
      protected-routerboot: disabled
      reformat-hold-button: 20s
  reformat-hold-button-max: 10m
```

:::warning
从 RouterOS 7.17 版本开始，device-mode 设置会限制双启动设备的 SwOS/RouterOS 切换。要启用此功能，请运行：
`/system/device-mode/update routerboard=yes`
:::

### 属性参考 {#property-reference}

| 属性 | 描述 |
| :--- | :--- |
| **auto-upgrade** (*yes \| no*；默认值：**no**) | 是否在 RouterOS 升级后自动升级固件。最新固件将在额外重启后应用。 |
| **baud-rate** (*integer*；默认值：**115200**) | 如果安装了板载 RS232，选择其速度（以比特每秒为单位）。Off 选项允许禁用串行接口。 |
| **boot-delay** (*time*；默认值：**2s**) | 启动时等待按键的时间。 |
| **boot-device** (*nand-if-fail-then-ethernet ...*；默认值：**nand-if-fail-then-ethernet**) | 选择 RouterBOOT 加载操作系统的方式：- **ethernet** — 以 Etherboot 模式启动设备；- **flash-boot** — 启动时启用 Flashfig 模式。成功更改配置后或任何用户登录板卡后，此设置将恢复为 NAND；- **flash-boot-once-then-nand** — 仅在单次启动时启用 Flashfig 模式，之后恢复为 nand-if-fail-then-ethernet；- **nand-if-fail-then-ethernet** — 从 NAND 启动 RouterOS，如果 RouterOS 无法启动，则自动进入 Etherboot。这是开箱即用设备的默认模式；- **nand-only** — 从 NAND 启动 RouterOS；- **try-ethernet-once-then-nand** — 以 Etherboot 模式启动设备一次，如果没有可用的服务器，则直接从 NAND 或设备所使用的存储类型启动。**重要：** 注意Etherboot 模式是 MikroTik 设备的一种特殊状态，允许你使用 Netinstall 重新安装设备。根据所使用的设备，有几种方法可以将设备置于 Etherboot 模式：1. 按住 Reset 按钮并给设备上电（等待 "USR" LED 闪烁然后稳定 "On"，当 "USR" LED 变为 "Off" 时松开 Reset 按钮）——设备将以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。2. 使用串行控制台，在设备启动时持续按键盘上的 CTRL+E，直到设备显示正在尝试 bootp 协议。3. 使用串行控制台，在设备启动时按任意键，然后选择 "o"，再选择 "1" 和 "x"。 |
| **boot-os** (*router-os \| swos*；默认值：**router-os**) | 更改 CRS3xx 系列交换机的启动操作系统。 |
| **boot-protocol** (*bootp \| dhcp ...*；默认值：**bootp**) | 要使用的启动协议：- **bootp** — 启动 RouterOS 的默认选项；- **dhcp** — 用于 OpenWRT 以及可能的其他操作系统。 |
| **cpu-frequency** (*取决于型号*；默认值：**取决于型号**) | 此选项允许更改设备的 CPU 频率。可选值取决于型号，要查看可用选项，请在此提示符处按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **cpu-mode** (*power-save \| regular*；默认值：**power-save**) | 是否在 HLT 指令中进入 CPU 挂起模式。大多数操作系统在 CPU 空闲周期使用 HLT 指令。当 CPU 处于挂起模式时，功耗较低，但在低温条件下，建议选择 regular 模式，以便整体系统温度更高。 |
| **enable-jumper-reset** (*yes \| no*；默认值：**yes**) | 禁用此项可避免通过板载跳线意外重置设置。 |
| **enter-setup-on** (*any-key \| delete-key*；默认值：**any-key**) | 在启动延迟期间，哪个键会使 BIOS 进入配置模式。当串行控制台在启动过程中打印符号并自行进入 RouterBOOT 菜单时，此选项很有用。请注意，在某些串行终端程序中，无法使用 Delete 键进入设置——在这种情况下，可能可以使用 Backspace 键来完成。 |
| **force-backup-booter** (*yes \| no*；默认值：**no**) | 是否使用备份 RouterBOOT。这仅在主加载程序以某种方式损坏且无法修复时有用。这样你就不必通过按住 reset 按钮（会加载备份加载程序）来启动设备，你可以使用此设置使其每次都加载备份加载程序：- **yes** — 始终使用备份加载程序；- **no** — 使用主引导程序。 |
| **init-delay** (*timeout interval 0s..9s*；默认值：) | 仅用于带 RB9xx 系列设备的 mPCIe 调制解调器。如果软重启后调制解调器无法被识别，则可能需要在 USB 端口初始化之前添加延迟。 |
| **memory-frequency** (*取决于型号*；默认值：**取决于型号**) | 此选项允许更改设备的内存频率。可选值取决于型号，要查看可用选项，请在此提示符处按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **memory-data-rate** (*取决于型号*；默认值：**取决于型号**) | 此选项允许更改设备的内存数据速率。可选值取决于型号，要查看可用选项，请在此提示符处按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **preboot-etherboot** (*timeout interval 1s..30s*；默认值：**disabled**) | 启用预启动 etherboot，它在常规启动设备之前运行。其工作方式与 boot-device=etherboot 相同，但具有额外的超时值。如果在超时到期之前未从 Netinstall 服务器收到 IP 地址，则将开始常规启动过程。**重要：** 注意preboot-etherboot 配置存储在 BIOS 中，将 RouterOS 降级到较旧版本不会禁用它。可以从 RouterOS 菜单或通过重置 BIOS 来禁用此功能。由于 etherboot 接受来自任何 BOOTP/DHCP 服务器的 IP 地址，请使用 preboot-etherboot-server 仅在从指定 Netinstall 服务器收到地址时才启动 etherboot。 |
| **preboot-etherboot-server** (*IP address, any*；默认值：**any**) | 将 preboot-etherboot 设置为仅接受来自指定 Netinstall 服务器 IP 地址的 IP 地址。通过启用此功能，可以防止来自其他 BOOTP/DHCP 服务器的意外 etherboot。 |
| **regulatory-domain-ce** (*yes \| no*；默认值：**no**) | 为高天线增益设备启用超低 TX 功率（需要重启）。 |
| **silent-boot** (*yes \| no*；默认值：**no**) | 此选项禁用启动期间的蜂鸣声：- **yes** — 无启动蜂鸣声（不会禁用 RouterOS: beep 命令）；- **no** — 常规启动声音。 |
| **disable-pci** (*yes \| no*；默认值：**no**) | 针对 MT7621 芯片设备的特定设置。允许禁用 PCI。 |
| **preferred-architecture** (*arm32 \| arm64*；默认值：**arm32**) | 针对 L009 设备的特定设置。允许更新设备以使用 ARM64 架构。 |
| **etherboot-port** (*interface*；默认值：) | 允许选择 Etherboot/Netinstall 接口，仅适用于 CRS520、CRS804、CRS812。默认端口取决于型号。 |
| **gpio-function** (*port*；默认值：**serial1**) | 针对 M33 设备的特定设置。默认情况下，引脚 12、13、15、16 配置为第二个 "serial1" 端口使用，可以在 `/iot/gpio/digital` 菜单中将其改用于 GPIO 用途。 |

:::danger
对 CPU 或内存进行超频不在保修范围内。如果怀疑性能问题是由超频引起的，请在联系支持之前将两个频率恢复为其标称值。
:::

## 预启动 Etherboot {#preboot-etherboot}

**preboot-etherboot** 是一项功能，它指示 RouterOS 设备在每次启动时，在开始常规启动过程（例如 RouterOS）之前，在指定时间内搜索 Netinstall 服务器。此功能对于远程重新安装特别有用，因为它允许设备在每次启动时尝试 Etherboot。

**preboot-etherboot-server** 指定 preboot-etherboot 过程应仅接受来自具有特定 IP 地址的 Netinstall 服务器的 IP 地址。默认情况下，Etherboot 接受来自任何 BOOTP/DHCP 服务器的地址。此设置允许你将其限制为特定的 Netinstall 服务器，以便设备可以在不从网络中移除的情况下重新安装。

## 远程重新安装 {#remote-reinstallation}

当两个功能都启用时，可以在不访问 RouterOS 或使用 reset 按钮的情况下远程重新安装设备。

例如，要启动远程重新安装：

1. 给 RouterOS 设备断电再上电（例如，使用 PoE 交换机或电源控制器）。
2. 设备尝试 Etherboot 并连接到 Netinstall 服务器。
3. 安装完成后，禁用 Netinstall 服务器。
4. 再次给设备断电再上电以完成该过程。

## 要求 {#requirements}

要启用 **preboot-etherboot** 和 **preboot-etherboot-server**：

1. 安装 RouterOS 7.9 或更新版本。
2. 升级 RouterBOOT：

要启用该功能，请运行：

```ros
/system/routerboard/settings/set preboot-etherboot=9s preboot-etherboot-server=10.10.10.100
```

在每次重启或断电再上电时，设备将尝试在 **9 秒**内从 IP 为 **10.10.10.100** 的 Netinstall 服务器接收 IP 地址。如果没有此类服务器可用，设备将继续正常启动过程。

:::warning
如果未指定 **preboot-etherboot-server**，设备将接受来自任何 Netinstall 服务器的 IP 地址并进入 Etherboot 模式，等待重新安装过程。仅当 RouterBOOT 的 **boot-protocol** 设置为 **dhcp**（默认值为 **bootp**）时，才会使用 DHCP 服务器。
:::

RouterOS 重新安装不会影响 BIOS 设置。如果启用了 preboot-etherboot，设备将在每次启动时继续尝试进入 Etherboot。

要在不访问 RouterOS 的情况下避免意外激活 Etherboot，请禁用任何已连接的 Netinstall 或 DHCP 服务器。

## 受保护的 RouterBOOT {#protected-routerboot}

受保护的 RouterBOOT 功能允许通过禁用 Etherboot 并限制对引导加载程序的访问，来保护 RouterOS 设备免受物理访问。

此功能只能在登录后从 RouterOS 内部启用或禁用。没有可直接控制它的 RouterBOOT 设置。这些附加选项仅在特定条件下出现。

:::warning
如果在启用受保护的 RouterBOOT 时忘记了 RouterOS 管理员密码，则设备无法在不执行完全重新格式化的情况下恢复。
:::

## 启用后的行为 {#behavior-when-enabled}

当此功能处于活动状态时：

- reset 按钮和 reset 针孔被禁用。
- 无法通过串行控制台访问 RouterBOOT 菜单。
- Etherboot（Netinstall）被禁用。
- 只能使用有效的管理员密码通过 RouterOS 访问设备。
- 此设置只能从 RouterOS 内部启用或禁用（不存在 RouterBOOT 级别的选项）。

:::warning
如果你启用了受保护的 RouterBOOT 并忘记了 RouterOS 密码，**设备无法**通过常规方式恢复。
:::

## 启用或禁用 {#enabling-or-disabling}

从 RouterOS v7 开始，启用或修改此功能需要通过按下 reset 或 mode 按钮进行确认。

你有 **60 秒**的时间来确认更改。

### 启用（示例） {#enable-example}

```ros
[admin@450] > /system/routerboard/settings/set protected-routerboot=enabled
[admin@450] > /system/routerboard/settings/print
                        ;;; press button within 60 seconds to confirm
                            protected routerboot enable
              auto-upgrade: no
                 baud-rate: 115200
                boot-delay: 2s
            enter-setup-on: any-key
               boot-device: nand-if-fail-then-ethernet
             cpu-frequency: auto
             boot-protocol: bootp
       enable-jumper-reset: yes
       force-backup-booter: no
               silent-boot: yes
      protected-routerboot: enabled
      reformat-hold-button: 20s
  reformat-hold-button-max: 10m
```

### 禁用（示例） {#disable-example}

```ros
/system/routerboard/settings/set protected-routerboot=disabled
```

:::warning
如果在超时时间内未按下按钮，则更改不会应用。
:::

## 紧急重新格式化（恢复方法） {#emergency-reformat-recovery-method}

作为紧急恢复选项，可以通过在开机时按住 reset 按钮的时间长于 reformat-hold-button 时间但短于 reformat-hold-button-max 来重置设备。

:::danger
极其危险。仅在你已失去对设备的所有访问权限时使用。
:::

触发时，将执行以下操作：

- RouterOS、所有文件和配置被完全且不可逆地擦除（NAND 重新格式化）。
- 所有 RouterBOOT 设置重置为默认值。
- 设备重启。
- 由于从 NAND 启动失败，设备自动进入 Etherboot 模式
需要 Netinstall 来重新安装 RouterOS。

:::note
在某些 RouterBOARD 设备上，重新格式化可能需要超过 5 分钟。
:::

### 属性参考 {#property-reference-1}

| 属性 | 描述 |
| :--- | :--- |
| **protected-routerboot** (*enabled \| disabled*；默认值：**disabled**) | 禁用通过串行控制台访问 RouterBOOT 配置，并阻止 reset 按钮更改启动模式（Netinstall 被禁用）。只能使用具有管理权限的已知 RouterOS 用户账户访问 RouterOS。此设置只能从 RouterOS 内部禁用。如果 RouterOS 密码丢失，恢复需要使用 reset 按钮时序过程对设备进行完全重新格式化。- **enabled** — 安全模式。只能使用有效的管理员级别用户访问 RouterOS。串行输入被忽略。Etherboot 被禁用，且无法更改 RouterBOOT 设置。- **disabled** — 正常运行。可通过串行控制台访问 RouterBOOT 设置，并且可以使用 reset 按钮进入 Netinstall 模式。 |
| **reformat-hold-button** (*5s..300s*；默认值：**20s**) | 定义在开机时触发设备完全重新格式化必须按住 reset 按钮的最短时间。按住时间必须长于此值但短于 `reformat-hold-button-max`。触发时，设备执行完全重置操作：- RouterOS、所有文件和配置被永久擦除（NAND 重新格式化）。- 所有 RouterBOOT 设置重置为默认值。- 设备重启。- 由于 NAND 启动失败，设备自动进入 Etherboot。- 需要 Netinstall 来重新安装 RouterOS。⚠️ **警告：** 这是一项极其危险的操作，仅应在所有其他访问方法均不可用时使用。在某些 RouterBOARD 设备上，重新格式化过程可能需要超过 5 分钟。完成后设备即可用于 Netinstall。 |
| **reformat-hold-button-max** (*15s..600s*；默认值：**10m**) | 定义在触发重新格式化期间允许按住 reset 按钮的最长时间。与 `reformat-hold-button` 配合使用以创建精确的时间窗口。例如，设置 `reformat-hold-button=60s` 和 `reformat-hold-button-max=65s` 要求按钮严格按住 60 到 65 秒之间。这通过使意外或猜测的重置几乎不可能来增强安全性。在 RouterBOOT 3.38.3 中引入。 |

### LED 指示灯 {#led-indicator}

当启用受保护的 RouterBOOT 时，LED 每秒闪烁一次以帮助计时：

- LED 熄灭一秒
- LED 点亮一秒

### 对较旧 MikroTik 硬件的支持 {#support-on-older-mikrotik-hardware}

> **重要：** 本节仅适用于显示下述特定错误消息的较旧设备。除非该消息指示，否则不要修改引导加载程序。

受保护的 RouterBOOT 功能在所有现代 MikroTik 设备上均受支持。但是，如果你使用的是出厂固件版本低于 **7.19.3** 的较旧设备，则在尝试启用该功能时可能会看到以下消息：

> *'protected routerboot' 功能需要 backup-routerboot 升级*

如果你看到此消息，请按照以下步骤操作。

### RouterOS v7 — 升级步骤 {#routeros-v7--upgrade-steps}

1. 将设备[升级或降级](../getting-started/installation-and-upgrade/upgrade.md#manual-upgrade)到 RouterOS **7.19.3**。你可以在 [MikroTik 下载页面](https://mikrotik.com/download)找到此版本。

2. 通过运行 `/system/routerboard/upgrade` 升级 RouterBOOT 固件，然后重启设备。重启后，验证 `/system/routerboard/print` 中显示的 **current-firmware** 值与 `/system/resource/print` 中显示的已安装 RouterOS 版本一致——两者都应为 **7.19.3**。

3. 将 [v7 通用包（所有架构）](https://box.mikrotik.com/f/991c3e94984c4e18b8d6/?dl=1)上传到设备并再次重启。这会将 **factory-firmware** 版本更新为 **7.19.3**，这是启用受保护的 RouterBOOT 功能所必需的。

4. 完成上述步骤后，你可以将设备升级到更新的 RouterOS 版本。

### RouterOS v6 — 升级步骤 {#routeros-v6--upgrade-steps}

如果你的设备运行 RouterOS **v6** 并遇到相同的消息，请按照上述相同步骤操作，但有以下区别：

- 目标版本：**6.49.7**（而不是 7.19.3）
- 使用 [v6 通用包（所有架构）](https://box.mikrotik.com/f/b062a26b4bd34c55aa52/?dl=1)（而不是 v7 包）

## Mode 和 Reset 按钮 {#mode-and-reset-buttons}

所有运行 RouterOS 的 MikroTik 设备都支持 **Reset** 按钮的附加功能。部分 RouterBOARD 设备还包含 **Mode** 按钮，可配置为在按下时运行自定义脚本。

:::warning
由 Mode 或 Reset 按钮触发的脚本以 `ftp`、`reboot`、`read`、`write`、`test` 和 `romon` 策略运行。有关更多信息，请参阅[脚本权限](../developer-guides/scripting/index.md#script-permissions)。
:::

---

### 支持的设备（Mode 按钮） {#supported-devices-mode-button}

以下设备支持 Mode 按钮：

- RBcAP-2nD (cAP)
- RBcAPGi-5acD2nD (cAP ac)
- RBwsAP5Hac2nD (wsAP ac lite)
- RB750Gr3 (hEX)
- RB760iGS (hEX S)
- RB912R-2nD (LtAP mini, LtAP mini LTE/4G kit)
- RBD52G-5HacD2HnD (hAP ac²)
- RBLHGR (LHG LTE/4G kit)
- RBSXTR (SXT LTE/4G kit)
- CRS328-4C-20S-4S+RM
- CRS328-24P-4S+RM
- CCR1016-12G r2
- CCR1016-12S-1S+ r2
- CCR1036-12G-4S r2
- CCR1036-8G-2S+ r2
- RBD53G-5HacD2HnD (Chateau)
- RBD53GR-5HacD2HnD (hAP ac³)
- E50UG (hEX)
- L41G-2axD (hAP ax lite)
- L009UiGS-RM, L009UiGS-2HaxD-IN
- cAPGi-5HaxD2HaxD (cAP ax)
- C53UiG+5HPaxD2HPaxD (hAP ax³)
- S53UG+5HaxD2HaxD (Chateau ax)
- H53UiG-5HaxQ2HaxQ (Chateau PRO ax)
- CCR2116-12G-4S+
- RDS2216-2XG-4S+4XS-2XQ

---

### 配置属性 {#configuration-properties}

| 属性 | 描述 |
| :--- | :--- |
| **enabled** (*no \| yes*；默认值：**no**) | 启用或禁用按钮功能。 |
| **hold-time** (*time interval Min..Max*；默认值：—) | 仅当按钮按住的持续时间在指定范围内时才触发按钮操作。`Min` 和 `Max` 均接受从 `0s` 到 `1m` 的值。*（从 RouterOS 6.47beta60 及更高版本可用。）* |
| **on-event** (*string*；默认值：—) | 按下按钮时要运行的脚本名称。脚本必须在[脚本](../developer-guides/scripting/index.md)菜单中创建并命名。 |

:::info
Mode、Reset 和 WPS 按钮的 on-event 脚本使用 `read,write,reboot,ftp,romon,test` 权限执行。
:::

---

### 基本 Mode 按钮示例 {#basic-mode-button-example}

以下示例创建一个脚本并将其分配给 Mode 按钮。按下按钮时，会向系统日志写入一条消息。

```ros
/system/script/add name=test-mode-button source={:log info message=("mode button pressed");}
/system/routerboard/mode-button/set on-event=test-mode-button enabled=yes
```

---

### 使用 Hold-Time 选项（RouterOS 6.47 及更高版本） {#using-the-hold-time-option-routeros-647-and-later}

:::info
`hold-time` 选项和扩展的 Reset 按钮功能在 RouterOS 6.47 中引入。
:::

你可以配置按钮仅在按住特定持续时间时触发。以下示例在 Mode 按钮按住 3 到 5 秒之间时激活脚本：

```ros
/system/script/add name=test-mode-button source={:log info message=("mode button pressed");}
/system/routerboard/mode-button/set on-event=test-mode-button hold-time=3..5 enabled=yes
```

---

### Reset 按钮配置 {#reset-button-configuration}

Reset 按钮的配置方式与 Mode 按钮相同，但使用不同的菜单路径：`/system/routerboard/reset-button`。

```ros
/system/script/add name=test-reset-button source={:log info message=("reset button pressed");}
/system/routerboard/reset-button/set on-event=test-reset-button hold-time=0..10 enabled=yes
```

---

### 示例：使用 Mode 按钮切换 LED 暗模式 {#example-toggle-led-dark-mode-with-the-mode-button}

以下脚本在每次按下 Mode 按钮时切换 [LED 暗模式](./leds.md#led-settings)的开启和关闭：

```ros
/system/script/add name=dark-mode source={
   :if ([system leds settings get all-leds-off] = "never") do={
      /system/leds/settings/set all-leds-off=immediate
   } else={
      /system/leds/settings/set all-leds-off=never
   }
}
/system/routerboard/mode-button/set enabled=yes on-event=dark-mode
```

---

### WPS 按钮（D53、C53、S53 和 H53 系列） {#wps-button-d53-c53-s53-and-h53-series}

D53、C53、S53 和 H53 系列的 RouterBoard 包含可配置的 **WPS 按钮**。其工作方式与 Mode 和 Reset 按钮相同——按下时执行脚本。

**基本 WPS 按钮示例：**

```ros
/system/script/add name=test-wps-button source={:log info message=("wps button pressed");}
/system/routerboard/wps-button/set on-event=test-wps-button hold-time=0..10 enabled=yes
```

**通过 WPS 按钮或 Mode 按钮触发 WPS 配对：**

以下脚本在所有活动的 Wi-Fi 接入点接口上启动 WPS 按钮配对。你可以将其分配给 WPS 按钮或 Mode 按钮（或两者）。

```ros
/system/script/add name=wps-accept source={
    :foreach iface in=[/interface/wifi/find where (configuration.mode="ap" && disabled=no)] do={
        /interface/wifi/wps-push-button $iface;
    }
}

/system/routerboard/wps-button/set enabled=yes on-event=wps-accept
/system/routerboard/mode-button/set enabled=yes on-event=wps-accept
```
