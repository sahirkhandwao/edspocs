export default function decorate(block) {
    const rows = [...block.children];
    if (!rows.length) return;

    // First row: Title and optional Button text
    const contentRow = rows[0];
    const title = contentRow.children[0]?.textContent.trim() || 'Enjoy brokerage as low as 0.01%* Enroll now';
    const buttonText = contentRow.children[1]?.textContent.trim() || 'OPEN TRADING A/C';
    const placeholder = 'Mobile Number';

    const container = document.createElement('div');
    container.className = 'trading-cta-container';

    // Title Section
    const titleElem = document.createElement('p');
    titleElem.className = 'trading-cta-title';
    titleElem.textContent = title;

    // Form Section
    const formWrapper = document.createElement('div');
    formWrapper.className = 'trading-cta-form-wrapper';

    const form = document.createElement('form');
    form.className = 'trading-cta-form';
    form.onsubmit = (e) => {
        e.preventDefault();
        const mobile = form.querySelector('input').value;
        if (mobile && /^[0-9]{10}$/.test(mobile)) {
            alert(`Redirecting to open account for: ${mobile}`);
            // In a real scenario, this would redirect or POST to an endpoint
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    };

    form.innerHTML = `
        <div class="input-wrapper">
            <input type="tel" class="trading-cta-input" placeholder="${placeholder}" maxlength="10" required pattern="[0-9]{10}">
        </div>
        <div class="button-wrapper">
            <button type="submit" class="trading-cta-button">${buttonText}</button>
        </div>
    `;

    formWrapper.append(form);
    container.append(titleElem, formWrapper);

    block.innerHTML = '';
    block.append(container);
}
