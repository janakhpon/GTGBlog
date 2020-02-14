import React from 'react'
import { graphql} from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import PageListItem from '../components/ListItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const IndexPage = (props) => {
  console.log(props)
  const { edges } = props.data.allMarkdownRemark
  console.log(edges)
  const classes = useStyles()
  const [features, setFeatures] = React.useState(true)
  const [info, setInfo] = React.useState(true)

  function handleClick(id) {
    switch (id) {
      case "features":
        setFeatures(!features)
        break;
      case "info":
        setInfo(!info)
        break
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      {
        edges.map((article, key) => {
          return <PageListItem article={article} key={key} />
        })
      }
    </Layout>
  )
}

export default IndexPage


export const pageQuery = graphql`
query MyQuery {
  allMarkdownRemark {
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
          path
        }
        internal {
          content
        }
        headings {
          value
          depth
        }
      }
    }
  }
}

`