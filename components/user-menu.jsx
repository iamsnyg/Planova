"use client"

import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesColumn, ChartNoAxesGantt, DotIcon } from 'lucide-react'
import React from 'react'

const UserMenu = () => {
    return (
        <UserButton
            appearance={{
                elements: {
                    avatarBox: {
                        width: 40,
                        height: 40,
                    },
                    avatarImage: {
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                    },
                    avatarIcon: {
                        width: 24,
                        height: 24,
                    },
                },
            }}
                
        >
            <UserButton.MenuItems>
                <UserButton.Link
                    label="Create organization"
                    labelIcon={<ChartNoAxesGantt className="w-4 h-4" />}
                    href="/onboarding"
                />
                <UserButton.Action label='manageAccount' />
            </UserButton.MenuItems>
      </UserButton>
    )
}

export default UserMenu