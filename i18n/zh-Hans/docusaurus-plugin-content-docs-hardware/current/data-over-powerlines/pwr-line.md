---
title: "PWR-LINE"
slug: /pwr-line
source: https://manual.mikrotik.com/hardware/pwr-line
captured_at: '2026-11-04T06:02:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/edf3c57522595fc4.webp" alt="" width={768} height={768} /></p>

PWR-LINE 系列设备允许受支持的设备之间通过普通电力线实现类似以太网的连接。当插入同一电路时，PWR 设备将使用 HomePlug AV 标准建立以太网连接。PWR-LINE 是一款内置 USB 线缆的智能电源适配器。该设备专为带有 microUSB 端口并支持 PWR-LINE 的 MikroTik 产品而设计。将此适配器连接到电源插座，然后连接 USB 线缆为受支持的 MikroTik 设备供电。在场所内较远处对另一台兼容 PWR-LINE 的设备执行相同的操作，这些设备便会建立连接，无需安装任何 LAN 线缆。该设备将在路由器的配置界面中显示为额外的以太网接口。您可以安装更多 PWR-LINE 设备来进一步扩展网络。

## 连接 {#connecting}

- 将一台 PWR-LINE 设备插入电源插座。
- 将内置 USB 线缆连接到受支持的 MikroTik 路由器的 microUSB 端口。
- 在同一电路中的某处插入另一台 PWR-LINE 设备（或任何其他兼容设备）。使用 sync 按钮连接设备，您的本地网络将自动扩展。有关如何配对更多 PWR-LINE 设备，请参阅“按钮和跳线”章节。

## 供电 {#powering}

该设备可直接由所插入的 100-230 V ~50/60Hz 墙壁插座供电。最大负载下的功耗可达 5 W。

## 按钮和跳线 {#buttons-and-jumpers}

### PWR 连接按钮（sync） {#pwr-connection-button-sync}

- 按住 0.5 – 3 秒。设备将在 120 秒内尝试与另一台 PWR-LINE 设备通信。橙色 LED 闪烁表示设备处于搜索模式。您还必须在另一台 PWR 设备上执行相同的操作，以便它们能够同步。再次按下按钮可取消搜索。
- 按住 5 – 8 秒。将生成新的安全密钥。从现有 PWR 网络中移除 PWR-LINE 设备时需要使用此操作。
- 按住 10 – 15 秒。重置所有与 PWR 相关的设置。

为避免污染环境，请勿将设备与生活垃圾一起丢弃，请以安全的方式处理，例如送至指定的废弃物处理场所。请了解您所在地区将设备正确运送至指定处理场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的有害干扰防护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭并重新开启设备来确定），则建议用户尝试通过以下措施之一来消除干扰：

- 调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 警告：未经负责合规的一方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得产生有害干扰，且 (2) 本设备必须接受所接收的任何干扰，包括可能导致非预期运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得产生干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
