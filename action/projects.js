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
    // console.log("Creating project with data:", data);
    // console.log("---------------------------------------------")
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

export async function getProjects(orgId) {
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

    const project = await db.project.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" },
    });
    // console.log("Project Data:", project);
    if (!project) {
        throw new Error("Project not found");
    }
    return project;
}


export async function deleteProject(projectId) {

    const {userId, orgId, orgRole } = await auth();

    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not selected");
    }

    if (orgRole !== "org:admin") {
        throw new Error("User does not have permission to delete a project");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
    });
    
    console.log("Project to delete:", project);

    if (!project || project.organizationId !== orgId) {
        throw new Error("Project not found or does not belong to the organization");
    }
    
    await db.project.delete({
        where: { id: projectId },
    });

    return { success: true };


}

export async function getProjectById(projectId) {
    const {userId, orgId} = await auth();

    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not selected");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
        include: {
            sprints: {
                orderBy: { createdAt: "desc" },
            }
        }
    });

    // console.log("Project Data:", project);

    if (!project) {
        // throw new Error("Project not found");
        return null;
    }

    if (project.organizationId !== orgId) {
        return null; 
    }
    return project;


}