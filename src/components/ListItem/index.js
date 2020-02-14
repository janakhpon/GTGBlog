import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { Link } from 'gatsby'

const PageListItem = ({ article }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <h3>
                        <Link
                            to={`/ArticleDetail`}
                            state={{
                                frontmatter: article.node.frontmatter,
                                content: article.node.internal
                            }}
                        >
                            {article.node.frontmatter.title}
                        </Link>
                    </h3>
                </Paper>
            </Grid>
        </Grid>
    )
}


export default PageListItem