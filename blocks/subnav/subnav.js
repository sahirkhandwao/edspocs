export default function decorate(block) {
    const [navRow, utilityRow] = [...block.children];

    // Create a container for fixed-width alignment
    const container = document.createElement('div');
    container.className = 'subnav-container';

    // MAIN NAVIGATION
    const navWrapper = document.createElement('div');
    navWrapper.className = 'subnav-main';

    if (navRow) {
        const list = navRow.querySelector('ul');
        if (list) {
            const items = [...list.children];
            const navList = document.createElement('ul');
            navList.className = 'subnav-list';

            items.forEach((item) => {
                // Better title extraction: get text before the first UL
                const titleEl = item.querySelector(':scope > p') || item;
                const title = [...titleEl.childNodes]
                    .filter((node) => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'UL'))
                    .map((node) => node.textContent)
                    .join(' ')
                    .trim();

                const li = document.createElement('li');
                li.className = 'subnav-item';

                // Add Menu Icon based on title
                const icon = document.createElement('span');
                const lowerTitle = title.toLowerCase();
                if (lowerTitle.includes('market')) icon.className = 'subnav-menu-icon icon-markets';
                else if (lowerTitle.includes('research')) icon.className = 'subnav-menu-icon icon-research';
                else if (lowerTitle.includes('product')) icon.className = 'subnav-menu-icon icon-products';
                else if (lowerTitle.includes('finance') || lowerTitle.includes('portfolio')) icon.className = 'subnav-menu-icon icon-portfolio';

                if (icon.className) li.append(icon);

                const span = document.createElement('span');
                span.className = 'subnav-item-title';
                span.textContent = title;
                li.append(span);

                // MEGA MENU
                const subList = item.querySelector('ul');
                if (subList) {
                    li.classList.add('has-megamenu');
                    const megaMenu = document.createElement('div');
                    megaMenu.className = 'subnav-megamenu';

                    const megaInner = document.createElement('div');
                    megaInner.className = 'subnav-megamenu-inner';

                    // Columns
                    const columns = [...subList.children];
                    columns.forEach((col) => {
                        const colDiv = document.createElement('div');
                        colDiv.className = 'mega-column';

                        // Column Heading
                        // Column Heading - Robust extraction
                        const headingEl = col.querySelector(':scope > p') || col;
                        const heading = [...headingEl.childNodes]
                            .filter((node) => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'UL'))
                            .map((node) => node.textContent)
                            .join(' ')
                            .trim();

                        const h3 = document.createElement('h3');
                        h3.textContent = heading;
                        colDiv.append(h3);

                        // Column Links
                        const linksList = col.querySelector('ul');
                        if (linksList) {
                            const ul = document.createElement('ul');
                            [...linksList.children].forEach((linkItem) => {
                                const liLink = document.createElement('li');
                                liLink.innerHTML = linkItem.innerHTML;
                                ul.append(liLink);
                            });
                            colDiv.append(ul);
                        }
                        megaInner.append(colDiv);
                    });
                    megaMenu.append(megaInner);
                    li.append(megaMenu);
                }
                navList.append(li);
            });
            navWrapper.append(navList);
        }
        navRow.remove();
    }

    // UTILITY ICONS
    const utilityWrapper = document.createElement('div');
    utilityWrapper.className = 'subnav-utility';

    if (utilityRow) {
        const list = utilityRow.querySelector('ul');
        if (list) {
            const items = [...list.children];
            items.forEach((item) => {
                const text = item.textContent.trim();
                const wrapper = document.createElement('div');
                wrapper.className = 'utility-icon-wrapper';

                // Icon (Placeholder based on text)
                const icon = document.createElement('span');
                const lowerText = text.toLowerCase();
                if (lowerText.includes('whatsapp')) icon.className = 'icon icon-whatsapp';
                else if (lowerText.includes('mobile')) icon.className = 'icon icon-mobile';
                else if (lowerText.includes('bell') || lowerText.includes('notification')) icon.className = 'icon icon-bell';
                else icon.className = 'icon icon-customer-care';

                wrapper.append(icon);

                // Badge Detection (numbers or "NEW")
                const badgeMatch = text.match(/\(([^)]+)\)/);
                if (badgeMatch) {
                    const badgeText = badgeMatch[1];
                    const badge = document.createElement('span');
                    badge.className = 'utility-badge';
                    badge.textContent = badgeText;
                    wrapper.append(badge);
                }

                utilityWrapper.append(wrapper);
            });
        }
        utilityRow.remove();
    }

    container.append(navWrapper, utilityWrapper);
    block.append(container);
}
