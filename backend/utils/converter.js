const docxToPDF = require("docx-pdf");
const path = require("path");

const convertDocxToPDF = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        docxToPDF(inputPath, outputPath, (err, result) => {
            if (err) {
                reject(`Error converting DOCX to PDF: ${err.message}`);
            } else {
                resolve(outputPath);
            }
        });
    });
};

module.exports = convertDocxToPDF;
