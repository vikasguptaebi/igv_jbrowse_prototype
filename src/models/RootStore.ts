import { types, Instance } from 'mobx-state-tree';
import FeatureTrack from './FeatureTrack';

const RootStore = types.model('RootStore', {
    tracks: types.array(FeatureTrack),
});

export type IRootStore = Instance<typeof RootStore>;
export default RootStore;
