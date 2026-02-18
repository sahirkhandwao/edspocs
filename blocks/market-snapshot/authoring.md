# Market Snapshot Authoring Guide

The Market Snapshot block displays a horizontal bar with market indices and stock performance metrics.

## Table Structure

| market-snapshot |
| --- |
| **Title** (e.g., Market Snapshot) | **Date/Time** (e.g., 18 Feb 2026 3:59 PM) |
| **Category** (e.g., Market Today) | **Name** (e.g., Nifty Auto) | **Value** | **Change** | **Direction** (Up/Down) | **Link** (Optional URL) |
| **Category** | **Name** | **Value** | **Change** | **Direction** | **Link** |

### Example

| market-snapshot |
| --- |
| Market Snapshot | 18 Feb 2026 3:59 PM |
| Market Today | Nifty Auto | 28,327.60 | 153.05(0.54%) | Up | [View Details](https://www.hdfcsec.com/market-today) |
| Top Gainers | Bajaj Auto Ltd... | 9,980.00 | 153.50(1.56%) | Up | [View Details](https://www.hdfcsec.com/top-gainers) |
| Top Losers | Infosys Ltd... | 1,373.70 | -17.50(-1.26%) | Down | [View Details](https://www.hdfcsec.com/top-losers) |

## Setup Instructions

1.  **First Row**: 
    - Left cell: Main heading (e.g., "Market Snapshot").
    - Right cell: Timestamp (e.g., "18 Feb 2026 3:59 PM").
2.  **Item Rows**: 
    - **Category**: Grey label (e.g., "Market Today").
    - **Name**: Stock/Index name in bold.
    - **Value**: Current numeric value.
    - **Change**: Price change and percentage.
    - **Direction**: `Up` (Green) or `Down` (Red).
    - **Link**: A link (using the link tool) for the pop-out icon. If no link is provided, the icon is hidden.
