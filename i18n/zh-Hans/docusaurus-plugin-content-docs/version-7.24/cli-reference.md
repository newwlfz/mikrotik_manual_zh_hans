---
title: "CLI 参考"
description: "CLI 参考文档按控制台路径记录 RouterOS 命令菜单和属性。使用本节查询 RouterOS 功能的命令语法、配置对象和操作命令。"
source: https://manual.mikrotik.com/docs/7.24/cli-reference
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

CLI 参考文档按控制台路径记录 RouterOS 命令菜单和属性。使用本节查询 RouterOS 功能的命令语法、配置对象和运维命令。

## 参数类型 {#argument-types}

- **address** — 通用地址参数，显示为 `address (flags=...)`；请参阅下文的 [address flags](#address-flags)
- **alt** — 替代类型，可接受多种不同值类型中的一种
- **as** — 自治系统号（用于 BGP 路由）
- **bool** — 布尔值（true/false、yes/no）
- **cfg** — 配置项标识符
- **composite** — 作为一组处理的多个参数组合
- **date** — 日期和时间值
- **enum** — 枚举项，具有括号中列出的预定义值
- **expr** — 表达式或条件（用于路由过滤器和脚本）
- **file** — 文件路径或名称引用
- **iface_enum** — 接口选择列表，通常可接受接口名称，或 `all`、`none`、`dynamic`、`slave` 等预定义值；值列在大括号中
- **ipAddr** — IPv4 地址
- **ip6Addr** — IPv6 地址
- **ipPrefix** — 带前缀长度的 IPv4 地址
- **ip6Prefix** — 带前缀长度的 IPv6 地址
- **ipRange** — IPv4 地址范围
- **macAddr** — MAC 地址（可指定完整地址或使用通配符）
- **meter** — 信号质量等级，通常以 dBm 表示
- **multi** — 多值参数，接受定义集合中的多个值
- **num** — 无符号整数，可通过范围限制（例如 `[3 .. 20]`、`[.. 10]`、`[4 ..]`）；未明确指定时为 32 位范围
- **numericon** — 带单位后缀显示的数值
- **object** — 值的结构化列表（例如地址表或配置项表）
- **pic** — 图片/位图值
- **range** — 数值范围（例如一组端口）
- **remote** — 对远程对象的引用（例如路由过滤器规则）
- **script** — 脚本源代码；显示为 `alt { script: string }` 的参数可接受 `/system script` 中现有脚本的名称，或内联脚本源代码
- **string** — 文本字符串
- **super** — 可接受多种不同参数类型的复合类型；子类型列在大括号中，例如 `super { bool, time }`
- **switch** — 不带显式值参数的开/关切换
- **time** — 时间长度或间隔，通常以秒为单位，可包含 `s`、`m`、`h`、`d` 等单位
- **timezone** — 时区或 UTC 偏移值
- **ubit** — 带命名位的位域，支持的位名称列在括号中，例如 `ubit (ip, ipv6)`
- **value** — 独立值标识符（通常用作复合类型或枚举的一部分）
- **varName** — 变量名引用（用于脚本）

Argument 类型可以嵌套，例如 `super {num, time, super {bool, ip}}`。

## 标准列表条目属性 {#standard-list-entry-properties}

列表菜单（可添加、删除和重新排序条目的菜单）共享一组在各处行为一致的属性和命令，因此不会在每个菜单页面的 Argument 表中重复列出：

- **`comment`** — 条目的自由文本注释
- **`disabled`** — 为 `yes` 时，条目处于非活动状态但保留在配置中；此类条目在列表中标记为 `X`。`enable` 和 `disable` 命令可切换此状态
- **`copy-from`** — `add` 命令的参数：将新条目创建为现有条目的副本
- **`place-before`** — `add` 和 `move` 命令的参数：将条目放置在列表中另一个条目之前

## 标准打印修饰符 {#standard-print-modifiers}

`print` 命令接受输出修饰符，这些修饰符同样不会在每个菜单页面中列出：

- **`detail`** — 输出每个条目的所有属性，而不是简要摘要
- **`as-value`** — 以值而非格式化字符串的形式返回输出，供脚本使用

## address-flags

**address** 类型显示为 `address (flags=...)`，其中标志定义接受哪些地址格式：

| Flag | Meaning |
|------|---------|
| 4    | IPv4 地址 |
| 6    | IPv6 地址 |
| D    | DNS 名称（主机名） |
| i    | 接口名称 |
| /    | 带子网掩码的地址（CIDR 前缀） |
| v    | VRF（Virtual Routing and Forwarding instance） |
| R    | Route distinguisher |
| S    | 自由格式前缀（例如 EVPN 前缀） |
| \+   | 地址列表 |
| :    | 端口或区域说明符 |
| L    | 链路本地地址 |
| m    | 组播地址 |

## 嫁接和捕获 {#grafts-and-captures}

如果参数分组在 captures 中，则旧描述取自具有该名称的第一个参数。例如，BGP template 和 BGP connection 使用同一个 capture，但 BGP template 是第一个，因此所有描述都取自那里，并用于所有菜单中通过 graft 引用的参数。

## Headings

目前，reference 只能包含与 RouterOS 菜单匹配的标题，比较先前数据时会忽略其他所有内容。
