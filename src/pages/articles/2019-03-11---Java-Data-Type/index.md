---
title: 'Java - Data Type'
date: '2019-03-11T16:52'
layout: post
draft: false
path: '/posts/java-data-type/'
category: 'Java'
tags:
  - 'data type'
description: 'Java(자바) - Data Type'
---

## Int, Byte, Short, Long

```java
package com.Hazel;

public class Main {

    public static void main(String[] args) {

        // int has a width of 32
       int myMinValue = -2_147_483_648;
        int myMaxValue = 2_147_483_647;

        // byte has a width of 8
        byte myMinByteValue = -128;
        byte myMaxByteValue = 127;

        // short has a width of 16
        short myMinShortValue = -32_768;
        short myMaxShortValue = 32_767;

        // long has a width of 64
        long myMinLongValue = -9_223_372_036_854_775_808L; // 뒤에 L을 붙인다
        long myMaxLongValue = 9_223_372_036_854_775_807L;
    }
}

```

```java
byte newByte = (myMinByteValue/2); // error
```

*expression을 하면 default로 int를 가정*하므로 에러가 난다. 내가 앞에 byte라고 선언했으므로, integer를 byte에 넣으려 한다고 생각하여 incompatible type이라는 에러가 난다. `byte newByte` = `(byte) (myMinByteValue/2);`로 casting해야 한다.

## Float and Double

```java
package com.Hazel;

public class Main {

    public static void main(String[] args) {
	int myIntValue = 5;
	float myFloatValue = 5.4f;
	double myDoubleValue = 5d;
    }
}
```

소수점이 들어가면 기본적으로 double을 전제하므로 float 값을 소수점 있는 값으로 할당하려면 casting해야 한다. 그러나 위처럼 그냥 소수점 뒤에 f를 붙이는 게 더 명확하다.

```java
package com.Hazel;

import javax.swing.plaf.synth.SynthColorChooserUI;

public class Main {

    public static void main(String[] args) {
        // width of int = 32 (4 bytes).
	    int myIntValue = 5 / 3;
        // width of float = 32 (4 bytes).
	    float myFloatValue = 5f / 3f;
        // width of double = 64 (8 bytes).
	    double myDoubleValue = 5d / 3d;

        System.out.println("myIntValue = " + myIntValue);
        System.out.println("myFloatValue = " + myFloatValue);
        System.out.println("myDoubleValue = " + myDoubleValue);

    }
}
```

```java
myIntValue = 1
myFloatValue = 1.6666666
myDoubleValue = 1.6666666666666667

```

double의 크기가 더 크지만 일반적으로 double을 사용한다. 더 정확하고 java 내에서 자주 쓰이며 최근 컴퓨터에서는 더 빠르기 때문이다.

## Char and Boolean

```java
package com.Hazel;

public class Main {

    public static void main(String[] args) {
	    char myChar = 'a'; // Only one character
        char myChar2 = '\u00A9';
        boolean myBoolean = false;

        System.out.println(myChar2);
    }
}
```

```java
myChar2 = © // unicode table 참조
```

## String

```java
package com.Hazel;

public class Main {

    public static void main(String[] args) {
	String myStirng = "This is a String"; // double quote 써야 함(char은 single)

    String numberString = "250.55";
    numberString = numberString + "49.95";
    System.out.println("The result is " + numberString);

    String lastString = "10";
    int myInt = 5;
    lastString = lastString + myInt;
    System.out.println(lastString);
    }
}
```

```java
The result is 250.5549.95 // 계산 안됨(str + str)
lastStirng = 105 // 계산 안됨(str + num)
```
