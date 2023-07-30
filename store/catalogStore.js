import fetchApi from '@/utils/fetchApi'
import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const useCatalogStore = create((set) => ({
  cataloging: {
    item: null,
  },
  setItemForEdit: (item) => {
    set((state) => ({
      cataloging: {
        ...state.cataloging,
        item,
      },
    }))
  },
  clearItemForEdit: (item) => {
    set((state) => ({
      cataloging: {
        ...state.cataloging,
        item: null,
      },
    }))
  },
}))

export default useCatalogStore
