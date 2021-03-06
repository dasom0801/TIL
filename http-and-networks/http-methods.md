# HTTP 메소드

 클라이언트가 웹서버에게 사용자 요청의 목적/종류를 알려준다.

### GET

+ 요청하는 데이터가 HTTP Request Message의 Header 부분의 url에 담겨서 전송되기 때문에 url상에 ?뒤에 데이터가 붙어 request를 보낸다. 
+ url이라는 공간에 담겨가기떄문에 전송할 수 있는 데이터크기가 제한적
+ 보안이 필요한 데이터에 대해서는 데이터가 그대로 url에 노출되므로 GET방식은 적절하지 않다
+ 서버에서 데이터를 가져와서 보여준다거나 하는 용도로 사용한다. 
+ 서버의 값이나 상태등을 변경하지 않는다.
+ 브라우저에서 캐싱할 수 있기때문에 POST방식으로 요청해야할 것을 데이터 크기가 작고 보안적인 문제가 없다는 이유로 GET방식으로 요청하면 기존에 캐싱되었던 데이터가 응답될 가능성이 있다.

### HEAD

+ GET과 비슷하나, 실제 문서를 요청하는 것이 아니라, 문서 정보를 요청한다. 
+ HTTP 응답 메세지에 본문(Body)이 없이 HTTP 헤더 정보 만을 보낸다.
+ 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도로 사용된다.


### POST

+ 요청하는 데이터가 HTTP Message의 body에 담겨서 전송된다. 
+ 데이터 크기가 GET방식 보다 크고 보안면에서 낫다.
+ 서버의 값이나 상태를 변경하기 위해서나 추가하기 위해서 사용한다.

### PUT

+ 자원의 전체 교체한다
+ 만약 일부만 전달할 경우, 그외의 필드는 모두 null이나 초기값 처리를 한다. 

### PATCH

+ 자원의 부분 교체를 한다. 

### DELETE

+ 요청한 자원을 삭제한다. 