(() => {
  const DATA_SOURCES = {
    documents: 'data/documents.json',
    opensource: 'data/opensource.json',
    bookmark: 'data/bookmark.json',
  };

  // Tab switching
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  function renderDocumentCard(item) {
    const tags = (item.tags || []).map((t) => `<span class="tag">${t}</span>`).join('');
    return `
      <div class="card">
        <div class="card-info">
          <div class="card-title">${item.title}</div>
          <div class="card-desc">${item.description}</div>
          <div class="card-meta">
            <span>${item.date}</span>
            ${tags}
          </div>
        </div>
        <a class="download-btn" href="${item.url}" download="${item.filename}">PDF 다운로드</a>
      </div>`;
  }

  function renderOpensourceCard(item) {
    const tags = (item.tags || []).map((t) => `<span class="tag">${t}</span>`).join('');
    const repo = item.repo ? `<a class="repo-link" href="${item.repo}" target="_blank">GitHub →</a>` : '';
    return `
      <div class="card">
        <div class="card-info">
          <div class="card-title">${item.title}</div>
          <div class="card-desc">${item.description}</div>
          <div class="card-meta">
            <span>v${item.version}</span>
            <span>${item.date}</span>
            ${tags}
            ${repo}
          </div>
        </div>
        <a class="download-btn" href="${item.url}" download="${item.filename}">ZIP 다운로드</a>
      </div>`;
  }

  function renderBookmarkCard(item) {
    const tags = (item.tags || []).map((t) => `<span class="tag">${t}</span>`).join('');
    return `
      <div class="card">
        <div class="card-info">
          <div class="card-title">${item.title}</div>
          <div class="card-meta">
            <span>${item.date}</span>
            ${tags}
          </div>
        </div>
        <a class="bookmark-link" href="${item.url}" target="_blank">바로가기 →</a>
      </div>`;
  }

  async function loadList(key, containerId, renderFn) {
    const container = document.getElementById(containerId);
    try {
      const res = await fetch(DATA_SOURCES[key]);
      const items = await res.json();
      items.sort((a, b) => b.date.localeCompare(a.date));
      if (items.length === 0) {
        container.innerHTML = '<div class="empty">등록된 항목이 없습니다.</div>';
        return;
      }
      container.innerHTML = items.map(renderFn).join('');
    } catch {
      container.innerHTML = '<div class="empty">데이터를 불러올 수 없습니다.</div>';
    }
  }

  loadList('documents', 'documents-list', renderDocumentCard);
  loadList('opensource', 'opensource-list', renderOpensourceCard);
  loadList('bookmark', 'bookmark-list', renderBookmarkCard);
})();
