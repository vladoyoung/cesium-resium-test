import React from 'react';
import {Alert, View } from 'reshaped';
import useCesiumContainerBottomLeftAlert from '@contexts/useCesiumContainerBottomLeftAlert.tsx';
import useCesiumContainerBottomCenterAlert from '@contexts/useCesiumContainerBottomCenterAlert.tsx';

type Props = {
    children?: React.ReactNode
}

const CesiumContainerBottomLeftAlert = () => {
    const { alertText } = useCesiumContainerBottomLeftAlert();
    return alertText && (
        <View maxWidth="400px">
            <Alert color="primary">
                {alertText}
            </Alert>
        </View>
    );
}

const CesiumContainerBottomCenterAlert = () => {
    const { alertText } = useCesiumContainerBottomCenterAlert();
    return alertText && (
        <View maxWidth="100px" attributes={{id : 'cesium-container-bottom-center-alert'}}>
            <Alert color="primary">
                <View textAlign="center">{alertText}</View>
            </Alert>
        </View>
    );

}

const CesiumContainer = ({ children } : Props) => {
    return (
        <div id="cesiumContainer">
            {children}
            <View gap={2} direction="row" wrap={false} justify="space-between" align="start" position="absolute" zIndex={1} insetBottom={2} insetEnd={2} insetStart={2}>
                <View.Item>
                    <CesiumContainerBottomLeftAlert/>
                </View.Item>
                <View.Item>
                    <CesiumContainerBottomCenterAlert/>
                </View.Item>
                <View.Item></View.Item>
            </View>
        </div>
    );
};

export default CesiumContainer;