import { useContext } from 'react';
import { ViewerBottomCenterAlertContext } from './ViewerBottomCenterAlertContext.tsx';

export const useViewerBottomCenterAlert = () => {
    const context = useContext(ViewerBottomCenterAlertContext);
    if (!context) {
        throw new Error('useViewerBottomCenterAlert must be used within a ViewerBottomCenterAlertProvider');
    }
    return context;
};

export default useViewerBottomCenterAlert;
