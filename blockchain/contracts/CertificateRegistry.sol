// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract CertificateRegistry {
    struct Cert {
        string studentName;
        string ukmName;
        string eventDate;  
        bool isValid;
    }

    mapping(string => Cert) public certificates;
    string[] private allVerificationCodes;
    address public admin;

    event CertificateIssued(string indexed verificationCode, string studentName, string ukmName);

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(
        string memory _verificationCode, 
        string memory _studentName, 
        string memory _ukmName,
        string memory _eventDate
    ) public {
        require(msg.sender == admin, "Hanya admin yang boleh");
        require(!certificates[_verificationCode].isValid, "Kode Verifikasi sudah dipakai");

        certificates[_verificationCode] = Cert({
            studentName: _studentName,
            ukmName: _ukmName,
            eventDate: _eventDate,
            isValid: true
        });
        allVerificationCodes.push(_verificationCode);
        emit CertificateIssued(_verificationCode, _studentName, _ukmName);
    }
    function getAllVerificationCodes() public view returns (string[] memory) {
        return allVerificationCodes;
    }

    function getCertificate(string memory _verificationCode) public view returns (Cert memory) {
        require(certificates[_verificationCode].isValid, "Sertifikat tidak ditemukan");
        return certificates[_verificationCode];
    }
    event CertificateRevoked(string indexed verificationCode);

    function revokeCertificate(string memory _verificationCode) public {
        require(msg.sender == admin, "Hanya admin yang boleh");
        require(certificates[_verificationCode].isValid, "Sertifikat tidak ditemukan atau sudah direvoke");
        certificates[_verificationCode].isValid = false;
        emit CertificateRevoked(_verificationCode);
    }
}