const ICONS = {
    'help': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    'why-us': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><polyline points="9 11 12 14 22 4"></polyline></svg>',
    'contact-us': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    'stock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
    'mutual-funds': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
};

function createTabRow(categories, activeTab, onTabClick) {
    const row = document.createElement('div');
    row.className = 'infobox-tabs-row';

    categories.forEach(cat => {
        const tab = document.createElement('button');
        tab.className = `infobox-tab ${cat.id === activeTab ? 'active' : ''}`;
        tab.dataset.id = cat.id;

        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'infobox-tab-icon';
        iconWrapper.innerHTML = cat.icon || ICONS[cat.id] || '';

        const label = document.createElement('span');
        label.className = 'infobox-tab-label';
        label.textContent = cat.name;

        const indicator = document.createElement('span');
        indicator.className = 'infobox-tab-indicator';
        indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"></path></svg>';

        tab.append(iconWrapper, label, indicator);
        tab.onclick = () => onTabClick(cat.id);
        row.appendChild(tab);
    });

    return row;
}

export default function decorate(block) {
    const rows = [...block.children];
    const categories = rows.map(row => {
        const nameText = row.children[0]?.textContent.trim();
        const iconHtml = row.children[1]?.innerHTML.trim();
        const contentHtml = row.children[2]?.innerHTML;
        const id = nameText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return {
            id,
            name: nameText,
            icon: iconHtml,
            content: contentHtml
        };
    }).filter(c => c.name);

    if (!categories.length) return;

    const categoriesTop = categories.filter(c => ['help', 'why-us', 'contact-us'].includes(c.id));
    const categoriesBottom = categories.filter(c => ['stock', 'mutual-funds'].includes(c.id));

    const container = document.createElement('div');
    container.className = 'infobox-container';

    const contentArea = document.createElement('div');
    contentArea.className = 'infobox-content-area';

    let currentId = null;
    const renderContent = (id) => {
        if (id === currentId) {
            id = null; // Toggle off if clicking the same tab
        }
        currentId = id;

        const cat = categories.find(c => c.id === id);
        if (cat) {
            contentArea.innerHTML = cat.content;
            contentArea.classList.add('active');

            // If the content is escaped (e.g. starting with &lt;), unescape it
            if (contentArea.textContent.trim().startsWith('<')) {
                const temp = document.createElement('div');
                temp.innerHTML = contentArea.textContent;
                contentArea.innerHTML = temp.innerHTML;
            }
        } else {
            contentArea.innerHTML = '';
            contentArea.classList.remove('active');
        }

        // Update active states
        container.querySelectorAll('.infobox-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.id === id);
        });
    };

    if (categoriesTop.length) {
        container.append(createTabRow(categoriesTop, null, renderContent));
    }
    if (categoriesBottom.length) {
        container.append(createTabRow(categoriesBottom, null, renderContent));
    }

    container.append(contentArea);

    block.innerHTML = '';
    block.append(container);
}
