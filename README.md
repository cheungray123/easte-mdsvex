# MDSveX Svelte 5 Compatible Fork

A Svelte 5 compatible fork of [mdsvex@0.12.7](https://www.npmjs.com/package/mdsvex).

## What's Fixed

### 1. `context="module"` → `module`

**File**: `dist/main-DLA3kuAq.js` line 23994

Svelte 5 deprecates `context="module"`, replaced with `<script module>`.

### 2. `$$props` Removed

**File**: `dist/main-DLA3kuAq.js` line 24029-24032

`$$props` is not allowed in Svelte 5 runes mode. Layout props are now passed via metadata directly.

### 3. Accessibility Improvements

**File**: `dist/main-DLA3kuAq.js` line 23923-23953

- **Auto alt for images**: Images without an `alt` attribute get one generated from the filename.
- **aria-label for external links**: Empty external links get an `aria-label="外部链接"`.

---

# MDSveX Svelte 5 兼容修复版

基于 [mdsvex@0.12.7](https://www.npmjs.com/package/mdsvex) 的 Svelte 5 兼容修复。

## 修复内容

### 1. `context="module"` → `module`

**文件**: `dist/main-DLA3kuAq.js` 第 23994 行

Svelte 5 已废弃 `context="module"`，改为 `<script module>`。

### 2. `$$props` 移除

**文件**: `dist/main-DLA3kuAq.js` 第 24029-24032 行

Svelte 5 runes 模式下不允许使用 `$$props`，改为直接传递 metadata。

### 3. 无障碍优化

**文件**: `dist/main-DLA3kuAq.js` 第 23923-23953 行

- **图片自动 alt**：缺少 alt 属性的图片自动从文件名生成。
- **外部链接 aria-label**：无文字的外部链接自动添加 `aria-label`。

## Usage / 使用方式

### Install / 安装

```bash
pnpm add github:cheungray123/easte-mdsvex
```

### Layout Config / 配置 Layout

```svelte
<script module>
  export { default as Music } from '$lib/components/features/MusicPlayer.svelte';
</script>

<script>
  import ReadingProgress from '$lib/components/features/ReadingProgress.svelte';
  let { children } = $props();
</script>

<ReadingProgress />
{@render children?.()}
```

### svelte.config.js

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  preprocess: [
    mdsvex({
      layout: {
        _: path.resolve(__dirname, 'src/lib/components/mdsvex/MDSVEXLayout.svelte')
      }
    })
  ]
};
```

### Use Global Components / 使用全局组件

```markdown
<Music playlistId="PL4xxxxx" />
```
