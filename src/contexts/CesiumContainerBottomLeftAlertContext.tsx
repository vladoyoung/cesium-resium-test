import React, {createContext, FC, ReactNode, useState} from 'react';

type CesiumContainerBottomLeftAlertProviderProps = {
    children: ReactNode;
};

type CesiumContainerBottomLeftAlertContextType = {
    alertText: string | undefined;
    setAlertText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CesiumContainerBottomLeftAlertContext = createContext<CesiumContainerBottomLeftAlertContextType | undefined>(undefined);

const CesiumContainerBottomLeftAlertProvider: FC<CesiumContainerBottomLeftAlertProviderProps> = ({ children }) => {
    const [alertText, setAlertText] = useState<string | undefined>(undefined);

    return (
        <CesiumContainerBottomLeftAlertContext.Provider value={{ alertText, setAlertText }}>
            {children}
        </CesiumContainerBottomLeftAlertContext.Provider>
    );
};

export { CesiumContainerBottomLeftAlertProvider }