import useViewerBottomLeftAlert from "@contexts/useViewerBottomLeftAlert.tsx";
import {Alert, View} from "reshaped";

export const ViewerBottomLeftAlert = () => {
    const {alertText} = useViewerBottomLeftAlert();
    return alertText && (
        <View maxWidth="400px">
            <Alert color="primary">
                {alertText}
            </Alert>
        </View>
    );
}