# ZCO Prep Studio

An offline-first personal ZCO preparation website. No server, account, database, API key or build step is required.

## Run
1. Extract this folder.
2. Open `index.html` in a modern browser.
3. Your progress is saved in that browser's localStorage. Use Settings → Export/Import to back it up or move it.

## What's included
- 13 learning chapters aligned to the IARCS Basic Topics syllabus. Each chapter currently has a shared checkpoint question; the six displayed level labels are progression milestones, not six separate graded exams.
- Original explanations, C++ patterns, worked examples and original practice prompts for all 13 chapters.
- PYQ index entries for verified named problems from ZCO-2014, 2015, 2022, 2023, 2024 and 2025.
- Original concise problem summaries and study notes where the official problem can be identified.
- Links to official IARCS archives, official editorials and the relevant contest/practice pages.
- Search/filter, solved/revise tracking, notes, revision list, mock timer, binary-search visualizer, progress export/import.

## Important PYQ accuracy note
The PYQ page is a curated index, not a complete locally reproduced archive of every ZCO paper. Some older IARCS archive pages list titles without a stable public statement/editorial URL; those entries link to the official year archive and explicitly say to open the paper. The 2025 and 2024 contest pages are linked to Codeforces; the 2024 editorial is linked to the IARCS PDF. Full paper statements are not copied into this project; the app uses concise original summaries and directs you to the official source for exact wording, constraints and subtasks. Do not treat an entry as fully explained when its note explicitly directs you to the official editorial.

## Content files
- `content/chapters.js`: syllabus and chapter checkpoints
- `content/lessons.js`: original lessons and practice
- `content/pyq.js`: curated PYQ index and original study notes
- `js/app.js`: application logic
- `css/style.css`: styling

## Validation
JavaScript syntax and core render paths were checked locally (dashboard, PYQ list, and representative lesson pages). The hosted GitHub Pages URL was not supplied, so live deployment, mobile rendering on the actual hosted site, and external link behaviour have not been independently verified.
