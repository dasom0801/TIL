# Event Loop

## Call Stack

- 함수를 호출 하며 프로그램의 실행을 관리한다.
- 함수를 호출하면 새로운 실행 컨텍스트가 생성되어 호출 스택으로 푸시된다.
- 호출 스택에서 가장 위에있는 함수가 평가된다.
- 함수가 실행을 완료하면 실행 컨텍스트가 호출 스택에서 pop 된다.
- 자바스크립트는 한 번에 하나의 작업만 처리할 수 있으며, 한 작업이 너무 오래 걸리면 다른 작업은 처리할 수 없다. 실행이 차단 되어 프로그램이 멈춘다.

## Web APIs

- 브라우저가 활용하는 기능과 상호 작용할 수 있는 일련의 인터페이스를 제공한다.
- Web API는 기본적으로 자바스크립트 런타임과 브라우저 기능 사이의 가교 역할을 하며, 자바스크립트 자체의 기능을 넘어서는 정보에 액세스하고 기능을 사용할 수 있도록 해준다.
- DOM, fetch, setTimeout 등

### Callback-based APIs

```tsx
navigator.geolocation.getCurrentPostion(
	position => console.log(position), // success callback
	error =>. console.error(error) // error callback
)
```

- getCurrentPostion을 호출하면 새로운 실행 컨텍스트가 Call Stack으로 푸시된다.
- 콜백을 웹 API에 등록한 다음 브라우저로 작업을 오프로드. ⇒ Call Stack에서 함수가 사라지고 브라우저의 책임이 된다.
  (오프로드 - 컴퓨터 시스템에서 동일한 작업을 수행할 수 있는 장치가 여러 개 존재하는 경우, 비교적 작업량이 적게 할당되어 있는 장치에서 작업량이 많은 장치의 작업을 일부 받아서 처리하는 것)
- 작업이 백그라운드에서 실행되기 때문에 Call Stack은 다른 작업을 수행할 수 있다.
- 사용자가 위치 사용을 허용한 경우 API는 브라우저에서 데이터를 수신하고 성공 콜백을 사용하여 결과를 처리한다.
- 성공 콜백을 콜 스택에 푸시하면 이미 실행중인 작업이 중단되어 예측할 수 없는 동작과 잠재적인 충돌이 발생할 수 있다.

## Task Queue

- 콜백 작업은 Task Queue에 추가된다.
- Task Queue에는 미래의 어느 시점에 실행되기를 기다리는 웹 API 콜백 및 이벤트 핸들러가 보관된다.

## Event Loop

- 이벤트 루프는 Call Stack이 비어있는지 계속 확인하고 Call Stack이 비어있으면 Task Queue에서 사용 가능한 첫 번째 작업을 확인 한 후 이를 Call Stack으로 이동하여 실행한다.

## Microtask Queue

- Task Queue보다 우선 순위가 높은 다른 또 다른 대기열
- Microtask Queue에 대기하는 작업
  - Promise 핸들러 콜백 (then(callback), catch(callback), finally(callback))
  - async 함수 실행
  - `MutationObserver` 콜백
  - `queueMicrotask` 콜백
- call stack이 비어있으면 이벤트루프는 먼저 Microtask Queue의 모든 작업을 처리 한 후 Task Queue로 이동한다.

참고
https://youtu.be/eiC58R16hb8?si=f6_QNNDK4-ViJ1GQ
https://www.lydiahallie.com/blog/event-loop
