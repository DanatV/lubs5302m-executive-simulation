# Computer lab 1: Executive Business Simulation

A complete browser-local teaching exercise for **LUBS5302M Foundations of Machine Learning in Business**. Teams act as executives of fictional Northbridge University, examine random forest evidence, select one of four £5 million portfolios, and make a £500,000 follow-up decision.

## Running locally

Download and unzip the project folder. Open **index.html** in a modern browser. No installation, server, internet connection or account is required. Keep the `assets`, `css` and `js` folders beside index.html. Enable JavaScript. Use one shared device per team.

## Student workflow

1. Read the case and enter a team number from 1–999.
2. Explore 64 regional model configurations, compare up to three, and select a permitted investment package. Notes are optional.
3. Confirm the allocation, read interim consequences and the common external development, then select one permitted £500,000 adjustment.
4. Confirm the adjustment, review the board report, optionally reflect, and export a submission.

Submitted decisions and their evidence snapshots are locked. Earlier stages remain available for inspection. A separate replay requires confirmation and offers a session download first. There is no winning score.

## What the dashboard means

Model outputs are genuine precomputed random forests fitted to reproducible **synthetic** data. They are not trained in the browser. Business outcomes are separately authored scenario tables and must not be interpreted as causal estimates from the model. The top-100 root belongs to an explicitly constrained explanatory surrogate, not every tree in the ensemble. See MODEL_CARD.md.

## Data and privacy

No data is uploaded. Team number, decisions and optional text are stored under `lubs5302m-executive-v2` in this browser's localStorage. No identifiers beyond the team number are requested. Team numbers are labels, not accounts or passwords; teams do not synchronise. GitHub Pages does not collect submissions. Teams submit downloaded reports through Minerva or by email to d.valizade@leeds.ac.uk.

Browser storage can be cleared or unavailable, particularly in private/restricted modes. The app remains usable and displays a warning. Browser storage for local files may differ between browsers and file locations. Export session JSON to preserve work reliably. Moving from file:// to the hosted site does not automatically carry saved work across; export then import.

## Export and import

- **Save session JSON** is available throughout the activity.
- **Import session** validates versions, fields, allowed choices and stage consistency, then asks before replacing current work.
- After both decisions, **Download report HTML** produces a self-contained offline report with model charts, tables, the complete summary tree and any responses.
- **Print / Save as PDF** uses the browser print dialogue and a dedicated full report layout.

Imported outcomes and model snapshots are reconciled with this version's canonical configuration. The application is not an authenticated assessment system, so an imported file is not proof of the original decision history.

## Customisation

- Case, disclosure, reflection questions, investment names/amounts and outcomes: `js/scenarios.js`.
- Workflow/validation: `js/core.js` and `js/app.js`.
- Interface copy and report content: `js/views.js`.
- Colours, spacing, responsive and print styles: `css/styles.css`.
- Branding image: `assets/banner.png` (replace with a correctly licensed local image).
- Statistical assumptions and parameters: `dev/generate.py`. Regenerate `js/results.js`; do not hand-edit measured metrics.

One reflection slot and the initial four-package budget are validated explicitly. Changing their number or budget structure requires updating core validation, tests and related copy as well as configuration. When changing model or scenario meaning, increment the version in scenarios.js and the generator; old sessions will be rejected with a clear message rather than silently reinterpreted. Rebuild model assets and the distribution ZIP after changes.

## Regenerating model assets — developer only

Python 3.12 was used for the delivered assets. From this folder:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r dev/requirements.txt
.venv/bin/python dev/generate.py
```

On Windows, use `.venv\Scripts\python.exe`. Generation produces results.js, the synthetic CSV and provenance hashes. Students need none of these development tools. Generation can take several minutes. This is a seeded pipeline, not a promise of bitwise identity across arbitrary library/platform versions.

## Tests — developer only

```sh
node tests/core.cjs
```

For full browser tests, install Playwright in a separate development environment. Set `PLAYWRIGHT_MODULE` to its module path if it is not resolvable normally, and `CHROME_BIN` to a local Chrome executable. Run `node tests/browser.cjs`; `node tests/accessibility.cjs` adds keyboard, contrast and narrow-layout checks. This creates a fresh temporary profile, not your ordinary browser profile. Default target is local index.html; set `TEST_URL` to test subdirectory hosting and `TEST_ARTIFACTS` to choose the output directory. The delivered tests use no runtime dependencies for the application.

See TESTING.md for actual checks and remaining limitations.

## GitHub Pages deployment

Public repository: [DanatV/lubs5302m-executive-simulation](https://github.com/DanatV/lubs5302m-executive-simulation).

Student site: [Open the executive simulation](https://danatv.github.io/lubs5302m-executive-simulation/). GitHub Pages serves the `main` branch at the repository root. This is separate from the Decision Tree Builder.

1. Create or select a GitHub repository for this simulation, separate from the Decision Tree Builder.
2. Add the application files with index.html at the repository root. Do not upload `.venv`, temporary test files or credentials.
3. Commit and push to `main`.
4. Open repository **Settings**.
5. Open **Pages**.
6. Select **Deploy from a branch**.
7. Select `main` and `/ (root)`.
8. Save.
9. Open the generated GitHub Pages URL after deployment completes.
10. Test both decision rounds, storage restoration and report exports at that URL.

No GitHub Actions configuration, environment variables or backend are needed. The `.nojekyll` file supports ordinary static file serving. All runtime paths are relative, including repository-subdirectory URLs.

## Dependencies and licences

**Runtime:** none; HTML, CSS, JavaScript, SVG and browser storage/download/print APIs only.

**Model development:** Python; NumPy 2.3.3, SciPy 1.16.2, scikit-learn 1.7.2, joblib 1.5.3 and threadpoolctl 3.6.0. See dev/requirements.txt. **Browser QA:** Playwright and locally installed Chrome, development only. Third-party libraries are not bundled in the student runtime. See LICENSE and THIRD_PARTY_NOTICES.md.

## Known limitations

- All records and business consequences are fictional, not advice about real investment or real QS rankings.
- The model predicts conversion among offer holders, not applications or profit.
- Validation uses record-level splits among the same fictional university population; it does not establish performance on unseen institutions or future markets.
- Predicted probabilities have not been separately calibrated.
- A shallow constrained summary necessarily loses ensemble detail.
- Outcome data are inspectable in static source files. No password or security claim hides them.
- There is no central submission database, live leaderboard or cross-device sharing.
- Lecturer documents are not linked from student navigation but are public if uploaded.
- Safari/Firefox and manual screen-reader testing remain lecturer pre-class checks; see TESTING.md for browser coverage.

## October 2026 update (version 2.0.0)

The continent selector refers to offer-holder origin: East and South East Asia, Africa, Europe and North America, or Rest of the World. Each group has 16 independently fitted configurations. Regional patterns are explicitly authored synthetic assumptions, not evidence about real populations. Charts and tables sort computed importance descending. The summary follows imposed QS → tuition → interactive-learning split features; lower thresholds and probabilities are fitted.

One large optional reflection field replaces the seven earlier responses. Package D's interim intake is 2,800 / 8,000 = 35%, as confirmed by the lecturer. Interim ranks are A 99, B 110, C 110, D 105; final outcomes are unchanged. Old version-1 browser sessions remain under their original storage key and are not overwritten, but cannot be imported into version 2 because the evidence and scenario meanings changed. Keep old exported reports for earlier runs.
