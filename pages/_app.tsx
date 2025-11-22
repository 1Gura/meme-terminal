import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {LaunchpadLayout} from "../src/shared/layouts/LaunchpadLayout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <LaunchpadLayout>
            <Component {...pageProps} />
        </LaunchpadLayout>
    )
}