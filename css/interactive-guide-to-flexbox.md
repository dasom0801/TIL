# An Interactive Guide to Flexbox

Flexbox는 그룹을 행이나 열로 정렬하고, 이러한 항목의 분포와 정렬을 제어할 수 있는 기능을 제공한다. 항목을 늘리거나 줄일지, 여분의 공간을 어떻게 분배할지 등을 제어할 수 있다.

### Flex direction

`flex-direction: row` : 기본 축이 왼쪽에서 오른쪽으로 가로로 실행된다.

`flex-direction: column` : 기본 축이 위에 아래로 수직으로 실행된다.

### Alignment

`justify-content`: 기본 축을 따라 자식 요소의 배치를 변경할 수 있다.

- `flex-start` , `center` , `flex-end` , (`space-between` , `space-around` , `space-evenly` )

`align-items`: 교차 축을 따라 자식 요소의 배치를 변경할 수 있다.

- `flex-start` , `center` , `flex-end` ,(`stretch` , `baseline`)

`align-self`: 자식 요소에 적용하는 속성. 교차 축을 따라 특정 자식의 정렬을 변경할 수 있다.

- align-items와 같은 값을 적용할 수 있고, 동일하게 동작한다.

### 가상의 크기(Hypothetical size)

```html
<style>
	.flex-wrapper {
		display: flex;
	}
	.item {
		width: 2000px;
	}
</style>

<div class="flex-wrapper">
	<div class="item"></div>
</div>
```

- 부모인 .flex-wrapper 에 2000px 만큼의 공간이 없는 경우 자식인 .item의 크기를 줄여서 부모에 맞도록 한다.

### Growing and shrinking

- **flex-basis**
  - flex row에서 flex-basis는 width 같은 역할을 한다. flex column에서 flex-basis는 height 같은 역할을 한다.
  - 기본 축 방향으로 요소의 가상 크기를 설정할 수 있다.
- **flex-grow**
  - 기본적으로 flex 컨텍스트의 요소는 기본 축을 따라 최소한의 크기로 축소된다. 이로 인해 여유 공간이 생길 수 있다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/55df67a8-df3c-42b8-8de6-67966c8a4f96/Untitled.png)
  - flex-grow는 여유 공간을 어떻게 사용할지 지정할 수 있다.
  - flex-grow의 기본값은 0이다.
  - 여러 자식 요소에 flex-grow를 설정하면 남은 여유 공간을 값에 비례하여 자식들끼리 나눠 갖는다.
  ```css
  .item:nth-of-type(1) {
  	flex-grow: 3;
  }

  .item:nth-of-type(2) {
  	flex-grow: 2;
  }

  .item:nth-of-type(3) {
  	flex-grow: 1;
  }
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/eeea688c-c24c-4d0f-a018-0c8565444992/Untitled.png)
- **flex-shrink**
  - flex-basis와 width는 요소의 가상 크기를 설정한다. 컨테이너의 width가 자식 요소의 width보다 작은 경우 flexbox 알고리즘은 자식 요소의 크기를 축소 시키는데 이때 자식 요소의 비율을 항상 유지하면서 크기를 조정한다.
  - 요소의 크기를 비례적으로 축소하고 싶지 않을 때 flex-shrink를 사용한다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/299093f4-e403-4550-91d0-193110ffd452/Untitled.png)
  - 자식 요소가 250px + 250px이라 500px인데 컨테이너가 400px이라 width가 100px 모자른 경우, 100px 비율로 나눠서 축소한다.
- **prevent shrinking**
  - 컨테이너의 공간이 좁아져도 자식 요소가 축소되는 걸 원치 않는 경우 flex-shrink: 0 으로 설정한다.
  - flex-shrink가 0이면 flex-basis나 width가 최소값으로 취급된다.

![flex-shrink: 0 적용 안 했을 때](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/c767e4ed-2aa6-4fe0-9337-ec49716ceedd/a7e14620-c1a1-4a1a-be8e-df54c1aa95c0.png)

flex-shrink: 0 적용 안 했을 때

![flex-shrink: 0 적용 했을 때](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/722b0823-c9eb-4927-8cd1-c964c5211dc0/59af3f77-6db5-49f2-8a0b-fbf398d32691.png)

flex-shrink: 0 적용 했을 때

- flex-grow는 공간이 남았을 때 사용되고, flex-shrink는 공간이 부족할 때 사용된다. 한 번에 둘 중 하나의 속성만 활성화된다.

### 최소 사이즈 문제

- flexbox 알고리즘은 최소 사이즈 이하로 자식을 축소하지 않는다. flex-shrink를 적용해도 overflow가 발생해버린다.
- 텍스트가 포함된 요소의 경우 최소 너비는 끊어지지 않는 가장 긴 문자열의 길이이다.
- 자식 요소에 min-width: 0px을 설정하면 flexbox 알고리즘은 기본 최소 너비를 덮어쓰도록 지시한다. ⇒ 요소가 필요한 만큼 축소 될 수 있다.
- 텍스트가 포함된 요소에 min-width: 0px을 지정하면 화면이 깨질 수 있다. 사용할 때 주의해야한다.

### Gaps

- gap은 flex 요소들 간의 공간을 만들어낸다.
- margin: auto는 컨테이너에 존재하는 여백을 요소에 적용할 수 있다.

### Wrapping

- flex-wrap: wrap 을 사용하면 요소가 가상 크기 이하로 줄어들지 않는다.

출처:
https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
