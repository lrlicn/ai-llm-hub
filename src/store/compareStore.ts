import { defineStore } from 'pinia';

interface CompareState {
  ids: string[];
  max: number;
}

export const useCompareStore = defineStore('compare', {
  state: (): CompareState => ({
    ids: [],
    max: 4
  }),
  getters: {
    count: (state) => state.ids.length,
    isFull: (state) => state.ids.length >= state.max,
    hasId: (state) => (id: string) => state.ids.includes(id)
  },
  actions: {
    add(id: string): boolean {
      if (this.ids.includes(id)) return false;
      if (this.ids.length >= this.max) return false;
      this.ids.push(id);
      return true;
    },
    remove(id: string) {
      this.ids = this.ids.filter(x => x !== id);
    },
    toggle(id: string) {
      if (this.ids.includes(id)) {
        this.remove(id);
      } else {
        this.add(id);
      }
    },
    clear() {
      this.ids = [];
    }
  }
});
