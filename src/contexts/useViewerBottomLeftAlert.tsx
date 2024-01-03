import { useContext } from 'react';
import { ViewerBottomLeftAlertContext } from './ViewerBottomLeftAlertContext.tsx';

export const useViewerBottomLeftAlert = () => {
    const context = useContext(ViewerBottomLeftAlertContext);
    if (!context) {
        throw new Error('useViewerBottomLeftAlert must be used within a ViewerBottomLeftAlertProvider');
    }
    return context;
};

export default useViewerBottomLeftAlert;
