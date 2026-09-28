# CodeQuest — Concept-Based Learning App (Frontend)

## Overview
Mobile-first React Native / Expo learning app for **concepts** (Solomon's Paradox, Photosynthesis, Evolution, Ship of Theseus, Quantum Entanglement, Trolley Problem, Black Holes, Cognitive Dissonance, Roman Republic…). Frontend only, mock data.

## What's inside

### 4 Tab screens (glassmorphic tab bar)
1. **Home** — greeting + streak, Continue Learning hero, **Fact of the Day** card (savable), Daily Goals, Learning Paths carousel, Trending Concepts grid.
2. **Learn** — search + sticky category chips + concept cards with image + subject pill + big emoji + progress; tap goes to concept detail.
3. **Challenges** — gradient Daily Challenge hero, difficulty segmented control, practice list, leaderboard with medals.
4. **Profile** — avatar + level ring, XP bar, 2×2 stats, badges grid, settings.

### Concept flows (route: `/concept/[id]`)
- **Concept detail** (`/concept/[id]`) — hero with image + emoji, meta chips, progress if any, Overview, Key Ideas, "What's inside" cards, sticky bottom bar with **Prove it** + **Start / Continue learning**.
- **Learn flow** (`/concept/[id]/learn`) — full paginated lesson reader with progress dots, per-lesson emoji, body copy, optional highlight callout, Next/Prev nav, and a celebratory "Got it!" completion screen that offers going straight to Prove.
- **Prove flow** (`/concept/[id]/prove`) — quiz with multiple-choice, instant feedback (correct/incorrect + explanation), running score, final results screen with %, XP earned, and Try Again.

Rich real content for **Solomon's Paradox** (7 lessons + 5 quiz questions). Any other concept falls back to a generic mini flow.

### Extras
- **Fact of the Day** card on Home with Save-to-Bookmarks toggle.
- **Streak Freeze** upsell modal triggered by tapping the streak pill (Monthly / Annual plans, perks list, free-trial CTA).

## Files
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `learn.tsx`, `challenges.tsx`, `profile.tsx`
- `app/concept/[id]/index.tsx`, `learn.tsx`, `prove.tsx`
- `src/data/mock.ts` — concepts, quiz, lessons, badges, leaderboard, fact of the day
- `src/components/progress-bar.tsx`, `streak-header.tsx`, `streak-freeze-modal.tsx`
- `src/theme.ts`, `src/navigation.ts`

## Not in scope
- Real backend, auth, real progress persistence.
