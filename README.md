# Stochastic Course App

Main learning platform for CTLX Holdings educational content.

## Live

https://learn.ctlx.holdings

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework |
| React | UI |
| Tailwind CSS v4 | Styling |
| Recharts | Charts |
| localStorage | Progress tracking |
| Vercel | Deployment |

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Course catalog (home)
│   ├── globals.css           # Design system (colors, components)
│   ├── layout.tsx            # Root layout
│   └── stochastic/
│       ├── page.tsx          # Course home (all lessons)
│       ├── lesson/[id]/      # Individual lesson pages
│       └── progress/         # Progress dashboard
├── components/
│   ├── simulations/          # SimulationPanel, Histogram, StatsDisplay
│   ├── quiz/                 # QuizContainer
│   └── lessons/              # InsightCard, RCQuestions
├── lib/
│   ├── lessons/              # Lesson content and data
│   ├── simulations/          # Monte Carlo simulation logic
│   └── storage/              # localStorage helpers for progress
└── types/                    # TypeScript interfaces
```

## URL Structure

| URL | Content |
|-----|---------|
| `/` | Course catalog |
| `/stochastic` | Stochastic Math course home |
| `/stochastic/lesson/1` | Lesson 1 (Learn/Simulate/Quiz tabs) |
| `/stochastic/lesson/2` | Lesson 2 |
| `/stochastic/progress` | Progress dashboard |
| `/risk-return/` | Risk simulator (rewrite → separate app) |

## Vercel Rewrites

This app handles URL rewrites to other apps via `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/risk-return/:path*",
      "destination": "https://risk-return-simulator.vercel.app/:path*"
    }
  ]
}
```

## Design System

### Colors

```css
--coral: #FF6B4A          /* Primary accent */
--coral-dark: #E55A3A     /* Hover states */
--coral-light: #FFF0ED    /* Light backgrounds */
--bg-primary: #FFFFFF
--bg-secondary: #F8F9FA
--text-primary: #1F2937
--text-secondary: #6B7280
```

### Key Components

- **Top navigation** with breadcrumbs
- **Three-tab layout** (Learn / Simulate / Quiz) per lesson
- **Progress tracking** via localStorage
- **Coral-accented cards** for content blocks

## Adding a New Lesson

1. Add lesson object in `src/lib/lessons/lessonData.ts`
2. Include: `id`, `title`, `concept`, `context`, `keyInsight`, `rcQuestions`, `simulation`, `quiz`
3. Add to appropriate phase in `phases` array
4. Deploy (auto on push to main)

## Deployment

Automatic on push to `main` branch via Vercel.

```bash
git add -A && git commit -m "Your message" && git push
```

## Related

| Resource | Link |
|----------|------|
| Risk-Return Simulator | [GitHub](https://github.com/ctlxholdings/risk-return-simulator) |
| Platform Specs | `../LEARN_PLATFORM_SPECS.md` |
| Live Site | https://learn.ctlx.holdings |
