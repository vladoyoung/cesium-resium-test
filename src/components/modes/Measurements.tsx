import {Text, View} from "reshaped";
import useCesiumContainerBottomLeftAlert from "@contexts/useCesiumContainerBottomLeftAlert.tsx";
import {useEffect} from "react";

const Measurements = () => {
    const { setAlertText } = useCesiumContainerBottomLeftAlert();

    useEffect(() => {
        setAlertText('Make a new measurement from the sidebar.');
        return () => {
            setAlertText(undefined);
        }
    }, [setAlertText]);
    return (
        <View padding={4}>
            <Text variant="title-6" align="center" as="h4">Measurements</Text>
            <p>content here</p>
        </View>
  );
};

export default Measurements;