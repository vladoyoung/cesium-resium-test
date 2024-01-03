import React, {createContext, FC, ReactNode, useState} from 'react';

type ViewerBottomCenterAlertProviderProps = {
    children: ReactNode;
};

type ViewerBottomCenterAlertContextType = {
    alertText: string | undefined;
    setAlertText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ViewerBottomCenterAlertContext = createContext<ViewerBottomCenterAlertContextType | undefined>(undefined);

const ViewerBottomCenterAlertProvider: FC<ViewerBottomCenterAlertProviderProps> = ({ children }) => {
    const [alertText, setAlertText] = useState<string | undefined>(undefined);

    return (
        <ViewerBottomCenterAlertContext.Provider value={{ alertText, setAlertText }}>
            {children}
        </ViewerBottomCenterAlertContext.Provider>
    );
};

export { ViewerBottomCenterAlertProvider }