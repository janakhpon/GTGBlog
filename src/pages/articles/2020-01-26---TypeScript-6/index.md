---
title: '타입스크립트 - 클래스의 추상화'
date: '2020-01-26T23:52'
layout: post
draft: false
path: '/posts/typescript-abstract-class/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'Abstract Class'
  - 'Inheritance'
description: '타입스크립트 - 클래스의 추상화'
---

타입스크립트로 Bubble Sort하는 클래스를 만들어보자.

이 클래스는 string, number[]를 받을 것이고, 모두 소팅할 수 있어야 한다.

### Step 1. Sorter 클래스 만들기

먼저 number 배열을 받는 Sorter 클래스를 가정하자. (나머지 type은 차차)

```typescript
class Sorter {
  collection: number[]
  constructor(collection: number[]) {
    this.collection = collection
  }
}
```

collection 필드를 설정하고 이 타입을 number[]로 준다. 그 다음 위 코드처럼 적어도 되지만, 아래처럼 적는 것이 더 깔끔하다. (두 방법은 결과적으로 같다)

```typescript
// constructor 인자에 public modifier를 추가한다.
class Sorter {
  constructor(public collection: number[]) {}
}
```

### Step 2. sort() 구현

이제 Sorter 클래스에서 소팅을 해줄 sort() 메서드를 만들어보자.

```typescript
class Sorter {
  constructor(public collection: number[]) {}

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // Compare logic
        if (this.collection[j] > this.collection[j + 1]) {
          // Swap logic
          const leftHand = this.collection[j]
          this.collection[j] = this.collection[j + 1]
          this.collection[j + 1] = leftHand
        }
      }
    }
  }
}

const sorter = new Sorter([10, 3, -5, 0])
sorter.sort()
console.log(sorter.collection) // [-5, 0 , 3, 10]
```

위 메서드는 number[]를 버블 소트한다는 전제 하에 만들어졌다. 인스턴스를 생성해서 메서드를 호출한 뒤 collection을 콘솔에 찍어보면 소팅된 결과가 나타난다.

이제 문제는 그 다음이다. string에 대해서는 어떻게 위 로직을 적용할 것인가?

### Step 3. string을 어떻게 소팅할까 생각해보기

같은 Sorter 클래스에서 number[]가 아닌 string도 받아서 소팅하고 싶다고 생각해보자. 일단, 가장 처음 맞닥뜨리는 문제는 소팅 로직을 그대로 활용할 수는 없다는 거다.

먼저, 대소 비교 로직(Compare logic)이 다르다. number[]의 경우 숫자의 대소비교만 하면 되지만, string은 대문자냐 소문자냐에 따라 다르다. 예를 들어 A와 z가 있는 경우 알파벳 순서로 Az 로 정렬하고 싶지만, 실제로는 `z < A` 이므로 `zA` 로 정렬될 것이다.

따라서 uppercase를 고려하는 별도 로직이 필요하다.

그 다음은 Swap logic이 다르다. number[]는 오브젝트 타입이므로 mutable하다. 그러나 자바스크립트의 string은 primitive타입이므로 immutable하다.

```js
var str = 'abc'
str[1] = 'a'
console.log(str) // Still 'abc'
```

즉 재할당한다고 해도 실제로 변수의 값은 바뀌지 않으므로 number[]에 쓰는 Swap logic을 사용할 수 없다. 그러면 어떻게 할 것인가?

가장 첫 번째로 생각할 수 있는 건, 타입체크를 통해 로직을 분기하는 거다.

```typescript
class Sorter {
  constructor(public collection: number[] | string) {} // Union type
	...
}
```

일단 이렇게 받을 수 있는 타입에 string을 추가하고 밑에 소팅 로직은 바꾸지 않으면 아래처럼 에러메세지가 나타난다.

`Index signature in type 'string | number[]' only permits reading.`

타입에 `|`를 사용하면 이건 union type이라고 해서, 인스턴스를 생성할 때에는 이 중 한 타입만 들어가게 된다. 그러니까 string이 들어가거나 number[] 둘 중에 하나가 들어올 것이므로, 뒤에 소팅 로직에 쓰이는 메서드나 속성들은 두 타입 모두가 사용할 수 있는 것으로 제한된다.

그렇기 때문에 number[]를 가정하고 만든 소팅 로직은 string 타입의 인자에 사용될 수 없으므로, 위와 같은 에러가 나는 것이다. (둘이 같이 쓸 수 있는 로직이 없으므로 읽기만 허용된다는 그런 뜻이다)

그래서 이 때 타입을 기준으로 로직도 분기하는 방법을 생각할 수 있다. 이를 Narrow type 혹은 **타입 가드(Type guard)** 라고 한다.

하지만 타입가드를 사용하면 union type을 사용할 때 쓸 수 있는 프로퍼티가 줄어드는 것을 막을 수 있지만, 타입이 추가될 때마다 if 문이 증가하는 단점이 있다. 아래 코드는 타입스크립트 내장 타입가드인 typeof와 instanceof 를 사용하여 if 문으로 타입을 분기한 것이다. string일 때의 로직은 아직 구현하지 않았다.

```typescript
class Sorter {
  constructor(public collection: number[] | string) {}

  sort(): void {
    const { length } = this.collection
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // All of this only works
        // if collection is an array of numbers
        if (this.collection instanceof Array) {
          // collection === number []
          if (this.collection[j] > this.collection[j + 1]) {
            const leftHand = this.collection[j]
            this.collection[j] = this.collection[j + 1]
            this.collection[j + 1] = leftHand
          }
        }

        // Only going to work if collection is a string
        // If collection is string
        if (typeof this.collection === 'string') {
          ...
        }
      }
    }
  }
}

const sorter = new Sorter([10, 3, -5, 0])
sorter.sort()
console.log(sorter.collection)
```

이렇게 타입을 union type으로 추가할 때마다 if 문을 사용하면 클래스가 매우 지저분해지므로, Sorter 클래스를 추상화하는 방법을 쓰는 게 더 낫다.

### Step 4. Sorter 클래스 추상화

Sorter 클래스에 number[], string을 받아서 소팅하고 싶은 게 목적이다. 하지만 union type으로 받으먼 타입가드를 활용한다 하더라도 if 문이 너무 많아지고 지저분해진다.

그렇다면 Sorter 클래스가 Sortable이라는 커스텀 타입을 받는다고 하면 어떨까?

```typescript
class Sorter {
  constructor(public collection: Sortable) {}
  ...
}
```

그리고 이 Sorter 클래스 내부에서 하는 일은 크게 1. 대소비교와 2. 비교를 통해 정렬(Swap)하는 것인데, 이 과정에서 버블 소트를 이용하므로 인자로 들어오는 자료 구조에 대한 length도 필요하다. 그래서 정리하자면 만약 Sortable이라는 타입이 들어올 수 있도록 한다면, 이 Sortable은

1. compare 메서드
2. swap 메서드
3. length 프로퍼티

이 3가지를 갖고 있어야 한다. 이 것을 인터페이스로 나타내자면 이렇다.

```typescript
interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

class Sorter {
  constructor(public collection: Sortable) {}
  ...
}
```

가장 처음에 가정했던 number[]를 Sortable로 만들어보자. number[]를 받는 `NumbersCollection`이라는 클래스를 만든다. 그리고 이 클래스는 Sortable 이어야 하므로 Sortable 인터페이스의 3가지 속성을 갖고 있어야 한다.

```typescript
export class NumbersCollection {
  constructor(public data: number[]) {}

  // get 을 쓰면 length() 라고 부르지 않음
  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex]
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex]
    this.data[leftIndex] = this.data[rightIndex]
    this.data[rightIndex] = leftHand
  }
}
```

이제 이것을 Sorter에 적용하면

```typescript
import { NumbersCollection } from './NumbersCollection'

export class Sorter {
  constructor(public collection: NumbersCollection) {}

  sort(): void {
    const { length } = this.collection
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1)
        }
      }
    }
  }
}

const NumbersCollection = new NumbersCollection([11, 3, -5, 0])
const numberSorter = new Sorter(NumbersCollection)
numberSorter.sort()
console.log(NumbersCollection.data) // [-5, 0, 3, 11]
```

잘 적용된다. string에 대해서도 마찬가지다.

```typescript
export class CharactersCollection {
  constructor(public data: string) {}

  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
    )
  }

  swap(leftIndex: number, rightIndex: number): void {
    const characters = this.data.split('')

    const leftHand = characters[leftIndex]
    characters[leftIndex] = characters[rightIndex]
    characters[rightIndex] = leftHand

    this.data = characters.join('')
  }
}

const CharactersCollection = new CharactersCollection('XaLWb')
const strSorter = new Sorter(CharactersCollection)
strSorter.sort()
console.log(CharactersCollection.data)
```

하지만 이런 식으로 하면 늘 Sorter 인스턴스를 생성하고, 거기서 sort() 를 호출해야 한다. Sorter를 인스턴스화하지 않고 numbersCollection.sort() 할 수는 없을까?

inheritance를 이용하면 된다. Sorter를 다른 컬렉션 클래스들이 상속받는 것이다. 그러면 Sorter를 인스턴스화하지 않고 컬렉션 클래스들만 인스턴스화해서 바로 sort()를 사용할 수 있을 것이다. 다만 여기서 또 다시 작은 문제가 생긴다.

### Step 5. 추상 클래스

Sorter 클래스를 NumbersCollection이나 CharactersCollection이 상속하면 sort()메서드를 사용할 수 있게 되는 것은 맞다. 상속한 메서드인 sort()를 사용한다 건 이 sort()를 복사 붙여 넣기해서 NumbersCollection 내부에 놓았다고 생각하면 되는데, 그럴 경우

`this.collection.length` → `this.length`

`this.collection.compare()` → `this.compare()`

`this.collection.swap()` → `this.swap()`

이렇게 바꾸어야 사용할 수 있다.

```typescript
export class Sorter {
  sort(): void {
    const { length } = this
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1)
        }
      }
    }
  }
}
```

즉 복사 붙여넣기한 sort()가 컬렉션 클래스에서 사용되려면 위처럼 컨스트럭터를 삭제하고 collection 부분 또한 삭제해버려야 한다.

그러면 `Property 'length' does not exist on type 'Sorter'.` 이라는 에러가 뜬다. 왜냐하면 Sorter 클래스 내부엔 정작 length, compare(), swap()이 구현되어 있지 않기 때문이다. 우리는 나중에 이 클래스를 상속해서 사용할 것이므로 그 자식 클래스에는 위 메서드들이 구현될 것임을 알고 있지만 _타입스크립트는 딱 Sorter 클래스만 분리해서 생각한다._

그러므로 타입스크립트에게 이 Sorter클래스 내부에 아직 구현되지 않은 length, compare(), swap()는 자식클래스 내부에 구현될 것이라고 말해줘야 한다. 그게 *추상 클래스*다. class 앞에 abstract를 붙여 추상 클래스라는 것을 나타내고, 클래스 내부에 abstract 메서드를 타입시그니처와 함께 써준다.

```typescript
interface Sortable {
  length: number
  compare(leftIndex: number, rightIndex: number): boolean
  swap(leftIndex: number, rightIndex: number): void
}

export abstract class Sorter {
  abstract length: number
  abstract compare(leftIndex: number, rightIndex: number): boolean
  abstract swap(leftIndex: number, rightIndex: number): void

  sort(): void {
    const { length } = this
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1)
        }
      }
    }
  }
}
```

이렇게 함으로써 에러가 사라지고 컬렉션 클래스들은 바로 인스턴스를 생성하여 sort() 메서드를 사용할 수 있게 된다.
