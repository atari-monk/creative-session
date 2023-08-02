import { testGet, testPost } from './../apiTester';
import projectRouting from './../project/routes';

const showEl = false;

export default async function projectTests() {
  console.log('Project route tests:');
  await testPost(
    'createProject',
    projectRouting,
    {
      name: 'test',
      description: 'test',
      userId: '64c684138a1c3eddd046d31e',
    },
    showEl
  );
  await testGet('getProjects', projectRouting, showEl);
  await testGet('getProjectById', projectRouting, showEl);
  await testGet('getAllProjects', projectRouting, showEl);
}
