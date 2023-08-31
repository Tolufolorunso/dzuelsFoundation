import fetchApi from '@/utils/fetchApi'
import { getOverDue } from '@/utils/getOverdue'
import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useCirculationStore = create((set) => ({
  circulation: {
    patronData: null,
    holds: [],
    overdue: [],
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
  getHolds: async () => {
    try {
      const res = await fetchApi('/circulation/holds')
      return res.holds
    } catch (error) {
      throw new Error(error.message)
    }
  },
  setHolds: async (holds) => {
    const currentDate = new Date()
    set((state) => {
      return {
        circulation: {
          ...state.circulation,
          holds: holds,
          overdue: getOverDue(holds),
        },
      }
    })
  },
}))

export default useCirculationStore
