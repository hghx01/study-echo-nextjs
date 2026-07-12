# PROJECT_STATUS

**작성일:** 2026-07-12

---

# 프로젝트 목표 및 구현 리스트

LLP API를 통한 공부 일기

- 일기 기록 페이지 [v] 
- API 요약 페이지 [v]
- 수정 페이지
- 저장된 기록 추적 페이지
- 퀴즈 페이지
- 메인 페이지

---

# 현재 브랜치 현황

| Branch               | 상태                      | 세부 설명
| -------------------- | --------------------------| -------------------------------------------------------------------------------
| main                 | Gemini API 기능 완료      | 일기 입력 + 요약 페이지까지 스크래칭
| feat-design          | UI/디자인 작업 진행 중 [x]| src/components/ui 폴더와 파일까지만 만들어 놓음
| feature/api-summary  | main으로 Merge 완료    [o]| api 연결을 위한 임시 브랜치
| feature/link-version | 미반영                 [x]| 학습용 리팩토링 / 입력 정보를 url로 넘기는 데에 있어 useRouter 대신 Link 태그

---

# 현재 Git Graph

```
feat-design
 ├── fix: global.css and prompts
 ├── feat: overall design
 └── feat: Green Cozy

main
 ├── feat: complete GEMINI API integration
 ├── Merge pull request #1 from hghx01/feature/api-summary
 ├── (feat: implementation summary api)
 ├── (feat: add skeleton for summary api)
 └── feat: implementation of main page and add query string page

feature/link-version
 └── refactor: Link tag instead of useRouter
```

---

# 메모

* `feat/design` 은 깃에는 여러 시도가 있는데, 깃허브에는 Green Cozy만 들어가 있음.
* 이어서 할 사항은 components/ui로 디자인을 위한 시도들, global, layout tsx
* 디자인 구조 잡히면 프롬프트 제약
