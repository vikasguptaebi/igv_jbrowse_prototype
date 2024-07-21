import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IGVContextType {
    igvInstance: any;
    setIGVInstance: React.Dispatch<React.SetStateAction<any>>;
}

const IGVContext = createContext<IGVContextType | null>(null);

export const useIGV = () => {
    const context = useContext(IGVContext);
    if (!context) {
        throw new Error('useIGV must be used within an IGVProvider');
    }
    return context;
};

interface IGVProviderProps {
    children: ReactNode;
}

export const IGVProvider: React.FC<IGVProviderProps> = ({ children }) => {
    const [igvInstance, setIGVInstance] = useState<any>(null);

    return (
        <IGVContext.Provider value={{ igvInstance, setIGVInstance }}>
            {children}
        </IGVContext.Provider>
    );
};
