/* ============================================================
   Agent Team Space — prototype app
   해시 라우팅 + 전체 리렌더 방식의 단순 SPA (프레임워크 없음)
   ============================================================ */

/* ---------- icons ---------- */

const I = (d, extra = '') =>
  `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}${extra}</svg>`;

const ICONS = {
  home: I('<path d="M3 10.6 12 3.5l9 7.1V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  skill: I('<path d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5L4.5 11 10 9z"/><path d="M18.5 4v3M17 5.5h3"/>'),
  agent: I('<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4.5V8M9 13.5h.01M15 13.5h.01M9.5 17h5"/><circle cx="12" cy="3.5" r="1.2"/>'),
  artifact: I('<path d="M4 7.5 12 3.5l8 4-8 4z"/><path d="m4 12 8 4 8-4M4 16.5l8 4 8-4"/>'),
  plugin: I('<path d="M9 3v4M15 3v4"/><rect x="6" y="7" width="12" height="7" rx="2"/><path d="M12 14v3a4 4 0 0 0 4 4h1"/>'),
  store: I('<path d="M4 8.5 5.5 4h13L20 8.5M4 8.5h16M4 8.5v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 18.5v-10"/><path d="M9.5 20v-6h5v6"/>'),
  members: I('<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0M16.5 5.3a3.2 3.2 0 0 1 0 6.2M18 20a6 6 0 0 0-2-4.5"/>'),
  settings: I('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3"/>'),
  search: I('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  chevron: I('<path d="m6 9 6 6 6-6"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  check: I('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  download: I('<path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M4 19.5h16"/>'),
  usecase: I('<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>'),
  info: I('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>'),
  bolt: I('<path d="M13.5 3 5 13.5h6L10.5 21 19 10.5h-6z"/>'),
  shield: I('<path d="M12 3.2 19.5 6v5.5c0 4.5-3 7.6-7.5 9.3-4.5-1.7-7.5-4.8-7.5-9.3V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
  share: I('<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.3 10.8 6.4-3.6M8.3 13.2l6.4 3.6"/>'),
  close: I('<path d="M6 6l12 12M18 6 6 18"/>'),
  star: I('<path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z"/>'),
  observe: I('<path d="M3 12s3.3-5.5 9-5.5S21 12 21 12s-3.3 5.5-9 5.5S3 12 3 12z"/><circle cx="12" cy="12" r="2.3"/>'),
  space: I('<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>'),
  logs: I('<path d="M4.5 5.5h15M4.5 10h15M4.5 14.5h9M4.5 19h6"/>'),
  chart: I('<path d="M4 19.5V4.5M4 19.5h16"/><path d="M8 16v-4M12 16V7.5M16 16v-6"/>'),
  cost: I('<circle cx="12" cy="12" r="8"/><path d="M12 7.5v9M14.2 9.8c-.5-.8-1.3-1.1-2.2-1.1-1.2 0-2.1.6-2.1 1.6 0 2.3 4.4 1.2 4.4 3.5 0 1.1-1 1.7-2.3 1.7-1 0-1.9-.4-2.3-1.2"/>'),
};

/* ---------- state ---------- */

const NAV = [
  { key: 'home', route: '#/home', label: '홈', icon: 'home' },
  { key: 'skills', route: '#/skills', label: '스킬', icon: 'skill' },
  { key: 'agents', route: '#/agents', label: '에이전트', icon: 'agent' },
  { key: 'artifacts', route: '#/artifacts', label: '아티팩트', icon: 'artifact' },
  { key: 'plugins', route: '#/plugins', label: '플러그인', icon: 'plugin' },
];

const ME = '이동현';   // 현재 로그인 사용자

const state = {
  authed: false,
  wsId: 'acme',
  theme: 'light',   // 기본은 라이트 — 상단바 토글로 다크 전환
  menu: null,       // 'ws' | 'user'
  modal: null,      // { item, target }
  drawer: null,     // { item, kind }
  toast: null,
  query: '',        // 리소스 목록 검색
  filter: 'all',    // 리소스 목록 필터
  mpTab: 'all',     // 마켓플레이스 타입 탭
  mpCat: 'all',     // 업무 영역
  mpSys: 'all',     // 연동 사내 시스템
  mpQuery: '',
  imported: {},     // { [wsId]: [marketId, ...] }
};

/* 스페이스 내부 화면들 — 이 밖(마켓플레이스·소개·다운로드·사용 케이스)에서는
   어떤 팀 스페이스도 선택되지 않은 상태로 봅니다. */
const SPACE_ROUTES = ['#/home', '#/skills', '#/agents', '#/artifacts', '#/plugins',
  '#/logs', '#/analytics', '#/costs', '#/members', '#/settings'];
const inSpace = () => SPACE_ROUTES.includes(route());

const ws = () => WORKSPACES.find((w) => w.id === state.wsId);
const isOrg = () => ws().type === 'org';
const res = (key) => (RESOURCES[state.wsId] || {})[key] || [];
const route = () => location.hash || (state.authed ? '#/home' : '#/intro');

/* ---------- helpers ---------- */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function toast(msg) {
  state.toast = msg;
  render();
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { state.toast = null; render(); }, 2400);
}

/* ============================================================
   Marketing pages (로그인 전)
   ============================================================ */

/* 주요 메뉴 정의.
   로그인 전에는 '홈'이 곧 소개 화면이고,
   로그인 후에는 홈(스페이스)과 소개가 서로 다른 화면이라 둘 다 노출합니다. */
function mainLinks() {
  const links = state.authed
    ? [['#/home', 'home', '홈'], ['#/intro', 'info', '소개']]
    : [['#/intro', 'home', '홈']];
  return links.concat([
    ['#/download', 'download', '다운로드'],
    ['#/usecases', 'usecase', '사용 케이스'],
  ]);
}

/* 앱 상단바용 — 아이콘만 */
function quickLinks() {
  const r = route();
  return mainLinks().map(([href, ic, label]) => `
    <a class="icon-btn ${r === href ? 'is-active' : ''}" href="${href}"
       title="${label}" aria-label="${label}">${ICONS[ic]}</a>`).join('');
}

/* 마켓플레이스 진입점.
   스페이스 안에서는 '밖으로 나가는' 동작이라 아이콘 + 문구로 크게 둡니다. */
function marketplaceLink(labeled) {
  const on = route().startsWith('#/marketplace');
  return labeled
    ? `<a class="btn btn--sm ${on ? 'btn--primary' : ''}" href="#/marketplace">${ICONS.store} 마켓플레이스</a>`
    : `<a class="icon-btn ${on ? 'is-active' : ''}" href="#/marketplace"
          title="마켓플레이스" aria-label="마켓플레이스">${ICONS.store}</a>`;
}

/* 비로그인 헤더용 — 아이콘 + 문구, 가운데 정렬 */
function centerLinks() {
  const r = route();
  const links = [...mainLinks(), ['#/marketplace', 'store', '마켓플레이스']];
  return links.map(([href, ic, label]) => `
    <a class="navlink ${r === href ? 'is-active' : ''}" href="${href}" aria-label="${label}">
      ${ICONS[ic]}<span>${label}</span>
    </a>`).join('');
}

function marketingNav() {
  return `
    <nav class="mkt-nav">
      <a href="#/intro" class="brand"><span class="brand__mark">◈</span> Agent Space</a>
      <div class="mkt-nav__center">${centerLinks()}</div>
      <div class="mkt-nav__right">
        <button class="btn btn--ghost btn--sm" data-action="theme">${state.theme === 'dark' ? '☾' : '☀'}</button>
        <button class="btn btn--sm" data-action="login">로그인</button>
        <button class="btn btn--primary btn--sm" data-action="login">무료로 시작</button>
      </div>
    </nav>`;
}

function pageIntro() {
  const features = [
    ['skill', '스킬', '반복 작업을 절차로 굳혀 두면 누구나 같은 품질로 실행합니다.'],
    ['agent', '에이전트', '스킬과 플러그인을 조합해 스스로 판단하고 일하는 실행 주체.'],
    ['artifact', '아티팩트', '에이전트가 만들어 낸 문서·대시보드·페이지를 팀과 공유합니다.'],
    ['plugin', '플러그인', 'Jira, Slack, Figma 등 실제 업무 도구에 에이전트를 연결합니다.'],
    ['share', '팀 스페이스', '조직 단위로 자산을 모으고 권한·검토 흐름을 관리합니다.'],
    ['shield', '개인 모드', '실험은 개인 스페이스에서. 검증되면 팀으로 승격시킵니다.'],
  ];
  return `
    <main class="mkt">
      <section class="hero">
        <span class="eyebrow"><b>NEW</b> 마켓플레이스에서 팀 스페이스로 바로 가져오기</span>
        <h1>팀의 에이전트를<br/>한곳에서 <em>만들고 나누기</em></h1>
        <p>스킬·에이전트·아티팩트·플러그인을 조직 단위로 모으고, 개인 실험은 개인 스페이스에서.
           검증된 것만 팀으로 올리세요.</p>
        <div class="hero__cta">
          ${state.authed
            ? `<a class="btn btn--primary btn--lg" href="#/home">내 스페이스로 가기</a>`
            : `<button class="btn btn--primary btn--lg" data-action="login">팀 스페이스 만들기</button>`}
          <a class="btn btn--lg" href="#/download">${ICONS.download} 다운로드</a>
        </div>
        <div class="hero__shot">
          <div class="shot__bar">
            <span class="shot__dot"></span><span class="shot__dot"></span><span class="shot__dot"></span>
          </div>
          <div class="shot__body">
            <div class="shot__side">
              <div class="shot__line is-on" style="width:70%"></div>
              <div class="shot__line" style="width:55%"></div>
              <div class="shot__line" style="width:62%"></div>
              <div class="shot__line" style="width:48%"></div>
              <div class="shot__line" style="width:58%"></div>
            </div>
            <div class="shot__main">
              ${Array.from({ length: 6 }, () => '<div class="shot__tile"></div>').join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="mkt-section">
        <div class="mkt-section__head">
          <h2>스페이스 하나에 팀의 자동화 자산 전부</h2>
          <p>흩어져 있던 프롬프트와 스크립트를 네 가지 형태로 정리합니다.</p>
        </div>
        <div class="grid-3">
          ${features.map(([ic, t, d]) => `
            <div class="card feature">
              <div class="feature__icon">${ICONS[ic]}</div>
              <h3>${t}</h3><p>${d}</p>
            </div>`).join('')}
        </div>
      </section>

      <section class="mkt-section">
        <div class="mkt-section__head">
          <h2>개인 모드와 조직 모드를 오가며</h2>
          <p>같은 화면에서 스페이스만 바꾸면 됩니다. 권한과 공개 범위는 스페이스가 알아서 구분합니다.</p>
        </div>
        <div class="grid-2">
          <div class="card">
            <span class="badge badge--muted">개인 모드</span>
            <h3 style="margin:10px 0 6px">부담 없이 실험</h3>
            <p class="muted" style="font-size:13.5px">나만 보이는 스페이스에서 스킬을 만들고 고칩니다.
              쓸 만해지면 한 번의 클릭으로 팀에 공유 요청.</p>
          </div>
          <div class="card">
            <span class="badge badge--info">조직 모드</span>
            <h3 style="margin:10px 0 6px">검토를 거쳐 공용 자산으로</h3>
            <p class="muted" style="font-size:13.5px">조직 공개·제한 공유·검토 대기 상태를 구분하고,
              멤버별 역할로 편집 권한을 나눕니다.</p>
          </div>
        </div>
      </section>

      <div class="cta-band">
        <h2>5분이면 첫 에이전트가 돌아갑니다</h2>
        <p>마켓플레이스에서 검증된 스킬을 가져와 바로 시작하세요.</p>
        <div class="row" style="justify-content:center">
          ${state.authed
            ? `<a class="btn btn--primary btn--lg" href="#/home">내 스페이스로 가기</a>`
            : `<button class="btn btn--primary btn--lg" data-action="login">시작하기</button>`}
          <a class="btn btn--lg" href="#/marketplace">마켓플레이스 둘러보기</a>
        </div>
      </div>
    </main>`;
}

function pageDownload() {
  const oses = [
    ['macOS', 'Apple Silicon · Intel', '.dmg · 84MB'],
    ['Windows', 'Windows 11 이상', '.exe · 96MB'],
    ['Linux', 'Debian · RPM · AppImage', '.deb · 88MB'],
    ['웹', '설치 없이 브라우저에서', 'app.agentspace.io'],
  ];
  return `
    <main class="mkt">
      <section class="hero" style="padding-bottom:34px">
        <h1 style="font-size:40px">데스크톱에서 더 빠르게</h1>
        <p>로컬 파일과 터미널까지 연결된 상태로 팀 스페이스의 스킬을 실행합니다.</p>
      </section>

      <div class="grid-4">
        ${oses.map(([os, sub, meta]) => `
          <div class="card dl-card">
            <div class="dl-card__os">${os}</div>
            <div class="faint">${sub}</div>
            <div class="faint">${meta}</div>
            <button class="btn btn--primary btn--sm" data-action="noop">${ICONS.download} 다운로드</button>
          </div>`).join('')}
      </div>

      <section class="mkt-section">
        <div class="mkt-section__head">
          <h2>CLI로 설치하기</h2>
          <p>CI나 서버에서는 커맨드라인으로 스페이스에 연결하세요.</p>
        </div>
        <div class="stack" style="gap:10px;max-width:640px">
          <div class="code">npm install -g @agentspace/cli</div>
          <div class="code">agentspace login
agentspace workspace use acme
agentspace skill run release-notes --pr 1842</div>
        </div>
      </section>

      <section class="mkt-section">
        <div class="mkt-section__head"><h2>시스템 요구사항</h2></div>
        <div class="grid-3">
          <div class="card"><h3>macOS 13+</h3><p class="muted" style="font-size:13px">메모리 8GB 이상 권장</p></div>
          <div class="card"><h3>Windows 11</h3><p class="muted" style="font-size:13px">WebView2 런타임 필요</p></div>
          <div class="card"><h3>Node 20+</h3><p class="muted" style="font-size:13px">CLI 사용 시</p></div>
        </div>
      </section>
    </main>`;
}

function pageUsecases() {
  const cases = [
    ['개발팀', '릴리스 노트와 PR 리뷰', '머지된 PR을 모아 고객 언어로 정리하고, 보안 가이드에 맞춰 변경 코드를 점검합니다.', ['릴리스 노트 작성', '보안 리뷰 체크리스트', 'GitHub 커넥터']],
    ['고객지원', '문의 분류와 1차 응대', '인입 티켓을 자동 분류하고 사내 문서를 근거로 답변 초안을 만듭니다.', ['고객 문의 분류', 'CS 1차 응대 에이전트', 'Slack 커넥터']],
    ['기획·PM', '스프린트 리포트', '이슈 트래커에서 진척을 모아 주간 리포트와 이월 목록을 자동 작성합니다.', ['스프린트 리포터', 'Jira 커넥터', '2026 Q3 로드맵']],
    ['디자인', '디자인 QA와 카피 톤', '구현 화면과 시안 차이를 짚고, 보이스 가이드에 맞춰 문구를 다듬습니다.', ['디자인 QA 체크', '카피 톤 교정', 'Figma 커넥터']],
    ['데이터', '쿼리 작성과 튜닝', '사내 스키마를 아는 도우미가 쿼리를 쓰고 느린 쿼리를 진단합니다.', ['SQL 쿼리 헬퍼', 'SQL 쿼리 튜너']],
    ['HR·운영', '온보딩 자동화', '신규 입사자에게 첫 주 안내를 대화형으로 제공하고 질문을 받습니다.', ['온보딩 가이드', '사내 위키 커넥터']],
  ];
  return `
    <main class="mkt">
      <section class="hero" style="padding-bottom:34px">
        <h1 style="font-size:40px">이렇게 쓰고 있습니다</h1>
        <p>팀마다 필요한 조합이 다릅니다. 자주 쓰이는 구성을 그대로 가져다 쓰세요.</p>
      </section>

      <div class="grid-2">
        ${cases.map(([team, title, desc, items], i) => `
          <div class="card usecase">
            <div class="usecase__num">${i + 1}</div>
            <div class="grow">
              <span class="badge badge--accent">${team}</span>
              <h3 style="margin-top:8px">${title}</h3>
              <p>${desc}</p>
              <div class="row" style="flex-wrap:wrap;gap:5px">
                ${items.map((it) => `<span class="tag">${it}</span>`).join('')}
              </div>
            </div>
          </div>`).join('')}
      </div>

      <div class="cta-band">
        <h2>우리 팀 구성으로 시작하기</h2>
        <p>마켓플레이스의 검증된 자산을 팀 스페이스로 바로 가져올 수 있습니다.</p>
        <div class="row" style="justify-content:center">
          <a class="btn btn--primary btn--lg" href="#/marketplace">마켓플레이스 열기</a>
          <button class="btn btn--lg" data-action="login">로그인</button>
        </div>
      </div>
    </main>`;
}

/* ============================================================
   App shell (로그인 후)
   ============================================================ */

function topbar() {
  const w = ws();
  const sel = inSpace();

  // 스페이스 안: 좌측은 스페이스 스위처
  // 스페이스 밖(마켓플레이스·소개·다운로드·사용 케이스): 팀과 무관한 전역 화면 → 브랜드만
  const left = sel ? `
    <div style="position:relative">
      <button class="ws-btn" data-action="menu" data-menu="ws">
        <span class="avatar ${w.type === 'personal' ? 'avatar--round' : ''}"
              style="${w.type === 'personal' ? 'background:var(--text-dim)' : ''}">${w.initial}</span>
        <span class="stack" style="line-height:1.25">
          <span class="ws-btn__name">${w.name}</span>
          <span class="ws-btn__sub">${w.sub}</span>
        </span>
        <span style="color:var(--text-faint)">${ICONS.chevron}</span>
      </button>
      ${state.menu === 'ws' ? wsMenu() : ''}
    </div>`
  : `
    <a href="#/home" class="brand" style="padding:0 6px">
      <span class="brand__mark">◈</span> Agent Space
    </a>
    <span class="badge badge--muted" style="margin-left:2px">전역</span>`;

  return `
    <header class="topbar">
      ${left}

      <div class="grow"></div>

      ${quickLinks()}
      ${sel ? '' : marketplaceLink(false)}
      <span class="navsep"></span>

      ${sel ? marketplaceLink(true) : `
        <div style="position:relative">
          <button class="btn btn--sm" data-action="menu" data-menu="ws">
            ${ICONS.space} 내 스페이스 ${ICONS.chevron}
          </button>
          ${state.menu === 'ws' ? wsMenu('right:0') : ''}
        </div>`}

      <button class="btn btn--ghost btn--sm" data-action="theme">${state.theme === 'dark' ? '☾' : '☀'}</button>

      <div style="position:relative">
        <button class="btn btn--ghost btn--sm" data-action="menu" data-menu="user" style="padding:0 4px">
          <span class="avatar avatar--round" style="background:var(--info)">이</span>
        </button>
        ${state.menu === 'user' ? userMenu() : ''}
      </div>
    </header>`;
}

function wsMenu(align = 'left:0') {
  const sel = inSpace();
  const item = (w) => `
    <button class="menu__item ${sel && w.id === state.wsId ? 'is-on' : ''}" data-action="ws" data-ws="${w.id}">
      <span class="avatar ${w.type === 'personal' ? 'avatar--round' : ''}"
            style="${w.type === 'personal' ? 'background:var(--text-dim)' : ''}">${w.initial}</span>
      <span class="stack grow" style="line-height:1.3">
        <span style="font-weight:600">${w.name}</span>
        <span class="faint">${w.sub} · ${w.plan}</span>
      </span>
      ${sel && w.id === state.wsId ? `<span style="color:var(--accent)">${ICONS.check}</span>` : ''}
    </button>`;
  return `
    <div class="menu" style="top:44px;${align}">
      ${sel ? '' : '<div class="menu__hint">스페이스를 선택하면 해당 스페이스 홈으로 이동합니다</div>'}
      <div class="menu__label">개인</div>
      ${WORKSPACES.filter((w) => w.type === 'personal').map(item).join('')}
      <div class="menu__label">조직</div>
      ${WORKSPACES.filter((w) => w.type === 'org').map(item).join('')}
      <div class="menu__sep"></div>
      <button class="menu__item" data-action="noop">${ICONS.plus} 새 조직 만들기</button>
      <button class="menu__item" data-action="noop">${ICONS.members} 초대 코드로 참여</button>
    </div>`;
}

function userMenu() {
  return `
    <div class="menu" style="top:40px;right:0;min-width:220px">
      <div class="menu__item" style="pointer-events:none">
        <span class="avatar avatar--round" style="background:var(--info)">이</span>
        <span class="stack" style="line-height:1.3">
          <span style="font-weight:600">이동현</span>
          <span class="faint">queellin@gmail.com</span>
        </span>
      </div>
      <div class="menu__sep"></div>
      <button class="menu__item" data-action="nav" data-route="#/settings">${ICONS.settings} 스페이스 설정</button>
      <button class="menu__item" data-action="noop">계정 · 결제</button>
      <div class="menu__sep"></div>
      <button class="menu__item" data-action="logout">로그아웃</button>
    </div>`;
}

function sidebar() {
  const r = route();
  const counts = { skills: res('skills').length, agents: res('agents').length, artifacts: res('artifacts').length, plugins: res('plugins').length };
  const item = (n) => `
    <a class="navitem ${r === n.route ? 'is-active' : ''}" href="${n.route}">
      ${ICONS[n.icon]}<span>${n.label}</span>
      ${counts[n.key] != null ? `<span class="navitem__count">${counts[n.key]}</span>` : ''}
    </a>`;
  const sub = (href, icon, label, count) => `
    <a class="navitem navitem--sub ${r === href ? 'is-active' : ''}" href="${href}">
      ${ICONS[icon]}<span>${label}</span>${count ? `<span class="navitem__count">${count}</span>` : ''}
    </a>`;

  return `
    <aside class="sidebar">
      ${NAV.map(item).join('')}

      <div class="sidebar__label">${ICONS.observe} 관측</div>
      ${sub('#/logs', 'logs', '실행 로그', '24h')}
      ${sub('#/analytics', 'chart', '사용 분석')}
      ${sub('#/costs', 'cost', '비용')}

      <div class="sidebar__label">${isOrg() ? '조직 관리' : '내 설정'}</div>
      ${isOrg() ? `<a class="navitem ${r === '#/members' ? 'is-active' : ''}" href="#/members">${ICONS.members}<span>멤버</span><span class="navitem__count">${ws().members}</span></a>` : ''}
      <a class="navitem ${r === '#/settings' ? 'is-active' : ''}" href="#/settings">${ICONS.settings}<span>설정</span></a>
      <div class="grow"></div>
      <div class="card" style="padding:12px;margin-top:12px">
        <div class="row" style="gap:6px;margin-bottom:6px">
          <span class="badge badge--accent">${ws().plan}</span>
        </div>
        <p class="faint" style="margin-bottom:10px">이번 달 실행 3,420 / 10,000회</p>
        <div style="height:5px;border-radius:3px;background:var(--bg-sunken);overflow:hidden">
          <div style="width:34%;height:100%;background:var(--accent)"></div>
        </div>
      </div>
    </aside>`;
}

/* ---------- 홈 ---------- */

function pageHome() {
  const w = ws();
  const all = ['skills', 'agents', 'artifacts', 'plugins'].map((k) => res(k));
  const total = all.reduce((a, b) => a + b.length, 0);
  const runs = all.flat().reduce((a, r) => a + (r.runs || 0), 0);
  const pending = all.flat().filter((r) => r.status === 'review').length;

  const stat = (k, v, d) => `<div class="card"><div class="stat__k">${k}</div><div class="stat__v">${v}</div><div class="stat__d">${d}</div></div>`;

  const recent = [];
  ['skills', 'agents', 'artifacts', 'plugins'].forEach((k) =>
    res(k).forEach((r, i) => recent.push({ r, k, i })));

  const quick = [
    ['skill', '스킬 만들기', '반복 작업을 절차로 정리'],
    ['agent', '에이전트 만들기', '스킬을 조합해 자동 실행'],
    ['store', '마켓플레이스에서 가져오기', '검증된 자산을 바로 설치'],
  ];

  return `
    <div class="page-head">
      <h1>${isOrg() ? `${w.name} 홈` : '개인 스페이스 홈'}</h1>
      <p>${isOrg()
        ? '팀이 함께 쓰는 스킬·에이전트·아티팩트·플러그인을 한곳에서 관리합니다.'
        : '나만 보이는 공간입니다. 검증된 자산은 팀 스페이스로 공유할 수 있습니다.'}</p>
    </div>

    <div class="stats">
      ${stat('전체 자산', total, `스킬 ${all[0].length} · 에이전트 ${all[1].length}`)}
      ${stat('이번 달 실행', runs.toLocaleString(), '지난달 대비 +18%')}
      ${stat(isOrg() ? '활성 멤버' : '연결된 도구', isOrg() ? w.members : res('plugins').length, isOrg() ? '최근 7일 기준' : '플러그인')}
      ${stat('검토 대기', pending, pending ? '승인이 필요합니다' : '대기 중 항목 없음')}
    </div>

    <div class="grid-2" style="align-items:start">
      <div class="card">
        <div class="spread" style="margin-bottom:12px">
          <h3 class="section-title">최근 활동</h3>
          <button class="btn btn--ghost btn--sm" data-action="noop">전체 보기</button>
        </div>
        ${(ACTIVITY[state.wsId] || []).map((a) => `
          <div class="act">
            <span class="avatar avatar--round" style="background:var(--bg-sunken);color:var(--text-dim)">${a.who[0]}</span>
            <span class="act__txt"><b>${a.who}</b>님이 ${a.what}</span>
            <span class="act__time">${a.when}</span>
          </div>`).join('')}
      </div>

      <div class="stack" style="gap:12px">
        <div class="card">
          <h3 class="section-title" style="margin-bottom:12px">빠른 시작</h3>
          <div class="stack" style="gap:8px">
            ${quick.map(([ic, t, d]) => `
              <button class="card card--hover" style="padding:11px" data-action="${ic === 'store' ? 'nav' : 'noop'}" data-route="#/marketplace">
                <div class="row">
                  <span class="res__icon">${ICONS[ic]}</span>
                  <span class="stack grow" style="text-align:left">
                    <span style="font-weight:600;font-size:13.5px">${t}</span>
                    <span class="faint">${d}</span>
                  </span>
                </div>
              </button>`).join('')}
          </div>
        </div>

        ${isOrg() ? orgSideCard() : personalSideCard()}
      </div>
    </div>

    <h3 class="section-title" style="margin:26px 0 12px">최근 업데이트된 자산</h3>
    <div class="res-grid">
      ${recent.slice(0, 6).map((x) => resCard(x.r, x.k, x.i)).join('')}
    </div>`;
}

function orgSideCard() {
  const pending = ['skills', 'agents', 'plugins'].flatMap((k) => res(k)).filter((r) => r.status === 'review');
  return `
    <div class="card">
      <h3 class="section-title" style="margin-bottom:12px">승인 대기</h3>
      ${pending.length ? pending.map((p) => `
        <div class="act">
          <span class="stack grow">
            <span class="act__txt" style="font-weight:600">${p.name}</span>
            <span class="faint">${p.owner || '멤버'} · 조직 공개 요청</span>
          </span>
          <span class="row" style="gap:6px">
            <button class="btn btn--sm" data-action="noop">보기</button>
            <button class="btn btn--primary btn--sm" data-action="noop">승인</button>
          </span>
        </div>`).join('')
      : '<p class="faint">대기 중인 요청이 없습니다.</p>'}
    </div>`;
}

function personalSideCard() {
  const picks = MARKET.filter((m) => m.featured).slice(0, 3);
  return `
    <div class="card">
      <div class="spread" style="margin-bottom:12px">
        <h3 class="section-title">추천</h3>
        <a class="btn btn--ghost btn--sm" href="#/marketplace">더 보기</a>
      </div>
      ${picks.map((m) => `
        <div class="act">
          <span class="stack grow">
            <span class="act__txt" style="font-weight:600">${m.name}</span>
            <span class="faint">${KIND_LABEL[m.kind]} · ${m.pub}</span>
          </span>
          <button class="btn btn--sm" data-action="install" data-id="${m.id}">가져오기</button>
        </div>`).join('')}
    </div>`;
}

/* ---------- 리소스 목록 ---------- */

const RES_META = {
  skills: { title: '스킬', icon: 'skill', desc: '반복 작업을 절차로 정리해 두면 누구나 같은 품질로 실행합니다.' },
  agents: { title: '에이전트', icon: 'agent', desc: '스킬과 플러그인을 조합해 스스로 판단하고 일하는 실행 주체.' },
  artifacts: { title: '아티팩트', icon: 'artifact', desc: '에이전트가 만들어 낸 문서·대시보드·페이지.' },
  plugins: { title: '플러그인', icon: 'plugin', desc: '외부 도구와 데이터에 에이전트를 연결합니다.' },
};

function resCard(r, kind, idx) {
  const vis = VISIBILITY_LABEL[r.visibility] || VISIBILITY_LABEL.private;
  const st = STATUS_LABEL[r.status] || STATUS_LABEL.active;
  return `
    <button class="card card--hover res" data-action="open" data-kind="${kind}" data-idx="${idx}">
      <div class="res__top">
        <span class="res__icon">${ICONS[RES_META[kind] ? RES_META[kind].icon : 'skill']}</span>
        <span class="stack grow">
          <span class="res__name">${esc(r.name)}</span>
          <span class="res__desc">${esc(r.desc)}</span>
        </span>
      </div>
      <div class="row" style="gap:5px;flex-wrap:wrap">
        ${(r.tags || []).map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="res__foot">
        <span class="badge ${st.cls}">${st.text}</span>
        ${isOrg() ? `<span class="badge ${vis.cls}">${vis.text}</span>` : ''}
        ${r.source === 'marketplace' ? `<span class="badge badge--accent">${ICONS.store} 가져옴</span>` : ''}
        <span class="grow"></span>
        <span class="res__meta">${r.source === 'marketplace'
          ? esc(r.publisher || '마켓플레이스') + ' 제공'
          : esc(r.owner || ME)} · ${r.updated}</span>
      </div>
    </button>`;
}

function pageList(kind) {
  const meta = RES_META[kind];
  const items = res(kind);
  const q = state.query.trim().toLowerCase();
  const filtered = items.filter((r) => {
    const okQ = !q || (r.name + r.desc + (r.tags || []).join('')).toLowerCase().includes(q);
    const okF =
      state.filter === 'all' ||
      (state.filter === 'mine' && (r.owner || ME) === ME) ||
      (state.filter === 'org' && r.visibility === 'org') ||
      (state.filter === 'review' && r.status === 'review');
    return okQ && okF;
  });

  // 직접 만든 것 / 마켓플레이스에서 선택해 가져온 것
  const made = filtered.filter((r) => r.source !== 'marketplace');
  const installed = filtered.filter((r) => r.source === 'marketplace');

  const chips = [
    ['all', '전체'],
    ['mine', '내가 만든'],
    ...(isOrg() ? [['org', '조직 공개'], ['review', '검토 대기']] : []),
  ];

  return `
    <div class="page-head spread" style="align-items:flex-start">
      <div>
        <h1>${meta.title}</h1>
        <p>${meta.desc}</p>
      </div>
      <div class="row">
        <a class="btn btn--sm" href="#/marketplace">${ICONS.store} 마켓에서 가져오기</a>
        <button class="btn btn--primary btn--sm" data-action="noop">${ICONS.plus} 새 ${meta.title}</button>
      </div>
    </div>

    <div class="toolbar">
      <label class="search">
        ${ICONS.search}
        <input id="res-q" placeholder="${meta.title} 검색" value="${esc(state.query)}" data-input="query"/>
      </label>
      ${chips.map(([k, t]) => `<button class="chip ${state.filter === k ? 'is-on' : ''}" data-action="filter" data-filter="${k}">${t}</button>`).join('')}
      <span class="grow"></span>
      <span class="faint">직접 만듦 ${made.length} · 가져옴 ${installed.length}</span>
    </div>

    ${filtered.length
      ? group('made', made, kind, items) + group('installed', installed, kind, items)
      : `<div class="empty">
           <h3>표시할 ${meta.title}이 없습니다</h3>
           <p>직접 만들거나 마켓플레이스에서 가져와 보세요.</p>
           <div class="row" style="justify-content:center">
             <button class="btn btn--primary btn--sm" data-action="noop">${ICONS.plus} 새 ${meta.title}</button>
             <a class="btn btn--sm" href="#/marketplace">마켓플레이스</a>
           </div>
         </div>`}`;
}

/* 제작한 것 / 마켓에서 선택한 것을 구분해 보여주는 섹션 */
function group(type, list, kind, all) {
  const title = RES_META[kind].title;
  const head = type === 'made'
    ? { icon: 'plus', label: `직접 만든 ${title}`, hint: '이 스페이스에서 작성했습니다' }
    : { icon: 'store', label: `마켓에서 가져온 ${title}`, hint: '마켓플레이스에서 선택해 설치했습니다' };

  if (!list.length) {
    // 한쪽만 비어 있을 때는 자리를 남겨 두어 두 갈래가 있다는 걸 드러냅니다
    if (type !== 'installed') return '';
    return `
      <div class="group">
        <div class="group__head">
          <span class="group__icon">${ICONS.store}</span>
          <span class="stack"><b>${head.label}</b><span class="faint">${head.hint}</span></span>
          <span class="grow"></span>
          <a class="btn btn--sm" href="#/marketplace">둘러보기</a>
        </div>
        <p class="faint" style="padding:2px 2px 6px">아직 가져온 ${title}이 없습니다.</p>
      </div>`;
  }

  return `
    <div class="group">
      <div class="group__head">
        <span class="group__icon">${ICONS[head.icon]}</span>
        <span class="stack">
          <b>${head.label} <span class="faint" style="font-weight:400">${list.length}</span></b>
          <span class="faint">${head.hint}</span>
        </span>
        <span class="grow"></span>
        ${type === 'made'
          ? `<button class="btn btn--sm" data-action="noop">${ICONS.plus} 새로 만들기</button>`
          : `<a class="btn btn--sm" href="#/marketplace">더 가져오기</a>`}
      </div>
      <div class="res-grid">${list.map((r) => resCard(r, kind, all.indexOf(r))).join('')}</div>
    </div>`;
}

/* ---------- 관측: 로그 · 분석 · 비용 ---------- */

/* 워크스페이스의 실제 자산에서 결정적으로 만들어 낸 실행 기록 */
function logRows() {
  const pool = [];
  ['skills', 'agents'].forEach((k) => res(k).forEach((r) => pool.push({ r, k })));
  if (!pool.length) return [];
  const times = ['오늘 09:41', '오늘 09:12', '오늘 08:57', '오늘 08:30', '오늘 07:58',
    '어제 18:40', '어제 17:22', '어제 15:03', '어제 11:47', '어제 09:05',
    '2일 전 16:20', '2일 전 10:11'];
  const actors = [ME, '김민준', '이서연', '박지훈', '최유진', '정해린'];
  return times.map((t, i) => {
    const x = pool[i % pool.length];
    const fail = i % 7 === 3;
    const warn = i % 5 === 2 && !fail;
    return {
      time: t,
      name: x.r.name,
      kind: RES_META[x.k].title,
      actor: isOrg() ? actors[i % actors.length] : ME,
      status: fail ? '실패' : warn ? '경고' : '성공',
      note: fail ? '타임아웃 (30s 초과)' : warn ? '재시도 1회 후 성공' : '',
      dur: (1.2 + (i % 9) * 0.7).toFixed(1) + 's',
      tokens: (3200 + i * 740).toLocaleString(),
    };
  });
}

function pageLogs() {
  const rows = logRows().filter((l) =>
    state.filter === 'all' ||
    (state.filter === 'fail' && l.status === '실패') ||
    (state.filter === 'warn' && l.status === '경고') ||
    (state.filter === 'ok' && l.status === '성공'));
  const badge = { 성공: 'badge--ok', 경고: 'badge--warn', 실패: 'badge--accent' };

  return `
    <div class="page-head spread" style="align-items:flex-start">
      <div>
        <h1>실행 로그</h1>
        <p>${ws().name}에서 실행된 스킬·에이전트의 최근 기록입니다.</p>
      </div>
      <div class="row">
        <button class="btn btn--sm" data-action="noop">CSV 내보내기</button>
        <button class="btn btn--sm" data-action="noop">실시간 보기</button>
      </div>
    </div>

    <div class="toolbar">
      ${[['all', '전체'], ['ok', '성공'], ['warn', '경고'], ['fail', '실패']]
        .map(([k, t]) => `<button class="chip ${state.filter === k ? 'is-on' : ''}" data-action="filter" data-filter="${k}">${t}</button>`).join('')}
      <span class="grow"></span>
      <span class="faint">최근 24시간 · ${rows.length}건</span>
    </div>

    <div class="card" style="padding:0;overflow-x:auto">
      <table class="table">
        <thead><tr><th>시각</th><th>대상</th><th>실행자</th><th>상태</th><th>소요</th><th>토큰</th></tr></thead>
        <tbody>
          ${rows.map((l) => `
            <tr>
              <td class="muted" style="white-space:nowrap">${l.time}</td>
              <td>
                <div class="stack">
                  <b>${esc(l.name)}</b>
                  <span class="faint">${l.kind}${l.note ? ' · ' + l.note : ''}</span>
                </div>
              </td>
              <td class="muted">${l.actor}</td>
              <td><span class="badge ${badge[l.status]}">${l.status}</span></td>
              <td class="muted">${l.dur}</td>
              <td class="muted">${l.tokens}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      ${rows.length ? '' : '<p class="faint" style="padding:22px;text-align:center">해당 조건의 기록이 없습니다.</p>'}
    </div>`;
}

function pageAnalytics() {
  const all = ['skills', 'agents'].flatMap((k) => res(k));
  const top = [...all].sort((a, b) => (b.runs || 0) - (a.runs || 0)).slice(0, 5);
  const max = Math.max(1, ...top.map((r) => r.runs || 0));
  const days = ['월', '화', '수', '목', '금', '토', '일', '월', '화', '수', '목', '금', '토', '일'];
  const series = days.map((_, i) => 30 + ((i * 37) % 71) + (i > 9 ? 24 : 0));
  const smax = Math.max(...series);

  return `
    <div class="page-head spread" style="align-items:flex-start">
      <div>
        <h1>사용 분석</h1>
        <p>어떤 자산이 실제로 쓰이고 있는지 확인합니다.</p>
      </div>
      <div class="row">
        ${['7일', '14일', '30일'].map((t, i) => `<button class="chip ${i === 1 ? 'is-on' : ''}" data-action="noop">${t}</button>`).join('')}
      </div>
    </div>

    <div class="stats">
      <div class="card"><div class="stat__k">총 실행</div><div class="stat__v">${series.reduce((a, b) => a + b, 0).toLocaleString()}</div><div class="stat__d">지난 기간 대비 +18%</div></div>
      <div class="card"><div class="stat__k">성공률</div><div class="stat__v">97.4%</div><div class="stat__d">실패 32건</div></div>
      <div class="card"><div class="stat__k">평균 소요</div><div class="stat__v">4.1s</div><div class="stat__d">P95 12.7s</div></div>
      <div class="card"><div class="stat__k">활성 자산</div><div class="stat__v">${all.filter((r) => (r.runs || 0) > 0).length}</div><div class="stat__d">전체 ${all.length}개 중</div></div>
    </div>

    <div class="grid-2" style="align-items:start">
      <div class="card">
        <h3 class="section-title" style="margin-bottom:14px">일별 실행량</h3>
        <div class="bars">
          ${series.map((v, i) => `
            <div class="bars__col" title="${days[i]}요일 ${v}회">
              <div class="bars__bar" style="height:${Math.round((v / smax) * 100)}%"></div>
              <span class="bars__x">${days[i]}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <h3 class="section-title" style="margin-bottom:14px">가장 많이 쓰인 자산</h3>
        ${top.map((r) => `
          <div class="rank">
            <div class="spread" style="margin-bottom:5px">
              <span class="truncate"><b style="font-size:13px">${esc(r.name)}</b>
                ${r.source === 'marketplace' ? '<span class="badge badge--accent" style="margin-left:4px">가져옴</span>' : ''}</span>
              <span class="faint">${(r.runs || 0).toLocaleString()}회</span>
            </div>
            <div class="rank__track"><div class="rank__fill" style="width:${Math.round(((r.runs || 0) / max) * 100)}%"></div></div>
          </div>`).join('')}
      </div>
    </div>`;
}

function pageCosts() {
  const rows = [
    ['에이전트 실행', 412.8, 62],
    ['스킬 실행', 168.4, 25],
    ['플러그인 호출', 58.2, 9],
    ['아티팩트 호스팅', 26.1, 4],
  ];
  const total = rows.reduce((a, r) => a + r[1], 0);
  return `
    <div class="page-head spread" style="align-items:flex-start">
      <div>
        <h1>비용</h1>
        <p>${isOrg() ? '조직 전체' : '개인 스페이스'}의 이번 달 사용 비용입니다.</p>
      </div>
      <button class="btn btn--sm" data-action="noop">예산 알림 설정</button>
    </div>

    <div class="stats">
      <div class="card"><div class="stat__k">이번 달 누적</div><div class="stat__v">$${total.toFixed(0)}</div><div class="stat__d">예산 $1,000의 ${Math.round(total / 10)}%</div></div>
      <div class="card"><div class="stat__k">일 평균</div><div class="stat__v">$${(total / 29).toFixed(1)}</div><div class="stat__d">최근 7일 기준</div></div>
      <div class="card"><div class="stat__k">예상 월말</div><div class="stat__v">$${(total * 1.34).toFixed(0)}</div><div class="stat__d">현재 추세 유지 시</div></div>
      <div class="card"><div class="stat__k">최다 사용</div><div class="stat__v" style="font-size:18px;padding-top:6px">${esc((res('agents')[0] || res('skills')[0] || { name: '-' }).name)}</div><div class="stat__d">단일 자산 기준</div></div>
    </div>

    <div class="card">
      <h3 class="section-title" style="margin-bottom:14px">항목별 비용</h3>
      ${rows.map(([label, amt, pct]) => `
        <div class="rank">
          <div class="spread" style="margin-bottom:5px">
            <b style="font-size:13px">${label}</b>
            <span class="faint">$${amt.toFixed(2)} · ${pct}%</span>
          </div>
          <div class="rank__track"><div class="rank__fill" style="width:${pct}%"></div></div>
        </div>`).join('')}
    </div>`;
}

/* ---------- 멤버 / 설정 ---------- */

function pageMembers() {
  const list = MEMBERS[state.wsId] || [];
  return `
    <div class="page-head spread" style="align-items:flex-start">
      <div>
        <h1>멤버</h1>
        <p>${ws().name}의 멤버와 역할을 관리합니다.</p>
      </div>
      <button class="btn btn--primary btn--sm" data-action="noop">${ICONS.plus} 멤버 초대</button>
    </div>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="table">
        <thead><tr><th>이름</th><th>역할</th><th>보유 자산</th><th>최근 활동</th><th></th></tr></thead>
        <tbody>
          ${list.map((m) => `
            <tr>
              <td>
                <div class="row">
                  <span class="avatar avatar--round" style="background:var(--bg-sunken);color:var(--text-dim)">${m.name[0]}</span>
                  <span class="stack"><b>${m.name}</b><span class="faint">${m.email}</span></span>
                </div>
              </td>
              <td><span class="badge ${m.role === '관리자' ? 'badge--accent' : 'badge--muted'}">${m.role}</span></td>
              <td>${m.items}</td>
              <td class="muted">${m.last}</td>
              <td style="text-align:right"><button class="btn btn--ghost btn--sm" data-action="noop">⋯</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function pageSettings() {
  const rows = isOrg()
    ? [
        ['스페이스 이름', ws().name],
        ['플랜', ws().plan],
        ['기본 공개 범위', '조직 공개'],
        ['마켓플레이스 설치', '관리자 승인 필요'],
        ['외부 공유', '허용 (링크 만료 7일)'],
        ['감사 로그', '90일 보관'],
      ]
    : [
        ['스페이스 이름', '개인 스페이스'],
        ['플랜', 'Free'],
        ['기본 공개 범위', '비공개'],
        ['마켓플레이스 설치', '자유'],
        ['팀 공유', '요청 시 관리자 승인'],
      ];
  return `
    <div class="page-head">
      <h1>설정</h1>
      <p>${isOrg() ? '조직 전체에 적용되는 정책입니다.' : '개인 스페이스 설정입니다.'}</p>
    </div>
    <div class="card" style="max-width:680px">
      ${rows.map(([k, v]) => `
        <div class="spread" style="padding:12px 0;border-bottom:1px solid var(--border)">
          <span class="stack"><b style="font-size:13.5px">${k}</b></span>
          <span class="row"><span class="muted">${v}</span><button class="btn btn--sm" data-action="noop">변경</button></span>
        </div>`).join('')}
      <div class="row" style="padding-top:14px">
        <button class="btn btn--sm" data-action="noop">스페이스 나가기</button>
      </div>
    </div>`;
}

/* ============================================================
   Marketplace
   ============================================================ */

function mpCard(m) {
  // 마켓플레이스에서는 선택된 스페이스가 없으므로, 어느 스페이스로든 가져왔으면 표시합니다
  const into = Object.keys(state.imported)
    .filter((id) => state.imported[id].includes(m.id))
    .map((id) => (WORKSPACES.find((w) => w.id === id) || {}).name);
  const installed = into.length > 0;
  return `
    <div class="card card--hover res">
      <div class="res__top">
        <span class="res__icon">${ICONS[m.kind === 'skill' ? 'skill' : m.kind === 'agent' ? 'agent' : 'plugin']}</span>
        <span class="stack grow">
          <span class="res__name">${esc(m.name)}</span>
          <span class="mp-card__pub">${esc(m.pub)} ${m.verified ? `<span class="badge badge--info" style="padding:0 5px">인증</span>` : ''}</span>
        </span>
        <span class="badge badge--muted">${KIND_LABEL[m.kind]}</span>
      </div>
      <p class="res__desc">${esc(m.desc)}</p>
      <div class="row" style="gap:5px;flex-wrap:wrap">
        <span class="badge badge--info">${(MP_CATEGORIES.find((c) => c.id === m.cat) || { label: '기타' }).label}</span>
        ${(m.sys || []).map((s) => {
          const o = MP_SYSTEMS.find((x) => x.id === s);
          return `<span class="tag tag--sys" title="연동 시스템">${o ? o.label.replace(/\(.*\)/, '') : s}</span>`;
        }).join('')}
      </div>
      <div class="res__foot">
        <span class="res__meta">★ ${m.rating}</span>
        <span class="res__meta">설치 ${m.installs}</span>
        <span class="res__meta">${m.price}</span>
        <span class="grow"></span>
        ${installed
          ? `<span class="badge badge--ok" title="${esc(into.join(', '))}">${ICONS.check} ${esc(into[0])}${into.length > 1 ? ` 외 ${into.length - 1}` : ''}</span>
             <button class="btn btn--sm" data-action="install" data-id="${m.id}">다른 스페이스로</button>`
          : `<button class="btn btn--sm btn--primary" data-action="install" data-id="${m.id}">가져오기</button>`}
      </div>
    </div>`;
}

function pageMarketplace() {
  const tabs = [['all', '전체'], ['skill', '스킬'], ['agent', '에이전트'], ['plugin', '플러그인']];
  const q = state.mpQuery.trim().toLowerCase();

  const byTabQuery = MARKET.filter((m) => {
    const okT = state.mpTab === 'all' || m.kind === state.mpTab;
    const okQ = !q || (m.name + m.desc + m.pub + m.tags.join('')).toLowerCase().includes(q);
    return okT && okQ;
  });
  const items = byTabQuery.filter((m) =>
    (state.mpCat === 'all' || m.cat === state.mpCat) &&
    (state.mpSys === 'all' || (m.sys || []).includes(state.mpSys)));

  // 각 필터 항목의 건수는 나머지 조건을 적용한 결과 기준으로 셉니다
  const catCount = (id) => byTabQuery.filter((m) =>
    (id === 'all' || m.cat === id) && (state.mpSys === 'all' || (m.sys || []).includes(state.mpSys))).length;
  const sysCount = (id) => byTabQuery.filter((m) =>
    (state.mpCat === 'all' || m.cat === state.mpCat) && (id === 'all' || (m.sys || []).includes(id))).length;

  const facet = (title, list, current, action, count) => `
    <div class="facet">
      <div class="facet__title">${title}</div>
      ${list.map((o) => {
        const n = count(o.id);
        return `
        <button class="facet__item ${current === o.id ? 'is-on' : ''} ${!n && o.id !== 'all' ? 'is-empty' : ''}"
                data-action="${action}" data-value="${o.id}">
          <span class="truncate">${o.label}</span>
          <span class="facet__n">${n}</span>
        </button>`;
      }).join('')}
    </div>`;

  const catLabel = (MP_CATEGORIES.find((c) => c.id === state.mpCat) || {}).label;
  const sysLabel = (MP_SYSTEMS.find((s) => s.id === state.mpSys) || {}).label;
  const hasFilter = state.mpCat !== 'all' || state.mpSys !== 'all';
  const featured = byTabQuery.filter((m) => m.featured);

  return `
    <div class="mp-hero">
      <h1>마켓플레이스</h1>
      <p>업무 영역과 연동 시스템으로 좁혀서 찾고, 개인 스페이스나 팀 스페이스로 가져오세요.</p>
      <label class="search">
        ${ICONS.search}
        <input id="mp-q" placeholder="예: 경비 정산, Jira, 회의록" value="${esc(state.mpQuery)}" data-input="mpQuery"/>
      </label>
    </div>

    <div class="tabs">
      ${tabs.map(([k, t]) => `<button class="tab ${state.mpTab === k ? 'is-active' : ''}" data-action="mptab" data-tab="${k}">${t}</button>`).join('')}
      <span class="grow"></span>
      ${state.authed ? '<span class="row faint" style="padding:0 6px">가져오기를 누르면 대상 스페이스를 고릅니다</span>' : ''}
    </div>

    <div class="mp-layout">
      <aside class="mp-rail">
        ${facet('업무 영역', MP_CATEGORIES, state.mpCat, 'mpcat', catCount)}
        ${facet('연동 시스템', MP_SYSTEMS, state.mpSys, 'mpsys', sysCount)}
      </aside>

      <div>
        <div class="toolbar">
          ${hasFilter ? `
            ${state.mpCat !== 'all' ? `<button class="chip is-on" data-action="mpcat" data-value="all">${catLabel} ${ICONS.close}</button>` : ''}
            ${state.mpSys !== 'all' ? `<button class="chip is-on" data-action="mpsys" data-value="all">${sysLabel} ${ICONS.close}</button>` : ''}
            <button class="btn btn--ghost btn--sm" data-action="mpreset">필터 초기화</button>` : ''}
          <span class="grow"></span>
          <span class="faint">${items.length}개</span>
        </div>

        ${state.mpTab === 'all' && !q && !hasFilter ? `
          <h3 class="section-title" style="margin-bottom:12px">${ICONS.bolt} 이번 주 추천</h3>
          <div class="res-grid" style="margin-bottom:26px">${featured.map(mpCard).join('')}</div>
          <h3 class="section-title" style="margin-bottom:12px">전체</h3>` : ''}

        ${items.length
          ? `<div class="res-grid">${items.map(mpCard).join('')}</div>`
          : `<div class="empty">
               <h3>조건에 맞는 항목이 없습니다</h3>
               <p>업무 영역이나 시스템 필터를 바꿔 보세요.</p>
               <div class="row" style="justify-content:center">
                 <button class="btn btn--sm" data-action="mpreset">필터 초기화</button>
               </div>
             </div>`}
      </div>
    </div>`;
}

/* ============================================================
   Overlays
   ============================================================ */

function installModal() {
  const m = MARKET.find((x) => x.id === state.modal.item);
  const target = state.modal.target;
  return `
    <div class="scrim" data-action="close-modal">
      <div class="modal" data-stop>
        <h2>${esc(m.name)} 가져오기</h2>
        <p class="modal__desc">${KIND_LABEL[m.kind]} · ${esc(m.pub)} · 어느 스페이스로 가져올까요?</p>
        ${WORKSPACES.map((w) => `
          <button class="pick ${target === w.id ? 'is-on' : ''}" data-action="pick" data-ws="${w.id}">
            <span class="avatar ${w.type === 'personal' ? 'avatar--round' : ''}"
                  style="${w.type === 'personal' ? 'background:var(--text-dim)' : ''}">${w.initial}</span>
            <span class="stack" style="line-height:1.3">
              <span style="font-weight:600">${w.name}</span>
              <span class="faint">${w.type === 'org'
                ? (w.role === 'admin' ? '관리자 · 바로 설치 가능' : '멤버 · 관리자 승인 필요')
                : '나만 사용'}</span>
            </span>
            <span class="pick__radio"></span>
          </button>`).join('')}
        <div class="modal__foot">
          <button class="btn" data-action="close-modal">취소</button>
          <button class="btn btn--primary" data-action="confirm-install">가져오기</button>
        </div>
      </div>
    </div>`;
}

function detailDrawer() {
  const { kind, idx } = state.drawer;
  const r = res(kind)[idx];
  if (!r) return '';
  const vis = VISIBILITY_LABEL[r.visibility] || VISIBILITY_LABEL.private;
  const st = STATUS_LABEL[r.status] || STATUS_LABEL.active;
  return `
    <div class="scrim" data-action="close-drawer" style="background:rgba(20,18,16,.24)"></div>
    <aside class="drawer" data-stop>
      <div class="drawer__head">
        <div class="spread" style="align-items:flex-start">
          <div class="row">
            <span class="res__icon">${ICONS[RES_META[kind].icon]}</span>
            <div class="stack">
              <h2 style="font-size:17px">${esc(r.name)}</h2>
              <span class="faint">${RES_META[kind].title} · ${r.owner || '나'} · ${r.updated}</span>
            </div>
          </div>
          <button class="btn btn--ghost btn--sm" data-action="close-drawer">${ICONS.close}</button>
        </div>
      </div>
      <div class="drawer__body">
        <p class="muted">${esc(r.desc)}</p>
        <dl class="kv">
          <dt>상태</dt><dd><span class="badge ${st.cls}">${st.text}</span></dd>
          <dt>공개 범위</dt><dd><span class="badge ${vis.cls}">${vis.text}</span></dd>
          <dt>실행 횟수</dt><dd>${(r.runs || 0).toLocaleString()}회</dd>
          <dt>출처</dt><dd>${r.source === 'marketplace' ? '마켓플레이스' : '직접 생성'}</dd>
          <dt>태그</dt><dd>${(r.tags || []).map((t) => `<span class="tag">${t}</span>`).join(' ')}</dd>
        </dl>
        <div>
          <h3 class="section-title" style="margin-bottom:8px">최근 실행</h3>
          <div class="card" style="padding:0 14px">
            ${['오늘 09:12 · 성공 · 4.2s', '어제 18:40 · 성공 · 3.8s', '어제 11:03 · 실패 · 타임아웃'].map((l) => `
              <div class="act"><span class="act__txt muted">${l}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="drawer__foot">
        <button class="btn btn--primary btn--block" data-action="noop">실행</button>
        <button class="btn" data-action="noop">편집</button>
        <button class="btn" data-action="noop">${ICONS.share}</button>
      </div>
    </aside>`;
}

/* ============================================================
   Render
   ============================================================ */

function render() {
  document.documentElement.dataset.theme = state.theme;
  const r = route();
  const root = document.getElementById('root');

  // 사이드바 없이 전체 폭을 쓰는 화면들
  const isMp = r.startsWith('#/marketplace');
  const isMkt = r === '#/download' || r === '#/usecases' || r === '#/intro';

  let html;
  if (!state.authed) {
    const body =
      r === '#/download' ? pageDownload()
      : r === '#/usecases' ? pageUsecases()
      : r === '#/marketplace' ? `<main class="mkt" style="padding-top:28px">${pageMarketplace()}</main>`
      : pageIntro();
    html = marketingNav() + body;
  } else if (isMkt) {
    // 로그인 상태에서도 다운로드 · 사용 케이스는 앱 상단바 아래에서 그대로 볼 수 있음
    html = `<div class="app app--wide">${topbar()}${
      r === '#/download' ? pageDownload() : r === '#/usecases' ? pageUsecases() : pageIntro()
    }</div>`;
  } else {
    const main =
      isMp ? pageMarketplace()
      : r === '#/skills' ? pageList('skills')
      : r === '#/agents' ? pageList('agents')
      : r === '#/artifacts' ? pageList('artifacts')
      : r === '#/plugins' ? pageList('plugins')
      : r === '#/logs' ? pageLogs()
      : r === '#/analytics' ? pageAnalytics()
      : r === '#/costs' ? pageCosts()
      : r === '#/members' ? (isOrg() ? pageMembers() : pageHome())
      : r === '#/settings' ? pageSettings()
      : pageHome();

    html = `
      <div class="app ${isMp ? 'app--wide' : ''}">
        ${topbar()}
        ${isMp ? '' : sidebar()}
        <main class="main" ${isMp ? 'style="margin:0 auto;width:100%"' : ''}>${main}</main>
      </div>`;
  }

  html += state.modal ? installModal() : '';
  html += state.drawer ? detailDrawer() : '';
  html += state.toast ? `<div class="toast">${ICONS.check} ${esc(state.toast)}</div>` : '';

  root.innerHTML = html;
  restoreFocus();
}

let focusRef = null;
function restoreFocus() {
  if (!focusRef) return;
  const el = document.getElementById(focusRef.id);
  if (el) { el.focus(); el.setSelectionRange(focusRef.pos, focusRef.pos); }
  focusRef = null;
}

/* ============================================================
   Events
   ============================================================ */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');

  // 메뉴 바깥 클릭 시 닫기
  if (state.menu && (!el || el.dataset.action !== 'menu') && !e.target.closest('.menu')) {
    state.menu = null;
    if (!el) return render();
  }
  if (!el) return;

  const a = el.dataset.action;

  switch (a) {
    case 'login':
      state.authed = true; location.hash = '#/home'; render(); break;
    case 'logout':
      state.authed = false; state.menu = null; location.hash = '#/intro'; render(); break;
    case 'theme':
      state.theme = state.theme === 'dark' ? 'light' : 'dark'; render(); break;
    case 'menu':
      state.menu = state.menu === el.dataset.menu ? null : el.dataset.menu; render(); break;
    case 'ws': {
      // 스페이스를 고르면 항상 해당 스페이스의 홈으로 이동합니다
      state.wsId = el.dataset.ws; state.menu = null; state.query = ''; state.filter = 'all';
      const wasHome = route() === '#/home';
      location.hash = '#/home';
      toast(`${ws().name} 홈으로 이동했습니다`);
      if (wasHome) render();   // 해시가 그대로면 hashchange가 안 뜨므로 직접 그립니다
      break;
    }
    case 'nav':
      location.hash = el.dataset.route; state.menu = null; render(); break;
    case 'filter':
      state.filter = el.dataset.filter; render(); break;
    case 'mptab':
      state.mpTab = el.dataset.tab; render(); break;
    case 'mpcat':
      state.mpCat = el.dataset.value; render(); break;
    case 'mpsys':
      state.mpSys = el.dataset.value; render(); break;
    case 'mpreset':
      state.mpCat = 'all'; state.mpSys = 'all'; render(); break;
    case 'open':
      state.drawer = { kind: el.dataset.kind, idx: +el.dataset.idx }; render(); break;
    case 'close-drawer':
      state.drawer = null; render(); break;
    case 'install':
      if (!state.authed) { state.authed = true; }
      state.modal = { item: el.dataset.id, target: state.wsId };
      render(); break;
    case 'pick':
      state.modal.target = el.dataset.ws; render(); break;
    case 'confirm-install': {
      const { item, target } = state.modal;
      const m = MARKET.find((x) => x.id === item);
      const w = WORKSPACES.find((x) => x.id === target);
      (state.imported[target] = state.imported[target] || []).push(item);
      state.modal = null;
      const needsApproval = w.type === 'org' && w.role !== 'admin';

      // 실제로 대상 스페이스의 '가져온' 목록에 추가 — 목록 화면에서 구분되어 보입니다
      const bucket = { skill: 'skills', agent: 'agents', plugin: 'plugins' }[m.kind];
      const store = (RESOURCES[target] = RESOURCES[target] || {});
      (store[bucket] = store[bucket] || []).unshift({
        name: m.name, desc: m.desc, updated: '방금', tags: m.tags,
        visibility: w.type === 'org' ? 'org' : 'private',
        status: needsApproval ? 'review' : 'active',
        runs: 0, owner: ME, source: 'marketplace', publisher: m.pub,
      });

      toast(needsApproval
        ? `${m.name} 설치 요청을 ${w.name} 관리자에게 보냈습니다`
        : `${m.name}을(를) ${w.name}에 가져왔습니다`);
      break;
    }
    case 'close-modal':
      // 모달 내부 클릭은 스크림까지 올라와도 닫지 않음
      if (e.target.closest('[data-stop]')) return;
      state.modal = null; render(); break;
    case 'noop':
      toast('프로토타입입니다 — 이 동작은 아직 연결되지 않았습니다'); break;
  }
});

document.addEventListener('input', (e) => {
  const key = e.target.dataset.input;
  if (!key) return;
  state[key] = e.target.value;
  focusRef = { id: e.target.id, pos: e.target.selectionStart };
  render();
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (state.modal) state.modal = null;
  else if (state.drawer) state.drawer = null;
  else if (state.menu) state.menu = null;
  else return;
  render();
});

window.addEventListener('hashchange', () => {
  state.menu = null; state.drawer = null; state.query = ''; state.filter = 'all';
  window.scrollTo(0, 0);
  render();
});

render();
