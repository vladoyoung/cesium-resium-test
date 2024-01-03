import React, { createContext, useState, ReactNode } from 'react';

export interface ActiveModes {
    location: boolean;
    editDimensions: boolean;
    measurements: boolean;
}

type ActiveModesContextType = {
    activeModes: ActiveModes;
    toggleMode: (mode: keyof ActiveModes) => void;
    deactivateAllModes: () => void;
};

export const ActiveModesContext = createContext<ActiveModesContextType | undefined>(undefined);

type ActiveModesProviderProps = {
    children: ReactNode;
};

const ActiveModesProvider: React.FC<ActiveModesProviderProps> = ({ children }) => {
    const [activeModes, setActiveModes] = useState<ActiveModes>({
        location: false,
        editDimensions: false,
        measurements: false,
    });

    const toggleMode = (mode: keyof ActiveModes) => {
        setActiveModes((prevModes) => {
            const isModeActive = prevModes[mode];
            const newModes: ActiveModes = Object.keys(prevModes).reduce(
                (acc, key) => ({ ...acc, [key]: key === mode ? !isModeActive : false }),
                {} as ActiveModes
            );
            return newModes;
        });
    };

    const deactivateAllModes = () => {
        const initialState: ActiveModes = Object.keys(activeModes).reduce((acc, key) => {
            acc[key as keyof ActiveModes] = false;
            return acc;
        }, {} as ActiveModes);

        setActiveModes(initialState);
    }

    return (
        <ActiveModesContext.Provider value={{ activeModes, toggleMode, deactivateAllModes }}>
            {children}
        </ActiveModesContext.Provider>
    );
};

export { ActiveModesProvider };
