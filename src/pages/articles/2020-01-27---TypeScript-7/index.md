---
title: '타입스크립트 - 타입 가드'
date: '2020-01-27T23:52'
layout: post
draft: false
path: '/posts/typescript-type-guard/'
category: 'TypeScript'
tags:
  - 'TypeScript'
  - 'Type Guard'
  - 'typeof'
  - 'instanceof'
  - 'Generic'
description: '타입스크립트 - 타입 가드'
---

## 내장 타입 가드

TS 독스에서는 타입 가드에 대해 이렇게 설명한다.

> Some expression that performs a runtime check that guarantees the type in some scope.

여기서 중요한 건 `런타임 체크`라는 말인데 if 문을 통해 타입을 분기하면, 코드가 실행될 때 그 if 문 안에서는 특정 타입이라는 것을 확실히 할 수 있다는 거다.

타입가드는 타입스크립트가 내장한 `typeof` 와 `instanceof` 로 구현되는데, 다만 `typeof`는 *string, number, bigint, boolean, symbol, undefined, object, function*에 대해서만 작동한다. (주로 primitive긴 하지만 object랑 function도 포함...)

`instanceof` 는 말 그대로 특정 클래스의 인스턴스인지를 체크하는 것이다. (컨스트럭터 함수로 생성되는 모든 것들)

타입가드가 필요한 상황을 가정해보자.

```typescript
interface Vehicle {
  move: (distance: number) => void
}

class Car implements Vehicle {
  move = (distance: number) => {
    // Move car…
  }

  turnSteeringWheel = (direction: string) => {
    // Turn wheel…
  }
}

class VehicleController {
  vehicle: Vehicle
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle
  }
}

const myCar = new Car()
const vehicleController = new VehicleController(myCar)

const vehicle = vehicleController.vehicle

vehicle.turnSteeringWheel('left') // Error
```

`Property 'turnSteeringWheel' does not exist on type 'Vehicle'.` 이라는 에러메세지가 뜬다. vehicle은 Car이지만, VehicleController는 이를 Vehicle로만 본다. 그래서 turnSteeringWheel 이라는 프로퍼티가 없다는 에러가 뜨는 것이다.

여기서 타입가드를 사용하여 vehicle이 Car의 인스턴스라는 것을 확인시켜주면 타입스크립트 컴파일러는 안심하고 에러메세지를 띄우지 않는다.

```typescript
const myCar = new Car()
const vehicleController = new VehicleController(myCar)

const vehicle = vehicleController.vehicle

if (vehicle instanceof Car) {
  vehicle.turnSteeringWheel('left')
}
```

하지만 클래스에 대해서만 적용할 수 있기 때문에, 같은 속성을 가진 객체에 대해서는 작동하지 않는다.

```typescript
const anotherCar = {
  move: (distance: number) => null,
  turnSteeringWheel: (direction: string) => null,
} // 'anotherCar'는 'Car'와 같은 속성을 갖고 있다. 하지만 'Car'의 인스턴스는 아니다.

const anotherVehicleController = new VehicleController(anotherCar)

const { vehicle } = anotherVehicleController

if (vehicle instanceof Car) {
  vehicle.turnSteeringWheel('left') // No TS errors as 'vehicle: Car'
  console.log('Nice car!')
} else {
  console.log("Dude, where's my car?!")
}

// console: Dude, where's my car?!
```

위 예시에서 anotherCar는 Car이랑 같은 속성을 가졌지만, Car의 인스턴스는 아니기 때문에 `vehicle instanceof Car` 에서 false를 리턴한다. 그래서 모든 객체에 대해 타입 체크를 하고 싶을 때에는 커스텀 타입 가드를 만드는 것도 방법이다.

## 커스텀 타입 가드

```typescript
// isCar returns a type predict
const isCar = (variableToCheck: any): variableToCheck is Car =>
  (variableToCheck as Car).turnSteeringWheel !== undefined

if (isCar(vehicle)) {
  vehicle.turnSteeringWheel('left')
}
```

isCar는 타입이 Car인지 체크하는 함수인데, 중요한 점은 리턴타입이 `variableToCheck is Car` 이라는 것이다. 이 함수를 호출한 결과가 true이면 `variableToCheck is Car`가 참이라는 것이므로 타입스크립트 컴파일러는 인자로 전달된 객체가 Car임을 확신하게 된다.

함수 내부의 로직은 매개변수를 Car로 캐스팅한 다음 turnSteeringWheel이라는 속성이 있는지 확인하는 것이다.

```typescript
interface Vehicle {
  move: (distance: number) => void
}

class Car implements Vehicle {
  move = (distance: number) => {
    // Move car…
  }

  turnSteeringWheel = (direction: string) => {
    // Turn wheel…
  }
}

class VehicleController {
  vehicle: Vehicle
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle
  }
}

const isCar = (variableToCheck: any): variableToCheck is Car =>
  (variableToCheck as Car).turnSteeringWheel !== undefined

const anotherCar = {
  move: (distance: number) => null,
  turnSteeringWheel: (direction: string) => null,
}

const anotherVehicleController = new VehicleController(anotherCar)

const { vehicle } = anotherVehicleController

if (isCar(vehicle)) {
  vehicle.turnSteeringWheel('left') // No errors, because 'vehicle: Car'
  console.log('Nice car!')
} else {
  console.log("Dude, where's my car?!")
}

// console: Nice Car!
```

아까는 통과되지 않았던 anotherCar이 이제는 타입체크를 통과한다. 이렇듯 커스텀 타입 가드는 내장 타입 가드가 해주지 못하는 부분을 커버해주지만, 타입체크할 것이 굉장히 많은 경우 이를 일일이 만들어야 한다는 단점이 있다. 예를 들어

```typescript
const isNumber = (variableToCheck: any): variableToCheck is number =>
  (variableToCheck as number).toExponential !== undefined

const isString = (variableToCheck: any): variableToCheck is string =>
  (variableToCheck as string).toLowerCase !== undefined
```

같은 형태인데 타입만 바꿔서 반복된다. 그래서 여기서 generic이 등장한다.

## 제네릭 타입 가드

```typescript
const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined
```

타입변수 T가 추가됐을 뿐 형태가 똑같다. Car 예시에 적용하면 이렇다.

```typescript
const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined

if (isOfType<Car>(vehicle, 'turnSteeringWheel')) {
  vehicle.turnSteeringWheel('left') // No errors, because 'vehicle: Car'
  console.log('Nice car!')
} else {
  console.log("Dude, where's my car?!")
}

// console: Nice Car!
```

## 주의점

하지만 위 예시들에서는 모두 turnSteeringWheel 속성을 가지면 Car이라고 확신하고 있다. 하지만 아래처럼 turnSteeringWheel이 Car의 고유한 속성이 아닌 경우에는 문제가 될 수 있다.

```typescript
interface Bus extends Vehicle {
  turnSteeringWheel: (direction: string) => null
  isDelayed: boolean
}

const myBus: Bus = {
  move: (distance: number) => null,
  turnSteeringWheel: (direction: string) => null,
  isDelayed: true,
}

const yetAnotherVehicleController = new VehicleController(myBus)

const { vehicle } = yetAnotherVehicleController

if (isOfType<Car>(vehicle, 'turnSteeringWheel')) {
  vehicle.turnSteeringWheel('left') // The compiler thinks 'yetAnotherVehicle: Car', even though we know its a 'Bus'
  console.log('Nice ca... wait a second...')
} else {
  console.log("Dude, where's my car?!")
}

// console: Nice ca... wait a second...
```

Vehicle 인터페이스를 상속한 Bus 인터페이스는 Car 클래스와 마찬가지로 turnSteeringWheel을 갖고 있어서 타입체크에서 Car로 판정된다. 즉 더 복잡하고 큰 어플리케이션에서는 타입가드를 주의해서 사용해야 한다.

## 참고

[https://rangle.io/blog/how-to-use-typescript-type-guards/](https://rangle.io/blog/how-to-use-typescript-type-guards/)
