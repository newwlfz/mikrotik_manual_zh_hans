---
title: "GPERx6"
slug: /gperx6
source: https://manual.mikrotik.com/hardware/gperx6
captured_at: '2026-11-04T09:49:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/aee53463176c788e.jpg)

### GPERx6 (CSS606-1G-2Gi-3S+OUT) {#gperx6-css606-1g-2gi-3sout}

用一根混合线缆摆脱杂乱的布线——在任何地方同时延长供电和光纤。在远端，GPERx6 将这一切整齐分流：SFP+ 用于进一步的长距离上联，PoE-out 用于为其他交换机或接入点供电，DC 输出用于 IoT 设备或专用设备。完整规格和宣传册请参见 [GPERx6 产品页面](https://mikrotik.com/product/gperx6)。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新版本的 SwOS Lite 软件；
- 将您的计算机连接到其中一个以太网端口；
- 将设备连接到电源；
- 将计算机的 IP 地址设置为 192.168.88.2；
- 打开您的网页浏览器，默认 IP 管理地址为 192.168.88.1，用户名为 **admin**，无密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 在 Upgrade 选项卡中通过网页浏览器上传文件，升级后设备将重启；
- 设置您的密码以保护您的设备。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**参数**</th><th>**值**</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CSS606‑1G‑2Gi‑3S+OUT</td></tr><tr><td>**交换芯片型号**</td><td>88E6193X</td></tr><tr><td>**操作系统**</td><td>SwOS</td></tr><tr><td>**MTBF**</td><td>25 °C 下约 200,000 小时</td></tr><tr><td>**测试环境温度**</td><td>‑40 °C 至 +70 °C</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>3</td></tr><tr><td>**带 PoE‑IN 的 1G 以太网**</td><td>一个，Ether1 802.3 bt</td></tr><tr><td>**PoE-In 输入电压 42-57 V**</td><td>42-57 V</td></tr><tr><td>**带 PoE‑OUT 的 1G 以太网**</td><td>无源 PoE，最高 57V（Ether2- Ether3）</td></tr><tr><td>**10G SFP+ 端口**</td><td>3</td></tr><tr><td>**DC 输入数量**</td><td>2（2 针螺钉端子，PoE-In）</td></tr><tr><td>**2 针螺钉端子输入电压 **</td><td>12-57 V</td></tr><tr><td>**DC 输出端口数量**</td><td>3，DC1-DC3，最大总输出 3.6 A</td></tr><tr><td>**最大功耗（不含附件） **</td><td>6 W</td></tr><tr><td>**最大功耗**</td><td>160 W</td></tr><tr><td>**CPU 温度监控**</td><td>是</td></tr><tr><td>**防护等级**</td><td>IP66</td></tr><tr><td>**尺寸**</td><td>406 × 116 × 76 mm</td></tr></tbody></table>

## 配置 {#configuration}

SwOS 的完整文档请参见：[https://mt.lv/help](https://mt.lv/help)。可以通过 WinBox 工具在 Neighbors 列表中点击来发现该设备。默认管理地址为 192.168.88.1。请参阅 [CSS610 系列 SwOS 手册](/docs/bridging-and-switching/swos/css610)，以熟悉其各项功能。出于恢复目的，可以引导设备进行重新安装，参见章节 。

## 按钮和跳线 {#buttons-and-jumpers}

在启动期间按住 Reset 按钮，直到 LED 灯开始闪烁。松开按钮即可重置 SwOS 配置，并加载备份软件以便重新安装和升级。

## 安装 {#mounting}

GPERx6 专为户外使用而设计，可安装在墙壁或立柱上。请按照**安装方向标记**（标有“UP”的箭头）对齐设备，以确保方向正确。

### 将 GPERx6 安装到墙壁上： {#to-mount-the-gperx6-on-the-wall}

-

#### 将支架安装到设备上 {#attach-brackets-to-the-device}

使用 **K‑93 安装套件**中的螺钉，将**三个金属支架**安装到 GPERx6 的背面。

- 调整支架的位置，使其与设备的安装孔对齐。
- 确保**顶部支架**的**较薄部分朝上**，以便正确安装到墙壁。
-

![](/img/6522977240101f81.webp)

-

#### 将设备安装到墙壁上 {#mount-the-device-on-the-wall}

按照**安装方向标记（“UP”箭头）**对齐设备。

- 使用适合您墙壁类型的螺钉或膨胀螺栓将设备固定到墙上，并让三个支架都受力以保证稳定。

### 将 GPERx6 安装到立柱上： {#to-mount-the-gperx6-on-a-pole}

-

#### 将支架安装到设备上 {#attach-brackets-to-the-device-1}

使用 **K‑93 安装套件**中的螺钉，将两个金属支架安装到 GPERx6 的背面。

- 确保支架上的**卡箍孔**朝向设备**背面**。
-

![](/img/e8454f9f9e377961.webp)

-

#### 安装到立柱上 {#mounting-on-the-pole}

将**软管卡箍**穿过支架上的孔。

- 将 GPERx6 放置到立柱周围，并把卡箍绕到立柱上。
- 拧紧卡箍，将设备牢固固定。

## 配件 {#accessories}

![](/img/6f79a405ce455e36.webp)

## 操作系统支持 {#operating-system-support}

该设备支持 SwOS 软件。其他操作系统尚未经过测试。
