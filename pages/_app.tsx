import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {LaunchpadLayout} from "../src/shared/layouts/LaunchpadLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <LaunchpadLayout>
                <Component {...pageProps} />
            </LaunchpadLayout>
        </QueryClientProvider>
    )
}