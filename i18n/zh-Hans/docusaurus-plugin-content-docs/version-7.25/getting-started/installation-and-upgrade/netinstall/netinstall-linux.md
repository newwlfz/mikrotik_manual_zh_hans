---
title: "Linux 版 Netinstall"
description: "本页介绍 netinstall-cli，即 MikroTik Netinstall 工具的 Linux 命令行版本，涵盖单台和多台设备重新安装的所有命令行选项、脚本和配置标志、网络选项以及分步安装示例。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall/netinstall-linux
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Netinstall 的 Linux 版本 `netinstall-cli` 是一个命令行工具，提供与 Windows 版本几乎相同的功能。

:::tip
运行 netinstall 工具前，请确保已在计算机的接口上设置静态 IP 地址。

```bash
sudo ip addr add 192.168.88.2/24 dev <interface>
sudo ip link set <interface> up
```
:::

:::info
此工具需要 root 权限。必须以 root 身份运行，或使用 `sudo` 执行。
:::

## netinstall-cli 命令行选项 {#netinstall-cli-command-line-options}

`netinstall-cli` 命令语法如下：

```
netinstall-cli [-r] [-e] [-b] [-m [-o]] [-f] [-c] [-v] [--reboot] [--shutdown] [-k <keyfile>] [-s <userscript>] [-sm <modescript>] [--mac <mac address>] {-i <interface> | -a <client-ip>} [PACKAGE]+ 
```

## 常规选项 {#general-options}

| 参数 | 说明 |
| :-- | :-- |
| **-r** | 重新安装设备并应用默认配置脚本。 |
| **-e** | 重新安装设备，但不应用默认配置脚本，使设备保持空配置。 |
| **-b** | 丢弃设备上当前安装的 branding 包。如果未指定，则保留 branding 包。出厂预装的 branding 包无法丢弃，始终会保留。 |
| **-f** | 忽略存储空间大小限制。默认情况下，netinstall-cli 会检查路由器的存储容量。如果所选包的总大小超过可用存储空间，将显示错误：**“Ignoring XX:XX:XX:XX:XX:XX, not enough space (override with -f)”** |
| **-c** | 允许在同一台计算机上同时运行多个 Netinstall 实例。 |
| **-v** | 启用详细模式以输出详细信息。 |

### 多设备重新安装选项 {#multiple-device-reinstallation-options}

| 参数 | 说明 |
| :-- | :-- |
| **-m** | 启用多设备重新安装。每收到一次 BOOTP 请求，就会重新安装同一设备一次。 |
| **-o** | 将安装限制为每次 Netinstall 运行仅执行一次。工具会记录已成功安装设备的 MAC 地址，并在当前会话中忽略来自同一 MAC 地址的后续 BOOTP 请求。 |

**组合行为：**

- 未指定 `-m` 和 `-o`：仅执行一次成功安装，随后 Netinstall 关闭。
- 仅指定 `-m`：启用多次重新安装；同一设备会反复重新安装。
- 仅指定 `-o`：与未指定标志相同；每次运行安装一次，随后关闭。
- 同时指定 `-m` 和 `-o`：启用多次重新安装，但每台设备在每个会话中仅安装一次。

### 脚本和配置选项 {#script-and-configuration-options}

| 参数 | 说明 |
| :-- | :-- |
| **--reboot** | 重启以 Netinstall 模式启动的所选 MikroTik 设备。 |
| **--shutdown** | 关闭以 Netinstall 模式启动的所选 MikroTik 设备。 |
| **-k \<keyfile>** | 向设备提供 .KEY 格式的许可证密钥文件（可选）。 |
| **-s \<userscript>** | 允许在安装期间在设备上安装自定义默认配置脚本。该脚本会替换 RouterOS 提供的默认配置脚本。请参阅 `/system/default-configuration/custom-script/print`。该脚本在 RouterOS 更新期间会保留，并在后续配置重置后使用，直到使用新脚本重新安装设备或移除该脚本。 |
| **-sm \<modescript>** | 指定在安装后设备首次启动时运行的一次性自定义脚本。使用该脚本可在设备部署期间配置 **device‑mode**、**protected‑routerboot** 和其他设置。模式脚本会在任何自定义或默认配置脚本之前执行。完成后，该脚本会自动从设备中移除。如果脚本修改了 device-mode，设备会在执行后立即重启。**此功能需要 RouterOS 和 Netinstall 7.22 或更高版本。** |

### 网络选项 {#network-options}

| 参数 | 说明 |
| :-- | :-- |
| **--mac \<mac address>** | 指定允许安装的 MAC 地址。指定后，所有其他 BOOTP 请求都会被忽略。 |
| **-i \<interface>** | 指定用于安装的网络接口（可选，建议指定）。 |
| **-a \<client-ip>** | 指定 Netinstall 服务器分配给设备的特定 IP 地址。除非使用 `-i` 参数（允许自动分配），否则该参数为必填。 |

### 软件包选择 {#package-selection}

| 参数 | 说明 |
| :-- | :-- |
| **PACKAGES** | 指定要安装到设备上的 .NPK 格式 RouterOS 软件包列表。该参数为必填。**system package** 必须列在首位。 |

:::warning
**配置保留行为：**

当未指定 `-r` 或 `-e` 时，netinstall-cli 会重新安装 RouterOS，同时保留当前配置。它会从路由器下载现有配置数据库，在重新安装期间重新格式化磁盘，然后将配置上传回设备。这等同于 Netinstall GUI 中的 **“Keep old configuration”** 选项。

注意：此过程仅适用于配置本身。User Manager 数据库、Dude 数据库以及单独存储的其他数据等文件和数据库不会被保留。
:::

## Linux Netinstall 示例 {#linux-netinstall-example}

从 [MikroTik Download Page](https://mikrotik.com/download) 下载该工具：

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
需要其他安装方法？请参阅 [**Windows**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-windows) 或 [**Netinstall Package**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-package) 说明。
:::
