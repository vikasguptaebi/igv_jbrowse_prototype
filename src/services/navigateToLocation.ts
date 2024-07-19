import { ViewModel } from '@jbrowse/react-linear-genome-view';
import assembly from '../assembly';

const navigateToLocation = async (viewState: ViewModel, loc: string) => {
    if (viewState) {
        const [refName] = loc.split(':');

        // Ensure the assembly is fully loaded before navigation
        await viewState.assemblyManager.waitForAssembly(assembly.name);

        const assemblyInstance = viewState.assemblyManager.get(assembly.name);
        if (assemblyInstance) {
            if (assemblyInstance.refNames?.includes(refName)) {
                if (viewState.session.view.displayedRegions.length === 0) {
                    viewState.session.view.setDisplayedRegions([
                        {
                            assemblyName: assembly.name,
                            refName: 'contig_1',
                            start: 0,
                            end: 4688626, // Adjust according to your actual sequence length
                        },
                        {
                            assemblyName: assembly.name,
                            refName: 'contig_2',
                            start: 0,
                            end: 22055, // Adjust according to your actual sequence length
                        },
                    ]);
                }

                try {
                    viewState.session.view.navToLocString(loc);
                } catch (error) {
                    console.error('Error navigating to location:', error);
                }
            } else {
                console.error(`Reference name ${refName} not found in assembly. Available reference names: ${assemblyInstance.refNames?.join(', ')}`);
            }
        } else {
            console.error('Assembly instance not found during navigation.');
        }
    } else {
        console.error('ViewState is not initialized');
    }
};

export default navigateToLocation;
