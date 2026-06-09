# Design

## Design Direction

Apple-like portfolio polish, without copying Apple pages directly. The site should borrow Apple's discipline: precise layout, generous whitespace, high-quality product-style image presentation, calm motion, strong typography, and small-to-medium radius surfaces.

The current identity is a restrained black, soft off-white, warm gray, and orange accent system. Preserve that identity, but make it cleaner, softer, and more premium.

## Audience Mood

Recruiters should feel they are viewing a mature commercial visual designer's curated body of work. The site should feel quiet, confident, image-led, and easy to evaluate.

## Color System

Keep the current palette family:

- Ink: near black for core text and dark sections.
- Soft: off-white page background.
- Panel: subtle warm gray for secondary surfaces.
- Line: quiet separators.
- Accent: restrained orange, used sparingly for focus, hover, and small emphasis.

Avoid a one-note orange theme. Orange should be a signal, not decoration. Use black, white, gray, and imagery as the primary visual language.

## Typography

Use the existing system sans stack:

```css
"Helvetica Neue", "Arial", "PingFang SC", "Microsoft YaHei", sans-serif
```

Type should feel precise and editorially clean:

- Display titles are large but not cramped.
- Letter spacing stays at `0`.
- Body copy uses generous line-height and readable contrast.
- Long prose should stay within comfortable line lengths.
- Avoid making every section depend on small uppercase labels.
- Use Chinese title line breaks intentionally through `titleLines`.

## Radius System

Use small and medium radii. The goal is Apple-like refinement, not bubbly UI.

- Buttons and nav items: `8px` to `12px`.
- Image/media frames: `12px` to `18px`.
- Project cards and info modules: `14px` to `20px`.
- Pills only when a control truly behaves like a segmented or capsule element.
- Avoid card or section radii above `24px`.

## Layout

The layout should feel composed rather than boxed:

- Use large but measured section spacing.
- Keep page margins generous on desktop and practical on mobile.
- Prefer image-led compositions over repeated decorative cards.
- Replace hard `gap-px` grid seams with breathing room where possible.
- Align metadata, titles, descriptions, and year markers cleanly.
- Detail pages should read like a case-study spread, not a database record.

## Components

### Project Cards

Project cards should make the image the hero. Media should have refined radius, intentional crop ratios, and subtle hover scale. Metadata should be quieter than the project title. Avoid heavy borders plus heavy shadows.

### Category Cards

Category entry points should not look like hard-edged tiles. Use spacing, subtle panel color, refined hover states, and small radii. They should feel like curated portfolio pathways.

### Buttons

Buttons should be understated, tactile, and easy to scan. Use small radius, clear focus states, and concise labels. Avoid giant pills unless the interaction needs that shape.

### Navigation

Navigation should remain compact and calm. Rounded active states are appropriate, but should feel precise rather than playful.

### Project Detail

Project detail pages should present work like premium campaign material:

- Strong hero image treatment.
- Quiet metadata modules.
- Better spacing between background, responsibilities, and next project navigation.
- Avoid hard spreadsheet-like grids.

## Motion

Motion should be calm and premium:

- Slow, subtle reveal or hover transitions.
- No bounce, elastic, or flashy entrance effects.
- Do not hide content until animation completes.
- Preserve `prefers-reduced-motion` support.

## Things To Avoid

- Flashy tech gradients.
- Excessive glow, glass, or neon.
- Overly round cards.
- Resume-like dense sections.
- Social-media template aesthetics.
- Decorative UI that competes with project images.
- Repeated uppercase eyebrow labels as the main page rhythm.
- Copy that sounds like generic marketing filler.

## Preferred Codex Instruction

When asking Codex to improve the site, use this:

```text
Please refine this portfolio using the existing PRODUCT.md and DESIGN.md. Preserve the current React/Vite/Tailwind structure and content model. Improve the site toward an Apple-like portfolio feel: precise spacing, small-to-medium radii, refined media frames, cleaner typography, quieter metadata, and premium image-led project presentation. Do not copy Apple directly. Avoid flashy tech styling, resume-like layouts, over-rounding, and generic template card grids. After editing, run npm run build and verify desktop and mobile layouts.
```
