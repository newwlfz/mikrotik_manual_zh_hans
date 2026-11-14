---
sidebar_key: "getting-started/installation-and-upgrade/netinstall/netinstall-linux"
sidebar_position: 2
title: "Linux 版 Netinstall"
sidebar_label: "Linux 版 Netinstall"
description: "本页介绍 netinstall-cli，这是 MikroTik Netinstall 实用工具的 Linux 命令行版本，涵盖用于单台和多台设备重装的所有命令行选项、脚本和配置标志、网络选项，以及一个分步安装示例。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-linux
captured_at: '2026-11-04T11:28:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Netinstall 的 Linux 版本 `netinstall-cli` 是一个命令行工具，提供的功能与 Windows 版本几乎相同。

:::tip
在运行 netinstall 工具之前，请确保已在计算机的接口上设置静态 IP 地址。

```bash
sudo ip addr add 192.168.88.2/24 dev <interface>
sudo ip link set <interface> up
```
:::

:::info
此工具需要 root 权限。必须以 root 身份运行，或使用 `sudo` 执行。
:::

## netinstall-cli 命令行选项 {#netinstall-cli-command-line-options}

`netinstall-cli` 命令语法为：

```
netinstall-cli [-r] [-e] [-b] [-m [-o]] [-f] [-c] [-v] [--reboot] [--shutdown] [-k <keyfile>] [-s <userscript>] [-sm <modescript>] [--mac <mac address>] {-i <interface> | -a <client-ip>} [PACKAGE]+ 
```

## 通用选项 {#general-options}

| 参数 | 描述 |
| :-- | :-- |
| **-r** | 重新安装设备并应用默认配置脚本。 |
| **-e** | 重新安装设备但不应用默认配置脚本，使设备保留空配置。 |
| **-b** | 丢弃设备上当前安装的品牌包。如果未指定，则保留品牌包。出厂安装的品牌包无法丢弃，且始终会保留。 |
| **-f** | 忽略存储大小限制。默认情况下，netinstall-cli 会检查路由器的存储容量。如果所选软件包的总大小超过可用存储空间，则会显示错误：**"Ignoring XX:XX:XX:XX:XX:XX, not enough space (override with -f)"** |
| **-c** | 允许同一台计算机上同时运行多个 Netinstall 实例。 |
| **-v** | 启用详细模式以输出详细信息。 |

### 多设备重装选项 {#multiple-device-reinstallation-options}

| 参数 | 描述 |
| :-- | :-- |
| **-m** | 启用多设备重装。同一设备将按照收到的 BOOTP 请求次数重复重装。 |
| **-o** | 将安装限制为每次 Netinstall 运行仅一次。该工具会跟踪成功安装设备的 MAC 地址，并在当前会话期间忽略来自同一 MAC 地址的后续 BOOTP 请求。 |

**组合行为：**

- 未指定 `-m` 且未指定 `-o`：仅进行一次成功安装，然后 Netinstall 关闭。
- 仅指定 `-m`：启用多次重装；同一设备会重复重装。
- 仅指定 `-o`：与未指定标志相同；每次运行仅一次安装，然后关闭。
- 同时指定 `-m` 和 `-o`：启用多次重装，但每个设备在每个会话中仅安装一次。

### 脚本和配置选项 {#script-and-configuration-options}

| 参数 | 描述 |
| :-- | :-- |
| **--reboot** | 重启已引导进入 Netinstall 模式的所选 MikroTik 设备。 |
| **--shutdown** | 关闭已引导进入 Netinstall 模式的所选 MikroTik 设备。 |
| **-k \<keyfile>** | 向设备提供 .KEY 格式的许可证密钥文件（可选）。 |
| **-s \<userscript>** | 允许在安装期间向设备安装自定义默认配置脚本。这会替换 RouterOS 提供的默认配置脚本。请参阅 `/system/default-configuration/custom-script/print`。该脚本在 RouterOS 更新期间会保留，并在后续配置重置后使用，直到设备使用新脚本重新安装或该脚本被移除。 |
| **-sm \<modescript>** | 指定在设备安装后首次启动时执行的一次性自定义脚本。可使用此脚本配置 device-mode、protected-routerboot 和其他部署设置。模式脚本会在任何自定义或默认配置脚本之前运行，并在执行后自动移除。如果该脚本修改了 device-mode，设备会立即重启。**需要 RouterOS 和 Netinstall 版本 7.22 或更高版本。** |

### 网络选项 {#network-options}

| 参数 | 描述 |
| :-- | :-- |
| **--mac \<mac address>** | 指定允许安装的 MAC 地址。指定后，将忽略所有其他 BOOTP 请求。 |
| **-i \<interface>** | 指定用于安装的网络接口（可选，推荐）。 |
| **-a \<client-ip>** | 指定 Netinstall 服务器分配给设备的特定 IP 地址。除非使用 `-i` 参数（允许自动分配），否则此项为必填。 |

### 软件包选择 {#package-selection}

| 参数 | 描述 |
| :-- | :-- |
| **PACKAGES** | 指定要以 .NPK 格式安装到设备上的 RouterOS 软件包列表。此参数为必填项。**system package** 必须列在首位。 |

:::warning
**配置保留行为：**

当未指定 `-r` 也未指定 `-e` 时，netinstall-cli 会在保留当前配置的情况下重新安装 RouterOS。它会从路由器下载现有配置数据库，在重装期间重新格式化磁盘，然后将配置上传回设备。这与 Netinstall GUI 中的 **“保留旧配置”** 选项一致。

注意：此过程仅适用于配置本身。User Manager 数据库、Dude 数据库等单独存储的文件和数据库以及其他数据不会被保留。
:::

## Linux Netinstall 示例 {#linux-netinstall-example}

从 [MikroTik 下载页面](https://mikrotik.com/download) 下载该工具：

```bash
wget https://download.mikrotik.com/routeros/[VERSION]/netinstall-[VERSION].tar.gz
```

解压归档文件：

```bash
tar -xzf netinstall-[VERSION].tar.gz
```

配置网络接口（将 eth0 替换为你的接口名称）：

```bash
sudo ip link set eth0 down
sudo ip addr add 192.168.88.2/24 dev eth0
sudo ip link set eth0 up
```

运行安装。该工具需要 root 权限，请使用 sudo：

```bash
sudo ./netinstall-cli [-parameters] [address/interface] routeros-[architecture]-[package VERSION].npk
```

```bash
sudo ./netinstall-cli -i eth0 -v -e  routeros-7.23.1-arm64.npk wifi-qcom-7.23.1-arm64.npk container-7.23.1-arm64.npk 
Version: 7.24beta1(2026-05-26 11:17:51)
Will apply empty config
Waiting for Link-UP on eth0
Using client IP 192.168.88.3
Waiting for RouterBOARD...
Received a BOOTP request from 01:23:45:67:89:AA (arm64)
Assigned 192.168.88.3 to 01:23:45:67:89:AA
blksize 1452
Booting device 01:23:45:67:89:AA into setup mode
Formatting device 01:23:45:67:89:AA
Sending packages to device 01:23:45:67:89:AA
Packages sent to device 01:23:45:67:89:AA
Rebooting device 01:23:45:67:89:AA
Successfully finished installing device 01:23:45:67:89:AA
```

:::tip
想了解其他安装方法？请参阅 [**Windows**](./netinstall-windows.md) 或 [Netinstall 安装包](./netinstall-package.md) 说明。
:::
