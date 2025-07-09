"use client";

const { useOrganization, useUser } = require("@clerk/nextjs");
const { BarLoader } = require("react-spinners");

const UserLoader = () => {
    const {isLoaded} = useOrganization();
    const {isLoaded: isUserLoaded} = useUser();

    if (!isLoaded || !isUserLoaded) {
        return <BarLoader color="#36d7b7" className="mb-4" width={"100%"} />
    }else <></>
}