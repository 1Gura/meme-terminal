import {ReactNode} from "react";

const Terminal = ({children}: {children?: ReactNode}) => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold">Welcome to LaunchPad Terminal</h1>
            <p className="mt-2 max-w-xl text-zinc-400">
                Discover, trade and launch Solana meme tokens in one interface.
            </p>
        </div>
    );
};

export default Terminal;