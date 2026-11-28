---
title: "Netinstall 软件包"
description: "本页介绍 RouterOS Netinstall 软件包，该软件包支持从运行 RouterOS 7.24beta1 或更高版本的另一台路由器远程在 MikroTik 设备上重新安装 RouterOS，内容涵盖前置条件、/tool/netinstall 菜单和参数、缓存，以及 Preboot Etherboot 恢复用例。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-package
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**Netinstall package** 是一个额外软件包，适用于所有运行 RouterOS 7.24beta1 及更高版本的设备，但不适用于 SMIPS 架构。

该软件包允许从另一台运行 RouterOS 的 MikroTik 设备远程重新安装 RouterOS。

## 前提条件 {#prerequisites}

- RouterOS 7.24beta1 及更高版本。
- 已启用 Netinstall package。
- 目标 MikroTik 硬件路由器与正在重新安装的设备连接到同一 L2 网络段。

:::warning
默认情况下，**Netinstall package** 会在根目录创建 `NetinstallCache` 目录。在具有 `flash` 目录的设备上，Netinstall 相关文件存储在 RAM 中。在没有 `flash` 目录的设备上，这些文件存储在设备的持久存储中。

确保 **Netinstall** 服务器设备有足够的可用存储空间或 RAM。

还可以在 **Netinstall → Settings** 中配置外部存储设备，用作 `NetinstallCache/` 目录。
:::

> 从 `Files` 菜单中物理删除的文件，如果当前已缓存，将自动重新下载。要删除缓存文件，请从 `Netinstall Cache` 菜单中移除它们。
> 如果文件是在设备重启之前下载的，它们将被删除。

## 安装流程 {#installation-workflow}

1. 安装并启用 Netinstall package。**Netinstall package** 可用于 WinBox、WebFig GUI 和 CLI，位于 **Tools** 菜单或 CLI 中的 `/tools/netinstall` 下。

2. 配置 Netinstall 接口。添加新的 **Netinstall** 接口，设置所需参数，并让连接到该接口的设备以 BOOTP 模式运行。

3. 下载或选择所需的 RouterOS 软件包。**Netinstall package** 会自动为目标设备架构安装相应的 **System** 软件包。

4. 将目标设备引导至 Etherboot 模式。

5. 安装 RouterOS。

:::tip
如果未设置 **Version** 参数，**Netinstall package** 会安装当前在 **Netinstall server** 上所选的 `Check for Updates` 通道中可用的最新 RouterOS 版本。
:::

必须显式选择其他软件包。

## 常规配置选项 {#general-configuration-options}

| 参数 | 说明 |
| :-- | :-- |
| **Settings** | 允许设置 `NetinstallCache/` 路径目录。请参阅 [Prerequisites warning information](#prerequisites)。示例：`/tool/netinstall/settings/set cache-directory=...` |

## Netinstall 参数 {#netinstall-parameters}

| 参数 | 说明 |
| :-- | :-- |
| **allow-etherboot** (yes / no ; Default: **yes**) |  允许在所选接口上接收 BOOTP 请求。设置为 no 时，将忽略设备。  |
| **allow-flashfig** (yes / no ; Default: **yes**) |  启用 [FlashFig](/docs/management-tools/flashfig) 功能 |
| **apply-default-configuration** (yes / no ; Default: **no**) | 启用后，设备将在安装并重启后应用默认配置脚本。请参阅 `/system/default-configuration/script/print`。 |
| **auto-reboot** (none / reboot / shutdown ; Default: **reboot**) | 定义设备安装成功完成后执行的操作。 |
| **etherboot-image** | 允许选择以前缓存的软件包进行安装。 |
| **etherboot-image-arch** |  指定 etherboot 镜像所需的 CPU 架构。所有其他架构请求都将被忽略。如果未指定，则使用检测到的架构。 |
| **extra-packages** | 允许添加与 `system` 软件包一起安装的额外软件包。默认会安装 `routeros` 软件包。 |
| **install-once** (yes / no ; Default: **yes**) | 将安装限制为每次 Netinstall 运行一次。该工具会跟踪已成功安装设备的 **MAC 地址**，并在当前会话期间忽略来自同一 **MAC 地址** 的后续 **BOOTP** 请求。 |
| **interface** | 指定 **Netinstall 服务器** 的网络接口。 |
| **ip-range** | 自定义用于 netinstall 过程的 **BOOTP** ip-range。 |
| **keep-old-configuration** (yes / no ; Default: **yes**) | 指示 Netinstall 在安装后读取并恢复设备核心配置（/export；/users）。此选项不会保留用户文件、容器或类似数据。 |
| **mac-address** | 指定允许安装的 MAC 地址。提供该参数时，所有其他 BOOTP 请求都将被忽略。 |
| **mode-file** | 类似于 `Mode script`。指定在安装后设备首次启动时运行的一次性自定义脚本。使用该脚本可在设备部署期间配置 device-mode、protected-routerboot 和其他设置。mode script 会在任何自定义或默认配置脚本之前执行。完成后，该脚本会自动从设备中移除。如果脚本修改了 device-mode，设备将在执行后立即重启。 |
| **place-before** | 在现有规则之前插入规则 |
| **remove-branding** (yes / no ; Default: **no**) | 从设备中丢弃当前安装的 branding 软件包。如果未指定，则保留 branding 软件包。出厂预装的 branding 软件包无法丢弃，始终会保留。 |
| **script-file** | 允许在安装期间在设备上安装自定义默认配置脚本。这将替换 RouterOS 提供的默认配置脚本。请参阅 `/system/default-configuration/custom-script/print`。该脚本会在 RouterOS 更新期间保留，并在后续配置重置后使用，直到设备使用新脚本重新安装或该脚本被移除。 |
| **version** | 指定要安装的 RouterOS 版本。如果未设置 **Version** 参数，**Netinstall** 将安装 **Netinstall 服务器** 当前所选 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |
| **wait** (yes / no ; Default: **no**) | 使设备保持 etherboot 状态，并等待用户命令开始安装。 |

## Cache

可用操作：GUI 和 CLI 均支持 `Add`。

| 参数 | 说明 |
| :-- | :-- |
| **arch** |  必填参数。指定要下载所需文件的 CPU 架构。 |
| **packages** | 允许将额外软件包列表下载到 `NetinstallCache/` 目录。 |
| **version** | 指定要下载的 RouterOS 版本软件包。如果未设置 **Version** 参数，**Netinstall** 将下载 **Netinstall 服务器** 当前所选 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |

## 设备 {#devices}

**Netinstall Devices** 菜单显示已执行 netinstall 的设备列表及其状态。

可用操作：

- 清除列表。
- `Install` 菜单。如果在 `Install` 菜单中选择了其他参数，则所有先前设置的设置都会被覆盖。

可用的 `install` 参数：`auto-reboot`、`extra-packages`、`numbers`、`version`。

```bash
/tool/netinstall/devices> install auto-reboot=reboot extra-packages=user-manager version=7.24beta1
```

| 参数 | 说明 |
| :-- | :-- |
| **auto-reboot**（none / reboot / shutdown；默认：**reboot**） | 定义设备成功完成安装后执行的操作。 |
| **extra-packages** | 允许添加与 `system` 软件包一起安装的额外软件包。`routeros` 软件包默认安装。 |
| **numbers** | 允许从列表中选择要重新安装 RouterOS 的设备。 |
| **version** | 指定要下载的 RouterOS 版本软件包。如果未设置 **Version** 参数，**Netinstall** 会安装为接口主设置选择的 **version**；如果未指定，则会下载当前在 **Netinstall server** 上所选 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |

## 使用场景 {#use-cases}

[Preboot Etherboot](/docs/hardware/routerboard#preboot-etherboot) 中可以使用 **Netinstall package**，适用于将某台安装了 Netinstall package 的 MikroTik 路由器专用于远程恢复的场景。
设置 Netinstall 服务器的 `preboot-etherboot-server=ip_address`，并在目标设备出现任何问题时远程重新安装 RouterOS。

:::danger
请记住禁用或严格过滤创建的规则，以免每次重启时意外重新安装系统。
:::

### Netinstall package 示例 {#netinstall-package-example}

```bash
[admin@MikroTik] /tool/netinstall/add interface=bridge1 keep-old-configuration=no apply-default-configuration=yes auto-reboot=reboot mac-address=01:23:45:67:89:BB extra-packages=wifi-qcom,container version=7.23.1 ip-range=192.168.88.10-192.168.88.20
```

验证缓存的软件包：

```bash
[admin@MikroTik] /tool/netinstall/cache/print 
Columns: PATH, URL, STATUS
#  PATH                                               URL                                                                                STATUS    
0  NetinstallCache/container-7.23.1-arm64.npk  https://upgrade.mikrotik.com/routeros/7.23.1/container-7.23.1-arm64.npk  downloaded
1  NetinstallCache/linux.arm64                 https://upgrade.mikrotik.com/routeros/7.23.1/netinstk/linux.arm64        downloaded
2  NetinstallCache/linux.arm64-uefi            https://upgrade.mikrotik.com/routeros/7.23.1/netinstk/linux.arm64-uefi   downloaded
3  NetinstallCache/wifi-qcom-7.23.1-arm64.npk  https://upgrade.mikrotik.com/routeros/7.23.1/wifi-qcom-7.23.1-arm64.npk  downloaded
```

检查安装后的设备状态：

```bash
[admin@MikroTik] /tool/netinstall/devices/print 
Flags: N - NETINSTALL
Columns: MAC-ADDRESS, INTERFACE, STATE, LAST-STATE-UPDATE, EXTRA-PACKAGES, VERSION, ARCH, MODEL, LAST-STATE, AUTO-REBOOT
#   MAC-ADDRESS        INTERFACE  STATE    LAST-STATE-UPDATE  EXTRA-PACKAGES  VERSION    ARCH   MODEL       LAST-STATE        AUTO-REBOOT
0 N 01:23:45:67:89:BB  bridge1    done     58s                container       7.23.1     arm64   L009UiGS   bootp reply sent  reboot     
                                                              wifi-qcom 
```

:::tip
需要其他安装方法？请参阅 [**Windows**](/docs/getting-started/installation-and-upgrade/netinstall/netinstall-windows) 或 [**Linux**](/docs/getting-started/installation-and-upgrade/netinstall/netinstall-linux) 说明。
:::
