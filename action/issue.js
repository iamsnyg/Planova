import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function createIssue(projectId, data) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("User not authenticated or organization not selected");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    const lastIssue = await db.issue.findFirst({
        where: { projectId, status: data.status },
        orderBy: { createdAt: "desc" },
    });

    const newOrder = lastIssue ? lastIssue.order + 1 : 1;

    const issue = await db.issue.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            projectId: projectId,
            sprintId: data.sprintId,
            assigneeId: data.assigneeId || null,
            reporterId: user.id,
            order: newOrder,
        },
        include: {
            assignee: true,
            reporter: true,
        },
    });
    return issue;

}