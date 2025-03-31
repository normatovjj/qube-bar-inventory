# Vanilla JS Bar Inventory

A lightweight bar inventory tracking application built with vanilla JavaScript, HTML, and CSS. This version maintains all the functionality of the original React app but with a much smaller footprint.

## Features

- Track inventory for different categories (drinks, tea, syrups)
- Mobile-friendly UI
- Automatic data saving using localStorage
- Notes/comments section for each category
- Reset functionality

## File Size Comparison

| Version | Size |
|---------|------|
| React Version | ~500MB (with node_modules) |
| Vanilla JS Version | < 20KB |

## How to Use

1. Simply open `index.html` in any modern browser
2. Navigate between categories using the menu button in the top-right
3. Enter inventory amounts for each item
4. Add notes in the text area
5. Use the Save button to explicitly save your data (though it auto-saves on changes)
6. Use the Reset button to clear all entries for the current category

## Deployment

You can deploy this app by uploading these three files to any web hosting service:

- `index.html`
- `styles.css`
- `script.js`

Recommended free hosting options:
- GitHub Pages
- Netlify
- Vercel

## Why Vanilla JS?

For simple applications like this, vanilla JavaScript provides:
- Tiny file size
- Fast loading and execution
- No dependencies
- Long-term stability (no framework upgrades needed)

This makes it ideal for straightforward inventory tracking applications where complex state management isn't required.