import {Text, View} from "reshaped";
import useViewerBottomLeftAlert from "@contexts/useViewerBottomLeftAlert.tsx";
import {useEffect, useState} from "react";



const Measurements = () => {
    const { setAlertText } = useViewerBottomLeftAlert();
    const [data, setData] = useState<any>(null);

    const dataTest = async () => {
        const response = await fetch("http://localhost:4213/api/v1/twins/109/metadata");
        const data = await response.json();
        setData(data);
        // return data;
    };

    useEffect(() => {
        setAlertText('Make a new measurement from the sidebar.');
        return () => {
            setAlertText(undefined);
        }
    }, [setAlertText]);

    useEffect(() => {
        dataTest();
    }, []);

    console.log(data?.name)

    return (
        <View padding={4}>
            <Text variant="title-6" align="center" as="h4">Measurements</Text>
            <p>content here</p>
        </View>
  );
};

export default Measurements;