---
title: '타입스크립트 - Basic 세팅'
date: '2020-01-20T23:52'
layout: post
draft: false
path: '/posts/typescript-basic-setting/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'TS Setup'
description: '타입스크립트 - Basic 세팅'
---

1. 타입스크립트를 설치한다.

2. 프로젝트 디렉토리를 생성한다. 해당 디렉토리로 이동한 뒤 src 폴더와 build 폴더를 각각 생성한다.

   ```
   [project]
     ├── build
     └── src
   ```

   폴더를 이렇게 각각 만드는 이유는 ts 파일을 js로 컴파일해서 js파일이 별도 생성돼서 뒤섞이면 보기 안좋기 때문이다. 따라서 `src/`에는 ts 파일만 넣고 `build`에는 컴파일한 js파일을 보관하고자 한다.

3. 이 설정을 하기 위해 `tsc --init` 을 친다. 이 명령은 `tsconfig.json` 파일을 생성한다.

4. `tsconfig.json` 파일에 보면 `rootDir`, `outDir` 속성이 있다. 주석 처리 돼있는 부분을 해제하고 `rootDir` 에는 `"./src"` 값을 주고 `outDir` 에는 `"./build"` 값을 준다. 둘다 상대 path를 지정하는데, `rootDir` 은 인풋 파일의 루트 디렉토리를 의미하고 `outDir` 은 빌드 결과 파일의 디렉토리를 의미한다. 그래서 ts 파일을 `src`에 생성하고 컴파일하면 js파일은 `build`에 모이게 된다.

5. 이를 실행해보려면 터미널에 `tsc` 를 치면 된다. 다만 어떤 변경사항이 있을 때마다 `tsc` 명령어를 쳐서 컴파일할 수는 없으니 `tsc -w` 라고 친다. 워치 모드로 실행되어 변경사항이 저장될 때마다 자동으로 재 컴파일한다.

6. 이제 ts파일을 생성하고 컴파일하여 js를 만들었으니, js를 실제로 실행해봐야 한다. 이는 `node build/index.js` 이런 식으로 할 수 있는데, 이 또한 일일이 하긴 어려우므로 `nodemon` 이라는 패키지를 설치한다.

   ```shell
   $ npm init -y # package.json 생성
   $ npm install nodemon concurrently
   ```

   npm init을 통해 package.json 을 생성한 뒤 `nodemon`과 `concurrently`를 설치한다. `nodemon`은 파일이 변경될 때마다 노드에서 js 코드를 재실행시켜주는 일을 한다.`concurrently`는 여러가지 커맨드를 동시에 실행할 수 있도록 도와준다. ts 파일을 실행하는 것은 결국 ts를 js로 컴파일하는 작업과 js를 node.js에서 실행하는 작업 2가지가 모두 이루어져야 한다. concurrently를 통해 그 2개의 작업을 함께 하도록 할 수 있다.

7. package.json의 스크립트에서 아래처럼 입력한다.

   ```json
     "scripts": {
       "start:build": "tsc -w",
       "start:run": "nodemon build/index.js",
       "start": "concurrently npm:start:*"
     },
   ```

   결국 npm start 명령은 npm에게 `start:` 로 시작하는 모든 명령어를 동시에 실행하도록 한 것이므로 `start:build` 와 `start:run` 을 둘 다 watch모드로 실행하게 된다. 즉 파일이 변경될 때마다 알아서 컴파일하고 이를 노드에서 실행한다.
