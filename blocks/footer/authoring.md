# Footer Block Authoring Guide

The Footer block is structured as a series of rows representing different sections.

## Table Structure

| Section | Content |
| --- | --- |
| Contact Info | Icon (Headset) and text including phone number |
| Social Links | List of links with icons (Facebook, Twitter, etc.) |
| Nav Group 1 | Heading (e.g., NEWSROOM) and link list |
| Nav Group 2 | Heading (e.g., NEW TO SITE?) and link list |
| Nav Group 3 | Heading (e.g., ACCOUNT OPENING) and link list |
| Nav Group 4 | Heading (e.g., IMPORTANT INFORMATION) and link list |
| Legal Disclaimer | Paragraphs containing SEBI registration, CIN, etc. |

## Detailed Authoring

### 1. Contact Info Row
- Column 1: A headset icon and text. 
- Format: `CUSTOMER CARE AND CENTRALIZED DEALING DESK` followed by the phone number `022-6246 5555`.

### 2. Social Links Row
- A list of links where each link has an icon as its label.
- Example: `[:facebook:](https://facebook.com/...)`

### 3. Navigation Groups
- Each row should have a heading (H2 or H3) and a Bulleted List of links.
- The block will split these into columns.

### 4. Legal Disclaimer
- The final row of the table. Usually a large block of text with fine print.

## Placeholder Example

| Footer | |
| --- | --- |
| :headset: | CUSTOMER CARE AND CENTRALIZED DEALING DESK 022-6246 5555 |
| | :facebook: :twitter: :linkedin: |
| NEWSROOM | - Links... |
| NEW TO SITE? | - Links... |
| ACCOUNT OPENING | - Links... |
| IMPORTANT INFORMATION | - Links... |
| Attention Investor... | SEBI Registration No... |
