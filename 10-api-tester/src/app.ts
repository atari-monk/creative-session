import { newTest } from './newTest';
import { projectTest } from './project/tests';
import { taskTest } from './task/tests';
import { userTest } from './user/tests';

(async () => {
  await projectTest();
  await userTest();
  await taskTest();
  await newTest();
})();
