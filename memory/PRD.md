# CodeQuest — Concept-Based Learning App (Frontend Design)

## Overview
CodeQuest is a mobile-first React Native / Expo learning app for **concept-based learning** — bite-sized ideas across Biology, Physics, Psychology, Philosophy and History (e.g. Solomon's Paradox, Photosynthesis, Evolution, Ship of Theseus, Quantum Entanglement). Frontend only, mock data.

## Personality & Design System
- Personality: **Tactile / Playful LIGHT** — chunky cards, generous spacing, rounded corners, subtle shadows, playful emoji per concept.
- Palette: Mint Green `#04B077` (primary), Sunny Yellow `#FFC800` (streaks/rewards), Coral Pink `#FF5277` (accents/badges).
- Icons: `@react-native-vector-icons/feather`. Tokens in `frontend/src/theme.ts`.

## Navigation (4 tabs, glassmorphic blur bar)
1. **Home** — greeting, streak, Continue Learning hero (Solomon's Paradox), daily goals, learning paths (Mind & Behavior, How Life Works, The Universe), trending concepts grid with emoji tiles.
2. **Learn** — search, sticky category chips (Biology, Physics, Psychology, Philosophy, History…), scrollable concept cards with image + subject pill + big emoji + progress.
3. **Challenges** — gradient Daily Challenge hero (Ship of Theseus), difficulty segmented control, practice list, leaderboard with medals.
4. **Profile** — avatar with level ring, XP progress, 2×2 stats, badges grid, settings.

iOS 26+ uses Liquid Glass native tabs; older iOS / Android / Web fall back to classic `<Tabs>`.

## Files
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `learn.tsx`, `challenges.tsx`, `profile.tsx`
- `src/data/mock.ts` — concepts, challenges, leaderboard, badges, user
- `src/components/progress-bar.tsx`, `streak-header.tsx`
- `src/navigation.ts`, `src/theme.ts`

## Not in scope (yet)
- Concept detail / lesson reader screens, quiz flow, backend, auth, real progress persistence.
