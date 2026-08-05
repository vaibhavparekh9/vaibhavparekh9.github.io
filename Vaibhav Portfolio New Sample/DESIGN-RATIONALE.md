# Redesign rationale — Vaibhav Parekh (v2)

A calmer, more personal rebuild. Treated as a personal site, not a résumé — so competitive stats ("1st/9", "44.6% faster") are gone; the voice is first-person and warm. The only fixed constant remains the typeface pairing: **Spline Sans Mono** (display / labels) + **Satoshi** (body).

## Changes from v1
- **Removed** the "Operating Principles" section from the site (the card styling DNA lives on in the project/experience cards).
- **Hero** display text dialed down (smaller, semibold, not a slogan) and made personal.
- **Removed** the Ferrari tag from the nav and the "design credits" line from the footer.
- **Projects** are now blog-style cards *with images*; clicking opens an accessible modal ("pop on the same page") with the write-up, tags, and a GitHub link — progressive disclosure. Equations removed from card fronts; **pills kept**.
- **Trajectory** is now dropdown/accordion cards (progressive disclosure).
- **Background** grid switched from lines to **dots** at the same 26px spacing.
- **Cursor** made subtle and **grayscale**: dots brighten gently near the pointer, and a low-contrast crosshair **fades from the cursor outward**. No red, no HUD, no snap-node.
- **Placeholder images** everywhere (project cards + hero portrait), ready to swap for real media.

## Borrowed interactions
- **chaingpt.org labs** → nav links with a sliding bottom-up fill and a centre-growing active underline; primary button with a fill-sweep; page-transition feel via a load fade plus `IntersectionObserver` scroll reveals; modal open/close transition.
- **chriskalafatis.com/about** → the hero portrait carries a **WebGL liquid-distortion hover** (Three.js). Cursor position and *velocity* (lerp-eased so it decelerates naturally) drive a noise-based UV warp that "exposes" a schematic underlayer beneath the portrait. Drop a real `face.jpg` in and it works unchanged. Falls back to a static image if WebGL is unavailable or `prefers-reduced-motion` is set.

## Progressive disclosure
Homepage shows only excerpts and one image per project; the full story lives one click away in the modal. Experience is collapsed into dropdown cards. Nothing dumps its full weight on first paint.

## Nielsen–Norman heuristics (kept from v1)
Status (scroll bar, active nav, hover feedback) · real-world match (plain, personal language) · user control (theme toggle + `T` shortcut, ESC-close modal, closable menu) · consistency (one token system) · error prevention (no fragile forms; external links flagged, `rel=noopener`) · recognition over recall (sticky nav, section numbers, tags) · flexibility (anchor nav, keyboard shortcut) · minimalism (quiet, grayscale cursor) · graceful degradation (font/WebGL/JS fallbacks) · documentation (project modals, résumé).

## WCAG 2.2
AA contrast verified on the token palette · visible focus (2.4.7) · focus-not-obscured via `scroll-margin` (2.4.11) · target size ≥24px, CTAs 44px (2.5.8) · no drag-dependent interaction (2.5.7) · `prefers-reduced-motion` disables the portrait shader, dot-grid animation, reveals, and transitions · semantic landmarks + `aria-modal` dialog with focus trap and restore (4.1.2) · decorative canvas/WebGL marked `aria-hidden`.

## Files
- `index.html` — the site (self-contained; portrait textures inlined as base64 so WebGL works locally too).
- `images/` — placeholder project images + portrait layers (`portrait-front.png` shown as fallback; `portrait-under.png` is the exposed schematic layer).
- `Vaibhav Parekh_Resume.pdf` — linked résumé.

**Deploy:** drop `index.html`, `images/`, and the résumé at the repo root. **Swap in real media:** replace the `images/proj-*.png` files and, for the hero, re-encode a real portrait + underlayer into the two base64 strings (or point the `TextureLoader` at same-origin files).
