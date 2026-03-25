---
name: add-document
description: 문서(PDF) 다운로드 항목을 추가합니다.
user_invocable: true
---

# Add Document

사용자가 새 PDF 문서 항목을 추가하려고 합니다.

## 절차

1. 사용자에게 다음 정보를 확인합니다 (제공되지 않은 항목만):
   - **title**: 문서 제목
   - **description**: 설명
   - **filename**: 파일명 (예: guide.pdf)
   - **date**: 날짜 (기본값: 오늘)
   - **tags**: 태그 목록 (선택)

2. PDF 파일을 `assets/documents/` 디렉토리에 넣었는지 확인합니다.

3. `data/documents.json` 파일을 읽습니다.

4. 새 항목을 배열에 추가합니다:
   - `id`: `doc-` + 3자리 순번 (기존 항목 수 + 1)
   - `url`: `assets/documents/{filename}`
   - 나머지 필드는 사용자 입력값

5. JSON 파일을 저장합니다. (정렬 불필요 — 페이지에서 date 기준 최신순 자동 정렬됨)

6. 결과를 사용자에게 알려줍니다.
