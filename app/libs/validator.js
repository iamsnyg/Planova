import z from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Project name is required").max(100, "Name must be at most 100 characters long"),
    key: z.string()
        .min(2, "project key must be at least 2 characters long")
        .max(10, "project key must be at most 10 characters long"),
    description: z.string()
        .max(500, "Description must be at most 500 characters long")
        .optional(),

});