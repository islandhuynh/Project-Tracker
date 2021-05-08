import React, { useState, useContext } from 'react';
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ProjectTracker } from '../project-tracker/ProjectTracker';
import { AuthContext } from '../firebase-context/FirebaseContext';

const mockData = {
  email: 'islandhuynh@gmail.com',
  uuid: '123abc',
  projectList: [
    {
      name: 'Battleship',
      completeStatus: false,
      backlog: [
        "Drag and Drop Logic for Pieces",
        "Rotate Pieces",
      ],
      progress: [
        "Computer Logic"
      ],
      complete: [
        "Board",
        "Standard Pieces",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
      ],
      onHold: [
        "Intermediate Computer",
        "Advanced Computer"
      ]
    },
    {
      name: 'WhatsForLinner',
      completeStatus: false,
      backlog: [
        "Create Favorites Folder"
      ],
      progress: [
        "Create Authentification with Firebase",
        "Connect to Geo API",
        "Connect to Places API",
        "Create Authentification with Firebase",
      ],
      complete: [
        "Button Container",
        "What to eat logic"
      ],
      onHold: [
        "Sharing Restaurant List"
      ]
    }
  ]
}

export const ProjectSelect = () => {
  const { user } = useContext(AuthContext);

  const [selectedProject, setSelectedProject] = useState<string | undefined>('');

  return (
    <>
      {selectedProject ?
        <ProjectTracker />
        :
        <>
          <h1>Welcome {user.displayName}</h1>
          <h1>Project Tracker</h1>
          <div className="project-tracker-container">
            <ul className="project-list">
              <li className="project-column progress-column">
                <span className="header">
                  <h1>In-Progress</h1>
                </span>
                <div id="progress-content" className="custom-scroll">
                  <li className="project-item" draggable={true} onClick={() => setSelectedProject('Battleship')}>
                    Battleship
                  </li>
                </div>
              </li>
              <li className="project-column complete-column">
                <span className="header">
                  <h1>Completed</h1>
                </span>
                <div id="progress-content" className="custom-scroll"></div>
              </li>
            </ul>
          </div>
        </>
      }
    </>
  )
}

/* <li
className="task-item"
draggable={true}
onDragStart={() => {
  setDraggedTask(task)
  setRemovedItemColumn(column)
}}
>
<div className="task-container">
  <div className="edit-button-container">
    <FontAwesomeIcon icon={faEdit} onClick={() => {
      setSelectedColumn(column)
      setTaskIndex(index)
      setEditTask(task)
      setEditVisibility(true)
    }} />
    <FontAwesomeIcon icon={faTimes} onClick={() => removeTask(task, column)} />
  </div>
  {task}
</div>
</li> */