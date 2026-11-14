---
title: "CCR2004-16G-2S+PC"
slug: /ccr2004-16g-2s-plus-pc
source: https://manual.mikrotik.com/hardware/ccr2004-16g-2s-plus-pc
captured_at: '2026-11-04T05:55:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/ea609dae5237f4bc.jpg" alt="" width={800} height={667} /></p>

## [CCR2004-16G-2S+PC](https://mikrotik.com/product/ccr2004_16g_2s_pc) {#ccr2004-16g-2spc}

比之前的 CCR1009 路由器快最高 300%——在令人愉悦的静默之中！以您负担得起的价格，享受您应得的奢华。16 个千兆以太网端口，2 个 10G SFP+ 笼。完整规格和宣传册请参见 [CCR2004-16G-2S+PC 产品页面](https://mikrotik.com/product/ccr2004_16g_2s_pc)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电气电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 本设备应由经过培训的合格人员按照本安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、维修或改装本设备。
- 本产品适用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的做法是将电源插头从电源插座上拔出。
- 本产品为 A 类产品。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施

<p><Img src="/img/ee40bff277b50ded.webp" alt="" width={574} height={494} /></p>

触电危险。本设备仅应由经过培训的人员进行维修

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 应使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方法以确保可访问性；**
- 在 Web 浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，且没有密码（或者，对于某些型号，请在标签上查看用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将您的 RouterOS 软件升级到最新版本，可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

本设备具有两个集成电源单元，AC **⏦** 100-240V，配有标准 IEC 兼容插座。支持的输入电压 36-57 V（DC 插孔）36-57（2 针端子）电源适配器标称电压 48 V 电源适配器标称电流 0.9 A 最大功耗（不含附件）30 W 最大功耗 36 W

## 配置 {#configuration}

以太网端口 15 具有用于连接的默认 IP 地址：192.168.88.1。用户名为 admin，且没有密码。设备默认未应用任何其他配置，请设置 WAN IP 地址、用户密码，并更新设备。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址。出于恢复目的，可以启动设备进行重新安装，请参见复位按钮。

## 规格 {#specifications}

- 产品代码 CCR2004-16G-2S+PC
- CPU AL32400 1.2 GHz
- CPU 架构 ARM 64bit
- CPU 核心数 4
- RAM 容量 4 GB
- RAM 类型 DDR4
- 存储 128 MB，NAND
- 1G 以太网端口数量 16
- 10G SFP+ 端口数量 2
- 操作系统 RouterOS v7，许可证级别 6
- 交换芯片型号 88E6191X
- 交换机中的千兆端口数量 8
- 尺寸 272 x 195 x 44 mm
- 工作温度 -20°C 至 +60°C

## 复位按钮 {#reset-button}

**复位按钮**：

- 在启动过程中按住此按钮，直到 USER LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 按住复位按钮并给设备通电（等待 "USER" LED 闪烁然后稳定为 "On"，当 "USER" LED 变为 "Off" 时——松开复位按钮）——设备将以 BOOTP 模式启动，使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。在 LED 开始闪烁之前松开按钮，则仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果指定用途为机架式机箱，请使用十字螺丝刀将机架安装耳片固定到设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 如右图所示，将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位；
- 将设备放入机架式机箱并对齐孔位，使设备能够方便地装入；
- 拧紧螺丝将其固定到位。设备不具备防水保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat6 线缆。

## 随附部件 {#included-parts}

<p><Img src="/img/13c8554043c2e142.webp" alt="" width={642} height={280} /></p>

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/0097d5c5b96539f2.webp" alt="" width={198} height={166} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分的要求。其运行受以下两个条件约束：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受接收到的任何干扰，包括可能导致意外操作的干扰。

注意：本设备已使用外设上的屏蔽电缆进行测试。必须在本设备上使用屏蔽电缆以确保合规。

### 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。其运行受以下两个条件约束：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

### UKCA 标志 {#ukca-marking}

<p><Img src="/img/387853c20d5a4c82.gif" alt="" width={2115} height={2113} /></p>

<table><thead><tr><th>**(EN) Technical Specifications / (DE) Technische Spezifikationen / (FR) Spécifications techniques / (IT) Specifiche tecniche / (ES) Especificaciones técnicas / (RU) Технические характеристики:**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>(EN) Product Power Input Options (DE) Produkt Stromquellen Optionen (FR) Options d'entrée d'alimentation du produit (IT) Opzioni di ingresso alimentazione del prodotto (ES) Opciones de entrada de energía del producto (RU) Варианты входной мощности продукта</td><td>(EN) DC Adapter Output Specification, (V/A) (DE) Ausgangsspezifikationen des Gleichstromadapters, (V/A) (FR) Spécifications de sortie de l'adaptateur de courant continu, (V/A) (IT) Specifiche di uscita dell'adattatore di corrente continua, (V/A) (ES) Especificaciones de salida del adaptador de corriente continua, (V/A) (RU) Выходные характеристики адаптера постоянного тока, (В/А)</td><td>(EN) IP class of the enclosure (DE) IP-Klasse des Gehäuses (FR) Classe IP du boîtier (IT) Classe IP della custodia (ES) Clase de IP del recinto (RU) Класс защиты корпуса IP</td><td>(EN) Operating Temperature (DE)Betriebstemperatur (FR) température de fonctionnement (IT) temperatura di esercizio (ES) Temperatura de funcionamiento (RU) Рабочая Температура</td><td></td></tr><tr><td>Voltage, V</td><td>Current, A</td><td></td><td></td><td></td></tr><tr><td>DC Jack (36 - 57 V DC) 2-pin terminal (36 - 57 V DC)</td><td>48</td><td>0.9</td><td>IP20</td><td>±0°..+60°C</td></tr></tbody></table>
