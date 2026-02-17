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
                const title = item.firstChild.textContent.trim();
                const li = document.createElement('li');
                li.className = 'subnav-item';

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
                        const heading = col.firstChild.textContent.trim();
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
