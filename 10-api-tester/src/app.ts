import { workTests, projectTests } from './project/tests';

(async () => {
  await projectTests();
  await workTests();
})();
