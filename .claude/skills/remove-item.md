---
name: remove-item
description: 문서 또는 오픈소스 항목을 삭제합니다.
user_invocable: true
---

# Remove Item

사용자가 다운로드 항목을 삭제하려고 합니다.

## 절차

1. 사용자에게 삭제할 항목의 **id** 또는 **title**을 확인합니다.

2. `data/documents.json`과 `data/opensource.json`에서 해당 항목을 검색합니다.

3. 찾은 항목을 사용자에게 보여주고 삭제 확인을 받습니다.

4. 확인 후 해당 항목을 배열에서 제거하고 JSON 파일을 저장합니다.

5. 연관된 파일(`assets/` 내)도 삭제할지 사용자에게 확인합니다.
