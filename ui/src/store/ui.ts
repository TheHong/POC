import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isDebug: false,
  }),
  actions: {
    toggleDebugMode() {
      this.isDebug = !this.isDebug
    },
  },
})
