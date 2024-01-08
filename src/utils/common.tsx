export const searchParams = new URLSearchParams(window.location.search);

export function appendURLParams(path: string, params: Object | null = null) {
    const urlParams = new URLSearchParams();

    if (params) {
        for (const [key, value] of Object.entries(params)) {
            urlParams.append(key, value);
        }
    }

    if (searchParams.has("invcode")) {
        urlParams.append("invcode", `${searchParams.get("invcode")}`);
    }

    return `${path}${urlParams.toString() ? `?${urlParams}` : ""}`;
}