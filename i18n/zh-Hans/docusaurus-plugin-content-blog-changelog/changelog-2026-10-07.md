---
title: "文档更新 - 2026年10月7日"
date: 2026-10-07
slug: /changelog-2026-10-07
source: https://manual.mikrotik.com/changelog/changelog-2026-10-07
captured_at: '2026-11-04T06:08:58+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 7 日的文档变更摘要。

## 管理工具 {#management-tools}

- **[SSH](/docs/management-tools/ssh)**、**[ssh-exec](/docs/cli-reference/system/ssh-exec)**：已在实验路由器上验证执行细节：多行远程命令在 RouterOS 7.25 及更高版本上执行（SSH 服务器仍不提供伪终端）。exit-code 是远程命令 shell 报告的代码，而 RouterOS 命令失败时会以错误文本的形式返回在输出中。已修正 ssh-exec 示例，改为使用 monitor ... once as-value 读取链路状态。
- **[CMR](/docs/management-tools/cmr)**：新增“run-script 权限”章节：通过 /cmr/device/run-script 发送的脚本会在每个客户端上以 read、write、test 和 reboot 策略运行，且没有用户会话。需要其他策略的命令会失败并提示“not enough permissions (9)”——例如 /user add 需要 policy，/tool sniffer 需要 sniff，因此 /export 也会失败。敏感值会以 * 掩码显示，但可以设置。由 run-script 创建的脚本和 scheduler 条目会以相同的四个策略和 *sys 所有者保存，更宽泛的策略会被缩减回这四个策略。

## 无线 {#wireless}

- **[Wi-Fi](/docs/wireless/wifi)**：authentication-types 列表现在包含 wpa3-psk-gd，并重写了默认值说明：配置了 passphrase 后，默认集合取决于 WiFi 标准、band 和 mode——6-7 GHz 的 AP 默认为 WPA3-PSK 和 GD，2.4/5 GHz 的 WiFi 7 AP 默认为 WPA2/WPA3-PSK 和 GD，WiFi 5/6 AP 默认为 WPA2-PSK，station 默认为 WPA/WPA2-PSK。

## 硬件 {#hardware}

- **[PoE](/docs/hardware/poe-out)**：全局设置和监控表格已与 CLI 参考同步：新增了 poe-in-max-power、jack-max-power 和 2pin-max-power 变体、按电源来源划分的 poe-out-max-power 行，以及只读的 PoE 控制器固件版本。监控部分新增了 port-type 和 poe-voltage 字段、更新后的 poe-out-status 列表（no-valid-PSU、lldp-power-off、low-voltage-pd-detected 等），并补充了关于通过 PoE-In 供电的设备上“power-limiting port”状态的说明。
