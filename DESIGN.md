# BookBank.bh Design Brief

## Context
BookBank.bh is a community book-sharing platform where users lend, borrow, and donate books with neighbors. Emotional tone: warm, literary, and inviting—like a beloved old library filled with history, candlelit nooks, and aged books.

## Aesthetic Direction
Softer, warmer Hogwarts library aesthetic. Aged parchment not dark stone. Candlelit warmth with honey amber accents, generous rounded corners, and layered warm shadows. Old-style serif typography creates literary elegance. Every detail carries the coziness of a cherished library space.

## Color Palette

| Token | OKLCH | Light Context | Dark Context |
|-------|------|---|---|
| **Primary (Honey Amber)** | `0.58 0.14 58` | Warm actionable accent, CTAs | Glowing golden amber |
| **Secondary (Warm Brown)** | `0.55 0.08 50` | Subtle secondary actions, tags | Warm secondary tones |
| **Accent (Golden Amber)** | `0.64 0.13 58` | Highlights, tertiary, focus ring | Rich golden highlight |
| **Background (Parchment Cream)** | `0.975 0.01 75` | Main surface, aged paper feel | Dark walnut wood (0.2 0.03 50) |
| **Card (Warm Parchment)** | `0.96 0.015 75` | Elevated surfaces, book shelves | Medium warm brown (0.25 0.03 50) |
| **Muted (Soft Taupe)** | `0.92 0.01 75` | Disabled, subtle backgrounds | Darker muted (0.38 0.02 50) |
| **Foreground (Dark Brown)** | `0.28 0.04 50` | Body text, primary text | Cream ivory (0.94 0.01 70) |
| **Destructive** | `0.55 0.22 25` | Delete, reject actions | Same across modes |

## Typography

| Role | Font | Usage |
|------|------|-------|
| **Display** | Fraunces (serif) | Page titles, section heads, book titles—elegant and authoritative |
| **Body** | Lora (serif) | Body text, navigation, UI copy—warm, literary, readable serif |
| **Mono** | JetBrainsMono | Code, metadata, book IDs, timestamps |

**Type Scale:** 12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 32px (3xl), 48px (4xl)

## Structural Zones

| Zone | Treatment | Detail |
|------|-----------|--------|
| **Header/Nav** | `bg-card` + `border-b border-border` | Warm parchment card, subtle base-color border |
| **Main Content** | `bg-background` | Aged parchment cream, primary reading surface |
| **Section Cards** | `bg-card shadow-warm` | Elevated with candlelit warm amber shadows |
| **Footer** | `bg-muted/50 border-t border-border` | Soft taupe with subtle top border |
| **Sidebar (if used)** | `bg-sidebar border-r border-sidebar-border` | Warm parchment with right definition |

## Spacing & Rhythm
- Base unit: 4px (0.25rem)
- Cards & sections: 16px (1rem) padding
- Gutters: 24px (1.5rem) between sections
- Compact mobile: 12px (0.75rem)
- Generous vertical breathing: 32px (2rem) between major sections

## Component Patterns
- **Buttons:** Honey amber primary, warm brown secondary, golden accent; all with `rounded-lg` (0.75rem)
- **Cards:** `bg-card shadow-warm` with `rounded-lg`; hover: lift to `shadow-warm-md`, subtle scale (1.02)
- **Inputs:** `bg-input border border-border` with warm amber focus ring
- **Links:** Honey amber, underline on hover, no color change on visited
- **Badges:** Muted background with foreground text, rounded full
- **Alerts:** Color-coded (success green, warning amber, destructive red) with muted warm backgrounds

## Motion & Microinteractions
- **Default transition:** `transition-smooth` (0.3s cubic-bezier)
- **Card hover:** Lift to `shadow-warm-md`, subtle scale (1.02)
- **Button press:** Quick feedback with opacity or scale (0.98)
- **Page load:** `fade-in` animation (0.3s)
- **Content reveal:** `slide-up` animation (0.3s) for modals, dropdowns
- **No bounce, no spin:** Smooth, intentional motion only

## Signature Detail
Candlelit warm shadows (`shadow-warm`, `shadow-warm-md`, `shadow-warm-sm`, `shadow-candlelit`) with honey/golden amber tints create perceived depth and intimacy. Aged parchment background + dual serif typography (Fraunces + Lora) + generous rounded corners produce a "cozy old library shelf" visual that differentiates BookBank.bh from cold corporate platforms.

## Responsive Breakpoints
| Breakpoint | Width | Use Case |
|------------|-------|----------|
| **Mobile** | <640px | Single-column layout, full-width cards, compact nav |
| **Tablet** | 640px–768px | Two-column grid, sidebar collapse option |
| **Desktop** | 768px+ | Three-column grid, fixed sidebar, wide content areas |

## Constraints
- No cold grays; no harsh blacks; no generic neutral shadows
- Maintain OKLCH values; no hex or rgb literals in components
- Mobile-first responsive design
- Light mode primary; dark mode maintains warm tone (walnut, not black)
- Serif typography throughout creates literary warmth
