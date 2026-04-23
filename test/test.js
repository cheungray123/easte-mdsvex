/**
 * @cheungray/mdsvex basic test
 * Tests Svelte 5 compatibility
 */

import { compile } from '../dist/main.js';

async function runTests() {
  console.log('Running mdsvex tests...\n');
  let passed = 0;
  let failed = 0;

  // Test 1: Module script syntax (context="module" → module)
  try {
    const result1 = await compile(
      `---\ntitle: Test\n---\n# Test`,
      { filename: 'test.svx' }
    );
    const hasModuleScript = result1.code.includes('<script module>');
    const hasDeprecated = result1.code.includes('context="module"');
    if (hasModuleScript && !hasDeprecated) {
      console.log('✓ Test 1: Module script uses <script module> (Svelte 5 compatible)');
      passed++;
    } else {
      console.log('✗ Test 1: Module script issue - hasModuleScript:', hasModuleScript, 'hasDeprecated:', hasDeprecated);
      console.log('Output:', result1.code.substring(0, 200));
      failed++;
    }
  } catch (e) {
    console.log('✗ Test 1 error:', e.message);
    failed++;
  }

  // Test 2: No $$props usage
  try {
    const result2 = await compile(
      `# Test Post
content here`,
      { filename: 'test.svx' }
    );
    if (!result2.code.includes('$$props')) {
      console.log('✓ Test 2: No $$props usage (Svelte 5 compatible)');
      passed++;
    } else {
      console.log('✗ Test 2: Found $$props in output');
      failed++;
    }
  } catch (e) {
    console.log('✗ Test 2 error:', e.message);
    failed++;
  }

  // Test 3: A11y - auto alt for images without alt
  try {
    const result3 = await compile(
      `![](./image.png)`,
      { filename: 'test.svx' }
    );
    if (result3.code.includes('alt=') && !result3.code.includes('alt=""')) {
      console.log('✓ Test 3: Images get auto alt attribute');
      passed++;
    } else {
      console.log('✗ Test 3: Images missing auto alt');
      failed++;
    }
  } catch (e) {
    console.log('✗ Test 3 error:', e.message);
    failed++;
  }

  // Test 4: A11y - external links get aria-label
  try {
    const result4 = await compile(
      `[](https://example.com)`,
      { filename: 'test.svx' }
    );
    if (result4.code.includes('aria-label')) {
      console.log('✓ Test 4: Empty external links get aria-label');
      passed++;
    } else {
      console.log('✗ Test 4: Missing aria-label on external links');
      failed++;
    }
  } catch (e) {
    console.log('✗ Test 4 error:', e.message);
    failed++;
  }

  // Test 5: Layout option is accepted
  try {
    const result5 = await compile(
      `# Test Post
content`,
      {
        filename: 'test.svx',
        layout: true
      }
    );
    console.log('✓ Test 5: Layout option accepted (processed without error)');
    passed++;
  } catch (e) {
    console.log('✗ Test 5 error:', e.message);
    failed++;
  }

  // Test 6: Frontmatter parsing
  try {
    const result6 = await compile(
      `---
title: Test Post
date: 2024-01-01
---

# Hello`,
      { filename: 'test.svx' }
    );
    if (result6.code.includes('title') || result6.metadata?.title === 'Test Post') {
      console.log('✓ Test 6: Frontmatter is parsed correctly');
      passed++;
    } else {
      console.log('✗ Test 6: Frontmatter not parsed');
      failed++;
    }
  } catch (e) {
    console.log('✗ Test 6 error:', e.message);
    failed++;
  }

  console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error('Test runner error:', e);
  process.exit(1);
});