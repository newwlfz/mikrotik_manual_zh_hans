---
title: "品牌化"
description: "RouterOS Branding 软件包支持自定义系统元素，包括路由器名称、公司 URL、ASCII 徽标和 WebFig 接口。它支持为登录页面、皮肤和 hotspot 徽标包含自定义文件，并提供特定版本选项，例如隐藏 SNMP 名称。"
tags:
  - 'branding'
  - 'webfig'
  - 'customization'
source: https://manual.mikrotik.com/docs/7.24/management-tools/branding
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "system-information-and-utilities"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 允许通过品牌包对系统进行少量定制（修改默认配置、LCD 徽标、WebFig 主页等）。

这是一个特殊的系统包，你可以在 [mikrotik.com](https://mikrotik.com) 账户中的“Branding maker”部分生成。生成的文件扩展名为 .dpk，可采用与 .npk 包相同的方式安装。

要在路由器上安装该包，需要先将品牌包上传到路由器，然后重启路由器。也可以使用 Netinstall 工具实现相同效果。

生成的包可安装在任何 RouterOS 版本中。

:::info
请注意，特定品牌功能从特定 RouterOS 版本开始可用。
:::

## 选项 {#options}

可通过品牌包配置的选项：

- **Router name** - 品牌包名称、设备标识和 RouterOS 中的 [platform name](/docs/diagnostics-monitoring-and-troubleshooting/resource)，只能为一个单词，不要使用空格或特殊字符。
- **Company URL**- 连接到 RouterOS 设备时显示在控制台中的值。
- **Manual URL**- 可在 [WebFig](/docs/management-tools/webfig) 中打开的文档链接。
- **ASCII Logo** - 登录命令行界面（即 Telnet、SSH、WinBox Terminal）时显示的文本徽标。可在 [branding maker](https://mikrotik.com/client/branding) 中创建徽标，或从任意其他纯文本编辑器复制。徽标高度不能超过 8 行，宽度不受限制，但请注意，在狭窄的终端窗口中徽标可能会变形。
- **Hide "Mikrotik" from SNMP information** - 在 SNMP 信息中隐藏 MikroTik 名称。
- **Do not run script on install** - 安装品牌包时不运行 Default configuration script。
- **Hide Default configuration prompt**- 配置重置后隐藏 Default configuration 提示 *（从 RouterOS 7.15 开始可用）*。
- **Hide default caps-mode-script** - 隐藏 default caps-mode-script *（从 RouterOS 7.15 开始可用）*。

## 自定义文件 {#custom-files}

自定义文件（例如 WebFig 登录页面、WebFig 徽标、hotspot、皮肤、默认配置、LCD 徽标和 CAPs 模式脚本）可以包含在 branding 包中。

:::warning
任何 reset button 模式都会从 branding 包恢复默认配置。
:::

#### WebFig 登录页面 {#webfig-login-page}

WebFig 登录页面是自定义的默认 RouterOS 登录界面，在访问路由器 IP 地址时显示。可以自定义该页面，以满足品牌或功能需求。

- **自定义文件：**

  - **`/index2.html`**：登录页面的主模板。
  - **`/assets/style.css`**：MikroTik RouterOS 样式表。
  - **`/assets/script.js`** 负责处理登录功能，并包含使按钮具有交互性的代码。
- **`script.js` 的必需元素：**

  1. **登录表单：**  
     `<form id="login">`
  2. **用户名字段：**  
     `<input id="name" data-defaultuser="admin">`
     - `admin` 值可以更改为其他用户名，也可以留空。
  3. **密码字段：**  
     `<input id="password">`
  4. **错误显示区域：**  
      ``
- 以下是用户自定义登录页面的示例，其中包含“Show Password”按钮，通过修改后的 **`[index2.html](pathname:///assets/295239801_index2.html)`** 以及附加的 [toggle_button.css](pathname:///assets/295239803_toggle_button.css) 和 [show_password.js](pathname:///assets/295239802_show_password.js) 文件实现。  
  HTML 文件必须命名为“index2.html”，并且应使用正确嵌套的 HTML，以确保与所有浏览器兼容。
- 上传的图片或 JavaScript 文件必须引用与索引文件相同的路径。不能使用自定义文件夹名称。

---

#### WebFig 徽标 {#webfig-logo}

RouterOS WebFig 页面（配置页面）徽标。要覆盖 WebFig 登录页面上的 MikroTik 徽标，请上传名为“mikrotik\_logo.png”的自定义徽标。

#### hotspot

Hotspot 登录页面徽标。文件必须命名为“logobottom.png”。

#### skins

名为“your\_file\_name.json”的皮肤文件。要将特定皮肤应用到特定用户组，无需登录路由器。可以通过上传 Default 配置文件进行 branding 来实现。

#### Default 配置 {#default-configuration}

RouterOS 默认配置文件，将覆盖 RouterOS 默认配置。即使 RouterOS 重置后，该配置仍会保留。可以使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码（从 RouterOS 7.10 起可访问出厂密码）。

:::warning
如果 Default 配置或 CAPs 模式脚本执行超过 2 分钟，脚本将失败，并且 LOG 将包含 *"runtime limit exceeded"*，或在极少数情况下包含 *"std failure: timeout"* 错误。
:::

#### LCD 徽标 {#lcd-logo}

LCD 徽标将显示在配备 LCD 屏幕的设备上。徽标尺寸不得超过 160px 宽和 72px 高。CCR1xxx 系列使用白色（0xffffff）背景，2011 系列使用黑色（0x000000）背景。

#### 自定义文件 {#custom-files-1}

自定义文件将复制到名为“branding”的文件夹中，并可在 RouterOS 中访问。

#### CAPs 模式脚本 {#caps-mode-script}

RouterOS CAPs 模式脚本将覆盖 RouterOS 默认 CAPs 模式脚本。可以通过使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码（自 RouterOS 7.15 起可用）。

:::warning
任何重置按钮模式都会从 branding 包恢复默认配置。CAPs 模式脚本只能在设备完全启动后，通过 GUI 或 CLI 执行[配置重置](/docs/getting-started/configuration-management#configuration-reset)来应用。
:::

:::warning
如果 Default configuration 或 CAPs 模式脚本执行超过 2 分钟，脚本将失败，LOG 将包含 *"runtime limit exceeded"* 错误，或在极少数情况下包含 *"std failure: timeout"* 错误。
:::
