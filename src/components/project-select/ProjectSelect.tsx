import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ProjectTracker } from '../project-tracker/ProjectTracker';
import { AuthContext } from '../firebase-context/FirebaseContext';
import { ProjectDetail } from '../../schemas/projectDetail';
import Button from 'react-bootstrap/Button';

export const ProjectSelect = () => {
  const { user, logout, projectList, updateProjectList } = useContext(AuthContext);

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | undefined>(undefined);
  const [addProjectVisibility, setAddProjectVisibility] = useState(false);
  const [isCompletedColumn, setIsCompletedColumn] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectIndex, setEditProjectIndex] = useState(-1);
  const [editProjectVisibility, setEditProjectVisibility] = useState(false);
  const [draggedProject, setDraggedProject] = useState<ProjectDetail | undefined>(undefined)

  const addProject = (projectName: string, isCompleted: boolean) => {
    updateProjectList(
      user.uid,
      [
        ...projectList,
        {
          name: projectName,
          completeStatus: isCompleted,
          backlog: [],
          progress: [],
          complete: [],
          onHold: []
        }
      ]
    )
  }

  const editProject = (project: ProjectDetail, status: boolean) => {
    const index = projectList.indexOf(project);
    const newProject = {
      name: editProjectName,
      completeStatus: status,
      backlog: [],
      progress: [],
      complete: [],
      onHold: []
    }
    let tempProjectList = [...projectList];
    tempProjectList[index] = newProject;
    updateProjectList(user.uid, tempProjectList);
  }

  const removeProject = (projectToRemove: ProjectDetail) => {
    updateProjectList(user.uid, projectList.filter((project: ProjectDetail) => project !== projectToRemove))
  }

  const projectDrop = (project: ProjectDetail, status: boolean) => {
    const index = projectList.indexOf(project);
    let tempProjectList = [...projectList];
    tempProjectList[index].completeStatus = status;
    updateProjectList(user.uid, tempProjectList);
    setDraggedProject(undefined);
  }

  return (
    <>
      {selectedProject ?
        <ProjectTracker selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        :
        <>
          <h1>Welcome {user.displayName}, these are your projects:</h1>
          <Button className="logout-btn btn-success" onClick={() => logout()}>Logout</Button>
          <div className="project-tracker-container">
            <ul className="project-list">
              <li
                className="project-column progress-column"
                onDragOver={e => e.preventDefault()}
                onDrop={() => { if (draggedProject) projectDrop(draggedProject, false) }}
              >
                <span className="header">
                  <h1>In-Progress</h1>
                </span>
                <div id="progress-content" className="custom-scroll">
                  {projectList.map((project: ProjectDetail, index: number) => {
                    if (!project.completeStatus && editProjectIndex === index && editProjectVisibility) {
                      return <>
                        <div className="new-input-container">
                          <textarea
                            className="new-input"
                            value={editProjectName}
                            onChange={e => setEditProjectName(e.target.value)}
                          />
                        </div>
                        <div className="save-btn-group">
                          <div className="save-btn" onClick={() => {
                            setEditProjectVisibility(false)
                            setEditProjectName('')
                          }}>
                            <span>Close</span>
                          </div>
                          <div className="save-btn" onClick={() => {
                            editProject(project, false)
                            setEditProjectVisibility(false)
                            setNewProjectName('')
                          }}>
                            <span>Save Item</span>
                          </div>
                        </div>
                      </>
                    } else if (!project.completeStatus) {
                      return (
                        <li
                          className="project-item"
                          draggable={true}
                          key={index}
                          onDragStart={() => setDraggedProject(project)}
                        >
                          <div className="task-container">
                            <div className="edit-button-container">
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => {
                                  setEditProjectIndex(index)
                                  setEditProjectName(project.name)
                                  setEditProjectVisibility(true)
                                }}
                              />
                              <FontAwesomeIcon icon={faTimes} onClick={() => removeProject(project)} />
                            </div>
                            <p className="project-text" onClick={() => setSelectedProject(project)}>{project.name}</p>
                          </div>
                        </li>
                      )
                    }
                    return null
                  })}
                </div>
                {addProjectVisibility && !isCompletedColumn ?
                  <>
                    <div className="new-input-container">
                      <textarea
                        className="new-input"
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                      />
                    </div>
                    <div className="save-btn-group">
                      <div className="save-btn" onClick={() => {
                        setAddProjectVisibility(false)
                        setNewProjectName('')
                      }}>
                        <span>Close</span>
                      </div>
                      <div className="save-btn" onClick={() => {
                        addProject(newProjectName, false)
                        setAddProjectVisibility(false)
                        setNewProjectName('')
                      }}>
                        <span>Save Item</span>
                      </div>
                    </div>
                  </>
                  :
                  <div className="add-project-btn" onClick={() => {
                    setAddProjectVisibility(true)
                    setIsCompletedColumn(false)
                  }}>
                    <span className="plus-sign">+</span>
                    <span>Add Project</span>
                  </div>
                }
              </li>
              <li
                className="project-column complete-column"
                onDragOver={e => e.preventDefault()}
                onDrop={() => { if (draggedProject) projectDrop(draggedProject, true) }}
              >
                <span className="header">
                  <h1>Completed</h1>
                </span>
                <div id="progress-content" className="custom-scroll">
                  {projectList.map((project: ProjectDetail, index: number) => {
                    if (project.completeStatus && editProjectIndex === index && editProjectVisibility) {
                      return <>
                        <div className="new-input-container">
                          <textarea
                            className="new-input"
                            value={editProjectName}
                            onChange={e => setEditProjectName(e.target.value)}
                          />
                        </div>
                        <div className="save-btn-group">
                          <div className="save-btn" onClick={() => {
                            setEditProjectVisibility(false)
                            setEditProjectName('')
                          }}>
                            <span>Close</span>
                          </div>
                          <div className="save-btn" onClick={() => {
                            editProject(project, true)
                            setEditProjectVisibility(false)
                            setNewProjectName('')
                          }}>
                            <span>Save Item</span>
                          </div>
                        </div>
                      </>
                    } else if (project.completeStatus) {
                      return (
                        <li
                          className="project-item"
                          draggable={true} key={index}
                          onDragStart={() => setDraggedProject(project)}
                        >
                          <div className="task-container">
                            <div className="edit-button-container">
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => {
                                  setEditProjectIndex(index)
                                  setEditProjectName(project.name)
                                  setEditProjectVisibility(true)
                                }}
                              />
                              <FontAwesomeIcon icon={faTimes} onClick={() => removeProject(project)} />
                            </div>
                            <p className="project-text" onClick={() => setSelectedProject(project)}>{project.name}</p>
                          </div>
                        </li>
                      )
                    }
                    return null
                  })}
                </div>
                {addProjectVisibility && isCompletedColumn ?
                  <>
                    <div className="new-input-container">
                      <textarea
                        className="new-input"
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                      />
                    </div>
                    <div className="save-btn-group">
                      <div className="save-btn" onClick={() => {
                        setAddProjectVisibility(false)
                        setNewProjectName('')
                      }}>
                        <span>Close</span>
                      </div>
                      <div className="save-btn" onClick={() => {
                        addProject(newProjectName, true)
                        setAddProjectVisibility(false)
                        setNewProjectName('')
                      }}>
                        <span>Save Item</span>
                      </div>
                    </div>
                  </>
                  :
                  <div className="add-project-btn" onClick={() => {
                    setAddProjectVisibility(true)
                    setIsCompletedColumn(true)
                  }}>
                    <span className="plus-sign">+</span>
                    <span>Add Project</span>
                  </div>
                }
              </li>
            </ul>
          </div>
        </>
      }
    </>
  )
}