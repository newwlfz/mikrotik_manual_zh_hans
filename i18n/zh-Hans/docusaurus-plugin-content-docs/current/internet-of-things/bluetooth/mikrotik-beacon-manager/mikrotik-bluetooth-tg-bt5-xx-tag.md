---
sidebar_key: "internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-bluetooth-tg-bt5-xx-tag"
sidebar_position: 3
title: "MikroTik 蓝牙 TG-BT5-XX 标签更新日志"
sidebar_label: "MikroTik 蓝牙 TG-BT5-XX 标签更新日志"
source: https://manual.mikrotik.com/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-bluetooth-tg-bt5-xx-tag
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 2.5.0 {#250}

- 新增广告类型 “Device Name”。
- 降低设备在工作期间的功耗。对于短间隔广告，功耗降低将会比较明显。
- 如果启用了带温度数据的信标，则降低功耗。
- 降低 WDT（看门狗定时器）的功耗。如果启用了任何广告间隔小于 7s 的信标，此改动就会生效。

## 2.4.0 {#240}

- 在所有广告中包含 ad flags 字段。
- 新增禁用密码保护的功能。
- 新增禁用加速度计的可能性。
- 为 MikroTik 格式载荷新增一个选项，用于检测加速度计是否被禁用（flags 字段现在可以指示加速度计处于禁用状态）。
- 允许设置非标准广告间隔。
- 新增用于禁用某个广告通道的配置选项。
- 实现了可配置的可连接广告，允许在可配置状态下连接到标签，而无需一直按住磁铁。
- 为加速度计新增配置选项，用于设置滤波器类型：HPF、LPF（高通或低通滤波器）。
- 日志记录方面的改进。

## 2.3.1 {#231}

- 提升了设备性能。

## 2.3.0 {#230}

- 升级了蓝牙协议栈版本。
- 提升了设备性能。

## 2.2.0 {#220}

- 新增对非标准广告间隔的支持。

## 2.1.0 {#210}

- 修复了从出厂睡眠模式唤醒后出现的时序不一致问题。
- 改进了设备进入配置模式之前的 LED 行为。

## 2.0.0 {#200}

- 限制将唤醒阈值设置为 0g。
- 新增写保护功能。
- 提高了唤醒阈值的最小有效值。
- 升级了蓝牙协议栈版本。

## 1.6.0 {#160}

- 提升了 Data Log 的稳定性。
- 新增一个选项，允许用户手动校准传感器的温度（偏移量）。

## 1.5.0 {#150}

- 新增触发器 Impact。
- 新增 Data Logs。

## 1.4.0 {#140}

- 新增一个选项，用于将设备重置回广告模式。
- 新增一个选项，用于清除已保存的日志消息。
- 新增 Unix Time 参数。
