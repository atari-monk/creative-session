import { testDelete, testGet, testPatch, testPost } from './../apiTester';
import projectRouting from './routes';

const showEl = false;

export async function projectTests() {
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
  await testPatch(
    'updateProject',
    projectRouting,
    { name: 'test-name', description: 'test-description' },
    showEl
  );
  await testDelete('deleteProject', projectRouting, showEl);
  await testGet('getAllProjects', projectRouting, showEl);
}

export async function workTests() {
  console.log('Work tests:');
}
