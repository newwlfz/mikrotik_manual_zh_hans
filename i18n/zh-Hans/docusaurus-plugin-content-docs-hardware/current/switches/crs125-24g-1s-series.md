---
title: "CRS125-24G-1S 系列"
slug: /crs125-24g-1s-series
source: https://manual.mikrotik.com/hardware/crs125-24g-1s-series
captured_at: '2026-11-04T09:46:06+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/16ae7547ab1e2421.webp)

![](/img/ede41f114aaf4c55.webp)

:::info 本文涵盖

- **CRS125-24G-1S-IN**
- **CRS125-24G-1S-2HnD-IN**
:::

## 首次使用 {#first-use}

可以通过 IP 192.168.88.1 访问设备，用户名为 admin，密码为空（某些型号请查看贴纸上的用户名和无线密码）。请使用 Web 浏览器连接此 IP 地址进行配置。有关连接和配置指南，请参阅本页面：[RouterOS 文档](/docs/introduction) 设备已预装 RouterOS，可直接使用。设备兼容 RouterOS v6 及更高版本。对于无线型号 CRS125-24G-1S-2HnD-IN，端口已交换，无线接口和交换机已桥接，并且网桥中包含 DHCP 服务器。Eth1 和 SFP1 已配置 DHCP 客户端。连接后请选择您所在的国家/地区，以应用该国家/地区的法规设置。

- 点击“检查更新”按钮将设备更新到 v6.46 或最新 RouterOS 软件，以确保最佳性能和稳定性。设备需要具有可用的互联网连接。
- 要手动更新设备，请访问我们的下载页面 [https://mikrotik.com/download](https://mikrotik.com/download)
- 选择您的架构（ARM），并从任意通道下载最新软件包到您的 PC。
- 打开 WinBox，在 Files 菜单中上传软件包。
- 重启设备。
- 更新软件可确保获得最新的安全修复和当地法律规定的法规要求。
- 设置密码以保护设备。

## 供电 {#powering}

设备接受直流输入电源插孔：10-28 V（包装内附 24 V0.8 A PSU）。最大负载下的功耗可达 20 W。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的“检查更新”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用所在的国家/地区，以符合当地法规。RouterOS 除了本文档所述内容外，还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，请参阅相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 二十四个（24）10/100/1000（千兆）以太网端口（Auto MDI/X）
- CRS125 有一个 SFP 插槽，兼容 1.25G SFP 模块。
- CRS125-24G-1S-2HnD-IN 内置 802.11b/g/n 2GHz 无线接入点。

## 复位按钮 {#reset-button}

routerBOOT 复位按钮具有以下功能。按住按钮并通电，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置和默认值。
- 当 LED 不再亮起（约 20 秒）后松开按钮，可使设备查找 Netinstall 服务器（通过网络安全重装 RouterOS 时需要）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 加载程序。这可用于 RouterBOOT 调试和恢复。

## 操作系统支持 {#operating-system-support}

设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。其他操作系统尚未测试。

## 安全声明 {#safety-notice}

![](/img/7ef0e65b341a324c.webp)

电击危险。本设备只能由经过培训的人员进行维修。这是 A 类设备，在住宅无线电设备附近操作可能会造成无线电干扰。

![](/img/9f19426565d1f529.webp)

CRS125-24G-1S-IN：

![](/img/03ee8c1f12d35999.webp)

![](/img/1ed1d278d5e61c9c.webp)

联邦通信委员会干扰声明 FCC ID:TV7CRS109-8G2HND 本设备已通过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为住宅安装提供合理保护，防止有害干扰。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的间隔。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改，可能会使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器共存或一起操作。重要：射频辐射暴露。本设备符合 FCC 针对不受控环境规定的射频辐射暴露限制。安装和操作本设备时，辐射器与您身体任何部位之间的最小距离应为 20 cm。

### CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

<table><thead><tr><th>*BG*</th><th>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/ЕС 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/ΕΕ 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EL 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/ES 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/ES 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EÚ 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 RouterBOARD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

### MPE 声明 {#mpe-statement}

本设备符合针对不受控环境规定的欧盟辐射暴露限制。除非本文件第 1 页另有明确说明，否则安装和操作本设备时，辐射器与您身体之间的最小距离应为 20 cm。在 RouterOS 中必须指定您所在的国家/地区，以确保遵守当地无线法规。

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国均可无限制使用</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国均可无限制使用</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布缆要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！*

![](/img/984ad54320693690.webp)

***BG. 说明书**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-bg](https://mt.lv/help-bg)* ***CS. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-cs](https://mt.lv/help-cs)* ***DA. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-da](https://mt.lv/help-da)* ***DE. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-de](https://mt.lv/help-de)* ***EL. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-el](https://mt.lv/help-el)* ***EN. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help](https://mt.lv/help)* ***ES. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-es](https://mt.lv/help-es)* ***ET. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-et](https://mt.lv/help-et)* ***FI. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-fi](https://mt.lv/help-fi)* ***FR. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-fr](https://mt.lv/help-fr)* ***HR. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-hr](https://mt.lv/help-hr)* ***HU. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-hu](https://mt.lv/help-hu)* ***IT. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-it](https://mt.lv/help-it)* ***IS. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-is](https://mt.lv/help-is)* ***NO. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-no](https://mt.lv/help-no)* ***LT. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-lt](https://mt.lv/help-lt)* ***LV. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-lv](https://mt.lv/help-lv)* ***MT. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-mt](https://mt.lv/help-mt)* ***NL. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-nl](https://mt.lv/help-nl)* ***PL. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-pl](https://mt.lv/help-pl)* ***PT. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-pt](https://mt.lv/help-pt)* ***RO. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-ro](https://mt.lv/help-ro)* ***SK. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-sk](https://mt.lv/help-sk)* ***SL. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-sl](https://mt.lv/help-sl)* ***SV. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-sv](https://mt.lv/help-sv)* ***NO. 使用说明**: 连接电源适配器以打开设备。在网页浏览器中打开 192.168.88.1 以配置产品。更多信息请见* \{*\}\{+\}[https://mt.lv/help-no](https://mt.lv/help-no)*

- **RU. 使用说明**: 连接电源适配器以打开设备。在您的网页浏览器中打开 192.168.88.1 进行配置。更多信息* \{*\}\{+\}[https://mt.lv/help-ru](https://mt.lv/help-ru)* ***CN. 说明书。*** *连接电源适配器以打开设备。 在Web浏览器中打开192.168.88.1进行配置。 有关*\{*\}\{+\}[https://mt.lv/help-zh](https://mt.lv/help-zh)* *的更多信息*
