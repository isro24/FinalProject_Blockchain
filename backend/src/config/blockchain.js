const { ethers } = require('ethers');
require('dotenv').config();

const Artifact = require('../../CertificateRegistry.json'); 

const CONTRACT_ADDRESS = "0x9F5bEd71Ccd8aF5A154656aCeae28Fa2778F16B2";
const RPC_URL = process.env.SEPOLIA_URL;

if (!RPC_URL) {
    console.error("ERROR: SEPOLIA_URL belum di-set di .env");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, Artifact.abi, provider);

module.exports = { contract };