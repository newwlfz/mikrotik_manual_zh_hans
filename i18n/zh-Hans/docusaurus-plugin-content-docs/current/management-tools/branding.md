---
sidebar_key: "management-tools/branding"
sidebar_position: 15
title: "品牌定制"
sidebar_label: "品牌定制"
description: "RouterOS Branding 软件包支持自定义系统元素，包括路由器名称、公司 URL、ASCII 徽标和 WebFig 界面。它支持为登录页面、皮肤和热点徽标包含自定义文件，同时提供隐藏 SNMP 名称等特定版本选项。"
tags:
  - 'branding'
  - 'webfig'
  - 'customization'
source: https://manual.mikrotik.com/docs/management-tools/branding
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 允许借助品牌定制包进行少量系统自定义（修改默认配置、LCD 徽标、WebFig 主页等）。

这是一个特殊的系统包，可在你的 [mikrotik.com](https://mikrotik.com) 账户中的 "Branding maker" 部分生成。生成的文件将具有 .dpk 扩展名，并且可以通过与 .npk 包完全相同的所有方式安装。

要在路由器上安装该包，必须将品牌定制包上传到路由器，然后路由器必须重启。也可以使用 Netinstall 工具达到相同效果。

生成的包可以安装在任何 RouterOS 版本中。

:::info
请注意，特定的品牌定制功能从特定的 RouterOS 版本开始才可用。

:::

## 选项 {#options}

可使用品牌定制包配置的选项：

- **路由器名称** - 品牌定制包名称、设备身份以及 RouterOS 中的[平台名称](../diagnostics-monitoring-and-troubleshooting/resource.md)，只能是一个词，不要使用空格或特殊字符。
- **公司 URL** - 连接到 RouterOS 设备时在控制台中显示的值。
- **手动 URL** - 可在 [WebFig](./webfig.md) 中打开的文档链接。
- **ASCII 徽标** - 登录命令行界面（即 Telnet、SSH、WinBox Terminal）时显示的文本徽标。可以在 [branding maker](https://mikrotik.com/client/branding) 中创建徽标，或从任何其他纯文本编辑器复制。徽标高度不能超过 8 行，宽度不受限制，但请注意，在狭窄的终端窗口中徽标可能会变形。
- **从 SNMP 信息中隐藏 "Mikrotik"** - MikroTik 名称将在 SNMP 信息中隐藏。
- **安装时不运行脚本** - 安装品牌定制包时不运行默认配置脚本。
- **隐藏默认配置提示** - 在配置重置后隐藏默认配置提示 *（从 RouterOS 7.15 开始可用）*。
- **隐藏默认 caps-mode-script** - 隐藏默认 caps-mode-script *（从 RouterOS 7.15 开始可用）*。

## 自定义文件 {#custom-files}

WebFig 登录页面、WebFig 徽标、hotspot、skins、默认配置、LCD 徽标和 CAPs 模式脚本等自定义文件可以包含在品牌定制包中。

:::warning
任何复位按钮模式都将从品牌定制包恢复默认配置。

:::

#### WebFig 登录页面 {#webfig-login-page}

WebFig 登录页面是访问路由器 IP 地址时显示的自定义默认 RouterOS 登录界面。可以自定义此页面以满足品牌定制或功能需求。

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
  4. **错误显示部分：**  
      ``
- 以下是一个用户自定义登录页面的示例，其中包含一个“显示密码”按钮，通过修改后的 **`[index2.html](pathname:///assets/295239801_index2.html)`** 以及额外的 [toggle_button.css](pathname:///assets/295239803_toggle_button.css) 和 [show_password.js](pathname:///assets/295239802_show_password.js) 文件实现。  
  HTML 文件必须命名为 "index2.html"，并且应使用正确嵌套的 HTML 以确保与所有浏览器兼容。
- 上传的图像或 JavaScript 文件必须引用与索引文件相同的路径。不能使用自定义文件夹名称。

---

#### WebFig 徽标 {#webfig-logo}

RouterOS WebFig 页面（配置页面）徽标。要覆盖 WebFig 登录页面上的 MikroTik 徽标，请上传名为 "mikrotik\_logo.png" 的自定义徽标。

#### hotspot {#hotspot}

Hotspot 登录页面徽标。文件必须命名为 "logobottom.png"。

#### skins {#skins}

名为 "your\_file\_name.json" 的 skin 文件。要将特定 skin 应用到特定用户组，无需登录路由器。可以通过上传默认配置文件，使用品牌定制来实现。

#### 默认配置 {#default-configuration}

一个 RouterOS 默认配置文件，将覆盖 RouterOS 默认配置。此配置即使在 RouterOS 重置后也会保留。可以使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码（对出厂密码的访问从 RouterOS 7.10 开始可用）。

:::warning
如果默认配置或 CAPs 模式脚本执行超过 2 分钟，脚本将失败，并且 LOG 将包含 *"runtime limit exceeded"* 错误，或在极少数情况下包含 *"std failure: timeout"* 错误。

:::

#### LCD 徽标 {#lcd-logo}

LCD 徽标将显示在配备 LCD 屏幕的设备上。徽标大小不能超过 160px 宽和 72px 高。CCR1xxx 系列具有白色 (0xffffff) 背景，2011 系列具有黑色 (0x000000) 背景。

#### 自定义文件 {#custom-files-1}

自定义文件将被复制到名为 "branding" 的文件夹中，并可从 RouterOS 内部访问。

#### CAPs 模式脚本 {#caps-mode-script}

一个 RouterOS CAPs 模式脚本，将覆盖 RouterOS 默认 CAPs 模式脚本。可以通过使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码（从 RouterOS 7.15 开始可用）。

:::warning
任何复位按钮模式都将从品牌定制包恢复默认配置。CAPs 模式脚本只能在设备完全启动后，通过 GUI 或 CLI 执行[配置重置](../getting-started/configuration-management/index.md#configuration-reset)来应用。

:::

:::warning
如果默认配置或 CAPs 模式脚本执行超过 2 分钟，脚本将失败，并且 LOG 将包含 *"runtime limit exceeded"* 错误，或在极少数情况下包含 *"std failure: timeout"* 错误。

:::
