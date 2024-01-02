import InitViewer from "./components/InitViewer.tsx";
import InitTileset from "./components/InitTileset.tsx";
import { Reshaped } from "reshaped";
import "./styles/themes/myxMain/theme.css";
import Header from "./components/Header.tsx";
import ComposeProviders from "@contexts/ComposeProviders.tsx";

export default function App() {
    return (
        <Reshaped theme="myxMain">
            <ComposeProviders>
                <InitViewer>
                    <InitTileset/>
                    <Header/>
                </InitViewer>
            </ComposeProviders>
        </Reshaped>
    );
}
