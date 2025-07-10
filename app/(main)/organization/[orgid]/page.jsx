import { getOrganization } from '@/action/organization'
import OrgSwitcher from '@/components/org-switcher'
import React from 'react'

const Organization = async({ params }) => {
    const { orgid } = await params

    const organization = await getOrganization(orgid)
    if (!organization) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold">Organization not found</h1>
                <p className="mt-4">The organization with ID {orgid} does not exist.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-20">
            <div className='mb-4 flex flex-col sm:flex-row justify-between items-start pb-2'>
                <h1 className="text-3xl font-bold gradient-title">{organization.name}'s Organization</h1>
                <OrgSwitcher />
            </div>
            <div className="mt-4">abc</div>
            <div className="mt-8">def</div>
        </div>
    )
}

export default Organization