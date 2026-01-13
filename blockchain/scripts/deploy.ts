import { ethers } from "hardhat";

async function main() {
  console.log("Sedang mendeploy contract...");

  const cert = await ethers.deployContract("CertificateRegistry");
  await cert.waitForDeployment();

  console.log(`SUKSES! Contract Address: ${cert.target}`);
  console.log("Simpan alamat di atas!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});