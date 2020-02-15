import React from 'react'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="PagebyAuthors" />
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

            <Chip
              avatar={<Avatar alt="Janakh Pon" src="https://avatars3.githubusercontent.com/u/42414925?s=460&v=4" />}
              label="Janakh Pon"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar alt="Janakh Pon" src="https://avatars3.githubusercontent.com/u/42414925?s=460&v=4" />}
              label="Janakh Pon"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Layout>
)

export default SecondPage
