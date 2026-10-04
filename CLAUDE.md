@AGENTS.md

## Claude-specific notes

- If the request is about how something looks or feels (layout, colour, typography, motion), consult the `ui-ux-pro-max` skill in `.claude/skills/` before designing.
- When the user attaches photos in chat, they can't be committed from the chat itself — ask them to upload the files to `public/images/<slug>/` on GitHub (Add file → Upload files), then run `npm run images` on that branch.
- Finish every change with a pull request and a one-paragraph plain-English summary of what changed and where to look on the Vercel preview.
