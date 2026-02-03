#!/usr/bin/env node
/**
 * Generate static OG image for LINE and other platforms that don't support dynamic images
 *
 * Usage: node scripts/generate-og-image.mjs
 *
 * This script fetches the dynamic OG image and saves it as a static PNG file.
 * Run this after `bun run build` or manually when you want to update the image.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to fetch from deployed URL or localhost
const URLS_TO_TRY = [
  'https://camperorcar.co.nz/opengraph-image',
  'http://localhost:3000/opengraph-image',
];

async function generateOgImage() {
  console.log('🖼️  Generating static OG image for LINE compatibility...\n');

  for (const url of URLS_TO_TRY) {
    try {
      console.log(`Trying: ${url}`);
      const response = await fetch(url, {
        signal: AbortSignal.timeout(10000)
      });

      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const outputPath = join(__dirname, '..', 'public', 'og-image.png');
        writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`\n✅ OG image saved to: public/og-image.png`);
        console.log(`   Size: ${(buffer.byteLength / 1024).toFixed(1)} KB`);
        return;
      }
    } catch (error) {
      console.log(`   Failed: ${error.message}`);
    }
  }

  console.log('\n❌ Could not generate OG image automatically.');
  console.log('\nManual steps:');
  console.log('1. Start dev server: bun run dev');
  console.log('2. Open: http://localhost:3000/opengraph-image');
  console.log('3. Right-click and save as: public/og-image.png');
}

generateOgImage();
