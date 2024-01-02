import React from "react";
import { ActiveModesProvider } from "@contexts/ActiveModesContext.tsx";
import { ActiveStatesProvider } from "@contexts/ActiveStatesContext.tsx";
import { CesiumContainerBottomLeftAlertProvider } from "@contexts/CesiumContainerBottomLeftAlertContext.tsx";
import { CesiumContainerBottomCenterAlertProvider } from "@contexts/CesiumContainerBottomCenterAlertContext.tsx";

interface Props {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<unknown>>> | unknown;
    children: React.ReactNode;
}

function Compose(props: Props) {
    const { components, children } = props;

    if (!Array.isArray(components)) {
        // Handle the case where components is not an array, if needed.
        return <>{children}</>;
    }

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
}

type ActiveModesProviderProps = {
    children: React.ReactNode;
};

export default function ComposeProviders({ children }: ActiveModesProviderProps) {
    return (
        <Compose components={[ActiveModesProvider, ActiveStatesProvider, CesiumContainerBottomLeftAlertProvider, CesiumContainerBottomCenterAlertProvider]}>
            {children}
        </Compose>
    );
}
