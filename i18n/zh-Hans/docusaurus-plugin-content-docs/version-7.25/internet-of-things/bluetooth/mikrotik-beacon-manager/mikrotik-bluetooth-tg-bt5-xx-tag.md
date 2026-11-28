---
title: "MikroTik Bluetooth TG-BT5-XX tag 更新日志"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-bluetooth-tg-bt5-xx-tag
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 2.5.0

- 新增广播类型“Device Name”。
- 降低设备在活动期间的功耗。对于短间隔广播，功耗降低效果明显。
- 启用带温度数据的信标时，可降低功耗。
- 降低 WDT（watchdog timer）功耗。如果启用了广播间隔小于 7s 的任意信标，将产生影响。

## 2.4.0

- 在所有广播中包含 ad flags 字段。
- 新增禁用密码保护的功能。
- 新增禁用加速度计的功能。
- 新增一个选项，使 MikroTik 格式 payload 能够检测已禁用的加速度计（flags 字段现在可以指示加速度计的禁用状态）。
- 允许设置非标准广播间隔。
- 新增用于禁用广播信道的配置选项。
- 实现可配置的可连接广播，允许在可配置状态下连接到标签，而无需按住磁铁。
- 新增加速度计配置选项，用于设置滤波器类型：HPF、LPF（高通或低通滤波器）。
- 改进日志功能。

## 2.3.1

- 提升设备性能。

## 2.3.0

- 升级 Bluetooth stack 版本。
- 提升设备性能。

## 2.2.0

- 新增对非标准广播间隔的支持。

## 2.1.0

- 修复从出厂休眠模式唤醒后的时序不一致问题。
- 改进设备进入配置模式前的 LED 行为。

## 2.0.0

- 限制将唤醒阈值设置为 0g。
- 新增 Write Protection 功能。
- 提高唤醒阈值的最小有效值。
- 升级 Bluetooth stack 版本。

## 1.6.0

- 提升 Data Log 稳定性。
- 新增一个选项，允许用户手动校准传感器温度（offset）。

## 1.5.0

- 新增了触发器 Impact。
- 新增了 Data Logs。

## 1.4.0

- 新增了将设备重置回广播模式的选项。
- 新增了清除已保存日志消息的选项。
- 新增了 Unix Time 参数。
