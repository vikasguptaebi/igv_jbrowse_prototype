const assembly = {
    name: 'b_uniformis',
    sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'b_uniformis_assembly_reference', // Ensure unique trackId
        adapter: {
            type: 'IndexedFastaAdapter',
            fastaLocation: {
                uri: 'http://localhost:3000/BU_ATCC8492VPI0062_NT5002.1.fa',
            },
            faiLocation: {
                uri: 'http://localhost:3000/BU_ATCC8492VPI0062_NT5002.1.fa.fai',
            },
        },
    },
};

export default assembly;
