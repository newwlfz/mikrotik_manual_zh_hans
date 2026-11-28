---
title: "RouterBOARD"
description: "本页介绍 MikroTik RouterOS 中的 `/system/routerboard` 菜单，提供型号、序列号以及当前/升级固件版本等硬件和固件信息。其中包含 RouterBOOT 固件升级说明，以及用于在硬件层面配置启动行为的设置。"
tags:
  - 'routerboard'
  - 'firmware-upgrades'
  - 'settings'
source: https://manual.mikrotik.com/docs/7.25/hardware/routerboard
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
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
  minimum-firmware: 7.8                                                      
  current-firmware: 7.22.2
  upgrade-firmware: 7.22.2                          
```

每个参数的详细说明请参阅 [CLI reference](/docs/hardware/routerboard)。

## 升级 RouterBOOT {#upgrading-routerboot}

RouterBOOT 升级通常包括对 RouterBOARD 整体运行的细微改进。应保持固件为最新版本。

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

重启后，验证 **current-firmware** 是否与 **upgrade-firmware** 一致。值一致表示升级已成功应用。

## 预启动 Etherboot {#preboot-etherboot}

Preboot etherboot 会指示 RouterOS 设备在每次启动时，在开始常规启动过程（例如 RouterOS）之前，在指定时间内搜索 Netinstall 服务器。

默认情况下，Etherboot 接受来自任何 BOOTP/DHCP 服务器的地址，但可以通过 [`preboot-etherboot-server`](/docs/cli-reference/system/routerboard/settings#preboot-etherboot-server) 参数将 preboot-etherboot 过程锁定到具有特定 IP 地址的指定 Netinstall 服务器。

当两个选项都启用时，无需访问 RouterOS 或按下 reset 按钮即可远程重新安装设备。

例如：
1. 对 RouterOS 设备重新加电（例如，使用 PoE 交换机或电源控制器）。
2. 设备尝试 Etherboot 并连接到 Netinstall 服务器。
3. 安装完成后，禁用 Netinstall 服务器。
4. 再次对设备重新加电以完成该过程。

Run:

```ros
/system/routerboard/settings/set preboot-etherboot=9s preboot-etherboot-server=10.10.10.100
```

每次重启或重新加电时，设备都会尝试从 IP 地址为 **10.10.10.100** 的 Netinstall 服务器获取 IP 地址，持续 **9 秒**。如果没有可用的此类服务器，设备将继续正常启动过程。

:::warning
如果未指定 `preboot-etherboot-server`，设备会接受来自任何 Netinstall 服务器的 IP 地址，并进入 Etherboot 模式，等待重新安装过程。仅当 RouterBOOT `boot-protocol` 设置为 **dhcp** 时才使用 DHCP 服务器（默认值为 **bootp**）。
:::

RouterOS 重新安装不会影响 BIOS 设置。如果启用了 preboot-etherboot，设备会在每次启动时继续尝试 Etherboot。

为防止在未访问 RouterOS 时意外激活 Etherboot，请禁用所有连接的 Netinstall 或 DHCP 服务器。

## 受保护的 RouterBOOT {#protected-routerboot}

Protected RouterBOOT 设置通过禁用 Etherboot 并限制对引导加载程序的访问，保护 RouterOS 设备免受物理访问。

登录后，只能在 RouterOS 内启用或禁用该设置。没有 RouterBOOT 设置可直接控制它。这些附加选项仅在某些条件下显示。

:::warning
如果启用 Protected RouterBOOT 时忘记了 RouterOS 管理员密码，则必须执行完整重新格式化才能恢复设备。
:::

### 启用时的行为 {#behavior-when-enabled}

当该设置处于活动状态时：

- reset 按钮和 reset 针孔被禁用。
- 无法通过 serial console 访问 RouterBOOT 菜单。
- Etherboot（Netinstall）被禁用。
- 只能使用有效的 admin 密码通过 RouterOS 访问设备。
- 只能在 RouterOS 内启用或禁用该设置。不存在 RouterBOOT 级别的选项。

:::warning
如果启用 Protected RouterBOOT 并忘记 RouterOS 密码，则**无法通过常规方式恢复设备**。
:::

### 启用或禁用 {#enabling-or-disabling}

从 RouterOS v7 开始，启用或修改此设置需要通过按下 reset 或 mode 按钮进行确认。

您有 **60 秒**时间确认更改。

#### Enable（示例） {#enable-example}

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

#### Disable（示例） {#disable-example}

```ros
/system/routerboard/settings/set protected-routerboot=disabled
```

:::warning
如果在超时时间内未按下按钮，则更改不会生效。
:::

### 紧急重新格式化（恢复方法） {#emergency-reformat-recovery-method}

作为紧急恢复方式，可以在上电期间按住 reset 按钮，按住时间长于 `reformat-hold-button`，但短于 `reformat-hold-button-max`，以重置设备。

:::danger
极其危险。仅在已失去设备所有访问权限时使用。
:::

触发后，将执行以下操作：

- RouterOS、所有文件和配置都会被彻底且不可逆地擦除（NAND 重新格式化）。
- 所有 RouterBOOT 设置都会重置为默认值。
- 设备将重启。
- 由于从 NAND 启动失败，设备会自动进入 Etherboot 模式。需要使用 Netinstall 重新安装 RouterOS。

:::note
部分 RouterBOARD 设备上的重新格式化可能需要超过 5 分钟。
:::

### LED 指示灯 {#led-indicator}

启用 Protected RouterBOOT 后，LED 每秒闪烁一次，以辅助计时：

- LED 熄灭 1 秒。
- LED 点亮 1 秒。

### 旧款 MikroTik 硬件上的支持 {#support-on-older-mikrotik-hardware}

:::warning
本节仅适用于显示下文所述特定错误消息的旧设备。除非该消息明确要求，否则不要修改 bootloader。
:::

所有现代 MikroTik 设备均支持 Protected RouterBOOT 设置。但是，如果使用最低固件版本早于 **7.19.3** 的旧设备，尝试启用该设置时可能会看到以下消息：

> *“The 'protected routerboot' feature requires a backup-routerboot upgrade”*

如果看到此消息，请按照适用于你的 RouterOS 版本的步骤操作。

#### RouterOS v7 — 升级步骤 {#routeros-v7--upgrade-steps}

1. 将设备[升级或降级](/docs/7.24/getting-started/installation-and-upgrade/upgrade#manual-upgrade)到指定的 RouterOS **7.19.3**。可在 [MikroTik 下载页面](https://mikrotik.com/download)找到该版本。

2. 运行 `/system/routerboard/upgrade` 升级 RouterBOOT 固件，然后重启设备。重启后，确认 `/system/routerboard/print` 中显示的 **current-firmware** 值与 `/system/resource/print` 中显示的已安装 RouterOS 版本一致 —— 两者均应为 **7.19.3**。

3. 将 [v7 universal package (all architectures)](https://box.mikrotik.com/f/991c3e94984c4e18b8d6/?dl=1) 上传到设备并再次重启。这会将 **minimum-firmware** 版本更新为 **7.19.3**，这是启用 Protected RouterBOOT 设置所必需的。

4. 完成上述步骤后，可以将设备升级到更高版本的 RouterOS。

#### RouterOS v6 — 升级步骤 {#routeros-v6--upgrade-steps}

如果设备运行 RouterOS **v6** 且遇到相同消息，请按上一节中的步骤操作，但有以下差异：

- 目标版本：**6.49.7**（而不是 7.19.3）
- 使用 [v6 通用软件包（所有架构）](https://box.mikrotik.com/f/b062a26b4bd34c55aa52/?dl=1)（而不是 v7 软件包）

## Mode 和 Reset 按钮 {#mode-and-reset-buttons}

所有运行 RouterOS 的 MikroTik 设备都支持 **Reset** 按钮的附加选项。部分 RouterBOARD 设备还配有 **Mode** 按钮，可配置为按下时运行自定义脚本。

:::warning
由 Mode 或 Reset 按钮触发的脚本以 `ftp`、`reboot`、`read`、`write`、`test` 和 `romon` 权限运行。详情请参阅 [脚本权限](/docs/7.24/developer-guides/scripting#script-permissions)。
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

### Mode 按钮基本示例 {#basic-mode-button-example}

以下示例创建一个脚本并将其分配给 Mode 按钮。按下按钮时，会向系统日志写入一条消息。

```ros
/system/script/add name=test-mode-button source={:log info message=("mode button pressed");}
/system/routerboard/mode-button/set on-event=test-mode-button enabled=yes
```

---

### Hold-Time 选项 {#hold-time-option}

可以将按钮配置为仅在按住特定时长时触发。以下示例在按住 Mode 按钮 3 至 5 秒时激活脚本：

```ros
/system/script/add name=test-mode-button source={:log info message=("mode button pressed");}
/system/routerboard/mode-button/set on-event=test-mode-button hold-time=3..5 enabled=yes
```

Reset 按钮的配置方式与 Mode 按钮相同，但使用不同的菜单路径：`/system/routerboard/reset-button`。

```ros
/system/script/add name=test-reset-button source={:log info message=("reset button pressed");}
/system/routerboard/reset-button/set on-event=test-reset-button hold-time=0..10 enabled=yes
```

---

### 示例：使用 Mode 按钮切换 LED 深色模式 {#example-toggle-led-dark-mode-with-the-mode-button}

以下脚本会在每次按下 Mode 按钮时切换 [LED 深色模式](/docs/7.24/hardware/leds#led-settings) 的开和关：

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

D53、C53、S53 和 H53 系列的 RouterBOARD 设备包含可配置的 **WPS button**。其工作方式与 Mode 和 Reset 按钮相同：按下时执行脚本。

#### WPS button 基本示例 {#basic-wps-button-example}

```ros
/system/script/add name=test-wps-button source={:log info message=("wps button pressed");}
/system/routerboard/wps-button/set on-event=test-wps-button hold-time=0..10 enabled=yes
```

#### 使用 WPS button 或 Mode button 触发 WPS 配对 {#trigger-wps-pairing-with-the-wps-button-or-mode-button}

以下脚本会在所有活动的 Wi-Fi 接入点接口上启动 WPS push-button 配对。你可以将其分配给 WPS button、Mode button，或同时分配给两者。

```ros
/system/script/add name=wps-accept source={
    :foreach iface in=[/interface/wifi/find where (configuration.mode="ap" && disabled=no)] do={
        /interface/wifi/wps-push-button $iface;
    }
}

/system/routerboard/wps-button/set enabled=yes on-event=wps-accept
/system/routerboard/mode-button/set enabled=yes on-event=wps-accept
```
