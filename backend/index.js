const express = require("express");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/multer");
const convertDocxToPDF = require("./utils/converter");
const addPasswordToPDF = require("./utils/pdfpass");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/docxtopdf", upload.single("file"), async (req, res) => {
    try {
        
        const { password } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Remove the .docx extension
        const baseName = path.basename(req.file.originalname, path.extname(req.file.originalname));
        const inputPath = path.join(__dirname, "uploads", req.file.originalname);
        const convertedPDFPath = path.join(__dirname, "files", `${baseName}.pdf`);
        const passwordProtectedPath = path.join(__dirname, "files", `${baseName}-protected.pdf`);

        // Step 1: Convert DOCX to PDF
        await convertDocxToPDF(inputPath, convertedPDFPath);

        // Step 2: Add password to PDF (if password is provided)
        const finalPath = password
            ? await addPasswordToPDF(convertedPDFPath, passwordProtectedPath, password)
            : convertedPDFPath;

        // Step 3: Return the file for download
        return res.download(finalPath, () => {
            console.log("File sent successfully");
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
