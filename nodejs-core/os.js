const os = require('os');

//Get the current user information
const user = os.userInfo();
console.log(`User Information: ${user}`);

const sysArch = os.arch();
console.log(`System Architecture: ${sysArch}`);
