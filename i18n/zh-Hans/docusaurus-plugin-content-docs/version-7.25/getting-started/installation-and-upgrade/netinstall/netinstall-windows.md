---
title: "适用于 Windows 的 Netinstall"
description: "本页说明如何在 Windows 上使用 Netinstall 工具在 MikroTik 设备上安装或重新安装 RouterOS，包括前提条件、使用静态 IP 准备网络、以 Etherboot 模式启动设备、安装参数以及安装后的步骤。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall/netinstall-windows
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started/installation-and-upgrade/netinstall"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本指南说明如何使用 Windows 计算机上的 Netinstall 工具在 MikroTik 设备上安装 RouterOS。

## 前提条件 {#prerequisites}

:::tip
在运行 netinstall 工具之前，请确保已在计算机的接口上设置静态 IP 地址。
:::

- 从 [downloads](https://mikrotik.com/download) 页面下载 **Netinstall** 工具（Stable、Testing 或 Development 版本）。
- 从 [downloads](https://mikrotik.com/download) 页面下载 RouterOS **System Package**，以及特定设备上需要或必须使用的所有额外软件包（例如 wireless、wifi-qcom、container 等）。

:::tip
选择标记为 **LongTerm** 或 **Stable** 的 RouterOS 版本。选择合适的架构（ARM64、ARM、MIPSBE、TILE 等）。如果不确定，请下载所有架构的 RouterOS 软件包——Netinstall 会自动为设备选择正确的软件包。
:::

该工具要求目标设备以 BOOTP 模式启动，以便被检测和访问。

### 可用操作 and 参数 {#available-actions-and-parameters}

| 控制/操作 | 说明 |
| :-- | :-- |
| **Net booting** | 启用、禁用并配置 Netinstall 内置 BOOTP 和 TFTP 服务器的 IP 地址。使用 Netinstall 客户端对 MikroTik 设备进行网络启动时，必须启用该项。 |
| **Shutdown** | 关闭所选的以 Netinstall 模式启动的 MikroTik 设备。 |
| **Reboot** | 重启所选的以 Netinstall 模式启动的 MikroTik 设备。 |
| **Install** | 使用指定选项在所选 MikroTik 设备上安装 RouterOS。 |
| **Cancel** | 取消当前正在进行的安装。 |
| **Routers/Drives** | 显示可用于安装的设备。设备只有在以 Netinstall 模式启动后才会出现在此列表中。 |
| **Packages** | 允许选择包含 RouterOS 软件包文件的目录，并创建软件包集，以供后续安装使用。 |

### Netinstall 参数 {#netinstall-parameters}

| 参数 | 说明 |
| :-- | :-- |
| **Auto Reboot** | 定义设备安装成功完成后执行的操作。 |
| **Software ID** | 显示当前设备的 Software ID。 |
| **Key** | 允许在安装期间指定并安装新的许可证密钥。默认情况下，Netinstall 会保留从设备检测到的许可证密钥。 |
| **Keep Old Configuration** | 指示 Netinstall 在安装后读取并恢复设备核心配置（/export；/users）。该选项不会保留用户文件、容器或类似数据。 |
| **Keep Branding** | 指示 Netinstall 保留设备上存在的品牌包。<br/>出厂预装的品牌包无法丢弃，始终会保留。 |
| **Apply Default Config** | 启用后，设备将在安装并重启后应用默认配置脚本。请参阅 `/system/default-configuration/script/print`。 |
| **Configure Script** | 允许在安装期间在设备上安装自定义默认配置脚本。这将替换 RouterOS 提供的默认配置脚本。请参阅 `/system/default-configuration/custom-script/print`。该脚本会在 RouterOS 更新期间保留，并在后续配置重置后使用，直到设备重新安装新脚本或移除该脚本。从 RouterOS 7.10beta8 起，该脚本可通过只读变量 `$defconfPassword` 和 `$defconfWifiPassword` 访问出厂设置的密码。 |
| **Mode Script** | 指定在安装后设备首次启动时运行的一次性自定义脚本。使用该脚本可在设备部署期间配置 **device‑mode**、**protected‑routerboot** 和其他设置。Mode 脚本会在任何自定义或默认配置脚本之前执行。完成后，该脚本会自动从设备中移除。如果脚本修改了 device-mode，设备将在执行后立即重启。**此功能需要 RouterOS 和 Netinstall 7.22 或更高版本。** |
| **IP Address / Gateway / Baudrate** | Netinstall 会使用指定参数自动创建 Configure 脚本，用于通过 IPv4 连接或串口控制台进行初始设备配置。该参数仅在安装到空配置时可用，即未指定其他配置选项。 |

>Configure 和 Mode 脚本是 [regular/import 文件](/docs/7.24/getting-started/configuration-management#configuration-export-and-import)，接受有效的 MikroTik RouterOS CLI 命令。

## 准备计算机网络 {#prepare-your-computer-network}

1. 禁用计算机上除用于安装的以太网接口之外的所有网络接口（WiFi、Ethernet、LTE 或任何其他连接）。Netinstall 仅使用一个活动接口运行。
    :::warning
    强烈建议停用所有其他网络接口，以确保 Netinstall 选择正确的网络接口。
    :::

2. 为以太网接口配置静态 IP 地址：

    - 打开 **Start** 并选择 **Settings**。

    ![](/img/e177e8b51de21f60.png)

    - 前往 **Network & Internet**，选择 **Change adapter options**。

    ![](/img/41f294009d807abb.png)
    ![](/img/a45897907aee8b35.png)

    - 右键单击 **Ethernet** 接口，选择 **Properties**。

    ![](/img/8f42bc4977e9dc89.png)

    - 选择 **Internet Protocol Version 4 (TCP/IPv4)**，单击 **Properties**。

    ![](/img/fb1a3c22a8a034d2.png)

    - 勾选 **Use the following IP address**，并配置：IP 地址 `192.168.88.1`，子网掩码 `255.255.255.0`。

    ![](/img/0c4b10ebe6db913b.png)

:::tip
Netinstall 也可以在本地网络上运行。在这种情况下，可以跳过设置静态 IP 地址，但如果不熟悉 Netinstall，强烈建议设置静态 IP 地址。
:::

## 启动 Netinstall {#start-netinstall}

1. 将 Netinstall 的 `.zip` 文件解压到方便访问的位置。

   ![](/img/baa819290ebdda2c.png)
   ![](/img/dad9c0e9fbc429ef.png)

2. 确保 Ethernet 接口已连接，然后启动 `Netinstall.exe`。
   :::danger
   Netinstall 需要管理员权限。接受权限提示，Netinstall 才能正常工作。

   **提示：** 如果严格按本指南操作，计算机应没有互联网连接。Windows 10 可能显示有关验证应用的警告——点击 **Run** 继续。
   :::

3. 出现提示时，允许 Netinstall 访问 **Public** 网络。

   ![](/img/868d42c748b371f1.png)

4. 配置 **Net booting** 设置：
   - 设置 **Client IP** 地址（必须唯一，且未被网络中的任何其他设备使用，包括你的计算机）。
   - 使用与计算机静态 IP 位于同一子网的 IP 地址，但不要与计算机地址相同。

   ![](/img/3cb60e47476f22b8.png)

## 连接设备 {#connect-the-device}

1. 使用以太网线将设备直接连接到计算机（中间不要连接其他设备）。
2. 将以太网线插入设备的 **Ether1** 端口或标有 **BOOT** 的端口。
   :::danger
   某些计算机（尤其是 USB 以太网适配器）可能产生额外的链路抖动，导致 Netinstall 无法检测到处于 Etherboot 模式的设备。如果出现这种情况，请在设备和计算机之间使用交换机，或使用运行 RouterOS 的路由器并配置为网桥模式。如果使用网桥模式的路由器，请禁用网桥接口上的所有 DHCP 客户端，并禁用 [Detect Internet](/docs/7.24/diagnostics-monitoring-and-troubleshooting/detect-internet) 功能。

   Netinstall 使用 BOOTP 数据包，其端口号与 DHCP 数据包相同。如果使用交换机，请确保桥接端口未被其他网络设备阻塞。如果启用了 DHCP snooping，请在面向 Netinstall PC 的桥接端口上启用“trusted”。
   :::

3. 给设备上电，并使其进入 Etherboot 模式。

## 安装 RouterOS {#install-routeros}

1. 等待设备出现在 Netinstall 中。

2. 选择设备并点击 **Browse**。导航到 RouterOS 软件包所在位置，然后按 **OK**。

   ![](/img/cdce5835cc961661.png)

3. **“Keep old configuration”** 过程会从路由器下载配置数据库，重新安装路由器（包括磁盘格式化），再将配置上传回去。该过程仅作用于配置本身，不会影响文件，包括 User Manager database、Dude database 等数据库。

   ![](/img/3c8668518faad329.png)

4. **“Keep branding”** 选项可保留设备上已安装的 branding 软件包，而无需使用 Netinstall 重新安装它。

   ![](/img/a9503edb1445efa4.png)

   :::tip
   使用 **Configure script** 选项时，建议在配置执行前引入一段[延迟](/docs/7.24/getting-started/configuration-management#startup-delay)。
   :::

5. 选择所需的 RouterOS 软件包，然后按 **Install**。

   ![](/img/0965aedf27576b5a.png)

6. 等待安装完成。根据 Netinstall 版本和设备的不同，可能需要手动重启。

   ![](/img/d57d515d46955d0e.png)
   :::warning
   如果下载了适用于多种架构的 RouterOS 软件包，Netinstall 只会在选择设备后显示适用于该设备的架构软件包。不支持的软件包不会显示在窗口中。

   如果安装未开始（进度条不移动或未显示状态），请尝试关闭并重新打开 Netinstall，或将设备再次置于 Etherboot 模式。如果问题仍然存在，请尝试在其他计算机上使用 Netinstall。
   :::

## Post-Installation

使用 Netinstall 后，设备会重置为默认配置（除非指定不应用默认配置或 Keep old configuration）。出于安全原因，某些设备在使用默认配置时无法通过 **Ether1** 端口访问。详情请参阅 [Default configuration](/docs/7.24/getting-started/configuration-management/default-configurations)。

## 完成设置 {#complete-setup}

设备现已准备就绪。按需配置设备，并将其重新连接到网络。

[First Time Configuration](/docs/getting-started/first-time-configuration)

:::tip
需要其他安装方法？请参阅 [**Linux**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-linux) 或 [**Netinstall Package**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-package) 说明。
:::
