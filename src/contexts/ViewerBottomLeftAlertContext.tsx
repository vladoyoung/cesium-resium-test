import React, {createContext, FC, ReactNode, useState} from 'react';

type ViewerBottomLeftAlertProviderProps = {
    children: ReactNode;
};

type ViewerBottomLeftAlertContextType = {
    alertText: string | undefined;
    setAlertText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ViewerBottomLeftAlertContext = createContext<ViewerBottomLeftAlertContextType | undefined>(undefined);

const ViewerBottomLeftAlertProvider: FC<ViewerBottomLeftAlertProviderProps> = ({ children }) => {
    const [alertText, setAlertText] = useState<string | undefined>(undefined);

    return (
        <ViewerBottomLeftAlertContext.Provider value={{ alertText, setAlertText }}>
            {children}
        </ViewerBottomLeftAlertContext.Provider>
    );
};

export { ViewerBottomLeftAlertProvider }