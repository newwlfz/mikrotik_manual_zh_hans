---
sidebar_key: "management-tools/winbox"
sidebar_position: 2
title: "WinBox"
sidebar_label: "WinBox"
description: "WinBox v4 是一款原生跨平台 GUI 工具，用于在 Windows、Linux 和 macOS 上管理 MikroTik RouterOS。它以原生应用取代了基于 Wine 的旧版 WinBox v3，通过 AES128-CBC-SHA 加密和 ECSRP 认证提供安全连接。"
tags:
  - 'winbox'
  - 'management'
  - 'v4'
  - 'native'
source: https://manual.mikrotik.com/docs/management-tools/winbox
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

WinBox 是一款实用工具，可通过快速、简单的 GUI 管理 MikroTik RouterOS。WinBox v4 是原生应用程序，可用于 Windows、Linux 和 macOS——无需 Wine 或模拟器。所有 WinBox 界面功能都尽可能贴近控制台功能，因此手册中没有单独的 WinBox 章节。

WinBox 通过 TCP 端口 8291 连接到路由器的 `winbox` 服务。要将 WinBox 迁移到其他端口，请更改该服务的端口，然后在连接时将端口添加到地址中，例如 `192.168.88.1:9999`：

```ros
/ip/service/set winbox port=9999
```

要限制可连接的地址，请参阅 [服务](../system-information-and-utilities/services.md#limit-who-can-use-a-service)。

使用以下安全功能：

- WinBox 使用由 SIA Mikrotīkls (MikroTik) 颁发的扩展验证证书进行签名。
- WinBox 使用 ECSRP 进行密钥交换和身份验证。
- 双方都会验证对方知道密码（不可能发生中间人攻击）。
- WinBox 使用 AES128-CBC-SHA 作为加密算法。

:::info
WinBox v4 取代了基于 Windows 的旧版 WinBox v3。如果您仍在使用旧版本，请参阅 [WinBox v3（旧版）](./winbox-legacy.md) 页面。
:::

## 下载和安装 {#download-and-installation}

从 [MikroTik 下载页面](https://mikrotik.com/download/winbox) 下载 WinBox。

#### Windows {#windows}

1. 下载包含 `WinBox.exe` 的 ZIP 压缩包。
2. 将压缩包解压到你选择的文件夹。
3. 运行 `WinBox.exe`——无需安装。

#### Linux {#linux}

1. 下载包含 Linux 二进制文件的 ZIP 压缩包。
2. 将压缩包解压到你选择的文件夹。
3. 从终端或文件管理器运行该二进制文件。

#### macOS {#macos}

1. 下载 DMG 软件包。
2. 打开 `.dmg` 文件，并将 WinBox 拖到 Applications 文件夹。
3. 从 Applications 文件夹启动 WinBox。

:::warning
将 ZIP 压缩包内容解压到一个仅包含这些文件的自包含子文件夹中。这是自更新功能正常工作所必需的，并且适用于 Windows 和 Linux 版本的 WinBox。
:::

## 登录界面 {#login-interface}

本节介绍登录界面。这是启动 WinBox 应用程序后看到的第一个界面。你可以在此使用登录部分手动连接到 RouterOS 设备，或使用 **Saved** 选项卡中保存的凭据。为了更方便地发现在连接到运行 WinBox 的 PC 的 L2 网络中的设备，可以使用 **Neighbors** 选项卡。
登录界面（[参见图 1](#figure-1---login-interface)）可分为两个部分：

- **登录部分** - 左侧的部分，用于连接到 RouterOS。
- **设备列表部分** - 右侧的部分，包含已保存或已发现的设备，并可进一步分为三个选项卡。
  - **Saved** - 用户保存的设备。
  - **Neighbors** - 已发现的设备。
  - **RoMON** - 通过 RoMON 发现的设备。

上述部分未涵盖的元素可在[表 3](#table-3---miscellaneous-elements)中找到。

#### 图 1 - 登录界面 {#figure-1---login-interface}

![](/img/e5b14400c07856b6.webp)

### 登录部分 {#login-section}

登录部分（[参见图 2](#figure-2---login-section)）用于输入设备凭据并连接到设备。每个登录部分元素的详细说明可在[表 1](#table-1---login-section-elements)中找到。

#### 图 2 - 登录部分 {#figure-2---login-section}

![](/img/bbe8c5cff10d0a59.webp)

#### 表 1 - 登录部分元素 {#table-1---login-section-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/ba6119c88366e59f.webp) | **Connect to** - 地址字段。支持的地址格式包括：MAC、IPv4、[IPv6]、域名。（IPv6 必须专门放在方括号中使用）你还可以在 IP 地址后输入自定义端口，用冒号分隔（例如 `192.168.88.1:9999`）。端口可在 RouterOS 的 [服务](../system-information-and-utilities/services.md) 菜单中更改。|
| ![](/img/48b728812eb60cb5.webp) | **Login** - 用户名字段。 |
| ![](/img/4c715bee1070dff3.webp) | **Password** - 密码字段。“Remember password”复选标记可用于在会话之间保存密码。|
| ![](/img/12aefa4d5651b1ce.webp) | **Workspace** - 工作区选择下拉菜单。（参见 [Workspaces](#workspaces) 章节）|
| ![](/img/dea95d1cb5b5575b.webp) | **RoMON Agent** - RoMON Agent 选择下拉菜单。允许通过 RoMON“代理”使用 MAC 地址连接到设备。更多信息请参见 [RoMON 文档](./romon.md)。 |
| ![](/img/56461866eb1dea40.webp) | <strong>Connect</strong> - 连接按钮组： <br/> - <strong>Connect</strong> - 发起与路由器的连接 <br/> - <strong>Connect to RoMON</strong> - 发起与 RoMON“代理”的连接。更多信息请参见 <a href="/zh-Hans/docs/7.25/management-tools/romon">RoMON 文档</a>。 <br/> - <strong>Open in new</strong> - 启用后，在新窗口中打开路由器的配置界面。（仅适用于 <strong>Connect</strong> 按钮，不适用于 <strong>Connect to RoMON</strong> 按钮） |
| ![](/img/655213734ab64f3e.webp) | <strong>Save to list</strong> - 允许将路由器凭据保存到 Saved 列表。附加参数： <br/> - <strong>Group</strong> - 该条目所属的分组，便于对已保存条目进行排序 <br/> - <strong>Comment</strong> - 允许添加设备描述或其他有用信息 <br/> - <strong>with password</strong> - 启用后，密码将与其他凭据一同保存。禁用后，每次使用已保存条目时都必须手动输入密码。 |

:::warning
连接设备时，尽可能使用 IP 地址。MAC 会话使用网络广播，并非 100% 可靠。
:::

### 设备列表部分 {#device-list-section}

设备列表部分用于浏览已保存和已发现设备的列表。

#### 图 3 - 已保存设备列表 {#figure-3---saved-device-list}

![](/img/a8f52a86752298fa.webp)

将经常访问的路由器保存在 **Saved** 选项卡中。每个条目可包含：

- **Address** - 地址字段。支持的地址格式有：MAC、IPv4、[IPv6]、域名。（IPv6 应专门放在方括号中使用）你还可以在 IP 地址后输入自定义端口，端口以冒号分隔（例如 `192.168.88.1:9999`）。端口可在 RouterOS [服务](../system-information-and-utilities/services.md) 菜单中更改。
- **User** - 用于身份验证的用户名。
- **Password** - 用于身份验证的密码。（出于安全原因，不在表中显示）
- **Group** - 条目所属的组。
- **Comment** - 设备描述或其他有用信息。

数据库路径（在[图 3](#figure-3---saved-device-list)的右下角）显示当前打开的设备列表的 .cdb 文件在你 PC 上的存储位置。此列表中的所有 **Actions** 都用于该数据库管理。

此列表可用的 **Actions**：

- **Open** - 从你选择的已导出 .cdb 文件打开已保存设备列表
- **Move** - 将当前 .cdb 文件移动到你选择的其他目录
- **Import** - 用你选择的已导出 .cdb 文件中的已保存设备列表覆盖当前 .cdb 文件
- **Export** - 从当前 .cdb 文件导出已保存设备列表，以便与 **Import** 或 **Open** 一起使用
- **Set file password** - 使用密码加密当前 .cdb 文件

#### 已保存设备列表加密 {#saved-device-list-encryption}

WinBox 提供 **Set file password** 操作，可对当前 `.cdb` 文件中的所有已保存密码进行加密。最近使用的密码无法加密。为避免存储该密码，请保持 **Remember password** 复选框未选中。

如需额外保护，请使用操作系统内置工具（例如 Windows 上的 BitLocker 或 EFS，以及 macOS 上的 FileVault）加密 WinBox 文件夹，并保护其免遭未经授权的访问。

#### 图 4 - Neighbors 设备列表 {#figure-4---neighbors-device-list}

![](/img/f861803256688a4f.webp)

使用 **Neighbors** 选项卡发现网络中的可用路由器。从列表中选择一个路由器，然后选择 **Connect**。单击 IP 或 MAC 地址列，以选择要用于连接的地址。

此列表可用的 **Actions**：

- **Refresh** - 刷新已发现设备列表

:::info
邻居发现还会显示与 WinBox 不兼容的设备，例如使用 CDP（Cisco Discovery Protocol）的 Cisco 路由器。连接到 SwOS 设备时，会改为打开 Web 浏览器。
:::

#### 图 5 - RoMON Neighbor 设备列表 {#figure-5---romon-neighbor-device-list}

![](/img/70c9d9bc33e0ea08.webp)

使用 **RoMON Neighbors** 选项卡发现可通过 RoMON 覆盖网络访问的路由器。从列表中选择一个路由器，然后选择 **Connect**，以通过所选代理使用 MAC 地址打开 RoMON 会话。有关代理选择，请参阅[表 1](#table-1---login-section-elements)中的 **RoMON Agent** 字段说明。有关更多信息，请参阅专门的 [RoMON 文档](./romon.md)。

## 配置界面 {#configuration-interface}

输入路由器凭据或使用已保存凭据并通过[**登录界面**](#login-interface)连接后，你将进入配置界面，如[图 6](#figure-6---configuration-interface)所示。WinBox v4 配置界面包括：

- **工具栏部分** - 位于顶部，包含常规 WinBox 导航按钮。
- **侧边栏部分** - 位于左侧，列出所有可用菜单和子菜单。该列表会根据已安装的软件包而变化（例如，启用 container 软件包会添加 Container 和 App 菜单）。
- **工作区部分** - 位于中间，是打开所有内部窗口的区域。
- **资源部分** - 位于底部，包含常规设备信息。

#### 图 6 - 配置界面 {#figure-6---configuration-interface}

![](/img/9487ac4fc8b26c67.webp)

### 工具栏部分 {#toolbar-section}

#### 图 7 - 工具栏部分 {#figure-7---toolbar-section}

![](/img/a1c460b7b30803b1.webp)

#### 表 2 - 工具栏部分元素 {#table-2---toolbar-section-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/82d638632d765377.webp) | **Workspace** - 工作区选择下拉菜单。（参见[工作区](#workspaces)部分） |
| ![](/img/c5590c05291411a9.webp) | **Opened windows list** - 当前所有已打开的 WinBox 内部窗口的列表。此列表可让你轻松选择所需窗口或关闭不需要的窗口。  **子菜单：**  ![](/img/31a6ee2e3745027e.webp) |
| ![](/img/ca4dde25f5a3d02f.webp) | **Menu search** - 允许按名称搜索菜单。要搜索生效，你需要输入 **至少三个符号**。  **子菜单：**  ![](/img/e8cfa85a2dbd7ae0.webp) |
| ![](/img/1a16e9dba6871eee.webp) | **Undo** 和 **Redo** - **Undo**（左侧按钮）还原上一次更改，**Redo**（右侧按钮）重新应用该更改。可撤销的命令最大数量为 100。有关更多信息，可参阅[**配置管理**文档](../getting-started/configuration-management/index.md#configuration-undo-and-redo)。 |
| ![](/img/7772d6a7b2259bff.webp) | **Safe Mode toggle** - 允许启用 **Safe Mode**，以防止意外的会话断开。有关更多信息，请参阅[**Safe Mode** 文档](./console.md#safe-mode)。 |
| ![](/img/73de7b2a545bddb3.webp) | **Disconnect** - 结束当前会话并返回[**登录界面**](#login-interface)。 |

### 侧边栏部分 {#sidebar-section}

侧边栏（[参见图 8](#figure-8---sidebar-section)）包含所有可用菜单和子菜单的列表。该列表会根据已安装的软件包而变化。

#### 图 8 - 侧边栏部分 {#figure-8---sidebar-section}

![](/img/cfba656236b5208e.webp)

### 工作区部分 {#work-area-section}

工作区是 WinBox 窗口的中央部分，所有内部（子）窗口都会在此显示。

#### 图 9 - 工作区部分 {#figure-9---work-area-section}

![](/img/0eeeabd5a073c0a3.webp)

### 使用子窗口 {#working-with-child-windows}

WinBox 具有 MDI 界面，这意味着所有菜单配置（子）窗口都附加到主（父）WinBox 窗口，并显示在工作区中。

#### 选项卡工具栏 {#tab-toolbar}

每个选项卡都有一个带有常用操作的工具栏：

- **New** - 向列表添加新条目。
- **Remove** - 从列表中移除所选条目。
- **Enable** - 启用所选条目。
- **Disable** - 禁用所选条目。
- **Comment** - 添加或编辑注释。
- **Sort** - 对显示的条目进行排序和筛选。

几乎所有选项卡的工具栏右侧都有一个快速搜索字段。输入文本会搜索所有条目并突出显示匹配项。

#### 排序和筛选 {#sorting-and-filtering}

选择 **Sort** 按钮以显示筛选选项：

1. 从第一个下拉框中选择一列。
2. 从第二个下拉框中选择比较运算符（例如 **is**、**in**、**is not**、**contains**）。
3. 输入要比较的值。
4. 选择 **Filter** 以应用。

WinBox 支持叠加多个筛选器。选择 **[+]** 添加另一个筛选器，选择 **[-]** 移除一个筛选器。

#### 列自定义 {#column-customization}

要自定义显示的列：

1. 选择列标题右侧的箭头按钮，或右键单击条目列表。
2. 转到 **Show Columns** 并选择所需的列。

更改会被保存，并在会话之间保留。

### 资源部分 {#resources-section}

显示路由器的一般信息和资源。部分字段是交互式的——单击字段会在配置界面中打开相关部分。

#### 图 10 - 资源部分 {#figure-10---resources-section}

![](/img/7d693f711275df43.webp)

从左到右的字段如下：

- 路由器标识
- 路由器 IP 地址
- 路由器架构
- 路由器型号
- 路由器上安装的 RouterOS 版本
- 路由器 CPU 利用率（百分比）
- 路由器 RAM 空闲/已用/总计
- 路由器运行时间
- 路由器时钟

## WinBox 常规设置及其他 {#general-winbox-settings-and-more}

本节介绍 WinBox GUI 设置以及其他段落未涵盖的杂项元素（[参见表 3](#table-3---miscellaneous-elements)）。

#### 表 3 - 杂项元素 {#table-3---miscellaneous-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/656345c7a9ef49c4.webp) | **Create new session** - 位于右上角。此按钮会打开新的 WinBox 窗口。 |
| ![](/img/07c12793af5f66be.webp) | <strong>Settings/App information</strong> - 位于右上角。打开包含以下元素的下拉菜单： <br/> - <strong>Settings</strong> - <a href="#gui-settings-menu">GUI Settings 菜单</a><br/> - <strong>Shortcuts</strong> - 可用快捷键组合的信息（<a href="#keyboard-shortcuts">参见 Keyboard Shortcuts</a>） <br/> - <strong>About</strong> - 应用程序信息，例如版本、实用链接、许可证信息 <br/> - <strong>Quit</strong> - 关闭 WinBox 应用程序 |
| ![](/img/2c3ee497272e4f8b.webp) | **WinBox update notification** - 位于右上角。**仅在 WinBox 有更新时显示**，允许无需访问 [MikroTik 网站](https://mikrotik.com/winbox) 即可下载最新版本的 WinBox。 |
| ![](/img/8ce5670532f5a0cd.webp) | **RouterOS update notification** - 位于右上角。**仅在 RouterOS 有更新时于 [配置界面](#configuration-interface) 中显示**，允许无需访问 [package 菜单](../getting-started/installation-and-upgrade/packages.md#download-directly-from-the-router) 或手动上传软件包即可下载最新版本的 RouterOS。 |

### GUI 设置菜单 {#gui-settings-menu}

WinBox v4 提供高级 GUI 自定义菜单（[参见图 11](#figure-11---gui-settings-menu)），允许更改 WinBox 显示信息的多个属性。每项设置的详细说明可在[表 4](#table-4---gui-settings-elements)中找到。

#### 图 11 - GUI 设置菜单 {#figure-11---gui-settings-menu}

![](/img/e6a73a80d0319a42.webp)

#### 表 4 - GUI 设置元素 {#table-4---gui-settings-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/0071d3c081c5a292.webp) | **Hide password** - 将 RouterOS 敏感字段的内容替换为星号。（[敏感参数列表](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)） |
| ![](/img/06422c69914305bc.webp) | **Comment Type** - 选择注释是显示为条目的标题，还是显示为单独的列。 |
| ![](/img/e67aafe2f19cae6f.webp) | **Comment column in front** - 当选择 Comment 列类型时，确保注释位于所有其他列之前。 |
| ![](/img/73aae9524b6ca127.webp) | **Table tools position** - 选择特定表格的工具是显示在内部 WinBox 窗口的右侧，还是作为带有下拉菜单的单个按钮显示在内部 WinBox 窗口的工具栏中。 |
| ![](/img/075ca22f0c8c32e9.webp) | **Table column separator** - 选择是否显示分隔各列的垂直线。|
| ![](/img/210763d1255cb84f.webp) | **Table row height** - 取值 0 到 20，更改行的垂直内边距，较高的值提供更大的内边距，从而更好地区分各行。|
| ![](/img/bd0d81c08a1832e3.webp) | **Dark mode** - 为应用程序启用更深的配色方案。 |
| ![](/img/88c1305c38d4babe.webp) | **Resource panel** - 选择是否在配置界面的 WinBox 窗口底部显示路由器资源/身份信息。|
| ![](/img/391a3e5a7443b343.webp) | <strong>GUI font</strong> - 允许选择在整个 WinBox 应用程序中使用的字体。附加参数： <br/> - <strong>Regular</strong> - 取值 300 到 600，允许更改整个 WinBox 应用程序中常规文本的粗细 <br/> - <strong>Bold</strong> - 取值 -100 到 300，允许更改整个 WinBox 应用程序中粗体文本的粗细 <br/> - <strong>Spacing</strong> - 取值 -1 到 1，允许更改字符之间的间距。 |
| ![](/img/be14a9269e933e94.webp) | **GUI scaling** - 取值 67% 到 250%，允许更改 UI 的大小。在右下角打开子菜单。  **子菜单：**  ![](/img/1b600d643de7ea0e.webp)  - **Global zoom** - 同时更改 **UI size** 和 **Spacing**  - **UI size** - 更改 UI 元素的大小  - **Spacing** - 更改 UI 元素之间的间距 |
| ![](/img/ee1eeeac8942be20.png) | **Buffer size** - 终端回滚缓冲区中保留的最大行数（100 到 100000）。仅对新打开的终端生效。 |

### 工作区 {#workspaces}

WinBox v4 引入了工作区，取代 WinBox v3 的会话系统。工作区允许你将连接组织到独立环境中。每个工作区都维护自己的一组打开的连接和窗口。

## 键盘快捷键 {#keyboard-shortcuts}

本节介绍不同版本的 WinBox 在各自操作系统上的键盘快捷键。

#### Linux/Windows 快捷键 {#linuxwindows-shortcuts}

| 快捷键 | 描述 |
| :-- | :-- |
| **应用程序** | |
| Ctrl + + / Ctrl + = / Ctrl + Scroll up | 放大 |
| Ctrl + - / Ctrl + Scroll down | 缩小 |
| Ctrl + 0 | 重置缩放 |
| F11 | 切换全屏 |
| **工作区** | |
| Alt + F | 菜单搜索 |
| Alt + W / Ctrl + F4 / Esc | 关闭活动窗口 |
| Alt + S | 切换活动窗口 |
| Alt + A | 向后切换活动窗口 |
| Alt + T | 打开新的终端窗口 |
| Ctrl + Tab | 活动窗口中的下一个选项卡 |
| Ctrl + Shift + Tab | 活动窗口中的上一个选项卡 |
| **表格** | |
| Ctrl + F | 查找文本 |
| Ctrl + A | 选择所有行 |
| Insert / Ctrl + N | 添加新条目 |
| Delete | 移除所选行 |
| Ctrl + E | 启用所选行 |
| Ctrl + Shift + E | 禁用所选行 |
| Ctrl + M | 为所选行添加注释 |
| Enter | 打开当前行 |
| F5 | 重新加载 |
| End | 将光标移到末尾 |
| Home | 将光标移到顶部 |
| Page Down | 将光标向下移动一页 |
| Page Up | 将光标向上移动一页 |
| Shift + Click | 多列排序 |
| **表单** | |
| Shift + Click | 多选项卡展开 |

#### macOS 快捷键 {#macos-shortcuts}

| 快捷键 | 描述 |
| :-- | :-- |
| **应用程序** | |
| ⌘ + + / ⌘ + = / ⌘ + Scroll up | 放大 |
| ⌘ + - / ⌘ + Scroll down | 缩小 |
| ⌘ + 0 | 重置缩放 |
| F11 | 切换全屏 |
| ⌘ + M | 最小化应用 |
| **工作区** | |
| ⌥ + ⌘ + F | 菜单搜索 |
| ⌘ + W / ⌘ + F4 / Esc | 关闭活动窗口 |
| ⌘ + S | 切换活动窗口 |
| ⌘ + Shift + S | 向后切换活动窗口 |
| ⌘ + T | 打开新的终端窗口 |
| Ctrl + Tab | 活动窗口中的下一个选项卡 |
| Ctrl + Shift + Tab | 活动窗口中的上一个选项卡 |
| **表格** | |
| ⌘ + F | 查找文本 |
| ⌘ + A | 选择所有行 |
| Insert / ⌘ + N | 添加新条目 |
| Fn + Backspace | 移除所选行 |
| ⌘ + E | 启用所选行 |
| ⌘ + Shift + E | 禁用所选行 |
| ⌘ + Shift + M | 为所选行添加注释 |
| Enter | 打开当前行 |
| F5 | 重新加载 |
| End | 将光标移到末尾 |
| Home | 将光标移到顶部 |
| Page Down | 将光标向下移动一页 |
| Page Up | 将光标向上移动一页 |
| Shift + Click | 多列排序 |
| **表单** | |
| Shift + Click | 多选项卡展开 |

## 故障排除 {#troubleshooting}

##### WinBox 无法连接到路由器的 IP 地址，设备未显示在 Neighbors 列表中 {#winbox-cannot-connect-to-the-routers-ip-address-devices-do-not-show-up-in-the-neighbors-list}

确保防火墙已设置为允许 WinBox 连接通过 Private 和/或 Public 网络接口。在 Windows 上，可在 *Control Panel\System and Security\Windows Defender Firewall\Allowed applications* 中配置。

##### MAC 连接失败，错误为“(port 20561) timed out” {#mac-connection-fails-with-error-port-20561-timed-out}

如果禁用文件和打印机共享，Windows 不允许 MAC 连接。

##### MAC 连接失败，并显示“ERROR could not connect to XX-XX-XX-XX-XX-XX” {#mac-connection-fails-with-error-could-not-connect-to-xx-xx-xx-xx-xx-xx}

大多数网络驱动程序需要先进行 IP 配置，才能启用 IP 协议栈。请在主机设备上设置 IPv4 配置。

:::warning
WinBox MAC 地址连接要求 MTU 值设置为 1500，且不分片。其他值可能导致性能不佳或连接中断。
:::
