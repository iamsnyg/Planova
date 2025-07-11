"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
    const { userId, orgId } = await auth();

    if(!userId || !orgId) {
        throw new Error("User not authenticated or organization not selected");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
        
    });

    console.log("Project Data:", project);

    if (!project || project.organizationId !== orgId) {
        throw new Error("Project not found or does not belong to the organization");
    }

    const sprint = await db.sprint.create({
        data: {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "PLANNED", // default status
            projectId: projectId,
        },
    });

    console.log("Sprint Created:", sprint);
    return sprint;

}