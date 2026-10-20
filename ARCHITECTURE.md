# Architecture

This is a buildless, browser-local HTML/CSS/JavaScript application. Nothing is uploaded. It works with classic script tags under file:// and repository-subdirectory hosting.

## Files
- index.html: semantic shell, navigation, dialogs, file input and print region.
- css/styles.css: responsive course branding and print layout.
- js/scenarios.js: versioned case text, package allowlist, authored outcomes and reflection prompts.
- js/results.js: generated, genuine random forest evaluation assets (64 configurations (16 per origin region)).
- js/core.js: pure state validation, committed decision transitions and outcome reconciliation.
- js/views.js: escaped HTML rendering, SVG charts, accessible tables, surrogate tree and report.
- js/app.js: DOM events, storage, dialogs, downloads and imports.
- dev/generate.py: reproducible synthetic-data/model pipeline; never required at runtime.
- tests/: model/data invariants and browser workflow tests.

## State and navigation
Versioned session: team, stage, model key, comparison keys, draft package/follow-up, explanations, reflections, first and second committed records, timestamps. Stages 1–4 unlock through validated transitions. Navigating backward never unlocks a committed decision. First commitment includes a deep evidence snapshot; inspection of other configurations cannot change it. Authoritative outcomes are reconciled from scenario IDs on import. Session validators return a clean allowlisted object, never merged arbitrary input.

## Model and scenario separation
Synthetic records are generated with a fixed seed. Five-fold CV uses only the 10,000-record development set. Permutation importance uses repeated shuffles on each validation fold. Final forests fit development data; the 2,000-record test set is only scored. An explanatory surrogate has imposed QS → tuition → interactive-learning feature order, with lower thresholds and leaf probabilities fitted to final forest probabilities on a development subset; separate development records measure surrogate fidelity. Surrogate fidelity does not measure generalisation to observed outcomes. Business consequences are separately authored deterministic tables, never RF causal estimates.

## Rendering and exports
SVG importance/CV charts have accompanying data tables. Summary tree uses measured, fixed node boxes in a zoomable/scrollable SVG and a text outline. All user text is escaped. Self-contained report HTML embeds generated visuals and inline print-friendly styles; JSON contains the versioned session; browser printing uses a dedicated complete report region.

## Persistence
Separate localStorage key lubs5302m-executive-v2.1. Meaningful edits save automatically; unavailable storage leaves an in-memory app with a persistent warning. Startup asks before restoring. Reset/replay explicitly confirms replacement; completed runs are offered an export first. Teams share one device; no cross-device sync.

## Validation and tests
Pure tests enumerate 12 paths, lock invariants, imports, metric arithmetic, CV summaries and tree thresholds. Browser tests cover file:// offline use, subdirectory hosting, workflow, storage failure, refresh, exports, focus, layouts and injection. Tests and limitations are reported honestly in TESTING.md. No remote deployment is part of this task.

Version 2 uses region-prefixed model keys, including comparison and committed evidence records, and one optional reflection field. Version-1 storage remains untouched under its own key; imports reject mismatched versions.
