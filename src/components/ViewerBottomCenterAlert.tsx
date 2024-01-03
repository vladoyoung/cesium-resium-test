import useViewerBottomCenterAlert from "@contexts/useViewerBottomCenterAlert.tsx";
import {Alert, View} from "reshaped";

export const ViewerBottomCenterAlert = () => {
    const {alertText} = useViewerBottomCenterAlert();
    return alertText && (
        <View maxWidth="100px" attributes={{id: 'cesium-container-bottom-center-alert'}}>
            <Alert color="primary">
                <View textAlign="center">{alertText}</View>
            </Alert>
        </View>
    );
}