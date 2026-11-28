---
title: "settings"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/routerboard/settings
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/routerboard/settings 
**条件：** !i386
**类型：** 设置目录

该子菜单用于配置 RouterBOOT 固件设置。这些设置控制设备在硬件层面的启动和运行方式。

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
CPU 或内存超频不在保修范围内。如果怀疑超频导致性能问题，请在联系支持前将两个频率恢复为标称值。
:::

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="auto-upgrade" typ="bool">Whether to upgrade firmware automatically after a RouterOS upgrade. The latest firmware will be applied after an additional reboot.</ArgTableRow>
<ArgTableRow arg="baud-rate" typ="enum (115200 | 57600 | 38400 | 19200 | 9600 | 4800 | 2400 | 1200) { 115200:0, 57600:1, 38400:2, 19200:3, 9600:4, 4800:5, 2400:6, 1200:7 }">Choose the onboard RS232 speed in bits per second, if installed. The **off** option disables the serial interface.</ArgTableRow>
<ArgTableRow arg="boot-delay" typ="time">How much time to wait for a keystroke while booting.</ArgTableRow>
<ArgTableRow arg="init-delay" typ="time">Used only for mPCIe modems on RB9xx series devices. If your modem is not recognized after a soft reboot, set a delay before the USB port is initialized.</ArgTableRow>
<ArgTableRow arg="enter-setup-on" typ="enum (any-key | delete-key) { any-key:0, delete-key:1 }">Specifies which key causes the BIOS to enter configuration mode during the boot delay. Useful when the serial console prints symbols during the boot process and enters the RouterBOOT menu by itself. In some serial terminal programs, you cannot use the <kbd>Delete</kbd> key to enter the setup. In this case, use the <kbd>Backspace</kbd> key instead.</ArgTableRow>
<ArgTableRow arg="boot-device" typ="enum">
Choose how RouterBOOT loads the operating system:
- **ethernet** — boot the device in Etherboot mode.
- **flash-boot** — enable Flashfig mode on startup. This setting reverts to NAND after a successful configuration change, or when a user logs into the board.
- **flash-boot-once-then-nand** — enable Flashfig mode on startup for a single boot only. After that, the setting resets to `nand-if-fail-then-ethernet`.
- **nand-if-fail-then-ethernet** — boot RouterOS from the NAND. If RouterOS does not boot, the device goes to Etherboot automatically. This is the default mode for devices straight out of the box.
- **nand-only** — boot RouterOS from the NAND.
- **try-ethernet-once-then-nand** — boot the device in Etherboot mode once. If no server is available, the device boots directly from the NAND or the storage type the device uses.

Etherboot 模式是 MikroTik 设备的一种特殊状态。你可以使用它通过 Netinstall 重新安装设备。  
根据所用设备，可通过多种方式使设备进入 Etherboot 模式：
1. 按住 Reset 按钮并给设备上电。等待 USR LED 闪烁，然后常亮，再熄灭。松开 Reset 按钮。设备将以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。
2. 使用串口控制台。设备启动时，按住 <kbd>Control</kbd>+<kbd>E</kbd>，直到设备显示正在尝试 bootp 协议。
3. 使用串口控制台。设备启动时按任意键，然后依次按 <kbd>O</kbd>、<kbd>1</kbd> 和 <kbd>X</kbd>。
</ArgTableRow>
<ArgTableRow arg="preboot-etherboot" typ="alt { symbolic-names: enum (disabled) { disabled:0 }
, timeout: time [1 .. 30]
 }">启用 preboot-etherboot，它会在常规启动设备之前运行。其工作方式与 `boot-device=etherboot` 相同，但具有额外的超时值。如果在超时到期前未从 Netinstall 服务器收到 IP 地址，则会启动常规启动过程。preboot-etherboot 配置存储在 BIOS 中，因此将 RouterOS 降级到早期版本不会禁用它。你可以从 RouterOS 菜单或通过重置 BIOS 来禁用它。由于 etherboot 接受来自任何 BOOTP/DHCP 服务器的 IP 地址，请使用 preboot-etherboot-server，仅在从指定 Netinstall 服务器收到地址时启动 etherboot。</ArgTableRow>
<ArgTableRow arg="preboot-etherboot-server" typ="alt { symbolic-names: enum (any) { any:0 }
, ip: ipAddr
 }">设置 preboot-etherboot 仅接受来自指定 Netinstall 服务器的 IP 地址。该设置可防止来自其他 BOOTP/DHCP 服务器的意外 etherboot。</ArgTableRow>
<ArgTableRow arg="etherboot-port" typ="enum (ether1 | ether2) { ether1:0, ether2:1 }">选择 Etherboot/Netinstall 接口。仅适用于 CRS520、CRS804 和 CRS812。默认端口取决于型号。</ArgTableRow>
<ArgTableRow arg="boot-os" typ="enum (router-os | swos) { router-os:0, swos:1 }">更改 CRS3xx 系列交换机的启动操作系统。</ArgTableRow>
<ArgTableRow arg="regulatory-domain-ce" typ="bool">为高天线增益设备启用额外低的 TX 功率（需要重启）。</ArgTableRow>
<ArgTableRow arg="cpu-mode" typ="enum (power-save | regular) { power-save:0, regular:1 }">CPU 在执行 HLT 指令时是否进入挂起模式。大多数操作系统会在 CPU 空闲周期使用 HLT 指令。CPU 处于挂起模式时功耗更低。在低温条件下，应选择 regular 模式，以使系统整体温度更高。</ArgTableRow>
<ArgTableRow arg="cpu-frequency" typ="enum">使用该选项可更改设备的 CPU 频率。可用值取决于型号。要查看可用选项，请在此提示符下按 RouterOS 版本 6 中的 <kbd>?</kbd> 或 RouterOS 版本 7 中的 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="memory-frequency" typ="enum">使用该选项可更改设备的内存频率。可用值取决于型号。要查看可用选项，请在此提示符下按 RouterOS 版本 6 中的 <kbd>?</kbd> 或 RouterOS 版本 7 中的 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="memory-data-rate" typ="enum">使用该选项可更改设备的内存数据速率。可用值取决于型号。要查看可用选项，请在此提示符下按 RouterOS 版本 6 中的 <kbd>?</kbd> 或 RouterOS 版本 7 中的 <kbd>F1</kbd>。</ArgTableRow>
<ArgTableRow arg="preferred-architecture" typ="enum (arm32 | arm64) { arm32:0, arm64:1 }">L009 设备的专用设置。更新设备以使用 ARM64 架构。</ArgTableRow>
<ArgTableRow arg="boot-protocol" typ="enum (bootp | dhcp) { bootp:0, dhcp:1 }">要使用的启动协议：- **bootp** — 启动 RouterOS 的默认选项。- **dhcp** — 用于 OpenWrt 以及可能的其他操作系统。</ArgTableRow>
<ArgTableRow arg="enable-jumper-reset" typ="bool">禁用该选项可防止通过板载跳线意外重置设置。</ArgTableRow>
<ArgTableRow arg="force-backup-booter" typ="bool">是否使用备用 RouterBOOT。该设置仅在主加载器损坏且无法修复时有用。无需按住 reset 按钮启动设备（这会加载备用加载器），你可以使用该设置在每次启动时加载它。</ArgTableRow>
<ArgTableRow arg="silent-boot" typ="bool">该选项会禁用启动期间的蜂鸣声（不会禁用 RouterOS 的 `beep` 命令）。</ArgTableRow>
<ArgTableRow arg="disable-pci" typ="bool">采用 MT7621 芯片设备的专用设置。禁用 PCI。</ArgTableRow>
<ArgTableRow arg="gpio-function" typ="ubit (serial1)">M33 设备的专用设置。默认情况下，引脚 12、13、15 和 16 配置为供第二个 `serial1` 端口使用。你可以在 `/iot/gpio/digital` 菜单中将它们重新分配用于 GPIO。</ArgTableRow>
<ArgTableRow arg="protected-routerboot" typ="enum (disabled | enabled)">
禁用通过串口控制台访问 RouterBOOT 配置，并防止 reset 按钮更改启动模式（Netinstall 被禁用）。只有使用具有管理权限的已知 RouterOS 用户账户才能访问 RouterOS。只能从 RouterOS 内部禁用该设置。如果丢失 RouterOS 密码，恢复需要按照 reset 按钮时序过程对设备进行完整格式化。
- **enabled** — 安全模式。只有使用有效的管理员级账户才能访问 RouterOS。串口输入被忽略，Etherboot 被禁用，并且无法更改 RouterBOOT 设置。
- **disabled** — 正常运行。可通过串口控制台访问 RouterBOOT 设置，并且可使用 reset 按钮进入 Netinstall 模式。
</ArgTableRow>
<ArgTableRow arg="reformat-hold-button" typ="time">
定义在上电时必须按住 reset 按钮以触发设备完整格式化的最短时间。按住时间必须长于该值，但短于 `reformat-hold-button-max`。触发后，设备会执行完整重置操作：
- RouterOS、所有文件和配置将被永久擦除（NAND 格式化）。
- 所有 RouterBOOT 设置将重置为默认值。
- 设备重启。
- 由于 NAND 启动失败，设备会自动进入 Etherboot。
- 需要使用 Netinstall 重新安装 RouterOS。

该操作极其危险。仅当所有其他访问方法均不可用时才使用它。在某些 RouterBOARD 设备上，格式化过程可能需要超过 5 分钟。格式化完成后，设备即可进行 Netinstall。
</ArgTableRow>
<ArgTableRow arg="reformat-hold-button-max" typ="time">
定义在触发格式化期间可按住 reset 按钮的最长时间。与 `reformat-hold-button` 配合使用，以创建精确的时间窗口。  
例如，设置 `reformat-hold-button=60s` 和 `reformat-hold-button-max=65s` 时，必须严格在 60 到 65 秒之间按住按钮。这通过使意外或猜测的重置几乎不可能发生来提高安全性。自 RouterBOOT 3.38.3 起引入。
</ArgTableRow>
</ArgTable>
