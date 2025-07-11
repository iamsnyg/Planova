import { getProjects } from '@/action/projects';
import React from 'react'

const ProjectPage = () => {
    getProjects();
  return (
    <div>ProjectPage </div>
  )
}

export default ProjectPage;