---
sidebar_key: "getting-started/installation-and-upgrade/netinstall/netinstall-windows"
sidebar_position: 1
title: "Windows 版 Netinstall"
sidebar_label: "Windows 版 Netinstall"
description: "本页介绍如何在 Windows 上使用 Netinstall 工具在 MikroTik 设备上安装或重新安装 RouterOS，涵盖前提条件、使用静态 IP 进行网络准备、以 Etherboot 模式启动设备、安装参数以及安装后步骤。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall/netinstall-windows
captured_at: '2026-11-04T11:17:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南介绍如何在 Windows 计算机上使用 Netinstall 实用程序在 MikroTik 设备上安装 RouterOS。

## 先决条件 {#prerequisites}

:::tip
在运行 Netinstall 工具之前，请确保已在计算机的接口上设置静态 IP 地址。
:::

- 从[下载页面](https://mikrotik.com/download)下载 **Netinstall** 实用程序（Stable、Testing 或 Development 版本）。
- 从[下载页面](https://mikrotik.com/download)下载 RouterOS **System Package**，以及你需要或特定设备必须使用的所有额外软件包（例如 wireless、wifi-qcom、container 等）。

:::tip
选择标记为 **LongTerm** 或 **Stable** 的 RouterOS 版本。选择适当的架构（ARM64、ARM、MIPSBE、TILE 等）。如果不确定，请下载适用于所有架构的 RouterOS 软件包——Netinstall 会自动为你的设备选择正确的软件包。
:::

该工具要求目标设备以 BOOTP 模式启动，才能被检测和访问。

### 可用操作与参数 {#available-actions-and-parameters}

| 控件/操作 | 说明 |
| :-- | :-- |
| **Net booting** | 启用、禁用并配置 Netinstall 内置 BOOTP 和 TFTP 服务器的 IP 寻址。这是使用 Netinstall 客户端对 MikroTik 设备进行网络启动所必需的。 |
| **Shutdown** | 关闭已启动到 Netinstall 模式的所选 MikroTik 设备。 |
| **Reboot** | 重启已启动到 Netinstall 模式的所选 MikroTik 设备。 |
| **Install** | 使用指定选项在所选 MikroTik 设备上执行 RouterOS 安装。 |
| **Cancel** | 取消当前正在进行的安装。 |
| **Routers/Drives** | 显示可用于安装的设备。设备只有在以 Netinstall 模式启动后才会出现在此列表中。 |
| **Packages** | 允许选择包含 RouterOS 软件包文件的目录，并创建软件包集以供后续安装使用。 |

### Netinstall 参数 {#netinstall-parameters}

| 参数 | 说明 |
| :-- | :-- |
| **Auto Reboot** | 定义设备安装成功完成后执行的操作。 |
| **Software ID** | 显示当前设备的 Software ID。 |
| **Key** | 允许在安装期间指定并安装新的许可证密钥。默认情况下，Netinstall 会保留从设备检测到的许可证密钥。 |
| **Keep Old Configuration** | 指示 Netinstall 在安装后读取并恢复设备核心配置（/export; /users）。此选项不会保留用户文件、容器或类似数据。 |
| **Keep Branding** | 指示 Netinstall 保留设备上的 branding 软件包（如果存在）。出厂安装的 branding 软件包无法丢弃，并且始终会被保留。 |
| **Apply Default Config** | 如果启用，设备将在安装并重启后应用默认配置脚本。参见 `/system/default-configuration/script/print`。 |
| **Configure Script** | 允许在安装期间在设备上安装自定义默认配置脚本。这会替换 RouterOS 提供的默认配置脚本。参见 `/system/default-configuration/custom-script/print`。该脚本会在 RouterOS 更新期间保留，并在后续配置重置后使用，直到使用新脚本重新安装设备或删除该脚本。从 RouterOS 7.10beta8 开始，该脚本可以使用只读变量 `$defconfPassword` 和 `$defconfWifiPassword` 访问出厂设置的密码。 |
| **Mode Script** | 指定一个一次性自定义脚本，该脚本在安装后设备首次启动时运行。使用此脚本可在设备部署期间配置 **device‑mode**、**protected‑routerboot** 和其他设置。mode 脚本会在任何自定义或默认配置脚本之前执行。完成后，脚本会自动从设备中删除。如果脚本修改了 device-mode，设备会在执行后立即重启。**此功能需要 RouterOS 和 Netinstall 7.22 或更新版本。** |
| **IP Address / Gateway / Baudrate** | Netinstall 会自动创建一个包含指定参数的 Configure 脚本，用于通过 IPv4 连接或串行控制台进行初始设备配置。此参数仅在安装到空配置（即未指定其他配置选项）时可用。 |

>Configure 和 Mode 脚本是[常规/导入文件](../../configuration-management/index.md#configuration-export-and-import)，接受有效的 MikroTik RouterOS CLI 命令。

## 准备计算机网络 {#prepare-your-computer-network}

1. 禁用计算机上的所有网络接口（WiFi、Ethernet、LTE 或任何其他连接），但用于安装的 Ethernet 接口除外。Netinstall 仅在一个活动接口下工作。
    :::warning
    强烈建议停用所有其他网络接口，以确保 Netinstall 选择正确的网络接口。
    :::

2. 为你的 Ethernet 接口配置静态 IP 地址：

    - 打开 **Start** 并选择 **Settings**。

    ![](/img/e177e8b51de21f60.png)

    - 转到 **Network & Internet** 并选择 **Change adapter options**。

    ![](/img/41f294009d807abb.png)
    ![](/img/a45897907aee8b35.png)

    - 右键单击你的 **Ethernet** 接口，然后选择 **Properties**。

    ![](/img/8f42bc4977e9dc89.png)

    - 选择 **Internet Protocol Version 4 (TCP/IPv4)**，然后单击 **Properties**。

    ![](/img/fb1a3c22a8a034d2.png)

    - 勾选 **Use the following IP address** 并配置：IP 地址 `192.168.88.1`，子网掩码 `255.255.255.0`。

    ![](/img/0c4b10ebe6db913b.png)

:::tip
Netinstall 也可以在本地网络上运行。在这种情况下，你可以跳过设置静态 IP 地址，但如果你不熟悉 Netinstall，强烈建议设置静态 IP 地址。
:::

## 启动 Netinstall {#start-netinstall}

1. 将 Netinstall `.zip` 文件解压到方便的位置。

   ![](/img/baa819290ebdda2c.png)
   ![](/img/dad9c0e9fbc429ef.png)

2. 确保你的 Ethernet 接口已连接，然后启动 `Netinstall.exe`。
   :::danger
   Netinstall 需要管理员权限。请接受权限提示，以便 Netinstall 正常工作。

   **提示：** 如果你严格按照本指南操作，你的计算机应该没有 Internet 连接。Windows 10 可能会显示有关验证应用的警告——单击 **Run** 继续。
   :::

3. 出现提示时，允许 Netinstall 访问 **Public** 网络。

   ![](/img/868d42c748b371f1.png)

4. 配置 **Net booting** 设置：
   - 设置 **Client IP** 地址（必须唯一，且未被网络中的任何其他设备使用，包括你的计算机）。
   - 使用与计算机静态 IP 处于同一子网，但不同于计算机地址的 IP 地址。

   ![](/img/3cb60e47476f22b8.png)

## 连接设备 {#connect-the-device}

1. 使用以太网线将设备直接连接到计算机（中间不要有其他设备）。
2. 将以太网线插入设备的 **Ether1** 端口或标有 **BOOT** 的端口。
   :::danger
   某些计算机（尤其是 USB 以太网适配器）可能会产生额外的链路抖动，导致 Netinstall 无法检测到处于 Etherboot 模式的设备。如果发生这种情况，请在设备和计算机之间使用交换机，或使用处于桥接模式的 RouterOS 路由器。如果使用桥接模式的路由器，请禁用桥接接口上的任何 DHCP 客户端，并禁用 [检测互联网](../../../diagnostics-monitoring-and-troubleshooting/detect-internet.md) 功能。

   Netinstall 使用 BOOTP 数据包，这些数据包使用与 DHCP 数据包相同的端口号。如果使用交换机，请确保桥接端口未被其他网络设备阻塞。如果启用了 DHCP snooping，请在面向 Netinstall PC 的桥接端口上启用 "trusted"。
   :::

3. 给设备上电，并将其置于 Etherboot 模式。

## 安装 RouterOS {#install-routeros}

1. 等待设备出现在 Netinstall 中。

2. 选择设备并单击 **Browse**。导航到 RouterOS 软件包所在位置，然后按 **OK**。

   ![](/img/cdce5835cc961661.png)

3. **"Keep old configuration"** 过程会从路由器下载配置数据库，重新安装路由器（包括格式化磁盘），然后将配置上传回去。此过程仅适用于配置本身，不会影响文件，包括 User Manager 数据库、Dude 数据库等数据库。

   ![](/img/3c8668518faad329.png)

4. **"Keep branding"** 选项允许你保留设备上已安装的 branding 软件包，而无需使用 Netinstall 重新安装它。

   ![](/img/a9503edb1445efa4.png)

   :::tip
   使用 **Configure script** 选项时，建议在执行配置之前引入[延迟](../../configuration-management/index.md#startup-delay)。
   :::

5. 选择所需的 RouterOS 软件包，然后按 **Install**。

   ![](/img/0965aedf27576b5a.png)

6. 等待安装完成。根据 Netinstall 版本和设备的不同，可能需要手动重启。

   ![](/img/d57d515d46955d0e.png)
   :::warning
   如果你下载了适用于多个架构的 RouterOS 软件包，Netinstall 只会在选择设备后显示适合该设备的架构软件包。不受支持的软件包不会出现在窗口中。

   如果安装没有开始（进度条不移动或未显示状态），请尝试关闭并重新打开 Netinstall，或再次将设备置于 Etherboot 模式。如果问题仍然存在，请尝试在其他计算机上使用 Netinstall。
   :::

## 安装后 {#post-installation}

使用 Netinstall 后，设备会重置为默认设置（除非你指定不应用默认配置或 Keep old configuration）。出于安全原因，某些设备在使用默认配置时无法通过 **Ether1** 端口访问。有关详细信息，请参阅[默认配置](../../configuration-management/default-configurations.md)。

## 完成设置 {#complete-setup}

你的设备现已准备就绪。根据需要配置设备，并将其重新连接到网络。

[首次配置](../../first-time-configuration.md)

:::tip
正在寻找其他安装方法？请参阅 [**Linux**](./netinstall-linux.md) 或 [Netinstall 安装包](./netinstall-package.md) 说明。
:::
