
codex升级后，经常出现reconnect「重新连接」，于是你尝试重新登录，结果出现了下面的画面。

如下图所示
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260610225633783.webp)

分析原因

Powershell设置windows代理通过魔法上网的共享端口上网 

打开codex之前临时设置 
HTTP_PROXY="http://127.0.0.1:7897" 
HTTPS_PROXY="http://127.0.0.1:7897" 

然后执行codex进行登录 codex