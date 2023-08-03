import { newTest } from './newTest';
import { projectTest } from './project/tests';

(async () => {
  await projectTest();
  await newTest();
})();
