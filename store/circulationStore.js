import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useCirculationStore = create((set) => ({
  circulation: {
    patronData: null,
  },
  setPatron: (patron) => {
    set((state) => ({
      circulation: {
        ...state.circulation,
        patronData: patron,
      },
    }))
  },
}))

export default useCirculationStore
