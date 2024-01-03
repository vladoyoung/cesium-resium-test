import React, { createContext, useState, ReactNode, useCallback } from 'react';

export interface ActiveStates {
    lowRes: boolean;
    compass: boolean;
}

type ActiveStatesContextType = {
    activeStates: ActiveStates;
    toggleState: (state: keyof ActiveStates) => void;
    setState: (state: keyof ActiveStates, value: boolean) => void;
    deactivateAllStates: () => void;
};

type SetState = (state: keyof ActiveStates, value: boolean) => void;

export const ActiveStatesContext = createContext<ActiveStatesContextType | undefined>(undefined);

type ActiveStatesProviderProps = {
    children: ReactNode;
};

const ActiveStatesProvider: React.FC<ActiveStatesProviderProps> = ({ children }) => {
    const [activeStates, setActiveStates] = useState<ActiveStates>({
        lowRes: false,
        compass: false,
    });

    const setState: SetState = useCallback((state, value) => {
        setActiveStates((prevStates) => ({
            ...prevStates,
            [state]: value,
        }));
    }, []);

    const toggleState = useCallback((state: keyof ActiveStates) => {
        setActiveStates((prevStates) => ({
            ...prevStates,
            [state]: !prevStates[state],
        }));
    }, []);

    const deactivateAllStates = useCallback(() => {
        setActiveStates((prevStates) => ({
            ...prevStates,
            compass: false,
            // Keep lowRes unchanged
        }));
    }, []);

    return (
        <ActiveStatesContext.Provider value={{ activeStates, toggleState, setState, deactivateAllStates }}>
            {children}
        </ActiveStatesContext.Provider>
    );
};

export { ActiveStatesProvider };
