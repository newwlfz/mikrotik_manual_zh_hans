---
title: "CLI 参考"
description: "CLI 参考文档按控制台路径记录 RouterOS 命令菜单和属性。使用本节查询 RouterOS 功能的命令语法、配置对象和操作命令。"
source: https://manual.mikrotik.com/docs/7.25/cli-reference
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
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

| 标志 | 含义 |
|------|---------|
| 4    | IPv4 地址 |
| 6    | IPv6 地址 |
| D    | DNS 名称（主机名） |
| i    | 接口名称本身作为值，代替地址（例如，作为路由网关的点对点接口） |
| /    | 带子网掩码的地址（CIDR 前缀） |
| v    | VRF（虚拟路由和转发实例） |
| %    | 地址上的接口后缀（区域说明符），例如 `fe80::1%ether1` 或 `00:11:22:33:44:55%ether1` |
| R    | 路由区分符 |
| S    | 自由格式前缀（例如 EVPN 前缀） |
| \+   | 地址列表 |
| :    | 端口或区域说明符 |
| L    | 链路本地地址 |
| m    | 组播地址 |

`i` 和 `%` 标志的区别在于接口出现的位置。使用 `i` 时，裸接口名称会替代地址。使用 `%` 时，接口只是附加在完整地址后的限定符，用于消除路由器范围内不唯一地址的歧义，例如 IPv6 链路本地地址。

请注意，`%interface` 后缀本身是 IPv6 链路本地寻址的一部分：链路本地地址在没有区域说明符时存在歧义，因此任何接受 IPv6 地址（标志 `6`）的参数都接受 `link-local%interface`，即使其标志列表不包含 `%`。`%` 标志表示该参数更广泛地支持该后缀，例如用于选择 MAC ping 的出接口。
