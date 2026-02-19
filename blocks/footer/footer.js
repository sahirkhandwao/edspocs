import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  let rows = [...block.children];

  if (rows.length === 0) {
    try {
      const resp = await fetch('/footer.md');
      if (resp.ok) {
        const md = await resp.text();
        const temp = document.createElement('div');
        const lines = md.split('\n').filter(l => l.trim().startsWith('|'));
        const dataLines = lines.slice(2);

        dataLines.forEach(line => {
          const cells = line.split('|').map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
          if (cells.length) {
            const row = document.createElement('div');
            cells.forEach(cell => {
              const col = document.createElement('div');
              let html = cell
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                .replace(/:([a-z0-9-]+):/g, '<span class="icon icon-$1"></span>');
              if (html.startsWith('- ')) {
                html = `<ul>${html.split(' - ').filter(s => s).map(s => `<li>${s.trim()}</li>`).join('')}</ul>`;
              }
              col.innerHTML = html;
              row.appendChild(col);
            });
            temp.appendChild(row);
          }
        });
        rows = [...temp.children];
      }
    } catch (e) {
      console.error('Footer fetch failed', e);
    }
  }

  block.innerHTML = '';
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';

  const contactRow = document.createElement('div');
  contactRow.className = 'footer-contact-row';

  if (rows[0]) {
    const contactWrapper = document.createElement('div');
    contactWrapper.className = 'footer-contact-wrapper';
    const icon = rows[0].querySelector('span.icon');
    if (icon) contactWrapper.appendChild(icon);
    else {
      const hs = document.createElement('div');
      hs.className = 'footer-headset-icon';
      hs.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>';
      contactWrapper.appendChild(hs);
    }
    const txt = rows[0].querySelector('div:last-child');
    if (txt) contactWrapper.appendChild(txt);
    contactRow.appendChild(contactWrapper);
  }

  if (rows[1]) {
    const socialWrapper = document.createElement('div');
    socialWrapper.className = 'footer-social-wrapper';
    const label = document.createElement('p');
    label.className = 'footer-social-label';
    label.textContent = 'CONNECT WITH US';
    socialWrapper.appendChild(label);
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'footer-social-icons';
    const links = rows[1].querySelectorAll('a');
    links.forEach(link => {
      if (link.textContent.match(/:[a-z0-9-]+:/)) {
        const name = link.textContent.match(/:([a-z0-9-]+):/)[1];
        link.innerHTML = `<span class="icon icon-${name}"></span>`;
      }
      if (link.querySelector('span.icon')) {
        link.classList.add('footer-social-link');
        iconsContainer.appendChild(link);
      }
    });
    socialWrapper.appendChild(iconsContainer);
    contactRow.appendChild(socialWrapper);
  }
  footerContainer.appendChild(contactRow);

  const navSection = document.createElement('div');
  navSection.className = 'footer-nav-section';
  rows.slice(2, -1).forEach(row => {
    const col = document.createElement('div');
    col.className = 'footer-nav-column';
    const title = row.querySelector('h2, h3, h4, strong, p');
    if (title) {
      const h4 = document.createElement('h4');
      h4.textContent = title.textContent;
      col.appendChild(h4);
    }
    const list = row.querySelector('ul');
    if (list) col.appendChild(list);
    else {
      const links = row.querySelectorAll('a');
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
  });
  footerContainer.appendChild(navSection);

  const legalRow = rows[rows.length - 1];
  if (legalRow && rows.length > 2) {
    const legalSection = document.createElement('div');
    legalSection.className = 'footer-legal-section';
    legalSection.innerHTML = legalRow.innerHTML;
    footerContainer.appendChild(legalSection);
  }

  block.appendChild(footerContainer);
  import('../../scripts/aem.js').then(mod => {
    mod.decorateIcons(block);
    mod.decorateButtons(block);
  });
}
