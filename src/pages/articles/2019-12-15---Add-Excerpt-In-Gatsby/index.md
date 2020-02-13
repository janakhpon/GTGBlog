---
title: 'Gatsby 블로그에 excerpt 추가하기'
date: '2019-12-15T01:17'
layout: post
draft: false
path: '/posts/add-excerpt-in-gatsby/'
category: 'Gatsby'
tags:
  - 'Gatsby'
  - 'GraphQL'
description: 'Gatsby 블로그에 excerpt 추가하기'
---

개츠비 블로그를 만들 때 내가 선택한 스타터에는 `excerpt` 가 없었다. `excerpt` 란 번역하면 발췌라는 뜻인데, 내용 미리보기처럼 포스팅의 일부분만 조금 잘라서 리스트 뷰에서 보여주는 것이다. 내 블로그의 메인페이지에 들어가면 Post List가 나오는데, 각 Post 컴포넌트가 title과 description으로 이루어져 있었다.

```jsx
class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields
  }
  return (
  ...
  	<h2 className="post__title">
      <Link className="post__title-link" to={slug}>
        {title}
      </Link>
    </h2>
    <p className="post__description">{description}</p>
   ...
  )
}
```

이 description은 title과 별도로 해당 포스팅에 대해 짧게 설명하는 것인데, 사실 딱히 쓸 게 없는 경우가 많다. 타이틀이 곧 포스팅의 한 줄 요약이기 때문이다. 그래서 description을 없앴더니 포스팅의 타이틀만 달랑 표시되는 메인페이지가 너무 허전해 보여서 `excerpt` 를 넣기로 했다.

> The excerpts might be useful for providing content previews on listing pages or for generating SEO descriptions.

게다가 개츠비 홈페이지에 보면 `excerpt`를 추가하는 것이 SEO description을 생성하는 데 유용할 수 있다고 한다.

개츠비에서 `excerpt` 를 추가하는 것은 어렵지 않다.

1. 먼저, 리스팅 페이지를 나타내는 파일을 찾는다.

   보통 개츠비로 만들어진 블로그에 들어가면 포스트 리스트가 뜨는 것을 알 수 있다. 개츠비는 기본적으로 리스팅 페이지를 갖고 있으며, 이 파일의 위치는 `gatsby-source-filesystem` 플러그인 설정에서 알 수 있다.

   처음부터 하나씩 만든게 아니라 스타터로 시작했다면, `gatsby-config.js` 파일에서 설정을 확인한다.

   ```js
   plugins: [
       {
         resolve: 'gatsby-source-filesystem',
         options: {
           path: `${__dirname}/src/pages`,
           name: 'pages',
         },
       },
     ...
   ]
   ```

   `gatsby-source-filesystem` 플러그인(소스 플러그인)이 하는 일은 디스크에서 개츠비가 아직 이해하지 못하는 파일(e.g. 마크다운 파일)을 로드하는 것이다. 이 파일들은 소스 플러그인에 의해 로드된 뒤 transformer 플러그인에 의해서 개츠비가 이해할 수 있는 형식(e.g. HTML)으로 파싱된다.

   어쨌든 이 플러그인의 설정에 path는 md 파일(블로그는 대부분 md로 쓰여지므로)을 어디에 모아놓을지를 설정하는 것이다. 지정한 곳에 md 파일을 저장해야지만 개츠비가 소스 파일을 찾아 transformer에게 넘길 수 있다.

   여기서는 `${__dirname}/src/pages` 라고 설정되어있는데, 현재 프로젝트의 src/pages에 md 파일이 위치해야 한다는 것이다. 또한 리스팅 페이지 파일도 소스 플러그인이 설정한 곳에 위치해야만 한다. 예를 들어 이 경우에는 `src/pages/index.js` 가 될 것이다.

2. 리스팅 페이지 파일 쿼리에 excerpt를 추가한다.

   파일(`src/pages/index.js`)을 보면 이렇다.

   ```jsx
   class IndexRoute extends React.Component {
     render() {
       const items = []
       const { title, subtitle } = this.props.data.site.siteMetadata
       const posts = this.props.data.allMarkdownRemark.edges
       posts.forEach(post => {
         items.push(<Post data={post} key={post.node.fields.slug} />)
       })

       return (
         <Layout>
           <div>
             <Helmet>
               <title>{title}</title>
               <meta name="description" content={subtitle} />
             </Helmet>
             <Sidebar {...this.props} />
             <div className="content">
               <div className="content__inner">{items}</div>
             </div>
           </div>
         </Layout>
       )
     }
   }

   export default IndexRoute
   ```

   리액트답게 코드가 아주 선언적으로 쓰여 있어서 파악하기 쉽다. 전체 레이아웃 안에, 사이드바랑 컨텐트 영역으로 나뉘고, 컨텐트 영역 안에 `items` 라는 변수를 넣어준다. `items` 는 렌더 함수 안에 정의되어 있는데, `props.data.allMarkdownRemark.edges` 를 forEach로 돌면서 하나씩 Post 컴포넌트에 prop로 주입한다.

   여기서 `allMarkdownRemark` 는 GraphQL 프로퍼티인데 **모든** 마크다운 노드를 의미한다. 이 부분이 gql의 장점 중 하나인 것 같다. 페이지 레벨의 gql 쿼리를 통해 한꺼번에 모든 포스트를 요청해서 가져오되 원하는 정보만 선별하여 가져올 수 있다.

   `data.allMarkdownRemark.edges` 로 접근하면 모든 마크다운 노드를 가져올 수 있는데, 그 각 노드(=개별 마크다운 파일)에서 어떤 정보를 포함할 것인가도 쿼리로 설정하면 된다.

   그 부분은 바로 IndexRoute 컴포넌트 밑에 있다.

   ```graphql
   export const pageQuery = graphql`
     query IndexQuery {
   		...
       allMarkdownRemark(
         limit: 1000
         filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
         sort: { order: DESC, fields: [frontmatter___date] }
       ) {
         edges {
           node {
             excerpt
             fields {
               slug
               categorySlug
             }
             frontmatter {
               title
               date
               category
               description
             }
           }
         }
       }
     }
   `
   ```

   `allMarkdownRemark` 프로퍼티 밑에 edges.node가 보인다. 이 node가 각 md 파일을 의미하고, 여기에 적혀진 쿼리대로 요청한 정보를 가져오게 된다. 그러므로 여기에 `excerpt` 를 넣어주면 된다!

   `excerpt`를 만들어서 가져오는 건 `gatsby-transformer-remark` 라는 transformer 플러그인이 해주므로 여기에 적어주기만 하면 된다. 참고로 어디까지 `excerpt` 를 끊어서 가져올지 글자 수를 제한할 수도 있고, 세퍼레이터를 따로 설정해줄 수도 있다. 그건 [여기](https://using-remark.gatsbyjs.org/excerpts/)를 참고.

3) Post 컴포넌트에서 `excerpt`를 넘겨 받고 렌더한다.

   위의 IndexRoute 컴포넌트에서 보면 각 마크다운 노드들을 Post 컴포넌트에 data로 주입하는 것을 볼 수가 있다. 즉 Index 페이지에서 필요한 데이터들을 가져왔고 이걸 또 다시 Post 컴포넌트에 prop으로 넘겼으므로, Post 컴포넌트에서 렌더하도록 하면 된다.

   ```jsx
   class Post extends React.Component {
     render() {
       const {
         title,
         date,
         category,
         description,
       } = this.props.data.node.frontmatter
       const { slug, categorySlug } = this.props.data.node.fields
       const { excerpt } = this.props.data.node

       return (
         	...
           <h2 className="post__title">
             <Link className="post__title-link" to={slug}>
               {title}
             </Link>
           </h2>
           <p className="post__description">{excerpt || description}</p>
   				...
       )
     }
   }

   export default Post
   ```

   아까와 달리 추가된 것은, prop으로 `data.node.excerpt`를 받아와 description보다 우선적으로 렌더링하게 한 점뿐이다. 만약 어떤 오류때문에 `excerpt`를 가져올 수 없거나 본문이 존재하지 않을 때 description이 표시되게 된다.
