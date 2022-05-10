const sdk = require('node-appwrite');
const client = new sdk.Client()
client
    .setEndpoint('http://localhost:5001/v1') // Your API Endpoint
    .setProject('626ff525dcb106ce6c56') // Your project ID
    .setKey('aae7f1661abb80c1a12586a6df90217c487078a87f121bc3a107b7f99197819e01b4d4b66a4b5250bb10cd80f5633ab3c2c0cd2a6f2374839bd3ef9fe7c79a0eceb7c54d87a7e5199c94507dc1d2874214a6cc624221047052a5b9f1da421c54a153a0071c8d148c0a9bfbbbd508e85c117809d466fa6f29b802a3de8284328c')
    ;
const database = new sdk.Database(client)

// let promise = database.getCollection('stocks');
// let promise = database.listDocuments('stocks');
// promise.then((res)=>{
//     console.log(res)
// })
const startEmitters = async () => {
    const {documents} = await database.listDocuments('stocks').then(res=>{return res})
    for (let i=0;i<documents.length;i++){
        startEmitter(documents[i].$id)
    }
    console.log(documents)

}
const startEmitter = async (id) => {
    let i = 0
    while (1) {
        update(id)
        await delay(2000)
        i += 1
    }
}
const update = async (id) => {
    let promise = await database.updateDocument('stocks', id, {
        currentPrice: Math.floor(Math.random() * 10),
    }).then((res) => {
        console.log('updated')
    })
    // await delay(2000)
}

const delay = async (ms) => {
    wait=Math.ceil(Math.random()*3000)
    // wait=200
    return new Promise(resolve => setTimeout(resolve,wait));
}

startEmitters()
