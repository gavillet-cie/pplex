const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
require("dotenv").config();

const { FTP_ROOT, FTP_USER, FTP_PASSWORD, FTP_HOST } = process.env;
const LOCAL_ROOT = `${__dirname}/site`;

const config = {
  user: FTP_USER,
  password: FTP_PASSWORD,
  host: FTP_HOST,
  port: 21,
  localRoot: LOCAL_ROOT,
  remoteRoot: FTP_ROOT,
  include: [
    "config.php",
    "templates/*.php",
    "templates/utils/*",
    "templates/utils/*/**",
    "templates/fields/*",
    "templates/fields/*/**",
    "templates/endpoints/*",
    "templates/endpoints/*/**",
    "templates/api/*",
    "templates/api/*/**",
    "templates/headers/*",
    "templates/headers/*/**",
    "templates/scripts/dist/*",
    "templates/scripts/dist/*/**",
    "templates/styles/*.css",
    "templates/form-builder/*/**",
    "index.php",
    "ready.php",
  ],
  deleteRemote: false,
  forcePasv: true,
};

/* eslint-disable no-console */

ftpDeploy
  .deploy(config)
  .then(() => console.log("DEPLOY COMPLETED"))
  .catch((error) => console.log(error));

ftpDeploy.on("uploading", (data) => {
  console.log(`Total Files: ${data.totalFilesCount}`);
  console.log(`Transfered Files: ${data.transferredFileCount}`);
  console.log(`Current File: ${data.filename}`);
});

/* eslint-enable no-console */
