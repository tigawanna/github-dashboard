import { ParsedLocation } from "@tanstack/react-router";

export function returnTo( location: ParsedLocation<{}>):string {
    const searchParams = new URLSearchParams(location.searchStr);
    searchParams.delete("returnTo");
    return location.pathname  + "?" + searchParams.toString();
}

