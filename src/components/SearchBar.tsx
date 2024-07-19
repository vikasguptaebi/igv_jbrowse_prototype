import React, { useState } from 'react';
import { ViewModel } from '@jbrowse/react-linear-genome-view';
import assembly from '../assembly';

interface SearchBarProps {
    viewState: ViewModel | null;
    navigateToLocation: (loc: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ viewState, navigateToLocation }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (viewState && searchTerm) {
            try {
                const { textSearchManager } = viewState.session;
                if (textSearchManager) {
                    console.log('Performing search with term:', searchTerm);
                    const query = JSON.stringify({ search: searchTerm }); // Correctly format queryString as JSON
                    console.log('Search query:', query);
                    const results = await textSearchManager.search(
                        { queryString: query }, // Send the formatted JSON string directly
                        { assemblyName: assembly.name, includeAggregateIndexes: true },
                        results => results // Identity function to satisfy the third argument requirement
                    );
                    console.log('Search results:', results);
                    if (results && results.length > 0) {
                        const loc = results[0].locString;
                        if (loc) {
                            navigateToLocation(loc);
                        } else {
                            console.log('No location string found for the first result.');
                        }
                    } else {
                        console.log('No results found for', searchTerm);
                    }
                } else {
                    console.error('Text search manager not found');
                }
            } catch (error) {
                console.error('Error performing text search:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a gene"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
