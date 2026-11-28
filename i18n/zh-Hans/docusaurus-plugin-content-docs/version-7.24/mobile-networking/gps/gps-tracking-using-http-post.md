---
title: "使用 HTTP POST 进行 GPS 跟踪"
description: "本页介绍如何使用 MikroTik RouterOS 的 GPS 功能和 HTTP POST 搭建车辆跟踪系统，将坐标发送到 Web 服务器，服务器将其存储在 SQLite3 数据库中，以便使用 Leaflet.js 进行可视化展示。"
tags:
  - 'fetch'
  - 'scripting'
  - 'sqlite3'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/gps/gps-tracking-using-http-post
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "mobile-networking/gps"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本文介绍如何使用 RouterOS GPS 功能和脚本创建简单的车辆跟踪系统。

## Method

该方法使用 RouterOS Fetch 工具的 HTTP POST 功能。它使你可以直接从 RouterOS 命令行向 Web 服务器 POST 任意类型的数据。当然，你可以使用脚本将变量填充到 POST 数据中。发布的数据将写入 SQLITE3 数据库（如果文件不存在，则会创建），然后从数据库读取并送入 Leaflet.js Polyline 数组。这是一个概念验证示例；没有身份验证、安全性或错误处理。

## 要求 {#requirements}

- 任选 Web 服务器。
- PHP。
- PHP 的 SQLite3 模块。
- 带有可用 GPS 模块的 RouterOS 设备。
- RouterOS。
- 将 RouterOS 中的 GPS 格式设置为 **dd**。

## RouterOS 脚本 {#routeros-script}

你可以在 Scheduler 工具中以 1s 的间隔运行此脚本，使坐标每 1 秒发送一次。

```ros
{
:global lat
:global lon
/system/gps/monitor once do={
:set $lat $("latitude")
:set $lon $("longitude")
}
/tool/fetch mode=http url="http://YOURSERVER.com/index.php" port=80 http-method=post http-data=("{\"lat\":\"" . $lat . "\",\"lon\":\"" . $lon . "\"}") http-header-field="Content-Type: application/json" 
:put ("{\"lat\":\"" . $lat . "\",\"lon\":\"" . $lon . "\"}")
}
```

## index.php 文件 {#indexphp-file}

在 index.php 文件旁边创建一个名为 **sqlite\_db** 的空目录。确保该目录和文件可被具有 **chmod -R a+w sqlite\_db/** 权限的组写入。

```ros
<?php
$loc = dirname(__FILE__).'/sqlite_db/coord.db';
$db = new SQLite3($loc,SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
$raw = file_get_contents('php://input');
$raw = preg_replace('/\\x00/','',$raw);
$data = json_decode($raw);

if (!empty($data) && is_object($data) && property_exists($data,'lat') && property_exists($data,'lon')){
    if(file_exists($loc)) echo 'exists!'.chr(0xa);
    $src = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'coordinates\'';
    $res = $db->querySingle($src);
    if ($res === false){
            $db->exec('CREATE TABLE coordinates (latitude TEXT, longitude TEXT, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, added TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) ');
    }
    
$regex = '/^(|\-)([0-9]{2,3}\.[0-9]{0,8})$/';

if (preg_match($regex,$data->lat) && preg_match($regex,$data->lon) )
	{
		$lat = $data->lat;
		$lon = $data->lon;
	}
	$ins = 'INSERT INTO coordinates (latitude,longitude) VALUES (\''.SQLite3::escapeString($lat).'\',\''.SQLite3::escapeString($lon).'\')';
	$db->exec($ins);
	die();
}
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
</head>
<body>

<script>
var map = L.map('map').setView([0,0], 4);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'}).addTo(map);

<?php
    if($result = $db->query('SELECT latitude,longitude FROM coordinates')){
    echo ' var latlngs = [ ';
    while($obj = $result->fetchArray()){
    	if (!is_array($obj) || !isset($obj['latitude']) || !isset($obj['longitude']) || empty($obj['latitude']) || empty($obj['longitude'])) continue;
    	echo '["'. $obj['latitude'].'","'.$obj['longitude'].'"],';
    }
    echo ']; ';
    } else
     echo('//'.$db->lastErrorMsg().chr(0xa));  

?>
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
map.fitBounds(polyline.getBounds());
</script>
</body>
</html>
```

## Result

![](/img/9bd20a259fa32856.webp)
