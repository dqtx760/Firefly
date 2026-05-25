收集时间：2026-05-26 04:23:10

我让 GLM-5.1 HighSpeed 做了一个真正能用的 AI 选题雷达和微信自动Agent

原始链接：https://mp.weixin.qq.com/s/mGbJVbwYnDnWelqr9evcaQ

## Markdown 内容

我本来以为高速模型就是“回复快一点”，直到我用它做了两个完整的产品开发。

是从 PRD 出发，做视觉原型、搭前后端、设计数据结构、写接口、修 bug，最后交付一个能打开、能点击、能截图的产品。

整个过程不到 20 分钟。。。速度快到几乎没有了摸鱼时间！

然后我还接入了Hermes Agent，手机上也完成了一个微信自动回复的学习委员～直呼666了

# 先说第一个产品，背景：我每天的信息焦虑

我每天要从 X/Twitter、公众号、HackerNews、AIHOT、Reddit 五个信源的 100 多条 AI 新闻里找选题。

信息源是够的，我之前已经搭了一套多源抓取工程，每天自动把这些平台的内容拉下来。但问题不在信息不够，在于判断成本太高。

100 条新闻扫一遍，哪些值得讲？适合拍视频还是写公众号？外网已经火了的国内有没有人讲？能不能做出演示效果？每个问题都要花时间想。

所以我想：能不能让 AI 来帮我做这个判断？

## 第一步：给它一个 PRD

PRD核心要求就一句话：做一个 AI 选题雷达，帮我在 3 分钟内找到“今天最值得讲什么、怎么讲”，以及基于这个做的一些扩展。

然后我开始用 Claude Code，背后接的是 GLM-5.1 HighSpeed，让它一口气开发。

## 不到 1 分钟，首页就出来了

我没有上来就让它直接开发，而是想先看一下它生成的原型是什么样的。

很震惊的是，整个原型生成过程不到1分钟。。。要知道过去的Claude至少要3~5分钟，足够我去好好的把茶泡上，下面这条视频总共1分钟，大家可以拉到最后去查看结果：

## 然后它一口气把前后端全做完了

有了首页原型之后，我没有重新解释需求，直接说“继续别停，一口气全部弄完”。

然后它就开始了：

-
先读了已有的抓取工程的代码，理解了数据结构
-
设计了 Source、Event、TopicScore、TopicCard、DailyReport 五个数据契约
-
用 Python FastAPI 搭了后端 API，public 路由和 internal 路由都写了
-
用 Next.js 搭了前端，首页、筛选、搜索、详情抽屉、选题卡弹窗全做了
-
规则评分引擎也写了——不依赖 LLM，用关键词和规则给每条新闻打分，输出 S/A/B/C 等级

中间停了一次，总耗时大约 10 分钟。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/j5GjAevlWGnIt3WdibhmGajcIBMg7N9UuMQctfMulaBtaSx3bUbj81F3G5UgxdBRz7tiam0rSqLLkK8v2pmrtFOzCswAuJWwWgZwfve2EyJGg/640?wx_fmt=png&from=appmsg)

第二轮又花了 7 分钟，把交互细节和数据流进一步补齐。到这一步，整个产品已经可以跑起来了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/j5GjAevlWGmsbN2A0M1VLvRmhkrrVlR3NtzUvI96fq2RS9ooFQurgp1bFZO6J6OeCTUjtH7Nb0ianOzUckuMw2LsNYefh7LsJFBic8WFyicwBA/640?wx_fmt=png&from=appmsg)

可以看一下效果：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j5GjAevlWGks1xsHuMf0KWfoGuP2R9cVzwdorkcYohLNfUmAoVJJY304FpiampEfUpibNNII4MWAWSEFv2JVFAcsoicRX0OiccrWLIJWs0ia1nEg/640?wx_fmt=jpeg&from=appmsg)

## 是选题判断系统

这一步我觉得特别重要：我并不需要一个纯粹的新闻资讯站。

首页每张选题卡片上直接出现了推荐理由、信息差、可演示性、需求强度、观点空间——这些维度是内容创作者真正关心的，不是普通读者会看的。

右侧 AI 日报直接给今天的主线判断、关键动态、推荐拍摄方向。

信源管理面板让用户知道数据从哪里来、抓取状态是否健康。

还有个功能我特别喜欢：一键生成选题卡。点一下，它就把一条新闻拆成选题角度——核心判断、推荐平台、视频钩子、演示方案、内容结构（opening → background → change → demo → takeaway）

![Image](https://mmbiz.qpic.cn/mmbiz_png/j5GjAevlWGmxgLgLrlHYIibIic3mRfNLmicLfjVbVVwFkX8sQ1xYuiapt87Hy2GssBYWG88icdStY9pHLHYQKhzuRWUSSmdd3a75v2dtTS4LDtvA/640?wx_fmt=png&from=appmsg)

从看到信息到可以开拍，中间那些我本来要自己想的判断，它帮我做了。

## 然后又加了选题库和白天模式

产品主体做完之后，我又追了两个需求。

第一个是选题库。我想的就是，看到好的选题，点一下就能收藏，左侧栏能随时看已经收藏了多少条。听起来很简单对吧？

但实际上要处理的细节还挺多的——卡片上要有收藏按钮，详情抽屉里也要有，选题卡弹窗里还要有一个"保存到选题库"的入口。点了之后要存到 localStorage，刷新页面不能丢。左侧栏要显示数量，没收藏的时候要有引导文案。点"选题库"进去，feed 要切换成只显示收藏的内容。

我跟它说了一遍，它直接一整个 page.tsx 重写了，780 行代码，所有入口都没漏。这块挺让我意外的，因为这种到处都要加按钮但逻辑要统一的需求，特别容易漏一个。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/j5GjAevlWGm3DDGWBVLLicczxiakfNkpeicvJKKpx0TJJZl1xWCNMGk0xI6pcX8hdXCIPyxJNOxKPlnoEtLtahA2icn0gn6dfZt5GNzx1NE8Uus/640?wx_fmt=png&from=appmsg)

第二个是白天模式。这个更有意思了，踩了个坑。

我让它加了右上角的主题切换按钮，CSS 变量也定义了两套（深色/浅色），data-theme="light" 的覆盖也写了。结果切过去一看——纹丝不动，整个页面还是黑的。

排查了一下才发现，是 Tailwind CSS v4 的 @theme inline 搞的鬼。这个 inline 的意思是：颜色值直接内联到工具类里，不生成 CSS 变量。所以不管你怎么覆盖 CSS 变量，Tailwind 生成的类里写死的还是深色的值。

把 inline 去掉就好了。但这个坑如果自己查，可能要翻半天 Tailwind v4 的文档。

然后还有一波坑：页面里 20 多处内联 style 里硬编码了颜色值，比如进度条轨道用的 rgba(255,255,255,0.06)，在深色背景下看着正常，切到浅色直接变透明了——进度条消失了。推荐理由的背景色块、评分条、各种 tint 颜色都是这个问题。

GLM-5.1 HighSpeed 的做法挺聪明的：把所有硬编码颜色抽成了 CSS 变量（--color-track、--color-tint-cyan、--color-tint-red 这些），然后浅色主题重新定义一套值。一次全改完，20 多处一个没漏。

踩坑本身不烦，烦的是等回复。GLM-5.1 HighSpeed 几秒出结果，你说一个问题它回一个方案，看一眼就能接着改。

之前这一整套流程，是我花了很长时间打磨Skill出来的，一直没有做可视化，没想到用GLM 5.1 HighSpeed，20分钟就跑通了整个前后端，这个在过去真的是不可想象的。

# 另外我还用微信开发了一个 Agent 学习委员

选题雷达是在电脑上做的。再说一个更野的。

我做了个 Agent 超级个体社群，目前 4 个班群。学员每天在群里问各种问题，“CC 怎么安装？”“报错了怎么办？”“那个教程链接能再发一下吗？”

说实话这些问题的答案，飞书知识库里都有。68 篇教程文档，从安装到实战基本全覆盖。但学员不会自己找啊，扔群里就等回复。

所以需求很明确：做一个 7×24 的自动Agent助教。

重点来了：我全程没打开过电脑上的终端或 IDE。拿着手机，在微信里跟 Hermes Agent 聊天，背后接 GLM-5.1 HighSpeed，就把这事干完了。

需求就一句话，发给微信 ClawBot，然后指定了群聊：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j5GjAevlWGkDnAYWVxkqrwEYmrmfJxyibTknwbakDBBIxzICPo6j65I2YJK86jZrF0kB6wHbFUwHZxUJujl2osRibSicrrewscfTWCD14jgHNU/640?wx_fmt=jpeg&from=appmsg)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j5GjAevlWGkEjtZ6Ef3N2n2CjBeq2mNmL5Q1Ahyoa4fneLxOClavVfnpjAVVFRmMMTxugJU9UAaz3wm2Osf6MKFWCD6KYncMdpPB4A47ic1M/640?wx_fmt=jpeg&from=appmsg)

从这条消息开始，所有开发指令都在微信对话框里完成。整个过程，我全程在外面散步，就完成了开发。大家看到的截图上面的WiFi是我回家之后才去翻看，来进行截图的。

之前用 Codex 接 Hermes，一条响应经常十几分钟。这次 GLM-5.1 HighSpeed，不到一分钟一轮，节奏跟聊天一样。

下面给大家说一下怎么做：

## 第一步：让它读懂微信消息
先让 AI 能"看到"群里说了什么。我之前装了 wechat-cli，能读微信本地数据库。它直接调 wechat-cli 拉群消息：

我：帮我看下 4 个正式班群的消息能不能读到夏夏：[跑命令] ✅ 四个群都能读到，这是 chatroom ID……

## 第二步：把飞书知识库喂给它
消息能读了，下一步让它"懂"这些消息。

Hermes 自动调 lark-cli，把飞书知识库 68 篇文档的标题和链接全拉下来，建成索引。然后用 GLM-5.1 HighSpeed 对比“学员的提问”和“68 篇文档标题”，找到最相关的教程，生成带链接的回复。这一步用快速模型也很重要，因为我们需要尽快的答复用户。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/j5GjAevlWGmWhHCHh7291xRktpn7ovsUBeDMU8LqkfGVl6mcOyoHHibiaEXGwMArlej15GOv0vOm9RsRqLqND4NpM8TPW4IlWLTARydNAIgJ4/640?wx_fmt=jpeg&from=appmsg)

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/j5GjAevlWGmYzWkT32nX6o2JTmYKaVgUiby5GeyNdwiaAqNiaibAbKkMDPXmP94f5M8jr5fYPcP4OlFicicU9TEtQ4EsVcnG3sibx2a2Vf8ib6u4sEw/640?wx_fmt=jpeg&from=appmsg)

这一步我没干预，GLM-5.1 HighSpeed直接完成了。

## 第三步：怎么在微信里发消息？

这是最大的坑。

微信没有开放的“发消息”接口。直接写本地数据库？封号风险太高。最终方案是模拟操作：用 pyautogui 控制键盘鼠标，在微信窗口里搜索群名、切到对应群、粘贴回复、按回车。

踩了两个坑：macOS 需要给 Python 授权"辅助功能"权限，不然按键不生效；微信桌面端同时跑 3 个进程，得按窗口尺寸定位到正确的主窗口。

每个坑都是在微信里跟Hermes描述问题，她几秒给出方案，我确认后她接着改。全程没切到 IDE 调试、没手动改过一行代码，就是聊天。

## 组装完成

最终产出是一个 850 行的 Python 脚本：每 120 秒轮询一次只处理新消息，关键词匹配 + LLM 判断检测提问，GLM-5.1 HighSpeed 对比 68 篇文档生成回复，模拟键盘操作发到群里，同一个群 120 秒内不重复回复。

## 真的开跑！

我在四个群里分别发了测试提问：

正式班B："Agent Team怎么用？"
→ 匹配到《用Agent Team让Skills多Agent工作+自进化》✅

正式班D："我记得有个教程是教微博热搜的Skill，是啥来着？"
→ 匹配到《使用Claude Skills从微博热搜提取产品创意》✅

这种模糊描述都能精准匹配，68篇文档里准确捞出来。

然后还来了一个真实用户提问——正式班D的"小祝"问了"Hermes接微信不是只能通过OpenClaw吗"，机器人也捕获到了，匹配了相关教程回复。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j5GjAevlWGlibPytCkSJz3EPkwcjBlOVxVib69yuThczmTvdN7NgNbTt1u8iaicLvMbH4Y3ZWoUDfI3Rlx48U83e2T4GhLppE7ql7RpBe81Gbos/640?wx_fmt=jpeg&from=appmsg)

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/j5GjAevlWGk4mhjUiaP4fHlUBLcXINu0ibN0hWh6r5K3WbkTibD3fNF07DjPDtfGmKgNEEvynSRQbjiaF9hrHC3ZucXXLmRHiaeN58Fwss0TgxvQ/640?wx_fmt=jpeg&from=appmsg)

很有意思的是，当时我在餐桌上吃早餐，所以是拿手机在跟大家聊，大家还以为我是用CC或者CodeX的Computer Use来完成的上面流程，我说不是的，其实我是用Hermes Agent加GLM 5.1 High Speed来开发的.

然后正好这个时候，刚才开发好的脚本，它每两分钟轮询，看到了一个群友提的问题，就自动在电脑上给我回复了，大家都笑了，说Agent会抢答了。

每次成功回复后，我的“微信ClawBot”都会收到一条通知：

社群自动回复已发送
群：正式班D
提问人：小祝 腾讯有调
问题：……

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/j5GjAevlWGmF3hzthmic1icibVibd6aTmMzBmLXrLAGkz9889qvUg0UoNyczxr3DCyjWxlM3MohSSIpKTCDMwiblqUiaHf5YQvicV6c53CTlt9pCUg/640?wx_fmt=jpeg&from=appmsg)

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/j5GjAevlWGkJ2DkSggCeYP6yCkWyqeUFmssUCnc3nqmtgia8Cf7wSibl6ZxYZicsJyIPFIsYCaibu7DISZMrFicEq88N7U0BAYkbpcTnUBolY1As/640?wx_fmt=jpeg&from=appmsg)

全程无人值守！

从 19:08 开始聊需求，到 19:52 初步完成开发，中间还有我去刷短视频的时间。感觉不到半小时就搞完了。

# 最后说说为什么是 GLM-5.1 HighSpeed

说实话我之前对“高速模型”没太大感觉。快一点慢一点，差个几秒，能怎样？但做完这两个Case 之后我改想法了。

选题雷达那个项目，从 PRD 到能跑的产品，中间经历了多少轮模型调用？前端代码、后端 API、数据契约、评分引擎、路由拆分、样式冲突、主题切换……每一轮都是我提个需求，它生成代码，我看一眼产品说哪里不对，它改完我再确认。以及细节调整，加起来至少十几轮。

如果每轮多等几分钟，十几轮就是一两个小时出去了。中间我大概率会去刷个手机、回个消息，回来的时候已经忘了上一轮在改什么了。

但 GLM-5.1 HighSpeed 每轮非常快。十几轮下来，我全程没离开过椅子。真是快到我根本没时间走神。

之前高速模型基本都是轻量级的，快是快，但能力缩水，复杂任务撑不住。GLM-5.1 HighSpeed 不一样，它是完整的 GLM-5.1 旗舰模型，400 tokens/s 的输出速度，能力没有打折。选题雷达这种前后端+数据结构+多轮迭代的活儿，轻量模型根本干不了。

国产模型，国内直连，性能强大，速度飞起，这次我觉得挺值得说的。

试试看，很可能用过就回不去了。
