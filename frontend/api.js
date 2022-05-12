import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
    .setEndpoint('https://147.182.235.212/v1') // Your API Endpoint
    .setProject('stock-sim') // Your project ID
;

export default sdk