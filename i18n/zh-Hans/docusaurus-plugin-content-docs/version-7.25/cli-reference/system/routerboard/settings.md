---
sidebar_key: "cli-reference/system/routerboard/settings"
sidebar_position: 3
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/routerboard/settings
captured_at: '2026-11-01T21:25:42+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/routerboard/settings {#systemrouterboardsettings}
**条件：** !i386
**类型：** 设置目录

此子菜单用于配置 RouterBOOT 固件设置。这些设置控制设备在硬件层面的启动和运行方式。

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

:::info
device-mode 设置会限制双启动设备的 SwOS/RouterOS 切换。要启用它，请运行：
`/system/device-mode/update routerboard=yes`
:::

:::danger
对 CPU 或内存进行超频不在保修范围内。如果你怀疑超频导致性能问题，请在联系支持之前将两个频率都恢复到标称值。
:::

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="auto-upgrade" typ="bool">是否在 RouterOS 升级后自动升级固件。最新固件会在额外重启一次后应用。</ArgTableRow>
<ArgTableRow arg="baud-rate" typ="enum (115200 | 57600 | 38400 | 19200 | 9600 | 4800 | 2400 | 1200) { 115200:0, 57600:1, 38400:2, 19200:3, 9600:4, 4800:5, 2400:6, 1200:7 }">如果已安装，请选择板载 RS232 的速度（单位为比特每秒）。**off** 选项会禁用串口接口。</ArgTableRow>
<ArgTableRow arg="boot-delay" typ="time">启动时等待按键的时间。</ArgTableRow>
<ArgTableRow arg="init-delay" typ="time">仅用于 RB9xx 系列设备上的 mPCIe 调制解调器。如果软重启后无法识别调制解调器，请设置 USB 端口初始化前的延迟。</ArgTableRow>
<ArgTableRow arg="enter-setup-on" typ="enum (any-key | delete-key) { any-key:0, delete-key:1 }">指定在启动延迟期间按下哪个键会使 BIOS 进入配置模式。当串口控制台在启动过程中输出符号并自行进入 RouterBOOT 菜单时，此设置很有用。在某些串口终端程序中，无法使用 <kbd>Delete</kbd> 键进入设置。在这种情况下，请改用 <kbd>Backspace</kbd> 键。</ArgTableRow>
<ArgTableRow arg="boot-device" typ="enum">
选择 RouterBOOT 加载操作系统的方式：
- **ethernet** — 让设备以 Etherboot 模式启动。
- **flash-boot** — 启动时启用 Flashfig 模式。在配置更改成功后，或用户登录到板卡后，此设置会恢复为 NAND。
- **flash-boot-once-then-nand** — 仅在单次启动时启用 Flashfig 模式。之后，该设置会重置为 `nand-if-fail-then-ethernet`。
- **nand-if-fail-then-ethernet** — 从 NAND 启动 RouterOS。如果 RouterOS 无法启动，设备会自动进入 Etherboot。这是设备开箱即用时的默认模式。
- **nand-only** — 从 NAND 启动 RouterOS。
- **try-ethernet-once-then-nand** — 让设备以 Etherboot 模式启动一次。如果没有可用的服务器，设备会直接从 NAND 或设备所使用的存储类型启动。

Etherboot 模式是 MikroTik 设备的一种特殊状态。你可以使用它通过 Netinstall 重新安装设备。  
你可以根据所使用的设备，通过多种方式让设备进入 Etherboot 模式：
1. 按住 Reset 按钮，然后给设备通电。等待 USR LED 闪烁、然后常亮，再熄灭。松开 Reset 按钮。设备会以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。
2. 使用串口控制台。设备启动时，按住 <kbd>Control</kbd>+<kbd>E</kbd>，直到设备显示正在尝试 bootp 协议。
3. 使用串口控制台。在设备启动时按任意键，然后依次按 <kbd>O</kbd>、<kbd>1</kbd> 和 <kbd>X</kbd>。
</ArgTableRow>
<ArgTableRow arg="preboot-etherboot" typ="alt { symbolic-names: enum (disabled) { disabled:0 }
, timeout: time [1 .. 30]
 }">启用 preboot-etherboot，它会在常规启动设备之前运行。其工作方式与 `boot-device=etherboot` 相同，但多了一个超时值。如果在超时到期前未从 Netinstall 服务器收到 IP 地址，常规启动过程就会开始。preboot-etherboot 配置存储在 BIOS 中，因此将 RouterOS 降级到较早版本不会禁用它。你可以从 RouterOS 菜单中禁用它，或通过重置 BIOS 来禁用它。由于 etherboot 会接受来自任何 BOOTP/DHCP 服务器的 IP 地址，请使用 preboot-etherboot-server，仅在从指定 Netinstall 服务器收到地址时才启动 etherboot。</ArgTableRow>
<ArgTableRow arg="preboot-etherboot-server" typ="alt { symbolic-names: enum (any) { any:0 }
, ip: ipAddr
 }">将 preboot-etherboot 设置为仅接受来自指定 Netinstall 服务器的 IP 地址。此设置可防止从其他 BOOTP/DHCP 服务器意外触发 etherboot。</ArgTableRow>
<ArgTableRow arg="etherboot-port" typ="enum (ether1 | ether2) { ether1:0, ether2:1 }">选择 Etherboot/Netinstall 接口。仅适用于 CRS520、CRS804 和 CRS812。默认端口取决于型号。</ArgTableRow>
<ArgTableRow arg="boot-os" typ="enum (router-os | swos) { router-os:0, swos:1 }">更改 CRS3xx 系列交换机的启动操作系统。</ArgTableRow>
<ArgTableRow arg="regulatory-domain-ce" typ="bool">为高天线增益设备启用超低 TX 功率（需要重启）。</ArgTableRow>
<ArgTableRow arg="cpu-mode" typ="enum (power-save | regular) { power-save:0, regular:1 }">CPU 是否在 HLT 指令下进入挂起模式。大多数操作系统在 CPU 空闲周期使用 HLT 指令。当 CPU 处于挂起模式时，功耗更低。在低温条件下，应选择 regular 模式，以便提高系统整体温度。</ArgTableRow>
<ArgTableRow arg="cpu-frequency" typ="enum">使用此选项可更改设备的 CPU 频率。可用值取决于型号。要查看可用选项，请在此提示符下，于 RouterOS 版本 6 中按 <kbd>?</kbd>，或在 RouterOS 版本 7 中按 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="memory-frequency" typ="enum">使用此选项可更改设备的内存频率。可用值取决于型号。要查看可用选项，请在此提示符下，于 RouterOS 版本 6 中按 <kbd>?</kbd>，或在 RouterOS 版本 7 中按 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="memory-data-rate" typ="enum">使用此选项可更改设备的内存数据速率。可用值取决于型号。要查看可用选项，请在此提示符下，于 RouterOS 版本 6 中按 <kbd>?</kbd>，或在 RouterOS 版本 7 中按 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="preferred-architecture" typ="enum (arm32 | arm64) { arm32:0, arm64:1 }">L009 设备的专用设置。将设备更新为使用 ARM64 架构。</ArgTableRow>
<ArgTableRow arg="boot-protocol" typ="enum (bootp | dhcp) { bootp:0, dhcp:1 }">要使用的启动协议：- **bootp** — 启动 RouterOS 的默认选项。- **dhcp** — 用于 OpenWrt，也可能用于其他操作系统。</ArgTableRow>
<ArgTableRow arg="enable-jumper-reset" typ="bool">禁用此选项可防止通过板载跳线意外重置设置。</ArgTableRow>
<ArgTableRow arg="force-backup-booter" typ="bool">是否使用备份 RouterBOOT。仅当主加载器损坏且无法修复时，此设置才有用。你可以使用此设置在每次启动时加载备份加载器，而不必在按住 Reset 按钮的情况下启动设备（后者会加载备份加载器）。</ArgTableRow>
<ArgTableRow arg="silent-boot" typ="bool">此选项会禁用启动期间的蜂鸣声（不会禁用 RouterOS 的 `beep` 命令）。</ArgTableRow>
<ArgTableRow arg="disable-pci" typ="bool">配备 MT7621 芯片的设备的专用设置。禁用 PCI。</ArgTableRow>
<ArgTableRow arg="gpio-function" typ="ubit (serial1)">M33 设备的专用设置。默认情况下，引脚 12、13、15 和 16 配置为使用第二个 `serial1` 端口。你可以在 `/iot/gpio/digital` 菜单中重新分配它们以供 GPIO 使用。</ArgTableRow>
<ArgTableRow arg="protected-routerboot" typ="enum (disabled | enabled)">
禁用通过串口控制台访问 RouterBOOT 配置，并阻止 Reset 按钮更改启动模式（Netinstall 被禁用）。只能使用具有管理员权限的已知 RouterOS 用户账户访问 RouterOS。只能从 RouterOS 内部禁用此设置。如果丢失 RouterOS 密码，恢复需要通过 Reset 按钮时序操作对设备进行完整重新格式化。
- **enabled** — 安全模式。仅可使用有效的管理员级账户访问 RouterOS。串口输入会被忽略，Etherboot 被禁用，并且无法更改 RouterBOOT 设置。
- **disabled** — 正常运行。可通过串口控制台访问 RouterBOOT 设置，并且可以使用 Reset 按钮进入 Netinstall 模式。
</ArgTableRow>
<ArgTableRow arg="reformat-hold-button" typ="time">
定义在通电时必须按住 Reset 按钮以触发设备完整重新格式化的最短时间。按住时间必须长于该值，但短于 `reformat-hold-button-max`。触发后，设备会执行完整的重置操作：
- RouterOS、所有文件和配置都会被永久擦除（NAND 重新格式化）。
- 所有 RouterBOOT 设置都会重置为默认值。
- 设备会重启。
- 由于 NAND 启动失败，设备会自动进入 Etherboot。
- 需要使用 Netinstall 重新安装 RouterOS。

此操作极其危险。仅当所有其他访问方法都不可用时才使用。在某些 RouterBOARD 设备上，重新格式化过程可能耗时超过 5 分钟。重新格式化完成后，设备即可用于 Netinstall。
</ArgTableRow>
<ArgTableRow arg="reformat-hold-button-max" typ="time">
定义在触发重新格式化期间可以按住 Reset 按钮的最长时间。它与 `reformat-hold-button` 配合创建一个精确的时间窗口。  
例如，设置 `reformat-hold-button=60s` 和 `reformat-hold-button-max=65s` 要求按住按钮的时间严格介于 60 到 65 秒之间。这会提高安全性，使意外或猜测的重置几乎不可能发生。该功能在 RouterBOOT 3.38.3 中引入。
</ArgTableRow>
</ArgTable>
