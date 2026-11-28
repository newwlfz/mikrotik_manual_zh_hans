---
title: "路由协议多核支持"
description: "RouterOS v7 通过将 FIB 更新、BGP 处理和协议处理等任务分配到不同进程来实现多核路由。每个子任务使用私有内存或共享内存，BGP 输入/输出亲和性可通过 CLI 自定义。可使用专用命令监控内存使用情况和任务状态，从而提升多核设备上的性能。"
tags:
  - 'routing'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/routing-protocol-multi-core-support
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS v7 可以在多个进程之间拆分任务。

一个“**main**”任务负责启动和停止子任务，并在它们之间处理数据。每个子任务都可以分配“private”内存（仅该任务可访问）和“shared”内存（所有路由任务均可访问）。

启用多进程路由时，以下任务会在独立进程中运行：

- FIB 更新。
- Routing Policy 配置。
- 配置和报告 - 处理静态路由配置、“route print”命令、SNMP 监控等。
- BFD 协议处理
- OSPF 协议处理。
- RIP 协议处理。
- ISIS 协议处理。
- EVPN 处理。
- PIM-SM。
- LDP 协议处理。
- Fantasy - 用于生成测试用的虚拟路由条目。
- BGP 连接和配置处理。
- BGP 接收（每个对等体一个任务，或按特定参数分组）。
- BGP 发送（每个对等体一个任务，或按特定参数分组）。

## BGP 子任务 {#bgp-sub-tasks}

BGP 接收和发送可以按特定参数拆分为子任务。例如，可以按对等体运行输入，也可以将所有对等体的输入分组并在主进程中运行。可通过 [`/routing/bgp/template`](/docs/cli-reference/routing/bgp/template) 中的 [`input.affinity`](/docs/cli-reference/routing/bgp/connection#input.affinity) 和 [`output.affinity`](/docs/cli-reference/routing/bgp/connection#output.affinity) 参数控制此拆分。在核心数较少的设备上，调整 affinity 值可以提升性能，因为在任务之间共享数据比在单个任务中处理相同数据稍慢。例如，在单核或双核设备上，在主进程或实例进程中运行输入和输出可提升性能。

:::warning
BGP 最多可以生成 100 个独立进程。
:::

可以使用 [`/routing/stats/process/print`](/docs/cli-reference/routing/stats/memory) 命令监控当前使用的所有任务及其分配的 private/shared 内存。

示例输出：

```text
[admin@BGP_MUM] /routing/stats/process> print interval=1
Columns: TASKS, PRIVATE-MEM-BLOCKS, SHARED-MEM-BLOCKS, PSS, RSS, VMS, RETIRED, ID, PID, RPID, PROCESS-TIME, KERNEL-TIME, CUR-BUSY, MAX-BUSY, CUR-CALC, MAX-CALC
   #  TASKS                         PRIVATE-M  SHARED-M  PSS        RSS      VMS      R  ID       PID  R  PROCESS-  KERNEL-TI  CUR-  MAX-BUSY  CUR-  MAX-CALC
   0  routing tables                11.8MiB    20.0MiB   19.8MiB    42.2MiB  51.4MiB  7  main     195  0  15s470ms  2s50ms     20ms  1s460ms   20ms  35s120ms
      rib                                                                                                                                                    
      connected networks                                                                                                                                     
   1  fib                           2816.0KiB  0         8.1MiB     27.4MiB  51.4MiB     fib      255  1  5s730ms   7m4s790ms        23s350ms        23s350ms
   2  ospf                          512.0KiB   0         3151.0KiB  14.6MiB  51.4MiB     ospf     260  1  20ms      100ms            20ms            20ms    
      connected networks                                                                                                                                     
   3  fantasy                       256.0KiB   0         1898.0KiB  5.8MiB   51.4MiB     fantasy  261  1  40ms      60ms             20ms            20ms    
   4  configuration and reporting   4096.0KiB  512.0KiB  9.2MiB     28.4MiB  51.4MiB     static   262  1  3s210ms   40ms             220ms           220ms   
   5  rip                           512.0KiB   0         3151.0KiB  14.6MiB  51.4MiB     rip      259  1  50ms      90ms             20ms            20ms    
      connected networks                                                                                                                                     
   6  routing policy configuration  768.0KiB   768.0KiB  2250.0KiB  6.2MiB   51.4MiB     policy   256  1  70ms      50ms             20ms            20ms    
   7  BGP service                   768.0KiB   0         3359.0KiB  14.9MiB  51.4MiB     bgp      257  1  4s260ms   8s50ms           30ms            30ms    
      connected networks                                                                                                                                     
   8  BFD service                   512.0KiB   0         3151.0KiB  14.6MiB  51.4MiB     12       258  1  80ms      40ms             20ms            20ms    
      connected networks                                                                                                                                     
   9  BGP Input 10.155.101.232      8.2MiB     6.8MiB    17.0MiB    39.1MiB  51.4MiB     20       270  1  24s880ms  3s60ms           18s550ms        18s550ms
      BGP Output 10.155.101.232                                                                                                                              
  10  Global memory                            256.0KiB                                  global     0  0    
```

## 路由表更新机制 {#routing-table-update-mechanism}

下图以更易于理解的方式说明路由表更新机制的工作原理。

![](/img/54a871194dff78f8.png)

路由协议会持续循环执行以下过程：

- “**main**”进程等待来自其他子任务的更新（1）。
- 如果满足以下条件，“**main**”开始计算新路由（2–4）：
  - 收到来自子任务的更新；
  - 协议尚未发布所有路由；
  - 配置或链路状态发生变化。
- 在新路由计算期间（5），会发生以下事件：
  - 将所有收到的更新应用到路由；
  - 确定网关可达性；
  - 解析递归路由；
- “**publish**”事件运行，发布“**current**”路由。在此阶段，“**current**”路由不会变化，但协议仍可接收和发送更新（6）。
- 执行清理并释放未使用的内存（7）。在此步骤中，会移除新“**current**”表中不再使用的所有内容（路由、属性等）。

将“**updated**”和“**current**”视为路由表的两个副本。“**current**”表（2）在当前使用，而“**updated**”（1）是将在下一次发布事件（3 和 4）中发布的候选路由表。此方法可防止协议在“**main**”进程执行“**publish**”时用缓冲更新填满内存。相反，协议将最新更新直接发送到 main 进程，然后由该进程将新更新复制到“**updated**”表中。OSPF 稍微复杂一些：它内部有一个类似的过程来选择当前 OSPF 路由，然后将这些路由发送到“**main**”进行进一步处理。
