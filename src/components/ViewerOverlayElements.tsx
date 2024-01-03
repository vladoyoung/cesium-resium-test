import {View} from 'reshaped';
import CameraControls from "@components/CameraControls.tsx";
import {ViewerBottomLeftAlert} from "@components/ViewerBottomLeftAlert.tsx";
import {ViewerBottomCenterAlert} from "@components/ViewerBottomCenterAlert.tsx";

const ViewerOverlayElements = () => {
    return (
        <>
            <View gap={2} direction="row" wrap={false} justify="space-between" align="start" position="absolute"
                  zIndex={1} insetBottom={2} insetEnd={2} insetStart={2}>
                <View.Item>
                    <ViewerBottomLeftAlert/>
                </View.Item>
                <View.Item>
                    <ViewerBottomCenterAlert/>
                </View.Item>
                <View.Item></View.Item>
            </View>
            <CameraControls/>
        </>

    );
};

export default ViewerOverlayElements;