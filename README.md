# @cheungray/mdsvex

Fork of [pngwn/mdsvex](https://github.com/pngwn/MDsveX) v0.12.7, adapted for **Svelte 5** production use.

## What's fixed

### Svelte 5 `parse()` Compatibility

Svelte 5.53+ changed `parse()` return — `html.children` became an array with `start`/`end` offsets instead of the old string-based API, and new keys like `_comments` were introduced. The `extract_parts` function now:

- Filters parser result keys to only iterate `['instance', 'module', 'css']`, avoiding breakage from `_comments` and future additions.
- Correctly maps `html.children` entries to `[type, start, end]` tuples for substring extraction.

### `raw` Node Component Replacement

The original `transform_hast` only visited `element` nodes when rewriting `<Component />` → `<Components.Component />`. This fork also visits `raw` nodes, which is required for rehype shortcode plugins that inject components via raw HTML (e.g., `::music <id>`, `::post <slug>`).

### Accessibility Auto-fixes

- **Empty external links**: automatically adds `aria-label="外部链接"` to `<a>` tags with no text content.
- **Missing image alt text**: derives `alt` from filename when no alt is provided.

### Exported `defineConfig`

Exports `defineMDSveXConfig` (aliased from `defineConfig`) for type-safe config in `mdsvex.config.js`.

## Install

```bash
pnpm add @cheungray/mdsvex
```

## Usage

```js
// mdsvex.config.js
import { defineMDSveXConfig } from '@cheungray/mdsvex';

export default defineMDSveXConfig({
  extensions: ['.svx', '.md'],
  // ...
});
```

## Build

```bash
pnpm build   # rollup -c
```

## License

MIT — same as upstream.
