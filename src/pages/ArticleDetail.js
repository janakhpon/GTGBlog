import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const ArticleDetail = ({ location }) => (
  <Layout>
    <h1>{location.state.frontmatter.title}</h1>
    <h5>Published at {location.state.frontmatter.date}</h5>
    <h5>Category : {location.state.frontmatter.category} </h5>
    <h4>Author : {location.state.frontmatter.author} </h4>

    <Typography paragraph style={{ fontSize: '0.80em', fontWeight: 'bold' }}>
      {location.state.content.content}
    </Typography>
    <Grid container>
      <Grid item xs={12}>
        {
          location.state.frontmatter.tags.map((tag, key) => {
            return <Chip size="small" label={tag} key={key} />
          })
        }
      </Grid>
    </Grid>

  </Layout>
)

export default ArticleDetail

