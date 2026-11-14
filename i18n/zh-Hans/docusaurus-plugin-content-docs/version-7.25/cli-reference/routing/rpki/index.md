---
sidebar_key: "cli-reference/routing/rpki/index"
sidebar_position: 1
title: "rpki"
sidebar_label: 'rpki'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/rpki
captured_at: '2026-11-01T21:25:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/rpki {#routingrpki}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="group" typ="enum">分配给数据库的组。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">RTR 服务器地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">RTR 服务器端口。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1">用于绑定连接的 VRF 表。</ArgTableRow>
<ArgTableRow arg="preference" typ="num" unset="1">当存在多个 RTR 源时，数字越大表示优先级越高。如果未配置 preference，RouterOS 会优先选择组内最低的远程 IP。如果远程 IP 相同，RouterOS 会优先选择最低的远程端口。</ArgTableRow>
<ArgTableRow arg="refresh-interval" typ="num" unset="1">轮询验证器以获取最新数据的间隔时间（秒）。</ArgTableRow>
<ArgTableRow arg="retry-interval" typ="num" unset="1">从验证器轮询数据失败后重试的间隔时间（秒）。</ArgTableRow>
<ArgTableRow arg="expire-interval" typ="num" unset="1">当未从验证器收到有效更新时，已轮询数据保持有效的间隔时间（秒）。</ArgTableRow>
</ArgTable>
