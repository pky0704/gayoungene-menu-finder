# 공식 사이트 현재 상태 — 2026-10-04

이 문서는 이전 PRD의 배포 상태보다 우선한다.

## 배포

- 검수 URL: https://gayoungene-official.vercel.app/
- 프로젝트: gayoungene-official
- 프로젝트 ID: prj_AUxnQFBeXUsOq4ypTuYNEwndTT1y
- 배포 ID: dpl_AMXqWxPPXfZPpHZnRJrNH3XpFjUj
- Vercel 상태: READY. 새 프로젝트의 production target에 임시 검수용 주소로 배포했다.
- 기존 gayoungene 팀에서 브라우저 대시보드의 Drop to Deploy를 사용했다.
- 수동 정적 업로드이며 Git 자동 배포는 연결하지 않았다. 향후 소스 수정은 별도 재배포가 필요하다.
- gayoungene.com과 Namecheap DNS는 아직 변경하지 않았다. 사용자 검수 후 실제 Vercel 안내값으로 연결한다.

## 경로

- /: 브랜드 스토리 중심 공식 홈페이지. 한국어와 8개 외국어.
- /menu: 기존 메뉴 코드와 데이터를 재사용한 안내·추천.
- /prepay: 기존 한국어 선결제 서비스 https://gayoungene-prepay.vercel.app/ 로 307 연결.
- 기존 메뉴·선결제 운영 프로젝트와 QR URL은 유지했다.

## 검수

- 로컬 데이터·DOM 회귀 검사 통과.
- 홈/메뉴 9개 언어와 4개 화면 폭, 총 72개 화면에서 가로 넘침 검사 통과.
- 배포 환경에서 한국어 홈, 영어 전환, 메뉴 진입, 추천 3개, 직원용 한국어 안내 확인.
- /prepay에서 기존 신청 양식으로 이동 확인. 실제 신청·결제는 수행하지 않았다.
- 현재 디자인·내용은 사용자 검수 중이며 공식 도메인 연결은 미완료다.
