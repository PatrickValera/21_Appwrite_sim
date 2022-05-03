import { Appwrite } from "appwrite";

const api = new Appwrite();

api
    .setEndpoint('http://localhost:5001/v1') // Your API Endpoint
    .setProject('626ff525dcb106ce6c56') // Your project ID
;

// const handleSubmit = async () => {
//     try {
//       await api.database.createDocument('stocks', 'unique()', {
//         name: 'sample',
//         tickerSymbol:'EX',
//         currentPrice: 4,
//         color: 'red',
//         priceHistory: [1, 2, 3, 4, 19, 5]
//       })
//     console.log('SUBMITTED')

//     }
//     catch (e) {
//           console.log(e.message)

//     }

//   }
//   handleSubmit()
console.log('WORKING')
// export default sdk