import React, { useState } from 'react';

// const mockData = {
//   email: 'islandhuynh@gmail.com',
//   uuid: '123abc',
//   projectList: [
//     {
//       name: 'Battleship',
//       completeStatus: false,
//       backlog: [
//         "Drag and Drop Logic for Pieces",
//         "Rotate Pieces",
//       ],
//       progress: [
//         "Computer Logic"
//       ],
//       complete: [
//         "Board",
//         "Standard Pieces",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//       ],
//       onHold: [
//         "Intermediate Computer",
//         "Advanced Computer"
//       ]
//     },
//     {
//       name: 'WhatsForLinner',
//       completeStatus: false,
//       backlog: [
//         "Create Favorites Folder"
//       ],
//       progress: [
//         "Create Authentification with Firebase",
//         "Connect to Geo API",
//         "Connect to Places API",
//         "Create Authentification with Firebase",
//       ],
//       complete: [
//         "Button Container",
//         "What to eat logic"
//       ],
//       onHold: [
//         "Sharing Restaurant List"
//       ]
//     }
//   ]
// }

interface columnList {
  "backlog": string,
  "progress": string,
  "complete": string,
  "on-hold": string,
}

const columnTitles: columnList = {
  "backlog": "Backlog",
  "progress": "In-Progress",
  "complete": "Completed",
  "on-hold": "On-Hold"
}

const selectedProject = {
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
}

export const ProjectTracker = () => {
  const [newInputVisibility, setNewInputVisibility] = useState(false);
  const [newTask, setNewTask] = useState<string | undefined>('');

  const createColumn = <C extends keyof columnList>(columnName: C): JSX.Element => {
    let columnTasks: string[] = [];
    switch (columnName) {
      case 'backlog':
        columnTasks = selectedProject.backlog;
        break;
      case 'progress':
        columnTasks = selectedProject.progress;
        break;
      case 'complete':
        columnTasks = selectedProject.complete;
        break;
      case 'on-hold':
        columnTasks = selectedProject.onHold;
        break;
    }

    return (
      <li className={`project-column ${columnName}-column`}>
        <span className="header">
          <h1>{columnTitles[columnName]}</h1>
        </span>
        <div id={`${columnName}-content`} className="custom-scroll">
          {createTaskList(columnTasks)}
        </div>
        {newInputVisibility ?
          <>
            <div className="new-input-container">
              <textarea
                className="new-input"
                value={newTask} onChange={e => setNewTask(e.target.value)}
              />
            </div>
            <div className="save-btn-group">
              <div className="save-btn" onClick={() => {
                setNewTask('')
                setNewInputVisibility(false)
              }}>
                <span>Close</span>
              </div>
              <div className="save-btn" onClick={() => {
                setNewInputVisibility(false)
                if (newTask) addTask(newTask, columnName)
                setNewTask('')
              }}>
                <span>Save Item</span>
              </div>
            </div>
          </>
          :
          <div className="add-btn" onClick={() => setNewInputVisibility(true)}>
            <span className="plus-sign">+</span>
            <span>Add Item</span>
          </div>
        }
      </li>
    )
  }

  const addTask = <C extends keyof columnList>(task: string, column: C) => {
    switch (column) {
      case 'backlog':
        selectedProject.backlog.push(task);
        break;
      case 'progress':
        selectedProject.progress.push(task);
        break;
      case 'complete':
        selectedProject.complete.push(task);
        break;
      case 'on-hold':
        selectedProject.onHold.push(task);
        break;
    }
  }

  const createTaskList = (taskArray: string[]) => {
    let listArray: JSX.Element[] = [];
    taskArray.forEach(task => listArray.push(<li className="task-item">{task}</li>));
    return listArray;
  }

  return (
    <>
      <h1>{selectedProject.name}</h1>
      <div className="project-tracker-container">
        <ul className="project-list">
          {createColumn("backlog")}
          {createColumn("progress")}
          {createColumn("complete")}
          {createColumn("on-hold")}
        </ul>
      </div>
    </>
  )
}