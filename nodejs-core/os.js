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
console.log(`Uptime: ${Math.round(os.uptime/60)} Mins`);

// Geting the hostname/Machine name of the operating system.
const hostname = os.hostname();
console.log(`Hostname: ${hostname}`);

// Geting the oprating system paltform. Returns the os platform to which the nodejs binary was complied.
const platform = os.platform();
console.log(`Platform: ${platform}`);

// Geting the total amount of system memory. Returns an integer value.
const totalMemory = os.totalmem();
console.log(`TotalMemory: ${totalMemory} B`);

// Geting the amount of system free memory. Returns an integer value.
const freeMemory = os.freemem();
console.log(`FreeMemory: ${freeMemory} B`);

// Geting information about all system cpus. Returns an array of objects containing information about each CPU.
const cpus = os.cpus();
console.log(`cpus: ${JSON.stringify(cpus)} B`);
