import React, { useState, useEffect } from 'react';
import JBrowseView from './components/JBrowseView';
import SearchBar from './components/SearchBar';
import GeneSelector from './components/GeneSelector';
import fetchIndexData from './services/fetchIndexData';
import navigateToLocation from './services/navigateToLocation';
import { ViewModel } from '@jbrowse/react-linear-genome-view';
import IGVBrowser from './components/IGVBrowser'; // Import the IGV component
import tracks from './tracks'; // Import tracks from tracks.ts

function App() {
    const [viewState, setViewState] = useState<ViewModel | null>(null);
    const [stateSnapshot, setStateSnapshot] = useState('');
    const [indexData, setIndexData] = useState<{ name: string; loc: string }[]>([]);
    const [selectedGene, setSelectedGene] = useState<string>('');

    const [genome] = useState('customGenome'); // Use a custom genome ID

    useEffect(() => {
        fetchIndexData().then(data => setIndexData(data));
    }, []);

    const handleNavigateToLocation = (loc: string) => {
        if (viewState) {
            navigateToLocation(viewState, loc);
        }
    };

    // Filter tracks specific to IGV
    const igvTracks = tracks.filter(track => track.platform === 'igv');

    return (
        <>
            <h1>JBrowse2 & IGV Genome Search</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                    <JBrowseView setViewState={setViewState} />
                </div>
                <div style={{ width: '48%' }}>
                    <IGVBrowser tracks={igvTracks} genome={genome} />
                </div>
            </div>
            <h3>Control the view</h3>
            <div>
                <p>
                    This is an example of controlling the view from other elements on the page. Selecting a
                    gene from the dropdown will navigate the view to the location of that gene.
                </p>
                <GeneSelector
                    indexData={indexData}
                    selectedGene={selectedGene}
                    setSelectedGene={setSelectedGene}
                    navigateToLocation={handleNavigateToLocation}
                />
            </div>
            <h3>Search for a gene</h3>
            <div>
                <SearchBar viewState={viewState} navigateToLocation={handleNavigateToLocation} />
            </div>
        </>
    );
}

export default App;
