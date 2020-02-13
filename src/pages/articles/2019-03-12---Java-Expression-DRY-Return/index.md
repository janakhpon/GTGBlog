---
title: 'Java - Expression, DRY, Return'
date: '2019-03-12T16:52'
layout: post
draft: false
path: '/posts/java-expression-dry-return/'
category: 'Java'
tags:
  - 'Expression'
  - 'DRY'
  - 'Return'
description: 'Java - Expression, DRY, Return'
---

## Expressions

```java
public class Main {

    public static void main(String[] args) {
        int score = 100; // score에서 100까지가 exp
        if(score > 99) {
            System.out.println("You got the high score!");
            score = 0;
        }
    }
}
```

- data type과 ;을 제외한 부분이 expression이다.
- brace와 bracket 안은 expression이다. if, brace와 bracket은 expression이 아니다.
- score = 0는 expression이다.

```java
public class Main {

    public static void main(String[] args) {
        boolean gameOver == true;
        int score = 800;
        int levelCompleted = 5;
        int bonus = 100;

        if(gameOver) {
        int finalScore = score + (levelCompleted * bonus);
        System.out.println("Your final score is " + finalScore);
    }
        int SavedFinalScore = finalScore; // error
    }
}
```

code 섹션이 끝나면 code block 안에서 생성된 변수는 자동적으로 삭제한다. 따라서 if 블록 밖에서 finalScore을 사용하려고 하면 에러가 난다. 마치 자바스크립트의 let이나 const 처럼 스코프가 브라켓 안으로 한정되는 듯하다.

```java
public class Main {

    public static void main(String[] args) {
        boolean gameOver = true;
        int score = 800;
        int levelCompleted = 5;
        int bonus = 100;

        if(gameOver) {
            int finalScore = score + (levelCompleted * bonus);
            System.out.println("Your final score is " + finalScore);
        }

        int score2 = 10_000;
	    int levelCompleted2 = 8;
	    int bonus2 = 200;

	    if(gameOver) {
	        int finalScore = score2 + (levelCompleted2 * bonus2);
            System.out.println("Your final score is " + finalScore);
        }
    }
}
```

## DRY

그래서 두 번째 if문에서도 finalScore라는 같은 이름을 가진 변수를 사용할 수 있다. 다른 스코프에 있으니 둘은 전혀 별개이기 때문이다. 위 코드의 문제는 반복이다. 반복되는 부분을 없애기 위해 다음과 같이 한다.

```java
public class Main {

    public static void main(String[] args) {

        calculateScore(true, 800, 5, 100);

        calculateScore(true, 10000, 8, 200);

    }

    public static void calculateScore(boolean gameOver, int score, int levelCompleted, int bonus) {

        if(gameOver) {
            int finalScore = score + (levelCompleted * bonus);
            System.out.println("Your final score is " + finalScore);
        }

    }
}

```

Java는 패러미터 입력만으로도 Java에서 자동으로 변수 선언을 해준다. 또 아래처럼 할 수도 있다. 흥미로운 것은 그냥 변수 이름만 넣어도 실행된다는 것이다.

```java
public class Main {

    public static void main(String[] args) {

        boolean gameOver = true;
        int score = 800;
        int levelCompleted = 5;
        int bonus = 100;

        calculateScore(gameOver, score, levelCompleted, bonus);

        score = 10_000;
        levelCompleted = 8;
        bonus = 200;

        calculateScore(gameOver, score, levelCompleted, bonus);
    }

    public static void calculateScore(boolean gameOver, int score, int levelCompleted, int bonus) {

        if(gameOver) {
            int finalScore = score + (levelCompleted * bonus);
            System.out.println("Your final score is " + finalScore);
        }

    }
}
```

## Return

```java
    public static int calculateScore(boolean gameOver, int score, int levelCompleted, int bonus) {
        if(gameOver) {
            int finalScore = score + (levelCompleted * bonus);
            System.out.println("Your final score is " + finalScore);
            return finalScore;
        }
        return -1;
    }

```

뭔가를 return 하려면 void 대신 반환받기 원하는 데이터타입을 입력해야한다. 그리고 gameOver이 true일 때의 return 값만 정하면 에러가 난다. false일 때에도 어떤 값이 리턴될지도 정해야 한다. (자바스크립트는 그냥 undefined를 리턴한다.)
