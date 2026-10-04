# 구현 안내

현재 구현은 [CURRENT.md](CURRENT.md), 실행·배포 명령은 [official/README.md](../../official/README.md)를 따른다.

기존 dist는 유지하고 `official/build.mjs`가 별도 출력 `official/build`를 생성한다. 루트는 브랜드 홈, `/menu`는 기존 메뉴 재사용, `/prepay`는 기존 서비스로 이동한다. 기존 두 Vercel 프로젝트를 덮어쓰지 않는다.

검증은 기존 데이터·DOM 회귀 → 공식 9개 언어 데이터 → 실제 브라우저 320/390/820/1280 화면·언어 전환·추천·직원용 표시·사진/링크 → Vercel 임시 배포 → 도메인 DNS/SSL 순서다. Vercel 팀 접근 오류를 해결하기 전에는 배포나 실제 DNS 값을 확인했다고 보고하지 않는다.
