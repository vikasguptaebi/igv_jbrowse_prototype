import React, { useEffect, useRef, useState } from 'react';
import igv from 'igv/dist/igv.esm';

let igvInstance: any = null; // Singleton IGV instance

interface IGVBrowserProps {
    tracks: any[];
    genome: string;
}

const IGVBrowser: React.FC<IGVBrowserProps> = ({ tracks, genome }) => {
    const igvContainer = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (igvContainer.current && !igvInstance) {
            const options = {
                genome: {
                    id: genome, // Custom genome ID
                    fastaURL: 'http://localhost:3000/BU_ATCC8492VPI0062_NT5002.1.fa',
                    indexURL: 'http://localhost:3000/BU_ATCC8492VPI0062_NT5002.1.fa.fai',
                },
                tracks,
            };

            console.log('Creating IGV browser with options:', options); // Debug log

            igv.createBrowser(igvContainer.current, options)
                .then(browser => {
                    igvInstance = browser;
                    console.log('IGV browser created:', browser); // Debug log
                })
                .catch(error => {
                    console.error('Error creating IGV browser:', error);
                });
        }

        return () => {
            if (igvInstance) {
                try {
                    if (igvInstance.removeAllTracks) {
                        igvInstance.removeAllTracks();
                    }
                    if (igvInstance.dispose) {
                        igvInstance.dispose();
                    }
                    igvInstance = null;
                } catch (error) {
                    console.error('Error cleaning up IGV browser:', error);
                }
            }
        };
    }, [genome, tracks]);

    const handleSearch = () => {
        if (igvInstance && searchTerm) {
            igvInstance.search(searchTerm);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a gene"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div ref={igvContainer} style={{ height: '500px' }} />
        </div>
    );
};

export default IGVBrowser;
