---
title: '타입스크립트 - Interface'
date: '2020-01-16T23:52'
layout: post
draft: false
path: '/posts/typescript-interface/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'Interface'
description: '타입스크립트 - Interface'
---

## 인터페이스(Interface)란

인터페이스란, 객체의 프로퍼티와 밸류 타입을 묘사하는 **새로운 타입**이다. 인터페이스는 코드의 재사용성을 높인다.

```typescript
// 객체의 property와 value 타입을 묘사한다
interface Vehicle {
  name: string
  year: Date
  broken: boolean
  summary(): string
}
```

예를 들어 위처럼 Vehicle이라는 interface를 지정하면 함수를 사용할 때, 인자로 전달하는 타입이 Vehicle 하나로 정의되면서, 일일이 객체를 쓰지 않아도 된다.

```typescript
const printVehicle = (vehicle:  Vehicle): void => {
	console.log(vehicle.name);
	console.log(vehicle.year;
	console.log(vehicle.broken);
	console.log(vehicle.summary());
}
```

interface에서 중요한 점이 몇 가지 있다.

1. 인터페이스의 *value 타입*에는 어떤 타입이든 들어갈 수 있다. primitive type이든, object type이든, type alias든 들어갈 수 있다.

2. 인터페이스의 *프로퍼티*에는 함수도 포함될 수 있다.

3. 함수 인자의 타입체커로서 인터페이스가 강제하는 것은 인터페이스 내부에 포함된 프로퍼티뿐이다. 예를 들어 printVehicle의 인자로 전달되는 객체가 name, year, broken, summary() 외에 price라는 프로퍼티를 갖고 있더라도 타입스크립트는 이를 신경쓰지 않는다. 그리고 만약 인터페이스 프로퍼티 뒤에 `?` 가 붙어있으면 optional한 프로퍼티라는 의미이므로, 객체가 이를 갖고 있지 않아도 상관없다.

   ```typescript
   interface LabeledValue {
     label: string
   }

   function printLabel(labeledObj: LabeledValue) {
     console.log(labeledObj.label)
   }

   let myObj = { size: 10, label: 'Size 10 Object' } // myObj가 size라는 프로퍼티를 갖고 있어도
   printLabel(myObj) // interface가 요구하는 label만 가지고 있다면 에러가 나지 않는다.
   ```

   다만, 비슷한 경우에서 에러 메세지를 띄우는 경우가 있다.

   첫 번째는 객체에 직접 인터페이스를 타입으로 줄 때이다. 즉 `myObj:LabeledValue` 는 허용되지 않는다. 함수 인자로 전달된 변수를 검사하는 타입체커로서의 인터페이스는, label만 검사하고 이 것이 있으면 나머지 프로퍼티는 신경쓰지 않지만 객체에 직접 인터페이스를 타입으로 선언할 때에는 인터페이스가 갖고 있는 프로퍼티와 일치해야 한다. 위 케이스에서 myObj에 LabeldValue 인터페이스를 타입으로 할당하려고 하면, 아래와 같은 에러 메세지가 발생한다.

   > Type '{ size: number; label: string; }' is not assignable to type 'LabeledValue'.
   > Object literal may only specify known properties, and 'size' does not exist in type 'LabeledValue'

   두 번째, 객체 리터럴을 변수에 할당하지 않고 직접 함수에 인자로 전달할 때에도 과도한 프로퍼티 체크(excess property check)를 받는다.

   ```typescript
   function printLabel(labeledObj: LabeledValue) {
     console.log(labeledObj.label)
   }
   printLabel({ size: 100, label: 'Size 10 Object' }) // Error message
   ```

   이 경우도 첫 번째와 같은 에러메세지가 뜬다. 공식 도큐먼트에서는 아래와 같이 언급한다.

   > Object literals get special treatment and undergo excess property checking when **assigning them to other variables, or passing them as arguments.** If an object literal has any properties that the “target type” doesn’t have, you’ll get an error

   위 2가지 경우에는 인터페이스에서 프로퍼티를 옵셔널하게 지정해도 마찬가지로 에러메세지가 뜬다.

## 인터페이스가 코드 재사용성을 높이는 방법

1. 인터페이스로 타입을 만들어서 이것을 함수 인자의 타입체커로 사용한다. 즉 인터페이스가 함수의 gatekeeper 역할을 하게 한다. (Create functions that accept arguments that are typed with interfaces)
2. 객체/클래스에서 인터페이스를 implement한다. (Objects/classes can decide to _implement_ a given interface to work with function)
