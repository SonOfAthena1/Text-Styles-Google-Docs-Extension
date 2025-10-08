# Text Styles (Google Docs Editor Add-on)

Style text enclosed by custom delimiters in a Google Doc — and now save **named style presets** for reuse later.  
Pick a font, colors, and optional advanced options, save them with a name (e.g., “Code Style”), and apply them to text between your start and end markers (e.g., `<...>`). You can manage multiple styles, edit them, and return to the home page at any time.

## Features
- Create and save **multiple named style presets**
- Choose **font family**, **font size**, **bold / italic / underline**
- Set **text color** and **highlight color** (HEX)
- Configure **start** and **end** delimiter strings
- Toggle **include delimiters** in styled range
- Optionally **delete delimiters** after styling
- Expandable **Advanced** options
- Simple navigation between **home screen**, **style editor**, and **result cards**

## How it works
1. The add-on renders a **CardService** UI with a list of saved styles.
2. Each style has an **Edit** button; the **+** button creates a new style.
3. Editing a style opens a form where you configure font, colors, delimiters, and advanced options.
4. Clicking **Apply** triggers `applyStyle_()` to style all matches in the Doc.
5. A result notification card summarizes how many occurrences were updated.
6. You can **return to the home screen** using the built-in navigation button.

## Data Format
Saved styles are persisted in **UserProperties** as JSON objects keyed by style name:
```js
{
  "default": {
    font: "Consolas",
    textColor: "#000000",
    highlightColor: "#efefef",
    fontSize: 11,
    bold: false,
    italic: false,
    underline: false,
    startChar: "<",
    endChar: ">",
    includeDelims: true,
    deleteDelims: false
  },
  "myStyle": { ... },
  "anotherStyle": { ... }
}
```

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
- `onHomepage(e)`: Entry point. Builds the home card with a list of saved styles.
- `styleNameAndEditCard(styleName, styleData)`: Renders a saved style entry with an **Edit** button.
- `createNewStyleButton()`: Produces the **+** button for creating a new style.
- `styleNameInputCard(styleName)`: Displays the card for naming or renaming a style.
- `applyStyle_(e)`: Reads form inputs, applies the chosen style to the document, and shows a result card.
- `applyStyleToDoc(...)`: Core logic that finds matches between delimiters and applies font/color/highlight settings; optionally removes delimiters.
- `goBackToHome_()`: Navigation helper to return to the home UI.
- `createResultNotification(title, message)`: Builds a result/confirmation notification card.
- Widget builders: `fontInputCard`, `textColorCard`, `highlightColorCard`, `startCharCard`, `endCharCard`,  
  `deleteSwitchCard`, `includeSwitchCard`, `fontSizeCard`, `boldSwitchCard`, `italicSwitchCard`,  
  `underlineSwitchCard`, `runButtonCard`, `continueStylingButtonCard`, and supporting description/tips cards.
- Helpers:  
  - `escapeRegex(str)`: Escapes regex metacharacters for safe use in patterns.  
  - `normalizeHexColor(val, fallback)`: Validates HEX color strings and ensures safe fallback.  
  - Storage helpers for saving/loading JSON from `UserProperties`.

> Note: `Body.findText()` matches within a single Text element. It handles soft line breaks (Shift+Enter) but **won’t cross paragraphs**.
 
## Delimiters & Matching
- Use any **non-empty** strings as `startChar` and `endChar`.
- Minimal matching (`*?`) avoids swallowing multiple segments.
- Matching does **not** span multiple paragraphs (use **Shift+Enter** for soft breaks).

## Switch Behavior
Switches post a value **only when selected**. Presence in `formInputs` means **ON**:
```js
if (form.delete_switch) deleteDelims = true;
```

## License
Source-available under **PolyForm Noncommercial 1.0.0**.  
Commercial use requires a separate license — contact soccerlc0095@gmail.com. See [LICENSE](./LICENSE) for details.  
“Text Styles™” and associated logos are trademarks of Leland Cuellar.
