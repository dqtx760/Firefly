---
title: FlClash流规则&防NDS泄露
published: 2026-10-16
tags: []
category: Technical
draft: false
pinned: false
---
配好 FlClash，最容易翻车的是分流规则：规则不对，国内站绕远路、国外站被卡；DNS 再一泄露，前面全白搭。这篇直接给你能抄的流规则，外加一套防 DNS 泄露的自检方法。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-flclash-dns-leak-20261016-160633.webp)

分流规则

https://github.com/n0de-sudo/Perfect-Rules/blob/main/Clash/FlClash.js

下面能用的地址是怎么来的，Raw 

```
https://raw.githubusercontent.com/n0de-sudo/Perfect-Rules/refs/heads/main/Clash/FlClash.js
```

使用方法：
1. 点击“工具”→“进阶配置”→“脚本”，点击右上角的“添加”。
2. 通过 URL 导入之后，回到“配置”→“更多”，点击“复写”。
3. 选择“脚本”，然后选择刚才导入的脚本就可以了。
   
【DNS检测网址】
https://browserleaks.com/dns
https://ipleak.net
https://www.browserscan.net/zh/dns-leak
https://ippure.com/DNS-Leak-Detect.html
https://whoer.net/zh/dns-leak-test

需要观察返回的 DNS 服务器的 IP 所属国家和节点 IP 所属国家是否为同一个，如果全部相同，则说明没有 DNS 泄露，如果出现了多个不同位置的 DNS 服务器（重点是出现了中国的 DNS 服务器），则说明很有可能 DNS 泄露了。


 **DNS 泄露**：
本应由代理（跳板/魔法服务器）完成的 DNS 查询，从本地网络发出或曾发出，暴露了访问意图。

泄露后
本地运营商 / 网管能看到你访问了哪个站点。
目标网站可能根据 DNS 判断地理位置，进而拒绝服务（常见于流媒体、部分 AI 服务）。