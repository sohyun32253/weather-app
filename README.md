# 🌤️ Weather App

한국 주요 도시의 현재 날씨와 주간 예보를 확인할 수 있는 **Next.js 기반 날씨 애플리케이션**입니다.

도시 검색, 북마크, 상세 날씨 조회 기능을 제공하며, 날씨 상태에 따라 카드와 상세 페이지의 색상이 달라지도록 구현했습니다.

---

## 🔗 배포 및 저장소

- **배포 URL:** [Weather App 바로가기](weather-app-eight-lovat-22.vercel.app)

---

## 🖥️ 선택 플랫폼

- **Web**
- **Next.js App Router**

---

## 📸 Preview

<div align="center">

<img width="30%" alt="메인 화면" src="https://github.com/user-attachments/assets/d1623574-6fb2-4d47-9368-670598b7c0ca" />

<img width="30%" alt="검색 기능" src="https://github.com/user-attachments/assets/66b1ee98-a4c2-4653-901c-50612ac8797e" />

<img width="30%" alt="상세 페이지" src="https://github.com/user-attachments/assets/a803916e-6f4d-44fb-b08e-361819f1bb7c" />

</div>


---

## ✨ 주요 기능

### 1. 주요 도시 현재 날씨 조회

- 한국 주요 도시의 현재 날씨 제공
- 현재 기온, 날씨 상태, 습도 표시
- 날씨 코드를 사용자가 이해하기 쉬운 한글 문구로 변환
- 도시별 상세 페이지 이동

### 2. 도시 검색

- 입력값에 따라 도시 검색 결과를 실시간으로 제공
- 검색 결과 선택 시 해당 도시의 상세 페이지로 이동
- 검색 결과에서 북마크를 바로 추가하거나 삭제 가능
- 북마크한 도시와 다른 도시를 구분하여 표시

### 3. 도시 상세 날씨

- 현재 기온 및 날씨 상태 표시
- 최고 기온, 최저 기온, 습도 표시
- 기준 날짜와 시간 표시
- 주간 날씨 예보 제공
- 상세 페이지에서도 북마크 추가 및 삭제 가능

### 4. 날씨별 테마

날씨 상태에 따라 카드와 상세 페이지의 배경 테마가 달라지도록 구현했습니다.

- 맑음
- 대체로 맑음
- 흐림
- 안개
- 비
- 눈
- 천둥·번개

이를 통해 텍스트 정보뿐만 아니라 색상으로도 현재 날씨를 직관적으로 구분할 수 있도록 했습니다.

### 5. 반응형 UI

모바일 환경을 우선으로 설계한 **Mobile First 방식**으로 반응형 UI를 구현했습니다.

- 모바일 화면에서는 날씨 카드를 한 열의 세로 리스트로 배치
- 화면 크기가 커지면 카드 그리드의 열 개수를 확장
- 주간 예보는 모바일에서는 세로 리스트, 데스크톱에서는 카드 그리드로 표시
- 검색창, 북마크 버튼, 상세 페이지의 요소 크기와 간격을 화면 크기에 맞게 조정
- 모바일에서도 주요 정보와 터치 영역이 충분히 확보되도록 구성

Tailwind CSS의 반응형 클래스인 `md:`, `lg:`, `xl:`을 활용하여 하나의 컴포넌트가 화면 크기에 따라 자연스럽게 배치되도록 구현했습니다.

---

## ⭐ 추가 구현 기능

### 1. LocalStorage 기반 북마크

로그인 없이도 관심 도시를 저장할 수 있도록 `localStorage`를 활용해 북마크 기능을 구현했습니다.

#### 동작 방식

- 도시 카드의 북마크 버튼을 누르면 관심 도시 목록에 즉시 추가됩니다.
- 북마크 버튼을 한 번 더 누르면 관심 도시 목록에서 삭제됩니다.
- 검색 결과에서도 도시를 바로 북마크하거나 해제할 수 있습니다.
- 도시 상세 페이지에서도 동일하게 북마크를 관리할 수 있습니다.
- 새로고침 이후에도 저장된 북마크가 유지됩니다.

#### 구현 의도

날씨 확인 서비스는 사용자가 자주 확인하는 도시가 비교적 명확하다고 판단했습니다.

회원가입이나 로그인 기능이 없는 과제 환경에서도 사용자가 관심 도시를 계속 유지할 수 있도록 브라우저의 `localStorage`를 저장소로 선택했습니다.

북마크 로직은 `useBookmarks` 커스텀 훅으로 분리하여 메인 화면, 검색 결과, 상세 페이지에서 같은 로직을 재사용하도록 구성했습니다.

또한 같은 브라우저 탭에서 북마크 변경 사항이 즉시 반영되도록 커스텀 이벤트를 사용했습니다.

```ts
window.dispatchEvent(new Event("bookmarks-changed"));
```

각 컴포넌트는 해당 이벤트를 구독한 뒤 `localStorage`의 최신 데이터를 다시 읽어 상태를 동기화합니다.

### 2. Skeleton UI

날씨 데이터를 불러오는 동안 빈 화면 대신 실제 카드 구조와 유사한 Skeleton UI를 표시합니다.

이를 통해 다음과 같은 사용자 경험을 개선했습니다.

- 데이터가 로딩 중이라는 상태를 명확하게 전달
- 콘텐츠가 갑자기 나타나는 느낌 완화
- 로딩 전후의 레이아웃 변화 최소화

---

## 🛠️ 기술 스택

### Framework

- Next.js
- App Router
- React

### Language

- TypeScript

### Styling

- Tailwind CSS
- Mobile First 반응형 UI

### State Management

- React Hooks
  - `useState`
  - `useEffect`
  - `useCallback`
- Custom Hook
  - `useBookmarks`

별도의 전역 상태 관리 라이브러리는 사용하지 않았습니다.

현재 프로젝트에서 관리하는 클라이언트 상태의 규모가 크지 않다고 판단해 React 기본 훅을 사용했으며, 여러 컴포넌트에서 반복되는 북마크 로직은 커스텀 훅으로 분리했습니다.

### Data Persistence

- LocalStorage
- Custom Event

### API

- Open-Meteo API

### Deployment

- Vercel

---

## 📁 폴더 구조

```text
src
├── app
│   ├── city
│   │   └── [id]
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
│
├── components
│   ├── BookmarkButton.tsx
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   └── WeeklyForecast.tsx
│
├── data
│   └── cities.ts
│
├── hooks
│   └── useBookmarks.ts
│
├── lib
│   ├── bookmarks.ts
│   ├── weather.ts
│   ├── weatherCode.ts
│   └── weatherTheme.ts
│
└── types
    └── weather.ts
```

---

## 🏗️ 설계 의도

### 1. 컴포넌트 레이어

화면을 역할별 컴포넌트로 분리했습니다.

- `SearchBar`: 도시 검색 및 검색 결과 표시
- `WeatherCard`: 도시별 현재 날씨 정보 표시
- `BookmarkButton`: 북마크 추가·삭제 동작
- `WeeklyForecast`: 주간 날씨 예보 표시

북마크 버튼처럼 여러 화면에서 반복되는 UI와 동작을 공통 컴포넌트로 분리하여 메인 화면, 검색 결과, 상세 페이지에서 재사용했습니다.

### 2. 상태 레이어

컴포넌트 내부에서만 사용하는 상태는 React의 기본 훅으로 관리했습니다.

```tsx
const [query, setQuery] = useState("");
const [isOpen, setIsOpen] = useState(false);
```

북마크와 같이 여러 컴포넌트에서 공통으로 사용하는 로직은 `useBookmarks` 커스텀 훅으로 분리했습니다.

```tsx
const {
  bookmarks,
  isLoaded,
  toggleBookmark,
  isBookmarked,
} = useBookmarks();
```

이를 통해 각 컴포넌트가 북마크의 저장 및 동기화 방식을 직접 알 필요 없이 필요한 값과 함수만 사용할 수 있도록 했습니다.

### 3. 데이터 레이어

화면 컴포넌트가 API 호출 및 데이터 변환 로직을 직접 담당하지 않도록 관련 기능을 `lib` 폴더로 분리했습니다.

- 날씨 API 요청
- 현재 날씨 및 주간 예보 데이터 변환
- 날짜와 시간 포맷 변환
- 날씨 코드에 따른 한글 라벨 변환
- 날씨 코드에 따른 화면 테마 결정
- LocalStorage 북마크 조회 및 변경

이를 통해 UI 컴포넌트는 화면 표현에 집중하고, 데이터 처리 로직은 별도의 함수로 관리할 수 있도록 구성했습니다.

---

## 🔄 북마크 동작 흐름

```text
사용자가 북마크 버튼 클릭
        ↓
toggleBookmark(cityId) 실행
        ↓
LocalStorage의 북마크 목록 갱신
        ↓
bookmarks-changed 커스텀 이벤트 발생
        ↓
useBookmarks를 사용하는 컴포넌트가 최신 목록 조회
        ↓
관심 도시 목록·검색 결과·상세 페이지 상태 즉시 동기화
```

동일한 도시 ID를 기준으로 상태를 관리하기 때문에 어느 화면에서 북마크를 변경하더라도 같은 도시의 북마크 상태가 함께 변경됩니다.

---

## ▶️ 실행 방법

### 1. 저장소 복제

```bash
git clone 깃허브_저장소_URL
```

### 2. 프로젝트 폴더 이동

```bash
cd weather-app
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 브라우저 접속

```text
http://localhost:3000
```

---

## 📜 사용 가능한 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# ESLint 검사
npm run lint
```

---

## 🤖 AI 도구 활용

프로젝트 개발 과정에서 AI 도구를 보조적으로 사용했습니다.

### 사용 도구

- Cursor
- ChatGPT

### 활용 범위

- 반복적인 UI 코드 작성 보조
- API 데이터 구조 확인 및 연동 과정 보조
- TypeScript 타입 오류 원인 확인
- 컴포넌트 분리 및 코드 구조 검토
- 북마크 상태 동기화 방식 검토
- 반응형 UI 및 Tailwind CSS 클래스 작성 보조
- 오류 발생 시 원인 후보 확인

AI가 생성한 코드를 그대로 적용하지 않고 다음 과정을 거쳐 사용했습니다.

1. 현재 프로젝트 구조와 요구사항에 맞는지 확인
2. 코드의 동작 방식 직접 분석
3. 타입과 데이터 흐름 검증
4. 브라우저에서 기능 테스트
5. 불필요하거나 중복된 코드 수정
6. 실제 UI에 맞게 스타일 재조정

최종적인 기능 구성, UI 방향, 컴포넌트 분리 및 코드 적용 여부는 직접 판단하고 검증했습니다.

---

## 💡 구현 과정에서 중점적으로 고려한 부분

단순히 날씨 데이터를 표시하는 것에서 끝나지 않고, 사용자가 자주 확인하는 도시를 빠르게 관리할 수 있는 흐름을 만드는 데 중점을 두었습니다.

특히 메인 카드, 검색 결과, 상세 페이지처럼 서로 다른 위치에서 북마크를 변경해도 관심 도시 목록과 버튼 상태가 즉시 일치하도록 구현했습니다.

또한 모바일 환경에서 날씨 정보를 빠르게 확인하는 사용 흐름을 고려해 Mobile First 방식으로 화면을 설계했으며, 화면 크기에 따라 카드 목록과 주간 예보의 배치가 자연스럽게 변경되도록 반응형 UI를 구현했습니다.

Skeleton UI와 날씨별 테마를 추가하여 기능적인 완성도뿐만 아니라 로딩 경험과 시각적인 직관성도 함께 개선했습니다.
