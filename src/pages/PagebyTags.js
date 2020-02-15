import React from 'react'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="PagebyTags" />
    <Grid container spacing={1}>
      <Grid item xs={8}>

      </Grid>
      <Grid item xs={4}>

        <Grid container>
          <Grid xs={12}>

            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon fontSize="large" />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="..." fullWidth />
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12} style={{ marginBottom: '2rem' }}>
            {
              ''
            }
          </Grid>

          <Grid item={12}>

            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
            <Chip size="small" label="tags" />
          </Grid>
        </Grid>


      </Grid>
    </Grid>
  </Layout>
)

export default SecondPage
