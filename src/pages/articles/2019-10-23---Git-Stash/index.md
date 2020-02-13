---
title: 'Git Stash'
date: '2019-10-23T14:06'
layout: post
draft: false
path: '/posts/git-stash/'
category: 'Git'
tags:
  - 'Stash'
  - 'Commit'
description: '깃 스테시(Git Stash)'
---

> Stash the changes in a dirty working directory away
>
> 지저분한 워킹디렉토리의 변경사항을 잠시 치워두세요
>
> (Stash: 살며시 치우다, 감추다, 은닉처)

### git stash가 수행하는 2가지

`git stash` 는

1.  **현재 commit 되지 않은 변경사항들**을 임시적으로 저장하고
2.  HEAD commit의 워킹디렉토리를 복구한다.

스테시는 **로컬 깃 레포지토리에 한정**된다. 리모트에 푸시할 때 같이 이동하는 것이 아니다.

### 왜 쓸까?

1.  현재 작업하고 있는 내용을 기억하고 싶기는 한데(위에서 1번 작업)
2.  현재 워킹 디렉토리가 지저분한 경우 깨끗한 워킹 디렉토리로 돌아가고 싶을 때(위에서 2번 작업)

즉 현재 작업 내용을 기억하고 싶기는 한데 커밋해서 반영하기는 싫을 때이다. 임시저장 같은 개념으로, 결과물에 반영하기 전까지 잠깐 갖고 있다가 나중에 원할 때 적용한 다음 최종 저장한다는 느낌이다.

(ex. 아직 작업이 완료되지 않아서 커밋하긴 애매한데 갑자기 다른 브랜치로 가서 다른 작업을 해야될 일이 있을 때)

stash는 마지막 커밋을 기준으로 이루어진다. 마지막 커밋 이후 이루어진 로컬의 변경사항을 모두 기억한다.(이것은 git add되었든 아니든 커밋되지 않은 사항이면 모두) 그리고 워킹디렉토리는 HEAD가 가리키고 있는 커밋의 워킹디렉토리로 되돌린다. (=일반적으로 가장 마지막 커밋)

### 관련 command line

- `git stash list`

  현재 존재하는 스테시 리스트를 보여준다. 가장 최근의 스테시가 가장 윗줄에 존재하며, 각각의 스테시는 인덱스를 가지고 있다.

* `git stash save [내용]`

  스테시를 추가. `save [내용]` 은 옵셔널이고 그냥 git stash라고만 해도 된다. 스테시 메세지를 추가하느냐 아니냐의 차이이다.

* `git stash show`

  스테시 diff를 보여준다. `-p`를 붙이면 스테시의 full diff를 보여준다.

* `git stash pop`

  가장 최근의 스테시 삭제 및 현재 디렉토리에 적용

* `git stash pop stash@{1}`

  특정 스테시를 삭제 및 현재 디렉토리에 적용. 위 예시에서는 1번 인덱스를 가진 스테시를 삭제 및 적용한 것이다.

* `git stash apply`

  pop에서 삭제 기능을 빼고 적용만 하는 것. 특정 스테시를 정하지 않으면 마찬가지로 가장 최근의 스테시만 적용한다. pop처럼 특정 스테시를 적용하고자 하면 스테시 인덱스를 덧붙이면 된다.

* `git stash drop`

  pop에서 적용 부분을 빼고 삭제만 하는 것. 마찬가지로 특정 스테시를 정하지 않으면 가장 최근 스테시만 삭제한다.

* `git stash clear`

  모든 스테시를 한번에 삭제할 때

## 참고

- [https://git-scm.com/docs/git-stash](https://git-scm.com/docs/git-stash)
- [깃 개념이 헷갈릴 때 다시 보기](https://alledy.netlify.com/concept-of-git-1/)
