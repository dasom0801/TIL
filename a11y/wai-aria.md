# WAI-ARIA

> 참고: WAI-ARIA 사례집 <https://www.wah.or.kr:444/board/boardView.asp?brd_sn=5&brd_idx=1019>

### 1. WAI-ARIA 소개

1-1. WAI-ARAI란?

+ 웹의 가장 중요한 개념은 문서간의 연결 > 하이퍼텍스트

+ 웹의 성장으로 인해 더 이상 문서의 개념이 아닌 데스크탑 수준의 애플리케이션과 같은 사용자 경험을 요구하게 되었고 이런 요구를 충족시키기 위해 등장한 것이 리치 인터넷 애플리케이션(Rich Internet Applications, RIA) 

+ 스크린리더 등 보조기술을 사용하는 장애인이 RIA 기술로 제작된 웹 애플리케이션을 제대로 사용할 수 없는 문제.  

+ `<div>`나 `<span>`등 의미를 가지지 않는 요소로 특정 컴포넌트를 구현하는 경우 보조기기에서는 해당 컴포넌트의 기능을 명확하게 파악하기 어렵다.

+ W3C에서 웹 콘텐츠 및 웹 애플리케이션의 <u>접근성과 상호 운용성을 개선</u>하기 위해 발표한 기술 명세가 <u>WAI-ARIA(Web Asccessibility Initiaive - Web Accessible Rich Internet Applications)</u>

1-2. WAI-ARIA의 목적

+ 스크린리더 및 보조기기 등에서 접근성 및 상호 운영성을 향상시키기 위해 마크업에 역할(Role), 속성(Property), 상태(State) 정보를 추가할 수 있도록 지원.
+ 스크린리더 및 보조기기는 운영체제에서 제공하는 접근성 API를 통해 데스크탑 애플리케이션과 동일한 방법으로 자바스크립트 컨트롤을 인식하고 상호 작용을 하게 됨.
+ 사용자가 웹 애플리케이션을 사용할 때, 데스크탑 애플리케이션의 동작과 유사하게 인식하고 작동하기 때문에 보다 향상된 UX를 제공하게 된다. 
+ WAI-ARIA는 개발자의 의도가 보조 기술에 잘 전달될 수 있도록 요소나 컴포넌트에 누락된 의미 구조를 제공하는 것을 목적으로 한다.

### 2. ARIA Role & States and Properties 

+ WAI-ARIA의 다양한 기능을 사용하면 웹 애플리케이션의 접근성과 사용성 개선 가능
+ 콘텐츠에 따라 의미에 맞는 요소를 사용하는 대신 WAI-ARIA에서 제공하는 기능만으로 접근성 문제를 해결하는 것은 바람직하지 않음

2-1. Role

+ 역할(Role): 특정요소에 기능을 정의하는 것

+ 예) 버튼 컴포넌트를 `<a>`요소로 구현한 경우, 스크린리더에서는 버튼을 링크라고 읽어주기 때문에 사용자는 링크 용도로 이해하게 되고 혼란이 생긴다.  이때 `<a>`요소에 `role="button"`을 지정하면 스크린리더가 버튼으로 읽어주게되어 사용자는 컴포넌트의 정확한 용도를 이해하고 사용가능

  ```html
  <a herf="/" onclikc="playApp()" role="button">재생</a>
  ```

+ WAI-ARIA의 4가지 카테고리

  + Document Structure Role(문서구조 역할)
  + Abstract Role(추상 역할)
  + Landmark Role(랜드마크 역할)
  + Widget Role(위젯 역할)

2-2. Property 

+ 속성(Property): 요소가 기본적으로 갖고있는 특징이나 상황을 의미함

+ 폼 입력상자가 읽기 전용인지 필수 항목인지. 사용자 입력에 대해 자동 완성기능을 지원하는지 드래그가 가능한지. 팝업이 뜨는지 업데이트된 정보가 있는 지등 상황을 사용자가 인지할 수 있도록 함.

+ 예) `aria-required="true"`를 지정하면 보조기기에서 해당 항목이 필수 항목임을 알 수 있도록 제공할 수 있다. 

  ```html
  <input type="password" id="user-pw" aria-requred="true">
  ```

2-3. State

+ 상태(State): 요소의 현재 상태를 의미하며 상황의 변화에 따른 값을 갖는다. 

+ 메뉴 expanded, 콘텐츠 hidden 등

+ 예) 메뉴가 하위 메뉴를 포함하고 있는 경우, `aria-expanded` 속성을 사용하여 접힌 상태라면 `false` 펼쳐진 상태라면 `true`지정 가능

  ```html
  <ul role="tree">
      <li role="treeitem" aria-expanded="true">
      	<a>WAI-ARIA 소개</a>
          <ul role="group">
              <li role="treeitem" aria-expanded="false">
                  <a>WAI-ARIA란?</a>
              </li>
          </ul>
      </li>
  </ul>
  ```

### 3. How to Use (WAI-ARIA 작성 규칙)

3-1. 랜드마크와 HTML5

+ HTML5의 섹션관련 요소와 WAI-ARIA 규칙을 함께 사용할 경우 해당 기능이 무효화 되거나 충돌할 수 있으니 중복해서 사용하지 않도록 주의
+ `role="navigation"`: `<nav>`요소. 다른 페이지 또는 페이지 내 특정 영역으로 이동하는 링크 콘텐츠 영역으로 주로 메인 메뉴 및 서브 메뉴등에 사용
+ `role="main"`: `<main>` 요소. 본문의 주요 콘텐츠 영역으로 한 페이지 내에 1개만 사용 가능. 
+ `role="complementary"`: `<aside>` 요소. 주요 콘텐츠와 연관이 적은 의미있는 콘텐츠 영역으로 종종 사이드바로 표현 가능. 
+ `role="form"`: `<form>`요소. 폼과 관련된 요소의 모임을 표현하는 영역. 서버에 전송될 수 있는 콘텐츠를 포함할 수 있다.
+ `role="banner"`: 비슷한 의미로 `<header>` 요소를 사용할 수 있으나 `<header role="banner">`로 사용하였다면 한 페이지에서 한 개의 `<header>`요소만 사용하길 권장.
+ `role="contentinfo"`: 비슷한 의미로 `<footer>`요소를 사용할 수 있으나 `<footer role="contentinfo">`로 사용하였다면 한 페이지에서 한 개의 `<footer>`요소만 사용하길 권장.

3-2. HTML요소의 기능 변경 제한

+ ARIA 규칙을 이용하여 요소의 네이티브 의미를 변경하는 것은 바람직하지 않음

+ 예) `<h1>` 요소에 버튼 역할을 수행하도록 하고자 하면 `<h1>` 요소에 직접 role을 부여하기 보다 자식 요소로 의미에 맞는 `<button>` 요소를 추가하거나 중립적인 의미를 가지는 `<span>`등의 요소에 `role="button"`을 부여하여 추가하는 것을 권장

  ```html
  <h1>
      <span role="button" tabindex="0">버튼</span>
  </h1>
  ```

3-3. 키보드 사용 보장

+ 사용자와 상호작용이 필요한 대화형 UI인 경우 키보드로 접근 및 사용이 가능하도록 제공하여 한다. 
+ 키보드 포커스를 받지 못하는 HTML 요소에 tabindex 속성을 추가하여 키보드 포커스를 받을 수 있도록 함. 
+ tabindex 속성에 0을 지정하면 콘텐츠의 성형화 순서대로 키보드 포커스가 진입, 0보다 작은 값을 지정하면 키보드 포커스를 받지 못함

3-4. 숨김 콘텐츠

+ 보조기기에서는 `aria-hidden="true"`로 지정된 상태라면 의미적으로 숨겨진 콘텐츠로 인식함
+ `role="presentation"`으로 지정된 요소는 의미없이 단순히 가시적으로 전달하기 위한 요소로 인식함
+  숨김 콘텐츠에 대한 사용자의 접근을 차단하고자 할 경우 CSS는 `display: none` 으로 설정하고 `aria-hidden="true"`을 명시해야함

3-5. 레이블 제공

+ 레이블 제공을 위해 HTML의 `<label>`요소를 사용하는 것을 권장하며 `aria-label`, `aria-labelledby`등의 WAI-ARIA 관련 속성을 사용하여 레이블 제공 가능

### 4. Landmark Role

4-1. 랜드마크에 대해

+ 웹페이지에서 제공되는 콘텐츠 유형이 어떤 역할을 하는지 식별할 수 있도록 도와주는 표지판 기능
+ 기존 건너뛰기 링크의 발전된 모습, 콘텐츠 블록의 제목보다 명확한 영역 구분이 가능하다
+ 콘텐츠에 랜드마크를 할당하게 되면 스크린리더 사용자는 웹페이지 영역의 의미와 구조를 명확하게 이해할 수 있고 랜드마크를 탐색하는 핫키를 이용하여 문서의 주요 영역을 자유롭게 탐색 가능하다

4-2. 랜드마크 사용 방법

+ 콘텐츠를 포함하고 있는 컨테이너인 HTML요소에 role 속성을 사용하여 콘텐츠 역할을 지정한다.

  ```html
  <div class="container">
      <div role="banner">banner</div>
      <div role="navigation">
          navigation
      </div>
      <div role="main">
          <div role="application">application</div>
      </div>
  </div>
  ```

4-3. 랜드마크의 종류

+ application: 웹 애플리케이션(정적인 웹 콘텐츠와는 반대되는 개념, 특정 기능을 제공하는 경우를 의미함) 영역임을 선언.
+ banner: 사이트의 로고나 제목등을 포함하는 헤더 정보를 포함할 수 있는 영역. 브랜딩이나 사이트의 아이덴티티를 나타낼 수 있는 정보. `<header>`와 비슷한 역할. 
+ navigation: 웹 사이트의 내비게이션 영역으로 링크 모음을 포함할 수 있다. `<nav>`와 동일한 역할. 중복 사용하지 말 것. 여러개의 navigation role을 사용할 경우 `aria-label`을 같이 사용하여 어떤 내비게이션인지 이해할 수 있도록 제공해야 함
+ main: 메인 콘텐츠 영역. 웹 페이지 내에서 main role은 한 번만 선언 가능. `<main>`과 같은 역할. 중복해서 사용하지 말 것.
+ comlementary: 메인 콘텐츠를 보충할 수 있는 부가적인 내용을 담는 영역. 메인 콘텐츠에서 분리되어도 그 자체로 의미가 있음. `<aside>`와 동일
+ form: `<form>`을 의미. 
+ search: 검색을 위한 입력 폼 영역을 포함할 수 있다. 
+ contentinfo: 상위 문서의 메타데이터를 담을 수 있는 영역. 저작권 정보, 주소, 연락처, 개인정보 정책등의 내용을 포함. `<footer>`와 비슷한 역할

### 5. Live Region

5-1. Live Region

+ 동적인 변경이 있는 경우 사용자의 조작 없이 변경된 내용과 진행 상태를 알리기 위해 사용되는 속성

+ aria-live
  + off: 기본값, 업데이트 된 정보를 사용자에게 알리지 않음
  + polite: 사용자의 입력이 모두 끝나면 그때 업데이트 된 내용을 보조기기 사용자에게 전달
  + assertive: 업데이트 된 내용을 바로 전달

+ aria-atomic: DOM이 업데이트되었을 때 업데이트 된 부분만 알려줄 것인지 전체를 모두 알려줄 것인지를 설정

  + false: 기본값. 업데이트 된 내용을 포함하여 전체 내용을 모두 읽음
  + true: 업데이트 된 내용만 읽음

  ```html
  <div clss="container" aria-live="polite" aria-atomic="true">
      ...
  </div>
  ```

+ aria-busy: 업데이트가 진행 중인지 여부를 표현할 수 있음

  + false: 기본값. 업데이트 된 내용을 안내 함. 
  + true: 업데이트 된 내용이 있음을 안내하지 않음

  ```html
  <div class="container" aria-live="polite" aria-busy="true">
      ...
  </div>
  ```

+ aria-relevant: 요소 및 텍스트 등의 추가, 삭제 업데이트 정보를 알릴지 여부를 설정

  + additions text: 기본값. 요소가 추가되거나 콘텐츠가 변경되었을 때 안내
  + additions: 요소가 추가되었을 때 안내
  + removals: 요소가 삭제 되었을 때 안내.
  + text: 콘텐츠가 변경되었을 때 안내
  + all: 요소의 추가, 삭제, 콘텐치 변경시에 안내