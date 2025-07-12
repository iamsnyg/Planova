"use client"

import React, { useState } from 'react'
import SprintManager from './sprint-manager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const SprintBoard = ({ sprints, projectId, orgId }) => {
    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((sprint) => sprint.status === 'ACTIVE') || sprints[0]
    );
  return (
    <div className='flex flex-col gap-4 '>
        {/* Sprint Management */}
        <SprintManager 
            sprint={currentSprint}
            setSprint={setCurrentSprint}
            sprints={sprints}
            projectId={projectId}
        />

        {/* kanban board */}
    </div>
  )
}

export default SprintBoard