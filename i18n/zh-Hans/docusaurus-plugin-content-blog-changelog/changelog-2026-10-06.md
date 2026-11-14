---
title: "文档更新 - 2026年10月6日"
date: 2026-10-06
slug: /changelog-2026-10-06
source: https://manual.mikrotik.com/changelog/changelog-2026-10-06
captured_at: '2026-11-04T06:09:01+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年10月6日文档变更摘要。

## 管理工具 {#management-tools}

- **[CMR](/docs/management-tools/cmr)**：告警规则部分现在将状态告警与事件告警分开，并用一个表格进行比较：

- 状态告警（CPU、内存、磁盘和健康阈值，connected、disconnected-more-than、upgrade-available）在所有条件匹配期间保持活动。它在变为活动时运行一次动作，并在 devices-on 和仪表板中计数，直到清除。
- 事件告警（interface-change、upgrade-done、upgrade-job-done、rebooted、unpaired-device-connected，或由 log-topics 和 log-regex 匹配的日志消息）每次发生都运行其动作，且从不保持活动。一条规则可以组合多个状态条件，但最多有一个事件条件。
- 新增“设备和系统范围”部分：大多数告警按设备应用，而 upgrade-job-done 是系统告警，报告整个升级作业而不带设备上下文。
- show-devices 列出规则的状态告警处于活动状态的设备。对于事件告警，它不列出任何设备，其 fired 值改为统计发生次数。

- **[CMR](/docs/management-tools/cmr)**、**[CMR-Client](/docs/management-tools/cmr/client)**：关于连接和配对客户端的更正：

- 客户端通过 TCP 端口 54321 连接到服务器。在服务器的 input 链以及客户端与服务器之间的任何防火墙中允许该端口。客户端针对 status: searching 的故障排除现在指向该端口和防火墙。
- 客户端的 pairing-requirement 支持 none 和 password。confirm 仅存在于服务器上，由 /cmr/device/pair 批准配对。客户端侧的 confirm 情况已从故障排除列表中移除。

- **[CMR](/docs/management-tools/cmr)**、**[CMR-Client](/docs/management-tools/cmr/client)**：升级、重启和告警的详细信息：

- 不带 channel 的 /cmr/device/upgrade 会在每台设备各自的升级通道上升级该设备，而使用 schedule-time 时，作业会等待该时间的下一次出现。它为按编号选择的设备启动作业时没有标签，而 run-next 会自行启动以这种方式计划的作业。
- 删除已计划作业会将其标记为 cancelled 并保留在列表中。删除已取消的作业会将其删除。
- 列出了服务器关于设备升级结果、新可用版本和重启的日志消息。reboot 会立即返回。
- 告警变量：[state] 对于已配对且没有进行中任务的设备为空，使用率值在设备报告之前为 unknown，[upgrade-error] 在成功升级后为空，[upgrade-state] 是设备在作业中的最终状态，作业时间的形式为 2026.10.06-14:20:36。
- 当 CMR 在服务器上重启时，仍然匹配的状态告警会再次变为活动并运行其动作。
- REST API 会将 WiFi 密码短语返回给具有 sensitive 策略的用户。
- 客户端会记录其状态的每次变更，并在与服务器的连接断开时使用现有配对重新连接。

- **[CMR](/docs/management-tools/cmr)**、**[CMR-Client](/docs/management-tools/cmr/client)**：默认值和服务器设置：

- fail-policy 默认为 stop，并且 strategy=parallel 的 stop 不再需要 order。只有 continue-order 才需要它。
- upgrade-check-interval 默认为 10h。apptraffic-devices 默认为网关标签，all 表示选择每台设备。
- 客户端的 pairing-requirement 默认为 password。
- 客户端通过邻居发现或 DNS 查找服务器：客户端解析 _cmr._tcp.lan 以及 _cmr._tcp. 后跟来自 DHCP 选项 15 的域名。仅靠 DHCP 不会通告服务器。
- /cmr set !&lt;setting&gt; 会将设置恢复为默认值。更改 packages-directory、upgrade-check-interval 或 pairing-requirement 会重启服务器上的 CMR，因此每个客户端都会重新连接，状态告警也会再次触发。
- 更改已启用的告警规则，即使只更改其注释，也会使该规则的状态告警在匹配的设备上再次触发。
- 在布局链接的 links 值中，端口名前的 * 表示直接物理链路。它不表示 PoE 供电方。

- **[CMR](/docs/management-tools/cmr)**：节点坐标相对于布局中心：x 向右增加，y 向下增加，因此较小的 y 会将节点放置在图上更高的位置。
- **[SSH](/docs/management-tools/ssh)**：页面已围绕 SSH 服务器、交互式客户端和脚本化使用重新组织。新增的“验证远程主机密钥”部分说明了 known-hosts-validation 设置（新安装时启用，升级时保持原样）、/system/ssh 的交互式信任和密钥更新提示，以及在使用验证时让 ssh-exec 和 SFTP fetch 正常工作的方式：在 /ip/ssh/known-hosts 中固定密钥、known-hosts-ignore 或 known-hosts-trusted-subnets。“服务器主机密钥”部分记录了指纹、重新生成以及导出文件名。导入客户端私钥现在列出了可接受的 PEM 格式，并说明 OpenSSH 私钥会被拒绝。ssh-exec 示例不再包含明文密码，并说明了其先决条件。

## CLI 参考 {#cli-reference}

- **[/cmr/alert](/docs/cli-reference/ip/dhcp-server/alert)**、**[show-devices](/docs/cli-reference/cmr/alert/show-devices)**：描述遵循状态和事件拆分。connected 是状态条件，rebooted 和日志条件是事件条件，devices-on 仅统计活动的状态告警，reset-on-disconnect 适用于状态告警。show-devices 列出规则的状态告警处于活动状态的设备。
- **[/cmr](/docs/cli-reference/cmr)**：pairing-requirement=password 使用设备上 RouterOS 用户的用户名和密码，如 [CMR](/docs/management-tools/cmr#pairing) 指南中所述。CMR 没有单独的配对密码。
- **[/cmr/device/upgrade](/docs/cli-reference/cmr/device/upgrade)**、**[reboot](/docs/cli-reference/system/reboot)**、**[/cmr/upgrade/job](/docs/cli-reference/system/script/job)**、**[run-next](/docs/cli-reference/cmr/upgrade/job/run-next)**：设备升级的 channel 和 schedule-time 的描述、其作业的空标签和 channel、以这种方式计划的作业的 run-next，以及重启后的日志消息。
- **[/cmr](/docs/cli-reference/cmr)**、**[/cmr/client](/docs/cli-reference/cmr/client)**、**[/cmr/upgrade](/docs/cli-reference/cmr/upgrade)**、**[/cmr/device/upgrade](/docs/cli-reference/cmr/device/upgrade)**、**[/cmr/layout/link](/docs/cli-reference/cmr/layout/link)**：upgrade-check-interval、apptraffic-devices、fail-policy 和客户端 pairing-requirement 的默认值，controller-addresses 中的 DNS 发现，仅 continue-order 需要 order，以及 links 中的 *。
- **[/cmr/client](/docs/cli-reference/cmr/client)**、**[/tool/apptraffic](/docs/cli-reference/tool/apptraffic)**、**[/system/routerboard/usb](/docs/cli-reference/system/routerboard/usb)**：没有 RouterOS 7 版本的 MIPS-LE 架构（mipsel）不再列在这些页面的条件中，也不再列在 [CMR](/docs/management-tools/cmr#application-traffic) 指南的应用流量说明中。/system/routerboard/settings/keep-frequency 页面已移除：该命令仅存在于 MIPS-LE 设备上。
- **[/ip/ssh](/docs/cli-reference/ip/ssh)**、**[known-hosts](/docs/cli-reference/ip/ssh/known-hosts)**、**[/system/ssh](/docs/cli-reference/system/ssh)**、**[/system/ssh-exec](/docs/cli-reference/system/ssh-exec)**：所有参数说明均已填写，包括主机密钥验证设置以及以前未记录的 host、key、port 和 vrf 参数。ssh-exec 现在记录了远程命令失败时其 exit-code 和 output 携带的内容。
- **[/interface/wifi/radio](/docs/cli-reference/interface/wifi/radio)**：删除了对未发布的“meshpoint”模式的引用。
- **[/ip/dns/adlist](/docs/cli-reference/ip/dns/adlist)**、**[DNS](/docs/network-management/dns)**：禁用 adlist 不会释放其缓存内存。

## 移动网络 {#mobile-networking}

- **[LTE/5G](/docs/mobile-networking/lte-5g)**：新增“Multi APN”部分：使用 show-capabilities 检查 max-apn-count，为每个额外 APN 连接创建带 master= 的从属 LTE 接口，并且接口的 apn-profiles 参数已重命名为 apn-profile（对于单 APN 配置，旧名称仍被接受）。

## 防火墙与 QoS {#firewall--qos}

- **[数据包流](/docs/firewall-and-quality-of-service/packet-flow-in-routeros)**：数据包流图已更新。

## 硬件 {#hardware}

- **[CRS310-8G+2S+IN](/hardware/crs310-8g-plus-2s-plus-in)**：复位按钮部分列出了它的三个功能。配置重置现在等待 PWR LED 闪烁，而不是 USR LED，并且 Netinstall 描述了 Regular Booter（开机后按 Reset 1–2 秒）和 Backup Booter（开机时按住 Reset，直到 LED 闪烁、变为常亮，然后熄灭）。
