import {ErrorResponse, useRouteError} from "react-router-dom";

export default function ResourceNotFound() {
    const error = useRouteError() as ErrorResponse;
    return (
        `resource not found - ${error.data}`
    );
}
