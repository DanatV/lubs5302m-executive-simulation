# Testing and review

## Version 2 update — 19 October 2026

Rebuilt 64 real forest configurations from 48,000 reproducible synthetic records, with 16 settings per origin region. Seven logic/statistical test groups pass, including all twelve paths, revised interim figures (A rank 99; B/C rank 110; D rank 105 and 2,800/8,000=35%), region-aware committed snapshots, and one optional reflection field.

For every Asia configuration, computed permutation importance puts QS first and social media third; tuition ranks first for every configuration in the other regions. No metric is edited after computation. Both chart and table sort by the actual score. Every explanatory tree has QS → tuition → interactive-learning split features and reconciled fit counts.

The version-2 browser suite checks all 64 regional selectors and visible chart labels, removed page copy, title, mail link, all twelve outcome routes, one optional reflection, restoration, imports, and HTML/JSON/PDF export. Passed in isolated Chrome with file:// and networking disabled: all 64 visible configurations, all twelve decision routes, JSON import/export, self-contained HTML and PDF reports, refresh/restore, snapshot immutability, storage failure, and responsive reflow. No page or console errors. The dedicated keyboard/contrast suite also passed. Rendered briefing, dashboard, tree and report were inspected.

Version-1 sessions remain under their original browser storage key, while version 2 has its own key. Cross-version imports are deliberately rejected rather than silently reinterpreting older evidence.

## Historical version-1 audit


Executed 14 October 2026, on macOS with locally installed Chrome 155 through Playwright. Python 3.12 and scikit-learn 1.7.2 generated the model assets. No remote publication was performed.

## Automated logic and statistical checks
`node tests/core.cjs`: six test groups passed, enumerating all 12 decision paths and all 16 forest configurations.

- Every portfolio is £5m; limited awards £1m; every follow-up £500k; total £5.5m.
- Invalid teams, packages, incompatible follow-ups, repeated submissions and changes to a committed team are rejected.
- Canonical outcomes and annual conversion arithmetic reconcile.
- Submitted evidence remains unchanged after changing the dashboard model.
- All matrices total 2,000, CV means/SDs and importance means reconcile with their underlying measurements.
- Root boundary is QS≤100, including exactly 100 and 101; surrogate fit counts total 8,000.
- Imports reject wrong versions, invalid types, unlocked stages, incompatible choices and overlength text. Tampered derived evidence/outcomes are replaced by canonical values.
- HTML/script-like text is escaped; future consequences are absent from early-stage rendered views.
- Runtime references are local; there is no fetch/API dependency.

## Browser workflows
`tests/browser.cjs` passed with direct file:// navigation and browser networking disabled. It also passed over loopback HTTP from `/simulation/index.html`, representing repository-subdirectory hosting.

- All 12 endings completed using visible controls in fresh isolated sessions.
- All 16 settings selected, dashboard updated, three saved comparisons enforced.
- First/second confirmation, locked prior decisions and later evidence inspection worked.
- Optional notes/reflections did not block progress; no reflection textarea is required.
- JSON downloaded, parsed and restored; invalid version rejected; replacement cancellation preserved work.
- HTML report downloaded and opened offline, containing charts, tables, complete tree and safely escaped optional responses.
- Refresh prompted restoration; completed outcomes and evidence persisted.
- Replay cancellation preserved the completed run.
- Storage intentionally blocked: warning remained visible and both decisions still completed.
- Screenshots captured at 1440px laptop and 768px tablet widths. 640px viewport reflow had no document-level horizontal overflow; wide charts/tables use their own scroll regions or text alternatives.
- Print report was rendered by Chrome to an A4 PDF. The native OS print dialogue itself was suppressed during automation. Table pagination was refined after visual review.
- No page JavaScript errors were found during the full suites. The final subdirectory-hosted suite also captured browser console errors and found none.

The browser suite's asynchronous invalid-import assertion was corrected to wait for the error message. This was a test timing issue, not an import-validation failure.

## Keyboard, contrast and accessibility audit
`tests/accessibility.cjs` passed. Major decision actions were activated using keyboard focus/Enter, and selectors using arrows. Confirmation dialogs trap Tab/Shift-Tab; Escape returns focus to the initiating control. Stage changes focus main. Form fields have labels, and native disclosure sections are keyboard-operable.

A native-dialog tab-cycle issue was discovered in the initial audit and fixed with explicit focus containment. Text/background contrast pairs (main, muted, button, brand and active navigation) exceed 4.5:1. Charts have meaningful accessible names and accompanying values/tables; the tree has a full text outline. No outcome depends solely on colour. Styles honour reduced-motion preferences.

The 640px layout checks approximate the reflow of a 1280px window at 200% zoom. They are not a claim that the actual browser zoom command or every assistive technology was manually tested.

## Pedagogical audit
Reviewed case, controls, defaults, disclosures, charts, constraints, outcomes and optional questions:

- Default 100 trees/depth 4 is a starting view, not labelled optimal.
- No package is preselected or recommended; no quality score or winner is produced.
- All displayed RF metrics come from the generator. Non-monotonic validation results are retained.
- Cohort estimates are descriptive; scripted business consequences are separately labelled.
- Importance is in accuracy percentage points, not causal return or budget weights.
- Summary root is explicitly imposed for teaching. Forest roots can differ.
- Historical test performance is not promised after the common market change.
- Experience is a fictional separate indicator. No unsupported profit or demographic access calculation is introduced.
- Notes and reflections are ungraded and optional.
- Static outcomes are not presented as securely hidden assessment answers.

The synthetic target intercept was revised before delivery to align the illustrative cohort more closely with the case baseline. All models were regenerated; no individual metric was edited. The delivered default cohort estimate is approximately 30.5%, while the authored historical baseline remains 25%.

## Final maintainability/reliability review
State transitions, allowlist validation, scenario outcomes, statistical assets and rendering are separated. Runtime has no external dependencies. The 100-student use case requires only static downloads; sessions are per browser/device and do not communicate. Team numbers are not shared storage keys on a server. No existing Decision Tree Builder files were changed.

## Limitations and recommended pre-class checks
- Chrome was tested; Safari and Firefox were not separately executed.
- No manual VoiceOver/NVDA session was performed. Automated labels, keyboard tests and contrast are not a full assistive-technology certification.
- Test the actual lab's browser zoom and PDF dialogue before class.
- Browser-local file storage behaviour may vary; JSON is the portable backup.
- No GitHub Pages deployment or load test was performed. Subdirectory static serving was tested locally; the architecture makes no concurrent server-state assumptions.
- Full-page screenshot tiling artefacts appeared after a headless viewport resize; separate viewport captures and DOM overflow checks were used to verify narrow layouts.

## 20 October 2026 — balanced non-Asia signals (2.1.0)

- Rebuilt all 64 configurations from synthetic data with the pinned model environment. All 48 non-Asia configurations have fees first, interactive learning/tutorials second and third, QS fourth, and positive social-media importance last. No measured values were manually rescaled.
- At 100 trees / depth 4, importance relative to fees (tutorials, interactive learning, QS, social media): Africa (0.810, 0.820, 0.541, 0.100); Europe/North America (0.861, 0.844, 0.484, 0.150); Rest of World (0.820, 0.774, 0.522, 0.107). Ratios vary with hyperparameters; shallow forests suppress weaker signals.
- Compared all 16 Asia model records with version 2.0: unchanged within numerical tolerance 1e-12. Business outcomes are unchanged.
- Eight core test groups passed: all paths, metric reconciliation, ordering, default-ratio tolerances, imports and version consistency.
- Offline Chrome browser suite passed: all 64 selections, all 12 endings, JSON/HTML/PDF exports, restored work, immutable evidence, storage failure, tablet/narrow reflow, and no page JavaScript errors.
- Updated model version/storage key keeps previous browser sessions separate instead of reinterpreting their evidence.
