# Model card — version 2.1.0

## Purpose
Synthetic recruitment prediction for Computer lab 1: Executive Business Simulation. No real people, recruitment data or population estimates are used. Region names describe fictional offer-holder origins, not the location of Northbridge University. Regional patterns are authored teaching assumptions. Business outcomes remain separate deterministic fiction, not causal RF estimates.

## Data and regional filters
48,000 unique records: 12,000 each for East and South East Asia (asia), Africa (africa), Europe and North America (europe), and Rest of the World (rest). Each row is a distinct offer holder and one offer at one of 36 fictional institutions. Each regional model uses its own 10,000 development / 2,000 test split. Filtering selects a separately fitted regional forest and all its evaluation outputs; it is not a relabelling of one model's scores.

QS ranks range 42–390 and include 100 and 101. Net fees are normal £24,500 ± £4,500 minus sampled awards of £0/£2,000/£5,000/£8,000 (probabilities .55/.20/.20/.05), clipped £10,000–£38,000 and rounded to £100. Social media is uniform 0–100; interactive learning uniform 10–85% of scheduled teaching; tutorials uniform 0.5–6 hours per term. These latter features are record-level synthetic offer/programme attributes. Regional random seeds are 5302, 5402, 5502 and 5602 respectively.

## Target assumptions
Enrolled is Bernoulli sampled from a logistic probability with independent normal log-odds noise, SD .25.

For East and South East Asia:
`logit = -5.5 + 6*(rank<=100) + 2.8*(24000-fee)/5500 + 2*(social-50)/50 + .004*(interactive-40) + .02*(tutorial-2) + noise`.

Elsewhere:
`logit = 4*(24000-fee)/5500 + qs_effect*((rank<=100)-.44) + 3*(social-50)/50 + learning_effect*(interactive-47.5) + tutorial_effect*(tutorial-3.25) + noise`.

The (qs_effect, learning_effect, tutorial_effect) coefficients are (4.9, .14, 1.9) for Africa and (4.7, .145, 2.0) for Europe/North America and Rest of the World. Version 2.1 strengthens teaching-related signals: tutorials and interactive learning target roughly three quarters of fee importance, QS roughly half, and social media a smaller positive contribution. These are approximate design targets, especially for the default 100-tree/depth-4 configuration; measured ratios vary with depth and ensemble size. Very shallow forests can under-represent weaker signals. Coefficients and the non-Asia forest seed were screened using development-fold importance, not holdout test accuracy. The fixed non-Asia seed reduces feature-subsampling imbalance in the smallest ensemble. These choices deliberately support the requested teaching contrast: QS first and social media third in the Asia group; fees first in other groups. The generator verifies the order of computed permutation importance across all 64 configurations. It never rewrites measured scores to achieve an order. They are not findings about real continents or individuals.

## Forests and evaluation
16 settings per region: 10/50/100/300 trees crossed with depth 2/4/6/10. RandomForestClassifier uses bootstrap=True, max_features='sqrt', min_samples_leaf=20, forest seed 5302 for Asia and 5304 elsewhere, and other scikit-learn 1.7.2 defaults. The same stratified development/test split and five shuffled stratified CV folds are reused across settings within a region. Final forests fit only the development records. All people are distinct, but institutions occur in both partitions: this does not establish generalisation to unseen universities or future conditions.

Permutation importance: three shuffles per feature per validation fold, measuring accuracy decrease. Mean and population SD pool 15 measurements. Values are percentage-point changes; they are not budget weights, causal returns or shares of 100%. The display sorts values descending, retaining their feature identity. Negative measurements are retained. Error bars are SD, not confidence intervals.

The holdout matrix uses actual [not enrolled, enrolled] rows and predicted columns, threshold ≥.50. Accuracy, precision, recall and majority baseline derive from counts. Undefined ratios are labelled. Repeated tuning on the test set compromises its final-audit role.

## Northbridge cohort
The same 8,000 input profiles are scored by each regional model: rank 96, social 40/100, interactive teaching 35%, tutorials 1.5 hours/term; annual fees £24,000/£22,000/£20,000 with probabilities .75/.20/.05 (seed 5304). The filter changes the model used to score that reference cohort, not its size or feature distribution. Differences are hypothetical model estimates, not an observed regional recruitment mix. Probabilities have not been calibrated separately and need not equal the authored case's 25% baseline.

## Explanatory summary
The imposed feature sequence is QS rank → tuition payable → interactive learning. Root condition is QS≤100. Within each subsequent branch, a one-feature regression stump selects a threshold to minimise squared error against the final forest probabilities. Each stump uses min_samples_leaf=40; any unsplit stump falls back to the fit-subset median. Leaves average forest probabilities on their fit records. This structure is a teaching constraint, not the natural structure of every forest tree.

The surrogate uses 8,000 development fit records and 2,000 separate development audit records (split seed 5303). The forest itself has seen development data: summary agreement and probability MAE measure explanatory fidelity, not independent outcome accuracy. No holdout test data enters summary fitting. Leaf counts are surrogate-fit counts, not bootstrap totals.

## Reproducibility
Use dev/generate.py and pinned dev/requirements.txt. dev/synthetic-recruitment.csv stores record IDs, origin, features, outcome and partition. dev/provenance.json stores region seeds, split/fold hashes and class counts. All 64 results are generated, never hand-edited. Student runtime has no Python dependency.
