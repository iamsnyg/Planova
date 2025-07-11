import { getProjects } from "@/action/projects";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project";

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;

export default async function ProjectList({orgId}) {
    const projects = await getProjects(orgId);
    // console.log("projects:=>", projects);
    
    if (!projects || projects.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold">No Projects Found</h1>
                <p className="mt-4">There are no projects in this organization.</p>
                <Link href={"/project/create"}>
                    <Button variant="planovaBtn"  className="mt-4">
                        Create Project
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project) => {
                const borderColor = getRandomHexColor();
                return (
                    <Card key={project.id} 
                    style={{ borderTop: `6px solid ${borderColor}` }}
                    className="rounded-md shadow"
                >
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            {project.name}
                            {/* <div>
                                {project.isAdmin && (
                                    <DeleteProject projectId={project.id} />
                                )}
                            </div> */}
                            <DeleteProject projectId={project.id} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500 mb-4">
                            {project.description}
                        </p>
                        <Link
                            href={`/project/${project.id}`}
                            className="text-blue-500 hover:underline "
                        >
                            View Project
                        </Link>
                    </CardContent>
                </Card>
                )
                
            })}
        </div>
    );
}