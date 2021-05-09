export interface ProjectDetail {
  name: string,
  completeStatus: boolean,
  backlog: string[],
  progress: string[],
  complete: string[],
  onHold: string[],
}

export const emptyProject: ProjectDetail = {
  name: '',
  completeStatus: false,
  backlog: [],
  progress: [],
  complete: [],
  onHold: [],
}