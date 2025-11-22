"use client";

import {useEffect, useState} from "react";

export function ClientTime({ date }: { date: string }) {
    const [formatted, setFormatted] = useState("");

    useEffect(() => {
        setFormatted(new Date(date).toLocaleString("en-US"));
    }, [date]);

    return <>{formatted}</>;
}
