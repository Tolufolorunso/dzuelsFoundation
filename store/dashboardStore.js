import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useDashboardStore = create((set) => ({
  dashboardState: {
    activeComponent: 'base',
  },
  switchComponent: (component) => {
    set((state) => ({
      dashboardState: {
        ...state.dashboardState,
        activeComponent: component,
      },
    }))
  },
}))

export default useDashboardStore
