import React from "react";
import {Button, View, Skeleton} from "reshaped";
import useActiveModes from '@/contexts/useActiveModes.tsx'
import type {ActiveModes} from "@contexts/ActiveModesContext.tsx";
import LowRes from "@components/states/LowRes.tsx";
import Compass from "@components/states/Compass.tsx";

type modeButtonProps = {
    children: React.ReactNode,
    modeName: keyof ActiveModes
}

export default function Header() {
    const { activeModes, toggleMode } = useActiveModes();

    const ModeButton = ({ children, modeName } : modeButtonProps) => {
        const isActive = activeModes[modeName];
        return (
            <>
                <Button variant="solid" color={isActive ? 'positive' : 'primary'}  onClick={() => toggleMode(modeName)}>
                    {children}
                </Button>
            </>
        )
    }

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
                </View>
            </View>
        </View>
    );
}
