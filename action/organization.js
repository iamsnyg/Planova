"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug){
    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }
    
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });
    

    if (!user) {
        throw new Error("User not found");
    }

    const organization = (await clerkClient()).organizations.getOrganization({slug});
    console.log("Organization Data:", (await organization).id);
    if (!organization) {
        return null; 
    }
    const {data} = await (await clerkClient()).organizations.getOrganizationMembershipList({
        organizationId: (await organization).id
    });
    // console.log("Membership Data:", data);

    
    const userMembership = data.find((member) => member.publicUserData.userId === userId);
    // console.log("User Membership:", userMembership);
    if (!userMembership) {
        return null; 
    }

    return organization;
}