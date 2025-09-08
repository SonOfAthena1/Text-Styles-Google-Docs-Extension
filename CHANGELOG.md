# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog] and this project adheres to [Semantic Versioning].

## [Unreleased]
### Added
### Changed
### Fixed
### Removed

## [1.0.0] – 2025-09-07
### Added
- **Saved Styles**: Create, name, and persist multiple style presets (stored under keys like `"default"`, `"style1"`, etc.) using `UserProperties`.
- **Edit & Manage UI**: Cards for listing styles with an **Edit** button; “+” button to create a new style.
- **Navigation**: `goBackToHome_()` function with a **Go Back** button to return to the main UI.
- **Result notifications**: More result notifications in things like `applyStyle_()` / `runButtonCard()`.
- **Utility helpers**: Local-storage helpers to get, save, and delete styles.

### Changed
- **Program name**: “Font Styles” → **“Text Styles.”**
- **Core handler wiring**: Introduced `applyStyle_()` event handler (renamed `setFontAndHighlightForAnglePlaceholders` → `applyStyleToDoc()` internally).
- **Widget Functions**: Adjusted most of the widget functions to take `styleData` object as a parameter
- **UI cards**: `buildCard_()` updated to reflect the new program design and advanced options.
- **Docs/comments**: Widespread JSDoc updates across methods and widgets.

### Removed
- Legacy `RunOnDocs` file and outdated event handlers like `toggleAdvanced_()`.

### Refactor
- **File reorg**: Grouped event handlers into a single file; split widget builders into their own files; moved helper methods into a dedicated file.


## [0.2.0] - 2025-08-30
### Added
- Added little font size guard to make sure font size stays within range 2-200

### Changed
- Adjusted `createResultCard()` to display a notification with a message instead of create a new card where a button was needed to return the user to the home menu.
- Renamed `createResultCard()` to be `createResultNotification()`
- Updated `tipsButtonCard()` and `runOnDoc_()` to use updated function `createResultNotification()`
- Updated version constant

### Removed
- Deleted `continueStylingButtonCard()`
- Deleted `goBackToMain_()`


## [0.1.2] - 2025-08-24
### Changed
- Updated `appsscript.json` to include explicit OAuth scopes required for Workspace Add-ons.
- Changed `logoUrl` in `appsscript.json` to use the project’s custom logo.


## [0.1.1] - 2025-08-23
### Added
- `goBackToMain_()` action handler that returns a proper `ActionResponse`.
- JSDoc documentation comments across the codebase.
- Initial `README.md` explaining features, usage, and limitations.

### Changed
- Sidebar header now shows the version via a `VERSION` constant.

### Fixed
- “Continue Styling” button now uses a supported navigation flow.

[Keep a Changelog]: https://keepachangelog.com/en/1.1.0/
[Semantic Versioning]: https://semver.org/spec/v2.0.0.html
