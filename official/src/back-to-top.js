const labels = {
  ko: '맨 위로',
  en: 'Back to top',
  'zh-Hans': '返回顶部',
  ja: 'ページの先頭へ',
  vi: 'Về đầu trang',
  mn: 'Дээш очих',
  th: 'กลับด้านบน',
  ru: 'Наверх',
  id: 'Kembali ke atas',
  fr: 'Retour en haut',
};

const desktop = matchMedia('(min-width: 1024px)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const button = document.createElement('button');
button.type = 'button';
button.className = 'back-to-top';
button.hidden = true;
button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 11l7-7 7 7M12 4v16"/></svg><span aria-hidden="true">TOP</span>';
document.body.append(button);

function updateLabel() {
  const label = labels[document.documentElement.lang] || labels.en;
  button.setAttribute('aria-label', label);
  button.title = label;
}

function updateVisibility() {
  button.hidden = !desktop.matches || window.scrollY <= 400 || Boolean(document.querySelector('dialog[open]'));
}

button.addEventListener('click', () => {
  // Keep keyboard navigation at the destination when the floating button hides.
  document.querySelector('.header .brand, .site-header .brand')?.focus({preventScroll: true});
  window.scrollTo({top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
});

window.addEventListener('scroll', updateVisibility, {passive: true});
window.addEventListener('pageshow', updateVisibility);
desktop.addEventListener('change', updateVisibility);
new MutationObserver(() => {
  updateLabel();
  updateVisibility();
}).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
document.querySelectorAll('dialog').forEach(dialog => {
  new MutationObserver(updateVisibility).observe(dialog, {attributes: true, attributeFilter: ['open']});
});
updateLabel();
updateVisibility();
