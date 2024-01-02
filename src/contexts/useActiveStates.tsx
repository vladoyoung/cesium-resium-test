import { useContext } from 'react';
import {ActiveStatesContext} from "./ActiveStatesContext.tsx";

const useActiveModes = () => {
    const context = useContext(ActiveStatesContext);
    if (!context) {
        throw new Error('useActiveStates must be used within an ActiveStatesProvider');
    }
    return context;
};

export default useActiveModes;
