import React from 'react';
import { observer } from 'mobx-react';
import { IRootStore } from '../models/RootStore';
import { IFeatureTrack } from '../models/FeatureTrack';
import { ILinearFeatureDisplay } from '../models/LinearFeatureDisplay';

interface GenomeViewProps {
    store: IRootStore;
}

const GenomeView: React.FC<GenomeViewProps> = observer(({ store }) => {
    const tracks = store.tracks;

    return (
        <div>
            {tracks.map((track: IFeatureTrack) => (
                <div key={track.id}>
                    <h2>{track.configuration}</h2>
                    {track.displays.map((display: ILinearFeatureDisplay) => (
                        <div key={display.id}>
                            <p>Type: {display.type}</p>
                            <p>Height: {display.height}</p>
                            <p>Configuration: {display.configuration}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default GenomeView;
