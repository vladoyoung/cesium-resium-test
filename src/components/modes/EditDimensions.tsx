import {Button, Card, Skeleton, Text, View} from "reshaped";
import { useState, useEffect, Key, ReactElement, ReactNode, ReactPortal} from "react";

const SimulateAsyncProcess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
    const data = await response.json();
    return data;
};

const EditDimensions = () => {
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        const result = await SimulateAsyncProcess();
        setPostData(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []); // empty dependency array ensures useEffect runs once when the component mounts

    return (
        <View padding={4}>
            <Text variant="title-6" align="center" as="h4">
                Edit dimensions
            </Text>
            <Button onClick={fetchData}>Fetch fake data again (1s delay)</Button>
            <View gap={2} paddingBlock={4}>
                {loading ? (
                    <Card>
                        <View gap={3} direction="row">
                            <View.Item grow>
                                <View gap={3}>
                                    <Text variant="title-1">
                                        <Skeleton width="30%"/>
                                    </Text>
                                    <View gap={2}>
                                        <Skeleton/>
                                        <Skeleton width="60%"/>
                                    </View>
                                </View>
                            </View.Item>
                        </View>
                    </Card>
                ) : (
                    postData.map((item: { id: Key | null | undefined; name: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; body: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                        <Card key={item.id}>
                            <Text variant="featured-2">{item.name}</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>{item.body}</Text>
                        </Card>
                    ))
                )}
            </View>
        </View>
    );
};

export default EditDimensions;
