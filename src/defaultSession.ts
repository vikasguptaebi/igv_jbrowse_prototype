const session = {
  name: 'Bacterial Genome Session',
  margin: 0,
  view: {
    id: 'linearGenomeView',
    minimized: false,
    type: 'LinearGenomeView',
    offsetPx: 0,
    bpPerPx: 0.5,
    displayedRegions: [
      {
        refName: 'contig1', // Replace 'contig1' with the actual contig name from the FASTA file
        start: 0,
        end: 4000, // Update this with the actual length of the contig
        reversed: false,
        assemblyName: 'b_uniformis',
      },
    ],
    tracks: [
      // {
      //   id: 'FeatureTrack1',
      //   type: 'FeatureTrack',
      //   configuration: 'structural_annotation', // Ensure it matches trackId in tracks.ts
      //   minimized: false,
      //   displays: [
      //     {
      //       id: 'referenceDisplay',
      //       type: 'FeatureTrack',
      //       height: 100,
      //       configuration: 'structural_annotation',
      //       showForward: true,
      //       showReverse: true,
      //       showTranslation: true,
      //     },
      //   ],
      // },
    ],
    hideHeader: false,
    hideHeaderOverview: false,
    hideNoTracksActive: false,
    trackSelectorType: 'hierarchical',
    trackLabels: 'overlapping',
    showCenterLine: false,
    showCytobandsSetting: true,
    showGridlines: true,
  },
};

export default session;
