# Reader-first Writing · 写给读者

Turn the same source material into the document a particular reader needs. A manager deciding whether to extend a pilot needs a rate and its denominator. A volunteer at the door needs to know when to stop admitting people. Both can use the same page, if the information reaches them in the right order.

一个可在不同 agent 中使用的编辑技能。它从读者要做的决定出发，选择事实、文种、图表和语言。已有好段落或好图就保留。适合难懂的评审稿、多受众改写和随文图表设计。

<img src="evals/samples/attendance-mobile.png" width="280" alt="手机交班页：先交代重复验票和机器无响应的处理，再用共同尺度比较甲组50%和乙组40%的到场率。">

In the handover trial, the input diagram used three labels (“send → process → finish”). A volunteer could not tell whether a timeout allowed deleting the record. [Compare the input](evals/samples/intake-mobile.png) with [the repaired mobile diagram](evals/samples/handover-mobile.png).

[Try the source brief](evals/brief.txt) · [See both generated versions and test results](evals/README.md) · [同料异稿与跨地区样例](examples.md)

## Try it / 试用

Copy `SKILL.md` and `references/` into a directory named `reader-first-writing` under your agent’s skill root. No runtime dependency is required to load the skill. Rendering uses the tools available to your agent.

| Agent | Project installation | Try it |
|---|---|---|
| [Codex](https://developers.openai.com/codex/skills/) | `.agents/skills/reader-first-writing/` | `$reader-first-writing` followed by your request |
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/reader-first-writing/` | `/reader-first-writing` followed by your request |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/skill/skill-filesystem/README.md) | `.dsh/skills/reader-first-writing/` or the shared `.agents/skills/` root with the filesystem provider enabled | Ask the agent to use the named skill |

For example, from this repository, with the destination set to your project:

```sh
dest="../my-project/.agents/skills/reader-first-writing"
mkdir -p "$dest"
cp SKILL.md "$dest/"
cp -R references "$dest/"
```

> Turn these field notes into a handover for a first-time operator. They will use a phone. Keep every condition that changes whether they should stop.

> 用这份记录给经理写一段试点建议，再给当班人写一张手机交接页。需要图时把图放在作决定的地方；材料没定的事情保留为待定。

使用方可指定语种、地区、受众、文种和样稿。机构流程和实际界面文字优先于对国别风格的猜测。[跨地区写作](references/localization.md)

## When to choose it

- Already have finished prose and want to retain its meaning while removing formulaic writing? [Humanizer](https://github.com/blader/humanizer) is a strong fit. It also considers structure, audience knowledge and voice.
- Need to decide which facts, exceptions or visuals belong in a review, field guide, or briefing? Start here. The same program may produce a brief note, a technical diagram, or no figure, depending on the reader's task.
- Need a particular graphic format or chart renderer? Use your preferred drawing tool to render the result. The skill keeps the figure, its evidence, caption and position together in the document. [Figure editing guide](references/figures.md)

## Help improve it

Try a task with the skill enabled and disabled, or compare revisions with the same model, materials and output format. Ask a reader to make the intended decision without the original prompt. Report a specific missed condition, confusing figure, or case where the simpler version worked equally well. Include an anonymized or invented example you may share, using the [reader-case issue template](.github/ISSUE_TEMPLATE/reader-case.md). Re-run accepted cases before releasing a change. [Public test materials](evals/README.md)

The package uses the [Agent Skills format](https://agentskills.io/specification). Writing draws on [Diátaxis](https://diataxis.fr/) and the public guides linked in each reference. Original instructions and fixtures are available under the [MIT license](LICENSE).
