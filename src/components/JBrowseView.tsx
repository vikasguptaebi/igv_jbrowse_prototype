import React, { useEffect, useState } from 'react';
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';
import makeWorkerInstance from '@jbrowse/react-linear-genome-view/esm/makeWorkerInstance';
import assembly from '../assembly';
import tracks from '../tracks';

interface JBrowseViewProps {
    setViewState: React.Dispatch<React.SetStateAction<any>>;
}

const JBrowseView: React.FC<JBrowseViewProps> = ({ setViewState }) => {
    const [localViewState, setLocalViewState] = useState<any>(null);

    useEffect(() => {
        const initializeViewState = async () => {
            try {
                const state = createViewState({
                    assembly,
                    tracks: tracks.filter(track => track.platform === 'jbrowse'),
                    onChange: (patch: any) => {
                        console.log(JSON.stringify(patch));
                    },
                    configuration: {
                        rpc: {
                            defaultDriver: 'WebWorkerRpcDriver',
                        },
                    },
                    makeWorkerInstance,
                });

                setViewState(state);
                setLocalViewState(state);

                const assemblyManager = state.assemblyManager;
                    const assemblyInstance = assemblyManager.get(assembly.name);

                if (assemblyInstance) {
                    await assemblyInstance.load();

                    if (state.session.view.displayedRegions.length === 0) {
                        state.session.view.setDisplayedRegions([
                            {
                                assemblyName: assembly.name,
                                refName: 'contig_1',
                                start: 0,
                                end: 100000,
                            },
                            {
                                assemblyName: assembly.name,
                                refName: 'contig_2',
                                start: 0,
                                end: 100000,
                            },
                        ]);
                    }
                }
            } catch (error) {
                console.error('Error initializing view state:', error);
            }
        };

        initializeViewState();
    }, [setViewState]);

    if (!localViewState) {
        return <p>Loading...</p>;
    }

    return <JBrowseLinearGenomeView viewState={localViewState} />;
};

export default JBrowseView;
