# Text Styles (Google Docs Editor Add-on)

Style text enclosed by custom delimiters in a Google Doc. Pick a font, colors, and optional advanced styles; then apply them to everything between your start and end markers (e.g., `<...>`). You can also choose to include/exclude the delimiters and optionally delete them afterward.

## Features
- Choose **font family**, **font size**, **bold/italic/underline**
- Set **text color** and **highlight color** (HEX)
- Configure **start** and **end** delimiter strings
- Toggle **include delimiters** in styled range
- Optionally **delete delimiters** after styling
- Expandable **Advanced** options

## How it works
1. The add-on renders a **CardService** UI with inputs and toggles.
2. Clicking **Run** triggers `runOnDoc_(e)` to read form inputs.
3. The code searches for matches between your delimiters using a safe pattern:  
   `safeStart + "[\\s\\S]*?" + safeEnd`
4. Each match is styled; delimiters can be included/excluded and optionally removed.
5. A result card summarizes how many occurrences were updated.

> Note: `Body.findText()` matches within a single Text element. It handles soft line breaks (Shift+Enter) but **won’t cross paragraphs**.

## UI Overview
- **Font family**: e.g., `Consolas`, `Arial`
- **Text color (HEX)**: e.g., `#000000`
- **Highlight color (HEX)**: e.g., `#efefef`
- **Start / End characters**: defaults `<` and `>`
- **Include delimiter characters in style** (switch): ON by default
- **Delete delimiter characters with run** (switch): OFF by default
- **Advanced options**:
  - **Font Size** (points): default `11`
  - **Bold / Italic / Underline** switches

## Key Functions
- `onHomepage(e)`: Entry point. Builds the main card.
- `buildCard_({ showAdvanced })`: Constructs the UI with basic/advanced sections.
- `toggleAdvanced_(e)`: Shows/hides advanced controls.
- Widget builders: `descriptionCard`, `tipsButtonCard`, `fontInputCard`, `textColorCard`, `highlightColorCard`, `startCharCard`, `endCharCard`, `deleteSwitchCard`, `includeSwitchCard`, `fontSizeCard`, `boldSwitchCard`, `italicSwitchCard`, `underlineSwitchCard`, `runButtonCard`, `continueStylingButtonCard`.
- `runOnDoc_(e)`: Reads form inputs, invokes styling, shows result.
- `setFontAndHighlightForAnglePlaceholders(...)`: Finds matches and applies styles; optionally removes delimiters.
- `escapeRegex(str)`: Escapes metacharacters.

## Delimiters & Matching
- Use any **non-empty** strings as `startChar` and `endChar`.
- Minimal matching (`*?`) avoids swallowing multiple segments.
- Matching does **not** span multiple paragraphs (use **Shift+Enter** for soft breaks).

## Switch Behavior
Switches post a value **only when selected**. Presence in `formInputs` means **ON**:
```js
if (form.delete_switch) deleteDelims = true;
