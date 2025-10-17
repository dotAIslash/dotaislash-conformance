# Changelog

All notable changes to @dotaislash/conformance will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-17

### Added

- Initial release of conformance test suite
- **70 conformance scenarios** across 7 categories
- **Schema scenarios** (10) - JSON Schema validation requirements
- **Merge scenarios** (10) - Profile merging behavior
- **Context scenarios** (10) - context.json structure
- **Profile scenarios** (10) - Profile format and merging
- **Rules scenarios** (10) - Rule file format and metadata
- **CLI scenarios** (10) - CLI command requirements
- **Permissions scenarios** (10) - Security and access control

### Features

#### Test Runner
- Execute all scenarios with `runConformanceSuite()`
- Calculate conformance level (full, high, basic, partial, none)
- Generate markdown reports with statistics

#### Conformance Levels
- **Full:** All MUST + all SHOULD scenarios pass
- **High:** All MUST + ≥90% SHOULD scenarios pass
- **Basic:** All MUST + ≥70% SHOULD scenarios pass
- **Partial:** ≥80% MUST scenarios pass
- **None:** <80% MUST scenarios pass

#### Scenario Categories
- Priority levels: MUST, SHOULD, MAY (per RFC 2119)
- Categorized by: schema, merge, context, profile, rules, CLI, permissions
- Spec references for traceability

### Testing

- 15 test suites for conformance package itself
- Tests for scenario execution, level calculation, report generation
- All tests passing

[1.0.0]: https://github.com/dotAIslash/dotaislash-conformance/releases/tag/v1.0.0
