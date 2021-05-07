import React, { useState } from 'react';

export const ProjectTracker = () => {
  return (
    <>
      <h1>Battleship</h1>
      <div className="project-tracker-container">
        <ul className="project-list">
          <li className="project-column backlog-column">
            <span className="header">
              <h1>Backlog</h1>
            </span>
            <span>
              <p>Task 1</p>
            </span>
          </li>
          <li className="project-column progress-column">
            <span className="header">
              <h1>In Progress</h1>
            </span>
          </li>
          <li className="project-column complete-column">
            <span className="header">
              <h1>Complete</h1>
            </span>
          </li>
          <li className="project-column on-hold-column">
            <span className="header">
              <h1>on-hold</h1>
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}