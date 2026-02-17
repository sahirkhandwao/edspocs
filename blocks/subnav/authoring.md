# Subnav Authoring Guide

The Subnav block creates a secondary navigation bar with mega-menus and utility icons.

## Table Structure

| subnav |
| --- |
| **Menu Links** (Nested List) | **Utility Icons** (Link List) |

### Example

| subnav |
| --- |
| <ul><li>MARKETS<ul><li>EQUITY<ul><li>Stocks</li><li>Indices</li></ul></li><li>DERIVATIVES</li></ul></li><li>RESEARCH</li></ul> | <ul><li>WhatsApp (NEW)</li><li>Mobile</li><li>Bell (3)</li></ul> |

## Setup Instructions

1. **Menu Links**: Use a nested bulleted list. The first level is the main bar. The second level creates the Mega-Menu columns. The third level provides sub-links.
2. **Utility Icons**: Use a bulleted list for icons on the right.
   - Text like **(NEW)** or **(numbers)** will automatically become a red notification badge.
3. **Icons**: The block will attempt to match text (e.g., "WhatsApp") to a known icon set.
