import React, { useEffect, useRef, useState } from 'react';
import igv from 'igv/dist/igv.esm';

interface IGVBrowserProps {
    tracks: any[];
    genome: string;
}

const IGVBrowser: React.FC<IGVBrowserProps> = ({ tracks, genome }) => {
    const igvContainer = useRef<HTMLDivElement>(null);
    const browserInstance = useRef<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (!browserInstance.current && igvContainer.current) {
            const options = {
                genome,
                tracks,
            };

            igv.createBrowser(igvContainer.current, options)
                .then(browser => {
                    browserInstance.current = browser;
                })
                .catch(error => {
                    console.error('Error creating IGV browser:', error);
                });
        }

        return () => {
            if (browserInstance.current) {
                try {
                    if (browserInstance.current.removeAllTracks) {
                        browserInstance.current.removeAllTracks();
                    }
                    if (browserInstance.current.dispose) {
                        browserInstance.current.dispose();
                    }
                    browserInstance.current = null;
                } catch (error) {
                    console.error('Error cleaning up IGV browser:', error);
                }
            }
        };
    }, [genome, tracks]);

    const handleSearch = () => {
        if (browserInstance.current && searchTerm) {
            browserInstance.current.search(searchTerm);
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
