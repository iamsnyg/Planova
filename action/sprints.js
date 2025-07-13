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
    return sprint;

}

export async function updateSprintStatus(sprintId, newStatus) {
    const { userId, orgId, orgRole } = await auth();
    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not selected");
    }


    const sprint = await db.sprint.findUnique({
        where: { id: sprintId },
        include: {
            project: true,
        },
    });

    if (!sprint){
        throw new Error("Sprint not found");
    }

    if (sprint.project.organizationId !== orgId) {
        throw new Error("Sprint does not belong to the organization");
    }

    if (orgRole!=="org:admin" ){
        throw new Error("You do not have permission to update this sprint");
    }

    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();

    console.log(now < startDate || now > endDate)
    console.log(" sprint status ",newStatus)
    if (newStatus === "ACTIVE" && (now < startDate || now > endDate)) {
        throw new Error("Sprint cannot be started outside its date range");
    }

    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
        throw new Error("Sprint can only be completed if it is currently active");
    }

    const updatedSprint = await db.sprint.update({
        where: { id: sprintId },
        data: { status: newStatus },
    });

    return {success: true, sprint: updatedSprint};
}

    