# Project Bootstrap Instructions

I am starting a new React + TypeScript project using Vite. Act as a Staff Software Engineer to initialize the workspace with a high-leverage, scalable architecture.

## 1. Environment & Config
- Initialize the Vite project with React + TypeScript.
- Set up a robust `tsconfig.json` with strict path aliases (e.g., `@/components/*`, `@/features/*`, `@/lib/*`) to prevent "import hell."
- Create a clean `src/lib/axios.ts` or similar API client that is ready for our Upstash/KV integration, including basic interceptors for error handling.

## 2. Structural Hierarchy
Create the following directory structure inside `src/`:
- `assets/`: Static assets.
- `components/`: Global components (`ui/`, `layout/`).
- `config/`: Environment variables and constants.
- `features/`: The core domain-driven architecture. Create an empty `features/dashboard/` and `features/sync/` directory.
- `hooks/`: Global custom hooks.
- `lib/`: Shared utility instances (API clients, database connection helpers).
- `providers/`: Root application providers (Error boundaries, theme, etc.).
- `routes/`: React Router configuration.
- `store/`: Global state management.
- `types/`: Global TypeScript definitions.
- `utils/`: Pure helper functions.

## 3. Core Implementation
- Create `src/providers/AppProvider.tsx`: A root component that wraps the app with necessary contexts (ErrorBoundary, Router, etc.).
- Create `src/App.tsx`: A clean entry point that utilizes the `AppProvider`.
- Create `src/main.tsx`: The standard mount point for the React app.

## 4. Dependencies
- Install the necessary foundation packages: `axios`, `react-router-dom`, `clsx`, `tailwind-merge` (for class utility management), and `lucide-react` (for icons).

**Goal:** Do not generate any sample UI content, mock data, or example features. I need a clean, industrial-grade foundation so I can immediately begin writing the core sync logic.
