# Contributing

Thanks for looking. This is my personal portfolio, so it is not an open-source
project chasing features, but a few things are genuinely welcome:

- **Bugs.** If something is broken, mis-rendered, or behaves oddly, open an
  issue with steps to reproduce, your browser and OS, and a screenshot if it
  helps.
- **Accessibility issues.** Contrast, keyboard traps, screen-reader problems, or
  reduced-motion regressions: I want to know.
- **Security issues.** See [SECURITY.md](SECURITY.md) and email me instead of
  filing a public issue.

What I am not looking for: redesigns, new features, or dependency-bump PRs.

You are welcome to fork the code and learn from it within the terms of the
[LICENSE](LICENSE). Please do not redeploy it as your own portfolio.

## Running it locally

```bash
npm install
cp .env.example .env.local   # optional, see the file for what each value does
npm run dev
```

Before opening a PR, make sure both of these pass:

```bash
npm run lint
npm run build
```
