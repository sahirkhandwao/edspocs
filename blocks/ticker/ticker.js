export default function decorate(block) {
    const [logoRow, tickerRow, searchRow, buttonsRow] = [...block.children];

    // LOGO
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'ticker-logo';
    if (logoRow) {
        const logoImg = logoRow.querySelector('img');
        if (logoImg) {
            logoWrapper.append(logoImg);
        }
        logoRow.remove();
    }

    // TICKER & SEARCH CONTAINER
    const centerContent = document.createElement('div');
    centerContent.className = 'ticker-center-content';

    // MARKET TICKER
    const tickerWrapper = document.createElement('div');
    tickerWrapper.className = 'ticker-market-data';
    if (tickerRow) {
        const items = [...tickerRow.children[0].children];
        items.forEach((item) => {
            const text = item.textContent.trim();
            const span = document.createElement('span');
            span.className = 'ticker-item';

            // Basic parsing for NIFTY/SENSEX patterns
            // Example: "NIFTY : 25,741.00 58.25(0.23%)"
            if (text.includes('(')) {
                const parts = text.split(' ');
                const label = parts[0]; // NIFTY
                const separator = parts[1]; // :
                const value = parts[2]; // 25,741.00
                const change = parts[3]; // 58.25(0.23%)

                const isUp = !change.startsWith('-');
                span.innerHTML = `${label} ${separator} <span class="ticker-value">${value}</span> <span class="ticker-change ${isUp ? 'up' : 'down'}">${change}</span>`;
            } else {
                span.textContent = text;
            }
            tickerWrapper.append(span);
        });
        tickerRow.remove();
    }

    // SEARCH BAR
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'ticker-search';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = searchRow?.textContent.trim() || 'Quotes, Nav';

    const searchIcon = document.createElement('span');
    searchIcon.className = 'icon icon-search';

    // Dropdown Container
    const dropdown = document.createElement('div');
    dropdown.className = 'ticker-search-dropdown';
    dropdown.style.display = 'none';

    searchWrapper.append(searchInput, searchIcon, dropdown);

    // Mock Data
    const trendings = ['Pick of the week', 'Portfolios', 'Mobile App', 'Research Reports'];
    const stocks = [
        { name: 'HDFC Bank', price: '1,642.50', change: '+12.40 (0.76%)', up: true },
        { name: 'HDFC Life', price: '715.20', change: '-5.15 (0.72%)', up: false },
        { name: 'HDFC AMC', price: '4,120.00', change: '+45.00 (1.10%)', up: true },
    ];

    const showTrendings = () => {
        dropdown.innerHTML = '<h2 class="search-heading">Trendings</h2>';
        trendings.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'search-item trending';
            div.textContent = item;
            dropdown.append(div);
        });
        dropdown.style.display = 'block';
    };

    const showResults = (query) => {
        dropdown.innerHTML = '<h2 class="search-heading">Equity</h2>';
        const filtered = stocks.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
        if (filtered.length > 0) {
            filtered.forEach((s) => {
                const div = document.createElement('div');
                div.className = 'search-item result';
                div.innerHTML = `
                    <span class="comp-name">${s.name}</span>
                    <span class="comp-price"><b>${s.price}</b></span>
                    <span class="comp-change ${s.up ? 'up' : 'down'}">${s.change}</span>
                `;
                dropdown.append(div);
            });
        } else {
            dropdown.innerHTML += '<div class="search-item no-result">No results found</div>';
        }
        dropdown.style.display = 'block';
    };

    searchInput.addEventListener('focus', () => {
        if (!searchInput.value) showTrendings();
        else showResults(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
        if (!searchInput.value) showTrendings();
        else showResults(searchInput.value);
    });

    document.addEventListener('click', (e) => {
        if (!searchWrapper.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    if (searchRow) searchRow.remove();

    centerContent.append(tickerWrapper, searchWrapper);

    // BUTTONS
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'ticker-buttons';
    if (buttonsRow) {
        const buttons = [...buttonsRow.querySelectorAll('a')];
        buttons.forEach((btn, index) => {
            // Index 0 is usually the "Open Account" (Red)
            // Others are secondary (Light Blue)
            btn.className = index === 0 ? 'button primary' : 'button secondary';

            // Check for "NEW" badge requirement in text
            if (btn.textContent.includes('(NEW)')) {
                btn.textContent = btn.textContent.replace('(NEW)', '').trim();
                const badge = document.createElement('span');
                badge.className = 'badge-new';
                badge.textContent = 'NEW';
                btn.append(badge);
            }

            buttonsWrapper.append(btn);
        });
        buttonsRow.remove();
    }

    // Assemble the block
    block.append(logoWrapper, centerContent, buttonsWrapper);
}
