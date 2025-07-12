
import { getProjectById } from '@/action/projects';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import SprintsCreateForm from '../_components/create-sprint';
import SprintBoard from '../_components/sprint-board';


const ProjectPage = async ({params}) => {
  const { projectId } =await params;
  const project = await getProjectById(projectId);

  if(!project) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-8 ">
      {/* sprints create */}
      <SprintsCreateForm 
        projectId={projectId}
        projectTitle={project.name}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
      />

      {/* sprints board */}

      {project.sprints.length > 0 ? (
        <SprintBoard 
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
        />
      ) : (
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold">No Sprints Found</h1>
          <p className="mt-4">There are no sprints in this project.</p>
          <Link href={`/project/${projectId}/sprint/create`}>
            <Button variant="planovaBtn" className="mt-4">
              Create Sprint
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProjectPage;