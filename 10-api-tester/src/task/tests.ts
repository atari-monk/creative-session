import { testDelete, testGet, testPatch, testPost } from './../apiTester';
import { getCreateRoute, getRoutes } from './routes';

export async function taskTest() {
  const baseUrl = 'http://localhost:3000/api/v1';
  const userId = '64c684138a1c3eddd046d31e';
  const projectId = '64ccdfad81040c3375a0ac95';
  const showEl = false;
  console.log('Create Task test:');
  const createRoute = getCreateRoute(baseUrl);
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
  await testGet('getTasksForUserAndProject', routes, showEl);
  await testPatch(
    'updateTask',
    routes,
    { description: 'test-description' },
    showEl
  );
  await testPatch(
    'finishTask',
    routes,
    { finishedAt: '2023-08-03T17:53:09.171Z', summary: 'test-summary' },
    showEl
  );
  await testGet('getAllTasks', routes, showEl);
  await testDelete('deleteTask', routes, showEl);
  await testGet('getAllTasks', routes, showEl);
}
