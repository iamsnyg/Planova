"use client"

import { OrganizationSwitcher, SignedIn, SignIn, useOrganization, useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation';
import React from 'react'

const OrgSwitcher = () => {
    const { isLoaded } = useOrganization();
    const { isLoaded: isUserLoaded } =  useUser();
    const pathname = useParams()

    if (!isLoaded || !isUserLoaded) {
        return null; // or a loading spinner
    }
return (
<div>
    <SignedIn>
        <OrganizationSwitcher 
            hidePersonal
            afterCreateOrganizationUrl="/organization/:slug"
            afterSelectOrganizationUrl="/organization/:slug"
            createOrganizationMode={
                pathname === "/onboarding" ? "navigation" : "modal"
            }
            createOrganizationUrl="/onboarding"
            
        />

    </SignedIn>
</div>
)
}

export default OrgSwitcher