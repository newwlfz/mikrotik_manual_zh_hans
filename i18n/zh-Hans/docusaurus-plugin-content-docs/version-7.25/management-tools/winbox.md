---
title: "WinBox"
description: "WinBox v4 是一款原生跨平台 GUI 工具，用于在 Windows、Linux 和 macOS 上管理 MikroTik RouterOS。它通过原生应用取代了基于 Wine 的旧版 WinBox v3，并提供基于 AES128-CBC-SHA 加密和 ECSRP 身份验证的安全连接。"
tags:
  - 'winbox'
  - 'management'
  - 'v4'
  - 'native'
source: https://manual.mikrotik.com/docs/7.25/management-tools/winbox
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

WinBox 是一个实用工具，可通过快速、简单的 GUI 管理 MikroTik RouterOS。WinBox v4 是原生应用程序，可用于 Windows、Linux 和 macOS —— 无需 Wine 或仿真。所有 WinBox 接口功能都尽可能与控制台功能保持一致，因此手册中没有单独的 WinBox 章节。

使用以下安全功能：

- WinBox 使用由 SIA Mikrotīkls（MikroTik）颁发的 Extended Validation 证书进行签名。
- WinBox 使用 ECSRP 进行密钥交换和身份验证。
- 双方都会验证对方是否知道密码（不可能发生中间人攻击）。
- WinBox 使用 AES128-CBC-SHA 作为加密算法。

:::info
WinBox v4 取代了旧版基于 Windows 的 WinBox v3。如果仍在使用旧版本，请参阅 [WinBox v3 (Legacy)](/docs/management-tools/winbox-legacy) 页面。
:::

## 下载和安装 {#download-and-installation}

从 [MikroTik 下载页面](https://mikrotik.com/download/winbox)下载 WinBox。

#### Windows

1. 下载包含 `WinBox.exe` 的 ZIP 压缩包。
2. 将压缩包解压到所选文件夹。
3. 运行 `WinBox.exe` —— 无需安装。

#### Linux

1. 下载包含 Linux 二进制文件的 ZIP 压缩包。
2. 将压缩包解压到所选文件夹。
3. 从终端或文件管理器运行该二进制文件。

#### macOS

1. 下载 DMG 软件包。
2. 打开 `.dmg` 文件，并将 WinBox 拖到 Applications 文件夹。
3. 从 Applications 文件夹启动 WinBox。

:::warning
将 ZIP 归档中的内容解压到一个独立子文件夹中，该文件夹不得包含其他文件。这是自更新功能正常工作的必要条件，适用于 Windows 和 Linux 版本的 WinBox。
:::

## 登录界面 {#login-interface}

本节介绍登录界面。启动 WinBox 应用程序时，首先看到的就是该界面。在此处，可以使用登录区域手动连接到 RouterOS 设备，也可以使用 **Saved** 选项卡中的已保存凭据。为了更方便地发现运行 WinBox 的 PC 所连接 L2 网络中的设备，可以使用 **Neighbors** 选项卡。
登录界面（[见图 1](#figure-1---login-interface)）可分为两个部分：

- **Login section** - 左侧部分，用于连接 RouterOS。
- **Device list section** - 右侧部分，包含已保存或已发现的设备，并可进一步分为三个选项卡。
  - **Saved** - 用户保存的设备。
  - **Neighbors** - 已发现的设备。
  - **RoMON** - RoMON 发现的设备。

上述部分未涵盖的元素见 [表 3](#table-3---miscellaneous-elements)。

#### 图 1 - 登录界面 {#figure-1---login-interface}

![](/img/e5b14400c07856b6.webp)

### 登录区域 {#login-section}

Login 区域（[见图 2](#figure-2---login-section)）用于输入设备凭据并连接到设备。Login 区域各元素的详细说明见 [表 1](#table-1---login-section-elements)。

#### 图 2 - Login 区域 {#figure-2---login-section}

![](/img/bbe8c5cff10d0a59.webp)

#### 表 1 - Login 区域元素 {#table-1---login-section-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/ba6119c88366e59f.webp) | **Connect to** - 地址字段。支持的地址格式包括：MAC、IPv4、[IPv6]、域名。（IPv6 必须放在方括号中）你还可以在 IP 地址后输入自定义端口，用冒号分隔（例如，`192.168.88.1:9999`）。端口可在 RouterOS [Services](/docs/system-information-and-utilities/services) 菜单中更改。|
| ![](/img/48b728812eb60cb5.webp) | **Login** - 用户名字段。|
| ![](/img/4c715bee1070dff3.webp) | **Password** - 密码字段。可使用 Remember password 复选框在会话之间保存密码。|
| ![](/img/12aefa4d5651b1ce.webp) | **Workspace** - Workspace 选择下拉菜单。（见 [Workspaces](#workspaces) 部分）|
| ![](/img/dea95d1cb5b5575b.webp) | **RoMON Agent** - RoMON Agent 选择下拉菜单。允许通过 RoMON“代理”使用 MAC 地址连接到设备。详情请参阅 [RoMON 文档](/docs/management-tools/romon)。|
| ![](/img/56461866eb1dea40.webp) | <strong>Connect</strong> - 连接按钮组：<br/> - <strong>Connect</strong> - 发起与路由器的连接 <br/> - <strong>Connect to RoMON</strong> - 发起与 RoMON“代理”的连接。详情请参阅 <a href="/docs/management-tools/romon">RoMON 文档</a>。 <br/> - <strong>Open in new</strong> - 启用后，在新窗口中打开路由器的配置界面。（仅适用于 <strong>Connect</strong> 按钮，不适用于 <strong>Connect to RoMON</strong> 按钮） |
| ![](/img/655213734ab64f3e.webp) | <strong>Save to list</strong> - 允许将路由器凭据保存到 Saved 列表。附加参数：<br/> - <strong>Group</strong> - 条目所属的组，便于对已保存条目进行排序 <br/> - <strong>Comment</strong> - 允许添加设备描述或其他有用信息 <br/> - <strong>with password</strong> - 启用后，密码将与其他凭据一起保存。禁用时，每次使用已保存条目都必须手动输入密码。 |

:::warning
连接到设备时，尽可能使用 IP 地址。MAC 会话使用网络广播，可靠性并非 100%。
:::

### 设备列表区域 {#device-list-section}

设备列表区域用于浏览已保存和已发现设备的列表。

#### 图 3 - 已保存设备列表 {#figure-3---saved-device-list}

![](/img/a8f52a86752298fa.webp)

将经常访问的路由器保存在 **Saved** 选项卡中。每个条目可以包含：

- **Address** - Address 字段。支持的地址格式为：MAC、IPv4、[IPv6]、域名。（IPv6 应专门使用方括号）你还可以在 IP 地址后输入自定义端口，用冒号分隔（例如 `192.168.88.1:9999`）。该端口可在 RouterOS [Services](/docs/system-information-and-utilities/services) 菜单中更改。
- **User** - 用于身份验证的用户名。
- **Password** - 用于身份验证的密码。（出于安全原因，表中不显示）
- **Group** - 条目所属的组。
- **Comment** - 设备描述或其他有用信息。

数据库路径显示（在 [Figure 3](#figure-3---saved-device-list) 的右下角）当前打开的设备列表 .cdb 文件在 PC 上的存储位置。此列表中的所有 **Actions** 均用于该数据库管理。

此列表可用的 **Actions**：

- **Open** - 从你选择的导出的 .cdb 文件打开已保存的设备列表
- **Move** - 将当前 .cdb 文件移动到你选择的其他目录
- **Import** - 使用你选择的导出的 .cdb 文件中的已保存设备列表覆盖当前 .cdb 文件
- **Export** - 从当前 .cdb 文件导出已保存的设备列表，以便与 **Import** 或 **Open** 一起使用
- **Set file password** - 使用密码加密当前 .cdb 文件

#### 图 4 - 邻居设备列表 {#figure-4---neighbors-device-list}

![](/img/f861803256688a4f.webp)

使用 **Neighbors** 选项卡发现网络上可用的路由器。从列表中选择一台路由器，然后选择 **Connect**。单击 IP 或 MAC 地址列，选择用于连接的地址。

此列表可用的 **Actions**：

- **Refresh** - 刷新已发现设备列表

:::info
邻居发现还会显示与 WinBox 不兼容的设备，例如使用 CDP（Cisco Discovery Protocol）的 Cisco 路由器。连接到 SwOS 设备会改为打开 Web 浏览器。
:::

#### 图 5 - RoMON 邻居设备列表 {#figure-5---romon-neighbor-device-list}

![](/img/70c9d9bc33e0ea08.webp)

使用 **RoMON Neighbors** 选项卡发现可通过 RoMON 覆盖网络访问的路由器。从列表中选择路由器，然后选择 **Connect**，通过所选代理和 MAC 地址打开 RoMON 会话。有关代理选择，请参阅 [table 1](#table-1---login-section-elements) 中 **RoMON Agent** 字段的说明。详情请参阅专门的 [RoMON 文档](/docs/management-tools/romon)。

## 配置界面 {#configuration-interface}

输入路由器凭据或使用已保存的凭据，并通过 [**Login interface**](#login-interface) 连接后，将进入 [Figure 6](#figure-6---configuration-interface) 所示的配置界面。WinBox v4 配置界面包括：

- 顶部的 **Toolbar section** - 包含通用 WinBox 导航按钮。
- 左侧的 **Sidebar section** - 列出所有可用菜单和子菜单。该列表会根据已安装的软件包而变化（例如，启用 container 软件包会添加 Container 和 App 菜单）。
- 中间的 **Work area section** - 打开所有内部窗口的区域。
- 底部的 **Resources section** - 包含设备的常规信息。

#### 图 6 - 配置界面 {#figure-6---configuration-interface}

![](/img/9487ac4fc8b26c67.webp)

### 工具栏区域 {#toolbar-section}

#### 图 7 - 工具栏区域 {#figure-7---toolbar-section}

![](/img/a1c460b7b30803b1.webp)

#### 表 2 - 工具栏区域元素 {#table-2---toolbar-section-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/82d638632d765377.webp) | **Workspace** - 工作区选择下拉菜单。（请参阅 [Workspaces](#workspaces) 章节） |
| ![](/img/c5590c05291411a9.webp) | **Opened windows list** - 当前所有已打开的内部 WinBox 窗口列表。该列表可用于快速选择所需窗口或关闭不需要的窗口。  **子菜单：**  ![](/img/31a6ee2e3745027e.webp) |
| ![](/img/ca4dde25f5a3d02f.webp) | **Menu search** - 按名称搜索菜单。要启用搜索，需要输入**至少三个字符**。  **子菜单：**  ![](/img/e8cfa85a2dbd7ae0.webp) |
| ![](/img/1a16e9dba6871eee.webp) | **Undo** 和 **Redo** - **Undo**（左侧按钮）撤销上次更改，**Redo**（右侧按钮）恢复该更改。最多可撤销 100 条命令。详情请参阅 [**Configuration Management** 文档](/docs/getting-started/configuration-management#configuration-undo-and-redo)。 |
| ![](/img/7772d6a7b2259bff.webp) | **Safe Mode toggle** - 用于启用 **Safe Mode**，以防止会话意外断开。详情请参阅 [**Safe Mode** 文档](/docs/management-tools/console#safe-mode)。 |
| ![](/img/73de7b2a545bddb3.webp) | **Disconnect** - 结束当前会话并返回 [**Login interface**](#login-interface)。 |

### 侧边栏区域 {#sidebar-section}

侧边栏（[见图 8](#figure-8---sidebar-section)）包含所有可用菜单和子菜单的列表。该列表会根据已安装的软件包而变化。

#### 图 8 - 侧边栏区域 {#figure-8---sidebar-section}

![](/img/cfba656236b5208e.webp)

### 工作区区域 {#work-area-section}

工作区是 WinBox 窗口的中央部分，所有内部（子）窗口都显示在此处。

#### 图 9 - 工作区部分 {#figure-9---work-area-section}

![](/img/0eeeabd5a073c0a3.webp)

### 使用子窗口 {#working-with-child-windows}

WinBox 使用 MDI 界面，这意味着所有菜单配置（子）窗口都附加到主（父）WinBox 窗口，并显示在工作区中。

#### 标签工具栏 {#tab-toolbar}

每个标签都有一个包含常用操作的工具栏：

- **New** - 向列表添加新项目。
- **Remove** - 从列表中删除所选项目。
- **Enable** - 启用所选项目。
- **Disable** - 禁用所选项目。
- **Comment** - 添加或编辑注释。
- **Sort** - 对显示的项目进行排序和筛选。

几乎所有标签的工具栏右侧都有快速搜索字段。输入文本会搜索所有项目并高亮匹配项。

#### 排序和筛选 {#sorting-and-filtering}

选择 **Sort** 按钮以显示筛选选项：

1. 从第一个下拉框中选择一列。
2. 从第二个下拉框中选择比较运算符（例如，**is**、**in**、**is not**、**contains**）。
3. 输入要比较的值。
4. 选择 **Filter** 以应用。

WinBox 支持叠加多个筛选条件。选择 **[+]** 添加另一个筛选条件，选择 **[-]** 删除一个筛选条件。

#### 自定义列 {#column-customization}

要自定义显示的列：

1. 选择列标题右侧的箭头按钮，或右键单击项目列表。
2. 进入 **Show Columns** 并选择所需的列。

更改会保存，并在会话之间保留。

### Resources 部分 {#resources-section}

显示路由器的常规信息和资源。

#### 图 10 - Resources 部分 {#figure-10---resources-section}

![](/img/7d693f711275df43.webp)

从左到右的字段如下：

- 路由器标识
- 路由器 IP 地址
- 路由器架构
- 路由器型号
- 路由器上安装的 RouterOS 版本
- 路由器 CPU 使用率（百分比）
- 路由器 RAM 空闲／已用／总量
- 路由器运行时间
- 路由器时钟

## 常规 WinBox 设置及更多内容 {#general-winbox-settings-and-more}

本节介绍 WinBox GUI 设置以及其他段落未涵盖的杂项元素（[参见表 3](#table-3---miscellaneous-elements)）。

#### 表 3 - 杂项元素 {#table-3---miscellaneous-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/656345c7a9ef49c4.webp) | **创建新会话** - 位于右上角。此按钮会打开新的 WinBox 窗口。 |
| ![](/img/07c12793af5f66be.webp) | <strong>设置／应用信息</strong> - 位于右上角。打开下拉菜单，其中包含以下元素： <br/> - <strong>设置</strong> - <a href="#gui-settings-menu">GUI 设置菜单</a><br/> - <strong>快捷键</strong> - 有关可用快捷键组合的信息（<a href="#keyboard-shortcuts">参见键盘快捷键</a>） <br/> - <strong>关于</strong> - 应用信息，例如版本、有用链接、许可证信息 <br/> - <strong>退出</strong> - 关闭 WinBox 应用 |
| ![](/img/2c3ee497272e4f8b.webp) | **WinBox 更新通知** - 位于右上角。**仅在有 WinBox 更新时出现**，允许在不访问 [MikroTik 网站](https://mikrotik.com/winbox)的情况下下载最新版 WinBox。 |
| ![](/img/8ce5670532f5a0cd.webp) | **RouterOS 更新通知** - 位于右上角。**仅在 [配置接口](#configuration-interface) 中有 RouterOS 更新时出现**，允许在不访问 [package 菜单](/docs/getting-started/installation-and-upgrade/packages#download-directly-from-the-router) 或手动上传包的情况下下载最新版 RouterOS。 |

### GUI 设置菜单 {#gui-settings-menu}

WinBox v4 提供高级 GUI 自定义菜单（[参见图 11](#figure-11---gui-settings-menu)），可更改 WinBox 显示信息的多个属性。每项设置的详细说明见[表 4](#table-4---gui-settings-elements)。

#### 图 11 - GUI 设置菜单 {#figure-11---gui-settings-menu}

![](/img/e6a73a80d0319a42.webp)

#### 表 4 - GUI Settings 元素 {#table-4---gui-settings-elements}

| 元素 | 描述 |
| :-- | :-- |
| ![](/img/0071d3c081c5a292.webp) | **Hide password** - 用星号替换 RouterOS 敏感字段的内容。（[敏感参数列表](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)） |
| ![](/img/06422c69914305bc.webp) | **Comment Type** - 选择注释是显示为条目的标题还是单独的列。 |
| ![](/img/e67aafe2f19cae6f.webp) | **Comment column in front** - 选择 Comment 列类型时，确保注释位于所有其他列之前。 |
| ![](/img/73aae9524b6ca127.webp) | **Table tools position** - 选择特定表格的工具显示在内部 WinBox 窗口右侧，还是作为带下拉菜单的单个按钮显示在内部 WinBox 窗口的工具栏中。 |
| ![](/img/075ca22f0c8c32e9.webp) | **Table column separator** - 选择是否显示分隔列的竖线。|
| ![](/img/210763d1255cb84f.webp) | **Table row height** - 值为 0 到 20，用于更改行的垂直内边距，值越大内边距越大，行之间的区分越明显。|
| ![](/img/bd0d81c08a1832e3.webp) | **Dark mode** - 为应用程序启用较深的颜色方案。 |
| ![](/img/88c1305c38d4babe.webp) | **Resource panel** - 选择是否在配置界面的 WinBox 窗口底部显示路由器资源/身份信息。|
| ![](/img/391a3e5a7443b343.webp) | <strong>GUI font</strong> - 用于选择整个 WinBox 应用程序使用的字体。附加参数： <br/> - <strong>Regular</strong> - 值为 300 到 600，用于更改整个 WinBox 应用程序中常规文本的粗细 <br/> - <strong>Bold</strong> - 值为 -100 到 300，用于更改整个 WinBox 应用程序中粗体文本的粗细 <br/> - <strong>Spacing</strong> - 值为 -1 到 1，用于更改字符间距。 |
| ![](/img/be14a9269e933e94.webp) | **GUI scaling** - 值为 67% 到 250%，用于更改 UI 的大小。在右下角打开子菜单。  **子菜单：**  ![](/img/1b600d643de7ea0e.webp)  - **Global zoom** - 同时更改 **UI size** 和 **Spacing**  - **UI size** - 更改 UI 元素的大小  - **Spacing** - 更改 UI 元素之间的间距 |
| ![](/img/ee1eeeac8942be20.png) | **Buffer size** - 终端回滚中保留的最大行数（100 到 100000）。适用于新打开的终端。 |

### Workspaces

WinBox v4 引入了工作区，取代 WinBox v3 中的会话系统。工作区允许你将连接组织到独立环境中。每个工作区维护自己的一组打开的连接和窗口。

## 键盘快捷键 {#keyboard-shortcuts}

本节介绍不同操作系统下各版本 WinBox 的键盘快捷键。

#### Linux/Windows 快捷键 {#linuxwindows-shortcuts}

| 快捷键 | 描述 |
| :-- | :-- |
| **Application** | |
| Ctrl + + / Ctrl + = / Ctrl + Scroll up | 放大 |
| Ctrl + - / Ctrl + Scroll down | 缩小 |
| Ctrl + 0 | 重置缩放 |
| F11 | 切换全屏 |
| **Workspace** | |
| Alt + F | 菜单搜索 |
| Alt + W / Ctrl + F4 / Esc | 关闭活动窗口 |
| Alt + S | 切换活动窗口 |
| Alt + A | 向后切换活动窗口 |
| Alt + T | 打开新终端窗口 |
| Ctrl + Tab | 活动窗口中的下一个标签页 |
| Ctrl + Shift + Tab | 活动窗口中的上一个标签页 |
| **Table** | |
| Ctrl + F | 查找文本 |
| Ctrl + A | 选择所有行 |
| Insert / Ctrl + N | 添加新项目 |
| Delete | 删除所选行 |
| Ctrl + E | 启用所选行 |
| Ctrl + Shift + E | 禁用所选行 |
| Ctrl + M | 注释所选行 |
| Enter | 打开当前行 |
| F5 | 重新加载 |
| End | 将光标移至底部 |
| Home | 将光标移至顶部 |
| Page Down | 将光标向下移动一页 |
| Page Up | 将光标向上移动一页 |
| Shift + Click | 多列排序 |
| **Form** | |
| Shift + Click | 展开多个标签页 |

#### macOS 快捷键 {#macos-shortcuts}

| 快捷键 | 说明 |
| :-- | :-- |
| **Application** | |
| ⌘ + + / ⌘ + = / ⌘ + Scroll up | 放大 |
| ⌘ + - / ⌘ + Scroll down | 缩小 |
| ⌘ + 0 | 重置缩放 |
| F11 | 切换全屏 |
| ⌘ + M | 最小化应用 |
| **Workspace** | |
| ⌥ + ⌘ + F | 菜单搜索 |
| ⌘ + W / ⌘ + F4 / Esc | 关闭活动窗口 |
| ⌘ + S | 切换活动窗口 |
| ⌘ + Shift + S | 向后切换活动窗口 |
| ⌘ + T | 打开新终端窗口 |
| Ctrl + Tab | 活动窗口中的下一个标签页 |
| Ctrl + Shift + Tab | 活动窗口中的上一个标签页 |
| **Table** | |
| ⌘ + F | 查找文本 |
| ⌘ + A | 选择所有行 |
| Insert / ⌘ + N | 添加新项目 |
| Fn + Backspace | 删除所选行 |
| ⌘ + E | 启用所选行 |
| ⌘ + Shift + E | 禁用所选行 |
| ⌘ + Shift + M | 注释所选行 |
| Enter | 打开当前行 |
| F5 | 重新加载 |
| End | 将光标移至底部 |
| Home | 将光标移至顶部 |
| Page Down | 将光标向下移动一页 |
| Page Up | 将光标向上移动一页 |
| Shift + Click | 多列排序 |
| **Form** | |
| Shift + Click | 展开多个标签页 |

## 故障排除 {#troubleshooting}

##### WinBox 无法连接到路由器的 IP 地址，设备未显示在 Neighbors 列表中 {#winbox-cannot-connect-to-the-routers-ip-address-devices-do-not-show-up-in-the-neighbors-list}

确保防火墙允许 WinBox 连接通过 Private 和/或 Public 网络接口。在 Windows 上，可在 *Control Panel\System and Security\Windows Defender Firewall\Allowed applications* 中配置。

##### MAC 连接失败并出现错误“(port 20561) timed out” {#mac-connection-fails-with-error-port-20561-timed-out}

如果禁用了文件和打印共享，Windows 不允许 MAC 连接。

##### MAC 连接失败并出现“ERROR could not connect to XX-XX-XX-XX-XX-XX” {#mac-connection-fails-with-error-could-not-connect-to-xx-xx-xx-xx-xx-xx}

大多数网络驱动程序需要先配置 IP，才能启用 IP 协议栈。在主机设备上设置 IPv4 配置。

:::warning
WinBox MAC 地址连接要求 MTU 值设置为 1500，且不分片。其他值可能导致性能下降或连接丢失。
:::
