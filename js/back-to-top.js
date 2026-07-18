const backToTopButton = document.getElementById('backToTop');
const SHOW_AFTER_PX = 600;
const DESKTOP_GAP_PX = 24;
const MOBILE_GAP_PX = 16;

function updateBackToTopVisibility() {
  if (!backToTopButton) return;
  backToTopButton.classList.toggle('is-visible', window.scrollY >= SHOW_AFTER_PX);
}

function updateBackToTopPosition() {
  if (!backToTopButton) return;

  if (window.innerWidth <= 639) {
    backToTopButton.style.right = `${MOBILE_GAP_PX}px`;
    return;
  }

  const pageTitle = document.querySelector('h1');
  if (!pageTitle) {
    backToTopButton.style.right = `${DESKTOP_GAP_PX}px`;
    return;
  }

  const titleRight = pageTitle.getBoundingClientRect().right;
  const buttonWidth = backToTopButton.offsetWidth || 44;
  const desiredButtonLeft = titleRight + DESKTOP_GAP_PX;
  const hasEnoughOuterSpace = desiredButtonLeft + buttonWidth + DESKTOP_GAP_PX <= window.innerWidth;

  backToTopButton.style.right = hasEnoughOuterSpace
    ? `${window.innerWidth - desiredButtonLeft - buttonWidth}px`
    : `${DESKTOP_GAP_PX}px`;
}

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
window.addEventListener('resize', updateBackToTopPosition);
window.addEventListener('load', updateBackToTopPosition, { once: true });

const pageTitle = document.querySelector('h1');
if (pageTitle && 'ResizeObserver' in window) {
  new ResizeObserver(updateBackToTopPosition).observe(pageTitle);
}

updateBackToTopVisibility();
updateBackToTopPosition();
