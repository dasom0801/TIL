### 1. 알고리즘이란?

##### 알고리즘? 

+ 어떤 문제를 해결하기 위한 절차의 집합

##### 컴퓨터 사이언스에서 알고리즘? 

+ 컴퓨터 프로그램이 어떤 문제를 해결하기 위해 필요한 명령들의 집합. 

+ 이미 있는 알고리즘에 대해 알고 있다면 수고를 덜하고 올바른 것을 적용해 프로그램을 더 빠르게 만들 수 있다.

+ 새로운 알고리즘을 만드는 것이나, 적확도와 효율을 계산하는 것도 중요하다.

##### 좋은 알고리즘이란?

+ 문제를 해결할 수 있고, 이를 효과적으로 하는 것.

##### 점근적분석(Asymptotic Analysis))

+ 알고리즘을 사용하는 언어와 하드웨어와 상관없이 비교할 수 있다.

+ 어떤 알고리즘이 좋은지 비교할 수 있다.

### 2. 이진 검색(Binary Search)

##### 이진 검색

+ 정렬된 테스트에서 원하는 항목을 찾기에 효율적인 알고리즘
+ 후보 범위가 한 항목으로 좁아질때까지 찾고자 하는 항목을 초함하고 있는 리스트를 반으로 나누고 나누는 과정을 계속 반복한다.

##### 의사코드(pseudo code)

(프로그래밍 언어의 특징들과 글을 혼합하여 표현함)

입력값: array라고 부르는 배열, array 요소의 개수: n, 검색 대상의 수: target, 결과값은 array속 targetd의 인덱스 값

1. min = 0, max = n -1
2. max < min이면 검색을 멈춘다. target이 array에 존재하지 않는다.
3. guess의 값은 max와 min의 평균값을 정수가 되도록 버림한 값
4. array[guess] 의 값이 target과 같다면 검색을 멈춘다. guess를 결과값으로 반환한다.
5. 추측값이 더 작다면 (array[guess] < target이라면), min = guess + 1
6. 추측값이 더 크다면 max = guess - 1
7. 2단계로 돌아간다.

##### 구현

```javascript
/* Returns either the index of the location in the array,
  or -1 if the array did not contain the targetValue */
var doSearch = function(array, targetValue) {
	var min = 0;
	var max = array.length - 1;
    var guess;
    
    while(min <= max) {
        guess = Math.floor((min + max) / 2);
        if (array[guess] === targetValue) { return guess; }
        else if (array[guess] < targetValue) { min = guess + 1; }
        else { max = guess - 1;}
    }


	return -1;
};

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
		41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = doSearch(primes, 73);
println("Found prime at index " + result);

Program.assertEqual(doSearch(primes, 73), 20);
```

