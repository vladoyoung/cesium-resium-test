import React, { createContext, useState } from 'react';
import { Cesium3DTileset } from 'cesium';

type TilesetContextType = {
    tileset: Cesium3DTileset;
    setTileset: React.Dispatch<React.SetStateAction<Cesium3DTileset>>;
};

export const TilesetContext = createContext<TilesetContextType | undefined>(undefined);

type TilesetProviderProps = {
    children: React.ReactNode;
    tileset: Cesium3DTileset;
};

export const TilesetProvider = ({ children, tileset }: TilesetProviderProps) => {
    const [currentTileset, setTileset] = useState<Cesium3DTileset>(tileset);

    return (
        <TilesetContext.Provider value={{ tileset: currentTileset, setTileset }}>
            {children}
        </TilesetContext.Provider>
    );
};
