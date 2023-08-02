import { HttpMethod } from '../HttpMethod';
import IRouting from '../IRouting';

const projectRouting: IRouting = {
  baseUrl: 'http://localhost:3000/api/v1',
  endpoints: {
    createProject: {
      method: HttpMethod.POST,
      endpoint: 'projects',
    },
    getProjects: {
      method: HttpMethod.GET,
      endpoint: 'projects?userId=64c684138a1c3eddd046d31e',
    },
    getProjectById: {
      method: HttpMethod.GET,
      endpoint: 'projects/:id',
    },
    updateProject: {
      method: HttpMethod.PATCH,
      endpoint: 'projects/:id',
    },
    deleteProject: {
      method: HttpMethod.DELETE,
      endpoint: 'projects/:id',
    },
    getAllProjects: {
      method: HttpMethod.GET,
      endpoint: 'projects/all',
    },
  },
};

export default projectRouting;
