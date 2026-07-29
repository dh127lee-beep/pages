/* ============================================================
   Mock data — 프로토타입용 더미 데이터
   실제 구현에서는 API 응답으로 대체됩니다.
   ============================================================ */

const WORKSPACES = [
  {
    id: 'personal',
    type: 'personal',
    name: '개인 스페이스',
    sub: '나만 사용',
    initial: '나',
    plan: 'Free',
  },
  {
    id: 'acme',
    type: 'org',
    name: 'Acme Corp',
    sub: '멤버 48명 · 관리자',
    initial: 'A',
    plan: 'Enterprise',
    role: 'admin',
    members: 48,
  },
  {
    id: 'design',
    type: 'org',
    name: '프로덕트 디자인팀',
    sub: '멤버 12명 · 멤버',
    initial: 'D',
    plan: 'Team',
    role: 'member',
    members: 12,
  },
  {
    id: 'growth',
    type: 'org',
    name: '그로스 마케팅실',
    sub: '멤버 23명 · 관리자',
    initial: 'G',
    plan: 'Team',
    role: 'admin',
    members: 23,
  },
];

/* 워크스페이스별 리소스 ------------------------------------- */

const RESOURCES = {
  personal: {
    skills: [
      { name: '주간 회고 정리', desc: '한 주 커밋과 이슈를 모아 회고 초안을 작성합니다.', updated: '2일 전', tags: ['문서', '개인'], visibility: 'private', status: 'active', runs: 24 },
      { name: 'PR 셀프 리뷰', desc: '푸시 전 변경사항을 스스로 점검하는 체크리스트 스킬.', updated: '5일 전', tags: ['코드'], visibility: 'private', status: 'active', runs: 61 },
      { name: '논문 요약기', desc: 'PDF를 읽고 핵심 주장·방법·한계를 3단락으로 요약.', updated: '2주 전', tags: ['리서치'], visibility: 'private', status: 'draft', runs: 8, source: 'marketplace', publisher: 'Paperlane' },
      { name: '회의록 정리', desc: '녹취를 결정사항·액션아이템·후속질문으로 나눕니다.', updated: '1주 전', tags: ['문서', '생산성'], visibility: 'private', status: 'active', runs: 33, source: 'marketplace', publisher: 'Anthropic' },
    ],
    agents: [
      { name: '리서치 어시스턴트', desc: '질문을 받아 웹·사내 문서를 훑고 근거와 함께 답합니다.', updated: '어제', tags: ['리서치'], visibility: 'private', status: 'active', runs: 132 },
      { name: '일정 정리 봇', desc: '캘린더와 할 일을 묶어 아침 브리핑을 만듭니다.', updated: '4일 전', tags: ['생산성'], visibility: 'private', status: 'active', runs: 47 },
    ],
    artifacts: [
      { name: '개인 대시보드', desc: '내 에이전트 실행 통계를 보여주는 단일 페이지.', updated: '3일 전', tags: ['대시보드'], visibility: 'private', status: 'active', runs: 0 },
      { name: '이력서 v3', desc: '경력 기술서 HTML 아티팩트.', updated: '3주 전', tags: ['문서'], visibility: 'private', status: 'active', runs: 0 },
    ],
    plugins: [
      { name: 'GitHub 커넥터', desc: '개인 저장소의 이슈·PR을 읽고 씁니다.', updated: '설치됨', tags: ['개발'], visibility: 'private', status: 'active', runs: 0, source: 'marketplace', publisher: 'GitHub' },
      { name: 'Notion 커넥터', desc: '개인 노션 워크스페이스 검색·작성.', updated: '설치됨', tags: ['문서'], visibility: 'private', status: 'active', runs: 0, source: 'marketplace', publisher: 'Notion' },
    ],
  },

  acme: {
    skills: [
      { name: '릴리스 노트 작성', desc: '머지된 PR을 고객 언어로 정리해 릴리스 노트를 만듭니다.', updated: '3시간 전', tags: ['릴리스', '공용'], visibility: 'org', status: 'active', runs: 312, owner: '김민준' },
      { name: '보안 리뷰 체크리스트', desc: '사내 보안 가이드에 맞춰 변경사항을 점검합니다.', updated: '어제', tags: ['보안'], visibility: 'org', status: 'active', runs: 189, owner: '이서연' },
      { name: '고객 문의 분류', desc: '인입 티켓을 카테고리·우선순위로 자동 분류.', updated: '2일 전', tags: ['CS'], visibility: 'org', status: 'review', runs: 74, owner: '박지훈' },
      { name: 'SQL 쿼리 헬퍼', desc: '사내 스키마를 알고 있는 쿼리 작성 도우미.', updated: '1주 전', tags: ['데이터'], visibility: 'org', status: 'active', runs: 421, owner: '이동현' },
      { name: '온보딩 가이드', desc: '신규 입사자 첫 주 안내를 대화형으로 진행합니다.', updated: '2주 전', tags: ['HR'], visibility: 'org', status: 'active', runs: 36, owner: '정해린' },
      { name: '회의록 정리', desc: '녹취를 결정사항·액션아이템·후속질문으로 나눕니다.', updated: '5일 전', tags: ['문서', '생산성'], visibility: 'org', status: 'active', runs: 268, owner: '정해린', source: 'marketplace', publisher: 'Anthropic' },
      { name: '보안 리뷰어', desc: 'OWASP 기준으로 변경 코드의 위험 지점을 짚어 줍니다.', updated: '2주 전', tags: ['보안', '코드'], visibility: 'restricted', status: 'review', runs: 41, owner: '이서연', source: 'marketplace', publisher: 'SecOps Guild' },
    ],
    agents: [
      { name: 'CS 1차 응대 에이전트', desc: '문의를 받아 FAQ·문서를 근거로 초안 답변을 작성합니다.', updated: '1시간 전', tags: ['CS', '운영중'], visibility: 'org', status: 'active', runs: 1284, owner: '박지훈' },
      { name: '배포 감시 에이전트', desc: '배포 후 지표를 지켜보고 이상 징후를 슬랙에 알립니다.', updated: '오늘', tags: ['SRE'], visibility: 'org', status: 'active', runs: 903, owner: '김민준' },
      { name: '경쟁사 모니터링', desc: '주요 경쟁사 릴리스·채용 공고를 매주 요약.', updated: '3일 전', tags: ['리서치'], visibility: 'org', status: 'active', runs: 52, owner: '최유진' },
      { name: '스프린트 리포터', desc: '스프린트 종료 시 진척과 이월 항목을 정리합니다.', updated: '5일 전', tags: ['PM'], visibility: 'restricted', status: 'draft', runs: 11, owner: '정해린' },
    ],
    artifacts: [
      { name: '팀 운영 대시보드', desc: '에이전트 실행량·비용·성공률을 한눈에.', updated: '오늘', tags: ['대시보드'], visibility: 'org', status: 'active', runs: 0, owner: '김민준' },
      { name: '2026 Q3 로드맵', desc: '분기 로드맵 인터랙티브 페이지.', updated: '2일 전', tags: ['기획'], visibility: 'org', status: 'active', runs: 0, owner: '정해린' },
      { name: 'API 문서 뷰어', desc: '내부 API 스펙을 탐색하는 정적 페이지.', updated: '1주 전', tags: ['개발'], visibility: 'org', status: 'active', runs: 0, owner: '이동현' },
    ],
    plugins: [
      { name: 'Jira 커넥터', desc: '이슈 생성·전환·검색을 에이전트에 연결합니다.', updated: '설치됨', tags: ['PM'], visibility: 'org', status: 'active', runs: 0, source: 'marketplace', publisher: 'Atlassian' },
      { name: 'Slack 커넥터', desc: '채널 읽기와 알림 발송.', updated: '설치됨', tags: ['협업'], visibility: 'org', status: 'active', runs: 0, source: 'marketplace', publisher: 'Slack' },
      { name: '사내 위키 커넥터', desc: '자체 개발한 사내 문서 검색 플러그인.', updated: '4일 전', tags: ['내부'], visibility: 'org', status: 'active', runs: 0 },
      { name: 'Datadog 커넥터', desc: '지표·알림 조회.', updated: '설치됨', tags: ['SRE'], visibility: 'restricted', status: 'review', runs: 0, source: 'marketplace', publisher: 'Datadog' },
    ],
  },

  design: {
    skills: [
      { name: '디자인 QA 체크', desc: '구현 화면과 시안의 간격·타이포 차이를 짚어냅니다.', updated: '어제', tags: ['QA'], visibility: 'org', status: 'active', runs: 96, owner: '한도윤' },
      { name: '카피 톤 교정', desc: '디자인 시스템 보이스 가이드에 맞춰 문구를 다듬습니다.', updated: '3일 전', tags: ['카피'], visibility: 'org', status: 'active', runs: 143, owner: '오세라' },
    ],
    agents: [
      { name: '리서치 노트 정리봇', desc: '사용자 인터뷰 녹취를 인사이트로 묶습니다.', updated: '2일 전', tags: ['UXR'], visibility: 'org', status: 'active', runs: 88, owner: '오세라' },
    ],
    artifacts: [
      { name: '디자인 시스템 스펙', desc: '토큰·컴포넌트 규격 문서 페이지.', updated: '오늘', tags: ['DS'], visibility: 'org', status: 'active', runs: 0, owner: '한도윤' },
      { name: '유저 인터뷰 요약 보드', desc: '최근 12건 인터뷰 인사이트 보드.', updated: '1주 전', tags: ['UXR'], visibility: 'org', status: 'active', runs: 0, owner: '오세라' },
    ],
    plugins: [
      { name: 'Figma 커넥터', desc: '시안 읽기와 컴포넌트 메타데이터 조회.', updated: '설치됨', tags: ['디자인'], visibility: 'org', status: 'active', runs: 0, source: 'marketplace', publisher: 'Figma' },
    ],
  },

  growth: {
    skills: [
      { name: '주간 퍼포먼스 요약', desc: '채널별 집행비·CAC·전환을 모아 주간 요약을 만듭니다.', updated: '2시간 전', tags: ['마케팅', '리포트'], visibility: 'org', status: 'active', runs: 264, owner: '이동현' },
      { name: '랜딩 카피 A/B 초안', desc: '소구점을 바꾼 카피 변형 6종을 만들어 테스트 후보로 제안.', updated: '어제', tags: ['카피', '실험'], visibility: 'org', status: 'active', runs: 178, owner: '윤가람' },
      { name: '광고 소재 가이드 점검', desc: '집행 전 소재가 브랜드·심의 가이드에 맞는지 확인합니다.', updated: '3일 전', tags: ['브랜드'], visibility: 'restricted', status: 'review', runs: 52, owner: '노지우' },
      { name: '광고 성과 주간 리포트', desc: '채널별 집행비와 전환을 모아 주간 성과 리포트를 만듭니다.', updated: '1주 전', tags: ['마케팅', '리포트'], visibility: 'org', status: 'active', runs: 96, owner: '윤가람', source: 'marketplace', publisher: 'Marketlens' },
    ],
    agents: [
      { name: '캠페인 모니터링 에이전트', desc: '집행 중 캠페인의 CPA 이탈을 감지해 슬랙으로 알립니다.', updated: '30분 전', tags: ['운영중'], visibility: 'org', status: 'active', runs: 1042, owner: '이동현' },
      { name: '고객 세그먼트 리서치', desc: '이탈 코호트를 뜯어 공통 행동 패턴을 정리합니다.', updated: '2일 전', tags: ['CRM', '리서치'], visibility: 'org', status: 'active', runs: 74, owner: '노지우' },
      { name: '캠페인 카피 에이전트', desc: '타깃과 소구점을 받아 채널별 카피 변형을 생성합니다.', updated: '5일 전', tags: ['카피'], visibility: 'org', status: 'active', runs: 213, owner: '윤가람', source: 'marketplace', publisher: 'Copyloop' },
    ],
    artifacts: [
      { name: '캠페인 성과 대시보드', desc: '채널·캠페인별 집행비와 전환을 한 화면에.', updated: '오늘', tags: ['대시보드'], visibility: 'org', status: 'active', runs: 0, owner: '이동현' },
      { name: '2026 상반기 그로스 리뷰', desc: '반기 실험 결과와 학습을 정리한 리뷰 페이지.', updated: '4일 전', tags: ['리뷰'], visibility: 'org', status: 'active', runs: 0, owner: '노지우' },
    ],
    plugins: [
      { name: '마케팅 자동화 커넥터', desc: '세그먼트 조회와 캠페인 발송 예약.', updated: '설치됨', tags: ['마케팅'], visibility: 'org', status: 'active', runs: 0, source: 'marketplace', publisher: 'Braze' },
      { name: 'CRM 커넥터', desc: '리드·상담·파이프라인 조회와 갱신.', updated: '설치됨', tags: ['영업'], visibility: 'org', status: 'active', runs: 0, source: 'marketplace', publisher: 'Salesforce' },
      { name: '광고 계정 통합 커넥터', desc: '자체 개발한 매체사 광고 계정 통합 조회 플러그인.', updated: '1주 전', tags: ['내부'], visibility: 'org', status: 'active', runs: 0 },
    ],
  },
};

/* 최근 활동 --------------------------------------------------- */

const ACTIVITY = {
  personal: [
    { who: '나', what: '<b>리서치 어시스턴트</b>를 12회 실행했습니다', when: '오늘' },
    { who: '나', what: '<b>논문 요약기</b>를 마켓플레이스에서 가져왔습니다', when: '2주 전' },
    { who: '나', what: '<b>PR 셀프 리뷰</b> 스킬을 수정했습니다', when: '5일 전' },
  ],
  acme: [
    { who: '김민준', what: '<b>릴리스 노트 작성</b> 스킬을 v2.1로 업데이트했습니다', when: '3시간 전' },
    { who: '박지훈', what: '<b>고객 문의 분류</b> 스킬의 조직 공개를 요청했습니다', when: '어제' },
    { who: '이서연', what: '마켓플레이스에서 <b>Datadog 커넥터</b>를 가져왔습니다', when: '어제' },
    { who: '최유진', what: '<b>경쟁사 모니터링</b> 에이전트를 실행했습니다', when: '3일 전' },
    { who: '정해린', what: '<b>2026 Q3 로드맵</b> 아티팩트를 공유했습니다', when: '3일 전' },
  ],
  design: [
    { who: '한도윤', what: '<b>디자인 시스템 스펙</b> 아티팩트를 갱신했습니다', when: '오늘' },
    { who: '오세라', what: '<b>카피 톤 교정</b> 스킬을 실행했습니다', when: '어제' },
  ],
  growth: [
    { who: '이동현', what: '<b>캠페인 모니터링 에이전트</b>가 CPA 이탈 3건을 알렸습니다', when: '30분 전' },
    { who: '윤가람', what: '<b>랜딩 카피 A/B 초안</b> 스킬을 실행했습니다', when: '오늘' },
    { who: '노지우', what: '<b>광고 소재 가이드 점검</b>의 조직 공개를 요청했습니다', when: '3일 전' },
    { who: '윤가람', what: '마켓플레이스에서 <b>캠페인 카피 에이전트</b>를 가져왔습니다', when: '5일 전' },
  ],
};

/* 멤버 -------------------------------------------------------- */

const MEMBERS = {
  acme: [
    { name: '이동현', email: 'queellin@gmail.com', role: '관리자', items: 3, last: '방금' },
    { name: '김민준', email: 'minjun@acme.io', role: '관리자', items: 6, last: '10분 전' },
    { name: '이서연', email: 'seoyeon@acme.io', role: '관리자', items: 4, last: '1시간 전' },
    { name: '박지훈', email: 'jihoon@acme.io', role: '에디터', items: 5, last: '오늘' },
    { name: '최유진', email: 'yujin@acme.io', role: '에디터', items: 3, last: '어제' },
    { name: '정해린', email: 'haerin@acme.io', role: '뷰어', items: 2, last: '3일 전' },
  ],
  design: [
    { name: '한도윤', email: 'doyun@acme.io', role: '관리자', items: 3, last: '오늘' },
    { name: '오세라', email: 'sera@acme.io', role: '에디터', items: 3, last: '어제' },
  ],
  growth: [
    { name: '이동현', email: 'queellin@gmail.com', role: '관리자', items: 3, last: '방금' },
    { name: '윤가람', email: 'garam@acme.io', role: '에디터', items: 4, last: '오늘' },
    { name: '노지우', email: 'jiwoo@acme.io', role: '에디터', items: 3, last: '3일 전' },
    { name: '서한별', email: 'hanbyul@acme.io', role: '뷰어', items: 0, last: '1주 전' },
  ],
};

/* 마켓플레이스 ------------------------------------------------ */

/* 업무 영역(카테고리) */
const MP_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'common', label: '전사 공통' },
  { id: 'dev', label: '개발·IT' },
  { id: 'marketing', label: '마케팅' },
  { id: 'sales', label: '영업' },
  { id: 'finance', label: '재무·회계' },
  { id: 'hr', label: '인사' },
  { id: 'cs', label: '고객지원' },
  { id: 'data', label: '데이터' },
  { id: 'design', label: '디자인' },
  { id: 'legal', label: '법무·총무' },
];

/* 연동되는 사내 시스템 */
const MP_SYSTEMS = [
  { id: 'all', label: '전체' },
  { id: 'groupware', label: '그룹웨어·전자결재' },
  { id: 'wiki', label: '사내 위키(Confluence)' },
  { id: 'jira', label: 'Jira' },
  { id: 'github', label: 'GitHub Enterprise' },
  { id: 'slack', label: 'Slack' },
  { id: 'figma', label: 'Figma' },
  { id: 'erp', label: 'SAP ERP' },
  { id: 'hris', label: '인사시스템(Workday)' },
  { id: 'crm', label: 'CRM(Salesforce)' },
  { id: 'dw', label: '사내 DW(Snowflake)' },
  { id: 'mms', label: '마케팅 자동화(Braze)' },
  { id: 'datadog', label: 'Datadog' },
];

const MARKET = [
  { id: 'm1', kind: 'skill', name: '릴리스 노트 자동화', pub: 'Anthropic', verified: true, installs: '24.1k', rating: 4.8, price: '무료', desc: '커밋과 PR을 읽어 사용자 언어로 릴리스 노트를 작성합니다.', tags: ['개발', '문서'], cat: 'dev', sys: ['github', 'jira', 'slack'], featured: true },
  { id: 'm2', kind: 'agent', name: 'CS 트리아지 에이전트', pub: 'Helpstack', verified: true, installs: '11.7k', rating: 4.6, price: '무료', desc: '인입 문의를 분류하고 1차 답변 초안까지 만들어 주는 에이전트.', tags: ['CS', '운영'], cat: 'cs', sys: ['slack', 'wiki'], featured: true },
  { id: 'm3', kind: 'plugin', name: 'Jira 커넥터', pub: 'Atlassian', verified: true, installs: '58.2k', rating: 4.7, price: '무료', desc: '이슈 검색·생성·상태 전환을 에이전트에서 바로 처리합니다.', tags: ['PM'], cat: 'dev', sys: ['jira'], featured: true },
  { id: 'm4', kind: 'skill', name: '보안 리뷰어', pub: 'SecOps Guild', verified: false, installs: '6.3k', rating: 4.4, price: '무료', desc: 'OWASP 기준으로 변경 코드의 위험 지점을 짚어 줍니다.', tags: ['보안', '코드'], cat: 'dev', sys: ['github'] },
  { id: 'm5', kind: 'plugin', name: 'Figma 커넥터', pub: 'Figma', verified: true, installs: '33.9k', rating: 4.5, price: '무료', desc: '시안·컴포넌트·토큰을 읽어 구현과 대조합니다.', tags: ['디자인'], cat: 'design', sys: ['figma'] },
  { id: 'm6', kind: 'agent', name: '데일리 스탠드업 봇', pub: 'Loopwork', verified: false, installs: '4.8k', rating: 4.2, price: '무료', desc: '매일 아침 팀 진척을 모아 요약 스레드를 남깁니다.', tags: ['PM', '협업'], cat: 'common', sys: ['slack', 'jira'] },
  { id: 'm7', kind: 'skill', name: 'SQL 쿼리 튜너', pub: 'Datacraft', verified: true, installs: '9.1k', rating: 4.6, price: '유료', desc: '느린 쿼리를 진단하고 인덱스·재작성안을 제안합니다.', tags: ['데이터'], cat: 'data', sys: ['dw'] },
  { id: 'm8', kind: 'plugin', name: 'Slack 커넥터', pub: 'Slack', verified: true, installs: '71.4k', rating: 4.9, price: '무료', desc: '채널 읽기, 메시지 발송, 스레드 응답.', tags: ['협업'], cat: 'common', sys: ['slack'] },
  { id: 'm9', kind: 'agent', name: '경쟁사 워치', pub: 'Marketlens', verified: false, installs: '2.6k', rating: 4.1, price: '유료', desc: '경쟁사 릴리스·채용·가격 변화를 주간 리포트로.', tags: ['리서치'], cat: 'marketing', sys: ['slack', 'wiki'] },
  { id: 'm10', kind: 'skill', name: '회의록 정리', pub: 'Anthropic', verified: true, installs: '42.7k', rating: 4.8, price: '무료', desc: '녹취를 결정사항·액션아이템·후속질문으로 나눕니다.', tags: ['문서', '생산성'], cat: 'common', sys: ['groupware', 'wiki'] },
  { id: 'm11', kind: 'plugin', name: 'Datadog 커넥터', pub: 'Datadog', verified: true, installs: '18.0k', rating: 4.5, price: '무료', desc: '지표·모니터·인시던트 조회.', tags: ['SRE'], cat: 'dev', sys: ['datadog'] },
  { id: 'm12', kind: 'agent', name: 'QA 회귀 러너', pub: 'Testworks', verified: false, installs: '3.4k', rating: 4.0, price: '무료', desc: '변경 영역을 추론해 회귀 시나리오를 골라 실행합니다.', tags: ['QA'], cat: 'dev', sys: ['github', 'jira'] },

  { id: 'm13', kind: 'skill', name: '광고 성과 주간 리포트', pub: 'Marketlens', verified: true, installs: '7.8k', rating: 4.5, price: '무료', desc: '채널별 집행비와 전환을 모아 주간 성과 리포트를 만듭니다.', tags: ['마케팅', '리포트'], cat: 'marketing', sys: ['dw', 'mms', 'slack'] },
  { id: 'm14', kind: 'agent', name: '캠페인 카피 에이전트', pub: 'Copyloop', verified: false, installs: '5.2k', rating: 4.3, price: '유료', desc: '타깃과 소구점을 받아 채널별 카피 변형을 생성합니다.', tags: ['마케팅', '카피'], cat: 'marketing', sys: ['mms', 'groupware'] },
  { id: 'm15', kind: 'plugin', name: '마케팅 자동화 커넥터', pub: 'Braze', verified: true, installs: '12.4k', rating: 4.4, price: '무료', desc: '세그먼트 조회와 캠페인 발송 예약.', tags: ['마케팅'], cat: 'marketing', sys: ['mms'] },

  { id: 'm16', kind: 'skill', name: '경비 정산 검토', pub: 'Ledgerly', verified: true, installs: '8.9k', rating: 4.6, price: '무료', desc: '영수증과 규정을 대조해 반려 사유를 정리합니다.', tags: ['재무', '규정'], cat: 'finance', sys: ['erp', 'groupware'], featured: true },
  { id: 'm17', kind: 'agent', name: '월마감 리포트 에이전트', pub: 'Ledgerly', verified: true, installs: '4.1k', rating: 4.4, price: '유료', desc: '전표 마감 상태를 점검하고 월마감 요약을 작성합니다.', tags: ['재무'], cat: 'finance', sys: ['erp', 'dw'] },
  { id: 'm18', kind: 'plugin', name: 'ERP 커넥터', pub: 'SAP', verified: true, installs: '21.3k', rating: 4.2, price: '무료', desc: '전표·구매요청·마스터 데이터 조회.', tags: ['재무', 'ERP'], cat: 'finance', sys: ['erp'] },

  { id: 'm19', kind: 'skill', name: '채용 공고 작성', pub: 'Peoplekit', verified: false, installs: '6.7k', rating: 4.3, price: '무료', desc: '직무 요건을 받아 톤을 맞춘 채용 공고 초안을 만듭니다.', tags: ['인사', '채용'], cat: 'hr', sys: ['hris', 'wiki'] },
  { id: 'm20', kind: 'agent', name: '온보딩 도우미', pub: 'Peoplekit', verified: true, installs: '9.5k', rating: 4.7, price: '무료', desc: '신규 입사자의 첫 2주 질문을 사내 문서 기준으로 답합니다.', tags: ['인사'], cat: 'hr', sys: ['hris', 'wiki', 'slack'] },
  { id: 'm21', kind: 'plugin', name: '인사시스템 커넥터', pub: 'Workday', verified: true, installs: '15.8k', rating: 4.3, price: '무료', desc: '조직도·휴가·평가 데이터 조회.', tags: ['인사'], cat: 'hr', sys: ['hris'] },

  { id: 'm22', kind: 'skill', name: '견적서 초안 작성', pub: 'Dealflow', verified: false, installs: '3.9k', rating: 4.1, price: '무료', desc: '상품 구성과 할인 정책을 반영한 견적 초안을 만듭니다.', tags: ['영업'], cat: 'sales', sys: ['crm', 'erp'] },
  { id: 'm23', kind: 'plugin', name: 'CRM 커넥터', pub: 'Salesforce', verified: true, installs: '44.6k', rating: 4.6, price: '무료', desc: '리드·상담·파이프라인 조회와 갱신.', tags: ['영업'], cat: 'sales', sys: ['crm'] },

  { id: 'm24', kind: 'skill', name: '계약서 리스크 검토', pub: 'Clausewise', verified: true, installs: '5.5k', rating: 4.5, price: '유료', desc: '표준 계약서와 대조해 독소 조항과 누락 항목을 표시합니다.', tags: ['법무'], cat: 'legal', sys: ['groupware', 'wiki'] },
  { id: 'm25', kind: 'plugin', name: '전자결재 커넥터', pub: '사내 IT', verified: true, installs: '사내', rating: 4.2, price: '무료', desc: '결재 상신·진행 상태 조회. 사내 배포 전용 플러그인입니다.', tags: ['총무', '내부'], cat: 'legal', sys: ['groupware'] },
  { id: 'm26', kind: 'plugin', name: '사내 위키 커넥터', pub: '사내 IT', verified: true, installs: '사내', rating: 4.4, price: '무료', desc: '사내 문서 검색과 인용. 권한 범위 내에서만 조회합니다.', tags: ['내부'], cat: 'common', sys: ['wiki'] },
];

/* 라벨 매핑 --------------------------------------------------- */

const KIND_LABEL = { skill: '스킬', agent: '에이전트', plugin: '플러그인', artifact: '아티팩트' };

const VISIBILITY_LABEL = {
  private: { text: '비공개', cls: 'badge--muted' },
  org: { text: '조직 공개', cls: 'badge--info' },
  restricted: { text: '제한 공유', cls: 'badge--warn' },
};

const STATUS_LABEL = {
  active: { text: '활성', cls: 'badge--ok' },
  draft: { text: '초안', cls: 'badge--muted' },
  review: { text: '검토 대기', cls: 'badge--warn' },
};
