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
        // balance: {
        //     demandOption: true,
        //     describe: "User balance",
        // },
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
yargs.command({
    command: "showUser",
    describe: "Show Users Data",
    handler: () => {
        users.showUser()
    }
})
yargs.command({
    command: "addUserAddress",
    describe: "Add User Address",
    builder: {
        id: { demandOption: true },
        addressType: { demandOption: true },
        addressDetails: { demandOption: true }
    },
    handler: (argv) => {
        users.addAddress(argv)
    }
})
yargs.command({
    command: "addUserTrans",
    describe: "Add User Transaction",
    builder: {
        id: { demandOption: true },
        transType: { demandOption: true },
        transValue: { demandOption: true }
    },
    handler: (argv) => {
        users.addTrans(argv)
    }
})
yargs.command({
    command: "showSingleUser",
    builder: {
        id: { demandOption: true }
    },
    describe: "Show Single Users Data",
    handler: (argv) => {
        users.showSingleUser(argv)
    }
})
yargs.command({
    command: "deleteSingleUser",
    builder: {
        id: { demandOption: true }
    },
    describe: "Delete Single Users Data",
    handler: (argv) => {
        users.deleteSingleUser(argv)
    }
})
yargs.command({
    command: "deleteAll",
    describe: "Delete Users Data",
    handler: () => {
        users.deleteAll()
    }
})
yargs.command({
    command: "editUser",
    describe: "Edit User Data",
    builder: {
        id: { demandOption: true }
    },
    handler: (args) => {
        users.editUser(args)
    }
})
yargs.argv