import { exec } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { findFolder } from './check-is-service-exist';

const argv = yargs(hideBin(process.argv)).argv;
if (!argv['migration-name']) {
  console.error(
    'Please provide a name for the migration using the --migration-name parameter.',
  );
  process.exit(1);
}

if (!argv['service-name']) {
  console.error(
    'Please provide the name of the service for which the migration is being generated. using the --service-name parameter.',
  );
  process.exit(1);
}

const migrationName = argv['migration-name'];
const serviceName = argv['service-name'];
const command = `npm run typeorm migration:generate ./apps/${serviceName}/src/database/migrations/${migrationName} -- -d ./apps/${serviceName}/src/database/ormconfig.ts`;

if (!findFolder(serviceName)) {
  console.error(`Service ${serviceName} doesn't exist`);

  process.exit(1);
}

console.log(`Executing: ${command}`);
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
