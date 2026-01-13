const { ethers } = require('ethers');
require('dotenv').config();

const Artifact = require('../../CertificateRegistry.json'); 

const CONTRACT_ADDRESS = "0x931068f81194533Fd5B1Fe902F4A8e10f2bdA8eB";
const RPC_URL = process.env.SEPOLIA_URL;

if (!RPC_URL) {
    console.error("ERROR: SEPOLIA_URL belum di-set di .env");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, Artifact.abi, provider);

module.exports = { contract };