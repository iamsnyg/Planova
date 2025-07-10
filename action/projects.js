"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data){
    const {userId, orgId} = await auth();

    if (!userId ){
        throw new Error("User not authenticated");
    }
    if (!orgId) {
        throw new Error("Organization not selected");
    }

    const {data : membership} = await (await clerkClient()).organizations.getOrganizationMembershipList({
        organizationId: orgId
    });

    const userMembership = membership.find((member) => member.publicUserData.userId === userId);

    if (!userMembership || userMembership.role !== "org:admin") {
        throw new Error("User does not have permission to create a project");
    }
    console.log("Creating project with data:", data);
    console.log("---------------------------------------------")
    try {
        const project = await db.project.create({
            data: {
                key: data.key,
                description: data.description,
                organizationId: orgId,
                name: data.name,
            }
        })
        return project;
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
    }
    

}