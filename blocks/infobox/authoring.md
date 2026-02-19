# Infobox Block Authoring Guide

The Infobox block creates a tabbed interface for Help, Why us, Contact us, Stocks, and Mutual Funds.

## Table Structure

| Category Name | Icon (HTML/SVG) | Content (HTML/Markdown) |
| --- | --- | --- |
| Name of the tab | SVG or Image tag for the icon | the content to show when active |

### Example for "Contact us"

To create the card layout seen in the design, use the following HTML structure in the Content column:

```html
<div class="contact-grid">
    <div class="contact-card">
        <div class="contact-icon-circle">📍</div>
        <h4>LOCATE US</h4>
        <p><a href="#">Click here</a> to locate our branch address</p>
    </div>
    <div class="contact-card">
        <div class="contact-icon-circle">📞</div>
        <h4>CUSTOMER CARE</h4>
        <p>022-6246 5555</p>
        <p>For any service-related complaints...</p>
    </div>
    <div class="contact-card">
        <div class="contact-icon-circle">👤</div>
        <h4>CENTRALIZED DEALING DESK</h4>
        <p>022-6246 5555</p>
        <p>For placing your investment order...</p>
    </div>
</div>
```

### Example for "Stock" (Alphabetical Filter)

```html
<div class="alphabet-filter">
    <button>A</button><button>B</button><button>C</button>...<button>Z</button>
</div>
```

## Setup Instructions

1.  **Tab Rows**: The block automatically splits categories into two rows.
    *   Row 1: Help, Why us, Contact us.
    *   Row 2: Stock, Mutual Funds.
2.  **Icons**: Paste the SVG code or an `<img>` tag into the Icon column.
3.  **Active State**: The first tab (Help) is active by default.
4.  **Content**: You can use standard HTML or Markdown for the content. For complex layouts like the Contact Us cards, use the suggested structure above.
