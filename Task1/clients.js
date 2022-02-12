const clientHeads = ["clientName", "balance","accountType" ,"createdDate"]
const addClient = document.querySelector("#addClient") // form   undife =>false
const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")
const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent)
            myElement.textContent = element.textContent
        if (element.classes)
            myElement.classList = element.classes
        element.attributes.forEach(attribute => {
            myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    } catch (e) {
        console.log(e)
    }
}
const elementObjCreator = (element, parent, textContent, classes, attributes) => {
        return {
            element,
            parent,
            textContent,
            classes,
            attributes
        }
    }
    // read data from localstorage
const readFromStorage = (storageItem) => { 
        let data
        try {
            data = JSON.parse(localStorage.getItem(storageItem))
            if (!Array.isArray(data))
                throw new Error("Data not array")

        } catch (e) {
            data = []
        }
        return data
    }
    // write data in localstorage
const writeDataToStorage = (storageItem, data) => {
        localStorage.setItem(storageItem, JSON.stringify(data))
    }
    // draw Client
const drawclient = (client, index) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, null, []))
    createMyOwnElement(elementObjCreator("td", tr, client.accountNumber, null, []))
    createMyOwnElement(elementObjCreator("td", tr, client.clientName, null, []))
    createMyOwnElement(elementObjCreator("td", tr, client.balance, null, []))
    createMyOwnElement(elementObjCreator("td", tr, client.accountType, null, []))
    createMyOwnElement(elementObjCreator("td", tr, client.createdDate, null, []))
    const tdTrans = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
    const transBtn = createMyOwnElement(elementObjCreator("a", tdTrans, "Transactions", "btn btn-warning mx-3", [{
        key: "href",
        val: "transactions.html"
    }]))
    const tdControls = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
    const singleBtn = createMyOwnElement(elementObjCreator("button", tdControls, "Show", "btn btn-success mx-3", []))
    singleBtn.addEventListener("click", () => showElement(client))
    const editBtn = createMyOwnElement(elementObjCreator("a", tdControls, "Edit", "btn btn-warning mx-3", [{
            key: "href",
            val: "edit.html"
        }]))
        // <button id="delete" class="btn btn-danger mx-3">Delete</a>
    const delBtn = createMyOwnElement(elementObjCreator("button", tdControls, "delete", "btn btn-danger mx-3", []))
    delBtn.addEventListener("click", () => deleteItem(index))
}
const deleteItem = (index) => { // index
    const clients = readFromStorage("clients")
    clients.splice(index, 1)
    writeDataToStorage("clients", clients)
    drawAllclients(clients)
}
const showElement = (client) => {
    writeDataToStorage("client", client)
    window.location.href = "single.html"
}
const drawEmptyRow = (colSpan) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, "alert alert-danger", []))
    createMyOwnElement(elementObjCreator("td", tr, "no clients yet", "text-center", [{
        key: "colspan",
        val: colSpan
    }]))
}
const drawAllclients = (clients) => {
    datawrap.textContent = ""
    if (clients.length == 0)
        drawEmptyRow(7)

    clients.forEach((client, i) => drawclient(client, i))
}
const drawAccountTypes = (accTypes) => {
    accTypes.forEach(accountType => {
            createMyOwnElement(elementObjCreator("option", document.querySelector("#accType"), accountType, null, [{
                key: "value",
                val: accountType
            }]))
        })
    }
    // add Client page
if (addClient) {
    const accTypes = ["Saving", "Current"]
    drawAccountTypes(accTypes)
    // console.log(accTypes)
    addClient.addEventListener("submit", (e) => {
            e.preventDefault()
            let client = {
                id: Date.now()
            }
            clientHeads.forEach((head) => client[head] = addClient.elements[head].value)
    const clients = readFromStorage("clients")
    clients.push(client); 
    console.log(clients)
    writeDataToStorage("clients", clients) 
    addClient.reset() 
    window.location.href = "index.html"
})
}
if (datawrap) {
    drawAllclients(readFromStorage("clients"))
    delAll.addEventListener("click", (event) => {
        writeDataToStorage("clients", [])
        drawAllclients([])
    })
}
const singlewrap = document.querySelector("#singlewrap") 
if (singlewrap) {
    const client = JSON.parse(localStorage.getItem("client"))
    singlewrap.innerHTML = `
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>ID</h5>
    <p>${
    client.accountNumber
}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Client Name</h5>
    <p>${
    client.clientName
}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Balance</h5>
    <p>${
    client.balance
}</p>
    <div class="col-md-12 col-12  border border-2 border-primary">
    <h5>Account Type</h5>
    <p>${
    client.accountType
}</p>
    </div>
    <div class="col-md-12 col-12  border border-2 border-primary">
    <h5>Created Date</h5>
    <p>${
    client.createdDate
}</p>
    </div> `
}