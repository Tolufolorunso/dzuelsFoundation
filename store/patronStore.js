import fetchApi from '@/utils/fetchApi'
import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const usePatronStore = create((set) => ({
  patrons: {
    allPatrons: null,
    selectedPatronType: 'student',
    isLoading: false,
  },
  setAllPatrons: (patrons) => {
    set((state) => ({
      patrons: {
        ...state.patrons,
        allPatrons: patrons,
      },
    }))
  },
  getPatrons: async () => {
    try {
      const res = await fetchApi('/patrons')
      return res.patrons
    } catch (error) {
      throw new Error(error.message)
    }
  },
  changeSelectedPatronType: (type) => {
    set((state) => ({
      patrons: {
        ...state.patrons,
        selectedPatronType: type,
      },
    }))
  },
  setIsLoading: (bool) => {
    set((state) => ({
      patrons: {
        ...state.patrons,
        isLoading: bool,
      },
    }))
  },
}))

export default usePatronStore
