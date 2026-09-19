---
name: Liquid Glass UI Design Standards
description: Enforces Liquid Glass aesthetic, glassmorphic translucency, fluid gradients, and sensory depth across all monorepo applications with user interfaces.
trigger: always_on
---

# Liquid Glass UI Design Standards

For any application in this monorepo that contains a User Interface (`apps/project0-console`, `apps/tekgo-ui`, `apps/mobile-ui`, `apps/desktop-console`, and any future UI clients), **Liquid Glass** must be prioritized as the primary design language.

---

## 1. Core Visual Principles of Liquid Glass

1. **Optical Translucency & Frosted Glass**:
   - Surfaces must look like physical, frosted or curved liquid glass rather than flat, opaque panels.
   - Employ multi-layered backdrop blurs (`backdrop-blur-md`, `backdrop-blur-xl`, `backdrop-blur-2xl`) over semi-translucent tinted backgrounds.
   - Avoid flat, opaque background fills (`#ffffff`, `#000000`, `bg-white`, `bg-black`) on cards, sidebars, modals, headers, and popovers.

2. **Specular Highlights & Glass Borders**:
   - Glass surfaces feature crisp, subtle translucent borders:
     - Light mode: `border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]`
     - Dark mode: `border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`
   - Use top-lit or edge-lit specular borders (subtly brighter top border edge) simulating refraction of ambient light.

3. **Fluid Gradients & Ambient Glow**:
   - Liquid Glass lives on rich, subtle ambient backgrounds: use multi-stop mesh gradients, soft radial blurs, and chromatic caustic glows underneath the glass layer.
   - Accentuate active states, buttons, and badges with glossy liquid gradients (e.g., linear gradient overlays with 10-25% opacity highlight).

4. **Depth & Floating Elevation**:
   - Use soft, multi-layered diffuse shadows to elevate glass planes:
     - `shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]` (light mode)
     - `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]` (dark mode)
   - Maintain clear visual hierarchy through z-layering (background mesh $\rightarrow$ floating base glass canvas $\rightarrow$ elevated interactive glass cards $\rightarrow$ popovers / modals).

5. **Legibility & Accessibility**:
   - Contrast is non-negotiable: ensure text remains WCAG AA compliant.
   - When text sits atop translucent glass, provide adequate background tinting/scrim (`bg-white/70 dark:bg-slate-900/75`) so underlying graphics or content do not compromise text legibility.

6. **Fluid Dynamics & Micro-Interactions**:
   - Smooth, organic transitions (`cubic-bezier(0.16, 1, 0.3, 1)` or spring physics).
   - Interactive elements (cards, buttons) should respond to hover/press with subtle sheen changes, slight specular border brightening, or gentle elevation scaling (`scale-[1.01]`).

---

## 2. Platform-Specific Implementation Rules

### Web Apps (`apps/project0-console` & `apps/tekgo-ui` - Tailwind CSS v4)
* **Glass Card Standard**:
  ```html
  <div class="bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 rounded-2xl">
    <!-- content -->
  </div>
  ```
* **Floating Header / Navbar**:
  ```html
  <header class="sticky top-0 z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl border-b border-white/20 dark:border-white/10">
  ```
* **Liquid Glass Buttons**:
  ```html
  <button class="relative overflow-hidden bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 border border-white/30 dark:border-white/15 backdrop-blur-md text-foreground shadow-sm transition-all duration-200 active:scale-95">
  ```

### Mobile App (`apps/mobile-ui` - Expo & React Native)
* **Blur Views**:
  - Prioritize `BlurView` from `expo-blur` (`tint="systemMaterial"`, `"light"`, or `"dark"`, with `intensity={50-85}`) for floating tab bars, headers, cards, and modal bottom sheets.
* **Gradients & Specular Highlights**:
  - Use `LinearGradient` from `expo-linear-gradient` for subtle specular sheen lines (`colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.02)']}`) at the top edge of cards or modals.
* **Borders & Shadows**:
  - `borderWidth: 1`, `borderColor: 'rgba(255,255,255,0.15)'`, with soft `shadowOffset: { width: 0, height: 8 }`, `shadowOpacity: 0.2`, `shadowRadius: 16`.

### Desktop Client (`apps/desktop-console` - Electrobun)
* Use window transparency / vibrancy effects where supported by Electrobun/Cottontail.
* In webview panels, utilize CSS `backdrop-filter: blur(...)` combined with translucent UI shells, glossy titlebars, and frosted floating toolbars.
