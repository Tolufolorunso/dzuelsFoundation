import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const usePatronStore = create((set) => ({
  patrons: {
    selectedPatronType: 'student',
    isLoading: false,
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
