const ICONS = {
  headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58zM9.75 15.02V8.98L15.45 12l-5.7 3.02z"></path></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 1.3 4.298c.137.428.069.598.513.598.344 0 .498-.158.689-.344l1.654-1.608 3.442 2.542c.635.35 1.091.17 1.25-.589l2.261-10.654c.231-.927-.353-1.347-1.059-1.026z"></path></svg>`,
  blog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>`
};

export default async function decorate(block) {
  let rows = [...block.children];

  if (rows.length === 0) {
    try {
      const resp = await fetch('/footer.md');
      if (resp.ok) {
        const md = await resp.text();
        const temp = document.createElement('div');
        const lines = md.split('\n').map(l => l.trim()).filter(l => l.startsWith('|'));
        if (lines.length > 2) {
          const dataLines = lines.slice(2);
          dataLines.forEach(line => {
            const rawCells = line.split('|').filter((_, i, a) => i > 0 && i < a.length - 1).map(c => c.trim());
            if (rawCells.length > 0) {
              const row = document.createElement('div');
              rawCells.forEach(cell => {
                const col = document.createElement('div');
                let html = cell.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
                if (html.includes('- ')) {
                  const items = html.split('- ').filter(s => s.trim());
                  html = `<ul>${items.map(s => `<li>${s.trim()}</li>`).join('')}</ul>`;
                }
                col.innerHTML = html;
                row.appendChild(col);
              });
              temp.appendChild(row);
            }
          });
          rows = [...temp.children];
        }
      }
    } catch (e) {
      console.error('Footer fetch failed', e);
    }
  }

  if (rows.length === 0) return;

  block.innerHTML = '';
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';

  const contactRow = document.createElement('div');
  contactRow.className = 'footer-contact-row';

  let contactEntry = null;
  let socialEntry = null;
  const navEntries = [];
  const legalEntries = [];

  rows.forEach((row, idx) => {
    const text = row.innerText || row.textContent;
    const hasPhone = text.match(/\d{3}-\d{4}\s\d{4}/);
    const hasIcons = text.includes(':') || row.querySelector('a[href*="facebook"]') || row.querySelector('a[href*="twitter"]');

    if (hasPhone) {
      contactEntry = row;
    } else if (hasIcons && !contactEntry) {
      // Ignore if it's the headset row
    } else if (hasIcons && contactEntry && !socialEntry) {
      socialEntry = row;
    } else if (idx > 1 && idx < 6 && row.children.length >= 2) {
      navEntries.push(row);
    } else {
      legalEntries.push(row);
    }
  });

  // Double check socialEntry - often it's row indices 0 and 1
  if (!contactEntry && rows[0]) contactEntry = rows[0];
  if (!socialEntry && rows[1]) socialEntry = rows[1];

  // 1. Render Contact
  if (contactEntry) {
    const wrapper = document.createElement('div');
    wrapper.className = 'footer-contact-wrapper';
    wrapper.innerHTML = `<div class="footer-headset-icon">${ICONS.headset}</div>`;

    const txtDiv = document.createElement('div');
    txtDiv.className = 'footer-contact-text';
    const rawText = contactEntry.innerText.replace(':headset:', '').trim();
    const phoneMatch = rawText.match(/\d{3}-\d{4}\s\d{4}/);
    if (phoneMatch) {
      const num = phoneMatch[0];
      const label = rawText.replace(num, '').trim();
      txtDiv.innerHTML = `<h3>${label}</h3><p>${num}</p>`;
    } else {
      txtDiv.innerHTML = `<p>${rawText}</p>`;
    }
    wrapper.appendChild(txtDiv);
    contactRow.appendChild(wrapper);
  }

  // 2. Render Social
  if (socialEntry) {
    const wrapper = document.createElement('div');
    wrapper.className = 'footer-social-wrapper';
    wrapper.innerHTML = `<p class="footer-social-label">CONNECT WITH US</p>`;

    const iconsDiv = document.createElement('div');
    iconsDiv.className = 'footer-social-icons';

    // Look for links in ALL children of socialEntry
    const links = socialEntry.querySelectorAll('a');
    links.forEach(link => {
      const text = link.textContent || link.innerHTML;
      const matched = text.match(/:([a-z0-9-]+):/);
      const name = matched ? matched[1] : null;

      if (name && ICONS[name]) {
        link.innerHTML = ICONS[name];
        link.classList.add('footer-social-link');
        iconsDiv.appendChild(link);
      } else {
        // Fallback check for link href
        const href = link.href.toLowerCase();
        for (const key in ICONS) {
          if (href.includes(key) && key !== 'headset') {
            link.innerHTML = ICONS[key];
            link.classList.add('footer-social-link');
            iconsDiv.appendChild(link);
            break;
          }
        }
      }
    });
    wrapper.appendChild(iconsDiv);
    contactRow.appendChild(wrapper);
  }

  footerContainer.appendChild(contactRow);

  // 3. Render Nav
  if (navEntries.length > 0) {
    const navSection = document.createElement('div');
    navSection.className = 'footer-nav-section';
    navEntries.forEach(entry => {
      if (entry.children.length >= 1) {
        const col = document.createElement('div');
        col.className = 'footer-nav-column';
        const title = entry.children[0].innerText.trim();
        col.innerHTML = `<h4>${title}</h4>`;

        const contentCell = entry.children[1] || entry.children[0];
        const list = contentCell.querySelector('ul');
        if (list) {
          col.appendChild(list);
        } else {
          const links = contentCell.querySelectorAll('a');
          if (links.length > 0) {
            const ul = document.createElement('ul');
            links.forEach(l => {
              const li = document.createElement('li');
              li.appendChild(l);
              ul.appendChild(li);
            });
            col.appendChild(ul);
          }
        }
        navSection.appendChild(col);
      }
    });
    footerContainer.appendChild(navSection);
  }

  // 4. Render Legal
  const legalSection = document.createElement('div');
  legalSection.className = 'footer-legal-section';
  legalEntries.forEach(entry => {
    if (![contactEntry, socialEntry].includes(entry) && !navEntries.includes(entry)) {
      const p = document.createElement('p');
      p.innerHTML = entry.innerHTML;
      legalSection.appendChild(p);
    }
  });
  if (legalSection.children.length > 0) {
    footerContainer.appendChild(legalSection);
  }

  block.appendChild(footerContainer);
}
