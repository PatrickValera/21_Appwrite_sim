import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
    .setEndpoint('http://localhost:5001/v1') // Your API Endpoint
    .setProject('626ff525dcb106ce6c56') // Your project ID
;

export default sdk