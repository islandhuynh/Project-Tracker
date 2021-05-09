import { ProjectDetail } from './projectDetail';

export interface userData {
  email: string,
  projectList: ProjectDetail[]
}

export const emptyUser: userData = {
  email: '',
  projectList: []
}