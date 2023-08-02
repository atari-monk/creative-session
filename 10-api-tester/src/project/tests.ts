import { testGet, testPost } from './../apiTester';
import projectRouting from './../project/routes';

export default async function projectTests() {
  console.log('Project route tests:');
  await testPost('createProject', projectRouting, {
    name: 'test',
    description: 'test',
    userId: '64c684138a1c3eddd046d31e',
  });
  await testGet('getProjects', projectRouting);
  await testGet('getAllProjects', projectRouting);
}
