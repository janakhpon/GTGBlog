import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { Link } from 'gatsby'

import '../../styles/components/listitem.scss'

const PageListItem = ({ article }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className="paperclass" style={{boxShadow: 'none', textDecoration: 'none'}}>
                    <h3>
                        <Link
                            to={`/ArticleDetail`}
                            state={{
                                frontmatter: article.node.frontmatter,
                                content: article.node.internal
                            }}
                        >
                            {article.node.frontmatter.title} by {article.node.frontmatter.author}
                        </Link>
                    </h3>
                </Paper>
            </Grid>
        </Grid>
    )
}


export default PageListItem