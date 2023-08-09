import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useCohortStore = create((set) => ({
  cohort: {
    students: [],
    presents: [],
  },
  setStudents: function (data) {
    set((state) => ({
      cohort: {
        ...state.cohort,
        students: data,
      },
    }))
  },
  setPresent: function (barcode) {
    set((state) => ({
      cohort: {
        ...state.cohort,
        presents: [...state.cohort.presents, barcode],
      },
    }))
  },
}))

export default useCohortStore
