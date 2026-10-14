# Image sources

All photos on the site and all app screens are AI-generated concept visuals (Figma AI), created for the North & Bean 2.0 design. They illustrate a fictional café. They do not show real people, real businesses or real products.

## Photos (`images/`)

| File | Used in |
|---|---|
| `hero-nyhavn-morning.webp` | Hero |
| `flat-white.webp` | Menu: Signature Flat White |
| `barista-latte-art.webp` | Menu: Oat Latte |
| `v60-pour-over.webp` | Menu: V60 Pour-over, Bean of the month, Order ahead |
| `kanelsnegl.webp` | Menu: Kanelsnegl |
| `cappuccino.webp` | Menu: Cappuccino |
| `cortado.webp` | Menu: Cortado |
| `iced-oat-latte.webp` | Menu: Iced Oat Latte |
| `cold-brew-tonic.webp` | Menu: Cold Brew Tonic |
| `our-story-couple.webp` | Our story |
| `cupping.webp` | Events |
| `cafe-interior.webp` | Visit us |

## App screens (`images/app/`)

| File | Shows |
|---|---|
| `app-home.png` | Home: your usual and this week's favourites |
| `app-pickup.png` | Choosing a pick-up time |
| `app-status.png` | Order status |

## Generated copies

The following files are made from the originals above with `npm run images` (`app/scripts/resize-images.mjs`):

- `*-480.webp` and `*-800.webp` — smaller copies of each photo, for `srcset`
- `hero-nyhavn-morning-mobile.webp` — portrait crop of the hero for phones
- `app/*.webp` — lighter WebP versions of the app screens
