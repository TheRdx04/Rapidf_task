const express = require("express");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/multer"); // Middleware for handling file uploads
const convertDocxToPDF = require("./utils/converter"); // Utility to convert DOCX to PDF
const addPasswordToPDF = require("./utils/pdfpass"); // Utility to add a password to PDF
const fs = require("fs").promises;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to convert DOCX to PDF
app.post("/docxtopdf", upload.single("file"), async (req, res) => {
    try {
        const { password } = req.body;

        // Validate file upload
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Extract file metadata
        const metadata = {
            name: req.file.originalname,
            size: `${(req.file.size / 1024).toFixed(2)} KB`, // Size in KB
            mimetype: req.file.mimetype,
            format: path.extname(req.file.originalname).replace(".", ""), // File extension without the dot
        };

        // File paths
        const baseName = path.basename(req.file.originalname, path.extname(req.file.originalname));
        const inputPath = path.join(__dirname, "uploads", req.file.originalname);
        const convertedPDFPath = path.join(__dirname, "files", `${baseName}.pdf`);
        const passwordProtectedPath = path.join(__dirname, "files", `${baseName}-protected.pdf`);

        // Step 1: Convert DOCX to PDF
        await convertDocxToPDF(inputPath, convertedPDFPath);

        // Step 2: Add password to the PDF if provided
        const finalPath = password
            ? await addPasswordToPDF(convertedPDFPath, passwordProtectedPath, password)
            : convertedPDFPath;

        // Step 3: Clean up the uploaded DOCX file
        await fs.unlink(inputPath);

        // Step 4: Return response with metadata and download URL
        return res.status(200).json({
            message: "File processed successfully",
            metadata,
            downloadUrl: `http://localhost:${port}/files/${path.basename(finalPath)}`,
        });
    } catch (error) {
        console.error("Error processing file:", error.message);

        // Clean up uploaded files in case of an error
        if (req.file) {
            const uploadedPath = path.join(__dirname, "uploads", req.file.originalname);
            await fs.unlink(uploadedPath).catch(() => console.error("Failed to clean up uploaded file"));
        }

        return res.status(500).json({ message: error.message });
    }
});

// Serve files statically for download
app.use("/files", express.static(path.join(__dirname, "files")));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
