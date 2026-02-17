const ICONS = {
    customerCare: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#003b90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h3v-7H5v-2a7 7 0 0 1 14 0v2h-3v7h3c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"></path></svg>`,
    mobile: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003b90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.465 0-2.846-.394-4.04-1.127l-.29-.172-3.004.788.801-2.926-.188-.3c-.808-1.283-1.236-2.768-1.236-4.295 0-4.412 3.59-8.001 8.005-8.001 2.14 0 4.151.83 5.66 2.341 1.511 1.511 2.341 3.522 2.341 5.66-.002 4.412-3.591 8-8.007 8.001"></path></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#003b90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
};

export default function decorate(block) {
    const rows = [...block.children];
    let navRow, utilityRow;

    if (rows.length >= 2) {
        [navRow, utilityRow] = rows;
    } else if (rows.length === 1) {
        const row = rows[0];
        if (row.children.length >= 2) {
            navRow = row.children[0];
            utilityRow = row.children[1];
        } else {
            navRow = row.children[0];
        }
    }

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
                else if (lowerTitle.includes('distribution')) icon.className = 'subnav-menu-icon icon-distribution';
                else if (lowerTitle.includes('product')) icon.className = 'subnav-menu-icon icon-products';
                else if (lowerTitle.includes('finance') || lowerTitle.includes('portfolio')) icon.className = 'subnav-menu-icon icon-finance';

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
                const wrapper = document.createElement('a');
                wrapper.className = 'utility-icon-wrapper';
                wrapper.href = "https://www.hdfcsec.com/invest-right-karo";
                // wrapper.target = "_blank";

                const lowerText = text.toLowerCase();
                let iconSVG = '';
                if (lowerText.includes('whatsapp')) iconSVG = ICONS.whatsapp;
                else if (lowerText.includes('mobile') || lowerText.includes('cell') || lowerText.includes('app')) iconSVG = ICONS.mobile;
                else if (lowerText.includes('bell') || lowerText.includes('notification') || lowerText.includes('alert')) iconSVG = ICONS.bell;
                else if (lowerText.includes('customer') || lowerText.includes('care') || lowerText.includes('headset') || lowerText.includes('support')) iconSVG = ICONS.customerCare;
                else iconSVG = ICONS.customerCare; // Default

                wrapper.innerHTML = iconSVG;

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
