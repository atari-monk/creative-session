import { HttpMethod } from '../HttpMethod';
import IRouting from '../IRouting';

export const getCreateRoute = (baseUrl: string): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      createProject: {
        method: HttpMethod.POST,
        endpoint: 'projects/create',
      },
    },
  };
};

export const getProjectRoutes = (
  baseUrl: string,
  userId: string,
  projectId: string
): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
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
};
