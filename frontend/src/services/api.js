
export const verifyCertificateAPI = async (code) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/verify/${code}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghubungi server backend.");
  }
};

export const getAllCertificatesAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/certificates');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mengambil data sertifikat.");
  }
};