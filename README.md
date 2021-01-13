# 두 가지 원칙<br>
1. component(.vue)의 script에는 화면 관리를 위한 코드만 작성.
2. vuex(.js)에는 데이터 관리를 위한 코드만을 작성.

# 특이사항
1. 자원을 필요로하는 연산(ex:DB탐색)은 setTimeout으로 비동기 처리함
2. Watch를 사용한 비동기 연산에서 computed가 데이터의 변경을 탐지하지 못하는 issue가 있음
