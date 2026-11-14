---
title: "R11e-LR9"
slug: /r11e-lr9
source: https://manual.mikrotik.com/hardware/r11e-lr9
captured_at: '2026-11-04T09:59:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/r11e-lr9-43501007f1481be9eb0a4d0e5cd6fec0.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/154687456007685e.webp)

R11e-LR9 - LR mPCIe 网关模块。它可以集成到带 mPCIe 插槽的 RouterBOARD 产品中。需要在 RouterOS 中安装 Lora 软件包才能进行配置。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 客户有责任遵守当地国家的法规，包括在法律允许的频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 针对非受控环境规定的射频辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业使用者或公众的距离不得小于 29 厘米。

## 规格 {#specifications}

低功耗，采用 mini PCIe 接口，用于长距离数据传输，发射：

- 接口 – Mini-PCIe；
- 工作温度 -40 / +70；
- 支持 Class A 和 C；
- 频率 - 902-928MHz (US)；
- 射频输出功率 - 902-928MHz (US) @ 20dBm；
- *接收最大灵敏度 - 137 dB @ SF12，取决于所使用的天线；*
- *最大功耗 2 W。*

## 在您的设备中安装模块 {#installing-the-module-in-your-device}

R11e-LR9 供专业使用。每块卡都采用 ESD 防护包装。在处理电气设备时，请遵守以下安全注意事项：

-

拆包和处理电气元件时，请使用腕部接地带，以避免静电放电（ESD）损坏；

-

拆包后，请将卡放在防静电垫上；

-

安装时，请确保没有可能损坏或接触 PCB 板的物体；

-

可使用 PCB 板上出厂提供的螺丝孔将卡安装到您所需的设备中；*图片仅用于示意，设备配置和 miniPCIe 卡的安装位置可能有所不同。*

-

在您的设备上找到 miniPCIe 插槽；

-

拧下两颗出厂时安装的螺丝；

![](/img/201e1c747cc5cacc.webp)

![](/img/fa01a2e5438f417c.webp)

- 您也可以选择在卡下方放置导热垫，导热垫不包含在包装内；
- 将模块安装到 miniPCIe 插槽中，并用先前拆下的螺丝固定。拧紧扭矩为 0,3 Nm。

![](/img/92b6604db87307db.webp)

## 连接天线 {#connecting-to-the-antenna}

如果您的设备没有内置天线，可以通过添加线缆连接器（产品代码 — [ACSMAUFL](https://mikrotik.com/product/acsmaufl)）来连接外置天线。请在设备关闭时连接和断开天线！

![](/img/3d8604c8a69b38c9.webp)

- 将天线线缆连接到模块上的连接器：

在户外安装时，请确保设备外壳防水且专为户外使用而设计。本设备的 IP 等级为 IP0。*本设备的安装和配置应由合格人员完成。*

## RouterOS 配置 {#configuration-for-routeros}

要为 LR 设置配置，请连接到设备并使用 Web 浏览器、WinBox 或移动应用程序登录。只需两个简单步骤：**第一步：**

-

登录后，将默认选中 Quick Set，请切换到屏幕右侧的 WebFig。如果是通过移动应用程序进行配置，请点击屏幕右侧的齿轮图标以打开高级菜单。

-

在左侧菜单中，找到并选择 "Lora" 选项。

-

在新打开的窗口中，选择 ers 选项卡。

-

点击 + 添加 w 服务器配置。

-

将出现一个新窗口，您需要输入：Name：（服务器名称）Address：（服务器地址）Up port：（通常为 1700）Down port：（通常为 1700）

-

点击 OK 保存。**第二步：**

-

在上一个窗口中选择 Device 选项卡。

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

该模块可安装在 miniPCIe 转 USB 适配器上，并在我们任何带 USB 插槽且已安装 Lora 软件包的设备中使用。

**要在其他设备中使用它，需要 Semtech 的 packet forwarder：** [packet_forwarder](https://github.com/Lora-net/packet_forwarder)

## 引脚定义 {#pinout}

<table><thead><tr><th>引脚编号</th><th>值</th></tr></thead><tbody><tr><td>2</td><td>3V3</td></tr><tr><td>4</td><td>GND</td></tr><tr><td>9</td><td>GND</td></tr><tr><td>15</td><td>GND</td></tr><tr><td>18</td><td>GND</td></tr><tr><td>21</td><td>GND</td></tr><tr><td>22</td><td>PERST#（在 RouterOS 中未使用）</td></tr><tr><td>24</td><td>3V3</td></tr><tr><td>26</td><td>GND</td></tr><tr><td>27</td><td>GND</td></tr><tr><td>29</td><td>GND</td></tr><tr><td>34</td><td>GND</td></tr><tr><td>35</td><td>GND</td></tr><tr><td>36</td><td>USB_D-</td></tr><tr><td>37</td><td>GND</td></tr><tr><td>38</td><td>USB_D+</td></tr><tr><td>39</td><td>3V3</td></tr><tr><td>40</td><td>GND</td></tr><tr><td>41</td><td>3V3</td></tr><tr><td>43</td><td>GND</td></tr><tr><td>50</td><td>GND</td></tr><tr><td>51</td><td>保留</td></tr><tr><td>52</td><td>3V3</td></tr></tbody></table>

## 操作系统支持 {#operating-system-support}

该模块支持 RouterOS 软件版本 v6 和 v7。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处理场所。请了解将设备妥善运送至您所在地区指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装环境中的有害干扰提供合理防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），建议用户尝试通过以下措施之一来消除干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须遵守以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同运行。

**重要：射频辐射暴露。**

天线与职业使用者之间必须保持至少 0,29m 的距离，与公众之间必须保持 0,64m 的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的射频辐射暴露限值。

**天线安装警告**

安装人员有责任确保在美国（或适用 FCC 规则的地方）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率电平。

## OEM 声明 {#oem-statement}

本模块仅供 OEM 安装使用。因此，OEM 集成商有责任确保最终用户未获得拆卸、安装或改装该模块的手册说明。本模块仅限于在移动或固定应用中安装。OEM 集成商可使用增益等于或小于本文档列表中所示值的天线（有关此主题的更多信息，请参阅 47 CFR 第 15.204(c)(4) 段）。MikroTik OEM 射频模块符合 FCC 规则和法规第 15 部分。受让人将向主机设备制造商提供指导，以确保符合第 15 部分 B 子部分的要求。OEM 模块已获得 FCC 认证，可用于其他产品而无需进一步认证（依据 FCC 第 2.1091 节）。对于其他运行配置，包括涉及 47CFR 第 2.1093 段的便携式配置以及不同的天线配置，需要单独批准。OEM 必须遵守所有 47CFR 标签说明以及成品的要求。未经 MikroTik 明确批准的更改或修改可能会使 OEM 失去安装或操作本设备的权限。OEM 必须测试其最终产品，以符合非故意辐射体要求（FCC 第 15.107 和 15.109 节），然后才能声明其最终产品符合 FCC 规则第 15 部分。**警告：** OEM 必须确保满足 FCC 标签要求。这包括在 OEM 外壳外侧贴上一个清晰可见的标签，标明本产品适用的 MikroTik OEM 射频模块 FCC 标识符，以及下文列出的任何其他必需的 FCC 声明。本内含设备符合 FCC 规则和法规 47CFR 第 15 C 段。操作须遵守以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。标签和文字信息应使用足够大的字号，以便与设备及标签的尺寸相称且易于辨认。**警告：** 本设备已使用 MMCX 连接器和下表所列天线进行测试。集成到 OEM 产品中时，这些固定天线需要专业安装。防止最终用户将其更换为不合规的天线。在符合认证要求的情况下，可使用与上述类型相同且增益更低的天线。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须遵守以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, mźme si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## LE-LAN 设备限制 {#le-lan-device-restriction}

LE-LAN 设备在 5150-5250 MHz 频段仅限室内使用。但是，由车辆制造商安装在车辆中的原始设备制造商（OEM）设备是允许的；还应告知用户，大功率雷达被分配为 5250-5350 MHz 和 5650-5850 MHz 频段的主要用户（即优先用户），这些雷达可能会对 LE-LAN 设备造成干扰和/或损坏。les dispositifs fonctionnant dans la bande de 5 150 ą 5 250 MHz sont réservés uniquement pour une utilisation ą l'intérieur afin de réduire les risques de brouillage préjudiciable aux systčmes de satellites mobiles utilisant les mźmes canaux Les utilisateurs devraient aussi źtre avisés, d'une part, que les utilisateurs de radars de haute puissance sont désignés utilisateurs principaux (c.-ą-d., qu'ils ont la priorité) des bandes de 5 250 ą 5 350 MHz et de 5 650 ą 5 850 MHz et, d'autre part, que ces radars pourraient causer du brouillage et/ou des dommages aux dispositifs de RL-EL This radio transmitter (identify the device by certification number or model number if Category II) has been approved by Industry Canada to operate with the antenna types listed below with the maximum permissible gain indicated. Antenna types not included in this list, having a gain greater than the maximum gain indicated for that type, are strictly prohibited for use with this device.
