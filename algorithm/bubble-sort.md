# 버블정렬(bubble sort)

+ 오른쪽부터 왼쪽 방향으로 인접한 두 개의 숫자를 비교해서 교환하는 작업 반복
+ 정렬되는 모양이 물속에서 거품이 올라오는 모양과 비슷해서 버블이라고 부름
+ 버블 정렬은 1라운드에서 n-1회, 2라운드에서 n-2회, ... , n-1라운드에서 1회를 비교함
+ 시간복잡도: O(n^2)

```javascript
const bubbleSort = (array) => {
  let temp;
  for(let i = 0; i < array.length -1; i++) {
    for(let j = 0; j < array.length -1; j++) {
	  if(array[j] > array[j+1]) {
		temp = array[j];
		array[j] = array[j+1];
		array[j+1] = temp;
	  }
	}  
  }
  return array;
}
```

