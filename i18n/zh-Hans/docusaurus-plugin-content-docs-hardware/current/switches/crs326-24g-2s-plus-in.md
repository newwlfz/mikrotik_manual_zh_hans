---
title: "CRS326-24G-2S+IN"
slug: /crs326-24g-2s-plus-in
source: https://manual.mikrotik.com/hardware/crs326-24g-2s-plus-in
captured_at: '2026-11-04T09:46:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/031cab841274d763.jpg)

## [CRS326-24G-2S+IN](https://mikrotik.com/product/crs326_24g_2s_in) {#crs326-24g-2sin}

24 个千兆端口、2 个 SFP+ 插槽和台式外壳——为您的家庭带来服务器机房级的性能！请查看 [CRS326-24G-2S+IN 产品页面](https://mikrotik.com/product/crs326_24g_2s_in) 了解完整规格和宣传册。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能对人员造成危险情况并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，它们可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 设备发生故障时，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（某些型号请在贴纸上查看用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单并重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可放置在桌面上。

本设备不具备防水保护，请确保将设备放置在干燥通风的环境中。我们建议我们的设备使用 Cat6 线缆。本设备的安装和配置应由具备资质的人员完成。

## 供电 {#powering}

本设备可通过以下方式供电：

- 以太网端口接受被动 PoE 10-30 V DC ⎓。
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心针为正极）接受 10-30 V DC⎓。最大负载下的功耗可达 24 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。可以使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（某些型号请在贴纸上查看用户和无线密码）。

本设备配有一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。为了恢复目的，可以从网络重新安装设备，请参阅复位按钮一节。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有描述。

本设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换操作）。默认情况下，设备启动进入 RouterOS，但您可以按以下方式切换到另一个操作系统：

- 从 SwOS：进入 **System** 菜单，点击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单选择操作系统并配置其他启动选项。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS326‑24G‑2S+IN</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX3236, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX3236</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网（RJ45）**</td><td>24</td></tr><tr><td>**10G SFP+ 端口**</td><td>2</td></tr><tr><td>**串行控制台（RJ45）**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS（license level 5）/ SwOS（Dual boot）</td></tr><tr><td>**工作温度**</td><td>‑40 °C 至 +60 °C</td></tr><tr><td>**外壳尺寸**</td><td>285 × 144 × 44 mm</td></tr></tbody></table>

请访问 wiki 页面查看 MikroTik SFP 模块兼容性表：MikroTik wired interface compatibility

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，以将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，以清除所有配置和默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种选项，只要在设备接通电源之前按住按钮，系统就会加载备份的 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

![](/img/517cd255eb752a23.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。
