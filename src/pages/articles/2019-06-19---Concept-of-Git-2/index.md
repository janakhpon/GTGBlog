---
title: '깃의 개념 이해하기 - 2'
date: '2019-06-19T16:52'
layout: post
draft: false
path: '/posts/concept-of-git-2/'
category: 'Git'
tags:
  - 'Git'
  - 'Git merge'
  - 'Conflict'
description: '깃의 개념 이해하기 - 2'
---

## 깃 개념 이해하기 - 2

> 커맨드 라인이 아닌 깃의 개념 위주 정리입니다

### Merging

- test 브랜치에서 new.txt파일을 수정한 뒤 이를 마스터 브랜치에 반영하고자 한다.

> \*\* Fast-Forward merging \*\*
>
> git checkout master
>
> git merge test

- 머지를 하려면 머지하고자 하는 곳으로 스위치 한 다음(마스터 브랜치의 경우 `git checkout master`) 머지를 해야 한다. (`git merge test`)

- new.txt의 수정에 대해 다른 컨플릭트가 없고 마스터 브랜치에서 수정된 사항이 없을 때에는 디폴트로 `fast-forward merge`가 가능하다.

- `fast-forward merge`는 선형적으로 머지하는 것인데, 구글링으로 이해한 바에 따르면

  - test 브랜치를 마스터 브랜치의 곁가지로 표현한다면, 옆으로 뻗어나가던 곁가지가 마스터 브랜치의 원래 가지인 것처럼 쭉 이어지게 되는 것이다. 그러면 머지되고 난 뒤에는 원래 하나의 곧은 가지인 것처럼 보인다.(선형적) 단순히 마스터 브랜치의 포인터가 test 브랜치가 있는 위치를 가리키게 되는 것이다.
  - 반면 `non fast merge`는 test 브랜치의 곁가지인 모습을 유지하면서 마스터 브랜치와 합쳐지는 형태이다. 그렇기 때문에 두 브랜치가 머지된 지점을 명확하게 알 수 있다. 합쳐질 때에 추가적인 커밋이 일어난다.(비선형적)

- 깃의 디폴트는 fast-forwarding이지만 깃허브에서 풀리퀘스트를 하는 머지버튼은 디폴트가 non-fast-forward이다.

- 비선형적인 머지는 커밋 히스토리를 복잡하게 만들 수 있다는 단점과 각 브랜치의 소스를 명확히 할 수 있는 장점이 있다.

> 만약 마스터 브랜치에서도 커밋이 일어난다면?

- 여태까지는 마스터 브랜치에서는 아무런 변화 없이, test 브랜치에서만 수정이 있었는데 만약 마스터 브랜치에서 별도 수정 및 커밋이 있다면?

  - 브랜치 다이어그램이 갈라지게 되면서 더이상 fast-forward merge는 불가능하다.
  - 만약 마스터 브랜치에서도 new.txt 파일을 고쳤다면, 컨플릭트conflict가 일어나 고쳐줘야 한다. 하지만 다른 파일 예를 들어 old.txt 파일을 고친 것이라면 머지-커밋이 일어나게 된다.

### 충돌(Conflict) 해결하기

- 마스터 브랜치와 test 브랜치에서 각각 new.txt를 다르게 수정 후 커밋하였다면, 머지하려고 할 때에 컨플릭트가 일어난다.

> Auto-merging new.txt
>
> CONFLICT (content) : Merge conflict in new.txt
>
> Automatic merge failed; fix conflicts and then commit the result.

- 컨플릭트가 일어난 다음 파일을 열어보면

  ```
  test 1
  <<<<<<< HEAD
  test 3(master branch)
  =======
  test 2(test branch)
  >>>>>>> test

  ```

  test1은 공통 조상이며, `<<<< HEAD` 밑에 쓰여진 라인이 현재 HEAD 즉 마스터 브랜치에서 커밋된 내용, `=====` 밑의 라인이 test 브랜치에서 커밋된 내용이다. 이 두 줄이 충돌하고 있는 것이다. 마스터 브랜치에서 커밋한 내용과 test 브랜치에서 커밋한 내용 중 어떤 것으로 최종적으로 할 지 결정해주어야 된다.

  <<< 이니 === 같은 것은 깃이 그냥 표시를 위해 넣어준 것이기 때문에 이런 라인들은 지운 다음, 충돌이 없도록 어느 한 쪽으로 내용을 바꿔준다. 그 다음 git add, commit을 해주면 컨플릭트가 해결되며 머지가 끝난다.

  만약 컨플릭트 해결 중에 그냥 머지 자체를 그만두고 싶다면 `git merge --abort` 명령을 하면 된다.
