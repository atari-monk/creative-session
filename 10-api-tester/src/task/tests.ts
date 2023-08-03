import { testDelete, testGet, testPatch, testPost } from './../apiTester';
import { getCreateRoute, getRoutes } from './routes';

export async function taskTest() {
  const baseUrl = 'http://localhost:3000/api/v1';
  const userId = '64c684138a1c3eddd046d31e';
  const projectId = '64cbd61e8c5bf0c118b5bbe5';
  const showEl = false;
  console.log('Create Task test:');
  const createRoute = getCreateRoute(baseUrl);
  const taskId = await testPost(
    'createTask',
    createRoute,
    {
      name: 'test',
      description: 'test',
      userId,
    },
    showEl
  );
  console.log('Task tests:');
  const routes = getRoutes(baseUrl, userId, taskId, projectId);
  await testGet('getTasks', routes, showEl);
  await testGet('getTaskById', routes, showEl);
  await testPatch(
    'updateTask',
    routes,
    { name: 'test-name', description: 'test-description' },
    showEl
  );
  await testGet('getAllTasks', routes, showEl);
  await testDelete('deleteTask', routes, showEl);
  await testGet('getAllTasks', routes, showEl);
}
