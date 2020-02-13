---
title: '깃의 개념 이해하기 - 1'
date: '2019-06-18T16:52'
layout: post
draft: false
path: '/posts/concept-of-git-1/'
category: 'Git'
tags:
  - 'Git'
  - 'Staging Area'
  - 'Remote'
  - 'Upstream'
description: '깃의 개념 이해하기 - 1'
---

## 깃 개념 이해하기 - 1

> 커맨드 라인이 아닌 깃의 개념 위주의 정리입니다

4개의 박스가 있는 것을 상상하자.

3개의 박스는 한 그룹으로 묶여있고 나머지 한 박스는 따로 있다.

그 박스들은 각각 다음을 의미한다.

> 원격 저장소(Remote Repository) -- 혼자 있는 박스

> 작업 디렉토리(Working directory) -- 함께 있는 박스 1

> 스테이징 영역(Staging Area) -- 함께 있는 박스 2

> 로컬 저장소(Local Repository) -- 함께 있는 박스 3

함께 있는 3 박스를 통틀어 나의 **개발 환경(Development Environment)**이라고 할 수 있다.

**원격 저장소**는 다른 사람과 코드를 공유하고자 할 때 변경 사항을 보내거나, 그 변경 사항을 얻어올 수 있는 곳이다.

### 원격 저장소 가져오기

- 원격 저장소에 있는 코드를 내 로컬 컴퓨터에 옮겨 오고 싶다면?

  - 원격 저장소의 주소를 복사하여 `git clone` 한다.

  - `git clone`을 하고 나면 개발 환경에 _작업 디렉토리와 로컬 저장소가 생성된다._

### 새로운 것 추가하기

> tracked, untracked

나의 작업 디렉토리에 있는 파일은 2종류로 나눌 수 있다. 하나는 git이 인지하고 있는 파일(**tracked files**) 하나는 git이 아직 존재를 모르고 있는 파일(**untracked files**)이다.
내가 원격 저장소에서 있던 파일을 clone하면 로컬 저장소와 작업 디렉토리에 저장되므로, 원격 저장소에 원래 있던 파일은 당연히 깃이 알고 있다. 그런데 내가 로컬 컴퓨터에서 추가로 작업을 하고 작업 디렉토리에 새로운 파일 new.txt를 추가했다고 하자. 이는 아직 깃이 존재를 인지하지 못하고 있다. (untracked)

> git add

깃이 이 파일의 존재를 인지하게 하려면 `git add new.txt` 명령을 내린다. **git add 명령**은 **스테이징 영역에 이 파일을 추가**한다.

> Staging Area

_스테이징 영역은 내가 저장소에 업데이트하고 싶은 모든 변화들을 모아놓는 곳이다._
이제 스테이징 영역에 add를 했으면 `commit`할 준비가 되어 있다.

> git commit -m "Add New"

**git commit 명령**은 **스테이징 영역에 있는 파일들을 로컬 저장소에 반영**한다. -m 뒤에 오는 문자열은 commit 메세지이다. (커밋 메세지는 변경사항이 뭔지 알려주기 때문에 중요하다!)
여기까지는 내 로컬 컴퓨터 안에서만 변화가 일어난 것이지, 다른 사람이랑 공유되지는 않은 상태이다. 이를 다른 사람과 공유하기 위해서는 원격 저장소를 업데이트 해야 한다.

> git push

**로컬 저장소의 커밋을 원격 저장소와 공유하려면 push 명령을 사용**한다.
이제 new.txt 파일은 작업 디렉토리, 로컬 저장소, 원격 저장소에 존재하고 있는 상태이다.

`git status` 명령어를 쳐보면 tracked된 것과 untracked된 파일이 무엇인지, 나의 로컬 저장소와 원격 저장소가 다른지, 내가 지금 어떤 브랜치에 있는지 알 수 있다.

### 변화 만들기

새로 추가한 new.txt 파일의 내용을 수정하고 싶으면?
파일을 수정한 뒤 git status를 쳐보면 new.txt 파일이 modified되었음을 알려 줄 것이다. 이는 내 작업 디렉토리에서만 일어난 변화이다.
작업 디렉토리에서 어떤 부분이 수정됐는지 알고 싶으면 `git diff` 명령을 사용하면 된다.
그 다음 git add를 하면 스테이징 영역에 반영될 것이다. git diff는 작업 디렉토리의 변경사항만 보여주므로 스테이징 영역에 있는 변화를 보고 싶으면 `git diff --staged`를 사용하면 된다.
그 다음 git commit을 하면 로컬 저장소에 반영될텐데, 커밋 로그를 보고 싶으면 `git log` 를 사용하면 된다. 깃에 커밋할 때마다 커밋은 고유한 해쉬를 가지고 있어서, git log를 찍어보면 여태 이루어진 각 커밋의 해쉬와 author, 커밋한 date까지 나온다.

### Branching

원격 저장소에서 처음 clone 했을 때에 개발환경은 자동적으로 마스터 브랜치부터 시작한다.
일반적으로 별도 브랜치에서 작업을 하다가, 그 작업 결과물이 확실할 때 마스터 브랜치에 머지(merge)한다.
깃헙같은 깃 레포지토리 매니저는 일반적으로 마스터 브랜치는 아무나 푸시할 수 없도록 디폴트를 protected로 설정한다.

> git branch test
>
> git checkout test
>
> git checkout -b test

**git branch 명령은 새로운 브랜치를 생성하여 로컬 저장소에 추가해준다.** 새롭게 만들어진 test 브랜치는 내가 현재 위치한 브랜치의 커밋된 내용을 복사한다.
커밋 명령을 하면 **내가 현재 위치한 브랜치에 커밋된다.** 반면 작업 디렉토리와 스테이징 영역은 브랜치를 신경쓰지 않는다.
내가 현재 로컬 저장소의 어느 브랜치에 위치하고 있는가를, 포인터가 가르키고 있다고 가정하자. `HEAD`(local branch tail point)라는 것이 이 포인터 역할을 하며 내가 있는 브랜치의 위치(그리고 내가 커밋하게 될)를 가리킨다.
`git checkout`을 사용하면 그 브랜치로 스위치할 수 있는데 이는 `HEAD`가 그 브랜치를 가리키게 되는 것과 같다.
`git checkout -b` 는 브랜치 생성과 이동을 동시에 해주는 명령이다.

_test 브랜치에서 git push를 하면 어떻게 될까?_

> fatal: The current branch test has no upstream branch. To push the current branch and set the remote as upstream, use
>
> git push --set-upstream origin test

_여기서 remote와 upstream은 무엇일까?_

조금 자세히 보면

```
--------Remote Repository --------
Branches: master, tutorial

--------Local Repository ---------
Branches: master, test
Remotes: origin/master,origin/tutorial

```

원격 저장소에 원격 브랜치가 2개 있다고 하자. 하나는 master, 하나는 tutorial이다.

원격 저장소를 로컬 저장소에 clone하면 깃은 리모트 저장소(=remote)를 만들고 복사한 원격 저장소를 세팅한다. 이 리모트 저장소의 디폴트 네임은 origin이다.

그러고 나서 깃은 로컬 저장소에 마스터 브랜치를 체크아웃한다.

로컬에서 원격 브랜치와 똑같은 이름을 가진 브랜치를 체크아웃하면, 이 로컬 브랜치는 원격 브랜치와 링크된다. 이 링크된 원격 브랜치가 로컬 브랜치의 upstream branch가 된다.

git push --set-upstream origin test를 수행하면, 로컬 브랜치 test의 upstream 브랜치 즉, 리모트 저장소에도 같은 이름의 브랜치(origin/test)를 생성하게 된다.

어렵게 썼지만 로컬에 생성한 브랜치를 원격에도 만들어야 git push를 할 수 있다는 소리이다. 로컬 브랜치를 다른 리모트 브랜치(예를 들어 리모트 마스터 브랜치)에 푸시하고 싶다면 `git push origin test:master` 과 같이 할 수 있다.

## 참고

_[링크](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)_
