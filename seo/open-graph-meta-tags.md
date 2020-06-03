# Open Graph Meta Tags

**Open Graph Meta Tags란?**

+ SNS에 공유할 때 URL이 표시되는 방식을 제어하는 코드
+ 최적화된 OG 태그로 공유된 콘텐츠를 보고 사람들이 클릭할 가능성이 높다. 

**Open Graph Meta Tags의 이점**

+ 소셜 미디어 피드에서 눈길을 끄는 콘텐츠를 만들 수 있다. 
+ 사람들에게 콘텐츠의 내용이 무엇인지 한번에 알려준다.
+ 소셜미디어이 콘텐츠가 무엇인지 알 수 있게 해주며, 이것은 검색을 통해 사이트의 가시성을 높이는걸 도와준다.

**og:title**

페이지의 타이틀

```html
<meta property="og:title" content="page title" />
```

+ 공유 가능한 모든 페이지에 추가한다.
+ 정확성, 가치, 클릭 가능성에 초점을 맞출 것
+ overflow를 방지하기 위해서 짧게 유지한다. 공식적인 지침은 없지만, 모바일은 40글자, 데스크탑은 60글자가 적절하다.
+ 사이트 이름 같은 걸 포함하지 말고 페이지의 title을 사용할 것

**og:url**

콘텐츠의 url

```html
<meta property="og:url" content="https://www.kokomu.jp" />
```

+ canonical url을 사용할 것. 모든 중복 url에서 유사한 모든 데이터를 통합하는데 도움이 된다.

**og:image**

소셜에 공유될 때 가장 큰 공간을 차지하기 때문에 아마도 open graph tag에서 가장 중요한 필수적인 요소이다.

```html
<meta property="og:images" content="image url" />
```

+ 공유 가능한 페이지를 위한 커스텀 이미지를 사용할 것
+ 나머지 페이지에서는 로고 또는 브랜드 이미지를 사용한다.
+ 최적의 선명도를 위해 1.91 : 1 비율과 1200 * 630의 최소 권장 사이즈 이미지를 사용한다.

**og:type**

공유할 개체의 유형, article이나 website등

```html
<meta property="og:type" content="article" />
```

+ article에는 article을 사용하고 나머지 페이지에는 website를 사용한다.
+ 해당되는 경우에는 유형에 대해 자세히 설명한다.

**og:description**

내용에 관한 간략한 설명

```html
<meta property="og:description" content="description" />
```

+ 제목을 보완하여 클릭할 가치가 있도록 만든다. 
+ meta description을 여기에 복사한다.
+ 짧게 유지한다. 페이스북은 2~4문장을 권장하지만 종종 잘린다. 

**og:locale**

내용의 언어를 정의한다. 영어(en-US)로 작성되지 않은 콘텐츠만 사용한다.