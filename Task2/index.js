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
const users = require('./dealWithData/users')
yargs.command({
    command: "addUser",
    describe: "Add New User",
    builder: {
        name: {
            demandOption: true,
            describe: "User Name",
        },
        phone: {
            demandOption: true,
            describe: "User Phone",
        },
        age: {
            demandOption: true,
            describe: "User Age",
        },
        // addedAt: {
        //     default: timeFormat(new Date()),
        //     describe: "User Added At",
        // },
        email: {
            demandOption: true,
            describe: "User Email",
        }
        // addresses: {
        //     default: [],
        //     describe: "User Address",
        // },
        // transactions: {
        //     default: [],
        //     describe: "User Transactions",
        // }
    },
    handler: (argv) => {
        users.addUser(argv)
    }
})
yargs.argv