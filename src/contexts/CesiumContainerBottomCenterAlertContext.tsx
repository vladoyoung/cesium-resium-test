import React, {createContext, FC, ReactNode, useState} from 'react';

type CesiumContainerBottomCenterAlertProviderProps = {
    children: ReactNode;
};

type CesiumContainerBottomCenterAlertContextType = {
    alertText: string | undefined;
    setAlertText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CesiumContainerBottomCenterAlertContext = createContext<CesiumContainerBottomCenterAlertContextType | undefined>(undefined);

const CesiumContainerBottomCenterAlertProvider: FC<CesiumContainerBottomCenterAlertProviderProps> = ({ children }) => {
    const [alertText, setAlertText] = useState<string | undefined>(undefined);

    return (
        <CesiumContainerBottomCenterAlertContext.Provider value={{ alertText, setAlertText }}>
            {children}
        </CesiumContainerBottomCenterAlertContext.Provider>
    );
};

export { CesiumContainerBottomCenterAlertProvider }