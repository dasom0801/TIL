# Immutable.js

+ 객체는 Map

  ```javascript
  const obj = Map({
      foo: 1,
      inner: Map({
          bar: 10
      })
  })
  ```

+ 배열은 List

  ```javascript
  const arr = List([
      Map({ foo: 1}),
      Map({ bar: 2}),
  ])
  ```

+ 설정할땐 set

  ```javascript
  let nextObj = obj.set('foo', 5);
  // {foo: 5, 
  //	inner: { bar: 10}
  //  }
  ```

+ 값을 읽을땐 get

  ```javascript
  obj.get('foo'); //1
  arr.get(0); // {foo: 1}
  ```

+ 읽을 다음에 설정할 때는 update, 두번째 파라미터로 updater 함수가 들어감

  ```javascript
  nextObj = nextObj.update('foo', value => value + 1);
  // {foo: 6, 
  //	inner: { bar: 10}
  //  }
  ```

+ 내부에 있는걸 ~할땐 In을 붙인다

  ```javascript
  nextObj = obj.setIn(['inner', 'bar'], 20); 
  // {foo: 1, 
  //	inner: { bar: 20}
  //  } 
  let nextArr = arr.setIn([0, 'foo'], 10);
  // {foo: 10}
  ```

+ List 내장함수는 배열이랑 비슷하다

  ```javascript
  nextArr = arr.push(Map({qaz: 3}));
  // [{foo: 1}, {bar: 2}, {qaz: 3}]
  
  nextArr = arr.filter(item => item.get('foo') === 1);
  // [{foo: 1}]
  ```

+ delete로 key를 지울 수 있음

  ```javascript
  nextObj = nextObj.delete('foo');
  // { inner: {bar: 20}}
  nextArr = nextArr.delete(0);
  // []
  ```

+ 일반 자바스크립트 객체로 변환할땐 toJS();










