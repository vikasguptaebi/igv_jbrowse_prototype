import { types, Instance } from 'mobx-state-tree';

const LinearFeatureDisplay = types.model('LinearFeatureDisplay', {
    id: types.identifier,
    type: types.string,
    height: types.optional(types.number, 100),
    configuration: types.string,
    showForward: types.optional(types.boolean, true),
    showReverse: types.optional(types.boolean, true),
});

export type ILinearFeatureDisplay = Instance<typeof LinearFeatureDisplay>;
export default LinearFeatureDisplay;
