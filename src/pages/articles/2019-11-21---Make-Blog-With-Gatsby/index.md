---
title: 'Gatsby랑 Netlify로 블로그 만들기'
date: '2019-11-21'
layout: post
draft: false
path: '/posts/make-blog-with-gatsby/'
category: 'Gatsby'
tags:
  - 'Gatsby'
  - 'Netlify'
description: 'Gatsby랑 Netlify로 블로그 만들기'
---

기존에는 티스토리 블로그에 썼었는데, 마크다운이 불편하고 UI가 크게 맘에 들지 않아서 새로 블로그를 만들어 보기로 했다. 커스터마이징은 시간이 있을 때 따로 하기로 하고 일단은 블로그 만들기부터 시작.

Gatsby는 React 기반의 정적 사이트 생성기이다. 예전에는 지킬이 지배적이었는데 요새는 Gatsby, Hugo 등 다른 대안이 많이 인기를 얻었고 나는 기왕에 React를 사용하니까 Gatsby로 만들기로 했다.

처음부터 일일이 만들기에는 시간이 많이 걸리니 만들어져 있는 템플릿을 활용하기로 했다. 다양한 스타터가 있는데 [여기서](https://www.gatsbyjs.org/starters/) 확인할 수 있다. 내가 사용한 테마는 [이것](https://github.com/alxshelepenok/gatsby-starter-lumen).

일단 시작하기 위한 단계는

1. [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli?activeTab=versions) 설치
2. 스타터를 선택한 다음 Gatsby CLI로 설치하기
3. 해당 디렉토리 내부에서 빌드
4. Netlify에 연결 후 배포

커맨드라인으로 나열하면

```bash
# npm 또는 yarn으로 개츠비 CLI 전역 설치
$ npm i -g gatsby-cli
$ yarn global add gatsby-cli

# 스타터 설치
$ gatsby new [블로그 이름] [스타터 URL]

# 개발모드 빌드, localhost:8000 에서 확인
$ gatsby develop

# 배포모드 빌드
$ gatsby build
```

다만 스타터를 설치할 때 버전 에러가 나는 경우가 있는데 새로 설치된 해당 디렉토리에서 `yarn upgrade` 를 실행하면 해결되었다.

그리고 깃허브에 레포를 파서 파일을 올려주면 배포 준비가 끝이다.

배포는 깃허브 페이지로 해도 되는데 자동 배포가 빠르고 커스텀 도메인 지정이 가능한 [netlify](https://www.netlify.com/)로 선택했다. 이것도 홈페이지에 들어가서 깃허브 계정과 연동하고 배포할 레포지토리와 브랜치를 선택하면 바로 배포가 가능하다. 이후로 깃허브에 변동사항이 있으면 자동 배포가 된다.

[Site configuration](https://www.gatsbyjs.org/docs/gatsby-config/)을 변경하기 위해서는 루트 디렉토리의 `gatsby-config.js` 파일을 변경하면 된다. author info, url, blog title 등 기본적인 블로그 정보를 포함한 `siteMetadata`나 플러그인 설정을 여기에서 한다.

그리고 블로그 프로젝트 생성, 플러그인 설치, 포스트 쓰는 법, graphQL 쿼리 쓰는 법 등 전반적인 프로세스에 대한 설명은 [개츠비 홈페이지](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/)에 아-주 잘 나와 있다. 이 것만 읽어도 개츠비 블로그를 이해하는 데 매우 큰 도움이 되므로 꼭 읽어볼 것을 추천한다.
