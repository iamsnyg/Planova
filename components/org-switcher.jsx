"use client"

import { useOrganization, useUser } from '@clerk/nextjs'
import React from 'react'

const OrgSwitcher = () => {
    const { isLoaded } = useOrganization();
    const { isLoaded: isUserLoaded } =  useUser();

    if (!isLoaded || !isUserLoaded) {
        return null; // or a loading spinner
    }
  return (
    <div>OrgSwitcher</div>
  )
}

export default OrgSwitcher