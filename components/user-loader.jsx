"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";



export const UserLoader = () => {
    const {isLoaded} = useOrganization();
    const {isLoaded: isUserLoaded} = useUser();

    if (!isLoaded || !isUserLoaded) {
        return <BarLoader color="#36d7b7" className="mb-4" width={"100%"} />
    }else {
        return <></>
    }
}

