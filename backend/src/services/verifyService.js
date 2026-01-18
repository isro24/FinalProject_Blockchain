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

const revokeCertificate = async (certId, adminSigner) => {
    try {
        const tx = await contract.connect(adminSigner).revokeCertificate(certId);
        await tx.wait();
        return { success: true, message: "Sertifikat berhasil direvoke." };
    } catch (error) {
        throw new Error(error.reason || "Gagal revoke sertifikat");
    }
};

const getAllCertificates = async () => {
    try {
        const codes = await contract.getAllVerificationCodes();
        const certs = await Promise.all(
            codes.map(async (code) => {
                try {
                    const data = await contract.getCertificate(code);
                    return {
                        kodeVerifikasi: code,
                        namaOrang: data[0],
                        namaUKM: data[1],
                        tanggal: data[2],
                        isValid: data[3],
                    };
                } catch (err) {
                    return null;
                }
            })
        );
        // Filter only valid certs (optional)
        return certs.filter(Boolean);
    } catch (error) {
        throw new Error(error.reason || "Gagal mengambil seluruh sertifikat");
    }
};

module.exports = { getCertificateData, revokeCertificate, getAllCertificates };