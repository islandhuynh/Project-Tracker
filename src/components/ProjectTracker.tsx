import React, { useState } from 'react';
const mockData = {
  email: 'islandhuynh@gmail.com',
  uuid: '123abc',
  projectList: [
    {
      name: 'Battleship',
      completeStatus: false,
      backlog: [
        "Drag and Drop Logic for Pieces",
        "Rotate Pieces"
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
        "Connect to Places API"
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

export const ProjectTracker = () => {
  const createTaskList = (taskArray: string[]) => {
    let listArray: JSX.Element[] = [];
    taskArray.forEach(task => listArray.push(<li className="task-item">{task}</li>));
    return listArray;
  }

  const createColumn = <C extends keyof columnList>(columnName: C): JSX.Element => {
    let columnTasks: string[] = [];
    switch (columnName) {
      case 'backlog':
        columnTasks = mockData.projectList[0].backlog;
        break;
      case 'progress':
        columnTasks = mockData.projectList[0].progress;
        break;
      case 'complete':
        columnTasks = mockData.projectList[0].complete;
        break;
      case `on-hold`:
        columnTasks = mockData.projectList[0].onHold;
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
      </li>
    )
  }

  return (
    <>
      <h1>{mockData.projectList[0].name}</h1>
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