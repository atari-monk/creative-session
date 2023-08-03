import { newTest } from './newTest';
import { projectTest } from './project/tests';
import { userTest } from './user/tests';

(async () => {
  await projectTest();
  //await userTest(); 
  //await newTest();
})();
