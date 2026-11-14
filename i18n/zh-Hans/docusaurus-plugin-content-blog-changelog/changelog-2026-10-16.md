---
title: "文档更新 - 2026年10月16日"
date: 2026-10-16
slug: /changelog-2026-10-16
source: https://manual.mikrotik.com/changelog/changelog-2026-10-16
captured_at: '2026-11-04T06:09:04+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 16 日的文档变更摘要。

## 入门 {#getting-started}

- **[Backup](/docs/getting-started/configuration-management/backup)**：全面改写，已在 hAP ax² 实验室路由器上的 RouterOS 7.26beta1 上测试。改造成面向任务的页面：保存加密备份、在文件列表中校验它、恢复它（包括确切的确认流程）、备份包含与不包含的内容（特定于设备，包含设备的 MAC 地址；The Dude 和 User Manager 数据库除外），以及一个故障排查章节。在实验室验证了：仅设置密码即使用 aes-sha256 加密，dont-encrypt=yes 即使设置了密码文件也保持不加密，并且未加密的备份以可读形式存储配置。用全新的截图替换了 2018 年代的示例输出，并链接到更轻量的替代方案（安全模式、撤销/重做）和 Files 页面。

## CLI 参考 {#cli-reference}

- **[/system/backup/save](/docs/cli-reference/system/backup/save)**、**[/system/backup/load](/docs/cli-reference/system/backup/load)**：移除了“自 RouterOS v6.43 起”这类版本限定语；参数说明已在实验室验证并重写（save：name、password、使用 aes-sha256 默认值与旧式 rc4 的 encryption、dont-encrypt；load：name、password、force-v6-to-v7-configuration-upgrade）。
- **[/tool/traffic-generator](/docs/cli-reference/tool/traffic-generator)**：全部 14 个页面的完整参数说明（参见上文的 Traffic Generator），包括默认值（test-id 0、latency-distribution-max 100us、stats-samples-to-keep 100）和 stats 子菜单的列。

## 开发者指南 {#developer-guides}

- **[API](/docs/developer-guides/api)**：协议参考已全面改写，并针对 7.26beta1 实验室路由器上的 API 服务进行了验证（通过 8728 的明文登录与旧式 challenge、tags、带 category=2 中断 trap 的 listen/cancel、getall、query words、通过 .proplist 获取 OID、traps）。重写了初始登录章节，把明文方式作为登录方法，把 MD5 challenge-response 作为旧版 RouterOS 的方法（当前 RouterOS 会拒绝旧式响应）；更新了 OID 示例（cpu-load 不再附带 OID）；修正了 trap 章节（并非每个 trap 都带有 category 属性）和 listen 示例（布尔值现在打印为 true/false，已删除项报告 =.dead=true）；移除了 2006/2010 年代的示例记录；并说明无证书的 api-ssl 模式只提供匿名 Diffie-Hellman 加密套件，当前的 TLS 客户端会拒绝它。
- **[Python 3 示例](/docs/developer-guides/api/python3-example)**：重写了示例客户端：优先使用明文登录并自动回退到旧式 challenge-response，修复了输入关闭时的无限循环，采用 utf-8 编码，并添加了说明证书要求的 secure-mode 注释。重写后的客户端已针对实验室 API 测试。
- **[开发者指南](/docs/developer-guides)**：精简了着陆页文字。
- **[Scripting](/docs/developer-guides/scripting)**：已重写，并在 7.26beta1 实验室路由器上逐条验证。修正了作用域规则（全局变量不限于其声明所在的块；在交互式 CLI 中，:local 在后续行中仍然可见；未声明的变量可以读取并返回空值，但给它赋值是编译错误）、位运算符章节（&、|、^、&lt;&lt;、&gt;&gt; 作用于整数以及 IP/IPv6 地址；只有 ~ 仅限 IP —— IPv6 的移位是可行的）、十六进制转义规则（十六进制字母必须大写，\ff 解析为 \f + f）、:nothing 和 :tolf 参考行，以及 !comments 打印参数（它隐藏注释横幅，并不过滤条目）。更新了 :timestamp 示例和保留变量名说明（与内置属性冲突的名称在 where 表达式中会解析为每项属性）。
- **[Scripting 示例](/docs/developer-guides/scripting/scripting-examples)**：已在实验室验证文件创建/追加的变通方法和 DNS 缓存站点屏蔽示例；添加了一条说明，指出 ppp-secret 解析器需要 CR/LF 行结尾，以及使用防火墙 tls-host（SNI、HTTPS）和 content（HTTP）匹配器进行站点屏蔽的另一种方法。
- **[Scripting 技巧与提示](/docs/developer-guides/scripting/scripting-tips-and-tricks)**：修正了三条关于声明全局变量的技巧，它们已不再符合当前 RouterOS —— 脚本或函数可以读取全局变量，或调用另一个脚本中定义的函数，而无需重新声明；只有在修改其值时才需要声明。指出 /interface wireless info hw-info 技巧仅适用于使用旧版 wireless 软件包的设备。

## 诊断、监控与故障排查 {#diagnostics-monitoring--troubleshooting}

- **[Traffic Generator](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator)**：改为面向任务的页面：属性表移入 CLI 参考，其中 14 个页面都获得了完整的参数说明（包括带 IPv4/IPv6/UDP/TCP 头部字段的 packet-template 构建器和 stats 子菜单）。将流属性 num 更正为 id（旧名称已不存在），新增了 packet-count、cpu-core 和只读的 default-port 流属性，用 ipv6 和 tcp 头部更新了 header-stack/first-header 枚举，并移除了快捷命令的 duration 和 freeze-frame-interval 参数（在 7.26 上已不存在）。device-mode 信息框现在说明：每种 device mode 下流量生成器默认都是禁用的、如何检查它，以及启用它需要物理确认（按下按钮或断电重启）。修正了 IPsec 基准测试示例 —— enc-algorithms=aes-128 在 RouterOS 7 上是语法错误，现改为 aes-128-cbc。
- **[降级 RouterOS](/docs/diagnostics-monitoring-and-troubleshooting/downgrading-routeros)**：已按当前 RouterOS 更正 —— factory-software 字段已更名为 minimum-version，架构报告为 architecture-name；用真实的 /system/resource/print 捕获替换了虚构的示例输出，指出降级需要主 routeros 软件包以及每个已安装的额外软件包（例如 wireless 驱动），并且路由器会在重启期间降级到所上传软件包的版本。
- **[使用 Elasticsearch 进行 NetFlow 分析](/docs/diagnostics-monitoring-and-troubleshooting/traffic-flow/netflow-analysis-with-elasticsearch)**、**[使用 Elasticsearch 的 CEF](/docs/diagnostics-monitoring-and-troubleshooting/log/cef-with-elasticsearch)**、**[使用 Elasticsearch 的 Syslog](/docs/diagnostics-monitoring-and-troubleshooting/log/syslog-with-elasticsearch)**：已在实验室验证 RouterOS 侧的命令（/system/logging/action 使用 remote-log-format=syslog/cef、syslog-facility、cef-event-delimiter、syslog-time-format；/ip/traffic-flow 使用接口列表和默认 2055/UDP 上的目标，NetFlow v9），修复了缺失的图片替代文本和格式错误的 ros_paths，并澄清了 CEF 示例的动作名称和 Elastic 侧的默认端口。

## 虚拟专用网络 {#virtual-private-networks}

-

**[GRE](/docs/virtual-private-networks/gre)**：在一对通过 GRE 隧道相连的 7.26beta1 实验室路由器上逐条验证并重写。修正了 keepalive 章节 —— keepalive 默认启用（10s,10，最小间隔 1 秒；设为 0 秒会被拒绝，取消该属性会移除它，但对观察到的 running 标志行为没有任何改变），并且在所测试的版本上，即使远端不可达，隧道仍保持 running 标志（running 标志只保证远端曾应答过一次）；刷新了围绕它的无状态/黑洞说明。移除了 GRE 可用于桥接设计的说法 —— 在 RouterOS 7 上该接口无法作为桥端口添加（EoIP 覆盖二层）。在实验室确认了开销数字（在 1500 字节接口上，GRE over IPv4 的 actual-mtu 为 1476，GRE over IPv6 为 1456），验证了 ipsec-secret 需要禁用 fast-path，添加了故障排查章节，并刷新了双站点示例（包括在实验室运行确切的配置）。

-

**[EoIP](/docs/virtual-private-networks/eoip)**：在一对通过桥接 EoIP 隧道相连的 7.26beta1 实验室路由器上逐条验证并重写。端到端确认了二层行为（跨隧道的桥接、ARP、RSTP 和 MAC 学习）以及 42 字节开销（带 key 的 8 字节 GRE 头部、完整的内部以太网帧、外部 IPv4 头部）—— 在 1500 字节路径上，EoIP over IPv4 的 actual-mtu 为 1458，IPv6 为 1444。记录了真实的 keepalive 行为：默认启用（10s,10），当对端在 interval × retries 时间内不应答时会移除 running 标志；小于 1 秒的值会被拒绝，取消 keepalive 会关闭该机制（此时即使对端已死，标志仍保持 up）。说明了仅凭 running 标志并不能证明 tunnel-id 匹配（id 不匹配时两端都保持 running，但丢弃所有流量）、MAC 地址处理（默认本地管理，接受任意值 —— 每个桥内保持唯一）以及 IPsec 选项（ipsec-secret，IPv4 上需要 allow-fast-path=no；IPv6 菜单没有 fast-path 属性）。针对默认 RouterOS 配置重做了双站点无线示例（LAN 端口已经桥接），并在实验室验证了确切的配置。
