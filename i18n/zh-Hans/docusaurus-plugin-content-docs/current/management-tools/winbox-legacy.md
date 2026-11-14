---
sidebar_key: "management-tools/winbox-legacy"
sidebar_position: 3
title: "WinBox v3（旧版）"
sidebar_label: "WinBox v3"
description: "WinBox v3 是一个用于管理 MikroTik RouterOS 的 GUI 工具，可通过 Wine 支持 Linux/macOS。本旧版页面介绍基于 Wine 的 WinBox v3——如需原生跨平台体验，请使用 WinBox v4。"
tags:
  - 'winbox'
  - 'legacy'
  - 'v3'
  - 'management'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/management-tools/winbox-legacy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::warning
本页面介绍的是旧版 WinBox v3（基于 Wine）应用程序。MikroTik 现在提供 **WinBox v4**，这是一款适用于 Windows、Linux 和 macOS 的原生跨平台应用程序。当前版本请参阅 [WinBox v4 文档](./winbox.md)。
:::

WinBox 是一个小型实用程序，可通过快速简单的 GUI 管理 MikroTik RouterOS。它是原生 Win32/Win64 二进制文件，但也可以通过 Wine 在 **Linux** 和 **macOS (OSX)** 上运行。所有 WinBox 界面功能都尽可能与控制台功能保持一致，因此手册中没有 WinBox 章节。某些高级且对系统至关重要的配置无法通过 WinBox 完成，例如更改接口的 MAC 地址。

从 WinBox v3.14 开始，使用以下安全功能：

- WinBox.exe 已使用由 SIA Mikrotīkls (MikroTik) 颁发的扩展验证证书签名。
- WinBox 使用 ECSRP 进行密钥交换和身份验证（需要较新的 WinBox 版本）。
- 双方都会验证对方知道密码（无法进行中间人攻击）。
- 在 RoMON 模式下，WinBox 要求代理为最新版本，才能连接到最新版本的路由器。
- WinBox 使用 AES128-CBC-SHA 作为加密算法（需要 WinBox v3.14 及更高版本）。

## 启动 WinBox {#starting-winbox}

WinBox 加载器可从 [MikroTik 下载页面](https://www.mikrotik.com/download) 下载。下载 WinBox.exe 后，双击它，WinBox 加载器窗口就会弹出。WinBox 加载器有两种模式：默认启用的简单模式，以及高级模式。

### 简单模式 {#simple-mode}

首次打开 WinBox 加载器时，会使用简单模式布局：

![](/img/2386fa4e45dcbbe8.webp)

要连接到路由器，请输入路由器的 IP 或 MAC 地址，指定用户名和密码（如果有），然后选择 **连接** 按钮。也可以在 IP 地址后输入端口号，并用冒号分隔，例如 192.168.88.1:9999。端口可在 RouterOS 的 **services** 菜单中更改。

:::warning
建议尽可能使用 IP 地址。MAC 会话使用网络广播，并非 100% 可靠。

:::

还可以使用邻居发现来列出可用路由器。使用 **Neighbors** 选项卡：

![](/img/8458e9e261d09be6.webp)

从发现的路由器列表中，你可以选择 IP 或 MAC 地址列来连接到该路由器。如果选择 IP 地址，则使用 IP 进行连接；但如果选择 MAC 地址，则使用 MAC 地址连接到路由器。

:::info
邻居发现还会显示与 WinBox 不兼容的设备，例如 Cisco 路由器或任何其他使用 CDP（Cisco Discovery Protocol）的设备。如果您尝试连接到 SwOS 设备，则连接将通过 Web 浏览器建立
:::

#### 按钮/复选框及其他字段 {#buttonscheck-boxes-and-other-fields}

- **Connect** - 连接到路由器。
- **Connect To RoMON** - 连接到 [RoMON](./romon.md) Agent。
- **Add/set** - 在 **Managed** 选项卡中保存/编辑任何已保存的路由器条目。
- **Open In New Window** - 让 loader 在后台保持打开，并为每个已连接的设备打开新窗口。
- **Connect To:** - 路由器的目标 IP 或 MAC 地址。
- **Login** - 用于身份验证的用户名。
- **Password** - 用于身份验证的密码。
- **Keep Password** - 如果未勾选，密码不会保存到列表。

#### 菜单项 {#menu-items}

- **File**
  - **New** - 在指定位置创建新的受管路由器列表
  - **Open** - 打开受管路由器列表文件
  - **Save As** - 将当前受管路由器列表保存到文件
  - **Exit** - 退出 WinBox loader

- **Tools**
  - **Advanced Mode** - 启用/禁用高级模式视图
  - **Import** - 导入已保存的会话文件
  - **Export** - 导出已保存的会话文件
  - **Move Session Folder** - 更改存储会话文件的路径
  - **Clear cache** - 清除 WinBox 缓存
  - **Check For Updates** - 检查 WinBox loader 的更新

### 高级模式 {#advanced-mode}

通过 *Tools → Advanced Mode* 启用**高级模式**后，会显示额外的 WinBox loader 参数：

![](/img/65025ace540ede2e.webp)

#### 按钮/复选框及其他字段 {#buttonscheck-boxes-and-other-fields-1}

按钮/复选框

- **浏览** - 浏览文件目录以查找特定会话。
- **保留密码** - 如果未勾选，则不会将密码保存到列表。
- **安全模式** - 如果勾选，WinBox 使用 DH-2048 进行密钥交换，并使用修改并加固的 RC4-drop3072 加密来保护会话。
- **自动保存会话** - 自动为已连接的设备保存会话。

字段：

- **Session** - 已保存的路由器会话。
- **Note** - 分配给已保存路由器条目的备注。
- **Group** - 已保存路由器条目所属的组。
- **RoMON Agent** - 从可用设备列表中选择 RoMON Agent。

:::danger
受管路由器列表是加密的，但**如果**没有为其设置主密码，它仍然可以被另一个 WinBox 加载！

:::

### 命令行 {#command-line}

可以使用命令行自动传递 connect to、user、password 和 session（WinBox 4 中为 "workspace"）参数：

```
winbox.exe [<connect-to> [<login> [<password>]] <session|workspace>]

```

例如（无密码）：

```
winbox.exe 10.5.101.1 admin "" "<own>"

```

这会以用户 "admin"、无密码连接到路由器 10.5.101.1，并使用 session|workspace "```<own>```"。

可以使用命令行自动传递 connect to、user 和 password 参数，以通过 RoMON 连接到路由器。在这种情况下，必须将 RoMON 代理保存在受管路由器列表中，以便 WinBox 知道此设备的用户名和密码：

```
winbox.exe --romon [<romon-agent> [<connect-to> [<login> [<password>]]] <session|workspace>]

```

例如（无密码）：

```
winbox.exe --romon 10.5.101.1 D4:CA:6D:E1:B5:7D admin "" "<own>"

```

通过 10.5.101.1 使用 RoMON 代理，以用户 "admin"、无密码连接到路由器 D4:CA:6D:E1:B5:7D，并应用名为 "```<own>```" 的 session|workspace。

### IPv6 连接 {#ipv6-connectivity}

WinBox 支持 IPv6 连接。要连接到路由器的 IPv6 地址，必须将其放在方括号中，与在 Web 浏览器中连接到 IPv6 服务器时相同。示例：

[db8::1]

连接到链路本地地址时，必须在 % 后输入接口索引：

[0:a00:27ff:fe70::e88c%2]

当需要将 WinBox 连接到非默认端口时，端口号设置在方括号之后：

WinBox 邻居发现能够发现启用 IPv6 的路由器。每个启用 IPv6 的路由器有两个条目，一个条目使用 IPv4 地址，另一个使用 IPv6 链路本地地址。你可以轻松选择要连接到哪一个。

### 在 macOS 上运行 WinBox {#run-winbox-on-macos}

从 macOS 10.15 Catalina 开始，Apple 已移除对 32 位应用程序的支持，这意味着不再可能在此操作系统中使用常规 Wine 和常规 WinBox。Wine 已提供适用于 macOS 的 64 位版本，MikroTik 也发布了特殊的 [WinBox64.exe](https://mt.lv/winbox64) 版本。

要运行 WinBox64，需要执行以下步骤：

1. 从 [Wine macOS builds 页面](https://github.com/Gcenx/macOS_Wine_builds/releases) 安装最新版 Wine（wine-devel-7.X-osx64.tar.xz），并确保已从 MikroTik 下载页面下载 [WinBox64.exe 可执行文件](https://mt.lv/winbox64)。
2. 使用“打开方式” > Wine64.app 启动 WinBox64.exe。

### 在 Linux 上运行 WinBox {#run-winbox-on-linux}

可以通过使用 Wine 模拟软件在 Linux 上运行 WinBox。请确保已安装 Microsoft 字体包，否则可能会看到失真。

## 接口概览 {#interface-overview}

WinBox 界面的设计目标是让大多数用户觉得直观。界面包括：

- 顶部的主工具栏，用户可在其中添加各种信息字段，例如 CPU 和内存使用率。
- 左侧的菜单栏 - 所有可用菜单和子菜单的列表。此列表会根据已安装的软件包而变化。例如，如果 IPv6 软件包被禁用，则不会显示 **IPv6** 菜单及其所有子菜单。
- 工作区 - 打开所有菜单窗口的区域。

![](/img/4364a0cd0d4b63d0.webp)

标题栏显示用于识别 WinBox 会话是与哪个路由器打开的信息。信息按以下格式显示：

```
[username]@[Router's IP or MAC] ( [RouterID] ) - WinBox [ROS version] on [RB model] ([platform])

```

从截图中可以看到，用户 **krisjanis** 已登录到 IPv4/IPv6 地址为 **[fe80::4e5e:cff:fef6:c0ab%3]** 的路由器。路由器 ID 为 **3C18-Krisjanis\_GW**，当前安装的 RouterOS 版本为 **v6.36rc6**，RouterBoard 为 **CCR1036-12G-4S**，平台为 **tile**。

主工具栏左侧有：

- **Undo**
- **Redo**
- **Safe Mode**
- 当前加载的会话

有关安全模式和撤销已执行操作的更多信息，请阅读[本文](../getting-started/configuration-management/index.md)。

右侧有：

- 一个指示器，显示 WinBox 会话是否使用加密。
- 以绿色条显示的 WinBox 流量指示器。
- 自定义信息字段，用户可以通过右键单击工具栏并从列表中选择可用信息字段来添加。

## 工作区与子窗口 {#work-area-and-child-windows}

WinBox 具有 MDI 界面，这意味着所有菜单配置（子）窗口都附加到主（父）WinBox 窗口，并显示在工作区中。

![](/img/f29744586ba9cec8.webp)

子窗口不能被拖出工作区。在截图中，**接口** 窗口被拖出可见工作区，底部出现了水平滚动条。如果任何窗口位于可见工作区边界之外，则会出现垂直和/或水平滚动条。

### 子窗口菜单栏 {#child-window-menu-bar}

每个子窗口都有自己的工具栏。大多数窗口具有相同的工具栏按钮集：

- ![](/img/883766965d361780.webp) **Add** - 向列表添加新项目。
- ![](/img/93d58ae7b5d3ef41.webp) **Remove** - 从列表中删除所选项目。
- ![](/img/75ed54893c8f6bc2.png) **Enable** - 启用所选项目（与 console 中的 **enable** 命令相同）。
- ![](/img/d7e0e7b8749d2475.png) **Disable** - 禁用所选项目（与 console 中的 **disable** 命令相同）。
- ![](/img/d5c7e3b62122a731.png) **Comment** - 添加或编辑注释。
- ![](/img/53e2f89ba914e7ef.png)  **Sort** - 允许你根据各种参数筛选项目。 [筛选显示的项目](#sorting-out-displayed-items)

几乎所有窗口的工具栏右侧都有一个快速搜索输入字段。在此字段中输入的任何文本都会在所有项目中搜索并高亮显示，如下面的截图所示。

![](/img/be58bd09dcf01eb9.webp)

请注意，在快速查找输入字段右侧有一个下拉框。对于当前打开的 (IP 路由) 窗口，此下拉框允许按路由表快速筛选项目。例如，如果选择了 **main**，则只列出主路由表中的路由。
所有防火墙窗口中也有类似的下拉框，用于按链快速筛选规则。

### 筛选显示的项目 {#sorting-out-displayed-items}

几乎每个窗口都有一个 **排序** 按钮。选择此按钮时，会出现多个选项，如下面的截图所示。

![](/img/e027e597d0b92801.webp)

该示例展示了如何快速筛选出位于 10.0.0.0/8 范围内的路由：

1. 按 **排序** 按钮。
2. 从第一个下拉框中选择 **Dst.Address**。
3. 从第二个下拉框中选择 **in**。 "in" 表示筛选器检查目标地址值是否在指定网络的范围内。
4. 输入用于比较值的网络（在我们的示例中输入 "10.0.0.0/8"）。
5. 这些按钮用于向筛选器堆栈中添加或移除另一个筛选器。
6. 按 **筛选** 按钮应用筛选器。

从截图中可以看到，WinBox 仅筛选出位于 10.0.0.0/8 范围内的路由。

比较运算符（截图中编号 **3**）可能因窗口而异。例如，"IP Route" 窗口只有两个：**is** 和 **in**。其他窗口可能具有 "is not"、"contains"、"contains not" 等运算符。

WinBox 允许构建筛选器堆栈。例如，如果需要按目标地址和网关筛选，则：

- 按上一示例所述设置第一个筛选器。
- 按 **[+]** 按钮在堆栈中添加另一个筛选器栏。
- 设置第二个筛选器以按网关筛选。
- 按 **筛选** 按钮应用筛选器。

也可以按 **[-]** 按钮从堆栈中移除不必要的筛选器。

### 自定义显示的列列表 {#customizing-list-of-displayed-columns}

默认情况下，WinBox 显示最常用的参数。但是，有时需要查看其他参数，例如 "BGP AS Path" 或其他 BGP 属性，以监控路由是否被正确选择。

WinBox 允许你为每个单独窗口自定义显示的列。例如，要添加 BGP AS 路径列：

- 选择列标题右侧的小箭头按钮（**1**），或右键单击路由列表。
- 从弹出菜单转到 **显示列**（**2**），然后从子菜单中选择所需的列，在我们的例子中选择 **BGP AS Path**（**3**）。

![](/img/a5ce6d59141eb183.webp)

对窗口布局所做的更改会被保存，下次打开 WinBox 时将应用相同的列顺序和大小。

#### 详细模式 {#detail-mode}

还可以启用 **Detail mode**。在此模式下，所有参数都显示在列中，第一列是参数名称，第二列是参数值。

要启用详细模式，请右键单击项目列表，然后从弹出菜单中选择 **详细模式**

![](/img/8cf7d463cef428ca.webp)

#### 分类视图 {#category-view}

可以按分类列出项目。在此模式下，所有项目按字母顺序或其他分类分组。例如，如果按名称排序，项目可以按字母顺序分类；项目也可以像下面的截图那样按类型分类。

要启用分类视图，请右键单击项目列表，然后从弹出菜单中选择 **显示分类**。

![](/img/2d2eb1dc56fd6db0.webp)

### 拖放 {#drag--drop}

可以使用 WinBox 拖放功能向路由器上传文件或从路由器下载文件。还可以右键单击文件并选择 "Download" 来下载文件。

:::info
如果 WinBox 在 Linux 上使用 wine4 运行，则拖放功能可用。两个 WinBox 窗口之间的拖放可能会失败。

:::

### 流量监控 {#traffic-monitoring}

WinBox 可用作实时监控每个接口、队列或防火墙规则流量的工具。以下截图显示了以太网流量监控图。

![](/img/48c48d00be75a9d1.webp)

### 项目复制 {#item-copy}

这展示了在 WinBox 中复制项目是多么容易。在此示例中，使用复制按钮将动态 PPPoE 服务器接口变为静态接口。

此图显示了初始状态。如你所见，DR 表示 "D"，即 Dynamic：

![](/img/19ac0a67df718be8.webp)

双击接口并选择复制：

![](/img/79bc5f683b6c8c5e.webp)

会出现新的接口窗口，并自动创建新名称（在本例中为 pppoe-in1）。

![](/img/28de9385ebb17cb8.webp)

在此 Down/Up 事件之后，此接口变为静态：

![](/img/2ae520a470539e86.webp)

## 传输设置 {#transferring-settings}

- 受管路由器传输——在 File 菜单中，使用 Save As 和 Open 功能将受管路由器列表保存到文件，并在新工作站上再次打开它。

- 路由器会话传输——在 Tools 菜单中，使用 Export 和 Import 功能将现有会话保存到文件，并在新工作站上再次导入它们。

## WinBox v3 键盘快捷键 {#winbox-v3-keyboard-shortcuts}

| 快捷键 | 描述 |
| :-- | :-- |
| <kbd>Control</kbd>+<kbd>F</kbd> | 查找 |
| <kbd>Control</kbd>+<kbd>G</kbd> | 查找下一个 |
| <kbd>F3</kbd> | 查找 / 查找下一个 |
| <kbd>Control</kbd>+<kbd>M</kbd> | 添加或编辑注释 |
| <kbd>Control</kbd>+<kbd>E</kbd> or <kbd>Num+</kbd> | 启用所选设置 |
| <kbd>Control</kbd>+<kbd>D</kbd> or <kbd>Num-</kbd> | 禁用所选设置 |
| <kbd>Control</kbd>+<kbd>+</kbd> | 放大 WinBox |
| <kbd>Control</kbd>+<kbd>-</kbd> | 缩小 WinBox |
| <kbd>Tab</kbd> | 选择下一个控件 |
| <kbd>Tab</kbd>+<kbd>Shift</kbd> | 选择上一个控件 |
| <kbd>Space</kbd> | 选择聚焦的控件 |
| <kbd>F4</kbd> or <kbd>Esc</kbd> | 关闭窗口 |
| <kbd>F6</kbd> | 聚焦上一个窗口 |
| <kbd>F6</kbd>+<kbd>Shift</kbd> | 聚焦下一个窗口 |
| <kbd>Insert</kbd> | 向列表中添加新条目 |
| <kbd>Delete</kbd> | 从列表中删除条目 |

## WinBox v4 键盘快捷键 {#winbox-v4-keyboard-shortcuts}

| 快捷键 | 描述 |
| :-- | :-- |
| <kbd>Control</kbd>+<kbd>E</kbd> | 启用所选设置 |
| <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> | 禁用所选设置 |
| <kbd>Control/CMD</kbd>+<kbd>+</kbd> | 放大 WinBox |
| <kbd>Control/CMD</kbd>+<kbd>-</kbd> | 缩小 WinBox |
| <kbd>Control/CMD</kbd>+<kbd>0</kbd> | 重置缩放 |
| <kbd>Control</kbd>+<kbd>Tab</kbd> | 选择下一个选项卡 |
| <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd> | 选择上一个选项卡 |
| <kbd>Tab</kbd> | 选择下一个控件 |
| <kbd>Shift</kbd>+<kbd>Tab</kbd> | 选择上一个控件 |
| <kbd>Space</kbd> | 选择聚焦的控件 |
| <kbd>Control</kbd>+<kbd>F4</kbd> or <kbd>Alt</kbd>/<kbd>Cmd</kbd>+<kbd>W</kbd> | 关闭窗口 |
| <kbd>Alt</kbd>+<kbd>A</kbd> / <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | 聚焦上一个窗口 |
| <kbd>Alt</kbd>/<kbd>Cmd</kbd>+<kbd>S</kbd> | 聚焦下一个窗口 |
| <kbd>Delete</kbd> | 从列表中删除条目 |
| <kbd>Alt</kbd>/<kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>F</kbd> | 全局菜单搜索 |
| <kbd>Alt</kbd>/<kbd>Cmd</kbd>+<kbd>T</kbd> | 打开新的终端窗口 |

## 故障排除 {#troubleshooting}

### WinBox 无法连接到路由器的 IP 地址，设备未出现在邻居列表中 {#winbox-cannot-connect-to-the-routers-ip-address-devices-do-not-show-up-in-the-neighbors-list}

确保 Windows 防火墙设置为允许 WinBox 连接通过 Windows 防火墙中的专用和/或公用网络接口。可以在 *Control Panel\System and Security\Windows Defender Firewall\Allowed applications* 中更改。或者禁用 Windows 防火墙。

### 连接到路由器的 MAC 地址时，我收到错误“(port 20561) timed out” {#i-get-an-error-port-20561-timed-out-when-connecting-to-the-routers-mac-address}

如果文件和打印机共享被禁用，Windows (7/8) 不允许 MAC 连接。

### 我无法在 WinBox IPv4 邻居列表中找到我的设备，或者 MAC 连接失败并显示“ERROR could not connect to XX-XX-XX-XX-XX-XX” {#i-cant-find-my-device-in-winbox-ipv4-neighbors-list-or-mac-connection-fails-with-error-could-not-connect-to-xx-xx-xx-xx-xx-xx}

大多数网络驱动程序只有在主机设备具有 IP 配置时才会启用 IP 协议栈。请在主机设备上设置 IPv4 配置。

*有时设备会因为缓存而被发现，但 MAC 连接仍然失败并显示“ERROR: could not connect to XX:XX:XX:XX:XX:XX”。*

:::warning
WinBox MAC-ADDRESS 连接要求 MTU 值设置为 1500，且不分片。其他值可能导致性能不佳——可能会发生连接丢失。

:::
