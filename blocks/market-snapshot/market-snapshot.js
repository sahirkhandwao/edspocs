export default function decorate(block) {
    const rows = [...block.children];
    if (!rows.length) return;

    // First row: Title and Date/Time
    const headerRow = rows[0];
    const title = headerRow.children[0]?.textContent.trim() || 'Market Snapshot';
    const dateTime = headerRow.children[1]?.textContent.trim() || '';

    const container = document.createElement('div');
    container.className = 'market-snapshot-container';

    // Left Section: Title & Date
    const leftSection = document.createElement('div');
    leftSection.className = 'market-snapshot-left';
    leftSection.innerHTML = `
        <h2 class="snapshot-title">${title}</h2>
        ${dateTime ? `<p class="snapshot-date">${dateTime}</p>` : ''}
    `;

    // Right Section: Ticker Items
    const tickerSection = document.createElement('div');
    tickerSection.className = 'market-snapshot-tickers';

    // Subsequent rows are ticker items
    rows.slice(1).forEach((row) => {
        const cells = [...row.children];
        if (!cells.length) return;

        // Extract data either from multiple cells or from a list/newlines in one cell
        let data = [];
        const listItems = cells[0].querySelectorAll('li');
        if (listItems.length > 0) {
            data = [...listItems].map(li => li.textContent.trim());
        } else if (cells.length > 1) {
            data = cells.map(c => c.textContent.trim());
        } else {
            // Try splitting by common separators if it's all in one cell
            const text = cells[0].textContent.trim();
            data = text.split(/\n|,/).map(t => t.trim()).filter(t => t);
        }

        if (!data.length || !data[0]) return;

        const label = data[0] || '';
        const name = data[1] || '';
        const value = data[2] || '--';
        const change = data[3] || '';
        const directionText = data[4]?.toLowerCase() || 'up';

        // Find link: check the last cell or anywhere in the row
        const link = row.querySelector('a');
        const url = link ? link.href : null;

        const card = document.createElement('div');
        card.className = 'market-card';

        const isUp = directionText.includes('up') || (!directionText.includes('down') && !change.startsWith('-'));
        const statusClass = isUp ? 'status-up' : 'status-down';

        const upArrow = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"></polyline></svg>';
        const downArrow = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        const arrowIcon = isUp ? upArrow : downArrow;

        card.innerHTML = `
            <div class="card-header">
                <span class="card-label">${label}</span>
                ${url ? `<a href="${url}" class="card-popout" target="_blank" aria-label="View Details"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>` : ''}
            </div>
            ${name ? `<strong class="card-name">${name}</strong>` : ''}
            <div class="card-body">
                <div class="card-status ${statusClass}">${arrowIcon}</div>
                <div class="card-data">
                    <span class="card-value">${value}</span>
                    ${change ? `<span class="card-change">Chg: ${change}</span>` : ''}
                </div>
            </div>
        `;

        tickerSection.append(card);
    });

    container.append(leftSection, tickerSection);
    block.innerHTML = '';
    block.append(container);
}
