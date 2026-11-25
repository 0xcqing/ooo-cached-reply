`main.ts` is a dependency-free Node program that validates a single-line out-of-office reply and writes it to `entry.txt` in the configured output directory, then reads the file back to prove the bytes match. The line works because it opens as deadpan corporate policy ("cached until Monday") and ends with the machine quietly admitting it never actually read the message, so the confident promise undercuts itself in the last few words. It is 129 characters, one line, and still sounds like a real autoresponder a sender would receive.

## How it runs

```powershell
$env:MAKEFUN_OUTPUT_DIR = "./out"; node main.ts
```

[![make.fun](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)
[![rank](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/0xcqing/ooo-cached-reply/rank.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/leaderboard)
[![reward](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/0xcqing/ooo-cached-reply/reward.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)

Bounty: https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d
