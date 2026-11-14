---
title: "Intercell"
slug: /intercell
source: https://manual.mikrotik.com/hardware/intercell
captured_at: '2026-11-04T09:51:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![Intercell 10 B38+B39 outdoor LTE base station.](/img/16dc8e4c820a14bb.jpg)

Intercell 10 B38+B39 是一款室外双载波时分双工 LTE（TDD-LTE）基站。每个载波支持 2×2 MIMO，每个射频（RF）通道的输出功率为 10 W，四个射频通道的总输出功率为 40 W。

## 快速开始 {#quick-start}

- 将外置天线和以太网线连接到 **扩展插槽与端口** 一节所述的连接器。
- 按 **供电** 一节所述连接 48 V DC 电源。
- 将笔记本电脑连接到设备以进行配置。设备支持 DHCP 和静态 IP 地址分配。
- 如需通过默认维护 IP 地址访问，请将笔记本电脑的 IP 地址设置为 192.168.200.100/24，并在网页浏览器中打开 https://192.168.200.200。
- 使用用户名 admin 和密码 MikroTik 登录。
- 按 **配置** 一节所述配置网络、回传和射频参数。

## 供电 {#powering}

电源连接器接受 **48 V DC**。包装内包含电源线和连接器，但 **不包含电源**。最大负载下功耗可达 **200 W**。

- 将随附的线缆连接到你的 48 V DC 电源。
- 将线缆连接器连接到设备。

以太网连接请使用随附的 RBGESP 浪涌保护器。

## 配置 {#configuration}

通过 Web 界面配置设备。安装和配置必须由合格人员执行。

### 网络架构 {#network-architecture}

![Small-cell network architecture with an LTE base station, management system, HeNB gateway, and EPC.](/img/21c6e7c105370179.webp)

各网络组件的作用如下：

- **Home eNodeB（HeNB）：** LTE 基站为用户设备（UE）提供服务。
- **网络管理系统（NMS）/ HeNB 管理系统（HeMS）：** 管理系统提供小基站生命周期管理，并支持 TR-181 和 TR-196 数据模型。
- **HeNB-GW：** HeNB 与移动性管理实体（MME）之间的网关，负责汇聚控制面与用户面流量，并提供 S1/X2 代理功能。

### 配置流程 {#configuration-flow}

先配置网络接入，然后配置回传和射频参数。完成配置后再启用射频发射。

![Configuration sequence: sign in to the web interface, configure backhaul parameters, then configure radio parameters.](/img/e5900ccff294301a.webp)

**WAN** 接口是 SFP 端口，在网络配置中标识为 **ID1**。**LAN** 接口是以太网端口，标识为 **ID2**。如果设备通过 DHCP 获取 IP 地址，可使用 MAC 扫描来查找它。

静态 IP 地址分配：

-

将计算机的 IP 地址设置为 192.168.200.100/24。

-

直接连接到 HeNB 的 WAN 接口并打开 https://192.168.200.200。使用用户名 admin 和密码 MikroTik 登录。

-

在网络配置中，将 **Address Type** 设为 **Static**，然后输入你的网络的 **IPv4 address** 和 **Mask**。

![Network configuration with static IPv4 address and mask fields.](/img/01a219db677e79dc.webp)

-

检查已配置的接口和 IP 地址。

![IP interface list showing DHCP and static address assignments.](/img/28b49dd898601c00.webp)

-

选择 **Submit**。HeNB 会重启以应用配置。

-

将 HeNB 的 WAN 接口重新连接到你的网络，并通过 HTTPS 在其配置的 IP 地址上登录。

### 回传参数 {#backhaul-parameters}

打开 **Management → Cell**，将 **S1SigLinkServer** 设置为你的 MME 或 HeNB 网关的 IP 地址。

![Cell configuration with the S1SigLinkServer backhaul address highlighted.](/img/3baf82dbfd4fe798.webp)

### 射频参数 {#radio-parameters}

本节中的数值仅为示例。请按照你的 LTE 网络设置网络标识和射频参数。

#### 计算发射功率 {#calculate-transmit-power}

根据 **ReferenceSignalPower** 和与带宽相关的基准值计算发射功率：

- **单副天线：** ReferenceSignalPower + Base，单位为 dBm。
- **两副天线合计：** ReferenceSignalPower + Base + 3，单位为 dBm。

<table><thead><tr><th>带宽</th><th>基准值（dB）</th></tr></thead><tbody><tr><td>1 MHz</td><td>19</td></tr><tr><td>3 MHz</td><td>23</td></tr><tr><td>5 MHz</td><td>25</td></tr><tr><td>10 MHz</td><td>28</td></tr><tr><td>15 MHz</td><td>30</td></tr><tr><td>20 MHz</td><td>31</td></tr></tbody></table>

:::warning warning

每副天线 **不得超过 40 dBm**。在启用射频发射前先计算发射功率；功率过高可能损坏功率放大器。

:::

在 20 MHz 下，**ReferenceSignalPower** 为 -14 时，每副天线为 -14 + 31 = 17 dBm。值为 9 时为 9 + 31 = 40 dBm，即本产品的最大值。

在 **Management → Cell** 中配置通用参数：

<table><thead><tr><th>参数</th><th>示例值</th></tr></thead><tbody><tr><td>Duplex Mode</td><td>TDD</td></tr><tr><td>TAC</td><td>10</td></tr><tr><td>PLMNID</td><td>00666</td></tr></tbody></table>

![Common cell configuration with duplex mode, TAC, and PLMNID.](/img/05fffcdd62825b0a.webp)

#### 配置 Cell 1 射频参数 {#configure-cell-1-radio-parameters}

打开 **Cell1** 选项卡并配置以下示例值：

<table><thead><tr><th>参数</th><th>示例值</th></tr></thead><tbody><tr><td>CellIdentity</td><td>257</td></tr><tr><td>CandidateARFCNList</td><td>38400</td></tr><tr><td>CandidatePCIList</td><td>0..503</td></tr><tr><td>FreqBandIndicator</td><td>39</td></tr><tr><td>DL Bandwidth</td><td>100</td></tr><tr><td>UL Bandwidth</td><td>100</td></tr><tr><td>ReferenceSignalPower</td><td>-14</td></tr></tbody></table>

![Cell1 radio parameters for LTE band 39.](/img/6dc0e27d1efa168b.webp)

**CandidateARFCNList** 指定下行 E-UTRA 绝对射频信道号（EARFCN）；HeNB 会自动配置上行 EARFCN。HeNB 从 **CandidatePCIList** 中选择物理小区标识（PCI），范围为 0..503。

带宽字段使用资源块数值：**20 MHz → 100**、**15 MHz → 75**、**10 MHz → 50**、**5 MHz → 25**。**UL Bandwidth** 应设置为与 **DL Bandwidth** 相同。

#### 配置 Cell 2 射频参数 {#configure-cell-2-radio-parameters}

打开 **Cell2** 选项卡并配置以下示例值。EARFCN、PCI 和带宽的约定与 Cell1 相同。

<table><thead><tr><th>参数</th><th>示例值</th></tr></thead><tbody><tr><td>CellIdentity</td><td>258</td></tr><tr><td>CandidateARFCNList</td><td>37900</td></tr><tr><td>CandidatePCIList</td><td>0..503</td></tr><tr><td>FreqBandIndicator</td><td>38</td></tr><tr><td>DL Bandwidth</td><td>100</td></tr><tr><td>UL Bandwidth</td><td>100</td></tr><tr><td>ReferenceSignalPower</td><td>-14</td></tr></tbody></table>

![Cell2 radio parameters for LTE band 38.](/img/6afda40fe0976bfb.webp)

配置完两个小区并检查发射功率后，启用 **AdminState** 以开启射频发射。选择 **Submit**；HeNB 会重启以应用配置。

#### 检查射频状态 {#checking-the-rf-status}

打开 **Management → Cell**，在 **Cell1** 和 **Cell2** 选项卡上检查 **OpState**。值为 **True** 表示无线小区已成功建立。

![Cell status showing OpState and the radio parameters in use.](/img/da38d2ba9ac1851c.webp)

## 安装 {#mounting}

本设备专为室外使用而设计，防护等级为 **IP66**。安装时请使线缆入口朝下，并使用屏蔽 Cat6 线缆。随附的安装五金件支持壁挂安装或抱杆安装，抱杆直径为 **50–120 mm**。

:::warning warning

设备重 **25 kg**。安装必须由合格人员执行。

:::

-

拆开安装支架和附件的包装。

![Intercell chassis and separate mounting frame.](/img/677940ea2aad1457.webp)

-

进行抱杆安装时，用四个固定板、四个 M12 螺栓和四个 M12 螺母固定支架。将每个螺栓依次穿过安装支架、固定板和抱箍，然后拧紧。

![Mounting frame attached to a pole with fixing plates and M12 bolts.](/img/9ce330e0e7350b7d.webp)

-

在机箱下侧附近的四颗固定螺钉下方留出 **3 mm** 的间隙，以便它们卡入安装支架。

![Chassis fixing screws with a 3 mm gap for the mounting frame.](/img/6a8b4a8083d988a8.webp)

-

将机箱放置到支架上，使两侧的螺钉卡入固定孔。

![Intercell chassis seated in the mounting frame.](/img/bbc68dda840ffadc.webp)

-

拧紧并固定全部八颗螺钉，完成安装。

![Secured chassis with the mounting screw positions marked.](/img/65cd7238d2893837.webp)

## 接地 {#grounding}

既要对安装基础设施（包括铁塔和桅杆）接地，也要对设备接地。将接地线连接到设备的接地螺钉，另一端连接到已接地的桅杆。

电源接口防雷标准：**GB/T 17626.5** 和 **IEC 61000-4-5**。

## 扩展插槽与端口 {#expansion-slots-and-ports}

图中数字标识各连接器和指示灯：

![Intercell connector panel with numbered power, antenna, indicator, Ethernet, and SFP positions.](/img/bc9e352c53b5b238.webp)

- 电源连接器。
- 天线连接器。
- 电源指示灯。
- 活动指示灯。
- GPS 天线连接器。
- SNIFF 天线连接器。
- 以太网连接器。
- SFP 连接器。

## 硬件规格 {#hardware-specifications}

<table><thead><tr><th>规格</th><th>值</th></tr></thead><tbody><tr><td>LTE 频段</td><td>TDD B38：2570–2620 MHz。TDD B39：1880–1920 MHz。</td></tr><tr><td>信道带宽</td><td>5、10、15 或 20 MHz。</td></tr><tr><td>20 MHz 下单载波峰值速率</td><td>下行：140 Mbps（256QAM，SF2）。上行：30 Mbps（64QAM，SF1）。</td></tr><tr><td>20 MHz 下载波聚合峰值速率</td><td>下行：280 Mbps（256QAM，SF2）。上行：60 Mbps（64QAM，SF1）。</td></tr><tr><td>用户容量</td><td>2 × 196 个 RRC 连接用户和 2 × 96 个活跃用户。</td></tr><tr><td>同步</td><td>GPS、IEEE 1588v2 和网络监听。</td></tr><tr><td>回传接口</td><td>一个 RJ45 千兆以太网端口和一个光 SFP 端口。</td></tr><tr><td>射频连接器</td><td>六个：四个天线连接器、一个嗅探连接器和一个 GPS/北斗连接器。</td></tr><tr><td>最大输出功率</td><td>每副天线 40 ± 1 dBm。配置发射功率时应保持在 40 dBm 限值以内。</td></tr></tbody></table>

## 配件 {#accessories}

包装内包含：

- 带插头的电源线。不含电源。
- [S-31DLC20D SFP 模块](https://mikrotik.com/product/S-31DLC20D-181)。
- [RBGESP 以太网浪涌保护器](https://mikrotik.com/product/rbgesp)。
- N/SMA-JK 转接器。
- 用于 GPS 和嗅探连接器的防雷保护。
- 安装支架。
- 大杆安装附件。

有关 SFP 模块兼容性，请参阅 [MikroTik 有线接口兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 升级示例 {#upgrade-example}

<a href="/assets/files/intercell-upgrade-example-5ece1656a406f6ae31224ea25803dc93.pdf" target="_blank" rel="noopener">下载固件升级示例（PDF）</a>，其中包含检查固件版本、选择镜像和验证升级的截图。

## B38 配置示例 {#b38-configuration-example}

<a href="/assets/files/intercell-b38-cfg-example-2078e289f3e5aef6e28fbbe0196d7f12.pdf" target="_blank" rel="noopener">下载 B38 配置示例（PDF）</a>，其中包含将小区配置调整为频段 38 并重启设备的截图。

## Intercell 内置 EPC {#intercell-built-in-epc}

<a href="/assets/files/intercell-built-in-epc-75f9a8dc8ba16b3652fef99419e9caee.pdf" target="_blank" rel="noopener">下载内置 EPC 配置文档（PDF）</a>，内容涵盖网络拓扑、演进分组核心网（EPC）参数和用户配置。

## 通过串口控制台重置配置 {#reset-configuration-through-the-serial-console}

<a href="/assets/files/intercell-reset-serial-console-a68ab7a25f27ea98bd8a568d1f3f9239.pdf" target="_blank" rel="noopener">下载串口控制台重置说明（PDF）</a>，包括拆开机箱、串口连接和删除配置文件。

:::warning warning

串口控制台操作会删除配置文件，并在重启后恢复默认配置。

:::

## 配置导入 {#configuration-import}

<a href="/assets/files/intercell-cfg-import-6bea2be2b015b0d4b56eb4ed5763fd49.pdf" target="_blank" rel="noopener">下载配置导入示例（PDF）</a>，内容涵盖数据模型版本匹配以及 Device 和 Cndata 配置文件的导入。

## 监控 {#monitoring}

<a href="/assets/files/intercell-monitoring-e1bb86c0453d3c8c7d5bc77d71765444.pdf" target="_blank" rel="noopener">下载协议栈日志查看器文档（PDF）</a>，内容涵盖监控工具和日志分析。

## 完整双载波配置 {#full-dual-carrier-configuration}

<a href="/assets/files/intercell-dual-carrier-configuration-d2a48f833ca10c90ac192e01e2f96bee.pdf" target="_blank" rel="noopener">下载完整双载波配置文档（PDF）</a>，内容涵盖初始设置、网络与射频配置以及维护。

## 操作系统支持 {#operating-system-support}

设备运行 Intercell HeNB 软件。不支持 RouterOS。
