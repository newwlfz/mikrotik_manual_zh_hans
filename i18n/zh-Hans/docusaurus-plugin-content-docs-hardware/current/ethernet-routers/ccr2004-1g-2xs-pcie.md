---
title: "CCR2004-1G-2XS-PCIe"
slug: /ccr2004-1g-2xs-pcie
source: https://manual.mikrotik.com/hardware/ccr2004-1g-2xs-pcie
captured_at: '2026-11-04T05:55:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/d6a158969481e5d2.jpg" alt="" width={799} height={571} /></p>

## [CCR2004-1G-2XS-PCIe](https://mikrotik.com/product/ccr2004_1g_2xs_pcie) {#ccr2004-1g-2xs-pcie}

一款智能 PCIe 网络接口卡，可为您的服务器添加功能完备的路由器能力。如果您想节省服务器机房的空间，这是创建 25 Gigabit 网络的智能且简便的方法！完整规格和产品手册请参阅 [CCR2004-1G-2XS-PCIe 产品页面](https://mikrotik.com/product/ccr2004_1g_2xs_pcie)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备拟安装于机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或未遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规。所有 MikroTik 设备必须由专业人员安装。
- 本产品为 Class A 产品。在家庭环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 将设备插入计算机的 PCIe 插槽；
- 打开计算机；
- 应使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置，打开 **Neighbors** 选项卡并使用 MAC 地址连接到设备；
- 用户名：**admin**，默认没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 WinBox 的 "Files" 菜单并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

本设备通过 PCIe 供电，最大功耗为 29W。

## 配置 {#configuration}

默认情况下，PCIe 接口将显示为四个虚拟以太网接口。其中两个接口以直通模式连接到 25G SFP28 笼。其余两个虚拟以太网-PCIe 接口与千兆以太网端口桥接，用于管理访问。

## 规格 {#specifications}

- 产品代码 CCR2004-1G-2XS-PCIe
- CPU AL32400 2 GHz
- CPU 架构 ARM 64bit
- CPU 核心数 4
- 内存大小 4 GB
- 内存类型 DDR4
- 存储 128 MB，NAND
- 1G 以太网端口数量 1
- 25G SFP28 端口数量 2
- 操作系统 RouterOS（License level 6）
- 尺寸 170 x 69 x 18 mm
- 工作温度 -20°C 至 +60°C
- 最大功耗 25 W

## 重置 {#reset}

<p><Img src="/img/41f7dd6ead35bd0c.webp" alt="" width={600} height={800} /></p>

要将此设备重置为出厂设置，您必须关闭您的 PC。

- 将金属物体放入复位孔，使其与两侧金属化部分接触。
- 打开 PC 并按住螺丝刀，直到两个 25G SFP28 LED 开始闪烁红色后松开，它将重置 RouterOS 配置。
- 如果您继续按住超过 5 秒直至 20 秒，直到红色 LED 熄灭，则会使 RouterBOARD 查找 Netinstall 服务器。

## 随附部件 {#included-parts}

<p><Img src="/img/a0c855ba0573e499.webp" alt="" width={238} height={227} /></p>

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

**本设备在 Linux（最低内核 5.15.25）和 RouterOS（最低版本 7.x）中受支持，但在 Windows 中无法被识别。**

[https://git.kernel.org/pub/scm/linux/kernel/git/netdev/net.git/commit/?id=bf8e59fd315f](https://git.kernel.org/pub/scm/linux/kernel/git/netdev/net.git/commit/?id=bf8e59fd315f)

<p><Img src="/img/9451b2eb2e7bf01c.webp" alt="" width={576} height={521} /></p>

安全提示：存在触电危险。本设备只能由受过培训的人员进行维修。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所。请熟悉将设备妥善运送到您所在地区指定处置场所的程序。

### 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 Class A 数字设备的限制。这些限制旨在为商业安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能会造成有害干扰，此时用户将需要自行承担费用来纠正干扰。

FCC 警告：任何未经合规负责方明确批准的更改或修改，都可能会使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。

注意：本设备在测试时使用了外围设备的屏蔽电缆。为确保合规，必须使用屏蔽电缆与本设备配合使用。

### 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。其操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

### UKCA 标志 {#ukca-marking}

<p><Img src="/img/387853c20d5a4c82.gif" alt="" width={2115} height={2113} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

Для получения подробных сведений о гарантийном обслуживании обратитесь к продавцу.

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, Latvia.

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039.

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
