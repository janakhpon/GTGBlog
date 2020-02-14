import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'

const ArticleDetail = ({ location}) => (
    <Layout>
        <h1>LOL</h1>
    </Layout>
)

export default ArticleDetail

export const query = graphql`
  query myQuery($id: String!){
    allMarkdownRemark(filter: {id: {eq: $id }}) {
      edges {
        node {
          id
          frontmatter {
            author
            category
            layout
            date
            draft
            title
            tags
            description
          }
          internal {
            content
          }
        }
      }
    }
  }
`