# MDSveX Svelte 5 兼容修复版

基于 [mdsvex@0.12.7](https://www.npmjs.com/package/mdsvex) 的 Svelte 5 兼容修复。

## 修复内容

### 1. `context="module"` → `module`

**文件**: `dist/main-DLA3kuAq.js` 第 23994 行

Svelte 5 已废弃 `context="module"`，改为 `<script module>`。

```javascript
// 修改前
value: `<script context="module">${newline}\t${fm}${newline}</script>`

// 修改后
value: `<script module>${newline}\t${fm}${newline}</script>`
```

### 2. `$$props` → 移除

**文件**: `dist/main-DLA3kuAq.js` 第 24029-24032 行

Svelte 5 runes 模式下不允许使用 `$$props`，改为直接传递 metadata。

```javascript
// 修改前
value: import_script
  ? `<Layout_MDSVEX_DEFAULT {...$$props}${fm ? ' {...metadata}' : ''}>`

// 修改后
value: import_script
  ? fm
    ? `<Layout_MDSVEX_DEFAULT {...metadata}>`
    : `<Layout_MDSVEX_DEFAULT>`
```

## 使用方式

### 安装

```bash
# 替换官方 mdsvex
pnpm remove mdsvex
pnpm add ./path/to/this/package
```

### 配置 Layout

创建 layout 文件（如 `src/lib/components/mdsvex/MDSVEXLayout.svelte`）：

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

### 配置 svelte.config.js

```javascript
import { mdsvex } from 'mdsvex';
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

### 在 Markdown 中使用全局组件

```markdown
# 我的文章

<Music playlistId="PL4xxxxx" />

一些内容...
```

## 注意事项

- 修复基于 mdsvex 0.12.7，其他版本可能不适用
- 升级 mdsvex 后需重新应用修复
- 建议使用 [patch-package](https://www.npmjs.com/package/patch-package) 持久化修复
