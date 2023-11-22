import React, { useState } from 'react'
import useDashboardStore from '@/store/dashboardStore'
import { useEffect } from 'react'
import BaseComponent from './home/Main'
import PatronList from './patronList/PatronList'
import Staff from './staff/Staff'
import CompetitionScreen from './competition/Competition'

function MainContent() {
  const activeComponent = useDashboardStore(
    (state) => state.dashboardState.activeComponent
  )

  return (
    <React.Fragment>
      {activeComponent === 'base' && <BaseComponent />}
      {activeComponent === 'patronsList' && <PatronList />}
      {activeComponent === 'competition' && <CompetitionScreen />}
      {activeComponent === 'staff' && <Staff />}
    </React.Fragment>
  )
}

export default MainContent
