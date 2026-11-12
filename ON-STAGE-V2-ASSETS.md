# ON STAGE V2 — responsive photographic assets

This branch contains the HTML, CSS and GSAP updates for the red editorial section.
The following binary images **must be uploaded to this branch before merging**:

- `public/assets/yunk-live-v2-desktop.webp`
- `public/assets/yunk-live-v2-mobile.webp`

Use the exact filenames from the supplied ON STAGE V2 ZIP, without renaming.
Until both images are present, the new backgrounds will not load.

GitHub UI: switch to this branch → **Add file** → **Upload files** → upload the two WebP files inside `public/assets/`.

Do not replace `index.html` with an older local copy, as this branch applies only the live section to the existing main branch content.

Once the images are on the branch, run `npm install && npm run dev` or `npm run build` and inspect desktop/mobile cropping.

The content under other sections was intentionally left unchanged.
