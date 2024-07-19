import { types, Instance } from 'mobx-state-tree';
import LinearFeatureDisplay from './LinearFeatureDisplay';

const FeatureTrack = types.model('FeatureTrack', {
    id: types.identifier,
    type: types.string,
    configuration: types.string,
    minimized: types.optional(types.boolean, false),
    displays: types.array(LinearFeatureDisplay),
});

export type IFeatureTrack = Instance<typeof FeatureTrack>;
export default FeatureTrack;
