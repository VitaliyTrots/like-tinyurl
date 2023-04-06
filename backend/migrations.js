const { exec } = require('child_process');

new Promise((resolve, reject) => {
  const migrate = exec(
    './node_modules/.bin/sequelize db:migrate',
    { env: process.env },
    err => (err ? reject(err): resolve())
  );

  // Forward stdout+stderr to this process
  migrate.stdout.pipe(process.stdout);
  migrate.stderr.pipe(process.stderr);
});
