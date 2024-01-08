import React from "react";
import { ActiveModesProvider } from "@contexts/ActiveModesContext.tsx";
import { ActiveStatesProvider } from "@contexts/ActiveStatesContext.tsx";
import { ViewerBottomLeftAlertProvider } from "@contexts/ViewerBottomLeftAlertContext.tsx";
import { ViewerBottomCenterAlertProvider } from "@contexts/ViewerBottomCenterAlertContext.tsx";
import { TilesetProvider } from "@contexts/TilesetContext.tsx";
import {ViewerProvider} from "@contexts/ViewerContext.tsx";

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
        <Compose components={[
            ViewerProvider,
            TilesetProvider,
            ActiveModesProvider,
            ActiveStatesProvider,
            ViewerBottomLeftAlertProvider,
            ViewerBottomCenterAlertProvider,
        ]}>
            {children}
        </Compose>
    );
}
