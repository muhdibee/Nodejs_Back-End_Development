const os = require('os');

/*Get the current user information
** os.userInfo() returns an Object. */
const user = os.userInfo();
console.log(`User Information: ${JSON.stringify(user)}`);

/* Geting the system architecture.
** Returns value is equivalent to process.arch */
const sysArch = os.arch();
console.log(`System Architecture: ${sysArch}`);

/* Geting the system uptime.
** Returns uptime of CPU in seconds */
const uptime = os.uptime();
console.log(`uptime: ${Math.round(os.uptime/60)} Mins`);