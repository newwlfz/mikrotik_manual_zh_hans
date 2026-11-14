---
title: "Chateau 5G ax"
slug: /chateau-5g-ax
source: https://manual.mikrotik.com/hardware/chateau-5g-ax
captured_at: '2026-11-04T09:45:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/3b205728dd9cd451.webp)

## [Chateau 5G ax](https://mikrotik.com/product/chateau_5g_ax) (S53UG+M-5HaxD2HaxD-TC&RG502Q-EA) {#chateau-5g-ax-s53ugm-5haxd2haxd-tcrg502q-ea}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。有关完整规格和手册，请参见 [Chateau 5G ax 产品页面](https://mikrotik.com/product/chateau_5g_ax)。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将外置天线连接到 SMA 接口（天线随包装提供，参见“(link)”）；
- 将 micro SIM 卡插入设备下方的卡槽中；

![](/img/9619076cdc698366.webp)

- 将您的计算机连接到其中一个以太网端口；
- 将电源适配器连接到 DC 插孔；
- 设备通电且 PC 已连接到设备后，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 用户名：a*dmin，**密码请查看贴纸**；*
- 您应点击右侧的 "Check for updates" 按钮，将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性；必须插入有效的 SIM 卡；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 找到您的产品。所需软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 (**WebFig**) (**Files**) 菜单并重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 要个性化您的无线网络，可在 "Network Name" 字段中更改 SSID；
- 在屏幕左侧的 "Country" 字段中选择您所在的国家/地区，以应用国家/地区法规设置；
- 在 "WiFi Password" 字段中设置无线网络密码，密码长度至少为八个字符；
- 在右下方的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，下次登录时将使用该密码；
- 选择 "Apply Configuration" 保存更改。

## 使用移动应用连接 {#connecting-with-a-mobile-app}

使用智能手机通过 WiFi 访问路由器。

![](/img/9bcba09a7b6a0d53.webp)

- 插入 SIM 卡并给设备通电。
- 扫描二维码并选择您首选的操作系统。
- 安装并打开该应用程序。
- 选择 Connect，通过无线网络建立与设备的连接（请查看贴纸上的无线密码）。
- 用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。
- 选择 Quick Setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可用于完整配置所有必要的设置。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/448fe884f3fe7820.webp)

- (link)DC 插孔 2.0 mm。
- 五个千兆端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。
- USB type-A。
- (link) 用于 Micro sim 卡。
- 模式按钮。
- 带天线的型号不提供外置 (link) 的盖板。
- WPS (link)
- 产品代码 S53UG+M-5HaxD2HaxD-TC&RG502Q-EA。
- CPU 四核 IPQ-6010 1.8 GHz。
- CPU 架构 ARM 64bit。
- RAM 大小 1 GB。
- RAM 类型 DDR3L。
- 存储 128 MB，NAND。
- 1G 以太网端口数量 4。
- 2.5G 以太网端口数量 1。
- Micro SIM 卡槽 1。
- USB 1 个 USB 3.0 type A。
- M.2 插槽数量 1。
- 交换芯片型号 IPQ-6010。
- 无线接口型号 QCN-5022 (2.4 GHz)、QCN-5052 (5 GHz)。
- 无线 2.4 GHz 802.11ax 双链、5 GHz 802.11ax 双链。
- LTE 类别 20（下行 2.0 Gbps，上行 200 Mbps）。
- LTE 调制解调器 R11mL-RG502Q-EA。
- TAC 86073604。
- 5G SA 类别 下行 4.2 Gbps，上行 900 Mbps。
- 5G NSA 类别 下行 5.0 Gbps，上行 650 Mbps。
- 3G 类别 R8（下行 42.2Mbps，上行 5.76Mbps）。
- MIMO 下行 4x4 (5G SA FDD)、4x4 (5G NSA FDD)、4x4 (LTE FDD)。
- MIMO 上行 2x2 (5G SA FDD)、1x1 (5G NSA FDD)、1x1 (LTE FDD)。
- 5G SA FDD 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 7 (2600MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz)。
- 5G SA TDD 频段 38 (2600MHz) / 40 (2300MHz) / 41 (2500MHz) / 77 (3700 MHz) / 78 (3500 MHz) / 79 (4700 MHz)。
- 5G NSA FDD 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 7 (2600MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz)。
- 5G NSA TDD 频段 38 (2600MHz) / 40 (2300MHz) / 41 (2500MHz) / 77 (3700 MHz) / 78 (3500 MHz) / 79 (4700 MHz)。
- LTE FDD 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 7 (2600MHz) / 8 (900 MHz) / 18 (800 MHz) / 19 (800 MHz) / 20 (800 MHz) / 26 (850MHz) / 28 (700 MHz) / 32 (1500 MHz)。
- LTE TDD 频段 34 (2000 MHz) / 38 (2600MHz) / 39 (1900MHz) / 40 (2300MHz) / 41 (2500MHz) / 42 (3500MHz) / 43 (3700MHz)。
- 3G 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 6 (850 MHz) / 8 (900MHz) / 19 (800 MHz)。
- 尺寸 240 x 156 x 44 mm。
- 操作系统 RouterOS v7，许可证级别 4。
- 工作温度 -40°C 至 +70°C。

## 安装 {#mounting}

本设备设计用于室内，可放置在桌面上使用。

您应使用 CAT5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您身体之间的距离至少为 20 cm。

## 供电 {#powering}

- DC 输入数量 1。
- DC 插孔输入电压 12-28 V。
- 电源适配器标称电压 24 V。
- 电源适配器标称电流 1.2 A。
- 无附件时的最大功耗为 16 W。
- 最大功耗 19 W。

## 配置 {#configuration}

您应经常检查更新，以获取 RouterOS 软件的最新更新，从而确保最佳性能和稳定性。除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以引导设备进行重装，请参见 (link) 章节。

## 模式按钮 {#mode-button}

模式按钮位于设备背面右侧。模式按钮的默认配置为深色模式——关闭所有 LED。可在 RouterOS 中配置该按钮以运行任何用户指定的脚本。

## 同步按钮 {#sync-button}

同步按钮位于设备顶部。如果在无线接口上配置了 WPS Sync 按钮，可用于连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，即可为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED。
- 信号强度。蜂窝连接技术依据系统 LED 颜色判断：红色：GSM 黄色：3G 蓝色：LTE 绿色：5G NSA 紫色：5G SA

当 LTE 未连接到网络时，系统 LED 会闪烁红色，表示 LTE 连接存在某些问题。如果 LTE 接口被有意禁用（未使用），系统 LED 将发出蓝光。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接卡使用。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动过程中按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 要使用 Netinstall 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导程序可用：常规引导程序和备用引导程序。常规引导程序 - 给设备通电，等待 1-2 秒，然后按住复位按钮。等待系统 LED 闪烁绿色，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开复位按钮 - 设备将进入 BOOTP 模式。
- 备用引导程序 – 关闭设备电源，按住复位按钮，然后通电。等待系统 LED 闪烁绿色，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开复位按钮 - 设备将使用备用引导程序进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall 执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- ADAPT1_ EU/US 开关电源 24V，1.2A。
- CAB3_ CAT5E UTP 扁平网线，8P8C，AWG32，1.5m。

## 天线使用 {#antenna-usage}

SMA 接口用于随附且已连接的 LTE 天线。

连接天线前请先关闭设备，否则设备可能会损坏！

外置天线插孔位于设备背面。

- 将两根天线拧到 SMA 插孔上（请遵循图示中的说明）。

![](/img/7230db2d2f966b3d.webp)

## 拆卸后盖以接触 PCB {#removing-back-cover-to-access-pcb}

如果需要接触 PCB，可以拆下后盖。

- 拆下中心螺丝；

![](/img/3c40f644b6453592.webp)

- 使用小螺丝刀在标记处撬开背板；
- 继续向上撬开；

![](/img/ef5c2817560d190a.webp)

- 最后将整块背板取下。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运送至指定处置场所的相关程序。

### UKCA 标志 {#ukca-marking}

![](/img/387853c20d5a4c82.gif)

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>BG</th><th>С настоящото Mikrotīkls SIA декларира, че този тип радиосъоръжение S53UG+M-5HaxD2HaxD-TC&RG502Q-EA е в съответствие с Директива 2014/53/ЕС. Цялостният текст на ЕС декларацията за съответствие може да се намери на следния интернет адрес: [https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Tímto Mikrotīkls SIA prohlašuje, že typ rádiového zařízení S53UG+M-5HaxD2HaxD-TC&RG502Q-EA je v souladu se směrnicí 2014/53/EU. Úplné znění EU prohlášení o shodě je k dispozici na této internetové adrese: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Hermed erklærer Mikrotīkls SIA, at radioudstyrstypen S53UG+M-5HaxD2HaxD-TC&RG502Q-EA er i overensstemmelse med direktiv 2014/53/EU. EU-overensstemmelseserklæringens fulde tekst kan findes på følgende internetadresse: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Hiermit erklärt Mikrotīkls SIA, dass der Funkanlagentyp S53UG+M-5HaxD2HaxD-TC&RG502Q-EA der Richtlinie 2014/53/EU entspricht. Der vollständige Text der EU-Konformitätserklärung ist unter der folgenden Internetadresse verfügbar: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Με την παρούσα ο/η Mikrotīkls SIA, δηλώνει ότι ο ραδιοεξοπλισμός S53UG+M-5HaxD2HaxD-TC&RG502Q-EA πληροί την οδηγία 2014/53/ΕΕ. Το πλήρες κείμενο της δήλωσης συμμόρφωσης ΕΕ διατίθεται στην ακόλουθη ιστοσελίδα στο διαδίκτυο: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Hereby, Mikrotīkls SIA declares that the radio equipment type S53UG+M-5HaxD2HaxD-TC&RG502Q-EA is in compliance with Directive 2014/53/EU. The full text of the EU declaration of conformity is available at the following internet address: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Por la presente, Mikrotīkls SIA declara que el tipo de equipo radioeléctrico S53UG+M-5HaxD2HaxD-TC&RG502Q-EA es conforme con la Directiva 2014/53/UE. El texto completo de la declaración UE de conformidad está disponible en la dirección Internet siguiente: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Käesolevaga deklareerib Mikrotīkls SIA, et käesolev raadioseadme tüüp S53UG+M-5HaxD2HaxD-TC&RG502Q-EA vastab direktiivi 2014/53/EL nõuetele. ELi vastavusdeklaratsiooni täielik tekst on kättesaadav järgmisel internetiaadressil: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA vakuuttaa, että radiolaitetyyppi S53UG+M-5HaxD2HaxD-TC&RG502Q-EA on direktiivin 2014/53/EU mukainen. EU-vaatimustenmukaisuusvakuutuksen täysimittainen teksti on saatavilla seuraavassa internetosoitteessa: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Le soussigné, Mikrotīkls SIA, déclare que l'équipement radioélectrique du type S53UG+M-5HaxD2HaxD-TC&RG502Q-EA est conforme à la directive 2014/53/UE. Le texte complet de la déclaration UE de conformité est disponible à l'adresse internet suivante: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA ovime izjavljuje da je radijska oprema tipa S53UG+M-5HaxD2HaxD-TC&RG502Q-EA u skladu s Direktivom 2014/53/EU. Cjeloviti tekst EU izjave o sukladnosti dostupan je na sljedećoj internetskoj adresi: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA igazolja, hogy a S53UG+M-5HaxD2HaxD-TC&RG502Q-EA típusú rádióberendezés megfelel a 2014/53/EU irányelvnek. Az EU-megfelelőségi nyilatkozat teljes szövege elérhető a következő internetes címen: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Il fabbricante, Mikrotīkls SIA, dichiara che il tipo di apparecchiatura radio S53UG+M-5HaxD2HaxD-TC&RG502Q-EA è conforme alla direttiva 2014/53/UE. Il testo completo della dichiarazione di conformità UE è disponibile al seguente indirizzo Internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Hér með lýsir Mikrotīkls SIA því yfir að S53UG+M-5HaxD2HaxD-TC&RG502Q-EA er í samræmi við grunnkröfur og aðrar kröfur, sem gerðar eru í tilskipun 2014/53/EU. Fullur texti ESB samræmisyfirlýsingar er að finna á eftirfarandi veffangi: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Aš, Mikrotīkls SIA, patvirtinu, kad radijo įrenginių tipas S53UG+M-5HaxD2HaxD-TC&RG502Q-EA atitinka Direktyvą 2014/53/ES. Visas ES atitikties deklaracijos tekstas prieinamas šiuo interneto adresu: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Ar šo Mikrotīkls SIA deklarē, ka radioiekārta S53UG+M-5HaxD2HaxD-TC&RG502Q-EA atbilst Direktīvai 2014/53/ES. Pilns ES atbilstības deklarācijas teksts ir pieejams šādā interneta vietnē: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>B'dan, Mikrotīkls SIA, niddikjara li dan it-tip ta' tagħmir tar-radju S53UG+M-5HaxD2HaxD-TC&RG502Q-EA huwa konformi mad-Direttiva 2014/53/UE. It-test kollu tad-dikjarazzjoni ta' konformità tal-UE huwa disponibbli f'dan l-indirizz tal-Internet li ġej: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Hierbij verklaar ik, Mikrotīkls SIA, dat het type radioapparatuur S53UG+M-5HaxD2HaxD-TC&RG502Q-EA conform is met Richtlijn 2014/53/EU. De volledige tekst van de EU-conformiteitsverklaring kan worden geraadpleegd op het volgende internetadres: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA erklærer herved at utstyret S53UG+M-5HaxD2HaxD-TC&RG502Q-EA er i samsvar med de grunnleggende krav og øvrige relevante krav i direktiv 2014/53/EU. Den fulle teksten til EU-samsvarserklæringen er tilgjengelig på følgende internettadresse: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA niniejszym oświadcza, że typ urządzenia radiowego S53UG+M-5HaxD2HaxD-TC&RG502Q-EA jest zgodny z dyrektywą 2014/53/UE. Pełny tekst deklaracji zgodności UE jest dostępny pod następującym adresem internetowym: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>O(a) abaixo assinado(a) Mikrotīkls SIA declara que o presente tipo de equipamento de rádio S53UG+M-5HaxD2HaxD-TC&RG502Q-EA está em conformidade com a Diretiva 2014/53/UE. O texto integral da declaração de conformidade está disponível no seguinte endereço de Internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Prin prezenta, Mikrotīkls SIA declară că tipul de echipamente radio S53UG+M-5HaxD2HaxD-TC&RG502Q-EA este în conformitate cu Directiva 2014/53/UE. Textul integral al declarației UE de conformitate este disponibil la următoarea adresă internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA týmto vyhlasuje, že rádiové zariadenie typu S53UG+M-5HaxD2HaxD-TC&RG502Q-EA je v súlade so smernicou 2014/53/EÚ. Úplné EÚ vyhlásenie o zhode je k dispozícii na tejto internetovej adrese: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA potrjuje, da je tip radijske opreme S53UG+M-5HaxD2HaxD-TC&RG502Q-EA skladen z Direktivo 2014/53/EU. Celotno besedilo izjave EU o skladnosti je na voljo na naslednjem spletnem naslovu: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Härmed försäkrar Mikrotīkls SIA att denna typ av radioutrustning S53UG+M-5HaxD2HaxD-TC&RG502Q-EA överensstämmer med direktiv 2014/53/EU. Den fullständiga texten till EU-försäkran om överensstämmelse finns på följande webbadress: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

### WLAN/WCDMA/LTE {#wlanwcdmalte}

<table><thead><tr><th>工作频率 / 最大输出功率 Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>WCDMA I</th><th>1922.4 MHz / 23dBm ± 2.7 dB</th></tr></thead><tbody><tr><td>WCDMA III</td><td>1712.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA V</td><td>826.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA VIII</td><td>882.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WLAN</td><td>2400-2483.5 MHz / 20dBm</td><td></td></tr><tr><td>WLAN</td><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>WLAN</td><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>WLAN</td><td>5470-5725 MHz / 27 dBm</td><td></td></tr><tr><td>WLAN</td><td>5725-5825 MHz / 30 dBm</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 5</td><td>850 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 28</td><td>700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 32</td><td>1500 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 34</td><td>2000 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 42</td><td>3500 MHz / 23, 26dBm ± 3 dB</td><td></td></tr><tr><td>LTE Band 43</td><td>3700 MHz / 23dBm ± 3 dB</td><td></td></tr><tr><td>5G NR Band n1</td><td>2100 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n3</td><td>1800 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n7</td><td>2600 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n8</td><td>900 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n20</td><td>800 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n28</td><td>700 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n38</td><td>2600 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n40</td><td>2300 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n41</td><td>2500 MHz / 26dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n77</td><td>3700 MHz / 26dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n78</td><td>3500 MHz / 26dBm ± 2 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限制。有关更多详细信息，请参见上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen Sendeleistungsgrenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben in der Konformitätserklärung. Nähere Informationen finden Sie oben in der Konformitätserklärung / Cet appareil MikroTik respecte les limites de puissance TX maximale via les réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik soddisfa i limiti di potenza massima TX tramite le normative ETSI. Per informazioni più dettagliate consultare la Dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia TX a través de las normas ETSI. Para obtener información más detallada, consulte la Declaración de conformidad anterior / Это устройство MikroTik соответствует ограничениям максимальной мощности передачи согласно правилам ETSI. Для получения более подробной информации см. Декларацию соответствия выше.

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.

![](/img/6250b391e18aff84.webp)

<table><thead><tr><th>**（EN）技术规格 / (DE) Technische Spezifikationen / (FR) Spécifications techniques /(IT) Specifiche tecniche / (ES) Especificaciones técnicas / (RU) Технические характеристики：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>（EN）产品电源输入选项(DE) Produkt Stromquellen Optionen(FR) Options d'entrée d'alimentation du produit(IT) Opzioni di ingresso alimentazione del prodotto(ES) Opciones de entrada de energía del producto(RU) Параметры входной мощности продукта</td><td>（EN）DC 适配器输出规格(DE) Ausgangsspezifikationen des Gleichstromadapters(FR) Spécifications de sortie de l'adaptateur de courant continu(IT) Specifiche di uscita dell'adattatore di corrente continua(ES) Especificaciones de salida del adaptador de corriente continua(RU) Выходные характеристики адаптера постоянного тока</td><td>（EN）外壳 IP 等级(DE) IP-Klasse des Gehäuses(FR) Classe IP du boîtier(IT) Classe IP della custodia(ES) Clase de IP del recinto(RU) Класс защиты корпуса IP</td><td>（EN）工作温度(DE)Betriebstemperatur (FR) température de fonctionnement (IT) temperatura di esercizio (ES) Temperatura de funcionamiento (RU) Рабочая Температура</td><td></td></tr><tr><td>电压，V</td><td>电流，A</td><td></td><td></td><td></td></tr><tr><td>DC 插孔（12 - 28 V DC）</td><td>24</td><td>1.5</td><td>IP20</td><td>±0°..+70°C</td></tr></tbody></table>
