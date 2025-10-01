export const useListingDraftStore = () => {
  return {
    draft: {},
    setDraft: (data: any) => console.log('Draft updated:', data),
    resetDraft: () => console.log('Draft reset'),
  };
};
