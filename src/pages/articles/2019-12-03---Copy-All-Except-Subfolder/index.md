---
title: '특정 sub folder 제외하고 전부 복사하기'
date: '2019-12-03T22:06'
layout: post
draft: false
path: '/posts/copy-all-except-sub-folder/'
category: 'Other Stuff'
tags:
  - 'rsync'
  - 'exclude node_modules'
description: '특정 sub folder 제외하고 전부 복사하기(Copy all except sub-folder)'
---

## 특정한 sub folder 제외하고 모두 복사하기

은근 종종 써야 하는데 쓸 때마다 찾아보기 귀찮은 명령(e.g. 어딘가에 소스코드 제출해야 할 때 노드 모듈 제외하기)

```shell
# project_name 하위 내용을 copy_project_name 디렉토리로 노드모듈 빼고 전부 복사하기
$ rsync -av [project_name]/ to [copy_project_name] --exclude=node_modules/
```

rsync가 원래는 동기화용 이라고 하는데 스택오버플로우에서 검색한 결과 복사용으로도 사용되는 듯 하다. 여기서 `/` 를 주의해야 하는데 \[project_name\] 뒤에 `/` 를 붙이지 않으면 \[copy_project_name\] 내에 \[project_name\] 디렉토리 자체가 통째로 포함돼 버린다.
