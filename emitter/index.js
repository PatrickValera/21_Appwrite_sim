const sdk = require('node-appwrite');
const client = new sdk.Client()
client
    .setEndpoint('http://147.182.235.212/v1') // Your API Endpoint
    .setProject('stock-sim') // Your project ID
    .setKey('ec1474839b98e9142acc1683b31627d912ac774c7b2bb24ad858ffff928e987e8b3880d6bce5c795ffcc8bda1a1492cfa7eb6c2040fd647e1f7c111a4ec7b277bb5f13b5dade9fa7f23921774b5bb9449400ada0a42f41e7d26541995d34fb97094efbcb6279f9b32fabd13610450dc82c420beb4d2db4dd0ce4e0932c5dbb52')
    ;
const database = new sdk.Database(client)

// let promise = database.getCollection('stocks');
// let promise = database.listDocuments('stocks');
// promise.then((res)=>{
//     console.log(res)
// })
const startEmitters = async () => {
    // Fetch All Stocks
    const { documents } = await database.listDocuments('stock').then(res => { return res })
    // Start Emitter fore each stock, updating prices
    for (let i = 0; i < documents.length; i++) {
        startEmitter(documents[i])
    }
}

const startEmitter = async (stock) => {
    let i = 0
    while (1) {
        update(stock)
        await delay(2000)
        i += 1
    }
}
const update = async (stock) => {
    let ar
    let newPrice
    let prom = await database.getDocument('stock', stock.$id).then(res => {
        let percentChange = Math.floor(Math.random() * 4) + 1
        percentChange *= Math.round(Math.random()) ? 1 : -1
        newPrice = res.currentPrice + (res.currentPrice * (percentChange / 100))


        // Append new value to price history
        ar = res.priceHistory
        if (ar.length < 1800) {
            ar = ar.slice(0)
        } else {
            ar = ar.slice(1)
        }
        ar.push(Number(newPrice.toFixed(2)))
    })
    // Generate Percent Change +/-

    let promise = await database.updateDocument('stock', stock.$id, {
        currentPrice: newPrice,
        priceHistory: ar
    }).then((res) => {
        console.log('updated')
    })
    // await delay(2000)
}

const delay = async (ms) => {
    wait = Math.ceil(Math.random() * 3000)
    // wait=200
    return new Promise(resolve => setTimeout(resolve, wait));
}

startEmitters()
