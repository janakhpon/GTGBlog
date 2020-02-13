## flex items 속성

컨테이너의 자식들, 즉 flex item들이 갖는 주요한 속성은 이렇다. 부모인 컨테이너의 주요 속성은 [전 포스팅](https://alledy.netlify.com/posts/flex-box-container-props/) 에서 다루었다.

- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### flex-grow

플렉스 그로우는 필요한 경우 아이템이 늘어날 수 있는 능력을 말한다. 여태까지 컨테이너 속성만 정의했을 때는 아이템들이 정렬되는 방향은 바꿀 수 있었지만, 아이템 자체가 늘어나지는 않았었다. 그러나 이 속성을 아이템에 주게 되면 아이템 자체가 늘어나서 컨테이너를 꽉 채울 수 있게 된다. 그리고 grow에 주는 값에 따라서 그 비율이 바뀌는 것이다.

flex-grow의 디폴트 값은 0이다. 즉 늘어나지 않는다는 뜻이다. 그런데 모든 아이템에게 flex-grow: 1; 이라는 속성을 주면 아래처럼 컨테이너를 채운다.

## 참고

[css-tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
