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

module.exports = { verifyCertificate };