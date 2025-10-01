import { create } from 'zustand';

export const useListingDraftStore = create(set => ({
  draft: {},
  setDraft: (data) => set(state => ({ draft: { ...state.draft, ...data } })),
  resetDraft: () => set({ draft: {} }),
}));
