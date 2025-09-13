# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog] and this project adheres to [Semantic Versioning].

## [Unreleased]
### Added
### Changed
### Fixed
### Removed

## [1.1.2] - 2025-09-13
### Changed
- Switched the order of buttons so that 'Save Style' button comes before the 'Apply Style' button. This should improve the UX because users should always try to save styles before using them.
- Updated the instructions paragraph in `descriptionCard()` to be much more detailed and up-to-date.
- Adjusted `collectConfigFromForm()` so that the method knows if it's being used during an apply style or save style. If it's being used during an apply style, it will check to see if the extra styling options exist, and if not, look for their values in a saved version of the style (if exists).
- Adjusted the use of `collectConfigFromForm()` in EventHandlers.gs to reflect its new functionality.

## Fixed
- Fixed the bug that would happen when users wouldn't have 'View more styling options' clicked, and therefore clicking 'Apply Styles' would result in none of the extra styling options being applied, like Bolded or Underlined, even if the style was saved with some of the extra styling options being enabled. 


## [1.1.1] - 2025-09-13
### Added
- Introduced `@typedef {Object} StyleData` to document the structure of style configuration objects.

### Changed
- Updated all JSDoc comments to use `{StyleData}` instead of `{Object}`.


## [1.1.0] - 2025-09-09
### Added
- `showConfirmCard_()` method with documentation comments.
- `confirmDeleteMessageCard()`, `yesAndNoConfirmDeleteButtons()`, and `cardPage()` UI helper methods in `Widgets.gs`.

### Changed
- `deleteSavedStyle_()` now redirects the user to a page letting them know the style has been deleted and giving them an option to return to the home page instead of returning a notification.
- `deleteStyleButton()` updated to call the new event handler `showConfirmCard_()`.
- `buildCard_()` cleaned up and now uses the new `cardPage()` UI method.

### Fixed
- Improved clarity and consistency in UI flow for deleting styles.


## [1.0.0] - 2025-09-07
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
[Unreleased]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v1.1.1...HEAD
[1.1.2]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/SonOfAthena1/Text-Styles-Google-Docs-Extension/releases/tag/v0.1.1
