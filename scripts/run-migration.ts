import { exec } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { findFolder } from './check-is-service-exist';

const argv = yargs(hideBin(process.argv)).argv;
const serviceName = argv['service'];

if (!serviceName) {
  console.error(
    'Please provide the name of the service for which the migration needs to be executed using the --service parameter.',
  );
  process.exit(1);
}

if (!findFolder(serviceName)) {
  console.error(`Service ${serviceName} doesn't exist`);

  process.exit(1);
}

const command = `npx typeorm-ts-node-commonjs migration:run -d ./apps/${serviceName}/src/database/ormconfig.ts`;
console.log(`Executing: ${command}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
