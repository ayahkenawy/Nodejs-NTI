const dealWithData = require('./dealWithData')
const validator = require('validator')
userData = [{
        element: "name",
        default: null,
        invalid: (data) => {
            if (data.length < 3)
                true
            else
                return false
        }
    },
    {
        element: "phone",
        default: null,
        invalid: (data) => !validator.isMobilePhone(data, ['ar-EG']) ? "invalid phone" : false
    },
    {
        element: "balance",
        default: 5000,
        invalid: (data) => false
    }, {
        element: "age",
        default: null,
        invalid: (data) => data < 21 ? "invalid age" : false
    },
    {
        element: "addedAt",
        default: dealWithData.timeFormat(new Date()),
        invalid: (data) => false
    }, {
        element: "email",
        default: null,
        invalid: (data) => !validator.isEmail(data, ['ar-EG']) ? "invalid phone" : false
    }, {
        element: "addresses",
        default: [],
        invalid: (data) => false
    }, {
        element: "transactions",
        default: [],
        invalid: (data) => false
    }
]
const addUser = (args) => {
    let errors = []
    let user = {}
    try {
        userData.forEach(d => {
            // console.log(d.invalid(args[d.element]))
            // if (d.invalid(args[d.element]))  errors.push(d.invalid(args[d.element]))
            if (!d.default)
                return user[d.element] = args[d.element]

            user[d.element] = d.default
        })
        if (errors.length > 0)
            throw new Error(errors)

        const users = dealWithData.readDataFromJSON("./db/data.json")
        users.length == 0 ? user.id = 1 : user.id = users[users.length - 1].id + 1
        users.push(user)
        dealWithData.writeDataToFile("./db/data.json", users)
        console.log(users)
    } catch (error) {
        console.log(error.message)
    }

}
const showUser = () => {
    const users = dealWithData.readDataFromJSON("./db/data.json")
    console.log(users);
    return users
}
const addAddress = (args) => {
    try {
        const users = dealWithData.readDataFromJSON("./db/data.json")
        let user = users.findIndex(u => u.id == args.id)
        if (user == -1) throw new Error("User Not Found")
        users[user].addresses.push({
            addressID: Date.now(),
            addressType: args.addressType,
            addressDetails: args.addressDetails
        })
        dealWithData.writeDataToFile('./db/data.json', users)
        console.log("Data Added")
    } catch (error) {
        console.log(error.message)
    }
}
const addTrans = (args) => {
    try {
        const users = dealWithData.readDataFromJSON("./db/data.json")
        let user = users.findIndex(u => u.id == args.id)
        if (user == -1) throw new Error("User Not Found")
        users[user].transactions.push({
            transID: Date.now(),
            transType: args.transType,
            transValue: args.transValue
        })
        dealWithData.writeDataToFile('./db/data.json', users)
        console.log("Data Added")
    } catch (error) {
        console.log(error.message)
    }

}
const deleteAll = () => {
    dealWithData.writeDataToFile([])
    console.log("All Data Deleted")
}
const deleteSingleUser = (args) => {
    try {
        const users = dealWithData.readDataFromJSON("./db/data.json")
        let user = users.findIndex(u => u.id == args.id)
        if (user == -1) throw new Error("User Not Found")
        users.splice(user, 1)
        dealWithData.writeDataToFile('./db/data.json', users)
        console.log("Data Deleted")
    } catch (error) {
        console.log(error.message)
    }
}
const showSingleUser = (args) => {
    try {
        const users = dealWithData.readDataFromJSON("./db/data.json")
        let user = users.find(u => u.id == args.id)
        if (!user) throw new Error("User Not Found")
        console.log(user)
    } catch (error) {
        console.log(error.message)
    }
}
const editUser = (args) => {
    try {
        const users = dealWithData.readDataFromJSON("./db/data.json")
        let user = users.find(u => u.id == args.id)
        if (!user) throw new Error("User Not Found")
        userData.forEach(d => {
            if (args[d.element]) user[d.element] = args[d.element]
        })
        console.log(user)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    addUser,
    showUser,
    addAddress,
    addTrans,
    deleteAll,
    deleteSingleUser,
    showSingleUser,
    editUser
}