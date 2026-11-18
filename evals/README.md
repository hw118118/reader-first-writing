# Document and figure trials

Read the [attendance brief](brief.txt) or the [handover brief](figure-brief.txt) plus its [broken input page](intake.html). Download the generated HTML to open it locally. The examples are fictional and work offline.

| Task | Previous instructions | Revised instructions |
|---|---|---|
| Prepare a phone handover with a rate comparison | [Generated page](samples/attendance-previous.html) | [Generated page](samples/attendance-current.html) · [mobile preview](samples/attendance-mobile.png) |
| Repair an ambiguous handover diagram | [Generated page](samples/handover-previous.html) | [Generated page](samples/handover-current.html) · [mobile preview](samples/handover-mobile.png) |

Each instruction set went to a separate agent without discussion history. Both agents received the same two requests in the same order, with separate output directories. The revised agent had the new figure guide; the previous agent had the original media guide. No outputs were exchanged. Each task was run once per version. The HTML files are the actual outputs, not polished showcase versions.

**到场率。** 两版均优先交代验票例外，把图放在试点说明处，用共同的 0–100% 尺度表达 9/18 与 16/40，谨慎说明单场数据。旧版标题直接给出差值，新版用图上方交代分母、下方给出差值。两者都能答题；没有观察到换版提高数据准确性。

**交接图。** 原始输入把浅色小字的固定宽度图放在“关于下班”之后，图中仅有“开始 → 处理 → 结束”。360 CSS 像素视口下页面实际宽 908。两版都修正了位置、可读宽度及保存时序，都保留了“确认失败后由谁重试尚未规定”。新版将委托方最担心的超时处理放在开头，同时在图的超时分支写明使用 37 号并返回仓库核对；旧版也写了用原编号重发，但回到哪一步须读者自己接起来。新版分支中浅色边框较多，并未证明更美观。不要据此声称修改好的图都是新指令的功劳。

**复验。** Chrome 离线渲染，使用 360 和 900 CSS 像素两种视口；四份成品均无整页横向溢出。按手机实际比例看标签，并分别试走重复编号、回执超时、已确认保存失败三条路。自动布局检查只测溢出、图的可见宽度及网络请求；它不能证明文字可读或判断一定正确。在有 Node、Playwright 和 Chromium 的环境运行 `node evals/check-layout.cjs`。可选环境变量 `PLAYWRIGHT_MODULE` 指向 Playwright 模块，`CHROME_PATH` 指向已有 Chrome。使用写作技能无需这些工具。

For the next revision, use previously unseen material. Keep the brief, model and output medium fixed. Record wrong decisions, questions that required jumping between sections, and facts the material leaves unsettled. Have actual readers judge the usefulness and appearance independently. This trial was not a human study, did not run Claude Code or DeepSeek Harness inference, and did not test print or audio.
