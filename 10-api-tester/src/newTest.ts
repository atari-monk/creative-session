import { testDelete, testGet, testPost } from './apiTester';
import { getCreateRoute, getRoutes } from './task/routes';

export async function newTest() {
  console.log('New test:');
  const baseUrl = 'http://localhost:3000/api/v1';
  const userId = '64c684138a1c3eddd046d31e';
  const projectId = '64cbd61e8c5bf0c118b5bbe5';
  const showEl = false;
  const createRoute = getCreateRoute(baseUrl);
  console.log('Create Task test:');
  const taskId = await testPost(
    'createTask',
    createRoute,
    {
      description: 'test',
      userId,
      projectId,
    },
    showEl
  );
  console.log('Task tests:');
  const routes = getRoutes(baseUrl, userId, taskId, projectId);
  await testGet('getTasksForUser', routes, showEl);
  await testDelete('deleteTask', routes, showEl);
}
