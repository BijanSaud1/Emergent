# CodeQuest — Learning App (Frontend Design)

## Overview
CodeQuest is a mobile-first React Native / Expo learning app for skill and coding tutorials. This iteration delivers a polished, vibrant, gamified frontend design using mock data only (no backend logic, no auth).

## Personality & Design System
- Personality: **4 Tactile / Playful LIGHT** — chunky cards, generous spacing, rounded corners, subtle shadows.
- Palette: Mint Green `#04B077` (primary), Sunny Yellow `#FFC800` (streaks/rewards), Coral Pink `#FF5277` (badges/accents).
- Icons: `@react-native-vector-icons/feather`.
- Tokens: colors/spacing/radius in `frontend/src/theme.ts`.

## Navigation
Bottom tab bar with 4 tabs (glassmorphic blur background on native, opaque on web):
1. **Home** — greeting, streak, Continue Learning hero, daily goals, learning paths carousel, trending skills grid.
2. **Learn** — search, horizontal category chip row (sticky), scrollable full-width course cards with progress.
3. **Challenges** — gradient Daily Challenge hero, difficulty segmented control, practice list, leaderboard with medals.
4. **Profile** — avatar with level ring, XP progress bar, 2×2 stat cards, badges grid, settings list.

iOS 26+ gets native Liquid Glass tabs via `expo-router/unstable-native-tabs`; older iOS / Android / Web fall back to classic `<Tabs>`.

## Files
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `learn.tsx`, `challenges.tsx`, `profile.tsx`
- `src/data/mock.ts` — courses, challenges, leaderboard, badges, user
- `src/components/progress-bar.tsx`, `streak-header.tsx`
- `src/navigation.ts`, `src/theme.ts`

## Not in scope (yet)
- Course/lesson detail screens, code editor, real backend, auth, real progress persistence.
