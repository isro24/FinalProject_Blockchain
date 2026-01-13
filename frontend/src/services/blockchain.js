import { ethers } from 'ethers';
import ABI from '../CertificateRegistry.json';

const CONTRACT_ADDRESS = "0x931068f81194533Fd5B1Fe902F4A8e10f2bdA8eB";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Metamask belum terinstall!");
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};

export const issueCertificateOnChain = async (data) => {
  if (!window.ethereum) throw new Error("No crypto wallet found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

  const tx = await contract.issueCertificate(
    data.kode,
    data.nama,
    data.ukm,
    data.tanggal
  );

  return tx; 
};