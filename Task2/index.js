// const yargs = require("yargs")
// yargs.command({
//     command: "add",
//     builder: {
//         a: {
//             describe: "a",
//             demandOption: true, //required
//             type: "Number" // variable type
//         },
//         b: {
//             describe: "b",
//             demandOption: true, //required
//             type: "Number" // variable type
//         }
//     },
//     handler: function(argv) {
//         console.log(argv.a);
//     }
// })
// yargs.command({
//     command: "showUser",
//     describe: "Show Users Data",
//     handler: () => {
//         users.showUser()
//     }
// })
// yargs.argv
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const yargs = require("yargs")


yargs.argv