import React, { useState } from 'react';
import { ProjectTracker } from './ProjectTracker';

export const ProjectSelect = () => {
  const [selectedProject, setSelectedProject] = useState<string | undefined>('Battleship');

  return (
    <div className="task-page">
      {selectedProject ? 
        <ProjectTracker />
        :
        <div className="task-select-container">

        </div>
      }
    </div>
  )
}