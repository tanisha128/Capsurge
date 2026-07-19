# CapSurge — Rotating Cards (isolated demo)

A standalone Next.js app containing **only** the rotating services cards and the Navbar,
extracted from the main CapSurge site.

## Run

```bash
cd cards-demo
npm install
npm run dev      # http://localhost:3001
```

Port 3001 is used so this can run alongside the main site on 3000.

## What's here

| File | Origin |
| --- | --- |
| `src/components/modules/ServicesCarousel.tsx` | the rotating cards — copied verbatim |
| `src/components/shared/Navbar.tsx` | copied verbatim |
| `src/components/shared/Logo.tsx` | Navbar dependency |
| `src/styles/globals.css` | Tailwind entry + `.container-custom` |
| `tailwind.config.ts` | brand tokens (`primary`, `secondary`, spacing, Montserrat) |
| `src/app/page.tsx` | new — a dark section that renders the carousel alone |

## Notes

- The cards are designed for a **dark** surface (`bg-white/5`, white text), so `page.tsx`
  renders them on `bg-primary` (`#131b2e`). On a light background they'd be invisible.
- Navbar links (`/services`, `/careers`, …) and the card's "Know More" link
  (`/knowledge-centre`) point at routes that don't exist in this demo — they will 404.
  Only `/` is implemented here.
- To change the auto-rotate speed, edit the `4000` ms timer in `ServicesCarousel.tsx`.
- Card content lives in the `SERVICES` array at the top of `ServicesCarousel.tsx`.
