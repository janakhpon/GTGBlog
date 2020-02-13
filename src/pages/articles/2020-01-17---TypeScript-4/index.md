---
title: '타입스크립트 - Class와 상속'
date: '2020-01-17T23:52'
layout: post
draft: false
path: '/posts/typescript-class-inheritance/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'Class'
  - 'Inheritance'
description: '타입스크립트 - Class와 상속'
---

## Class란

Class란 어떤 것을 나타내기 위해 메서드(functions)와 필드(fields)를 가진 객체를 정의하는 청사진(blueprint)이다.

```typescript
class Vehicle {
  drive(): void {
    console.log('chugga chugga')
  }

  honk(): void: {
    console.log('beep')
  }
}

const vehicle = new Vehicle(); // vehicle은 Vehicle 클래스가 가진 메서드를 갖게 된다.
vehicle.drive(); // 'chugga chugga'
vehicle.honk(); // 'beep'
```

## Basic Inheritance(상속)

```typescript
class Car {} extends Vehicle // Car class는 위에서 정의한 Vehicle을 상속한다.
const car = new Car();
car.drive(); // 'chugga chugga'
car.honk(); // 'beep'
```

car는 Car의 인스턴스이고, Car는 Vehicle을 상속받았으므로 부모 클래스인 Vehicle이 갖고 있는 메서드를 그대로 가진다. 자식 클래스는 부모의 메서드를 오버라이드할 수 있다.

```typescript
class Car extends Vehicle {
  drive(): void {
    console.log('Vroom')
  }
}
const newCar = new Car()
newCar.drive() // 'Vroom'
```

## Modifier(접근제어자)

### public

메서드가 언제 어디서든 호출될 수 있다.

### private

같은 클래스에 속한 다른 메서드에서만 해당 함수를 호출할 수 있다.

```typescript
class Vehicle {
  public drive(): void {
    console.log('Chugga Chugga')
  }
}

class Car extends Vehicle {
  private drive(): void {
    // Error!!
    console.log('Vroom')
  }

  startDrive(): void {
    this.drive()
  }
}
```

Car 클래스 내의 drive 함수는 private이므로, 내부의 startDrive() 메서드만 부를 수 있다. 그래서 startDrive()가 drive()를 호출하는 것은 괜찮지만, 문제는 drive의 오버라이드 문제이다.

자식 클래스가 부모 클래스의 메서드를 **오버라이딩할 때 접근 제어자는 수정이 불가능**하기 때문에 에러 메세지가 뜬다. 그리고 Vehicle의 drive 메서드를 똑같이 private으로 설정하더라도, *private 메서드는 오버라이딩이 불가능*하므로 또 에러 메세지가 뜬다.

### protected

같은 클래스 및 자식 클래스에 속한 메서드들만 해당 함수를 호출할 수 있다.

```typescript
class Vehicle {
  protected drive(): void {
    console.log('Chugga Chugga')
  }
}

class Car extends Vehicle {
  protected drive(): void {
    console.log('Beep')
  }

  startDrive(): void {
    this.drive()
  }
}

const newCar = new Car()
newCar.startDrive()
```

protected 제어자의 경우 drive() 메서드를 오버라이딩 가능하다.

## 클래스의 필드와 상속

Vehicle이 color라는 필드를 갖고 있다고 하자.

```typescript
class Vehicle {
  color: string = 'red'

  constructor(color: string) {
    this.color = color
  }
}

const vehicle = new Vehicle('blue')

console.log(vehicle.color) // 'blue'
```

위 코드를 좀 더 간단하게 하려면 클래스 내에 필드를 선언하는 부분을 생략하고, constructor 인자에 public 접근제어자를 주면 된다. 결과는 같다.

```typescript
class Vehicle {
  constructor(public color: string) {}
}

const vehicle = new Vehicle('blue')

console.log(vehicle.color) // 'blue'
```

이제 필드를 상속해보자. Car 클래스가 Vehicle을 상속하면, Car 내부에 컨스트럭터가 따로 없는 경우에는 부모 클래스의 컨스트럭터를 호출하게 되어 있다. 그러므로 Car 클래스의 인스턴스를 만들 때에도 color를 인자로 넣어줘야 한다.

```typescript
class Vehicle {
  constructor(public color: string) {}
}

const vehicle = new Vehicle('blue')

class Car extends Vehicle {}

const newCar = new Car('yellow')
```

만약 Car 클래스 내부에서 컨스트럭터를 따로 선언한다면 내부에서 부모의 컨스트럭터를 호출해야 한다. (super) 하지만 super()를 부르더라도 에러가 나는데, Vehicle의 컨스트럭터에는 color라는 하나의 인자가 필요하기 때문이다. 그래서 super('red') 이런 식으로 인자를 넘겨주어야 하는데, 이렇게 하드코딩하는 방식보다는 Car의 컨스트럭터에서 color 필드를 오버라이딩하고, 그것을 super에 넘겨주는 것이 좋다.

오버라이딩은 함수뿐만 아니라 필드도 마찬가지로 가능하다. 여기선 Vehicle이 가지고 있는 color를 오버라이딩한 것이고, Car의 컨스트럭터에서 color 앞에 접근제어자를 쓰지 않은 것은 오버라이딩할 때 어차피 접근제어자도 상속이 되기 때문이다.

```typescript
class Vehicle {
  constructor(public color: string) {
    this.color = color
  }
}

const vehicle = new Vehicle('blue')

// 자식 클래스 내부에 컨스트럭터를 선언하더라도
// 부모 클래스의 컨스트럭터를 불러야 한다. (super)
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color)
  }
}

const newCar = new Car(4, 'yellow') // 두 번째 인자로 color를 넘겨준다.
```
