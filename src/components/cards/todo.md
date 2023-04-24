구현할 이벤트 종류

- 메인화면

    - 게시글 내용 클릭 시 PostDetail 페이지로 넘어가는 이벤트
    - 좋아요 아이콘 클릭 시 토글 및 좋아요 아이콘 CSS 변화 이벤트
    - 댓글 아이콘 클릭 시 상세화면으로 넘어가는 이벤트
    - 무한 스크롤 기능

-   상세화면

    -   게시글
        -   게시글 내용에 이미지를 클릭 했을 시 미디어 팝업이 열리고, 다시 클릭 시 닫히는 이벤트
        -   게시글 하단의 댓글 아이콘 클릭 시 댓글 input의 `<TextField />`가 focus되는 이벤트
        -   게시글 하단의 좋아요 아이콘 클릭 시 토글 및 좋아요 아이콘 CSS 변화 이벤트
        -   More 버튼 클릭 시 슬라이더 메뉴 (글 수정, 글 삭제, 취소) 이벤트
    -   댓글 input
        -   `<TextField />` 가 focus 되었을 때
            -   우측에 Reply버튼이 나타나고, blur할 경우 사라지는 이벤트
            -   글자 수가 0일 때 또는 150자 이상일 때, Reply 버튼이 비활성화되는 이벤트
            -   `<TextField />` 하단에 글자 수의 증감을 표시하는 이벤트
    -   댓글
        -   More 버튼 클릭 시 슬라이더 메뉴 (댓글 수정, 댓글 삭제, 취소) 이벤트

    아래 내용을 구현할 때 슬라이더를 컴포넌트화 해서 슬라이더 메뉴별 함수를 받는 것이 나을듯함

    -   More 버튼 클릭 시 -슬라이더 메뉴 (글 수정, 글 삭제, 취소) 이벤트
        -   글 수정 클릭 시 textEditable: true 토글 이벤트
        -   글 수정 상태(textEditable) 상태일때 확인, 취소 버튼 나타나는 이벤트
        -   글 삭제 클릭 시 확인 alert 띄우기
        -   글 삭제 클릭 시 DELETE('/post/:postId') 요청 -슬라이더 메뉴 (댓글 수정, 댓글 삭제, 취소) 이벤트
        -   댓글 수정 클릭 시 textEditable: true 토글 이벤트
        -   댓글 수정 상태(textEditable) 상태일때 확인, 취소 버튼 나타나는 이벤트
        -   댓글 삭제 클릭 시 확인 alert 띄우기
        -   댓글 삭제 클릭 시 DELETE('/comment/:commentId') 요청