"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect } from "react";
import CrossPayApp from "@/components/cross-pay-app";

export default function Home() {
    const { address, getUserAddress } = useWeb3();

    useEffect(() => {
        getUserAddress();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            {!address && (
                <div className="h1">Please install Metamask and connect.</div>
            )}
            {address && (
                <CrossPayApp />
            )}
        </div>
    );
}
