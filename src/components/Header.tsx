import React, { useState } from "react";
import {Button, View, Skeleton} from "reshaped";
import useActiveModes from '@/contexts/useActiveModes.tsx'
import type {ActiveModes} from "@contexts/ActiveModesContext.tsx";
import LowRes from "@components/states/LowRes.tsx";
import Compass from "@components/states/Compass.tsx";
import Reset from "@components/states/Reset.tsx";

type ModeButtonProps = {
    children: React.ReactNode,
    modeName: keyof ActiveModes
}

export default function Header() {
    const { activeModes, toggleMode } = useActiveModes();
    const [lastClickTimes, setLastClickTimes] = useState<{ [key: string]: number }>({});

    const ModeButton = ({ children, modeName }: ModeButtonProps) => {
        const isActive = activeModes[modeName];

        const handleClick = () => {
            // Don't allow the buttons to be used for opening more than once in the range of 400ms, covering the 300ms mode panel animation
            // This is to avoid the mode panel being stuck empty
            const currentTime = performance.now();
            if (currentTime - (lastClickTimes[modeName] || 0) > 400) {
                toggleMode(modeName);
                setLastClickTimes((prev) => ({ ...prev, [modeName]: currentTime }));
            } else if (isActive) {
                toggleMode(modeName);
            }
        };

        return (
            <Button variant="solid" color={isActive ? "positive" : "primary"} onClick={handleClick}>
                {children}
            </Button>
        );
    };

    return (
        <View position="relative" insetTop={0} width={'100%'} as={'header'} backgroundColor="white" shadow="raised">
            <View gap={3} direction="row" justify="space-between" align="start" paddingBlock={3} paddingInline={2}>
                <View.Item>
                    <Skeleton height={9} width="120px" />
                </View.Item>
                <View grow gap={2} direction="row" justify="center">
                    <ModeButton modeName="location">LOC</ModeButton>
                    <ModeButton modeName="editDimensions">E.D</ModeButton>
                    <ModeButton modeName="measurements">M</ModeButton>
                </View>
                <View gap={2} direction="row">
                    <Compass/>
                    <LowRes/>
                    <Reset/>
                </View>
            </View>
        </View>
    );
}
