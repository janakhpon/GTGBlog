import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'

const ArticleDetail = ({ location}) => (
    <Layout>
        <h1>LOL</h1>
        {
          console.log(location.state)
        }
    </Layout>
)

export default ArticleDetail

