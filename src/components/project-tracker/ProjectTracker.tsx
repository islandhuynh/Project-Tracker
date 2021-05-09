import { useState, useContext, FC, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import { ProjectDetail } from '../../schemas/projectDetail';
import { AuthContext } from '../firebase-context/FirebaseContext';

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

enum columnSelection {
  BACKLOG = 'backlog',
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  ON_HOLD = 'on-hold'
}

interface ProjectProps {
  selectedProject: ProjectDetail,
  setSelectedProject: Dispatch<React.SetStateAction<ProjectDetail | undefined>>,
  projectIndex: number,
}

export const ProjectTracker: FC<ProjectProps> = ({ selectedProject, setSelectedProject, projectIndex }) => {
  const { user, updateProjectTasks } = useContext(AuthContext);

  const [newInputVisibility, setNewInputVisibility] = useState(false);
  const [newTask, setNewTask] = useState<string | undefined>('');
  const [selectedColumn, setSelectedColumn] = useState<keyof columnList | undefined>(undefined);
  const [draggedTask, setDraggedTask] = useState<string | undefined>(undefined);
  const [removedItemColumn, setRemovedItemColumn] = useState<keyof columnList | undefined>(undefined);
  const [editTask, setEditTask] = useState<string>('');
  const [editVisibility, setEditVisibility] = useState(false);
  const [taskIndex, setTaskIndex] = useState(-1);

  const createTaskList = <C extends keyof columnList>(taskArray: string[], column: C) => {
    let listArray: JSX.Element[] = [];
    taskArray.forEach((task, index) => listArray.push(
      <>
        {editVisibility && selectedColumn === column && taskIndex === index ?
          <>
            <textarea className="edit-input" value={editTask} onChange={e => setEditTask(e.target.value)} />
            <div className="save-btn-group">
              <div className="save-btn" onClick={() => setEditVisibility(false)}>
                <span>Close</span>
              </div>
              <div className="save-btn" onClick={() => saveEdit(column, index)}>
                <span>Save Item</span>
              </div>
            </div>
          </>
          :
          <li
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
          </li>
        }
      </>
    ));
    return listArray;
  }

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
    let tempArray = [];
    let tempProject = undefined;

    switch (column) {
      case columnSelection.BACKLOG:
        tempArray = [...selectedProject.backlog, task];
        tempProject = { ...selectedProject, backlog: tempArray };
        break;
      case columnSelection.PROGRESS:
        tempArray = [...selectedProject.progress, task];
        tempProject = { ...selectedProject, progress: tempArray };
        break;
      case columnSelection.COMPLETE:
        tempArray = [...selectedProject.complete, task];
        tempProject = { ...selectedProject, complete: tempArray };
        break;
      case columnSelection.ON_HOLD:
        tempArray = [...selectedProject.onHold, task];
        tempProject = { ...selectedProject, onHold: tempArray };
        break;
    }
    setSelectedProject(tempProject);
    updateProjectTasks(user.uid, projectIndex, tempProject);
  }

  const removeTask = <C extends keyof columnList>(task: string, column: C) => {
    let tempArray = [];
    let tempProject = undefined;
    switch (column) {
      case columnSelection.BACKLOG:
        tempArray = selectedProject.backlog.filter(projectTask => projectTask !== task)
        tempProject = { ...selectedProject, backlog: tempArray };
        break;
      case columnSelection.PROGRESS:
        tempArray = selectedProject.progress.filter(projectTask => projectTask !== task)
        tempProject = { ...selectedProject, progress: tempArray };
        break;
      case columnSelection.COMPLETE:
        tempArray = selectedProject.complete.filter(projectTask => projectTask !== task)
        tempProject = { ...selectedProject, complete: tempArray };
        break;
      case columnSelection.ON_HOLD:
        tempArray = selectedProject.onHold.filter(projectTask => projectTask !== task)
        tempProject = { ...selectedProject, onHold: tempArray };
        break;
    }
    setSelectedProject(tempProject);
    updateProjectTasks(user.uid, projectIndex, tempProject);
  }

  const saveEdit = <C extends keyof columnList>(columnName: C, index: number) => {
    let tempArray = [];
    let tempProject = undefined;
    switch (columnName) {
      case columnSelection.BACKLOG:
        tempArray = selectedProject.backlog;
        tempArray[index] = editTask;
        tempProject = { ...selectedProject, backlog: tempArray };
        break;
      case columnSelection.PROGRESS:
        tempArray = selectedProject.progress;
        tempArray[index] = editTask;
        tempProject = { ...selectedProject, progress: tempArray };
        break;
      case columnSelection.COMPLETE:
        tempArray = selectedProject.complete;
        tempArray[index] = editTask;
        tempProject = { ...selectedProject, complete: tempArray };
        break;
      case columnSelection.ON_HOLD:
        tempArray = selectedProject.onHold;
        tempArray[index] = editTask;
        tempProject = { ...selectedProject, onHold: tempArray };
        break;
    }
    setSelectedProject(tempProject);
    updateProjectTasks(user.uid, projectIndex, tempProject);
    setEditVisibility(false);
  }

  return (
    <>
      <Button className="return-btn btn-dark" onClick={() => setSelectedProject(undefined)}>return</Button>
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