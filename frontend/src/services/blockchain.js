import { ethers } from 'ethers';
import ABI from '../CertificateRegistry.json';

const CONTRACT_ADDRESS = "0x9F5bEd71Ccd8aF5A154656aCeae28Fa2778F16B2";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Metamask belum terinstall!");
  //await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
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

export const revokeCertificateOnChain = async (kode) => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
  const tx = await contract.revokeCertificate(kode);
  return tx;
};