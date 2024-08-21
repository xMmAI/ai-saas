"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("a0ef7ddc-38e7-4641-88e9-c460d7af9eb7");
    }, []);

    return null;
}
