import { exec } from 'child_process';

const validateYaml = () => {
  const command = 'yamllint ./../.github/workflows';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }

    console.log(stdout);
    console.error(stderr);
  });
};

validateYaml();
