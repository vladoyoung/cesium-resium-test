import React, { createContext } from 'react';
import {Viewer} from "cesium";

export const ViewerContext = createContext(undefined) as unknown as React.Context<Viewer | undefined>;

type Props = {
    children: React.ReactNode
    viewerElement: Viewer | undefined
}
export const ViewerProvider = ({ children, viewerElement } : Props) => (
    <ViewerContext.Provider value={viewerElement}>{children}</ViewerContext.Provider>
);