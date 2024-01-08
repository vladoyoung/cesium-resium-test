import { useContext } from 'react';
import { TilesetContext } from './TilesetContext';

const useTileset = () => {
    const context = useContext(TilesetContext);
    if (!context) {
        throw new Error('useTileset must be used within a TilesetProvider');
    }
    return context;
};

export default useTileset;
