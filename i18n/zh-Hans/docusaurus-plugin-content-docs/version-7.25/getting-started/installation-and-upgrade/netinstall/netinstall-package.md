---
sidebar_key: "getting-started/installation-and-upgrade/netinstall/netinstall-package"
sidebar_position: 3
title: "Netinstall 安装包"
sidebar_label: "Netinstall 安装包"
description: "本页介绍 RouterOS Netinstall 软件包，它允许从另一台运行 RouterOS 7.24beta1 或更新版本的路由器远程在 MikroTik 设备上重新安装 RouterOS，内容涵盖先决条件、/tool/netinstall 菜单和参数、缓存，以及一个 Preboot Etherboot 恢复用例。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall/netinstall-package
captured_at: '2026-11-04T11:16:32+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**Netinstall 软件包**是一个额外软件包，适用于从 7.24beta1 版本开始运行 RouterOS 的所有设备，并适用于除 SMIPS 之外的所有架构。

此软件包允许从另一台运行 RouterOS 的 MikroTik 设备远程重新安装 RouterOS。

## 先决条件 {#prerequisites}

- RouterOS 版本 7.24beta1 及更高版本。
- Netinstall 软件包已启用。
- 目标 MikroTik 硬件路由器连接到与正在重新安装的设备相同的 L2 网段。

:::warning
默认情况下，**Netinstall 软件包**会在根目录中创建 `NetinstallCache` 目录。在有 `flash` 目录的设备上，Netinstall 相关文件存储在 RAM 中。在没有 `flash` 目录的设备上，这些文件存储在设备的持久性存储中。

确保 **Netinstall** 服务器设备有足够的可用存储空间或 RAM。

你也可以在 **Netinstall → Settings** 中配置外部存储设备，将其用作 `NetinstallCache/` 目录。
:::

> 从 `Files` 菜单中实际删除的文件，如果当前已缓存，将会自动重新下载。要删除缓存文件，请从 `Netinstall Cache` 菜单中移除它们。
> 如果文件在设备重启之前已下载，它们将被删除。

## 安装流程 {#installation-workflow}

1. 安装并启用 Netinstall 软件包。**Netinstall 软件包**可用于 WinBox、WebFig GUI 和 CLI，位于 **Tools** 菜单下，或在 CLI 中使用 `/tools/netinstall`。

2. 配置 Netinstall 接口。添加新的 **Netinstall** 接口，设置所需参数，并让连接到该接口的设备以 BOOTP 模式启动。

3. 下载或选择所需的 RouterOS 软件包。**Netinstall 软件包**会自动为目标设备架构安装适当的 **System** 软件包。

4. 将目标设备启动到 Etherboot 模式。

5. 安装 RouterOS。

:::tip
如果未设置 **Version** 参数，**Netinstall 软件包**将安装当前在 **Netinstall 服务器**上所选的 `Check for Updates` 通道中可用的最新 RouterOS 版本。
:::

必须显式选择额外软件包。

## 通用配置选项 {#general-configuration-options}

| 参数 | 描述 |
| :-- | :-- |
| **Settings** | 允许设置 `NetinstallCache/` 路径目录。参见[先决条件警告信息](#prerequisites)。示例：`/tool/netinstall/settings/set cache-directory=...` |

## Netinstall 参数 {#netinstall-parameters}

| 参数 | 描述 |
| :-- | :-- |
| **allow-etherboot** (yes / no ; 默认: **yes**) |  允许所选接口上的 BOOTP 请求。如果设置为 no，将忽略该设备。  |
| **allow-flashfig** (yes / no ; 默认: **yes**) |  启用 [FlashFig](../../../management-tools/flashfig.md) 功能 |
| **apply-default-configuration** (yes / no ; 默认: **no**) | 如果启用，设备将在安装和重启后应用默认配置脚本。请参阅 `/system/default-configuration/script/print`。 |
| **auto-reboot** (none / reboot / shutdown ; 默认: **reboot**) | 定义设备安装成功完成后执行的操作。 |
| **etherboot-image** | 允许选择要安装的先前缓存的软件包。 |
| **etherboot-image-arch** |  指定 etherboot 映像所需的 CPU 架构。所有其他架构请求将被忽略。如果未指定，将使用检测到的架构。 |
| **extra-packages** | 允许添加要随 `system` 软件包一起安装的额外软件包。默认将安装 `routeros` 软件包。 |
| **install-once** (yes / no ; 默认: **yes**) | 将安装限制为每次 Netinstall 运行一次。该工具会跟踪成功安装设备的 **MAC 地址**，并在当前会话期间忽略来自同一 **MAC 地址**的后续 **BOOTP** 请求。 |
| **interface** | 指定 **Netinstall 服务器**的网络接口。 |
| **ip-range** | 自定义用于 Netinstall 过程的 **BOOTP** IP 范围。 |
| **keep-old-configuration** (yes / no ; 默认: **yes**) | 指示 Netinstall 在安装后读取并恢复设备核心配置（/export；/users）。此选项不会保留用户文件、容器或类似数据。 |
| **mac-address** | 指定允许安装的 MAC 地址。提供后，所有其他 BOOTP 请求将被忽略。 |
| **mode-file** | 类似于 `Mode script`。指定在安装后设备首次启动时运行的一次性自定义脚本。使用此脚本在设备部署期间配置 **device‑mode**、**protected‑routerboot** 和其他设置。模式脚本会在任何自定义或默认配置脚本之前执行。完成后，脚本会自动从设备中删除。如果脚本修改了 device-mode，设备将在执行后立即重启。**此功能需要 RouterOS 和 Netinstall 7.22 或更高版本。** |
| **place-before** | 将规则插入到现有规则之前 |
| **remove-branding** (yes / no ; 默认: **no**) | 从设备中丢弃当前安装的品牌化软件包。如果未指定，则保留品牌化软件包。出厂安装的品牌化软件包无法丢弃，并且始终保留。 |
| **script-file** | 允许在安装期间在设备上安装自定义默认配置脚本。这会替换 RouterOS 提供的默认配置脚本。请参阅 `/system/default-configuration/custom-script/print`。该脚本在 RouterOS 更新期间会保留，并在后续配置重置后使用，直到设备使用新脚本重新安装或该脚本被删除。 |
| **version** | 指定要安装的 RouterOS 版本。如果未设置 **Version** 参数，**Netinstall** 会安装 **Netinstall 服务器**上当前所选 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |
| **wait** (yes / no ; 默认: **no**) | 使设备保持 etherboot 状态，并等待用户命令开始安装。 |

## 缓存 {#cache}

可用操作：GUI 和 CLI 均为 `Add`。

| 参数 | 描述 |
| :-- | :-- |
| **arch** | 必填参数。指定要下载的必要文件的 CPU 架构。 |
| **packages** | 允许添加要下载到 `NetinstallCache/` 目录的额外软件包列表。 |
| **version** | 指定要下载的 RouterOS 版本软件包。如果未设置 **Version** 参数，**Netinstall** 将下载当前在 **Netinstall 服务器**上所选的 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |

## 设备 {#devices}

**Netinstall Devices** 菜单显示已通过 Netinstall 安装的设备列表及其状态。

可用操作：

- 使用 `Clear` 清空列表。
- `Install` 菜单。如果通过 `Install` 菜单选择了额外参数，则所有先前设置的设置都将被覆盖。

可用的 `install` 参数：`auto-reboot`、`extra-packages`、`numbers`、`version`。

```bash
/tool/netinstall/devices> install auto-reboot=reboot extra-packages=user-manager version=7.24beta1
```

| 参数 | 描述 |
| :-- | :-- |
| **auto-reboot**（none / reboot / shutdown；默认：**reboot**） | 定义设备安装成功完成后执行的操作。 |
| **extra-packages** | 允许添加要与 `system` 软件包一起安装的额外软件包。默认将安装 `routeros` 软件包。 |
| **numbers** | 允许选择列表中的哪些设备要重新安装 RouterOS。 |
| **version** | 指定要下载的 RouterOS 版本软件包。如果未设置 **Version** 参数，**Netinstall** 将安装为接口主设置选择的 **version**；如果未指定，则下载当前在 **Netinstall 服务器**上所选的 `Check for Updates` 通道中可用的最新 RouterOS 版本。 |

## 使用案例 {#use-cases}

**Netinstall 软件包**可用于 [Preboot Etherboot](../../../hardware/routerboard.md#preboot-etherboot) 中，适用于其中一台已安装 Netinstall 软件包的 MikroTik 路由器专用于远程恢复目的的场景。
设置 Netinstall 服务器的 `preboot-etherboot-server=ip_address`，并在目标设备出现任何问题时远程重装 RouterOS。
使用 `preboot-etherboot-server` 时，在 Netinstall 服务器上配置适当的 **IP 范围**以处理 Etherboot 请求。

:::danger
请记住禁用或严格过滤所创建的规则，以免在每次重启时无意中重新安装系统。
:::

### Netinstall 软件包示例 {#netinstall-package-example}

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

安装后检查设备状态：

```bash
[admin@MikroTik] /tool/netinstall/devices/print 
Flags: N - NETINSTALL
Columns: MAC-ADDRESS, INTERFACE, STATE, LAST-STATE-UPDATE, EXTRA-PACKAGES, VERSION, ARCH, MODEL, LAST-STATE, AUTO-REBOOT
#   MAC-ADDRESS        INTERFACE  STATE    LAST-STATE-UPDATE  EXTRA-PACKAGES  VERSION    ARCH   MODEL       LAST-STATE        AUTO-REBOOT
0 N 01:23:45:67:89:BB  bridge1    done     58s                container       7.23.1     arm64   L009UiGS   bootp reply sent  reboot     
                                                              wifi-qcom 
```

### Netinstall 软件包 FlashFig 示例 {#netinstall-package-flashfig-example}

Netinstall 软件包包含 FlashFig 功能，使批量配置过程简单得多。
常见设置使用带有桥接端口的 PoE 交换机。

:::warning
设置桥接 `protocol-mode=none` 或 `/interface/bridge/port set 0,1... edge=yes`。
:::

物理连接设置：

- 将 **Netinstall 服务器**（Router1、ether2）连接到 PoE 交换机上的一个端口。
- 将**目标设备**连接到同一 PoE 交换机上的另一个端口。

```bash
[admin@MikroTik] /tool/netinstall/devices/print 
Flags: F - FLASHFIG
Columns: MAC-ADDRESS, INTERFACE, STATE, LAST-STATE-UPDATE, MODEL, AUTO-REBOOT
#   MAC-ADDRESS        INTERFACE  STATE                  LAST-STATE-UPDATE  MODEL   AUTO-REBOOT
0 F 01:23:45:67:89:BB  ether2     done, won't reinstall  21s                952-hb  reboot 
```

:::tip
正在寻找其他安装方法？请参阅 [**Windows**](./netinstall-windows.md) 或 [**Linux**](./netinstall-linux.md) 的说明。
:::
