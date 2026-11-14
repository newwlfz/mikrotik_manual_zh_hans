---
title: "R11e-LR9G"
slug: /r11e-lr9g
source: https://manual.mikrotik.com/hardware/r11e-lr9g
captured_at: '2026-11-04T09:59:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/r11e-lr9g-53967cbc5df54a2266a0515317a062b3.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/271bd67e61e17ec9.jpg)

R11e-LR9G - LR mPCIe 网关模块。它可以集成到带有 mPCIe 插槽的 RouterBOARD 产品中。需要在 RouterOS 中安装 LR 软件包才能进行配置。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品不带外壳，需由经过培训的合格人员安装到 MikroTik 主机设备中。有关安装说明，请参阅所选 MikroTik 主机产品的快速指南。请勿尝试拆卸、修理或改装本设备。
- 请在开始安装前仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 请让这张 mini PCIe 卡远离水、火、潮湿或高温环境。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应与您的身体、职业使用者或公众保持不少于 20 厘米的距离。

## 规格 {#specifications}

低功耗，采用 mini PCIe 接口，适用于远距离数据传输，发射：

- 接口 – Mini-PCIe；
- 工作温度 -40 / +70；
- 支持 Class A 和 C；
- 频率 - 902-928MHz（美国）；
- 射频输出功率 - 902-928MHz（美国）最高 27dBm；
- *最大接收灵敏度 - 141 dB @ SF12，取决于所使用的天线；*
- *最大功耗 1.3 W。*
- GPS 接收器 U.FL 插槽（用于连接外部 GPS 天线）。支持 GPS（不支持 GLONASS、BeiDou、Galileo）。

## 将模块安装到您的设备中 {#installing-the-module-in-your-device}

R11e-LR9G 供专业使用。每张卡均采用 ESD 防护包装。处理电气设备时，请遵守以下安全预防措施：

-

拆包和处理电气元件时，请使用腕部接地带，以避免静电放电（ESD）损坏；

-

拆包后，请将卡放置在防静电垫上；

-

安装时，请确保没有可能损坏或接触 PCB 板的物体；

-

可以使用 PCB 板上出厂预留的螺丝孔，将卡安装到您所需的设备中；*图片仅用于示意，设备配置和 miniPCIe 卡的位置可能有所不同。*

-

在您的设备上找到 miniPCIe 插槽；

-

拧下两颗出厂时已安装的螺丝；

![](/img/201e1c747cc5cacc.webp)

![](/img/fa01a2e5438f417c.webp)

- 您也可以选用导热垫，将其放置在卡的下方，导热垫不包含在包装内；
- 将模块安装到 miniPCIe 插槽中，并用之前拆下的螺丝固定。拧紧力矩为 0,3 Nm。

![](/img/92b6604db87307db.webp)

## 连接到天线 {#connecting-to-the-antenna}

如果您的设备没有内置天线，可以通过添加线缆转接头连接到外部天线，产品型号 — [ACSMAUFL](https://mikrotik.com/product/acsmaufl)。请在设备关闭时连接和断开天线！

将 LoRa 天线线缆连接到标有 "RFIO" 的连接器以使用 LoRa，将 GPS 天线线缆连接到标有 "GPS" 的连接器以使用 GPS：

![](/img/6c286454f503a4a7.webp)

在户外安装时，请确保设备外壳防水且专为户外使用而设计。本设备的 IP 防护等级为 IP0。*本设备的安装和配置应由合格人员完成。*

## RouterOS 配置 {#configuration-for-routeros}

要为 LR 设置配置，请连接到设备并使用网页浏览器、WinBox 或移动应用程序登录。按照以下两个简单步骤操作：**第一步：**

-

登录后，将默认选中 Quick Set，请切换到屏幕右侧的 WebFig。如果通过移动应用程序进行配置，请点击屏幕右侧的齿轮图标以打开高级菜单。

-

在左侧菜单中找到并选择 "IoT&gt;Lora" 部分。

-

在 newly 打开的窗口中选择 Servers 选项卡。

-

点击 + 添加新的服务器配置。

-

将出现一个新窗口，您需要输入：Name：（服务器名称）Address：（服务器地址）Up port：（用于 LoRa UDP，1700）Down port：（用于 LoRa UDP，1700）

-

点击 OK 保存。**第二步：**

-

在之前的窗口中选择 Device 选项卡。

-

双击或点按该行进行配置。

-

在下拉菜单中选择先前输入的网络。

-

点击 Enable 按钮以启用网关。

-

点击 OK 保存。

-

配置完成。

## 规格 {#specifications-1}

该模块可以安装到 miniPCIe 转 USB 适配器上，并用于我们任何带有 USB 插槽且已安装 Lora 软件包的设备中。

**要在其他设备中使用该模块，需要 Semtech 的 packet forwarder：** [packet_forwarder](https://github.com/Lora-net/packet_forwarder)

此警告仅适用于已预装在 MikroTik 网关设备（如 WAP LR9）中的 mPCIe 卡。这里需要特别注意的是，必须使用 **引脚 39** 和 **引脚 41**。如果您想在其他地方使用该卡，请注意某些 USB 转 mPCIe 适配器并未连接上述引脚，缺少这些引脚时 LoRa 卡将无法工作。有关更详细的 **引脚定义**，请查看下面的章节。

## 引脚定义 {#pinout}

![](/img/6df4c73924b16c0d.webp)

## 框图 {#block-diagram}

![](/img/584644264f82120d.webp)

## 操作系统支持 {#operating-system-support}

该模块支持 RouterOS 软件版本 v7。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备妥善运送至指定处置场所的相关程序。
