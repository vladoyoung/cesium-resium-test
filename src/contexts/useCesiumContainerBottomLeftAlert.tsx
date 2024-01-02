import { useContext } from 'react';
import { CesiumContainerBottomLeftAlertContext } from './CesiumContainerBottomLeftAlertContext';

export const useCesiumContainerBottomLeftAlert = () => {
    const context = useContext(CesiumContainerBottomLeftAlertContext);
    if (!context) {
        throw new Error('useCesiumContainerBottomLeftAlert must be used within a CesiumContainerBottomLeftAlertProvider');
    }
    return context;
};

export default useCesiumContainerBottomLeftAlert;
