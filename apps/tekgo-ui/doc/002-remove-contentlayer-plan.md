# Remove Contentlayer Completely

Contentlayer is officially unmaintained and acts as an unnecessary middleman now that all markdown files have been migrated to raw Portable Text JSON. Removing it will significantly reduce the project's dependency footprint, fix Next.js 15+ build warnings, and speed up build times.

## User Review Required
> [!IMPORTANT]
> This is a structural refactoring that removes `contentlayer2` and `pliny`'s internal contentlayer utilities. Please review the proposed architecture to ensure it aligns with your expectations.

## Proposed Changes

### `package.json` & Config
- **[MODIFY]** `package.json`: Uninstall `contentlayer2` and `next-contentlayer2`.
- **[MODIFY]** `next.config.js`: Remove the `withContentlayer` plugin wrapper.
- **[DELETE]** `contentlayer.config.ts`: Delete the abandoned configuration file.

---
### `lib/content.ts` (Core Content SDK)
- **[NEW]** `lib/content.ts`: A lightweight native file-system utility that replaces Contentlayer entirely.
  - Dynamically reads all `.json` files from `data/blog/` and `data/authors/`.
  - Automatically computes fields natively (e.g. `readingTime`, `slug`, `path`, `toc`, `structuredData`).
  - Exports `allBlogs`, `allAuthors`, `sortPosts`, and type definitions (`Blog`, `Authors`, `CoreContent`).

---
### App & Layouts (Import Updates)
- **[MODIFY]** Update import statements across `app/` and `layouts/` to point to `@/lib/content` instead of `contentlayer/generated` and `pliny/utils/contentlayer`.
  - `app/page.tsx`
  - `app/sitemap.ts`
  - `app/about/page.tsx`
  - `app/blog/page.tsx`
  - `app/blog/[...slug]/page.tsx`
  - `app/tags/...`
  - `layouts/...`

---
### Build Scripts
- **[MODIFY]** `scripts/postbuild.mjs`: Update the RSS generator and Search Index generator to natively read `data/blog/*.json` instead of relying on `.contentlayer/generated`.
- **[MODIFY]** `app/tag-data.json`: Dynamically generate tag counts during build/request instead of forcing Contentlayer to cache it.

## Verification Plan

### Automated Tests
- Run `pnpm install` after modifying `package.json`.
- Run `pnpm build` to verify the Next.js compiler successfully builds all static pages without any Contentlayer dependencies.

### Manual Verification
- Check the local dev server (`pnpm dev`).
- Verify that the home page, blog index, individual blog posts, tags pages, and author pages render correctly.
- Verify that RSS feeds and search indexes still generate correctly.
