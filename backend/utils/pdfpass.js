const { encrypt } = require("node-qpdf-commonjs"); // Or "node-qpdf2" depending on your version
const fs = require("fs");
const path = require("path");

const addPasswordToPDF = async (inputPath, outputPath, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Ensure file exists using absolute path
            const absoluteInputPath = path.resolve(inputPath);
            if (!fs.existsSync(absoluteInputPath)) {
                return reject("Input file does not exist");
            }

            // Prepare the pdf object with the correct structure
            const pdf = {
                input: absoluteInputPath,  // Input file path
                output: outputPath,        // Output file path
                password: password,        // Password for the PDF
            };
            console.dir(encrypt);

            // Encrypt the PDF
            await encrypt(pdf);

            resolve(outputPath);
        } catch (error) {
            reject(`Failed to add password to PDF: ${error.message}`);
        }
    });
};

module.exports = addPasswordToPDF;
