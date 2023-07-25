import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useAppStore = create((set) => ({
  appState: {
    successMessage: '',
    errorMessage: '',
    isMenuOpen: false,
  },

  closeMenu: () => {
    set((state) => ({
      appState: {
        ...state.appState,
        isMenuOpen: !state.appState.isMenuOpen,
      },
    }))
  },
  setSuccessMessage: (message) => {
    set((state) => ({
      appState: {
        ...state.appState,
        successMessage: message,
        errorMessage: '',
      },
    }))
  },
  setErrorMessage: (message) => {
    set((state) => ({
      appState: {
        ...state.appState,
        successMessage: '',
        errorMessage: message,
      },
    }))
  },
  clearMessage: () => {
    set((state) => ({
      appState: {
        ...state.appState,
        successMessage: '',
        errorMessage: '',
      },
    }))
  },
}))

export default useAppStore
