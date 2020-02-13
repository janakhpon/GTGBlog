---
title: 'The following untracked working tree files would be overwritten by merge'
date: '2019-10-23T22:06'
layout: post
draft: false
path: '/posts/git-untracked-working-tree/'
category: 'Git'
tags:
  - 'Untracked working tree'
  - 'Merge'
description: '깃 머지 에러(The following untracked working tree files would be overwritten by merge)'
---

### 상황

컨트리뷰트 작업 하기 전에 여러 커미터가 있는 upstream의 업데이트 사항을 내 origin에 pull(fetch & merge)하고자 함. (즉 동기화)

여느 때와 같이 git remote update, git pull —rebase upstream master를 치는 순간 아, 멘토님이 리베이스 말고 머지하라고 하셨지, 라는 생각이 들었다. 황급하게 ctrl+c로 프로세스를 종료한 뒤에 다시 git merge upstream/master를 시도했으나 그때부터 계속 에러가 났다...

주요 에러는

- merging is not possible because you have unmerged files
- committing is not possible because you have unmerged files
- The following untracked working tree files would be overwritten by merge

처음에는 컨플릭트가 나서 해결하라고 나왔었는데, 애초에 내가 작업한 사항이 아니라서 컨플릭트를 해결할 수가 없었다. 다른 분들이 작업하신 것을 내가 건드릴 수 없는 노릇이다.

hint에서 `git add <file>` 하라고 되어 있어서, add 하고 커밋도 해보았지만 점점 더 미궁이었다. 생각해보니 애초에 여기서 커밋을 하면 안되었던 것 같다.

### 해결

> git add .
>
> git stash
>
> git pull upstream master

일단 내가 한 불필요한 커밋을 reset으로 지워서 내가 _머지를 시도하기 전의 커밋으로 돌려놨다._ 그 다음 git add와 [git stash](https://alledy.netlify.com/posts/git-stash/)를 하면, add는 변경사항을 스테이징 영역에 보낼 것이고, stash는 이를 임시 저장하면서 워킹디렉토리를 HEAD commit으로 되돌린다. 그러면서 status가 깔끔해진다. 그 다음 git pull을 시도하니 깔끔하게 적용되었다.
