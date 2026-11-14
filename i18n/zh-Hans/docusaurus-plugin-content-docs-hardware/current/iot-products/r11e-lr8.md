---
title: "R11e-LR8"
slug: /r11e-lr8
source: https://manual.mikrotik.com/hardware/r11e-lr8
captured_at: '2026-11-04T09:58:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/r11e-lr8-d0ac4256b0bb1ec57c362648c9c7ec3a.pdf" target="_blank" rel="noopener">PDF 文件</a>。

R11e-LR8 - LR mPCIe 网关模块。它可以集成到带 mPCIe 插槽的 RouterBOARD 产品中。需要在 RouterOS 中安装 LR 软件包才能进行配置。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或一般公众的距离不得小于 20 厘米。

## 规格 {#specifications}

低功耗，采用 mini PCIe 接口，用于长距离数据传输，发射：

- 接口 – Mini-PCIe；
- 工作温度 -40 / +70；
- 支持 Class A 和 C；
- 频率 - 863-870MHz (EU)；
- 射频输出功率 - 862-870MHz (EU) @ 14dBm；
- *最大接收灵敏度 - 137 dB @ SF12，取决于所使用的天线；*
- *最大功耗 2 W。*

## 将模块安装到您的设备中 {#installing-the-module-in-your-device}

R11e-LR8 供专业使用。每张卡都采用 ESD 保护包装。处理电气设备时，请遵守以下安全预防措施：

-

拆包和处理电气元件时，请使用手腕接地带，以避免静电放电（ESD）损坏；

-

拆包后请将卡放在防静电垫上；

-

安装时请确保没有可能损坏或触碰 PCB 板的物体；

-

可以使用 PCB 板上出厂提供的螺丝孔将卡安装到您想要的设备中；*图片仅用于说明目的，设备配置和 miniPCIe 卡的位置可能有所不同。*

-

找到设备上的 miniPCIe 插槽；

-

拧下两颗出厂时已安装的螺丝；

![](/img/154687456007685e.webp)

![](/img/fa01a2e5438f417c.webp)

- 可选地，您可以将散热垫放在卡下方使用，散热垫不包含在包装中；
- 将模块安装到 miniPCIe 插槽，并用之前拆下的螺丝固定。拧紧扭矩为 0,3 Nm。

![](/img/92b6604db87307db.webp)

## 连接到天线 {#connecting-to-the-antenna}

如果您的设备没有内置天线，可以通过添加电缆连接器连接到外部天线，产品代码 — [ACSMAUFL](https://mikrotik.com/product/acsmaufl)。请在设备关闭时连接和断开天线！

- 将天线电缆连接到模块上的连接器：

![](/img/32c6221fae70fa2d.webp)

在户外安装时，请确保设备外壳防水且专为户外使用而设计。本设备的 IP 等级为 IP0。*本设备的安装和配置应由合格人员完成。*

## RouterOS 配置 {#configuration-for-routeros}

要设置 LR 的配置，请连接到设备并使用网页浏览器、WinBox 或移动应用程序登录。按以下两个简单步骤操作：**第一步：**

-

登录后，将选中 Quick Set，请切换到屏幕右侧的 WebFig。如果通过移动应用程序进行配置，则点击屏幕右侧的齿轮图标以打开高级菜单。

-

在左侧菜单中，找到并选择 "Lora" 部分。

-

在新打开的窗口中选择 Servers 选项卡。

-

点击 + 添加新的服务器配置。

-

将出现一个新窗口，您需要输入：名称：（服务器名称）地址：（服务器地址）上行端口：（通常为 1700）下行端口：（通常为 1700）

-

点击 OK 保存。**第二步：**

-

在之前的窗口中选择 Device 选项卡。

-

双击或点击该行进行配置。

-

在下拉菜单中选择之前输入的网络。

-

点击 Enable 按钮以启用网关。

-

点击 OK 保存。

-

配置完成。

## 规格 {#specifications-1}

该模块可以安装在 miniPCIe 转 USB 适配器上，并可在我们任何带 USB 插槽且已安装 Lora 软件包的设备中使用。

**要在其他设备中使用该模块，需要来自 Semtech 的 packet forwarder：** [packet_forwarder](https://github.com/Lora-net/packet_forwarder)

## 引脚定义 {#pinout}

<table><thead><tr><th>引脚编号</th><th>数值</th></tr></thead><tbody><tr><td>2</td><td>3V3</td></tr><tr><td>4</td><td>GND</td></tr><tr><td>9</td><td>GND</td></tr><tr><td>15</td><td>GND</td></tr><tr><td>18</td><td>GND</td></tr><tr><td>21</td><td>GND</td></tr><tr><td>22</td><td>PERST#（RouterOS 中未使用）</td></tr><tr><td>24</td><td>3V3</td></tr><tr><td>26</td><td>GND</td></tr><tr><td>27</td><td>GND</td></tr><tr><td>29</td><td>GND</td></tr><tr><td>34</td><td>GND</td></tr><tr><td>35</td><td>GND</td></tr><tr><td>36</td><td>USB_D-</td></tr><tr><td>37</td><td>GND</td></tr><tr><td>38</td><td>USB_D+</td></tr><tr><td>39</td><td>3V3</td></tr><tr><td>40</td><td>GND</td></tr><tr><td>41</td><td>3V3</td></tr><tr><td>43</td><td>GND</td></tr><tr><td>50</td><td>GND</td></tr><tr><td>51</td><td>保留</td></tr><tr><td>52</td><td>3V3</td></tr></tbody></table>

## 操作系统支持 {#operating-system-support}

该模块支持 RouterOS 软件版本 v6 和 v7。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所进行处置。请了解您所在地区将设备正确运输到指定处置场所的程序。

## UKCA 标志 {#ukca-marking}

![](/img/387853c20d5a4c82.gif)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期的信息标注在其标签上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），接下来的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（2013 年 1 月 3 日在乌克兰司法部注册，编号 57/22589）所规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 R11e-LR8 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### LR {#lr}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>863 - 870 MHz / 14 dBm</th></tr></thead></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更多详细信息，请参阅上文的符合性声明。
