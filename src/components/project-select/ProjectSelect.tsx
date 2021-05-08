import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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
    },
    {
      name: 'WhatsForLinner',
      completeStatus: true,
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

const emptyProject = {
  name: '',
  completusState: true,
  backlog: [],
  progress: [],
  complete: [],
  onHold: []
}

interface ProjectDetail {
  name: string,
  completeStatus: boolean,
  backlog: string[],
  progress: string[],
  complete: string[],
  onHold: string[]
}

export const ProjectSelect = () => {
  const { user, logout } = useContext(AuthContext);

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | undefined>(undefined);
  const [addProjectVisibility, setAddProjectVisibility] = useState(false);
  const [isCompletedColumn, setIsCompletedColumn] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectIndex, setEditProjectIndex] = useState(-1);
  const [editProjectVisibility, setEditProjectVisibility] = useState(false);

  const addProject = (projectName: string, isCompleted: boolean) => {
    mockData.projectList.push({
      name: projectName,
      completeStatus: isCompleted,
      backlog: [],
      progress: [],
      complete: [],
      onHold: []
    })
  }

  const editProject = (project: ProjectDetail, status: boolean) => {
    const index = mockData.projectList.indexOf(project);
    const newProject = {
      name: editProjectName,
      completeStatus: status,
      backlog: [],
      progress: [],
      complete: [],
      onHold: []
    }
    mockData.projectList[index] = newProject;
  }

  const removeProject = (project: ProjectDetail) => {
    const index = mockData.projectList.indexOf(project);
    if (index > -1) mockData.projectList.splice(index, 1);
  }

  return (
    <>
      {selectedProject ?
        <ProjectTracker selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        :
        <>
          <h1>Welcome {user.displayName}, these are your projects:</h1>
          <button onClick={() => logout()}>Signout</button>
          <div className="project-tracker-container">
            <ul className="project-list">
              <li className="project-column progress-column">
                <span className="header">
                  <h1>In-Progress</h1>
                </span>
                <div id="progress-content" className="custom-scroll">
                  {mockData.projectList.map((project, index) => {
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
                        <li className="project-item" draggable={true} key={index}>
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
              <li className="project-column complete-column">
                <span className="header">
                  <h1>Completed</h1>
                </span>
                <div id="progress-content" className="custom-scroll">
                  {mockData.projectList.map((project, index) => {
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
                        <li className="project-item" draggable={true} key={index}>
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