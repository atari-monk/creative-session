import { testDelete, testGet, testPatch, testPost } from './../apiTester';
import { getCreateRoute, getRoutes } from './routes';

export async function userTest() {
  const baseUrl = 'http://localhost:3000/api/v1';
  const showEl = false;
  const email = 'x.y2@gmail.com';

  const createRoute = getCreateRoute(baseUrl);
  console.log('Create User test:');
  const userId = await testPost(
    'createUser',
    createRoute,
    {
      email,
      displayName: 'test-name',
      maxRecords: 1000,
    },
    showEl
  );

  const routes = getRoutes(baseUrl, userId, email);
  console.log('User tests:');
  await testGet('getUsers', routes, showEl);
  await testGet('getUserIdByEmail', routes, showEl);
  await testPatch(
    'updateUser',
    routes,
    { email: 'newuser@example.com' },
    showEl
  );
  await testDelete('deleteUser', routes, showEl);
  await testGet('getUsers', routes, showEl);
}
