/**
 * Slide navigation + responsive scaling
 */
(function () {
  const body = document.body;
  const current = parseInt(body.dataset.current, 10);
  const total = parseInt(body.dataset.total, 10);

  /* === Responsive scale factor === */
  const REF_WIDTH = 1280;
  const page = document.querySelector('.slide-page');

  if (page) {
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentBoxSize
        ? entry.contentBoxSize[0].inlineSize
        : entry.contentRect.width;
      page.style.setProperty('--s', w / REF_WIDTH);
    });
    ro.observe(page);
  }

  /* === Navigation === */
  const nav = document.querySelector('.slide-nav');
  if (!nav) return;

  const prevDisabled = current <= 1 ? 'disabled' : '';
  const nextDisabled = current >= total ? 'disabled' : '';

  const digits = String(total).length;

  nav.innerHTML = `
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn" ${prevDisabled} title="이전 슬라이드">&#9664;</button>
      <span class="page-info">
        <input type="text" id="pageInput" value="${current}" maxlength="${digits}" style="width:${Math.max(3, digits + 1)}ch">
        <span class="page-sep">/</span>
        <span class="page-total">${total}</span>
      </span>
      <button class="nav-btn" id="nextBtn" ${nextDisabled} title="다음 슬라이드">&#9654;</button>
    </div>
  `;

  function go(page) {
    if (page < 1 || page > total) return;
    const padded = String(page).padStart(2, '0');
    window.location.href = `slide${padded}.html`;
  }

  document.getElementById('prevBtn').addEventListener('click', () => go(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => go(current + 1));

  const pageInput = document.getElementById('pageInput');
  pageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = parseInt(pageInput.value, 10);
      if (!isNaN(target)) go(target);
      else pageInput.value = current;
    }
    e.stopPropagation();
  });
  pageInput.addEventListener('focus', () => pageInput.select());
  pageInput.addEventListener('blur', () => { pageInput.value = current; });

  document.addEventListener('keydown', (e) => {
    if (document.activeElement === pageInput) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go(current - 1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      go(current + 1);
    }
  });

  const hint = document.querySelector('.keyboard-hint');
  if (hint) {
    const hideHint = () => {
      hint.classList.add('hidden');
      document.removeEventListener('keydown', hideHint);
    };
    document.addEventListener('keydown', hideHint);
    setTimeout(() => hint.classList.add('hidden'), 5000);
  }
})();
