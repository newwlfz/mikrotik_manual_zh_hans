---
title: "CRS 系列"
slug: /crs-series
source: https://manual.mikrotik.com/hardware/crs-series
captured_at: '2026-11-04T09:45:44+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/7da2e3c29d053a0a.webp)

![](/img/ef6feece3b9368b4.webp)

:::info 本文涵盖

- **CRS109-8G-1S-2HnD-IN**
- **CRS112-8G-4S-IN**
- **CRS210-8G-2S+IN**
- **CRS212-1G-10S-1S+IN**
:::

CRS 是一款高度可配置的交换机，由 RouterOS 驱动。

## 首次使用 {#first-use}

- 安装设备或将其放置在平坦表面上，具体说明请参见相关段落。
- 选择您的供电方案，可选方式请参见相关章节。
- 首次连接必须使用以太网线，通过 MikroTik WinBox 工具完成。
- 使用 WinBox 从任意端口连接到默认 IP 地址 192.168.88.1，用户名为 admin，密码为空，设备已设置为交换机模式（对于某些型号，请查看标签上的用户和无线密码）。
- 点击 “Check for updates” 按钮将设备更新到 v6.46 或最新的 RouterOS 软件，以确保最佳性能和稳定性。设备需要具有可用的互联网连接。
- 如需手动更新设备，请访问我们的下载页面 [https://mikrotik.com/download](https://mikrotik.com/download)
- 选择您的架构（MIPSBE），并从任意通道下载最新的软件包到您的 PC。
- 打开 WinBox，在 Files 菜单中上传软件包。
- 重启设备。
- 更新软件可确保获得最新的安全修复，并符合当地法律规定的各项要求。
- 选择您所在的国家/地区。
- 设置您的密码以保护设备安全。

## 供电 {#powering}

这些设备可通过以下方式供电：

- 直接输入电源插孔：8-56V（随附 24V 0.8A 电源适配器），
- 无源 PoE 输入：8-56V（随附注入器）。CRS212-1G-10S-1+IN 除外，该型号仅接受 8-30V 直接输入，不支持 PoE 输入

## 扩展插槽和端口 {#extension-slots-and-ports}

- 除 CRS212 外：八个（8）10/100/1000（千兆）以太网端口（Auto MDI/X）。
- CRS109：一个 SFP 笼，兼容 1.25G SFP 模块，内置 802.11b/g/n 2GHz 无线接入点。
- CRS112：四个 SFP 笼，兼容 1.25G SFP 模块。
- CRS210：两个 SFP+ 笼，SFP+1 兼容 1.25G 和 10G，SFP+2 仅兼容 10G SFP 模块。
- CRS212：十个 SFP 笼、一个 SFP+ 笼、一个千兆以太网端口。该设备配备一个 RJ45 串口，默认设置为 115200bit/s、8 个数据位、1 个停止位、无校验。可使用标准 RJ45 转 COM 线缆，引脚定义请参见 [Serial Console 手册](/docs/management-tools/serial-console#rj45-type-serial-port)

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 “Check for updates” 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从此处开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见 “Reset button” 章节。

## 默认配置 {#default-configuration}

- CRS109-8G-1S-2HnD-IN：端口 2-8 处于交换状态，无线接口与交换机已桥接，并且桥中包含 DHCP 服务器。Eth1 和 SFP1 已配置 DHCP 客户端。
- 所有其他型号的所有端口均处于交换状态。这两种型号均可通过 IP 192.168.88.1 访问，用户名为 admin，没有密码。请使用 Web 浏览器连接此 IP 地址进行配置。连接和配置指南请参见此页面：[RouterOS 文档](/docs/introduction)

## Reset 按钮 {#reset-button}

Reset 按钮具有三项功能：

• 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置恢复为默认值。 • 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。 • 在 LED 熄灭（约 20 秒）后松开按钮，可使设备搜索 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。适用于 RouterBOOT 调试和恢复。

## 操作系统支持 {#operating-system-support}

设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要将制造商/供应商提供的定制固件版本应用于最终用户设备，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有 “EG” 字母的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有 “EG” 字母的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有 “EG” 字母的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包必须应用于最终用户设备，以防止最终用户重新配置。产品将标有国家代码 “-EG”。为确保符合当地主管机构的规定，此设备需要升级到最新版本！最终用户有责任遵守当地国家/地区的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7CRS109-8G2HND 本设备经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制要求。这些限制旨在为住宅安装环境中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰： • 重新调整接收天线的方向或位置。 • 增加设备与接收器之间的间距。 • 将设备连接到与接收器所连接电路不同的插座上。 • 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器位于同一位置或联合运行。重要提示：射频辐射暴露。本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。安装和操作本设备时，散热器与您身体任何部位之间的最小距离应为 20 cm。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

<table><thead><tr><th>*BG*</th><th>С настоящото Mikrotīkls SIA декларира, че този тип радиосъоръжение RouterBOARD е в съответствие с Директива 2014/53/ЕС. Цялостният текст на ЕС декларацията за съответствие може да се намери на следния интернет адрес: [https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Tímto Mikrotīkls SIA prohlašuje, že typ rádiového zařízení RouterBOARD je v souladu se směrnicí 2014/53/EU. Úplné znění EU prohlášení o shodě je k dispozici na této internetové adrese: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Hermed erklærer Mikrotīkls SIA , at radioudstyrstypen RouterBOARD er i overensstemmelse med direktiv 2014/53/EU. EU-overensstemmelseserklæringens fulde tekst kan findes på følgende internetadresse: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Hiermit erklärt Mikrotīkls SIA , dass der Funkanlagentyp RouterBOARD der Richtlinie 2014/53/EU entspricht. Der vollständige Text der EU-Konformitätserklärung ist unter der folgenden Internetadresse verfügbar: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Με την παρούσα ο/η Mikrotīkls SIA , δηλώνει ότι ο ραδιοεξοπλισμός RouterBOARD πληροί την οδηγία 2014/53/ΕΕ. Το πλήρες κείμενο της δήλωσης συμμόρφωσης ΕΕ διατίθεται στην ακόλουθη ιστοσελίδα στο διαδίκτυο: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 RouterBOARD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Por la presente, Mikrotīkls SIA declara que el tipo de equipo radioeléctrico RouterBOARD es conforme con la Directiva 2014/53/UE. El texto completo de la declaración UE de conformidad está disponible en la dirección Internet siguiente: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Käesolevaga deklareerib Mikrotīkls SIA , et käesolev raadioseadme tüüp RouterBOARD vastab direktiivi 2014/53/EL nõuetele. ELi vastavusdeklaratsiooni täielik tekst on kättesaadav järgmisel internetiaadressil: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA vakuuttaa, että radiolaitetyyppi RouterBOARD on direktiivin 2014/53/EU mukainen. EU-vaatimustenmukaisuusvakuutuksen täysimittainen teksti on saatavilla seuraavassa internetosoitteessa: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Le soussigné, Mikrotīkls SIA , déclare que l'équipement radioélectrique du type RouterBOARD est conforme à la directive 2014/53/UE. Le texte complet de la déclaration UE de conformité est disponible à l'adresse internet suivante: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA ovime izjavljuje da je radijska oprema tipa RouterBOARD u skladu s Direktivom 2014/53/EU. Cjeloviti tekst EU izjave o sukladnosti dostupan je na sljedećoj internetskoj adresi: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA igazolja, hogy a RouterBOARD típusú rádióberendezés megfelel a 2014/53/EU irányelvnek. Az EU-megfelelőségi nyilatkozat teljes szövege elérhető a következő internetes címen: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Il fabbricante, Mikrotīkls SIA , dichiara che il tipo di apparecchiatura radio RouterBOARD è conforme alla direttiva 2014/53/UE. Il testo completo della dichiarazione di conformità UE è disponibile al seguente indirizzo Internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Hér með lýsir Mikrotīkls SIA því yfir að RouterBOARD er í samræmi við grunnkröfur og aðrar kröfur, sem gerðar eru í tilskipun 2014/53/EU.Fullur texti ESB samræmisyfirlýsingar er að finna á eftirfarandi veffangi: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Aš, Mikrotīkls SIA , patvirtinu, kad radijo įrenginių tipas RouterBOARD atitinka Direktyvą 2014/53/ES. Visas ES atitikties deklaracijos tekstas prieinamas šiuo interneto adresu: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Ar šo Mikrotīkls SIA deklarē, ka radioiekārta RouterBOARD atbilst Direktīvai 2014/53/ES. Pilns ES atbilstības deklarācijas teksts ir pieejams šādā interneta vietnē: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>B'dan, Mikrotīkls SIA , niddikjara li dan it-tip ta' tagħmir tar-radju RouterBOARD huwa konformi mad-Direttiva 2014/53/UE. It-test kollu tad-dikjarazzjoni ta' konformità tal-UE huwa disponibbli f'dan l-indirizz tal-Internet li ġej: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Hierbij verklaar ik, Mikrotīkls SIA , dat het type radioapparatuur RouterBOARD conform is met Richtlijn 2014/53/EU. De volledige tekst van de EU-conformiteitsverklaring kan worden geraadpleegd op het volgende internetadres: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA erklærer herved at utstyret RouterBOARD er i samsvar med de grunnleggende krav og øvrige relevante krav i direktiv 2014/53/EU. Den fulle teksten til EU-samsvarserklæringen er tilgjengelig på følgende internettadresse: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA niniejszym oświadcza, że typ urządzenia radiowego RouterBOARD jest zgodny z dyrektywą 2014/53/UE. Pełny tekst deklaracji zgodności UE jest dostępny pod następującym adresem internetowym: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>O(a) abaixo assinado(a) Mikrotīkls SIA declara que o presente tipo de equipamento de rádio RouterBOARD está em conformidade com a Diretiva 2014/53/UE. O texto integral da declaração de conformidade está disponível no seguinte endereço de Internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Prin prezenta, Mikrotīkls SIA declară că tipul de echipamente radio RouterBOARD este în conformitate cu Directiva 2014/53/UE. Textul integral al declarației UE de conformitate este disponibil la următoarea adresă internet: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA týmto vyhlasuje, že rádiové zariadenie typu RouterBOARD je v súlade so smernicou 2014/53/EÚ. Úplné EÚ vyhlásenie o zhode je k dispozícii na tejto internetovej adrese: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA potrjuje, da je tip radijske opreme RouterBOARD skladen z Direktivo 2014/53/EU. Celotno besedilo izjave EU o skladnosti je na voljo na naslednjem spletnem naslovu: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Härmed försäkrar Mikrotīkls SIA att denna typ av radioutrustning RouterBOARD överensstämmer med direktiv 2014/53/EU. Den fullständiga texten till EU-försäkran om överensstämmelse finns på följande webbadress: [https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

![](/img/984ad54320693690.webp)

**BG. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-bg](https://mt.lv/help-bg)

**CS. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-cs](https://mt.lv/help-cs)

**DA. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-da](https://mt.lv/help-da)

**DE. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-de](https://mt.lv/help-de)

**EL. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-el](https://mt.lv/help-el)

**EN. 说明书**：连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 进行配置。更多信息请参见 \{+\}[https://mt.lv/help](https://mt.lv/help)

**ES. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-es](https://mt.lv/help-es)

**ET. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-et](https://mt.lv/help-et)

**FI. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-fi](https://mt.lv/help-fi)

**FR. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-fr](https://mt.lv/help-fr)

**HR. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-hr](https://mt.lv/help-hr)

**HU. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-hu](https://mt.lv/help-hu)

**IT. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-it](https://mt.lv/help-it)

**IS. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-is](https://mt.lv/help-is)

**NO. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-no](https://mt.lv/help-no)

**LT. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-lt](https://mt.lv/help-lt)

**LV. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-lv](https://mt.lv/help-lv)

**MT. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-mt](https://mt.lv/help-mt)

**NL. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-nl](https://mt.lv/help-nl)

**PL. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-pl](https://mt.lv/help-pl)

**PT. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-pt](https://mt.lv/help-pt)

**RO. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-ro](https://mt.lv/help-ro)

**SK. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-sk](https://mt.lv/help-sk)

**SL. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-sl](https://mt.lv/help-sl)

**SV. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-sv](https://mt.lv/help-sv)

**NO. 说明**: 连接电源适配器以开启设备。在 Web 浏览器中打开 192.168.88.1 以配置产品。更多信息请参阅 \{+\}[https://mt.lv/help-no](https://mt.lv/help-no)

**RU. Руководство по эксплуатации**: подключите адаптер питания чтобы включить устройство. Откройте 192.168.88.1 в своем веб-браузере для конфигурации. Дополнительная информация [https://mt.lv/help-ru](https://mt.lv/help-ru) **CN. 说明书。** 连接电源适配器以打开设备。 在Web浏览器中打开192.168.88.1进行配置。 有关\{+\}[https://mt.lv/help-zh](https://mt.lv/help-zh)

的更多信息
