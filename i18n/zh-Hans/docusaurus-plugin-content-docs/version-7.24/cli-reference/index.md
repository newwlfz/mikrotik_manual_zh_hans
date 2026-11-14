---
sidebar_key: "cli-reference/index"
sidebar_position: 32
title: "CLI 参考"
sidebar_label: "CLI 参考"
description: "CLI 参考按控制台路径记录 RouterOS 命令菜单和属性。使用本节可查阅命令语法、配置对象以及 RouterOS 各项功能的操作命令。"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/
captured_at: '2026-11-01T14:01:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

CLI 参考按控制台路径记录 RouterOS 命令菜单和属性。使用本节可查找 RouterOS 功能的命令语法、配置对象和操作命令。

## 参数类型 {#argument-types}

- **address** — 通用地址参数，呈现为 `address (flags=...)`；请参阅下面的[地址标志](#address-flags)
- **alt** — 备选类型，可接受几种不同值类型之一
- **as** — 自治系统编号（用于 BGP 路由）
- **bool** — 布尔值（true/false、yes/no）
- **cfg** — 配置条目标识符
- **composite** — 多个参数的组合，作为一个组处理
- **date** — 日期和时间值
- **enum** — 枚举器，具有列在括号中的预定义值
- **expr** — 表达式或条件（用于路由过滤器和脚本）
- **file** — 文件路径或名称引用
- **iface_enum** — 接口选择列表，通常可以接受接口名称，或诸如 `all`、`none`、`dynamic`、`slave` 之类的预定义值；值列在花括号中
- **ipAddr** — IPv4 地址
- **ip6Addr** — IPv6 地址
- **ipPrefix** — 带前缀长度的 IPv4 地址
- **ip6Prefix** — 带前缀长度的 IPv6 地址
- **ipRange** — IPv4 地址范围
- **macAddr** — MAC 地址（可指定完整地址或使用通配符）
- **meter** — 信号质量级别，通常以 dBm 表示
- **multi** — 多值参数，接受来自已定义集合的多个值
- **num** — 无符号整数，可用范围限制（例如 `[3 .. 20]`、`[.. 10]`、`[4 ..]`）；如未明确指定，则为 32 位范围
- **numericon** — 带单位后缀显示的数字值
- **object** — 结构化值列表（例如地址表或配置项表）
- **pic** — 图片/位图值
- **range** — 数字范围（例如一组端口）
- **remote** — 对远程对象的引用（例如路由过滤器规则）
- **script** — 脚本源代码；呈现为 `alt { script: string }` 的参数既接受来自 `/system script` 的现有脚本名称，也接受内联脚本源代码
- **string** — 文本字符串
- **super** — 复合类型，接受多种不同的参数类型；子类型列在花括号中，例如 `super { bool, time }`
- **switch** — 开/关切换，无需显式值参数
- **time** — 持续时间或间隔，通常以秒为单位，可包含 `s`、`m`、`h`、`d` 等单位
- **timezone** — 时区或 UTC 偏移值
- **ubit** — 带命名位的位域，支持的位名称列在括号中，例如 `ubit (ip, ipv6)`
- **value** — 独立值标识符（通常作为复合类型或枚举的一部分使用）
- **varName** — 变量名引用（用于脚本）

参数类型可以嵌套，例如 `super {num, time, super {bool, ip}}`。

## 标准列表条目属性 {#standard-list-entry-properties}

列表菜单（其条目可添加、删除和重新排序的菜单）共享一组在各处行为相同的属性和命令，因此不会在每个菜单页面的参数表中重复列出：

- **`comment`** — 条目的自由格式文本注释
- **`disabled`** — 当为 `yes` 时，该条目处于非活动状态但仍保留在配置中；此类条目在列表中用 `X` 标记。`enable` 和 `disable` 命令切换此状态
- **`copy-from`** — `add` 命令的参数：将新条目创建为现有条目的副本
- **`place-before`** — `add` 和 `move` 命令的参数：将条目放在列表中另一个条目前面

## 标准 print 修饰符 {#standard-print-modifiers}

`print` 命令接受输出修饰符，这些修饰符同样不会列在每个菜单页面上：

- **`detail`** — 打印每个条目的所有属性，而不是简要摘要
- **`as-value`** — 将输出作为值返回，而不是格式化字符串，以便在脚本中使用

## address-flags {#address-flags}

**address** 类型呈现为 `address (flags=...)`，其中标志定义接受哪些地址格式：

| 标志 | 含义 |
|------|---------|
| 4    | IPv4 地址 |
| 6    | IPv6 地址 |
| D    | DNS 名称（主机名） |
| i    | 接口名称 |
| /    | 带子网掩码的地址（CIDR 前缀） |
| v    | VRF（虚拟路由转发实例） |
| R    | 路由区分符 |
| S    | 自由格式前缀（例如 EVPN 前缀） |
| \+   | 地址列表 |
| :    | 端口或区域说明符 |
| L    | 链路本地地址 |
| m    | 组播地址 |

## Grafts 与 Captures {#grafts-and-captures}

如果参数被分组在 captures 中，则旧描述取自找到的第一个具有该名称的参数。例如，BGP 模板和 BGP 连接使用相同的 capture，但 BGP 模板是第一个，因此所有描述都从那里取得，并用于所有菜单中所有由 graft 引用的参数。

## 标题 {#headings}

目前，reference 只能包含与 RouterOS 菜单匹配的标题，在比较先前的数据时，其他所有内容都会被忽略。
