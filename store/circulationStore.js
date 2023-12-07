import fetchApi from '@/utils/fetchApi'
import { getOverDue } from '@/utils/getOverdue'
import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useCirculationStore = create((set) => ({
  circulation: {
    patronData: null,
    holds: [],
    overdue: [],
    isPatronDialogOpen: false,
    patronBarcode: null,
  },
  setPatron: (patron) => {
    set((state) => ({
      circulation: {
        ...state.circulation,
        patronData: patron,
      },
    }))
  },
  openPatronDialog: async (isOpen, barcode) => {
    set((state) => ({
      circulation: {
        ...state.circulation,
        isPatronDialogOpen: isOpen,
        patronBarcode: barcode,
      },
    }))
  },
  clearPatronData: () => {
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
      return []
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
