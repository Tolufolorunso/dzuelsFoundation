import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import classes from '../dashboard.module.css'
import CustomHeader from '@/components/typography/CustomHeader'
import CreateLibraryModel from './CreateLibraryModel'

function BaseComponent() {
  function openModel() {}
  return (
    <React.Fragment>
      <CreateLibraryModel />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={classes.balancePaper}>
            <CustomHeader level={2} text="Create Library" />
            <Button variant="outlined" onClick={openModel}>
              Outlined
            </Button>
          </Paper>
        </Grid>
        {/* Recent TotalCard */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.balancePaper}>
            {/* <CovidWarning /> */}
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={classes.fixedHeightPaper}>{/* <Chart /> */}</Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.fixedHeightPaper}>{/* <Tools /> */}</Paper>
        </Grid>
        {/* ExpensesTable */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>{/* <ExpensesTable /> */}</Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BaseComponent
