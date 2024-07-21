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

    const [genome] = useState('hg19'); // or other genome versions

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
            <h1>JBrowse2 React Genome Search</h1>
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
            <h3>See the state</h3>
            <div>
                <button
                    onClick={() => {
                        if (viewState) {
                            setStateSnapshot(JSON.stringify(viewState.session, undefined, 2));
                        }
                    }}
                >
                    Show session
                </button>
            </div>
            <textarea value={stateSnapshot} readOnly rows={20} cols={80} />
            <h3>React to the view</h3>
            <p>
                Using <code>onChange</code> in <code>createViewState</code>, you can observe what is
                happening in the view and react to it. The changes in the state of the view are emitted as{' '}
                <a href="http://jsonpatch.com/" target="_blank" rel="noreferrer">
                    JSON patches
                </a>
                . The patches for the component on this page are shown below.
            </p>
            <textarea value="" readOnly rows={5} cols={80} wrap="off" />
        </>
    );
}

export default App;
