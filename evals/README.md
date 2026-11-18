# Document and figure trials

Read the [attendance brief](brief.txt) or the [handover brief](figure-brief.txt) plus its [broken input page](intake.html). Download the generated HTML to open it locally. The examples are fictional and work offline.

| Task | Previous instructions | Revised instructions |
|---|---|---|
| Prepare a phone handover with a rate comparison | [Generated page](samples/attendance-previous.html) | [Generated page](samples/attendance-current.html) · [mobile preview](samples/attendance-mobile.png) |
| Repair an ambiguous handover diagram | [Generated page](samples/handover-previous.html) | [Generated page](samples/handover-current.html) · [mobile preview](samples/handover-mobile.png) |

Each instruction set went to a separate agent without discussion history. Both agents received the same two requests in the same order, with separate output directories. The revised agent had the new figure guide; the previous agent had the original media guide. No outputs were exchanged. Each task was run once per version. The HTML files are the actual outputs, not polished showcase versions.

**Attendance.** Both versions put admission exceptions first. Both placed the chart with the pilot results, used the same 0–100% scale for 9/18 and 16/40, and qualified the single-session result. The earlier headline called out the difference directly. The later version defined the denominator above the plot and gave the difference below. Both supported the intended decision.

**Handover.** The input put a low-contrast diagram after the end-of-shift instructions. Its three labels hid the difference between a timeout and a confirmed failure. Its page occupied 908 CSS pixels at a 360-pixel viewport. Both revisions fixed the order and width and kept the responsibility for retrying a confirmed failure unresolved. The later version put the timeout near the opening and showed the return to the warehouse check. It also used more borders. The trial did not establish an aesthetic preference.

**Layout checks.** Chrome rendered the four pages offline at widths of 360 and 900 CSS pixels. None produced horizontal page overflow. The editor inspected the mobile labels and traced duplicate-ID, timeout and confirmed-failure paths. With Node, Playwright and Chromium available, run `node evals/check-layout.cjs`. Set `PLAYWRIGHT_MODULE` or `CHROME_PATH` to select an installed module or browser. The check covers overflow, figure width and network requests. Human readability requires a separate review.

For the next revision, use previously unseen material. Keep the brief, model and output medium fixed. Record wrong decisions, questions that required jumping between sections, and facts the material leaves unsettled. Have actual readers judge the usefulness and appearance independently. This trial was not a human study, did not run Claude Code or DeepSeek Harness inference, and did not test print or audio.

## Bundled rendering checks

The [attendance source](../assets/figures/attendance.vl.json) computes rates and denominator labels from counts. The [flow source](../assets/figures/check-in.dot) follows the branches in [this fictional function](figures/check_in.py). After installing the renderer dependencies, run `python3 evals/check-figures.py`. It changes a numerator and denominator, checks the resulting labels, exercises the three function outcomes, checks the rendered branch connections and verifies that a failed data load preserves the previous output.
