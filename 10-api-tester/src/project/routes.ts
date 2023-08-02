import { HttpMethod } from '../HttpMethod';
import IRouting from '../IRouting';

const userId = '64c684138a1c3eddd046d31e';
const projectId = '64ca7ad5fda321361837fd59';

const projectRouting: IRouting = {
  baseUrl: 'http://localhost:3000/api/v1',
  endpoints: {
    createProject: {
      method: HttpMethod.POST,
      endpoint: 'projects/create',
    },
    getProjects: {
      method: HttpMethod.GET,
      endpoint: `projects/user?userId=${userId}`,
    },
    getProjectById: {
      method: HttpMethod.GET,
      endpoint: `projects/${projectId}?userId=${userId}`,
    },
    updateProject: {
      method: HttpMethod.PATCH,
      endpoint: `projects/${projectId}`,
    },
    deleteProject: {
      method: HttpMethod.DELETE,
      endpoint: `projects/${projectId}`,
    },
    getAllProjects: {
      method: HttpMethod.GET,
      endpoint: 'projects/all',
    },
  },
};

export default projectRouting;
