---
title: 'Mac에서 톰캣 설치 및 포트 번호 바꾸기'
date: '2019-07-08T16:52'
layout: post
draft: false
path: '/posts/install-tomcat-on-mac/'
category: 'Other Stuff'
tags:
  - 'Mac'
  - 'Tomcat'
description: 'Mac에서 톰캣 설치 및 포트 번호 바꾸기'
---

## Mac에서 톰캣 설치 및 포트 번호 바꾸기

### 톰캣 설치 방법(터미널 사용)

- spotlight 켜서 terminal 찾아 시행

- terminal에서 brew update하여 최신 버전 업데이트(사전에 홈브류 설치 필요)

- brew install tomcat 으로 톰캣 설치

- 설치 뒤 brew list 쳐서 list 중에 tomcat 있는지 확인(제대로 설치되었는지)

- 터미널에 cd `/usr/local/Cellar/tomcat/9.0.21/bin`

- bin으로 이동 후 `./catalina start` 명령으로 톰캣 구동(서버 멈추는 건 `./catalina stop`)

- localhost:8080을 브라우저에 쳤을 때에 톰캣 홈페이지가 보이면 구동 성공

### Mac에서 로컬호스트 포트 번호 바꾸기

- 터미널에 cd `/usr/local/Cellar/tomcat9.0.21/libexec/conf`

- ls 해서 `server.xml` 있는지 확인

- `vi server.xml` 입력

- 파일 내용 뜨면 Connector 태그를 찾아 port 번호가 8080으로 되어있는 것을 원하는 포트넘버로 바꾸기(내 경우 8000)

  ```xml
      <Connector port="8000" protocol="HTTP/1.1"
                 connectionTimeout="20000"
                 redirectPort="8443" />
      <!-- A "Connector" using the shared thread pool-->

  ```

- 터미널에서 편집하는 방법은 편집을 원하는 곳으로 커서를 옮긴 후 `s` 입력하면 그 자리에 있던 문자열 한글자가 삭제된 후 insert모드로 변하니 원하는 문자열을 입력하면 된다. esc로 인서트 모드 종료 후 `:wq` 입력하여 저장 및 파일 종료

- 다시 아까 카탈리나가 있는 위치로 이동하여 서버 멈추고 재시작하면 새로운 포트넘버로 접속할 수 있다.
