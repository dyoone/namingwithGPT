# namingwithGPT
gpt를 활용한 namig 앱을 만들면서 공부한 기록
(코드 짧은 요약, 코드를 작성하면서 했던 고민들은 블로그에)



![에러처리](https://github.com/dyoone/namingwithGPT/assets/121990995/7bf9a8c8-5a11-4b28-96c2-3a1f726ab8e9)

chat-GPT에게 답을 받았을 때 종종 답변을 한글로 주거나, 원하는 답변을 주지 않아 렌더링이 의도한 대로 되지 않는 경우가 종종 있었다.
그래서 에러가 자주 발생하는 경우 에러문을 던지고 recylceBtn(재요청)버튼을 렌더 시켜서 에러를 다뤘다.


![은닉화](https://github.com/dyoone/namingwithGPT/assets/121990995/c0ca3989-9075-4b92-9e54-5137babdee22)

다른 모듈에서 캡슐화된 정보에 접근하는 경우가 종종 있어서 접근 할 수 있는 함수를 작성 했다.



![비동기처리](https://github.com/dyoone/namingwithGPT/assets/121990995/c59fbd0d-3c43-4526-854d-1d8492b2ae52)

chat-GPT의 응답이 느릴 경우 사용자의 불편함을 해결하려고 재요청을 하게했다. 이 때 promise.race를 이용해서 비동기 처리를 했다.



![이벤트 핸들링](https://github.com/dyoone/namingwithGPT/assets/121990995/90813e42-c064-4925-9558-31d227ed7334)

dom에 event를 listener을 하면 캡쳐링에 의해서 하위 요소까지 이벤트가 걸리지만 해당 event를 remove를 할 때는 모든 요소에 remove를 해줘야하는 문제가 발생했다.
그래서 capture:true 인자를 전달해서 캡쳐링을 막았고 메모리 낭비를 막기 위해서 필요 없을 경우에는 이벤트를 제거했다.



![랜덤](https://github.com/dyoone/namingwithGPT/assets/121990995/4a9f2d21-64a0-4090-87ca-50245ef2adf9)

폰트를 랜덤으로 하고 싶었고 크게 2가지 종류의 폰트가 있었다.
그래서  50%의 확률로 선택이 되기를 원했고 그 이후에는 배열의 index를 랜덤으로 선택하게 하였다.


![동적](https://github.com/dyoone/namingwithGPT/assets/121990995/c5362ccd-290b-4cd8-a6e0-9cbc6bbf6f39)


동적으로 생성한 class명이 같은 div를 구분 했어야 했다. 그래서 texcontext로 접근을 하려고 했으나 이 textcontext도 동적으로 바뀌는 상황이였다.
그래서 처음에 render된 textcontext를 data-set에 할당함으로 각 div를 구분가능하게 만들었다.


![캐싱](https://github.com/dyoone/namingwithGPT/assets/121990995/4e6ba3cc-80e4-481e-863c-3581c62ad8ee)
![캐싱2](https://github.com/dyoone/namingwithGPT/assets/121990995/55582d36-ab5c-4921-aa6e-47fe81fc81f4)


서버에 똑같은 요청을 안 하기 위해 서버에서 받은 data를 data-set을 이용해서 객체에 저장했다.
