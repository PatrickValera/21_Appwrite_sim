import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
    .setEndpoint('https://www.patrickvalera.com/v1') // Your API Endpoint
    .setProject('stock-sim') // Your project ID
;

export default sdk