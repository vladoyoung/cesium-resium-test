import Viewer from "@components/Viewer.tsx";
import { Reshaped } from "reshaped";
import "./styles/themes/myxMain/theme.css";
import ComposeProviders from "@contexts/ComposeProviders.tsx";

export default function App() {
    return (
        <Reshaped theme="myxMain">
            <ComposeProviders>
                <Viewer/>
            </ComposeProviders>
        </Reshaped>
    );
}
