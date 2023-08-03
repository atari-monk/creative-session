import { testDelete, testGet, testPatch, testPost } from './../apiTester';
import { getCreateRoute, getProjectRoutes } from './routes';

export async function projectTest() {
  const baseUrl = 'http://localhost:3000/api/v1';
  const userId = '64c684138a1c3eddd046d31e';
  const showEl = false;
  const createRoute = getCreateRoute(baseUrl);
  console.log('Create Project test:');
  const projectId = await testPost(
    'createProject',
    createRoute,
    {
      name: 'test',
      description: 'test',
      userId,
    },
    showEl
  );
  const routes = getProjectRoutes(baseUrl, userId, projectId);
  console.log('Project tests:');
  await testGet('getProjects', routes, showEl);
  await testGet('getProjectById', routes, showEl);
  await testPatch(
    'updateProject',
    routes,
    { name: 'test-name', description: 'test-description' },
    showEl
  );
  await testGet('getAllProjects', routes, showEl);
  await testDelete('deleteProject', routes, showEl);
  await testGet('getAllProjects', routes, showEl);
}
