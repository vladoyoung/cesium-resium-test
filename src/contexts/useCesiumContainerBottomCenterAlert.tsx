import { useContext } from 'react';
import { CesiumContainerBottomCenterAlertContext } from './CesiumContainerBottomCenterAlertContext';

export const useCesiumContainerBottomCenterAlert = () => {
    const context = useContext(CesiumContainerBottomCenterAlertContext);
    if (!context) {
        throw new Error('useCesiumContainerBottomCenterAlert must be used within a CesiumContainerBottomCenterAlertProvider');
    }
    return context;
};

export default useCesiumContainerBottomCenterAlert;
