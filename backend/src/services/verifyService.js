const { contract } = require('../config/blockchain');

const getCertificateData = async (certId) => {
    try {
        const data = await contract.getCertificate(certId);

        return {
            valid: true,
            kodeVerifikasi: certId,
            namaOrang: data[0],
            namaUKM: data[1],
            tanggal: data[2],
            verifiedAt: new Date().toISOString(),
            status: "Terverifikasi Valid di Blockchain Sepolia"
        };
    } catch (error) {
        throw new Error(error.reason || "Sertifikat tidak ditemukan");
    }
};

module.exports = { getCertificateData };