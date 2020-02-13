---
title: '타입스크립트 - 타입 종류와 Annotation/Inference'
date: '2020-01-12T23:52'
layout: post
draft: false
path: '/posts/typescript-type/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'Type Annotation'
  - 'Type Inference'
description: '타입스크립트 - 타입 종류와 Annotation/Inference'
---

> 타입스크립트에서는 모든 value는 type을 갖고 있다.

여기서 value는 변수에 할당할 수 있는 것을 말한다. string, number, boolean, Object, array, Class, function 그 어떤 것이든 말이다. 이 모든 것이 타입을 갖고 있다.

## 타입스크립트에서의 타입

타입이란, 그 value가 가지고 있는 프로퍼티나 함수를 추론할 수 있는 방법이다.

예를 들어 "dog" 라는 value가 있을 때 이것의 타입이 뭐냐고 한다면 string이라고 대답할 수 있다. 타입이 string이라는 것은, 그 값이 indexOf() 같은 자바스크립트 메서드를 갖고 있다는 뜻이다. 우리는 "dog"가 뭐예요? 라고 물었을 때, `indexOf()`, `charAt()`, `includes()` 등등의 메서드를 사용할 수 있는 값이에요, 라고 말하지 않는다. 그냥 string이라고 한다. 그렇게 말하면 우리는 그 값이 `indexOf()`, `charAt()`, `includes()` 을 사용할 수 있다는 것을 안다. 그게 타입스크립트에서의 타입이다.

```typescript
interface Todo {
  id: number
  title: string
  completed: boolean
}
```

마찬가지로 Todo라는 타입의 속성을 정의하고 어떤 value의 타입을 Todo라고 지정한다면 우리는 자동적으로 그 value가 id, title, completed의 속성을 가질 것임을 알게 된다. 이것이 타입스크립트의 intellisense가 잘 되어 있는 이유인데, 해당 값의 타입을 추론함으로써 사용 가능한 메서드나 프로퍼티를 추천할 수 있는 것이다.

## 타입의 종류

### Primitive Types

- number

- boolean

- void

- undefined

  ```typescript
  const isUndefined: undefined = undefined // 타입과 값이 동일
  ```

- string

- symbol

- null

  ```typescript
  const isNull: null = null // 타입과 값이 동일
  ```

### Object Types

- functions

  ```typescript
  const logNumber: (i: number) => void = (i: number) => {
    console.log(i)
  }
  ```

  logNumber 뒤에 나온 `(i: number) => void` 는 실제로 실행되는 코드가 아니라 타입스크립트에게 이것이 어떤 함수 타입인지 말해주는 부분이다. 함수에서 중요한 부분은 어떤 것이 아규먼트로 전달되고, 어떤 것이 리턴되는가이다. 그래서 아규먼트로 number타입이 들어갈 것이며, 리턴 유형은 void라고 말해주는 것이다.

  하지만 `(i: number) => void` 뒤에 `(i: number)` 가 또 중복되어 들어가는 것을 볼 수 있다. 그 대신 아래처럼 더 간단하게 쓸 수 있다.

  ```typescript
  const logNumber = (i: number): void => {
    console.log(i)
  }
  ```

  그리고 애로우 펑션을 쓰지 않고 쓰는 경우(선언식과 표현식)도 물론 아래처럼 쓸 수 있다.

  ```typescript
  // 화살표 함수
  const add = (a: number, b: number): number => {
    return a + b
  }

  // 함수 선언식
  function multiply(a: number, b: number): number {
    return a * b
  }

  // 함수 표현식
  const divide = function(a: number, b: number): number {
    return a / b
  }
  ```

  그리고 desctructing 하는 경우는 아래와 같다.

  ```typescript
  const todayWeather = {
    date: new Date(),
    weather: 'sunny',
  }

  const logWeather = (forecast: { date: Date; weather: string }): void => {
    console.log(forecast.date)
    console.log(forecast.weather)
  }

  logWeather(todayWeather)
  ```

  ```typescript
  // Destructing
  const logWeather = ({
    date,
    weather,
  }: {
    date: Date
    weather: string
  }): void => {
    console.log(date)
    console.log(weather)
  }

  logWeather(todayWeather)
  ```

* arrays

  ```typescript
  const arr: string[] = ['a', 'b', 'c']
  ```

  ```typescript
  const importantDates: (string | Date)[] = [new Date()]
  importantDates.push('2019-01-09')
  ```

* classes

  ```typescript
  class Car {}
  let car: Car = new Car()
  ```

* objects

  ```typescript
  let point: { x: number; y: number } = { x: 10, y: 20 }
  ```

  objects에서 destructing은 아래와 같다. object에서 destructing할 때에는 type에도 여전히 object 형태를 주어야 한다는 것.

  ```typescript
  const profile = {
    name: 'alex',
    age: 20,
    coords: {
      lat: 0,
      lng: 15,
    },
    setAge(age: number): void {
      this.age = age
    },
  }

  const { age }: { age: number } = profile // 주의할 점은 { age }: number가 아니라는 것이다.
  const {
    coords: { lat, lng },
  }: { coords: { lat: number; lng: number } } = profile
  ```

## 타입 Annotation, Inference

- `Annotation`: 개발자가 타입을 타입스크립트에게 직접 말해주는 것.

  ```typescript
  const apples: number = 5 // number 타입 지정
  ```

- `Inference`: 타입스크립트가 알아서 타입을 추론하는 것.

  ```typescript
  const apples = 5 // **변수 선언과 동시에 초기화할 경우** 타입을 알아서 추론한다
  ```

  개발자가 애노테이션을 일일이 하지 않아도 변수 선언과 동시에 값을 초기화하면, 타입스크립트는 알아서 타입을 추론한다. 그러므로 많은 경우 직접 타입을 써주지 않아도 될 것이지만, 어떤 경우에는 타입 애노테이션을 꼭 해주어야 하는 경우가 있다.

1. any 타입을 리턴하는 함수

   ```tsx
   const json = '{"x": 10, "y": 20}'
   const coordinates = JSON.parse(json)
   console.log(coordinates)
   ```

   coordinates에 hover해보면 `const coordinates: any` 라고 뜨는 것을 볼 수 있다. JSON.parse는 `json`을 파싱해준다. '3'을 넣으면 number 3을 리턴하고, '"str"' 을 넣으면 string인 "str"를 리턴한다. 인풋으로 들어가는 json을 확인하면 대충 어떤 타입이 리턴될지 개발자는 예상할 수 있지만, 타입스크립트는 여기까지 지원하지 않는다. 리턴 타입이 일정하지 않으므로 any를 리턴한다고 추론해버린다. 그러므로 이 경우에는 타입 애노테이션을 해주어야 한다.

   ```tsx
   const json = '{"x": 10, "y": 20}'
   const coordinates: { x: number; y: number } = JSON.parse(json)
   console.log(coordinates)
   ```

2) 변수 선언을 먼저하고 나중에 초기화하는 경우

   변수 선언과 동시에 초기화하면 타입을 추론하지만, 선언을 먼저하고 나중에 값을 초기화할 때에는 추론하지 못한다.

   ```typescript
   let word
   word = 'my word' // let word: any
   ```

   ```typescript
   let word: string
   word = 'my word' // let any: string
   ```

3. 변수에 대입될 값이 일정치 못한 경우

   ```typescript
   let num = [-10, -1, 12]
   let numAboveZero: boolean | number = false

   // array를 순회하며 0보다 큰 값이 있을 때 그 값을 대입하고 싶은 경우
   // 애노테이션을 하지 않고 false값으로 초기화하면
   // 에러 메세지가 표시된다.
   for (let i = 0; i < num.length; i++) {
     if (num[i] > 0) {
       numAboveZero = num[i]
     }
   }
   ```

   여러 타입이 지정되어야 할 때에는 `|` (or statement) 로 여러 타입을 애노테이션해준다.
