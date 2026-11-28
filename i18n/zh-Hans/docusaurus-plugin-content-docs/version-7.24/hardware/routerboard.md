---
title: "RouterBOARD"
description: "本页介绍 MikroTik RouterOS 中的 `/system/routerboard` 菜单，提供型号、序列号以及当前/升级固件版本等硬件和固件信息。其中包含 RouterBOOT 固件升级说明，以及用于在硬件层面配置启动行为的设置。"
tags:
  - 'routerboard'
  - 'firmware-upgrades'
  - 'settings'
source: https://manual.mikrotik.com/docs/7.24/hardware/routerboard
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

在 RouterBOARD 设备上，可以从 `/system/routerboard` 菜单查看基本硬件和固件信息。

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

输出包括以下详细信息：

## 属性 {#properties}

**只读属性：**

| 属性 | 说明 |
| :-- | :-- |
| **routerboard**（*yes \| no*） | 指示设备是否为 RouterBOARD 单元。 |
| **model**（*string*） | RouterBOARD 型号编号。 |
| **serial-number**（*string*） | 设备的唯一序列号。 |
| **firmware-type**（*string*） | 设备使用的 bootloader 固件类型。 |
| **factory-firmware**（*string*） | 出厂时安装的固件版本。 |
| **current-firmware**（*string*） | 当前使用的 RouterBOOT 加载器版本。请勿将其与 RouterOS 操作系统版本混淆。 |
| **upgrade-firmware**（*string*） | RouterOS 升级可能包含新的 RouterBOOT 版本文件，但必须手动应用。此行指示设备上是否找到了新的 RouterBOOT 文件。该文件可能随最近的 RouterOS 升级一起提供，也可能作为 FWF 文件手动上传。在这两种情况下，此处都会显示可用的最新版本。 |

## 升级 RouterBOOT {#upgrading-routerboot}

RouterBOOT 升级通常包括对 RouterBOARD 整体运行的细微改进。建议保持固件为最新版本。

要检查是否有可用升级，请比较 `/system/routerboard` 下的 **current-firmware** 和 **upgrade-firmware** 值。如果 **upgrade-firmware** 显示的版本高于 **current-firmware**，则表示已有新版本可供应用。

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

重启后，确认 **current-firmware** 与 **upgrade-firmware** 一致，以验证升级已成功应用。

## 设置 {#settings}

**路径：** `/system/routerboard/settings`

该子菜单用于配置 RouterBOOT 固件设置，这些设置控制设备如何启动以及在硬件级别如何运行。

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

| 属性 | 说明 |
| :--- | :--- |
| **auto-upgrade** (*yes \| no*；默认：**no**) | RouterOS 升级后是否自动升级固件。最新固件将在再次重启后应用。 |
| **baud-rate** (*integer*；默认：**115200**) | 如果已安装板载 RS232，请选择其速度，单位为 bit/s。Off 选项可禁用 serial 接口。 |
| **boot-delay** (*time*；默认：**2s**) | 启动期间等待按键的时间。 |
| **boot-device** (*nand-if-fail-then-ethernet ...*；默认：**nand-if-fail-then-ethernet**) | 选择 RouterBOOT 加载操作系统的方式：<br/><br/>- <strong>ethernet</strong> — 以 Etherboot 模式启动设备；<br/>- <strong>flash-boot</strong> — 启动时启用 Flashfig 模式。配置更改成功或任何用户登录设备后，该设置将恢复为 NAND；<br/>- <strong>flash-boot-once-then-nand</strong> — 仅在一次启动时启用 Flashfig 模式，之后重置为 nand-if-fail-then-ethernet；<br/>- <strong>nand-if-fail-then-ethernet</strong> — 从 NAND 启动 RouterOS，如果 RouterOS 无法启动，则自动进入 Etherboot。这是设备开箱即用的默认模式；<br/>- <strong>nand-only</strong> — 从 NAND 启动 RouterOS；<br/>- <strong>try-ethernet-once-then-nand</strong> — 以 Etherboot 模式启动设备一次，如果没有可用服务器，则直接从 NAND 或设备使用的存储类型启动。<br/><br/><strong>重要：</strong>注意<br/>Etherboot 模式是 MikroTik 设备的一种特殊状态，允许使用 Netinstall 重新安装设备。<br/>根据所用设备，可通过多种方式使设备进入 Etherboot 模式：<br/>1. 按住 Reset 按钮并给设备通电（等待 "USR" LED 闪烁后稳定为 "On"，当 "USR" LED 为 "Off" 时松开 Reset 按钮）——设备将以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。<br/>2. 使用 serial console，在设备启动时持续按键盘上的 CTRL+E，直到设备显示正在尝试 bootp 协议。<br/>3. 使用 serial console，在设备启动时按任意键，然后选择 "o"、"1" 和 "x"。 |
| **boot-os** (*router-os \| swos*；默认：**router-os**) | 更改 CRS3xx 系列交换机的启动操作系统。 |
| **boot-protocol** (*bootp \| dhcp ...*；默认：**bootp**) | 要使用的启动协议：<br/><br/>- <strong>bootp</strong> — 启动 RouterOS 的默认选项；<br/>- <strong>dhcp</strong> — 用于 OpenWRT 及可能的其他 OS。 |
| **cpu-frequency** (*depends on model*；默认：**depends on model**) | 该选项允许更改设备的 CPU 频率。取值取决于型号；要查看可用选项，请在此提示符下按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **cpu-mode** (*power-save \| regular*；默认：**power-save**) | 是否在 HLT 指令中进入 CPU 挂起模式。大多数 OS 在 CPU 空闲周期使用 HLT 指令。CPU 处于挂起模式时功耗更低，但在低温条件下，建议选择 regular 模式，以提高系统整体温度。 |
| **enable-jumper-reset** (*yes \| no*；默认：**yes**) | 禁用该选项可避免通过板载跳线意外重置设置。 |
| **enter-setup-on** (*any-key \| delete-key*；默认：**any-key**) | 在启动延迟期间，哪个按键会使 BIOS 进入配置模式。当 serial console 在启动过程中输出符号并自行进入 RouterBOOT 菜单时，该选项很有用。请注意，在某些 serial 终端程序中，无法使用 Delete 键进入设置——在这种情况下，可能可以使用 Backspace 键完成。 |
| **force-backup-booter** (*yes \| no*；默认：**no**) | 是否使用备份 RouterBOOT。仅当主加载器以某种方式损坏且无法修复时，该选项才有用。这样就不必按住 Reset 按钮启动设备（该操作会加载备份加载器），可以使用此设置每次都加载备份加载器：<br/><br/>- <strong>yes</strong> — 始终使用备份加载器；<br/>- <strong>no</strong> — 使用主加载器。 |
| **init-delay** (*timeout interval 0s..9s*；默认：) | 仅用于 RB9xx 系列设备上的 mPCIe 调制解调器。如果软重启后无法识别调制解调器，可能需要在 USB 端口初始化前添加延迟。 |
| **memory-frequency** (*depends on model*；默认：**depends on model**) | 该选项允许更改设备的内存频率。取值取决于型号；要查看可用选项，请在此提示符下按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **memory-data-rate** (*depends on the model*；默认：**depends on model**) | 该选项允许更改设备的内存数据速率。取值取决于型号；要查看可用选项，请在此提示符下按键盘上的 RouterOS 版本 6 中的 [?] 按钮或 RouterOS 版本 7 中的 [F1] 按钮。 |
| **preboot-etherboot** (*timeout interval 1s..30s*；默认：**disabled**) | 启用 preboot etherboot，它会在常规启动设备之前运行。其工作方式与 boot-device=etherboot 相同，但带有额外的超时值。如果在超时到期前未从 Netinstall 服务器收到 IP 地址，则会开始常规启动过程。<br/><br/><strong>重要：</strong>注意<br/>preboot-etherboot 配置存储在 BIOS 中，将 RouterOS 降级到旧版本不会禁用它。可从 RouterOS 菜单或重置 BIOS 禁用该功能。<br/>由于 etherboot 接受来自任何 BOOTP/DHCP 服务器的 IP 地址，请使用 preboot-etherboot-server，仅在从指定 Netinstall 服务器收到地址时启动 etherboot。 |
| **preboot-etherboot-server** (*IP address, any*；默认：**any**) | 设置 preboot-etherboot 仅接受来自指定 Netinstall 服务器 IP 地址的 IP 地址。启用该功能后，可防止来自其他 BOOTP/DHCP 服务器的意外 etherboot。 |
| **regulatory-domain-ce** (*yes \| no*；默认：**no**) | 为高天线增益设备启用额外低 TX 功率（需要重启）。 |
| **silent-boot** (*yes \| no*；默认：**no**) | 该选项禁用启动期间的蜂鸣声：<br/><br/>- <strong>yes</strong> — 启动时无蜂鸣声（不会禁用 RouterOS: beep 命令）；<br/>- <strong>no</strong> — 正常启动声音。 |
| **disable-pci** (*yes \| no*；默认：**no**) | 适用于采用 MT7621 芯片的设备。允许禁用 PCI。 |
| **preferred-architecture** (*arm32 \| arm64*；默认：**arm32**) | 适用于 L009 设备。允许将设备更新为使用 ARM64 架构。 |
| **etherboot-port** (*interface*；默认：) | 允许选择 Etherboot/Netinstall 接口，仅适用于 CRS520、CRS804、CRS812。默认端口取决于型号。 |
| **gpio-function** (*port*；默认：**serial1**) | 适用于 M33 设备。默认情况下，引脚 12、13、15、16 配置为第二个 "serial1" 端口使用，可在 `/iot/gpio/digital` 菜单中将其改为 GPIO 用途。 |

:::danger
CPU 或内存超频不在保修范围内。如果怀疑性能问题由超频导致，请在联系支持前将两个频率恢复为标称值。
:::

## 预启动 Etherboot {#preboot-etherboot}

**preboot-etherboot** 是一项功能，它指示 RouterOS 设备在每次启动时，于常规启动过程（例如 RouterOS）开始前，在指定时间内搜索 Netinstall 服务器。该功能特别适用于远程重新安装，因为它允许设备在每次启动时尝试 Etherboot。

**preboot-etherboot-server** 指定 preboot-etherboot 过程仅接受来自具有特定 IP 地址的 Netinstall 服务器的 IP 地址。默认情况下，Etherboot 接受来自任何 BOOTP/DHCP 服务器的地址。该设置允许将其限制为特定的 Netinstall 服务器，从而无需将设备从网络中移除即可重新安装。

## 远程重新安装 {#remote-reinstallation}

同时启用这两项功能后，无需访问 RouterOS 或使用 Reset 按钮即可远程重新安装设备。

例如，要启动远程重新安装：

1. 对 RouterOS 设备断电再上电（例如，使用 PoE 交换机或电源控制器）。
2. 设备尝试 Etherboot 并连接到 Netinstall 服务器。
3. 安装完成后，禁用 Netinstall 服务器。
4. 再次对设备断电再上电，以完成该过程。

## 要求 {#requirements}

要启用 **preboot-etherboot** 和 **preboot-etherboot-server**：

1. 安装 RouterOS 7.9 或更高版本。
2. 升级 RouterBOOT：

要启用该功能，请运行：

```ros
/system/routerboard/settings/set preboot-etherboot=9s preboot-etherboot-server=10.10.10.100
```

在每次重启或断电再上电时，设备将尝试从 IP 为 **10.10.10.100** 的 Netinstall 服务器获取 IP 地址，持续 **9 秒**。如果没有可用的服务器，设备将继续正常启动过程。

:::warning
如果未指定 **preboot-etherboot-server**，设备将接受来自任意 Netinstall 服务器的 IP 地址，并进入 Etherboot 模式，等待重新安装过程。仅当 RouterBOOT 的 **boot-protocol** 设置为 **dhcp** 时才会使用 DHCP 服务器（默认值为 **bootp**）。
:::

RouterOS 重新安装不会影响 BIOS 设置。如果启用了 preboot-etherboot，设备将在每次启动时继续尝试进入 Etherboot。

为避免在未访问 RouterOS 时意外激活 Etherboot，请禁用任何连接的 Netinstall 或 DHCP 服务器。

## 受保护的 RouterBOOT {#protected-routerboot}

Protected RouterBOOT 功能通过禁用 Etherboot 并限制对引导加载程序的访问，保护 RouterOS 设备免受物理访问影响。

该功能只能在登录后在 RouterOS 中启用或禁用。没有可直接控制它的 RouterBOOT 设置。这些附加选项仅在某些条件下显示。

:::warning
如果启用 Protected RouterBOOT 时忘记了 RouterOS 管理员密码，则必须执行完整重新格式化才能恢复设备。
:::

## 启用时的行为 {#behavior-when-enabled}

当该功能处于活动状态时：

- 重置按钮和重置针孔被禁用。
- 无法通过串口控制台访问 RouterBOOT 菜单。
- Etherboot（Netinstall）被禁用。
- 只能使用有效的管理员密码通过 RouterOS 访问设备。
- 该设置只能在 RouterOS 中启用或禁用（不存在 RouterBOOT 级别的选项）。

:::warning
如果启用 Protected RouterBOOT 并忘记 RouterOS 密码，则**无法通过常规方式恢复设备**。
:::

## 启用或禁用 {#enabling-or-disabling}

从 RouterOS v7 开始，启用或修改此功能需要通过按下 reset 或 mode 按钮进行确认。

您有 **60 秒**时间确认更改。

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
如果在超时时间内未按下按钮，则更改不会生效。
:::

## 紧急重新格式化（恢复方法） {#emergency-reformat-recovery-method}

作为应急恢复方式，可以在上电期间按住 reset 按钮，按住时间长于 reformat-hold-button 时间，但短于 reformat-hold-button-max，以重置设备。

:::danger
极其危险。仅在已失去设备所有访问权限时使用。
:::

触发后，将执行以下操作：

- RouterOS、所有文件和配置将被完全且不可逆地擦除（NAND 重新格式化）。
- 所有 RouterBOOT 设置将重置为默认值。
- 设备将重启。
- 由于从 NAND 启动失败，设备会自动进入 Etherboot 模式
需要使用 Netinstall 重新安装 RouterOS。

:::note
部分 RouterBOARD 设备上的重新格式化可能需要超过 5 分钟。
:::

### 属性参考 {#property-reference-1}

| 属性 | 说明 |
| :--- | :--- |
| **protected-routerboot**（*enabled \| disabled*；默认值：**disabled**） | 禁用通过串口控制台访问 RouterBOOT 配置，并防止重置按钮更改启动模式（Netinstall 被禁用）。只有在拥有具有管理权限的 RouterOS 用户账户时，才能访问 RouterOS。该设置只能在 RouterOS 内部禁用。如果 RouterOS 密码丢失，恢复需要使用重置按钮计时流程对设备进行完整格式化。<br/><br/>- <strong>enabled</strong> — 安全模式。只有有效的管理员级用户才能访问 RouterOS。串行输入被忽略。Etherboot 被禁用，并且无法更改 RouterBOOT 设置。<br/>- <strong>disabled</strong> — 正常运行。可通过串口控制台访问 RouterBOOT 设置，并且可使用重置按钮进入 Netinstall 模式。 |
| **reformat-hold-button**（*5s..300s*；默认值：**20s**） | 定义开机时必须按住重置按钮以触发设备完整格式化的最短时间。按住时间必须长于该值，但短于 <code>reformat-hold-button-max</code>。触发后，设备会执行完整重置操作：<br/><br/>- RouterOS、所有文件和配置将被永久擦除（NAND 重新格式化）。<br/>- 所有 RouterBOOT 设置将恢复为默认值。<br/>- 设备将重启。<br/>- 由于 NAND 启动失败，设备将自动进入 Etherboot。<br/>- 需要使用 Netinstall 重新安装 RouterOS。<br/><br/>⚠️ <strong>警告：</strong>这是极其危险的操作，仅应在所有其他访问方法均不可用时执行。在某些 RouterBOARD 设备上，格式化过程可能需要超过 5 分钟。完成后，设备即可进行 Netinstall。 |
| **reformat-hold-button-max**（*15s..600s*；默认值：**10m**） | 定义在触发格式化时允许按住重置按钮的最长时间。它与 `reformat-hold-button` 配合使用，以创建精确的时间窗口。例如，设置 `reformat-hold-button=60s` 和 `reformat-hold-button-max=65s` 时，必须严格在 60 到 65 秒之间按住按钮。这通过使意外或猜测的重置几乎不可能发生来提高安全性。自 RouterBOOT 3.38.3 起引入。 |

### LED 指示灯 {#led-indicator}

启用 Protected RouterBOOT 后，LED 每秒闪烁一次，以辅助计时：

- LED 熄灭 1 秒
- LED 点亮 1 秒

### 旧款 MikroTik 硬件上的支持 {#support-on-older-mikrotik-hardware}

> **重要：**本节仅适用于显示下述特定错误消息的旧款设备。除非该消息明确要求，否则不要修改引导加载程序。

所有现代 MikroTik 设备均支持 Protected RouterBOOT 功能。但是，如果使用出厂固件版本低于 **7.19.3** 的旧款设备，尝试启用该功能时可能会看到以下消息：

> *“‘protected routerboot’ 功能需要升级 backup-routerboot”*

如果看到此消息，请按以下步骤操作。

### RouterOS v7 — 升级步骤 {#routeros-v7--upgrade-steps}

1. 将设备[升级或降级](/docs/getting-started/installation-and-upgrade/upgrade#manual-upgrade)到指定的 RouterOS **7.19.3**。可在 [MikroTik 下载页面](https://mikrotik.com/download)找到该版本。

2. 运行 `/system/routerboard/upgrade` 升级 RouterBOOT 固件，然后重启设备。重启后，确认 `/system/routerboard/print` 中显示的 **current-firmware** 值与 `/system/resource/print` 中显示的已安装 RouterOS 版本一致 —— 两者均应为 **7.19.3**。

3. 将 [v7 universal package (all architectures)](https://box.mikrotik.com/f/991c3e94984c4e18b8d6/?dl=1) 上传到设备，然后再次重启。这会将 **factory-firmware** 版本更新为 **7.19.3**，这是启用 Protected RouterBOOT 功能所必需的。

4. 完成上述步骤后，可将设备升级到更高版本的 RouterOS。

### RouterOS v6 — 升级步骤 {#routeros-v6--upgrade-steps}

如果设备运行 RouterOS **v6** 且遇到相同消息，请按上述步骤操作，但有以下差异：

- 目标版本：**6.49.7**（而不是 7.19.3）
- 使用 [v6 通用软件包（所有架构）](https://box.mikrotik.com/f/b062a26b4bd34c55aa52/?dl=1)（而不是 v7 软件包）

## Mode 和 Reset 按钮 {#mode-and-reset-buttons}

所有运行 RouterOS 的 MikroTik 设备都支持 **Reset** 按钮的附加功能。部分 RouterBOARD 设备还配有 **Mode** 按钮，可配置为按下时运行自定义脚本。

:::warning
由 Mode 或 Reset 按钮触发的脚本以 `ftp`、`reboot`、`read`、`write`、`test` 和 `romon` 权限运行。详情请参阅 [脚本权限](/docs/developer-guides/scripting#script-permissions)。
:::

---

### 支持的设备（Mode 按钮） {#supported-devices-mode-button}

以下设备支持 Mode 按钮：

- RBcAP-2nD（cAP）
- RBcAPGi-5acD2nD（cAP ac）
- RBwsAP5Hac2nD（wsAP ac lite）
- RB750Gr3（hEX）
- RB760iGS（hEX S）
- RB912R-2nD（LtAP mini，LtAP mini LTE/4G kit）
- RBD52G-5HacD2HnD（hAP ac²）
- RBLHGR（LHG LTE/4G kit）
- RBSXTR（SXT LTE/4G kit）
- CRS328-4C-20S-4S+RM
- CRS328-24P-4S+RM
- CCR1016-12G r2
- CCR1016-12S-1S+ r2
- CCR1036-12G-4S r2
- CCR1036-8G-2S+ r2
- RBD53G-5HacD2HnD（Chateau）
- RBD53GR-5HacD2HnD（hAP ac³）
- E50UG（hEX）
- L41G-2axD（hAP ax lite）
- L009UiGS-RM，L009UiGS-2HaxD-IN
- cAPGi-5HaxD2HaxD（cAP ax）
- C53UiG+5HPaxD2HPaxD（hAP ax³）
- S53UG+5HaxD2HaxD（Chateau ax）
- H53UiG-5HaxQ2HaxQ（Chateau PRO ax）
- CCR2116-12G-4S+
- RDS2216-2XG-4S+4XS-2XQ

---

### 配置属性 {#configuration-properties}

| 属性 | 说明 |
| :--- | :--- |
| **enabled** (*no \| yes*；默认：**no**) | 启用或禁用按钮功能。 |
| **hold-time** (*time interval Min..Max*；默认：—) | 仅当按钮按住的时长在指定范围内时触发按钮操作。`Min` 和 `Max` 均接受 `0s` 至 `1m` 的值。*（从 RouterOS 6.47beta60 及更高版本起可用。）* |
| **on-event** (*string*；默认：—) | 按下按钮时要运行的脚本名称。该脚本必须在 [Script](/docs/developer-guides/scripting) 菜单中创建并命名。 |

:::info
Mode、Reset 和 WPS 按钮的 on-event 脚本使用 `read,write,reboot,ftp,romon,test` 权限执行。
:::

---

### Mode 按钮基本示例 {#basic-mode-button-example}

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

可以将按钮配置为仅在按住特定时长时触发。以下示例在 Mode 按钮按住 3 至 5 秒时激活脚本：

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

### 示例：使用 Mode 按钮切换 LED 深色模式 {#example-toggle-led-dark-mode-with-the-mode-button}

以下脚本会在每次按下 Mode 按钮时切换 [LED 深色模式](/docs/hardware/leds#led-settings) 的开和关：

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

D53、C53、S53 和 H53 系列的 RouterBoards 包含可配置的 **WPS 按钮**。其工作方式与 Mode 和 Reset 按钮相同——按下时执行脚本。

**基本 WPS 按钮示例：**

```ros
/system/script/add name=test-wps-button source={:log info message=("wps button pressed");}
/system/routerboard/wps-button/set on-event=test-wps-button hold-time=0..10 enabled=yes
```

**通过 WPS 按钮或 Mode 按钮触发 WPS 配对：**

以下脚本会在所有活动的 Wi-Fi 接入点接口上启动 WPS 按键配对。你可以将其分配给 WPS 按钮或 Mode 按钮（或两者）。

```ros
/system/script/add name=wps-accept source={
    :foreach iface in=[/interface/wifi/find where (configuration.mode="ap" && disabled=no)] do={
        /interface/wifi/wps-push-button $iface;
    }
}

/system/routerboard/wps-button/set enabled=yes on-event=wps-accept
/system/routerboard/mode-button/set enabled=yes on-event=wps-accept
```
