const dealWithData = require('./dealWithData')
userData = [{ element: "name", default: null },
    { element: "phone", default: null },
    { element: "age", default: null },
    {
        element: "addedAt",
        default: dealWithData.timeFormat(new Date())
    },
    { element: "email", default: null },
    { element: "addresses", default: [] },
    { element: "transactions", default: [] }
]
const addUser = (args) => {
    let user = {}
    userData.forEach(d => {
        if (!d.default) return user[d.element] = args[d.element]
        user[d.element] = d.default
    })
    console.log(user)
    const users = dealWithData.readDataFromJSON("./db/data.json")
    users.length == 0 ? user.id = 1 : user.id = users[users.length - 1].id + 1
    users.push(user)
    dealWithData.writeDataToFile("./db/data.json", users)
    console.log(users)
}
module.exports = { addUser }