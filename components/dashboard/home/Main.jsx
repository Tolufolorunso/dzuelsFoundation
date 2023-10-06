import React from 'react'
import { Grid, Paper } from '@mui/material'

import classes from '../dashboard.module.css'

function BaseComponent() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} lg={8}>
        <Paper className={classes.balancePaper}>{/* <TotalCard /> */}</Paper>
      </Grid>
      {/* Recent TotalCard */}
      <Grid item xs={12} md={5} lg={4}>
        <Paper className={classes.balancePaper}>{/* <CovidWarning /> */}</Paper>
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
  )
}

export default BaseComponent
