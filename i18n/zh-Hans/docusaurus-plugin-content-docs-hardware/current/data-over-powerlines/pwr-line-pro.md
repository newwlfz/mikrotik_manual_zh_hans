---
title: "PWR-LINE PRO"
slug: /pwr-line-pro
source: https://manual.mikrotik.com/hardware/pwr-line-pro
captured_at: '2026-11-04T06:03:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/c6317f884010cbd7.webp" alt="" width={800} height={800} /></p>

PWR-LINE PRO 允许受支持的设备之间通过普通电力线实现类似以太网的连接。当插入同一电路时，该设备将使用 HomePlug AV 2 标准建立以太网连接。该设备支持 802.1q。PWR-LINE PRO 不需要任何系统软件或配置，开箱即用。

## 连接 {#connecting}

- 将一个 PWR-LINE PRO 设备插入电源插座。
- 将 MikroTik 路由器的某个 LAN 端口连接到 PWR-LINE PRO 的以太网端口。
- 将另一个 PWR-LINE PRO 单元（或任何其他兼容设备）插入同一电路中的某个位置。
- 使用 sync 按钮连接设备，本地网络将自动扩展。请参阅有关如何配对额外 PWR-LINE PRO 设备的章节。
- PWR-LINE PRO 支持从以太网端口输出 PoE，用于为另一台 MikroTik 设备供电，可通过开关启用，请参阅相关章节。

## 安装 {#mounting}

PWR-LINE PRO 可以使用随附的四颗螺钉安装在墙上：

- 要接触到安装点，请使用 PH2 螺丝刀拆下固定顶盖的中心螺钉。

<p><Img src="/img/6b90a23121ae4347.webp" alt="" width={379} height={301} /></p>

- 在墙上所需位置为 PWR-LINE PRO 标记四个螺钉孔位。
- 使用 5 mm 钻头钻出膨胀螺栓孔，如有必要，轻轻敲入膨胀螺栓。
- 安装 PWR-LINE PRO 并合上顶盖，中心螺钉拧紧力矩为 0.5 – 0.7 Nm，将随附的 3M 贴纸贴到中心螺钉的盖子上。

## 供电 {#powering}

该设备从所插入的墙壁插座取电。100-240 V AC ⏦，~50/60 Hz。最大负载下的功耗可达 5 W。启用 PoE-Out 时的最大功耗为 14 W。

*为达到 600 Mbps 的速度，您的电源插座需要接地。* *要与另一台 PWR-LINE 设备连接，两者必须位于同一电相位上。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口，支持 24 V PoE 输出，默认设置下为关闭状态。

## 按钮和跳线 {#buttons-and-jumpers}

### PWR 连接按钮（sync） {#pwr-connection-button-sync}

<p><Img src="/img/894ee9f81b48c6fb.webp" alt="" width={719} height={205} /></p>

- 按住 0.5 – 3 秒。设备将在 120 秒内尝试与另一台 PWR-LINE PRO 设备通信。琥珀色 LED 闪烁表示设备处于搜索模式。您必须在另一台 PWR 设备上执行相同操作，这样它们才能同步。再次按下按钮可取消搜索。
- 按住 5 – 8 秒。将生成新的安全密钥。这是将 PWR-LINE PRO 设备从现有 PWR 网络中移除所必需的。
- 按住 10 – 15 秒。重置所有与 PWR 相关的设置。
- 如果配对设备时遇到问题，请按住 SYNC 按钮 5 - 8 秒以生成新的网络密钥，然后再次按住 SYNC 按钮 0.5 – 3 秒，重新尝试将其配对到 PWR-LINE PRO 网络中。

## LED 指示灯与 PoE 开关 {#led-lights-and-poe-switch}

<p><Img src="/img/87211f2b58117550.webp" alt="" width={720} height={237} /></p>

- 蓝色 LED 表示设备已通电。
- 琥珀色 LED 表示设备已配对，琥珀色闪烁表示设备处于搜索模式。可通过 sync 按钮激活。请参阅相关章节。
- 绿色 LED 表示以太网端口已连接。
- 红色 LED 表示 PoE 已启用。
- PoE 开关默认位置为 OFF。可使用标准圆珠笔来切换位置。红灯表示 PoE 已启用。

## 配件 {#accessories}

包装内含以下随设备提供的附件：

- K-62 紧固套件。
- EU/US 电源线，D03+QT1 H03VV-F 0x0.75 mm2，30 cm RoHS，白色。

## 规格 {#specifications}

如需了解有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/pl7510gi](https://mikrotik.com/product/pl7510gi)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，并且 (2) 本设备必须接受所收到的任何干扰，包括可能导致意外操作的干扰。注意：本单元已使用外围设备上的屏蔽电缆进行测试。必须在本单元上使用屏蔽电缆以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部的免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得产生干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可证无线电设备的相关 CNR 规定。操作须满足以下两个条件：(1) 设备不得产生干扰，并且 (2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备生产日期的信息标注在其标签上序列号的末尾，用斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
