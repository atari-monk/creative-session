import { HttpMethod } from '../HttpMethod';
import IRouting from '../IRouting';

export const getCreateRoute = (baseUrl: string): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      createTask: {
        method: HttpMethod.POST,
        endpoint: 'tasks',
      },
    },
  };
};

export const getRoutes = (
  baseUrl: string,
  userId: string,
  taskId: string,
  projectId: string,
): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      getTasksForUser: {
        method: HttpMethod.GET,
        endpoint: `tasks/user/${userId}`,
      },
      getTasksForUserAndProject: {
        method: HttpMethod.GET,
        endpoint: `tasks/user/${userId}/${projectId}`,
      },
      getTaskById: {
        method: HttpMethod.GET,
        endpoint: `tasks/${taskId}?userId=${userId}`,
      },
      updateTask: {
        method: HttpMethod.PATCH,
        endpoint: `tasks/${taskId}`,
      },
      deleteTask: {
        method: HttpMethod.DELETE,
        endpoint: `tasks/${taskId}`,
      },
      getAllTasks: {
        method: HttpMethod.GET,
        endpoint: 'tasks/all',
      },
      finishTask: {
        method: HttpMethod.PATCH,
        endpoint: `tasks/${taskId}/finish`,
      },
    },
  };
};
