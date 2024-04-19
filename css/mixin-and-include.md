# @mixin 과 @include

- @mixin을 사용하면 스타일시트 전체에서 재사용할 수 있는 스타일을 정의할 수 있다.
  - mixin의 이름은 하이픈과 밑줄을 동일하게 취급한다. reset-list와 reset_list 모두 같은 믹스인.
- @include 로 minxin을 사용할 수 있다.

```scss
@mixin reset-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

@minin horizontal-list {
	@include reset-list;

	li {
		display: inline-block;
		margin: {
			left: -2px;
			right: 2em;
		}
	}
}

nav ul {
	@include horizontal-list;
}
```

### Arguments

- minxin은 인수를 받아서 호출할 때마다 동작을 정의할 수 있다.

```scss
@mixin text($color) {
	font-size: 20px;
	color: $color;
}

a {
	@include text(blue);
}
```

- 기본값을 정의하여 인수를 optional로 만들 수 있다.

```scss
@mixin replace-text($image, $x: 50%, $y: 50%) {
	text-indent: -99999em;
	overflow: hidden;
	text-align: left;

	background {
		image: $image;
		repeat: no-repeat;
		position: $x $y;
	}
}

.mail-icon {
	@include replace-text(url('/images/main.svg'), 0);
}
```

- 위치가 아니라 이름으로도 인수를 전달할 수 있다. 모든 인수가 이름으로 전달 될 수 있기 때문에 이름을 바꿀 때 주의하자

```scss
@mixin square($size, $radius: 0) {
	width: $size;
	height: $size;

	@if $radius != 0 {
		border-radius: $radius;
	}
}

.avatar {
	@include square(100px, $radius: 4px);
}
```

- 믹스인 선언의 마지막 인수가 …로 끝나면 뒤에 추가되는 모든 인수가 배열로 전달 된다.

```scss
@mixin order($height, $selectors...) {
	@for $i from 0 to length($selectors) {
		#{nth($selectors, $i + 1)} {
			position: absolute;
			height: $height;
			margin-top: $i * $height;
		}
	}
}

@include order(150px, 'input.name', 'input.address', 'input.zip');
```

### Content Blocks

- 콘텐츠 블록이라고 하는 전체 스타일 블록을 받을 수 있다.

```scss
@mixin hover {
	&:not([disabled]):hover {
		@content;
	}
}

.button {
	border: 1px solid black;
	@include hover {
		border-width: 2px;
	}
}
```

- 콘텐츠 블록에 인수를 전달할 수 있다.

```scss
@mixin media($types...) {
	@each $type in $types {
		@media #{$type} {
			@content ($type);
		}
	}
}

@include media(screen, print) using ($type) {
	h1 {
		font-size: 40px;
		@if $type == print {
			font-family: Calluna;
		}
	}
}
```

참고:

https://sass-lang.com/documentation/at-rules/mixin/
