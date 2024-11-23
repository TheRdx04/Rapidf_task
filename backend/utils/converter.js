'use strict';

const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const convertDocxToPDF = async (inputPath, outputPath) => {
    try {
        // Ensure the input file exists
        const docxBuf = await fs.readFile(inputPath);

        // Convert it to PDF
        const pdfBuf = await libre.convertAsync(docxBuf, '.pdf', undefined);

        // Write the PDF to the output path
        await fs.writeFile(outputPath, pdfBuf);

        console.log(`Successfully converted DOCX to PDF: ${outputPath}`);
        return outputPath;
    } catch (error) {
        console.error(`Error converting DOCX to PDF: ${error.message}`);
        throw error;
    }
};

module.exports = convertDocxToPDF;
