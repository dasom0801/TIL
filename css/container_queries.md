# Container queries

- 요소의 컨테이너 크기에 따라 요소에 스타일을 적용할 수 있다.
  - 예) 컨테이너의 주변 컨텍스트에서 사용가능한 공간이 적은 경우 특정 요소를 숨기거나 더 작은 글꼴을 사용
- 컨테이너 쿼리는 미디어 쿼리의 대안. 미디어 쿼리는 뷰포트 크기 또는 기타 디바이스 특성에 따라 요소에 스타일을 적용한다.

### 컨테이너 쿼리 사용

- 컨테이너 쿼리를 사용하려면 요소에 컨테이너 컨텍스트를 선언하여 브라우저가 나중에 이 컨테이너의 치수를 쿼리할 수 있음을 알려줘야 한다.
- `container-type` 프로퍼티에 size, inline-size, normal을 사용한다.
  - size
    - 쿼리는 컨테이너의 inline과 block 치수를 기반으로 한다.
  - inline-size
    - 쿼리는 컨테이너의 inline 치수를 기반으로 한다.
  - normal
    - 컨테이너 크기 쿼리에 대한 쿼리 컨테이너는 아니지만 컨테이너 스타일 쿼리에 대한 쿼리 컨테이너로 남아있는다.

**<예제>**

```html
<div class="post">
	<div class="card">
		<h2>Card title</h2>
		<p>Card content</p>
	</div>
</div>
```

- container-type 프로퍼티로 containment context를 만든다.

```css
.card-container {
	container: card / inline-size;
}
```

- `@container` 를 사용하여 컨테이너 쿼리를 정의한다.

```css
/* card title을 위한 기본 heading 스타일 */
.card h2 {
	font-size: 1em;
}

/* 만약 컨테이너가 700px보다 크다면*/
@container (min-width: 700px) {
	.card h2 {
		font-size: 2em;
	}
}
```

### Containment contexts의 이름

- `container-name` 프로퍼티로 containment context에 이름을 지정할 수 있다.
- 이름을 지정하면 `@container` 쿼리에서 이 이름을 사용하여 특정 컨테이너를 대상으로 지정할 수 있다.
- 이름을 지정하지 않으면 containment context가 있는 가장 가까운 조상을 기준으로 스타일을 적용한다.

**<예제>**

```css
.post {
	container-type: inline-size;
	container-name: sidebar;
}

@container sidebar (min-width: 700px) {
	.card {
		font-size: 2em;
	}
}
```

### Container 축약

```css
.post {
	container: sidebar / inline-size;
}
```

### Container query 길이 단위

- 컨테이너 쿼리를 사용하여 컨테이너에 스타일을 적용할 때 컨테이너 쿼리 길이 단위를 사용할 수있다.
  - 쿼리 컨테이너의 치수를 기준으로 길이를 지정한다.
- 컨테이너에 상대적인 길이 단위를 사용하는 컴포넌트는 구체적인 길이 값을 다시 계산할 필요 없이 다른 컨테이너에서 유연하게 사용할 수 있다.
- cqw: 쿼리 컨테이너의 width의 1%
- cqh: 쿼리 컨테이너의 height의 1%
- cqi: 쿼리 컨테이너의 inline size의 1%
- cqb: 쿼리 컨테이너의 block size의 1%
- cqmin: cqi와 cqb 중 작은 값
- cqmax: cqi와 cqb중에서 큰 값

**<예제>**

```css
/* 컨테이너의 인라인 크기를 기준으로 제목의 글꼴 크기를 설정하는 cqi 단위를 사용 */
@container (min-width: 700px) {
	.card h2 {
		font-size: max(1.5em, 1.23em + 2cqi);
	}
}
```

### 컨테이너 쿼리 fallback

- 브라우저가 컨테이너 쿼리를 지원하지 않는 경우 grid와 flex를 사용하여 유사한 효과를 만들 수 있다.

```css
.card {
	display: grid;
	grid-template-columns: 2fr 1fr;
}

@media (max-width: 700px) {
	.card {
		grid-template-columns: 1fr;
	}
}
```

참고

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries

https://web.dev/blog/cq-stable?hl=ko
