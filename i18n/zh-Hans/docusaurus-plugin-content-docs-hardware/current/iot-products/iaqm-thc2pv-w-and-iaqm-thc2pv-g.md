---
title: "IAQM-THC2PV-W 和 IAQM-THC2PV-G"
slug: /iaqm-thc2pv-w-and-iaqm-thc2pv-g
source: https://manual.mikrotik.com/hardware/iaqm-thc2pv-w-and-iaqm-thc2pv-g
captured_at: '2026-11-04T09:50:39+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/iaqm-thc2pv-w-and-iaqm-thc2pv-g-ca07b49c7e0222e093e8d49c300e3b87.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/696eb4898c956f84.webp)

![](/img/f3e057ff78f46097.webp)

IAQM-THC2PV-W（白色）和 IAQM-THC2PV-G（灰色）、IAQM-THC2V-W（白色）和 IAQM-THC2V-G（灰色）、IAQM-THC2P-W（白色）和 IAQM-THC2P-G（灰色）是一款空气质量传感器设备，可测量温度（°C/°F）、相对湿度（RH）、二氧化碳（CO₂），并可选配颗粒物（PM）或挥发性有机化合物（VOC）传感器。

有关完整规格和产品手册，请参阅 [CLAIRE](https://mikrotik.com/product/claire) 和 [CLAIRE Lite](https://mikrotik.com/product/claire_lite) 产品页面。

型号命名规则：IAQM-THC2PV-W/G

- IAQM - 室内空气质量监测器
- T - 温度 [°C/°F]
- H - 相对湿度 [%]
- C2 - 二氧化碳 [ppm]
- P - 颗粒物 [μg/m3]
- V - 挥发性有机化合物 [VOC 指数]
- W - 白色
- G - 灰色

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律和法规。在任何墙面上安装接入点的所有安装方式均须获得当地主管部门的认可。设备的安装必须符合当地和国家的电气规范。本产品仅供室内安装。请将本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和配件，它们可在本产品的原包装中找到。我们建议使用符合 IEC 62368-1 的外部受限电源（LPS）为本设备供电。仅使用额定为 LPS 的 AC/DC 适配器，其输出电压和电流须与产品上标示的数值相符。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！如果设备发生故障，请断开其电源。最快捷的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率和布线要求。所有 MikroTik 无线设备必须由专业人员安装。为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解将设备妥善运送至您所在地区指定处置场所的相关流程。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应与您的身体、职业用户或公众保持不小于 20 厘米的距离。

## 概述 {#overview}

符合 Matter 连接标准的空气质量监测设备，内置所有必备传感器——二氧化碳（CO₂）、颗粒物传感器（PM2.5 和 PM10）、温度、相对湿度以及 VOC 传感器。

适用于家庭、办公室、学校、酒店、养老院或其他公共场所。

## IAQM-THC2PV-W/G {#iaqm-thc2pv-wg}

- **温度传感器**
范围 0..+50°C
精度 ±0.5°C（典型值）
- **相对湿度传感器**
范围 0..100 %RH
精度 ±4%（典型值）
- **CO₂ 传感器**
范围 400..2000 ppm
精度 ±50.0 ppm ±5.0%
自动自校准（ASC），每周暴露于 400 ppm CO₂ 浓度的空气中
- **颗粒物 PM2.5 传感器**
范围 0..1000 μg/m3
精度 ±10%
- **颗粒物 PM10 传感器**
范围 0..1000 μg/m3
精度 ±25%
- **VOC 传感器**
范围 1..500 VOC 指数点
变化 ±15%
重复性 ±5%
- Matter 连接：支持，Matter over Thread
- 蓝牙®：支持，仅用于简单的 Matter 配网（设备设置）
- 显示屏：2” 全彩显示屏，带背光
- 显示模式：用户可调节多种预定义显示模式
- 指示：针对恶化或不健康的空气提供颜色编码的视觉警告
- 供电：USB Type-C 插座或用于 LPS 适配器的 5VDC 端子连接器
- 整体尺寸：76x76x24mm
- 安装方式：桌面或壁挂支架，可选安全螺丝
- 兼容控制器：Google、Amazon、Apple 支持 Matter 的控制器，可与 Home Assistant App 集成

---

## 初始步骤 {#first-steps}

- 要给设备开机，请使用随附的 USB-C 适配器连接。
- 开机后，请等待最多 10 分钟让系统稳定。
- 要更改显示模式，请按住侧边按钮 50 ms 至 3 秒。
- 要在 °C 和 °F 之间切换温度显示，请按住侧边按钮 3 秒。菜单出现后，短按按钮一次（50 ms 至 1 s）导航到 Temperature unit 部分。要选择该部分，请按住按钮 1 秒。使用短按在摄氏度和华氏度之间切换，并按住按钮 1 秒确认您的选择。
- 所有传感器每 10 秒更新一次测量值，但 CO₂ 传感器每 30 秒更新一次，PM 传感器每 5 分钟更新一次。

有关如何将设备与兼容 Matter over Thread 的智能家居系统配对的说明，请参阅此处提供的手册：

扫描二维码打开手册：[https://mt.lv/claire-help](https://mt.lv/claire-help)

![](/img/5db169fb86344481.png)

## 按钮操作 {#button-controls}

本设备通过位于侧面的一颗多功能按钮进行操作。所有菜单导航和设置均通过该按钮完成。

<table><thead><tr><th>操作</th><th>位置</th><th>结果</th></tr></thead><tbody><tr><td>轻按（50 ms – 3 s）</td><td>主屏幕</td><td>切换到下一个显示布局</td></tr><tr><td>长按（3 s）</td><td>主屏幕</td><td>打开设置菜单</td></tr><tr><td>轻按（50 ms – 1 s）</td><td>设置菜单</td><td>切换到下一个菜单选项</td></tr><tr><td>长按（1 s）</td><td>设置菜单</td><td>确认高亮的菜单项</td></tr><tr><td>无操作（30 s 无输入）</td><td>设置菜单</td><td>自动返回主屏幕</td></tr></tbody></table>

### 设置菜单 {#settings-menu}

在主屏幕上长按（3 s）按钮即可打开设置菜单。菜单包含以下项目：

- Pairing code
- Temperature unit
- VOC unit for Matter
- Unpairing
- CO₂ sensor calibration
- Display settings
- Back（退出）

轻按（50 ms – 1 s）可在设置项之间循环切换；长按（1 s）可确认某一项。如果 30 秒内没有输入，屏幕会自动返回主布局。

#### 配对码 {#pairing-code}

导航到 **Pairing code** 并长按（1 s）。屏幕会显示 Matter QR 配对码。长按（1 s），或等待 30 秒超时，即可返回主屏幕。

#### 温度单位 {#temperature-unit}

导航到 **Temperature unit** 并长按（1 s）。选择 Celsius（°C）、Fahrenheit（°F）或 Back。长按（1 s）保存单位并返回主屏幕。

#### Matter 的 VOC 单位 {#voc-unit-for-matter}

导航到 **VOC unit for Matter** 并长按（1 s）。选择 ppm、µg/m³ 或 Back。长按（1 s）确认并返回主屏幕。

:::note note

VOC 单位会影响空气质量数据在不同平台上的显示方式。使用 **Google Home** App 时，请使用 **ppm**。使用 **Apple HomePod** 和 **Amazon Alexa** App 时，请使用 **µg/m³**。

:::

#### 取消配对 {#unpairing}

导航到 **Unpairing** 并长按（1 s）；屏幕将显示“Ready to unpair BLE/Matter”。

- 如果 30 秒超时，屏幕会在未取消配对的情况下返回。
- 轻按（50 ms – 3 s）即可取消配对；屏幕会确认成功。等待 5 秒超时或轻按返回。

:::note note

如果 **Claire** 已配对到其他家庭，请不要忘记执行 **Unpair**，因为它可能会妨碍新的配对。

:::

#### CO₂ 传感器校准 {#co-sensor-calibration}

导航到 **CO₂ sensor calibration** 并长按（1 s）。将设备置于新鲜空气中（约 400 ppm CO₂）并等待 60 秒。当提示开始校准时，轻按（50 ms – 3 s）确认（3 分钟超时会返回）。等待校准完成；系统会自动重启。

#### 显示设置 {#display-settings}

导航到 **Display settings** 并长按（1 s）以访问屏幕偏好设置：

-

**Display anti-burn in** – 选择 **Display anti-burn in**（长按 1 s）。轻按（50 ms – 1 s）可在 **Enabled** 或 **Disabled**（默认 = **Disabled**）或（转到）Back 之间切换。长按（1 s）保存选择。此功能适用于在强光下 24/7 运行的设备：每 15 分钟它会短暂刷新屏幕（几秒钟）以减少烧屏。在正常使用中，亮度会自动调节，并在夜间变暗，因此烧屏不太可能发生，该功能默认关闭。

-

**Display brightness** – 选择 **Display brightness**（长按 1 s）。轻按（50 ms – 1 s）可在 **Automatic**（通过环境光传感器调节）或 **Manual**（默认 = **Automatic**）或（转到）Back 之间切换。长按（1 s）选择该选项。在 **Manual** 下，您可以轻按（50 ms – 1 s）在 **Set brightness** 和 **Night mode**（或转到 Back）之间切换。长按（1 s）选择您的选项：

- **Set brightness** – 轻按（50 ms – 1 s）在 **2%, 10%, 25%, 50%, 75%, 100%**（或转到 Back）之间切换。
- **Night mode** – 轻按（50 ms – 1 s）切换 **ON** 或 **OFF**（或转到 Back）。**ON** 使用设定的亮度，但在黑暗环境中降至 2%；**OFF** 则无论黑暗与否都保持设定的亮度。长按（1 s）确认选择。

-

**Back** – 选择 **Back** 并长按（1 s）返回设备设置列表。

#### 退出菜单 {#exit-menu}

选择 **Back** 并长按（1 s）返回主屏幕。

### 固件升级 / 恢复出厂设置 / 重启 {#firmware-upgrade--factory-reset--reboot}

要访问此菜单，请在按住按钮的同时给设备开机。请在接通电源**之前**按住按钮，并在设备开机过程中保持按住。

#### 固件升级 {#firmware-upgrade}

通过 GUI 升级固件：

**Claire**

- 在按住按钮的同时通过 USB 将设备连接到计算机——设备会开机并打开 Firmware upgrade / Factory reset / Reboot 菜单。
- 轻按（50 ms – 1 s）到达 **Firmware Upgrade**，然后长按（1 s）选择它。
- 屏幕允许您选择 **Start Firmware Upgrade**（或转到 Back）；在 **Start Firmware Upgrade** 上长按（1 s）。
- 设备进入 DFU 模式，并在您的 PC 上显示为名为“DFU in FS Mode”的新 USB 设备。

**PC**

- 使用基于 Chromium 的浏览器（**Chrome** 或 **Edge**）。
- 在浏览器中打开固件升级 Web GUI：**[https://mikrotik.com/download/iot](https://mikrotik.com/download/iot)**。
- 在页面上按步骤操作：**Connect** 并 **Select** USB 接口，然后 **Update device**。
- 等待更新完成——在此过程中请勿断开设备。

:::note note

**Ubuntu / Linux：** 在添加 MikroTik 的 **udev 规则**之前，浏览器无法访问该设备。当您尝试连接时，Web GUI 会显示带有必需说明的错误——请按照说明操作，然后重新连接设备并再次尝试上传。

:::

#### 恢复出厂设置 {#factory-reset}

轻按（50 ms – 1 s）到达 **Factory Reset** 并长按（1 s）选择它。在 **Confirm Factory Reset** 上长按（1 s）；设备会重置并重启。

#### 重启 {#reboot}

轻按（50 ms – 1 s）到达 **Reboot** 并长按（1 s）重启设备。

:::note note

当设备按钮被锁定时，需要执行 Factory Reset。

:::

## Claire 与 Google Nest {#claire-and-google-nest}

如果您有带 Thread 无线电的 Google Nest 音箱或显示屏，并希望将 Claire 与该生态系统配对：

### Claire {#claire}

- 按住侧边按钮 3 秒打开菜单。选择 **Pairing code** 选项（您可以短按按钮 50ms 至 1s 来循环切换其他菜单设置）。选中 **Pairing code** 后，按住侧边按钮 1 秒，它将显示 **Matter QR code**。

### 手机 {#phone}

- 打开 Google **Home** App 并点击 **(+)** **Add** → **(+)** **Device**：
- 用您的手机（摄像头）扫描 **Claire** 显示屏上显示的 **Matter QR code**。
- 按照其余提示完成配对过程。

## Claire 与 Apple HomePod {#claire-and-apple-homepod}

如果您有带 Thread 无线电的 Apple HomePod 或 Apple TV，并希望将设备与该生态系统配对：

### Claire {#claire-1}

- 按住侧边按钮 3 秒打开菜单。选择 **Pairing code** 选项（您可以短按按钮 50ms 至 1s 来循环切换其他菜单设置）。选中 **Pairing code** 后，按住侧边按钮 1 秒，它将显示 **Matter QR code**。

### iPhone {#iphone}

- 打开 **Home** App 并点击 **Add Accessory**（+）。
- 用您的 iPhone（摄像头）扫描 **Claire** 显示屏上显示的 **Matter QR code**。
- 按照其余提示完成配对过程。

配对完成后，设备将出现在您的 Apple **Home** App 中，您可以在那里查看空气质量数据。

:::tip tip

如果您在配对设备时遇到问题，有时先重启 iPhone 会有帮助。

:::

## Claire 与 Amazon Alexa {#claire-and-amazon-alexa}

如果您有 Amazon Alexa 设备（支持 Matter）并希望将 Claire 与该生态系统配对：

### Claire {#claire-2}

- 按住侧边按钮 3 秒打开菜单。选择 **Pairing code** 选项（您可以短按按钮 50ms 至 1s 来循环切换其他菜单设置）。选中 **Pairing code** 后，按住侧边按钮 1 秒，它将显示 **Matter QR code**。

### 手机 {#phone-1}

- 在 **Amazon Alexa app** 中，选择 **Add device** → **Other** → **Matter**，然后继续执行步骤，这些步骤会引导您扫描二维码。
- 用您的手机（摄像头）扫描 **Claire** 显示屏上显示的 **Matter QR code**。
- 按照其余提示完成配对过程。

配对完成后，系统会要求您设置多个设备/传感器（您可以将它们放入同一组）。

## 安装说明 {#mounting-instruction}

- 要将设备安装在墙上并通过 DC 端子供电，请使用一字螺丝刀或美工刀取下小盖板。连接 DC 电源线时请确保极性正确。请勿反接极性。
- 使用随附的安装模板标记壁挂支架所需的钻孔位置，如有需要，还需标记电缆入口孔的位置。

- 位置 1 – 使用安全螺丝安装（推荐用于公共场所）。使用两侧的两颗螺丝固定。
- 位置 2 – 不使用安全螺丝安装。

- 对于混凝土或砖墙表面，请使用 5 mm 钻头钻孔。
- 安装壁挂支架：插入墙塞，对准支架，插入螺丝并拧紧。
- 将设备安装到壁挂支架上。
- 对于公共场所的安装，请使用随附的安全螺丝固定设备。使用 T9 Torx 批头拧紧螺丝。

![](/img/9244fbc09cc85cc0.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息标注在设备标签上序列号的末尾，以斜杠分隔。第一位数字表示年份（年份的最后一位），后面两位数字表示周数。

制造商：Mikrotikls SIA, Unijas iela 2, Riga, LV-1039, Латвия, [support@mikrotik.com](mailto:support@mikrotik.com)。制造地请见包装。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## CE 符合性声明 {#ce-declaration-of-conformity}

![](/img/6f53abac46c9e31f.jpg)

制造商：Mikrotikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备 IAQM-THC2PV-W 和 IAQM-THC2PV-G 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

## 英国合规通知 {#uk-compliance-notice}

![](/img/5d0fc80f851cbbdf.webp)

本设备上的 CE 标志满足适用的英国法规要求。

### 蓝牙 / IEEE 802.15.4 (LR-WPAN) {#bluetooth--ieee-802154-lr-wpan}

<table><thead><tr><th>(EN) 工作频率 / 输出功率 (DE) 工作频率 / 输出功率 (FR) 工作频率 / 输出功率 (IT) 工作频率 / 输出功率 (ES) 工作频率 / 输出功率 (RU) 工作频率 / 输出功率</th><th>Bluetooth LE</th><th>2400-2483.5 MHz / 8 dBm (Max EIRP)</th></tr></thead><tbody><tr><td></td><td>IEEE 802.15.4 (LR-WPAN)</td><td>2400-2483.5 MHz / 8 dBm (Max EIRP)</td></tr></tbody></table>

**Bluetooth 合格产品**

![](/img/cf3c8d2919f980e2.webp)

本产品已成功完成 Bluetooth 认证流程。有关 Bluetooth 认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)

Bluetooth® 文字商标和徽标是 Bluetooth SIG, Inc. 拥有的注册商标，Mikrotikls SIA 对此类标志的任何使用均已获得许可。其他商标和商品名称均为其各自所有者的财产。

:::note note

本设备的法规标签和制造商信息印在粘贴于设备底部的标签上。请参阅该标签以了解型号、序列号和合规标志。

:::

*注。此处包含的信息可能会变更。请访问 [www.mikrotik.com](https://www.mikrotik.com/) 上的产品页面，获取本文档的最新版本。*

#86426
