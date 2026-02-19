import { fetchPlaceholders } from '../../scripts/placeholders.js';

function updateActiveSlide(slide) {
    const block = slide.closest('.product-showcase');
    const slideIndex = parseInt(slide.dataset.slideIndex, 10);
    block.dataset.activeSlide = slideIndex;

    const slides = block.querySelectorAll('.carousel-slide');

    slides.forEach((aSlide, idx) => {
        aSlide.setAttribute('aria-hidden', idx !== slideIndex);
        aSlide.querySelectorAll('a').forEach((link) => {
            if (idx !== slideIndex) {
                link.setAttribute('tabindex', '-1');
            } else {
                link.removeAttribute('tabindex');
            }
        });

    });

    const indicators = block.querySelectorAll('.carousel-slide-indicator');
    indicators.forEach((indicator, idx) => {
        const button = indicator.querySelector('button');
        if (idx !== slideIndex) {
            button.removeAttribute('disabled');
            button.removeAttribute('aria-current');
        } else {
            button.setAttribute('disabled', true);
            button.setAttribute('aria-current', true);
        }
    });
}

function showSlide(block, slideIndex = 0) {
    const slides = block.querySelectorAll('.carousel-slide');
    let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
    if (slideIndex >= slides.length) realSlideIndex = 0;
    const activeSlide = slides[realSlideIndex];

    activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
    block.querySelector('.carousel-slides').scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behavior: 'smooth',
    });
}

function bindCarouselEvents(block) {
    const slideIndicators = block.querySelector('.carousel-slide-indicators');
    if (!slideIndicators) return;

    slideIndicators.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const slideIndicator = e.currentTarget.parentElement;
            showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        });
    });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) updateActiveSlide(entry.target);
        });
    }, { threshold: 0.5 });
    block.querySelectorAll('.carousel-slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}

function createSlide(row, slideIndex) {
    const slide = document.createElement('li');
    slide.dataset.slideIndex = slideIndex;
    slide.classList.add('carousel-slide');

    const img = row.querySelector('img');
    if (img) {
        slide.append(img.cloneNode(true));
    }

    return slide;
}

export default async function decorate(block) {
    const rows = [...block.children];
    block.textContent = ''; // Clear block content

    const placeholders = await fetchPlaceholders();

    // Create main containers
    const leftPanel = document.createElement('div');
    leftPanel.className = 'showcase-left';

    const rightPanel = document.createElement('div');
    rightPanel.className = 'showcase-right';

    const iconGrid = document.createElement('div');
    iconGrid.className = 'icon-grid';

    const slidesWrapper = document.createElement('ul');
    slidesWrapper.className = 'carousel-slides';

    let carouselRows = [];

    rows.forEach((row) => {
        const type = row.children[0]?.textContent.trim().toLowerCase();

        if (type === 'icon') {
            const iconItem = document.createElement('div');
            iconItem.className = 'icon-grid-item';

            const iconImg = row.children[1]?.querySelector('img');
            const label = row.children[2]?.textContent.trim();

            if (iconImg) {
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'icon-wrapper';
                iconWrapper.append(iconImg.cloneNode(true));
                iconItem.append(iconWrapper);
            }

            if (label) {
                const labelEl = document.createElement('span');
                labelEl.className = 'icon-label';
                labelEl.textContent = label;
                iconItem.append(labelEl);
            }

            iconGrid.append(iconItem);
        } else if (type === 'separator') {
            const separator = document.createElement('div');
            separator.className = 'grid-separator';
            separator.textContent = row.children[1]?.textContent.trim() || '';
            iconGrid.append(separator);
        } else if (type === 'carousel') {
            carouselRows.push(row);
        }
    });

    leftPanel.append(iconGrid);

    // BUILD CAROUSEL
    if (carouselRows.length > 0) {
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';

        const isSingleSlide = carouselRows.length < 2;

        let slideIndicators;
        if (!isSingleSlide) {
            slideIndicators = document.createElement('ol');
            slideIndicators.classList.add('carousel-slide-indicators');
            rightPanel.append(slideIndicators);
        }

        carouselRows.forEach((row, idx) => {
            // Remove the "carousel" label div before creating slide
            row.children[0].remove();
            const slide = createSlide(row, idx);
            slidesWrapper.append(slide);

            if (slideIndicators) {
                const indicator = document.createElement('li');
                indicator.classList.add('carousel-slide-indicator');
                indicator.dataset.targetSlide = idx;
                indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1}"></button>`;
                slideIndicators.append(indicator);
            }
        });

        carouselContainer.append(slidesWrapper);
        rightPanel.append(carouselContainer);
    }

    block.append(leftPanel, rightPanel);

    if (carouselRows.length > 1) {
        bindCarouselEvents(block);
    }
}
