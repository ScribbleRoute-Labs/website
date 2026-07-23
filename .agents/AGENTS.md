# Agent Instructions & Guidelines

## Package Manager
- **ALWAYS use `pnpm`** for all node commands and package management tasks in this repository.
- **DO NOT** use `npm`, `npx`, `yarn`, or `bun`.
- **Command Mappings**:
  - Install dependencies: `pnpm install`
  - Add dependency: `pnpm add <package>`
  - Add dev dependency: `pnpm add -D <package>`
  - Run package scripts: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm test`
  - Execute global/remote packages: `pnpm dlx <package>` (instead of `npx`)
  - Execute local bin packages: `pnpm exec <command>`
