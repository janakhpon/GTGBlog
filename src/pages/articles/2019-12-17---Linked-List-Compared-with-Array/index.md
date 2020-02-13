---
title: '배열과 비교한 연결 리스트'
date: '2019-12-17T01:04'
layout: post
draft: false
path: '/posts/linked-list-compared-with-array/'
category: 'Data Structure'
tags:
  - 'Linked List'
  - 'Array'
  - 'Queue'
description: '배열과 비교한 연결 리스트'
---

연결 리스트(linked-list)는 배열과 마찬가지로 항목의 리스트를 표현하는 자료 구조이다. 

## 배열과 다른 점

배열은 어떤 인덱스든 한 단계만에 접근할 수 있다.(=읽기가 `O(1)`) 프로그램은 배열이 어떤 메모리 주소부터 시작하는지 알고 있으며 전체 길이를 알고 있기 때문이다. 예컨대 0번째 인덱스의 주소가 1000이면 4번째 인덱스의 주소는 1004라는 바로 알 수 있다. 

이와 달리 리스트는 나란히 이어진 메모리 셀 묶음이 아니다. 서로 인접하지 않은 메모리 셀 묶음으로 이루어져 있어, 컴퓨터 메모리 전체에 걸쳐 여러 셀에 퍼져 있을 수 있다. 서로 _인접하지 않은 이러한 셀_ 을 **노드** 라고 부른다. 



## 연결 리스트의 구현

연결 리스트는 배열과 달리 나란히 있지 않으므로, **각 노드의 데이터뿐 아니라 다음 노드의 메모리 주소도 갖고 있어야 한다.**(가장 마지막 노드의 다음 노드 주소는 null이다) 프로그램은 첫번째 노드가 어디에 있는지 알아야 하고, 이 노드를 따라가며 _순차적으로_ 나머지 노드의 위치도 알 수 있다. 

```python
class Node(object):
  
  # 각 노드는 데이터와 다음 노드의 주소를 저장한다. 
  def __init__(self, data=None, next_node=None):
    self.data = data
    self.next_node = next_node
  
  # 해당 노드의 데이터를 알 수 있다  
  def get_data(self):
    return self.data
  
  # 해당 노드가 가리키는 다음 노드의 주소를 알 수 있다
  def get_next(self):
    return self.next_node
  
  # 다음 노드의 주소를 바꾼다
  def set_next(self, new_next):
    self.next_node = new_next
```

```python
class LinkedList(object):
  
  # 리스트의 헤드 노드(=top node, first node)
  # 연결 리스트가 초기화됐을 때 헤드 노드는 default로 None(노드가 존재하지 않을 수 있으므로)
  def __init__(self, head=None):
    self.head = head
    
  # 맨 앞에 삽입하는 것을 가정  
  def insert(self, data):
    new_node = Node(data)
    new_node.set_next(self.head)
    self.head = new_node
    
  # 헤드 노드부터 시작해서 총 노드의 수를 셈
  def size(self):
    current = self.head
    count = 0
    while current:
      count += 1
      current = current.get_next() 
    return count
  
  # 검색
  def search(self, data):
    current = self.head
    found = False
    while current and found is False:
      if current.get_data() == data:
        found = True
      else:
        current = current.get_next()
    if current is None:
      raise ValueError("Data not in list")
    return current
  
  # 삭제
  # 단순 연결 리스트는 다음 노드에 관한 정보만 저장하고 있으므로
  # n번째 노드를 삭제할 때 n-1번째 노드가 n+1을 가리키게 하기 위해서는
  # current와 별개로 previous라는 변수를 같이 갖고 가야 한다
  def delete(self, data):
    current = self.head
    previous = None
    found = False
    while current and found is False:
      if current.get_data() == data:
        found = True
      else:
        previous = current
        current = current.get_next()
    if current is None:
      raise ValueError("Data not in list")
    # 삭제할 데이터가 헤드노드인 경우와 그 외의 경우
    if previous is None:
      self.head = current.get_next()
    else:
      previous.set_next(current.get_next())
```



## 배열과 빅오표기법으로 비교

| 연산  | 배열                 | 연결리스트              |
| --- | ------------------ | ------------------ |
| 읽기  | O(1)               | O(N)               |
| 검색  | O(N)               | O(N)               |
| 삽입  | O(N) (끝에서 하면 O(1)) | O(N) (앞에서 하면 O(1)) |
| 삭제  | O(N) (끝에서 하면 O(1)) | O(N) (앞에서 하면 O(1)) |

이렇게 보면, 연결 리스트는 모든 연산에서 배열보다 나을 것이 없어 보인다. 그렇다면 연결 리스트를 왜 사용해야 할까?



## 연결 리스트가 배열보다 효율적인 경우

### 리스트를 검사해서 _많은 원소를 삭제_ 할 때

  잘 생각해보면, 배열의 삭제와 연결리스트의 삭제는 같은 O(N)이지만 과정이 다르다. 일단 어떤 원소를 삭제하려면 해당 원소를 읽는 과정과 실제로 삭제하는 과정이 필요하다. 

  배열의 경우: 읽기는 O(1)이다. n번째 인덱스의 원소를 삭제하고자 할 때 그 인덱스에 접근하는 데 한 단계밖에 걸리지 않는다. 그러나 해당 원소를 삭제하고 나서 빈 공간을 없애기 위해 그 뒤의 원소들을 전부 왼쪽으로 시프트해야 한다. 이 과정이 O(N)이 걸린다. 

  연결 리스트의 경우: 읽기가 O(N)이다. n번째 노드를 삭제하고자 할 때 일단 첫번째 노드부터 시작해서 다음 주소를 계속해서 읽어 n번째 인덱스까지 찾아가야 한다. 하지만 실제 삭제 하는 과정은 배열에 비해 매우 간단하다. n-1 번째 노드가 가리키는 다음 메모리 주소를 n의 주소가 아니라, 원래는 n이 가리키고 있었던 n+1번째 노드의 주소를 가리키게끔 바꾸면 된다. 이것은 O(1)이다. 

  두 경우 어쨌든 읽기와 실제 삭제 과정을 합쳐서 삭제에 총 O(N)이 걸린다고 할 수 있다. 그러나 리스트를 검사(검사는 둘다 O(N))해서 유효하지 않은 데이터를 삭제하는 경우를 가정해보자. 베열은 삭제할 때마다 그 뒤의 원소를 시프트하므로, 한 개를 삭제할 때마다 O(N)이 요구된다. N개를 삭제한다고 하면 `N*O(N)`이 소요되는 셈이다. 반면 리스트는 한 개를 삭제할 때 O(1)이 걸린다. N개를 삭제할 때에 `N*O(1)`이 소요된다. 즉, _많은 원소를 삭제_한다고 할 때, __실제 삭제 과정에서 연산이 훨씬 많이 필요한 것은 배열이므로 연결 리스트가 더 효율적이다.__

   

### 이중 연결 리스트로 _큐_를 구현할 때

  큐는 FIFO(First In First Out)이기 때문에, 데이터 삽입은 리스트의 끝에 하고, 데이터 삭제는 리스트의 앞에서 한다. 그런데 리스트 끝에 데이터를 삽입하는 것은 배열은 O(1)이고, 연결 리스트는 O(N)이다. 반면 리스트 앞의 데이터를 삭제하는 것은 배열이 O(N)이고 연결리스트는 O(1)이다. 

  즉 큐에서 삽입과 삭제를 통틀어 보면 연결리스트와 배열 모두 장단점을 갖고 있어서 어떤 것을 택하든 별 차이가 없어 보인다. 하지만 __이중 연결 리스트를 사용하면 큐에서의 데이터 삽입과 삭제를 모두 O(1)에 할 수 있다.__

  

  이중 연결 리스트(Doubly Linked list)는 연결 리스트와 2가지 면에서 구별된다.

  1. 연결 리스트는 첫번째 노드만 기록하지만 이중 연결 리스트는 __첫번째 노드와 마지막 노드를 모두 기록__한다. 
  2. 연결 리스트는 다음 노드의 주소만 알고 있지만 이중 연결 리스트는 __다음 노드뿐만 아니라 앞 노드도 알고 있다.__ 

  

  연결 리스트(이중 연결 리스트와 구분짓기 위해 Singly Linked list라고 한다)는 다음 노드의 주소만 알고 있기 때문에 한 방향으로만 갈 수 있다. 그러나 이중 연결 리스트는 앞 노드의 주소도 알고 있기 때문에 거꾸로 이동하는 것도 가능하다. 

  리스트의 맨 앞을 삭제하는 것은 단순 연결 리스트일 때도 가능한 것이었지만, 리스트 맨 끝의 노드 삽입이 O(1)인 것은 이중 연결 리스트가 가장 마지막 노드의 주소와 그 직전의 노드 주소를 알고 있기 때문에 가능하다.

  ## 참조
  「누구나 자료 구조와 알고리즘」 (제이 웬그로우 저, 길벗 출판)