---
sidebar_key: "cli-reference/disk/nvme-discover"
sidebar_position: 8
title: "nvme-discover"
sidebar_label: 'nvme-discover'
source: https://manual.mikrotik.com/docs/cli-reference/disk/nvme-discover
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/nvme-discover {#disknvme-discover}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ipAddr">NVMe over TCP 控制器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">控制器发现服务的 TCP 端口。默认值：4420。</ArgTableRow>
<ArgTableRow arg="host-name" typ="string">此路由器向控制器呈现的主机 NQN，用于标识和基于主机的访问控制。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="nqn" typ="string">控制器公开的某个子系统的 NVMe 限定名称。</ArgTableRow>
</ArgTable>
