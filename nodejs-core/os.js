const os = require('os');

/*Get the current user information
** os.userInfo() returns an Object. */
const user = os.userInfo();
console.log(`User Information: ${JSON.stringify(user)}`);

/* Geting the system architecture.
** Return value is equivalent to process.arch */
const sysArch = os.arch();
console.log(`System Architecture: ${sysArch}`);
