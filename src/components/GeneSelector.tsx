import React from 'react';

interface GeneSelectorProps {
    indexData: { name: string; loc: string }[];
    selectedGene: string;
    setSelectedGene: React.Dispatch<React.SetStateAction<string>>;
    navigateToLocation: (loc: string) => void;
}

const GeneSelector: React.FC<GeneSelectorProps> = ({ indexData, selectedGene, setSelectedGene, navigateToLocation }) => {
    const handleGeneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const geneName = event.target.value;
        setSelectedGene(geneName);
        const gene = indexData.find(item => item.name === geneName);
        if (gene) {
            navigateToLocation(gene.loc);
        }
    };

    return (
        <select value={selectedGene} onChange={handleGeneChange}>
            <option value="">Select a gene</option>
            {indexData.map(item => (
                <option key={`${item.name}-${item.loc}`} value={item.name}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};

export default GeneSelector;
