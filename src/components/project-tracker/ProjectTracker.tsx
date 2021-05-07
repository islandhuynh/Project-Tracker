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
  ],
  onHold: [
    "Intermediate Computer",
    "Advanced Computer"
  ]
}

enum columnSelection {
  BACKLOG = 'backlog',
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  ON_HOLD = 'on-hold'
}

export const ProjectTracker = () => {
  const [newInputVisibility, setNewInputVisibility] = useState(false);
  const [newTask, setNewTask] = useState<string | undefined>('');
  const [selectedColumn, setSelectedColumn] = useState<keyof columnList | undefined>(undefined);
  const [draggedTask, setDraggedTask] = useState<string | undefined>(undefined);
  const [removedItemColumn, setRemovedItemColumn] = useState<keyof columnList | undefined>(undefined);

  const createColumn = <C extends keyof columnList>(columnName: C): JSX.Element => {
    let columnTasks: string[] = [];
    switch (columnName) {
      case columnSelection.BACKLOG:
        columnTasks = selectedProject.backlog;
        break;
      case columnSelection.PROGRESS:
        columnTasks = selectedProject.progress;
        break;
      case columnSelection.COMPLETE:
        columnTasks = selectedProject.complete;
        break;
      case columnSelection.ON_HOLD:
        columnTasks = selectedProject.onHold;
        break;
    }

    return (
      <li
        className={`project-column ${columnName}-column`}
        onDragOver={e => e.preventDefault()}
        onDrop={() => {
          if (draggedTask) {
            addTask(draggedTask, columnName)
            if (removedItemColumn) removeTask(draggedTask, removedItemColumn)
            setDraggedTask(undefined)
          }
        }}
      >
        <span className="header">
          <h1>{columnTitles[columnName]}</h1>
        </span>
        <div id={`${columnName}-content`} className="custom-scroll">
          {createTaskList(columnTasks, columnName)}
        </div>
        {newInputVisibility && selectedColumn === columnName ?
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
          <div className="add-btn" onClick={() => {
            setSelectedColumn(columnName)
            setNewInputVisibility(true)
          }}>
            <span className="plus-sign">+</span>
            <span>Add Item</span>
          </div>
        }
      </li>
    )
  }

  const addTask = <C extends keyof columnList>(task: string, column: C) => {
    switch (column) {
      case columnSelection.BACKLOG:
        selectedProject.backlog.push(task);
        break;
      case columnSelection.PROGRESS:
        selectedProject.progress.push(task);
        break;
      case columnSelection.COMPLETE:
        selectedProject.complete.push(task);
        break;
      case columnSelection.ON_HOLD:
        selectedProject.onHold.push(task);
        break;
    }
  }

  const removeTask = <C extends keyof columnList>(task: string, column: C) => {
    let index = -1;

    switch (column) {
      case columnSelection.BACKLOG:
        index = selectedProject.backlog.indexOf(task);
        if (index > -1) selectedProject.backlog.splice(index, 1);
        break;
      case columnSelection.PROGRESS:
        index = selectedProject.progress.indexOf(task);
        if (index > -1) selectedProject.progress.splice(index, 1);
        break;
      case columnSelection.COMPLETE:
        index = selectedProject.complete.indexOf(task);
        if (index > -1) selectedProject.complete.splice(index, 1);
        break;
      case columnSelection.ON_HOLD:
        index = selectedProject.onHold.indexOf(task);
        if (index > -1) selectedProject.onHold.splice(index, 1);
        break;
    }
  }


  const createTaskList = <C extends keyof columnList>(taskArray: string[], column: C) => {
    let listArray: JSX.Element[] = [];
    taskArray.forEach(task => listArray.push(
      <li
        className="task-item"
        draggable={true}
        onDragStart={() => {
          setDraggedTask(task)
          setRemovedItemColumn(column)
        }}
      >
        {task}
      </li>
    ));
    return listArray;
  }

  return (
    <>
      <h1>{selectedProject.name}</h1>
      <div className="project-tracker-container">
        <ul className="project-list">
          {createColumn(columnSelection.BACKLOG)}
          {createColumn(columnSelection.PROGRESS)}
          {createColumn(columnSelection.COMPLETE)}
          {createColumn(columnSelection.ON_HOLD)}
        </ul>
      </div>
    </>
  )
}