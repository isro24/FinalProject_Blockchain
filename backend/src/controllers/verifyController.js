const verifyService = require('../services/verifyService');

const verifyCertificate = async (req, res) => {
    const { id } = req.params;
    console.log(`Request masuk: Verifikasi ID ${id}...`);

    try {
        const result = await verifyService.getCertificateData(id);
        
        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("Gagal:", error.message);
        
        res.status(404).json({
            success: false,
            message: "Sertifikat tidak ditemukan atau ID salah.",
            error: error.message
        });
    }
};

const { ethers } = require("ethers");
const revokeCertificate = async (req, res) => {
    const { id } = req.params;
    const adminPrivateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
    const adminSigner = new ethers.Wallet(adminPrivateKey, provider);

    try {
        const result = await verifyService.revokeCertificate(id, adminSigner);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllCertificates = async (req, res) => {
    try {
        const result = await verifyService.getAllCertificates();
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { verifyCertificate, revokeCertificate, getAllCertificates };