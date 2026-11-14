---
title: "FTC21-ups"
slug: /ftc21-ups
source: https://manual.mikrotik.com/hardware/ftc21-ups
captured_at: '2026-11-04T09:48:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/b1af4c483480665f.webp)

![](/img/cba1723b8ed02117.webp)

## [FTC21-ups](https://mikrotik.com/product/ftc21_ups) {#ftc21-ups}

一款防风雨的光纤转铜缆转换器，配备 2.5G SFP 端口和两个千兆以太网端口，其中 Ether2 支持 PoE-out。其内置电池可在短暂断电期间保持链路稳定，避免不必要的重新协商和设备重启。完整规格和手册请参见 [FTC21-ups 产品页面](https://mikrotik.com/product/ftc21_ups)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于户外使用，可安装在立柱或墙壁上。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- AC/DC 电源适配器仅供室内使用。插座应安装在设备附近且易于触及。
- 本设备内置锂离子电池。请勿打开、损坏或尝试更换电池；维修和更换只能由授权人员执行。
- 请勿将需要 802.3af/at 协商的设备连接到被动 PoE-out 端口。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源适配器从电源插座中拔出。

## 快速开始 {#quickstart}

- 找到以太网和 SFP 端口；
- 将 PC 的 IP 设置为 192.168.88.2/24；
- 连接设备并为其通电：

- 使用 PoE-in（802.3af/at 48-57 V）：

- 用以太网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到电脑；
- 将电源适配器连接到 PoE 注入器；

- 使用 DC 插孔（24-57 V）：

- 使用随附的电源适配器通过 DC 插孔为设备供电；

- 在网页浏览器中打开 https://192.168.88.1。使用 "**admin**" 作为用户名（默认无密码）；
- 从 mikrotik.com/download 下载最新的 SwOS Lite。在 "**Upgrade**" 选项卡中上传，然后让设备重启；
- 设置密码以保护设备；
- 如有需要，可将设备安装在立柱或墙壁上；
- 包装内包含带膨胀螺栓的螺钉。

## 安装 {#mounting}

可使用随附的 K-95 紧固套件和喉箍将设备安装在立柱或墙壁上。

要将设备安装在墙壁上：

- 将支架放在安装位置并标记钻孔点；
- 钻孔，如有需要插入随附的膨胀螺栓；
- 将支架拧紧固定在墙上；
- 将设备安装到支架上并调整对齐；
- 拧开底部盖板，将线缆穿过开口，并连接到相应的端口；
- 合上底部盖板并用螺钉固定。

要将设备安装在立柱上：

- 使用随附的喉箍将支架固定到立柱上；
- 将设备安装到支架上并调整对齐；
- 拧开底部盖板，将线缆穿过开口，并连接到相应的端口；
- 合上底部盖板并用螺钉固定。

户外安装时，请确保所有线缆开口朝下。本设备的防护等级为 IP67。请使用 Cat5/6 线缆，并正确连接机壳接地。

## 供电 {#powering}

本设备有两个直流输入：

- DC 插孔接受 24-57 V DC；
- Ether1 接受 802.3af/at PoE-in，48-57 V DC。

最大功耗为 28 W。未连接附件时为 3 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 **PoE + DATA** 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器的 **DATA** 端口；
- 将电源线连接到适配器，然后插入电源插座。

### PoE 输出 {#poe-output}

Ether2 提供被动 PoE-out。输出电压通过硬件开关选择：24 V 或 48 V。该输出不进行 802.3af/at 协商。

- 低压 PoE-out 电流限制：0.625 A。
- 高压 PoE-out 电流限制：0.315 A。
- 总输出功率：15 W。

请勿将需要 802.3af/at 协商的设备连接到 Ether2。

### 电池 {#battery}

本设备内置锂离子电池，可在短暂断电和电压跌落期间保持链路及所连设备正常运行。它并非为长时间供电而设计。

电池在运输途中处于非活动状态，首次通电时会被激活。可通过 SwOS Lite 远程将其置于运输模式。电池不可由用户更换。

续航时间取决于所连负载、电池状态和环境温度。

## LED 指示灯 {#led-indicators}

- PWR LED 指示电源。
- PoE-in LED 指示 PoE 输入。
- ETH1 和 ETH2 LED 指示以太网链路和活动。
- SFP LED 指示 SFP 链路和活动。

## 复位按钮与备份固件 {#reset-button-and-backup-firmware}

复位按钮位于底部盖板下方。在设备通电并启动时按住它几秒钟，将重置配置并加载备份 SwOS Lite 固件。

加载备份固件后，在网页浏览器中连接到 192.168.88.1（或 DHCP 服务器分配的地址），并安装最新的 SwOS Lite 固件。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>FTC21-ups</td></tr><tr><td>**交换芯片型号**</td><td>88E6341</td></tr><tr><td>**操作系统**</td><td>SwOS Lite</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>2</td></tr><tr><td>**带 PoE-out 的 1G 以太网端口**</td><td>1</td></tr><tr><td>**SFP 端口**</td><td>1（支持 2.5G）</td></tr><tr><td>**DC 输入数量**</td><td>2（DC 插孔、PoE-in）</td></tr><tr><td>**DC 插孔输入电压**</td><td>24-57 V</td></tr><tr><td>**PoE-in**</td><td>802.3af/at</td></tr><tr><td>**PoE-in 输入电压**</td><td>48-57 V</td></tr><tr><td>**PoE-out 端口**</td><td>Ether2</td></tr><tr><td>**PoE-out**</td><td>被动 PoE，通过硬件开关选择 24 V 或 48 V</td></tr><tr><td>**低压 PoE-out 电流限制**</td><td>0.625 A</td></tr><tr><td>**高压 PoE-out 电流限制**</td><td>0.315 A</td></tr><tr><td>**总输出功率**</td><td>15 W</td></tr><tr><td>**最大功耗**</td><td>28 W</td></tr><tr><td>**未连接附件时的最大功耗**</td><td>3 W</td></tr><tr><td>**电池**</td><td>锂离子，8.4 V，3500 mAh</td></tr><tr><td>**电池放电温度**</td><td>-20 °C 至 +65 °C</td></tr><tr><td>**尺寸**</td><td>268 × 113 × 44 mm</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +70 °C</td></tr><tr><td>**MTBF**</td><td>25 °C 下约 100,000 小时</td></tr><tr><td>**散热方式**</td><td>被动</td></tr><tr><td>**PCB 温度监控**</td><td>是</td></tr><tr><td>**认证**</td><td>CE, EAC, ROHS</td></tr><tr><td>**防护等级**</td><td>IP67</td></tr></tbody></table>

## 配件 {#accessories}

包装内包含以下随设备提供的附件：

![](/img/6fb7adf18655cfe9.webp)

- 48 V、0.95 A 电源适配器。
- 千兆 PoE 注入器。
- 喉箍（1 个）。
- K-95 紧固套件。

不含 SFP 模块。

## 操作系统支持 {#operating-system-support}

本设备运行 SwOS Lite。出厂安装的版本列于 SwOS Lite 网页界面中。不支持其他操作系统。
