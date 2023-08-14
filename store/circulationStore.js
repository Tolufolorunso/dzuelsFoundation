import fetchApi from '@/utils/fetchApi'
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
  clearPatronData: (patron) => {
    set((state) => ({
      circulation: {
        ...state.circulation,
        patronData: null,
      },
    }))
  },
  checkout: async (checkoutData) => {
    try {
      const res = await fetchApi('/circulation/checkout', 'POST', checkoutData)
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  },
}))

export default useCirculationStore
