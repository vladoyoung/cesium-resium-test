import { useContext } from 'react';
import { ActiveModesContext } from './ActiveModesContext.tsx';

const useActiveModes = () => {
    const context = useContext(ActiveModesContext);
    if (!context) {
        throw new Error('useActiveModes must be used within an ActiveModesProvider');
    }
    return context;
};

export default useActiveModes;
