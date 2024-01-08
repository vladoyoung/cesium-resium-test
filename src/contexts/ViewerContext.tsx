import React, { createContext, useState } from 'react';
import { Viewer } from 'cesium';

type ViewerContextType = {
    viewer: Viewer;
    setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
};

export const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

type ViewerProviderProps = {
    children: React.ReactNode;
    viewerElement: Viewer;
};

export const ViewerProvider = ({ children, viewerElement }: ViewerProviderProps) => {
    const [currentViewer, setViewer] = useState<Viewer>(viewerElement);

    return (
        <ViewerContext.Provider value={{ viewer: currentViewer, setViewer }}>
            {children}
        </ViewerContext.Provider>
    );
};
