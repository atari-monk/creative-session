import { HttpMethod } from '../HttpMethod';
import IRouting from '../IRouting';

export const getCreateRoute = (baseUrl: string): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      createUser: {
        method: HttpMethod.POST,
        endpoint: 'users',
      },
    },
  };
};

export const getRoutes = (
  baseUrl: string,
  id: string,
  email: string
): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      getUsers: {
        method: HttpMethod.GET,
        endpoint: 'users',
      },
      createUser: {
        method: HttpMethod.POST,
        endpoint: 'users',
      },
      updateUser: {
        method: HttpMethod.PATCH,
        endpoint: `users/${id}`,
      },
      deleteUser: {
        method: HttpMethod.DELETE,
        endpoint: `users/${id}`,
      },
      getUserIdByEmail: {
        method: HttpMethod.GET,
        endpoint: `users/email/${email}`,
      },
    },
  };
};
